import { component } from 'relm';

const CHANGE = 'textbox/change';

function $CHANGE (event) {
  return { type: CHANGE, value: event.target.value };
}

export default component('Textbox', {
  init: (value = '') => value,

  update: {
    [CHANGE]: (state, action) => action.value
  },

  view: ({ dispatch, state, styles }) => (
    <div>
      <label style={{ display: 'block' }}>
        Enter your name
      </label>
      <input
        style={styles.input}
        onChange={dispatch.using($CHANGE)}
        type='text'
        value={state}
      />
    </div>
  )
});
