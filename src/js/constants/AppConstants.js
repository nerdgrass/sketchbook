import { keyMirror } from 'keymirror'

export const AppConstants = {

  ActionTypes: keyMirror({
    TRIGGER_HEX: null,
    UPDATE_HEX: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

}
