function loadBlacklistedUrls() {
    let urlList = document.getElementById('urlList');
    urlList.innerHTML = '';
    chrome.storage.sync.get(['urls'], function(result) {
        let urls = result.urls ? result.urls : [];
        urls.forEach(function(url) {
            let listItem = document.createElement('li');
            listItem.textContent = url;
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = function() {
                let index = urls.indexOf(url);
                if (index > -1) {
                    urls.splice(index, 1);
                    chrome.storage.sync.set({urls: urls}, function() {
                        loadBlacklistedUrls();
                    });
                }
            };
            listItem.appendChild(removeButton);
            urlList.appendChild(listItem);
        });
    });
}

document.getElementById('addButton').onclick = function() {
    let urlInput = document.getElementById('urlInput');
    let urlToBlock = urlInput.value;
    chrome.storage.sync.get(['urls'], function(result) {
        let urls = result.urls ? result.urls : [];
        urls.push(urlToBlock);
        chrome.storage.sync.set({urls: urls}, function() {
            urlInput.value = '';
            loadBlacklistedUrls();
        });
    });
};

loadBlacklistedUrls();
