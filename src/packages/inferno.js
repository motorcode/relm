/* eslint-env browser */
import InfernoDOM from 'inferno-dom';
import relm from '../relm';
import StatePlugin from '../plugins/StatePlugin';
import TasksPlugin from '../plugins/TasksPlugin';
import ReduxPlugin from '../plugins/ReduxPlugin';
import CSJSPlugin from '../plugins/CSJSPlugin';
import InfernoPlugin from '../plugins/InfernoPlugin';

module.exports = function startApp (component, opts) {
  const {
    el,
    theme,
    customizePlugins,
    customizeReducer,
    customizeMiddleware,
  } = opts || {};

  const identity = x => x;

  const app = relm(component, {
    plugins: (customizePlugins || identity)([
      new StatePlugin(),
      new TasksPlugin(),
      new ReduxPlugin({ customizeReducer, customizeMiddleware }),
      new CSJSPlugin({ theme }),
      new InfernoPlugin(),
    ])
  });

  if (app.actions.initializeState) {
    app.actions.initializeState();
  }

  function redraw () {
    InfernoDOM.render(app.view(), el);
  }

  if (el) {
    app.subscribe(requestAnimationFrame.bind(null, redraw));
    redraw();
  }

  return app;
};
