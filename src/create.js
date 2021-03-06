import _ from 'lodash';
import { deepCheckComponent } from './types';

function parser (plugins = []) {
  return function parse (component, source, path, root) {
    // Parse child components
    const components = _.mapValues(source.components || {}, (it, key) => {
      const child = _.isArray(it) ? _.head(it) : it;
      return parse({}, child, path.concat(key), root);
    });

    // Assign some basic props to the component
    const displayName = source.displayName || source.name;
    Object.assign(component, { components, path, displayName });

    // Run the component through the plugins
    _.each(plugins, plugin => plugin.apply(component, source, root));

    return component;
  };
}

export default function create (component, { plugins = [], path = [] }) {
  deepCheckComponent(component);
  const rootComponent = {};
  const parse = parser(plugins);

  return parse(rootComponent, component, path, rootComponent);
}
