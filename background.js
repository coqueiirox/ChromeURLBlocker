let blackListedUrls = [];

chrome.storage.sync.get(['urls'], function(result) {
    if(result.urls) {
        blackListedUrls = result.urls;
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        for (let i = 0; i < blackListedUrls.length; i++) {
            if (details.url.indexOf(blackListedUrls[i]) != -1) {
                localStorage.setItem('blockedUrl', details.url);
                return {redirectUrl: chrome.extension.getURL('blocked.html')};
            }
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        if(key === 'urls') {
            blackListedUrls = storageChange.newValue;
        }
    }
});
