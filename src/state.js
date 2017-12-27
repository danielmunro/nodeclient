import { atoms } from './constants'

export default class State {
  constructor() {
    this.atom = atoms.copy()
  }
}
