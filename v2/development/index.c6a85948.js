// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"imXqX":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "83e4c3f4c6a85948";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"izKfH":[function(require,module,exports) {
var _appJs = require("./javascript/api/app.js");
var _timerJs = require("./javascript/components/Timer.js");
/*
    TODO

    UI UPDATES

        scale down timer size
        redo add menu
        add sounds
        timer blinker (playing|pausing|pomodoro indicator)


    FEATURE UPDATES
        add pomodoro timer
        add extend current timer feature
    
    API UPDATES
    tracker tags && logging
        ** {
            select from quick task [over-arching tasks]
                -- adds up weekly total
                -- tracks times started and ended across week
                -- tracks over achieved, under achieved, achieved

            select timing goals for under over tasks
                -- read *over* 20hrs/week
                -- code *over* 20hrs/week
                -- clean *under* 8hrs/week
            advanced settings for specific goals and time management

            [task]('specifics') *in* allotedTime {on} |day or week of| 
                -- [read] ('building a second brain') *under* 4hrs/{this}|monday||week|
        }

        ** {
            on start/stop log to server [taskname,id] => started stoped finished for [time]
        }

        ** {
            add tasklog collection to db 
                tasks
                task-logs
        }
*/ const timerTab = $("#timers");
const trackerTab = $("#trackers");
const dashboard = $(".dashboard");
const appRoot = $("#app");
let trackers, timers;
const ready = (async ()=>{
    await (0, _appJs.api).getTimers((data)=>{
        const fragment = frag();
        const renderFilteredMap = (props)=>{
            const t = new (0, _timerJs.Timer)({
                props
            });
            return !!t.isToday;
        };
        timers = data.filter(renderFilteredMap).map((props)=>{
            const timer = new (0, _timerJs.Timer)({
                props
            });
            return timer;
        });
        timers.length == 0 ? fragment.innerHTML = "No Trackers Today" : timers.forEach((timer)=>{
            timer.render(fragment);
        });
    });
    await (0, _appJs.api).getTrackers((data)=>{
        const fragment = frag();
        if (data.length == 0) fragment.innerHTML = "No Trackers";
        else trackers = data.map((props)=>{
            const tracker = new (0, _timerJs.TimeTracker)({
                props
            });
            tracker.render(fragment);
            return tracker;
        });
    });
    return true;
})();
const readySetGo = async ()=>{
    await ready;
    const test = await (0, _appJs.api).getTimers();
    console.dir({
        description: "API META DATA",
        trackers,
        timers
    });
};
readySetGo();

},{"./javascript/api/app.js":"fiBJ0","./javascript/components/Timer.js":"cyvjG"}],"fiBJ0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "api", ()=>api);
var api = {
    async getTimers (effect) {
        const res = await axios.get("http://localhost:1279/timers/meta");
        const { data } = res;
        // console.log(data);
        if (responseOk(res)) {
            if (effect) effect(data);
            return data;
        } else console.error("someting went wrong in /timers", res);
        return false;
    },
    async getTrackers (effect) {
        const res = await axios.get("http://localhost:1279/trackers/meta");
        const { data } = res;
        if (responseOk(res)) {
            if (effect) effect(data);
            return data;
        } else console.error("something went wrong in /trackers");
        return false;
    },
    async addTimer (body, effect) {
        console.log("posting to api", body);
        const res = await axios.post("http://localhost:1279/timers/api", body);
        const { data } = res;
        console.log("response data came back from post", data);
        if (responseOk(res)) {
            if (effect) {
                console.log("effect triggered");
                effect(data);
            }
            return data;
        } else console.error("someting went wrong in /timers", res);
        return false;
    },
    async addTracker (body, effect) {
        console.log("posting to api", body);
        const res = await axios.post("http://localhost:1279/trackers/api", body);
        const { data } = res;
        if (responseOk(res)) {
            if (effect) {
                console.log("effect triggered");
                effect(data);
            }
            return data;
        } else console.error("someting went wrong in /trackers", res);
        return false;
    },
    async delete (id) {
        console.log(id);
        const res = await axios.delete(`http://localhost:1279/timers?id=${id}`);
        console.log(res);
        if (responseOk(res)) return true;
        return false;
    },
    async edit (id, body) {
        const res = await axios.patch(`http://localhost:1279/timers/api?id=${id}`, body);
        const { data } = res;
        console.log(res);
        if (responseOk(res)) return data;
        return false;
    },
    async log (data) {
        const res = await axios.post(`http://localhost:1279/timers/logs`, data);
    }
};
function responseOk(response) {
    // axios
    return response.status === 200 && response.statusText === "OK";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cyvjG":[function(require,module,exports) {
/* 
    TODO 

    CREATE SECTION FOR ALL TRACKERS

    UPDATE UI DESIGN
        --add sound
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Timer", ()=>Timer);
parcelHelpers.export(exports, "TimeTracker", ()=>TimeTracker);
var _app = require("../api/app");
class Timer {
    // DEFAULTS TO COUNTDOWN
    constructor({ props }){
        this.once = false;
        this.currentInterval = null;
        this.days = props.days || [];
        this.title = props.title;
        this.time = props.time;
        this.initial = props.initial || structuredClone(props.time);
        this.id = props.id || uuid();
        this.element = undefined;
        let today = new Date();
        let dow = [
            "sun",
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat"
        ];
        this.isToday = this.days.some((day)=>day === dow[today.getDay()]) || null;
        this.refs = [];
    }
    padNum(num) {
        if (num.toString().length == 1) return num.toString().padStart(2, "0");
        else return num.toString();
    }
    formatTime() {
        let { hours, minutes, seconds } = this.time, h = this.padNum(hours), m = this.padNum(minutes), s = this.padNum(seconds);
        return {
            h,
            m,
            s
        };
    }
    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countdown.bind(this), 1000);
    }
    decer() {
        let t = Timer.formatMs(this.time.total - 1000);
        if (Math.round(t.total) <= 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t;
        }
        return t;
    }
    incer() {
        let t = Timer.formatMs(this.time.total + 1000);
        if (Math.round(t.total) < 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t;
        }
        return t;
    }
    pause() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        return;
    }
    stop() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
    }
    reset() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.time = structuredClone(this.initial);
    }
    resetView() {
        this.showPaused();
        this.reset();
        this.update();
    }
    countdown() {
        this.time = this.decer();
        // change to show complete;
        if (this.time.total <= 0) return this.resetView();
        this.update();
    }
    create(type) {
        let html = this.createTimerElement(type);
        let fragment = frag();
        let element = div();
        element.innerHTML = html;
        fragment.appendChild(element);
        return fragment;
    }
    showPlaying() {
        if (!this.element) return;
        function togglePlayButton(element) {
            $(".pause", element).classList.add("current");
            $(".play", element).classList.remove("current");
        }
        togglePlayButton(this.element);
        togglePlayButton(this.clone);
        return;
    }
    showPaused() {
        if (!this.element) return;
        function togglePauseButton(element) {
            $(".play", element).classList.add("current");
            $(".pause", element).classList.remove("current");
        }
        togglePauseButton(this.element);
        togglePauseButton(this.clone);
    }
    render(destination, type) {
        const frag1 = this.create(type);
        let element = $(`[data-id="${this.id}"]`, frag1);
        destination.appendChild(frag1);
        this.hydrate(element);
        this.element = element;
    }
    renderClone(type) {
        const location = $(".current-timer");
        const title = $(".section-title", location);
        title.textContent = this.title;
        this.clone = location;
        this.hydrate(location);
    }
    hydrate(element) {
        listen($(".ctrl-wrapper", element), ()=>{
            if (!this.currentInterval) {
                this.renderClone();
                this.showPlaying();
                this.play();
            } else if (this.currentInterval) {
                this.showPaused();
                this.pause();
                app.current_timer.playing = false;
            }
        });
        listen($(".reset", element), this.resetView.bind(this));
        listen($(".delete", element), this.delete.bind(this));
        listen($(".edit", element), this.showEditForm.bind(this));
    }
    update() {
        if (!this.element) return;
        const updateView = (element)=>$(".time-slot", element).innerHTML = this.createTimeSlot();
        updateView(this.element);
        updateView(this.clone);
    }
    showEditForm() {
        let form = div();
        form.innerHTML = this.createEditForm(this.successTime ? this.successTime : this.time);
        hydrateForm.call(this);
        form.classList.add("edit-timer");
        form.style.display = "block";
        let currentForm = $(".timer-list .edit-timer");
        if (currentForm) currentForm.remove(form);
        $(".timer-list").appendChild(form);
        function hydrateForm() {
            const timerDayInputs = $$('.inp-field[data-type="day"] input[type="checkbox"]', form);
            // const timerTimeInputs = $$('.inp-field input[data-type="time"]',form);
            const timerNeverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]', form);
            const timerEveryInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]', form);
            listen(timerNeverInput, function toggleEveryInput() {
                if (timerNeverInput.checked) {
                    uncheck(timerEveryInput);
                    uncheckAll(timerDayInputs);
                }
            }, "input");
            listen(timerEveryInput, function toggleNeverInput() {
                if (timerEveryInput.checked) {
                    uncheck(timerNeverInput);
                    checkAll(timerDayInputs);
                }
            }, "input");
            timerDayInputs.forEach(function EVENTS__dayInputs(inp) {
                inp.addEventListener("input", ()=>{
                    // handle all checked
                    if (oneUnchecked(timerDayInputs)) uncheck(timerEveryInput);
                    else if (allChecked(timerDayInputs)) check(timerEveryInput);
                    // handle none checked
                    if (oneChecked(timerDayInputs)) uncheck(timerNeverInput);
                    else if (noneChecked(timerDayInputs)) check(timerNeverInput);
                });
            });
            form.addEventListener("submit", (e)=>submit.call(this, e, form));
            form.querySelector(".close").addEventListener("click", ()=>{
                form.remove();
            });
            async function submit(event, formElement) {
                event.preventDefault();
                const fdo = new FormData(formElement);
                let props = parseForm(fdo, formElement);
                props.id = this.id;
                let newDoc = await (0, _app.api).edit(this.id, props);
                if (newDoc) {
                    this.edit(newDoc);
                    formElement.remove();
                }
            }
        }
        function parseForm(formDataObject, formElement) {
            let fdo = formDataObject;
            for (const entry of fdo)if (entry[1].trim() === "") entry[1] = 0;
            // Get the values of the checkboxes for days
            let days = [
                "mon",
                "tue",
                "wed",
                "thu",
                "fri",
                "sat",
                "sun"
            ].filter((day)=>{
                let checkbox = $(`.inp-field[data-type="day"] input[name="day"][data-day="${day}"]`, formElement);
                if (checkbox && checkbox.checked) {
                    console.log(day);
                    return true;
                }
            });
            console.log(days);
            let title = fdo.get("title"), hours = fdo.getAll("hours").join(""), minutes = fdo.getAll("minutes").join(""), seconds = fdo.getAll("seconds").join(""), total = Timer.timeInMs({
                hours,
                minutes,
                seconds
            }), id = uuid(), time = {
                hours,
                minutes,
                seconds,
                total
            }, initial = time;
            return {
                title,
                id,
                time,
                days,
                initial
            };
        }
    }
    edit(props) {
        this.days = props.days || [];
        this.title = props.title;
        this.time = props.time;
        this.initial = props.initial || structuredClone(props.time);
        this.id = props.id || uuid();
        let today = new Date();
        let dow = [
            "sun",
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat"
        ];
        this.isToday = this.days.some((day)=>day === dow[today.getDay()]) || null;
        const frag1 = this.create();
        this.element = $(`[data-id="${this.id}"]`, frag1);
        $(`[data-id="${this.id}"]`, $(".timer-list")).replaceWith(this.element);
        this.hydrate();
    }
    async delete() {
        console.log((0, _app.api), "delete");
        const deleted = (0, _app.api).delete(this.id);
        if (deleted) {
            this.element.remove();
            this.refs.forEach((ref)=>ref.remove());
            this.element = null;
            app.current_timer.playing = false;
            app.current_timer.reference = null;
        }
    }
    static timeInMs({ hours, minutes, seconds }) {
        // convert all to ms
        let msSeconds = seconds * 1000, msMinutes = minutes * 60000, msHours = hours * 3600000;
        return msHours + msSeconds + msMinutes;
    }
    static formatMs(ms) {
        const msInSeconds = 1000;
        const msInMinutes = 60000;
        const msInHours = 3600000;
        const approxHour = ms / 3600000;
        const hours = Math.floor(approxHour);
        const hoursFloat = approxHour - hours;
        const approxMinutes = hoursFloat * msInHours / msInMinutes;
        const minutes = Math.floor(approxMinutes);
        const minutesFloat = approxMinutes - minutes;
        const seconds = Math.round(minutesFloat * msInMinutes / msInSeconds);
        return {
            hours,
            minutes,
            seconds,
            total: ms
        };
    }
    createTimerElement(type = "timer") {
        let { h, m, s } = this.formatTime();
        return `
    <div class="timer" data-id="${this.id}">
    <div class="timer--clock-controls">
        <div class="ctrl-wrapper">
            <div class="play ctrl current">
                <span class="control">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                </span>
            </div>
            <div class="pause ctrl">
                <span class="control">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  height="40px" width="40px">
                        <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                        <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path>
                    </svg>
                </span>
            </div>
        </div>
    </div>

    <div class="timer-title">${this.title}</div>
    <div class="time-slot"> ${h}:${m}:${s}</div>
    </div>
    `;
    }
    createTimeSlot({ hours, minutes, seconds } = this.time) {
        let { h, m, s } = this.formatTime();
        return `<div class="time-slot"> ${h}:${m}:${s}</div>`;
    }
    createEditForm({ hours, minutes, seconds }) {
        let h = this.padNum(hours), m = this.padNum(minutes), s = this.padNum(seconds);
        return `                
        <form action="#" id="edit-timer">

        <div class="close">x</div>
        <div class="new-timer--form">
            <div class="new-timer--form-field" data-field="title">
                <span class="inp-field" data-type="title">
                    <span class="label">Title</span>
                    <input type="text" name="title" id="form-title" autocomplete="off" value="${this.title}" required>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="time">
                <span class="inp-field" data-type="hours">
                    <input name="hours" id="nHours" value="${h[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="hours" id="0Hours" value="${h[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">h</span>
                </span>
                <span class="inp-field" data-type="minutes">
                    <input name="minutes" id="nMinutes" value="${m[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="minutes" id="0Minutes" value="${m[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">m</span>
                </span>
                <span class="inp-field" data-type="seconds">
                    <input name="seconds" id="nSeconds" value="${s[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="seconds" id="0Seconds" value="${s[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">s</span>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="occurance">
                <div class="inp-field" data-type="day">
                    <label for="mon">
                        <span class="label">M</span>
                    </label>
                    <input type="checkbox" name="day" data-day="mon" ${this.days.some((day)=>day === "mon") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="tue">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="tue" id="tue"${this.days.some((day)=>day === "tue") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="wed">
                        <span class="label">W</span>
                    </label>
                    <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${this.days.some((day)=>day === "wed") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="thu">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="thu" id="thu"${this.days.some((day)=>day === "thu") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="fri">
                        <span class="label">F</span>
                    </label>
                    <input type="checkbox" name="day" data-day="fri" id="fri"${this.days.some((day)=>day === "fri") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sat">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sat" id="sat"${this.days.some((day)=>day === "sat") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sun">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sun" id="sun"${this.days.some((day)=>day === "sun") ? "checked" : null}>
                </div>
                <div class="inp-field" data-type="binary">
                    <div class="option" data-option="never">
                        <label for="never">
                            <span class="label">never</span>
                        </label>
                        <input type="checkbox" name="never" id="never" ${this.days.length == 0 ? "checked" : null}>
                    </div>
                    <div class="option" data-option="every">
                        <label for="everyday">
                            <span class="label">everyday</span>
                        </label>
                        <input type="checkbox" name="every" id="every" ${this.days.length == 7 ? "checked" : null}>
                    </div>
                </div>
            </div>
            <div class="tod-modal">
                <div class="option selected">
                    <span class="label">ANY</span>
                </div>
                <div class="option">
                    <div class="hour">
                        <span class="nHour">05</span>
                        <span class="breaker">:</span>
                        <span class="0hour">00</span>
                    </div>
                    <div class="minute"></div>
                </div>
            </div>
            <span class="btn-create">
                <span class="label">Edit</span>
                <input type="submit" name="create" id="btn-create">
            </span>
        </div>
    </form>`;
    }
}
class TimeTracker extends Timer {
    constructor({ props }){
        super({
            props
        });
        this.logs = [];
        this.initial = Timer.formatMs(0);
        this.successTime = props.successTime;
        this.onSuccess = props.onSucces || function() {
            console.log(`${this.title} tracker has completed`);
            if (this.element) $(".timer", this.element).classList.add("complete");
        };
        this.success = false;
        this.resetAfterSuccess = props.resetOnSuccess || false;
    }
    countup() {
        this.time = this.incer();
        if (this.success === false && this.time.total >= this.successTime.total) {
            this.success = true;
            this.onSuccess();
        }
        if (this.resetOnSuccess) return this.resetView();
        else this.update();
    }
    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countup.bind(this), 1000);
        this.logStart();
    }
    pause() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        this.logStop();
        return;
    }
    async logStart() {
        let stamp = DateTime.stamp();
        let log = {
            type: "start",
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            stamp
        };
        console.log(log);
        this.logs.push(log);
        const success = await (0, _app.api).log(log);
        if (success) console.log(success);
        else console.error(success);
        return log;
    }
    async logStop() {
        let stamp = DateTime.stamp();
        let completed = this.time.total >= this.successTime.total;
        let prevLog = last(this.logs);
        let comp = DateTime.from(new Date(prevLog.stamp.ms));
        let since = {
            hours: comp.hours,
            minutes: comp.minutes,
            seconds: comp.seconds
        };
        let log = {
            type: "stop",
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            sinceLastStop: since,
            completed,
            stamp
        };
        const success = await (0, _app.api).log(log);
        if (success) console.log(success);
        else console.error(success);
        return log;
    }
    logComplete() {}
}

},{"../api/app":"fiBJ0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["imXqX","izKfH"], "izKfH", "parcelRequireb44e")

//# sourceMappingURL=index.c6a85948.js.map
