'use strict';

/**
 * @const breadcrumbs
 * @type {Array} of objects of type {name, url}
 */
const breadcrumbs = [];

let _config;

/**
 * @function exists
 * @param {Object}
 * @returns index of the same object as a new crumb within an array of breadcrumbs
 */
const exists = obj => breadcrumbs.findIndex(crumb => crumb.name === obj.name && crumb.url === obj.url);

/**
 * @function exists
 * @param {Object}
 * @returns index of an object whose url is included into url of the new crumb within an array of breadcrumbs
 */
const isInner = obj => breadcrumbs.findIndex(crumb => obj.url.includes(`${crumb.url}/`));

const isDebug = function(){
  return _config && _config.debug;
};

/**
 * @function addBreadcrumbs getter/setter for breadcrumbs
 * @param {Object}
 */
const addBreadcrumbs = (crumb, options) => {
  if (!crumb) return breadcrumbs;

  options = options || {};

  const idx = exists(crumb);
  const idxOuter = isInner(crumb);

  if(isDebug()){
    console.log("[breadcrumbs] adding breadcrumb", crumb, idx, idxOuter, breadcrumbs.length);
  }

  if(options.maxDepth != null && options.maxDepth < breadcrumbs.length){
    if(isDebug()){
      console.log('[breadcrumbs] spliced to max depth', options.maxDepth);
    }
    breadcrumbs.splice(options.maxDepth, breadcrumbs.length);
  }

  if(breadcrumbs.length === 1 && idx === -1) {
    breadcrumbs.push(crumb);
    return;
  }

  if(idx > -1 && breadcrumbs.length > idx+1){
    breadcrumbs.splice(idx+1, breadcrumbs.length);
    if(isDebug()){
      console.log("[breadcrumbs] spliced to existing breadcrumb", idx, breadcrumbs.length);
    }
    return;
  }

  if(idxOuter !== -1){
    if(idxOuter !== breadcrumbs.length - 1){
      breadcrumbs.splice(idxOuter + 1, breadcrumbs.length);
    }
    breadcrumbs.push(crumb);
    return;
  }

  
  //breadcrumbs.splice(1, breadcrumbs.length);
  breadcrumbs.push(crumb);

  
};

/**
 * @function setHome sets home page location
 * @param {Object}
 */
const setHome = ({name = 'Home', url = '/'}) => breadcrumbs.push({name, url});

/**
 * @function init attaches method to req object
 * @return {Function}
 */
const init = function () {
  return function (req, res, next) {
    req.breadcrumbs = addBreadcrumbs;
    next();
  };
};

const configure = function (config) {
  _config = config;
};

module.exports = {
  setHome,
  init,
  configure
};
