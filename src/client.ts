import * as nl2br from 'nl2br'
import { server, wsEvents } from './constants'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default class Client {
  private readonly ws: WebSocket
  private readonly mainLog: (message: string) => {}
  private player

  constructor(host: string, port: number, mainLog: (message: string) => {}) {
    this.ws = new WebSocket('ws://' + host + ':' + port)
    this.mainLog = mainLog
    this.ws.addEventListener(wsEvents.MESSAGE, (message) => this.onMessage(message))
    this.ws.addEventListener(wsEvents.OPEN, () => this.requestInitialState())
  }
  requestInitialState() {
    //this.request('look')
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
    console.log(data)
    if (data.room) {
      const r = data.room
      this.mainLog(
        "<p>" + r.name + "</p><p>" + r.description + "</p><p>Exits: [" + ["north", "south", "east", "west", "up", "down"].map((direction) => 
          r.exits.find((exit) => exit.direction === direction) ? direction.substr(0, 1) : "").join("") + "]</p>"
          + r.inventory.items.map((item) => item.name + " is here.<br />").join("")
          + (r.inventory.items.length > 0 ? "<br />" : "")
          + r.mobs.filter((mob) => mob.name !== this.player.sessionMob.name).map((mob) => capitalizeFirstLetter(mob.name) + " is here.<br />").join("")
      )
      return
    }

    if (data.inventory) {
      const i = data.inventory
      this.mainLog(
        "<p>Your inventory:</p>" + i.items.map((item) => "<p>" + item.name + "</p>").join("")
      )
      return
    }

    if (data.mob || data.item) {
      const thing = data.mob ? data.mob : data.item
      this.mainLog(
        "<p>" + thing.description + "</p>"
      )
      return
    }

    if (data.player) {
      this.player = data.player
      return
    }

    if (data.message) {
      this.mainLog("<p>" + nl2br(data.message) + "</p>")
    }
  }
  onClose() {
    this.ws.close()
  }
}
