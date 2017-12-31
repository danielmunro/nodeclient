"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainWindow = {
    CLOSED: 'closed',
    WIDTH: 800,
    HEIGHT: 600,
};
exports.mainWindow = mainWindow;
const app = {
    READY: 'ready',
    WINDOW_ALL_CLOSED: 'window-all-closed',
    ACTIVATE: 'activate',
};
exports.app = app;
const OSX = 'osx';
exports.OSX = OSX;
const server = {
    HOST: 'localhost',
    PORT: 6969,
    events: {
        DATA: 'data',
        CLOSE: 'close',
    }
};
exports.server = server;
const atoms = {
    room: {},
    player: {}
};
exports.atoms = atoms;
//# sourceMappingURL=constants.js.map