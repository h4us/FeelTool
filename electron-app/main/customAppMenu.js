const { app, ipcMain, dialog, Menu } = require('electron');

const isMac = process.platform == 'darwin';

const customMenuTpl = [
  // { role: 'appMenu' },
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
      { type: 'separator' },
      {
        label: 'Restart',
        click: () => {
          app.relaunch();
          app.exit(0);
        }
      }
    ]
  },

  // { role: 'fileMenu' },
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' },
    ]
  },

  {
    label: 'Video Source',
    submenu: [
      {
        label: 'Load Video File',
        click: async (item, win, event) => {
          const fp = await dialog.showOpenDialog({ filters: [
            { name: 'html5 video', extensions: ['webm', 'mp4', 'ogv'] }
          ]});
          win.webContents.send('message',`assets://${fp.filePaths[0]}`);
        }
      }
    ]
  },

  // { role: 'editMenu' },
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac ? [
  //       { role: 'pasteAndMatchStyle' },
  //       { role: 'delete' },
  //       { role: 'selectAll' },
  //       { type: 'separator' },
  //       {
  //         label: 'Speech',
  //         submenu: [
  //           { role: 'startSpeaking' },
  //           { role: 'stopSpeaking' }
  //         ]
  //       }
  //     ] : [
  //         { role: 'delete' },
  //         { type: 'separator' },
  //         { role: 'selectAll' }
  //       ])
  //   ]
  // },

  { role: 'viewMenu' },
  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forceReload' },
  //     { role: 'toggleDevTools' },
  //     { type: 'separator' },
  //     { role: 'resetZoom' },
  //     { role: 'zoomIn' },
  //     { role: 'zoomOut' },
  //     { type: 'separator' },
  //     { role: 'togglefullscreen' }
  //   ]
  // },

  { role: 'windowMenu' },
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac ? [
  //       { type: 'separator' },
  //       { role: 'front' },
  //       { type: 'separator' },
  //       { role: 'window' }
  //     ] : [
  //         { role: 'close' }
  //       ])
  //   ]
  // },
];

module.exports = Menu.buildFromTemplate(customMenuTpl);
