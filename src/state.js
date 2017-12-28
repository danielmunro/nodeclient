import { atoms } from './constants'

export default class State {
  constructor() {
    this.updateState(atoms)
  }
  updateState(newState) {
    this.atom = { ...newState }
  }
}
