import { room } from './constants'

const transform = (data) => {
  let transformed = {}
  transformed[data.model] = data
  console.log('transform', transformed)

  return transformed
}

export class Renderer {
  constructor(spritesheet) {
    this.spritesheet = spritesheet
    this.isDirty = true
    this.isReady = false
    this.spritesheet.addEventListener('load', () => this.isReady = true)
    this.atom = {}
  }
  setContext(context) {
    this.context = context
  }
  stateChanged(atom) {
    this.isDirty = true
    this.atom = { ...transform(atom), ...this.atom }
  }
  render() {
    console.log(this.atom)
    if (this.isReady && this.isDirty && this.atom.room) {
      console.log('render', this.atom)
      const aroom = this.atom.room
      const width = aroom.tiles[0].length, height = aroom.tiles.length
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = aroom.tiles[y][x].x * room.TILE_SIZE_IN_PIXELS,
            srcY = aroom.tiles[y][x].y * room.TILE_SIZE_IN_PIXELS
          this.context.drawImage(
            this.spritesheet,
            srcX,
            srcY,
            room.TILE_SIZE_IN_PIXELS,
            room.TILE_SIZE_IN_PIXELS,
            x * room.TILE_SIZE_IN_PIXELS,
            y * room.TILE_SIZE_IN_PIXELS,
            room.TILE_SIZE_IN_PIXELS,
            room.TILE_SIZE_IN_PIXELS
          )
        }
      }


      // const srcX = 32, srcY = 32, destX = 0, destY = 0
      // this.context.drawImage(
      //   this.spritesheet,
      //   srcX,
      //   srcY,
      //   room.TILE_SIZE_IN_PIXELS,
      //   room.TILE_SIZE_IN_PIXELS,
      //   destX,
      //   destY,
      //   room.TILE_SIZE_IN_PIXELS,
      //   room.TILE_SIZE_IN_PIXELS
      // )
      this.isDirty = false
    }
  }
}
