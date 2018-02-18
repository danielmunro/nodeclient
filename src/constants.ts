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
}

const atoms = {
  room: {
    name: 'foo',
    //map: [],
  },
  player: {
    id: 'uuid'
  }
}

const wsEvents = {
  OPEN: 'open',
  MESSAGE: 'message'
}

export { mainWindow, app, OSX, server, atoms, room, wsEvents }
