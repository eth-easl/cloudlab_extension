function rawCopyFunction() {
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        return chrome.scripting.executeScript({
            target: { 
                tabId: activeTabId 
            },
            func: getRawList,
        });

    }).then(function (results) {
        navigator.clipboard.writeText(results[0].result);
    }).catch(function (error) {
        alert("Failed to copy to clipboard")
    });
}

function rawArrayCopyFunction() {
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        return chrome.scripting.executeScript({
            target: { 
                tabId: activeTabId 
            },
            func: getArrayList,
        });

    }).then(function (results) {
        navigator.clipboard.writeText(results[0].result);
    }).catch(function (error) {
        alert("Failed to copy to clipboard")
    });
}

function getRawList(selector) {
    let values = document.getElementsByTagName("kbd")
    
    let urlList = ""
    Array.from(values).forEach((element) => {
        urlList = urlList + element.innerText + " "
    });

    urlList = urlList.replaceAll("ssh ", "")
    urlList = urlList.slice(0,-1)
    
    return urlList
}

function getArrayList(selector) {
    let values = document.getElementsByTagName("kbd")
    
    let urlList = "list = ["
    Array.from(values).forEach((element) => {
        urlList = urlList + "\"" + element.innerText + "\","
    });

    urlList = urlList.replaceAll("ssh ", "")
    urlList = urlList.slice(0,-1)
    urlList = urlList + "]"
    
    return urlList
}


const x = document.getElementById("loadButton");
x.addEventListener("click", rawCopyFunction);

const x2 = document.getElementById("loadArrayButton");
x2.addEventListener("click", rawArrayCopyFunction);

