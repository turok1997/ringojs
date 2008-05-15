/**
 * A module to access and manipulate the rhino engine running this application
 */

// mark this module as shared between all requests
var __shared__ = true;

/**
 * Set this rhino engine up for a web application, registering the standard classes
 * for request, response, session host objects.
 */
function initWebApp() {
    // set up standard web app host objects
    addHostObject(org.helma.web.Request);
    addHostObject(org.helma.web.Response);
    addHostObject(org.helma.web.Session);
    addHostObject(org.helma.template.MacroTag);
    // register a request listener that automatically sets rhino optimization
    // level to -1 for requests that have a helma_continuation parameter.
    addOnRequest('continuation-support', function(req) {
        if (req && req.params.helma_continuation != null) {
            setRhinoOptimizationLevel(-1);
        }
    });
}

function addHostObject(javaClass) {
    getRhinoEngine().defineHostClass(javaClass);
}

function extendJavaClass(javaClass) {
    return getRhinoEngine().getExtendedClass(javaClass);
}

/**
 * Register a onRequest handler function that is called before a request is processed.
 * @param name the name of the handler
 * @param func the handler function
 */
function addOnRequest(name, func) {
    getRhinoEngine().addOnRequest(name, func);
}

/**
 * Remove a onRequest handler function that was previously registered.
 * @param name the name of the handler
 */
function removeOnRequest(name) {
    getRhinoEngine().removeOnRequest(name);
}

/**
 * Register a onResponse handler function that is called after a request is processed.
 * @param name the name of the handler
 * @param func the handler function
 */
function addOnResponse(name, func) {
    getRhinoEngine().addOnResponse(name, func);
}

/**
 * Remove a onResponse handler function that was previously registered.
 * @param name the name of the handler
 */
function removeOnResponse(name) {
    getRhinoEngine().removeOnResponse(name);
}

/**
 * Register a callback handler function that can be called via invokeCallback().
 * @param name the name of the handler
 * @param func the handler function
 */
function addCallback(name, func) {
    getRhinoEngine().addCallback(name, func);
}

/**
 * Remove a callback handler function that was previously registered.
 * @param name the name of the handler
 */
function removeCallback(name) {
    getRhinoEngine().removeCallback(name);
}

/**
 * Invoke a callback, failing silently if no callback is registered with this name.
 * @param name the callback name
 * @param thisObj the object to invoke the callback on, or null
 * @param args the callback argument array
 */
function invokeCallback(name, thisObj, args) {
    getRhinoEngine().invokeCallback(name, thisObj, args);
}

function setRhinoOptimizationLevel(level) {
    getRhinoContext().setOptimizationLevel(level);    
}

function getRhinoContext() {
    var Context = org.mozilla.javascript.Context;
    return Context.getCurrentContext();
}

function getRhinoEngine() {
    return getRhinoContext().getThreadLocal("engine");
}