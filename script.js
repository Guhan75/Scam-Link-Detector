document.getElementById("check-button").addEventListener("click", function () {
  const linkInput = document.getElementById("link-input").value.trim();
  const resultDiv = document.getElementById("result");

  if (!linkInput) {
    resultDiv.innerHTML = "<span style='color: red;'>Please enter a link.</span>";
    return;
  }

  // Validate if input is a proper URL
  let isValidURL = true;
  let urlObj;
  try {
    urlObj = new URL(linkInput);
  } catch {
    isValidURL = false;
  }

  if (!isValidURL) {
    resultDiv.innerHTML = "<span style='color: red;'>Invalid URL format.</span>";
    return;
  }

  const urlHost = urlObj.hostname.replace(/^www\./, "").toLowerCase();

  // Whitelist of trusted domains and subdomains
  const whitelist = [
    "amazon.com",
    "paypal.com",
    "google.com",
    "facebook.com",
    "microsoft.com",
    "youtube.com",
    "instagram.com",
    "twitter.com",
    "linkedin.com",
  ];

  const isWhitelisted = whitelist.some((trustedDomain) =>
    urlHost.endsWith(trustedDomain)
  );

  // If the domain is trusted, mark as safe
  if (isWhitelisted) {
    resultDiv.innerHTML = "<span style='color: green;'>This is a trusted site.</span>";
    return;
  }

  // Extended scam detection patterns
  const scamPatterns = [
    "free", "win", "prize", "money", "claim", "reward", "lottery", "jackpot",
    "cheap", "deal", "exclusive", "urgent", "click", "freegift", "specialoffer",
    "login", "verify", "secure", "update", "auth", "signin", "account", "bank",
    "gift", "bonus", "cashback", "discount", "offer", "sale-now",
    "limited", "act-now", "expires", "important", "urgent-action", "final-warning",
    ".exe", ".apk", ".zip", ".rar", ".scr", ".js", ".bat",
    "xn--",
    "%",
  ];

  // Regex for suspicious patterns (encoded characters, IDNs)
  const suspiciousRegex = /(%[0-9A-F]{2}|xn--|@\w+|[<>])/i;

  // Check if the link matches scam patterns or suspicious regex
  const isScam =
    scamPatterns.some((pattern) => urlObj.href.toLowerCase().includes(pattern)) ||
    suspiciousRegex.test(urlObj.href);

  // Display the result
  if (isScam) {
    resultDiv.innerHTML = "<span style='color: red;'>Scam Link Detected!</span>";
  } else {
    resultDiv.innerHTML = "<span style='color: green;'>This link seems safe.</span>";
  }
});
