const mainWindow = {
  CLOSED: 'closed',
  WIDTH: 800,
  HEIGHT: 600,
}

const app = {
  READY: 'ready',
  WINDOW_ALL_CLOSED: 'window-all-closed',
  ACTIVATE: 'activate',
}

const room = {
  TILE_SIZE_IN_PIXELS: 32,
}

const OSX = 'osx'

const server = {
  HOST: 'localhost',
  PORT: 5151,
  events: {
    DATA: 'data',
    CLOSE: 'close',
  }
}

const atoms = {
  room: {
    name: "foo",
    map: []
  },
  player: {
    id: "uuid"
  }
}

export { mainWindow, app, OSX, server, atoms, room }
