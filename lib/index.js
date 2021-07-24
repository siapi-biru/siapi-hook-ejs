'use strict';

/**
 * Module dependencies
 */

// Native
const path = require('path');

// Externals
const co = require('co');
const render = require('koa-ejs');

/**
 * EJS hook
 */

module.exports = function(siapi) {
  const hook = {
    /**
     * Default options
     */

    defaults: {
      root: path.join(siapi.config.appPath, siapi.config.paths.views),
      layout: 'layout',
      viewExt: 'ejs',
      cache: true,
      debug: true,
    },

    /**
     * Initialize the hook
     */

    initialize() {
      // Force cache mode in production
      if (siapi.config.environment === 'production') {
        siapi.config.hook.settings.ejs.cache = true;
      }

      render(
        siapi.app,
        Object.assign(this.defaults, siapi.config.hook.settings.ejs)
      );

      siapi.app.context.render = co.wrap(siapi.app.context.render);
    },
  };

  return hook;
};
