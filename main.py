import asyncio
import json
import random

import websockets
from pypresence import Presence

#Your clientid
client_id = ''
RPC = Presence(client_id)
RPC.connect()

async def job(websocket, path):
    def update(data):
        data = json.loads(data)
        series = data["series"]
        info = data["info"]
        ep_title = data["ep_title"]
        RPC.update(details=series, state = info + " - " + ep_title, large_text="Netflix")
    try:
        data = await websocket.recv()
        await asyncio.sleep(random.random() * 3)
        update(data)
    except RuntimeError:
        print("Another mainloop is running")
    except websockets.exceptions.ConnectionClosedOK:
        print("Connection Lost")

start_server = websockets.serve(job, "127.0.0.1", 5678)
loop = asyncio.get_event_loop()
loop.run_until_complete(start_server)
loop.run_forever()