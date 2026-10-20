/*
 * Minimal template engine for the standalone export.
 * Supports the subset of the Claude Design template dialect used by design/Main.dc.html:
 *   {{ dotted.path }} holes in text and attributes
 *   <sc-for list="{{ items }}" as="item"> ... </sc-for>
 *   <sc-if value="{{ cond }}"> ... </sc-if>
 *   onClick / onChange / onMouseMove = "{{ handler }}"
 * It re-renders on setState and patches the existing DOM, so focus and slider drags survive.
 */
(function () {
  'use strict';

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  var NS_HTML = 'http://www.w3.org/1999/xhtml';

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function evalAttr(value, scope) {
    if (value == null) return undefined;
    var m = WHOLE.exec(value);
    return m ? lookup(m[1], scope) : interp(value, scope);
  }

  function appendChildren(el, src, scope) {
    var kids = src.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var n = renderNode(kids[i], scope);
      if (n) el.appendChild(n);
    }
  }

  function renderNode(node, scope) {
    if (node.nodeType === 3) return document.createTextNode(interp(node.nodeValue, scope));
    if (node.nodeType !== 1) return null;
    var tag = node.localName;
    var el;

    if (tag === 'sc-if') {
      el = document.createElement('sc-if');
      if (evalAttr(node.getAttribute('value'), scope)) appendChildren(el, node, scope);
      return el;
    }
    if (tag === 'sc-for') {
      el = document.createElement('sc-for');
      var list = evalAttr(node.getAttribute('list'), scope) || [];
      var as = node.getAttribute('as');
      for (var i = 0; i < list.length; i++) {
        var s = Object.create(scope);
        s[as] = list[i];
        s.$index = i;
        appendChildren(el, node, s);
      }
      return el;
    }

    el = document.createElementNS(node.namespaceURI || NS_HTML, node.localName);
    var handlers = null;
    var attrs = node.attributes;
    for (var a = 0; a < attrs.length; a++) {
      var name = attrs[a].name;
      var raw = attrs[a].value;
      if (name.indexOf('hint-') === 0) continue;
      if (/^on[a-z]+$/.test(name) && WHOLE.test(raw)) {
        var fn = lookup(WHOLE.exec(raw)[1], scope);
        var ev = name.slice(2);
        if (ev === 'change' && tag === 'input') ev = 'input';
        if (typeof fn === 'function') {
          handlers = handlers || {};
          handlers[ev] = fn;
          el['on' + ev] = fn;
        }
        continue;
      }
      var val = evalAttr(raw, scope);
      el.setAttribute(name, val == null ? '' : String(val));
    }
    if (handlers) el.__h = handlers;
    appendChildren(el, node, scope);
    return el;
  }

  function patchEl(o, n) {
    var i, name;
    var oa = Array.prototype.slice.call(o.attributes);
    for (i = 0; i < oa.length; i++) {
      if (!n.hasAttribute(oa[i].name)) o.removeAttribute(oa[i].name);
    }
    var na = n.attributes;
    for (i = 0; i < na.length; i++) {
      name = na[i].name;
      if (o.getAttribute(name) !== na[i].value) o.setAttribute(name, na[i].value);
    }
    if (o.localName === 'input' && o.value !== n.getAttribute('value')) o.value = n.getAttribute('value');
    var oh = o.__h || {};
    var nh = n.__h || {};
    for (name in oh) if (!(name in nh)) o['on' + name] = null;
    for (name in nh) o['on' + name] = nh[name];
    o.__h = n.__h;
  }

  function sync(oldParent, newParent) {
    var newKids = Array.prototype.slice.call(newParent.childNodes);
    var oldKids = Array.prototype.slice.call(oldParent.childNodes);
    for (var i = 0; i < newKids.length; i++) {
      var n = newKids[i];
      var o = oldKids[i];
      if (!o) { oldParent.appendChild(n); continue; }
      if (n.nodeType === 3 && o.nodeType === 3) {
        if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
        continue;
      }
      if (n.nodeType === 1 && o.nodeType === 1 && n.localName === o.localName && n.namespaceURI === o.namespaceURI) {
        patchEl(o, n);
        sync(o, n);
        continue;
      }
      oldParent.replaceChild(n, o);
    }
    for (var j = oldKids.length - 1; j >= newKids.length; j--) oldParent.removeChild(oldKids[j]);
  }

  var pending = false;
  var current = null;

  function schedule() {
    if (!current || pending) return;
    pending = true;
    queueMicrotask(function () {
      pending = false;
      current.update();
    });
  }

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (p) {
    var patch = typeof p === 'function' ? p(this.state) : p;
    var changed = false;
    for (var k in patch) {
      if (this.state[k] !== patch[k]) { changed = true; break; }
    }
    if (!changed) return;
    this.state = Object.assign({}, this.state, patch);
    schedule();
  };
  DCLogic.prototype.forceUpdate = function () { schedule(); };

  // ES class syntax in the page script needs DCLogic to be a constructor function: it is.
  window.DCLogic = DCLogic;

  window.mountDC = function (Component, appSelector, tplSelector) {
    var app = document.querySelector(appSelector);
    var tpl = document.querySelector(tplSelector).content;
    var comp = new Component({});
    current = {
      update: function () {
        var vals = comp.renderVals();
        var scope = Object.create(null);
        for (var k in vals) scope[k] = vals[k];
        var fresh = document.createElement('div');
        appendChildren(fresh, tpl, scope);
        sync(app, fresh);
      }
    };
    current.update();
  };
})();
