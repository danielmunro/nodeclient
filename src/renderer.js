export class Renderer {
  constructor(spritesheet) {
    this.spritesheet = spritesheet
    this.isDirty = true
    this.isReady = false
    this.spritesheet.addEventListener('load', () => this.isReady = true)
  }
  setContext(context) {
    this.context = context
  }
  stateChanged() {
    this.isDirty = true
  }
  render() {
    if (this.isReady && this.isDirty) {
      this.context.drawImage(this.spritesheet, 32, 32, 32, 32, 0, 0, 32, 32)
      this.isDirty = false
    }
  }
}
