import net from 'net'
import { server } from './constants'

export default class Client {
  constructor(host, port, updateState) {
    this.socket = new net.Socket()
    this.socket.connect(port, host, this.getRoom.bind(this))
    this.socket.on(server.events.DATA, this.onData.bind(this))
    this.socket.on(server.events.CLOSE, this.onClose.bind(this))
    this.updateState = updateState
  }
  getRoom() {
    this.send({
      request: 'getRoom'
    })
  }
  broadcastTestMessage() {
    this.send({
      request: 'broadcast',
      message: 'test'
    })
  }
  send(data) {
    const s = JSON.stringify(data)
    console.log('sending: '+s)
    this.socket.write(s)
  }
  onData(data) {
    console.log('received: ' + data)
    const newState = JSON.parse(data)
    this.updateState(newState)
    if (newState.fragment == 'room') {
      this.broadcastTestMessage()
    }
  }
  onClose() {
    console.log('connection closed')
    this.socket.close()
  }
}
