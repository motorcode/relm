(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["router"] = factory();
	else
		root["relm"] = root["relm"] || {}, root["relm"]["router"] = factory();
})(this, function() {
return webpackJsonprelm__name_([4],{

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(88),
    baseIteratee = __webpack_require__(38),
    baseMap = __webpack_require__(187),
    isArray = __webpack_require__(1);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

var baseClamp = __webpack_require__(89),
    baseToString = __webpack_require__(65),
    toInteger = __webpack_require__(73),
    toString = __webpack_require__(74);

/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = baseClamp(toInteger(position), 0, string.length);
  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

module.exports = startsWith;


/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(194);

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(array) {
  var length = array ? array.length : 0;
  return length ? baseSlice(array, 1, length) : [];
}

module.exports = tail;


/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(277)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string} str
 * @return {!Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @return {!function(Object=, Object=)}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys)
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(63),
    isArrayLike = __webpack_require__(21);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ },

/***/ 194:
/***/ function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ },

/***/ 277:
/***/ function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mapValues__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mapValues___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_mapValues__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_startsWith__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_startsWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_startsWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_map__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_tail__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_tail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_tail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_reduce__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_reduce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_reduce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_tcomb__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_tcomb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_tcomb__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_path_to_regexp__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_path_to_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__(53);
/* harmony export */ exports["default"] = router;
/* harmony export */ __webpack_require__.d(exports, "internals", function() { return internals; });











/**
 * Creates a single route parser given a path (ex /some/:named/:path*)
 * The return exec method returns an object of all named parameters
 *
 * Returned exec() method takes a url string and returns an object with route params
 *
 * @param {Regex} path
 * @returns {Object} with exec() method to match against strings
 */
function routeParser(path) {
  var keys = [];
  var re = __WEBPACK_IMPORTED_MODULE_7_path_to_regexp___default()(path, keys);

  return {
    exec: function exec(str) {
      var matches = re.exec(str);
      if (!matches) return null;

      return __WEBPACK_IMPORTED_MODULE_5_lodash_reduce___default()(__WEBPACK_IMPORTED_MODULE_4_lodash_tail___default()(matches), function (obj, match, i) {
        if (!match) return obj;

        obj[keys[i].name] = match;
        return obj;
      }, {});
    }
  };
}

/**
 * Takes multiple route definitions and returns a single
 * parse function to match against all the definitions
 * Example of a definition: {
 *   SomeRoute: [Component, '/some/:named/:path*']
 * }
 * @param {Object} definitions
 * @returns {Function} parser
 */
function routeMapper(definitions) {
  var parsers = __WEBPACK_IMPORTED_MODULE_3_lodash_map___default()(definitions, function definitionsToParser(def, name) {
    var parser = routeParser(def[1]);
    return function exec(str) {
      var params = parser.exec(str);
      if (!params) return null;
      return { name: name, params: params };
    };
  });

  return function parser(str) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = parsers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var parse = _step.value;

        var result = parse(str);
        if (result) return result;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  };
}

/**
 * Main router function; takes a set of route definitions and
 * returns a relm component which utilizies those routes
 * Example of a definition: {
 *   SomeRoute: [Component, '/some/:named/:path*']
 * }
 * @param {Object} routeDefinitions
 * @returns {Object} component
 */
function router(routeDefinitions) {
  if (false) {
    (function () {
      var Path = t.refinement(t.String, function (x) {
        return _startsWith('/', x);
      }, 'Path');

      var RouteWithoutOptions = t.tuple([Component, Path], '-');
      var RouteWithOptions = t.tuple([Component, Path, t.Boolean], '-');

      var RouteDefinition = t.union([RouteWithoutOptions, RouteWithOptions], 'Route');

      RouteDefinition.dispatch = function (x) {
        return x.length > 2 ? RouteWithOptions : RouteWithoutOptions;
      };

      t.dict(t.String, RouteDefinition, 'Routes')(routeDefinitions);
    })();
  }

  var parseRoute = routeMapper(routeDefinitions);

  function Router(html, params) {
    var props = params.props;
    var children = params.children;
    var components = params.components;


    var url = props.url || '';
    var prefixedUrl = __WEBPACK_IMPORTED_MODULE_2_lodash_startsWith___default()(url, '/') ? url : '/' + url;
    var route = parseRoute(prefixedUrl);
    if (!route) return null;

    var child = components[route.name];
    var childProps = __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default()(props, route.params);

    return child(childProps, children);
  }

  Router.components = __WEBPACK_IMPORTED_MODULE_0_lodash_mapValues___default()(routeDefinitions, function (def) {
    return def[0];
  });

  return Router;
}

var internals = {
  routeParser: routeParser,
  routeMapper: routeMapper
};

/***/ }

},[313])
});
;