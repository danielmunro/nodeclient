export default class State {
  constructor(atoms) {
    this.updateState(atoms)
  }
  updateState(newState) {
    this.atom = { ...this.atom, ...newState }
  }
}
