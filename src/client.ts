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
    this.send({ request: 'look' })
  }
  getRoom() {
    this.getNode('room', 'prairieant-mistress')
  }
  getPlayer() {
    this.getNode('player', 'peppermintowl-spear')
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
    this.social('gossip', input)
  }
  send(data: object) {
    this.ws.send(JSON.stringify(data))
  }
  onMessage(message: any) {
    console.log(message.data)
    const data = JSON.parse(message.data)
    if (data.room) {
      const r = data.room
      this.mainLog(
        "<p>" + r.brief + "</p><p>" + r.description + "</p><p>Exits: [" + ["north", "south", "east", "west", "up", "down"].map((direction) => 
          r[direction] ? direction.substr(0, 1) : "").join("") + "]</p>"
      )
    }
    //this.mainLog(message.data)
    //if (data.)
    //this.updateState(data)

  }
  onClose() {
    this.ws.close()
  }
}
