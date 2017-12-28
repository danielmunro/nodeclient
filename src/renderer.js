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
    this.atom = { ...atom, ...this.atom }
  }
  render() {
    if (this.isReady && this.isDirty) {
      this.context.drawImage(this.spritesheet, 32, 32, 32, 32, 0, 0, 32, 32)
      this.isDirty = false
    }
  }
}
