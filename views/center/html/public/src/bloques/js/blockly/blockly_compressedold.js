"use strict";

var COMPILED = !0,
    goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
};
goog.define = function(a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c)
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (!COMPILED && goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
    goog.constructNamespace_(a)
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;
            (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0
    }
    goog.exportPath_(a, b)
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a]
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a)
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
};
goog.forwardDeclare = function(a) {};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
}, goog.implicitNamespaces_ = {
    "goog.module": !0
});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
        if (goog.isDefAndNotNull(d[e])) d = d[e];
        else return null;
    return d
};
goog.globalize = function(a, b) {
    var c = b || goog.global,
        d;
    for (d in a) c[d] = a[d]
};
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e;
        a = a.replace(/\\/g, "/");
        for (var f = goog.dependencies_, g = 0; e = b[g]; g++) f.nameToPath[e] = a, f.pathIsModule[a] = !!d;
        for (d = 0; b = c[d]; d++) a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
        if (goog.isProvided_(a)) return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.getPathFromDeps_(a);
            if (b) return goog.writeScripts_(b), null
        }
        a = "goog.require could not find: " + a;
        goog.logToConsole_(a);
        throw Error(a);
    }
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        if (a.instance_) return a.instance_;
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a
    }
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
        pathIsModule: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    }, goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return null != a && "write" in a
    }, goog.findBasePath_ = function() {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_())
            for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
                var c = a[b].src,
                    d = c.lastIndexOf("?"),
                    d = -1 == d ? c.length :
                    d;
                if ("base.js" == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break
                }
            }
    }, goog.importScript_ = function(a, b) {
        (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0)
    }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importModule_ = function(a) {
        goog.importScript_("", 'goog.retrieveAndExecModule_("' + a + '");') && (goog.dependencies_.written[a] = !0)
    }, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
        return goog.LOAD_MODULE_USING_EVAL &&
            goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n"
    }, goog.loadQueuedModules_ = function() {
        var a = goog.queuedModules_.length;
        if (0 < a) {
            var b = goog.queuedModules_;
            goog.queuedModules_ = [];
            for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c])
        }
    }, goog.maybeProcessDeferredDep_ = function(a) {
        goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a),
            goog.maybeProcessDeferredPath_(goog.basePath + a))
    }, goog.isDeferredModule_ = function(a) {
        return (a = goog.getPathFromDeps_(a)) && goog.dependencies_.pathIsModule[a] ? goog.basePath + a in goog.dependencies_.deferred : !1
    }, goog.allDepsAreAvailable_ = function(a) {
        if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires)
            for (var b in goog.dependencies_.requires[a])
                if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
        return !0
    }, goog.maybeProcessDeferredPath_ = function(a) {
        if (a in goog.dependencies_.deferred) {
            var b =
                goog.dependencies_.deferred[a];
            delete goog.dependencies_.deferred[a];
            goog.globalEval(b)
        }
    }, goog.loadModuleFromUrl = function(a) {
        goog.retrieveAndExecModule_(a)
    }, goog.loadModule = function(a) {
        var b = goog.moduleLoaderState_;
        try {
            goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareLegacyNamespace: !1
            };
            var c;
            if (goog.isFunction(a)) c = a.call(goog.global, {});
            else if (goog.isString(a)) c = goog.loadModuleFromSource_.call(goog.global, a);
            else throw Error("Invalid module definition");
            var d = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(d) || !d) throw Error('Invalid module name "' + d + '"');
            goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
            goog.loadedModules_[d] = c
        } finally {
            goog.moduleLoaderState_ = b
        }
    }, goog.loadModuleFromSource_ = function(a) {
        eval(a);
        return {}
    }, goog.writeScriptSrcNode_ = function(a) {
        goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
    }, goog.appendScriptSrcNode_ = function(a) {
        var b = goog.global.document,
            c = b.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        c.defer = !1;
        c.async = !1;
        b.head.appendChild(c)
    }, goog.writeScriptTag_ = function(a, b) {
        if (goog.inHtmlDocument_()) {
            var c = goog.global.document;
            if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
                if (/\bdeps.js$/.test(a)) return !1;
                throw Error('Cannot write "' + a + '" after document load');
            }
            var d = goog.IS_OLD_IE_;
            void 0 === b ? d ? (d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write('<script type="text/javascript" src="' +
                a + '"' + d + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a) : c.write('<script type="text/javascript">' + b + "\x3c/script>");
            return !0
        }
        return !1
    }, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
        "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
        return !0
    }, goog.writeScripts_ = function(a) {
        function b(a) {
            if (!(a in e.written || a in e.visited)) {
                e.visited[a] = !0;
                if (a in e.requires)
                    for (var f in e.requires[a])
                        if (!goog.isProvided_(f))
                            if (f in
                                e.nameToPath) b(e.nameToPath[f]);
                            else throw Error("Undefined nameToPath for " + f);
                a in d || (d[a] = !0, c.push(a))
            }
        }
        var c = [],
            d = {},
            e = goog.dependencies_;
        b(a);
        for (a = 0; a < c.length; a++) {
            var f = c[a];
            goog.dependencies_.written[f] = !0
        }
        var g = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;
        for (a = 0; a < c.length; a++)
            if (f = c[a]) e.pathIsModule[f] ? goog.importModule_(goog.basePath + f) : goog.importScript_(goog.basePath + f);
            else throw goog.moduleLoaderState_ = g, Error("Undefined script input");
        goog.moduleLoaderState_ = g
    }, goog.getPathFromDeps_ =
    function(a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
    }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return b.responseText
};
goog.retrieveAndExecModule_ = function(a) {
    if (!COMPILED) {
        var b = a;
        a = goog.normalizePath_(a);
        var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
            d = goog.loadFileSync_(a);
        if (null != d) d = goog.wrapModule_(a, d), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[b] = d, goog.queuedModules_.push(b)) : c(a, d);
        else throw Error("load of " + a + "failed");
    }
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
};
goog.isNull = function(a) {
    return null === a
};
goog.isDefAndNotNull = function(a) {
    return null != a
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
    return "string" == typeof a
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a
};
goog.isNumber = function(a) {
    return "number" == typeof a
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
};
goog.mixin = function(a, b) {
    for (var c in b) a[c] = b[c]
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
};
goog.globalEval = function(a) {
    if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (null == goog.evalWorksForGlobals_)
            if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (d) {}
                goog.evalWorksForGlobals_ = !0
            } else goog.evalWorksForGlobals_ = !1;
        if (goog.evalWorksForGlobals_) goog.global.eval(a);
        else {
            var b = goog.global.document,
                c = b.createElement("SCRIPT");
            c.type = "text/javascript";
            c.defer = !1;
            c.appendChild(b.createTextNode(a));
            b.body.appendChild(c);
            b.body.removeChild(c)
        }
    } else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    var c = function(a) {
            return goog.cssNameMapping_[a] || a
        },
        d = function(a) {
            a = a.split("-");
            for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
            return b.join("-")
        },
        d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
            return a
        };
    return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a
    }));
    return a
};
goog.getMsgWithFallback = function(a, b) {
    return a
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
    a[b] = c
};
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[c].apply(a, g)
    }
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
        return d.superClass_.constructor.apply(a, e)
    }
    e = Array(arguments.length - 2);
    for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
    for (var f = !1, g = a.constructor; g; g =
        g.superClass_ && g.superClass_.constructor)
        if (g.prototype[b] === d) f = !0;
        else if (f) return g.prototype[b].apply(a, e);
    if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    a.call(goog.global)
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor,
        d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
        if (b && b.prototype && b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return a;
        var c = function() {
            var b = a.apply(this, arguments) || this;
            b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
            this.constructor === c && Object.seal(b);
            return b
        };
        return c
    }
    return a
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    return d + c.join("%s")
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.isEmptyString = function(a) {
    return 0 == a.length
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
    return " " == a
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(),
        d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
    if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
            "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
    }
    return a
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        },
        d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var g = c[a];
        if (g) return g;
        if ("#" == b.charAt(0)) {
            var h = +("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h))
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g
    })
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = +("0" + c.substr(1));
                    if (!isNaN(d)) return String.fromCharCode(d)
                }
                return a
        }
    })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    }
    return a
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b = a,
        c = a.charCodeAt(0);
    if (31 < c && 127 > c) b = a;
    else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) b += "0"
        } else b = "\\u", 4096 > c && (b += "0");
        b += c.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = b
};
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b)
};
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase())
};
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
} : function(a, b) {
    return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf("."); - 1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
        var h = d[g] || "",
            k = e[g] || "",
            l = RegExp("(\\d*)(\\D*)", "g"),
            p = RegExp("(\\d*)(\\D*)", "g");
        do {
            var m = l.exec(h) || ["", "", ""],
                q = p.exec(k) || ["", "", ""];
            if (0 == m[0].length && 0 == q[0].length) break;
            var c = 0 == m[1].length ? 0 : parseInt(m[1], 10),
                n = 0 == q[1].length ? 0 : parseInt(q[1], 10),
                c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 ==
                    m[2].length, 0 == q[2].length) || goog.string.compareElements_(m[2], q[2])
        } while (0 == c)
    }
    return c
};
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
    var b = +a;
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a)
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase()
    })
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase()
    })
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    a.length && d.push(a.join(b));
    return d
};
goog.string.editDistance = function(a, b) {
    var c = [],
        d = [];
    if (a == b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + +(a[e] != b[f]));
        for (f = 0; f < c.length; f++) c[f] = d[f]
    }
    return d[b.length]
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) var e = e + (": " + c),
        f = d;
    else a && (e += ": " + a, f = b);
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a)
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1]
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c)
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    for (; 0 <= c; c--)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
};
goog.array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k)
        }
    return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
    return e
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return !0;
    return !1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a)) return !1;
    return !0
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
    return -1
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a)) return d;
    return -1
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
    return 0 == a.length
};
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b),
        d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
    });
    return d
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
    }
    return []
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    };
    c = c || d;
    for (var d = {}, e = 0, f = 0; f < a.length;) {
        var g = a[f++],
            h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g)
    }
    b.length = e
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g;) {
        var k = f + g >> 1,
            l;
        l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l)
    }
    return h ? f : ~f
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
    for (var c = 0; c < a.length; c++) a[c] = {
        index: c,
        value: a[c]
    };
    var d = b || goog.array.defaultCompare;
    goog.array.sort(a, function(a, b) {
        return d(a.value, b.value) || a.index - b.index
    });
    for (c = 0; c < a.length; c++) a[c] = a[c].value
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b]
    }, c)
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) return !1
    }
    return !0
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e])) return !1;
    return !0
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f) return f
    }
    return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b)
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e],
            g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
    }
    return d
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
};
goog.array.range = function(a, b, c) {
    var d = [],
        e = 0,
        f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) return [];
    if (0 < c)
        for (a = e; a < f; a += c) d.push(a);
    else
        for (a = e; a > f; a += c) d.push(a);
    return d
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++) c[d] = a;
    return c
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArray(d))
            for (var e = 0; e < d.length; e += 8192)
                for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) b.push(f[g]);
        else b.push(d)
    }
    return b
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0])
};
goog.array.zip = function(a) {
    if (!arguments.length) return [];
    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
    for (d = 0; d < c; d++) {
        for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
        b.push(e)
    }
    return b
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
        var e = Math.floor(c() * (d + 1)),
            f = a[d];
        a[d] = a[e];
        a[e] = f
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
};
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
};
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(b, a)
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(b, a)
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
    for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
    return c
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
};
goog.object.filter = function(a, b, c) {
    var d = {},
        e;
    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d
};
goog.object.map = function(a, b, c) {
    var d = {},
        e;
    for (e in a) d[e] = b.call(c, a[e], e, a);
    return d
};
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return !0;
    return !1
};
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a)) return !1;
    return !0
};
goog.object.getCount = function(a) {
    var b = 0,
        c;
    for (c in a) b++;
    return b
};
goog.object.getAnyKey = function(a) {
    for (var b in a) return b
};
goog.object.getAnyValue = function(a) {
    for (var b in a) return a[b]
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = a[d];
    return b
};
goog.object.getKeys = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = d;
    return b
};
goog.object.getValueByKeys = function(a, b) {
    for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++);
    return a
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a
};
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b) return !0;
    return !1
};
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return d
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
    for (var b in a) return !1;
    return !0
};
goog.object.clear = function(a) {
    for (var b in a) delete a[b]
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
    a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) return a[b];
    c = c();
    return a[b] = c
};
goog.object.equals = function(a, b) {
    for (var c in a)
        if (!(c in b) || a[c] !== b[c]) return !1;
    for (c in b)
        if (!(c in a)) return !1;
    return !0
};
goog.object.clone = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = a[c];
    return b
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.object.unsafeClone(a[c]);
        return b
    }
    return a
};
goog.object.transpose = function(a) {
    var b = {},
        c;
    for (c in a) b[a[c]] = c;
    return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (b % 2) throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
    return c
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a)
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR")
};
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
};
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
};
goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
};
goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_()
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
};
goog.labs.userAgent.browser.getVersion = function() {
    function a(a) {
        a = goog.array.find(a, d);
        return c[a] || ""
    }
    var b = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
    var b = goog.labs.userAgent.util.extractVersionTuples(b),
        c = {};
    goog.array.forEach(b, function(a) {
        c[a[0]] = a[1]
    });
    var d = goog.partial(goog.object.containsKey, c);
    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera", "OPR"]) : goog.labs.userAgent.browser.isEdge() ?
        a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1]) return b[1];
    var b = "",
        c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
        if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
            if (a && a[1]) switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0"
            } else b = "7.0";
            else b = c[1];
    return b
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
};
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent();
    if (a) {
        var a = goog.labs.userAgent.util.extractVersionTuples(a),
            b = goog.labs.userAgent.engine.getEngineTuple_(a);
        if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
        var a = a[0],
            c;
        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
    }
    return ""
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
    if (!goog.labs.userAgent.engine.isEdge()) return a[1];
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("Edge" == c[0]) return c
    }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
    var c = goog.array.find(a, function(a) {
        return b == a[0]
    });
    return c && c[1] || ""
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
};
goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
};
goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
};
goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
};
goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
};
goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
};
goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
};
goog.labs.userAgent.platform.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent(),
        b = "";
    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
        b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
    return b || ""
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
};
goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigator();
    return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
    var a = goog.userAgent.getNavigator();
    return !!a && goog.string.contains(a.appVersion || "", "X11")
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.operaVersion_ = function() {
    var a = goog.global.opera.version;
    try {
        return a()
    } catch (b) {
        return a
    }
};
goog.userAgent.determineVersion_ = function() {
    if (goog.userAgent.OPERA && goog.global.opera) return goog.userAgent.operaVersion_();
    var a = "",
        b = goog.userAgent.getVersionRegexResult_();
    b && (a = b ? b[1] : "");
    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getVersionRegexResult_ = function() {
    var a = goog.userAgent.getUserAgentString();
    if (goog.userAgent.GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
    if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a)
};
goog.userAgent.getDocumentMode_ = function() {
    var a = goog.global.document;
    return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
    return +goog.userAgent.DOCUMENT_MODE >= a
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
    var a = goog.global.document,
        b = goog.userAgent.getDocumentMode_();
    return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
}();
goog.Thenable = function() {};
goog.Thenable.prototype.then = function(a, b, c) {};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
    goog.exportProperty(a.prototype, "then", a.prototype.then);
    COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0
};
goog.Thenable.isImplementedBy = function(a) {
    if (!a) return !1;
    try {
        return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable
    } catch (b) {
        return !1
    }
};
goog.async = {};
goog.async.FreeList = function(a, b, c) {
    this.limit_ = c;
    this.create_ = a;
    this.reset_ = b;
    this.occupants_ = 0;
    this.head_ = null
};
goog.async.FreeList.prototype.get = function() {
    var a;
    0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
    return a
};
goog.async.FreeList.prototype.put = function(a) {
    this.reset_(a);
    this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
};
goog.async.FreeList.prototype.occupants = function() {
    return this.occupants_
};
goog.async.WorkQueue = function() {
    this.workTail_ = this.workHead_ = null
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
    return new goog.async.WorkItem
}, function(a) {
    a.reset()
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
    var c = this.getUnusedItem_();
    c.set(a, b);
    this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
    this.workTail_ = c
};
goog.async.WorkQueue.prototype.remove = function() {
    var a = null;
    this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
    return a
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
    goog.async.WorkQueue.freelist_.put(a)
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
    return goog.async.WorkQueue.freelist_.get()
};
goog.async.WorkItem = function() {
    this.next = this.scope = this.fn = null
};
goog.async.WorkItem.prototype.set = function(a, b) {
    this.fn = a;
    this.scope = b;
    this.next = null
};
goog.async.WorkItem.prototype.reset = function() {
    this.next = this.scope = this.fn = null
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
    goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
    if (goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
    goog.debug.entryPointRegistry.monitors_.push(a)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
    var b = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
    a = goog.bind(a.unwrap, a);
    for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
    b.length--
};
goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    ARTICLE: "ARTICLE",
    ASIDE: "ASIDE",
    AUDIO: "AUDIO",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDI: "BDI",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CANVAS: "CANVAS",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    COMMAND: "COMMAND",
    DATA: "DATA",
    DATALIST: "DATALIST",
    DD: "DD",
    DEL: "DEL",
    DETAILS: "DETAILS",
    DFN: "DFN",
    DIALOG: "DIALOG",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    EMBED: "EMBED",
    FIELDSET: "FIELDSET",
    FIGCAPTION: "FIGCAPTION",
    FIGURE: "FIGURE",
    FONT: "FONT",
    FOOTER: "FOOTER",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HEADER: "HEADER",
    HGROUP: "HGROUP",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    KEYGEN: "KEYGEN",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MARK: "MARK",
    MATH: "MATH",
    MENU: "MENU",
    META: "META",
    METER: "METER",
    NAV: "NAV",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    OUTPUT: "OUTPUT",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    PROGRESS: "PROGRESS",
    Q: "Q",
    RP: "RP",
    RT: "RT",
    RUBY: "RUBY",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SECTION: "SECTION",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SOURCE: "SOURCE",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUMMARY: "SUMMARY",
    SUP: "SUP",
    SVG: "SVG",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEMPLATE: "TEMPLATE",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TIME: "TIME",
    TITLE: "TITLE",
    TR: "TR",
    TRACK: "TRACK",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR",
    VIDEO: "VIDEO",
    WBR: "WBR"
};
goog.functions = {};
goog.functions.constant = function(a) {
    return function() {
        return a
    }
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
    return a
};
goog.functions.error = function(a) {
    return function() {
        throw Error(a);
    }
};
goog.functions.fail = function(a) {
    return function() {
        throw a;
    }
};
goog.functions.lock = function(a, b) {
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
goog.functions.nth = function(a) {
    return function() {
        return arguments[a]
    }
};
goog.functions.partialRight = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = Array.prototype.slice.call(arguments);
        b.push.apply(b, c);
        return a.apply(this, b)
    }
};
goog.functions.withReturnValue = function(a, b) {
    return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.equalTo = function(a, b) {
    return function(c) {
        return b ? a == c : a === c
    }
};
goog.functions.compose = function(a, b) {
    var c = arguments,
        d = c.length;
    return function() {
        var a;
        d && (a = c[d - 1].apply(this, arguments));
        for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
        return a
    }
};
goog.functions.sequence = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
        return a
    }
};
goog.functions.and = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (!b[a].apply(this, arguments)) return !1;
        return !0
    }
};
goog.functions.or = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (b[a].apply(this, arguments)) return !0;
        return !1
    }
};
goog.functions.not = function(a) {
    return function() {
        return !a.apply(this, arguments)
    }
};
goog.functions.create = function(a, b) {
    var c = function() {};
    c.prototype = a.prototype;
    c = new c;
    a.apply(c, Array.prototype.slice.call(arguments, 1));
    return c
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
    var b = !1,
        c;
    return function() {
        if (!goog.functions.CACHE_RETURN_VALUE) return a();
        b || (c = a(), b = !0);
        return c
    }
};
goog.functions.once = function(a) {
    var b = a;
    return function() {
        if (b) {
            var a = b;
            b = null;
            a()
        }
    }
};
goog.functions.debounce = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null;
    return function(c) {
        goog.global.clearTimeout(d);
        var f = arguments;
        d = goog.global.setTimeout(function() {
            a.apply(null, f)
        }, b)
    }
};
goog.functions.throttle = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null,
        e = !1,
        f = [],
        g = function() {
            d = null;
            e && (e = !1, h())
        },
        h = function() {
            d = goog.global.setTimeout(g, b);
            a.apply(null, f)
        };
    return function(a) {
        f = arguments;
        d ? e = !0 : h()
    }
};
goog.async.throwException = function(a) {
    goog.global.setTimeout(function() {
        throw a;
    }, 0)
};
goog.async.nextTick = function(a, b, c) {
    var d = a;
    b && (d = goog.bind(a, b));
    d = goog.async.nextTick.wrapCallback_(d);
    goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d))
};
goog.async.nextTick.useSetImmediate_ = function() {
    return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
    var a = goog.global.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
        var a = document.createElement(goog.dom.TagName.IFRAME);
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
            a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" :
            b.location.protocol + "//" + b.location.host,
            a = goog.bind(function(a) {
                if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
            }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (goog.isDef(c.next)) {
                c = c.next;
                var a = c.cb;
                c.cb = null;
                a()
            }
        };
        return function(a) {
            d.next = {
                cb: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document &&
        "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function(a) {
            var b = document.createElement(goog.dom.TagName.SCRIPT);
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function(a) {
            goog.global.setTimeout(a, 0)
        }
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(a) {
    goog.async.nextTick.wrapCallback_ = a
});
goog.async.run = function(a, b) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_();
    goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
    goog.async.run.workQueue_.add(a, b)
};
goog.async.run.initializeRunner_ = function() {
    if (goog.global.Promise && goog.global.Promise.resolve) {
        var a = goog.global.Promise.resolve(void 0);
        goog.async.run.schedule_ = function() {
            a.then(goog.async.run.processWorkQueue)
        }
    } else goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue)
    }
};
goog.async.run.forceNextTick = function(a) {
    goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue);
        a && a(goog.async.run.processWorkQueue)
    }
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
    goog.async.run.workQueueScheduled_ = !1;
    goog.async.run.workQueue_ = new goog.async.WorkQueue
});
goog.async.run.processWorkQueue = function() {
    for (var a = null; a = goog.async.run.workQueue_.remove();) {
        try {
            a.fn.call(a.scope)
        } catch (b) {
            goog.async.throwException(b)
        }
        goog.async.run.workQueue_.returnUnused(a)
    }
    goog.async.run.workQueueScheduled_ = !1
};
goog.promise = {};
goog.promise.Resolver = function() {};
goog.Promise = function(a, b) {
    this.state_ = goog.Promise.State_.PENDING;
    this.result_ = void 0;
    this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
    this.executing_ = !1;
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
    goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
    if (a != goog.nullFunction) try {
        var c = this;
        a.call(b, function(a) {
            c.resolve_(goog.Promise.State_.FULFILLED,
                a)
        }, function(a) {
            if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) try {
                if (a instanceof Error) throw a;
                throw Error("Promise rejected.");
            } catch (b) {}
            c.resolve_(goog.Promise.State_.REJECTED, a)
        })
    } catch (d) {
        this.resolve_(goog.Promise.State_.REJECTED, d)
    }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
};
goog.Promise.CallbackEntry_ = function() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
    this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
    return new goog.Promise.CallbackEntry_
}, function(a) {
    a.reset()
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
    var d = goog.Promise.freelist_.get();
    d.onFulfilled = a;
    d.onRejected = b;
    d.context = c;
    return d
};
goog.Promise.returnEntry_ = function(a) {
    goog.Promise.freelist_.put(a)
};
goog.Promise.resolve = function(a) {
    if (a instanceof goog.Promise) return a;
    var b = new goog.Promise(goog.nullFunction);
    b.resolve_(goog.Promise.State_.FULFILLED, a);
    return b
};
goog.Promise.reject = function(a) {
    return new goog.Promise(function(b, c) {
        c(a)
    })
};
goog.Promise.resolveThen_ = function(a, b, c) {
    goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a))
};
goog.Promise.race = function(a) {
    return new goog.Promise(function(b, c) {
        a.length || b(void 0);
        for (var d = 0, e; d < a.length; d++) e = a[d], goog.Promise.resolveThen_(e, b, c)
    })
};
goog.Promise.all = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, g = function(a) {
                    c(a)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
        else b(e)
    })
};
goog.Promise.allSettled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c, f) {
                    d--;
                    e[a] = c ? {
                        fulfilled: !0,
                        value: f
                    } : {
                        fulfilled: !1,
                        reason: f
                    };
                    0 == d && b(e)
                }, g = 0, h; g < a.length; g++) h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
        else b(e)
    })
};
goog.Promise.firstFulfilled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a) {
                    b(a)
                }, g = function(a, b) {
                    d--;
                    e[a] = b;
                    0 == d && c(e)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
        else b(void 0)
    })
};
goog.Promise.withResolver = function() {
    var a, b, c = new goog.Promise(function(c, e) {
        a = c;
        b = e
    });
    return new goog.Promise.Resolver_(c, a, b)
};
goog.Promise.prototype.then = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c)
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c))
};
goog.Promise.prototype.thenAlways = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
    var c = goog.Promise.getCallbackEntry_(a, a, b);
    c.always = !0;
    this.addCallbackEntry_(c);
    return this
};
goog.Promise.prototype.thenCatch = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
    return this.addChildPromise_(null, a, b)
};
goog.Promise.prototype.cancel = function(a) {
    this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
        var b = new goog.Promise.CancellationError(a);
        this.cancelInternal_(b)
    }, this)
};
goog.Promise.prototype.cancelInternal_ = function(a) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a))
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
    if (this.callbackEntries_) {
        for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
        d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)))
    }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
    this.queueEntry_(a)
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
    var d = goog.Promise.getCallbackEntry_(null, null, null);
    d.child = new goog.Promise(function(e, f) {
        d.onFulfilled = a ? function(b) {
            try {
                var d = a.call(c, b);
                e(d)
            } catch (k) {
                f(k)
            }
        } : e;
        d.onRejected = b ? function(a) {
            try {
                var d = b.call(c, a);
                !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d)
            } catch (k) {
                f(k)
            }
        } : f
    });
    d.child.parent_ = this;
    this.addCallbackEntry_(d);
    return d.child
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.FULFILLED, a)
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.REJECTED, a)
};
goog.Promise.prototype.resolve_ = function(a, b) {
    this.state_ == goog.Promise.State_.PENDING && (this == b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)))
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
    if (a instanceof goog.Promise) return a.thenVoid(b, c, d), !0;
    if (goog.Thenable.isImplementedBy(a)) return a.then(b, c, d), !0;
    if (goog.isObject(a)) try {
        var e = a.then;
        if (goog.isFunction(e)) return goog.Promise.tryThen_(a, e, b, c, d), !0
    } catch (f) {
        return c.call(d, f), !0
    }
    return !1
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
    var f = !1,
        g = function(a) {
            f || (f = !0, c.call(e, a))
        },
        h = function(a) {
            f || (f = !0, d.call(e, a))
        };
    try {
        b.call(a, g, h)
    } catch (k) {
        h(k)
    }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
    this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
};
goog.Promise.prototype.hasEntry_ = function() {
    return !!this.callbackEntries_
};
goog.Promise.prototype.queueEntry_ = function(a) {
    goog.asserts.assert(null != a.onFulfilled);
    this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
    this.callbackEntriesTail_ = a
};
goog.Promise.prototype.popEntry_ = function() {
    var a = null;
    this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
    this.callbackEntries_ || (this.callbackEntriesTail_ = null);
    null != a && goog.asserts.assert(null != a.onFulfilled);
    return a
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
    goog.asserts.assert(this.callbackEntries_);
    goog.asserts.assert(null != a);
    a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
    a.next = a.next.next
};
goog.Promise.prototype.executeCallbacks_ = function() {
    for (var a = null; a = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
    this.executing_ = !1
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
    if (a.child) a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
    else try {
        a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c)
    } catch (d) {
        goog.Promise.handleRejection_.call(null, d)
    }
    goog.Promise.returnEntry_(a)
};
goog.Promise.invokeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
};
goog.Promise.prototype.addStackTrace_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
        var b = a.stack.split("\n", 4)[3];
        a = a.message;
        a += Array(11 - a.length).join(" ");
        this.stack_.push(a + b)
    }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
        for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
            for (var d = this.currentStep_; 0 <= d; d--) b.push(c.stack_[d]);
            b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">")
        }
        a.stack += "\n\n" + b.join("\n")
    }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
        a.appendLongStack_(b);
        goog.Promise.handleRejection_.call(null, b)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
        a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b))
    }))
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
    goog.Promise.handleRejection_ = a
};
goog.Promise.CancellationError = function(a) {
    goog.debug.Error.call(this, a)
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c
};
goog.disposable = {};
goog.disposable.IDisposable = function() {};
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
};
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
    var a = [],
        b;
    for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[+b]);
    return a
};
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var a = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[a]
    }
};
goog.Disposable.prototype.registerDisposable = function(a) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, a))
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
    this.disposed_ ? a.call(b) : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a))
};
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
};
goog.Disposable.isDisposed = function(a) {
    return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
};
goog.dispose = function(a) {
    a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
        var d = arguments[b];
        goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
    }
};
goog.events = {};
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ||
        goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
};
goog.events.EventId = function(a) {
    this.id = a
};
goog.events.EventId.prototype.toString = function() {
    return this.id
};
goog.events.Event = function(a, b) {
    this.type = a instanceof goog.events.EventId ? String(a) : a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = !1;
    this.returnValue_ = !0
};
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
};
goog.events.getVendorPrefixedName_ = function(a) {
    return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
};
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint"
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
    return b
};
goog.reflect.sinkValue = function(a) {
    goog.reflect.sinkValue[" "](a);
    return a
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
    try {
        return goog.reflect.sinkValue(a[b]), !0
    } catch (c) {}
    return !1
};
goog.events.BrowserEvent = function(a, b) {
    goog.events.Event.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.platformModifierKey = !1;
    this.event_ = null;
    a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var e = a.relatedTarget;
    e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
    this.relatedTarget = e;
    goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY =
        goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey =
        a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.state = a.state;
    this.event_ = a;
    a.defaultPrevented && this.preventDefault()
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
goog.events.Listenable = function() {};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
    a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
};
goog.events.Listenable.isImplementedBy = function(a) {
    return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
};
goog.events.ListenableKey = function() {};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
};
goog.events.Listener = function(a, b, c, d, e, f) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture = !!e;
    this.handler = f;
    this.key = goog.events.ListenableKey.reserveKey();
    this.removed = this.callOnce = !1
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0;
    this.handler = this.src = this.proxy = this.listener = null
};
goog.events.ListenerMap = function(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.listeners) a += this.listeners[b].length;
    return a
};
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    a || (a = this.listeners[f] = [], this.typeCount_++);
    var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
    return b
};
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners)) return !1;
    var e = this.listeners[a];
    b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
    return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
};
goog.events.ListenerMap.prototype.removeByKey = function(a) {
    var b = a.type;
    if (!(b in this.listeners)) return !1;
    var c = goog.array.remove(this.listeners[b], a);
    c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
    return c
};
goog.events.ListenerMap.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0,
        c;
    for (c in this.listeners)
        if (!a || c == a) {
            for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
            delete this.listeners[c];
            this.typeCount_--
        }
    return b
};
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
    var c = this.listeners[a.toString()],
        d = [];
    if (c)
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            f.capture == b && d.push(f)
        }
    return d
};
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
    return -1 < e ? a[e] : null
};
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a),
        d = c ? a.toString() : "",
        e = goog.isDef(b);
    return goog.object.some(this.listeners, function(a, g) {
        for (var h = 0; h < a.length; ++h)
            if (!(c && a[h].type != d || e && a[h].capture != b)) return !0;
        return !1
    })
};
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
    }
    return -1
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listen(b, c, d, e) : goog.events.listen_(a, b, c, !1, d, e)
};
goog.events.listen_ = function(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = !!e;
    if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var h = goog.events.getListenerMap_(a);
    h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
    c = h.add(b, c, d, e, f);
    if (c.proxy) return c;
    d = goog.events.getProxy();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) a.addEventListener(b.toString(), d, g);
    else if (a.attachEvent) a.attachEvent(goog.events.getOnString_(b.toString()), d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    goog.events.listenerCountEstimate_++;
    return c
};
goog.events.getProxy = function() {
    var a = goog.events.handleBrowserEvent_,
        b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
            return a.call(b.src, b.listener, c)
        } : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c
        };
    return b
};
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog.events.listen_(a, b, c, !0, d, e)
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    if (goog.events.Listenable.isImplementedBy(a)) return a.unlisten(b, c, d, e);
    if (!a) return !1;
    d = !!d;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.getListener(b, c, d, e)) return goog.events.unlistenByKey(b);
    return !1
};
goog.events.unlistenByKey = function(a) {
    if (goog.isNumber(a) || !a || a.removed) return !1;
    var b = a.src;
    if (goog.events.Listenable.isImplementedBy(b)) return b.unlistenByKey(a);
    var c = a.type,
        d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(goog.events.getOnString_(c), d);
    goog.events.listenerCountEstimate_--;
    (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
    return !0
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
};
goog.events.removeAll = function(a, b) {
    if (!a) return 0;
    if (goog.events.Listenable.isImplementedBy(a)) return a.removeAllListeners(b);
    var c = goog.events.getListenerMap_(a);
    if (!c) return 0;
    var d = 0,
        e = b && b.toString(),
        f;
    for (f in c.listeners)
        if (!e || f == e)
            for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) goog.events.unlistenByKey(g[h]) && ++d;
    return d
};
goog.events.getListeners = function(a, b, c) {
    return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
};
goog.events.getListener = function(a, b, c, d, e) {
    c = goog.events.wrapListener(c);
    d = !!d;
    return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
};
goog.events.hasListener = function(a, b, c) {
    if (goog.events.Listenable.isImplementedBy(a)) return a.hasListener(b, c);
    a = goog.events.getListenerMap_(a);
    return !!a && a.hasListener(b, c)
};
goog.events.expose = function(a) {
    var b = [],
        c;
    for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
};
goog.events.getOnString_ = function(a) {
    return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
    return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
};
goog.events.fireListeners_ = function(a, b, c, d) {
    var e = !0;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.listeners[b.toString()])
            for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f)
            }
        return e
};
goog.events.fireListener = function(a, b) {
    var c = a.listener,
        d = a.handler || a.src;
    a.callOnce && goog.events.unlistenByKey(a);
    return c.call(d, b)
};
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
};
goog.events.dispatchEvent = function(a, b) {
    goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
    return a.dispatchEvent(b)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
    if (a.removed) return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var c = b || goog.getObjectByName("window.event"),
            d = new goog.events.BrowserEvent(c, this),
            e = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(c)) {
                goog.events.markIeEvent_(c);
                for (var c = [], f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, g = c.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
                    d.currentTarget = c[g];
                    var h =
                        goog.events.fireListeners_(c[g], f, !0, d),
                        e = e && h
                }
                for (g = 0; !d.propagationStopped_ && g < c.length; g++) d.currentTarget = c[g], h = goog.events.fireListeners_(c[g], f, !1, d), e = e && h
            }
        } else e = goog.events.fireListener(a, d);
        return e
    }
    return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this))
};
goog.events.markIeEvent_ = function(a) {
    var b = !1;
    if (0 == a.keyCode) try {
        a.keyCode = -1;
        return
    } catch (c) {
        b = !0
    }
    if (b || void 0 == a.returnValue) a.returnValue = !0
};
goog.events.isMarkedIeEvent_ = function(a) {
    return 0 > a.keyCode || void 0 != a.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.getListenerMap_ = function(a) {
    a = a[goog.events.LISTENER_MAP_PROP_];
    return a instanceof goog.events.ListenerMap ? a : null
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
    goog.asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a)) return a;
    goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    });
    return a[goog.events.LISTENER_WRAPPER_PROP_]
};
goog.debug.entryPointRegistry.register(function(a) {
    goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
});
goog.events.EventTarget = function() {
    goog.Disposable.call(this);
    this.eventTargetListeners_ = new goog.events.ListenerMap(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    this.assertInitialized_();
    var b, c = this.getParentEventTarget();
    if (c) {
        b = [];
        for (var d = 1; c; c = c.getParentEventTarget()) b.push(c), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, b)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.removeAllListeners();
    this.parentEventTarget_ = null
};
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
    this.assertInitialized_();
    return this.eventTargetListeners_.add(String(a), b, !1, c, d)
};
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, !0, c, d)
};
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
    return this.eventTargetListeners_.remove(String(a), b, c, d)
};
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
    return this.eventTargetListeners_.removeByKey(a)
};
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
};
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
    a = this.eventTargetListeners_.listeners[String(a)];
    if (!a) return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f && !f.removed && f.capture == b) {
            var g = f.listener,
                h = f.handler || f.src;
            f.callOnce && this.unlistenByKey(f);
            d = !1 !== g.call(h, c) && d
        }
    }
    return d && 0 != c.returnValue_
};
goog.events.EventTarget.prototype.getListeners = function(a, b) {
    return this.eventTargetListeners_.getListeners(String(a), b)
};
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d)
};
goog.events.EventTarget.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a) ? String(a) : void 0;
    return this.eventTargetListeners_.hasListener(c, b)
};
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
    this.actualEventTarget_ = a
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
    var d = b.type || b;
    if (goog.isString(b)) b = new goog.events.Event(b, a);
    else if (b instanceof goog.events.Event) b.target = b.target || a;
    else {
        var e = b;
        b = new goog.events.Event(d, a);
        goog.object.extend(b, e)
    }
    var e = !0,
        f;
    if (c)
        for (var g = c.length - 1; !b.propagationStopped_ && 0 <= g; g--) f = b.currentTarget = c[g], e = f.fireListeners(d, !0, b) && e;
    b.propagationStopped_ || (f = b.currentTarget = a, e = f.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = f.fireListeners(d, !1, b) && e));
    if (c)
        for (g = 0; !b.propagationStopped_ && g < c.length; g++) f = b.currentTarget = c[g], e = f.fireListeners(d, !1, b) && e;
    return e
};
goog.Timer = function(a, b) {
    goog.events.EventTarget.call(this);
    this.interval_ = a || 1;
    this.timerObject_ = b || goog.Timer.defaultTimerObject;
    this.boundTick_ = goog.bind(this.tick_, this);
    this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = .8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
    return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
    this.interval_ = a;
    this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
    if (this.enabled) {
        var a = goog.now() - this.last_;
        0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
    }
};
goog.Timer.prototype.dispatchTick = function() {
    this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
    this.enabled = !0;
    this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function() {
    this.enabled = !1;
    this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function() {
    goog.Timer.superClass_.disposeInternal.call(this);
    this.stop();
    delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
    if (goog.isFunction(a)) c && (a = goog.bind(a, c));
    else if (a && "function" == typeof a.handleEvent) a = goog.bind(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return +b > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
    goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.Timer.promise = function(a, b) {
    var c = null;
    return (new goog.Promise(function(d, e) {
        c = goog.Timer.callOnce(function() {
            d(b)
        }, a);
        c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."))
    })).thenCatch(function(a) {
        goog.Timer.clear(c);
        throw a;
    })
};
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
goog.dom.tags.isVoidTag = function(a) {
    return !0 === goog.dom.tags.VOID_TAGS_[a]
};
goog.string.TypedString = function() {};
goog.string.Const = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
};
goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
};
goog.string.Const.unwrap = function(a) {
    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
};
goog.string.Const.from = function(a) {
    return goog.string.Const.create__googStringSecurityPrivate_(a)
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
    var b = new goog.string.Const;
    b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
    return b
};
goog.html = {};
goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(a);
    goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyle.checkStyle_ = function(a) {
    goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a)
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
});
goog.html.SafeStyle.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyle"
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
    var b = "",
        c;
    for (c in a) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
        var d = a[c];
        null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " +
            d), d = goog.html.SafeStyle.INNOCUOUS_STRING), b += c + ":" + d + ";")
    }
    if (!b) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(b);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
    }
    return b && c
};
goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
goog.html.SafeStyle.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
};
goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
    goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
});
goog.html.SafeStyleSheet.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyleSheet"
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    return this
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
    return goog.fs.url.getUrlObject_().createObjectURL(a)
};
goog.fs.url.revokeObjectUrl = function(a) {
    goog.fs.url.getUrlObject_().revokeObjectURL(a)
};
goog.fs.url.getUrlObject_ = function() {
    var a = goog.fs.url.findUrlObject_();
    if (null != a) return a;
    throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
};
goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
    "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {
    LRE: "\u202a",
    RLE: "\u202b",
    PDF: "\u202c",
    LRM: "\u200e",
    RLM: "\u200f"
};
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
    return goog.i18n.bidi.rtlRe_.test(a)
};
goog.i18n.bidi.isLtrChar = function(a) {
    return goog.i18n.bidi.ltrRe_.test(a)
};
goog.i18n.bidi.isNeutralChar = function(a) {
    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
    return goog.i18n.bidi.rtlLocalesRe_.test(a)
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
    var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function(a) {
    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function(a) {
    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
    for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
        var h = f[g];
        goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0)
    }
    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
    switch (goog.i18n.bidi.estimateDirection(b)) {
        case goog.i18n.bidi.Dir.LTR:
            a.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            a.dir = "rtl";
            break;
        default:
            a.removeAttribute("dir")
    }
};
goog.i18n.bidi.DirectionalString = function() {};
goog.html.SafeUrl = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeUrl.unwrap = function(a) {
    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeUrl"
};
goog.html.SafeUrl.fromConstant = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
    a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
    var b = a.match(goog.html.DATA_URL_PATTERN_),
        b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
    if (a instanceof goog.html.SafeUrl) return a;
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.SafeUrl;
    b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    return b
};
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.html.TrustedResourceUrl = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:TrustedResourceUrl"
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.TrustedResourceUrl;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b
};
goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    this.dir_ = null
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeHtml.unwrap = function(a) {
    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeHtml"
};
goog.html.SafeHtml.htmlEscape = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    var b = null;
    a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b)
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.APPLET, goog.dom.TagName.BASE, goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.MATH, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.SVG, goog.dom.TagName.TEMPLATE);
goog.html.SafeHtml.create = function(a, b, c) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error("Invalid tag name <" + a + ">.");
    if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(a, b, c)
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
    var e = {};
    e.src = a || null;
    e.srcdoc = b || null;
    a = goog.html.SafeHtml.combineAttributes(e, {
        sandbox: ""
    }, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
};
goog.html.SafeHtml.createStyle = function(a, b) {
    var c = goog.html.SafeHtml.combineAttributes({
            type: "text/css"
        }, {}, b),
        d = "";
    a = goog.array.concat(a);
    for (var e = 0; e < a.length; e++) d += goog.html.SafeStyleSheet.unwrap(a[e]);
    d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d)
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
    var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
    (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
        "http-equiv": "refresh",
        content: (b || 0) + "; url=" + c
    })
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
    if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c);
    else if ("style" == b.toLowerCase()) c = goog.html.SafeHtml.getStyleValue_(c);
    else {
        if (/^on/i.test(b)) throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
        if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c);
            else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c);
        else if (goog.isString(c)) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
        else throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
    }
    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
    return b + '="' + goog.string.htmlEscape(String(c)) + '"'
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
    if (!goog.isObject(a)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    return goog.html.SafeStyle.unwrap(a)
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
    b = goog.html.SafeHtml.create(b, c, d);
    b.dir_ = a;
    return b
};
goog.html.SafeHtml.concat = function(a) {
    var b = goog.i18n.bidi.Dir.NEUTRAL,
        c = "",
        d = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null))
        };
    goog.array.forEach(arguments, d);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b)
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    c.dir_ = a;
    return c
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    this.dir_ = b;
    return this
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
    var d = null,
        e = "<" + a;
    if (b)
        for (var f in b) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(f)) throw Error('Invalid attribute name "' + f + '".');
            var g = b[f];
            goog.isDefAndNotNull(g) && (e += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, f, g))
        }
    goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c),
        e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
    var d = {},
        e;
    for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
    for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
    for (e in c) {
        var f = e.toLowerCase();
        if (f in a) throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
        f in b && delete d[f];
        d[e] = c[e]
    }
    return d
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c))
};
goog.dom.safe.setInnerHtml = function(a, b) {
    a.innerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.setOuterHtml = function(a, b) {
    a.outerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.documentWrite = function(a, b) {
    a.write(goog.html.SafeHtml.unwrap(b))
};
goog.dom.safe.setAnchorHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setImageSrc = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.src = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setEmbedSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setFrameSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setIframeSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
    a.rel = c;
    goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue()
};
goog.dom.safe.setObjectData = function(a, b) {
    a.data = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setScriptSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLocationHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
    return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
};
goog.math = {};
goog.math.randomInt = function(a) {
    return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
    return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
    return goog.math.modulo(a, 360)
};
goog.math.standardAngleInRadians = function(a) {
    return goog.math.modulo(a, 2 * Math.PI)
};
goog.math.toRadians = function(a) {
    return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
    return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
    return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
    return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
    var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
};
goog.math.sign = Math.sign || function(a) {
    return 0 < a ? 1 : 0 > a ? -1 : a
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    };
    d = d || function(b, c) {
        return a[b]
    };
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
    for (var k = 0; k < f + 1; k++) g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    for (var l = [], h = e, k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return l
};
goog.math.sum = function(a) {
    return goog.array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
};
goog.math.average = function(a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b) return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
};
goog.math.standardDeviation = function(a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
};
goog.math.isInt = function(a) {
    return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
    return isFinite(a) && !isNaN(a)
};
goog.math.isNegativeZero = function(a) {
    return 0 == a && 0 > 1 / a
};
goog.math.log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
};
goog.math.safeFloor = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.ceil(a - (b || 2E-15))
};
goog.math.Coordinate = function(a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
};
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
    return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Coordinate.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
goog.math.Coordinate.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
goog.math.Coordinate.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
goog.math.Coordinate.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += +a, goog.isNumber(b) && (this.y += b));
    return this
};
goog.math.Coordinate.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.x *= a;
    this.y *= c;
    return this
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
    var c = b || new goog.math.Coordinate(0, 0),
        d = this.x,
        e = this.y,
        f = Math.cos(a),
        g = Math.sin(a);
    this.x = (d - c.x) * f - (e - c.y) * g + c.x;
    this.y = (d - c.x) * g + (e - c.y) * f + c.y
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
    this.rotateRadians(goog.math.toRadians(a), b)
};
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
};
goog.math.Size.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
    return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
};
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Size.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.width *= a;
    this.height *= c;
    return this
};
goog.math.Size.prototype.scaleToCover = function(a) {
    a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.Size.prototype.scaleToFit = function(a) {
    a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
};
goog.dom.getElement = function(a) {
    return goog.dom.getElementHelper_(document, a)
};
goog.dom.getElementHelper_ = function(a, b) {
    return goog.isString(b) ? a.getElementById(b) : b
};
goog.dom.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(document, a)
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
    goog.asserts.assertString(b);
    var c = goog.dom.getElementHelper_(a, b);
    return c = goog.asserts.assertElement(c, "No element found with id: " + b)
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
    var c = b || document;
    return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
    var c = b || document,
        d = null;
    return (d = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null
};
goog.dom.getRequiredElementByClass = function(a, b) {
    var c = goog.dom.getElementByClass(a, b);
    return goog.asserts.assert(c, "No element found with className: " + a)
};
goog.dom.canUseQuerySelector_ = function(a) {
    return !(!a.querySelectorAll || !a.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    a = d || a;
    b = b && "*" != b ? b.toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
    if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    a = a.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
        d.length =
            e;
        return d
    }
    return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeightForWindow = function(a) {
    return goog.dom.getDocumentHeight_(a)
};
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document,
        c = 0;
    if (b) {
        var c = b.body,
            d = b.documentElement;
        if (!d || !c) return 0;
        a = goog.dom.getViewportSize_(a).height;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            var b = d.scrollHeight,
                e = d.offsetHeight;
            d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
};
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
    var b = goog.dom.getDocumentScrollElement_(a);
    a = goog.dom.getWindow_(a);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
    return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
};
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
    var c = b[0],
        d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length && goog.dom.append_(a,
        c, b, 2);
    return c
};
goog.dom.append_ = function(a, b, c, d) {
    function e(c) {
        c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
    }
    for (; d < c.length; d++) {
        var f = c[d];
        goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
    }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
    return document.createTextNode(String(a))
};
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = a.createElement(goog.dom.TagName.TABLE), f = e.appendChild(a.createElement(goog.dom.TagName.TBODY)), g = 0; g < b; g++) {
        for (var h = a.createElement(goog.dom.TagName.TR), k = 0; k < c; k++) {
            var l = a.createElement(goog.dom.TagName.TD);
            d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
            h.appendChild(l)
        }
        f.appendChild(h)
    }
    return e
};
goog.dom.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(document, a)
};
goog.dom.safeHtmlToNode_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.childrenToNode_ = function(a, b) {
    if (1 == b.childNodes.length) return b.removeChild(b.firstChild);
    for (var c = a.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
    return c
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (a.tagName) {
        case goog.dom.TagName.APPLET:
        case goog.dom.TagName.AREA:
        case goog.dom.TagName.BASE:
        case goog.dom.TagName.BR:
        case goog.dom.TagName.COL:
        case goog.dom.TagName.COMMAND:
        case goog.dom.TagName.EMBED:
        case goog.dom.TagName.FRAME:
        case goog.dom.TagName.HR:
        case goog.dom.TagName.IMG:
        case goog.dom.TagName.INPUT:
        case goog.dom.TagName.IFRAME:
        case goog.dom.TagName.ISINDEX:
        case goog.dom.TagName.KEYGEN:
        case goog.dom.TagName.LINK:
        case goog.dom.TagName.NOFRAMES:
        case goog.dom.TagName.NOSCRIPT:
        case goog.dom.TagName.META:
        case goog.dom.TagName.OBJECT:
        case goog.dom.TagName.PARAM:
        case goog.dom.TagName.SCRIPT:
        case goog.dom.TagName.SOURCE:
        case goog.dom.TagName.STYLE:
        case goog.dom.TagName.TRACK:
        case goog.dom.TagName.WBR:
            return !1
    }
    return !0
};
goog.dom.appendChild = function(a, b) {
    a.appendChild(b)
};
goog.dom.append = function(a, b) {
    goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b)
};
goog.dom.insertSiblingBefore = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
    a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (a.removeNode) return a.removeNode(!1);
        for (; b = a.firstChild;) c.insertBefore(b, a);
        return goog.dom.removeNode(a)
    }
};
goog.dom.getChildren = function(a) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
        return a.nodeType == goog.dom.NodeType.ELEMENT
    })
};
goog.dom.getFirstElementChild = function(a) {
    return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
    return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
    return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
    return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
    return a
};
goog.dom.getNextNode = function(a) {
    if (!a) return null;
    if (a.firstChild) return a.firstChild;
    for (; a && !a.nextSibling;) a = a.parentNode;
    return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
    if (!a) return null;
    if (!a.previousSibling) return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
    return a
};
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isElement = function(a) {
    return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(a) {
    return goog.isObject(a) && a.window == a
};
goog.dom.getParentElement = function(a) {
    var b;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) return b;
    b = a.parentNode;
    return goog.dom.isElement(b) ? b : null
};
goog.dom.contains = function(a, b) {
    if (!a || !b) return !1;
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;) b = b.parentNode;
    return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b) return 0;
    if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
        if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT,
            d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d) return a.sourceIndex - b.sourceIndex;
        var e = a.parentNode,
            f = b.parentNode;
        return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(!0);
    d = d.createRange();
    d.selectNode(b);
    d.collapse(!0);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b) return -1;
    for (var d = b; d.parentNode != c;) d = d.parentNode;
    return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (var c = b; c = c.previousSibling;)
        if (c == a) return -1;
    return 1
};
goog.dom.findCommonAncestor = function(a) {
    var b, c = arguments.length;
    if (!c) return null;
    if (1 == c) return arguments[0];
    var d = [],
        e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        for (var g = d[0][b], h = 1; h < c; h++)
            if (g != d[h][b]) return f;
        f = g
    }
    return f
};
goog.dom.getOwnerDocument = function(a) {
    goog.asserts.assert(a, "Node cannot be null or undefined.");
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
    return a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
    try {
        return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
    } catch (b) {}
    return null
};
goog.dom.setTextContent = function(a, b) {
    goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = b;
    else if (a.nodeType == goog.dom.NodeType.TEXT) a.data = b;
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = b
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)))
    }
};
goog.dom.getOuterHtml = function(a) {
    goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
    if ("outerHTML" in a) return a.outerHTML;
    var b = goog.dom.getOwnerDocument(a).createElement(goog.dom.TagName.DIV);
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
};
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, !1);
    return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
    if (null != a)
        for (a = a.firstChild; a;) {
            if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
            a = a.nextSibling
        }
    return !1
};
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
};
goog.dom.setFocusableTabIndex = function(a, b) {
    b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
};
goog.dom.isFocusable = function(a) {
    var b;
    return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
    a = a.getAttributeNode("tabindex");
    return goog.isDefAndNotNull(a) && a.specified
};
goog.dom.isTabIndexFocusable_ = function(a) {
    a = a.tabIndex;
    return goog.isNumber(a) && 0 <= a && 32768 > a
};
goog.dom.nativelySupportsFocus_ = function(a) {
    return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
    a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {
        height: a.offsetHeight,
        width: a.offsetWidth
    } : a.getBoundingClientRect();
    return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width
};
goog.dom.getTextContent = function(a) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, !0);
        a = b.join("")
    }
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
    " " != a && (a = a.replace(/^\s*/, ""));
    return a
};
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, !1);
    return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
    else
        for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
};
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
    for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
        for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
        a = a.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e = null; 0 < a.length && d < b;)
        if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                d = d + f.length;
            else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
    else
        for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
    goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
    return e
};
goog.dom.isNodeList = function(a) {
    if (a && "number" == typeof a.length) {
        if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if (goog.isFunction(a)) return "function" == typeof a.item
    }
    return !1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
    if (!b && !c) return null;
    var e = b ? b.toUpperCase() : null;
    return goog.dom.getAncestor(a, function(a) {
        return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c))
    }, !0, d)
};
goog.dom.getAncestorByClass = function(a, b, c) {
    return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
};
goog.dom.getAncestor = function(a, b, c, d) {
    c || (a = a.parentNode);
    for (c = 0; a && (null == d || c <= d);) {
        goog.asserts.assert("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        c++
    }
    return null
};
goog.dom.getActiveElement = function(a) {
    try {
        return a && a.activeElement
    } catch (b) {}
    return null
};
goog.dom.getPixelRatio = function() {
    var a = goog.dom.getWindow();
    return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1
};
goog.dom.matchesPixelRatio_ = function(a) {
    return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0
};
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.dom.getElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
    return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
    return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
    return goog.dom.getRequiredElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
    return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(String(a))
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(this.document_, a)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
    return goog.dom.getActiveElement(a || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
};
goog.dom.vendor.getVendorPrefix = function() {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
    if (b && a in b) return a;
    var c = goog.dom.vendor.getVendorJsPrefix();
    return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), !goog.isDef(b) || c in b ? c : null) : null
};
goog.dom.vendor.getPrefixedEventType = function(a) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase()
};
goog.math.Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
goog.math.Box.boundingBox = function(a) {
    for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) b.expandToIncludeCoordinate(arguments[c]);
    return b
};
goog.math.Box.prototype.getWidth = function() {
    return this.right - this.left
};
goog.math.Box.prototype.getHeight = function() {
    return this.bottom - this.top
};
goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function(a) {
    return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
    goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += +b, this.bottom += +c, this.left -= +d);
    return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
    this.top = Math.min(this.top, a.y);
    this.right = Math.max(this.right, a.x);
    this.bottom = Math.max(this.bottom, a.y);
    this.left = Math.min(this.left, a.x)
};
goog.math.Box.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
};
goog.math.Box.contains = function(a, b) {
    return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
};
goog.math.Box.relativePositionX = function(a, b) {
    return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
};
goog.math.Box.relativePositionY = function(a, b) {
    return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
};
goog.math.Box.distance = function(a, b) {
    var c = goog.math.Box.relativePositionX(a, b),
        d = goog.math.Box.relativePositionY(a, b);
    return Math.sqrt(c * c + d * d)
};
goog.math.Box.intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
    return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Box.prototype.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
};
goog.math.Box.prototype.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
};
goog.math.Box.prototype.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
};
goog.math.Box.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (goog.asserts.assertNumber(a), this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
    return this
};
goog.math.Box.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= c;
    this.bottom *= c;
    return this
};
goog.math.Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromPositionAndSize = function(a, b) {
    return new goog.math.Rect(a.x, a.y, b.width, b.height)
};
goog.math.Rect.createFromBox = function(a) {
    return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
};
goog.math.Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left),
        c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
    }
    return !1
};
goog.math.Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left),
        d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top),
            f = Math.min(a.top + a.height, b.top + b.height);
        if (e <= f) return new goog.math.Rect(c, e, d - c, f - e)
    }
    return null
};
goog.math.Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
    return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
    var c = goog.math.Rect.intersection(a, b);
    if (!c || !c.height || !c.width) return [a.clone()];
    var c = [],
        d = a.top,
        e = a.height,
        f = a.left + a.width,
        g = a.top + a.height,
        h = b.left + b.width,
        k = b.top + b.height;
    b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
    k < g && (c.push(new goog.math.Rect(a.left, k, a.width, g - k)), e = k - d);
    b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
    h < f && c.push(new goog.math.Rect(h, d, f - h, e));
    return c
};
goog.math.Rect.prototype.difference = function(a) {
    return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width),
        c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
    if (!a || !b) return null;
    var c = a.clone();
    c.boundingRect(b);
    return c
};
goog.math.Rect.prototype.contains = function(a) {
    return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.squaredDistance = function(a) {
    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
    return b * b + a * a
};
goog.math.Rect.prototype.distance = function(a) {
    return Math.sqrt(this.squaredDistance(a))
};
goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.math.Rect.prototype.getTopLeft = function() {
    return new goog.math.Coordinate(this.left, this.top)
};
goog.math.Rect.prototype.getCenter = function() {
    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
};
goog.math.Rect.prototype.getBottomRight = function() {
    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
};
goog.math.Rect.prototype.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Rect.prototype.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Rect.prototype.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Rect.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += goog.asserts.assertNumber(a), goog.isNumber(b) && (this.top += b));
    return this
};
goog.math.Rect.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= c;
    this.height *= c;
    return this
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
    if (goog.isString(b)) goog.style.setStyle_(a, c, b);
    else
        for (var d in b) goog.style.setStyle_(a, b[d], d)
};
goog.style.setStyle_ = function(a, b, c) {
    (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
    var c = goog.style.styleNameCache_[b];
    if (!c) {
        var d = goog.string.toCamelCase(b),
            c = d;
        void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
        goog.style.styleNameCache_[b] = c
    }
    return c
};
goog.style.getVendorStyleName_ = function(a, b) {
    var c = goog.string.toCamelCase(b);
    return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
};
goog.style.getStyle = function(a, b) {
    var c = a.style[goog.string.toCamelCase(b)];
    return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
    var c = goog.dom.getOwnerDocument(a);
    return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
};
goog.style.getCascadedStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
    return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
};
goog.style.getComputedBoxSizing = function(a) {
    return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null
};
goog.style.getComputedPosition = function(a) {
    return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
    return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
    return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
    return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
    return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
    return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
    return goog.style.getStyle_(a, "cursor")
};
goog.style.getComputedTransform = function(a) {
    var b = goog.style.getVendorStyleName_(a, "transform");
    return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform")
};
goog.style.setPosition = function(a, b, c) {
    var d;
    b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
    a.style.left = goog.style.getPixelStyleValue_(d, !1);
    a.style.top = goog.style.getPixelStyleValue_(b, !1)
};
goog.style.getPosition = function(a) {
    return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
    a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
    return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body
};
goog.style.getViewportPageOffset = function(a) {
    var b = a.body;
    a = a.documentElement;
    return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
};
goog.style.getBoundingClientRect_ = function(a) {
    var b;
    try {
        b = a.getBoundingClientRect()
    } catch (c) {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    }
    goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
    return b
};
goog.style.getOffsetParent = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return goog.asserts.assert("offsetParent" in a), a.offsetParent;
    var b = goog.dom.getOwnerDocument(a),
        c = goog.style.getStyle_(a, "position"),
        d = "fixed" == c || "absolute" == c;
    for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight >
                a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
    return null
};
goog.style.getVisibleRectForElement = function(a) {
    for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);)
        if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
            var g = goog.style.getPageOffset(a),
                h = goog.style.getClientLeftTop(a);
            g.x += h.x;
            g.y += h.y;
            b.top = Math.max(b.top,
                g.y);
            b.right = Math.min(b.right, g.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
            b.left = Math.max(b.left, g.x)
        }
    d = f.scrollLeft;
    f = f.scrollTop;
    b.left = Math.max(b.left, d);
    b.top = Math.max(b.top, f);
    c = c.getViewportSize();
    b.right = Math.min(b.right, d + c.width);
    b.bottom = Math.min(b.bottom, f + c.height);
    return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
    var d = b || goog.dom.getDocumentScrollElement(),
        e = goog.style.getPageOffset(a),
        f = goog.style.getPageOffset(d),
        g = goog.style.getBorderBox(d);
    d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft, e = e.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left, e += g.top)) : (b = e.x - f.x - g.left, e = e.y - f.y - g.top);
    g = d.clientWidth - a.offsetWidth;
    a = d.clientHeight - a.offsetHeight;
    f = d.scrollLeft;
    d = d.scrollTop;
    c ? (f += b - g / 2, d += e - a / 2) :
        (f += Math.min(b, Math.max(b - g, 0)), d += Math.min(e, Math.max(e - a, 0)));
    return new goog.math.Coordinate(f, d)
};
goog.style.scrollIntoContainerView = function(a, b, c) {
    b = b || goog.dom.getDocumentScrollElement();
    a = goog.style.getContainerOffsetToScrollInto(a, b, c);
    b.scrollLeft = a.x;
    b.scrollTop = a.y
};
goog.style.getClientLeftTop = function(a) {
    return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
    var b = goog.dom.getOwnerDocument(a);
    goog.asserts.assertObject(a, "Parameter is required");
    var c = new goog.math.Coordinate(0, 0),
        d = goog.style.getClientViewportElement(b);
    if (a == d) return c;
    a = goog.style.getBoundingClientRect_(a);
    b = goog.dom.getDomHelper(b).getDocumentScroll();
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c
};
goog.style.getPageOffsetLeft = function(a) {
    return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
    return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
    var c = new goog.math.Coordinate(0, 0),
        d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
    if (!goog.reflect.canAccessProperty(d, "parent")) return c;
    var e = a;
    do {
        var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
        c.x += f.x;
        c.y += f.y
    } while (d && d != b && d != d.parent && (e = d.frameElement) && (d = d.parent));
    return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
    if (b.getDocument() != c.getDocument()) {
        var d = b.getDocument().body;
        c = goog.style.getFramedPageOffset(d, c.getWindow());
        c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
        !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
        a.left += c.x;
        a.top += c.y
    }
};
goog.style.getRelativePosition = function(a, b) {
    var c = goog.style.getClientPosition(a),
        d = goog.style.getClientPosition(b);
    return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPositionForElement_ = function(a) {
    a = goog.style.getBoundingClientRect_(a);
    return new goog.math.Coordinate(a.left, a.top)
};
goog.style.getClientPosition = function(a) {
    goog.asserts.assert(a);
    if (a.nodeType == goog.dom.NodeType.ELEMENT) return goog.style.getClientPositionForElement_(a);
    a = a.changedTouches ? a.changedTouches[0] : a;
    return new goog.math.Coordinate(a.clientX, a.clientY)
};
goog.style.setPageOffset = function(a, b, c) {
    var d = goog.style.getPageOffset(a);
    b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
    b = goog.asserts.assertNumber(b) - d.x;
    goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (+c - d.y))
};
goog.style.setSize = function(a, b, c) {
    if (b instanceof goog.math.Size) c = b.height, b = b.width;
    else if (void 0 == c) throw Error("missing height argument");
    goog.style.setWidth(a, b);
    goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
    "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
    return a
};
goog.style.setHeight = function(a, b) {
    a.style.height = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.setWidth = function(a, b) {
    a.style.width = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.getSize = function(a) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a)
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
    if ("none" != goog.style.getStyle_(b, "display")) return a(b);
    var c = b.style,
        d = c.display,
        e = c.visibility,
        f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    var g = a(b);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return g
};
goog.style.getSizeWithDisplay_ = function(a) {
    var b = a.offsetWidth,
        c = a.offsetHeight,
        d = goog.userAgent.WEBKIT && !b && !c;
    return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top))
};
goog.style.getTransformedSize = function(a) {
    if (!a.getBoundingClientRect) return null;
    a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
    return new goog.math.Size(a.right - a.left, a.bottom - a.top)
};
goog.style.getBounds = function(a) {
    var b = goog.style.getPageOffset(a);
    a = goog.style.getSize(a);
    return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
    return goog.string.toCamelCase(String(a))
};
goog.style.toSelectorCase = function(a) {
    return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
    goog.asserts.assert(a);
    var b = a.style;
    a = "";
    "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
    return "" == a ? a : +a
};
goog.style.setOpacity = function(a, b) {
    goog.asserts.assert(a);
    var c = a.style;
    "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * +b + ")")
};
goog.style.setTransparentBackgroundImage = function(a, b) {
    var c = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
    a = a.style;
    "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
    goog.style.setElementShown(a, b)
};
goog.style.setElementShown = function(a, b) {
    a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
    return "none" != a.style.display
};
goog.style.installStyles = function(a, b) {
    var c = goog.dom.getDomHelper(b),
        d = null,
        e = c.getDocument();
    goog.userAgent.IE && e.createStyleSheet ? (d = e.createStyleSheet(), goog.style.setStyles(d, a)) : (e = c.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0], e || (d = c.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0], e = c.createDom(goog.dom.TagName.HEAD), d.parentNode.insertBefore(e, d)), d = c.createDom(goog.dom.TagName.STYLE), goog.style.setStyles(d, a), c.appendChild(e, d));
    return d
};
goog.style.uninstallStyles = function(a) {
    goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
    goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = b : a.innerHTML = b
};
goog.style.setPreWrap = function(a) {
    a = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
    a = a.style;
    a.position = "relative";
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block"
};
goog.style.isRightToLeft = function(a) {
    return "rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
    return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function(a, b, c) {
    c = c ? null : a.getElementsByTagName("*");
    var d = goog.style.unselectableStyle_;
    if (d) {
        if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
            a = 0;
            for (var e; e = c[a]; a++) e.style && (e.style[d] = b)
        }
    } else if (goog.userAgent.IE || goog.userAgent.OPERA)
        if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
            for (a = 0; e = c[a]; a++) e.setAttribute("unselectable", b)
};
goog.style.getBorderBoxSize = function(a) {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "border-box");
    else if (c = a.style, d) {
        var d = goog.style.getPaddingBox(a),
            e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
        c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    } else c.pixelWidth = b.width, c.pixelHeight =
        b.height
};
goog.style.getContentBoxSize = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = goog.userAgent.IE && a.currentStyle;
    if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
    c = goog.style.getBorderBoxSize(a);
    b = goog.style.getPaddingBox(a);
    a = goog.style.getBorderBox(a);
    return new goog.math.Size(c.width - a.left -
        b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
};
goog.style.setContentBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "content-box");
    else if (c = a.style, d) c.pixelWidth = b.width, c.pixelHeight = b.height;
    else {
        var d = goog.style.getPaddingBox(a),
            e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
        c.pixelHeight = b.height + e.top + d.top + d.bottom +
            e.bottom
    }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
    a = a.style;
    goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
    a.width = Math.max(b.width, 0) + "px";
    a.height = Math.max(b.height, 0) + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
    if (/^\d+px?$/.test(b)) return parseInt(b, 10);
    var e = a.style[c],
        f = a.runtimeStyle[c];
    a.runtimeStyle[c] = a.currentStyle[c];
    a.style[c] = b;
    b = a.style[d];
    a.style[c] = e;
    a.runtimeStyle[c] = f;
    return b
};
goog.style.getIePixelDistance_ = function(a, b) {
    var c = goog.style.getCascadedStyle(a, b);
    return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0
};
goog.style.getBox_ = function(a, b) {
    if (goog.userAgent.IE) {
        var c = goog.style.getIePixelDistance_(a, b + "Left"),
            d = goog.style.getIePixelDistance_(a, b + "Right"),
            e = goog.style.getIePixelDistance_(a, b + "Top"),
            f = goog.style.getIePixelDistance_(a, b + "Bottom");
        return new goog.math.Box(e, d, f, c)
    }
    c = goog.style.getComputedStyle(a, b + "Left");
    d = goog.style.getComputedStyle(a, b + "Right");
    e = goog.style.getComputedStyle(a, b + "Top");
    f = goog.style.getComputedStyle(a, b + "Bottom");
    return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
        parseFloat(c))
};
goog.style.getPaddingBox = function(a) {
    return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
    return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
};
goog.style.getIePixelBorder_ = function(a, b) {
    if ("none" == goog.style.getCascadedStyle(a, b + "Style")) return 0;
    var c = goog.style.getCascadedStyle(a, b + "Width");
    return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        var b = goog.style.getIePixelBorder_(a, "borderLeft"),
            c = goog.style.getIePixelBorder_(a, "borderRight"),
            d = goog.style.getIePixelBorder_(a, "borderTop");
        a = goog.style.getIePixelBorder_(a, "borderBottom");
        return new goog.math.Box(d, c, a, b)
    }
    b = goog.style.getComputedStyle(a, "borderLeftWidth");
    c = goog.style.getComputedStyle(a, "borderRightWidth");
    d = goog.style.getComputedStyle(a, "borderTopWidth");
    a = goog.style.getComputedStyle(a,
        "borderBottomWidth");
    return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
};
goog.style.getFontFamily = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = "";
    if (b.body.createTextRange && goog.dom.contains(b, a)) {
        b = b.body.createTextRange();
        b.moveToElementText(a);
        try {
            c = b.queryCommandValue("FontName")
        } catch (d) {
            c = ""
        }
    }
    c || (c = goog.style.getStyle_(a, "fontFamily"));
    a = c.split(",");
    1 < a.length && (c = a[0]);
    return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
    return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
};
goog.style.getFontSize = function(a) {
    var b = goog.style.getStyle_(a, "fontSize"),
        c = goog.style.getLengthUnits(b);
    if (b && "px" == c) return parseInt(b, 10);
    if (goog.userAgent.IE) {
        if (c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
        if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
    }
    c =
        goog.dom.createDom(goog.dom.TagName.SPAN, {
            style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
        });
    goog.dom.appendChild(a, c);
    b = c.offsetHeight;
    goog.dom.removeNode(c);
    return b
};
goog.style.parseStyleAttribute = function(a) {
    var b = {};
    goog.array.forEach(a.split(/\s*;\s*/), function(a) {
        var d = a.match(/\s*([\w-]+)\s*\:(.+)/);
        d && (a = d[1], d = goog.string.trim(d[2]), b[goog.string.toCamelCase(a.toLowerCase())] = d)
    });
    return b
};
goog.style.toStyleAttribute = function(a) {
    var b = [];
    goog.object.forEach(a, function(a, d) {
        b.push(goog.string.toSelectorCase(d), ":", a, ";")
    });
    return b.join("")
};
goog.style.setFloat = function(a, b) {
    a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
    return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function(a) {
    var b = goog.dom.createElement(goog.dom.TagName.DIV);
    a && (b.className = a);
    b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
    a = goog.dom.createElement(goog.dom.TagName.DIV);
    goog.style.setSize(a, "200px", "200px");
    b.appendChild(a);
    goog.dom.appendChild(goog.dom.getDocument().body, b);
    a = b.offsetWidth - b.clientWidth;
    goog.dom.removeNode(b);
    return a
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
    a = goog.style.getComputedTransform(a);
    return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0)
};
goog.events.EventHandler = function(a) {
    goog.Disposable.call(this);
    this.handler_ = a;
    this.keys_ = {}
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d) {
    return this.listen_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithScope = function(a, b, c, d, e) {
    return this.listen_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listen_ = function(a, b, c, d, e) {
    goog.isArray(b) || (b && (goog.events.EventHandler.typeArray_[0] = b.toString()), b = goog.events.EventHandler.typeArray_);
    for (var f = 0; f < b.length; f++) {
        var g = goog.events.listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
        if (!g) break;
        this.keys_[g.key] = g
    }
    return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d) {
    return this.listenOnce_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenOnceWithScope = function(a, b, c, d, e) {
    return this.listenOnce_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.listenOnce_(a, b[f], c, d, e);
    else {
        a = goog.events.listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
        if (!a) return this;
        this.keys_[a.key] = a
    }
    return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d) {
    return this.listenWithWrapper_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(a, b, c, d, e) {
    return this.listenWithWrapper_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(a, b, c, d, e) {
    b.listen(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.keys_) Object.prototype.hasOwnProperty.call(this.keys_, b) && a++;
    return a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
    else if (a = goog.events.getListener(a, b, c || this.handleEvent, d, e || this.handler_ || this)) goog.events.unlistenByKey(a), delete this.keys_[a.key];
    return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.removeAll = function() {
    goog.object.forEach(this.keys_, function(a, b) {
        this.keys_.hasOwnProperty(b) && goog.events.unlistenByKey(a)
    }, this);
    this.keys_ = {}
};
goog.events.EventHandler.prototype.disposeInternal = function() {
    goog.events.EventHandler.superClass_.disposeInternal.call(this);
    this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function(a) {
    throw Error("EventHandler.handleEvent not implemented");
};
goog.ui = {};
goog.ui.IdGenerator = function() {};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
    return ":" + (this.nextId_++).toString(36)
};
goog.ui.Component = function(a) {
    goog.events.EventTarget.call(this);
    this.dom_ = a || goog.dom.getDomHelper();
    this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_;
    this.id_ = null;
    this.inDocument_ = !1;
    this.element_ = null;
    this.googUiComponentHandler_ = void 0;
    this.childIndex_ = this.children_ = this.parent_ = this.model_ = null;
    this.wasDecorated_ = !1
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.ALLOW_DETACHED_DECORATION = !1;
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.DEFAULT_BIDI_DIR = 0;
goog.ui.Component.defaultRightToLeft_ = 1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !1 : -1 == goog.ui.Component.DEFAULT_BIDI_DIR ? !0 : null;
goog.ui.Component.EventType = {
    BEFORE_SHOW: "beforeshow",
    SHOW: "show",
    HIDE: "hide",
    DISABLE: "disable",
    ENABLE: "enable",
    HIGHLIGHT: "highlight",
    UNHIGHLIGHT: "unhighlight",
    ACTIVATE: "activate",
    DEACTIVATE: "deactivate",
    SELECT: "select",
    UNSELECT: "unselect",
    CHECK: "check",
    UNCHECK: "uncheck",
    FOCUS: "focus",
    BLUR: "blur",
    OPEN: "open",
    CLOSE: "close",
    ENTER: "enter",
    LEAVE: "leave",
    ACTION: "action",
    CHANGE: "change"
};
goog.ui.Component.Error = {
    NOT_SUPPORTED: "Method not supported",
    DECORATE_INVALID: "Invalid element to decorate",
    ALREADY_RENDERED: "Component already rendered",
    PARENT_UNABLE_TO_BE_SET: "Unable to set parent component",
    CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds",
    NOT_OUR_CHILD: "Child is not in parent component",
    NOT_IN_DOCUMENT: "Operation not supported while component is not in document",
    STATE_INVALID: "Invalid component state"
};
goog.ui.Component.State = {
    ALL: 255,
    DISABLED: 1,
    HOVER: 2,
    ACTIVE: 4,
    SELECTED: 8,
    CHECKED: 16,
    FOCUSED: 32,
    OPENED: 64
};
goog.ui.Component.getStateTransitionEvent = function(a, b) {
    switch (a) {
        case goog.ui.Component.State.DISABLED:
            return b ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
        case goog.ui.Component.State.HOVER:
            return b ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
        case goog.ui.Component.State.ACTIVE:
            return b ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
        case goog.ui.Component.State.SELECTED:
            return b ? goog.ui.Component.EventType.SELECT :
                goog.ui.Component.EventType.UNSELECT;
        case goog.ui.Component.State.CHECKED:
            return b ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
        case goog.ui.Component.State.FOCUSED:
            return b ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
        case goog.ui.Component.State.OPENED:
            return b ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
    }
    throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function(a) {
    goog.ui.Component.defaultRightToLeft_ = a
};
goog.ui.Component.prototype.getId = function() {
    return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function(a) {
    this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, a, this));
    this.id_ = a
};
goog.ui.Component.prototype.getElement = function() {
    return this.element_
};
goog.ui.Component.prototype.getElementStrict = function() {
    var a = this.element_;
    goog.asserts.assert(a, "Can not call getElementStrict before rendering/decorating.");
    return a
};
goog.ui.Component.prototype.setElementInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.getElementsByClass = function(a) {
    return this.element_ ? this.dom_.getElementsByClass(a, this.element_) : []
};
goog.ui.Component.prototype.getElementByClass = function(a) {
    return this.element_ ? this.dom_.getElementByClass(a, this.element_) : null
};
goog.ui.Component.prototype.getRequiredElementByClass = function(a) {
    var b = this.getElementByClass(a);
    goog.asserts.assert(b, "Expected element in component with class: %s", a);
    return b
};
goog.ui.Component.prototype.getHandler = function() {
    this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this));
    return this.googUiComponentHandler_
};
goog.ui.Component.prototype.setParent = function(a) {
    if (this == a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.parent_ = a;
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getParent = function() {
    return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function(a) {
    if (this.parent_ && this.parent_ != a) throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getDomHelper = function() {
    return this.dom_
};
goog.ui.Component.prototype.isInDocument = function() {
    return this.inDocument_
};
goog.ui.Component.prototype.createDom = function() {
    this.element_ = this.dom_.createElement(goog.dom.TagName.DIV)
};
goog.ui.Component.prototype.render = function(a) {
    this.render_(a)
};
goog.ui.Component.prototype.renderBefore = function(a) {
    this.render_(a.parentNode, a)
};
goog.ui.Component.prototype.render_ = function(a, b) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.element_ || this.createDom();
    a ? a.insertBefore(this.element_, b || null) : this.dom_.getDocument().body.appendChild(this.element_);
    this.parent_ && !this.parent_.isInDocument() || this.enterDocument()
};
goog.ui.Component.prototype.decorate = function(a) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (a && this.canDecorate(a)) {
        this.wasDecorated_ = !0;
        var b = goog.dom.getOwnerDocument(a);
        this.dom_ && this.dom_.getDocument() == b || (this.dom_ = goog.dom.getDomHelper(a));
        this.decorateInternal(a);
        goog.ui.Component.ALLOW_DETACHED_DECORATION && !goog.dom.contains(b, a) || this.enterDocument()
    } else throw Error(goog.ui.Component.Error.DECORATE_INVALID);
};
goog.ui.Component.prototype.canDecorate = function(a) {
    return !0
};
goog.ui.Component.prototype.wasDecorated = function() {
    return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.enterDocument = function() {
    this.inDocument_ = !0;
    this.forEachChild(function(a) {
        !a.isInDocument() && a.getElement() && a.enterDocument()
    })
};
goog.ui.Component.prototype.exitDocument = function() {
    this.forEachChild(function(a) {
        a.isInDocument() && a.exitDocument()
    });
    this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
    this.inDocument_ = !1
};
goog.ui.Component.prototype.disposeInternal = function() {
    this.inDocument_ && this.exitDocument();
    this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
    this.forEachChild(function(a) {
        a.dispose()
    });
    !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
    this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null;
    goog.ui.Component.superClass_.disposeInternal.call(this)
};
goog.ui.Component.prototype.makeId = function(a) {
    return this.getId() + "." + a
};
goog.ui.Component.prototype.makeIds = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = this.makeId(a[c]);
    return b
};
goog.ui.Component.prototype.getModel = function() {
    return this.model_
};
goog.ui.Component.prototype.setModel = function(a) {
    this.model_ = a
};
goog.ui.Component.prototype.getFragmentFromId = function(a) {
    return a.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function(a) {
    if (!this.inDocument_) throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
    return this.dom_.getElement(this.makeId(a))
};
goog.ui.Component.prototype.addChild = function(a, b) {
    this.addChildAt(a, this.getChildCount(), b)
};
goog.ui.Component.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assert(!!a, "Provided element must not be null.");
    if (a.inDocument_ && (c || !this.inDocument_)) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    if (0 > b || b > this.getChildCount()) throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
    this.childIndex_ && this.children_ || (this.childIndex_ = {}, this.children_ = []);
    a.getParent() == this ? (goog.object.set(this.childIndex_, a.getId(), a), goog.array.remove(this.children_, a)) : goog.object.add(this.childIndex_,
        a.getId(), a);
    a.setParent(this);
    goog.array.insertAt(this.children_, a, b);
    a.inDocument_ && this.inDocument_ && a.getParent() == this ? (c = this.getContentElement(), b = c.childNodes[b] || null, b != a.getElement() && c.insertBefore(a.getElement(), b)) : c ? (this.element_ || this.createDom(), b = this.getChildAt(b + 1), a.render_(this.getContentElement(), b ? b.element_ : null)) : this.inDocument_ && !a.inDocument_ && a.element_ && a.element_.parentNode && a.element_.parentNode.nodeType == goog.dom.NodeType.ELEMENT && a.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function() {
    return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function() {
    null == this.rightToLeft_ && (this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body));
    return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function(a) {
    if (this.inDocument_) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.rightToLeft_ = a
};
goog.ui.Component.prototype.hasChildren = function() {
    return !!this.children_ && 0 != this.children_.length
};
goog.ui.Component.prototype.getChildCount = function() {
    return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b.getId())
    });
    return a
};
goog.ui.Component.prototype.getChild = function(a) {
    return this.childIndex_ && a ? goog.object.get(this.childIndex_, a) || null : null
};
goog.ui.Component.prototype.getChildAt = function(a) {
    return this.children_ ? this.children_[a] || null : null
};
goog.ui.Component.prototype.forEachChild = function(a, b) {
    this.children_ && goog.array.forEach(this.children_, a, b)
};
goog.ui.Component.prototype.indexOfChild = function(a) {
    return this.children_ && a ? goog.array.indexOf(this.children_, a) : -1
};
goog.ui.Component.prototype.removeChild = function(a, b) {
    if (a) {
        var c = goog.isString(a) ? a : a.getId();
        a = this.getChild(c);
        c && a && (goog.object.remove(this.childIndex_, c), goog.array.remove(this.children_, a), b && (a.exitDocument(), a.element_ && goog.dom.removeNode(a.element_)), a.setParent(null))
    }
    if (!a) throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
    return a
};
goog.ui.Component.prototype.removeChildAt = function(a, b) {
    return this.removeChild(this.getChildAt(a), b)
};
goog.ui.Component.prototype.removeChildren = function(a) {
    for (var b = []; this.hasChildren();) b.push(this.removeChildAt(0, a));
    return b
};
goog.a11y = {};
goog.a11y.aria = {};
goog.a11y.aria.Role = {
    ALERT: "alert",
    ALERTDIALOG: "alertdialog",
    APPLICATION: "application",
    ARTICLE: "article",
    BANNER: "banner",
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COLUMNHEADER: "columnheader",
    COMBOBOX: "combobox",
    COMPLEMENTARY: "complementary",
    CONTENTINFO: "contentinfo",
    DEFINITION: "definition",
    DIALOG: "dialog",
    DIRECTORY: "directory",
    DOCUMENT: "document",
    FORM: "form",
    GRID: "grid",
    GRIDCELL: "gridcell",
    GROUP: "group",
    HEADING: "heading",
    IMG: "img",
    LINK: "link",
    LIST: "list",
    LISTBOX: "listbox",
    LISTITEM: "listitem",
    LOG: "log",
    MAIN: "main",
    MARQUEE: "marquee",
    MATH: "math",
    MENU: "menu",
    MENUBAR: "menubar",
    MENU_ITEM: "menuitem",
    MENU_ITEM_CHECKBOX: "menuitemcheckbox",
    MENU_ITEM_RADIO: "menuitemradio",
    NAVIGATION: "navigation",
    NOTE: "note",
    OPTION: "option",
    PRESENTATION: "presentation",
    PROGRESSBAR: "progressbar",
    RADIO: "radio",
    RADIOGROUP: "radiogroup",
    REGION: "region",
    ROW: "row",
    ROWGROUP: "rowgroup",
    ROWHEADER: "rowheader",
    SCROLLBAR: "scrollbar",
    SEARCH: "search",
    SEPARATOR: "separator",
    SLIDER: "slider",
    SPINBUTTON: "spinbutton",
    STATUS: "status",
    TAB: "tab",
    TAB_LIST: "tablist",
    TAB_PANEL: "tabpanel",
    TEXTBOX: "textbox",
    TEXTINFO: "textinfo",
    TIMER: "timer",
    TOOLBAR: "toolbar",
    TOOLTIP: "tooltip",
    TREE: "tree",
    TREEGRID: "treegrid",
    TREEITEM: "treeitem"
};
goog.a11y.aria.State = {
    ACTIVEDESCENDANT: "activedescendant",
    ATOMIC: "atomic",
    AUTOCOMPLETE: "autocomplete",
    BUSY: "busy",
    CHECKED: "checked",
    CONTROLS: "controls",
    DESCRIBEDBY: "describedby",
    DISABLED: "disabled",
    DROPEFFECT: "dropeffect",
    EXPANDED: "expanded",
    FLOWTO: "flowto",
    GRABBED: "grabbed",
    HASPOPUP: "haspopup",
    HIDDEN: "hidden",
    INVALID: "invalid",
    LABEL: "label",
    LABELLEDBY: "labelledby",
    LEVEL: "level",
    LIVE: "live",
    MULTILINE: "multiline",
    MULTISELECTABLE: "multiselectable",
    ORIENTATION: "orientation",
    OWNS: "owns",
    POSINSET: "posinset",
    PRESSED: "pressed",
    READONLY: "readonly",
    RELEVANT: "relevant",
    REQUIRED: "required",
    SELECTED: "selected",
    SETSIZE: "setsize",
    SORT: "sort",
    VALUEMAX: "valuemax",
    VALUEMIN: "valuemin",
    VALUENOW: "valuenow",
    VALUETEXT: "valuetext"
};
goog.a11y.aria.AutoCompleteValues = {
    INLINE: "inline",
    LIST: "list",
    BOTH: "both",
    NONE: "none"
};
goog.a11y.aria.DropEffectValues = {
    COPY: "copy",
    MOVE: "move",
    LINK: "link",
    EXECUTE: "execute",
    POPUP: "popup",
    NONE: "none"
};
goog.a11y.aria.LivePriority = {
    OFF: "off",
    POLITE: "polite",
    ASSERTIVE: "assertive"
};
goog.a11y.aria.OrientationValues = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
};
goog.a11y.aria.RelevantValues = {
    ADDITIONS: "additions",
    REMOVALS: "removals",
    TEXT: "text",
    ALL: "all"
};
goog.a11y.aria.SortValues = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none",
    OTHER: "other"
};
goog.a11y.aria.CheckedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.ExpandedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.GrabbedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.InvalidValues = {
    FALSE: "false",
    TRUE: "true",
    GRAMMAR: "grammar",
    SPELLING: "spelling"
};
goog.a11y.aria.PressedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.SelectedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.datatables = {};
goog.a11y.aria.datatables.getDefaultValuesMap = function() {
    goog.a11y.aria.DefaultStateValueMap_ || (goog.a11y.aria.DefaultStateValueMap_ = goog.object.create(goog.a11y.aria.State.ATOMIC, !1, goog.a11y.aria.State.AUTOCOMPLETE, "none", goog.a11y.aria.State.DROPEFFECT, "none", goog.a11y.aria.State.HASPOPUP, !1, goog.a11y.aria.State.LIVE, "off", goog.a11y.aria.State.MULTILINE, !1, goog.a11y.aria.State.MULTISELECTABLE, !1, goog.a11y.aria.State.ORIENTATION, "vertical", goog.a11y.aria.State.READONLY, !1, goog.a11y.aria.State.RELEVANT,
        "additions text", goog.a11y.aria.State.REQUIRED, !1, goog.a11y.aria.State.SORT, "none", goog.a11y.aria.State.BUSY, !1, goog.a11y.aria.State.DISABLED, !1, goog.a11y.aria.State.HIDDEN, !1, goog.a11y.aria.State.INVALID, "false"));
    return goog.a11y.aria.DefaultStateValueMap_
};
goog.a11y.aria.ARIA_PREFIX_ = "aria-";
goog.a11y.aria.ROLE_ATTRIBUTE_ = "role";
goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_ = [goog.dom.TagName.A, goog.dom.TagName.AREA, goog.dom.TagName.BUTTON, goog.dom.TagName.HEAD, goog.dom.TagName.INPUT, goog.dom.TagName.LINK, goog.dom.TagName.MENU, goog.dom.TagName.META, goog.dom.TagName.OPTGROUP, goog.dom.TagName.OPTION, goog.dom.TagName.PROGRESS, goog.dom.TagName.STYLE, goog.dom.TagName.SELECT, goog.dom.TagName.SOURCE, goog.dom.TagName.TEXTAREA, goog.dom.TagName.TITLE, goog.dom.TagName.TRACK];
goog.a11y.aria.CONTAINER_ROLES_ = [goog.a11y.aria.Role.COMBOBOX, goog.a11y.aria.Role.GRID, goog.a11y.aria.Role.GROUP, goog.a11y.aria.Role.LISTBOX, goog.a11y.aria.Role.MENU, goog.a11y.aria.Role.MENUBAR, goog.a11y.aria.Role.RADIOGROUP, goog.a11y.aria.Role.ROW, goog.a11y.aria.Role.ROWGROUP, goog.a11y.aria.Role.TAB_LIST, goog.a11y.aria.Role.TEXTBOX, goog.a11y.aria.Role.TOOLBAR, goog.a11y.aria.Role.TREE, goog.a11y.aria.Role.TREEGRID];
goog.a11y.aria.setRole = function(a, b) {
    b ? (goog.asserts.ENABLE_ASSERTS && goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role, b), "No such ARIA role " + b), a.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_, b)) : goog.a11y.aria.removeRole(a)
};
goog.a11y.aria.getRole = function(a) {
    return a.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_) || null
};
goog.a11y.aria.removeRole = function(a) {
    a.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)
};
goog.a11y.aria.setState = function(a, b, c) {
    goog.isArray(c) && (c = c.join(" "));
    var d = goog.a11y.aria.getAriaAttributeName_(b);
    "" === c || void 0 == c ? (c = goog.a11y.aria.datatables.getDefaultValuesMap(), b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
};
goog.a11y.aria.toggleState = function(a, b) {
    var c = goog.a11y.aria.getState(a, b);
    goog.string.isEmptyOrWhitespace(goog.string.makeSafe(c)) || "true" == c || "false" == c ? goog.a11y.aria.setState(a, b, "true" == c ? "false" : "true") : goog.a11y.aria.removeState(a, b)
};
goog.a11y.aria.removeState = function(a, b) {
    a.removeAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.getState = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return null == c || void 0 == c ? "" : String(c)
};
goog.a11y.aria.getActiveDescendant = function(a) {
    var b = goog.a11y.aria.getState(a, goog.a11y.aria.State.ACTIVEDESCENDANT);
    return goog.dom.getOwnerDocument(a).getElementById(b)
};
goog.a11y.aria.setActiveDescendant = function(a, b) {
    var c = "";
    b && (c = b.id, goog.asserts.assert(c, "The active element should have an id."));
    goog.a11y.aria.setState(a, goog.a11y.aria.State.ACTIVEDESCENDANT, c)
};
goog.a11y.aria.getLabel = function(a) {
    return goog.a11y.aria.getState(a, goog.a11y.aria.State.LABEL)
};
goog.a11y.aria.setLabel = function(a, b) {
    goog.a11y.aria.setState(a, goog.a11y.aria.State.LABEL, b)
};
goog.a11y.aria.assertRoleIsSetInternalUtil = function(a, b) {
    if (!goog.array.contains(goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_, a.tagName)) {
        var c = goog.a11y.aria.getRole(a);
        goog.asserts.assert(null != c, "The element ARIA role cannot be null.");
        goog.asserts.assert(goog.array.contains(b, c), 'Non existing or incorrect role set for element.The role set is "' + c + '". The role should be any of "' + b + '". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.')
    }
};
goog.a11y.aria.getStateBoolean = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert(goog.isBoolean(c) || null == c || "true" == c || "false" == c);
    return null == c ? c : goog.isBoolean(c) ? c : "true" == c
};
goog.a11y.aria.getStateNumber = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || !isNaN(+c)) && !goog.isBoolean(c));
    return null == c ? null : +c
};
goog.a11y.aria.getStateString = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || goog.isString(c)) && ("" == c || isNaN(+c)) && "true" != c && "false" != c);
    return null == c || "" == c ? null : c
};
goog.a11y.aria.getStringArrayStateInternalUtil = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return goog.a11y.aria.splitStringOnWhitespace_(c)
};
goog.a11y.aria.hasState = function(a, b) {
    return a.hasAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.isContainerRole = function(a) {
    a = goog.a11y.aria.getRole(a);
    return goog.array.contains(goog.a11y.aria.CONTAINER_ROLES_, a)
};
goog.a11y.aria.splitStringOnWhitespace_ = function(a) {
    return a ? a.split(/\s+/) : []
};
goog.a11y.aria.getAriaAttributeName_ = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.assert(a, "ARIA attribute cannot be empty."), goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State, a), "No such ARIA attribute " + a));
    return goog.a11y.aria.ARIA_PREFIX_ + a
};
goog.events.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
    if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) return !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.ALT:
        case goog.events.KeyCodes.CAPS_LOCK:
        case goog.events.KeyCodes.CONTEXT_MENU:
        case goog.events.KeyCodes.CTRL:
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.END:
        case goog.events.KeyCodes.ESC:
        case goog.events.KeyCodes.HOME:
        case goog.events.KeyCodes.INSERT:
        case goog.events.KeyCodes.LEFT:
        case goog.events.KeyCodes.MAC_FF_META:
        case goog.events.KeyCodes.META:
        case goog.events.KeyCodes.NUMLOCK:
        case goog.events.KeyCodes.NUM_CENTER:
        case goog.events.KeyCodes.PAGE_DOWN:
        case goog.events.KeyCodes.PAGE_UP:
        case goog.events.KeyCodes.PAUSE:
        case goog.events.KeyCodes.PHANTOM:
        case goog.events.KeyCodes.PRINT_SCREEN:
        case goog.events.KeyCodes.RIGHT:
        case goog.events.KeyCodes.SCROLL_LOCK:
        case goog.events.KeyCodes.SHIFT:
        case goog.events.KeyCodes.UP:
        case goog.events.KeyCodes.VK_NONAME:
        case goog.events.KeyCodes.WIN_KEY:
        case goog.events.KeyCodes.WIN_KEY_RIGHT:
            return !1;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return !goog.userAgent.GECKO;
        default:
            return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
    }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e) {
    if (!(goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"))) return !0;
    if (goog.userAgent.MAC && e) return goog.events.KeyCodes.isCharacterKey(a);
    if (e && !d) return !1;
    goog.isNumber(b) && (b = goog.events.KeyCodes.normalizeKeyCode(b));
    if (!c && (b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META)) return !1;
    if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) &&
        d && c) switch (a) {
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.TILDE:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
            return !1
    }
    if (goog.userAgent.IE && d && b == a) return !1;
    switch (a) {
        case goog.events.KeyCodes.ENTER:
            return !0;
        case goog.events.KeyCodes.ESC:
            return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE)
    }
    return goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
    if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == a) return !0;
    switch (a) {
        case goog.events.KeyCodes.SPACE:
        case goog.events.KeyCodes.PLUS_SIGN:
        case goog.events.KeyCodes.QUESTION_MARK:
        case goog.events.KeyCodes.AT_SIGN:
        case goog.events.KeyCodes.NUM_PLUS:
        case goog.events.KeyCodes.NUM_MINUS:
        case goog.events.KeyCodes.NUM_PERIOD:
        case goog.events.KeyCodes.NUM_DIVISION:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.FF_SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.FF_EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
            return !0;
        default:
            return !1
    }
};
goog.events.KeyCodes.normalizeKeyCode = function(a) {
    return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(a) : a
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.FF_EQUALS:
            return goog.events.KeyCodes.EQUALS;
        case goog.events.KeyCodes.FF_SEMICOLON:
            return goog.events.KeyCodes.SEMICOLON;
        case goog.events.KeyCodes.FF_DASH:
            return goog.events.KeyCodes.DASH;
        case goog.events.KeyCodes.MAC_FF_META:
            return goog.events.KeyCodes.META;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return goog.events.KeyCodes.WIN_KEY;
        default:
            return a
    }
};
goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
            return goog.events.KeyCodes.META;
        default:
            return a
    }
};
goog.events.KeyHandler = function(a, b) {
    goog.events.EventTarget.call(this);
    a && this.attach(a, b)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {
    KEY: "key"
};
goog.events.KeyHandler.safariKey_ = {
    3: goog.events.KeyCodes.ENTER,
    12: goog.events.KeyCodes.NUMLOCK,
    63232: goog.events.KeyCodes.UP,
    63233: goog.events.KeyCodes.DOWN,
    63234: goog.events.KeyCodes.LEFT,
    63235: goog.events.KeyCodes.RIGHT,
    63236: goog.events.KeyCodes.F1,
    63237: goog.events.KeyCodes.F2,
    63238: goog.events.KeyCodes.F3,
    63239: goog.events.KeyCodes.F4,
    63240: goog.events.KeyCodes.F5,
    63241: goog.events.KeyCodes.F6,
    63242: goog.events.KeyCodes.F7,
    63243: goog.events.KeyCodes.F8,
    63244: goog.events.KeyCodes.F9,
    63245: goog.events.KeyCodes.F10,
    63246: goog.events.KeyCodes.F11,
    63247: goog.events.KeyCodes.F12,
    63248: goog.events.KeyCodes.PRINT_SCREEN,
    63272: goog.events.KeyCodes.DELETE,
    63273: goog.events.KeyCodes.HOME,
    63275: goog.events.KeyCodes.END,
    63276: goog.events.KeyCodes.PAGE_UP,
    63277: goog.events.KeyCodes.PAGE_DOWN,
    63289: goog.events.KeyCodes.NUMLOCK,
    63302: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.keyIdentifier_ = {
    Up: goog.events.KeyCodes.UP,
    Down: goog.events.KeyCodes.DOWN,
    Left: goog.events.KeyCodes.LEFT,
    Right: goog.events.KeyCodes.RIGHT,
    Enter: goog.events.KeyCodes.ENTER,
    F1: goog.events.KeyCodes.F1,
    F2: goog.events.KeyCodes.F2,
    F3: goog.events.KeyCodes.F3,
    F4: goog.events.KeyCodes.F4,
    F5: goog.events.KeyCodes.F5,
    F6: goog.events.KeyCodes.F6,
    F7: goog.events.KeyCodes.F7,
    F8: goog.events.KeyCodes.F8,
    F9: goog.events.KeyCodes.F9,
    F10: goog.events.KeyCodes.F10,
    F11: goog.events.KeyCodes.F11,
    F12: goog.events.KeyCodes.F12,
    "U+007F": goog.events.KeyCodes.DELETE,
    Home: goog.events.KeyCodes.HOME,
    End: goog.events.KeyCodes.END,
    PageUp: goog.events.KeyCodes.PAGE_UP,
    PageDown: goog.events.KeyCodes.PAGE_DOWN,
    Insert: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
    (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !a.metaKey) && this.resetState(); - 1 == this.lastKey_ && (a.ctrlKey && a.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : a.altKey && a.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : a.metaKey &&
        a.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
    goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(a.keyCode), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = a.altKey))
};
goog.events.KeyHandler.prototype.resetState = function() {
    this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.handleKeyup_ = function(a) {
    this.resetState();
    this.altKey_ = a.altKey
};
goog.events.KeyHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent(),
        c, d, e = b.altKey;
    goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = c != goog.events.KeyCodes.ENTER && c != goog.events.KeyCodes.ESC ? b.keyCode : 0) : (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = 0 <= b.charCode && 63232 > b.charCode && goog.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0) : goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? (c = this.keyCode_, d =
        goog.events.KeyCodes.isCharacterKey(c) ? b.keyCode : 0) : (c = b.keyCode || this.keyCode_, d = b.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (e = this.altKey_), goog.userAgent.MAC && d == goog.events.KeyCodes.QUESTION_MARK && c == goog.events.KeyCodes.WIN_KEY && (c = goog.events.KeyCodes.SLASH));
    var f = c = goog.events.KeyCodes.normalizeKeyCode(c),
        g = b.keyIdentifier;
    c ? 63232 <= c && c in goog.events.KeyHandler.safariKey_ ? f = goog.events.KeyHandler.safariKey_[c] : 25 == c && a.shiftKey && (f = 9) : g && g in goog.events.KeyHandler.keyIdentifier_ &&
        (f = goog.events.KeyHandler.keyIdentifier_[g]);
    a = f == this.lastKey_;
    this.lastKey_ = f;
    b = new goog.events.KeyEvent(f, d, a, b);
    b.altKey = e;
    this.dispatchEvent(b)
};
goog.events.KeyHandler.prototype.getElement = function() {
    return this.element_
};
goog.events.KeyHandler.prototype.attach = function(a, b) {
    this.keyUpKey_ && this.detach();
    this.element_ = a;
    this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
    this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
    this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
};
goog.events.KeyHandler.prototype.detach = function() {
    this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
    this.element_ = null;
    this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function() {
    goog.events.KeyHandler.superClass_.disposeInternal.call(this);
    this.detach()
};
goog.events.KeyEvent = function(a, b, c, d) {
    goog.events.BrowserEvent.call(this, d);
    this.type = goog.events.KeyHandler.EventType.KEY;
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.get = function(a) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) return a.classList;
    a = a.className;
    return goog.isString(a) && a.match(/\S+/g) || []
};
goog.dom.classlist.set = function(a, b) {
    a.className = b
};
goog.dom.classlist.contains = function(a, b) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b)
};
goog.dom.classlist.add = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.add(b) : goog.dom.classlist.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
};
goog.dom.classlist.addAll = function(a, b) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) goog.array.forEach(b, function(b) {
        goog.dom.classlist.add(a, b)
    });
    else {
        var c = {};
        goog.array.forEach(goog.dom.classlist.get(a), function(a) {
            c[a] = !0
        });
        goog.array.forEach(b, function(a) {
            c[a] = !0
        });
        a.className = "";
        for (var d in c) a.className += 0 < a.className.length ? " " + d : d
    }
};
goog.dom.classlist.remove = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && (a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return a != b
    }).join(" "))
};
goog.dom.classlist.removeAll = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
        goog.dom.classlist.remove(a, b)
    }) : a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return !goog.array.contains(b, a)
    }).join(" ")
};
goog.dom.classlist.enable = function(a, b, c) {
    c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b)
};
goog.dom.classlist.enableAll = function(a, b, c) {
    (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b)
};
goog.dom.classlist.swap = function(a, b, c) {
    return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1
};
goog.dom.classlist.toggle = function(a, b) {
    var c = !goog.dom.classlist.contains(a, b);
    goog.dom.classlist.enable(a, b, c);
    return c
};
goog.dom.classlist.addRemove = function(a, b, c) {
    goog.dom.classlist.remove(a, b);
    goog.dom.classlist.add(a, c)
};
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function(a) {
    for (var b; a;) {
        b = goog.getUid(a);
        if (b = goog.ui.registry.defaultRenderers_[b]) break;
        a = a.superClass_ ? a.superClass_.constructor : null
    }
    return b ? goog.isFunction(b.getInstance) ? b.getInstance() : new b : null
};
goog.ui.registry.setDefaultRenderer = function(a, b) {
    if (!goog.isFunction(a)) throw Error("Invalid component class " + a);
    if (!goog.isFunction(b)) throw Error("Invalid renderer class " + b);
    var c = goog.getUid(a);
    goog.ui.registry.defaultRenderers_[c] = b
};
goog.ui.registry.getDecoratorByClassName = function(a) {
    return a in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[a]() : null
};
goog.ui.registry.setDecoratorByClassName = function(a, b) {
    if (!a) throw Error("Invalid class name " + a);
    if (!goog.isFunction(b)) throw Error("Invalid decorator function " + b);
    goog.ui.registry.decoratorFunctions_[a] = b
};
goog.ui.registry.getDecorator = function(a) {
    goog.asserts.assert(a);
    for (var b = goog.dom.classlist.get(a), c = 0, d = b.length; c < d; c++)
        if (a = goog.ui.registry.getDecoratorByClassName(b[c])) return a;
    return null
};
goog.ui.registry.reset = function() {
    goog.ui.registry.defaultRenderers_ = {};
    goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.ContainerRenderer = function(a) {
    this.ariaRole_ = a
};
goog.addSingletonGetter(goog.ui.ContainerRenderer);
goog.ui.ContainerRenderer.getCustomRenderer = function(a, b) {
    var c = new a;
    c.getCssClass = function() {
        return b
    };
    return c
};
goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
goog.ui.ContainerRenderer.prototype.getAriaRole = function() {
    return this.ariaRole_
};
goog.ui.ContainerRenderer.prototype.enableTabIndex = function(a, b) {
    a && (a.tabIndex = b ? 0 : -1)
};
goog.ui.ContainerRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(a).join(" "))
};
goog.ui.ContainerRenderer.prototype.getContentElement = function(a) {
    return a
};
goog.ui.ContainerRenderer.prototype.canDecorate = function(a) {
    return "DIV" == a.tagName
};
goog.ui.ContainerRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    var c = this.getCssClass(),
        d = !1,
        e = goog.dom.classlist.get(b);
    e && goog.array.forEach(e, function(b) {
        b == c ? d = !0 : b && this.setStateFromClassName(a, b, c)
    }, this);
    d || goog.dom.classlist.add(b, c);
    this.decorateChildren(a, this.getContentElement(b));
    return b
};
goog.ui.ContainerRenderer.prototype.setStateFromClassName = function(a, b, c) {
    b == c + "-disabled" ? a.setEnabled(!1) : b == c + "-horizontal" ? a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : b == c + "-vertical" && a.setOrientation(goog.ui.Container.Orientation.VERTICAL)
};
goog.ui.ContainerRenderer.prototype.decorateChildren = function(a, b, c) {
    if (b) {
        c = c || b.firstChild;
        for (var d; c && c.parentNode == b;) {
            d = c.nextSibling;
            if (c.nodeType == goog.dom.NodeType.ELEMENT) {
                var e = this.getDecoratorForChild(c);
                e && (e.setElementInternal(c), a.isEnabled() || e.setEnabled(!1), a.addChild(e), e.decorate(c))
            } else c.nodeValue && "" != goog.string.trim(c.nodeValue) || b.removeChild(c);
            c = d
        }
    }
};
goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function(a) {
    return goog.ui.registry.getDecorator(a)
};
goog.ui.ContainerRenderer.prototype.initializeDom = function(a) {
    a = a.getElement();
    goog.asserts.assert(a, "The container DOM element cannot be null.");
    goog.style.setUnselectable(a, !0, goog.userAgent.GECKO);
    goog.userAgent.IE && (a.hideFocus = !0);
    var b = this.getAriaRole();
    b && goog.a11y.aria.setRole(a, b)
};
goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function(a) {
    return a.getElement()
};
goog.ui.ContainerRenderer.prototype.getCssClass = function() {
    return goog.ui.ContainerRenderer.CSS_CLASS
};
goog.ui.ContainerRenderer.prototype.getClassNames = function(a) {
    var b = this.getCssClass(),
        c = a.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL,
        c = [b, c ? b + "-horizontal" : b + "-vertical"];
    a.isEnabled() || c.push(b + "-disabled");
    return c
};
goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function() {
    return goog.ui.Container.Orientation.VERTICAL
};
goog.ui.ControlRenderer = function() {};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.tagUnsealableClass(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function(a, b) {
    var c = new a;
    c.getCssClass = function() {
        return b
    };
    return c
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_ = goog.object.create(goog.a11y.aria.Role.BUTTON, goog.a11y.aria.State.PRESSED, goog.a11y.aria.Role.CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.MENU_ITEM_CHECKBOX, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.MENU_ITEM_RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.RADIO, goog.a11y.aria.State.CHECKED, goog.a11y.aria.Role.TAB, goog.a11y.aria.State.SELECTED, goog.a11y.aria.Role.TREEITEM,
    goog.a11y.aria.State.SELECTED);
goog.ui.ControlRenderer.prototype.getAriaRole = function() {};
goog.ui.ControlRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(a).join(" "), a.getContent())
};
goog.ui.ControlRenderer.prototype.getContentElement = function(a) {
    return a
};
goog.ui.ControlRenderer.prototype.enableClassName = function(a, b, c) {
    if (a = a.getElement ? a.getElement() : a) {
        var d = [b];
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && (d = this.getAppliedCombinedClassNames_(goog.dom.classlist.get(a), b), d.push(b));
        goog.dom.classlist.enableAll(a, d, c)
    }
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function(a, b, c) {
    this.enableClassName(a, b, c)
};
goog.ui.ControlRenderer.prototype.canDecorate = function(a) {
    return !0
};
goog.ui.ControlRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    var c = this.getContentElement(b);
    c && c.firstChild ? a.setContentInternal(c.firstChild.nextSibling ? goog.array.clone(c.childNodes) : c.firstChild) : a.setContentInternal(null);
    var d = 0,
        e = this.getCssClass(),
        f = this.getStructuralCssClass(),
        g = !1,
        h = !1,
        k = !1,
        l = goog.array.toArray(goog.dom.classlist.get(b));
    goog.array.forEach(l, function(a) {
        g || a != e ? h || a != f ? d |= this.getStateFromClass(a) : h = !0 : (g = !0, f == e && (h = !0));
        this.getStateFromClass(a) == goog.ui.Component.State.DISABLED &&
            (goog.asserts.assertElement(c), goog.dom.isFocusableTabIndex(c) && goog.dom.setFocusableTabIndex(c, !1))
    }, this);
    a.setStateInternal(d);
    g || (l.push(e), f == e && (h = !0));
    h || l.push(f);
    var p = a.getExtraClassNames();
    p && l.push.apply(l, p);
    if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7")) {
        var m = this.getAppliedCombinedClassNames_(l);
        0 < m.length && (l.push.apply(l, m), k = !0)
    }
    g && h && !p && !k || goog.dom.classlist.set(b, l.join(" "));
    return b
};
goog.ui.ControlRenderer.prototype.initializeDom = function(a) {
    a.isRightToLeft() && this.setRightToLeft(a.getElement(), !0);
    a.isEnabled() && this.setFocusable(a, a.isVisible())
};
goog.ui.ControlRenderer.prototype.setAriaRole = function(a, b) {
    var c = b || this.getAriaRole();
    if (c) {
        goog.asserts.assert(a, "The element passed as a first parameter cannot be null.");
        var d = goog.a11y.aria.getRole(a);
        c != d && goog.a11y.aria.setRole(a, c)
    }
};
goog.ui.ControlRenderer.prototype.setAriaStates = function(a, b) {
    goog.asserts.assert(a);
    goog.asserts.assert(b);
    var c = a.getAriaLabel();
    goog.isDefAndNotNull(c) && this.setAriaLabel(b, c);
    a.isVisible() || goog.a11y.aria.setState(b, goog.a11y.aria.State.HIDDEN, !a.isVisible());
    a.isEnabled() || this.updateAriaState(b, goog.ui.Component.State.DISABLED, !a.isEnabled());
    a.isSupportedState(goog.ui.Component.State.SELECTED) && this.updateAriaState(b, goog.ui.Component.State.SELECTED, a.isSelected());
    a.isSupportedState(goog.ui.Component.State.CHECKED) &&
        this.updateAriaState(b, goog.ui.Component.State.CHECKED, a.isChecked());
    a.isSupportedState(goog.ui.Component.State.OPENED) && this.updateAriaState(b, goog.ui.Component.State.OPENED, a.isOpen())
};
goog.ui.ControlRenderer.prototype.setAriaLabel = function(a, b) {
    goog.a11y.aria.setLabel(a, b)
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(a, b) {
    goog.style.setUnselectable(a, !b, !goog.userAgent.IE && !goog.userAgent.OPERA)
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function(a, b) {
    this.enableClassName(a, this.getStructuralCssClass() + "-rtl", b)
};
goog.ui.ControlRenderer.prototype.isFocusable = function(a) {
    var b;
    return a.isSupportedState(goog.ui.Component.State.FOCUSED) && (b = a.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex(b) : !1
};
goog.ui.ControlRenderer.prototype.setFocusable = function(a, b) {
    var c;
    if (a.isSupportedState(goog.ui.Component.State.FOCUSED) && (c = a.getKeyEventTarget())) {
        if (!b && a.isFocused()) {
            try {
                c.blur()
            } catch (d) {}
            a.isFocused() && a.handleBlur(null)
        }
        goog.dom.isFocusableTabIndex(c) != b && goog.dom.setFocusableTabIndex(c, b)
    }
};
goog.ui.ControlRenderer.prototype.setVisible = function(a, b) {
    goog.style.setElementShown(a, b);
    a && goog.a11y.aria.setState(a, goog.a11y.aria.State.HIDDEN, !b)
};
goog.ui.ControlRenderer.prototype.setState = function(a, b, c) {
    var d = a.getElement();
    if (d) {
        var e = this.getClassForState(b);
        e && this.enableClassName(a, e, c);
        this.updateAriaState(d, b, c)
    }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function(a, b, c) {
    goog.ui.ControlRenderer.ariaAttributeMap_ || (goog.ui.ControlRenderer.ariaAttributeMap_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.a11y.aria.State.DISABLED, goog.ui.Component.State.SELECTED, goog.a11y.aria.State.SELECTED, goog.ui.Component.State.CHECKED, goog.a11y.aria.State.CHECKED, goog.ui.Component.State.OPENED, goog.a11y.aria.State.EXPANDED));
    goog.asserts.assert(a, "The element passed as a first parameter cannot be null.");
    (b = goog.ui.ControlRenderer.getAriaStateForAriaRole_(a, goog.ui.ControlRenderer.ariaAttributeMap_[b])) && goog.a11y.aria.setState(a, b, c)
};
goog.ui.ControlRenderer.getAriaStateForAriaRole_ = function(a, b) {
    var c = goog.a11y.aria.getRole(a);
    if (!c) return b;
    c = goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_[c] || b;
    return goog.ui.ControlRenderer.isAriaState_(b) ? c : b
};
goog.ui.ControlRenderer.isAriaState_ = function(a) {
    return a == goog.a11y.aria.State.CHECKED || a == goog.a11y.aria.State.SELECTED
};
goog.ui.ControlRenderer.prototype.setContent = function(a, b) {
    var c = this.getContentElement(a);
    if (c && (goog.dom.removeChildren(c), b))
        if (goog.isString(b)) goog.dom.setTextContent(c, b);
        else {
            var d = function(a) {
                if (a) {
                    var b = goog.dom.getOwnerDocument(c);
                    c.appendChild(goog.isString(a) ? b.createTextNode(a) : a)
                }
            };
            goog.isArray(b) ? goog.array.forEach(b, d) : !goog.isArrayLike(b) || "nodeType" in b ? d(b) : goog.array.forEach(goog.array.clone(b), d)
        }
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(a) {
    return a.getElement()
};
goog.ui.ControlRenderer.prototype.getCssClass = function() {
    return goog.ui.ControlRenderer.CSS_CLASS
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
    return []
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
    return this.getCssClass()
};
goog.ui.ControlRenderer.prototype.getClassNames = function(a) {
    var b = this.getCssClass(),
        c = [b],
        d = this.getStructuralCssClass();
    d != b && c.push(d);
    b = this.getClassNamesForState(a.getState());
    c.push.apply(c, b);
    (a = a.getExtraClassNames()) && c.push.apply(c, a);
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("7") && c.push.apply(c, this.getAppliedCombinedClassNames_(c));
    return c
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(a, b) {
    var c = [];
    b && (a = goog.array.concat(a, [b]));
    goog.array.forEach(this.getIe6ClassCombinations(), function(d) {
        !goog.array.every(d, goog.partial(goog.array.contains, a)) || b && !goog.array.contains(d, b) || c.push(d.join("_"))
    });
    return c
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function(a) {
    for (var b = []; a;) {
        var c = a & -a;
        b.push(this.getClassForState(c));
        a &= ~c
    }
    return b
};
goog.ui.ControlRenderer.prototype.getClassForState = function(a) {
    this.classByState_ || this.createClassByStateMap_();
    return this.classByState_[a]
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function(a) {
    this.stateByClass_ || this.createStateByClassMap_();
    a = parseInt(this.stateByClass_[a], 10);
    return isNaN(a) ? 0 : a
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
    var a = this.getStructuralCssClass(),
        b = !goog.string.contains(goog.string.normalizeWhitespace(a), " ");
    goog.asserts.assert(b, "ControlRenderer has an invalid css class: '" + a + "'");
    this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, a + "-disabled", goog.ui.Component.State.HOVER, a + "-hover", goog.ui.Component.State.ACTIVE, a + "-active", goog.ui.Component.State.SELECTED, a + "-selected", goog.ui.Component.State.CHECKED, a + "-checked",
        goog.ui.Component.State.FOCUSED, a + "-focused", goog.ui.Component.State.OPENED, a + "-open")
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
    this.classByState_ || this.createClassByStateMap_();
    this.stateByClass_ = goog.object.transpose(this.classByState_)
};
goog.ui.decorate = function(a) {
    var b = goog.ui.registry.getDecorator(a);
    b && b.decorate(a);
    return b
};
goog.ui.Control = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.renderer_ = b || goog.ui.registry.getDefaultRenderer(this.constructor);
    this.setContentInternal(goog.isDef(a) ? a : null);
    this.ariaLabel_ = null
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.tagUnsealableClass(goog.ui.Control);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = !0;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = !0;
goog.ui.Control.prototype.allowTextSelection_ = !1;
goog.ui.Control.prototype.preferredAriaRole_ = null;
goog.ui.Control.prototype.isHandleMouseEvents = function() {
    return this.handleMouseEvents_
};
goog.ui.Control.prototype.setHandleMouseEvents = function(a) {
    this.isInDocument() && a != this.handleMouseEvents_ && this.enableMouseEventHandling_(a);
    this.handleMouseEvents_ = a
};
goog.ui.Control.prototype.getKeyEventTarget = function() {
    return this.renderer_.getKeyEventTarget(this)
};
goog.ui.Control.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
goog.ui.Control.prototype.getRenderer = function() {
    return this.renderer_
};
goog.ui.Control.prototype.setRenderer = function(a) {
    if (this.isInDocument()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.getElement() && this.setElementInternal(null);
    this.renderer_ = a
};
goog.ui.Control.prototype.getExtraClassNames = function() {
    return this.extraClassNames_
};
goog.ui.Control.prototype.addClassName = function(a) {
    a && (this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, a) || this.extraClassNames_.push(a) : this.extraClassNames_ = [a], this.renderer_.enableExtraClassName(this, a, !0))
};
goog.ui.Control.prototype.removeClassName = function(a) {
    a && this.extraClassNames_ && goog.array.remove(this.extraClassNames_, a) && (0 == this.extraClassNames_.length && (this.extraClassNames_ = null), this.renderer_.enableExtraClassName(this, a, !1))
};
goog.ui.Control.prototype.enableClassName = function(a, b) {
    b ? this.addClassName(a) : this.removeClassName(a)
};
goog.ui.Control.prototype.createDom = function() {
    var a = this.renderer_.createDom(this);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
    this.isVisible() || this.renderer_.setVisible(a, !1)
};
goog.ui.Control.prototype.getPreferredAriaRole = function() {
    return this.preferredAriaRole_
};
goog.ui.Control.prototype.setPreferredAriaRole = function(a) {
    this.preferredAriaRole_ = a
};
goog.ui.Control.prototype.getAriaLabel = function() {
    return this.ariaLabel_
};
goog.ui.Control.prototype.setAriaLabel = function(a) {
    this.ariaLabel_ = a;
    var b = this.getElement();
    b && this.renderer_.setAriaLabel(b, a)
};
goog.ui.Control.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Control.prototype.canDecorate = function(a) {
    return this.renderer_.canDecorate(a)
};
goog.ui.Control.prototype.decorateInternal = function(a) {
    a = this.renderer_.decorate(this, a);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a, this.getPreferredAriaRole());
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, !1);
    this.visible_ = "none" != a.style.display
};
goog.ui.Control.prototype.enterDocument = function() {
    goog.ui.Control.superClass_.enterDocument.call(this);
    this.renderer_.setAriaStates(this, this.getElementStrict());
    this.renderer_.initializeDom(this);
    if (this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(!0), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
        var a = this.getKeyEventTarget();
        if (a) {
            var b = this.getKeyHandler();
            b.attach(a);
            this.getHandler().listen(b, goog.events.KeyHandler.EventType.KEY,
                this.handleKeyEvent).listen(a, goog.events.EventType.FOCUS, this.handleFocus).listen(a, goog.events.EventType.BLUR, this.handleBlur)
        }
    }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function(a) {
    var b = this.getHandler(),
        c = this.getElement();
    a ? (b.listen(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut), this.handleContextMenu != goog.nullFunction && b.listen(c, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (b.listen(c,
        goog.events.EventType.DBLCLICK, this.handleDblClick), this.ieMouseEventSequenceSimulator_ || (this.ieMouseEventSequenceSimulator_ = new goog.ui.Control.IeMouseEventSequenceSimulator_(this), this.registerDisposable(this.ieMouseEventSequenceSimulator_)))) : (b.unlisten(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut),
        this.handleContextMenu != goog.nullFunction && b.unlisten(c, goog.events.EventType.CONTEXTMENU, this.handleContextMenu), goog.userAgent.IE && (b.unlisten(c, goog.events.EventType.DBLCLICK, this.handleDblClick), goog.dispose(this.ieMouseEventSequenceSimulator_), this.ieMouseEventSequenceSimulator_ = null))
};
goog.ui.Control.prototype.exitDocument = function() {
    goog.ui.Control.superClass_.exitDocument.call(this);
    this.keyHandler_ && this.keyHandler_.detach();
    this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, !1)
};
goog.ui.Control.prototype.disposeInternal = function() {
    goog.ui.Control.superClass_.disposeInternal.call(this);
    this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
    delete this.renderer_;
    this.ieMouseEventSequenceSimulator_ = this.extraClassNames_ = this.content_ = null
};
goog.ui.Control.prototype.getContent = function() {
    return this.content_
};
goog.ui.Control.prototype.setContent = function(a) {
    this.renderer_.setContent(this.getElement(), a);
    this.setContentInternal(a)
};
goog.ui.Control.prototype.setContentInternal = function(a) {
    this.content_ = a
};
goog.ui.Control.prototype.getCaption = function() {
    var a = this.getContent();
    if (!a) return "";
    a = goog.isString(a) ? a : goog.isArray(a) ? goog.array.map(a, goog.dom.getRawTextContent).join("") : goog.dom.getTextContent(a);
    return goog.string.collapseBreakingSpaces(a)
};
goog.ui.Control.prototype.setCaption = function(a) {
    this.setContent(a)
};
goog.ui.Control.prototype.setRightToLeft = function(a) {
    goog.ui.Control.superClass_.setRightToLeft.call(this, a);
    var b = this.getElement();
    b && this.renderer_.setRightToLeft(b, a)
};
goog.ui.Control.prototype.isAllowTextSelection = function() {
    return this.allowTextSelection_
};
goog.ui.Control.prototype.setAllowTextSelection = function(a) {
    this.allowTextSelection_ = a;
    var b = this.getElement();
    b && this.renderer_.setAllowTextSelection(b, a)
};
goog.ui.Control.prototype.isVisible = function() {
    return this.visible_
};
goog.ui.Control.prototype.setVisible = function(a, b) {
    if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        var c = this.getElement();
        c && this.renderer_.setVisible(c, a);
        this.isEnabled() && this.renderer_.setFocusable(this, a);
        this.visible_ = a;
        return !0
    }
    return !1
};
goog.ui.Control.prototype.isEnabled = function() {
    return !this.hasState(goog.ui.Component.State.DISABLED)
};
goog.ui.Control.prototype.isParentDisabled_ = function() {
    var a = this.getParent();
    return !!a && "function" == typeof a.isEnabled && !a.isEnabled()
};
goog.ui.Control.prototype.setEnabled = function(a) {
    !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !a) && (a || (this.setActive(!1), this.setHighlighted(!1)), this.isVisible() && this.renderer_.setFocusable(this, a), this.setState(goog.ui.Component.State.DISABLED, !a, !0))
};
goog.ui.Control.prototype.isHighlighted = function() {
    return this.hasState(goog.ui.Component.State.HOVER)
};
goog.ui.Control.prototype.setHighlighted = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.HOVER, a) && this.setState(goog.ui.Component.State.HOVER, a)
};
goog.ui.Control.prototype.isActive = function() {
    return this.hasState(goog.ui.Component.State.ACTIVE)
};
goog.ui.Control.prototype.setActive = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, a) && this.setState(goog.ui.Component.State.ACTIVE, a)
};
goog.ui.Control.prototype.isSelected = function() {
    return this.hasState(goog.ui.Component.State.SELECTED)
};
goog.ui.Control.prototype.setSelected = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.SELECTED, a) && this.setState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.Control.prototype.isChecked = function() {
    return this.hasState(goog.ui.Component.State.CHECKED)
};
goog.ui.Control.prototype.setChecked = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.CHECKED, a) && this.setState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.Control.prototype.isFocused = function() {
    return this.hasState(goog.ui.Component.State.FOCUSED)
};
goog.ui.Control.prototype.setFocused = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, a) && this.setState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.Control.prototype.isOpen = function() {
    return this.hasState(goog.ui.Component.State.OPENED)
};
goog.ui.Control.prototype.setOpen = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.OPENED, a) && this.setState(goog.ui.Component.State.OPENED, a)
};
goog.ui.Control.prototype.getState = function() {
    return this.state_
};
goog.ui.Control.prototype.hasState = function(a) {
    return !!(this.state_ & a)
};
goog.ui.Control.prototype.setState = function(a, b, c) {
    c || a != goog.ui.Component.State.DISABLED ? this.isSupportedState(a) && b != this.hasState(a) && (this.renderer_.setState(this, a, b), this.state_ = b ? this.state_ | a : this.state_ & ~a) : this.setEnabled(!b)
};
goog.ui.Control.prototype.setStateInternal = function(a) {
    this.state_ = a
};
goog.ui.Control.prototype.isSupportedState = function(a) {
    return !!(this.supportedStates_ & a)
};
goog.ui.Control.prototype.setSupportedState = function(a, b) {
    if (this.isInDocument() && this.hasState(a) && !b) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    !b && this.hasState(a) && this.setState(a, !1);
    this.supportedStates_ = b ? this.supportedStates_ | a : this.supportedStates_ & ~a
};
goog.ui.Control.prototype.isAutoState = function(a) {
    return !!(this.autoStates_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setAutoStates = function(a, b) {
    this.autoStates_ = b ? this.autoStates_ | a : this.autoStates_ & ~a
};
goog.ui.Control.prototype.isDispatchTransitionEvents = function(a) {
    return !!(this.statesWithTransitionEvents_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function(a, b) {
    this.statesWithTransitionEvents_ = b ? this.statesWithTransitionEvents_ | a : this.statesWithTransitionEvents_ & ~a
};
goog.ui.Control.prototype.isTransitionAllowed = function(a, b) {
    return this.isSupportedState(a) && this.hasState(a) != b && (!(this.statesWithTransitionEvents_ & a) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a, b))) && !this.isDisposed()
};
goog.ui.Control.prototype.handleMouseOver = function(a) {
    !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0)
};
goog.ui.Control.prototype.handleMouseOut = function(a) {
    !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!1))
};
goog.ui.Control.prototype.handleContextMenu = goog.nullFunction;
goog.ui.Control.isMouseEventWithinElement_ = function(a, b) {
    return !!a.relatedTarget && goog.dom.contains(b, a.relatedTarget)
};
goog.ui.Control.prototype.handleMouseDown = function(a) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), a.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!0), this.renderer_ && this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
    !this.isAllowTextSelection() && a.isMouseActionButton() && a.preventDefault()
};
goog.ui.Control.prototype.handleMouseUp = function(a) {
    this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(!0), this.isActive() && this.performActionInternal(a) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1))
};
goog.ui.Control.prototype.handleDblClick = function(a) {
    this.isEnabled() && this.performActionInternal(a)
};
goog.ui.Control.prototype.performActionInternal = function(a) {
    this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
    this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(!0);
    this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
    var b = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
    a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.platformModifierKey = a.platformModifierKey);
    return this.dispatchEvent(b)
};
goog.ui.Control.prototype.handleFocus = function(a) {
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!0)
};
goog.ui.Control.prototype.handleBlur = function(a) {
    this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(!1);
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(!1)
};
goog.ui.Control.prototype.handleKeyEvent = function(a) {
    return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
};
goog.ui.Control.prototype.handleKeyEventInternal = function(a) {
    return a.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(a)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
    return new goog.ui.Control(null)
});
goog.ui.Control.IeMouseEventSequenceSimulator_ = function(a) {
    goog.Disposable.call(this);
    this.control_ = a;
    this.clickExpected_ = !1;
    this.handler_ = new goog.events.EventHandler(this);
    this.registerDisposable(this.handler_);
    a = this.control_.getElementStrict();
    this.handler_.listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseDown_).listen(a, goog.events.EventType.MOUSEUP, this.handleMouseUp_).listen(a, goog.events.EventType.CLICK, this.handleClick_)
};
goog.inherits(goog.ui.Control.IeMouseEventSequenceSimulator_, goog.Disposable);
goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ = !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9);
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseDown_ = function() {
    this.clickExpected_ = !1
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleMouseUp_ = function() {
    this.clickExpected_ = !0
};
goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_ = function(a, b) {
    if (!goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_) return a.button = goog.events.BrowserEvent.MouseButton.LEFT, a.type = b, a;
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, goog.events.BrowserEvent.MouseButton.LEFT, a.relatedTarget || null);
    return c
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.handleClick_ = function(a) {
    if (this.clickExpected_) this.clickExpected_ = !1;
    else {
        var b = a.getBrowserEvent(),
            c = b.button,
            d = b.type,
            e = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(b, goog.events.EventType.MOUSEDOWN);
        this.control_.handleMouseDown(new goog.events.BrowserEvent(e, a.currentTarget));
        e = goog.ui.Control.IeMouseEventSequenceSimulator_.makeLeftMouseEvent_(b, goog.events.EventType.MOUSEUP);
        this.control_.handleMouseUp(new goog.events.BrowserEvent(e,
            a.currentTarget));
        goog.ui.Control.IeMouseEventSequenceSimulator_.SYNTHETIC_EVENTS_ || (b.button = c, b.type = d)
    }
};
goog.ui.Control.IeMouseEventSequenceSimulator_.prototype.disposeInternal = function() {
    this.control_ = null;
    goog.ui.Control.IeMouseEventSequenceSimulator_.superClass_.disposeInternal.call(this)
};
goog.ui.Container = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.renderer_ = b || goog.ui.ContainerRenderer.getInstance();
    this.orientation_ = a || this.renderer_.getDefaultOrientation()
};
goog.inherits(goog.ui.Container, goog.ui.Component);
goog.tagUnsealableClass(goog.ui.Container);
goog.ui.Container.EventType = {
    AFTER_SHOW: "aftershow",
    AFTER_HIDE: "afterhide"
};
goog.ui.Container.Orientation = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
};
goog.ui.Container.prototype.keyEventTarget_ = null;
goog.ui.Container.prototype.keyHandler_ = null;
goog.ui.Container.prototype.renderer_ = null;
goog.ui.Container.prototype.orientation_ = null;
goog.ui.Container.prototype.visible_ = !0;
goog.ui.Container.prototype.enabled_ = !0;
goog.ui.Container.prototype.focusable_ = !0;
goog.ui.Container.prototype.highlightedIndex_ = -1;
goog.ui.Container.prototype.openItem_ = null;
goog.ui.Container.prototype.mouseButtonPressed_ = !1;
goog.ui.Container.prototype.allowFocusableChildren_ = !1;
goog.ui.Container.prototype.openFollowsHighlight_ = !0;
goog.ui.Container.prototype.childElementIdMap_ = null;
goog.ui.Container.prototype.getKeyEventTarget = function() {
    return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
};
goog.ui.Container.prototype.setKeyEventTarget = function(a) {
    if (this.focusable_) {
        var b = this.getKeyEventTarget(),
            c = this.isInDocument();
        this.keyEventTarget_ = a;
        var d = this.getKeyEventTarget();
        c && (this.keyEventTarget_ = b, this.enableFocusHandling_(!1), this.keyEventTarget_ = a, this.getKeyHandler().attach(d), this.enableFocusHandling_(!0))
    } else throw Error("Can't set key event target for container that doesn't support keyboard focus!");
};
goog.ui.Container.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
};
goog.ui.Container.prototype.getRenderer = function() {
    return this.renderer_
};
goog.ui.Container.prototype.setRenderer = function(a) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.renderer_ = a
};
goog.ui.Container.prototype.createDom = function() {
    this.setElementInternal(this.renderer_.createDom(this))
};
goog.ui.Container.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Container.prototype.canDecorate = function(a) {
    return this.renderer_.canDecorate(a)
};
goog.ui.Container.prototype.decorateInternal = function(a) {
    this.setElementInternal(this.renderer_.decorate(this, a));
    "none" == a.style.display && (this.visible_ = !1)
};
goog.ui.Container.prototype.enterDocument = function() {
    goog.ui.Container.superClass_.enterDocument.call(this);
    this.forEachChild(function(a) {
        a.isInDocument() && this.registerChildId_(a)
    }, this);
    var a = this.getElement();
    this.renderer_.initializeDom(this);
    this.setVisible(this.visible_, !0);
    this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this,
        goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(a), goog.events.EventType.MOUSEUP, this.handleDocumentMouseUp).listen(a, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT, goog.events.EventType.CONTEXTMENU], this.handleChildMouseEvents);
    this.isFocusable() && this.enableFocusHandling_(!0)
};
goog.ui.Container.prototype.enableFocusHandling_ = function(a) {
    var b = this.getHandler(),
        c = this.getKeyEventTarget();
    a ? b.listen(c, goog.events.EventType.FOCUS, this.handleFocus).listen(c, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : b.unlisten(c, goog.events.EventType.FOCUS, this.handleFocus).unlisten(c, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
};
goog.ui.Container.prototype.exitDocument = function() {
    this.setHighlightedIndex(-1);
    this.openItem_ && this.openItem_.setOpen(!1);
    this.mouseButtonPressed_ = !1;
    goog.ui.Container.superClass_.exitDocument.call(this)
};
goog.ui.Container.prototype.disposeInternal = function() {
    goog.ui.Container.superClass_.disposeInternal.call(this);
    this.keyHandler_ && (this.keyHandler_.dispose(), this.keyHandler_ = null);
    this.renderer_ = this.openItem_ = this.childElementIdMap_ = this.keyEventTarget_ = null
};
goog.ui.Container.prototype.handleEnterItem = function(a) {
    return !0
};
goog.ui.Container.prototype.handleHighlightItem = function(a) {
    var b = this.indexOfChild(a.target);
    if (-1 < b && b != this.highlightedIndex_) {
        var c = this.getHighlighted();
        c && c.setHighlighted(!1);
        this.highlightedIndex_ = b;
        c = this.getHighlighted();
        this.isMouseButtonPressed() && c.setActive(!0);
        this.openFollowsHighlight_ && this.openItem_ && c != this.openItem_ && (c.isSupportedState(goog.ui.Component.State.OPENED) ? c.setOpen(!0) : this.openItem_.setOpen(!1))
    }
    b = this.getElement();
    goog.asserts.assert(b, "The DOM element for the container cannot be null.");
    null != a.target.getElement() && goog.a11y.aria.setState(b, goog.a11y.aria.State.ACTIVEDESCENDANT, a.target.getElement().id)
};
goog.ui.Container.prototype.handleUnHighlightItem = function(a) {
    a.target == this.getHighlighted() && (this.highlightedIndex_ = -1);
    a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the container cannot be null.");
    goog.a11y.aria.removeState(a, goog.a11y.aria.State.ACTIVEDESCENDANT)
};
goog.ui.Container.prototype.handleOpenItem = function(a) {
    (a = a.target) && a != this.openItem_ && a.getParent() == this && (this.openItem_ && this.openItem_.setOpen(!1), this.openItem_ = a)
};
goog.ui.Container.prototype.handleCloseItem = function(a) {
    a.target == this.openItem_ && (this.openItem_ = null);
    var b = this.getElement(),
        c = a.target.getElement();
    b && a.target.isHighlighted() && c && goog.a11y.aria.setActiveDescendant(b, c)
};
goog.ui.Container.prototype.handleMouseDown = function(a) {
    this.enabled_ && this.setMouseButtonPressed(!0);
    var b = this.getKeyEventTarget();
    b && goog.dom.isFocusableTabIndex(b) ? b.focus() : a.preventDefault()
};
goog.ui.Container.prototype.handleDocumentMouseUp = function(a) {
    this.setMouseButtonPressed(!1)
};
goog.ui.Container.prototype.handleChildMouseEvents = function(a) {
    var b = this.getOwnerControl(a.target);
    if (b) switch (a.type) {
        case goog.events.EventType.MOUSEDOWN:
            b.handleMouseDown(a);
            break;
        case goog.events.EventType.MOUSEUP:
            b.handleMouseUp(a);
            break;
        case goog.events.EventType.MOUSEOVER:
            b.handleMouseOver(a);
            break;
        case goog.events.EventType.MOUSEOUT:
            b.handleMouseOut(a);
            break;
        case goog.events.EventType.CONTEXTMENU:
            b.handleContextMenu(a)
    }
};
goog.ui.Container.prototype.getOwnerControl = function(a) {
    if (this.childElementIdMap_)
        for (var b = this.getElement(); a && a !== b;) {
            var c = a.id;
            if (c in this.childElementIdMap_) return this.childElementIdMap_[c];
            a = a.parentNode
        }
    return null
};
goog.ui.Container.prototype.handleFocus = function(a) {};
goog.ui.Container.prototype.handleBlur = function(a) {
    this.setHighlightedIndex(-1);
    this.setMouseButtonPressed(!1);
    this.openItem_ && this.openItem_.setOpen(!1)
};
goog.ui.Container.prototype.handleKeyEvent = function(a) {
    return this.isEnabled() && this.isVisible() && (0 != this.getChildCount() || this.keyEventTarget_) && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1
};
goog.ui.Container.prototype.handleKeyEventInternal = function(a) {
    var b = this.getHighlighted();
    if (b && "function" == typeof b.handleKeyEvent && b.handleKeyEvent(a) || this.openItem_ && this.openItem_ != b && "function" == typeof this.openItem_.handleKeyEvent && this.openItem_.handleKeyEvent(a)) return !0;
    if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.ESC:
            if (this.isFocusable()) this.getKeyEventTarget().blur();
            else return !1;
            break;
        case goog.events.KeyCodes.HOME:
            this.highlightFirst();
            break;
        case goog.events.KeyCodes.END:
            this.highlightLast();
            break;
        case goog.events.KeyCodes.UP:
            if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightPrevious();
            else return !1;
            break;
        case goog.events.KeyCodes.LEFT:
            if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
            else return !1;
            break;
        case goog.events.KeyCodes.DOWN:
            if (this.orientation_ == goog.ui.Container.Orientation.VERTICAL) this.highlightNext();
            else return !1;
            break;
        case goog.events.KeyCodes.RIGHT:
            if (this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
            else return !1;
            break;
        default:
            return !1
    }
    return !0
};
goog.ui.Container.prototype.registerChildId_ = function(a) {
    var b = a.getElement(),
        b = b.id || (b.id = a.getId());
    this.childElementIdMap_ || (this.childElementIdMap_ = {});
    this.childElementIdMap_[b] = a
};
goog.ui.Container.prototype.addChild = function(a, b) {
    goog.asserts.assertInstanceof(a, goog.ui.Control, "The child of a container must be a control");
    goog.ui.Container.superClass_.addChild.call(this, a, b)
};
goog.ui.Container.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assertInstanceof(a, goog.ui.Control);
    a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0);
    a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, !0);
    !this.isFocusable() && this.isFocusableChildrenAllowed() || a.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    a.setHandleMouseEvents(!1);
    var d = a.getParent() == this ? this.indexOfChild(a) : -1;
    goog.ui.Container.superClass_.addChildAt.call(this, a, b, c);
    a.isInDocument() && this.isInDocument() &&
        this.registerChildId_(a);
    this.updateHighlightedIndex_(d, b)
};
goog.ui.Container.prototype.updateHighlightedIndex_ = function(a, b) {
    -1 == a && (a = this.getChildCount());
    a == this.highlightedIndex_ ? this.highlightedIndex_ = Math.min(this.getChildCount() - 1, b) : a > this.highlightedIndex_ && b <= this.highlightedIndex_ ? this.highlightedIndex_++ : a < this.highlightedIndex_ && b > this.highlightedIndex_ && this.highlightedIndex_--
};
goog.ui.Container.prototype.removeChild = function(a, b) {
    a = goog.isString(a) ? this.getChild(a) : a;
    goog.asserts.assertInstanceof(a, goog.ui.Control);
    if (a) {
        var c = this.indexOfChild(a); - 1 != c && (c == this.highlightedIndex_ ? (a.setHighlighted(!1), this.highlightedIndex_ = -1) : c < this.highlightedIndex_ && this.highlightedIndex_--);
        (c = a.getElement()) && c.id && this.childElementIdMap_ && goog.object.remove(this.childElementIdMap_, c.id)
    }
    a = goog.ui.Container.superClass_.removeChild.call(this, a, b);
    a.setHandleMouseEvents(!0);
    return a
};
goog.ui.Container.prototype.getOrientation = function() {
    return this.orientation_
};
goog.ui.Container.prototype.setOrientation = function(a) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.orientation_ = a
};
goog.ui.Container.prototype.isVisible = function() {
    return this.visible_
};
goog.ui.Container.prototype.setVisible = function(a, b) {
    if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        this.visible_ = a;
        var c = this.getElement();
        c && (goog.style.setElementShown(c, a), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), b || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE));
        return !0
    }
    return !1
};
goog.ui.Container.prototype.isEnabled = function() {
    return this.enabled_
};
goog.ui.Container.prototype.setEnabled = function(a) {
    this.enabled_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE) && (a ? (this.enabled_ = !0, this.forEachChild(function(a) {
        a.wasDisabled ? delete a.wasDisabled : a.setEnabled(!0)
    })) : (this.forEachChild(function(a) {
        a.isEnabled() ? a.setEnabled(!1) : a.wasDisabled = !0
    }), this.enabled_ = !1, this.setMouseButtonPressed(!1)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a && this.visible_))
};
goog.ui.Container.prototype.isFocusable = function() {
    return this.focusable_
};
goog.ui.Container.prototype.setFocusable = function(a) {
    a != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(a);
    this.focusable_ = a;
    this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a)
};
goog.ui.Container.prototype.isFocusableChildrenAllowed = function() {
    return this.allowFocusableChildren_
};
goog.ui.Container.prototype.setFocusableChildrenAllowed = function(a) {
    this.allowFocusableChildren_ = a
};
goog.ui.Container.prototype.isOpenFollowsHighlight = function() {
    return this.openFollowsHighlight_
};
goog.ui.Container.prototype.setOpenFollowsHighlight = function(a) {
    this.openFollowsHighlight_ = a
};
goog.ui.Container.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
};
goog.ui.Container.prototype.setHighlightedIndex = function(a) {
    (a = this.getChildAt(a)) ? a.setHighlighted(!0): -1 < this.highlightedIndex_ && this.getHighlighted().setHighlighted(!1)
};
goog.ui.Container.prototype.setHighlighted = function(a) {
    this.setHighlightedIndex(this.indexOfChild(a))
};
goog.ui.Container.prototype.getHighlighted = function() {
    return this.getChildAt(this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightFirst = function() {
    this.highlightHelper(function(a, b) {
        return (a + 1) % b
    }, this.getChildCount() - 1)
};
goog.ui.Container.prototype.highlightLast = function() {
    this.highlightHelper(function(a, b) {
        a--;
        return 0 > a ? b - 1 : a
    }, 0)
};
goog.ui.Container.prototype.highlightNext = function() {
    this.highlightHelper(function(a, b) {
        return (a + 1) % b
    }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightPrevious = function() {
    this.highlightHelper(function(a, b) {
        a--;
        return 0 > a ? b - 1 : a
    }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightHelper = function(a, b) {
    for (var c = 0 > b ? this.indexOfChild(this.openItem_) : b, d = this.getChildCount(), c = a.call(this, c, d), e = 0; e <= d;) {
        var f = this.getChildAt(c);
        if (f && this.canHighlightItem(f)) return this.setHighlightedIndexFromKeyEvent(c), !0;
        e++;
        c = a.call(this, c, d)
    }
    return !1
};
goog.ui.Container.prototype.canHighlightItem = function(a) {
    return a.isVisible() && a.isEnabled() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function(a) {
    this.setHighlightedIndex(a)
};
goog.ui.Container.prototype.getOpenItem = function() {
    return this.openItem_
};
goog.ui.Container.prototype.isMouseButtonPressed = function() {
    return this.mouseButtonPressed_
};
goog.ui.Container.prototype.setMouseButtonPressed = function(a) {
    this.mouseButtonPressed_ = a
};
goog.ui.MenuHeaderRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuHeaderRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuHeaderRenderer);
goog.ui.MenuHeaderRenderer.CSS_CLASS = "goog-menuheader";
goog.ui.MenuHeaderRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuHeaderRenderer.CSS_CLASS
};
goog.ui.MenuHeader = function(a, b, c) {
    goog.ui.Control.call(this, a, c || goog.ui.MenuHeaderRenderer.getInstance(), b);
    this.setSupportedState(goog.ui.Component.State.DISABLED, !1);
    this.setSupportedState(goog.ui.Component.State.HOVER, !1);
    this.setSupportedState(goog.ui.Component.State.ACTIVE, !1);
    this.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.MenuHeader, goog.ui.Control);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuHeader(null)
});
goog.ui.MenuItemRenderer = function() {
    goog.ui.ControlRenderer.call(this);
    this.classNameCache_ = []
};
goog.inherits(goog.ui.MenuItemRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuItemRenderer);
goog.ui.MenuItemRenderer.CSS_CLASS = "goog-menuitem";
goog.ui.MenuItemRenderer.CompositeCssClassIndex_ = {
    HOVER: 0,
    CHECKBOX: 1,
    CONTENT: 2
};
goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_ = function(a) {
    var b = this.classNameCache_[a];
    if (!b) {
        switch (a) {
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:
                b = this.getStructuralCssClass() + "-highlight";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:
                b = this.getStructuralCssClass() + "-checkbox";
                break;
            case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:
                b = this.getStructuralCssClass() + "-content"
        }
        this.classNameCache_[a] = b
    }
    return b
};
goog.ui.MenuItemRenderer.prototype.getAriaRole = function() {
    return goog.a11y.aria.Role.MENU_ITEM
};
goog.ui.MenuItemRenderer.prototype.createDom = function(a) {
    var b = a.getDomHelper().createDom(goog.dom.TagName.DIV, this.getClassNames(a).join(" "), this.createContent(a.getContent(), a.getDomHelper()));
    this.setEnableCheckBoxStructure(a, b, a.isSupportedState(goog.ui.Component.State.SELECTED) || a.isSupportedState(goog.ui.Component.State.CHECKED));
    return b
};
goog.ui.MenuItemRenderer.prototype.getContentElement = function(a) {
    return a && a.firstChild
};
goog.ui.MenuItemRenderer.prototype.decorate = function(a, b) {
    goog.asserts.assert(b);
    this.hasContentStructure(b) || b.appendChild(this.createContent(b.childNodes, a.getDomHelper()));
    goog.dom.classlist.contains(b, "goog-option") && (a.setCheckable(!0), this.setCheckable(a, b, !0));
    return goog.ui.MenuItemRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.MenuItemRenderer.prototype.setContent = function(a, b) {
    var c = this.getContentElement(a),
        d = this.hasCheckBoxStructure(a) ? c.firstChild : null;
    goog.ui.MenuItemRenderer.superClass_.setContent.call(this, a, b);
    d && !this.hasCheckBoxStructure(a) && c.insertBefore(d, c.firstChild || null)
};
goog.ui.MenuItemRenderer.prototype.hasContentStructure = function(a) {
    a = goog.dom.getFirstElementChild(a);
    var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return !!a && goog.dom.classlist.contains(a, b)
};
goog.ui.MenuItemRenderer.prototype.createContent = function(a, b) {
    var c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
    return b.createDom(goog.dom.TagName.DIV, c, a)
};
goog.ui.MenuItemRenderer.prototype.setSelectable = function(a, b, c) {
    a && b && this.setEnableCheckBoxStructure(a, b, c)
};
goog.ui.MenuItemRenderer.prototype.setCheckable = function(a, b, c) {
    a && b && this.setEnableCheckBoxStructure(a, b, c)
};
goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure = function(a) {
    if (a = this.getContentElement(a)) {
        a = a.firstChild;
        var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
        return !!a && goog.dom.isElement(a) && goog.dom.classlist.contains(a, b)
    }
    return !1
};
goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure = function(a, b, c) {
    this.setAriaRole(b, a.getPreferredAriaRole());
    this.setAriaStates(a, b);
    c != this.hasCheckBoxStructure(b) && (goog.dom.classlist.enable(b, "goog-option", c), b = this.getContentElement(b), c ? (c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX), b.insertBefore(a.getDomHelper().createDom(goog.dom.TagName.DIV, c), b.firstChild || null)) : b.removeChild(b.firstChild))
};
goog.ui.MenuItemRenderer.prototype.getClassForState = function(a) {
    switch (a) {
        case goog.ui.Component.State.HOVER:
            return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
        case goog.ui.Component.State.CHECKED:
        case goog.ui.Component.State.SELECTED:
            return "goog-option-selected";
        default:
            return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this, a)
    }
};
goog.ui.MenuItemRenderer.prototype.getStateFromClass = function(a) {
    var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
    switch (a) {
        case "goog-option-selected":
            return goog.ui.Component.State.CHECKED;
        case b:
            return goog.ui.Component.State.HOVER;
        default:
            return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this, a)
    }
};
goog.ui.MenuItemRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuItemRenderer.CSS_CLASS
};
goog.ui.MenuItem = function(a, b, c, d) {
    goog.ui.Control.call(this, a, d || goog.ui.MenuItemRenderer.getInstance(), c);
    this.setValue(b)
};
goog.inherits(goog.ui.MenuItem, goog.ui.Control);
goog.tagUnsealableClass(goog.ui.MenuItem);
goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ = "goog-menuitem-mnemonic-separator";
goog.ui.MenuItem.ACCELERATOR_CLASS = "goog-menuitem-accel";
goog.ui.MenuItem.prototype.getValue = function() {
    var a = this.getModel();
    return null != a ? a : this.getCaption()
};
goog.ui.MenuItem.prototype.setValue = function(a) {
    this.setModel(a)
};
goog.ui.MenuItem.prototype.setSupportedState = function(a, b) {
    goog.ui.MenuItem.superClass_.setSupportedState.call(this, a, b);
    switch (a) {
        case goog.ui.Component.State.SELECTED:
            this.setSelectableInternal_(b);
            break;
        case goog.ui.Component.State.CHECKED:
            this.setCheckableInternal_(b)
    }
};
goog.ui.MenuItem.prototype.setSelectable = function(a) {
    this.setSupportedState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.MenuItem.prototype.setSelectableInternal_ = function(a) {
    this.isChecked() && !a && this.setChecked(!1);
    var b = this.getElement();
    b && this.getRenderer().setSelectable(this, b, a)
};
goog.ui.MenuItem.prototype.setCheckable = function(a) {
    this.setSupportedState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.MenuItem.prototype.setCheckableInternal_ = function(a) {
    var b = this.getElement();
    b && this.getRenderer().setCheckable(this, b, a)
};
goog.ui.MenuItem.prototype.getCaption = function() {
    var a = this.getContent();
    if (goog.isArray(a)) {
        var b = goog.ui.MenuItem.ACCELERATOR_CLASS,
            c = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_,
            a = goog.array.map(a, function(a) {
                return goog.dom.isElement(a) && (goog.dom.classlist.contains(a, b) || goog.dom.classlist.contains(a, c)) ? "" : goog.dom.getRawTextContent(a)
            }).join("");
        return goog.string.collapseBreakingSpaces(a)
    }
    return goog.ui.MenuItem.superClass_.getCaption.call(this)
};
goog.ui.MenuItem.prototype.getAccelerator = function() {
    var a = this.getDomHelper(),
        b = this.getContent();
    return goog.isArray(b) && (b = goog.array.find(b, function(a) {
        return goog.dom.classlist.contains(a, goog.ui.MenuItem.ACCELERATOR_CLASS)
    })) ? a.getTextContent(b) : null
};
goog.ui.MenuItem.prototype.handleMouseUp = function(a) {
    var b = this.getParent();
    if (b) {
        var c = b.openingCoords;
        b.openingCoords = null;
        if (c && goog.isNumber(a.clientX) && (b = new goog.math.Coordinate(a.clientX, a.clientY), goog.math.Coordinate.equals(c, b))) return
    }
    goog.ui.MenuItem.superClass_.handleMouseUp.call(this, a)
};
goog.ui.MenuItem.prototype.handleKeyEventInternal = function(a) {
    return a.keyCode == this.getMnemonic() && this.performActionInternal(a) ? !0 : goog.ui.MenuItem.superClass_.handleKeyEventInternal.call(this, a)
};
goog.ui.MenuItem.prototype.setMnemonic = function(a) {
    this.mnemonicKey_ = a
};
goog.ui.MenuItem.prototype.getMnemonic = function() {
    return this.mnemonicKey_
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS, function() {
    return new goog.ui.MenuItem(null)
});
goog.ui.MenuItem.prototype.getPreferredAriaRole = function() {
    return this.isSupportedState(goog.ui.Component.State.CHECKED) ? goog.a11y.aria.Role.MENU_ITEM_CHECKBOX : this.isSupportedState(goog.ui.Component.State.SELECTED) ? goog.a11y.aria.Role.MENU_ITEM_RADIO : goog.ui.MenuItem.superClass_.getPreferredAriaRole.call(this)
};
goog.ui.MenuItem.prototype.getParent = function() {
    return goog.ui.Control.prototype.getParent.call(this)
};
goog.ui.MenuItem.prototype.getParentEventTarget = function() {
    return goog.ui.Control.prototype.getParentEventTarget.call(this)
};
goog.ui.MenuSeparatorRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);
goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator";
goog.ui.MenuSeparatorRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom(goog.dom.TagName.DIV, this.getCssClass())
};
goog.ui.MenuSeparatorRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    if (b.tagName == goog.dom.TagName.HR) {
        var c = b;
        b = this.createDom(a);
        goog.dom.insertSiblingBefore(b, c);
        goog.dom.removeNode(c)
    } else goog.dom.classlist.add(b, this.getCssClass());
    return b
};
goog.ui.MenuSeparatorRenderer.prototype.setContent = function(a, b) {};
goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuSeparatorRenderer.CSS_CLASS
};
goog.ui.Separator = function(a, b) {
    goog.ui.Control.call(this, null, a || goog.ui.MenuSeparatorRenderer.getInstance(), b);
    this.setSupportedState(goog.ui.Component.State.DISABLED, !1);
    this.setSupportedState(goog.ui.Component.State.HOVER, !1);
    this.setSupportedState(goog.ui.Component.State.ACTIVE, !1);
    this.setSupportedState(goog.ui.Component.State.FOCUSED, !1);
    this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.Separator, goog.ui.Control);
goog.ui.Separator.prototype.enterDocument = function() {
    goog.ui.Separator.superClass_.enterDocument.call(this);
    var a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the separator cannot be null.");
    goog.a11y.aria.setRole(a, "separator")
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
});
goog.ui.MenuRenderer = function(a) {
    goog.ui.ContainerRenderer.call(this, a || goog.a11y.aria.Role.MENU)
};
goog.inherits(goog.ui.MenuRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.MenuRenderer);
goog.ui.MenuRenderer.CSS_CLASS = "goog-menu";
goog.ui.MenuRenderer.prototype.canDecorate = function(a) {
    return a.tagName == goog.dom.TagName.UL || goog.ui.MenuRenderer.superClass_.canDecorate.call(this, a)
};
goog.ui.MenuRenderer.prototype.getDecoratorForChild = function(a) {
    return a.tagName == goog.dom.TagName.HR ? new goog.ui.Separator : goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this, a)
};
goog.ui.MenuRenderer.prototype.containsElement = function(a, b) {
    return goog.dom.contains(a.getElement(), b)
};
goog.ui.MenuRenderer.prototype.getCssClass = function() {
    return goog.ui.MenuRenderer.CSS_CLASS
};
goog.ui.MenuRenderer.prototype.initializeDom = function(a) {
    goog.ui.MenuRenderer.superClass_.initializeDom.call(this, a);
    a = a.getElement();
    goog.asserts.assert(a, "The menu DOM element cannot be null.");
    goog.a11y.aria.setState(a, goog.a11y.aria.State.HASPOPUP, "true")
};
goog.ui.MenuSeparator = function(a) {
    goog.ui.Separator.call(this, goog.ui.MenuSeparatorRenderer.getInstance(), a)
};
goog.inherits(goog.ui.MenuSeparator, goog.ui.Separator);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
    return new goog.ui.Separator
});
goog.ui.Menu = function(a, b) {
    goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, b || goog.ui.MenuRenderer.getInstance(), a);
    this.setFocusable(!1)
};
goog.inherits(goog.ui.Menu, goog.ui.Container);
goog.tagUnsealableClass(goog.ui.Menu);
goog.ui.Menu.EventType = {
    BEFORE_SHOW: goog.ui.Component.EventType.BEFORE_SHOW,
    SHOW: goog.ui.Component.EventType.SHOW,
    BEFORE_HIDE: goog.ui.Component.EventType.HIDE,
    HIDE: goog.ui.Component.EventType.HIDE
};
goog.ui.Menu.CSS_CLASS = goog.ui.MenuRenderer.CSS_CLASS;
goog.ui.Menu.prototype.allowAutoFocus_ = !0;
goog.ui.Menu.prototype.allowHighlightDisabled_ = !1;
goog.ui.Menu.prototype.getCssClass = function() {
    return this.getRenderer().getCssClass()
};
goog.ui.Menu.prototype.containsElement = function(a) {
    if (this.getRenderer().containsElement(this, a)) return !0;
    for (var b = 0, c = this.getChildCount(); b < c; b++) {
        var d = this.getChildAt(b);
        if ("function" == typeof d.containsElement && d.containsElement(a)) return !0
    }
    return !1
};
goog.ui.Menu.prototype.addItem = function(a) {
    this.addChild(a, !0)
};
goog.ui.Menu.prototype.addItemAt = function(a, b) {
    this.addChildAt(a, b, !0)
};
goog.ui.Menu.prototype.removeItem = function(a) {
    (a = this.removeChild(a, !0)) && a.dispose()
};
goog.ui.Menu.prototype.removeItemAt = function(a) {
    (a = this.removeChildAt(a, !0)) && a.dispose()
};
goog.ui.Menu.prototype.getItemAt = function(a) {
    return this.getChildAt(a)
};
goog.ui.Menu.prototype.getItemCount = function() {
    return this.getChildCount()
};
goog.ui.Menu.prototype.getItems = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b)
    });
    return a
};
goog.ui.Menu.prototype.setPosition = function(a, b) {
    var c = this.isVisible();
    c || goog.style.setElementShown(this.getElement(), !0);
    goog.style.setPageOffset(this.getElement(), a, b);
    c || goog.style.setElementShown(this.getElement(), !1)
};
goog.ui.Menu.prototype.getPosition = function() {
    return this.isVisible() ? goog.style.getPageOffset(this.getElement()) : null
};
goog.ui.Menu.prototype.setAllowAutoFocus = function(a) {
    (this.allowAutoFocus_ = a) && this.setFocusable(!0)
};
goog.ui.Menu.prototype.getAllowAutoFocus = function() {
    return this.allowAutoFocus_
};
goog.ui.Menu.prototype.setAllowHighlightDisabled = function(a) {
    this.allowHighlightDisabled_ = a
};
goog.ui.Menu.prototype.getAllowHighlightDisabled = function() {
    return this.allowHighlightDisabled_
};
goog.ui.Menu.prototype.setVisible = function(a, b, c) {
    (b = goog.ui.Menu.superClass_.setVisible.call(this, a, b)) && a && this.isInDocument() && this.allowAutoFocus_ && this.getKeyEventTarget().focus();
    a && c && goog.isNumber(c.clientX) ? this.openingCoords = new goog.math.Coordinate(c.clientX, c.clientY) : this.openingCoords = null;
    return b
};
goog.ui.Menu.prototype.handleEnterItem = function(a) {
    this.allowAutoFocus_ && this.getKeyEventTarget().focus();
    return goog.ui.Menu.superClass_.handleEnterItem.call(this, a)
};
goog.ui.Menu.prototype.highlightNextPrefix = function(a) {
    var b = new RegExp("^" + goog.string.regExpEscape(a), "i");
    return this.highlightHelper(function(a, d) {
        var e = 0 > a ? 0 : a,
            f = !1;
        do {
            ++a;
            a == d && (a = 0, f = !0);
            var g = this.getChildAt(a).getCaption();
            if (g && g.match(b)) return a
        } while (!f || a != e);
        return this.getHighlightedIndex()
    }, this.getHighlightedIndex())
};
goog.ui.Menu.prototype.canHighlightItem = function(a) {
    return (this.allowHighlightDisabled_ || a.isEnabled()) && a.isVisible() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Menu.prototype.decorateInternal = function(a) {
    this.decorateContent(a);
    goog.ui.Menu.superClass_.decorateInternal.call(this, a)
};
goog.ui.Menu.prototype.handleKeyEventInternal = function(a) {
    var b = goog.ui.Menu.superClass_.handleKeyEventInternal.call(this, a);
    b || this.forEachChild(function(c) {
        !b && c.getMnemonic && c.getMnemonic() == a.keyCode && (this.isEnabled() && this.setHighlighted(c), b = c.handleKeyEvent(a))
    }, this);
    return b
};
goog.ui.Menu.prototype.setHighlightedIndex = function(a) {
    goog.ui.Menu.superClass_.setHighlightedIndex.call(this, a);
    (a = this.getChildAt(a)) && goog.style.scrollIntoContainerView(a.getElement(), this.getElement())
};
goog.ui.Menu.prototype.decorateContent = function(a) {
    var b = this.getRenderer();
    a = this.getDomHelper().getElementsByTagNameAndClass(goog.dom.TagName.DIV, b.getCssClass() + "-content", a);
    for (var c = a.length, d = 0; d < c; d++) b.decorateChildren(this, a[d])
};
goog.color = {};
goog.color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
goog.color.parse = function(a) {
    var b = {};
    a = String(a);
    var c = goog.color.prependHashIfNecessaryHelper(a);
    if (goog.color.isValidHexColor_(c)) return b.hex = goog.color.normalizeHex(c), b.type = "hex", b;
    c = goog.color.isValidRgbColor_(a);
    if (c.length) return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b;
    if (goog.color.names && (c = goog.color.names[a.toLowerCase()])) return b.hex = c, b.type = "named", b;
    throw Error(a + " is not a valid color string");
};
goog.color.isValidColor = function(a) {
    var b = goog.color.prependHashIfNecessaryHelper(a);
    return !!(goog.color.isValidHexColor_(b) || goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()])
};
goog.color.parseRgb = function(a) {
    var b = goog.color.isValidRgbColor_(a);
    if (!b.length) throw Error(a + " is not a valid RGB color");
    return b
};
goog.color.hexToRgbStyle = function(a) {
    return goog.color.rgbStyle_(goog.color.hexToRgb(a))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
    if (!goog.color.isValidHexColor_(a)) throw Error("'" + a + "' is not a valid hex color");
    4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
    return a.toLowerCase()
};
goog.color.hexToRgb = function(a) {
    a = goog.color.normalizeHex(a);
    var b = parseInt(a.substr(1, 2), 16),
        c = parseInt(a.substr(3, 2), 16);
    a = parseInt(a.substr(5, 2), 16);
    return [b, c, a]
};
goog.color.rgbToHex = function(a, b, c) {
    a = +a;
    b = +b;
    c = +c;
    if (a != (a & 255) || b != (b & 255) || c != (c & 255)) throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
    a = goog.color.prependZeroIfNecessaryHelper(a.toString(16));
    b = goog.color.prependZeroIfNecessaryHelper(b.toString(16));
    c = goog.color.prependZeroIfNecessaryHelper(c.toString(16));
    return "#" + a + b + c
};
goog.color.rgbArrayToHex = function(a) {
    return goog.color.rgbToHex(a[0], a[1], a[2])
};
goog.color.rgbToHsl = function(a, b, c) {
    a /= 255;
    b /= 255;
    c /= 255;
    var d = Math.max(a, b, c),
        e = Math.min(a, b, c),
        f = 0,
        g = 0,
        h = .5 * (d + e);
    d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && .5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
    return [Math.round(f + 360) % 360, g, h]
};
goog.color.rgbArrayToHsl = function(a) {
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hueToRgb_ = function(a, b, c) {
    0 > c ? c += 1 : 1 < c && --c;
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
};
goog.color.hslToRgb = function(a, b, c) {
    var d = 0,
        e = 0,
        f = 0;
    a /= 360;
    if (0 == b) d = e = f = 255 * c;
    else var g = f = 0,
        g = .5 > c ? c * (1 + b) : c + b - b * c,
        f = 2 * c - g,
        d = 255 * goog.color.hueToRgb_(f, g, a + 1 / 3),
        e = 255 * goog.color.hueToRgb_(f, g, a),
        f = 255 * goog.color.hueToRgb_(f, g, a - 1 / 3);
    return [Math.round(d), Math.round(e), Math.round(f)]
};
goog.color.hslArrayToRgb = function(a) {
    return goog.color.hslToRgb(a[0], a[1], a[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
    return goog.color.validHexColorRe_.test(a)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function(a) {
    return goog.color.normalizedHexColorRe_.test(a)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
    var b = a.match(goog.color.rgbColorRe_);
    if (b) {
        a = +b[1];
        var c = +b[2],
            b = +b[3];
        if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) return [a, c, b]
    }
    return []
};
goog.color.prependZeroIfNecessaryHelper = function(a) {
    return 1 == a.length ? "0" + a : a
};
goog.color.prependHashIfNecessaryHelper = function(a) {
    return "#" == a.charAt(0) ? a : "#" + a
};
goog.color.rgbStyle_ = function(a) {
    return "rgb(" + a.join(",") + ")"
};
goog.color.hsvToRgb = function(a, b, c) {
    var d = 0,
        e = 0,
        f = 0;
    if (0 == b) f = e = d = c;
    else {
        var g = Math.floor(a / 60),
            h = a / 60 - g;
        a = c * (1 - b);
        var k = c * (1 - b * h);
        b = c * (1 - b * (1 - h));
        switch (g) {
            case 1:
                d = k;
                e = c;
                f = a;
                break;
            case 2:
                d = a;
                e = c;
                f = b;
                break;
            case 3:
                d = a;
                e = k;
                f = c;
                break;
            case 4:
                d = b;
                e = a;
                f = c;
                break;
            case 5:
                d = c;
                e = a;
                f = k;
                break;
            case 6:
            case 0:
                d = c, e = b, f = a
        }
    }
    return [Math.floor(d), Math.floor(e), Math.floor(f)]
};
goog.color.rgbToHsv = function(a, b, c) {
    var d = Math.max(Math.max(a, b), c),
        e = Math.min(Math.min(a, b), c);
    if (e == d) e = a = 0;
    else {
        var f = d - e,
            e = f / d;
        a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
        0 > a && (a += 360);
        360 < a && (a -= 360)
    }
    return [a, e, d]
};
goog.color.rgbArrayToHsv = function(a) {
    return goog.color.rgbToHsv(a[0], a[1], a[2])
};
goog.color.hsvArrayToRgb = function(a) {
    return goog.color.hsvToRgb(a[0], a[1], a[2])
};
goog.color.hexToHsl = function(a) {
    a = goog.color.hexToRgb(a);
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hslToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
};
goog.color.hslArrayToHex = function(a) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
};
goog.color.hexToHsv = function(a) {
    return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
};
goog.color.hsvToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
};
goog.color.hsvArrayToHex = function(a) {
    return goog.color.hsvToHex(a[0], a[1], a[2])
};
goog.color.hslDistance = function(a, b) {
    var c, d;
    c = .5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
    d = .5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
    return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
};
goog.color.blend = function(a, b, c) {
    c = goog.math.clamp(c, 0, 1);
    return [Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
};
goog.color.darken = function(a, b) {
    return goog.color.blend([0, 0, 0], a, b)
};
goog.color.lighten = function(a, b) {
    return goog.color.blend([255, 255, 255], a, b)
};
goog.color.highContrast = function(a, b) {
    for (var c = [], d = 0; d < b.length; d++) c.push({
        color: b[d],
        diff: goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)
    });
    c.sort(function(a, b) {
        return b.diff - a.diff
    });
    return c[0].color
};
goog.color.yiqBrightness_ = function(a) {
    return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function(a, b) {
    return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
};
goog.color.colorDiff_ = function(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
};
goog.iter.Iterator = function() {};
goog.iter.Iterator.prototype.next = function() {
    throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
    return this
};
goog.iter.toIterator = function(a) {
    if (a instanceof goog.iter.Iterator) return a;
    if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
    if (goog.isArrayLike(a)) {
        var b = 0,
            c = new goog.iter.Iterator;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw goog.iter.StopIteration;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
    if (goog.isArrayLike(a)) try {
        goog.array.forEach(a, b, c)
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    } else {
        a = goog.iter.toIterator(a);
        try {
            for (;;) b.call(c, a.next(), void 0, a)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
    }
};
goog.iter.filter = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (b.call(c, a, void 0, d)) return a
        }
    };
    return a
};
goog.iter.filterFalse = function(a, b, c) {
    return goog.iter.filter(a, goog.functions.not(b), c)
};
goog.iter.range = function(a, b, c) {
    var d = 0,
        e = a,
        f = c || 1;
    1 < arguments.length && (d = a, e = b);
    if (0 == f) throw Error("Range step argument must not be zero");
    var g = new goog.iter.Iterator;
    g.next = function() {
        if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
        var a = d;
        d += f;
        return a
    };
    return g
};
goog.iter.join = function(a, b) {
    return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        return b.call(c, a, void 0, d)
    };
    return a
};
goog.iter.reduce = function(a, b, c, d) {
    var e = c;
    goog.iter.forEach(a, function(a) {
        e = b.call(d, e, a)
    });
    return e
};
goog.iter.some = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (b.call(c, a.next(), void 0, a)) return !0
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !1
};
goog.iter.every = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (!b.call(c, a.next(), void 0, a)) return !1
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !0
};
goog.iter.chain = function(a) {
    return goog.iter.chainFromIterable(arguments)
};
goog.iter.chainFromIterable = function(a) {
    var b = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var c = null;
    a.next = function() {
        for (;;) {
            if (null == c) {
                var a = b.next();
                c = goog.iter.toIterator(a)
            }
            try {
                return c.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
                c = null
            }
        }
    };
    return a
};
goog.iter.dropWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var e = !0;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (!e || !b.call(c, a, void 0, d)) return e = !1, a
        }
    };
    return a
};
goog.iter.takeWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        if (b.call(c, a, void 0, d)) return a;
        throw goog.iter.StopIteration;
    };
    return a
};
goog.iter.toArray = function(a) {
    if (goog.isArrayLike(a)) return goog.array.toArray(a);
    a = goog.iter.toIterator(a);
    var b = [];
    goog.iter.forEach(a, function(a) {
        b.push(a)
    });
    return b
};
goog.iter.equals = function(a, b, c) {
    a = goog.iter.zipLongest({}, a, b);
    var d = c || goog.array.defaultCompareEquality;
    return goog.iter.every(a, function(a) {
        return d(a[0], a[1])
    })
};
goog.iter.nextOrValue = function(a, b) {
    try {
        return goog.iter.toIterator(a).next()
    } catch (c) {
        if (c != goog.iter.StopIteration) throw c;
        return b
    }
};
goog.iter.product = function(a) {
    if (goog.array.some(arguments, function(a) {
            return !a.length
        }) || !arguments.length) return new goog.iter.Iterator;
    var b = new goog.iter.Iterator,
        c = arguments,
        d = goog.array.repeat(0, c.length);
    b.next = function() {
        if (d) {
            for (var a = goog.array.map(d, function(a, b) {
                    return c[b][a]
                }), b = d.length - 1; 0 <= b; b--) {
                goog.asserts.assert(d);
                if (d[b] < c[b].length - 1) {
                    d[b]++;
                    break
                }
                if (0 == b) {
                    d = null;
                    break
                }
                d[b] = 0
            }
            return a
        }
        throw goog.iter.StopIteration;
    };
    return b
};
goog.iter.cycle = function(a) {
    var b = goog.iter.toIterator(a),
        c = [],
        d = 0;
    a = new goog.iter.Iterator;
    var e = !1;
    a.next = function() {
        var a = null;
        if (!e) try {
            return a = b.next(), c.push(a), a
        } catch (g) {
            if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
            e = !0
        }
        a = c[d];
        d = (d + 1) % c.length;
        return a
    };
    return a
};
goog.iter.count = function(a, b) {
    var c = a || 0,
        d = goog.isDef(b) ? b : 1,
        e = new goog.iter.Iterator;
    e.next = function() {
        var a = c;
        c += d;
        return a
    };
    return e
};
goog.iter.repeat = function(a) {
    var b = new goog.iter.Iterator;
    b.next = goog.functions.constant(a);
    return b
};
goog.iter.accumulate = function(a) {
    var b = goog.iter.toIterator(a),
        c = 0;
    a = new goog.iter.Iterator;
    a.next = function() {
        return c += b.next()
    };
    return a
};
goog.iter.zip = function(a) {
    var b = arguments,
        c = new goog.iter.Iterator;
    if (0 < b.length) {
        var d = goog.array.map(b, goog.iter.toIterator);
        c.next = function() {
            return goog.array.map(d, function(a) {
                return a.next()
            })
        }
    }
    return c
};
goog.iter.zipLongest = function(a, b) {
    var c = goog.array.slice(arguments, 1),
        d = new goog.iter.Iterator;
    if (0 < c.length) {
        var e = goog.array.map(c, goog.iter.toIterator);
        d.next = function() {
            var b = !1,
                c = goog.array.map(e, function(c) {
                    var d;
                    try {
                        d = c.next(), b = !0
                    } catch (e) {
                        if (e !== goog.iter.StopIteration) throw e;
                        d = a
                    }
                    return d
                });
            if (!b) throw goog.iter.StopIteration;
            return c
        }
    }
    return d
};
goog.iter.compress = function(a, b) {
    var c = goog.iter.toIterator(b);
    return goog.iter.filter(a, function() {
        return !!c.next()
    })
};
goog.iter.GroupByIterator_ = function(a, b) {
    this.iterator = goog.iter.toIterator(a);
    this.keyFunc = b || goog.functions.identity
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    this.targetKey = this.currentKey;
    return [this.currentKey, this.groupItems_(this.targetKey)]
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
    for (var b = []; this.currentKey == a;) {
        b.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (c) {
            if (c !== goog.iter.StopIteration) throw c;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return b
};
goog.iter.groupBy = function(a, b) {
    return new goog.iter.GroupByIterator_(a, b)
};
goog.iter.starMap = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = goog.iter.toArray(d.next());
        return b.apply(c, goog.array.concat(a, void 0, d))
    };
    return a
};
goog.iter.tee = function(a, b) {
    var c = goog.iter.toIterator(a),
        d = goog.isNumber(b) ? b : 2,
        e = goog.array.map(goog.array.range(d), function() {
            return []
        }),
        f = function() {
            var a = c.next();
            goog.array.forEach(e, function(b) {
                b.push(a)
            })
        };
    return goog.array.map(e, function(a) {
        var b = new goog.iter.Iterator;
        b.next = function() {
            goog.array.isEmpty(a) && f();
            goog.asserts.assert(!goog.array.isEmpty(a));
            return a.shift()
        };
        return b
    })
};
goog.iter.enumerate = function(a, b) {
    return goog.iter.zip(goog.iter.count(b), a)
};
goog.iter.limit = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    var c = goog.iter.toIterator(a),
        d = new goog.iter.Iterator,
        e = b;
    d.next = function() {
        if (0 < e--) return c.next();
        throw goog.iter.StopIteration;
    };
    return d
};
goog.iter.consume = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    for (var c = goog.iter.toIterator(a); 0 < b--;) goog.iter.nextOrValue(c, null);
    return c
};
goog.iter.slice = function(a, b, c) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    a = goog.iter.consume(a, b);
    goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
    return a
};
goog.iter.hasDuplicates_ = function(a) {
    var b = [];
    goog.array.removeDuplicates(a, b);
    return a.length != b.length
};
goog.iter.permutations = function(a, b) {
    var c = goog.iter.toArray(a),
        d = goog.isNumber(b) ? b : c.length,
        c = goog.array.repeat(c, d),
        c = goog.iter.product.apply(void 0, c);
    return goog.iter.filter(c, function(a) {
        return !goog.iter.hasDuplicates_(a)
    })
};
goog.iter.combinations = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.iter.range(d.length),
        e = goog.iter.permutations(e, b),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.iter.combinationsWithReplacement = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.array.range(d.length),
        e = goog.array.repeat(e, b),
        e = goog.iter.product.apply(void 0, e),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.dom.TagWalkType = {
    START_TAG: 1,
    OTHER: 0,
    END_TAG: -1
};
goog.dom.TagIterator = function(a, b, c, d, e) {
    this.reversed = !!b;
    this.node = null;
    this.tagType = goog.dom.TagWalkType.OTHER;
    this.started_ = !1;
    this.constrained = !c;
    a && this.setPosition(a, d);
    this.depth = void 0 != e ? e : this.tagType || 0;
    this.reversed && (this.depth *= -1)
};
goog.inherits(goog.dom.TagIterator, goog.iter.Iterator);
goog.dom.TagIterator.prototype.setPosition = function(a, b, c) {
    if (this.node = a) goog.isNumber(b) ? this.tagType = b : this.tagType = this.node.nodeType != goog.dom.NodeType.ELEMENT ? goog.dom.TagWalkType.OTHER : this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    goog.isNumber(c) && (this.depth = c)
};
goog.dom.TagIterator.prototype.copyFrom = function(a) {
    this.node = a.node;
    this.tagType = a.tagType;
    this.depth = a.depth;
    this.reversed = a.reversed;
    this.constrained = a.constrained
};
goog.dom.TagIterator.prototype.clone = function() {
    return new goog.dom.TagIterator(this.node, this.reversed, !this.constrained, this.tagType, this.depth)
};
goog.dom.TagIterator.prototype.skipTag = function() {
    var a = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    this.tagType == a && (this.tagType = -1 * a, this.depth += this.tagType * (this.reversed ? -1 : 1))
};
goog.dom.TagIterator.prototype.restartTag = function() {
    var a = this.reversed ? goog.dom.TagWalkType.START_TAG : goog.dom.TagWalkType.END_TAG;
    this.tagType == a && (this.tagType = -1 * a, this.depth += this.tagType * (this.reversed ? -1 : 1))
};
goog.dom.TagIterator.prototype.next = function() {
    var a;
    if (this.started_) {
        if (!this.node || this.constrained && 0 == this.depth) throw goog.iter.StopIteration;
        a = this.node;
        var b = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
        if (this.tagType == b) {
            var c = this.reversed ? a.lastChild : a.firstChild;
            c ? this.setPosition(c) : this.setPosition(a, -1 * b)
        } else(c = this.reversed ? a.previousSibling : a.nextSibling) ? this.setPosition(c) : this.setPosition(a.parentNode, -1 * b);
        this.depth += this.tagType * (this.reversed ?
            -1 : 1)
    } else this.started_ = !0;
    a = this.node;
    if (!this.node) throw goog.iter.StopIteration;
    return a
};
goog.dom.TagIterator.prototype.isStarted = function() {
    return this.started_
};
goog.dom.TagIterator.prototype.isStartTag = function() {
    return this.tagType == goog.dom.TagWalkType.START_TAG
};
goog.dom.TagIterator.prototype.isEndTag = function() {
    return this.tagType == goog.dom.TagWalkType.END_TAG
};
goog.dom.TagIterator.prototype.isNonElement = function() {
    return this.tagType == goog.dom.TagWalkType.OTHER
};
goog.dom.TagIterator.prototype.equals = function(a) {
    return a.node == this.node && (!this.node || a.tagType == this.tagType)
};
goog.dom.TagIterator.prototype.splice = function(a) {
    var b = this.node;
    this.restartTag();
    this.reversed = !this.reversed;
    goog.dom.TagIterator.prototype.next.call(this);
    this.reversed = !this.reversed;
    for (var c = goog.isArrayLike(arguments[0]) ? arguments[0] : arguments, d = c.length - 1; 0 <= d; d--) goog.dom.insertSiblingAfter(c[d], b);
    goog.dom.removeNode(b)
};
goog.dom.NodeIterator = function(a, b, c, d) {
    goog.dom.TagIterator.call(this, a, b, c, null, d)
};
goog.inherits(goog.dom.NodeIterator, goog.dom.TagIterator);
goog.dom.NodeIterator.prototype.next = function() {
    do goog.dom.NodeIterator.superClass_.next.call(this); while (this.isEndTag());
    return this.node
};
goog.ui.PaletteRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.PaletteRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.PaletteRenderer);
goog.ui.PaletteRenderer.cellId_ = 0;
goog.ui.PaletteRenderer.CSS_CLASS = "goog-palette";
goog.ui.PaletteRenderer.prototype.createDom = function(a) {
    var b = this.getClassNames(a);
    a = a.getDomHelper().createDom(goog.dom.TagName.DIV, b ? b.join(" ") : null, this.createGrid(a.getContent(), a.getSize(), a.getDomHelper()));
    goog.a11y.aria.setRole(a, goog.a11y.aria.Role.GRID);
    return a
};
goog.ui.PaletteRenderer.prototype.createGrid = function(a, b, c) {
    for (var d = [], e = 0, f = 0; e < b.height; e++) {
        for (var g = [], h = 0; h < b.width; h++) {
            var k = a && a[f++];
            g.push(this.createCell(k, c))
        }
        d.push(this.createRow(g, c))
    }
    return this.createTable(d, c)
};
goog.ui.PaletteRenderer.prototype.createTable = function(a, b) {
    var c = b.createDom(goog.dom.TagName.TABLE, this.getCssClass() + "-table", b.createDom(goog.dom.TagName.TBODY, this.getCssClass() + "-body", a));
    c.cellSpacing = 0;
    c.cellPadding = 0;
    return c
};
goog.ui.PaletteRenderer.prototype.createRow = function(a, b) {
    var c = b.createDom(goog.dom.TagName.TR, this.getCssClass() + "-row", a);
    goog.a11y.aria.setRole(c, goog.a11y.aria.Role.ROW);
    return c
};
goog.ui.PaletteRenderer.prototype.createCell = function(a, b) {
    var c = b.createDom(goog.dom.TagName.TD, {
        "class": this.getCssClass() + "-cell",
        id: this.getCssClass() + "-cell-" + goog.ui.PaletteRenderer.cellId_++
    }, a);
    goog.a11y.aria.setRole(c, goog.a11y.aria.Role.GRIDCELL);
    goog.a11y.aria.setState(c, goog.a11y.aria.State.SELECTED, !1);
    if (!goog.dom.getTextContent(c) && !goog.a11y.aria.getLabel(c)) {
        var d = this.findAriaLabelForCell_(c);
        d && goog.a11y.aria.setLabel(c, d)
    }
    return c
};
goog.ui.PaletteRenderer.prototype.findAriaLabelForCell_ = function(a) {
    a = new goog.dom.NodeIterator(a);
    for (var b = "", c; !b && (c = goog.iter.nextOrValue(a, null));) c.nodeType == goog.dom.NodeType.ELEMENT && (b = goog.a11y.aria.getLabel(c) || c.title);
    return b
};
goog.ui.PaletteRenderer.prototype.canDecorate = function(a) {
    return !1
};
goog.ui.PaletteRenderer.prototype.decorate = function(a, b) {
    return null
};
goog.ui.PaletteRenderer.prototype.setContent = function(a, b) {
    if (a) {
        var c = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.TBODY, this.getCssClass() + "-body", a)[0];
        if (c) {
            var d = 0;
            goog.array.forEach(c.rows, function(a) {
                goog.array.forEach(a.cells, function(a) {
                    goog.dom.removeChildren(a);
                    if (b) {
                        var c = b[d++];
                        c && goog.dom.appendChild(a, c)
                    }
                })
            });
            if (d < b.length) {
                for (var e = [], f = goog.dom.getDomHelper(a), g = c.rows[0].cells.length; d < b.length;) {
                    var h = b[d++];
                    e.push(this.createCell(h, f));
                    e.length == g && (h = this.createRow(e,
                        f), goog.dom.appendChild(c, h), e.length = 0)
                }
                if (0 < e.length) {
                    for (; e.length < g;) e.push(this.createCell("", f));
                    h = this.createRow(e, f);
                    goog.dom.appendChild(c, h)
                }
            }
        }
        goog.style.setUnselectable(a, !0, goog.userAgent.GECKO)
    }
};
goog.ui.PaletteRenderer.prototype.getContainingItem = function(a, b) {
    for (var c = a.getElement(); b && b.nodeType == goog.dom.NodeType.ELEMENT && b != c;) {
        if (b.tagName == goog.dom.TagName.TD && goog.dom.classlist.contains(b, this.getCssClass() + "-cell")) return b.firstChild;
        b = b.parentNode
    }
    return null
};
goog.ui.PaletteRenderer.prototype.highlightCell = function(a, b, c) {
    b && (b = this.getCellForItem(b), goog.asserts.assert(b), goog.dom.classlist.enable(b, this.getCssClass() + "-cell-hover", c), c ? goog.a11y.aria.setState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT, b.id) : b.id == goog.a11y.aria.getState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT) && goog.a11y.aria.removeState(a.getElementStrict(), goog.a11y.aria.State.ACTIVEDESCENDANT))
};
goog.ui.PaletteRenderer.prototype.getCellForItem = function(a) {
    return a ? a.parentNode : null
};
goog.ui.PaletteRenderer.prototype.selectCell = function(a, b, c) {
    b && (a = b.parentNode, goog.dom.classlist.enable(a, this.getCssClass() + "-cell-selected", c), goog.a11y.aria.setState(a, goog.a11y.aria.State.SELECTED, c))
};
goog.ui.PaletteRenderer.prototype.getCssClass = function() {
    return goog.ui.PaletteRenderer.CSS_CLASS
};
goog.ui.SelectionModel = function(a) {
    goog.events.EventTarget.call(this);
    this.items_ = [];
    this.addItems(a)
};
goog.inherits(goog.ui.SelectionModel, goog.events.EventTarget);
goog.tagUnsealableClass(goog.ui.SelectionModel);
goog.ui.SelectionModel.prototype.selectedItem_ = null;
goog.ui.SelectionModel.prototype.selectionHandler_ = null;
goog.ui.SelectionModel.prototype.getSelectionHandler = function() {
    return this.selectionHandler_
};
goog.ui.SelectionModel.prototype.setSelectionHandler = function(a) {
    this.selectionHandler_ = a
};
goog.ui.SelectionModel.prototype.getItemCount = function() {
    return this.items_.length
};
goog.ui.SelectionModel.prototype.indexOfItem = function(a) {
    return a ? goog.array.indexOf(this.items_, a) : -1
};
goog.ui.SelectionModel.prototype.getFirst = function() {
    return this.items_[0]
};
goog.ui.SelectionModel.prototype.getLast = function() {
    return this.items_[this.items_.length - 1]
};
goog.ui.SelectionModel.prototype.getItemAt = function(a) {
    return this.items_[a] || null
};
goog.ui.SelectionModel.prototype.addItems = function(a) {
    a && (goog.array.forEach(a, function(a) {
        this.selectItem_(a, !1)
    }, this), goog.array.extend(this.items_, a))
};
goog.ui.SelectionModel.prototype.addItem = function(a) {
    this.addItemAt(a, this.getItemCount())
};
goog.ui.SelectionModel.prototype.addItemAt = function(a, b) {
    a && (this.selectItem_(a, !1), goog.array.insertAt(this.items_, a, b))
};
goog.ui.SelectionModel.prototype.removeItem = function(a) {
    a && goog.array.remove(this.items_, a) && a == this.selectedItem_ && (this.selectedItem_ = null, this.dispatchEvent(goog.events.EventType.SELECT))
};
goog.ui.SelectionModel.prototype.removeItemAt = function(a) {
    this.removeItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.getSelectedItem = function() {
    return this.selectedItem_
};
goog.ui.SelectionModel.prototype.getItems = function() {
    return goog.array.clone(this.items_)
};
goog.ui.SelectionModel.prototype.setSelectedItem = function(a) {
    a != this.selectedItem_ && (this.selectItem_(this.selectedItem_, !1), this.selectedItem_ = a, this.selectItem_(a, !0));
    this.dispatchEvent(goog.events.EventType.SELECT)
};
goog.ui.SelectionModel.prototype.getSelectedIndex = function() {
    return this.indexOfItem(this.selectedItem_)
};
goog.ui.SelectionModel.prototype.setSelectedIndex = function(a) {
    this.setSelectedItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.clear = function() {
    goog.array.clear(this.items_);
    this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.disposeInternal = function() {
    goog.ui.SelectionModel.superClass_.disposeInternal.call(this);
    delete this.items_;
    this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.selectItem_ = function(a, b) {
    a && ("function" == typeof this.selectionHandler_ ? this.selectionHandler_(a, b) : "function" == typeof a.setSelected && a.setSelected(b))
};
goog.ui.Palette = function(a, b, c) {
    goog.ui.Control.call(this, a, b || goog.ui.PaletteRenderer.getInstance(), c);
    this.setAutoStates(goog.ui.Component.State.CHECKED | goog.ui.Component.State.SELECTED | goog.ui.Component.State.OPENED, !1);
    this.currentCellControl_ = new goog.ui.Palette.CurrentCell_;
    this.currentCellControl_.setParentEventTarget(this);
    this.lastHighlightedIndex_ = -1
};
goog.inherits(goog.ui.Palette, goog.ui.Control);
goog.tagUnsealableClass(goog.ui.Palette);
goog.ui.Palette.EventType = {
    AFTER_HIGHLIGHT: goog.events.getUniqueId("afterhighlight")
};
goog.ui.Palette.prototype.size_ = null;
goog.ui.Palette.prototype.highlightedIndex_ = -1;
goog.ui.Palette.prototype.selectionModel_ = null;
goog.ui.Palette.prototype.disposeInternal = function() {
    goog.ui.Palette.superClass_.disposeInternal.call(this);
    this.selectionModel_ && (this.selectionModel_.dispose(), this.selectionModel_ = null);
    this.size_ = null;
    this.currentCellControl_.dispose()
};
goog.ui.Palette.prototype.setContentInternal = function(a) {
    goog.ui.Palette.superClass_.setContentInternal.call(this, a);
    this.adjustSize_();
    this.selectionModel_ ? (this.selectionModel_.clear(), this.selectionModel_.addItems(a)) : (this.selectionModel_ = new goog.ui.SelectionModel(a), this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_, this)), this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange));
    this.highlightedIndex_ = -1
};
goog.ui.Palette.prototype.getCaption = function() {
    return ""
};
goog.ui.Palette.prototype.setCaption = function(a) {};
goog.ui.Palette.prototype.handleMouseOver = function(a) {
    goog.ui.Palette.superClass_.handleMouseOver.call(this, a);
    var b = this.getRenderer().getContainingItem(this, a.target);
    b && a.relatedTarget && goog.dom.contains(b, a.relatedTarget) || b != this.getHighlightedItem() && this.setHighlightedItem(b)
};
goog.ui.Palette.prototype.handleMouseDown = function(a) {
    goog.ui.Palette.superClass_.handleMouseDown.call(this, a);
    this.isActive() && (a = this.getRenderer().getContainingItem(this, a.target), a != this.getHighlightedItem() && this.setHighlightedItem(a))
};
goog.ui.Palette.prototype.performActionInternal = function(a) {
    var b = this.getHighlightedItem();
    return b ? (this.setSelectedItem(b), goog.ui.Palette.superClass_.performActionInternal.call(this, a)) : !1
};
goog.ui.Palette.prototype.handleKeyEvent = function(a) {
    var b = this.getContent(),
        b = b ? b.length : 0,
        c = this.size_.width;
    if (0 == b || !this.isEnabled()) return !1;
    if (a.keyCode == goog.events.KeyCodes.ENTER || a.keyCode == goog.events.KeyCodes.SPACE) return this.performActionInternal(a);
    if (a.keyCode == goog.events.KeyCodes.HOME) return this.setHighlightedIndex(0), !0;
    if (a.keyCode == goog.events.KeyCodes.END) return this.setHighlightedIndex(b - 1), !0;
    var d = 0 > this.highlightedIndex_ ? this.getSelectedIndex() : this.highlightedIndex_;
    switch (a.keyCode) {
        case goog.events.KeyCodes.LEFT:
            if (-1 ==
                d || 0 == d) d = b;
            this.setHighlightedIndex(d - 1);
            a.preventDefault();
            return !0;
        case goog.events.KeyCodes.RIGHT:
            return d == b - 1 && (d = -1), this.setHighlightedIndex(d + 1), a.preventDefault(), !0;
        case goog.events.KeyCodes.UP:
            -1 == d && (d = b + c - 1);
            if (d >= c) return this.setHighlightedIndex(d - c), a.preventDefault(), !0;
            break;
        case goog.events.KeyCodes.DOWN:
            if (-1 == d && (d = -c), d < b - c) return this.setHighlightedIndex(d + c), a.preventDefault(), !0
    }
    return !1
};
goog.ui.Palette.prototype.handleSelectionChange = function(a) {};
goog.ui.Palette.prototype.getSize = function() {
    return this.size_
};
goog.ui.Palette.prototype.setSize = function(a, b) {
    if (this.getElement()) throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
    this.size_ = goog.isNumber(a) ? new goog.math.Size(a, b) : a;
    this.adjustSize_()
};
goog.ui.Palette.prototype.getHighlightedIndex = function() {
    return this.highlightedIndex_
};
goog.ui.Palette.prototype.getHighlightedItem = function() {
    var a = this.getContent();
    return a && a[this.highlightedIndex_]
};
goog.ui.Palette.prototype.getHighlightedCellElement_ = function() {
    return this.getRenderer().getCellForItem(this.getHighlightedItem())
};
goog.ui.Palette.prototype.setHighlightedIndex = function(a) {
    a != this.highlightedIndex_ && (this.highlightIndex_(this.highlightedIndex_, !1), this.lastHighlightedIndex_ = this.highlightedIndex_, this.highlightedIndex_ = a, this.highlightIndex_(a, !0), this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))
};
goog.ui.Palette.prototype.setHighlightedItem = function(a) {
    var b = this.getContent();
    this.setHighlightedIndex(b && a ? goog.array.indexOf(b, a) : -1)
};
goog.ui.Palette.prototype.getSelectedIndex = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
};
goog.ui.Palette.prototype.getSelectedItem = function() {
    return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
};
goog.ui.Palette.prototype.setSelectedIndex = function(a) {
    this.selectionModel_ && this.selectionModel_.setSelectedIndex(a)
};
goog.ui.Palette.prototype.setSelectedItem = function(a) {
    this.selectionModel_ && this.selectionModel_.setSelectedItem(a)
};
goog.ui.Palette.prototype.highlightIndex_ = function(a, b) {
    if (this.getElement()) {
        var c = this.getContent();
        if (c && 0 <= a && a < c.length) {
            var d = this.getHighlightedCellElement_();
            this.currentCellControl_.getElement() != d && this.currentCellControl_.setElementInternal(d);
            this.currentCellControl_.tryHighlight(b) && this.getRenderer().highlightCell(this, c[a], b)
        }
    }
};
goog.ui.Palette.prototype.setHighlighted = function(a) {
    a && -1 == this.highlightedIndex_ ? this.setHighlightedIndex(-1 < this.lastHighlightedIndex_ ? this.lastHighlightedIndex_ : 0) : a || this.setHighlightedIndex(-1);
    goog.ui.Palette.superClass_.setHighlighted.call(this, a)
};
goog.ui.Palette.prototype.selectItem_ = function(a, b) {
    this.getElement() && this.getRenderer().selectCell(this, a, b)
};
goog.ui.Palette.prototype.adjustSize_ = function() {
    var a = this.getContent();
    if (a)
        if (this.size_ && this.size_.width) {
            if (a = Math.ceil(a.length / this.size_.width), !goog.isNumber(this.size_.height) || this.size_.height < a) this.size_.height = a
        } else a = Math.ceil(Math.sqrt(a.length)), this.size_ = new goog.math.Size(a, a);
    else this.size_ = new goog.math.Size(0, 0)
};
goog.ui.Palette.CurrentCell_ = function() {
    goog.ui.Control.call(this, null);
    this.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, !0)
};
goog.inherits(goog.ui.Palette.CurrentCell_, goog.ui.Control);
goog.ui.Palette.CurrentCell_.prototype.tryHighlight = function(a) {
    this.setHighlighted(a);
    return this.isHighlighted() == a
};
goog.ui.ColorPalette = function(a, b, c) {
    this.colors_ = a || [];
    goog.ui.Palette.call(this, null, b || goog.ui.PaletteRenderer.getInstance(), c);
    this.setColors(this.colors_)
};
goog.inherits(goog.ui.ColorPalette, goog.ui.Palette);
goog.tagUnsealableClass(goog.ui.ColorPalette);
goog.ui.ColorPalette.prototype.normalizedColors_ = null;
goog.ui.ColorPalette.prototype.labels_ = null;
goog.ui.ColorPalette.prototype.getColors = function() {
    return this.colors_
};
goog.ui.ColorPalette.prototype.setColors = function(a, b) {
    this.colors_ = a;
    this.labels_ = b || null;
    this.normalizedColors_ = null;
    this.setContent(this.createColorNodes())
};
goog.ui.ColorPalette.prototype.getSelectedColor = function() {
    var a = this.getSelectedItem();
    return a ? (a = goog.style.getStyle(a, "background-color"), goog.ui.ColorPalette.parseColor_(a)) : null
};
goog.ui.ColorPalette.prototype.setSelectedColor = function(a) {
    a = goog.ui.ColorPalette.parseColor_(a);
    this.normalizedColors_ || (this.normalizedColors_ = goog.array.map(this.colors_, function(a) {
        return goog.ui.ColorPalette.parseColor_(a)
    }));
    this.setSelectedIndex(a ? goog.array.indexOf(this.normalizedColors_, a) : -1)
};
goog.ui.ColorPalette.prototype.createColorNodes = function() {
    return goog.array.map(this.colors_, function(a, b) {
        var c = this.getDomHelper().createDom(goog.dom.TagName.DIV, {
            "class": this.getRenderer().getCssClass() + "-colorswatch",
            style: "background-color:" + a
        });
        c.title = this.labels_ && this.labels_[b] ? this.labels_[b] : "#" == a.charAt(0) ? "RGB (" + goog.color.hexToRgb(a).join(", ") + ")" : a;
        return c
    }, this)
};
goog.ui.ColorPalette.parseColor_ = function(a) {
    if (a) try {
        return goog.color.parse(a).hex
    } catch (b) {}
    return null
};
goog.ui.ColorPicker = function(a, b) {
    goog.ui.Component.call(this, a);
    this.colorPalette_ = b || null;
    this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onColorPaletteAction_)
};
goog.inherits(goog.ui.ColorPicker, goog.ui.Component);
goog.ui.ColorPicker.DEFAULT_NUM_COLS = 5;
goog.ui.ColorPicker.EventType = {
    CHANGE: "change"
};
goog.ui.ColorPicker.prototype.focusable_ = !0;
goog.ui.ColorPicker.prototype.getColors = function() {
    return this.colorPalette_ ? this.colorPalette_.getColors() : null
};
goog.ui.ColorPicker.prototype.setColors = function(a) {
    this.colorPalette_ ? this.colorPalette_.setColors(a) : this.createColorPalette_(a)
};
goog.ui.ColorPicker.prototype.addColors = function(a) {
    this.setColors(a)
};
goog.ui.ColorPicker.prototype.setSize = function(a) {
    this.colorPalette_ || this.createColorPalette_([]);
    this.colorPalette_.setSize(a)
};
goog.ui.ColorPicker.prototype.getSize = function() {
    return this.colorPalette_ ? this.colorPalette_.getSize() : null
};
goog.ui.ColorPicker.prototype.setColumnCount = function(a) {
    this.setSize(a)
};
goog.ui.ColorPicker.prototype.getSelectedIndex = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedIndex() : -1
};
goog.ui.ColorPicker.prototype.setSelectedIndex = function(a) {
    this.colorPalette_ && this.colorPalette_.setSelectedIndex(a)
};
goog.ui.ColorPicker.prototype.getSelectedColor = function() {
    return this.colorPalette_ ? this.colorPalette_.getSelectedColor() : null
};
goog.ui.ColorPicker.prototype.setSelectedColor = function(a) {
    this.colorPalette_ && this.colorPalette_.setSelectedColor(a)
};
goog.ui.ColorPicker.prototype.isFocusable = function() {
    return this.focusable_
};
goog.ui.ColorPicker.prototype.setFocusable = function(a) {
    this.focusable_ = a;
    this.colorPalette_ && this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.ColorPicker.prototype.canDecorate = function(a) {
    return !1
};
goog.ui.ColorPicker.prototype.enterDocument = function() {
    goog.ui.ColorPicker.superClass_.enterDocument.call(this);
    this.colorPalette_ && this.colorPalette_.render(this.getElement());
    this.getElement().unselectable = "on"
};
goog.ui.ColorPicker.prototype.disposeInternal = function() {
    goog.ui.ColorPicker.superClass_.disposeInternal.call(this);
    this.colorPalette_ && (this.colorPalette_.dispose(), this.colorPalette_ = null)
};
goog.ui.ColorPicker.prototype.focus = function() {
    this.colorPalette_ && this.colorPalette_.getElement().focus()
};
goog.ui.ColorPicker.prototype.onColorPaletteAction_ = function(a) {
    a.stopPropagation();
    this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)
};
goog.ui.ColorPicker.prototype.createColorPalette_ = function(a) {
    a = new goog.ui.ColorPalette(a, null, this.getDomHelper());
    a.setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS);
    a.setSupportedState(goog.ui.Component.State.FOCUSED, this.focusable_);
    this.addChild(a);
    this.colorPalette_ = a;
    this.isInDocument() && this.colorPalette_.render(this.getElement())
};
goog.ui.ColorPicker.createSimpleColorGrid = function(a) {
    a = new goog.ui.ColorPicker(a);
    a.setSize(7);
    a.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);
    return a
};
goog.ui.ColorPicker.SIMPLE_GRID_COLORS = "#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");
goog.events.FocusHandler = function(a) {
    goog.events.EventTarget.call(this);
    this.element_ = a;
    a = goog.userAgent.IE ? "focusout" : "blur";
    this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
    this.listenKeyOut_ = goog.events.listen(this.element_, a, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout"
};
goog.events.FocusHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent(),
        b = new goog.events.BrowserEvent(b);
    b.type = "focusin" == a.type || "focus" == a.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
    this.dispatchEvent(b)
};
goog.events.FocusHandler.prototype.disposeInternal = function() {
    goog.events.FocusHandler.superClass_.disposeInternal.call(this);
    goog.events.unlistenByKey(this.listenKeyIn_);
    goog.events.unlistenByKey(this.listenKeyOut_);
    delete this.element_
};
goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
});
goog.html.SafeScript.unwrap = function(a) {
    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeScript"
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
    return this
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.structs = {};
goog.structs.getCount = function(a) {
    return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
    if (a.getValues && "function" == typeof a.getValues) return a.getValues();
    if (goog.isString(a)) return a.split("");
    if (goog.isArrayLike(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
    if (a.getKeys && "function" == typeof a.getKeys) return a.getKeys();
    if (!a.getValues || "function" != typeof a.getValues) {
        if (goog.isArrayLike(a) || goog.isString(a)) {
            var b = [];
            a = a.length;
            for (var c = 0; c < a; c++) b.push(c);
            return b
        }
        return goog.object.getKeys(a)
    }
};
goog.structs.contains = function(a, b) {
    return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
    return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
    a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
    else if (goog.isArrayLike(a) || goog.isString(a)) goog.array.forEach(a, b, c);
    else
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
};
goog.structs.filter = function(a, b, c) {
    if ("function" == typeof a.filter) return a.filter(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.filter(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    } else
        for (d = [], h = 0; h < g; h++) b.call(c, f[h], void 0, a) && d.push(f[h]);
    return d
};
goog.structs.map = function(a, b, c) {
    if ("function" == typeof a.map) return a.map(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.map(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) d[e[h]] = b.call(c, f[h], e[h], a)
    } else
        for (d = [], h = 0; h < g; h++) d[h] = b.call(c, f[h], void 0, a);
    return d
};
goog.structs.some = function(a, b, c) {
    if ("function" == typeof a.some) return a.some(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.some(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (b.call(c, e[g], d && d[g], a)) return !0;
    return !1
};
goog.structs.every = function(a, b, c) {
    if ("function" == typeof a.every) return a.every(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.every(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (!b.call(c, e[g], d && d[g], a)) return !1;
    return !0
};
goog.structs.Collection = function() {};
goog.structs.Map = function(a, b) {
    this.map_ = {};
    this.keys_ = [];
    this.version_ = this.count_ = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
goog.structs.Map.prototype.getCount = function() {
    return this.count_
};
goog.structs.Map.prototype.getValues = function() {
    this.cleanupKeysArray_();
    for (var a = [], b = 0; b < this.keys_.length; b++) a.push(this.map_[this.keys_[b]]);
    return a
};
goog.structs.Map.prototype.getKeys = function() {
    this.cleanupKeysArray_();
    return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
    for (var b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) return !0
    }
    return !1
};
goog.structs.Map.prototype.equals = function(a, b) {
    if (this === a) return !0;
    if (this.count_ != a.getCount()) return !1;
    var c = b || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var d, e = 0; d = this.keys_[e]; e++)
        if (!c(this.get(d), a.get(d))) return !1;
    return !0
};
goog.structs.Map.defaultEquals = function(a, b) {
    return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
    return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
    this.map_ = {};
    this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
    if (this.count_ != this.keys_.length) {
        for (var a = 0, b = 0; a < this.keys_.length;) {
            var c = this.keys_[a];
            goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
            a++
        }
        this.keys_.length = b
    }
    if (this.count_ != this.keys_.length) {
        for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
        this.keys_.length = b
    }
};
goog.structs.Map.prototype.get = function(a, b) {
    return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
    goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
    this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
    var b;
    a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog.structs.Map.prototype.forEach = function(a, b) {
    for (var c = this.getKeys(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
goog.structs.Map.prototype.clone = function() {
    return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
    for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a.set(this.map_[c], c)
    }
    return a
};
goog.structs.Map.prototype.toObject = function() {
    this.cleanupKeysArray_();
    for (var a = {}, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a[c] = this.map_[c]
    }
    return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
    return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
    return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
    this.cleanupKeysArray_();
    var b = 0,
        c = this.version_,
        d = this,
        e = new goog.iter.Iterator;
    e.next = function() {
        if (c != d.version_) throw Error("The map has changed since the iterator was created");
        if (b >= d.keys_.length) throw goog.iter.StopIteration;
        var e = d.keys_[b++];
        return a ? e : d.map_[e]
    };
    return e
};
goog.structs.Map.hasKey_ = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
goog.structs.Set = function(a) {
    this.map_ = new goog.structs.Map;
    a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
    var b = typeof a;
    return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
    return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
    this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
};
goog.structs.Set.prototype.removeAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
};
goog.structs.Set.prototype.remove = function(a) {
    return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
    this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
    return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
    return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
    return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
    var b = new goog.structs.Set;
    a = goog.structs.getValues(a);
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        this.contains(d) && b.add(d)
    }
    return b
};
goog.structs.Set.prototype.difference = function(a) {
    var b = this.clone();
    b.removeAll(a);
    return b
};
goog.structs.Set.prototype.getValues = function() {
    return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
    return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
    return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
    var b = goog.structs.getCount(a);
    if (this.getCount() > b) return !1;
    !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
    return goog.structs.every(this, function(b) {
        return goog.structs.contains(a, b)
    })
};
goog.structs.Set.prototype.__iterator__ = function(a) {
    return this.map_.__iterator__(!1)
};
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
    c = c || goog.global;
    var d = c.onerror,
        e = !!b;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
    c.onerror = function(b, c, h, k, l) {
        d && d(b, c, h, k, l);
        a({
            message: b,
            fileName: c,
            line: h,
            col: k,
            error: l
        });
        return e
    }
};
goog.debug.expose = function(a, b) {
    if ("undefined" == typeof a) return "undefined";
    if (null == a) return "NULL";
    var c = [],
        d;
    for (d in a)
        if (b || !goog.isFunction(a[d])) {
            var e = d + " = ";
            try {
                e += a[d]
            } catch (f) {
                e += "*** " + f + " ***"
            }
            c.push(e)
        }
    return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
    var c = [],
        d = function(a, f, g) {
            var h = f + "  ";
            g = new goog.structs.Set(g);
            try {
                if (goog.isDef(a))
                    if (goog.isNull(a)) c.push("NULL");
                    else if (goog.isString(a)) c.push('"' + a.replace(/\n/g, "\n" + f) + '"');
                else if (goog.isFunction(a)) c.push(String(a).replace(/\n/g, "\n" + f));
                else if (goog.isObject(a))
                    if (g.contains(a)) c.push("*** reference loop detected ***");
                    else {
                        g.add(a);
                        c.push("{");
                        for (var k in a)
                            if (b || !goog.isFunction(a[k])) c.push("\n"), c.push(h), c.push(k + " = "), d(a[k], h, g);
                        c.push("\n" +
                            f + "}")
                    } else c.push(a);
                else c.push("undefined")
            } catch (l) {
                c.push("*** " + l + " ***")
            }
        };
    d(a, "", new goog.structs.Set);
    return c.join("")
};
goog.debug.exposeArray = function(a) {
    for (var b = [], c = 0; c < a.length; c++) goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
    return "[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
    var c = goog.debug.exposeExceptionAsHtml(a, b);
    return goog.html.SafeHtml.unwrap(c)
};
goog.debug.exposeExceptionAsHtml = function(a, b) {
    try {
        var c = goog.debug.normalizeErrorObject(a),
            d = goog.debug.createViewSourceUrl_(c.fileName);
        return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + c.message + "\nUrl: "), goog.html.SafeHtml.create("a", {
            href: d,
            target: "_new"
        }, c.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(b) +
            "-> "))
    } catch (e) {
        return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + e)
    }
};
goog.debug.createViewSourceUrl_ = function(a) {
    goog.isDefAndNotNull(a) || (a = "");
    if (!/^https?:\/\//i.test(a)) return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
    a = goog.html.SafeUrl.sanitize(a);
    return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(a))
};
goog.debug.normalizeErrorObject = function(a) {
    var b = goog.getObjectByName("window.location.href");
    if (goog.isString(a)) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c, d, e = !1;
    try {
        c = a.lineNumber || a.line || "Not available"
    } catch (f) {
        c = "Not available", e = !0
    }
    try {
        d = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b
    } catch (f) {
        d = "Not available", e = !0
    }
    return !e && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {
        message: a.message || "Not available",
        name: a.name || "UnknownError",
        lineNumber: c,
        fileName: d,
        stack: a.stack || "Not available"
    }
};
goog.debug.enhanceError = function(a, b) {
    var c;
    "string" == typeof a ? (c = Error(a), Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError)) : c = a;
    c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
    if (b) {
        for (var d = 0; c["message" + d];) ++d;
        c["message" + d] = String(b)
    }
    return c
};
goog.debug.getStacktraceSimple = function(a) {
    if (!goog.debug.FORCE_SLOPPY_STACKS) {
        var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (b) return b
    }
    for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
        b.push(goog.debug.getFunctionName(c));
        b.push("()\n");
        try {
            c = c.caller
        } catch (e) {
            b.push("[exception trying to get caller]\n");
            break
        }
        d++;
        if (d >= goog.debug.MAX_STACK_DEPTH) {
            b.push("[...long stack...]");
            break
        }
    }
    a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
    return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
    var b = Error();
    if (Error.captureStackTrace) return Error.captureStackTrace(b, a), String(b.stack);
    try {
        throw b;
    } catch (c) {
        b = c
    }
    return (a = b.stack) ? String(a) : null
};
goog.debug.getStacktrace = function(a) {
    var b;
    goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
    b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
    return b
};
goog.debug.getStacktraceHelper_ = function(a, b) {
    var c = [];
    if (goog.array.contains(b, a)) c.push("[...circular reference...]");
    else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
        c.push(goog.debug.getFunctionName(a) + "(");
        for (var d = a.arguments, e = 0; d && e < d.length; e++) {
            0 < e && c.push(", ");
            var f;
            f = d[e];
            switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(goog.debug.getStacktraceHelper_(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
};
goog.debug.setFunctionResolver = function(a) {
    goog.debug.fnNameResolver_ = a
};
goog.debug.getFunctionName = function(a) {
    if (goog.debug.fnNameCache_[a]) return goog.debug.fnNameCache_[a];
    if (goog.debug.fnNameResolver_) {
        var b = goog.debug.fnNameResolver_(a);
        if (b) return goog.debug.fnNameCache_[a] = b
    }
    a = String(a);
    goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
    return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
    return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.runtimeType = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
    this.time_ = d || goog.now();
    this.level_ = a;
    this.msg_ = b;
    this.loggerName_ = c;
    delete this.exception_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
    return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
    return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
    this.exception_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
    this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
    return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
    this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
    return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
    this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
    return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
    this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
    return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
    this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
    goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
    return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
    var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    this.curIndex_ = d;
    if (this.isFull_) return d = this.buffer_[d], d.reset(a, b, c), d;
    this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
    return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
    return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
    this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
    this.curIndex_ = -1;
    this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
    var b = this.buffer_;
    if (b[0]) {
        var c = this.curIndex_,
            d = this.isFull_ ? c : -1;
        do d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]); while (d != c)
    }
};
goog.debug.Logger = function(a) {
    this.name_ = a;
    this.handlers_ = this.children_ = this.level_ = this.parent_ = null
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
    this.name = a;
    this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
    return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    if (a in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[a];
    for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
        var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
        if (c.value <= a) return c
    }
    return null
};
goog.debug.Logger.getLogger = function(a) {
    return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
    goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
    goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
};
goog.debug.Logger.prototype.getName = function() {
    return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)))
};
goog.debug.Logger.prototype.removeHandler = function(a) {
    if (goog.debug.LOGGING_ENABLED) {
        var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!b && goog.array.remove(b, a)
    }
    return !1
};
goog.debug.Logger.prototype.getParent = function() {
    return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
    this.children_ || (this.children_ = {});
    return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a))
};
goog.debug.Logger.prototype.getLevel = function() {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
    if (!goog.debug.LOGGING_ENABLED) return goog.debug.Logger.Level.OFF;
    if (!goog.debug.Logger.ENABLE_HIERARCHY) return goog.debug.Logger.rootLevel_;
    if (this.level_) return this.level_;
    if (this.parent_) return this.parent_.getEffectiveLevel();
    goog.asserts.fail("Root logger has no level set.");
    return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
    return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
    a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
    c && a.setException(c);
    return a
};
goog.debug.Logger.prototype.shout = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
    goog.debug.Logger.logToProfilers("log:" + a.getMessage());
    if (goog.debug.Logger.ENABLE_HIERARCHY)
        for (var b = this; b;) b.callPublish_(a), b = b.getParent();
    else
        for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) c(a)
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
    if (this.handlers_)
        for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
};
goog.debug.Logger.prototype.setParent_ = function(a) {
    this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
    this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function() {
    return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
    return function(b) {
        (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
    }
};
goog.debug.LogManager.createLogger_ = function(a) {
    var b = new goog.debug.Logger(a);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var c = a.lastIndexOf("."),
            d = a.substr(0, c),
            c = a.substr(c + 1),
            d = goog.debug.LogManager.getLogger(d);
        d.addChild_(c, b);
        b.setParent_(d)
    }
    return goog.debug.LogManager.loggers_[a] = b
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
    if (goog.log.ENABLED) {
        var c = goog.debug.LogManager.getLogger(a);
        b && c && c.setLevel(b);
        return c
    }
    return null
};
goog.log.addHandler = function(a, b) {
    goog.log.ENABLED && a && a.addHandler(b)
};
goog.log.removeHandler = function(a, b) {
    return goog.log.ENABLED && a ? a.removeHandler(b) : !1
};
goog.log.log = function(a, b, c, d) {
    goog.log.ENABLED && a && a.log(b, c, d)
};
goog.log.error = function(a, b, c) {
    goog.log.ENABLED && a && a.severe(b, c)
};
goog.log.warning = function(a, b, c) {
    goog.log.ENABLED && a && a.warning(b, c)
};
goog.log.info = function(a, b, c) {
    goog.log.ENABLED && a && a.info(b, c)
};
goog.log.fine = function(a, b, c) {
    goog.log.ENABLED && a && a.fine(b, c)
};
goog.html.legacyconversions = {};
goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS = !0;
goog.html.legacyconversions.safeHtmlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null)
};
goog.html.legacyconversions.safeStyleFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.safeUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
goog.html.legacyconversions.setReportCallback = function(a) {
    goog.html.legacyconversions.reportCallback_ = a
};
goog.html.legacyconversions.throwIfConversionsDisallowed = function() {
    if (!goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS) throw Error("Error: Legacy conversion from string to goog.html types is disabled");
    goog.html.legacyconversions.reportCallback_()
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += String(a);
    if (null != b)
        for (var d = 1; d < arguments.length; d++) this.buffer_ += arguments[d];
    return this
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
};
goog.ui.tree = {};
goog.ui.tree.BaseNode = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.config_ = b || goog.ui.tree.BaseNode.defaultConfig;
    this.html_ = a instanceof goog.html.SafeHtml ? a : goog.html.legacyconversions.safeHtmlFromString(a);
    this.expanded_ = this.selected_ = !1;
    this.toolTip_ = null;
    this.afterLabelHtml_ = goog.html.SafeHtml.EMPTY;
    this.isUserCollapsible_ = !0;
    this.depth_ = -1
};
goog.inherits(goog.ui.tree.BaseNode, goog.ui.Component);
goog.ui.tree.BaseNode.EventType = {
    BEFORE_EXPAND: "beforeexpand",
    EXPAND: "expand",
    BEFORE_COLLAPSE: "beforecollapse",
    COLLAPSE: "collapse"
};
goog.ui.tree.BaseNode.allNodes = {};
goog.ui.tree.BaseNode.prototype.disposeInternal = function() {
    goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this);
    this.tree && (this.tree.removeNode(this), this.tree = null);
    this.setElementInternal(null)
};
goog.ui.tree.BaseNode.prototype.initAccessibility = function() {
    var a = this.getElement();
    if (a) {
        var b = this.getLabelElement();
        b && !b.id && (b.id = this.getId() + ".label");
        goog.a11y.aria.setRole(a, "treeitem");
        goog.a11y.aria.setState(a, "selected", !1);
        goog.a11y.aria.setState(a, "expanded", !1);
        goog.a11y.aria.setState(a, "level", this.getDepth());
        b && goog.a11y.aria.setState(a, "labelledby", b.id);
        (a = this.getIconElement()) && goog.a11y.aria.setRole(a, "presentation");
        (a = this.getExpandIconElement()) && goog.a11y.aria.setRole(a,
            "presentation");
        if (a = this.getChildrenElement())
            if (goog.a11y.aria.setRole(a, "group"), a.hasChildNodes())
                for (a = this.getChildCount(), b = 1; b <= a; b++) {
                    var c = this.getChildAt(b - 1).getElement();
                    goog.asserts.assert(c, "The child element cannot be null");
                    goog.a11y.aria.setState(c, "setsize", a);
                    goog.a11y.aria.setState(c, "posinset", b)
                }
    }
};
goog.ui.tree.BaseNode.prototype.createDom = function() {
    var a = this.getDomHelper().safeHtmlToNode(this.toSafeHtml());
    this.setElementInternal(a)
};
goog.ui.tree.BaseNode.prototype.enterDocument = function() {
    goog.ui.tree.BaseNode.superClass_.enterDocument.call(this);
    goog.ui.tree.BaseNode.allNodes[this.getId()] = this;
    this.initAccessibility()
};
goog.ui.tree.BaseNode.prototype.exitDocument = function() {
    goog.ui.tree.BaseNode.superClass_.exitDocument.call(this);
    delete goog.ui.tree.BaseNode.allNodes[this.getId()]
};
goog.ui.tree.BaseNode.prototype.addChildAt = function(a, b, c) {
    goog.asserts.assert(!a.getParent());
    goog.asserts.assertInstanceof(a, goog.ui.tree.BaseNode);
    c = this.getChildAt(b - 1);
    var d = this.getChildAt(b);
    goog.ui.tree.BaseNode.superClass_.addChildAt.call(this, a, b);
    a.previousSibling_ = c;
    a.nextSibling_ = d;
    c ? c.nextSibling_ = a : this.firstChild_ = a;
    d ? d.previousSibling_ = a : this.lastChild_ = a;
    (b = this.getTree()) && a.setTreeInternal(b);
    a.setDepth_(this.getDepth() + 1);
    if (this.getElement() && (this.updateExpandIcon(), this.getExpanded())) {
        b =
            this.getChildrenElement();
        a.getElement() || a.createDom();
        var e = a.getElement(),
            f = d && d.getElement();
        b.insertBefore(e, f);
        this.isInDocument() && a.enterDocument();
        d || (c ? c.updateExpandIcon() : (goog.style.setElementShown(b, !0), this.setExpanded(this.getExpanded())))
    }
};
goog.ui.tree.BaseNode.prototype.add = function(a, b) {
    goog.asserts.assert(!b || b.getParent() == this, "Can only add nodes before siblings");
    a.getParent() && a.getParent().removeChild(a);
    this.addChildAt(a, b ? this.indexOfChild(b) : this.getChildCount());
    return a
};
goog.ui.tree.BaseNode.prototype.removeChild = function(a, b) {
    var c = this.getTree(),
        d = c ? c.getSelectedItem() : null;
    if (d == a || a.contains(d)) c.hasFocus() ? (this.select(), goog.Timer.callOnce(this.onTimeoutSelect_, 10, this)) : this.select();
    goog.ui.tree.BaseNode.superClass_.removeChild.call(this, a);
    this.lastChild_ == a && (this.lastChild_ = a.previousSibling_);
    this.firstChild_ == a && (this.firstChild_ = a.nextSibling_);
    a.previousSibling_ && (a.previousSibling_.nextSibling_ = a.nextSibling_);
    a.nextSibling_ && (a.nextSibling_.previousSibling_ =
        a.previousSibling_);
    d = a.isLastSibling();
    a.tree = null;
    a.depth_ = -1;
    if (c && (c.removeNode(this), this.isInDocument())) {
        c = this.getChildrenElement();
        if (a.isInDocument()) {
            var e = a.getElement();
            c.removeChild(e);
            a.exitDocument()
        }
        d && (d = this.getLastChild()) && d.updateExpandIcon();
        this.hasChildren() || (c.style.display = "none", this.updateExpandIcon(), this.updateIcon_())
    }
    return a
};
goog.ui.tree.BaseNode.prototype.remove = goog.ui.tree.BaseNode.prototype.removeChild;
goog.ui.tree.BaseNode.prototype.onTimeoutSelect_ = function() {
    this.select()
};
goog.ui.tree.BaseNode.prototype.getDepth = function() {
    var a = this.depth_;
    0 > a && (a = this.computeDepth_(), this.setDepth_(a));
    return a
};
goog.ui.tree.BaseNode.prototype.computeDepth_ = function() {
    var a = this.getParent();
    return a ? a.getDepth() + 1 : 0
};
goog.ui.tree.BaseNode.prototype.setDepth_ = function(a) {
    if (a != this.depth_) {
        this.depth_ = a;
        var b = this.getRowElement();
        if (b) {
            var c = this.getPixelIndent_() + "px";
            this.isRightToLeft() ? b.style.paddingRight = c : b.style.paddingLeft = c
        }
        this.forEachChild(function(b) {
            b.setDepth_(a + 1)
        })
    }
};
goog.ui.tree.BaseNode.prototype.contains = function(a) {
    for (; a;) {
        if (a == this) return !0;
        a = a.getParent()
    }
    return !1
};
goog.ui.tree.BaseNode.EMPTY_CHILDREN_ = [];
goog.ui.tree.BaseNode.prototype.getChildren = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b)
    });
    return a
};
goog.ui.tree.BaseNode.prototype.getFirstChild = function() {
    return this.getChildAt(0)
};
goog.ui.tree.BaseNode.prototype.getLastChild = function() {
    return this.getChildAt(this.getChildCount() - 1)
};
goog.ui.tree.BaseNode.prototype.getPreviousSibling = function() {
    return this.previousSibling_
};
goog.ui.tree.BaseNode.prototype.getNextSibling = function() {
    return this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isLastSibling = function() {
    return !this.nextSibling_
};
goog.ui.tree.BaseNode.prototype.isSelected = function() {
    return this.selected_
};
goog.ui.tree.BaseNode.prototype.select = function() {
    var a = this.getTree();
    a && a.setSelectedItem(this)
};
goog.ui.tree.BaseNode.prototype.deselect = goog.nullFunction;
goog.ui.tree.BaseNode.prototype.setSelectedInternal = function(a) {
    if (this.selected_ != a) {
        this.selected_ = a;
        this.updateRow();
        var b = this.getElement();
        b && (goog.a11y.aria.setState(b, "selected", a), a && (a = this.getTree().getElement(), goog.asserts.assert(a, "The DOM element for the tree cannot be null"), goog.a11y.aria.setState(a, "activedescendant", this.getId())))
    }
};
goog.ui.tree.BaseNode.prototype.getExpanded = function() {
    return this.expanded_
};
goog.ui.tree.BaseNode.prototype.setExpandedInternal = function(a) {
    this.expanded_ = a
};
goog.ui.tree.BaseNode.prototype.setExpanded = function(a) {
    var b = a != this.expanded_;
    if (!b || this.dispatchEvent(a ? goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND : goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE)) {
        var c;
        this.expanded_ = a;
        c = this.getTree();
        var d = this.getElement();
        if (this.hasChildren()) {
            if (!a && c && this.contains(c.getSelectedItem()) && this.select(), d) {
                if (c = this.getChildrenElement())
                    if (goog.style.setElementShown(c, a), a && this.isInDocument() && !c.hasChildNodes()) {
                        var e = [];
                        this.forEachChild(function(a) {
                            e.push(a.toSafeHtml())
                        });
                        goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(e));
                        this.forEachChild(function(a) {
                            a.enterDocument()
                        })
                    }
                this.updateExpandIcon()
            }
        } else(c = this.getChildrenElement()) && goog.style.setElementShown(c, !1);
        d && (this.updateIcon_(), goog.a11y.aria.setState(d, "expanded", a));
        b && this.dispatchEvent(a ? goog.ui.tree.BaseNode.EventType.EXPAND : goog.ui.tree.BaseNode.EventType.COLLAPSE)
    }
};
goog.ui.tree.BaseNode.prototype.toggle = function() {
    this.setExpanded(!this.getExpanded())
};
goog.ui.tree.BaseNode.prototype.expand = function() {
    this.setExpanded(!0)
};
goog.ui.tree.BaseNode.prototype.collapse = function() {
    this.setExpanded(!1)
};
goog.ui.tree.BaseNode.prototype.collapseChildren = function() {
    this.forEachChild(function(a) {
        a.collapseAll()
    })
};
goog.ui.tree.BaseNode.prototype.collapseAll = function() {
    this.collapseChildren();
    this.collapse()
};
goog.ui.tree.BaseNode.prototype.expandChildren = function() {
    this.forEachChild(function(a) {
        a.expandAll()
    })
};
goog.ui.tree.BaseNode.prototype.expandAll = function() {
    this.expandChildren();
    this.expand()
};
goog.ui.tree.BaseNode.prototype.reveal = function() {
    var a = this.getParent();
    a && (a.setExpanded(!0), a.reveal())
};
goog.ui.tree.BaseNode.prototype.setIsUserCollapsible = function(a) {
    (this.isUserCollapsible_ = a) || this.expand();
    this.getElement() && this.updateExpandIcon()
};
goog.ui.tree.BaseNode.prototype.isUserCollapsible = function() {
    return this.isUserCollapsible_
};
goog.ui.tree.BaseNode.prototype.toSafeHtml = function() {
    var a = this.getTree(),
        b = !a.getShowLines() || a == this.getParent() && !a.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren,
        a = this.getExpanded() && this.hasChildren(),
        b = {
            "class": b,
            style: this.getLineStyle()
        },
        c = [];
    a && this.forEachChild(function(a) {
        c.push(a.toSafeHtml())
    });
    a = goog.html.SafeHtml.create("div", b, c);
    return goog.html.SafeHtml.create("div", {
        "class": this.config_.cssItem,
        id: this.getId()
    }, [this.getRowSafeHtml(), a])
};
goog.ui.tree.BaseNode.prototype.getPixelIndent_ = function() {
    return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth)
};
goog.ui.tree.BaseNode.prototype.getRowSafeHtml = function() {
    var a = {};
    a["padding-" + (this.isRightToLeft() ? "right" : "left")] = this.getPixelIndent_() + "px";
    var a = {
            "class": this.getRowClassName(),
            style: a
        },
        b = [this.getExpandIconSafeHtml(), this.getIconSafeHtml(), this.getLabelSafeHtml()];
    return goog.html.SafeHtml.create("div", a, b)
};
goog.ui.tree.BaseNode.prototype.getRowClassName = function() {
    var a;
    a = this.isSelected() ? " " + this.config_.cssSelectedRow : "";
    return this.config_.cssTreeRow + a
};
goog.ui.tree.BaseNode.prototype.getLabelSafeHtml = function() {
    var a = goog.html.SafeHtml.create("span", {
        "class": this.config_.cssItemLabel,
        title: this.getToolTip() || null
    }, this.getSafeHtml());
    return goog.html.SafeHtml.concat(a, goog.html.SafeHtml.create("span", {}, this.getAfterLabelSafeHtml()))
};
goog.ui.tree.BaseNode.prototype.getAfterLabelHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getAfterLabelSafeHtml())
};
goog.ui.tree.BaseNode.prototype.getAfterLabelSafeHtml = function() {
    return this.afterLabelHtml_
};
goog.ui.tree.BaseNode.prototype.setAfterLabelHtml = function(a) {
    this.setAfterLabelSafeHtml(goog.html.legacyconversions.safeHtmlFromString(a))
};
goog.ui.tree.BaseNode.prototype.setAfterLabelSafeHtml = function(a) {
    this.afterLabelHtml_ = a;
    var b = this.getAfterLabelElement();
    b && goog.dom.safe.setInnerHtml(b, a)
};
goog.ui.tree.BaseNode.prototype.getIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        style: {
            display: "inline-block"
        },
        "class": this.getCalculatedIconClass()
    })
};
goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span", {
        type: "expand",
        style: {
            display: "inline-block"
        },
        "class": this.getExpandIconClass()
    })
};
goog.ui.tree.BaseNode.prototype.getExpandIconClass = function() {
    var a = this.getTree(),
        b = !a.getShowLines() || a == this.getParent() && !a.getShowRootLines(),
        c = this.config_,
        d = new goog.string.StringBuffer;
    d.append(c.cssTreeIcon, " ", c.cssExpandTreeIcon, " ");
    if (this.hasChildren()) {
        var e = 0;
        a.getShowExpandIcons() && this.isUserCollapsible_ && (e = this.getExpanded() ? 2 : 1);
        b || (e = this.isLastSibling() ? e + 4 : e + 8);
        switch (e) {
            case 1:
                d.append(c.cssExpandTreeIconPlus);
                break;
            case 2:
                d.append(c.cssExpandTreeIconMinus);
                break;
            case 4:
                d.append(c.cssExpandTreeIconL);
                break;
            case 5:
                d.append(c.cssExpandTreeIconLPlus);
                break;
            case 6:
                d.append(c.cssExpandTreeIconLMinus);
                break;
            case 8:
                d.append(c.cssExpandTreeIconT);
                break;
            case 9:
                d.append(c.cssExpandTreeIconTPlus);
                break;
            case 10:
                d.append(c.cssExpandTreeIconTMinus);
                break;
            default:
                d.append(c.cssExpandTreeIconBlank)
        }
    } else b ? d.append(c.cssExpandTreeIconBlank) : this.isLastSibling() ? d.append(c.cssExpandTreeIconL) : d.append(c.cssExpandTreeIconT);
    return d.toString()
};
goog.ui.tree.BaseNode.prototype.getLineStyle = function() {
    var a = this.getExpanded() && this.hasChildren();
    return goog.html.SafeStyle.create({
        "background-position": this.getBackgroundPosition(),
        display: a ? null : "none"
    })
};
goog.ui.tree.BaseNode.prototype.getBackgroundPosition = function() {
    return (this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0"
};
goog.ui.tree.BaseNode.prototype.getElement = function() {
    var a = goog.ui.tree.BaseNode.superClass_.getElement.call(this);
    a || (a = this.getDomHelper().getElement(this.getId()), this.setElementInternal(a));
    return a
};
goog.ui.tree.BaseNode.prototype.getRowElement = function() {
    var a = this.getElement();
    return a ? a.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getExpandIconElement = function() {
    var a = this.getRowElement();
    return a ? a.firstChild : null
};
goog.ui.tree.BaseNode.prototype.getIconElement = function() {
    var a = this.getRowElement();
    return a ? a.childNodes[1] : null
};
goog.ui.tree.BaseNode.prototype.getLabelElement = function() {
    var a = this.getRowElement();
    return a && a.lastChild ? a.lastChild.previousSibling : null
};
goog.ui.tree.BaseNode.prototype.getAfterLabelElement = function() {
    var a = this.getRowElement();
    return a ? a.lastChild : null
};
goog.ui.tree.BaseNode.prototype.getChildrenElement = function() {
    var a = this.getElement();
    return a ? a.lastChild : null
};
goog.ui.tree.BaseNode.prototype.setIconClass = function(a) {
    this.iconClass_ = a;
    this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getIconClass = function() {
    return this.iconClass_
};
goog.ui.tree.BaseNode.prototype.setExpandedIconClass = function(a) {
    this.expandedIconClass_ = a;
    this.isInDocument() && this.updateIcon_()
};
goog.ui.tree.BaseNode.prototype.getExpandedIconClass = function() {
    return this.expandedIconClass_
};
goog.ui.tree.BaseNode.prototype.setText = function(a) {
    this.setSafeHtml(goog.html.SafeHtml.htmlEscape(a))
};
goog.ui.tree.BaseNode.prototype.getText = function() {
    return goog.string.unescapeEntities(goog.html.SafeHtml.unwrap(this.html_))
};
goog.ui.tree.BaseNode.prototype.setHtml = function(a) {
    this.setSafeHtml(goog.html.legacyconversions.safeHtmlFromString(a))
};
goog.ui.tree.BaseNode.prototype.setSafeHtml = function(a) {
    this.html_ = a;
    var b = this.getLabelElement();
    b && goog.dom.safe.setInnerHtml(b, a);
    (a = this.getTree()) && a.setNode(this)
};
goog.ui.tree.BaseNode.prototype.getHtml = function() {
    return goog.html.SafeHtml.unwrap(this.getSafeHtml())
};
goog.ui.tree.BaseNode.prototype.getSafeHtml = function() {
    return this.html_
};
goog.ui.tree.BaseNode.prototype.setToolTip = function(a) {
    this.toolTip_ = a;
    var b = this.getLabelElement();
    b && (b.title = a)
};
goog.ui.tree.BaseNode.prototype.getToolTip = function() {
    return this.toolTip_
};
goog.ui.tree.BaseNode.prototype.updateRow = function() {
    var a = this.getRowElement();
    a && (a.className = this.getRowClassName())
};
goog.ui.tree.BaseNode.prototype.updateExpandIcon = function() {
    var a = this.getExpandIconElement();
    a && (a.className = this.getExpandIconClass());
    if (a = this.getChildrenElement()) a.style.backgroundPosition = this.getBackgroundPosition()
};
goog.ui.tree.BaseNode.prototype.updateIcon_ = function() {
    this.getIconElement().className = this.getCalculatedIconClass()
};
goog.ui.tree.BaseNode.prototype.onMouseDown = function(a) {
    "expand" == a.target.getAttribute("type") && this.hasChildren() ? this.isUserCollapsible_ && this.toggle() : (this.select(), this.updateRow())
};
goog.ui.tree.BaseNode.prototype.onClick_ = goog.events.Event.preventDefault;
goog.ui.tree.BaseNode.prototype.onDoubleClick_ = function(a) {
    "expand" == a.target.getAttribute("type") && this.hasChildren() || this.isUserCollapsible_ && this.toggle()
};
goog.ui.tree.BaseNode.prototype.onKeyDown = function(a) {
    var b = !0;
    switch (a.keyCode) {
        case goog.events.KeyCodes.RIGHT:
            if (a.altKey) break;
            this.hasChildren() && (this.getExpanded() ? this.getFirstChild().select() : this.setExpanded(!0));
            break;
        case goog.events.KeyCodes.LEFT:
            if (a.altKey) break;
            if (this.hasChildren() && this.getExpanded() && this.isUserCollapsible_) this.setExpanded(!1);
            else {
                var c = this.getParent(),
                    d = this.getTree();
                c && (d.getShowRootNode() || c != d) && c.select()
            }
            break;
        case goog.events.KeyCodes.DOWN:
            (c = this.getNextShownNode()) &&
            c.select();
            break;
        case goog.events.KeyCodes.UP:
            (c = this.getPreviousShownNode()) && c.select();
            break;
        default:
            b = !1
    }
    b && (a.preventDefault(), (d = this.getTree()) && d.clearTypeAhead());
    return b
};
goog.ui.tree.BaseNode.prototype.getLastShownDescendant = function() {
    return this.getExpanded() && this.hasChildren() ? this.getLastChild().getLastShownDescendant() : this
};
goog.ui.tree.BaseNode.prototype.getNextShownNode = function() {
    if (this.hasChildren() && this.getExpanded()) return this.getFirstChild();
    for (var a = this, b; a != this.getTree();) {
        b = a.getNextSibling();
        if (null != b) return b;
        a = a.getParent()
    }
    return null
};
goog.ui.tree.BaseNode.prototype.getPreviousShownNode = function() {
    var a = this.getPreviousSibling();
    if (null != a) return a.getLastShownDescendant();
    var a = this.getParent(),
        b = this.getTree();
    return !b.getShowRootNode() && a == b || this == b ? null : a
};
goog.ui.tree.BaseNode.prototype.getClientData = goog.ui.tree.BaseNode.prototype.getModel;
goog.ui.tree.BaseNode.prototype.setClientData = goog.ui.tree.BaseNode.prototype.setModel;
goog.ui.tree.BaseNode.prototype.getConfig = function() {
    return this.config_
};
goog.ui.tree.BaseNode.prototype.setTreeInternal = function(a) {
    this.tree != a && (this.tree = a, a.setNode(this), this.forEachChild(function(b) {
        b.setTreeInternal(a)
    }))
};
goog.ui.tree.BaseNode.defaultConfig = {
    indentWidth: 19,
    cssRoot: "goog-tree-root goog-tree-item",
    cssHideRoot: "goog-tree-hide-root",
    cssItem: "goog-tree-item",
    cssChildren: "goog-tree-children",
    cssChildrenNoLines: "goog-tree-children-nolines",
    cssTreeRow: "goog-tree-row",
    cssItemLabel: "goog-tree-item-label",
    cssTreeIcon: "goog-tree-icon",
    cssExpandTreeIcon: "goog-tree-expand-icon",
    cssExpandTreeIconPlus: "goog-tree-expand-icon-plus",
    cssExpandTreeIconMinus: "goog-tree-expand-icon-minus",
    cssExpandTreeIconTPlus: "goog-tree-expand-icon-tplus",
    cssExpandTreeIconTMinus: "goog-tree-expand-icon-tminus",
    cssExpandTreeIconLPlus: "goog-tree-expand-icon-lplus",
    cssExpandTreeIconLMinus: "goog-tree-expand-icon-lminus",
    cssExpandTreeIconT: "goog-tree-expand-icon-t",
    cssExpandTreeIconL: "goog-tree-expand-icon-l",
    cssExpandTreeIconBlank: "goog-tree-expand-icon-blank",
    cssExpandedFolderIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedFolderIcon: "goog-tree-collapsed-folder-icon",
    cssFileIcon: "goog-tree-file-icon",
    cssExpandedRootIcon: "goog-tree-expanded-folder-icon",
    cssCollapsedRootIcon: "goog-tree-collapsed-folder-icon",
    cssSelectedRow: "selected"
};
goog.ui.tree.TreeNode = function(a, b, c) {
    goog.ui.tree.BaseNode.call(this, a, b, c)
};
goog.inherits(goog.ui.tree.TreeNode, goog.ui.tree.BaseNode);
goog.ui.tree.TreeNode.prototype.getTree = function() {
    if (this.tree) return this.tree;
    var a = this.getParent();
    return a && (a = a.getTree()) ? (this.setTreeInternal(a), a) : null
};
goog.ui.tree.TreeNode.prototype.getCalculatedIconClass = function() {
    var a = this.getExpanded(),
        b = this.getExpandedIconClass();
    if (a && b) return b;
    b = this.getIconClass();
    if (!a && b) return b;
    b = this.getConfig();
    if (this.hasChildren()) {
        if (a && b.cssExpandedFolderIcon) return b.cssTreeIcon + " " + b.cssExpandedFolderIcon;
        if (!a && b.cssCollapsedFolderIcon) return b.cssTreeIcon + " " + b.cssCollapsedFolderIcon
    } else if (b.cssFileIcon) return b.cssTreeIcon + " " + b.cssFileIcon;
    return ""
};
goog.structs.Trie = function(a) {
    this.value_ = void 0;
    this.childNodes_ = {};
    a && this.setAll(a)
};
goog.structs.Trie.prototype.set = function(a, b) {
    this.setOrAdd_(a, b, !1)
};
goog.structs.Trie.prototype.add = function(a, b) {
    this.setOrAdd_(a, b, !0)
};
goog.structs.Trie.prototype.setOrAdd_ = function(a, b, c) {
    for (var d = this, e = 0; e < a.length; e++) {
        var f = a.charAt(e);
        d.childNodes_[f] || (d.childNodes_[f] = new goog.structs.Trie);
        d = d.childNodes_[f]
    }
    if (c && void 0 !== d.value_) throw Error('The collection already contains the key "' + a + '"');
    d.value_ = b
};
goog.structs.Trie.prototype.setAll = function(a) {
    var b = goog.structs.getKeys(a);
    a = goog.structs.getValues(a);
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog.structs.Trie.prototype.getChildNode_ = function(a) {
    for (var b = this, c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            b = b.childNodes_[d];
        if (!b) return
    }
    return b
};
goog.structs.Trie.prototype.get = function(a) {
    return (a = this.getChildNode_(a)) ? a.value_ : void 0
};
goog.structs.Trie.prototype.getKeyAndPrefixes = function(a, b) {
    var c = this,
        d = {},
        e = b || 0;
    void 0 !== c.value_ && (d[e] = c.value_);
    for (; e < a.length; e++) {
        var f = a.charAt(e);
        if (!(f in c.childNodes_)) break;
        c = c.childNodes_[f];
        void 0 !== c.value_ && (d[e] = c.value_)
    }
    return d
};
goog.structs.Trie.prototype.getValues = function() {
    var a = [];
    this.getValuesInternal_(a);
    return a
};
goog.structs.Trie.prototype.getValuesInternal_ = function(a) {
    void 0 !== this.value_ && a.push(this.value_);
    for (var b in this.childNodes_) this.childNodes_[b].getValuesInternal_(a)
};
goog.structs.Trie.prototype.getKeys = function(a) {
    var b = [];
    if (a) {
        for (var c = this, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if (!c.childNodes_[e]) return [];
            c = c.childNodes_[e]
        }
        c.getKeysInternal_(a, b)
    } else this.getKeysInternal_("", b);
    return b
};
goog.structs.Trie.prototype.getKeysInternal_ = function(a, b) {
    void 0 !== this.value_ && b.push(a);
    for (var c in this.childNodes_) this.childNodes_[c].getKeysInternal_(a + c, b)
};
goog.structs.Trie.prototype.containsKey = function(a) {
    return void 0 !== this.get(a)
};
goog.structs.Trie.prototype.containsPrefix = function(a) {
    return 0 == a.length ? !this.isEmpty() : !!this.getChildNode_(a)
};
goog.structs.Trie.prototype.containsValue = function(a) {
    if (this.value_ === a) return !0;
    for (var b in this.childNodes_)
        if (this.childNodes_[b].containsValue(a)) return !0;
    return !1
};
goog.structs.Trie.prototype.clear = function() {
    this.childNodes_ = {};
    this.value_ = void 0
};
goog.structs.Trie.prototype.remove = function(a) {
    for (var b = this, c = [], d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        if (!b.childNodes_[e]) throw Error('The collection does not have the key "' + a + '"');
        c.push([b, e]);
        b = b.childNodes_[e]
    }
    a = b.value_;
    for (delete b.value_; 0 < c.length;)
        if (e = c.pop(), b = e[0], e = e[1], b.childNodes_[e].isEmpty()) delete b.childNodes_[e];
        else break;
    return a
};
goog.structs.Trie.prototype.clone = function() {
    return new goog.structs.Trie(this)
};
goog.structs.Trie.prototype.getCount = function() {
    return goog.structs.getCount(this.getValues())
};
goog.structs.Trie.prototype.isEmpty = function() {
    return void 0 === this.value_ && goog.object.isEmpty(this.childNodes_)
};
goog.ui.tree.TypeAhead = function() {
    this.nodeMap_ = new goog.structs.Trie;
    this.buffer_ = "";
    this.matchingNodes_ = this.matchingLabels_ = null;
    this.matchingNodeIndex_ = this.matchingLabelIndex_ = 0
};
goog.ui.tree.TypeAhead.Offset = {
    DOWN: 1,
    UP: -1
};
goog.ui.tree.TypeAhead.prototype.handleNavigation = function(a) {
    var b = !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.UP:
            a.ctrlKey && (this.jumpTo_(a.keyCode == goog.events.KeyCodes.DOWN ? goog.ui.tree.TypeAhead.Offset.DOWN : goog.ui.tree.TypeAhead.Offset.UP), b = !0);
            break;
        case goog.events.KeyCodes.BACKSPACE:
            a = this.buffer_.length - 1;
            b = !0;
            0 < a ? (this.buffer_ = this.buffer_.substring(0, a), this.jumpToLabel_(this.buffer_)) : 0 == a ? this.buffer_ = "" : b = !1;
            break;
        case goog.events.KeyCodes.ESC:
            this.buffer_ =
                "", b = !0
    }
    return b
};
goog.ui.tree.TypeAhead.prototype.handleTypeAheadChar = function(a) {
    var b = !1;
    a.ctrlKey || a.altKey || (a = String.fromCharCode(a.charCode || a.keyCode).toLowerCase(), goog.string.isUnicodeChar(a) && (" " != a || this.buffer_) && (this.buffer_ += a, b = this.jumpToLabel_(this.buffer_)));
    return b
};
goog.ui.tree.TypeAhead.prototype.setNodeInMap = function(a) {
    var b = a.getText();
    if (b && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(b))) {
        var b = b.toLowerCase(),
            c = this.nodeMap_.get(b);
        c ? c.push(a) : this.nodeMap_.set(b, [a])
    }
};
goog.ui.tree.TypeAhead.prototype.removeNodeFromMap = function(a) {
    var b = a.getText();
    if (b && !goog.string.isEmptyOrWhitespace(goog.string.makeSafe(b))) {
        var b = b.toLowerCase(),
            c = this.nodeMap_.get(b);
        c && (goog.array.remove(c, a), c.length && this.nodeMap_.remove(b))
    }
};
goog.ui.tree.TypeAhead.prototype.jumpToLabel_ = function(a) {
    var b = !1;
    (a = this.nodeMap_.getKeys(a)) && a.length && (this.matchingLabelIndex_ = this.matchingNodeIndex_ = 0, b = this.nodeMap_.get(a[0]), b = this.selectMatchingNode_(b)) && (this.matchingLabels_ = a);
    return b
};
goog.ui.tree.TypeAhead.prototype.jumpTo_ = function(a) {
    var b = !1,
        c = this.matchingLabels_;
    if (c) {
        var b = null,
            d = !1;
        if (this.matchingNodes_) {
            var e = this.matchingNodeIndex_ + a;
            0 <= e && e < this.matchingNodes_.length ? (this.matchingNodeIndex_ = e, b = this.matchingNodes_) : d = !0
        }
        b || (e = this.matchingLabelIndex_ + a, 0 <= e && e < c.length && (this.matchingLabelIndex_ = e), c.length > this.matchingLabelIndex_ && (b = this.nodeMap_.get(c[this.matchingLabelIndex_])), b && b.length && d && (this.matchingNodeIndex_ = a == goog.ui.tree.TypeAhead.Offset.UP ? b.length -
            1 : 0));
        if (b = this.selectMatchingNode_(b)) this.matchingLabels_ = c
    }
    return b
};
goog.ui.tree.TypeAhead.prototype.selectMatchingNode_ = function(a) {
    var b;
    a && (this.matchingNodeIndex_ < a.length && (b = a[this.matchingNodeIndex_], this.matchingNodes_ = a), b && (b.reveal(), b.select()));
    return !!b
};
goog.ui.tree.TypeAhead.prototype.clear = function() {
    this.buffer_ = ""
};
goog.ui.tree.TreeControl = function(a, b, c) {
    goog.ui.tree.BaseNode.call(this, a, b, c);
    this.setExpandedInternal(!0);
    this.setSelectedInternal(!0);
    this.selectedItem_ = this;
    this.typeAhead_ = new goog.ui.tree.TypeAhead;
    this.focusHandler_ = this.keyHandler_ = null;
    this.logger_ = goog.log.getLogger("this");
    this.focused_ = !1;
    this.focusedNode_ = null;
    this.showRootLines_ = this.showRootNode_ = this.showExpandIcons_ = this.showLines_ = !0;
    if (goog.userAgent.IE) try {
        document.execCommand("BackgroundImageCache", !1, !0)
    } catch (d) {
        goog.log.warning(this.logger_,
            "Failed to enable background image cache")
    }
};
goog.inherits(goog.ui.tree.TreeControl, goog.ui.tree.BaseNode);
goog.ui.tree.TreeControl.prototype.getTree = function() {
    return this
};
goog.ui.tree.TreeControl.prototype.getDepth = function() {
    return 0
};
goog.ui.tree.TreeControl.prototype.reveal = function() {};
goog.ui.tree.TreeControl.prototype.handleFocus_ = function(a) {
    this.focused_ = !0;
    goog.dom.classlist.add(goog.asserts.assert(this.getElement()), "focused");
    this.selectedItem_ && this.selectedItem_.select()
};
goog.ui.tree.TreeControl.prototype.handleBlur_ = function(a) {
    this.focused_ = !1;
    goog.dom.classlist.remove(goog.asserts.assert(this.getElement()), "focused")
};
goog.ui.tree.TreeControl.prototype.hasFocus = function() {
    return this.focused_
};
goog.ui.tree.TreeControl.prototype.getExpanded = function() {
    return !this.showRootNode_ || goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)
};
goog.ui.tree.TreeControl.prototype.setExpanded = function(a) {
    this.showRootNode_ ? goog.ui.tree.TreeControl.superClass_.setExpanded.call(this, a) : this.setExpandedInternal(a)
};
goog.ui.tree.TreeControl.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.EMPTY
};
goog.ui.tree.TreeControl.prototype.getIconElement = function() {
    var a = this.getRowElement();
    return a ? a.firstChild : null
};
goog.ui.tree.TreeControl.prototype.getExpandIconElement = function() {
    return null
};
goog.ui.tree.TreeControl.prototype.updateExpandIcon = function() {};
goog.ui.tree.TreeControl.prototype.getRowClassName = function() {
    return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this) + (this.showRootNode_ ? "" : " " + this.getConfig().cssHideRoot)
};
goog.ui.tree.TreeControl.prototype.getCalculatedIconClass = function() {
    var a = this.getExpanded(),
        b = this.getExpandedIconClass();
    if (a && b) return b;
    b = this.getIconClass();
    if (!a && b) return b;
    b = this.getConfig();
    return a && b.cssExpandedRootIcon ? b.cssTreeIcon + " " + b.cssExpandedRootIcon : !a && b.cssCollapsedRootIcon ? b.cssTreeIcon + " " + b.cssCollapsedRootIcon : ""
};
goog.ui.tree.TreeControl.prototype.setSelectedItem = function(a) {
    if (this.selectedItem_ != a) {
        var b = !1;
        this.selectedItem_ && (b = this.selectedItem_ == this.focusedNode_, this.selectedItem_.setSelectedInternal(!1));
        if (this.selectedItem_ = a) a.setSelectedInternal(!0), b && a.select();
        this.dispatchEvent(goog.events.EventType.CHANGE)
    }
};
goog.ui.tree.TreeControl.prototype.getSelectedItem = function() {
    return this.selectedItem_
};
goog.ui.tree.TreeControl.prototype.setShowLines = function(a) {
    this.showLines_ != a && (this.showLines_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowLines = function() {
    return this.showLines_
};
goog.ui.tree.TreeControl.prototype.updateLinesAndExpandIcons_ = function() {
    function a(e) {
        var f = e.getChildrenElement();
        if (f) {
            var g = !c || b == e.getParent() && !d ? e.getConfig().cssChildrenNoLines : e.getConfig().cssChildren;
            f.className = g;
            if (f = e.getExpandIconElement()) f.className = e.getExpandIconClass()
        }
        e.forEachChild(a)
    }
    var b = this,
        c = b.getShowLines(),
        d = b.getShowRootLines();
    a(this)
};
goog.ui.tree.TreeControl.prototype.setShowRootLines = function(a) {
    this.showRootLines_ != a && (this.showRootLines_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowRootLines = function() {
    return this.showRootLines_
};
goog.ui.tree.TreeControl.prototype.setShowExpandIcons = function(a) {
    this.showExpandIcons_ != a && (this.showExpandIcons_ = a, this.isInDocument() && this.updateLinesAndExpandIcons_())
};
goog.ui.tree.TreeControl.prototype.getShowExpandIcons = function() {
    return this.showExpandIcons_
};
goog.ui.tree.TreeControl.prototype.setShowRootNode = function(a) {
    if (this.showRootNode_ != a) {
        this.showRootNode_ = a;
        if (this.isInDocument()) {
            var b = this.getRowElement();
            b && (b.className = this.getRowClassName())
        }!a && this.getSelectedItem() == this && this.getFirstChild() && this.setSelectedItem(this.getFirstChild())
    }
};
goog.ui.tree.TreeControl.prototype.getShowRootNode = function() {
    return this.showRootNode_
};
goog.ui.tree.TreeControl.prototype.initAccessibility = function() {
    goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);
    var a = this.getElement();
    goog.asserts.assert(a, "The DOM element for the tree cannot be null.");
    goog.a11y.aria.setRole(a, "tree");
    goog.a11y.aria.setState(a, "labelledby", this.getLabelElement().id)
};
goog.ui.tree.TreeControl.prototype.enterDocument = function() {
    goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);
    var a = this.getElement();
    a.className = this.getConfig().cssRoot;
    a.setAttribute("hideFocus", "true");
    this.attachEvents_();
    this.initAccessibility()
};
goog.ui.tree.TreeControl.prototype.exitDocument = function() {
    goog.ui.tree.TreeControl.superClass_.exitDocument.call(this);
    this.detachEvents_()
};
goog.ui.tree.TreeControl.prototype.attachEvents_ = function() {
    var a = this.getElement();
    a.tabIndex = 0;
    var b = this.keyHandler_ = new goog.events.KeyHandler(a),
        c = this.focusHandler_ = new goog.events.FocusHandler(a);
    this.getHandler().listen(c, goog.events.FocusHandler.EventType.FOCUSOUT, this.handleBlur_).listen(c, goog.events.FocusHandler.EventType.FOCUSIN, this.handleFocus_).listen(b, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseEvent_).listen(a,
        goog.events.EventType.CLICK, this.handleMouseEvent_).listen(a, goog.events.EventType.DBLCLICK, this.handleMouseEvent_)
};
goog.ui.tree.TreeControl.prototype.detachEvents_ = function() {
    this.keyHandler_.dispose();
    this.keyHandler_ = null;
    this.focusHandler_.dispose();
    this.focusHandler_ = null
};
goog.ui.tree.TreeControl.prototype.handleMouseEvent_ = function(a) {
    goog.log.fine(this.logger_, "Received event " + a.type);
    var b = this.getNodeFromEvent_(a);
    if (b) switch (a.type) {
        case goog.events.EventType.MOUSEDOWN:
            b.onMouseDown(a);
            break;
        case goog.events.EventType.CLICK:
            b.onClick_(a);
            break;
        case goog.events.EventType.DBLCLICK:
            b.onDoubleClick_(a)
    }
};
goog.ui.tree.TreeControl.prototype.handleKeyEvent = function(a) {
    var b = !1;
    (b = this.typeAhead_.handleNavigation(a) || this.selectedItem_ && this.selectedItem_.onKeyDown(a) || this.typeAhead_.handleTypeAheadChar(a)) && a.preventDefault();
    return b
};
goog.ui.tree.TreeControl.prototype.getNodeFromEvent_ = function(a) {
    var b = null;
    for (a = a.target; null != a;) {
        if (b = goog.ui.tree.BaseNode.allNodes[a.id]) return b;
        if (a == this.getElement()) break;
        a = a.parentNode
    }
    return null
};
goog.ui.tree.TreeControl.prototype.createNode = function(a) {
    return new goog.ui.tree.TreeNode(a || goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
};
goog.ui.tree.TreeControl.prototype.setNode = function(a) {
    this.typeAhead_.setNodeInMap(a)
};
goog.ui.tree.TreeControl.prototype.removeNode = function(a) {
    this.typeAhead_.removeNodeFromMap(a)
};
goog.ui.tree.TreeControl.prototype.clearTypeAhead = function() {
    this.typeAhead_.clear()
};
goog.ui.tree.TreeControl.defaultConfig = goog.ui.tree.BaseNode.defaultConfig;
goog.cssom = {};
goog.cssom.CssRuleType = {
    STYLE: 1,
    IMPORT: 3,
    MEDIA: 4,
    FONT_FACE: 5,
    PAGE: 6,
    NAMESPACE: 7
};
goog.cssom.getAllCssText = function(a) {
    return goog.cssom.getAllCss_(a || document.styleSheets, !0)
};
goog.cssom.getAllCssStyleRules = function(a) {
    return goog.cssom.getAllCss_(a || document.styleSheets, !1)
};
goog.cssom.getCssRulesFromStyleSheet = function(a) {
    var b = null;
    try {
        b = a.cssRules || a.rules
    } catch (c) {
        if (15 == c.code) throw c.styleSheet = a, c;
    }
    return b
};
goog.cssom.getAllCssStyleSheets = function(a, b) {
    var c = [],
        d = a || document.styleSheets,
        e = goog.isDef(b) ? b : !1;
    if (d.imports && d.imports.length)
        for (var f = 0, g = d.imports.length; f < g; f++) goog.array.extend(c, goog.cssom.getAllCssStyleSheets(d.imports[f]));
    else if (d.length)
        for (f = 0, g = d.length; f < g; f++) goog.array.extend(c, goog.cssom.getAllCssStyleSheets(d[f]));
    else {
        var h = goog.cssom.getCssRulesFromStyleSheet(d);
        if (h && h.length)
            for (var f = 0, g = h.length, k; f < g; f++) k = h[f], k.styleSheet && goog.array.extend(c, goog.cssom.getAllCssStyleSheets(k.styleSheet))
    }!(d.type ||
        d.rules || d.cssRules) || d.disabled && !e || c.push(d);
    return c
};
goog.cssom.getCssTextFromCssRule = function(a) {
    var b = "";
    a.cssText ? b = a.cssText : a.style && a.style.cssText && a.selectorText && (b = a.style.cssText.replace(/\s*-closure-parent-stylesheet:\s*\[object\];?\s*/gi, "").replace(/\s*-closure-rule-index:\s*[\d]+;?\s*/gi, ""), b = a.selectorText + " { " + b + " }");
    return b
};
goog.cssom.getCssRuleIndexInParentStyleSheet = function(a, b) {
    if (a.style && a.style["-closure-rule-index"]) return a.style["-closure-rule-index"];
    var c = b || goog.cssom.getParentStyleSheet(a);
    if (!c) throw Error("Cannot find a parentStyleSheet.");
    if ((c = goog.cssom.getCssRulesFromStyleSheet(c)) && c.length)
        for (var d = 0, e = c.length, f; d < e; d++)
            if (f = c[d], f == a) return d;
    return -1
};
goog.cssom.getParentStyleSheet = function(a) {
    return a.parentStyleSheet || a.style && a.style["-closure-parent-stylesheet"]
};
goog.cssom.replaceCssRule = function(a, b, c, d) {
    if (c = c || goog.cssom.getParentStyleSheet(a))
        if (a = 0 <= +d ? d : goog.cssom.getCssRuleIndexInParentStyleSheet(a, c), 0 <= a) goog.cssom.removeCssRule(c, a), goog.cssom.addCssRule(c, b, a);
        else throw Error("Cannot proceed without the index of the cssRule.");
    else throw Error("Cannot proceed without the parentStyleSheet.");
};
goog.cssom.addCssRule = function(a, b, c) {
    if (void 0 == c || 0 > c) c = goog.cssom.getCssRulesFromStyleSheet(a).length;
    if (a.insertRule) a.insertRule(b, c);
    else if (b = /^([^\{]+)\{([^\{]+)\}/.exec(b), 3 == b.length) a.addRule(b[1], b[2], c);
    else throw Error("Your CSSRule appears to be ill-formatted.");
};
goog.cssom.removeCssRule = function(a, b) {
    a.deleteRule ? a.deleteRule(b) : a.removeRule(b)
};
goog.cssom.addCssText = function(a, b) {
    var c = b ? b.getDocument() : goog.dom.getDocument(),
        d = c.createElement(goog.dom.TagName.STYLE);
    d.type = "text/css";
    c.getElementsByTagName(goog.dom.TagName.HEAD)[0].appendChild(d);
    d.styleSheet ? d.styleSheet.cssText = a : (c = c.createTextNode(a), d.appendChild(c));
    return d
};
goog.cssom.getFileNameFromStyleSheet = function(a) {
    return (a = a.href) ? /([^\/\?]+)[^\/]*$/.exec(a)[1] : null
};
goog.cssom.getAllCss_ = function(a, b) {
    for (var c = [], d = goog.cssom.getAllCssStyleSheets(a), e = 0; a = d[e]; e++) {
        var f = goog.cssom.getCssRulesFromStyleSheet(a);
        if (f && f.length)
            for (var g = 0, h = 0, k = f.length, l; h < k; h++) l = f[h], b && !l.href ? (l = goog.cssom.getCssTextFromCssRule(l), c.push(l)) : l.href || (l.style && (l.parentStyleSheet || (l.style["-closure-parent-stylesheet"] = a), l.style["-closure-rule-index"] = b ? void 0 : g), c.push(l)), b || g++
    }
    return b ? c.join(" ") : c
};
// Copyright 2012 Google Inc.  Apache License 2.0
var Blockly = {
    BlockSvg: function(a) {
        this.block_ = a;
        this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
        this.svgPathDark_ = Blockly.createSvgElement("path", {
            "class": "blocklyPathDark",
            transform: "translate(1, 1)"
        }, this.svgGroup_);
        this.svgPath_ = Blockly.createSvgElement("path", {
            "class": "blocklyPath"
        }, this.svgGroup_);
        this.svgPathLight_ = Blockly.createSvgElement("path", {
            "class": "blocklyPathLight"
        }, this.svgGroup_);
        this.svgPath_.tooltip = this.block_;
        Blockly.Tooltip.bindMouseEvents(this.svgPath_);
        this.updateMovable()
    }
};
Blockly.BlockSvg.prototype.height = 0;
Blockly.BlockSvg.prototype.width = 0;
Blockly.BlockSvg.INLINE = -1;
Blockly.BlockSvg.prototype.init = function() {
    var a = this.block_;
    this.updateColour();
    for (var b = 0, c; c = a.inputList[b]; b++) c.init();
    a.mutator && a.mutator.createIcon()
};
Blockly.BlockSvg.prototype.updateMovable = function() {
    this.block_.isMovable() ? Blockly.addClass_(this.svgGroup_, "blocklyDraggable") : Blockly.removeClass_(this.svgGroup_, "blocklyDraggable")
};
Blockly.BlockSvg.prototype.getRootElement = function() {
    return this.svgGroup_
};
Blockly.BlockSvg.SEP_SPACE_X = 10; //margen en eje x
Blockly.BlockSvg.SEP_SPACE_Y = 10; //margen en eje y
Blockly.BlockSvg.INLINE_PADDING_Y = 5; //margen en eje y
Blockly.BlockSvg.MIN_BLOCK_Y = 25; //alto minimo de bloques 
Blockly.BlockSvg.TAB_HEIGHT = 20;
Blockly.BlockSvg.TAB_WIDTH = 8; //largo de la union sensores
Blockly.BlockSvg.NOTCH_WIDTH = 30; //30 distancia de la muesca
Blockly.BlockSvg.CORNER_RADIUS = 8; //8 radio esquina
Blockly.BlockSvg.FIELD_HEIGHT = 18; //alto del espacio para bloque
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS - .5) + .5;
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS + .5) - .5;
Blockly.BlockSvg.NOTCH_PATH_LEFT = "l 6,4 3,0 6,-4";
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = "l 6,4 3,0 6,-4";
Blockly.BlockSvg.NOTCH_PATH_RIGHT = "l -6,4 -3,0 -6,-4";
Blockly.BlockSvg.JAGGED_TEETH = "l 8,0 0,4 8,4 -16,8 8,4";
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15;
Blockly.BlockSvg.TAB_PATH_DOWN = "v 5 c 0,10 -" + Blockly.BlockSvg.TAB_WIDTH + ",-8 -" + Blockly.BlockSvg.TAB_WIDTH + ",7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",-2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",7.5";
Blockly.BlockSvg.TOP_LEFT_CORNER_START = "m 0," + Blockly.BlockSvg.CORNER_RADIUS;
//Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR = "m 0.5," + (Blockly.BlockSvg.CORNER_RADIUS - .5);
Blockly.BlockSvg.TOP_LEFT_CORNER = "A " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0";
//Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT = "A " + (Blockly.BlockSvg.CORNER_RADIUS - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - .5) + " 0 0,1 " + Blockly.BlockSvg.CORNER_RADIUS + ",0.5";
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER = Blockly.BlockSvg.NOTCH_PATH_RIGHT + " h -" + (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) + " a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 -" + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL = "a " + Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,0 " + (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR = "a " + (Blockly.BlockSvg.CORNER_RADIUS + .5) + "," + (Blockly.BlockSvg.CORNER_RADIUS + .5) + " 0 0,0 " + (Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + "," + (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + .5);
Blockly.BlockSvg.prototype.dispose = function() {
    goog.dom.removeNode(this.svgGroup_);
    this.block_ = this.svgPathDark_ = this.svgPathLight_ = this.svgPath_ = this.svgGroup_ = null
};
Blockly.BlockSvg.prototype.disposeUiEffect = function() {
    Blockly.playAudio("delete");
    var a = Blockly.getSvgXY_(this.svgGroup_),
        b = this.svgGroup_.cloneNode(!0);
    b.translateX_ = a.x;
    b.translateY_ = a.y;
    b.setAttribute("transform", "translate(" + b.translateX_ + "," + b.translateY_ + ")");
    Blockly.svg.appendChild(b);
    b.bBox_ = b.getBBox();
    b.startDate_ = new Date;
    Blockly.BlockSvg.disposeUiStep_(b)
};
Blockly.BlockSvg.disposeUiStep_ = function(a) {
    var b = (new Date - a.startDate_) / 150;
    1 < b ? goog.dom.removeNode(a) : (a.setAttribute("transform", "translate(" + (a.translateX_ + (Blockly.RTL ? -1 : 1) * a.bBox_.width / 2 * b + ", " + (a.translateY_ + a.bBox_.height * b)) + ") scale(" + (1 - b) + ")"), window.setTimeout(function() {
        Blockly.BlockSvg.disposeUiStep_(a)
    }, 10))
};
Blockly.BlockSvg.prototype.connectionUiEffect = function() {
    Blockly.playAudio("click");
    var a = Blockly.getSvgXY_(this.svgGroup_);
    this.block_.outputConnection ? (a.x += Blockly.RTL ? 3 : -3, a.y += 13) : this.block_.previousConnection && (a.x += Blockly.RTL ? -23 : 23, a.y += 3);
    a = Blockly.createSvgElement("circle", {
        cx: a.x,
        cy: a.y,
        r: 0,
        fill: "none",
        stroke: "#888",
        "stroke-width": 10
    }, Blockly.svg);
    a.startDate_ = new Date;
    Blockly.BlockSvg.connectionUiStep_(a)
};
Blockly.BlockSvg.connectionUiStep_ = function(a) {
    var b = (new Date - a.startDate_) / 150;
    1 < b ? goog.dom.removeNode(a) : (a.setAttribute("r", 25 * b), a.style.opacity = 1 - b, window.setTimeout(function() {
        Blockly.BlockSvg.connectionUiStep_(a)
    }, 10))
};
Blockly.BlockSvg.prototype.updateColour = function() {
    if (!this.block_.disabled) {
        var a = this.block_.getColour(),
            b = goog.color.hexToRgb(a),
            c = goog.color.lighten(b, .3),
            b = goog.color.darken(b, .4);
        this.svgPathLight_.setAttribute("stroke", goog.color.rgbArrayToHex(c));
        this.svgPathDark_.setAttribute("fill", goog.color.rgbArrayToHex(b));
        this.svgPath_.setAttribute("fill", a)
    }
};
Blockly.BlockSvg.prototype.updateDisabled = function() {
    this.block_.disabled || this.block_.getInheritedDisabled() ? (Blockly.addClass_(this.svgGroup_, "blocklyDisabled"), this.svgPath_.setAttribute("fill", "url(#blocklyDisabledPattern)")) : (Blockly.removeClass_(this.svgGroup_, "blocklyDisabled"), this.updateColour());
    for (var a = this.block_.getChildren(), b = 0, c; c = a[b]; b++) c.svg_.updateDisabled()
};
Blockly.BlockSvg.prototype.addSelect = function() {
    Blockly.addClass_(this.svgGroup_, "blocklySelected");
    this.svgGroup_.parentNode.appendChild(this.svgGroup_)
};
Blockly.BlockSvg.prototype.removeSelect = function() {
    Blockly.removeClass_(this.svgGroup_, "blocklySelected")
};
Blockly.BlockSvg.prototype.addDragging = function() {
    Blockly.addClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.removeDragging = function() {
    Blockly.removeClass_(this.svgGroup_, "blocklyDragging")
};
Blockly.BlockSvg.prototype.render = function() {
    this.block_.rendered = !0;
    var a = Blockly.BlockSvg.SEP_SPACE_X;
    Blockly.RTL && (a = -a);
    for (var b = this.block_.getIcons(), c = 0; c < b.length; c++) a = b[c].renderIcon(a);
    a += Blockly.RTL ? Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
    b = this.renderCompute_(a);
    this.renderDraw_(a, b);
    (a = this.block_.getParent()) ? a.render(): Blockly.fireUiEvent(window, "resize")
};
Blockly.BlockSvg.prototype.renderFields_ = function(a, b, c) {
    Blockly.RTL && (b = -b);
    for (var d = 0, e; e = a[d]; d++) Blockly.RTL ? (b -= e.renderSep + e.renderWidth, e.getRootElement().setAttribute("transform", "translate(" + b + ", " + c + ")"), e.renderWidth && (b -= Blockly.BlockSvg.SEP_SPACE_X)) : (e.getRootElement().setAttribute("transform", "translate(" + (b + e.renderSep) + ", " + c + ")"), e.renderWidth && (b += e.renderSep + e.renderWidth + Blockly.BlockSvg.SEP_SPACE_X));
    return Blockly.RTL ? -b : b
};
Blockly.BlockSvg.prototype.renderCompute_ = function(a) {
    var b = this.block_.inputList,
        c = [];
    c.rightEdge = a + 2 * Blockly.BlockSvg.SEP_SPACE_X;
    if (this.block_.previousConnection || this.block_.nextConnection) c.rightEdge = Math.max(c.rightEdge, Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
    for (var d = 0, e = 0, f = !1, g = !1, h = !1, k = void 0, l = this.block_.inputsInline && !this.block_.isCollapsed(), p = 0, m; m = b[p]; p++)
        if (m.isVisible()) {
            var q;
            l && k && k != Blockly.NEXT_STATEMENT && m.type != Blockly.NEXT_STATEMENT ? q = c[c.length - 1] :
                (k = m.type, q = [], q.type = l && m.type != Blockly.NEXT_STATEMENT ? Blockly.BlockSvg.INLINE : m.type, q.height = 0, c.push(q));
            q.push(m);
            m.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
            m.renderWidth = l && m.type == Blockly.INPUT_VALUE ? Blockly.BlockSvg.TAB_WIDTH + 1.25 * Blockly.BlockSvg.SEP_SPACE_X : 0;
            if (m.connection && m.connection.targetConnection) {
                var n = m.connection.targetBlock().getHeightWidth();
                m.renderHeight = Math.max(m.renderHeight, n.height);
                m.renderWidth = Math.max(m.renderWidth, n.width)
            }
            p == b.length - 1 && m.renderHeight--;
            q.height =
                Math.max(q.height, m.renderHeight);
            m.fieldWidth = 0;
            1 == c.length && (m.fieldWidth += Blockly.RTL ? -a : a);
            for (var n = !1, r = 0, t; t = m.fieldRow[r]; r++) {
                0 != r && (m.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X);
                var u = t.getSize();
                t.renderWidth = u.width;
                t.renderSep = n && t.EDITABLE ? Blockly.BlockSvg.SEP_SPACE_X : 0;
                m.fieldWidth += t.renderWidth + t.renderSep;
                q.height = Math.max(q.height, u.height);
                n = t.EDITABLE
            }
            q.type != Blockly.BlockSvg.INLINE && (q.type == Blockly.NEXT_STATEMENT ? (g = !0, e = Math.max(e, m.fieldWidth)) : (q.type == Blockly.INPUT_VALUE ?
                f = !0 : q.type == Blockly.DUMMY_INPUT && (h = !0), d = Math.max(d, m.fieldWidth)))
        }
    for (a = 0; q = c[a]; a++)
        if (q.thicker = !1, q.type == Blockly.BlockSvg.INLINE)
            for (b = 0; m = q[b]; b++)
                if (m.type == Blockly.INPUT_VALUE) {
                    q.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
                    q.thicker = !0;
                    break
                }
    c.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + e;
    g && (c.rightEdge = Math.max(c.rightEdge, c.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH));
    f ? c.rightEdge = Math.max(c.rightEdge, d + 2 * Blockly.BlockSvg.SEP_SPACE_X + Blockly.BlockSvg.TAB_WIDTH) : h && (c.rightEdge = Math.max(c.rightEdge,
        d + 2 * Blockly.BlockSvg.SEP_SPACE_X));
    c.hasValue = f;
    c.hasStatement = g;
    c.hasDummy = h;
    return c
};
Blockly.BlockSvg.prototype.renderDraw_ = function(a, b) {
    if (this.block_.outputConnection) this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !0;
    else {
        this.squareBottomLeftCorner_ = this.squareTopLeftCorner_ = !1;
        if (this.block_.previousConnection) {
            var c = this.block_.previousConnection.targetBlock();
            c && c.getNextBlock() == this.block_ && (this.squareTopLeftCorner_ = !0)
        }
        this.block_.getNextBlock() && (this.squareBottomLeftCorner_ = !0)
    }
    var d = this.block_.getRelativeToSurfaceXY(),
        e = [],
        f = [],
        c = [],
        g = [];
    this.renderDrawTop_(e,
        c, d, b.rightEdge);
    var h = this.renderDrawRight_(e, c, f, g, d, b, a);
    this.renderDrawBottom_(e, c, d, h);
    this.renderDrawLeft_(e, c, d, h);
    d = e.join(" ") + "\n" + f.join(" ");
    this.svgPath_.setAttribute("d", d);
    this.svgPathDark_.setAttribute("d", d);
    d = c.join(" ") + "\n" + g.join(" ");
    this.svgPathLight_.setAttribute("d", d);
    Blockly.RTL && (this.svgPath_.setAttribute("transform", "scale(-1 1)"), this.svgPathLight_.setAttribute("transform", "scale(-1 1)"), this.svgPathDark_.setAttribute("transform", "translate(1,1) scale(-1 1)"))
};
Blockly.BlockSvg.prototype.renderDrawTop_ = function(a, b, c, d) {
    this.squareTopLeftCorner_ ? (a.push("m 0,0"), b.push("m 1,1")) : (a.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START), b.push(Blockly.RTL ? Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL : Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR), a.push(Blockly.BlockSvg.TOP_LEFT_CORNER), b.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT));
    this.block_.previousConnection && (a.push("H", Blockly.BlockSvg.NOTCH_WIDTH - 15), b.push("H", Blockly.BlockSvg.NOTCH_WIDTH -
        15), a.push(Blockly.BlockSvg.NOTCH_PATH_LEFT), b.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT), this.block_.previousConnection.moveTo(c.x + (Blockly.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH), c.y));
    a.push("H", d);
    b.push("H", d + (Blockly.RTL ? -1 : 0));
    this.width = d
};
Blockly.BlockSvg.prototype.renderDrawRight_ = function(a, b, c, d, e, f, g) {
    for (var h, k = 0, l, p, m = 0, q; q = f[m]; m++) {
        h = Blockly.BlockSvg.SEP_SPACE_X;
        0 == m && (h += Blockly.RTL ? -g : g);
        b.push("M", f.rightEdge - 1 + "," + (k + 1));
        if (this.block_.isCollapsed()) {
            var n = q[0];
            l = k + Blockly.BlockSvg.FIELD_HEIGHT;
            this.renderFields_(n.fieldRow, h, l);
            a.push(Blockly.BlockSvg.JAGGED_TEETH);
            Blockly.RTL ? b.push("l 8,0 0,3.8 7,3.2 m -14.5,9 l 8,4") : b.push("h 8");
            n = q.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
            a.push("v", n);
            Blockly.RTL && b.push("v",
                n - 2);
            this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH
        } else if (q.type == Blockly.BlockSvg.INLINE) {
            for (var r = 0; n = q[r]; r++) l = k + Blockly.BlockSvg.FIELD_HEIGHT, q.thicker && (l += Blockly.BlockSvg.INLINE_PADDING_Y), h = this.renderFields_(n.fieldRow, h, l), n.type != Blockly.DUMMY_INPUT && (h += n.renderWidth + Blockly.BlockSvg.SEP_SPACE_X), n.type == Blockly.INPUT_VALUE && (c.push("M", h - Blockly.BlockSvg.SEP_SPACE_X + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y)), c.push("h", Blockly.BlockSvg.TAB_WIDTH - 2 - n.renderWidth), c.push(Blockly.BlockSvg.TAB_PATH_DOWN),
                c.push("v", n.renderHeight + 1 - Blockly.BlockSvg.TAB_HEIGHT), c.push("h", n.renderWidth + 2 - Blockly.BlockSvg.TAB_WIDTH), c.push("z"), Blockly.RTL ? (d.push("M", h - Blockly.BlockSvg.SEP_SPACE_X - 3 + Blockly.BlockSvg.TAB_WIDTH - n.renderWidth + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y + 1)), d.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), d.push("v", n.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 3), d.push("h", n.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 1)) : (d.push("M", h - Blockly.BlockSvg.SEP_SPACE_X + 1 + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y +
                    1)), d.push("v", n.renderHeight + 1), d.push("h", Blockly.BlockSvg.TAB_WIDTH - 2 - n.renderWidth), d.push("M", h - n.renderWidth - Blockly.BlockSvg.SEP_SPACE_X + .8 + "," + (k + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.TAB_HEIGHT - .4)), d.push("l", .42 * Blockly.BlockSvg.TAB_WIDTH + ",-1.8")), l = Blockly.RTL ? e.x - h - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + n.renderWidth + 1 : e.x + h + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - n.renderWidth - 1, p = e.y + k + Blockly.BlockSvg.INLINE_PADDING_Y + 1, n.connection.moveTo(l,
                    p), n.connection.targetConnection && n.connection.tighten_());
            h = Math.max(h, f.rightEdge);
            this.width = Math.max(this.width, h);
            a.push("H", h);
            b.push("H", h + (Blockly.RTL ? -1 : 0));
            a.push("v", q.height);
            Blockly.RTL && b.push("v", q.height - 2)
        } else q.type == Blockly.INPUT_VALUE ? (n = q[0], l = k + Blockly.BlockSvg.FIELD_HEIGHT, n.align != Blockly.ALIGN_LEFT && (r = f.rightEdge - n.fieldWidth - Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X, n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += (r + h) / 2)), this.renderFields_(n.fieldRow,
            h, l), a.push(Blockly.BlockSvg.TAB_PATH_DOWN), r = q.height - Blockly.BlockSvg.TAB_HEIGHT, a.push("v", r), Blockly.RTL ? (b.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL), b.push("v", r)) : (b.push("M", f.rightEdge - 4.2 + "," + (k + Blockly.BlockSvg.TAB_HEIGHT - .4)), b.push("l", .42 * Blockly.BlockSvg.TAB_WIDTH + ",-1.8")), l = e.x + (Blockly.RTL ? -f.rightEdge - 1 : f.rightEdge + 1), p = e.y + k, n.connection.moveTo(l, p), n.connection.targetConnection && (n.connection.tighten_(), this.width = Math.max(this.width, f.rightEdge + n.connection.targetBlock().getHeightWidth().width -
            Blockly.BlockSvg.TAB_WIDTH + 1))) : q.type == Blockly.DUMMY_INPUT ? (n = q[0], l = k + Blockly.BlockSvg.FIELD_HEIGHT, n.align != Blockly.ALIGN_LEFT && (r = f.rightEdge - n.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, f.hasValue && (r -= Blockly.BlockSvg.TAB_WIDTH), n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += (r + h) / 2)), this.renderFields_(n.fieldRow, h, l), a.push("v", q.height), Blockly.RTL && b.push("v", q.height - 2)) : q.type == Blockly.NEXT_STATEMENT && (n = q[0], 0 == m && (a.push("v", Blockly.BlockSvg.SEP_SPACE_Y), Blockly.RTL &&
                b.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), k += Blockly.BlockSvg.SEP_SPACE_Y), l = k + Blockly.BlockSvg.FIELD_HEIGHT, n.align != Blockly.ALIGN_LEFT && (r = f.statementEdge - n.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X, n.align == Blockly.ALIGN_RIGHT ? h += r : n.align == Blockly.ALIGN_CENTRE && (h += (r + h) / 2)), this.renderFields_(n.fieldRow, h, l), h = f.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH, a.push("H", h), a.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER), a.push("v", q.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), a.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER),
            a.push("H", f.rightEdge), Blockly.RTL ? (b.push("M", h - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (k + Blockly.BlockSvg.DISTANCE_45_OUTSIDE)), b.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL), b.push("v", q.height - 2 * Blockly.BlockSvg.CORNER_RADIUS), b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL), b.push("H", f.rightEdge - 1)) : (b.push("M", h - Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.DISTANCE_45_OUTSIDE + "," + (k + q.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),
                b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR), b.push("H", f.rightEdge)), l = e.x + (Blockly.RTL ? -h : h), p = e.y + k + 1, n.connection.moveTo(l, p), n.connection.targetConnection && (n.connection.tighten_(), this.width = Math.max(this.width, f.statementEdge + n.connection.targetBlock().getHeightWidth().width)), m == f.length - 1 || f[m + 1].type == Blockly.NEXT_STATEMENT) && (a.push("v", Blockly.BlockSvg.SEP_SPACE_Y), Blockly.RTL && b.push("v", Blockly.BlockSvg.SEP_SPACE_Y - 1), k += Blockly.BlockSvg.SEP_SPACE_Y);
        k += q.height
    }
    f.length ||
        (k = Blockly.BlockSvg.MIN_BLOCK_Y, a.push("V", k), Blockly.RTL && b.push("V", k - 1));
    return k
};
Blockly.BlockSvg.prototype.renderDrawBottom_ = function(a, b, c, d) {
    this.height = d + 1;
    this.block_.nextConnection && (a.push("H", Blockly.BlockSvg.NOTCH_WIDTH + " " + Blockly.BlockSvg.NOTCH_PATH_RIGHT), this.block_.nextConnection.moveTo(Blockly.RTL ? c.x - Blockly.BlockSvg.NOTCH_WIDTH : c.x + Blockly.BlockSvg.NOTCH_WIDTH, c.y + d + 1), this.block_.nextConnection.targetConnection && this.block_.nextConnection.tighten_(), this.height += 4);
    this.squareBottomLeftCorner_ ? (a.push("H 0"), Blockly.RTL || b.push("M", "1," + d)) : (a.push("H", Blockly.BlockSvg.CORNER_RADIUS),
        a.push("a", Blockly.BlockSvg.CORNER_RADIUS + "," + Blockly.BlockSvg.CORNER_RADIUS + " 0 0,1 -" + Blockly.BlockSvg.CORNER_RADIUS + ",-" + Blockly.BlockSvg.CORNER_RADIUS), Blockly.RTL || (b.push("M", Blockly.BlockSvg.DISTANCE_45_INSIDE + "," + (d - Blockly.BlockSvg.DISTANCE_45_INSIDE)), b.push("A", Blockly.BlockSvg.CORNER_RADIUS - 1 + "," + (Blockly.BlockSvg.CORNER_RADIUS - 1) + " 0 0,1 1," + (d - Blockly.BlockSvg.CORNER_RADIUS))))
};
Blockly.BlockSvg.prototype.renderDrawLeft_ = function(a, b, c, d) {
    this.block_.outputConnection ? (this.block_.outputConnection.moveTo(c.x, c.y), a.push("V", Blockly.BlockSvg.TAB_HEIGHT), a.push("c 0,-10 -" + Blockly.BlockSvg.TAB_WIDTH + ",8 -" + Blockly.BlockSvg.TAB_WIDTH + ",-7.5 s " + Blockly.BlockSvg.TAB_WIDTH + ",2.5 " + Blockly.BlockSvg.TAB_WIDTH + ",-7.5"), Blockly.RTL ? (b.push("M", -.3 * Blockly.BlockSvg.TAB_WIDTH + ",8.9"), b.push("l", -.45 * Blockly.BlockSvg.TAB_WIDTH + ",-2.1")) : (b.push("V", Blockly.BlockSvg.TAB_HEIGHT - 1), b.push("m", -.92 * Blockly.BlockSvg.TAB_WIDTH + ",-1 q " + -.19 * Blockly.BlockSvg.TAB_WIDTH + ",-5.5 0,-11"), b.push("m", .92 * Blockly.BlockSvg.TAB_WIDTH + ",1 V 1 H 2")), this.width += Blockly.BlockSvg.TAB_WIDTH) : Blockly.RTL || (this.squareTopLeftCorner_ ? b.push("V", 1) : b.push("V", Blockly.BlockSvg.CORNER_RADIUS));
    a.push("z")
};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.Blocks = {};
Blockly.Blocks.addTemplate = function(a) {
    goog.asserts.assert(a.blockName);
    goog.asserts.assert(Blockly.Blocks[a.blockName], "Blockly.Blocks already has a field named ", a.blockName);
    goog.asserts.assert(a.message);
    goog.asserts.assert(a.colour && "number" == typeof a.colour && 0 <= a.colour && 360 > a.colour, "details.colour must be a number from 0 to 360 (exclusive)");
    "undefined" != a.output && (goog.asserts.assert(!a.previousStatement, "When details.output is defined, details.previousStatement must not be true."), goog.asserts.assert(!a.nextStatement,
        "When details.output is defined, details.nextStatement must not be true."));
    var b = {
        init: function() {
            var b = this;
            this.setColour(a.colour);
            this.setHelpUrl(a.helpUrl);
            "string" == typeof a.tooltip ? this.setTooltip(a.tooltip) : "function" == typeof a.tooltip && this.setTooltip(function() {
                return a.tooltip(b)
            });
            "undefined" != a.output ? this.setOutput(!0, a.output) : (this.setPreviousStatement("undefined" == typeof a.previousStatement ? !0 : a.previousStatement), this.setNextStatement("undefined" == typeof a.nextStatement ? !0 : a.nextStatement));
            var d = [];
            d.push(a.text);
            a.args && a.args.forEach(function(a) {
                goog.asserts.assert(a.name);
                goog.asserts.assert("undefined" != a.check);
                "undefined" == a.type || a.type == Blockly.INPUT_VALUE ? d.push([a.name, a.check, "undefined" == typeof a.align ? Blockly.ALIGN_RIGHT : a.align]) : goog.asserts.fail("addTemplate() can only handle value inputs.")
            });
            d.push(Blockly.ALIGN_RIGHT);
            a.inline && this.setInlineInputs(a.inline);
            Blockly.Block.prototype.interpolateMsg.apply(this, d)
        }
    };
    b.mutationToDom = a.switchable ? function() {
        var b = a.mutationToDomFunc ?
            a.mutatationToDomFunc() : document.createElement("mutation");
        b.setAttribute("is_statement", this.isStatement || !1);
        return b
    } : a.mutationToDomFunc;
    Blockly.Blocks[a.blockName] = b
};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.ScrollbarPair = function(a) {
    this.workspace_ = a;
    this.oldHostMetrics_ = null;
    this.hScroll = new Blockly.Scrollbar(a, !0, !0);
    this.vScroll = new Blockly.Scrollbar(a, !1, !0);
    this.corner_ = Blockly.createSvgElement("rect", {
        height: Blockly.Scrollbar.scrollbarThickness,
        width: Blockly.Scrollbar.scrollbarThickness,
        style: "fill: #fff"
    }, null);
    Blockly.Scrollbar.insertAfter_(this.corner_, a.getBubbleCanvas())
};
Blockly.ScrollbarPair.prototype.dispose = function() {
    Blockly.unbindEvent_(this.onResizeWrapper_);
    this.onResizeWrapper_ = null;
    goog.dom.removeNode(this.corner_);
    this.oldHostMetrics_ = this.workspace_ = this.corner_ = null;
    this.hScroll.dispose();
    this.hScroll = null;
    this.vScroll.dispose();
    this.vScroll = null
};
Blockly.ScrollbarPair.prototype.resize = function() {
    var a = this.workspace_.getMetrics();
    if (a) {
        var b = !1,
            c = !1;
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft ? (this.oldHostMetrics_ && this.oldHostMetrics_.contentWidth == a.contentWidth && this.oldHostMetrics_.viewLeft == a.viewLeft && this.oldHostMetrics_.contentLeft == a.contentLeft || (b = !0), this.oldHostMetrics_ &&
            this.oldHostMetrics_.contentHeight == a.contentHeight && this.oldHostMetrics_.viewTop == a.viewTop && this.oldHostMetrics_.contentTop == a.contentTop || (c = !0)) : c = b = !0;
        b && this.hScroll.resize(a);
        c && this.vScroll.resize(a);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft || this.corner_.setAttribute("x", this.vScroll.xCoordinate);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop || this.corner_.setAttribute("y",
            this.hScroll.yCoordinate);
        this.oldHostMetrics_ = a
    }
};
Blockly.ScrollbarPair.prototype.set = function(a, b) {
    this.hScroll.set(a);
    this.vScroll.set(b)
};
Blockly.Scrollbar = function(a, b, c) {
    this.workspace_ = a;
    this.pair_ = c || !1;
    this.horizontal_ = b;
    this.createDom_();
    b ? (this.svgBackground_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("height", Blockly.Scrollbar.scrollbarThickness - 6), this.svgKnob_.setAttribute("y", 3)) : (this.svgBackground_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness), this.svgKnob_.setAttribute("width", Blockly.Scrollbar.scrollbarThickness - 6), this.svgKnob_.setAttribute("x", 3));
    this.onMouseDownBarWrapper_ =
        Blockly.bindEvent_(this.svgBackground_, "mousedown", this, this.onMouseDownBar_);
    this.onMouseDownKnobWrapper_ = Blockly.bindEvent_(this.svgKnob_, "mousedown", this, this.onMouseDownKnob_)
};
Blockly.Scrollbar.scrollbarThickness = 15;
Blockly.Scrollbar.prototype.dispose = function() {
    this.onMouseUpKnob_();
    this.onResizeWrapper_ && (Blockly.unbindEvent_(this.onResizeWrapper_), this.onResizeWrapper_ = null);
    Blockly.unbindEvent_(this.onMouseDownBarWrapper_);
    this.onMouseDownBarWrapper_ = null;
    Blockly.unbindEvent_(this.onMouseDownKnobWrapper_);
    this.onMouseDownKnobWrapper_ = null;
    goog.dom.removeNode(this.svgGroup_);
    this.workspace_ = this.svgKnob_ = this.svgBackground_ = this.svgGroup_ = null
};
Blockly.Scrollbar.prototype.resize = function(a) {
    if (!a && (a = this.workspace_.getMetrics(), !a)) return;
    if (this.horizontal_) {
        var b = a.viewWidth;
        this.pair_ ? b -= Blockly.Scrollbar.scrollbarThickness : this.setVisible(b < a.contentHeight);
        this.ratio_ = b / a.contentWidth;
        if (-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
        var c = a.viewWidth * this.ratio_,
            d = (a.viewLeft - a.contentLeft) * this.ratio_;
        this.svgKnob_.setAttribute("width", Math.max(0, c));
        this.xCoordinate = a.absoluteLeft;
        this.pair_ &&
            Blockly.RTL && (this.xCoordinate += a.absoluteLeft + Blockly.Scrollbar.scrollbarThickness);
        this.yCoordinate = a.absoluteTop + a.viewHeight - Blockly.Scrollbar.scrollbarThickness;
        this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + ", " + this.yCoordinate + ")");
        this.svgBackground_.setAttribute("width", Math.max(0, b));
        this.svgKnob_.setAttribute("x", this.constrainKnob_(d))
    } else {
        b = a.viewHeight;
        this.pair_ ? b -= Blockly.Scrollbar.scrollbarThickness : this.setVisible(b < a.contentHeight);
        this.ratio_ = b / a.contentHeight;
        if (-Infinity === this.ratio_ || Infinity === this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
        c = a.viewHeight * this.ratio_;
        d = (a.viewTop - a.contentTop) * this.ratio_;
        this.svgKnob_.setAttribute("height", Math.max(0, c));
        this.xCoordinate = a.absoluteLeft;
        Blockly.RTL || (this.xCoordinate += a.viewWidth - Blockly.Scrollbar.scrollbarThickness);
        this.yCoordinate = a.absoluteTop;
        this.svgGroup_.setAttribute("transform", "translate(" + this.xCoordinate + ", " + this.yCoordinate + ")");
        this.svgBackground_.setAttribute("height", Math.max(0, b));
        this.svgKnob_.setAttribute("y", this.constrainKnob_(d))
    }
    this.onScroll_()
};
Blockly.Scrollbar.prototype.createDom_ = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
    this.svgBackground_ = Blockly.createSvgElement("rect", {
        "class": "blocklyScrollbarBackground"
    }, this.svgGroup_);
    var a = Math.floor((Blockly.Scrollbar.scrollbarThickness - 6) / 2);
    this.svgKnob_ = Blockly.createSvgElement("rect", {
        "class": "blocklyScrollbarKnob",
        rx: a,
        ry: a
    }, this.svgGroup_);
    Blockly.Scrollbar.insertAfter_(this.svgGroup_, this.workspace_.getBubbleCanvas())
};
Blockly.Scrollbar.prototype.isVisible = function() {
    return "none" != this.svgGroup_.getAttribute("display")
};
Blockly.Scrollbar.prototype.setVisible = function(a) {
    if (a != this.isVisible()) {
        if (this.pair_) throw "Unable to toggle visibility of paired scrollbars.";
        a ? this.svgGroup_.setAttribute("display", "block") : (this.workspace_.setMetrics({
            x: 0,
            y: 0
        }), this.svgGroup_.setAttribute("display", "none"))
    }
};
Blockly.Scrollbar.prototype.onMouseDownBar_ = function(a) {
    this.onMouseUpKnob_();
    if (!Blockly.isRightButton(a)) {
        var b = Blockly.mouseToSvg(a),
            b = this.horizontal_ ? b.x : b.y,
            c = Blockly.getSvgXY_(this.svgKnob_),
            c = this.horizontal_ ? c.x : c.y,
            d = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "width" : "height")),
            e = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")),
            f = .95 * d;
        b <= c ? e -= f : b >= c + d && (e += f);
        this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", this.constrainKnob_(e));
        this.onScroll_()
    }
    a.stopPropagation()
};
Blockly.Scrollbar.prototype.onMouseDownKnob_ = function(a) {
    this.onMouseUpKnob_();
    Blockly.isRightButton(a) || (this.startDragKnob = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")), this.startDragMouse = this.horizontal_ ? a.clientX : a.clientY, Blockly.Scrollbar.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, this.onMouseUpKnob_), Blockly.Scrollbar.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMoveKnob_));
    a.stopPropagation()
};
Blockly.Scrollbar.prototype.onMouseMoveKnob_ = function(a) {
    this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", this.constrainKnob_(this.startDragKnob + ((this.horizontal_ ? a.clientX : a.clientY) - this.startDragMouse)));
    this.onScroll_()
};
Blockly.Scrollbar.prototype.onMouseUpKnob_ = function() {
    Blockly.removeAllRanges();
    Blockly.hideChaff(!0);
    Blockly.Scrollbar.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseUpWrapper_), Blockly.Scrollbar.onMouseUpWrapper_ = null);
    Blockly.Scrollbar.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseMoveWrapper_), Blockly.Scrollbar.onMouseMoveWrapper_ = null)
};
Blockly.Scrollbar.prototype.constrainKnob_ = function(a) {
    if (0 >= a || isNaN(a)) a = 0;
    else {
        var b = this.horizontal_ ? "width" : "height",
            c = parseFloat(this.svgBackground_.getAttribute(b)),
            b = parseFloat(this.svgKnob_.getAttribute(b));
        a = Math.min(a, c - b)
    }
    return a
};
Blockly.Scrollbar.prototype.onScroll_ = function() {
    var a = parseFloat(this.svgKnob_.getAttribute(this.horizontal_ ? "x" : "y")),
        b = parseFloat(this.svgBackground_.getAttribute(this.horizontal_ ? "width" : "height")),
        a = a / b;
    isNaN(a) && (a = 0);
    b = {};
    this.horizontal_ ? b.x = a : b.y = a;
    this.workspace_.setMetrics(b)
};
Blockly.Scrollbar.prototype.set = function(a) {
    this.svgKnob_.setAttribute(this.horizontal_ ? "x" : "y", a * this.ratio_);
    this.onScroll_()
};
Blockly.Scrollbar.insertAfter_ = function(a, b) {
    var c = b.nextSibling,
        d = b.parentNode;
    if (!d) throw "Reference node has no parent.";
    c ? d.insertBefore(a, c) : d.appendChild(a)
};
Blockly.Trashcan = function(a) {
    this.workspace_ = a
};
Blockly.Trashcan.prototype.SPRITE_URL_ = "media/sprites.png";
Blockly.Trashcan.prototype.LID_URL_ = "media/trashlid.png";
Blockly.Trashcan.prototype.WIDTH_ = 47;
Blockly.Trashcan.prototype.BODY_HEIGHT_ = 45;
Blockly.Trashcan.prototype.LID_HEIGHT_ = 15;
Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 35;
Blockly.Trashcan.prototype.MARGIN_SIDE_ = 35;
Blockly.Trashcan.prototype.MARGIN_HOTSPOT_ = 25;
Blockly.Trashcan.prototype.isOpen = !1;
Blockly.Trashcan.prototype.svgGroup_ = null;
Blockly.Trashcan.prototype.svgLid_ = null;
Blockly.Trashcan.prototype.lidTask_ = 0;
Blockly.Trashcan.prototype.lidAngle_ = 0;
Blockly.Trashcan.prototype.left_ = 0;
Blockly.Trashcan.prototype.top_ = 0;
Blockly.Trashcan.prototype.createDom = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
    var a = Blockly.createSvgElement("clipPath", {
        id: "blocklyTrashBodyClipPath"
    }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.BODY_HEIGHT_,
        y: this.LID_HEIGHT_
    }, a);
    Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -32,
        "clip-path": "url(#blocklyTrashBodyClipPath)"
    }, this.svgGroup_).setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
        Blockly.pathToBlockly + Blockly.SPRITE.url);
    a = Blockly.createSvgElement("clipPath", {
        id: "blocklyTrashLidClipPath"
    }, this.svgGroup_);
    Blockly.createSvgElement("rect", {
        width: this.WIDTH_,
        height: this.LID_HEIGHT_
    }, a);
    this.svgLid_ = Blockly.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -32,
        "clip-path": "url(#blocklyTrashLidClipPath)"
    }, this.svgGroup_);
    this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", Blockly.pathToBlockly + Blockly.SPRITE.url);
    return this.svgGroup_
};
Blockly.Trashcan.prototype.init = function() {
    this.setOpen_(!1);
    this.position_();
    Blockly.bindEvent_(window, "resize", this, this.position_)
};
Blockly.Trashcan.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.workspace_ = this.svgLid_ = null;
    goog.Timer.clear(this.lidTask_)
};
Blockly.Trashcan.prototype.position_ = function() {
    var a = this.workspace_.getMetrics();
    a && (this.left_ = Blockly.RTL ? this.MARGIN_SIDE_ : a.viewWidth + a.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_, this.top_ = a.viewHeight + a.absoluteTop - (this.BODY_HEIGHT_ + this.LID_HEIGHT_) - this.MARGIN_BOTTOM_, this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
};
Blockly.Trashcan.prototype.onMouseMove = function(a) {
    if (this.svgGroup_) {
        a = Blockly.mouseToSvg(a);
        var b = Blockly.getSvgXY_(this.svgGroup_);
        a = a.x > b.x - this.MARGIN_HOTSPOT_ && a.x < b.x + this.WIDTH_ + this.MARGIN_HOTSPOT_ && a.y > b.y - this.MARGIN_HOTSPOT_ && a.y < b.y + this.BODY_HEIGHT_ + this.LID_HEIGHT_ + this.MARGIN_HOTSPOT_;
        this.isOpen != a && this.setOpen_(a)
    }
};
Blockly.Trashcan.prototype.setOpen_ = function(a) {
    this.isOpen != a && (goog.Timer.clear(this.lidTask_), this.isOpen = a, this.animateLid_())
};
Blockly.Trashcan.prototype.animateLid_ = function() {
    this.lidAngle_ += this.isOpen ? 10 : -10;
    this.lidAngle_ = Math.max(0, this.lidAngle_);
    this.svgLid_.setAttribute("transform", "rotate(" + (Blockly.RTL ? -this.lidAngle_ : this.lidAngle_) + ", " + (Blockly.RTL ? 4 : this.WIDTH_ - 4) + ", " + (this.LID_HEIGHT_ - 2) + ")");
    if (this.isOpen ? 45 > this.lidAngle_ : 0 < this.lidAngle_) this.lidTask_ = goog.Timer.callOnce(this.animateLid_, 5, this)
};
Blockly.Trashcan.prototype.close = function() {
    this.setOpen_(!1)
};
Blockly.Xml = {};
Blockly.Xml.workspaceToDom = function(a) {
    var b;
    Blockly.RTL && (b = a.getMetrics().viewWidth);
    var c = goog.dom.createDom("xml");
    a = a.getTopBlocks(!0);
    for (var d = 0, e; e = a[d]; d++) {
        var f = Blockly.Xml.blockToDom_(e);
        e = e.getRelativeToSurfaceXY();
        f.setAttribute("x", Blockly.RTL ? b - e.x : e.x);
        f.setAttribute("y", e.y);
        c.appendChild(f)
    }
    return c
};
Blockly.Xml.blockToDom_ = function(a) {
    var b = goog.dom.createDom("block");
    b.setAttribute("type", a.type);
    b.setAttribute("id", a.id);
    if (a.mutationToDom) {
        var c = a.mutationToDom();
        c && b.appendChild(c)
    }
    for (var d = 0; c = a.inputList[d]; d++)
        for (var e = 0, f; f = c.fieldRow[e]; e++)
            if (f.name && f.EDITABLE) {
                var g = goog.dom.createDom("field", null, f.getValue());
                g.setAttribute("name", f.name);
                b.appendChild(g)
            }
    a.comment && (c = goog.dom.createDom("comment", null, a.comment.getText()), c.setAttribute("pinned", a.comment.isVisible()), d = a.comment.getBubbleSize(),
        c.setAttribute("h", d.height), c.setAttribute("w", d.width), b.appendChild(c));
    d = !1;
    for (e = 0; c = a.inputList[e]; e++) {
        var h;
        f = !0;
        c.type != Blockly.DUMMY_INPUT && (g = c.connection.targetBlock(), c.type == Blockly.INPUT_VALUE ? (h = goog.dom.createDom("value"), d = !0) : c.type == Blockly.NEXT_STATEMENT && (h = goog.dom.createDom("statement")), g && (h.appendChild(Blockly.Xml.blockToDom_(g)), f = !1), h.setAttribute("name", c.name), f || b.appendChild(h))
    }
    d && b.setAttribute("inline", a.inputsInline);
    a.isCollapsed() && b.setAttribute("collapsed", !0);
    a.disabled && b.setAttribute("disabled", !0);
    a.isDeletable() || b.setAttribute("deletable", !1);
    a.isMovable() || b.setAttribute("movable", !1);
    a.isEditable() || b.setAttribute("editable", !1);
    if (a = a.getNextBlock()) h = goog.dom.createDom("next", null, Blockly.Xml.blockToDom_(a)), b.appendChild(h);
    return b
};
Blockly.Xml.domToText = function(a) {
    return (new XMLSerializer).serializeToString(a)
};
Blockly.Xml.domToPrettyText = function(a) {
    a = Blockly.Xml.domToText(a).split("<");
    for (var b = "", c = 1; c < a.length; c++) {
        var d = a[c];
        "/" == d[0] && (b = b.substring(2));
        a[c] = b + "<" + d;
        "/" != d[0] && "/>" != d.slice(-2) && (b += "  ")
    }
    a = a.join("\n");
    a = a.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, "$1</$2>");
    return a.replace(/^\n/, "")
};
Blockly.Xml.textToDom = function(a) {
    a = (new DOMParser).parseFromString(a, "text/xml");
    if (!a || !a.firstChild || "xml" != a.firstChild.nodeName.toLowerCase() || a.firstChild !== a.lastChild) throw "Blockly.Xml.textToDom did not obtain a valid XML tree.";
    return a.firstChild
};
Blockly.Xml.domToWorkspace = function(a, b) {
    if (Blockly.RTL) var c = a.getMetrics().viewWidth;
    for (var d = 0; d < b.childNodes.length; d++) {
        var e = b.childNodes[d];
        if ("block" == e.nodeName.toLowerCase()) {
            var f = Blockly.Xml.domToBlock(a, e),
                g = parseInt(e.getAttribute("x"), 10),
                e = parseInt(e.getAttribute("y"), 10);
            isNaN(g) || isNaN(e) || f.moveBy(Blockly.RTL ? c - g : g, e)
        }
    }
};
Blockly.Xml.domToBlock = function(a, b, c) {
    var d = null,
        e = b.getAttribute("type");
    if (!e) throw "Block type unspecified: \n" + b.outerHTML;
    var f = b.getAttribute("id");
    if (c && f) {
        d = Blockly.Block.getById(f, a);
        if (!d) throw "Couldn't get Block with id: " + f;
        f = d.getParent();
        d.workspace && d.dispose(!0, !1, !0);
        d.fill(a, e);
        d.parent_ = f
    } else d = Blockly.Block.obtain(a, e);
    d.svg_ || d.initSvg();
    (f = b.getAttribute("inline")) && d.setInputsInline("true" == f);
    (f = b.getAttribute("disabled")) && d.setDisabled("true" == f);
    (f = b.getAttribute("deletable")) &&
    d.setDeletable("true" == f);
    (f = b.getAttribute("movable")) && d.setMovable("true" == f);
    (f = b.getAttribute("editable")) && d.setEditable("true" == f);
    for (var g = null, f = 0, h; h = b.childNodes[f]; f++)
        if (3 != h.nodeType || !h.data.match(/^\s*$/)) {
            for (var g = null, k = 0, l; l = h.childNodes[k]; k++) 3 == l.nodeType && l.data.match(/^\s*$/) || (g = l);
            k = h.getAttribute("name");
            switch (h.nodeName.toLowerCase()) {
                case "mutation":
                    d.domToMutation && d.domToMutation(h);
                    break;
                case "comment":
                    d.setCommentText(h.textContent);
                    var p = h.getAttribute("pinned");
                    p && setTimeout(function() {
                        d.comment.setVisible("true" == p)
                    }, 1);
                    g = parseInt(h.getAttribute("w"), 10);
                    h = parseInt(h.getAttribute("h"), 10);
                    isNaN(g) || isNaN(h) || d.comment.setBubbleSize(g, h);
                    break;
                case "title":
                case "field":
                    d.setFieldValue(h.textContent, k);
                    break;
                case "value":
                case "statement":
                    h = d.getInput(k);
                    if (!h) throw "Input " + k + " does not exist in block " + e;
                    if (g && "block" == g.nodeName.toLowerCase())
                        if (g = Blockly.Xml.domToBlock(a, g, c), g.outputConnection) h.connection.connect(g.outputConnection);
                        else if (g.previousConnection) h.connection.connect(g.previousConnection);
                    else throw "Child block does not have output or previous statement.";
                    break;
                case "next":
                    if (g && "block" == g.nodeName.toLowerCase()) {
                        if (!d.nextConnection) throw "Next statement does not exist.";
                        if (d.nextConnection.targetConnection) throw "Next statement is already connected.";
                        g = Blockly.Xml.domToBlock(a, g, c);
                        if (!g.previousConnection) throw "Next block does not have previous statement.";
                        d.nextConnection.connect(g.previousConnection)
                    }
            }
        }(a = b.getAttribute("collapsed")) && d.setCollapsed("true" == a);
    (a = d.getNextBlock()) ?
    a.render(): d.render();
    return d
};
Blockly.Xml.deleteNext = function(a) {
    for (var b = 0, c; c = a.childNodes[b]; b++)
        if ("next" == c.nodeName.toLowerCase()) {
            a.removeChild(c);
            break
        }
};
window.Blockly || (window.Blockly = {});
window.Blockly.Xml || (window.Blockly.Xml = {});
window.Blockly.Xml.domToText = Blockly.Xml.domToText;
window.Blockly.Xml.domToWorkspace = Blockly.Xml.domToWorkspace;
window.Blockly.Xml.textToDom = Blockly.Xml.textToDom;
window.Blockly.Xml.workspaceToDom = Blockly.Xml.workspaceToDom;
Blockly.Workspace = function(a, b) {
    this.getMetrics = a;
    this.setMetrics = b;
    this.isFlyout = !1;
    this.topBlocks_ = [];
    this.maxBlocks = Infinity;
    Blockly.ConnectionDB.init(this)
};
Blockly.Workspace.SCAN_ANGLE = 3;
Blockly.Workspace.prototype.dragMode = !1;
Blockly.Workspace.prototype.scrollX = 0;
Blockly.Workspace.prototype.scrollY = 0;
Blockly.Workspace.prototype.trashcan = null;
Blockly.Workspace.prototype.fireChangeEventPid_ = null;
Blockly.Workspace.prototype.scrollbar = null;
Blockly.Workspace.prototype.createDom = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
    this.svgBlockCanvas_ = Blockly.createSvgElement("g", {}, this.svgGroup_);
    this.svgBubbleCanvas_ = Blockly.createSvgElement("g", {}, this.svgGroup_);
    this.fireChangeEvent();
    return this.svgGroup_
};
Blockly.Workspace.prototype.dispose = function() {
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.svgBubbleCanvas_ = this.svgBlockCanvas_ = null;
    this.trashcan && (this.trashcan.dispose(), this.trashcan = null)
};
Blockly.Workspace.prototype.addTrashcan = function() {
    if (Blockly.hasTrashcan && !Blockly.readOnly) {
        this.trashcan = new Blockly.Trashcan(this);
        var a = this.trashcan.createDom();
        this.svgGroup_.insertBefore(a, this.svgBlockCanvas_);
        this.trashcan.init()
    }
};
Blockly.Workspace.prototype.getCanvas = function() {
    return this.svgBlockCanvas_
};
Blockly.Workspace.prototype.getBubbleCanvas = function() {
    return this.svgBubbleCanvas_
};
Blockly.Workspace.prototype.addTopBlock = function(a) {
    this.topBlocks_.push(a);
    Blockly.Realtime.isEnabled() && this == Blockly.mainWorkspace && Blockly.Realtime.addTopBlock(a);
    this.fireChangeEvent()
};
Blockly.Workspace.prototype.removeTopBlock = function(a) {
    for (var b = !1, c, d = 0; c = this.topBlocks_[d]; d++)
        if (c == a) {
            this.topBlocks_.splice(d, 1);
            b = !0;
            break
        }
    if (!b) throw "Block not present in workspace's list of top-most blocks.";
    Blockly.Realtime.isEnabled() && this == Blockly.mainWorkspace && Blockly.Realtime.removeTopBlock(a);
    this.fireChangeEvent()
};
Blockly.Workspace.prototype.getTopBlocks = function(a) {
    var b = [].concat(this.topBlocks_);
    if (a && 1 < b.length) {
        var c = Math.sin(Blockly.Workspace.SCAN_ANGLE / 180 * Math.PI);
        Blockly.RTL && (c *= -1);
        b.sort(function(a, b) {
            var f = a.getRelativeToSurfaceXY(),
                g = b.getRelativeToSurfaceXY();
            return f.y + c * f.x - (g.y + c * g.x)
        })
    }
    return b
};
Blockly.Workspace.prototype.getAllBlocks = function() {
    for (var a = this.getTopBlocks(!1), b = 0; b < a.length; b++) a.push.apply(a, a[b].getChildren());
    return a
};
Blockly.Workspace.prototype.clear = function() {
    for (Blockly.hideChaff(); this.topBlocks_.length;) this.topBlocks_[0].dispose()
};
Blockly.Workspace.prototype.render = function() {
    for (var a = this.getAllBlocks(), b = 0, c; c = a[b]; b++) c.getChildren().length || c.render()
};
Blockly.Workspace.prototype.getBlockById = function(a) {
    for (var b = this.getAllBlocks(), c = 0, d; d = b[c]; c++)
        if (d.id == a) return d;
    return null
};
Blockly.Workspace.prototype.traceOn = function(a) {
    this.traceOn_ = a;
    this.traceWrapper_ && (Blockly.unbindEvent_(this.traceWrapper_), this.traceWrapper_ = null);
    a && (this.traceWrapper_ = Blockly.bindEvent_(this.svgBlockCanvas_, "blocklySelectChange", this, function() {
        this.traceOn_ = !1
    }))
};
Blockly.Workspace.prototype.highlightBlock = function(a) {
    this.traceOn_ && 0 != Blockly.Block.dragMode_ && this.traceOn(!1);
    if (this.traceOn_) {
        var b = null;
        if (a && (b = this.getBlockById(a), !b)) return;
        this.traceOn(!1);
        b ? b.select() : Blockly.selected && Blockly.selected.unselect();
        var c = this;
        setTimeout(function() {
            c.traceOn(!0)
        }, 1)
    }
};
Blockly.Workspace.prototype.fireChangeEvent = function() {
    this.fireChangeEventPid_ && window.clearTimeout(this.fireChangeEventPid_);
    var a = this.svgBlockCanvas_;
    a && (this.fireChangeEventPid_ = window.setTimeout(function() {
        Blockly.fireUiEvent(a, "blocklyWorkspaceChange")
    }, 0))
};
Blockly.Workspace.prototype.paste = function(a) {
    if (!(a.getElementsByTagName("block").length >= this.remainingCapacity())) {
        var b = Blockly.Xml.domToBlock(this, a),
            c = parseInt(a.getAttribute("x"), 10);
        a = parseInt(a.getAttribute("y"), 10);
        if (!isNaN(c) && !isNaN(a)) {
            Blockly.RTL && (c = -c);
            do
                for (var d = !1, e = this.getAllBlocks(), f = 0, g; g = e[f]; f++) g = g.getRelativeToSurfaceXY(), 1 >= Math.abs(c - g.x) && 1 >= Math.abs(a - g.y) && (c = Blockly.RTL ? c - Blockly.SNAP_RADIUS : c + Blockly.SNAP_RADIUS, a += 2 * Blockly.SNAP_RADIUS, d = !0); while (d);
            b.moveBy(c,
                a)
        }
        b.select()
    }
};
Blockly.Workspace.prototype.remainingCapacity = function() {
    return Infinity == this.maxBlocks ? Infinity : this.maxBlocks - this.getAllBlocks().length
};
Blockly.Workspace.prototype.clear = Blockly.Workspace.prototype.clear;
Blockly.Bubble = function(a, b, c, d, e, f, g) {
    var h = Blockly.Bubble.ARROW_ANGLE;
    Blockly.RTL && (h = -h);
    this.arrow_radians_ = h / 360 * Math.PI * 2;
    this.workspace_ = a;
    this.content_ = b;
    this.shape_ = c;
    a.getBubbleCanvas().appendChild(this.createDom_(b, !(!f || !g)));
    this.setAnchorLocation(d, e);
    f && g || (a = this.content_.getBBox(), f = a.width + 2 * Blockly.Bubble.BORDER_WIDTH, g = a.height + 2 * Blockly.Bubble.BORDER_WIDTH);
    this.setBubbleSize(f, g);
    this.positionBubble_();
    this.renderArrow_();
    this.rendered_ = !0;
    Blockly.readOnly || (Blockly.bindEvent_(this.bubbleBack_,
        "mousedown", this, this.bubbleMouseDown_), this.resizeGroup_ && Blockly.bindEvent_(this.resizeGroup_, "mousedown", this, this.resizeMouseDown_))
};
Blockly.Bubble.BORDER_WIDTH = 6;
Blockly.Bubble.ARROW_THICKNESS = 10;
Blockly.Bubble.ARROW_ANGLE = 20;
Blockly.Bubble.ARROW_BEND = 4;
Blockly.Bubble.ANCHOR_RADIUS = 8;
Blockly.Bubble.onMouseUpWrapper_ = null;
Blockly.Bubble.onMouseMoveWrapper_ = null;
Blockly.Bubble.unbindDragEvents_ = function() {
    Blockly.Bubble.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_), Blockly.Bubble.onMouseUpWrapper_ = null);
    Blockly.Bubble.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_), Blockly.Bubble.onMouseMoveWrapper_ = null)
};
Blockly.Bubble.prototype.rendered_ = !1;
Blockly.Bubble.prototype.anchorX_ = 0;
Blockly.Bubble.prototype.anchorY_ = 0;
Blockly.Bubble.prototype.relativeLeft_ = 0;
Blockly.Bubble.prototype.relativeTop_ = 0;
Blockly.Bubble.prototype.width_ = 0;
Blockly.Bubble.prototype.height_ = 0;
Blockly.Bubble.prototype.autoLayout_ = !0;
Blockly.Bubble.prototype.createDom_ = function(a, b) {
    this.bubbleGroup_ = Blockly.createSvgElement("g", {}, null);
    var c = Blockly.createSvgElement("g", {
        filter: "url(#blocklyEmboss)"
    }, this.bubbleGroup_);
    this.bubbleArrow_ = Blockly.createSvgElement("path", {}, c);
    this.bubbleBack_ = Blockly.createSvgElement("rect", {
        "class": "blocklyDraggable",
        x: 0,
        y: 0,
        rx: Blockly.Bubble.BORDER_WIDTH,
        ry: Blockly.Bubble.BORDER_WIDTH
    }, c);
    b ? (this.resizeGroup_ = Blockly.createSvgElement("g", {
            "class": Blockly.RTL ? "blocklyResizeSW" : "blocklyResizeSE"
        },
        this.bubbleGroup_), c = 2 * Blockly.Bubble.BORDER_WIDTH, Blockly.createSvgElement("polygon", {
        points: "0,x x,x x,0".replace(/x/g, c.toString())
    }, this.resizeGroup_), Blockly.createSvgElement("line", {
        "class": "blocklyResizeLine",
        x1: c / 3,
        y1: c - 1,
        x2: c - 1,
        y2: c / 3
    }, this.resizeGroup_), Blockly.createSvgElement("line", {
        "class": "blocklyResizeLine",
        x1: 2 * c / 3,
        y1: c - 1,
        x2: c - 1,
        y2: 2 * c / 3
    }, this.resizeGroup_)) : this.resizeGroup_ = null;
    this.bubbleGroup_.appendChild(a);
    return this.bubbleGroup_
};
Blockly.Bubble.prototype.bubbleMouseDown_ = function(a) {
    this.promote_();
    Blockly.Bubble.unbindDragEvents_();
    Blockly.isRightButton(a) || Blockly.isTargetInput_(a) || (Blockly.setCursorHand_(!0), this.dragDeltaX = Blockly.RTL ? this.relativeLeft_ + a.clientX : this.relativeLeft_ - a.clientX, this.dragDeltaY = this.relativeTop_ - a.clientY, Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove",
        this, this.bubbleMouseMove_), Blockly.hideChaff(), a.stopPropagation())
};
Blockly.Bubble.prototype.bubbleMouseMove_ = function(a) {
    this.autoLayout_ = !1;
    this.relativeLeft_ = Blockly.RTL ? this.dragDeltaX - a.clientX : this.dragDeltaX + a.clientX;
    this.relativeTop_ = this.dragDeltaY + a.clientY;
    this.positionBubble_();
    this.renderArrow_()
};
Blockly.Bubble.prototype.resizeMouseDown_ = function(a) {
    this.promote_();
    Blockly.Bubble.unbindDragEvents_();
    Blockly.isRightButton(a) || (Blockly.setCursorHand_(!0), this.resizeDeltaWidth = Blockly.RTL ? this.width_ + a.clientX : this.width_ - a.clientX, this.resizeDeltaHeight = this.height_ - a.clientY, Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Bubble.unbindDragEvents_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.resizeMouseMove_), Blockly.hideChaff(),
        a.stopPropagation())
};
Blockly.Bubble.prototype.resizeMouseMove_ = function(a) {
    this.autoLayout_ = !1;
    var b = this.resizeDeltaWidth,
        c = this.resizeDeltaHeight + a.clientY,
        b = Blockly.RTL ? b - a.clientX : b + a.clientX;
    this.setBubbleSize(b, c);
    Blockly.RTL && this.positionBubble_()
};
Blockly.Bubble.prototype.registerResizeEvent = function(a, b) {
    Blockly.bindEvent_(this.bubbleGroup_, "resize", a, b)
};
Blockly.Bubble.prototype.promote_ = function() {
    this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)
};
Blockly.Bubble.prototype.setAnchorLocation = function(a, b) {
    this.anchorX_ = a;
    this.anchorY_ = b;
    this.rendered_ && this.positionBubble_()
};
Blockly.Bubble.prototype.layoutBubble_ = function() {
    var a = -this.width_ / 4,
        b = -this.height_ - Blockly.BlockSvg.MIN_BLOCK_Y,
        c = this.workspace_.getMetrics();
    Blockly.RTL ? this.anchorX_ - c.viewLeft - a - this.width_ < Blockly.Scrollbar.scrollbarThickness ? a = this.anchorX_ - c.viewLeft - this.width_ - Blockly.Scrollbar.scrollbarThickness : this.anchorX_ - c.viewLeft - a > c.viewWidth && (a = this.anchorX_ - c.viewLeft - c.viewWidth) : this.anchorX_ + a < c.viewLeft ? a = c.viewLeft - this.anchorX_ : c.viewLeft + c.viewWidth < this.anchorX_ + a + this.width_ + Blockly.BlockSvg.SEP_SPACE_X +
        Blockly.Scrollbar.scrollbarThickness && (a = c.viewLeft + c.viewWidth - this.anchorX_ - this.width_ - Blockly.Scrollbar.scrollbarThickness);
    this.anchorY_ + b < c.viewTop && (b = this.shape_.getBBox().height);
    this.relativeLeft_ = a;
    this.relativeTop_ = b
};
Blockly.Bubble.prototype.positionBubble_ = function() {
    this.bubbleGroup_.setAttribute("transform", "translate(" + (Blockly.RTL ? this.anchorX_ - this.relativeLeft_ - this.width_ : this.anchorX_ + this.relativeLeft_) + ", " + (this.relativeTop_ + this.anchorY_) + ")")
};
Blockly.Bubble.prototype.getBubbleSize = function() {
    return {
        width: this.width_,
        height: this.height_
    }
};
Blockly.Bubble.prototype.setBubbleSize = function(a, b) {
    var c = 2 * Blockly.Bubble.BORDER_WIDTH;
    a = Math.max(a, c + 45);
    b = Math.max(b, c + Blockly.BlockSvg.FIELD_HEIGHT);
    this.width_ = a;
    this.height_ = b;
    this.bubbleBack_.setAttribute("width", a);
    this.bubbleBack_.setAttribute("height", b);
    this.resizeGroup_ && (Blockly.RTL ? this.resizeGroup_.setAttribute("transform", "translate(" + 2 * Blockly.Bubble.BORDER_WIDTH + ", " + (b - c) + ") scale(-1 1)") : this.resizeGroup_.setAttribute("transform", "translate(" + (a - c) + ", " + (b - c) + ")"));
    this.rendered_ &&
        (this.autoLayout_ && this.layoutBubble_(), this.positionBubble_(), this.renderArrow_());
    Blockly.fireUiEvent(this.bubbleGroup_, "resize")
};
Blockly.Bubble.prototype.renderArrow_ = function() {
    var a = [],
        b = this.width_ / 2,
        c = this.height_ / 2,
        d = -this.relativeLeft_,
        e = -this.relativeTop_;
    if (b == d && c == e) a.push("M " + b + "," + c);
    else {
        e -= c;
        d -= b;
        Blockly.RTL && (d *= -1);
        var f = Math.sqrt(e * e + d * d),
            g = Math.acos(d / f);
        0 > e && (g = 2 * Math.PI - g);
        var h = g + Math.PI / 2;
        h > 2 * Math.PI && (h -= 2 * Math.PI);
        var k = Math.sin(h),
            l = Math.cos(h),
            p = this.getBubbleSize(),
            h = (p.width + p.height) / Blockly.Bubble.ARROW_THICKNESS,
            h = Math.min(h, p.width, p.height) / 2,
            p = 1 - Blockly.Bubble.ANCHOR_RADIUS / f,
            d = b + p * d,
            e = c +
            p * e,
            p = b + h * l,
            m = c + h * k,
            b = b - h * l,
            c = c - h * k,
            k = g + this.arrow_radians_;
        k > 2 * Math.PI && (k -= 2 * Math.PI);
        g = Math.sin(k) * f / Blockly.Bubble.ARROW_BEND;
        f = Math.cos(k) * f / Blockly.Bubble.ARROW_BEND;
        a.push("M" + p + "," + m);
        a.push("C" + (p + f) + "," + (m + g) + " " + d + "," + e + " " + d + "," + e);
        a.push("C" + d + "," + e + " " + (b + f) + "," + (c + g) + " " + b + "," + c)
    }
    a.push("z");
    this.bubbleArrow_.setAttribute("d", a.join(" "))
};
Blockly.Bubble.prototype.setColour = function(a) {
    this.bubbleBack_.setAttribute("fill", a);
    this.bubbleArrow_.setAttribute("fill", a)
};
Blockly.Bubble.prototype.dispose = function() {
    Blockly.Bubble.unbindDragEvents_();
    goog.dom.removeNode(this.bubbleGroup_);
    this.shape_ = this.content_ = this.workspace_ = this.bubbleGroup_ = null
};
Blockly.Icon = function(a) {
    this.block_ = a
};
Blockly.Icon.RADIUS = 8;
Blockly.Icon.prototype.bubble_ = null;
Blockly.Icon.prototype.iconX_ = 0;
Blockly.Icon.prototype.iconY_ = 0;
Blockly.Icon.prototype.createIcon_ = function() {
    this.iconGroup_ = Blockly.createSvgElement("g", {}, null);
    this.block_.getSvgRoot().appendChild(this.iconGroup_);
    Blockly.bindEvent_(this.iconGroup_, "mouseup", this, this.iconClick_);
    this.updateEditable()
};
Blockly.Icon.prototype.dispose = function() {
    goog.dom.removeNode(this.iconGroup_);
    this.iconGroup_ = null;
    this.setVisible(!1);
    this.block_ = null
};
Blockly.Icon.prototype.updateEditable = function() {
    this.block_.isInFlyout ? Blockly.removeClass_(this.iconGroup_, "blocklyIconGroup") : Blockly.addClass_(this.iconGroup_, "blocklyIconGroup")
};
Blockly.Icon.prototype.isVisible = function() {
    return !!this.bubble_
};
Blockly.Icon.prototype.iconClick_ = function(a) {
    this.block_.isInFlyout || this.setVisible(!this.isVisible())
};
Blockly.Icon.prototype.updateColour = function() {
    if (this.isVisible()) {
        var a = Blockly.makeColour(this.block_.getColour());
        this.bubble_.setColour(a)
    }
};
Blockly.Icon.prototype.renderIcon = function(a) {
    if (this.block_.isCollapsed()) return this.iconGroup_.setAttribute("display", "none"), a;
    this.iconGroup_.setAttribute("display", "block");
    var b = 2 * Blockly.Icon.RADIUS;
    Blockly.RTL && (a -= b);
    this.iconGroup_.setAttribute("transform", "translate(" + a + ", 5)");
    this.computeIconLocation();
    return a = Blockly.RTL ? a - Blockly.BlockSvg.SEP_SPACE_X : a + (b + Blockly.BlockSvg.SEP_SPACE_X)
};
Blockly.Icon.prototype.setIconLocation = function(a, b) {
    this.iconX_ = a;
    this.iconY_ = b;
    this.isVisible() && this.bubble_.setAnchorLocation(a, b)
};
Blockly.Icon.prototype.computeIconLocation = function() {
    var a = this.block_.getRelativeToSurfaceXY(),
        b = Blockly.getRelativeXY_(this.iconGroup_),
        c = a.x + b.x + Blockly.Icon.RADIUS,
        a = a.y + b.y + Blockly.Icon.RADIUS;
    c === this.iconX_ && a === this.iconY_ || this.setIconLocation(c, a)
};
Blockly.Icon.prototype.getIconLocation = function() {
    return {
        x: this.iconX_,
        y: this.iconY_
    }
};
Blockly.Comment = function(a) {
    Blockly.Comment.superClass_.constructor.call(this, a);
    this.createIcon_()
};
goog.inherits(Blockly.Comment, Blockly.Icon);
Blockly.Comment.prototype.text_ = "";
Blockly.Comment.prototype.width_ = 160;
Blockly.Comment.prototype.height_ = 80;
Blockly.Comment.prototype.createIcon_ = function() {
    Blockly.Icon.prototype.createIcon_.call(this);
    Blockly.createSvgElement("circle", {
        "class": "blocklyIconShield",
        r: Blockly.Icon.RADIUS,
        cx: Blockly.Icon.RADIUS,
        cy: Blockly.Icon.RADIUS
    }, this.iconGroup_);
    this.iconMark_ = Blockly.createSvgElement("text", {
        "class": "blocklyIconMark",
        x: Blockly.Icon.RADIUS,
        y: 2 * Blockly.Icon.RADIUS - 3
    }, this.iconGroup_);
    this.iconMark_.appendChild(document.createTextNode("?"))
};
Blockly.Comment.prototype.createEditor_ = function() {
    this.foreignObject_ = Blockly.createSvgElement("foreignObject", {
        x: Blockly.Bubble.BORDER_WIDTH,
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    var a = document.createElementNS(Blockly.HTML_NS, "body");
    a.setAttribute("xmlns", Blockly.HTML_NS);
    a.className = "blocklyMinimalBody";
    this.textarea_ = document.createElementNS(Blockly.HTML_NS, "textarea");
    this.textarea_.className = "blocklyCommentTextarea";
    this.textarea_.setAttribute("dir", Blockly.RTL ? "RTL" : "LTR");
    a.appendChild(this.textarea_);
    this.foreignObject_.appendChild(a);
    Blockly.bindEvent_(this.textarea_, "mouseup", this, this.textareaFocus_);
    return this.foreignObject_
};
Blockly.Comment.prototype.updateEditable = function() {
    this.isVisible() && (this.setVisible(!1), this.setVisible(!0));
    Blockly.Icon.prototype.updateEditable.call(this)
};
Blockly.Comment.prototype.resizeBubble_ = function() {
    var a = this.bubble_.getBubbleSize(),
        b = 2 * Blockly.Bubble.BORDER_WIDTH;
    this.foreignObject_.setAttribute("width", a.width - b);
    this.foreignObject_.setAttribute("height", a.height - b);
    this.textarea_.style.width = a.width - b - 4 + "px";
    this.textarea_.style.height = a.height - b - 4 + "px"
};
Blockly.Comment.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (!this.block_.isEditable() && !this.textarea_ || goog.userAgent.IE) Blockly.Warning.prototype.setVisible.call(this, a);
        else {
            var b = this.getText(),
                c = this.getBubbleSize();
            a ? (this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svg_.svgPath_, this.iconX_, this.iconY_, this.width_, this.height_), this.bubble_.registerResizeEvent(this, this.resizeBubble_), this.updateColour(), this.text_ = null) : (this.bubble_.dispose(),
                this.foreignObject_ = this.textarea_ = this.bubble_ = null);
            this.setText(b);
            this.setBubbleSize(c.width, c.height)
        }
};
Blockly.Comment.prototype.textareaFocus_ = function(a) {
    this.bubble_.promote_();
    this.textarea_.focus()
};
Blockly.Comment.prototype.getBubbleSize = function() {
    return this.isVisible() ? this.bubble_.getBubbleSize() : {
        width: this.width_,
        height: this.height_
    }
};
Blockly.Comment.prototype.setBubbleSize = function(a, b) {
    this.textarea_ ? this.bubble_.setBubbleSize(a, b) : (this.width_ = a, this.height_ = b)
};
Blockly.Comment.prototype.getText = function() {
    return this.textarea_ ? this.textarea_.value : this.text_
};
Blockly.Comment.prototype.setText = function(a) {
    this.textarea_ ? this.textarea_.value = a : this.text_ = a
};
Blockly.Comment.prototype.dispose = function() {
    this.block_.comment = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Connection = function(a, b) {
    this.sourceBlock_ = a;
    this.targetConnection = null;
    this.type = b;
    this.y_ = this.x_ = 0;
    this.inDB_ = !1;
    this.dbList_ = this.sourceBlock_.workspace.connectionDBList
};
Blockly.Connection.prototype.dispose = function() {
    if (this.targetConnection) throw "Disconnect connection before disposing of it.";
    this.inDB_ && this.dbList_[this.type].removeConnection_(this);
    this.inDB_ = !1;
    Blockly.highlightedConnection_ == this && (Blockly.highlightedConnection_ = null);
    Blockly.localConnection_ == this && (Blockly.localConnection_ = null)
};
Blockly.Connection.prototype.isSuperior = function() {
    return this.type == Blockly.INPUT_VALUE || this.type == Blockly.NEXT_STATEMENT
};
Blockly.Connection.prototype.connect = function(a) {
    if (this.sourceBlock_ == a.sourceBlock_) throw "Attempted to connect a block to itself.";
    if (this.sourceBlock_.workspace !== a.sourceBlock_.workspace) throw "Blocks are on different workspaces.";
    if (Blockly.OPPOSITE_TYPE[this.type] != a.type) throw "Attempt to connect incompatible types.";
    if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
        if (this.targetConnection) throw "Source connection already connected (value).";
        if (a.targetConnection) {
            var b = a.targetBlock();
            b.setParent(null);
            if (!b.outputConnection) throw "Orphan block does not have an output connection.";
            for (var c = this.sourceBlock_; c = Blockly.Connection.singleConnection_(c, b);)
                if (c.targetBlock()) c = c.targetBlock();
                else {
                    c.connect(b.outputConnection);
                    b = null;
                    break
                }
            b && window.setTimeout(function() {
                b.outputConnection.bumpAwayFrom_(a)
            }, Blockly.BUMP_DELAY)
        }
    } else {
        if (this.targetConnection) throw "Source connection already connected (block).";
        if (a.targetConnection) {
            if (this.type != Blockly.PREVIOUS_STATEMENT) throw "Can only do a mid-stack connection with the top of a block.";
            b = a.targetBlock();
            b.setParent(null);
            if (!b.previousConnection) throw "Orphan block does not have a previous connection.";
            for (c = this.sourceBlock_; c.nextConnection;)
                if (c.nextConnection.targetConnection) c = c.getNextBlock();
                else {
                    c.nextConnection.connect(b.previousConnection);
                    b = null;
                    break
                }
            b && window.setTimeout(function() {
                b.previousConnection.bumpAwayFrom_(a)
            }, Blockly.BUMP_DELAY)
        }
    }
    var d;
    this.isSuperior() ? (c = this.sourceBlock_, d = a.sourceBlock_) : (c = a.sourceBlock_, d = this.sourceBlock_);
    this.targetConnection = a;
    a.targetConnection =
        this;
    d.setParent(c);
    c.rendered && c.svg_.updateDisabled();
    d.rendered && d.svg_.updateDisabled();
    c.rendered && d.rendered && (this.type == Blockly.NEXT_STATEMENT || this.type == Blockly.PREVIOUS_STATEMENT ? d.render() : c.render())
};
Blockly.Connection.singleConnection_ = function(a, b) {
    for (var c = !1, d = 0; d < a.inputList.length; d++) {
        var e = a.inputList[d].connection;
        if (e && e.type == Blockly.INPUT_VALUE && b.outputConnection.checkType_(e)) {
            if (c) return null;
            c = e
        }
    }
    return c
};
Blockly.Connection.prototype.disconnect = function() {
    var a = this.targetConnection;
    if (!a) throw "Source connection not connected.";
    if (a.targetConnection != this) throw "Target connection not connected to source connection.";
    this.targetConnection = a.targetConnection = null;
    var b;
    this.isSuperior() ? (b = this.sourceBlock_, a = a.sourceBlock_) : (b = a.sourceBlock_, a = this.sourceBlock_);
    b.rendered && b.render();
    a.rendered && (a.svg_.updateDisabled(), a.render())
};
Blockly.Connection.prototype.targetBlock = function() {
    return this.targetConnection ? this.targetConnection.sourceBlock_ : null
};
Blockly.Connection.prototype.bumpAwayFrom_ = function(a) {
    if (0 == Blockly.Block.dragMode_) {
        var b = this.sourceBlock_.getRootBlock();
        if (!b.isInFlyout) {
            var c = !1;
            if (!b.isMovable()) {
                b = a.sourceBlock_.getRootBlock();
                if (!b.isMovable()) return;
                a = this;
                c = !0
            }
            b.getSvgRoot().parentNode.appendChild(b.getSvgRoot());
            var d = a.x_ + Blockly.SNAP_RADIUS - this.x_;
            a = a.y_ + Blockly.SNAP_RADIUS - this.y_;
            c && (a = -a);
            Blockly.RTL && (d = -d);
            b.moveBy(d, a)
        }
    }
};
Blockly.Connection.prototype.moveTo = function(a, b) {
    this.inDB_ && this.dbList_[this.type].removeConnection_(this);
    this.x_ = a;
    this.y_ = b;
    this.dbList_[this.type].addConnection_(this)
};
Blockly.Connection.prototype.moveBy = function(a, b) {
    this.moveTo(this.x_ + a, this.y_ + b)
};
Blockly.Connection.prototype.highlight = function() {
    var a;
    this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE ? (a = Blockly.RTL ? -Blockly.BlockSvg.TAB_WIDTH : Blockly.BlockSvg.TAB_WIDTH, a = "m 0,0 v 5 c 0,10 " + -a + ",-8 " + -a + ",7.5 s " + a + ",-2.5 " + a + ",7.5 v 5") : a = Blockly.RTL ? "m 20,0 h -5 l -6,4 -3,0 -6,-4 h -5" : "m -20,0 h 5 l 6,4 3,0 6,-4 h 5";
    var b = this.sourceBlock_.getRelativeToSurfaceXY();
    Blockly.Connection.highlightedPath_ = Blockly.createSvgElement("path", {
        "class": "blocklyHighlightedConnectionPath",
        d: a,
        transform: "translate(" + (this.x_ - b.x) + ", " + (this.y_ - b.y) + ")"
    }, this.sourceBlock_.getSvgRoot())
};
Blockly.Connection.prototype.unhighlight = function() {
    goog.dom.removeNode(Blockly.Connection.highlightedPath_);
    delete Blockly.Connection.highlightedPath_
};
Blockly.Connection.prototype.tighten_ = function() {
    var a = Math.round(this.targetConnection.x_ - this.x_),
        b = Math.round(this.targetConnection.y_ - this.y_);
    if (0 != a || 0 != b) {
        var c = this.targetBlock(),
            d = c.getSvgRoot();
        if (!d) throw "block is not rendered.";
        d = Blockly.getRelativeXY_(d);
        c.getSvgRoot().setAttribute("transform", "translate(" + (d.x - a) + ", " + (d.y - b) + ")");
        c.moveConnections_(-a, -b)
    }
};
Blockly.Connection.prototype.closest = function(a, b, c) {
    function d(b) {
        var c = e[b];
        if ((c.type == Blockly.OUTPUT_VALUE || c.type == Blockly.PREVIOUS_STATEMENT) && c.targetConnection || c.type == Blockly.INPUT_VALUE && c.targetConnection && !c.targetBlock().isMovable() || !p.checkType_(c)) return !0;
        c = c.sourceBlock_;
        do {
            if (l == c) return !0;
            c = c.getParent()
        } while (c);
        var d = f - e[b].x_,
            c = g - e[b].y_,
            d = Math.sqrt(d * d + c * c);
        d <= a && (k = e[b], a = d);
        return c < a
    }
    if (this.targetConnection) return {
        connection: null,
        radius: a
    };
    var e = this.dbList_[Blockly.OPPOSITE_TYPE[this.type]],
        f = this.x_ + b,
        g = this.y_ + c;
    b = 0;
    for (var h = c = e.length - 2; b < h;) e[h].y_ < g ? b = h : c = h, h = Math.floor((b + c) / 2);
    c = b = h;
    var k = null,
        l = this.sourceBlock_,
        p = this;
    if (e.length) {
        for (; 0 <= b && d(b);) b--;
        do c++; while (c < e.length && d(c))
    }
    return {
        connection: k,
        radius: a
    }
};
Blockly.Connection.prototype.checkType_ = function(a) {
    if (!this.check_ || !a.check_) return !0;
    for (var b = 0; b < this.check_.length; b++)
        if (-1 != a.check_.indexOf(this.check_[b])) return !0;
    return !1
};
Blockly.Connection.prototype.setCheck = function(a) {
    a ? (goog.isArray(a) || (a = [a]), this.check_ = a, this.targetConnection && !this.checkType_(this.targetConnection) && (this.isSuperior() ? this.targetBlock().setParent(null) : this.sourceBlock_.setParent(null), this.sourceBlock_.bumpNeighbours_())) : this.check_ = null;
    return this
};
Blockly.Connection.prototype.neighbours_ = function(a) {
    function b(b) {
        var f = d - c[b].x_,
            g = e - c[b].y_;
        Math.sqrt(f * f + g * g) <= a && k.push(c[b]);
        return g < a
    }
    for (var c = this.dbList_[Blockly.OPPOSITE_TYPE[this.type]], d = this.x_, e = this.y_, f = 0, g = c.length - 2, h = g; f < h;) c[h].y_ < e ? f = h : g = h, h = Math.floor((f + g) / 2);
    var g = f = h,
        k = [];
    if (c.length) {
        for (; 0 <= f && b(f);) f--;
        do g++; while (g < c.length && b(g))
    }
    return k
};
Blockly.Connection.prototype.hideAll = function() {
    this.inDB_ && this.dbList_[this.type].removeConnection_(this);
    if (this.targetConnection)
        for (var a = this.targetBlock().getDescendants(), b = 0; b < a.length; b++) {
            for (var c = a[b], d = c.getConnections_(!0), e = 0; e < d.length; e++) {
                var f = d[e];
                f.inDB_ && this.dbList_[f.type].removeConnection_(f)
            }
            c = c.getIcons();
            for (d = 0; d < c.length; d++) c[d].setVisible(!1)
        }
};
Blockly.Connection.prototype.unhideAll = function() {
    this.inDB_ || this.dbList_[this.type].addConnection_(this);
    var a = [];
    if (this.type != Blockly.INPUT_VALUE && this.type != Blockly.NEXT_STATEMENT) return a;
    var b = this.targetBlock();
    if (b) {
        var c;
        b.isCollapsed() ? (c = [], b.outputConnection && c.push(b.outputConnection), b.nextConnection && c.push(b.nextConnection), b.previousConnection && c.push(b.previousConnection)) : c = b.getConnections_(!0);
        for (var d = 0; d < c.length; d++) a.push.apply(a, c[d].unhideAll());
        0 == a.length && (a[0] = b)
    }
    return a
};
Blockly.ConnectionDB = function() {};
Blockly.ConnectionDB.prototype = [];
Blockly.ConnectionDB.constructor = Blockly.ConnectionDB;
Blockly.ConnectionDB.prototype.addConnection_ = function(a) {
    if (a.inDB_) throw "Connection already in database.";
    for (var b = 0, c = this.length; b < c;) {
        var d = Math.floor((b + c) / 2);
        if (this[d].y_ < a.y_) b = d + 1;
        else if (this[d].y_ > a.y_) c = d;
        else {
            b = d;
            break
        }
    }
    this.splice(b, 0, a);
    a.inDB_ = !0
};
Blockly.ConnectionDB.prototype.removeConnection_ = function(a) {
    if (!a.inDB_) throw "Connection not in database.";
    a.inDB_ = !1;
    for (var b = 0, c = this.length - 2, d = c; b < d;) this[d].y_ < a.y_ ? b = d : c = d, d = Math.floor((b + c) / 2);
    for (c = b = d; 0 <= b && this[b].y_ == a.y_;) {
        if (this[b] == a) {
            this.splice(b, 1);
            return
        }
        b--
    }
    do {
        if (this[c] == a) {
            this.splice(c, 1);
            return
        }
        c++
    } while (c < this.length && this[c].y_ == a.y_);
    throw "Unable to find connection in connectionDB.";
};
Blockly.ConnectionDB.init = function(a) {
    var b = [];
    b[Blockly.INPUT_VALUE] = new Blockly.ConnectionDB;
    b[Blockly.OUTPUT_VALUE] = new Blockly.ConnectionDB;
    b[Blockly.NEXT_STATEMENT] = new Blockly.ConnectionDB;
    b[Blockly.PREVIOUS_STATEMENT] = new Blockly.ConnectionDB;
    a.connectionDBList = b
};
Blockly.ContextMenu = {};
Blockly.ContextMenu.currentBlock = null;
Blockly.ContextMenu.show = function(a, b) {
    Blockly.WidgetDiv.show(Blockly.ContextMenu, null);
    if (b.length) {
        for (var c = new goog.ui.Menu, d = 0, e; e = b[d]; d++) {
            var f = new goog.ui.MenuItem(e.text);
            c.addChild(f, !0);
            f.setEnabled(e.enabled);
            e.enabled && goog.events.listen(f, goog.ui.Component.EventType.ACTION, function(a) {
                return function() {
                    Blockly.doCommand(a)
                }
            }(e.callback))
        }
        goog.events.listen(c, goog.ui.Component.EventType.ACTION, Blockly.ContextMenu.hide);
        e = goog.dom.getViewportSize();
        f = goog.style.getViewportPageOffset(document);
        c.render(Blockly.WidgetDiv.DIV);
        var g = c.getElement();
        Blockly.addClass_(g, "blocklyContextMenu");
        var h = goog.style.getSize(g),
            d = a.clientX + f.x,
            k = a.clientY + f.y;
        a.clientY + h.height >= e.height && (k -= h.height);
        Blockly.RTL ? h.width >= a.clientX && (d += h.width) : a.clientX + h.width >= e.width && (d -= h.width);
        Blockly.WidgetDiv.position(d, k, e, f);
        c.setAllowAutoFocus(!0);
        setTimeout(function() {
            g.focus()
        }, 1);
        Blockly.ContextMenu.currentBlock = null
    } else Blockly.ContextMenu.hide()
};
Blockly.ContextMenu.hide = function() {
    Blockly.WidgetDiv.hideIfOwner(Blockly.ContextMenu);
    Blockly.ContextMenu.currentBlock = null
};
Blockly.ContextMenu.callbackFactory = function(a, b) {
    return function() {
        var c = Blockly.Xml.domToBlock(a.workspace, b),
            d = a.getRelativeToSurfaceXY();
        d.x = Blockly.RTL ? d.x - Blockly.SNAP_RADIUS : d.x + Blockly.SNAP_RADIUS;
        d.y += 2 * Blockly.SNAP_RADIUS;
        c.moveBy(d.x, d.y);
        c.select()
    }
};
Blockly.Field = function(a) {
    this.sourceBlock_ = null;
    this.fieldGroup_ = Blockly.createSvgElement("g", {}, null);
    this.borderRect_ = Blockly.createSvgElement("rect", {
        rx: 4,
        ry: 4,
        x: -Blockly.BlockSvg.SEP_SPACE_X / 2,
        y: -12,
        height: 16
    }, this.fieldGroup_);
    this.textElement_ = Blockly.createSvgElement("text", {
        "class": "blocklyText"
    }, this.fieldGroup_);
    this.size_ = {
        height: 25,
        width: 0
    };
    this.setText(a);
    this.visible_ = !0
};
Blockly.Field.prototype.clone = function() {
    goog.asserts.fail("There should never be an instance of Field, only its derived classes.")
};
Blockly.Field.NBSP = "\u00a0";
Blockly.Field.prototype.EDITABLE = !0;
Blockly.Field.prototype.init = function(a) {
    if (this.sourceBlock_) throw "Field has already been initialized once.";
    this.sourceBlock_ = a;
    this.updateEditable();
    a.getSvgRoot().appendChild(this.fieldGroup_);
    this.mouseUpWrapper_ = Blockly.bindEvent_(this.fieldGroup_, "mouseup", this, this.onMouseUp_);
    this.setText(null)
};
Blockly.Field.prototype.dispose = function() {
    this.mouseUpWrapper_ && (Blockly.unbindEvent_(this.mouseUpWrapper_), this.mouseUpWrapper_ = null);
    this.sourceBlock_ = null;
    goog.dom.removeNode(this.fieldGroup_);
    this.borderRect_ = this.textElement_ = this.fieldGroup_ = null
};
Blockly.Field.prototype.updateEditable = function() {
    this.EDITABLE && (this.sourceBlock_.isEditable() ? (Blockly.addClass_(this.fieldGroup_, "blocklyEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyNoNEditableText"), this.fieldGroup_.style.cursor = this.CURSOR) : (Blockly.addClass_(this.fieldGroup_, "blocklyNonEditableText"), Blockly.removeClass_(this.fieldGroup_, "blocklyEditableText"), this.fieldGroup_.style.cursor = ""))
};
Blockly.Field.prototype.isVisible = function() {
    return this.visible_
};
Blockly.Field.prototype.setVisible = function(a) {
    this.visible_ = a;
    this.getRootElement().style.display = a ? "block" : "none";
    this.render_()
};
Blockly.Field.prototype.getRootElement = function() {
    return this.fieldGroup_
};
Blockly.Field.prototype.render_ = function() {
    try {
        var a = this.textElement_.getComputedTextLength()
    } catch (b) {
        a = 8 * this.textElement_.childNodes[0].length
    }
    this.borderRect_ && this.borderRect_.setAttribute("width", a + Blockly.BlockSvg.SEP_SPACE_X);
    this.size_.width = a
};
Blockly.Field.prototype.getSize = function() {
    this.size_.width || this.render_();
    return this.size_
};
Blockly.Field.prototype.getText = function() {
    return this.text_
};
Blockly.Field.prototype.setText = function(a) {
    null !== a && a !== this.text_ && (this.text_ = a, this.updateTextNode_(), this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent()))
};
Blockly.Field.prototype.updateTextNode_ = function() {
    var a = this.text_;
    goog.dom.removeChildren(this.textElement_);
    a = a.replace(/\s/g, Blockly.Field.NBSP);
    Blockly.RTL && a && (a += "\u200f");
    a || (a = Blockly.Field.NBSP);
    a = document.createTextNode(a);
    this.textElement_.appendChild(a);
    this.size_.width = 0
};
Blockly.Field.prototype.getValue = function() {
    return this.getText()
};
Blockly.Field.prototype.setValue = function(a) {
    this.setText(a)
};
Blockly.Field.prototype.onMouseUp_ = function(a) {
    if (!goog.userAgent.IPHONE && !goog.userAgent.IPAD || 0 === a.layerX || 0 === a.layerY) Blockly.isRightButton(a) || 2 != Blockly.Block.dragMode_ && this.sourceBlock_.isEditable() && this.showEditor_()
};
Blockly.Field.prototype.setTooltip = function(a) {};
Blockly.Tooltip = {};
Blockly.Tooltip.visible = !1;
Blockly.Tooltip.LIMIT = 50;
Blockly.Tooltip.mouseOutPid_ = 0;
Blockly.Tooltip.showPid_ = 0;
Blockly.Tooltip.lastXY_ = {
    x: 0,
    y: 0
};
Blockly.Tooltip.element_ = null;
Blockly.Tooltip.poisonedElement_ = null;
Blockly.Tooltip.svgGroup_ = null;
Blockly.Tooltip.svgText_ = null;
Blockly.Tooltip.svgBackground_ = null;
Blockly.Tooltip.svgShadow_ = null;
Blockly.Tooltip.OFFSET_X = 0;
Blockly.Tooltip.OFFSET_Y = 10;
Blockly.Tooltip.RADIUS_OK = 10;
Blockly.Tooltip.HOVER_MS = 1E3;
Blockly.Tooltip.MARGINS = 5;
Blockly.Tooltip.createDom = function() {
    var a = Blockly.createSvgElement("g", {
        "class": "blocklyHidden"
    }, null);
    Blockly.Tooltip.svgGroup_ = a;
    Blockly.Tooltip.svgShadow_ = Blockly.createSvgElement("rect", {
        "class": "blocklyTooltipShadow",
        x: 2,
        y: 2
    }, a);
    Blockly.Tooltip.svgBackground_ = Blockly.createSvgElement("rect", {
        "class": "blocklyTooltipBackground"
    }, a);
    Blockly.Tooltip.svgText_ = Blockly.createSvgElement("text", {
        "class": "blocklyTooltipText"
    }, a);
    return a
};
Blockly.Tooltip.bindMouseEvents = function(a) {
    Blockly.bindEvent_(a, "mouseover", null, Blockly.Tooltip.onMouseOver_);
    Blockly.bindEvent_(a, "mouseout", null, Blockly.Tooltip.onMouseOut_);
    Blockly.bindEvent_(a, "mousemove", null, Blockly.Tooltip.onMouseMove_)
};
Blockly.Tooltip.onMouseOver_ = function(a) {
    for (a = a.target; !goog.isString(a.tooltip) && !goog.isFunction(a.tooltip);) a = a.tooltip;
    Blockly.Tooltip.element_ != a && (Blockly.Tooltip.hide(), Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.element_ = a);
    window.clearTimeout(Blockly.Tooltip.mouseOutPid_)
};
Blockly.Tooltip.onMouseOut_ = function(a) {
    Blockly.Tooltip.mouseOutPid_ = window.setTimeout(function() {
        Blockly.Tooltip.element_ = null;
        Blockly.Tooltip.poisonedElement_ = null;
        Blockly.Tooltip.hide()
    }, 1);
    window.clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.onMouseMove_ = function(a) {
    Blockly.Tooltip.element_ && Blockly.Tooltip.element_.tooltip && 0 == Blockly.Block.dragMode_ && !Blockly.WidgetDiv.isVisible() && (Blockly.Tooltip.visible ? (a = Blockly.mouseToSvg(a), Math.sqrt(Math.pow(Blockly.Tooltip.lastXY_.x - a.x, 2) + Math.pow(Blockly.Tooltip.lastXY_.y - a.y, 2)) > Blockly.Tooltip.RADIUS_OK && Blockly.Tooltip.hide()) : Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_ && (window.clearTimeout(Blockly.Tooltip.showPid_), Blockly.Tooltip.lastXY_ = Blockly.mouseToSvg(a),
        Blockly.Tooltip.showPid_ = window.setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS)))
};
Blockly.Tooltip.hide = function() {
    Blockly.Tooltip.visible && (Blockly.Tooltip.visible = !1, Blockly.Tooltip.svgGroup_ && (Blockly.Tooltip.svgGroup_.style.display = "none"));
    window.clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.show_ = function() {
    Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
    if (Blockly.Tooltip.svgGroup_) {
        goog.dom.removeChildren(Blockly.Tooltip.svgText_);
        var a = Blockly.Tooltip.element_.tooltip;
        goog.isFunction(a) && (a = a());
        for (var a = Blockly.Tooltip.wrap_(a, Blockly.Tooltip.LIMIT), a = a.split("\n"), b = 0; b < a.length; b++) {
            var c = Blockly.createSvgElement("tspan", {
                    dy: "1em",
                    x: Blockly.Tooltip.MARGINS
                }, Blockly.Tooltip.svgText_),
                d = document.createTextNode(a[b]);
            c.appendChild(d)
        }
        Blockly.Tooltip.visible = !0;
        Blockly.Tooltip.svgGroup_.style.display = "block";
        a = Blockly.Tooltip.svgText_.getBBox();
        b = 2 * Blockly.Tooltip.MARGINS + a.width;
        c = a.height;
        Blockly.Tooltip.svgBackground_.setAttribute("width", b);
        Blockly.Tooltip.svgBackground_.setAttribute("height", c);
        Blockly.Tooltip.svgShadow_.setAttribute("width", b);
        Blockly.Tooltip.svgShadow_.setAttribute("height", c);
        if (Blockly.RTL)
            for (var c = a.width, d = 0, e; e = Blockly.Tooltip.svgText_.childNodes[d]; d++) e.setAttribute("text-anchor", "end"), e.setAttribute("x", c + Blockly.Tooltip.MARGINS);
        c = Blockly.Tooltip.lastXY_.x;
        c = Blockly.RTL ? c - (Blockly.Tooltip.OFFSET_X + b) : c + Blockly.Tooltip.OFFSET_X;
        b = Blockly.Tooltip.lastXY_.y + Blockly.Tooltip.OFFSET_Y;
        d = Blockly.svgSize();
        b + a.height > d.height && (b -= a.height + 2 * Blockly.Tooltip.OFFSET_Y);
        Blockly.RTL ? c = Math.max(Blockly.Tooltip.MARGINS, c) : c + a.width > d.width - 2 * Blockly.Tooltip.MARGINS && (c = d.width - a.width - 2 * Blockly.Tooltip.MARGINS);
        Blockly.Tooltip.svgGroup_.setAttribute("transform", "translate(" + c + "," + b + ")")
    }
};
Blockly.Tooltip.wrap_ = function(a, b) {
    if (a.length <= b) return a;
    for (var c = a.trim().split(/\s+/), d = 0; d < c.length; d++) c[d].length > b && (b = c[d].length);
    var e, d = -Infinity,
        f, g = 1;
    do {
        e = d;
        f = a;
        for (var h = [], k = c.length / g, l = 1, d = 0; d < c.length - 1; d++) l < (d + 1.5) / k ? (l++, h[d] = !0) : h[d] = !1;
        h = Blockly.Tooltip.wrapMutate_(c, h, b);
        d = Blockly.Tooltip.wrapScore_(c, h, b);
        a = Blockly.Tooltip.wrapToText_(c, h);
        g++
    } while (d > e);
    return f
};
Blockly.Tooltip.wrapScore_ = function(a, b, c) {
    for (var d = [0], e = [], f = 0; f < a.length; f++) d[d.length - 1] += a[f].length, !0 === b[f] ? (d.push(0), e.push(a[f].charAt(a[f].length - 1))) : !1 === b[f] && d[d.length - 1]++;
    a = Math.max.apply(Math, d);
    for (f = b = 0; f < d.length; f++) b -= 2 * Math.pow(Math.abs(c - d[f]), 1.5), b -= Math.pow(a - d[f], 1.5), -1 != ".?!".indexOf(e[f]) ? b += c / 3 : -1 != ",;)]}".indexOf(e[f]) && (b += c / 4);
    1 < d.length && d[d.length - 1] <= d[d.length - 2] && (b += .5);
    return b
};
Blockly.Tooltip.wrapMutate_ = function(a, b, c) {
    for (var d = Blockly.Tooltip.wrapScore_(a, b, c), e, f = 0; f < b.length - 1; f++)
        if (b[f] != b[f + 1]) {
            var g = [].concat(b);
            g[f] = !g[f];
            g[f + 1] = !g[f + 1];
            var h = Blockly.Tooltip.wrapScore_(a, g, c);
            h > d && (d = h, e = g)
        }
    return e ? Blockly.Tooltip.wrapMutate_(a, e, c) : b
};
Blockly.Tooltip.wrapToText_ = function(a, b) {
    for (var c = [], d = 0; d < a.length; d++) c.push(a[d]), void 0 !== b[d] && c.push(b[d] ? "\n" : " ");
    return c.join("")
};
Blockly.FieldLabel = function(a) {
    this.sourceBlock_ = null;
    this.textElement_ = Blockly.createSvgElement("text", {
        "class": "blocklyText"
    }, null);
    this.size_ = {
        height: 25,
        width: 0
    };
    this.setText(a)
};
goog.inherits(Blockly.FieldLabel, Blockly.Field);
Blockly.FieldLabel.prototype.clone = function() {
    return new Blockly.FieldLabel(this.getText())
};
Blockly.FieldLabel.prototype.EDITABLE = !1;
Blockly.FieldLabel.prototype.init = function(a) {
    if (this.sourceBlock_) throw "Text has already been initialized once.";
    this.sourceBlock_ = a;
    a.getSvgRoot().appendChild(this.textElement_);
    this.textElement_.tooltip = this.sourceBlock_;
    Blockly.Tooltip.bindMouseEvents(this.textElement_)
};
Blockly.FieldLabel.prototype.dispose = function() {
    goog.dom.removeNode(this.textElement_);
    this.textElement_ = null
};
Blockly.FieldLabel.prototype.getRootElement = function() {
    return this.textElement_
};
Blockly.FieldLabel.prototype.setTooltip = function(a) {
    this.textElement_.tooltip = a
};
Blockly.Input = function(a, b, c, d) {
    this.type = a;
    this.name = b;
    this.sourceBlock_ = c;
    this.connection = d;
    this.fieldRow = [];
    this.align = Blockly.ALIGN_LEFT;
    this.visible_ = !0
};
Blockly.Input.prototype.appendField = function(a, b) {
    if (!a && !b) return this;
    goog.isString(a) && (a = new Blockly.FieldLabel(a));
    this.sourceBlock_.svg_ && a.init(this.sourceBlock_);
    a.name = b;
    a.prefixField && this.appendField(a.prefixField);
    this.fieldRow.push(a);
    a.suffixField && this.appendField(a.suffixField);
    this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_());
    return this
};
Blockly.Input.prototype.appendTitle = function(a, b) {
    console.log("Deprecated call to appendTitle, use appendField instead.");
    return this.appendField(a, b)
};
Blockly.Input.prototype.removeField = function(a) {
    for (var b = 0, c; c = this.fieldRow[b]; b++)
        if (c.name === a) {
            c.dispose();
            this.fieldRow.splice(b, 1);
            this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_());
            return
        }
    goog.asserts.fail('Field "%s" not found.', a)
};
Blockly.Input.prototype.isVisible = function() {
    return this.visible_
};
Blockly.Input.prototype.setVisible = function(a) {
    var b = [];
    if (this.visible_ == a) return b;
    for (var c = (this.visible_ = a) ? "block" : "none", d = 0, e; e = this.fieldRow[d]; d++) e.setVisible(a);
    this.connection && (a ? b = this.connection.unhideAll() : this.connection.hideAll(), d = this.connection.targetBlock()) && (d.svg_.getRootElement().style.display = c, a || (d.rendered = !1));
    return b
};
Blockly.Input.prototype.setCheck = function(a) {
    if (!this.connection) throw "This input does not have a connection.";
    this.connection.setCheck(a);
    return this
};
Blockly.Input.prototype.setAlign = function(a) {
    this.align = a;
    this.sourceBlock_.rendered && this.sourceBlock_.render();
    return this
};
Blockly.Input.prototype.init = function() {
    for (var a = 0; a < this.fieldRow.length; a++) this.fieldRow[a].init(this.sourceBlock_)
};
Blockly.Input.prototype.dispose = function() {
    for (var a = 0, b; b = this.fieldRow[a]; a++) b.dispose();
    this.connection && this.connection.dispose();
    this.sourceBlock_ = null
};
Blockly.Msg = {};
Blockly.Mutator = function(a) {
    Blockly.Mutator.superClass_.constructor.call(this, null);
    this.quarkXml_ = [];
    for (var b = 0; b < a.length; b++) {
        var c = goog.dom.createDom("block", {
            type: a[b]
        });
        this.quarkXml_[b] = c
    }
};
goog.inherits(Blockly.Mutator, Blockly.Icon);
Blockly.Mutator.prototype.workspaceWidth_ = 0;
Blockly.Mutator.prototype.workspaceHeight_ = 0;
Blockly.Mutator.prototype.createIcon = function() {
    Blockly.Icon.prototype.createIcon_.call(this);
    var a = Blockly.Icon.RADIUS / 2;
    Blockly.createSvgElement("rect", {
        "class": "blocklyIconShield",
        width: 4 * a,
        height: 4 * a,
        rx: a,
        ry: a
    }, this.iconGroup_);
    this.iconMark_ = Blockly.createSvgElement("text", {
        "class": "blocklyIconMark",
        x: Blockly.Icon.RADIUS,
        y: 2 * Blockly.Icon.RADIUS - 4
    }, this.iconGroup_);
    this.iconMark_.appendChild(document.createTextNode("\u2699"))
};
Blockly.Mutator.prototype.iconClick_ = function(a) {
    this.block_.isEditable() && Blockly.Icon.prototype.iconClick_.call(this, a)
};
Blockly.Mutator.prototype.createEditor_ = function() {
    this.svgDialog_ = Blockly.createSvgElement("svg", {
        x: Blockly.Bubble.BORDER_WIDTH,
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    Blockly.createSvgElement("rect", {
        "class": "blocklyMutatorBackground",
        height: "100%",
        width: "100%"
    }, this.svgDialog_);
    var a = this;
    this.workspace_ = new Blockly.Workspace(function() {
        return a.getFlyoutMetrics_()
    }, null);
    this.flyout_ = new Blockly.Flyout;
    this.flyout_.autoClose = !1;
    this.svgDialog_.appendChild(this.flyout_.createDom());
    this.svgDialog_.appendChild(this.workspace_.createDom());
    return this.svgDialog_
};
Blockly.Mutator.prototype.updateEditable = function() {
    this.block_.isEditable() ? Blockly.Icon.prototype.updateEditable.call(this) : (this.setVisible(!1), Blockly.removeClass_(this.iconGroup_, "blocklyIconGroup"))
};
Blockly.Mutator.prototype.resizeBubble_ = function() {
    var a = 2 * Blockly.Bubble.BORDER_WIDTH,
        b = this.workspace_.getCanvas().getBBox(),
        c = this.flyout_.getMetrics_(),
        d;
    d = Blockly.RTL ? -b.x : b.width + b.x;
    b = Math.max(b.height + 3 * a, c.contentHeight + 20);
    d += 3 * a;
    if (Math.abs(this.workspaceWidth_ - d) > a || Math.abs(this.workspaceHeight_ - b) > a) this.workspaceWidth_ = d, this.workspaceHeight_ = b, this.bubble_.setBubbleSize(d + a, b + a), this.svgDialog_.setAttribute("width", this.workspaceWidth_), this.svgDialog_.setAttribute("height", this.workspaceHeight_);
    Blockly.RTL && (a = "translate(" + this.workspaceWidth_ + ",0)", this.workspace_.getCanvas().setAttribute("transform", a))
};
Blockly.Mutator.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (a) {
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.svg_.svgPath_, this.iconX_, this.iconY_, null, null);
            var b = this;
            this.flyout_.init(this.workspace_);
            this.flyout_.show(this.quarkXml_);
            this.rootBlock_ = this.block_.decompose(this.workspace_);
            a = this.rootBlock_.getDescendants();
            for (var c = 0, d; d = a[c]; c++) d.render();
            this.rootBlock_.setMovable(!1);
            this.rootBlock_.setDeletable(!1);
            a = 2 * this.flyout_.CORNER_RADIUS;
            c = this.flyout_.width_ + a;
            Blockly.RTL && (c = -c);
            this.rootBlock_.moveBy(c, a);
            this.block_.saveConnections && (this.block_.saveConnections(this.rootBlock_), this.sourceListener_ = Blockly.bindEvent_(this.block_.workspace.getCanvas(), "blocklyWorkspaceChange", this.block_, function() {
                b.block_.saveConnections(b.rootBlock_)
            }));
            this.resizeBubble_();
            Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this.block_, function() {
                b.workspaceChanged_()
            });
            this.updateColour()
        } else this.svgDialog_ = null, this.flyout_.dispose(),
            this.flyout_ = null, this.workspace_.dispose(), this.rootBlock_ = this.workspace_ = null, this.bubble_.dispose(), this.bubble_ = null, this.workspaceHeight_ = this.workspaceWidth_ = 0, this.sourceListener_ && (Blockly.unbindEvent_(this.sourceListener_), this.sourceListener_ = null)
};
Blockly.Mutator.prototype.workspaceChanged_ = function() {
    if (0 == Blockly.Block.dragMode_)
        for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++) {
            var d = c.getRelativeToSurfaceXY(),
                e = c.getHeightWidth();
            c.isDeletable() && (Blockly.RTL ? d.x > -this.flyout_.width_ + 20 : d.x < this.flyout_.width_ - 20) ? c.dispose(!1, !0) : 20 > d.y + e.height && c.moveBy(0, 20 - e.height - d.y)
        }
    this.rootBlock_.workspace == this.workspace_ && (a = this.block_.rendered, this.block_.rendered = !1, this.block_.compose(this.rootBlock_), this.block_.rendered = a, this.block_.rendered &&
        this.block_.render(), this.resizeBubble_(), this.block_.workspace.fireChangeEvent())
};
Blockly.Mutator.prototype.getFlyoutMetrics_ = function() {
    var a = 0;
    Blockly.RTL && (a += this.workspaceWidth_);
    return {
        viewHeight: this.workspaceHeight_,
        viewWidth: 0,
        absoluteTop: 0,
        absoluteLeft: a
    }
};
Blockly.Mutator.prototype.dispose = function() {
    this.block_.mutator = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Warning = function(a) {
    Blockly.Warning.superClass_.constructor.call(this, a);
    this.createIcon_()
};
goog.inherits(Blockly.Warning, Blockly.Icon);
Blockly.Warning.textToDom_ = function(a) {
    var b = Blockly.createSvgElement("text", {
        "class": "blocklyText blocklyBubbleText",
        y: Blockly.Bubble.BORDER_WIDTH
    }, null);
    a = a.split("\n");
    for (var c = 0; c < a.length; c++) {
        var d = Blockly.createSvgElement("tspan", {
                dy: "1em",
                x: Blockly.Bubble.BORDER_WIDTH
            }, b),
            e = document.createTextNode(a[c]);
        d.appendChild(e)
    }
    return b
};
Blockly.Warning.prototype.text_ = "";
Blockly.Warning.prototype.createIcon_ = function() {
    Blockly.Icon.prototype.createIcon_.call(this);
    Blockly.createSvgElement("path", {
        "class": "blocklyIconShield",
        d: "M 2,15 Q -1,15 0.5,12 L 6.5,1.7 Q 8,-1 9.5,1.7 L 15.5,12 Q 17,15 14,15 z"
    }, this.iconGroup_);
    this.iconMark_ = Blockly.createSvgElement("text", {
        "class": "blocklyIconMark",
        x: Blockly.Icon.RADIUS,
        y: 2 * Blockly.Icon.RADIUS - 3
    }, this.iconGroup_);
    this.iconMark_.appendChild(document.createTextNode("!"))
};
Blockly.Warning.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (a) {
            a = Blockly.Warning.textToDom_(this.text_);
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, a, this.block_.svg_.svgPath_, this.iconX_, this.iconY_, null, null);
            if (Blockly.RTL)
                for (var b = a.getBBox().width, c = 0, d; d = a.childNodes[c]; c++) d.setAttribute("text-anchor", "end"), d.setAttribute("x", b + Blockly.Bubble.BORDER_WIDTH);
            this.updateColour();
            a = this.bubble_.getBubbleSize();
            this.bubble_.setBubbleSize(a.width, a.height)
        } else this.bubble_.dispose(),
            this.body_ = this.bubble_ = null
};
Blockly.Warning.prototype.bodyFocus_ = function(a) {
    this.bubble_.promote_()
};
Blockly.Warning.prototype.setText = function(a) {
    this.text_ != a && (this.text_ = a, this.isVisible() && (this.setVisible(!1), this.setVisible(!0)))
};
Blockly.Warning.prototype.dispose = function() {
    this.block_.warning = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.uidCounter_ = 0;
Blockly.getUidCounter = function() {
    return Blockly.uidCounter_
};
Blockly.setUidCounter = function(a) {
    Blockly.uidCounter_ = a
};
Blockly.genUid = function() {
    var a = (++Blockly.uidCounter_).toString();
    return Blockly.Realtime.isEnabled() ? Blockly.Realtime.genUid(a) : a
};
Blockly.Block = function() {
    goog.asserts.assert(0 == arguments.length, "Please use Blockly.Block.obtain.")
};
Blockly.Block.obtain = function(a, b) {
    if (Blockly.Realtime.isEnabled()) return Blockly.Realtime.obtainBlock(a, b);
    var c = new Blockly.Block;
    c.initialize(a, b);
    return c
};
Blockly.Block.prototype.initialize = function(a, b) {
    this.id = Blockly.genUid();
    a.addTopBlock(this);
    this.fill(a, b);
    goog.isFunction(this.onchange) && Blockly.bindEvent_(a.getCanvas(), "blocklyWorkspaceChange", this, this.onchange)
};
Blockly.Block.prototype.fill = function(a, b) {
    this.previousConnection = this.nextConnection = this.outputConnection = null;
    this.inputList = [];
    this.disabled = this.rendered = this.inputsInline = !1;
    this.tooltip = "";
    this.contextMenu = !0;
    this.parentBlock_ = null;
    this.childBlocks_ = [];
    this.editable_ = this.movable_ = this.deletable_ = !0;
    this.collapsed_ = !1;
    this.workspace = a;
    this.isInFlyout = a.isFlyout;
    if (b) {
        this.type = b;
        var c = Blockly.Blocks[b];
        goog.asserts.assertObject(c, 'Error: "%s" is an unknown language block.', b);
        goog.mixin(this,
            c)
    }
    goog.isFunction(this.init) && this.init()
};
Blockly.Block.getById = function(a, b) {
    return Blockly.Realtime.isEnabled() ? Blockly.Realtime.getBlockById(a) : b.getBlockById(a)
};
Blockly.Block.prototype.svg_ = null;
Blockly.Block.prototype.mutator = null;
Blockly.Block.prototype.comment = null;
Blockly.Block.prototype.warning = null;
Blockly.Block.prototype.getIcons = function() {
    var a = [];
    this.mutator && a.push(this.mutator);
    this.comment && a.push(this.comment);
    this.warning && a.push(this.warning);
    return a
};
Blockly.Block.prototype.initSvg = function() {
    this.svg_ = new Blockly.BlockSvg(this);
    this.svg_.init();
    Blockly.readOnly || Blockly.bindEvent_(this.svg_.getRootElement(), "mousedown", this, this.onMouseDown_);
    this.workspace.getCanvas().appendChild(this.svg_.getRootElement())
};
Blockly.Block.prototype.getSvgRoot = function() {
    return this.svg_ && this.svg_.getRootElement()
};
Blockly.Block.dragMode_ = 0;
Blockly.Block.onMouseUpWrapper_ = null;
Blockly.Block.onMouseMoveWrapper_ = null;
Blockly.Block.terminateDrag_ = function() {
    Blockly.Block.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Block.onMouseUpWrapper_), Blockly.Block.onMouseUpWrapper_ = null);
    Blockly.Block.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Block.onMouseMoveWrapper_), Blockly.Block.onMouseMoveWrapper_ = null);
    var a = Blockly.selected;
    if (2 == Blockly.Block.dragMode_ && a) {
        var b = a.getRelativeToSurfaceXY();
        a.moveConnections_(b.x - a.startDragX, b.y - a.startDragY);
        delete a.draggedBubbles_;
        a.setDragging_(!1);
        a.render();
        goog.Timer.callOnce(a.bumpNeighbours_,
            Blockly.BUMP_DELAY, a);
        Blockly.fireUiEvent(window, "resize")
    }
    a && a.workspace.fireChangeEvent();
    Blockly.Block.dragMode_ = 0
};
Blockly.Block.prototype.select = function() {
    goog.asserts.assertObject(this.svg_, "Block is not rendered.");
    Blockly.selected && Blockly.selected.unselect();
    Blockly.selected = this;
    this.svg_.addSelect();
    Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.Block.prototype.unselect = function() {
    goog.asserts.assertObject(this.svg_, "Block is not rendered.");
    Blockly.selected = null;
    this.svg_.removeSelect();
    Blockly.fireUiEvent(this.workspace.getCanvas(), "blocklySelectChange")
};
Blockly.Block.prototype.dispose = function(a, b, c) {
    this.rendered = !1;
    this.unplug(a, !1);
    b && this.svg_ && this.svg_.disposeUiEffect();
    this.workspace && !c && (this.workspace.removeTopBlock(this), this.workspace = null);
    Blockly.selected == this && (Blockly.selected = null, Blockly.terminateDrag_());
    Blockly.ContextMenu.currentBlock == this && Blockly.ContextMenu.hide();
    for (a = this.childBlocks_.length - 1; 0 <= a; a--) this.childBlocks_[a].dispose(!1);
    b = this.getIcons();
    for (a = 0; a < b.length; a++) b[a].dispose();
    for (a = 0; b = this.inputList[a]; a++) b.dispose();
    this.inputList = [];
    b = this.getConnections_(!0);
    for (a = 0; a < b.length; a++) c = b[a], c.targetConnection && c.disconnect(), b[a].dispose();
    this.svg_ && (this.svg_.dispose(), this.svg_ = null);
    Blockly.Realtime.isEnabled() && !Blockly.Realtime.withinSync && Blockly.Realtime.removeBlock(this)
};
Blockly.Block.prototype.unplug = function(a, b) {
    b = b && !!this.getParent();
    if (this.outputConnection) this.outputConnection.targetConnection && this.setParent(null);
    else {
        var c = null;
        this.previousConnection && this.previousConnection.targetConnection && (c = this.previousConnection.targetConnection, this.setParent(null));
        var d = this.getNextBlock();
        if (a && d) {
            var e = this.nextConnection.targetConnection;
            d.setParent(null);
            c && c.connect(e)
        }
    }
    b && this.moveBy(Blockly.SNAP_RADIUS * (Blockly.RTL ? -1 : 1), 2 * Blockly.SNAP_RADIUS)
};
Blockly.Block.prototype.getRelativeToSurfaceXY = function() {
    var a = 0,
        b = 0;
    if (this.svg_) {
        var c = this.svg_.getRootElement();
        do var d = Blockly.getRelativeXY_(c),
            a = a + d.x,
            b = b + d.y,
            c = c.parentNode; while (c && c != this.workspace.getCanvas())
    }
    return {
        x: a,
        y: b
    }
};
Blockly.Block.prototype.moveBy = function(a, b) {
    var c = this.getRelativeToSurfaceXY();
    this.svg_.getRootElement().setAttribute("transform", "translate(" + (c.x + a) + ", " + (c.y + b) + ")");
    this.moveConnections_(a, b);
    Blockly.Realtime.blockChanged(this)
};
Blockly.Block.prototype.getHeightWidth = function() {
    var a = this.svg_.height,
        b = this.svg_.width,
        c = this.getNextBlock();
    c && (c = c.getHeightWidth(), a += c.height - 4, b = Math.max(b, c.width));
    return {
        height: a,
        width: b
    }
};
Blockly.Block.prototype.onMouseDown_ = function(a) {
    if (!this.isInFlyout) {
        Blockly.svgResize();
        Blockly.terminateDrag_();
        this.select();
        Blockly.hideChaff();
        if (Blockly.isRightButton(a)) this.showContextMenu_(a);
        else if (this.isMovable()) {
            Blockly.removeAllRanges();
            Blockly.setCursorHand_(!0);
            var b = this.getRelativeToSurfaceXY();
            this.startDragX = b.x;
            this.startDragY = b.y;
            this.startDragMouseX = a.clientX;
            this.startDragMouseY = a.clientY;
            Blockly.Block.dragMode_ = 1;
            Blockly.Block.onMouseUpWrapper_ = Blockly.bindEvent_(document,
                "mouseup", this, this.onMouseUp_);
            Blockly.Block.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMove_);
            this.draggedBubbles_ = [];
            for (var b = this.getDescendants(), c = 0, d; d = b[c]; c++) {
                d = d.getIcons();
                for (var e = 0; e < d.length; e++) {
                    var f = d[e].getIconLocation();
                    f.bubble = d[e];
                    this.draggedBubbles_.push(f)
                }
            }
        } else return;
        a.stopPropagation()
    }
};
Blockly.Block.prototype.onMouseUp_ = function(a) {
    var b = this;
    Blockly.doCommand(function() {
        Blockly.terminateDrag_();
        if (Blockly.selected && Blockly.highlightedConnection_) Blockly.localConnection_.connect(Blockly.highlightedConnection_), b.svg_ && (Blockly.localConnection_.isSuperior() ? Blockly.highlightedConnection_ : Blockly.localConnection_).sourceBlock_.svg_.connectionUiEffect(), b.workspace.trashcan && b.workspace.trashcan.isOpen && b.workspace.trashcan.close();
        else if (b.workspace.trashcan && b.workspace.trashcan.isOpen) {
            var a =
                b.workspace.trashcan;
            goog.Timer.callOnce(a.close, 100, a);
            Blockly.selected.dispose(!1, !0);
            Blockly.fireUiEvent(window, "resize")
        }
        Blockly.highlightedConnection_ && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null)
    })
};
Blockly.Block.prototype.showHelp_ = function() {
    var a = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
    a && window.open(a)
};
Blockly.Block.prototype.duplicate_ = function() {
    var a = Blockly.Xml.blockToDom_(this);
    Blockly.Xml.deleteNext(a);
    var a = Blockly.Xml.domToBlock(this.workspace, a),
        b = this.getRelativeToSurfaceXY();
    b.x = Blockly.RTL ? b.x - Blockly.SNAP_RADIUS : b.x + Blockly.SNAP_RADIUS;
    b.y += 2 * Blockly.SNAP_RADIUS;
    a.moveBy(b.x, b.y);
    a.select();
    return a
};
Blockly.Block.prototype.showContextMenu_ = function(a) {
    if (!Blockly.readOnly && this.contextMenu) {
        var b = this,
            c = [];
        if (this.isDeletable() && this.isMovable() && !b.isInFlyout) {
            var d = {
                text: Blockly.Msg.DUPLICATE_BLOCK,
                enabled: !0,
                callback: function() {
                    b.duplicate_()
                }
            };
            this.getDescendants().length > this.workspace.remainingCapacity() && (d.enabled = !1);
            c.push(d);
            this.isEditable() && !this.collapsed_ && Blockly.comments && (d = {
                    enabled: !0
                }, this.comment ? (d.text = Blockly.Msg.REMOVE_COMMENT, d.callback = function() {
                    b.setCommentText(null)
                }) :
                (d.text = Blockly.Msg.ADD_COMMENT, d.callback = function() {
                    b.setCommentText("")
                }), c.push(d));
            if (!this.collapsed_)
                for (d = 0; d < this.inputList.length; d++)
                    if (this.inputList[d].type == Blockly.INPUT_VALUE) {
                        d = {
                            enabled: !0
                        };
                        d.text = this.inputsInline ? Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
                        d.callback = function() {
                            b.setInputsInline(!b.inputsInline)
                        };
                        c.push(d);
                        break
                    }
            Blockly.collapse && (this.collapsed_ ? (d = {
                enabled: !0
            }, d.text = Blockly.Msg.EXPAND_BLOCK, d.callback = function() {
                b.setCollapsed(!1)
            }) : (d = {
                    enabled: !0
                },
                d.text = Blockly.Msg.COLLAPSE_BLOCK, d.callback = function() {
                    b.setCollapsed(!0)
                }), c.push(d));
            Blockly.disable && (d = {
                text: this.disabled ? Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK,
                enabled: !this.getInheritedDisabled(),
                callback: function() {
                    b.setDisabled(!b.disabled)
                }
            }, c.push(d));
            var d = this.getDescendants().length,
                e = this.getNextBlock();
            e && (d -= e.getDescendants().length);
            d = {
                text: 1 == d ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(d)),
                enabled: !0,
                callback: function() {
                    b.dispose(!0, !0)
                }
            };
            c.push(d)
        }
        d = {
            enabled: !(goog.isFunction(this.helpUrl) ? !this.helpUrl() : !this.helpUrl)
        };
        d.text = Blockly.Msg.HELP;
        d.callback = function() {
            b.showHelp_()
        };
        c.push(d);
        this.customContextMenu && !b.isInFlyout && this.customContextMenu(c);
        Blockly.ContextMenu.show(a, c);
        Blockly.ContextMenu.currentBlock = this
    }
};
Blockly.Block.prototype.getConnections_ = function(a) {
    var b = [];
    if (a || this.rendered)
        if (this.outputConnection && b.push(this.outputConnection), this.nextConnection && b.push(this.nextConnection), this.previousConnection && b.push(this.previousConnection), a || !this.collapsed_) {
            a = 0;
            for (var c; c = this.inputList[a]; a++) c.connection && b.push(c.connection)
        }
    return b
};
Blockly.Block.prototype.moveConnections_ = function(a, b) {
    if (this.rendered) {
        for (var c = this.getConnections_(!1), d = 0; d < c.length; d++) c[d].moveBy(a, b);
        c = this.getIcons();
        for (d = 0; d < c.length; d++) c[d].computeIconLocation();
        for (d = 0; d < this.childBlocks_.length; d++) this.childBlocks_[d].moveConnections_(a, b)
    }
};
Blockly.Block.prototype.setDragging_ = function(a) {
    a ? this.svg_.addDragging() : this.svg_.removeDragging();
    for (var b = 0; b < this.childBlocks_.length; b++) this.childBlocks_[b].setDragging_(a)
};
Blockly.Block.prototype.onMouseMove_ = function(a) {
    var b = this;
    Blockly.doCommand(function() {
        if (!("mousemove" == a.type && 1 >= a.clientX && 0 == a.clientY && 0 == a.button)) {
            Blockly.removeAllRanges();
            var c = a.clientX - b.startDragMouseX,
                d = a.clientY - b.startDragMouseY;
            1 == Blockly.Block.dragMode_ && Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2)) > Blockly.DRAG_RADIUS && (Blockly.Block.dragMode_ = 2, b.setParent(null), b.setDragging_(!0));
            if (2 == Blockly.Block.dragMode_) {
                var e = b.startDragX + c,
                    f = b.startDragY + d;
                b.svg_.getRootElement().setAttribute("transform",
                    "translate(" + e + ", " + f + ")");
                for (e = 0; e < b.draggedBubbles_.length; e++) f = b.draggedBubbles_[e], f.bubble.setIconLocation(f.x + c, f.y + d);
                for (var f = b.getConnections_(!1), g = null, h = null, k = Blockly.SNAP_RADIUS, e = 0; e < f.length; e++) {
                    var l = f[e],
                        p = l.closest(k, c, d);
                    p.connection && (g = p.connection, h = l, k = p.radius)
                }
                Blockly.highlightedConnection_ && Blockly.highlightedConnection_ != g && (Blockly.highlightedConnection_.unhighlight(), Blockly.highlightedConnection_ = null, Blockly.localConnection_ = null);
                g && g != Blockly.highlightedConnection_ &&
                    (g.highlight(), Blockly.highlightedConnection_ = g, Blockly.localConnection_ = h);
                if (b.workspace.trashcan && b.isDeletable()) b.workspace.trashcan.onMouseMove(a)
            }
        }
        a.stopPropagation()
    })
};
Blockly.Block.prototype.bumpNeighbours_ = function() {
    if (0 == Blockly.Block.dragMode_) {
        var a = this.getRootBlock();
        if (!a.isInFlyout)
            for (var b = this.getConnections_(!1), c = 0; c < b.length; c++) {
                var d = b[c];
                d.targetConnection && d.isSuperior() && d.targetBlock().bumpNeighbours_();
                for (var e = d.neighbours_(Blockly.SNAP_RADIUS), f = 0; f < e.length; f++) {
                    var g = e[f];
                    d.targetConnection && g.targetConnection || g.sourceBlock_.getRootBlock() != a && (d.isSuperior() ? g.bumpAwayFrom_(d) : d.bumpAwayFrom_(g))
                }
            }
    }
};
Blockly.Block.prototype.getParent = function() {
    return this.parentBlock_
};
Blockly.Block.prototype.getSurroundParent = function() {
    for (var a = this;;) {
        do {
            var b = a,
                a = a.getParent();
            if (!a) return null
        } while (a.getNextBlock() == b);
        return a
    }
};
Blockly.Block.prototype.getNextBlock = function() {
    return this.nextConnection && this.nextConnection.targetBlock()
};
Blockly.Block.prototype.getRootBlock = function() {
    var a, b = this;
    do a = b, b = a.parentBlock_; while (b);
    return a
};
Blockly.Block.prototype.getChildren = function() {
    return this.childBlocks_
};
Blockly.Block.prototype.setParent = function(a) {
    if (this.parentBlock_) {
        for (var b = this.parentBlock_.childBlocks_, c, d = 0; c = b[d]; d++)
            if (c == this) {
                b.splice(d, 1);
                break
            }
        b = this.getRelativeToSurfaceXY();
        this.workspace.getCanvas().appendChild(this.svg_.getRootElement());
        this.svg_.getRootElement().setAttribute("transform", "translate(" + b.x + ", " + b.y + ")");
        this.parentBlock_ = null;
        this.previousConnection && this.previousConnection.targetConnection && this.previousConnection.disconnect();
        this.outputConnection && this.outputConnection.targetConnection &&
            this.outputConnection.disconnect()
    } else goog.array.contains(this.workspace.getTopBlocks(!1), this) && this.workspace.removeTopBlock(this);
    (this.parentBlock_ = a) ? (a.childBlocks_.push(this), b = this.getRelativeToSurfaceXY(), a.svg_ && this.svg_ && a.svg_.getRootElement().appendChild(this.svg_.getRootElement()), a = this.getRelativeToSurfaceXY(), this.moveConnections_(a.x - b.x, a.y - b.y)) : this.workspace.addTopBlock(this)
};
Blockly.Block.prototype.getDescendants = function() {
    for (var a = [this], b, c = 0; b = this.childBlocks_[c]; c++) a.push.apply(a, b.getDescendants());
    return a
};
Blockly.Block.prototype.isDeletable = function() {
    return this.deletable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setDeletable = function(a) {
    this.deletable_ = a;
    this.svg_ && this.svg_.updateMovable()
};
Blockly.Block.prototype.isMovable = function() {
    return this.movable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setMovable = function(a) {
    this.movable_ = a
};
Blockly.Block.prototype.isEditable = function() {
    return this.editable_ && !Blockly.readOnly
};
Blockly.Block.prototype.setEditable = function(a) {
    this.editable_ = a;
    a = 0;
    for (var b; b = this.inputList[a]; a++)
        for (var c = 0, d; d = b.fieldRow[c]; c++) d.updateEditable();
    b = this.getIcons();
    for (a = 0; a < b.length; a++) b[a].updateEditable()
};
Blockly.Block.prototype.setHelpUrl = function(a) {
    this.helpUrl = a
};
Blockly.Block.prototype.getColour = function() {
    return this.colourHex_
};
Blockly.Block.prototype.setColour = function(a) {
    a instanceof Number && (a = "#DDD");
    this.colourHex_ = a;
    this.svg_ && this.svg_.updateColour();
    var b = this.getIcons();
    for (a = 0; a < b.length; a++) b[a].updateColour();
    if (this.rendered) {
        for (a = 0; b = this.inputList[a]; a++)
            for (var c = 0, d; d = b.fieldRow[c]; c++) d.setText(null);
        this.render()
    }
};
Blockly.Block.prototype.getField_ = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++)
            if (e.name === a) return e;
    return null
};
Blockly.Block.prototype.getFieldValue = function(a) {
    return (a = this.getField_(a)) ? a.getValue() : null
};
Blockly.Block.prototype.getTitleValue = function(a) {
    console.log("Deprecated call to getTitleValue, use getFieldValue instead.");
    return this.getFieldValue(a)
};
Blockly.Block.prototype.setFieldValue = function(a, b) {
    var c = this.getField_(b);
    goog.asserts.assertObject(c, 'Field "%s" not found.', b);
    c.setValue(a)
};
Blockly.Block.prototype.setTitleValue = function(a, b) {
    console.log("Deprecated call to setTitleValue, use setFieldValue instead.");
    this.setFieldValue(a, b)
};
Blockly.Block.prototype.setTooltip = function(a) {
    this.tooltip = a
};
Blockly.Block.prototype.setPreviousStatement = function(a, b) {
    this.previousConnection && (goog.asserts.assert(!this.previousConnection.targetConnection, "Must disconnect previous statement before removing connection."), this.previousConnection.dispose(), this.previousConnection = null);
    a && (goog.asserts.assert(!this.outputConnection, "Remove output connection prior to adding previous connection."), void 0 === b && (b = null), this.previousConnection = new Blockly.Connection(this, Blockly.PREVIOUS_STATEMENT), this.previousConnection.setCheck(b));
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setNextStatement = function(a, b) {
    this.nextConnection && (goog.asserts.assert(!this.nextConnection.targetConnection, "Must disconnect next statement before removing connection."), this.nextConnection.dispose(), this.nextConnection = null);
    a && (void 0 === b && (b = null), this.nextConnection = new Blockly.Connection(this, Blockly.NEXT_STATEMENT), this.nextConnection.setCheck(b));
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.setOutput = function(a, b) {
    this.outputConnection && (goog.asserts.assert(!this.outputConnection.targetConnection, "Must disconnect output value before removing connection."), this.outputConnection.dispose(), this.outputConnection = null);
    a && (goog.asserts.assert(!this.previousConnection, "Remove previous connection prior to adding output connection."), void 0 === b && (b = null), this.outputConnection = new Blockly.Connection(this, Blockly.OUTPUT_VALUE), this.outputConnection.setCheck(b));
    this.rendered &&
        (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.changeOutput = function(a) {
    goog.asserts.assert(this.outputConnection, "Only use changeOutput() on blocks that already have an output.");
    this.outputConnection.setCheck(a)
};
Blockly.Block.prototype.setInputsInline = function(a) {
    this.inputsInline = a;
    this.rendered && (this.render(), this.bumpNeighbours_(), this.workspace.fireChangeEvent())
};
Blockly.Block.prototype.setDisabled = function(a) {
    this.disabled != a && (this.disabled = a, this.svg_.updateDisabled(), this.workspace.fireChangeEvent())
};
Blockly.Block.prototype.getInheritedDisabled = function() {
    for (var a = this;;) {
        a = a.getSurroundParent();
        if (!a) return !1;
        if (a.disabled) return !0
    }
};
Blockly.Block.prototype.isCollapsed = function() {
    return this.collapsed_
};
Blockly.Block.prototype.setCollapsed = function(a) {
    if (this.collapsed_ != a) {
        this.collapsed_ = a;
        for (var b = [], c = 0, d; d = this.inputList[c]; c++) b.push.apply(b, d.setVisible(!a));
        if (a) {
            a = this.getIcons();
            for (c = 0; c < a.length; c++) a[c].setVisible(!1);
            c = this.toString(Blockly.COLLAPSE_CHARS);
            this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(c)
        } else this.removeInput("_TEMP_COLLAPSED_INPUT");
        b.length || (b[0] = this);
        if (this.rendered) {
            for (c = 0; a = b[c]; c++) a.render();
            this.bumpNeighbours_()
        }
    }
};
Blockly.Block.prototype.toString = function(a) {
    for (var b = [], c = 0, d; d = this.inputList[c]; c++) {
        for (var e = 0, f; f = d.fieldRow[e]; e++) b.push(f.getText());
        d.connection && ((d = d.connection.targetBlock()) ? b.push(d.toString()) : b.push("?"))
    }
    b = goog.string.trim(b.join(" ")) || "???";
    a && (b = goog.string.truncate(b, a));
    return b
};
Blockly.Block.prototype.appendValueInput = function(a) {
    return this.appendInput_(Blockly.INPUT_VALUE, a)
};
Blockly.Block.prototype.appendStatementInput = function(a) {
    return this.appendInput_(Blockly.NEXT_STATEMENT, a)
};
Blockly.Block.prototype.appendDummyInput = function(a) {
    return this.appendInput_(Blockly.DUMMY_INPUT, a || "")
};
Blockly.Block.prototype.interpolateMsg = function(a, b) {
    function c(a) {
        a instanceof Blockly.Field ? this.appendField(a) : (goog.asserts.assert(goog.isArray(a)), this.appendField(a[1], a[0]))
    }
    goog.asserts.assertString(a);
    var d = arguments[arguments.length - 1];
    goog.asserts.assert(d === Blockly.ALIGN_LEFT || d === Blockly.ALIGN_CENTRE || d === Blockly.ALIGN_RIGHT, 'Illegal final argument "%d" is not an alignment.', d);
    --arguments.length;
    for (var e = a.split(this.interpolateMsg.SPLIT_REGEX_), f = [], g = 0; g < e.length; g += 2) {
        var h = goog.string.trim(e[g]),
            k = void 0;
        h && f.push(new Blockly.FieldLabel(h));
        if ((h = e[g + 1]) && "%" == h.charAt(0)) {
            var l = parseInt(h.substring(1), 10),
                p = arguments[l];
            goog.asserts.assertArray(p, 'Message symbol "%s" is out of range.', h);
            goog.asserts.assertArray(p, 'Argument "%s" is not a tuple.', h);
            p[1] instanceof Blockly.Field ? f.push([p[0], p[1]]) : k = this.appendValueInput(p[0]).setCheck(p[1]).setAlign(p[2]);
            arguments[l] = null
        } else "\n" == h && f.length && (k = this.appendDummyInput());
        k && f.length && (f.forEach(c, k), f = [])
    }
    f.length && (k = this.appendDummyInput().setAlign(d),
        f.forEach(c, k));
    for (g = 1; g < arguments.length - 1; g++) goog.asserts.assert(null === arguments[g], 'Input "%%s" not used in message: "%s"', g, a);
    this.setInputsInline(!a.match(this.interpolateMsg.INLINE_REGEX_))
};
Blockly.Block.prototype.interpolateMsg.SPLIT_REGEX_ = /(%\d+|\n)/;
Blockly.Block.prototype.interpolateMsg.INLINE_REGEX_ = /%1\s*$/;
Blockly.Block.prototype.appendInput_ = function(a, b) {
    var c = null;
    if (a == Blockly.INPUT_VALUE || a == Blockly.NEXT_STATEMENT) c = new Blockly.Connection(this, a);
    c = new Blockly.Input(a, b, this, c);
    this.inputList.push(c);
    this.rendered && (this.render(), this.bumpNeighbours_());
    return c
};
Blockly.Block.prototype.moveInputBefore = function(a, b) {
    if (a != b) {
        for (var c = -1, d = b ? -1 : this.inputList.length, e = 0, f; f = this.inputList[e]; e++)
            if (f.name == a) {
                if (c = e, -1 != d) break
            } else if (b && f.name == b && (d = e, -1 != c)) break;
        goog.asserts.assert(-1 != c, 'Named input "%s" not found.', a);
        goog.asserts.assert(-1 != d, 'Reference input "%s" not found.', b);
        this.moveNumberedInputBefore(c, d)
    }
};
Blockly.Block.prototype.moveNumberedInputBefore = function(a, b) {
    goog.asserts.assert(a != b, "Can't move input to itself.");
    goog.asserts.assert(a < this.inputList.length, "Input index " + a + " out of bounds.");
    goog.asserts.assert(b <= this.inputList.length, "Reference input " + b + " out of bounds.");
    var c = this.inputList[a];
    this.inputList.splice(a, 1);
    a < b && b--;
    this.inputList.splice(b, 0, c);
    this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.removeInput = function(a, b) {
    for (var c = 0, d; d = this.inputList[c]; c++)
        if (d.name == a) {
            d.connection && d.connection.targetConnection && d.connection.targetBlock().setParent(null);
            d.dispose();
            this.inputList.splice(c, 1);
            this.rendered && (this.render(), this.bumpNeighbours_());
            return
        }
    b || goog.asserts.fail('Input "%s" not found.', a)
};
Blockly.Block.prototype.getInput = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        if (c.name == a) return c;
    return null
};
Blockly.Block.prototype.getInputTargetBlock = function(a) {
    return (a = this.getInput(a)) && a.connection && a.connection.targetBlock()
};
Blockly.Block.prototype.setMutator = function(a) {
    this.mutator && this.mutator !== a && this.mutator.dispose();
    a && (a.block_ = this, this.mutator = a, this.svg_ && a.createIcon())
};
Blockly.Block.prototype.getCommentText = function() {
    return this.comment ? this.comment.getText().replace(/\s+$/, "").replace(/ +\n/g, "\n") : ""
};
Blockly.Block.prototype.setCommentText = function(a) {
    var b = !1;
    goog.isString(a) ? (this.comment || (this.comment = new Blockly.Comment(this), b = !0), this.comment.setText(a)) : this.comment && (this.comment.dispose(), b = !0);
    this.rendered && (this.render(), b && this.bumpNeighbours_())
};
Blockly.Block.prototype.setWarningText = function(a) {
    this.isInFlyout && (a = null);
    var b = !1;
    goog.isString(a) ? (this.warning || (this.warning = new Blockly.Warning(this), b = !0), this.warning.setText(a)) : this.warning && (this.warning.dispose(), b = !0);
    b && this.rendered && (this.render(), this.bumpNeighbours_())
};
Blockly.Block.prototype.render = function() {
    goog.asserts.assertObject(this.svg_, "Uninitialized block cannot be rendered.  Call block.initSvg()");
    this.svg_.render();
    Blockly.Realtime.blockChanged(this)
};
Blockly.FieldTextInput = function(a, b) {
    Blockly.FieldTextInput.superClass_.constructor.call(this, a);
    this.changeHandler_ = b
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);
Blockly.FieldTextInput.prototype.clone = function() {
    return new Blockly.FieldTextInput(this.getText(), this.changeHandler_)
};
Blockly.FieldTextInput.prototype.CURSOR = "text";
Blockly.FieldTextInput.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldTextInput.superClass_.dispose.call(this)
};
Blockly.FieldTextInput.prototype.setText = function(a) {
    if (null !== a) {
        if (this.changeHandler_) {
            var b = this.changeHandler_(a);
            null !== b && void 0 !== b && (a = b)
        }
        Blockly.Field.prototype.setText.call(this, a)
    }
};
Blockly.FieldTextInput.prototype.showEditor_ = function(a) {
    var b = a || !1;
    if (!b && (goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD)) a = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_), this.changeHandler_ && (b = this.changeHandler_(a), void 0 !== b && (a = b)), null !== a && this.setText(a);
    else {
        Blockly.WidgetDiv.show(this, this.widgetDispose_());
        var c = Blockly.WidgetDiv.DIV;
        a = goog.dom.createDom("input", "blocklyHtmlInput");
        Blockly.FieldTextInput.htmlInput_ = a;
        c.appendChild(a);
        a.value = a.defaultValue =
            this.text_;
        a.oldValue_ = null;
        this.validate_();
        this.resizeEditor_();
        b || (a.focus(), a.select());
        a.onKeyUpWrapper_ = Blockly.bindEvent_(a, "keyup", this, this.onHtmlInputChange_);
        a.onKeyPressWrapper_ = Blockly.bindEvent_(a, "keypress", this, this.onHtmlInputChange_);
        b = this.sourceBlock_.workspace.getCanvas();
        a.onWorkspaceChangeWrapper_ = Blockly.bindEvent_(b, "blocklyWorkspaceChange", this, this.resizeEditor_)
    }
};
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(a) {
    var b = Blockly.FieldTextInput.htmlInput_;
    13 == a.keyCode ? Blockly.WidgetDiv.hide() : 27 == a.keyCode ? (this.setText(b.defaultValue), Blockly.WidgetDiv.hide()) : (a = b.value, a !== b.oldValue_ ? (b.oldValue_ = a, this.setText(a), this.validate_()) : goog.userAgent.WEBKIT && this.sourceBlock_.render())
};
Blockly.FieldTextInput.prototype.validate_ = function() {
    var a = !0;
    goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
    var b = Blockly.FieldTextInput.htmlInput_;
    this.changeHandler_ && (a = this.changeHandler_(b.value));
    null === a ? Blockly.addClass_(b, "blocklyInvalidInput") : Blockly.removeClass_(b, "blocklyInvalidInput")
};
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
    var a = Blockly.WidgetDiv.DIV,
        b = this.fieldGroup_.getBBox();
    a.style.width = b.width + "px";
    b = Blockly.getAbsoluteXY_(this.borderRect_);
    if (Blockly.RTL) {
        var c = this.borderRect_.getBBox();
        b.x += c.width;
        b.x -= a.offsetWidth
    }
    b.y += 1;
    goog.userAgent.WEBKIT && (b.y -= 3);
    a.style.left = b.x + "px";
    a.style.top = b.y + "px"
};
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
    var a = this;
    return function() {
        var b = Blockly.FieldTextInput.htmlInput_,
            c = b.value;
        a.changeHandler_ && (c = a.changeHandler_(c), null === c && (c = b.defaultValue));
        a.setText(c);
        a.sourceBlock_.rendered && a.sourceBlock_.render();
        Blockly.unbindEvent_(b.onKeyUpWrapper_);
        Blockly.unbindEvent_(b.onKeyPressWrapper_);
        Blockly.unbindEvent_(b.onWorkspaceChangeWrapper_);
        Blockly.FieldTextInput.htmlInput_ = null;
        Blockly.WidgetDiv.DIV.style.width = "auto"
    }
};
Blockly.FieldTextInput.numberValidator = function(a) {
    a = a.replace(/O/ig, "0");
    a = a.replace(/,/g, "");
    a = parseFloat(a || 0);
    return isNaN(a) ? null : String(a)
};
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(a) {
    (a = Blockly.FieldTextInput.numberValidator(a)) && (a = String(Math.max(0, Math.floor(a))));
    return a
};
Blockly.FieldAngle = function(a, b) {
    var c;
    if (b) {
        var d = this;
        c = function(a) {
            a = Blockly.FieldAngle.angleValidator.call(d, a);
            null !== a && b.call(d, a);
            return a
        }
    } else c = Blockly.FieldAngle.angleValidator;
    this.symbol_ = Blockly.createSvgElement("tspan", {}, null);
    this.symbol_.appendChild(document.createTextNode("\u00b0"));
    Blockly.FieldAngle.superClass_.constructor.call(this, a, c)
};
goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);
Blockly.FieldAngle.prototype.clone = function() {
    return new Blockly.FieldAngle(this.getText(), this.changeHandler_)
};
Blockly.FieldAngle.ROUND = 15;
Blockly.FieldAngle.HALF = 50;
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;
Blockly.FieldAngle.prototype.dispose_ = function() {
    var a = this;
    return function() {
        Blockly.FieldAngle.superClass_.dispose_.call(a)();
        a.gauge_ = null;
        a.clickWrapper_ && Blockly.unbindEvent_(a.clickWrapper_);
        a.moveWrapper1_ && Blockly.unbindEvent_(a.moveWrapper1_);
        a.moveWrapper2_ && Blockly.unbindEvent_(a.moveWrapper2_)
    }
};
Blockly.FieldAngle.prototype.showEditor_ = function() {
    Blockly.FieldAngle.superClass_.showEditor_.call(this, goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD);
    var a = Blockly.WidgetDiv.DIV;
    if (a.firstChild) {
        var a = Blockly.createSvgElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:html": "http://www.w3.org/1999/xhtml",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                version: "1.1",
                height: 2 * Blockly.FieldAngle.HALF + "px",
                width: 2 * Blockly.FieldAngle.HALF + "px"
            }, a),
            b = Blockly.createSvgElement("circle", {
                cx: Blockly.FieldAngle.HALF,
                cy: Blockly.FieldAngle.HALF,
                r: Blockly.FieldAngle.RADIUS,
                "class": "blocklyAngleCircle"
            }, a);
        this.gauge_ = Blockly.createSvgElement("path", {
            "class": "blocklyAngleGauge"
        }, a);
        this.line_ = Blockly.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF,
            y1: Blockly.FieldAngle.HALF,
            "class": "blocklyAngleLine"
        }, a);
        for (var c = 0; 360 > c; c += 15) Blockly.createSvgElement("line", {
            x1: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS,
            y1: Blockly.FieldAngle.HALF,
            x2: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS -
                (0 == c % 45 ? 10 : 5),
            y2: Blockly.FieldAngle.HALF,
            "class": "blocklyAngleMarks",
            transform: "rotate(" + c + ", " + Blockly.FieldAngle.HALF + ", " + Blockly.FieldAngle.HALF + ")"
        }, a);
        a.style.marginLeft = "-35px";
        this.clickWrapper_ = Blockly.bindEvent_(a, "click", this, Blockly.WidgetDiv.hide);
        this.moveWrapper1_ = Blockly.bindEvent_(b, "mousemove", this, this.onMouseMove);
        this.moveWrapper2_ = Blockly.bindEvent_(this.gauge_, "mousemove", this, this.onMouseMove);
        this.updateGraph_()
    }
};
Blockly.FieldAngle.prototype.onMouseMove = function(a) {
    var b = this.gauge_.ownerSVGElement.getBoundingClientRect(),
        c = a.clientX - b.left - Blockly.FieldAngle.HALF;
    a = a.clientY - b.top - Blockly.FieldAngle.HALF;
    b = Math.atan(-a / c);
    isNaN(b) || (b = b / Math.PI * 195, 0 > c ? b += 195 : 0 < a && (b += 195), Blockly.FieldAngle.ROUND && (b = Math.round(b / Blockly.FieldAngle.ROUND) * Blockly.FieldAngle.ROUND), 195 <= b && (b -= 195), b = String(b), Blockly.FieldTextInput.htmlInput_.value = b, this.setText(b))
};
Blockly.FieldAngle.prototype.setText = function(a) {
    Blockly.FieldAngle.superClass_.setText.call(this, a);
    this.updateGraph_();
    Blockly.RTL ? this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild) : this.textElement_.appendChild(this.symbol_);
    this.size_.width = 0
};
Blockly.FieldAngle.prototype.updateGraph_ = function() {
    if (this.gauge_) {
        var a = +this.getText() / 180 * Math.PI;
        if (isNaN(a)) this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF + ", " + Blockly.FieldAngle.HALF), this.line_.setAttribute("x2", Blockly.FieldAngle.HALF), this.line_.setAttribute("y2", Blockly.FieldAngle.HALF);
        else {
            var b = Blockly.FieldAngle.HALF + Math.cos(a) * Blockly.FieldAngle.RADIUS,
                c = Blockly.FieldAngle.HALF + Math.sin(a) * -Blockly.FieldAngle.RADIUS;
            this.gauge_.setAttribute("d", "M " + Blockly.FieldAngle.HALF +
                ", " + Blockly.FieldAngle.HALF + " h " + Blockly.FieldAngle.RADIUS + " A " + Blockly.FieldAngle.RADIUS + "," + Blockly.FieldAngle.RADIUS + " 0 " + (a > Math.PI ? 1 : 0) + " 0 " + b + "," + c + " z");
            this.line_.setAttribute("x2", b);
            this.line_.setAttribute("y2", c)
        }
    }
};
Blockly.FieldAngle.angleValidator = function(a) {
    a = Blockly.FieldTextInput.numberValidator(a);
    null !== a && (a %= 181, 0 > a && (a += 360), a = String(a));
    return a
};
Blockly.FieldCheckbox = function(a, b) {
    Blockly.FieldCheckbox.superClass_.constructor.call(this, "");
    this.changeHandler_ = b;
    this.checkElement_ = Blockly.createSvgElement("text", {
        "class": "blocklyText",
        x: -3
    }, this.fieldGroup_);
    var c = document.createTextNode("\u2713");
    this.checkElement_.appendChild(c);
    this.setValue(a)
};
goog.inherits(Blockly.FieldCheckbox, Blockly.Field);
Blockly.FieldCheckbox.prototype.clone = function() {
    return new Blockly.FieldCheckbox(this.getValue(), this.changeHandler_)
};
Blockly.FieldCheckbox.prototype.CURSOR = "default";
Blockly.FieldCheckbox.prototype.getValue = function() {
    return String(this.state_).toUpperCase()
};
Blockly.FieldCheckbox.prototype.setValue = function(a) {
    a = "TRUE" == a;
    this.state_ !== a && (this.state_ = a, this.checkElement_.style.display = a ? "block" : "none", this.sourceBlock_ && this.sourceBlock_.rendered && this.sourceBlock_.workspace.fireChangeEvent())
};
Blockly.FieldCheckbox.prototype.showEditor_ = function() {
    var a = !this.state_;
    if (this.changeHandler_) {
        var b = this.changeHandler_(a);
        void 0 !== b && (a = b)
    }
    null !== a && this.setValue(String(a).toUpperCase())
};
Blockly.FieldColour = function(a, b) {
    Blockly.FieldColour.superClass_.constructor.call(this, "\u00a0\u00a0\u00a0");
    this.changeHandler_ = b;
    this.borderRect_.style.fillOpacity = 1;
    this.setValue(a)
};
goog.inherits(Blockly.FieldColour, Blockly.Field);
Blockly.FieldColour.prototype.clone = function() {
    return new Blockly.FieldColour(this.getValue(), this.changeHandler_)
};
Blockly.FieldColour.prototype.CURSOR = "default";
Blockly.FieldColour.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldColour.superClass_.dispose.call(this)
};
Blockly.FieldColour.prototype.getValue = function() {
    return this.colour_
};
Blockly.FieldColour.prototype.setValue = function(a) {
    this.colour_ = a;
    this.borderRect_.style.fill = a;
    this.sourceBlock_ && this.sourceBlock_.rendered && (Blockly.Realtime.blockChanged(this.sourceBlock_), this.sourceBlock_.workspace.fireChangeEvent())
};
Blockly.FieldColour.COLOURS = goog.ui.ColorPicker.SIMPLE_GRID_COLORS;
Blockly.FieldColour.COLUMNS = 7;
Blockly.FieldColour.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, Blockly.FieldColour.widgetDispose_);
    var a = new goog.ui.ColorPicker;
    a.setSize(Blockly.FieldColour.COLUMNS);
    a.setColors(Blockly.FieldColour.COLOURS);
    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = Blockly.getAbsoluteXY_(this.borderRect_),
        e = this.borderRect_.getBBox();
    a.render(Blockly.WidgetDiv.DIV);
    a.setSelectedColor(this.getValue());
    var f = goog.style.getSize(a.getElement());
    d.y = d.y + f.height +
        e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    Blockly.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x, d.y, b, c);
    var g = this;
    Blockly.FieldColour.changeEventKey_ = goog.events.listen(a, goog.ui.ColorPicker.EventType.CHANGE, function(a) {
        a = a.target.getSelectedColor() || "#000000";
        Blockly.WidgetDiv.hide();
        if (g.changeHandler_) {
            var b = g.changeHandler_(a);
            void 0 !== b && (a = b)
        }
        null !== a && g.setValue(a)
    })
};
Blockly.FieldColour.widgetDispose_ = function() {
    Blockly.FieldColour.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_)
};
Blockly.FieldDropdown = function(a, b) {
    this.menuGenerator_ = a;
    this.changeHandler_ = b;
    this.trimOptions_();
    var c = this.getOptions_()[0];
    this.value_ = c[1];
    this.arrow_ = Blockly.createSvgElement("tspan", {}, null);
    this.arrow_.appendChild(document.createTextNode(Blockly.RTL ? Blockly.FieldDropdown.ARROW_CHAR + " " : " " + Blockly.FieldDropdown.ARROW_CHAR));
    Blockly.FieldDropdown.superClass_.constructor.call(this, c[0])
};
goog.inherits(Blockly.FieldDropdown, Blockly.Field);
Blockly.FieldDropdown.CHECKMARK_OVERHANG = 25;
Blockly.FieldDropdown.ARROW_CHAR = goog.userAgent.ANDROID ? "\u25bc" : "\u25be";
Blockly.FieldDropdown.prototype.clone = function() {
    return new Blockly.FieldDropdown(this.menuGenerator_, this.changeHandler_)
};
Blockly.FieldDropdown.prototype.CURSOR = "default";
Blockly.FieldDropdown.prototype.showEditor_ = function() {
    Blockly.WidgetDiv.show(this, null);
    for (var a = this, b = new goog.ui.Menu, c = this.getOptions_(), d = 0; d < c.length; d++) {
        var e = c[d][1],
            f = new goog.ui.MenuItem(c[d][0]);
        f.setValue(e);
        f.setCheckable(!0);
        b.addChild(f, !0);
        f.setChecked(e == this.value_)
    }
    goog.events.listen(b, goog.ui.Component.EventType.ACTION, function(b) {
        if (b = b.target) {
            b = b.getValue();
            if (a.changeHandler_) {
                var c = a.changeHandler_(b);
                void 0 !== c && (b = c)
            }
            null !== b && a.setValue(b)
        }
        Blockly.WidgetDiv.hideIfOwner(a)
    });
    b.getHandler().listen(b.getElement(), goog.events.EventType.TOUCHSTART, function(a) {
        this.getOwnerControl(a.target).handleMouseDown(a)
    });
    b.getHandler().listen(b.getElement(), goog.events.EventType.TOUCHEND, function(a) {
        this.getOwnerControl(a.target).performActionInternal(a)
    });
    c = goog.dom.getViewportSize();
    d = goog.style.getViewportPageOffset(document);
    e = Blockly.getAbsoluteXY_(this.borderRect_);
    f = this.borderRect_.getBBox();
    b.render(Blockly.WidgetDiv.DIV);
    var g = b.getElement();
    Blockly.addClass_(g, "blocklyDropdownMenu");
    var h = goog.style.getSize(g);
    e.y = e.y + h.height + f.height >= c.height + d.y ? e.y - h.height : e.y + f.height;
    Blockly.RTL ? (e.x += f.width, e.x += Blockly.FieldDropdown.CHECKMARK_OVERHANG, e.x < d.x + h.width && (e.x = d.x + h.width)) : (e.x -= Blockly.FieldDropdown.CHECKMARK_OVERHANG, e.x > c.width + d.x - h.width && (e.x = c.width + d.x - h.width));
    Blockly.WidgetDiv.position(e.x, e.y, c, d);
    b.setAllowAutoFocus(!0);
    g.focus()
};
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
    this.suffixField = this.prefixField = null;
    var a = this.menuGenerator_;
    if (goog.isArray(a) && !(2 > a.length)) {
        var b = a.map(function(a) {
                return a[0]
            }),
            c = Blockly.shortestStringLength(b),
            d = Blockly.commonWordPrefix(b, c),
            e = Blockly.commonWordSuffix(b, c);
        if ((d || e) && !(c <= d + e)) {
            d && (this.prefixField = b[0].substring(0, d - 1));
            e && (this.suffixField = b[0].substr(1 - e));
            b = [];
            for (c = 0; c < a.length; c++) {
                var f = a[c][0],
                    g = a[c][1],
                    f = f.substring(d, f.length - e);
                b[c] = [f, g]
            }
            this.menuGenerator_ =
                b
        }
    }
};
Blockly.FieldDropdown.prototype.getOptions_ = function() {
    return goog.isFunction(this.menuGenerator_) ? this.menuGenerator_.call(this) : this.menuGenerator_
};
Blockly.FieldDropdown.prototype.getValue = function() {
    return this.value_
};
Blockly.FieldDropdown.prototype.setValue = function(a) {
    this.value_ = a;
    for (var b = this.getOptions_(), c = 0; c < b.length; c++)
        if (b[c][1] == a) {
            this.setText(b[c][0]);
            return
        }
    this.setText(a)
};
Blockly.FieldDropdown.prototype.setText = function(a) {
    this.sourceBlock_ && (this.arrow_.style.fill = Blockly.makeColour(this.sourceBlock_.getColour()));
    null !== a && a !== this.text_ && (this.text_ = a, this.updateTextNode_(), Blockly.RTL ? this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild) : this.textElement_.appendChild(this.arrow_), this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours_(), this.sourceBlock_.workspace.fireChangeEvent()))
};
Blockly.FieldDropdown.prototype.dispose = function() {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldDropdown.superClass_.dispose.call(this)
};
Blockly.FieldImage = function(a, b, c, d) {
    this.sourceBlock_ = null;
    this.height_ = +c;
    this.width_ = +b;
    this.size_ = {
        height: this.height_ + 10,
        width: this.width_
    };
    this.text_ = d || "";
    b = 6 - Blockly.BlockSvg.FIELD_HEIGHT;
    this.fieldGroup_ = Blockly.createSvgElement("g", {}, null);
    this.imageElement_ = Blockly.createSvgElement("image", {
        height: this.height_ + "px",
        width: this.width_ + "px",
        y: b
    }, this.fieldGroup_);
    this.setValue(a);
    goog.userAgent.GECKO && (this.rectElement_ = Blockly.createSvgElement("rect", {
        height: this.height_ + "px",
        width: this.width_ +
            "px",
        y: b,
        "fill-opacity": 0
    }, this.fieldGroup_))
};
goog.inherits(Blockly.FieldImage, Blockly.Field);
Blockly.FieldImage.prototype.clone = function() {
    return new Blockly.FieldImage(this.getSrc(), this.width_, this.height_, this.getText())
};
Blockly.FieldImage.prototype.rectElement_ = null;
Blockly.FieldImage.prototype.EDITABLE = !1;
Blockly.FieldImage.prototype.init = function(a) {
    if (this.sourceBlock_) throw "Image has already been initialized once.";
    this.sourceBlock_ = a;
    a.getSvgRoot().appendChild(this.fieldGroup_);
    a = this.rectElement_ || this.imageElement_;
    a.tooltip = this.sourceBlock_;
    Blockly.Tooltip.bindMouseEvents(a)
};
Blockly.FieldImage.prototype.dispose = function() {
    goog.dom.removeNode(this.fieldGroup_);
    this.rectElement_ = this.imageElement_ = this.fieldGroup_ = null
};
Blockly.FieldImage.prototype.setTooltip = function(a) {
    (this.rectElement_ || this.imageElement_).tooltip = a
};
Blockly.FieldImage.prototype.getValue = function() {
    return this.src_
};
Blockly.FieldImage.prototype.setValue = function(a) {
    null !== a && (this.src_ = a, this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", goog.isString(a) ? a : ""))
};
Blockly.FieldImage.prototype.setText = function(a) {
    null !== a && (this.text_ = a)
};
Blockly.Flyout = function() {
    var a = this;
    this.workspace_ = new Blockly.Workspace(function() {
        return a.getMetrics_()
    }, function(b) {
        return a.setMetrics_(b)
    });
    this.workspace_.isFlyout = !0;
    this.eventWrappers_ = [];
    this.height_ = this.width_ = 0;
    this.buttons_ = [];
    this.listeners_ = []
};
Blockly.Flyout.prototype.autoClose = !0;
Blockly.Flyout.prototype.CORNER_RADIUS = 8;
Blockly.Flyout.prototype.createDom = function() {
    this.svgGroup_ = Blockly.createSvgElement("g", {}, null);
    this.svgBackground_ = Blockly.createSvgElement("path", {
        "class": "blocklyFlyoutBackground"
    }, this.svgGroup_);
    this.svgGroup_.appendChild(this.workspace_.createDom());
    return this.svgGroup_
};
Blockly.Flyout.prototype.dispose = function() {
    this.hide();
    Blockly.unbindEvent_(this.eventWrappers_);
    this.eventWrappers_.length = 0;
    this.scrollbar_ && (this.scrollbar_.dispose(), this.scrollbar_ = null);
    this.workspace_ = null;
    this.svgGroup_ && (goog.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.targetWorkspace_ = this.svgBackground_ = null
};
Blockly.Flyout.prototype.getMetrics_ = function() {
    if (!this.isVisible()) return null;
    var a = this.height_ - 2 * this.CORNER_RADIUS,
        b = this.width_;
    try {
        var c = this.workspace_.getCanvas().getBBox()
    } catch (d) {
        c = {
            height: 0,
            y: 0
        }
    }
    return {
        viewHeight: a,
        viewWidth: b,
        contentHeight: c.height + c.y,
        viewTop: -this.workspace_.scrollY,
        contentTop: 0,
        absoluteTop: this.CORNER_RADIUS,
        absoluteLeft: 0
    }
};
Blockly.Flyout.prototype.setMetrics_ = function(a) {
    var b = this.getMetrics_();
    b && (goog.isNumber(a.y) && (this.workspace_.scrollY = -b.contentHeight * a.y - b.contentTop), a = this.workspace_.scrollY + b.absoluteTop, this.workspace_.getCanvas().setAttribute("transform", "translate(0," + a + ")"))
};
Blockly.Flyout.prototype.init = function(a) {
    this.targetWorkspace_ = a;
    this.scrollbar_ = new Blockly.Scrollbar(this.workspace_, !1, !1);
    this.hide();
    this.eventWrappers_.concat(Blockly.bindEvent_(window, goog.events.EventType.RESIZE, this, this.position_));
    this.position_();
    this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_, "wheel", this, this.wheel_));
    this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_, "mousewheel", this, this.wheel_));
    this.eventWrappers_.concat(Blockly.bindEvent_(this.targetWorkspace_.getCanvas(),
        "blocklyWorkspaceChange", this, this.filterForCapacity_));
    this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_, "mousedown", this, this.onMouseDown_))
};
Blockly.Flyout.prototype.position_ = function() {
    if (this.isVisible()) {
        var a = this.targetWorkspace_.getMetrics();
        if (a) {
            var b = this.width_ - this.CORNER_RADIUS;
            Blockly.RTL && (b *= -1);
            var c = ["M " + (Blockly.RTL ? this.width_ : 0) + ",0"];
            c.push("h", b);
            c.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, Blockly.RTL ? 0 : 1, Blockly.RTL ? -this.CORNER_RADIUS : this.CORNER_RADIUS, this.CORNER_RADIUS);
            c.push("v", Math.max(0, a.viewHeight - 2 * this.CORNER_RADIUS));
            c.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, Blockly.RTL ? 0 : 1, Blockly.RTL ?
                this.CORNER_RADIUS : -this.CORNER_RADIUS, this.CORNER_RADIUS);
            c.push("h", -b);
            c.push("z");
            this.svgBackground_.setAttribute("d", c.join(" "));
            b = a.absoluteLeft;
            Blockly.RTL && (b += a.viewWidth, b -= this.width_);
            this.svgGroup_.setAttribute("transform", "translate(" + b + "," + a.absoluteTop + ")");
            this.height_ = a.viewHeight;
            this.scrollbar_ && this.scrollbar_.resize()
        }
    }
};
Blockly.Flyout.prototype.wheel_ = function(a) {
    var b = a.deltaY || -a.wheelDeltaY;
    if (b) {
        goog.userAgent.GECKO && (b *= 10);
        var c = this.getMetrics_(),
            b = c.viewTop + b,
            b = Math.min(b, c.contentHeight - c.viewHeight),
            b = Math.max(b, 0);
        this.scrollbar_.set(b);
        a.preventDefault()
    }
};
Blockly.Flyout.prototype.isVisible = function() {
    return this.svgGroup_ && "block" == this.svgGroup_.style.display
};
Blockly.Flyout.prototype.hide = function() {
    if (this.isVisible()) {
        this.svgGroup_.style.display = "none";
        for (var a = 0, b; b = this.listeners_[a]; a++) Blockly.unbindEvent_(b);
        this.listeners_.length = 0;
        this.reflowWrapper_ && (Blockly.unbindEvent_(this.reflowWrapper_), this.reflowWrapper_ = null)
    }
};
Blockly.Flyout.prototype.show = function(a) {
    this.hide();
    for (var b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) d.workspace == this.workspace_ && d.dispose(!1, !1);
    for (var c = 0, e; e = this.buttons_[c]; c++) goog.dom.removeNode(e);
    this.buttons_.length = 0;
    var f = this.CORNER_RADIUS;
    this.svgGroup_.style.display = "block";
    var b = [],
        g = [];
    if (a == Blockly.Variables.NAME_TYPE) Blockly.Variables.flyoutCategory(b, g, f, this.workspace_);
    else if (a == Blockly.Procedures.NAME_TYPE) Blockly.Procedures.flyoutCategory(b, g, f, this.workspace_);
    else
        for (var h = 0; d = a[h]; h++) d.tagName && "BLOCK" == d.tagName.toUpperCase() && (d = Blockly.Xml.domToBlock(this.workspace_, d), b.push(d), g.push(3 * f));
    a = f;
    for (h = 0; d = b[h]; h++) {
        c = d.getDescendants();
        e = 0;
        for (var k; k = c[e]; e++) k.isInFlyout = !0, k.setCommentText(null);
        d.render();
        k = d.getSvgRoot();
        e = d.getHeightWidth();
        c = Blockly.RTL ? 0 : f + Blockly.BlockSvg.TAB_WIDTH;
        d.moveBy(c, a);
        a += e.height + g[h];
        e = Blockly.createSvgElement("rect", {
            "fill-opacity": 0
        }, null);
        this.workspace_.getCanvas().insertBefore(e, d.getSvgRoot());
        d.flyoutRect_ =
            e;
        this.buttons_[h] = e;
        this.autoClose ? this.listeners_.push(Blockly.bindEvent_(k, "mousedown", null, this.createBlockFunc_(d))) : this.listeners_.push(Blockly.bindEvent_(k, "mousedown", null, this.blockMouseDown_(d)));
        this.listeners_.push(Blockly.bindEvent_(k, "mouseover", d.svg_, d.svg_.addSelect));
        this.listeners_.push(Blockly.bindEvent_(k, "mouseout", d.svg_, d.svg_.removeSelect));
        this.listeners_.push(Blockly.bindEvent_(e, "mousedown", null, this.createBlockFunc_(d)));
        this.listeners_.push(Blockly.bindEvent_(e, "mouseover",
            d.svg_, d.svg_.addSelect));
        this.listeners_.push(Blockly.bindEvent_(e, "mouseout", d.svg_, d.svg_.removeSelect))
    }
    this.listeners_.push(Blockly.bindEvent_(this.svgBackground_, "mouseover", this, function(a) {
        a = this.workspace_.getTopBlocks(!1);
        for (var b = 0, c; c = a[b]; b++) c.svg_.removeSelect()
    }));
    this.width_ = 0;
    this.reflow();
    this.filterForCapacity_();
    Blockly.fireUiEventNow(window, "resize");
    this.reflowWrapper_ = Blockly.bindEvent_(this.workspace_.getCanvas(), "blocklyWorkspaceChange", this, this.reflow);
    this.workspace_.fireChangeEvent()
};
Blockly.Flyout.prototype.reflow = function() {
    for (var a = 0, b = this.CORNER_RADIUS, c = this.workspace_.getTopBlocks(!1), d = 0, e; e = c[d]; d++) {
        e.getSvgRoot();
        var f = e.getHeightWidth(),
            a = Math.max(a, f.width)
    }
    a += b + Blockly.BlockSvg.TAB_WIDTH + b / 2 + Blockly.Scrollbar.scrollbarThickness;
    if (this.width_ != a) {
        for (d = 0; e = c[d]; d++) {
            var f = e.getHeightWidth(),
                g = e.getRelativeToSurfaceXY();
            if (Blockly.RTL) {
                var h = a - b - Blockly.BlockSvg.TAB_WIDTH - g.x;
                e.moveBy(h, 0);
                g.x += h
            }
            e.flyoutRect_ && (e.flyoutRect_.setAttribute("width", f.width), e.flyoutRect_.setAttribute("height",
                f.height), e.flyoutRect_.setAttribute("x", Blockly.RTL ? g.x - f.width : g.x), e.flyoutRect_.setAttribute("y", g.y))
        }
        this.width_ = a;
        Blockly.fireUiEvent(window, "resize")
    }
};
Blockly.Block.prototype.moveTo = function(a, b) {
    var c = this.getRelativeToSurfaceXY();
    this.svg_.getRootElement().setAttribute("transform", "translate(" + a + ", " + b + ")");
    this.moveConnections_(a - c.x, b - c.y)
};
Blockly.Flyout.prototype.blockMouseDown_ = function(a) {
    var b = this;
    return function(c) {
        Blockly.terminateDrag_();
        Blockly.hideChaff();
        Blockly.isRightButton(c) ? a.showContextMenu_(c) : (Blockly.removeAllRanges(), Blockly.setCursorHand_(!0), Blockly.Flyout.startDownEvent_ = c, Blockly.Flyout.startBlock_ = a, Blockly.Flyout.startFlyout_ = b, Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.terminateDrag_), Blockly.Flyout.onMouseMoveBlockWrapper_ = Blockly.bindEvent_(document, "mousemove",
            this, b.onMouseMoveBlock_));
        c.stopPropagation()
    }
};
Blockly.Flyout.prototype.onMouseDown_ = function(a) {
    Blockly.isRightButton(a) || (Blockly.hideChaff(!0), Blockly.Flyout.terminateDrag_(), this.startDragMouseY_ = a.clientY, Blockly.Flyout.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", this, this.onMouseMove_), Blockly.Flyout.onMouseUpWrapper_ = Blockly.bindEvent_(document, "mouseup", this, Blockly.Flyout.terminateDrag_), a.preventDefault(), a.stopPropagation())
};
Blockly.Flyout.prototype.onMouseMove_ = function(a) {
    var b = a.clientY - this.startDragMouseY_;
    this.startDragMouseY_ = a.clientY;
    a = this.getMetrics_();
    b = a.viewTop - b;
    b = Math.min(b, a.contentHeight - a.viewHeight);
    b = Math.max(b, 0);
    this.scrollbar_.set(b)
};
Blockly.Flyout.prototype.onMouseMoveBlock_ = function(a) {
    "mousemove" == a.type && 1 >= a.clientX && 0 == a.clientY && 0 == a.button ? a.stopPropagation() : (Blockly.removeAllRanges(), Math.sqrt(Math.pow(a.clientX - Blockly.Flyout.startDownEvent_.clientX, 2) + Math.pow(a.clientY - Blockly.Flyout.startDownEvent_.clientY, 2)) > Blockly.DRAG_RADIUS && Blockly.Flyout.startFlyout_.createBlockFunc_(Blockly.Flyout.startBlock_)(Blockly.Flyout.startDownEvent_))
};
Blockly.Flyout.prototype.createBlockFunc_ = function(a) {
    var b = this;
    return function(c) {
        if (!Blockly.isRightButton(c) && !a.disabled) {
            var d = Blockly.Xml.blockToDom_(a),
                d = Blockly.Xml.domToBlock(b.targetWorkspace_, d),
                e = a.getSvgRoot();
            if (!e) throw "originBlock is not rendered.";
            var e = Blockly.getSvgXY_(e),
                f = d.getSvgRoot();
            if (!f) throw "block is not rendered.";
            f = Blockly.getSvgXY_(f);
            d.moveBy(e.x - f.x, e.y - f.y);
            b.autoClose ? b.hide() : b.filterForCapacity_();
            d.onMouseDown_(c)
        }
    }
};
Blockly.Flyout.prototype.filterForCapacity_ = function() {
    for (var a = this.targetWorkspace_.remainingCapacity(), b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) {
        var e = d.getDescendants().length > a;
        d.setDisabled(e)
    }
};
Blockly.Flyout.terminateDrag_ = function() {
    Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_), Blockly.Flyout.onMouseUpWrapper_ = null);
    Blockly.Flyout.onMouseMoveBlockWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveBlockWrapper_), Blockly.Flyout.onMouseMoveBlockWrapper_ = null);
    Blockly.Flyout.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_), Blockly.Flyout.onMouseMoveWrapper_ = null);
    Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_),
        Blockly.Flyout.onMouseUpWrapper_ = null);
    Blockly.Flyout.startDownEvent_ = null;
    Blockly.Flyout.startBlock_ = null;
    Blockly.Flyout.startFlyout_ = null
};
Blockly.Toolbox = {};
Blockly.Toolbox.width = 0;
Blockly.Toolbox.selectedOption_ = null;
Blockly.Toolbox.CONFIG_ = {
    indentWidth: 19,
    cssRoot: "blocklyTreeRoot",
    cssHideRoot: "blocklyHidden",
    cssItem: "",
    cssTreeRow: "blocklyTreeRow",
    cssItemLabel: "blocklyTreeLabel",
    cssTreeIcon: "blocklyTreeIcon",
    cssExpandedFolderIcon: "blocklyTreeIconOpen",
    cssFileIcon: "blocklyTreeIconNone",
    cssSelectedRow: "blocklyTreeSelected"
};
Blockly.Toolbox.createDom = function(a, b) {
    Blockly.Toolbox.HtmlDiv = goog.dom.createDom("div", "blocklyToolboxDiv");
    Blockly.Toolbox.HtmlDiv.setAttribute("dir", Blockly.RTL ? "RTL" : "LTR");
    b.appendChild(Blockly.Toolbox.HtmlDiv);
    Blockly.Toolbox.flyout_ = new Blockly.Flyout;
    a.appendChild(Blockly.Toolbox.flyout_.createDom());
    Blockly.bindEvent_(Blockly.Toolbox.HtmlDiv, "mousedown", null, function(a) {
        Blockly.isRightButton(a) || a.target == Blockly.Toolbox.HtmlDiv ? Blockly.hideChaff(!1) : Blockly.hideChaff(!0)
    })
};
Blockly.Toolbox.init = function() {
    Blockly.Toolbox.CONFIG_.cleardotPath = Blockly.pathToBlockly + "media/1x1.gif";
    Blockly.Toolbox.CONFIG_.cssCollapsedFolderIcon = "blocklyTreeIconClosed" + (Blockly.RTL ? "Rtl" : "Ltr");
    var a = new Blockly.Toolbox.TreeControl(goog.html.SafeHtml.EMPTY, Blockly.Toolbox.CONFIG_);
    Blockly.Toolbox.tree_ = a;
    a.setShowRootNode(!1);
    a.setShowLines(!1);
    a.setShowExpandIcons(!1);
    a.setSelectedItem(null);
    Blockly.Toolbox.HtmlDiv.style.display = "block";
    Blockly.Toolbox.flyout_.init(Blockly.mainWorkspace);
    
    Blockly.Toolbox.populate_();
    a.render(Blockly.Toolbox.HtmlDiv);
    goog.events.listen(window, goog.events.EventType.RESIZE, Blockly.Toolbox.position_);
    Blockly.Toolbox.position_()
};
Blockly.Toolbox.position_ = function() {
    var a = Blockly.Toolbox.HtmlDiv,
        b = goog.style.getBorderBox(Blockly.svg),
        c = Blockly.svgSize();
    Blockly.RTL ? (b = Blockly.convertCoordinates(0, 0, !1), a.style.left = b.x + c.width - a.offsetWidth + "px") : a.style.marginLeft = b.left;
    a.style.height = c.height + 1 + "px";
    Blockly.Toolbox.width = a.offsetWidth;
    Blockly.RTL || --Blockly.Toolbox.width
};
Blockly.Toolbox.populate_ = function() {
    function a(c, d) {
        for (var e = 0, f; f = c.childNodes[e]; e++)
            if (f.tagName) {
                var g = f.tagName.toUpperCase();
                if ("CATEGORY" == g) {
                    g = b.createNode(f.getAttribute("name"));
                    g.blocks = [];
                    d.add(g);
                    f.getAttribute("name").toLowerCase().replace(" ", "");
                    var h = f.getAttribute("id").toLowerCase().replace(" ", "");
                    g.setId(h);
                    g.setIconClass("category__icon category--" + h);
                    (h = f.getAttribute("custom")) ? g.blocks = h: a(f, g)
                } else "BLOCK" == g && d.blocks.push(f)
            }
    }
    var b = Blockly.Toolbox.tree_;
    b.removeChildren();
    b.blocks = [];
    a(Blockly.languageTree, Blockly.Toolbox.tree_);
    if (b.blocks.length) throw "Toolbox cannot have both blocks and categories in the root level.";
    Blockly.fireUiEvent(window, "resize")
};
Blockly.Toolbox.clearSelection = function() {
    Blockly.Toolbox.tree_.setSelectedItem(null)
};
Blockly.Toolbox.TreeControl = function(a, b, c) {
    goog.ui.tree.TreeControl.call(this, a, b, c)
};
goog.inherits(Blockly.Toolbox.TreeControl, goog.ui.tree.TreeControl);
Blockly.Toolbox.TreeControl.prototype.enterDocument = function() {
    Blockly.Toolbox.TreeControl.superClass_.enterDocument.call(this);
    if (goog.events.BrowserFeature.TOUCH_ENABLED) {
        var a = this.getElement();
        Blockly.bindEvent_(a, goog.events.EventType.TOUCHSTART, this, this.handleTouchEvent_)
    }
};
Blockly.Toolbox.TreeControl.prototype.handleTouchEvent_ = function(a) {
    a.preventDefault();
    var b = this.getNodeFromEvent_(a);
    b && a.type === goog.events.EventType.TOUCHSTART && window.setTimeout(function() {
        b.onMouseDown(a)
    }, 1)
};
Blockly.Toolbox.TreeControl.prototype.createNode = function(a) {
    return new Blockly.Toolbox.TreeNode(a ? goog.html.SafeHtml.htmlEscape(a) : goog.html.SafeHtml.EMPTY, this.getConfig(), this.getDomHelper())
};
Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function(a) {
    this.selectedItem_ != a && (goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, a), a && a.blocks && a.blocks.length ? Blockly.Toolbox.flyout_.show(a.blocks) : Blockly.Toolbox.flyout_.hide())
};
Blockly.Toolbox.TreeNode = function(a, b, c) {
    goog.ui.tree.TreeNode.call(this, a, b, c);
    a = function() {
        Blockly.fireUiEvent(window, "resize")
    };
    goog.events.listen(Blockly.Toolbox.tree_, goog.ui.tree.BaseNode.EventType.EXPAND, a);
    goog.events.listen(Blockly.Toolbox.tree_, goog.ui.tree.BaseNode.EventType.COLLAPSE, a)
};
goog.inherits(Blockly.Toolbox.TreeNode, goog.ui.tree.TreeNode);
goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml = function() {
    return goog.html.SafeHtml.create("span")
};
Blockly.Toolbox.TreeNode.prototype.onMouseDown = function(a) {
    this.hasChildren() && this.isUserCollapsible_ ? (this.toggle(), this.select()) : this.isSelected() ? this.getTree().setSelectedItem(null) : this.select();
    this.updateRow()
};
Blockly.Toolbox.TreeNode.prototype.onDoubleClick_ = function(a) {};
Blockly.Variables = {};
Blockly.Variables.NAME_TYPE = "VARIABLE";
Blockly.Variables.allVariables = function(a) {
    var b;
    b = a ? a.getDescendants() : Blockly.mainWorkspace.getAllBlocks();
    a = Object.create(null);
    for (var c = 0; c < b.length; c++) {
        var d = b[c].getVars;
        if (d)
            for (var d = d.call(b[c]), e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
    }
    b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.renameVariable = function(a, b) {
    for (var c = Blockly.mainWorkspace.getAllBlocks(), d = 0; d < c.length; d++) {
        var e = c[d].renameVar;
        e && e.call(c[d], a, b)
    }
};
Blockly.Variables.flyoutCategory = function(a, b, c, d) {
    var e = Blockly.Variables.allVariables();
    e.sort(goog.string.caseInsensitiveCompare);
    e.unshift(null);
    for (var f = void 0, g = 0; g < e.length; g++)
        if (e[g] !== f) {
            var h = Blockly.Blocks.variables_get ? Blockly.Block.obtain(d, "variables_get") : null;
            h && h.initSvg();
            var k = Blockly.Blocks.variables_set ? Blockly.Block.obtain(d, "variables_set") : null;
            k && k.initSvg();
            null === e[g] ? f = (h || k).getVars()[0] : (h && h.setFieldValue(e[g], "VAR"), k && k.setFieldValue(e[g], "VAR"));
            k && a.push(k);
            h &&
                a.push(h);
            h && k ? b.push(c, 3 * c) : b.push(2 * c)
        }
};
Blockly.Variables.generateUniqueName = function() {
    var a = Blockly.Variables.allVariables(),
        b = "";
    if (a.length) {
        a.sort(goog.string.caseInsensitiveCompare);
        for (var c = 0, d = "i", e = 0, f = !1; !b;) {
            e = 0;
            for (f = !1; e < a.length && !f;) a[e].toLowerCase() == d && (f = !0), e++;
            f ? ("z" === d[0] ? (c++, d = "a") : (d = String.fromCharCode(d.charCodeAt(0) + 1), "l" == d[0] && (d = String.fromCharCode(d.charCodeAt(0) + 1))), 0 < c && (d += c)) : b = d
        }
    } else b = "i";
    return b
};
Blockly.FieldVariable = function(a, b) {
    var c;
    if (b) {
        var d = this;
        c = function(a) {
            var c = Blockly.FieldVariable.dropdownChange.call(d, a);
            a = void 0 === c ? a : null === c ? d.getValue() : c;
            b.call(d, a);
            return c
        }
    } else c = Blockly.FieldVariable.dropdownChange;
    Blockly.FieldVariable.superClass_.constructor.call(this, Blockly.FieldVariable.dropdownCreate, c);
    a ? this.setValue(a) : this.setValue(Blockly.Variables.generateUniqueName())
};
goog.inherits(Blockly.FieldVariable, Blockly.FieldDropdown);
Blockly.FieldVariable.prototype.clone = function() {
    return new Blockly.FieldVariable(this.getValue(), this.changeHandler_)
};
Blockly.FieldVariable.prototype.getValue = function() {
    return this.getText()
};
Blockly.FieldVariable.prototype.setValue = function(a) {
    this.value_ = a;
    this.setText(a)
};
Blockly.FieldVariable.dropdownCreate = function() {
    var a = Blockly.Variables.allVariables(),
        b = this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    0 >= a.length && a.push(" ");
    for (var b = [], c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.FieldVariable.dropdownChange = function(a) {
    function b(a, b) {
        Blockly.hideChaff();
        var c = window.prompt(a, b);
        return c && c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")
    }
    if (a == Blockly.Msg.RENAME_VARIABLE) {
        var c = this.getText();
        (a = b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", c), c)) && Blockly.Variables.renameVariable(c, a);
        return null
    }
    if (a == Blockly.Msg.NEW_VARIABLE) return (a = b(Blockly.Msg.NEW_VARIABLE_TITLE, "")) ? (Blockly.Variables.renameVariable(a, a), a) : null
};
Blockly.Generator = function(a) {
    this.name_ = a;
    this.RESERVED_WORDS_ = "";
    this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ = new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, "g")
};
Blockly.Generator.NAME_TYPE = "generated_function";
Blockly.Generator.prototype.INFINITE_LOOP_TRAP = null;
Blockly.Generator.prototype.STATEMENT_PREFIX = null;
Blockly.Generator.prototype.workspaceToCode = function() {
    var a = [];
    this.init();
    for (var b = Blockly.mainWorkspace.getTopBlocks(!0), c = 0, d; d = b[c]; c++) {
        var e = this.blockToCode(d);
        goog.isArray(e) && (e = e[0]);
        e && (d.outputConnection && this.scrubNakedValue && (e = this.scrubNakedValue(e)), a.push(e))
    }
    a = a.join("\n");
    a = this.finish(a);
    a = a.replace(/^\s+\n/, "");
    a = a.replace(/\n\s+$/, "\n");
    return a = a.replace(/[ \t]+\n/g, "\n")
};
Blockly.Generator.prototype.prefixLines = function(a, b) {
    return b + a.replace(/\n(.)/g, "\n" + b + "$1")
};
Blockly.Generator.prototype.allNestedComments = function(a) {
    var b = [];
    a = a.getDescendants();
    for (var c = 0; c < a.length; c++) {
        var d = a[c].getCommentText();
        d && b.push(d)
    }
    b.length && b.push("");
    return b.join("\n")
};
Blockly.Generator.prototype.blockToCode = function(a) {
    if (!a) return "";
    if (a.disabled) return this.blockToCode(a.getNextBlock());
    var b = this[a.type];
    if (!b) throw 'Language "' + this.name_ + '" does not know how to generate code for block type "' + a.type + '".';
    b = b.call(a, a);
    if (goog.isArray(b)) return [this.scrub_(a, b[0]), b[1]];
    if (goog.isString(b)) return this.STATEMENT_PREFIX && (b = this.STATEMENT_PREFIX.replace(/%1/g, "'" + a.id + "'") + b), this.scrub_(a, b);
    if (null === b) return "";
    throw "Invalid code generated: " + b;
};
Blockly.Generator.prototype.valueToCode = function(a, b, c) {
    if (isNaN(c)) throw 'Expecting valid order from block "' + a.type + '".';
    a = a.getInputTargetBlock(b);
    if (!a) return "";
    var d = this.blockToCode(a);
    if ("" === d) return "";
    if (!goog.isArray(d)) throw 'Expecting tuple from value block "' + a.type + '".';
    b = d[0];
    d = d[1];
    if (isNaN(d)) throw 'Expecting valid order from value block "' + a.type + '".';
    b && c <= d && c != d && 0 != c && 99 != c && (b = "(" + b + ")");
    return b
};
Blockly.Generator.prototype.statementToCode = function(a, b) {
    var c = a.getInputTargetBlock(b),
        d = this.blockToCode(c);
    if (!goog.isString(d)) throw 'Expecting code from statement block "' + c.type + '".';
    d && (d = this.prefixLines(d, this.INDENT));
    return d
};
Blockly.Generator.prototype.addLoopTrap = function(a, b) {
    this.INFINITE_LOOP_TRAP && (a = this.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + b + "'") + a);
    this.STATEMENT_PREFIX && (a += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, "'" + b + "'"), this.INDENT));
    return a
};
Blockly.Generator.prototype.INDENT = "  ";
Blockly.Generator.prototype.addReservedWords = function(a) {
    this.RESERVED_WORDS_ += a + ","
};
Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_ = "{leCUI8hutHZI4480Dc}";
Blockly.Generator.prototype.provideFunction_ = function(a, b) {
    if (!this.definitions_[a]) {
        var c = this.variableDB_.getDistinctName(a, this.NAME_TYPE);
        this.functionNames_[a] = c;
        this.definitions_[a] = b.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, c)
    }
    return this.functionNames_[a]
};
Blockly.Names = function(a) {
    this.reservedDict_ = Object.create(null);
    if (a) {
        a = a.split(",");
        for (var b = 0; b < a.length; b++) this.reservedDict_[a[b]] = !0
    }
    this.reset()
};
Blockly.Names.prototype.reset = function() {
    this.db_ = Object.create(null);
    this.dbReverse_ = Object.create(null)
};
Blockly.Names.prototype.getName = function(a, b) {
    var c = a.toLowerCase() + "_" + b;
    if (c in this.db_) return this.db_[c];
    var d = this.getDistinctName(a, b);
    return this.db_[c] = d
};
Blockly.Names.prototype.getDistinctName = function(a, b) {
    for (var c = this.safeName_(a), d = ""; this.dbReverse_[c + d] || c + d in this.reservedDict_;) d = d ? d + 1 : 2;
    c += d;
    this.dbReverse_[c] = !0;
    return c
};
Blockly.Names.prototype.safeName_ = function(a) {
    a ? (a = encodeURI(a.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf(a[0]) && (a = "my_" + a)) : a = "unnamed";
    return a
};
Blockly.Names.equals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
Blockly.Procedures = {};
Blockly.Procedures.NAME_TYPE = "PROCEDURE";
Blockly.Procedures.allProcedures = function() {
    for (var a = Blockly.mainWorkspace.getAllBlocks(), b = [], c = [], d = 0; d < a.length; d++) {
        var e = a[d].getProcedureDef;
        e && (e = e.call(a[d])) && (e[2] ? b.push(e) : c.push(e))
    }
    c.sort(Blockly.Procedures.procTupleComparator_);
    b.sort(Blockly.Procedures.procTupleComparator_);
    return [c, b]
};
Blockly.Procedures.procTupleComparator_ = function(a, b) {
    var c = a[0].toLowerCase(),
        d = b[0].toLowerCase();
    return c > d ? 1 : c < d ? -1 : 0
};
Blockly.Procedures.findLegalName = function(a, b) {
    if (b.isInFlyout) return a;
    for (; !Blockly.Procedures.isLegalName(a, b.workspace, b);) {
        var c = a.match(/^(.*?)(\d+)$/);
        a = c ? c[1] + (parseInt(c[2], 10) + 1) : a + "2"
    }
    return a
};
Blockly.Procedures.isLegalName = function(a, b, c) {
    b = b.getAllBlocks();
    for (var d = 0; d < b.length; d++)
        if (b[d] != c) {
            var e = b[d].getProcedureDef;
            if (e && (e = e.call(b[d]), Blockly.Names.equals(e[0], a))) return !1
        }
    return !0
};
Blockly.Procedures.rename = function(a) {
    a = a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    if ("" !== a) {
        a = Blockly.Procedures.findLegalName(a, this.sourceBlock_);
        for (var b = this.sourceBlock_.workspace.getAllBlocks(), c = 0; c < b.length; c++) {
            var d = b[c].renameProcedure;
            d && d.call(b[c], this.text_, a)
        }
    }
    return a
};
Blockly.Procedures.flyoutCategory = function(a, b, c, d) {
    function e(e, f) {
        for (var k = 0; k < e.length; k++) {
            var l = Blockly.Block.obtain(d, f);
            l.setFieldValue(e[k][0], "NAME");
            for (var p = [], m = 0; m < e[k][1].length; m++) p[m] = "ARG" + m;
            l.setProcedureParameters(e[k][1], p);
            l.initSvg();
            a.push(l);
            b.push(2 * c)
        }
    }
    if (Blockly.Blocks.procedures_defnoreturn) {
        var f = Blockly.Block.obtain(d, "procedures_defnoreturn");
        f.initSvg();
        a.push(f);
        b.push(2 * c)
    }
    Blockly.Blocks.procedures_defreturn && (f = Blockly.Block.obtain(d, "procedures_defreturn"), f.initSvg(),
        a.push(f), b.push(2 * c));
    Blockly.Blocks.procedures_ifreturn && (f = Blockly.Block.obtain(d, "procedures_ifreturn"), f.initSvg(), a.push(f), b.push(2 * c));
    b.length && (b[b.length - 1] = 3 * c);
    f = Blockly.Procedures.allProcedures();
    e(f[0], "procedures_callnoreturn");
    e(f[1], "procedures_callreturn")
};
Blockly.Procedures.getCallers = function(a, b) {
    for (var c = [], d = b.getAllBlocks(), e = 0; e < d.length; e++) {
        var f = d[e].getProcedureCall;
        f && (f = f.call(d[e])) && Blockly.Names.equals(f, a) && c.push(d[e])
    }
    return c
};
Blockly.Procedures.disposeCallers = function(a, b) {
    for (var c = Blockly.Procedures.getCallers(a, b), d = 0; d < c.length; d++) c[d].dispose(!0, !1)
};
Blockly.Procedures.mutateCallers = function(a, b, c, d) {
    a = Blockly.Procedures.getCallers(a, b);
    for (b = 0; b < a.length; b++) a[b].setProcedureParameters(c, d)
};
Blockly.Procedures.getDefinition = function(a, b) {
    for (var c = b.getAllBlocks(), d = 0; d < c.length; d++) {
        var e = c[d].getProcedureDef;
        if (e && (e = e.call(c[d])) && Blockly.Names.equals(e[0], a)) return c[d]
    }
    return null
};
var rtclient = {
    INSTALL_SCOPE: "https://www.googleapis.com/auth/drive.install",
    FILE_SCOPE: "https://www.googleapis.com/auth/drive.file",
    APPDATA_SCOPE: "https://www.googleapis.com/auth/drive.appdata",
    OPENID_SCOPE: "openid",
    REALTIME_MIMETYPE: "application/vnd.google-apps.drive-sdk",
    FOLDER_KEY: "folderId",
    getParams: function() {
        function a(a) {
            a = a.slice(1).split("&");
            for (var c = 0; c < a.length; c++) {
                var f = a[c].split("=");
                b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
            }
        }
        var b = {},
            c = window.location.hash;
        c && a(c);
        (c =
            window.location.search) && a(c);
        return b
    }
};
rtclient.params = rtclient.getParams();
rtclient.getOption = function(a, b, c) {
    if (a.hasOwnProperty(b)) return a[b];
    void 0 === c && console.error(b + " should be present in the options.");
    return c
};
rtclient.Authorizer = function(a) {
    this.clientId = rtclient.getOption(a, "clientId");
    this.userId = rtclient.params.userId;
    this.authButton = document.getElementById(rtclient.getOption(a, "authButtonElementId"));
    this.authDiv = document.getElementById(rtclient.getOption(a, "authDivElementId"))
};
rtclient.Authorizer.prototype.start = function(a) {
    var b = this;
    gapi.load("auth:client,drive-realtime,drive-share", function() {
        b.authorize(a)
    })
};
rtclient.Authorizer.prototype.authorize = function(a) {
    var b = this.clientId,
        c = this.userId,
        d = this,
        e = function(b) {
            b && !b.error ? (d.authButton.disabled = !0, d.fetchUserId(a), d.authDiv.style.display = "none") : (d.authButton.disabled = !1, d.authButton.onclick = f, d.authDiv.style.display = "block")
        },
        f = function() {
            gapi.auth.authorize({
                client_id: b,
                scope: [rtclient.INSTALL_SCOPE, rtclient.FILE_SCOPE, rtclient.OPENID_SCOPE, rtclient.APPDATA_SCOPE],
                user_id: c,
                immediate: !1
            }, e)
        };
    gapi.auth.authorize({
        client_id: b,
        scope: [rtclient.INSTALL_SCOPE,
            rtclient.FILE_SCOPE, rtclient.OPENID_SCOPE, rtclient.APPDATA_SCOPE
        ],
        user_id: c,
        immediate: !0
    }, e)
};
rtclient.Authorizer.prototype.fetchUserId = function(a) {
    var b = this;
    gapi.client.load("oauth2", "v2", function() {
        gapi.client.oauth2.userinfo.get().execute(function(c) {
            c.id && (b.userId = c.id);
            a && a()
        })
    })
};
rtclient.createRealtimeFile = function(a, b, c, d) {
    function e(c) {
        gapi.client.drive.files.insert({
            resource: {
                mimeType: b,
                title: a,
                parents: [{
                    id: c
                }]
            }
        }).execute(d)
    }

    function f() {
        function a(b) {
            gapi.client.drive.properties.insert({
                fileId: "appdata",
                resource: {
                    key: rtclient.FOLDER_KEY,
                    value: b
                }
            }).execute(function(a) {
                e(b)
            })
        }

        function b() {
            gapi.client.drive.files.insert({
                resource: {
                    mimeType: "application/vnd.google-apps.folder",
                    title: c
                }
            }).execute(function(b) {
                a(b.id)
            })
        }
        gapi.client.drive.properties.get({
            fileId: "appdata",
            propertyKey: rtclient.FOLDER_KEY
        }).execute(function(d) {
            if (d.error) c ?
                b() : a("root");
            else {
                var f = d.result.value;
                gapi.client.drive.files.get({
                    fileId: f
                }).execute(function(a) {
                    a.error || a.labels.trashed ? b() : e(f)
                })
            }
        })
    }
    gapi.client.load("drive", "v2", function() {
        f()
    })
};
rtclient.getFileMetadata = function(a, b) {
    gapi.client.load("drive", "v2", function() {
        gapi.client.drive.files.get({
            fileId: a
        }).execute(b)
    })
};
rtclient.parseState = function(a) {
    try {
        return JSON.parse(a)
    } catch (b) {
        return null
    }
};
rtclient.RealtimeLoader = function(a) {
    this.onFileLoaded = rtclient.getOption(a, "onFileLoaded");
    this.newFileMimeType = rtclient.getOption(a, "newFileMimeType", rtclient.REALTIME_MIMETYPE);
    this.initializeModel = rtclient.getOption(a, "initializeModel");
    this.registerTypes = rtclient.getOption(a, "registerTypes", function() {});
    this.afterAuth = rtclient.getOption(a, "afterAuth", function() {});
    this.autoCreate = rtclient.getOption(a, "autoCreate", !1);
    this.defaultTitle = rtclient.getOption(a, "defaultTitle", "New Realtime File");
    this.defaultFolderTitle = rtclient.getOption(a, "defaultFolderTitle", "");
    this.afterCreate = rtclient.getOption(a, "afterCreate", function() {});
    this.authorizer = new rtclient.Authorizer(a)
};
rtclient.RealtimeLoader.prototype.redirectTo = function(a, b) {
    var c = [];
    a && c.push("fileIds=" + a.join(","));
    b && c.push("userId=" + b);
    c = 0 == c.length ? window.location.pathname : window.location.pathname + "#" + c.join("&");
    window.history && window.history.replaceState ? window.history.replaceState("Google Drive Realtime API Playground", "Google Drive Realtime API Playground", c) : window.location.href = c;
    rtclient.params = rtclient.getParams();
    for (var d in a) gapi.drive.realtime.load(a[d], this.onFileLoaded, this.initializeModel,
        this.handleErrors)
};
rtclient.RealtimeLoader.prototype.start = function() {
    var a = this;
    this.authorizer.start(function() {
        a.registerTypes && a.registerTypes();
        a.afterAuth && a.afterAuth();
        a.load()
    })
};
rtclient.RealtimeLoader.prototype.handleErrors = function(a) {
    a.type == gapi.drive.realtime.ErrorType.TOKEN_REFRESH_REQUIRED ? this.authorizer.authorize() : a.type == gapi.drive.realtime.ErrorType.CLIENT_ERROR ? (alert("An Error happened: " + a.message), window.location.href = "/") : a.type == gapi.drive.realtime.ErrorType.NOT_FOUND && (alert("The file was not found. It does not exist or you do not have read access to the file."), window.location.href = "/")
};
rtclient.RealtimeLoader.prototype.load = function() {
    var a = rtclient.params.fileIds;
    a && (a = a.split(","));
    var b = this.authorizer.userId,
        b = rtclient.params.state;
    if (a)
        for (var c in a) gapi.drive.realtime.load(a[c], this.onFileLoaded, this.initializeModel, this.handleErrors);
    else {
        if (b && (c = rtclient.parseState(b), "open" == c.action)) {
            a = c.ids;
            b = c.userId;
            this.redirectTo(a, b);
            return
        }
        this.autoCreate && this.createNewFileAndRedirect()
    }
};
rtclient.RealtimeLoader.prototype.createNewFileAndRedirect = function() {
    var a = this;
    rtclient.createRealtimeFile(this.defaultTitle, this.newFileMimeType, this.defaultFolderTitle, function(b) {
        b.id ? (a.afterCreate && a.afterCreate(b.id), a.redirectTo([b.id], a.authorizer.userId)) : (console.error("Error creating file."), console.error(b))
    })
};
// Copyright 2014 Google Inc.  Apache License 2.0
Blockly.Realtime = {};
Blockly.Realtime.PROGRESS_URL_ = "media/progress.gif";
Blockly.Realtime.enabled_ = !1;
Blockly.Realtime.document_ = null;
Blockly.Realtime.model_ = null;
Blockly.Realtime.sessionId_ = null;
Blockly.Realtime.initUi_ = null;
Blockly.Realtime.blocksMap_ = null;
Blockly.Realtime.withinSync = !1;
Blockly.Realtime.realtimeLoader_ = null;
Blockly.Realtime.chatBoxElementId_ = null;
Blockly.Realtime.chatBoxInitialText_ = null;
Blockly.Realtime.withinUndo_ = !1;
Blockly.Realtime.isEnabled = function() {
    return Blockly.Realtime.enabled_
};
Blockly.Realtime.undoElementId_ = null;
Blockly.Realtime.redoElementId_ = null;
Blockly.Realtime.PROGRESS_URL_ = "media/progress.gif";
Blockly.Realtime.ANONYMOUS_URL_ = "media/anon.jpeg";
Blockly.Realtime.initializeModel_ = function(a) {
    Blockly.Realtime.model_ = a;
    var b = a.createMap();
    a.getRoot().set("blocks", b);
    b = a.createList();
    a.getRoot().set("topBlocks", b);
    Blockly.Realtime.chatBoxElementId_ && a.getRoot().set(Blockly.Realtime.chatBoxElementId_, a.createString(Blockly.Realtime.chatBoxInitialText_))
};
Blockly.Realtime.removeBlock = function(a) {
    Blockly.Realtime.blocksMap_["delete"](a.id.toString())
};
Blockly.Realtime.addTopBlock = function(a) {
    -1 == Blockly.Realtime.topBlocks_.indexOf(a) && Blockly.Realtime.topBlocks_.push(a)
};
Blockly.Realtime.removeTopBlock = function(a) {
    Blockly.Realtime.topBlocks_.removeValue(a)
};
Blockly.Realtime.obtainBlock = function(a, b) {
    return Blockly.Realtime.model_.create(Blockly.Block, a, b)
};
Blockly.Realtime.getBlockById = function(a) {
    return Blockly.Realtime.blocksMap_.get(a)
};
Blockly.Realtime.logEvent_ = function(a) {
    console.log("Object event:");
    console.log("  id: " + a.target.id);
    console.log("  type: " + a.type);
    if (a = a.events)
        for (var b = a.length, c = 0; c < b; c++) {
            var d = a[c];
            console.log("  child event:");
            console.log("    id: " + d.target.id);
            console.log("    type: " + d.type)
        }
};
Blockly.Realtime.onObjectChange_ = function(a) {
    var b = a.events;
    a = a.events.length;
    for (var c = 0; c < a; c++) {
        var d = b[c];
        if (!d.isLocal || Blockly.Realtime.withinUndo_) {
            var e = d.target;
            "value_changed" == d.type && ("xmlDom" == d.property ? Blockly.Realtime.doWithinSync_(function() {
                Blockly.Realtime.placeBlockOnWorkspace_(e, !1);
                Blockly.Realtime.moveBlock_(e)
            }) : "relativeX" != d.property && "relativeY" != d.property || Blockly.Realtime.doWithinSync_(function() {
                e.svg_ || Blockly.Realtime.placeBlockOnWorkspace_(e, !1);
                Blockly.Realtime.moveBlock_(e)
            }))
        }
    }
};
Blockly.Realtime.onBlocksMapChange_ = function(a) {
    if (!a.isLocal || Blockly.Realtime.withinUndo_) {
        var b = a.newValue;
        b ? Blockly.Realtime.placeBlockOnWorkspace_(b, !a.oldValue) : (b = a.oldValue, Blockly.Realtime.deleteBlock(b))
    }
};
Blockly.Realtime.doWithinSync_ = function(a) {
    if (Blockly.Realtime.withinSync) a();
    else try {
        Blockly.Realtime.withinSync = !0, a()
    } finally {
        Blockly.Realtime.withinSync = !1
    }
};
Blockly.Realtime.placeBlockOnWorkspace_ = function(a, b) {
    Blockly.Realtime.doWithinSync_(function() {
        var c = Blockly.Xml.textToDom(a.xmlDom).firstChild;
        if (c = Blockly.Xml.domToBlock(Blockly.mainWorkspace, c, !0)) b && c.workspace.addTopBlock(c), (b || goog.array.contains(Blockly.Realtime.topBlocks_, c)) && Blockly.Realtime.moveBlock_(c)
    })
};
Blockly.Realtime.moveBlock_ = function(a) {
    if (!isNaN(a.relativeX) && !isNaN(a.relativeY)) {
        var b = Blockly.svgSize().width,
            c = a.getRelativeToSurfaceXY(),
            d = a.relativeX - c.x;
        a.moveBy(Blockly.RTL ? b - d : d, a.relativeY - c.y)
    }
};
Blockly.Realtime.deleteBlock = function(a) {
    Blockly.Realtime.doWithinSync_(function() {
        a.dispose(!0, !0, !0)
    })
};
Blockly.Realtime.loadBlocks_ = function() {
    for (var a = Blockly.Realtime.topBlocks_, b = 0; b < a.length; b++) {
        var c = a.get(b);
        Blockly.Realtime.placeBlockOnWorkspace_(c, !0)
    }
};
Blockly.Realtime.blockChanged = function(a) {
    if (a.workspace == Blockly.mainWorkspace && Blockly.Realtime.isEnabled() && !Blockly.Realtime.withinSync) {
        a = a.getRootBlock();
        var b = a.getRelativeToSurfaceXY(),
            c = !1,
            d = Blockly.Xml.blockToDom_(a);
        d.setAttribute("id", a.id);
        var e = goog.dom.createDom("xml");
        e.appendChild(d);
        d = Blockly.Xml.domToText(e);
        d != a.xmlDom && (c = !0, a.xmlDom = d);
        if (a.relativeX != b.x || a.relativeY != b.y) a.relativeX = b.x, a.relativeY = b.y, c = !0;
        c && Blockly.Realtime.blocksMap_.set(a.id.toString(), a)
    }
};
Blockly.Realtime.onFileLoaded_ = function(a) {
    Blockly.Realtime.document_ = a;
    Blockly.Realtime.sessionId_ = Blockly.Realtime.getSessionId_(a);
    Blockly.Realtime.model_ = a.getModel();
    Blockly.Realtime.blocksMap_ = Blockly.Realtime.model_.getRoot().get("blocks");
    Blockly.Realtime.topBlocks_ = Blockly.Realtime.model_.getRoot().get("topBlocks");
    Blockly.Realtime.model_.getRoot().addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, Blockly.Realtime.onObjectChange_);
    Blockly.Realtime.blocksMap_.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED,
        Blockly.Realtime.onBlocksMapChange_);
    Blockly.Realtime.initUi_();
    a.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, Blockly.Realtime.onCollaboratorJoined_);
    a.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, Blockly.Realtime.onCollaboratorLeft_);
    Blockly.Realtime.updateCollabUi_();
    Blockly.Realtime.loadBlocks_()
};
Blockly.Realtime.getSessionId_ = function(a) {
    a = a.getCollaborators();
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (c.isMe) return c.sessionId
    }
};
Blockly.Realtime.registerTypes_ = function() {
    var a = gapi.drive.realtime.custom;
    a.registerType(Blockly.Block, "Block");
    Blockly.Block.prototype.id = a.collaborativeField("id");
    Blockly.Block.prototype.xmlDom = a.collaborativeField("xmlDom");
    Blockly.Block.prototype.relativeX = a.collaborativeField("relativeX");
    Blockly.Block.prototype.relativeY = a.collaborativeField("relativeY");
    a.setInitializer(Blockly.Block, Blockly.Block.prototype.initialize)
};
Blockly.Realtime.REAUTH_INTERVAL_IN_MILLISECONDS_ = 18E5;
Blockly.Realtime.afterAuth_ = function() {
    window.setTimeout(function() {
        Blockly.Realtime.realtimeLoader_.authorizer.authorize(Blockly.Realtime.afterAuth_)
    }, Blockly.Realtime.REAUTH_INTERVAL_IN_MILLISECONDS_)
};
Blockly.Realtime.afterCreate_ = function(a) {
    var b = gapi.client.drive.permissions.insert({
        fileId: a,
        resource: {
            type: "anyone",
            role: "writer",
            value: "default",
            withLink: !0
        }
    });
    b.execute(function(c) {
        c.error && Blockly.Realtime.getUserDomain(a, function(c) {
            b = gapi.client.drive.permissions.insert({
                fileId: a,
                resource: {
                    type: "domain",
                    role: "writer",
                    value: c,
                    withLink: !0
                }
            });
            b.execute(function(a) {})
        })
    })
};
Blockly.Realtime.getUserDomain = function(a, b) {
    gapi.client.drive.permissions.list({
        fileId: a
    }).execute(function(a) {
        for (var d = 0; d < a.items.length; d++) {
            var e = a.items[d];
            if ("owner" == e.role) {
                b(e.domain);
                break
            }
        }
    })
};
Blockly.Realtime.rtclientOptions_ = {
    clientId: null,
    authButtonElementId: "authorizeButton",
    authDivElementId: "authButtonDiv",
    initializeModel: Blockly.Realtime.initializeModel_,
    autoCreate: !0,
    defaultTitle: "Realtime Blockly File",
    defaultFolderTitle: "Realtime Blockly Folder",
    newFileMimeType: null,
    onFileLoaded: Blockly.Realtime.onFileLoaded_,
    registerTypes: Blockly.Realtime.registerTypes_,
    afterAuth: Blockly.Realtime.afterAuth_,
    afterCreate: Blockly.Realtime.afterCreate_
};
Blockly.Realtime.parseOptions_ = function(a) {
    var b = rtclient.getOption(a, "chatbox");
    b && (Blockly.Realtime.chatBoxElementId_ = rtclient.getOption(b, "elementId"), Blockly.Realtime.chatBoxInitialText_ = rtclient.getOption(b, "initText", Blockly.Msg.CHAT));
    Blockly.Realtime.rtclientOptions_.clientId = rtclient.getOption(a, "clientId");
    Blockly.Realtime.collabElementId = rtclient.getOption(a, "collabElementId")
};
Blockly.Realtime.startRealtime = function(a, b, c) {
    Blockly.Realtime.parseOptions_(c);
    Blockly.Realtime.enabled_ = !0;
    Blockly.Realtime.addAuthUi_(b);
    Blockly.Realtime.initUi_ = function() {
        a();
        if (Blockly.Realtime.chatBoxElementId_) {
            var b = Blockly.Realtime.model_.getRoot().get(Blockly.Realtime.chatBoxElementId_),
                c = document.getElementById(Blockly.Realtime.chatBoxElementId_);
            gapi.drive.realtime.databinding.bindString(b, c);
            c.disabled = !1
        }
    };
    Blockly.Realtime.realtimeLoader_ = new rtclient.RealtimeLoader(Blockly.Realtime.rtclientOptions_);
    Blockly.Realtime.realtimeLoader_.start()
};
Blockly.Realtime.addAuthUi_ = function(a) {
    a.style.background = "url(" + Blockly.pathToBlockly + Blockly.Realtime.PROGRESS_URL_ + ") no-repeat center center";
    var b = goog.style.getBounds(a),
        c = goog.dom.createDom("div");
    c.id = Blockly.Realtime.rtclientOptions_.authDivElementId;
    var d = goog.dom.createDom("p", null, Blockly.Msg.AUTH);
    c.appendChild(d);
    d = goog.dom.createDom("button", null, "Authorize");
    d.id = Blockly.Realtime.rtclientOptions_.authButtonElementId;
    c.appendChild(d);
    a.appendChild(c);
    c.style.display = "none";
    c.style.position =
        "relative";
    c.style.textAlign = "center";
    c.style.border = "1px solid";
    c.style.backgroundColor = "#f6f9ff";
    c.style.borderRadius = "15px";
    c.style.boxShadow = "10px 10px 5px #888";
    c.style.width = b.width / 3 + "px";
    a = goog.style.getBounds(c);
    c.style.left = (b.width - a.width) / 3 + "px";
    c.style.top = (b.height - a.height) / 4 + "px";
    return c
};
Blockly.Realtime.updateCollabUi_ = function() {
    if (Blockly.Realtime.collabElementId) {
        var a = goog.dom.getElement(Blockly.Realtime.collabElementId);
        goog.dom.removeChildren(a);
        for (var b = Blockly.Realtime.document_.getCollaborators(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = goog.dom.createDom("img", {
                    src: d.photoUrl || Blockly.pathToBlockly + Blockly.Realtime.ANONYMOUS_URL_,
                    alt: d.displayName,
                    title: d.displayName + (d.isMe ? " (" + Blockly.Msg.ME + ")" : "")
                });
            e.style.backgroundColor = d.color;
            goog.dom.appendChild(a, e)
        }
    }
};
Blockly.Realtime.onCollaboratorJoined_ = function(a) {
    Blockly.Realtime.updateCollabUi_()
};
Blockly.Realtime.onCollaboratorLeft_ = function(a) {
    Blockly.Realtime.updateCollabUi_()
};
Blockly.Realtime.doCommand = function(a) {
    a()
};
Blockly.Realtime.genUid = function(a) {
    var b = Blockly.Realtime.sessionId_ + "-" + a;
    return Blockly.Realtime.blocksMap_.has(b) ? Blockly.Realtime.genUid("-" + a) : b
};
Blockly.Css = {};
Blockly.Css.inject = function() {
    var a = Blockly.Css.CONTENT.join("\n"),
        b = Blockly.pathToBlockly.replace(/[\\\/]$/, ""),
        a = a.replace(/<<<PATH>>>/g, b);
    goog.cssom.addCssText(a)
};
Blockly.Css.CONTENT=[".blocklySvg {",
"  background-color: #fff;",
"}",
".blocklyWidgetDiv {",
"  position: absolute;",
"  display: none;",
"  z-index: 999;",
"}",
".blocklyDraggable {",
"  cursor: url(<<<PATH>>>/media/handopen.cur) 8 5, auto;",
"}",
".blocklyResizeSE {",
"  fill: #aaa;",
"  cursor: se-resize;",
"}",
".blocklyResizeSW {",
"  fill: #aaa;",
"  cursor: sw-resize;",
"}",
".blocklyResizeLine {",
"  stroke: #;",
"}",
".blocklyHighlightedConnectionPath {",
"  stroke-width: 4px;",
"  stroke: #fc3;",
"  fill: none;",
"}",
".blocklyPathLight {",
"  fill: none;",
"}",
".blocklySelected>.blocklyPath {",
"  stroke-width: 3px;",
"  stroke: #fc3;",
"}",
".blocklySelected>.blocklyPathLight {",
"  display: none;",
"}",
".blocklyDragging>.blocklyPath,",
".blocklyDragging>.blocklyPathLight {",
"  fill-opacity: .8;",
"  stroke-opacity: .8;",
"}",
".blocklyDragging>.blocklyPathDark {",
"  display: none;",
"}",
".blocklyDisabled>.blocklyPath {",
"  fill-opacity: .5;",
"  stroke-opacity: .5;",
"}",
".blocklyDisabled>.blocklyPathLight,",
".blocklyDisabled>.blocklyPathDark {",
"  display: none;",
"}",
".blocklyText {",
"  cursor: default;",
"  font-family: sans-serif;",
"  font-size: 11pt;",
"  fill: #fff;",
"}",
".blocklyNonEditableText>text {",
"  pointer-events: none;",
"}",
".blocklyNonEditableText>rect,",
".blocklyEditableText>rect {",
"  fill: #fff;",
"  fill-opacity: .6;",
"}",
".blocklyNonEditableText>text,",
".blocklyEditableText>text {",
"  fill: #000;",
"}",
".blocklyEditableText:hover>rect {",
"  stroke-width: 1;",
"  stroke: #fff;",
"}",
".blocklyBubbleText {",
"  fill: #000;",
"}",
".blocklySvg text {",
"  -moz-user-select: none;",
"  -webkit-user-select: none;",
"  user-select: none;",
"  cursor: inherit;",
"}",
".blocklyHidden {",
"  display: none;",
"}",
".blocklyFieldDropdown:not(.blocklyHidden) {",
"  display: block;",
"}",
".blocklyTooltipBackground {",
"  fill: #fafafa;",
"}",
".blocklyTooltipShadow,",
".blocklyDropdownMenuShadow {",
"  fill: #bbb;",
"  filter: url(#blocklyShadowFilter);",
"}",
".blocklyTooltipText {",
"  font-family: Droid Sans Mono;",
"  font-size: 10pt;",
"  fill: #8a8a85;",
"}",
".blocklyIconShield {",
"  cursor: default;",
"  fill: #000000;",
"fill-opacity: .2;",
"  stroke-width: 0px;",
"  stroke: #ccc;",
"}",
".blocklyIconGroup:hover>.blocklyIconShield {",
"  fill: #ffffff;",
"  stroke: #fff;",
"}",
".blocklyIconGroup:hover>.blocklyIconMark {",
"  fill: #fff;",
"}",
".blocklyIconMark {",
"  cursor: default !important;",
"  font-family: sans-serif;",
"  font-size: 9pt;",
"  font-weight: bold;",
"  fill: #ccc;",
"  text-anchor: middle;",
"}",
".blocklyWarningBody {",
"}",
".blocklyMinimalBody {",
"  margin: 0;",
"  padding: 0;",
"}",
".blocklyCommentTextarea {",
"  margin: 0;",
"  padding: 2px;",
"  border: 0;",
"  resize: none;",
"  background-color: #ffc;",
"}",
".blocklyHtmlInput {",
"  font-family: sans-serif;",
"  font-size: 11pt;",
"  border: none;",
"  outline: none;",
"  width: 100%",
"}",
".blocklyMutatorBackground {",
"  fill: #fff;",
"  stroke-width: 1;",
"  stroke: #ddd;",
"}",
".blocklyFlyoutBackground {",
"  fill: #ddd;",
"  fill-opacity: .8;",
"}",
".blocklyColourBackground {",
"  fill: #666;",
"}",
".blocklyScrollbarBackground {",
"  fill: #fff;",
"  stroke-width: 1;",
"  stroke: #e4e4e4;",
"}",
".blocklyScrollbarKnob {",
"  fill: #ccc;",
"}",
".blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,",
".blocklyScrollbarKnob:hover {",
"  fill: #bbb;",
"}",
".blocklyInvalidInput {",
"  background: #faa;",
"}",
".blocklyAngleCircle {",
"  stroke: #d2d2d2;",
"  stroke-width: 1;",
"  fill: #ffffff;",
"  ",
"}",
".blocklyAngleMarks {",
"  stroke: #d2d2d2;",
"  stroke-width: 2;",
"}",
".blocklyAngleGauge {",
"  fill: #e91e63;",
"    ",
"}",
".blocklyAngleLine {",
"  stroke: #d2d2d2;",
"  stroke-width: 3;",
"  stroke-linecap: round;",
"}",
".blocklyContextMenu {",
"  border-radius: 4px;",
"}",
".blocklyDropdownMenu {",
"  padding: 0 !important;",
"}",
".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",
".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {",
"  background: url(<<<PATH>>>/media/sprites.png) no-repeat -48px -16px !important;",
"}",
".blocklyToolboxDiv {",
"  background-color: #62AEB2;",
"  color: #FFFFFF;",
"  display: none;",
"  overflow-x: visible;",
"  overflow-y: auto;",
"  position: absolute;",
"}",
".blocklyTreeRoot {",
"  padding: 4px 0;",
"}",
".blocklyTreeRoot:focus {",
"  outline: none;",
"}",
".blocklyTreeRow {",
"  line-height: 32px;",
"  height: 40px;",
"  padding-right: 1em;",
"  white-space: nowrap;",
"  padding: 0px;",
"}",
'.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
"  padding-right: 0;",
"  padding-left: 1em !important;",
"}",
".blocklyTreeRow:hover {",
"  background-color: #2196F3;",
"}",
".blocklyTreeIcon {",
"  height: 16px;",
"  width: 16px;",
"  vertical-align: middle;",
"  background-image: url(<<<PATH>>>/media/sprites.png);",
"}",
".blocklyTreeIconClosedLtr {",
"  background-position: -32px -1px;",
"}",
".blocklyTreeIconClosedRtl {",
"  background-position: 0px -1px;",
"}",
".blocklyTreeIconOpen {",
"  background-position: -16px -1px;",
"}",
".blocklyTreeSelected>.blocklyTreeIconClosedLtr {",
"  background-position: -32px -17px;",
"}",
".blocklyTreeSelected>.blocklyTreeIconClosedRtl {",
"  background-position: 0px -17px;",
"}",
".blocklyTreeSelected>.blocklyTreeIconOpen {",
"  background-position: -16px -17px;",
"}",
".blocklyTreeIconNone,",
".blocklyTreeSelected>.blocklyTreeIconNone {",
"  background-position: -48px -1px;",
"}",
".blocklyTreeLabel {",
"  cursor: default;",
"  color: #4b4b4c;",
"  font-family: roboto;",
"  font-size: 16px;",
"  padding: 0 10px;",
"  vertical-align: middle;",
"}",
".blocklyTreeSelected .blocklyTreeLabel {",
"  color: #fff;",
"}",
".blocklyWidgetDiv .goog-palette {",
"  outline: none;",
"  cursor: default;",
"}",
".blocklyWidgetDiv .goog-palette-table {",
"  border: 1px solid #666;",
"  border-collapse: collapse;",
"}",
".blocklyWidgetDiv .goog-palette-cell {",
"  height: 13px;",
"  width: 15px;",
"  margin: 0;",
"  border: 0;",
"  text-align: center;",
"  vertical-align: middle;",
"  border-right: 1px solid #666;",
"  font-size: 1px;",
"}",
".blocklyWidgetDiv .goog-palette-colorswatch {",
"  position: relative;",
"  height: 13px;",
"  width: 15px;",
"  border: 1px solid #666;",
"}",
".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {",
"  border: 1px solid #FFF;",
"}",
".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {",
"  border: 1px solid #000;",
"  color: #fff;",
"}",
".blocklyWidgetDiv .goog-menu {",
"  background: #fff;",
"  border-color: #ccc #666 #666 #ccc;",
"  border-style: solid;",
"  border-width: 1px;",
"  cursor: default;",
"  font: normal 13px roboto, sans-serif;",
"  margin: 0;",
"  outline: none;",
"  padding: 4px 0;",
"  position: absolute;",
"  z-index: 20000;",
"}",
".blocklyWidgetDiv .goog-menuitem {",
"  color: #000;",
"  font: normal 13px roboto, sans-serif;",
"  list-style: none;",
"  margin: 0;",
"  padding: 4px 7em 4px 28px;",
"  white-space: nowrap;",
"}",
".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {",
"  padding-left: 7em;",
"  padding-right: 28px;",
"}",
".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,",
".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {",
"  padding-left: 12px;",
"}",
".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {",
"  padding-right: 20px;",
"}",
".blocklyWidgetDiv .goog-menuitem-content {",
"  color: #000;",
"  font: normal 13px Arial, sans-serif;",
"}",
".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,",
".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {",
"  color: #ccc !important;",
"}",
".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {",
"  opacity: 0.3;",
"  -moz-opacity: 0.3;",
"  filter: alpha(opacity=30);",
"}",
".blocklyWidgetDiv .goog-menuitem-highlight,",
".blocklyWidgetDiv .goog-menuitem-hover {",
"  background-color: #e4e4e4;",
"  border-color: #e4e4e4;",
"  border-style: dotted;",
"  border-width: 1px 0;",
"  padding-bottom: 3px;",
"  padding-top: 3px;",
"}",
".blocklyWidgetDiv .goog-menuitem-checkbox,",
".blocklyWidgetDiv .goog-menuitem-icon {",
"  background-repeat: no-repeat;",
"  height: 16px;",
"  left: 6px;",
"  position: absolute;",
"  right: auto;",
"  vertical-align: middle;",
"  width: 16px;",
"}",
".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,",
".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {",
"  left: auto;",
"  right: 6px;",
"}",
".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",
".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {",
"  background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;",
"}",
".blocklyWidgetDiv .goog-menuitem-accel {",
"  color: #999;",
"  direction: ltr;",
"  left: auto;",
"  padding: 0 6px;",
"  position: absolute;",
"  right: 0;",
"  text-align: right;",
"}",
".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {",
"  left: 0;",
"  right: auto;",
"  text-align: left;",
"}",
".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {",
"  text-decoration: underline;",
"}",
".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {",
"  color: #999;",
"  font-size: 12px;",
"  padding-left: 4px;",
"}",
".blocklyWidgetDiv .goog-menuseparator {",
"  border-top: 1px solid #ccc;",
"  margin: 4px 0;",
"  padding: 0;",
"}",
""];
Blockly.WidgetDiv = {};
Blockly.WidgetDiv.DIV = null;
Blockly.WidgetDiv.owner_ = null;
Blockly.WidgetDiv.dispose_ = null;
Blockly.WidgetDiv.show = function(a, b) {
    Blockly.WidgetDiv.hide();
    Blockly.WidgetDiv.owner_ = a;
    Blockly.WidgetDiv.dispose_ = b;
    Blockly.WidgetDiv.DIV.style.display = "block"
};
Blockly.WidgetDiv.hide = function() {
    Blockly.WidgetDiv.owner_ && (Blockly.WidgetDiv.DIV.style.display = "none", Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_(), Blockly.WidgetDiv.owner_ = null, Blockly.WidgetDiv.dispose_ = null, goog.dom.removeChildren(Blockly.WidgetDiv.DIV))
};
Blockly.WidgetDiv.isVisible = function() {
    return !!Blockly.WidgetDiv.owner_
};
Blockly.WidgetDiv.hideIfOwner = function(a) {
    Blockly.WidgetDiv.owner_ == a && Blockly.WidgetDiv.hide()
};
Blockly.WidgetDiv.position = function(a, b, c, d) {
    b < d.y && (b = d.y);
    Blockly.RTL ? a > c.width + d.x && (a = c.width + d.x) : a < d.x && (a = d.x);
    Blockly.WidgetDiv.DIV.style.left = a + "px";
    Blockly.WidgetDiv.DIV.style.top = b + "px"
};
Blockly.inject = function(a, b) {
    if (!goog.dom.contains(document, a)) throw "Error: container is not in current document.";
    b && Blockly.parseOptions_(b);
    var c = function() {
        Blockly.createDom_(a);
        Blockly.init_()
    };
    if (Blockly.enableRealtime) {
        var d = document.getElementById("realtime");
        d && (d.style.display = "block");
        Blockly.Realtime.startRealtime(c, a, Blockly.realtimeOptions)
    } else c()
};
Blockly.parseToolboxTree_ = function(a) {
    a ? ("string" != typeof a && "undefined" == typeof XSLTProcessor && (a = a.outerHTML), "string" == typeof a && (a = Blockly.Xml.textToDom(a))) : a = null;
    return a
};
Blockly.parseOptions_ = function(a) {
    var b = !!a.readOnly;
    if (b) var c = !1,
        d = !1,
        e = !1,
        f = !1,
        g = !1,
        h = null;
    else h = Blockly.parseToolboxTree_(a.toolbox), c = !(!h || !h.getElementsByTagName("category").length), d = a.trashcan, void 0 === d && (d = c), e = a.collapse, void 0 === e && (e = c), f = a.comments, void 0 === f && (f = c), g = a.disable, void 0 === g && (g = c);
    if (h && !c) var k = !1;
    else k = a.scrollbars, void 0 === k && (k = !0);
    var l = a.sounds;
    void 0 === l && (l = !0);
    var p = !!a.realtime,
        m = p ? a.realtimeOptions : void 0;
    Blockly.RTL = !!a.rtl;
    Blockly.collapse = e;
    Blockly.comments =
        f;
    Blockly.disable = g;
    Blockly.readOnly = b;
    Blockly.maxBlocks = a.maxBlocks || Infinity;
    Blockly.pathToBlockly = a.path || "./";
    Blockly.hasCategories = c;
    Blockly.hasScrollbars = k;
    Blockly.hasTrashcan = d;
    Blockly.hasSounds = l;
    Blockly.languageTree = h;
    Blockly.enableRealtime = p;
    Blockly.realtimeOptions = m
};
Blockly.createDom_ = function(a) {
    a.setAttribute("dir", "LTR");
    goog.ui.Component.setDefaultRightToLeft(Blockly.RTL);
    Blockly.Css.inject();
    var b = Blockly.createSvgElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:html": "http://www.w3.org/1999/xhtml",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: "1.1",
            "class": "blocklySvg"
        }, null),
        c = Blockly.createSvgElement("defs", {}, b),
        d, e;
    d = Blockly.createSvgElement("filter", {
        id: "blocklyEmboss"
    }, c);
    Blockly.createSvgElement("feGaussianBlur", {
        "in": "SourceAlpha",
        stdDeviation: 1,
        result: "blur"
    }, d);
    e = Blockly.createSvgElement("feSpecularLighting", {
        "in": "blur",
        surfaceScale: 1,
        specularConstant: .5,
        specularExponent: 10,
        "lighting-color": "white",
        result: "specOut"
    }, d);
    Blockly.createSvgElement("fePointLight", {
        x: -5E3,
        y: -1E4,
        z: 2E4
    }, e);
    Blockly.createSvgElement("feComposite", {
        "in": "specOut",
        in2: "SourceAlpha",
        operator: "in",
        result: "specOut"
    }, d);
    Blockly.createSvgElement("feComposite", {
        "in": "SourceGraphic",
        in2: "specOut",
        operator: "arithmetic",
        k1: 0,
        k2: 1,
        k3: 1,
        k4: 0
    }, d);
    d = Blockly.createSvgElement("filter", {
        id: "blocklyTrashcanShadowFilter"
    }, c);
    Blockly.createSvgElement("feGaussianBlur", {
        "in": "SourceAlpha",
        stdDeviation: 2,
        result: "blur"
    }, d);
    Blockly.createSvgElement("feOffset", {
        "in": "blur",
        dx: 1,
        dy: 1,
        result: "offsetBlur"
    }, d);
    d = Blockly.createSvgElement("feMerge", {}, d);
    Blockly.createSvgElement("feMergeNode", {
        "in": "offsetBlur"
    }, d);
    Blockly.createSvgElement("feMergeNode", {
        "in": "SourceGraphic"
    }, d);
    d = Blockly.createSvgElement("filter", {
        id: "blocklyShadowFilter"
    }, c);
    Blockly.createSvgElement("feGaussianBlur", {
            stdDeviation: 2
        },
        d);
    c = Blockly.createSvgElement("pattern", {
        id: "blocklyDisabledPattern",
        patternUnits: "userSpaceOnUse",
        width: 10,
        height: 10
    }, c);
    Blockly.createSvgElement("rect", {
        width: 10,
        height: 10,
        fill: "#aaa"
    }, c);
    Blockly.createSvgElement("path", {
        d: "M 0 0 L 10 10 M 10 0 L 0 10",
        stroke: "#cc0"
    }, c);
    Blockly.mainWorkspace = new Blockly.Workspace(Blockly.getMainWorkspaceMetrics_, Blockly.setMainWorkspaceMetrics_);
    b.appendChild(Blockly.mainWorkspace.createDom());
    Blockly.mainWorkspace.maxBlocks = Blockly.maxBlocks;
    Blockly.readOnly ||
        (Blockly.hasCategories ? Blockly.Toolbox.createDom(b, a) : (Blockly.mainWorkspace.flyout_ = new Blockly.Flyout, c = Blockly.mainWorkspace.flyout_, d = c.createDom(), c.autoClose = !1, goog.dom.insertSiblingBefore(d, Blockly.mainWorkspace.svgGroup_), Blockly.addChangeListener(function() {
            if (0 == Blockly.Block.dragMode_) {
                var a = Blockly.mainWorkspace.getMetrics();
                if (0 > a.contentTop || a.contentTop + a.contentHeight > a.viewHeight + a.viewTop || a.contentLeft < (Blockly.RTL ? a.viewLeft : 0) || a.contentLeft + a.contentWidth > (Blockly.RTL ? a.viewWidth :
                        a.viewWidth + a.viewLeft))
                    for (var b = Blockly.mainWorkspace.getTopBlocks(!1), c = 0, d; d = b[c]; c++) {
                        var e = d.getRelativeToSurfaceXY(),
                            p = d.getHeightWidth(),
                            m = a.viewTop + 25 - p.height - e.y;
                        0 < m && d.moveBy(0, m);
                        m = a.viewTop + a.viewHeight - 25 - e.y;
                        0 > m && d.moveBy(0, m);
                        m = 25 + a.viewLeft - e.x - (Blockly.RTL ? 0 : p.width);
                        0 < m && d.moveBy(m, 0);
                        m = a.viewLeft + a.viewWidth - 25 - e.x + (Blockly.RTL ? p.width : 0);
                        0 > m && d.moveBy(m, 0);
                        d.isDeletable() && 50 < (Blockly.RTL ? e.x - a.viewWidth : -e.x) && d.dispose(!1, !0)
                    }
            }
        })));
    b.appendChild(Blockly.Tooltip.createDom());
    a.appendChild(b);
    Blockly.svg = b;
    Blockly.svgResize();
    Blockly.WidgetDiv.DIV = goog.dom.createDom("div", "blocklyWidgetDiv");
    Blockly.WidgetDiv.DIV.style.direction = Blockly.RTL ? "rtl" : "ltr";
    document.body.appendChild(Blockly.WidgetDiv.DIV)
};
Blockly.init_ = function() {
    Blockly.bindEvent_(Blockly.svg, "mousedown", null, Blockly.onMouseDown_);
    Blockly.bindEvent_(Blockly.svg, "contextmenu", null, Blockly.onContextMenu_);
    Blockly.bindEvent_(Blockly.WidgetDiv.DIV, "contextmenu", null, Blockly.onContextMenu_);
    Blockly.documentEventsBound_ || (Blockly.bindEvent_(window, "resize", document, Blockly.svgResize), Blockly.bindEvent_(document, "keydown", null, Blockly.onKeyDown_), document.addEventListener("mouseup", Blockly.onMouseUp_, !1), goog.userAgent.IPAD && Blockly.bindEvent_(window,
        "orientationchange", document,
        function() {
            Blockly.fireUiEvent(window, "resize")
        }), Blockly.documentEventsBound_ = !0);
    if (Blockly.languageTree)
        if (Blockly.hasCategories) Blockly.Toolbox.init();
        else {
            Blockly.mainWorkspace.flyout_.init(Blockly.mainWorkspace);
            Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes);
            Blockly.mainWorkspace.scrollX = Blockly.mainWorkspace.flyout_.width_;
            Blockly.RTL && (Blockly.mainWorkspace.scrollX *= -1);
            var a = "translate(" + Blockly.mainWorkspace.scrollX + ", 0)";
            Blockly.mainWorkspace.getCanvas().setAttribute("transform",
                a);
            Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform", a)
        }
    Blockly.hasScrollbars && (Blockly.mainWorkspace.scrollbar = new Blockly.ScrollbarPair(Blockly.mainWorkspace), Blockly.mainWorkspace.scrollbar.resize());
    Blockly.mainWorkspace.addTrashcan();
    if (Blockly.hasSounds) {
        Blockly.loadAudio_(["media/click.mp3", "media/click.wav", "media/click.ogg"], "click");
        Blockly.loadAudio_(["media/delete.mp3", "media/delete.ogg", "media/delete.wav"], "delete");
        var b = [],
            a = function() {
                for (; b.length;) Blockly.unbindEvent_(b.pop());
                Blockly.preloadAudio_()
            };
        b.push(Blockly.bindEvent_(document, "mousemove", null, a));
        b.push(Blockly.bindEvent_(document, "touchstart", null, a))
    }
};
Blockly.updateToolbox = function(a) {
    if (a = Blockly.parseToolboxTree_(a)) {
        if (!Blockly.languageTree) throw "Existing toolbox is null.  Can't create new toolbox.";
        if (a.getElementsByTagName("category").length) {
            if (!Blockly.hasCategories) throw "Existing toolbox has no categories.  Can't change mode.";
            Blockly.languageTree = a;
            Blockly.Toolbox.populate_()
        } else {
            if (Blockly.hasCategories) throw "Existing toolbox has categories.  Can't change mode.";
            Blockly.languageTree = a;
            Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes)
        }
    } else if (Blockly.languageTree) throw "Can't nullify an existing toolbox.";
};
Blockly.utils = {};
Blockly.addClass_ = function(a, b) {
    var c = a.getAttribute("class") || ""; - 1 == (" " + c + " ").indexOf(" " + b + " ") && (c && (c += " "), a.setAttribute("class", c + b))
};
Blockly.removeClass_ = function(a, b) {
    var c = a.getAttribute("class");
    if (-1 != (" " + c + " ").indexOf(" " + b + " ")) {
        for (var c = c.split(/\s+/), d = 0; d < c.length; d++) c[d] && c[d] != b || (c.splice(d, 1), d--);
        c.length ? a.setAttribute("class", c.join(" ")) : a.removeAttribute("class")
    }
};
Blockly.bindEvent_ = function(a, b, c, d) {
    var e = function(a) {
        d.apply(c, arguments)
    };
    a.addEventListener(b, e, !1);
    var f = [
        [a, b, e]
    ];
    if (b in Blockly.bindEvent_.TOUCH_MAP)
        for (var e = function(a) {
                if (1 == a.changedTouches.length) {
                    var b = a.changedTouches[0];
                    a.clientX = b.clientX;
                    a.clientY = b.clientY
                }
                d.apply(c, arguments);
                a.preventDefault()
            }, g = 0, h; h = Blockly.bindEvent_.TOUCH_MAP[b][g]; g++) a.addEventListener(h, e, !1), f.push([a, h, e]);
    return f
};
Blockly.bindEvent_.TOUCH_MAP = {};
"ontouchstart" in document.documentElement && (Blockly.bindEvent_.TOUCH_MAP = {
    mousedown: ["touchstart"],
    mousemove: ["touchmove"],
    mouseup: ["touchend", "touchcancel"]
});
Blockly.unbindEvent_ = function(a) {
    for (; a.length;) {
        var b = a.pop(),
            c = b[2];
        b[0].removeEventListener(b[1], c, !1)
    }
    return c
};
Blockly.fireUiEventNow = function(a, b) {
    var c = document;
    if (c.createEvent) c = c.createEvent("UIEvents"), c.initEvent(b, !0, !0), a.dispatchEvent(c);
    else if (c.createEventObject) c = c.createEventObject(), a.fireEvent("on" + b, c);
    else throw "FireEvent: No event creation mechanism.";
};
Blockly.fireUiEvent = function(a, b) {
    setTimeout(function() {
        Blockly.fireUiEventNow(a, b)
    }, 0)
};
Blockly.noEvent = function(a) {
    a.preventDefault();
    a.stopPropagation()
};
Blockly.getRelativeXY_ = function(a) {
    var b = {
            x: 0,
            y: 0
        },
        c = a.getAttribute("x");
    c && (b.x = parseInt(c, 10));
    if (c = a.getAttribute("y")) b.y = parseInt(c, 10);
    if (a = (a = a.getAttribute("transform")) && a.match(/translate\(\s*([-\d.]+)([ ,]\s*([-\d.]+)\s*\))?/)) b.x += parseInt(a[1], 10), a[3] && (b.y += parseInt(a[3], 10));
    return b
};
Blockly.getSvgXY_ = function(a) {
    var b = 0,
        c = 0;
    do {
        var d = Blockly.getRelativeXY_(a),
            b = b + d.x,
            c = c + d.y;
        a = a.parentNode
    } while (a && a != Blockly.svg);
    return {
        x: b,
        y: c
    }
};
Blockly.getAbsoluteXY_ = function(a) {
    a = Blockly.getSvgXY_(a);
    return Blockly.convertCoordinates(a.x, a.y, !1)
};
Blockly.createSvgElement = function(a, b, c) {
    a = document.createElementNS(Blockly.SVG_NS, a);
    for (var d in b) a.setAttribute(d, b[d]);
    document.body.runtimeStyle && (a.runtimeStyle = a.currentStyle = a.style);
    c && c.appendChild(a);
    return a
};
Blockly.isRightButton = function(a) {
    return 2 == a.button || a.ctrlKey
};
Blockly.convertCoordinates = function(a, b, c) {
    c && (a -= window.scrollX || window.pageXOffset, b -= window.scrollY || window.pageYOffset);
    var d = Blockly.svg.createSVGPoint();
    d.x = a;
    d.y = b;
    a = Blockly.svg.getScreenCTM();
    c && (a = a.inverse());
    d = d.matrixTransform(a);
    c || (d.x += window.scrollX || window.pageXOffset, d.y += window.scrollY || window.pageYOffset);
    return d
};
Blockly.mouseToSvg = function(a) {
    return Blockly.convertCoordinates(a.clientX + (window.scrollX || window.pageXOffset), a.clientY + (window.scrollY || window.pageYOffset), !0)
};
Blockly.shortestStringLength = function(a) {
    if (!a.length) return 0;
    for (var b = a[0].length, c = 1; c < a.length; c++) b = Math.min(b, a[c].length);
    return b
};
Blockly.commonWordPrefix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0][e], g = 1; g < a.length; g++)
            if (f != a[g][e]) return c;
            " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g][e]) && " " != f) return c;
    return d
};
Blockly.commonWordSuffix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0].substr(-e - 1, 1), g = 1; g < a.length; g++)
            if (f != a[g].substr(-e - 1, 1)) return c;
            " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g].charAt(a[g].length - e - 1)) && " " != f) return c;
    return d
};
Blockly.isNumber = function(a) {
    return !!a.match(/^\s*-?\d+(\.\d+)?\s*$/)
};
Blockly.pathToBlockly = "./";
Blockly.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.HTML_NS = "http://www.w3.org/1999/xhtml";
Blockly.HSV_SATURATION = .45;
Blockly.HSV_VALUE = .65;
Blockly.SPRITE = {
    width: 64,
    height: 92,
    url: "media/sprites.png"
};
Blockly.makeColour = function(a) {
    return goog.color.hsvToHex(a, Blockly.HSV_SATURATION, 256 * Blockly.HSV_VALUE)
};
Blockly.INPUT_VALUE = 1;
Blockly.OUTPUT_VALUE = 2;
Blockly.NEXT_STATEMENT = 3;
Blockly.PREVIOUS_STATEMENT = 4;
Blockly.DUMMY_INPUT = 5;
Blockly.ALIGN_LEFT = -1;
Blockly.ALIGN_CENTRE = 0;
Blockly.ALIGN_RIGHT = 1;
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;
Blockly.SOUNDS_ = Object.create(null);
Blockly.selected = null;
Blockly.readOnly = !1;
Blockly.highlightedConnection_ = null;
Blockly.localConnection_ = null;
Blockly.DRAG_RADIUS = 5;
Blockly.SNAP_RADIUS = 20;
Blockly.BUMP_DELAY = 250;
Blockly.COLLAPSE_CHARS = 30;
Blockly.mainWorkspace = null;
Blockly.clipboard_ = null;
Blockly.onTouchUpWrapper_ = null;
Blockly.svgSize = function() {
    return {
        width: Blockly.svg.cachedWidth_,
        height: Blockly.svg.cachedHeight_
    }
};
Blockly.svgResize = function() {
    var a = Blockly.svg,
        b = a.parentNode,
        c = b.offsetWidth,
        b = b.offsetHeight;
    a.cachedWidth_ != c && (a.setAttribute("width", c + "px"), a.cachedWidth_ = c);
    a.cachedHeight_ != b && (a.setAttribute("height", b + "px"), a.cachedHeight_ = b);
    Blockly.mainWorkspace.scrollbar && Blockly.mainWorkspace.scrollbar.resize()
};
Blockly.onMouseDown_ = function(a) {
    Blockly.svgResize();
    Blockly.terminateDrag_();
    Blockly.hideChaff();
    var b = a.target && a.target.nodeName && "svg" == a.target.nodeName.toLowerCase();
    !Blockly.readOnly && Blockly.selected && b && Blockly.selected.unselect();
    a.target == Blockly.svg && Blockly.isRightButton(a) ? Blockly.showContextMenu_(a) : (Blockly.readOnly || b) && Blockly.mainWorkspace.scrollbar && (Blockly.mainWorkspace.dragMode = !0, Blockly.mainWorkspace.startDragMouseX = a.clientX, Blockly.mainWorkspace.startDragMouseY = a.clientY,
        Blockly.mainWorkspace.startDragMetrics = Blockly.mainWorkspace.getMetrics(), Blockly.mainWorkspace.startScrollX = Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.startScrollY = Blockly.mainWorkspace.scrollY, "mouseup" in Blockly.bindEvent_.TOUCH_MAP && (Blockly.onTouchUpWrapper_ = Blockly.bindEvent_(document, "mouseup", null, Blockly.onMouseUp_)), Blockly.onMouseMoveWrapper_ = Blockly.bindEvent_(document, "mousemove", null, Blockly.onMouseMove_))
};
Blockly.onMouseUp_ = function(a) {
    Blockly.setCursorHand_(!1);
    Blockly.mainWorkspace.dragMode = !1;
    Blockly.onTouchUpWrapper_ && (Blockly.unbindEvent_(Blockly.onTouchUpWrapper_), Blockly.onTouchUpWrapper_ = null);
    Blockly.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.onMouseMoveWrapper_), Blockly.onMouseMoveWrapper_ = null)
};
Blockly.onMouseMove_ = function(a) {
    if (Blockly.mainWorkspace.dragMode) {
        Blockly.removeAllRanges();
        var b = Blockly.mainWorkspace.startDragMetrics,
            c = Blockly.mainWorkspace.startScrollX + (a.clientX - Blockly.mainWorkspace.startDragMouseX),
            d = Blockly.mainWorkspace.startScrollY + (a.clientY - Blockly.mainWorkspace.startDragMouseY),
            c = Math.min(c, -b.contentLeft),
            d = Math.min(d, -b.contentTop),
            c = Math.max(c, b.viewWidth - b.contentLeft - b.contentWidth),
            d = Math.max(d, b.viewHeight - b.contentTop - b.contentHeight);
        Blockly.mainWorkspace.scrollbar.set(-c -
            b.contentLeft, -d - b.contentTop);
        a.stopPropagation()
    }
};
Blockly.onKeyDown_ = function(a) {
    if (!Blockly.isTargetInput_(a))
        if (27 == a.keyCode) Blockly.hideChaff();
        else if (46 == a.keyCode) try {
        Blockly.selected && Blockly.selected.isDeletable() && (Blockly.hideChaff(), Blockly.selected.dispose(!0, !0))
    } finally {
        a.preventDefault()
    } else if (a.altKey || a.ctrlKey || a.metaKey) Blockly.selected && Blockly.selected.isDeletable() && Blockly.selected.isMovable() && Blockly.selected.workspace == Blockly.mainWorkspace && (Blockly.hideChaff(), 67 == a.keyCode ? Blockly.copy_(Blockly.selected) : 88 == a.keyCode &&
        (Blockly.copy_(Blockly.selected), Blockly.selected.dispose(!0, !0))), 86 == a.keyCode && Blockly.clipboard_ && Blockly.mainWorkspace.paste(Blockly.clipboard_)
};
Blockly.terminateDrag_ = function() {
    Blockly.Block.terminateDrag_();
    Blockly.Flyout.terminateDrag_()
};
Blockly.copy_ = function(a) {
    var b = Blockly.Xml.blockToDom_(a);
    Blockly.Xml.deleteNext(b);
    a = a.getRelativeToSurfaceXY();
    b.setAttribute("x", Blockly.RTL ? -a.x : a.x);
    b.setAttribute("y", a.y);
    Blockly.clipboard_ = b
};
Blockly.showContextMenu_ = function(a) {
    if (!Blockly.readOnly) {
        var b = [];
        if (Blockly.collapse) {
            for (var c = !1, d = !1, e = Blockly.mainWorkspace.getTopBlocks(!1), f = 0; f < e.length; f++)
                for (var g = e[f]; g;) g.isCollapsed() ? c = !0 : d = !0, g = g.getNextBlock();
            d = {
                enabled: d
            };
            d.text = Blockly.Msg.COLLAPSE_ALL;
            d.callback = function() {
                for (var a = 0, b = 0; b < e.length; b++)
                    for (var c = e[b]; c;) setTimeout(c.setCollapsed.bind(c, !0), a), c = c.getNextBlock(), a += 10
            };
            b.push(d);
            c = {
                enabled: c
            };
            c.text = Blockly.Msg.EXPAND_ALL;
            c.callback = function() {
                for (var a = 0,
                        b = 0; b < e.length; b++)
                    for (var c = e[b]; c;) setTimeout(c.setCollapsed.bind(c, !1), a), c = c.getNextBlock(), a += 10
            };
            b.push(c)
        }
        Blockly.ContextMenu.show(a, b)
    }
};
Blockly.onContextMenu_ = function(a) {
    Blockly.isTargetInput_(a) || a.preventDefault()
};
Blockly.hideChaff = function(a) {
    Blockly.Tooltip.hide();
    Blockly.WidgetDiv.hide();
    !a && Blockly.Toolbox.flyout_ && Blockly.Toolbox.flyout_.autoClose && Blockly.Toolbox.clearSelection()
};
Blockly.removeAllRanges = function() {
    if (window.getSelection) {
        var a = window.getSelection();
        a && a.removeAllRanges && (a.removeAllRanges(), window.setTimeout(function() {
            try {
                window.getSelection().removeAllRanges()
            } catch (a) {}
        }, 0))
    }
};
Blockly.isTargetInput_ = function(a) {
    return "textarea" == a.target.type || "text" == a.target.type
};
Blockly.loadAudio_ = function(a, b) {
    if (window.Audio && a.length) {
        for (var c, d = new window.Audio, e = 0; e < a.length; e++) {
            var f = a[e],
                g = f.match(/\.(\w+)$/);
            if (g && d.canPlayType("audio/" + g[1])) {
                c = new window.Audio(Blockly.pathToBlockly + f);
                break
            }
        }
        c && c.play && (Blockly.SOUNDS_[b] = c)
    }
};
Blockly.preloadAudio_ = function() {
    for (var a in Blockly.SOUNDS_) {
        var b = Blockly.SOUNDS_[a];
        b.volume = .01;
        b.play();
        b.pause();
        if (goog.userAgent.IPAD || goog.userAgent.IPHONE) break
    }
};
Blockly.playAudio = function(a, b) {
    var c = Blockly.SOUNDS_[a];
    c && (c = goog.userAgent.DOCUMENT_MODE && 9 === goog.userAgent.DOCUMENT_MODE || goog.userAgent.IPAD || goog.userAgent.ANDROID ? c : c.cloneNode(), c.volume = void 0 === b ? 1 : b, c.play())
};
Blockly.setCursorHand_ = function(a) {
    if (!Blockly.readOnly) {
        var b = "";
        a && (b = "url(" + Blockly.pathToBlockly + "media/handclosed.cur) 7 3, auto");
        Blockly.selected && (Blockly.selected.getSvgRoot().style.cursor = b);
        Blockly.svg.style.cursor = b
    }
};
Blockly.getMainWorkspaceMetrics_ = function() {
    var a = Blockly.svgSize();
    a.width -= Blockly.Toolbox.width;
    var b = a.width - Blockly.Scrollbar.scrollbarThickness,
        c = a.height - Blockly.Scrollbar.scrollbarThickness;
    try {
        var d = Blockly.mainWorkspace.getCanvas().getBBox()
    } catch (g) {
        return null
    }
    if (Blockly.mainWorkspace.scrollbar) var e = Math.min(d.x - b / 2, d.x + d.width - b),
        b = Math.max(d.x + d.width + b / 2, d.x + b),
        f = Math.min(d.y - c / 2, d.y + d.height - c),
        c = Math.max(d.y + d.height + c / 2, d.y + c);
    else e = d.x, b = e + d.width, f = d.y, c = f + d.height;
    return {
        viewHeight: a.height,
        viewWidth: a.width,
        contentHeight: c - f,
        contentWidth: b - e,
        viewTop: -Blockly.mainWorkspace.scrollY,
        viewLeft: -Blockly.mainWorkspace.scrollX,
        contentTop: f,
        contentLeft: e,
        absoluteTop: 0,
        absoluteLeft: Blockly.RTL ? 0 : Blockly.Toolbox.width
    }
};
Blockly.setMainWorkspaceMetrics_ = function(a) {
    if (!Blockly.mainWorkspace.scrollbar) throw "Attempt to set main workspace scroll without scrollbars.";
    var b = Blockly.getMainWorkspaceMetrics_();
    goog.isNumber(a.x) && (Blockly.mainWorkspace.scrollX = -b.contentWidth * a.x - b.contentLeft);
    goog.isNumber(a.y) && (Blockly.mainWorkspace.scrollY = -b.contentHeight * a.y - b.contentTop);
    a = "translate(" + (Blockly.mainWorkspace.scrollX + b.absoluteLeft) + "," + (Blockly.mainWorkspace.scrollY + b.absoluteTop) + ")";
    Blockly.mainWorkspace.getCanvas().setAttribute("transform",
        a);
    Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform", a)
};
Blockly.doCommand = function(a) {
    Blockly.Realtime.isEnabled ? Blockly.Realtime.doCommand(a) : a()
};
Blockly.addChangeListener = function(a) {
    return Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(), "blocklyWorkspaceChange", null, a)
};
Blockly.removeChangeListener = function(a) {
    Blockly.unbindEvent_(a)
};
Blockly.getMainWorkspace = function() {
    return Blockly.mainWorkspace
};
window.Blockly || (window.Blockly = {});
window.Blockly.getMainWorkspace = Blockly.getMainWorkspace;
window.Blockly.addChangeListener = Blockly.addChangeListener;
window.Blockly.removeChangeListener = Blockly.removeChangeListener;