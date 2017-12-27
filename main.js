import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'
import { app as appEvents, mainWindow, server } from './src/constants'

let win

const loadWindow = () => {
  win = new BrowserWindow({
    width: mainWindow.WIDTH,
    height: mainWindow.HEIGHT,
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  win.webContents.openDevTools()
}

const quit = () => {
  app.quit()
}

app.on(appEvents.READY, loadWindow)
app.on(appEvents.WINDOW_ALL_CLOSED, quit)
