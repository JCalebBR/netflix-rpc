# Netflix Rich Presence for Discord
[![pypresence](https://img.shields.io/badge/using-pypresence-00bb88.svg?style=for-the-badge&logo=discord&logoWidth=20)](https://github.com/qwertyquerty/pypresence)

A netflix rich presence extension for chrome using python for communication.

# Build requirements
Install pypresence with `pip`

```python
pip install pypresence
```

Install websockets with `pip`

```python
pip install websockets
```

### Getting your client_id for pypresence [[1](https://qwertyquerty.github.io/pypresence/html/info/quickstart.html)]
1. Navigate to [Discord Developers](https://discordapp.com/developers/)
2. Click “Create an Application.”
3. Setup the application how you want, give it the name you want, and give it a good image.
4. Right under the name of your application, locate your Client ID. You will need this later.
5. Lastly, save your application.

### Installing the extension.
1. Navigate to `chrome://extensions`.
2. Activate developer's mode at the upper right corner.
3. Load unpacked extension and target a folder cointaining this repo.

# Workflow and overall function
This is my usual workflow:

1. Keep a tab with `chrome://extensions` always open so whenever you make changes to the JS files you can update the extension via the loop arrow icon, any errors shown will alsoo be thrown either at the Errors menu or at the console.
2. The access to the console is done via `F12 -> Console`, if you wish to access the extension's console, right-click it and go to `Inspect Popup`.
3. Run `main.py` which will open a websocket on default to `ws://localhost:5678` and listen for data.
4. Open a netflix page and go to any series' episode you'd like, make sure the chrome window is focused and the active tab is Netflix's otherwise an error will be thrown.
5. Open the extension by right-clicking it, click the Check button and it should be replaced with the webpage's url.
6. `inject.js` will attempt to inject a `script` called `background.js` into the page, that script is responsible for finding the title, information and episode title of the current page and send it via JSON using chrome.runtime.sendMessage.
7. `popup.js` will create a connection to python's websocket.
8. `popup.js` on button click will get the data from `background.js` and send it via websocket to the python script.
9. Expected vs Real behaviour of `main.py` 
  
    a. Expected behaviour: `main.py` will receive the data, separate it and update discord's rpc and wait for new data.
    
    b. Real behaviour: `main.py` will receive the data, separate it and update discord's rpc and throw a `RuntimeError` because another loop is running.
    
 # To Do
 - Fix `main.py` behaviour
 - Elapsed Time (just search the html for the remaining time every few s)
 - Join someone on rpc (provide the link to rpc so when someone clicks on Join, it will go there)
 - Netflix image on rpc
 - Netflix image on extension
 - Improve UI of extension
