function getData() {
    chrome.tabs.executeScript(null, {
        file: "background.js"
    });
};

function websocket(data = null) {
    url = 'localhost'
    port = '5678'
    url = "ws://" + url + ":" + port + "/"

    ws = new WebSocket(url);
    ws.onopen = function(evt) { onOpen(evt) };
    ws.onclose = function(evt) { onClose(evt) };
    ws.onmessage = function(evt) { onMessage(evt) };
    ws.onerror = function(evt) { onError(evt) };

    function onOpen(evt) {
        if (data == null) {
            console.log('Connection open!');
        } else if (data != null) {
            try {
                console.log("sent: " + data);
                ws.send(data);
            } catch (InvalidStateError) {
                ws.close();
            }
        }
    };

    function onClose(evt) {
        console.log('Connection closed!');
    };

    function onMessage(evt) {
        console.log(evt.data);
    };

    function onError(evt) {
        console.log('error: ' + evt.data);
        ws.close();
    };
}
window.onload = function() {
    websocket();
    var exBtn = document.getElementById('exBtn');

    function start() {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
            var url = tabs[0].url;
            document.getElementById("host").innerHTML = url;
            getData();
            chrome.runtime.onMessage.addListener(function(request) {
                if (request.action == "return") {
                    var data = request.data;
                    console.log(JSON.parse(data))
                    websocket(data);
                }
            });
        });
    }

    exBtn.addEventListener('click', function() {
        start();
    });
}

//*[@id="appMountPoint"]/div/div/div[1]/div/div/div[2]/div/div[3]/div/div[5]/div[2]/div[2]/div[2]/div
//645253786759069697