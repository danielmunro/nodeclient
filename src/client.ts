import { server, wsEvents } from './constants'

export default class Client {
  private readonly ws: WebSocket
  private readonly mainLog: (message: string) => {}

  constructor(host: string, port: number, mainLog: (message: string) => {}) {
    this.ws = new WebSocket('ws://' + host + ':' + port)
    this.mainLog = mainLog
    this.ws.addEventListener(wsEvents.MESSAGE, (message) => this.onMessage(message))
    this.ws.addEventListener(wsEvents.OPEN, () => this.requestInitialState())
  }
  requestInitialState() {
    this.request('look')
  }
  getNode(label: string, name: string) {
    this.send({ request: 'node', label, name })
  }
  social(channel: string, message: string) {
    this.send({ request: 'social', channel, message })
  }
  addInputFromUser(input: string) {
    // this.send({ request: 'input', input })
    // hack all input as social in order to dev/test
    this.request(input)
  }
  private request(request: string) {
    this.send({ request })
  }
  send(data: object) {
    this.ws.send(JSON.stringify(data))
  }
  onMessage(message: any) {
    const data = JSON.parse(message.data)
    if (data.room) {
      const r = data.room
      this.mainLog(
        "<p>" + r.brief + "</p><p>" + r.description + "</p><p>Exits: [" + ["north", "south", "east", "west", "up", "down"].map((direction) => 
          r[direction] ? direction.substr(0, 1) : "").join("") + "]</p>"
      )
      return
    }

    if (data.message) {
      this.mainLog("<p>" + data.message + "</p>")
    }
  }
  onClose() {
    this.ws.close()
  }
}
