import {
  isProjectVisible,
  HIDE_ALL_PROJECTS,
  HIDDEN_PROJECT_IDS
} from '../../lib/works-visibility'

describe('works visibility flag', () => {
  it('hides all projects when HIDE_ALL_PROJECTS is on', () => {
    if (HIDE_ALL_PROJECTS) {
      expect(isProjectVisible('rmap')).toBe(false)
      expect(isProjectVisible('anything')).toBe(false)
    } else {
      // When projects are shown again, only explicitly-listed ids are hidden.
      expect(isProjectVisible('some-new-project')).toBe(true)
      HIDDEN_PROJECT_IDS.forEach(id => {
        expect(isProjectVisible(id)).toBe(false)
      })
    }
  })
})
