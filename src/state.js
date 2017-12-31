import { atoms } from './constants'

export default class State {
  constructor() {
    this.updateState(atoms)
  }
  updateState(newState) {
    console.log('updateState', newState)
    this.atom = { ...newState, ...this.atom }
  }
}

export class Inspector {
  constructor(state) {
    this.state = state
  }
  findMissingModels(newState) {
    console.log('findMissingModels', newState)
    let neededRels
    for (let s of newState.rels) {

    }
  }
}
