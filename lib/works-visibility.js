// Controls which portfolio projects are visible on /works.
//
// While rebuilding the portfolio with fresh projects, everything is hidden and
// /works shows a "working on new projects" state. To bring projects back:
//   - set HIDE_ALL_PROJECTS to false, and
//   - optionally list the ids you still want hidden in HIDDEN_PROJECT_IDS.
//
// CommonJS so it can be shared by both pages/works.js (import) and
// next.config.js (require) as a single source of truth.

const HIDE_ALL_PROJECTS = true

const HIDDEN_PROJECT_IDS = []

function isProjectVisible(id) {
  if (HIDE_ALL_PROJECTS) return false
  return !HIDDEN_PROJECT_IDS.includes(id)
}

module.exports = { HIDE_ALL_PROJECTS, HIDDEN_PROJECT_IDS, isProjectVisible }
