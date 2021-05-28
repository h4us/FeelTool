const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  message: {
    send: (payload) => ipcRenderer.send('message', payload),
    on: (handler) => ipcRenderer.on('message', handler),
    off: (handler) => ipcRenderer.off('message', handler),
  },
  // ipcRenderer,
  sendTrackingData(payload) {
    const [angle, dX, dY] = payload;
    ipcRenderer.send('tracking', [angle, dX, dY]);
  },
  withSocketIO: true
});
