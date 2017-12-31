import net from 'net'
import { server } from './constants'

export default class Client {
  constructor(host, port, updateState) {
    this.updateState = updateState
    this.ws = new WebSocket('ws://localhost:5151');
    this.ws.onmessage = this.onMessage.bind(this)
    this.ws.onopen = () => this.requestInitialState()
  }
  requestInitialState() {
    console.log('requestInitialState')
    this.getRoom()
    this.getPlayer()
  }
  getRoom() {
    this.sendRequest('getRoom')
  }
  getPlayer() {
    this.sendRequest('getPlayer')
  }
  broadcastTestMessage() {
    this.send({
      request: 'broadcast',
      message: 'test'
    })
  }
  sendRequest(request) {
    this.send({
      request
    })
  }
  send(data) {
    this.ws.send(JSON.stringify(data))
  }
  onMessage(message) {
    console.log('received: ' + message)
    this.updateState(JSON.parse(message.data))
  }
  onClose() {
    console.log('connection closed')
    this.socket.destroy()
  }
}
