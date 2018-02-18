import State from './index'

describe('updateState', () => {
  it('should spread merge successive state updates', () => {
    const state = new State({initial: 1, test: {foo: "bar"}})
    state.updateState({initial: 2, test: {baz: "biz"}})
    expect(state.atom.initial).toBe(2)
    expect(state.atom.test.foo).toBe(undefined)
    expect(state.atom.test.baz).toBe("biz")
  })
})
