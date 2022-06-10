#!/usr/bin/env node
var Co = Object.create;
var Qe = Object.defineProperty, Io = Object.defineProperties, Po = Object.getOwnPropertyDescriptor, Ao = Object.getOwnPropertyDescriptors, Ro = Object.getOwnPropertyNames, Se = Object.getOwnPropertySymbols, jo = Object.getPrototypeOf, et = Object.prototype.hasOwnProperty, Zt = Object.prototype.propertyIsEnumerable;
var Ze = (e, t, n) => t in e ? Qe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, x = (e, t) => {
  for (var n in t || (t = {}))
    et.call(t, n) && Ze(e, n, t[n]);
  if (Se)
    for (var n of Se(t))
      Zt.call(t, n) && Ze(e, n, t[n]);
  return e;
}, S = (e, t) => Io(e, Ao(t));
var I = /* @__PURE__ */ ((e) => typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
  get: (t, n) => (typeof require != "undefined" ? require : t)[n]
}) : e)(function(e) {
  if (typeof require != "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + e + '" is not supported');
});
var Qt = (e, t) => {
  var n = {};
  for (var r in e)
    et.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Se)
    for (var r of Se(e))
      t.indexOf(r) < 0 && Zt.call(e, r) && (n[r] = e[r]);
  return n;
};
var To = (e, t) => () => (e && (t = e(e = 0)), t);
var O = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var ko = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of Ro(t))
      !et.call(e, o) && o !== n && Qe(e, o, { get: () => t[o], enumerable: !(r = Po(t, o)) || r.enumerable });
  return e;
};
var se = (e, t, n) => (n = e != null ? Co(jo(e)) : {}, ko(t || !e || !e.__esModule ? Qe(n, "default", { value: e, enumerable: !0 }) : n, e));
var en = (e, t, n) => (Ze(e, typeof t != "symbol" ? t + "" : t, n), n);

// lib/requireLoader.mjs
import { createRequire as Do } from "module";
var d = To(() => {
  globalThis.require = globalThis.require || Do(import.meta.url);
});

// node_modules/clipanion/lib/constants.js
var we = O((T) => {
  "use strict";
  d();
  Object.defineProperty(T, "__esModule", { value: !0 });
  var Mo = 0, Uo = 1, Lo = 2, qo = "", Go = "\0", Bo = -1, Fo = /^(-h|--help)(?:=([0-9]+))?$/, Vo = /^(--[a-z]+(?:-[a-z]+)*|-[a-zA-Z]+)$/, Ho = /^-[a-zA-Z]{2,}$/, Xo = /^([^=]+)=([\s\S]*)$/, Wo = process.env.DEBUG_CLI === "1";
  T.BATCH_REGEX = Ho;
  T.BINDING_REGEX = Xo;
  T.DEBUG = Wo;
  T.END_OF_INPUT = Go;
  T.HELP_COMMAND_INDEX = Bo;
  T.HELP_REGEX = Fo;
  T.NODE_ERRORED = Lo;
  T.NODE_INITIAL = Mo;
  T.NODE_SUCCESS = Uo;
  T.OPTION_REGEX = Vo;
  T.START_OF_INPUT = qo;
});

// node_modules/clipanion/lib/errors.js
var _e = O((ae) => {
  "use strict";
  d();
  Object.defineProperty(ae, "__esModule", { value: !0 });
  var zo = we(), tt = class extends Error {
    constructor(t) {
      super(t), this.clipanion = { type: "usage" }, this.name = "UsageError";
    }
  }, nt = class extends Error {
    constructor(t, n) {
      if (super(), this.input = t, this.candidates = n, this.clipanion = { type: "none" }, this.name = "UnknownSyntaxError", this.candidates.length === 0)
        this.message = "Command not found, but we're not sure what's the alternative.";
      else if (this.candidates.every((r) => r.reason !== null && r.reason === n[0].reason)) {
        let [{ reason: r }] = this.candidates;
        this.message = `${r}

${this.candidates.map(({ usage: o }) => `$ ${o}`).join(`
`)}`;
      } else if (this.candidates.length === 1) {
        let [{ usage: r }] = this.candidates;
        this.message = `Command not found; did you mean:

$ ${r}
${ot(t)}`;
      } else
        this.message = `Command not found; did you mean one of:

${this.candidates.map(({ usage: r }, o) => `${`${o}.`.padStart(4)} ${r}`).join(`
`)}

${ot(t)}`;
    }
  }, rt = class extends Error {
    constructor(t, n) {
      super(), this.input = t, this.usages = n, this.clipanion = { type: "none" }, this.name = "AmbiguousSyntaxError", this.message = `Cannot find which to pick amongst the following alternatives:

${this.usages.map((r, o) => `${`${o}.`.padStart(4)} ${r}`).join(`
`)}

${ot(t)}`;
    }
  }, ot = (e) => `While running ${e.filter((t) => t !== zo.END_OF_INPUT).map((t) => {
    let n = JSON.stringify(t);
    return t.match(/\s/) || t.length === 0 || n !== `"${t}"` ? n : t;
  }).join(" ")}`;
  ae.AmbiguousSyntaxError = rt;
  ae.UnknownSyntaxError = nt;
  ae.UsageError = tt;
});

// node_modules/clipanion/lib/format.js
var st = O((ce) => {
  "use strict";
  d();
  Object.defineProperty(ce, "__esModule", { value: !0 });
  var tn = 80, it = Array(tn).fill("\u2501");
  for (let e = 0; e <= 24; ++e)
    it[it.length - e] = `\x1B[38;5;${232 + e}m\u2501`;
  var Ko = {
    header: (e) => `\x1B[1m\u2501\u2501\u2501 ${e}${e.length < tn - 5 ? ` ${it.slice(e.length + 5).join("")}` : ":"}\x1B[0m`,
    bold: (e) => `\x1B[1m${e}\x1B[22m`,
    error: (e) => `\x1B[31m\x1B[1m${e}\x1B[22m\x1B[39m`,
    code: (e) => `\x1B[36m${e}\x1B[39m`
  }, Jo = {
    header: (e) => e,
    bold: (e) => e,
    error: (e) => e,
    code: (e) => e
  };
  function Yo(e) {
    let t = e.split(`
`), n = t.filter((o) => o.match(/\S/)), r = n.length > 0 ? n.reduce((o, i) => Math.min(o, i.length - i.trimStart().length), Number.MAX_VALUE) : 0;
    return t.map((o) => o.slice(r).trimRight()).join(`
`);
  }
  function Zo(e, { format: t, paragraphs: n }) {
    return e = e.replace(/\r\n?/g, `
`), e = Yo(e), e = e.replace(/^\n+|\n+$/g, ""), e = e.replace(/^(\s*)-([^\n]*?)\n+/gm, `$1-$2

`), e = e.replace(/\n(\n)?\n*/g, (r, o) => o || " "), n && (e = e.split(/\n/).map((r) => {
      let o = r.match(/^\s*[*-][\t ]+(.*)/);
      if (!o)
        return r.match(/(.{1,80})(?: |$)/g).join(`
`);
      let i = r.length - r.trimStart().length;
      return o[1].match(new RegExp(`(.{1,${78 - i}})(?: |$)`, "g")).map((s, a) => " ".repeat(i) + (a === 0 ? "- " : "  ") + s).join(`
`);
    }).join(`

`)), e = e.replace(/(`+)((?:.|[\n])*?)\1/g, (r, o, i) => t.code(o + i + o)), e = e.replace(/(\*\*)((?:.|[\n])*?)\1/g, (r, o, i) => t.bold(o + i + o)), e ? `${e}
` : "";
  }
  ce.formatMarkdownish = Zo;
  ce.richFormat = Ko;
  ce.textFormat = Jo;
});

// node_modules/clipanion/lib/advanced/options/utils.js
var G = O((V) => {
  "use strict";
  d();
  Object.defineProperty(V, "__esModule", { value: !0 });
  var nn = _e(), rn = Symbol("clipanion/isOption");
  function Qo(e) {
    return S(x({}, e), { [rn]: !0 });
  }
  function ei(e, t) {
    return typeof e > "u" ? [e, t] : typeof e == "object" && e !== null && !Array.isArray(e) ? [void 0, e] : [e, t];
  }
  function at(e, { mergeName: t = !1 } = {}) {
    let n = e.match(/^([^:]+): (.*)$/m);
    if (!n)
      return "validation failed";
    let [, r, o] = n;
    return t && (o = o[0].toLowerCase() + o.slice(1)), o = r !== "." || !t ? `${r.replace(/^\.(\[|$)/, "$1")}: ${o}` : `: ${o}`, o;
  }
  function on(e, t) {
    return t.length === 1 ? new nn.UsageError(`${e}${at(t[0], { mergeName: !0 })}`) : new nn.UsageError(`${e}:
${t.map((n) => `
- ${at(n)}`).join("")}`);
  }
  function ti(e, t, n) {
    if (typeof n > "u")
      return t;
    let r = [], o = [], i = (a) => {
      let c = t;
      return t = a, i.bind(null, c);
    };
    if (!n(t, { errors: r, coercions: o, coercion: i }))
      throw on(`Invalid value for ${e}`, r);
    for (let [, a] of o)
      a();
    return t;
  }
  V.applyValidator = ti;
  V.cleanValidationError = at;
  V.formatError = on;
  V.isOptionSymbol = rn;
  V.makeCommandOption = Qo;
  V.rerouteArguments = ei;
});

// node_modules/typanion/lib/index.js
var pn = O((m) => {
  "use strict";
  d();
  Object.defineProperty(m, "__esModule", { value: !0 });
  var ni = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  function w(e) {
    return e === null ? "null" : e === void 0 ? "undefined" : e === "" ? "an empty string" : typeof e == "symbol" ? `<${e.toString()}>` : Array.isArray(e) ? "an array" : JSON.stringify(e);
  }
  function le(e, t) {
    if (e.length === 0)
      return "nothing";
    if (e.length === 1)
      return w(e[0]);
    let n = e.slice(0, -1), r = e[e.length - 1], o = e.length > 2 ? `, ${t} ` : ` ${t} `;
    return `${n.map((i) => w(i)).join(", ")}${o}${w(r)}`;
  }
  function H(e, t) {
    var n, r, o;
    return typeof t == "number" ? `${(n = e == null ? void 0 : e.p) !== null && n !== void 0 ? n : "."}[${t}]` : ni.test(t) ? `${(r = e == null ? void 0 : e.p) !== null && r !== void 0 ? r : ""}.${t}` : `${(o = e == null ? void 0 : e.p) !== null && o !== void 0 ? o : "."}[${JSON.stringify(t)}]`;
  }
  function ct(e, t, n) {
    return e === 1 ? t : n;
  }
  var ri = /^#[0-9a-f]{6}$/i, oi = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i, ii = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, si = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/i, sn = /^(?:[1-9]\d{3}(-?)(?:(?:0[1-9]|1[0-2])\1(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\1(?:29|30)|(?:0[13578]|1[02])(?:\1)31|00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[0-5]))|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)(?:(-?)02(?:\2)29|-?366))T(?:[01]\d|2[0-3])(:?)[0-5]\d(?:\3[0-5]\d)?(?:Z|[+-][01]\d(?:\3[0-5]\d)?)$/;
  function g({ errors: e, p: t } = {}, n) {
    return e == null || e.push(`${t ?? "."}: ${n}`), !1;
  }
  function ai(e, t) {
    return (n) => {
      e[t] = n;
    };
  }
  function B(e, t) {
    return (n) => {
      let r = e[t];
      return e[t] = n, B(e, t).bind(null, r);
    };
  }
  function ue(e, t, n) {
    let r = () => (e(n()), o), o = () => (e(t), r);
    return r;
  }
  function ut() {
    return E({
      test: (e, t) => !0
    });
  }
  function an(e) {
    return E({
      test: (t, n) => t !== e ? g(n, `Expected ${w(e)} (got ${w(t)})`) : !0
    });
  }
  function cn() {
    return E({
      test: (e, t) => typeof e != "string" ? g(t, `Expected a string (got ${w(e)})`) : !0
    });
  }
  function ci(e) {
    let t = Array.isArray(e) ? e : Object.values(e), n = t.every((o) => typeof o == "string" || typeof o == "number"), r = new Set(t);
    return r.size === 1 ? an([...r][0]) : E({
      test: (o, i) => r.has(o) ? !0 : n ? g(i, `Expected one of ${le(t, "or")} (got ${w(o)})`) : g(i, `Expected a valid enumeration value (got ${w(o)})`)
    });
  }
  var ui = /* @__PURE__ */ new Map([
    ["true", !0],
    ["True", !0],
    ["1", !0],
    [1, !0],
    ["false", !1],
    ["False", !1],
    ["0", !1],
    [0, !1]
  ]);
  function li() {
    return E({
      test: (e, t) => {
        var n;
        if (typeof e != "boolean") {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return g(t, "Unbound coercion result");
            let r = ui.get(e);
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return g(t, `Expected a boolean (got ${w(e)})`);
        }
        return !0;
      }
    });
  }
  function di() {
    return E({
      test: (e, t) => {
        var n;
        if (typeof e != "number") {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return g(t, "Unbound coercion result");
            let r;
            if (typeof e == "string") {
              let o;
              try {
                o = JSON.parse(e);
              } catch {
              }
              if (typeof o == "number")
                if (JSON.stringify(o) === e)
                  r = o;
                else
                  return g(t, `Received a number that can't be safely represented by the runtime (${e})`);
            }
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return g(t, `Expected a number (got ${w(e)})`);
        }
        return !0;
      }
    });
  }
  function fi() {
    return E({
      test: (e, t) => {
        var n;
        if (!(e instanceof Date)) {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return g(t, "Unbound coercion result");
            let r;
            if (typeof e == "string" && sn.test(e))
              r = new Date(e);
            else {
              let o;
              if (typeof e == "string") {
                let i;
                try {
                  i = JSON.parse(e);
                } catch {
                }
                typeof i == "number" && (o = i);
              } else
                typeof e == "number" && (o = e);
              if (typeof o < "u")
                if (Number.isSafeInteger(o) || !Number.isSafeInteger(o * 1e3))
                  r = new Date(o * 1e3);
                else
                  return g(t, `Received a timestamp that can't be safely represented by the runtime (${e})`);
            }
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return g(t, `Expected a date (got ${w(e)})`);
        }
        return !0;
      }
    });
  }
  function Ne(e, { delimiter: t } = {}) {
    return E({
      test: (n, r) => {
        var o;
        let i = n;
        if (typeof n == "string" && typeof t < "u" && typeof (r == null ? void 0 : r.coercions) < "u") {
          if (typeof (r == null ? void 0 : r.coercion) > "u")
            return g(r, "Unbound coercion result");
          n = n.split(t);
        }
        if (!Array.isArray(n))
          return g(r, `Expected an array (got ${w(n)})`);
        let s = !0;
        for (let a = 0, c = n.length; a < c && (s = e(n[a], Object.assign(Object.assign({}, r), { p: H(r, a), coercion: B(n, a) })) && s, !(!s && (r == null ? void 0 : r.errors) == null)); ++a)
          ;
        return n !== i && r.coercions.push([(o = r.p) !== null && o !== void 0 ? o : ".", r.coercion.bind(null, n)]), s;
      }
    });
  }
  function pi(e, { delimiter: t } = {}) {
    let n = Ne(e, { delimiter: t });
    return E({
      test: (r, o) => {
        var i, s;
        if (Object.getPrototypeOf(r).toString() === "[object Set]")
          if (typeof (o == null ? void 0 : o.coercions) < "u") {
            if (typeof (o == null ? void 0 : o.coercion) > "u")
              return g(o, "Unbound coercion result");
            let a = [...r], c = [...r];
            if (!n(c, Object.assign(Object.assign({}, o), { coercion: void 0 })))
              return !1;
            let u = () => c.some((l, f) => l !== a[f]) ? new Set(c) : r;
            return o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", ue(o.coercion, r, u)]), !0;
          } else {
            let a = !0;
            for (let c of r)
              if (a = e(c, Object.assign({}, o)) && a, !a && (o == null ? void 0 : o.errors) == null)
                break;
            return a;
          }
        if (typeof (o == null ? void 0 : o.coercions) < "u") {
          if (typeof (o == null ? void 0 : o.coercion) > "u")
            return g(o, "Unbound coercion result");
          let a = { value: r };
          return n(r, Object.assign(Object.assign({}, o), { coercion: B(a, "value") })) ? (o.coercions.push([(s = o.p) !== null && s !== void 0 ? s : ".", ue(o.coercion, r, () => new Set(a.value))]), !0) : !1;
        }
        return g(o, `Expected a set (got ${w(r)})`);
      }
    });
  }
  function hi(e, t) {
    let n = Ne($e([e, t])), r = Ce(t, { keys: e });
    return E({
      test: (o, i) => {
        var s, a, c;
        if (Object.getPrototypeOf(o).toString() === "[object Map]")
          if (typeof (i == null ? void 0 : i.coercions) < "u") {
            if (typeof (i == null ? void 0 : i.coercion) > "u")
              return g(i, "Unbound coercion result");
            let u = [...o], l = [...o];
            if (!n(l, Object.assign(Object.assign({}, i), { coercion: void 0 })))
              return !1;
            let f = () => l.some((p, h) => p[0] !== u[h][0] || p[1] !== u[h][1]) ? new Map(l) : o;
            return i.coercions.push([(s = i.p) !== null && s !== void 0 ? s : ".", ue(i.coercion, o, f)]), !0;
          } else {
            let u = !0;
            for (let [l, f] of o)
              if (u = e(l, Object.assign({}, i)) && u, !u && (i == null ? void 0 : i.errors) == null || (u = t(f, Object.assign(Object.assign({}, i), { p: H(i, l) })) && u, !u && (i == null ? void 0 : i.errors) == null))
                break;
            return u;
          }
        if (typeof (i == null ? void 0 : i.coercions) < "u") {
          if (typeof (i == null ? void 0 : i.coercion) > "u")
            return g(i, "Unbound coercion result");
          let u = { value: o };
          return Array.isArray(o) ? n(o, Object.assign(Object.assign({}, i), { coercion: void 0 })) ? (i.coercions.push([(a = i.p) !== null && a !== void 0 ? a : ".", ue(i.coercion, o, () => new Map(u.value))]), !0) : !1 : r(o, Object.assign(Object.assign({}, i), { coercion: B(u, "value") })) ? (i.coercions.push([(c = i.p) !== null && c !== void 0 ? c : ".", ue(i.coercion, o, () => new Map(Object.entries(u.value)))]), !0) : !1;
        }
        return g(i, `Expected a map (got ${w(o)})`);
      }
    });
  }
  function $e(e, { delimiter: t } = {}) {
    let n = dn(e.length);
    return E({
      test: (r, o) => {
        var i;
        if (typeof r == "string" && typeof t < "u" && typeof (o == null ? void 0 : o.coercions) < "u") {
          if (typeof (o == null ? void 0 : o.coercion) > "u")
            return g(o, "Unbound coercion result");
          r = r.split(t), o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, r)]);
        }
        if (!Array.isArray(r))
          return g(o, `Expected a tuple (got ${w(r)})`);
        let s = n(r, Object.assign({}, o));
        for (let a = 0, c = r.length; a < c && a < e.length && (s = e[a](r[a], Object.assign(Object.assign({}, o), { p: H(o, a), coercion: B(r, a) })) && s, !(!s && (o == null ? void 0 : o.errors) == null)); ++a)
          ;
        return s;
      }
    });
  }
  function Ce(e, { keys: t = null } = {}) {
    let n = Ne($e([t ?? cn(), e]));
    return E({
      test: (r, o) => {
        var i;
        if (Array.isArray(r) && typeof (o == null ? void 0 : o.coercions) < "u")
          return typeof (o == null ? void 0 : o.coercion) > "u" ? g(o, "Unbound coercion result") : n(r, Object.assign(Object.assign({}, o), { coercion: void 0 })) ? (r = Object.fromEntries(r), o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, r)]), !0) : !1;
        if (typeof r != "object" || r === null)
          return g(o, `Expected an object (got ${w(r)})`);
        let s = Object.keys(r), a = !0;
        for (let c = 0, u = s.length; c < u && (a || (o == null ? void 0 : o.errors) != null); ++c) {
          let l = s[c], f = r[l];
          if (l === "__proto__" || l === "constructor") {
            a = g(Object.assign(Object.assign({}, o), { p: H(o, l) }), "Unsafe property name");
            continue;
          }
          if (t !== null && !t(l, o)) {
            a = !1;
            continue;
          }
          if (!e(f, Object.assign(Object.assign({}, o), { p: H(o, l), coercion: B(r, l) }))) {
            a = !1;
            continue;
          }
        }
        return a;
      }
    });
  }
  function mi(e, t = {}) {
    return Ce(e, t);
  }
  function un(e, { extra: t = null } = {}) {
    let n = Object.keys(e), r = E({
      test: (o, i) => {
        if (typeof o != "object" || o === null)
          return g(i, `Expected an object (got ${w(o)})`);
        let s = /* @__PURE__ */ new Set([...n, ...Object.keys(o)]), a = {}, c = !0;
        for (let u of s) {
          if (u === "constructor" || u === "__proto__")
            c = g(Object.assign(Object.assign({}, i), { p: H(i, u) }), "Unsafe property name");
          else {
            let l = Object.prototype.hasOwnProperty.call(e, u) ? e[u] : void 0, f = Object.prototype.hasOwnProperty.call(o, u) ? o[u] : void 0;
            typeof l < "u" ? c = l(f, Object.assign(Object.assign({}, i), { p: H(i, u), coercion: B(o, u) })) && c : t === null ? c = g(Object.assign(Object.assign({}, i), { p: H(i, u) }), `Extraneous property (got ${w(f)})`) : Object.defineProperty(a, u, {
              enumerable: !0,
              get: () => f,
              set: ai(o, u)
            });
          }
          if (!c && (i == null ? void 0 : i.errors) == null)
            break;
        }
        return t !== null && (c || (i == null ? void 0 : i.errors) != null) && (c = t(a, i) && c), c;
      }
    });
    return Object.assign(r, {
      properties: e
    });
  }
  function gi(e) {
    return un(e, { extra: Ce(ut()) });
  }
  var yi = (e) => E({
    test: (t, n) => t instanceof e ? !0 : g(n, `Expected an instance of ${e.name} (got ${w(t)})`)
  }), bi = (e, { exclusive: t = !1 } = {}) => E({
    test: (n, r) => {
      var o, i, s;
      let a = [], c = typeof (r == null ? void 0 : r.errors) < "u" ? [] : void 0;
      for (let u = 0, l = e.length; u < l; ++u) {
        let f = typeof (r == null ? void 0 : r.errors) < "u" ? [] : void 0, p = typeof (r == null ? void 0 : r.coercions) < "u" ? [] : void 0;
        if (e[u](n, Object.assign(Object.assign({}, r), { errors: f, coercions: p, p: `${(o = r == null ? void 0 : r.p) !== null && o !== void 0 ? o : "."}#${u + 1}` }))) {
          if (a.push([`#${u + 1}`, p]), !t)
            break;
        } else
          c == null || c.push(f[0]);
      }
      if (a.length === 1) {
        let [, u] = a[0];
        return typeof u < "u" && ((i = r == null ? void 0 : r.coercions) === null || i === void 0 || i.push(...u)), !0;
      }
      return a.length > 1 ? g(r, `Expected to match exactly a single predicate (matched ${a.join(", ")})`) : (s = r == null ? void 0 : r.errors) === null || s === void 0 || s.push(...c), !1;
    }
  });
  function ln(e) {
    return () => e;
  }
  function E({ test: e }) {
    return ln(e)();
  }
  var X = class extends Error {
    constructor({ errors: t } = {}) {
      let n = "Type mismatch";
      if (t && t.length > 0) {
        n += `
`;
        for (let r of t)
          n += `
- ${r}`;
      }
      super(n);
    }
  };
  function xi(e, t) {
    if (!t(e))
      throw new X();
  }
  function Ei(e, t) {
    let n = [];
    if (!t(e, { errors: n }))
      throw new X({ errors: n });
  }
  function Oi(e, t) {
  }
  function vi(e, t, { coerce: n = !1, errors: r, throw: o } = {}) {
    let i = r ? [] : void 0;
    if (!n) {
      if (t(e, { errors: i }))
        return o ? e : { value: e, errors: void 0 };
      if (o)
        throw new X({ errors: i });
      return { value: void 0, errors: i ?? !0 };
    }
    let s = { value: e }, a = B(s, "value"), c = [];
    if (!t(e, { errors: i, coercion: a, coercions: c })) {
      if (o)
        throw new X({ errors: i });
      return { value: void 0, errors: i ?? !0 };
    }
    for (let [, u] of c)
      u();
    return o ? s.value : { value: s.value, errors: void 0 };
  }
  function Si(e, t) {
    let n = $e(e);
    return (...r) => {
      if (!n(r))
        throw new X();
      return t(...r);
    };
  }
  function wi(e) {
    return E({
      test: (t, n) => t.length >= e ? !0 : g(n, `Expected to have a length of at least ${e} elements (got ${t.length})`)
    });
  }
  function _i(e) {
    return E({
      test: (t, n) => t.length <= e ? !0 : g(n, `Expected to have a length of at most ${e} elements (got ${t.length})`)
    });
  }
  function dn(e) {
    return E({
      test: (t, n) => t.length !== e ? g(n, `Expected to have a length of exactly ${e} elements (got ${t.length})`) : !0
    });
  }
  function Ni({ map: e } = {}) {
    return E({
      test: (t, n) => {
        let r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
        for (let i = 0, s = t.length; i < s; ++i) {
          let a = t[i], c = typeof e < "u" ? e(a) : a;
          if (r.has(c)) {
            if (o.has(c))
              continue;
            g(n, `Expected to contain unique elements; got a duplicate with ${w(t)}`), o.add(c);
          } else
            r.add(c);
        }
        return o.size === 0;
      }
    });
  }
  function $i() {
    return E({
      test: (e, t) => e <= 0 ? !0 : g(t, `Expected to be negative (got ${e})`)
    });
  }
  function Ci() {
    return E({
      test: (e, t) => e >= 0 ? !0 : g(t, `Expected to be positive (got ${e})`)
    });
  }
  function Ii(e) {
    return E({
      test: (t, n) => t >= e ? !0 : g(n, `Expected to be at least ${e} (got ${t})`)
    });
  }
  function Pi(e) {
    return E({
      test: (t, n) => t <= e ? !0 : g(n, `Expected to be at most ${e} (got ${t})`)
    });
  }
  function Ai(e, t) {
    return E({
      test: (n, r) => n >= e && n <= t ? !0 : g(r, `Expected to be in the [${e}; ${t}] range (got ${n})`)
    });
  }
  function Ri(e, t) {
    return E({
      test: (n, r) => n >= e && n < t ? !0 : g(r, `Expected to be in the [${e}; ${t}[ range (got ${n})`)
    });
  }
  function ji({ unsafe: e = !1 } = {}) {
    return E({
      test: (t, n) => t !== Math.round(t) ? g(n, `Expected to be an integer (got ${t})`) : !e && !Number.isSafeInteger(t) ? g(n, `Expected to be a safe integer (got ${t})`) : !0
    });
  }
  function Ti(e) {
    return E({
      test: (t, n) => e.test(t) ? !0 : g(n, `Expected to match the pattern ${e.toString()} (got ${w(t)})`)
    });
  }
  function ki() {
    return E({
      test: (e, t) => e !== e.toLowerCase() ? g(t, `Expected to be all-lowercase (got ${e})`) : !0
    });
  }
  function Di() {
    return E({
      test: (e, t) => e !== e.toUpperCase() ? g(t, `Expected to be all-uppercase (got ${e})`) : !0
    });
  }
  function Mi() {
    return E({
      test: (e, t) => si.test(e) ? !0 : g(t, `Expected to be a valid UUID v4 (got ${w(e)})`)
    });
  }
  function Ui() {
    return E({
      test: (e, t) => sn.test(e) ? !0 : g(t, `Expected to be a valid ISO 8601 date string (got ${w(e)})`)
    });
  }
  function Li({ alpha: e = !1 }) {
    return E({
      test: (t, n) => (e ? ri.test(t) : oi.test(t)) ? !0 : g(n, `Expected to be a valid hexadecimal color string (got ${w(t)})`)
    });
  }
  function qi() {
    return E({
      test: (e, t) => ii.test(e) ? !0 : g(t, `Expected to be a valid base 64 string (got ${w(e)})`)
    });
  }
  function Gi(e = ut()) {
    return E({
      test: (t, n) => {
        let r;
        try {
          r = JSON.parse(t);
        } catch {
          return g(n, `Expected to be a valid JSON string (got ${w(t)})`);
        }
        return e(r, n);
      }
    });
  }
  function fn(e, ...t) {
    let n = Array.isArray(t[0]) ? t[0] : t;
    return E({
      test: (r, o) => {
        var i, s;
        let a = { value: r }, c = typeof (o == null ? void 0 : o.coercions) < "u" ? B(a, "value") : void 0, u = typeof (o == null ? void 0 : o.coercions) < "u" ? [] : void 0;
        if (!e(r, Object.assign(Object.assign({}, o), { coercion: c, coercions: u })))
          return !1;
        let l = [];
        if (typeof u < "u")
          for (let [, f] of u)
            l.push(f());
        try {
          if (typeof (o == null ? void 0 : o.coercions) < "u") {
            if (a.value !== r) {
              if (typeof (o == null ? void 0 : o.coercion) > "u")
                return g(o, "Unbound coercion result");
              o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, a.value)]);
            }
            (s = o == null ? void 0 : o.coercions) === null || s === void 0 || s.push(...u);
          }
          return n.every((f) => f(a.value, o));
        } finally {
          for (let f of l)
            f();
        }
      }
    });
  }
  function Bi(e, ...t) {
    let n = Array.isArray(t[0]) ? t[0] : t;
    return fn(e, n);
  }
  function Fi(e) {
    return E({
      test: (t, n) => typeof t > "u" ? !0 : e(t, n)
    });
  }
  function Vi(e) {
    return E({
      test: (t, n) => t === null ? !0 : e(t, n)
    });
  }
  function Hi(e) {
    let t = new Set(e);
    return E({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) || i.push(s);
        return i.length > 0 ? g(r, `Missing required ${ct(i.length, "property", "properties")} ${le(i, "and")}`) : !0;
      }
    });
  }
  function Xi(e) {
    let t = new Set(e);
    return E({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) && i.push(s);
        return i.length > 0 ? g(r, `Forbidden ${ct(i.length, "property", "properties")} ${le(i, "and")}`) : !0;
      }
    });
  }
  function Wi(e) {
    let t = new Set(e);
    return E({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) && i.push(s);
        return i.length > 1 ? g(r, `Mutually exclusive properties ${le(i, "and")}`) : !0;
      }
    });
  }
  (function(e) {
    e.Forbids = "Forbids", e.Requires = "Requires";
  })(m.KeyRelationship || (m.KeyRelationship = {}));
  var zi = {
    [m.KeyRelationship.Forbids]: {
      expect: !1,
      message: "forbids using"
    },
    [m.KeyRelationship.Requires]: {
      expect: !0,
      message: "requires using"
    }
  };
  function Ki(e, t, n, { ignore: r = [] } = {}) {
    let o = new Set(r), i = new Set(n), s = zi[t], a = t === m.KeyRelationship.Forbids ? "or" : "and";
    return E({
      test: (c, u) => {
        let l = new Set(Object.keys(c));
        if (!l.has(e) || o.has(c[e]))
          return !0;
        let f = [];
        for (let p of i)
          (l.has(p) && !o.has(c[p])) !== s.expect && f.push(p);
        return f.length >= 1 ? g(u, `Property "${e}" ${s.message} ${ct(f.length, "property", "properties")} ${le(f, a)}`) : !0;
      }
    });
  }
  m.TypeAssertionError = X;
  m.applyCascade = Bi;
  m.as = vi;
  m.assert = xi;
  m.assertWithErrors = Ei;
  m.cascade = fn;
  m.fn = Si;
  m.hasExactLength = dn;
  m.hasForbiddenKeys = Xi;
  m.hasKeyRelationship = Ki;
  m.hasMaxLength = _i;
  m.hasMinLength = wi;
  m.hasMutuallyExclusiveKeys = Wi;
  m.hasRequiredKeys = Hi;
  m.hasUniqueItems = Ni;
  m.isArray = Ne;
  m.isAtLeast = Ii;
  m.isAtMost = Pi;
  m.isBase64 = qi;
  m.isBoolean = li;
  m.isDate = fi;
  m.isDict = mi;
  m.isEnum = ci;
  m.isHexColor = Li;
  m.isISO8601 = Ui;
  m.isInExclusiveRange = Ri;
  m.isInInclusiveRange = Ai;
  m.isInstanceOf = yi;
  m.isInteger = ji;
  m.isJSON = Gi;
  m.isLiteral = an;
  m.isLowerCase = ki;
  m.isMap = hi;
  m.isNegative = $i;
  m.isNullable = Vi;
  m.isNumber = di;
  m.isObject = un;
  m.isOneOf = bi;
  m.isOptional = Fi;
  m.isPartial = gi;
  m.isPositive = Ci;
  m.isRecord = Ce;
  m.isSet = pi;
  m.isString = cn;
  m.isTuple = $e;
  m.isUUID4 = Mi;
  m.isUnknown = ut;
  m.isUpperCase = Di;
  m.makeTrait = ln;
  m.makeValidator = E;
  m.matchesRegExp = Ti;
  m.softAssert = Oi;
});

// node_modules/clipanion/lib/advanced/Command.js
var K = O((lt) => {
  "use strict";
  d();
  Object.defineProperty(lt, "__esModule", { value: !0 });
  var hn = G();
  function Ji(e) {
    if (e && e.__esModule)
      return e;
    var t = /* @__PURE__ */ Object.create(null);
    return e && Object.keys(e).forEach(function(n) {
      if (n !== "default") {
        var r = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(t, n, r.get ? r : {
          enumerable: !0,
          get: function() {
            return e[n];
          }
        });
      }
    }), t.default = e, Object.freeze(t);
  }
  var de = class {
    constructor() {
      this.help = !1;
    }
    static Usage(t) {
      return t;
    }
    async catch(t) {
      throw t;
    }
    async validateAndExecute() {
      let n = this.constructor.schema;
      if (Array.isArray(n)) {
        let { isDict: o, isUnknown: i, applyCascade: s } = await Promise.resolve().then(function() {
          return /* @__PURE__ */ Ji(pn());
        }), a = s(o(i()), n), c = [], u = [];
        if (!a(this, { errors: c, coercions: u }))
          throw hn.formatError("Invalid option schema", c);
        for (let [, f] of u)
          f();
      } else if (n != null)
        throw new Error("Invalid command schema");
      let r = await this.execute();
      return typeof r < "u" ? r : 0;
    }
  };
  de.isOption = hn.isOptionSymbol;
  de.Default = [];
  lt.Command = de;
});

// node_modules/clipanion/lib/core.js
var je = O((_) => {
  "use strict";
  d();
  Object.defineProperty(_, "__esModule", { value: !0 });
  var b = we(), Ae = _e();
  function A(e) {
    b.DEBUG && console.log(e);
  }
  var mn = {
    candidateUsage: null,
    requiredOptions: [],
    errorMessage: null,
    ignoreOptions: !1,
    path: [],
    positionals: [],
    options: [],
    remainder: null,
    selectedIndex: b.HELP_COMMAND_INDEX
  };
  function dt() {
    return {
      nodes: [P(), P(), P()]
    };
  }
  function gn(e) {
    let t = dt(), n = [], r = t.nodes.length;
    for (let o of e) {
      n.push(r);
      for (let i = 0; i < o.nodes.length; ++i)
        pt(i) || t.nodes.push(Sn(o.nodes[i], r));
      r += o.nodes.length - 2;
    }
    for (let o of n)
      J(t, b.NODE_INITIAL, o);
    return t;
  }
  function D(e, t) {
    return e.nodes.push(t), e.nodes.length - 1;
  }
  function yn(e) {
    let t = /* @__PURE__ */ new Set(), n = (r) => {
      if (t.has(r))
        return;
      t.add(r);
      let o = e.nodes[r];
      for (let s of Object.values(o.statics))
        for (let { to: a } of s)
          n(a);
      for (let [, { to: s }] of o.dynamics)
        n(s);
      for (let { to: s } of o.shortcuts)
        n(s);
      let i = new Set(o.shortcuts.map(({ to: s }) => s));
      for (; o.shortcuts.length > 0; ) {
        let { to: s } = o.shortcuts.shift(), a = e.nodes[s];
        for (let [c, u] of Object.entries(a.statics)) {
          let l = Object.prototype.hasOwnProperty.call(o.statics, c) ? o.statics[c] : o.statics[c] = [];
          for (let f of u)
            l.some(({ to: p }) => f.to === p) || l.push(f);
        }
        for (let [c, u] of a.dynamics)
          o.dynamics.some(([l, { to: f }]) => c === l && u.to === f) || o.dynamics.push([c, u]);
        for (let c of a.shortcuts)
          i.has(c.to) || (o.shortcuts.push(c), i.add(c.to));
      }
    };
    n(b.NODE_INITIAL);
  }
  function bn(e, { prefix: t = "" } = {}) {
    if (b.DEBUG) {
      A(`${t}Nodes are:`);
      for (let n = 0; n < e.nodes.length; ++n)
        A(`${t}  ${n}: ${JSON.stringify(e.nodes[n])}`);
    }
  }
  function ft(e, t, n = !1) {
    A(`Running a vm on ${JSON.stringify(t)}`);
    let r = [{ node: b.NODE_INITIAL, state: {
      candidateUsage: null,
      requiredOptions: [],
      errorMessage: null,
      ignoreOptions: !1,
      options: [],
      path: [],
      positionals: [],
      remainder: null,
      selectedIndex: null
    } }];
    bn(e, { prefix: "  " });
    let o = [b.START_OF_INPUT, ...t];
    for (let i = 0; i < o.length; ++i) {
      let s = o[i];
      A(`  Processing ${JSON.stringify(s)}`);
      let a = [];
      for (let { node: c, state: u } of r) {
        A(`    Current node is ${c}`);
        let l = e.nodes[c];
        if (c === b.NODE_ERRORED) {
          a.push({ node: c, state: u });
          continue;
        }
        console.assert(l.shortcuts.length === 0, "Shortcuts should have been eliminated by now");
        let f = Object.prototype.hasOwnProperty.call(l.statics, s);
        if (!n || i < o.length - 1 || f)
          if (f) {
            let p = l.statics[s];
            for (let { to: h, reducer: y } of p)
              a.push({ node: h, state: typeof y < "u" ? fe(Pe, y, u, s) : u }), A(`      Static transition to ${h} found`);
          } else
            A("      No static transition found");
        else {
          let p = !1;
          for (let h of Object.keys(l.statics))
            if (!!h.startsWith(s)) {
              if (s === h)
                for (let { to: y, reducer: v } of l.statics[h])
                  a.push({ node: y, state: typeof v < "u" ? fe(Pe, v, u, s) : u }), A(`      Static transition to ${y} found`);
              else
                for (let { to: y } of l.statics[h])
                  a.push({ node: y, state: S(x({}, u), { remainder: h.slice(s.length) }) }), A(`      Static transition to ${y} found (partial match)`);
              p = !0;
            }
          p || A("      No partial static transition found");
        }
        if (s !== b.END_OF_INPUT)
          for (let [p, { to: h, reducer: y }] of l.dynamics)
            fe(pe, p, u, s) && (a.push({ node: h, state: typeof y < "u" ? fe(Pe, y, u, s) : u }), A(`      Dynamic transition to ${h} found (via ${p})`));
      }
      if (a.length === 0 && s === b.END_OF_INPUT && t.length === 1)
        return [{
          node: b.NODE_INITIAL,
          state: mn
        }];
      if (a.length === 0)
        throw new Ae.UnknownSyntaxError(t, r.filter(({ node: c }) => c !== b.NODE_ERRORED).map(({ state: c }) => ({ usage: c.candidateUsage, reason: null })));
      if (a.every(({ node: c }) => c === b.NODE_ERRORED))
        throw new Ae.UnknownSyntaxError(t, a.map(({ state: c }) => ({ usage: c.candidateUsage, reason: c.errorMessage })));
      r = xn(a);
    }
    if (r.length > 0) {
      A("  Results:");
      for (let i of r)
        A(`    - ${i.node} -> ${JSON.stringify(i.state)}`);
    } else
      A("  No results");
    return r;
  }
  function Yi(e, t) {
    if (t.selectedIndex !== null)
      return !0;
    if (Object.prototype.hasOwnProperty.call(e.statics, b.END_OF_INPUT)) {
      for (let { to: n } of e.statics[b.END_OF_INPUT])
        if (n === b.NODE_SUCCESS)
          return !0;
    }
    return !1;
  }
  function Zi(e, t, n) {
    let r = n && t.length > 0 ? [""] : [], o = ft(e, t, n), i = [], s = /* @__PURE__ */ new Set(), a = (c, u, l = !0) => {
      let f = [u];
      for (; f.length > 0; ) {
        let h = f;
        f = [];
        for (let y of h) {
          let v = e.nodes[y], R = Object.keys(v.statics);
          for (let W of Object.keys(v.statics)) {
            let z = R[0];
            for (let { to: Ye, reducer: ve } of v.statics[z])
              ve === "pushPath" && (l || c.push(z), f.push(Ye));
          }
        }
        l = !1;
      }
      let p = JSON.stringify(c);
      s.has(p) || (i.push(c), s.add(p));
    };
    for (let { node: c, state: u } of o) {
      if (u.remainder !== null) {
        a([u.remainder], c);
        continue;
      }
      let l = e.nodes[c], f = Yi(l, u);
      for (let [p, h] of Object.entries(l.statics))
        (f && p !== b.END_OF_INPUT || !p.startsWith("-") && h.some(({ reducer: y }) => y === "pushPath")) && a([...r, p], c);
      if (!!f)
        for (let [p, { to: h }] of l.dynamics) {
          if (h === b.NODE_ERRORED)
            continue;
          let y = wn(p, u);
          if (y !== null)
            for (let v of y)
              a([...r, v], c);
        }
    }
    return [...i].sort();
  }
  function Qi(e, t) {
    let n = ft(e, [...t, b.END_OF_INPUT]);
    return En(t, n.map(({ state: r }) => r));
  }
  function xn(e) {
    let t = 0;
    for (let { state: n } of e)
      n.path.length > t && (t = n.path.length);
    return e.filter(({ state: n }) => n.path.length === t);
  }
  function En(e, t) {
    let n = t.filter((f) => f.selectedIndex !== null);
    if (n.length === 0)
      throw new Error();
    let r = n.filter((f) => f.requiredOptions.every((p) => p.some((h) => f.options.find((y) => y.name === h))));
    if (r.length === 0)
      throw new Ae.UnknownSyntaxError(e, n.map((f) => ({
        usage: f.candidateUsage,
        reason: null
      })));
    let o = 0;
    for (let f of r)
      f.path.length > o && (o = f.path.length);
    let i = r.filter((f) => f.path.length === o), s = (f) => f.positionals.filter(({ extra: p }) => !p).length + f.options.length, a = i.map((f) => ({ state: f, positionalCount: s(f) })), c = 0;
    for (let { positionalCount: f } of a)
      f > c && (c = f);
    let u = a.filter(({ positionalCount: f }) => f === c).map(({ state: f }) => f), l = On(u);
    if (l.length > 1)
      throw new Ae.AmbiguousSyntaxError(e, l.map((f) => f.candidateUsage));
    return l[0];
  }
  function On(e) {
    let t = [], n = [];
    for (let r of e)
      r.selectedIndex === b.HELP_COMMAND_INDEX ? n.push(r) : t.push(r);
    return n.length > 0 && t.push(S(x({}, mn), {
      path: vn(...n.map((r) => r.path)),
      options: n.reduce((r, o) => r.concat(o.options), [])
    })), t;
  }
  function vn(e, t, ...n) {
    return t === void 0 ? Array.from(e) : vn(e.filter((r, o) => r === t[o]), ...n);
  }
  function P() {
    return {
      dynamics: [],
      shortcuts: [],
      statics: {}
    };
  }
  function pt(e) {
    return e === b.NODE_SUCCESS || e === b.NODE_ERRORED;
  }
  function Ie(e, t = 0) {
    return {
      to: pt(e.to) ? e.to : e.to > 2 ? e.to + t - 2 : e.to + t,
      reducer: e.reducer
    };
  }
  function Sn(e, t = 0) {
    let n = P();
    for (let [r, o] of e.dynamics)
      n.dynamics.push([r, Ie(o, t)]);
    for (let r of e.shortcuts)
      n.shortcuts.push(Ie(r, t));
    for (let [r, o] of Object.entries(e.statics))
      n.statics[r] = o.map((i) => Ie(i, t));
    return n;
  }
  function $(e, t, n, r, o) {
    e.nodes[t].dynamics.push([
      n,
      { to: r, reducer: o }
    ]);
  }
  function J(e, t, n, r) {
    e.nodes[t].shortcuts.push({ to: n, reducer: r });
  }
  function U(e, t, n, r, o) {
    (Object.prototype.hasOwnProperty.call(e.nodes[t].statics, n) ? e.nodes[t].statics[n] : e.nodes[t].statics[n] = []).push({ to: r, reducer: o });
  }
  function fe(e, t, n, r) {
    if (Array.isArray(t)) {
      let [o, ...i] = t;
      return e[o](n, r, ...i);
    } else
      return e[t](n, r);
  }
  function wn(e, t) {
    let n = Array.isArray(e) ? pe[e[0]] : pe[e];
    if (typeof n.suggest > "u")
      return null;
    let r = Array.isArray(e) ? e.slice(1) : [];
    return n.suggest(t, ...r);
  }
  var pe = {
    always: () => !0,
    isOptionLike: (e, t) => !e.ignoreOptions && t !== "-" && t.startsWith("-"),
    isNotOptionLike: (e, t) => e.ignoreOptions || t === "-" || !t.startsWith("-"),
    isOption: (e, t, n, r) => !e.ignoreOptions && t === n,
    isBatchOption: (e, t, n) => !e.ignoreOptions && b.BATCH_REGEX.test(t) && [...t.slice(1)].every((r) => n.includes(`-${r}`)),
    isBoundOption: (e, t, n, r) => {
      let o = t.match(b.BINDING_REGEX);
      return !e.ignoreOptions && !!o && b.OPTION_REGEX.test(o[1]) && n.includes(o[1]) && r.filter((i) => i.names.includes(o[1])).every((i) => i.allowBinding);
    },
    isNegatedOption: (e, t, n) => !e.ignoreOptions && t === `--no-${n.slice(2)}`,
    isHelp: (e, t) => !e.ignoreOptions && b.HELP_REGEX.test(t),
    isUnsupportedOption: (e, t, n) => !e.ignoreOptions && t.startsWith("-") && b.OPTION_REGEX.test(t) && !n.includes(t),
    isInvalidOption: (e, t) => !e.ignoreOptions && t.startsWith("-") && !b.OPTION_REGEX.test(t)
  };
  pe.isOption.suggest = (e, t, n = !0) => n ? null : [t];
  var Pe = {
    setCandidateState: (e, t, n) => x(x({}, e), n),
    setSelectedIndex: (e, t, n) => S(x({}, e), { selectedIndex: n }),
    pushBatch: (e, t) => S(x({}, e), { options: e.options.concat([...t.slice(1)].map((n) => ({ name: `-${n}`, value: !0 }))) }),
    pushBound: (e, t) => {
      let [, n, r] = t.match(b.BINDING_REGEX);
      return S(x({}, e), { options: e.options.concat({ name: n, value: r }) });
    },
    pushPath: (e, t) => S(x({}, e), { path: e.path.concat(t) }),
    pushPositional: (e, t) => S(x({}, e), { positionals: e.positionals.concat({ value: t, extra: !1 }) }),
    pushExtra: (e, t) => S(x({}, e), { positionals: e.positionals.concat({ value: t, extra: !0 }) }),
    pushExtraNoLimits: (e, t) => S(x({}, e), { positionals: e.positionals.concat({ value: t, extra: L }) }),
    pushTrue: (e, t, n = t) => S(x({}, e), { options: e.options.concat({ name: t, value: !0 }) }),
    pushFalse: (e, t, n = t) => S(x({}, e), { options: e.options.concat({ name: n, value: !1 }) }),
    pushUndefined: (e, t) => S(x({}, e), { options: e.options.concat({ name: t, value: void 0 }) }),
    pushStringValue: (e, t) => {
      var n;
      let r = S(x({}, e), { options: [...e.options] }), o = e.options[e.options.length - 1];
      return o.value = ((n = o.value) !== null && n !== void 0 ? n : []).concat([t]), r;
    },
    setStringValue: (e, t) => {
      let n = S(x({}, e), { options: [...e.options] }), r = e.options[e.options.length - 1];
      return r.value = t, n;
    },
    inhibateOptions: (e) => S(x({}, e), { ignoreOptions: !0 }),
    useHelp: (e, t, n) => {
      let [, , r] = t.match(b.HELP_REGEX);
      return typeof r < "u" ? S(x({}, e), { options: [{ name: "-c", value: String(n) }, { name: "-i", value: r }] }) : S(x({}, e), { options: [{ name: "-c", value: String(n) }] });
    },
    setError: (e, t, n) => t === b.END_OF_INPUT ? S(x({}, e), { errorMessage: `${n}.` }) : S(x({}, e), { errorMessage: `${n} ("${t}").` }),
    setOptionArityError: (e, t) => {
      let n = e.options[e.options.length - 1];
      return S(x({}, e), { errorMessage: `Not enough arguments to option ${n.name}.` });
    }
  }, L = Symbol(), Re = class {
    constructor(t, n) {
      this.allOptionNames = [], this.arity = { leading: [], trailing: [], extra: [], proxy: !1 }, this.options = [], this.paths = [], this.cliIndex = t, this.cliOpts = n;
    }
    addPath(t) {
      this.paths.push(t);
    }
    setArity({ leading: t = this.arity.leading, trailing: n = this.arity.trailing, extra: r = this.arity.extra, proxy: o = this.arity.proxy }) {
      Object.assign(this.arity, { leading: t, trailing: n, extra: r, proxy: o });
    }
    addPositional({ name: t = "arg", required: n = !0 } = {}) {
      if (!n && this.arity.extra === L)
        throw new Error("Optional parameters cannot be declared when using .rest() or .proxy()");
      if (!n && this.arity.trailing.length > 0)
        throw new Error("Optional parameters cannot be declared after the required trailing positional arguments");
      !n && this.arity.extra !== L ? this.arity.extra.push(t) : this.arity.extra !== L && this.arity.extra.length === 0 ? this.arity.leading.push(t) : this.arity.trailing.push(t);
    }
    addRest({ name: t = "arg", required: n = 0 } = {}) {
      if (this.arity.extra === L)
        throw new Error("Infinite lists cannot be declared multiple times in the same command");
      if (this.arity.trailing.length > 0)
        throw new Error("Infinite lists cannot be declared after the required trailing positional arguments");
      for (let r = 0; r < n; ++r)
        this.addPositional({ name: t });
      this.arity.extra = L;
    }
    addProxy({ required: t = 0 } = {}) {
      this.addRest({ required: t }), this.arity.proxy = !0;
    }
    addOption({ names: t, description: n, arity: r = 0, hidden: o = !1, required: i = !1, allowBinding: s = !0 }) {
      if (!s && r > 1)
        throw new Error("The arity cannot be higher than 1 when the option only supports the --arg=value syntax");
      if (!Number.isInteger(r))
        throw new Error(`The arity must be an integer, got ${r}`);
      if (r < 0)
        throw new Error(`The arity must be positive, got ${r}`);
      this.allOptionNames.push(...t), this.options.push({ names: t, description: n, arity: r, hidden: o, required: i, allowBinding: s });
    }
    setContext(t) {
      this.context = t;
    }
    usage({ detailed: t = !0, inlineOptions: n = !0 } = {}) {
      let r = [this.cliOpts.binaryName], o = [];
      if (this.paths.length > 0 && r.push(...this.paths[0]), t) {
        for (let { names: s, arity: a, hidden: c, description: u, required: l } of this.options) {
          if (c)
            continue;
          let f = [];
          for (let h = 0; h < a; ++h)
            f.push(` #${h}`);
          let p = `${s.join(",")}${f.join("")}`;
          !n && u ? o.push({ definition: p, description: u, required: l }) : r.push(l ? `<${p}>` : `[${p}]`);
        }
        r.push(...this.arity.leading.map((s) => `<${s}>`)), this.arity.extra === L ? r.push("...") : r.push(...this.arity.extra.map((s) => `[${s}]`)), r.push(...this.arity.trailing.map((s) => `<${s}>`));
      }
      return { usage: r.join(" "), options: o };
    }
    compile() {
      if (typeof this.context > "u")
        throw new Error("Assertion failed: No context attached");
      let t = dt(), n = b.NODE_INITIAL, r = this.usage().usage, o = this.options.filter((a) => a.required).map((a) => a.names);
      n = D(t, P()), U(t, b.NODE_INITIAL, b.START_OF_INPUT, n, ["setCandidateState", { candidateUsage: r, requiredOptions: o }]);
      let i = this.arity.proxy ? "always" : "isNotOptionLike", s = this.paths.length > 0 ? this.paths : [[]];
      for (let a of s) {
        let c = n;
        if (a.length > 0) {
          let p = D(t, P());
          J(t, c, p), this.registerOptions(t, p), c = p;
        }
        for (let p = 0; p < a.length; ++p) {
          let h = D(t, P());
          U(t, c, a[p], h, "pushPath"), c = h;
        }
        if (this.arity.leading.length > 0 || !this.arity.proxy) {
          let p = D(t, P());
          $(t, c, "isHelp", p, ["useHelp", this.cliIndex]), U(t, p, b.END_OF_INPUT, b.NODE_SUCCESS, ["setSelectedIndex", b.HELP_COMMAND_INDEX]), this.registerOptions(t, c);
        }
        this.arity.leading.length > 0 && U(t, c, b.END_OF_INPUT, b.NODE_ERRORED, ["setError", "Not enough positional arguments"]);
        let u = c;
        for (let p = 0; p < this.arity.leading.length; ++p) {
          let h = D(t, P());
          (!this.arity.proxy || p + 1 !== this.arity.leading.length) && this.registerOptions(t, h), (this.arity.trailing.length > 0 || p + 1 !== this.arity.leading.length) && U(t, h, b.END_OF_INPUT, b.NODE_ERRORED, ["setError", "Not enough positional arguments"]), $(t, u, "isNotOptionLike", h, "pushPositional"), u = h;
        }
        let l = u;
        if (this.arity.extra === L || this.arity.extra.length > 0) {
          let p = D(t, P());
          if (J(t, u, p), this.arity.extra === L) {
            let h = D(t, P());
            this.arity.proxy || this.registerOptions(t, h), $(t, u, i, h, "pushExtraNoLimits"), $(t, h, i, h, "pushExtraNoLimits"), J(t, h, p);
          } else
            for (let h = 0; h < this.arity.extra.length; ++h) {
              let y = D(t, P());
              (!this.arity.proxy || h > 0) && this.registerOptions(t, y), $(t, l, i, y, "pushExtra"), J(t, y, p), l = y;
            }
          l = p;
        }
        this.arity.trailing.length > 0 && U(t, l, b.END_OF_INPUT, b.NODE_ERRORED, ["setError", "Not enough positional arguments"]);
        let f = l;
        for (let p = 0; p < this.arity.trailing.length; ++p) {
          let h = D(t, P());
          this.arity.proxy || this.registerOptions(t, h), p + 1 < this.arity.trailing.length && U(t, h, b.END_OF_INPUT, b.NODE_ERRORED, ["setError", "Not enough positional arguments"]), $(t, f, "isNotOptionLike", h, "pushPositional"), f = h;
        }
        $(t, f, i, b.NODE_ERRORED, ["setError", "Extraneous positional argument"]), U(t, f, b.END_OF_INPUT, b.NODE_SUCCESS, ["setSelectedIndex", this.cliIndex]);
      }
      return {
        machine: t,
        context: this.context
      };
    }
    registerOptions(t, n) {
      $(t, n, ["isOption", "--"], n, "inhibateOptions"), $(t, n, ["isBatchOption", this.allOptionNames], n, "pushBatch"), $(t, n, ["isBoundOption", this.allOptionNames, this.options], n, "pushBound"), $(t, n, ["isUnsupportedOption", this.allOptionNames], b.NODE_ERRORED, ["setError", "Unsupported option name"]), $(t, n, ["isInvalidOption"], b.NODE_ERRORED, ["setError", "Invalid option name"]);
      for (let r of this.options) {
        let o = r.names.reduce((i, s) => s.length > i.length ? s : i, "");
        if (r.arity === 0)
          for (let i of r.names)
            $(t, n, ["isOption", i, r.hidden || i !== o], n, "pushTrue"), i.startsWith("--") && !i.startsWith("--no-") && $(t, n, ["isNegatedOption", i], n, ["pushFalse", i]);
        else {
          let i = D(t, P());
          for (let s of r.names)
            $(t, n, ["isOption", s, r.hidden || s !== o], i, "pushUndefined");
          for (let s = 0; s < r.arity; ++s) {
            let a = D(t, P());
            U(t, i, b.END_OF_INPUT, b.NODE_ERRORED, "setOptionArityError"), $(t, i, "isOptionLike", b.NODE_ERRORED, "setOptionArityError");
            let c = r.arity === 1 ? "setStringValue" : "pushStringValue";
            $(t, i, "isNotOptionLike", a, c), i = a;
          }
          J(t, i, n);
        }
      }
    }
  }, he = class {
    constructor({ binaryName: t = "..." } = {}) {
      this.builders = [], this.opts = { binaryName: t };
    }
    static build(t, n = {}) {
      return new he(n).commands(t).compile();
    }
    getBuilderByIndex(t) {
      if (!(t >= 0 && t < this.builders.length))
        throw new Error(`Assertion failed: Out-of-bound command index (${t})`);
      return this.builders[t];
    }
    commands(t) {
      for (let n of t)
        n(this.command());
      return this;
    }
    command() {
      let t = new Re(this.builders.length, this.opts);
      return this.builders.push(t), t;
    }
    compile() {
      let t = [], n = [];
      for (let o of this.builders) {
        let { machine: i, context: s } = o.compile();
        t.push(i), n.push(s);
      }
      let r = gn(t);
      return yn(r), {
        machine: r,
        contexts: n,
        process: (o) => Qi(r, o),
        suggest: (o, i) => Zi(r, o, i)
      };
    }
  };
  _.CliBuilder = he;
  _.CommandBuilder = Re;
  _.NoLimits = L;
  _.aggregateHelpStates = On;
  _.cloneNode = Sn;
  _.cloneTransition = Ie;
  _.debug = A;
  _.debugMachine = bn;
  _.execute = fe;
  _.injectNode = D;
  _.isTerminalNode = pt;
  _.makeAnyOfMachine = gn;
  _.makeNode = P;
  _.makeStateMachine = dt;
  _.reducers = Pe;
  _.registerDynamic = $;
  _.registerShortcut = J;
  _.registerStatic = U;
  _.runMachineInternal = ft;
  _.selectBestState = En;
  _.simplifyMachine = yn;
  _.suggest = wn;
  _.tests = pe;
  _.trimSmallerBranches = xn;
});

// node_modules/clipanion/lib/platform/node.js
var Nn = O((Te) => {
  "use strict";
  d();
  Object.defineProperty(Te, "__esModule", { value: !0 });
  var es = I("tty");
  function ts(e) {
    return e && typeof e == "object" && "default" in e ? e : { default: e };
  }
  var ht = /* @__PURE__ */ ts(es);
  function ns() {
    return ht.default && "getColorDepth" in ht.default.WriteStream.prototype ? ht.default.WriteStream.prototype.getColorDepth() : process.env.FORCE_COLOR === "0" ? 1 : process.env.FORCE_COLOR === "1" || typeof process.stdout < "u" && process.stdout.isTTY ? 8 : 1;
  }
  var _n;
  function rs(e) {
    let t = _n;
    if (typeof t > "u") {
      if (e.stdout === process.stdout && e.stderr === process.stderr)
        return null;
      let { AsyncLocalStorage: n } = I("async_hooks");
      t = _n = new n();
      let r = process.stdout._write;
      process.stdout._write = function(i, s, a) {
        let c = t.getStore();
        return typeof c > "u" ? r.call(this, i, s, a) : c.stdout.write(i, s, a);
      };
      let o = process.stderr._write;
      process.stderr._write = function(i, s, a) {
        let c = t.getStore();
        return typeof c > "u" ? o.call(this, i, s, a) : c.stderr.write(i, s, a);
      };
    }
    return (n) => t.run(e, n);
  }
  Te.getCaptureActivator = rs;
  Te.getDefaultColorDepth = ns;
});

// node_modules/clipanion/lib/advanced/HelpCommand.js
var $n = O((mt) => {
  "use strict";
  d();
  Object.defineProperty(mt, "__esModule", { value: !0 });
  var os = K(), me = class extends os.Command {
    constructor(t) {
      super(), this.contexts = t, this.commands = [];
    }
    static from(t, n) {
      let r = new me(n);
      r.path = t.path;
      for (let o of t.options)
        switch (o.name) {
          case "-c":
            r.commands.push(Number(o.value));
            break;
          case "-i":
            r.index = Number(o.value);
            break;
        }
      return r;
    }
    async execute() {
      let t = this.commands;
      if (typeof this.index < "u" && this.index >= 0 && this.index < t.length && (t = [t[this.index]]), t.length === 0)
        this.context.stdout.write(this.cli.usage());
      else if (t.length === 1)
        this.context.stdout.write(this.cli.usage(this.contexts[t[0]].commandClass, { detailed: !0 }));
      else if (t.length > 1) {
        this.context.stdout.write(`Multiple commands match your selection:
`), this.context.stdout.write(`
`);
        let n = 0;
        for (let r of this.commands)
          this.context.stdout.write(this.cli.usage(this.contexts[r].commandClass, { prefix: `${n++}. `.padStart(5) }));
        this.context.stdout.write(`
`), this.context.stdout.write(`Run again with -h=<index> to see the longer details of any of those commands.
`);
      }
    }
  };
  mt.HelpCommand = me;
});

// node_modules/clipanion/lib/advanced/Cli.js
var Rn = O((ge) => {
  "use strict";
  d();
  Object.defineProperty(ge, "__esModule", { value: !0 });
  var is = we(), ss = je(), k = st(), Pn = Nn(), ke = K(), as = $n(), Cn = Symbol("clipanion/errorCommand");
  async function cs(...e) {
    let { resolvedOptions: t, resolvedCommandClasses: n, resolvedArgv: r, resolvedContext: o } = An(e);
    return M.from(n, t).runExit(r, o);
  }
  async function us(...e) {
    let { resolvedOptions: t, resolvedCommandClasses: n, resolvedArgv: r, resolvedContext: o } = An(e);
    return M.from(n, t).run(r, o);
  }
  function An(e) {
    let t, n, r, o;
    switch (typeof process < "u" && typeof process.argv < "u" && (r = process.argv.slice(2)), e.length) {
      case 1:
        n = e[0];
        break;
      case 2:
        e[0] && e[0].prototype instanceof ke.Command || Array.isArray(e[0]) ? (n = e[0], Array.isArray(e[1]) ? r = e[1] : o = e[1]) : (t = e[0], n = e[1]);
        break;
      case 3:
        Array.isArray(e[2]) ? (t = e[0], n = e[1], r = e[2]) : e[0] && e[0].prototype instanceof ke.Command || Array.isArray(e[0]) ? (n = e[0], r = e[1], o = e[2]) : (t = e[0], n = e[1], o = e[2]);
        break;
      default:
        t = e[0], n = e[1], r = e[2], o = e[3];
        break;
    }
    if (typeof r > "u")
      throw new Error("The argv parameter must be provided when running Clipanion outside of a Node context");
    return {
      resolvedOptions: t,
      resolvedCommandClasses: n,
      resolvedArgv: r,
      resolvedContext: o
    };
  }
  var M = class {
    constructor({ binaryLabel: t, binaryName: n = "...", binaryVersion: r, enableCapture: o = !1, enableColors: i } = {}) {
      this.registrations = /* @__PURE__ */ new Map(), this.builder = new ss.CliBuilder({ binaryName: n }), this.binaryLabel = t, this.binaryName = n, this.binaryVersion = r, this.enableCapture = o, this.enableColors = i;
    }
    static from(t, n = {}) {
      let r = new M(n), o = Array.isArray(t) ? t : [t];
      for (let i of o)
        r.register(i);
      return r;
    }
    register(t) {
      var n;
      let r = /* @__PURE__ */ new Map(), o = new t();
      for (let c in o) {
        let u = o[c];
        typeof u == "object" && u !== null && u[ke.Command.isOption] && r.set(c, u);
      }
      let i = this.builder.command(), s = i.cliIndex, a = (n = t.paths) !== null && n !== void 0 ? n : o.paths;
      if (typeof a < "u")
        for (let c of a)
          i.addPath(c);
      this.registrations.set(t, { specs: r, builder: i, index: s });
      for (let [c, { definition: u }] of r.entries())
        u(i, c);
      i.setContext({
        commandClass: t
      });
    }
    process(t, n) {
      let { contexts: r, process: o } = this.builder.compile(), i = o(t), s = x(x({}, M.defaultContext), n);
      switch (i.selectedIndex) {
        case is.HELP_COMMAND_INDEX: {
          let a = as.HelpCommand.from(i, r);
          return a.context = s, a;
        }
        default:
          {
            let { commandClass: a } = r[i.selectedIndex], c = this.registrations.get(a);
            if (typeof c > "u")
              throw new Error("Assertion failed: Expected the command class to have been registered.");
            let u = new a();
            u.context = s, u.path = i.path;
            try {
              for (let [l, { transformer: f }] of c.specs.entries())
                u[l] = f(c.builder, l, i, s);
              return u;
            } catch (l) {
              throw l[Cn] = u, l;
            }
          }
          break;
      }
    }
    async run(t, n) {
      var r, o;
      let i, s = x(x({}, M.defaultContext), n), a = (r = this.enableColors) !== null && r !== void 0 ? r : s.colorDepth > 1;
      if (!Array.isArray(t))
        i = t;
      else
        try {
          i = this.process(t, s);
        } catch (l) {
          return s.stdout.write(this.error(l, { colored: a })), 1;
        }
      if (i.help)
        return s.stdout.write(this.usage(i, { colored: a, detailed: !0 })), 0;
      i.context = s, i.cli = {
        binaryLabel: this.binaryLabel,
        binaryName: this.binaryName,
        binaryVersion: this.binaryVersion,
        enableCapture: this.enableCapture,
        enableColors: this.enableColors,
        definitions: () => this.definitions(),
        error: (l, f) => this.error(l, f),
        format: (l) => this.format(l),
        process: (l, f) => this.process(l, x(x({}, s), f)),
        run: (l, f) => this.run(l, x(x({}, s), f)),
        usage: (l, f) => this.usage(l, f)
      };
      let c = this.enableCapture && (o = Pn.getCaptureActivator(s)) !== null && o !== void 0 ? o : In, u;
      try {
        u = await c(() => i.validateAndExecute().catch((l) => i.catch(l).then(() => 0)));
      } catch (l) {
        return s.stdout.write(this.error(l, { colored: a, command: i })), 1;
      }
      return u;
    }
    async runExit(t, n) {
      process.exitCode = await this.run(t, n);
    }
    suggest(t, n) {
      let { suggest: r } = this.builder.compile();
      return r(t, n);
    }
    definitions({ colored: t = !1 } = {}) {
      let n = [];
      for (let [r, { index: o }] of this.registrations) {
        if (typeof r.usage > "u")
          continue;
        let { usage: i } = this.getUsageByIndex(o, { detailed: !1 }), { usage: s, options: a } = this.getUsageByIndex(o, { detailed: !0, inlineOptions: !1 }), c = typeof r.usage.category < "u" ? k.formatMarkdownish(r.usage.category, { format: this.format(t), paragraphs: !1 }) : void 0, u = typeof r.usage.description < "u" ? k.formatMarkdownish(r.usage.description, { format: this.format(t), paragraphs: !1 }) : void 0, l = typeof r.usage.details < "u" ? k.formatMarkdownish(r.usage.details, { format: this.format(t), paragraphs: !0 }) : void 0, f = typeof r.usage.examples < "u" ? r.usage.examples.map(([p, h]) => [k.formatMarkdownish(p, { format: this.format(t), paragraphs: !1 }), h.replace(/\$0/g, this.binaryName)]) : void 0;
        n.push({ path: i, usage: s, category: c, description: u, details: l, examples: f, options: a });
      }
      return n;
    }
    usage(t = null, { colored: n, detailed: r = !1, prefix: o = "$ " } = {}) {
      var i;
      if (t === null) {
        for (let c of this.registrations.keys()) {
          let u = c.paths, l = typeof c.usage < "u";
          if (!u || u.length === 0 || u.length === 1 && u[0].length === 0 || ((i = u == null ? void 0 : u.some((h) => h.length === 0)) !== null && i !== void 0 ? i : !1))
            if (t) {
              t = null;
              break;
            } else
              t = c;
          else if (l) {
            t = null;
            continue;
          }
        }
        t && (r = !0);
      }
      let s = t !== null && t instanceof ke.Command ? t.constructor : t, a = "";
      if (s)
        if (r) {
          let { description: c = "", details: u = "", examples: l = [] } = s.usage || {};
          c !== "" && (a += k.formatMarkdownish(c, { format: this.format(n), paragraphs: !1 }).replace(/^./, (h) => h.toUpperCase()), a += `
`), (u !== "" || l.length > 0) && (a += `${this.format(n).header("Usage")}
`, a += `
`);
          let { usage: f, options: p } = this.getUsageByRegistration(s, { inlineOptions: !1 });
          if (a += `${this.format(n).bold(o)}${f}
`, p.length > 0) {
            a += `
`, a += `${this.format(n).header("Options")}
`;
            let h = p.reduce((y, v) => Math.max(y, v.definition.length), 0);
            a += `
`;
            for (let { definition: y, description: v } of p)
              a += `  ${this.format(n).bold(y.padEnd(h))}    ${k.formatMarkdownish(v, { format: this.format(n), paragraphs: !1 })}`;
          }
          if (u !== "" && (a += `
`, a += `${this.format(n).header("Details")}
`, a += `
`, a += k.formatMarkdownish(u, { format: this.format(n), paragraphs: !0 })), l.length > 0) {
            a += `
`, a += `${this.format(n).header("Examples")}
`;
            for (let [h, y] of l)
              a += `
`, a += k.formatMarkdownish(h, { format: this.format(n), paragraphs: !1 }), a += `${y.replace(/^/m, `  ${this.format(n).bold(o)}`).replace(/\$0/g, this.binaryName)}
`;
          }
        } else {
          let { usage: c } = this.getUsageByRegistration(s);
          a += `${this.format(n).bold(o)}${c}
`;
        }
      else {
        let c = /* @__PURE__ */ new Map();
        for (let [p, { index: h }] of this.registrations.entries()) {
          if (typeof p.usage > "u")
            continue;
          let y = typeof p.usage.category < "u" ? k.formatMarkdownish(p.usage.category, { format: this.format(n), paragraphs: !1 }) : null, v = c.get(y);
          typeof v > "u" && c.set(y, v = []);
          let { usage: R } = this.getUsageByIndex(h);
          v.push({ commandClass: p, usage: R });
        }
        let u = Array.from(c.keys()).sort((p, h) => p === null ? -1 : h === null ? 1 : p.localeCompare(h, "en", { usage: "sort", caseFirst: "upper" })), l = typeof this.binaryLabel < "u", f = typeof this.binaryVersion < "u";
        l || f ? (l && f ? a += `${this.format(n).header(`${this.binaryLabel} - ${this.binaryVersion}`)}

` : l ? a += `${this.format(n).header(`${this.binaryLabel}`)}
` : a += `${this.format(n).header(`${this.binaryVersion}`)}
`, a += `  ${this.format(n).bold(o)}${this.binaryName} <command>
`) : a += `${this.format(n).bold(o)}${this.binaryName} <command>
`;
        for (let p of u) {
          let h = c.get(p).slice().sort((v, R) => v.usage.localeCompare(R.usage, "en", { usage: "sort", caseFirst: "upper" })), y = p !== null ? p.trim() : "General commands";
          a += `
`, a += `${this.format(n).header(`${y}`)}
`;
          for (let { commandClass: v, usage: R } of h) {
            let W = v.usage.description || "undocumented";
            a += `
`, a += `  ${this.format(n).bold(R)}
`, a += `    ${k.formatMarkdownish(W, { format: this.format(n), paragraphs: !1 })}`;
          }
        }
        a += `
`, a += k.formatMarkdownish("You can also print more details about any of these commands by calling them with the `-h,--help` flag right after the command name.", { format: this.format(n), paragraphs: !0 });
      }
      return a;
    }
    error(t, n) {
      var r, { colored: o, command: i = (r = t[Cn]) !== null && r !== void 0 ? r : null } = n === void 0 ? {} : n;
      t instanceof Error || (t = new Error(`Execution failed with a non-error rejection (rejected value: ${JSON.stringify(t)})`));
      let s = "", a = t.name.replace(/([a-z])([A-Z])/g, "$1 $2");
      a === "Error" && (a = "Internal Error"), s += `${this.format(o).error(a)}: ${t.message}
`;
      let c = t.clipanion;
      return typeof c < "u" ? c.type === "usage" && (s += `
`, s += this.usage(i)) : t.stack && (s += `${t.stack.replace(/^.*\n/, "")}
`), s;
    }
    format(t) {
      var n;
      return ((n = t ?? this.enableColors) !== null && n !== void 0 ? n : M.defaultContext.colorDepth > 1) ? k.richFormat : k.textFormat;
    }
    getUsageByRegistration(t, n) {
      let r = this.registrations.get(t);
      if (typeof r > "u")
        throw new Error("Assertion failed: Unregistered command");
      return this.getUsageByIndex(r.index, n);
    }
    getUsageByIndex(t, n) {
      return this.builder.getBuilderByIndex(t).usage(n);
    }
  };
  M.defaultContext = {
    env: process.env,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    colorDepth: Pn.getDefaultColorDepth()
  };
  function In(e) {
    return e();
  }
  ge.Cli = M;
  ge.run = us;
  ge.runExit = cs;
});

// node_modules/clipanion/lib/advanced/builtins/definitions.js
var jn = O((gt) => {
  "use strict";
  d();
  Object.defineProperty(gt, "__esModule", { value: !0 });
  var ls = K(), De = class extends ls.Command {
    async execute() {
      this.context.stdout.write(`${JSON.stringify(this.cli.definitions(), null, 2)}
`);
    }
  };
  De.paths = [["--clipanion=definitions"]];
  gt.DefinitionsCommand = De;
});

// node_modules/clipanion/lib/advanced/builtins/help.js
var Tn = O((yt) => {
  "use strict";
  d();
  Object.defineProperty(yt, "__esModule", { value: !0 });
  var ds = K(), Me = class extends ds.Command {
    async execute() {
      this.context.stdout.write(this.cli.usage());
    }
  };
  Me.paths = [["-h"], ["--help"]];
  yt.HelpCommand = Me;
});

// node_modules/clipanion/lib/advanced/builtins/version.js
var kn = O((bt) => {
  "use strict";
  d();
  Object.defineProperty(bt, "__esModule", { value: !0 });
  var fs = K(), Ue = class extends fs.Command {
    async execute() {
      var t;
      this.context.stdout.write(`${(t = this.cli.binaryVersion) !== null && t !== void 0 ? t : "<unknown>"}
`);
    }
  };
  Ue.paths = [["-v"], ["--version"]];
  bt.VersionCommand = Ue;
});

// node_modules/clipanion/lib/advanced/builtins/index.js
var Dn = O((ye) => {
  "use strict";
  d();
  Object.defineProperty(ye, "__esModule", { value: !0 });
  var ps = jn(), hs = Tn(), ms = kn();
  ye.DefinitionsCommand = ps.DefinitionsCommand;
  ye.HelpCommand = hs.HelpCommand;
  ye.VersionCommand = ms.VersionCommand;
});

// node_modules/clipanion/lib/advanced/options/Array.js
var Mn = O((Et) => {
  "use strict";
  d();
  Object.defineProperty(Et, "__esModule", { value: !0 });
  var xt = G();
  function gs(e, t, n) {
    let [r, o] = xt.rerouteArguments(t, n ?? {}), { arity: i = 1 } = o, s = e.split(","), a = new Set(s);
    return xt.makeCommandOption({
      definition(c) {
        c.addOption({
          names: s,
          arity: i,
          hidden: o == null ? void 0 : o.hidden,
          description: o == null ? void 0 : o.description,
          required: o.required
        });
      },
      transformer(c, u, l) {
        let f, p = typeof r < "u" ? [...r] : void 0;
        for (let { name: h, value: y } of l.options)
          !a.has(h) || (f = h, p = p ?? [], p.push(y));
        return typeof p < "u" ? xt.applyValidator(f ?? u, p, o.validator) : p;
      }
    });
  }
  Et.Array = gs;
});

// node_modules/clipanion/lib/advanced/options/Boolean.js
var Ln = O((Ot) => {
  "use strict";
  d();
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  var Un = G();
  function ys(e, t, n) {
    let [r, o] = Un.rerouteArguments(t, n ?? {}), i = e.split(","), s = new Set(i);
    return Un.makeCommandOption({
      definition(a) {
        a.addOption({
          names: i,
          allowBinding: !1,
          arity: 0,
          hidden: o.hidden,
          description: o.description,
          required: o.required
        });
      },
      transformer(a, c, u) {
        let l = r;
        for (let { name: f, value: p } of u.options)
          !s.has(f) || (l = p);
        return l;
      }
    });
  }
  Ot.Boolean = ys;
});

// node_modules/clipanion/lib/advanced/options/Counter.js
var Gn = O((vt) => {
  "use strict";
  d();
  Object.defineProperty(vt, "__esModule", { value: !0 });
  var qn = G();
  function bs(e, t, n) {
    let [r, o] = qn.rerouteArguments(t, n ?? {}), i = e.split(","), s = new Set(i);
    return qn.makeCommandOption({
      definition(a) {
        a.addOption({
          names: i,
          allowBinding: !1,
          arity: 0,
          hidden: o.hidden,
          description: o.description,
          required: o.required
        });
      },
      transformer(a, c, u) {
        let l = r;
        for (let { name: f, value: p } of u.options)
          !s.has(f) || (l ?? (l = 0), p ? l += 1 : l = 0);
        return l;
      }
    });
  }
  vt.Counter = bs;
});

// node_modules/clipanion/lib/advanced/options/Proxy.js
var Bn = O((St) => {
  "use strict";
  d();
  Object.defineProperty(St, "__esModule", { value: !0 });
  var xs = G();
  function Es(e = {}) {
    return xs.makeCommandOption({
      definition(t, n) {
        var r;
        t.addProxy({
          name: (r = e.name) !== null && r !== void 0 ? r : n,
          required: e.required
        });
      },
      transformer(t, n, r) {
        return r.positionals.map(({ value: o }) => o);
      }
    });
  }
  St.Proxy = Es;
});

// node_modules/clipanion/lib/advanced/options/Rest.js
var Fn = O((wt) => {
  "use strict";
  d();
  Object.defineProperty(wt, "__esModule", { value: !0 });
  var Os = je(), vs = G();
  function Ss(e = {}) {
    return vs.makeCommandOption({
      definition(t, n) {
        var r;
        t.addRest({
          name: (r = e.name) !== null && r !== void 0 ? r : n,
          required: e.required
        });
      },
      transformer(t, n, r) {
        let o = (s) => {
          let a = r.positionals[s];
          return a.extra === Os.NoLimits || a.extra === !1 && s < t.arity.leading.length;
        }, i = 0;
        for (; i < r.positionals.length && o(i); )
          i += 1;
        return r.positionals.splice(0, i).map(({ value: s }) => s);
      }
    });
  }
  wt.Rest = Ss;
});

// node_modules/clipanion/lib/advanced/options/String.js
var Vn = O((_t) => {
  "use strict";
  d();
  Object.defineProperty(_t, "__esModule", { value: !0 });
  var ws = je(), be = G();
  function _s(e, t, n) {
    let [r, o] = be.rerouteArguments(t, n ?? {}), { arity: i = 1 } = o, s = e.split(","), a = new Set(s);
    return be.makeCommandOption({
      definition(c) {
        c.addOption({
          names: s,
          arity: o.tolerateBoolean ? 0 : i,
          hidden: o.hidden,
          description: o.description,
          required: o.required
        });
      },
      transformer(c, u, l, f) {
        let p, h = r;
        typeof o.env < "u" && f.env[o.env] && (p = o.env, h = f.env[o.env]);
        for (let { name: y, value: v } of l.options)
          !a.has(y) || (p = y, h = v);
        return typeof h == "string" ? be.applyValidator(p ?? u, h, o.validator) : h;
      }
    });
  }
  function Ns(e = {}) {
    let { required: t = !0 } = e;
    return be.makeCommandOption({
      definition(n, r) {
        var o;
        n.addPositional({
          name: (o = e.name) !== null && o !== void 0 ? o : r,
          required: e.required
        });
      },
      transformer(n, r, o) {
        var i;
        for (let s = 0; s < o.positionals.length; ++s) {
          if (o.positionals[s].extra === ws.NoLimits || t && o.positionals[s].extra === !0 || !t && o.positionals[s].extra === !1)
            continue;
          let [a] = o.positionals.splice(s, 1);
          return be.applyValidator((i = e.name) !== null && i !== void 0 ? i : r, a.value, e.validator);
        }
      }
    });
  }
  function $s(e, ...t) {
    return typeof e == "string" ? _s(e, ...t) : Ns(e);
  }
  _t.String = $s;
});

// node_modules/clipanion/lib/advanced/options/index.js
var Hn = O((j) => {
  "use strict";
  d();
  Object.defineProperty(j, "__esModule", { value: !0 });
  var ee = G(), Cs = Mn(), Is = Ln(), Ps = Gn(), As = Bn(), Rs = Fn(), js = Vn();
  j.applyValidator = ee.applyValidator;
  j.cleanValidationError = ee.cleanValidationError;
  j.formatError = ee.formatError;
  j.isOptionSymbol = ee.isOptionSymbol;
  j.makeCommandOption = ee.makeCommandOption;
  j.rerouteArguments = ee.rerouteArguments;
  j.Array = Cs.Array;
  j.Boolean = Is.Boolean;
  j.Counter = Ps.Counter;
  j.Proxy = As.Proxy;
  j.Rest = Rs.Rest;
  j.String = js.String;
});

// node_modules/clipanion/lib/advanced/index.js
var Xn = O((q) => {
  "use strict";
  d();
  Object.defineProperty(q, "__esModule", { value: !0 });
  var Ts = _e(), ks = st(), Ds = K(), Nt = Rn(), Ms = Dn(), Us = Hn();
  q.UsageError = Ts.UsageError;
  q.formatMarkdownish = ks.formatMarkdownish;
  q.Command = Ds.Command;
  q.Cli = Nt.Cli;
  q.run = Nt.run;
  q.runExit = Nt.runExit;
  q.Builtins = Ms;
  q.Option = Us;
});

// node_modules/isexe/windows.js
var Yn = O((jc, Jn) => {
  d();
  Jn.exports = Kn;
  Kn.sync = qs;
  var Wn = I("fs");
  function Ls(e, t) {
    var n = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!n || (n = n.split(";"), n.indexOf("") !== -1))
      return !0;
    for (var r = 0; r < n.length; r++) {
      var o = n[r].toLowerCase();
      if (o && e.substr(-o.length).toLowerCase() === o)
        return !0;
    }
    return !1;
  }
  function zn(e, t, n) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : Ls(t, n);
  }
  function Kn(e, t, n) {
    Wn.stat(e, function(r, o) {
      n(r, r ? !1 : zn(o, e, t));
    });
  }
  function qs(e, t) {
    return zn(Wn.statSync(e), e, t);
  }
});

// node_modules/isexe/mode.js
var nr = O((Tc, tr) => {
  d();
  tr.exports = Qn;
  Qn.sync = Gs;
  var Zn = I("fs");
  function Qn(e, t, n) {
    Zn.stat(e, function(r, o) {
      n(r, r ? !1 : er(o, t));
    });
  }
  function Gs(e, t) {
    return er(Zn.statSync(e), t);
  }
  function er(e, t) {
    return e.isFile() && Bs(e, t);
  }
  function Bs(e, t) {
    var n = e.mode, r = e.uid, o = e.gid, i = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(), s = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), l = a | c, f = n & u || n & c && o === s || n & a && r === i || n & l && i === 0;
    return f;
  }
});

// node_modules/isexe/index.js
var or = O((Dc, rr) => {
  d();
  var kc = I("fs"), Le;
  process.platform === "win32" || global.TESTING_WINDOWS ? Le = Yn() : Le = nr();
  rr.exports = $t;
  $t.sync = Fs;
  function $t(e, t, n) {
    if (typeof t == "function" && (n = t, t = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, o) {
        $t(e, t || {}, function(i, s) {
          i ? o(i) : r(s);
        });
      });
    }
    Le(e, t || {}, function(r, o) {
      r && (r.code === "EACCES" || t && t.ignoreErrors) && (r = null, o = !1), n(r, o);
    });
  }
  function Fs(e, t) {
    try {
      return Le.sync(e, t || {});
    } catch (n) {
      if (t && t.ignoreErrors || n.code === "EACCES")
        return !1;
      throw n;
    }
  }
});

// node_modules/which/which.js
var dr = O((Mc, lr) => {
  d();
  var te = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", ir = I("path"), Vs = te ? ";" : ":", sr = or(), ar = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), cr = (e, t) => {
    let n = t.colon || Vs, r = e.match(/\//) || te && e.match(/\\/) ? [""] : [
      ...te ? [process.cwd()] : [],
      ...(t.path || process.env.PATH || "").split(n)
    ], o = te ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", i = te ? o.split(n) : [""];
    return te && e.indexOf(".") !== -1 && i[0] !== "" && i.unshift(""), {
      pathEnv: r,
      pathExt: i,
      pathExtExe: o
    };
  }, ur = (e, t, n) => {
    typeof t == "function" && (n = t, t = {}), t || (t = {});
    let { pathEnv: r, pathExt: o, pathExtExe: i } = cr(e, t), s = [], a = (u) => new Promise((l, f) => {
      if (u === r.length)
        return t.all && s.length ? l(s) : f(ar(e));
      let p = r[u], h = /^".*"$/.test(p) ? p.slice(1, -1) : p, y = ir.join(h, e), v = !h && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + y : y;
      l(c(v, u, 0));
    }), c = (u, l, f) => new Promise((p, h) => {
      if (f === o.length)
        return p(a(l + 1));
      let y = o[f];
      sr(u + y, { pathExt: i }, (v, R) => {
        if (!v && R)
          if (t.all)
            s.push(u + y);
          else
            return p(u + y);
        return p(c(u, l, f + 1));
      });
    });
    return n ? a(0).then((u) => n(null, u), n) : a(0);
  }, Hs = (e, t) => {
    t = t || {};
    let { pathEnv: n, pathExt: r, pathExtExe: o } = cr(e, t), i = [];
    for (let s = 0; s < n.length; s++) {
      let a = n[s], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = ir.join(c, e), l = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + u : u;
      for (let f = 0; f < r.length; f++) {
        let p = l + r[f];
        try {
          if (sr.sync(p, { pathExt: o }))
            if (t.all)
              i.push(p);
            else
              return p;
        } catch {
        }
      }
    }
    if (t.all && i.length)
      return i;
    if (t.nothrow)
      return null;
    throw ar(e);
  };
  lr.exports = ur;
  ur.sync = Hs;
});

// node_modules/path-key/index.js
var pr = O((Uc, Ct) => {
  "use strict";
  d();
  var fr = (e = {}) => {
    let t = e.env || process.env;
    return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  };
  Ct.exports = fr;
  Ct.exports.default = fr;
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var yr = O((Lc, gr) => {
  "use strict";
  d();
  var hr = I("path"), Xs = dr(), Ws = pr();
  function mr(e, t) {
    let n = e.options.env || process.env, r = process.cwd(), o = e.options.cwd != null, i = o && process.chdir !== void 0 && !process.chdir.disabled;
    if (i)
      try {
        process.chdir(e.options.cwd);
      } catch {
      }
    let s;
    try {
      s = Xs.sync(e.command, {
        path: n[Ws({ env: n })],
        pathExt: t ? hr.delimiter : void 0
      });
    } catch {
    } finally {
      i && process.chdir(r);
    }
    return s && (s = hr.resolve(o ? e.options.cwd : "", s)), s;
  }
  function zs(e) {
    return mr(e) || mr(e, !0);
  }
  gr.exports = zs;
});

// node_modules/cross-spawn/lib/util/escape.js
var br = O((qc, Pt) => {
  "use strict";
  d();
  var It = /([()\][%!^"`<>&|;, *?])/g;
  function Ks(e) {
    return e = e.replace(It, "^$1"), e;
  }
  function Js(e, t) {
    return e = `${e}`, e = e.replace(/(\\*)"/g, '$1$1\\"'), e = e.replace(/(\\*)$/, "$1$1"), e = `"${e}"`, e = e.replace(It, "^$1"), t && (e = e.replace(It, "^$1")), e;
  }
  Pt.exports.command = Ks;
  Pt.exports.argument = Js;
});

// node_modules/shebang-regex/index.js
var Er = O((Gc, xr) => {
  "use strict";
  d();
  xr.exports = /^#!(.*)/;
});

// node_modules/shebang-command/index.js
var vr = O((Bc, Or) => {
  "use strict";
  d();
  var Ys = Er();
  Or.exports = (e = "") => {
    let t = e.match(Ys);
    if (!t)
      return null;
    let [n, r] = t[0].replace(/#! ?/, "").split(" "), o = n.split("/").pop();
    return o === "env" ? r : r ? `${o} ${r}` : o;
  };
});

// node_modules/cross-spawn/lib/util/readShebang.js
var wr = O((Fc, Sr) => {
  "use strict";
  d();
  var At = I("fs"), Zs = vr();
  function Qs(e) {
    let n = Buffer.alloc(150), r;
    try {
      r = At.openSync(e, "r"), At.readSync(r, n, 0, 150, 0), At.closeSync(r);
    } catch {
    }
    return Zs(n.toString());
  }
  Sr.exports = Qs;
});

// node_modules/cross-spawn/lib/parse.js
var Cr = O((Vc, $r) => {
  "use strict";
  d();
  var ea = I("path"), _r = yr(), Nr = br(), ta = wr(), na = process.platform === "win32", ra = /\.(?:com|exe)$/i, oa = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function ia(e) {
    e.file = _r(e);
    let t = e.file && ta(e.file);
    return t ? (e.args.unshift(e.file), e.command = t, _r(e)) : e.file;
  }
  function sa(e) {
    if (!na)
      return e;
    let t = ia(e), n = !ra.test(t);
    if (e.options.forceShell || n) {
      let r = oa.test(t);
      e.command = ea.normalize(e.command), e.command = Nr.command(e.command), e.args = e.args.map((i) => Nr.argument(i, r));
      let o = [e.command].concat(e.args).join(" ");
      e.args = ["/d", "/s", "/c", `"${o}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
    }
    return e;
  }
  function aa(e, t, n) {
    t && !Array.isArray(t) && (n = t, t = null), t = t ? t.slice(0) : [], n = Object.assign({}, n);
    let r = {
      command: e,
      args: t,
      options: n,
      file: void 0,
      original: {
        command: e,
        args: t
      }
    };
    return n.shell ? r : sa(r);
  }
  $r.exports = aa;
});

// node_modules/cross-spawn/lib/enoent.js
var Ar = O((Hc, Pr) => {
  "use strict";
  d();
  var Rt = process.platform === "win32";
  function jt(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args
    });
  }
  function ca(e, t) {
    if (!Rt)
      return;
    let n = e.emit;
    e.emit = function(r, o) {
      if (r === "exit") {
        let i = Ir(o, t, "spawn");
        if (i)
          return n.call(e, "error", i);
      }
      return n.apply(e, arguments);
    };
  }
  function Ir(e, t) {
    return Rt && e === 1 && !t.file ? jt(t.original, "spawn") : null;
  }
  function ua(e, t) {
    return Rt && e === 1 && !t.file ? jt(t.original, "spawnSync") : null;
  }
  Pr.exports = {
    hookChildProcess: ca,
    verifyENOENT: Ir,
    verifyENOENTSync: ua,
    notFoundError: jt
  };
});

// node_modules/cross-spawn/index.js
var Tr = O((Xc, ne) => {
  "use strict";
  d();
  var Rr = I("child_process"), Tt = Cr(), kt = Ar();
  function jr(e, t, n) {
    let r = Tt(e, t, n), o = Rr.spawn(r.command, r.args, r.options);
    return kt.hookChildProcess(o, r), o;
  }
  function la(e, t, n) {
    let r = Tt(e, t, n), o = Rr.spawnSync(r.command, r.args, r.options);
    return o.error = o.error || kt.verifyENOENTSync(o.status, r), o;
  }
  ne.exports = jr;
  ne.exports.spawn = jr;
  ne.exports.sync = la;
  ne.exports._parse = Tt;
  ne.exports._enoent = kt;
});

// node_modules/signal-exit/signals.js
var Fr = O((yu, Ve) => {
  d();
  Ve.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
  ];
  process.platform !== "win32" && Ve.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  process.platform === "linux" && Ve.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
});

// node_modules/signal-exit/index.js
var zr = O((bu, ie) => {
  d();
  var N = global.process, Y = function(e) {
    return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
  };
  Y(N) ? (Vr = I("assert"), re = Fr(), Hr = /^win/i.test(N.platform), Ee = I("events"), typeof Ee != "function" && (Ee = Ee.EventEmitter), N.__signal_exit_emitter__ ? C = N.__signal_exit_emitter__ : (C = N.__signal_exit_emitter__ = new Ee(), C.count = 0, C.emitted = {}), C.infinite || (C.setMaxListeners(1 / 0), C.infinite = !0), ie.exports = function(e, t) {
    if (!Y(global.process))
      return function() {
      };
    Vr.equal(typeof e, "function", "a callback must be provided for exit handler"), oe === !1 && Gt();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    var r = function() {
      C.removeListener(n, e), C.listeners("exit").length === 0 && C.listeners("afterexit").length === 0 && He();
    };
    return C.on(n, e), r;
  }, He = function() {
    !oe || !Y(global.process) || (oe = !1, re.forEach(function(t) {
      try {
        N.removeListener(t, Xe[t]);
      } catch {
      }
    }), N.emit = We, N.reallyExit = Bt, C.count -= 1);
  }, ie.exports.unload = He, Z = function(t, n, r) {
    C.emitted[t] || (C.emitted[t] = !0, C.emit(t, n, r));
  }, Xe = {}, re.forEach(function(e) {
    Xe[e] = function() {
      if (!!Y(global.process)) {
        var n = N.listeners(e);
        n.length === C.count && (He(), Z("exit", null, e), Z("afterexit", null, e), Hr && e === "SIGHUP" && (e = "SIGINT"), N.kill(N.pid, e));
      }
    };
  }), ie.exports.signals = function() {
    return re;
  }, oe = !1, Gt = function() {
    oe || !Y(global.process) || (oe = !0, C.count += 1, re = re.filter(function(t) {
      try {
        return N.on(t, Xe[t]), !0;
      } catch {
        return !1;
      }
    }), N.emit = Wr, N.reallyExit = Xr);
  }, ie.exports.load = Gt, Bt = N.reallyExit, Xr = function(t) {
    !Y(global.process) || (N.exitCode = t || 0, Z("exit", N.exitCode, null), Z("afterexit", N.exitCode, null), Bt.call(N, N.exitCode));
  }, We = N.emit, Wr = function(t, n) {
    if (t === "exit" && Y(global.process)) {
      n !== void 0 && (N.exitCode = n);
      var r = We.apply(this, arguments);
      return Z("exit", N.exitCode, null), Z("afterexit", N.exitCode, null), r;
    } else
      return We.apply(this, arguments);
  }) : ie.exports = function() {
    return function() {
    };
  };
  var Vr, re, Hr, Ee, C, He, Z, Xe, oe, Gt, Bt, Xr, We, Wr;
});

// node_modules/get-stream/buffer-stream.js
var ro = O((vu, no) => {
  "use strict";
  d();
  var { PassThrough: Ua } = I("stream");
  no.exports = (e) => {
    e = x({}, e);
    let { array: t } = e, { encoding: n } = e, r = n === "buffer", o = !1;
    t ? o = !(n || r) : n = n || "utf8", r && (n = null);
    let i = new Ua({ objectMode: o });
    n && i.setEncoding(n);
    let s = 0, a = [];
    return i.on("data", (c) => {
      a.push(c), o ? s = a.length : s += c.length;
    }), i.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), i.getBufferedLength = () => s, i;
  };
});

// node_modules/get-stream/index.js
var oo = O((Su, Oe) => {
  "use strict";
  d();
  var { constants: La } = I("buffer"), qa = I("stream"), { promisify: Ga } = I("util"), Ba = ro(), Fa = Ga(qa.pipeline), ze = class extends Error {
    constructor() {
      super("maxBuffer exceeded"), this.name = "MaxBufferError";
    }
  };
  async function Ft(e, t) {
    if (!e)
      throw new Error("Expected a stream");
    t = x({
      maxBuffer: 1 / 0
    }, t);
    let { maxBuffer: n } = t, r = Ba(t);
    return await new Promise((o, i) => {
      let s = (a) => {
        a && r.getBufferedLength() <= La.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), i(a);
      };
      (async () => {
        try {
          await Fa(e, r), o();
        } catch (a) {
          s(a);
        }
      })(), r.on("data", () => {
        r.getBufferedLength() > n && s(new ze());
      });
    }), r.getBufferedValue();
  }
  Oe.exports = Ft;
  Oe.exports.buffer = (e, t) => Ft(e, S(x({}, t), { encoding: "buffer" }));
  Oe.exports.array = (e, t) => Ft(e, S(x({}, t), { array: !0 }));
  Oe.exports.MaxBufferError = ze;
});

// node_modules/merge-stream/index.js
var so = O((wu, io) => {
  "use strict";
  d();
  var { PassThrough: Va } = I("stream");
  io.exports = function() {
    var e = [], t = new Va({ objectMode: !0 });
    return t.setMaxListeners(0), t.add = n, t.isEmpty = r, t.on("unpipe", o), Array.prototype.slice.call(arguments).forEach(n), t;
    function n(i) {
      return Array.isArray(i) ? (i.forEach(n), this) : (e.push(i), i.once("end", o.bind(null, i)), i.once("error", t.emit.bind(t, "error")), i.pipe(t, { end: !1 }), this);
    }
    function r() {
      return e.length == 0;
    }
    function o(i) {
      e = e.filter(function(s) {
        return s !== i;
      }), !e.length && t.readable && t.end();
    }
  };
});

// lib/index.mjs
d();
var F = se(Xn(), 1);

// lib/tasks/prettier.mjs
d();

// lib/utils.mjs
d();
import { readFile as tc, writeFile as nc } from "fs/promises";
import { join as rc } from "path";

// node_modules/execa/index.js
d();
var yo = se(Tr(), 1);
import { Buffer as Ja } from "node:buffer";
import Ya from "node:path";
import go from "node:child_process";
import Ke from "node:process";

// node_modules/strip-final-newline/index.js
d();
function Dt(e) {
  let t = typeof e == "string" ? `
` : `
`.charCodeAt(), n = typeof e == "string" ? "\r" : "\r".charCodeAt();
  return e[e.length - 1] === t && (e = e.slice(0, -1)), e[e.length - 1] === n && (e = e.slice(0, -1)), e;
}

// node_modules/npm-run-path/index.js
d();
import Ge from "node:process";
import xe from "node:path";
import da from "node:url";

// node_modules/npm-run-path/node_modules/path-key/index.js
d();
function qe(e = {}) {
  let {
    env: t = process.env,
    platform: n = process.platform
  } = e;
  return n !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
}

// node_modules/npm-run-path/index.js
function fa(e = {}) {
  let {
    cwd: t = Ge.cwd(),
    path: n = Ge.env[qe()],
    execPath: r = Ge.execPath
  } = e, o, i = t instanceof URL ? da.fileURLToPath(t) : t, s = xe.resolve(i), a = [];
  for (; o !== s; )
    a.push(xe.join(s, "node_modules/.bin")), o = s, s = xe.resolve(s, "..");
  return a.push(xe.resolve(i, r, "..")), [...a, n].join(xe.delimiter);
}
function kr(n = {}) {
  var r = n, { env: e = Ge.env } = r, t = Qt(r, ["env"]);
  e = x({}, e);
  let o = qe({ env: e });
  return t.path = e[o], e[o] = fa(t), e;
}

// node_modules/onetime/index.js
d();

// node_modules/mimic-fn/index.js
d();
var pa = (e, t, n, r) => {
  if (n === "length" || n === "prototype" || n === "arguments" || n === "caller")
    return;
  let o = Object.getOwnPropertyDescriptor(e, n), i = Object.getOwnPropertyDescriptor(t, n);
  !ha(o, i) && r || Object.defineProperty(e, n, i);
}, ha = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, ma = (e, t) => {
  let n = Object.getPrototypeOf(t);
  n !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, n);
}, ga = (e, t) => `/* Wrapped ${e}*/
${t}`, ya = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), ba = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), xa = (e, t, n) => {
  let r = n === "" ? "" : `with ${n.trim()}() `, o = ga.bind(null, r, t.toString());
  Object.defineProperty(o, "name", ba), Object.defineProperty(e, "toString", S(x({}, ya), { value: o }));
};
function Mt(e, t, { ignoreNonConfigurable: n = !1 } = {}) {
  let { name: r } = e;
  for (let o of Reflect.ownKeys(t))
    pa(e, t, o, n);
  return ma(e, t), xa(e, t, r), e;
}

// node_modules/onetime/index.js
var Be = /* @__PURE__ */ new WeakMap(), Dr = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, r = 0, o = e.displayName || e.name || "<anonymous>", i = function(...s) {
    if (Be.set(i, ++r), r === 1)
      n = e.apply(this, s), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${o}\` can only be called once`);
    return n;
  };
  return Mt(i, e), Be.set(i, r), i;
};
Dr.callCount = (e) => {
  if (!Be.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Be.get(e);
};
var Mr = Dr;

// node_modules/execa/lib/error.js
d();

// node_modules/human-signals/build/src/main.js
d();
import { constants as Sa } from "os";

// node_modules/human-signals/build/src/realtime.js
d();
var Ur = function() {
  let e = Ut - Lr + 1;
  return Array.from({ length: e }, Ea);
}, Ea = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: Lr + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, Lr = 34, Ut = 64;

// node_modules/human-signals/build/src/signals.js
d();
import { constants as Oa } from "os";

// node_modules/human-signals/build/src/core.js
d();
var qr = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];

// node_modules/human-signals/build/src/signals.js
var Lt = function() {
  let e = Ur();
  return [...qr, ...e].map(va);
}, va = function({
  name: e,
  number: t,
  description: n,
  action: r,
  forced: o = !1,
  standard: i
}) {
  let {
    signals: { [e]: s }
  } = Oa, a = s !== void 0;
  return { name: e, number: a ? s : t, description: n, supported: a, action: r, forced: o, standard: i };
};

// node_modules/human-signals/build/src/main.js
var wa = function() {
  return Lt().reduce(_a, {});
}, _a = function(e, { name: t, number: n, description: r, supported: o, action: i, forced: s, standard: a }) {
  return S(x({}, e), {
    [t]: { name: t, number: n, description: r, supported: o, action: i, forced: s, standard: a }
  });
}, Gr = wa(), Na = function() {
  let e = Lt(), t = 64 + 1, n = Array.from({ length: t }, (r, o) => $a(o, e));
  return Object.assign({}, ...n);
}, $a = function(e, t) {
  let n = Ca(e, t);
  if (n === void 0)
    return {};
  let { name: r, description: o, supported: i, action: s, forced: a, standard: c } = n;
  return {
    [e]: {
      name: r,
      number: e,
      description: o,
      supported: i,
      action: s,
      forced: a,
      standard: c
    }
  };
}, Ca = function(e, t) {
  let n = t.find(({ name: r }) => Sa.signals[r] === e);
  return n !== void 0 ? n : t.find((r) => r.number === e);
}, fu = Na();

// node_modules/execa/lib/error.js
var Ia = ({ timedOut: e, timeout: t, errorCode: n, signal: r, signalDescription: o, exitCode: i, isCanceled: s }) => e ? `timed out after ${t} milliseconds` : s ? "was canceled" : n !== void 0 ? `failed with ${n}` : r !== void 0 ? `was killed with ${r} (${o})` : i !== void 0 ? `failed with exit code ${i}` : "failed", qt = ({
  stdout: e,
  stderr: t,
  all: n,
  error: r,
  signal: o,
  exitCode: i,
  command: s,
  escapedCommand: a,
  timedOut: c,
  isCanceled: u,
  killed: l,
  parsed: { options: { timeout: f } }
}) => {
  i = i === null ? void 0 : i, o = o === null ? void 0 : o;
  let p = o === void 0 ? void 0 : Gr[o].description, h = r && r.code, v = `Command ${Ia({ timedOut: c, timeout: f, errorCode: h, signal: o, signalDescription: p, exitCode: i, isCanceled: u })}: ${s}`, R = Object.prototype.toString.call(r) === "[object Error]", W = R ? `${v}
${r.message}` : v, z = [W, t, e].filter(Boolean).join(`
`);
  return R ? (r.originalMessage = r.message, r.message = z) : r = new Error(z), r.shortMessage = W, r.command = s, r.escapedCommand = a, r.exitCode = i, r.signal = o, r.signalDescription = p, r.stdout = e, r.stderr = t, n !== void 0 && (r.all = n), "bufferedData" in r && delete r.bufferedData, r.failed = !0, r.timedOut = Boolean(c), r.isCanceled = u, r.killed = l && !c, r;
};

// node_modules/execa/lib/stdio.js
d();
var Fe = ["stdin", "stdout", "stderr"], Pa = (e) => Fe.some((t) => e[t] !== void 0), Br = (e) => {
  if (!e)
    return;
  let { stdio: t } = e;
  if (t === void 0)
    return Fe.map((r) => e[r]);
  if (Pa(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Fe.map((r) => `\`${r}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  let n = Math.max(t.length, Fe.length);
  return Array.from({ length: n }, (r, o) => t[o]);
};

// node_modules/execa/lib/kill.js
d();
var Kr = se(zr(), 1);
import Aa from "node:os";
var Ra = 1e3 * 5, Jr = (e, t = "SIGTERM", n = {}) => {
  let r = e(t);
  return ja(e, t, n, r), r;
}, ja = (e, t, n, r) => {
  if (!Ta(t, n, r))
    return;
  let o = Da(n), i = setTimeout(() => {
    e("SIGKILL");
  }, o);
  i.unref && i.unref();
}, Ta = (e, { forceKillAfterTimeout: t }, n) => ka(e) && t !== !1 && n, ka = (e) => e === Aa.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", Da = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return Ra;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, Yr = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, Ma = (e, t, n) => {
  e.kill(t), n(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, Zr = (e, { timeout: t, killSignal: n = "SIGTERM" }, r) => {
  if (t === 0 || t === void 0)
    return r;
  let o, i = new Promise((a, c) => {
    o = setTimeout(() => {
      Ma(e, n, c);
    }, t);
  }), s = r.finally(() => {
    clearTimeout(o);
  });
  return Promise.race([i, s]);
}, Qr = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, eo = async (e, { cleanup: t, detached: n }, r) => {
  if (!t || n)
    return r;
  let o = (0, Kr.default)(() => {
    e.kill();
  });
  return r.finally(() => {
    o();
  });
};

// node_modules/execa/lib/stream.js
d();

// node_modules/is-stream/index.js
d();
function to(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}

// node_modules/execa/lib/stream.js
var Xt = se(oo(), 1), ao = se(so(), 1), co = (e, t) => {
  t === void 0 || e.stdin === void 0 || (to(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, uo = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  let n = (0, ao.default)();
  return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
}, Vt = async (e, t) => {
  if (!!e) {
    e.destroy();
    try {
      return await t;
    } catch (n) {
      return n.bufferedData;
    }
  }
}, Ht = (e, { encoding: t, buffer: n, maxBuffer: r }) => {
  if (!(!e || !n))
    return t ? (0, Xt.default)(e, { encoding: t, maxBuffer: r }) : Xt.default.buffer(e, { maxBuffer: r });
}, lo = async ({ stdout: e, stderr: t, all: n }, { encoding: r, buffer: o, maxBuffer: i }, s) => {
  let a = Ht(e, { encoding: r, buffer: o, maxBuffer: i }), c = Ht(t, { encoding: r, buffer: o, maxBuffer: i }), u = Ht(n, { encoding: r, buffer: o, maxBuffer: i * 2 });
  try {
    return await Promise.all([s, a, c, u]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      Vt(e, a),
      Vt(t, c),
      Vt(n, u)
    ]);
  }
};

// node_modules/execa/lib/promise.js
d();
var Ha = (async () => {
})().constructor.prototype, Xa = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(Ha, e)
]), Wt = (e, t) => {
  for (let [n, r] of Xa) {
    let o = typeof t == "function" ? (...i) => Reflect.apply(r.value, t(), i) : r.value.bind(t);
    Reflect.defineProperty(e, n, S(x({}, r), { value: o }));
  }
  return e;
}, fo = (e) => new Promise((t, n) => {
  e.on("exit", (r, o) => {
    t({ exitCode: r, signal: o });
  }), e.on("error", (r) => {
    n(r);
  }), e.stdin && e.stdin.on("error", (r) => {
    n(r);
  });
});

// node_modules/execa/lib/command.js
d();
var po = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], Wa = /^[\w.-]+$/, za = /"/g, Ka = (e) => typeof e != "string" || Wa.test(e) ? e : `"${e.replace(za, '\\"')}"`, ho = (e, t) => po(e, t).join(" "), mo = (e, t) => po(e, t).map((n) => Ka(n)).join(" ");

// node_modules/execa/index.js
var Za = 1e3 * 1e3 * 100, Qa = ({ env: e, extendEnv: t, preferLocal: n, localDir: r, execPath: o }) => {
  let i = t ? x(x({}, Ke.env), e) : e;
  return n ? kr({ env: i, cwd: r, execPath: o }) : i;
}, ec = (e, t, n = {}) => {
  let r = yo.default._parse(e, t, n);
  return e = r.command, t = r.args, n = r.options, n = x({
    maxBuffer: Za,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: n.cwd || Ke.cwd(),
    execPath: Ke.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0
  }, n), n.env = Qa(n), n.stdio = Br(n), Ke.platform === "win32" && Ya.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: n, parsed: r };
}, zt = (e, t, n) => typeof t != "string" && !Ja.isBuffer(t) ? n === void 0 ? void 0 : "" : e.stripFinalNewline ? Dt(t) : t;
function bo(e, t, n) {
  let r = ec(e, t, n), o = ho(e, t), i = mo(e, t);
  Qr(r.options);
  let s;
  try {
    s = go.spawn(r.file, r.args, r.options);
  } catch (h) {
    let y = new go.ChildProcess(), v = Promise.reject(qt({
      error: h,
      stdout: "",
      stderr: "",
      all: "",
      command: o,
      escapedCommand: i,
      parsed: r,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return Wt(y, v);
  }
  let a = fo(s), c = Zr(s, r.options, a), u = eo(s, r.options, c), l = { isCanceled: !1 };
  s.kill = Jr.bind(null, s.kill.bind(s)), s.cancel = Yr.bind(null, s, l);
  let p = Mr(async () => {
    let [{ error: h, exitCode: y, signal: v, timedOut: R }, W, z, Ye] = await lo(s, r.options, u), ve = zt(r.options, W), Kt = zt(r.options, z), Jt = zt(r.options, Ye);
    if (h || y !== 0 || v !== null) {
      let Yt = qt({
        error: h,
        exitCode: y,
        signal: v,
        stdout: ve,
        stderr: Kt,
        all: Jt,
        command: o,
        escapedCommand: i,
        parsed: r,
        timedOut: R,
        isCanceled: l.isCanceled || (r.options.signal ? r.options.signal.aborted : !1),
        killed: s.killed
      });
      if (!r.options.reject)
        return Yt;
      throw Yt;
    }
    return {
      command: o,
      escapedCommand: i,
      exitCode: 0,
      stdout: ve,
      stderr: Kt,
      all: Jt,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return co(s, r.options.input), s.all = uo(s, r.options), Wt(s, p);
}

// lib/utils.mjs
var xo = rc(process.cwd(), "package.json");
async function Eo() {
  return JSON.parse((await tc(xo)).toString());
}
async function Oo(e) {
  await nc(xo, JSON.stringify(e, void 0, 4));
}
function Q(e, t, n, r = !1) {
  return new Promise((o, i) => {
    let s = bo(e, t);
    r && n.write(`
`), s.stdout.pipe(n), s.then(o).catch(i);
  });
}

// lib/tasks/prettier.mjs
async function vo(e) {
  e.push({
    label: "Adding Prettier config",
    async action() {
      let t = await Eo(), n = t.scripts || {};
      t.prettier = {
        semi: !1,
        tabWidth: 4,
        trailingComma: "es5"
      }, n.prettier = 'prettier --write "**/*".{js,jsx,ts,tsx,mjs,cjs,html,json,css,md}', t.scripts = n, await Oo(t);
    }
  }), e.push({
    label: "Adding Prettier package",
    async action(t) {
      await Q("yarn", ["add", "prettier"], t, !0);
    }
  }), e.push({
    label: "Running Prettier",
    async action(t) {
      await Q("yarn", ["prettier"], t, !0);
    }
  });
}

// lib/tasks/yarn.mjs
d();
async function So(e) {
  e.push({
    label: "Download Yarn",
    async action(t) {
      await Q("yarn", ["set", "version", "berry"], t, !0);
    }
  }), e.push({
    label: "Configure Yarn",
    async action(t) {
      let n = async (r, o) => {
        await Q("yarn", ["config", "set", r, o], t);
      };
      await n("nodeLinker", "node-modules"), await n("initScope", "@rdil"), await n("enableInlineHunks", "true"), await n("enableGlobalCache", "false");
    }
  }), e.push({
    label: "Install packages with Yarn",
    async action(t) {
      await Q("yarn", [], t, !0);
    }
  });
}

// lib/tasks/editorconfig.mjs
d();

// .editorconfig
var wo = `root = true

[*]
end_of_line = lf
insert_final_newline = true

[*.{js,ts,json,yml}]
charset = utf-8
indent_style = space
indent_size = 4
`;

// lib/tasks/editorconfig.mjs
import { writeFile as ic } from "fs/promises";
import { join as sc } from "path";
async function _o(e) {
  e.push({
    label: "Write .editorconfig file",
    async action() {
      await ic(sc(process.cwd(), ".editorconfig"), wo);
    }
  });
}

// lib/index.mjs
var No;
(No = process.setSourceMapsEnabled) == null || No.call(process, !0);
var Je = class extends F.Command {
  skipYarn = F.Option.Boolean("--skip-yarn", !1, {
    description: "Skip migration to and configuration of Yarn Berry."
  });
  skipPrettier = F.Option.Boolean("--skip-prettier", !1, {
    description: "Skip installing and configuring Prettier."
  });
  skipEditorconfig = F.Option.Boolean("--skip-editorconfig", !1, {
    description: "Skip adding a `.editorconfig` file."
  });
  async execute() {
    let t = this.context.stdout;
    t.write(`
rdilifying...
`);
    let n = [];
    this.skipYarn || await So(n), this.skipPrettier || await vo(n), this.skipEditorconfig || await _o(n);
    for (let r of n)
      t.write(`
[${n.indexOf(r) + 1}/${n.length}] ${r.label}`), await r.action(t);
    t.write(`
Done!`);
  }
};
en(Je, "usage", F.Command.Usage({
  category: "Main",
  description: "Add rdil's preferred settings/toolchains to a JS project.",
  details: `
        This command sets up various tools that I enjoy using and am used to.
        Setting them up was becoming a bit of a chore, so I wrote this.

        The following tools/settings can be set up by this script:

          - Yarn Berry
          - Prettier
          - \`.editorconfig\`
        `,
  examples: [
    ["Run with default options", "$0"],
    [
      "Don't run Prettier or `.editorconfig` tasks",
      "$0 --skip-prettier --skip-editorconfig"
    ]
  ]
}));
var [, ac, ...cc] = process.argv, $o = new F.Cli({
  binaryLabel: "rdilify",
  binaryName: `node ${ac}`,
  binaryVersion: "1.0.0"
});
$o.register(Je);
$o.runExit(cc);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliL3JlcXVpcmVMb2FkZXIubWpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9lcnJvcnMuanMiLCAibm9kZV9tb2R1bGVzL2NsaXBhbmlvbi9saWIvZm9ybWF0LmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL29wdGlvbnMvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL3R5cGFuaW9uL2xpYi9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9Db21tYW5kLmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2NvcmUuanMiLCAibm9kZV9tb2R1bGVzL2NsaXBhbmlvbi9saWIvcGxhdGZvcm0vbm9kZS5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9IZWxwQ29tbWFuZC5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9DbGkuanMiLCAibm9kZV9tb2R1bGVzL2NsaXBhbmlvbi9saWIvYWR2YW5jZWQvYnVpbHRpbnMvZGVmaW5pdGlvbnMuanMiLCAibm9kZV9tb2R1bGVzL2NsaXBhbmlvbi9saWIvYWR2YW5jZWQvYnVpbHRpbnMvaGVscC5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9idWlsdGlucy92ZXJzaW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL2J1aWx0aW5zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL29wdGlvbnMvQXJyYXkuanMiLCAibm9kZV9tb2R1bGVzL2NsaXBhbmlvbi9saWIvYWR2YW5jZWQvb3B0aW9ucy9Cb29sZWFuLmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL29wdGlvbnMvQ291bnRlci5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9vcHRpb25zL1Byb3h5LmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL29wdGlvbnMvUmVzdC5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9vcHRpb25zL1N0cmluZy5qcyIsICJub2RlX21vZHVsZXMvY2xpcGFuaW9uL2xpYi9hZHZhbmNlZC9vcHRpb25zL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYW5pb24vbGliL2FkdmFuY2VkL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9pc2V4ZS93aW5kb3dzLmpzIiwgIm5vZGVfbW9kdWxlcy9pc2V4ZS9tb2RlLmpzIiwgIm5vZGVfbW9kdWxlcy9pc2V4ZS9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvd2hpY2gvd2hpY2guanMiLCAibm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvdXRpbC9yZXNvbHZlQ29tbWFuZC5qcyIsICJub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3V0aWwvZXNjYXBlLmpzIiwgIm5vZGVfbW9kdWxlcy9zaGViYW5nLXJlZ2V4L2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zaGViYW5nLWNvbW1hbmQvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi91dGlsL3JlYWRTaGViYW5nLmpzIiwgIm5vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvcGFyc2UuanMiLCAibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi9lbm9lbnQuanMiLCAibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zaWduYWwtZXhpdC9zaWduYWxzLmpzIiwgIm5vZGVfbW9kdWxlcy9zaWduYWwtZXhpdC9pbmRleC5qcyIsICJub2RlX21vZHVsZXMvZ2V0LXN0cmVhbS9idWZmZXItc3RyZWFtLmpzIiwgIm5vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9tZXJnZS1zdHJlYW0vaW5kZXguanMiLCAibGliL2luZGV4Lm1qcyIsICJsaWIvdGFza3MvcHJldHRpZXIubWpzIiwgImxpYi91dGlscy5tanMiLCAibm9kZV9tb2R1bGVzL2V4ZWNhL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9zdHJpcC1maW5hbC1uZXdsaW5lL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9ucG0tcnVuLXBhdGgvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL25wbS1ydW4tcGF0aC9ub2RlX21vZHVsZXMvcGF0aC1rZXkvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL29uZXRpbWUvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL21pbWljLWZuL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9leGVjYS9saWIvZXJyb3IuanMiLCAibm9kZV9tb2R1bGVzL2h1bWFuLXNpZ25hbHMvc3JjL21haW4uanMiLCAibm9kZV9tb2R1bGVzL2h1bWFuLXNpZ25hbHMvc3JjL3JlYWx0aW1lLmpzIiwgIm5vZGVfbW9kdWxlcy9odW1hbi1zaWduYWxzL3NyYy9zaWduYWxzLmpzIiwgIm5vZGVfbW9kdWxlcy9odW1hbi1zaWduYWxzL3NyYy9jb3JlLmpzIiwgIm5vZGVfbW9kdWxlcy9leGVjYS9saWIvc3RkaW8uanMiLCAibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9raWxsLmpzIiwgIm5vZGVfbW9kdWxlcy9leGVjYS9saWIvc3RyZWFtLmpzIiwgIm5vZGVfbW9kdWxlcy9pcy1zdHJlYW0vaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9wcm9taXNlLmpzIiwgIm5vZGVfbW9kdWxlcy9leGVjYS9saWIvY29tbWFuZC5qcyIsICJsaWIvdGFza3MveWFybi5tanMiLCAibGliL3Rhc2tzL2VkaXRvcmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tIFwibW9kdWxlXCJcblxuLy8gVGhpcyB3aG9sZSBmaWxlIGlzIGEgaGFjayB0byBtYWtlIGl0IHNvIHRoYXQgd2UgY2FuIHVzZSByZXF1aXJlIGluIHRoZSBlc2J1aWxkIGJ1bmRsZVxuLy8gd2l0aG91dCBicmVha2luZyBzdHVmZlxuXG5nbG9iYWxUaGlzLnJlcXVpcmUgPSBnbG9iYWxUaGlzLnJlcXVpcmUgfHwgY3JlYXRlUmVxdWlyZShpbXBvcnQubWV0YS51cmwpXG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5jb25zdCBOT0RFX0lOSVRJQUwgPSAwO1xuY29uc3QgTk9ERV9TVUNDRVNTID0gMTtcbmNvbnN0IE5PREVfRVJST1JFRCA9IDI7XG5jb25zdCBTVEFSVF9PRl9JTlBVVCA9IGBcXHUwMDAxYDtcbmNvbnN0IEVORF9PRl9JTlBVVCA9IGBcXHUwMDAwYDtcbmNvbnN0IEhFTFBfQ09NTUFORF9JTkRFWCA9IC0xO1xuY29uc3QgSEVMUF9SRUdFWCA9IC9eKC1ofC0taGVscCkoPzo9KFswLTldKykpPyQvO1xuY29uc3QgT1BUSU9OX1JFR0VYID0gL14oLS1bYS16XSsoPzotW2Etel0rKSp8LVthLXpBLVpdKykkLztcbmNvbnN0IEJBVENIX1JFR0VYID0gL14tW2EtekEtWl17Mix9JC87XG5jb25zdCBCSU5ESU5HX1JFR0VYID0gL14oW149XSspPShbXFxzXFxTXSopJC87XG5jb25zdCBERUJVRyA9IHByb2Nlc3MuZW52LkRFQlVHX0NMSSA9PT0gYDFgO1xuXG5leHBvcnRzLkJBVENIX1JFR0VYID0gQkFUQ0hfUkVHRVg7XG5leHBvcnRzLkJJTkRJTkdfUkVHRVggPSBCSU5ESU5HX1JFR0VYO1xuZXhwb3J0cy5ERUJVRyA9IERFQlVHO1xuZXhwb3J0cy5FTkRfT0ZfSU5QVVQgPSBFTkRfT0ZfSU5QVVQ7XG5leHBvcnRzLkhFTFBfQ09NTUFORF9JTkRFWCA9IEhFTFBfQ09NTUFORF9JTkRFWDtcbmV4cG9ydHMuSEVMUF9SRUdFWCA9IEhFTFBfUkVHRVg7XG5leHBvcnRzLk5PREVfRVJST1JFRCA9IE5PREVfRVJST1JFRDtcbmV4cG9ydHMuTk9ERV9JTklUSUFMID0gTk9ERV9JTklUSUFMO1xuZXhwb3J0cy5OT0RFX1NVQ0NFU1MgPSBOT0RFX1NVQ0NFU1M7XG5leHBvcnRzLk9QVElPTl9SRUdFWCA9IE9QVElPTl9SRUdFWDtcbmV4cG9ydHMuU1RBUlRfT0ZfSU5QVVQgPSBTVEFSVF9PRl9JTlBVVDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cy5qcycpO1xuXG4vKipcbiAqIEEgZ2VuZXJpYyB1c2FnZSBlcnJvciB3aXRoIHRoZSBuYW1lIGBVc2FnZUVycm9yYC5cbiAqXG4gKiBJdCBzaG91bGQgYmUgdXNlZCBvdmVyIGBFcnJvcmAgb25seSB3aGVuIGl0J3MgdGhlIHVzZXIncyBmYXVsdC5cbiAqL1xuY2xhc3MgVXNhZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNsaXBhbmlvbiA9IHsgdHlwZTogYHVzYWdlYCB9O1xuICAgICAgICB0aGlzLm5hbWUgPSBgVXNhZ2VFcnJvcmA7XG4gICAgfVxufVxuY2xhc3MgVW5rbm93blN5bnRheEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBjYW5kaWRhdGVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5jYW5kaWRhdGVzID0gY2FuZGlkYXRlcztcbiAgICAgICAgdGhpcy5jbGlwYW5pb24gPSB7IHR5cGU6IGBub25lYCB9O1xuICAgICAgICB0aGlzLm5hbWUgPSBgVW5rbm93blN5bnRheEVycm9yYDtcbiAgICAgICAgaWYgKHRoaXMuY2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBDb21tYW5kIG5vdCBmb3VuZCwgYnV0IHdlJ3JlIG5vdCBzdXJlIHdoYXQncyB0aGUgYWx0ZXJuYXRpdmUuYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbmRpZGF0ZXMuZXZlcnkoY2FuZGlkYXRlID0+IGNhbmRpZGF0ZS5yZWFzb24gIT09IG51bGwgJiYgY2FuZGlkYXRlLnJlYXNvbiA9PT0gY2FuZGlkYXRlc1swXS5yZWFzb24pKSB7XG4gICAgICAgICAgICBjb25zdCBbeyByZWFzb24gfV0gPSB0aGlzLmNhbmRpZGF0ZXM7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBgJHtyZWFzb259XFxuXFxuJHt0aGlzLmNhbmRpZGF0ZXMubWFwKCh7IHVzYWdlIH0pID0+IGAkICR7dXNhZ2V9YCkuam9pbihgXFxuYCl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbmRpZGF0ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBbeyB1c2FnZSB9XSA9IHRoaXMuY2FuZGlkYXRlcztcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBDb21tYW5kIG5vdCBmb3VuZDsgZGlkIHlvdSBtZWFuOlxcblxcbiQgJHt1c2FnZX1cXG4ke3doaWxlUnVubmluZyhpbnB1dCl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBDb21tYW5kIG5vdCBmb3VuZDsgZGlkIHlvdSBtZWFuIG9uZSBvZjpcXG5cXG4ke3RoaXMuY2FuZGlkYXRlcy5tYXAoKHsgdXNhZ2UgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7YCR7aW5kZXh9LmAucGFkU3RhcnQoNCl9ICR7dXNhZ2V9YDtcbiAgICAgICAgICAgIH0pLmpvaW4oYFxcbmApfVxcblxcbiR7d2hpbGVSdW5uaW5nKGlucHV0KX1gO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgQW1iaWd1b3VzU3ludGF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoaW5wdXQsIHVzYWdlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMudXNhZ2VzID0gdXNhZ2VzO1xuICAgICAgICB0aGlzLmNsaXBhbmlvbiA9IHsgdHlwZTogYG5vbmVgIH07XG4gICAgICAgIHRoaXMubmFtZSA9IGBBbWJpZ3VvdXNTeW50YXhFcnJvcmA7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGBDYW5ub3QgZmluZCB3aGljaCB0byBwaWNrIGFtb25nc3QgdGhlIGZvbGxvd2luZyBhbHRlcm5hdGl2ZXM6XFxuXFxuJHt0aGlzLnVzYWdlcy5tYXAoKHVzYWdlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke2Ake2luZGV4fS5gLnBhZFN0YXJ0KDQpfSAke3VzYWdlfWA7XG4gICAgICAgIH0pLmpvaW4oYFxcbmApfVxcblxcbiR7d2hpbGVSdW5uaW5nKGlucHV0KX1gO1xuICAgIH1cbn1cbmNvbnN0IHdoaWxlUnVubmluZyA9IChpbnB1dCkgPT4gYFdoaWxlIHJ1bm5pbmcgJHtpbnB1dC5maWx0ZXIodG9rZW4gPT4ge1xuICAgIHJldHVybiB0b2tlbiAhPT0gY29uc3RhbnRzLkVORF9PRl9JTlBVVDtcbn0pLm1hcCh0b2tlbiA9PiB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRva2VuKTtcbiAgICBpZiAodG9rZW4ubWF0Y2goL1xccy8pIHx8IHRva2VuLmxlbmd0aCA9PT0gMCB8fCBqc29uICE9PSBgXCIke3Rva2VufVwiYCkge1xuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG59KS5qb2luKGAgYCl9YDtcblxuZXhwb3J0cy5BbWJpZ3VvdXNTeW50YXhFcnJvciA9IEFtYmlndW91c1N5bnRheEVycm9yO1xuZXhwb3J0cy5Vbmtub3duU3ludGF4RXJyb3IgPSBVbmtub3duU3ludGF4RXJyb3I7XG5leHBvcnRzLlVzYWdlRXJyb3IgPSBVc2FnZUVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuY29uc3QgTUFYX0xJTkVfTEVOR1RIID0gODA7XG5jb25zdCByaWNoTGluZSA9IEFycmF5KE1BWF9MSU5FX0xFTkdUSCkuZmlsbChgXHUyNTAxYCk7XG5mb3IgKGxldCB0ID0gMDsgdCA8PSAyNDsgKyt0KVxuICAgIHJpY2hMaW5lW3JpY2hMaW5lLmxlbmd0aCAtIHRdID0gYFxceDFiWzM4OzU7JHsyMzIgKyB0fW1cdTI1MDFgO1xuY29uc3QgcmljaEZvcm1hdCA9IHtcbiAgICBoZWFkZXI6IHN0ciA9PiBgXFx4MWJbMW1cdTI1MDFcdTI1MDFcdTI1MDEgJHtzdHJ9JHtzdHIubGVuZ3RoIDwgTUFYX0xJTkVfTEVOR1RIIC0gNSA/IGAgJHtyaWNoTGluZS5zbGljZShzdHIubGVuZ3RoICsgNSkuam9pbihgYCl9YCA6IGA6YH1cXHgxYlswbWAsXG4gICAgYm9sZDogc3RyID0+IGBcXHgxYlsxbSR7c3RyfVxceDFiWzIybWAsXG4gICAgZXJyb3I6IHN0ciA9PiBgXFx4MWJbMzFtXFx4MWJbMW0ke3N0cn1cXHgxYlsyMm1cXHgxYlszOW1gLFxuICAgIGNvZGU6IHN0ciA9PiBgXFx4MWJbMzZtJHtzdHJ9XFx4MWJbMzltYCxcbn07XG5jb25zdCB0ZXh0Rm9ybWF0ID0ge1xuICAgIGhlYWRlcjogc3RyID0+IHN0cixcbiAgICBib2xkOiBzdHIgPT4gc3RyLFxuICAgIGVycm9yOiBzdHIgPT4gc3RyLFxuICAgIGNvZGU6IHN0ciA9PiBzdHIsXG59O1xuZnVuY3Rpb24gZGVkZW50KHRleHQpIHtcbiAgICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoYFxcbmApO1xuICAgIGNvbnN0IG5vbkVtcHR5TGluZXMgPSBsaW5lcy5maWx0ZXIobGluZSA9PiBsaW5lLm1hdGNoKC9cXFMvKSk7XG4gICAgY29uc3QgaW5kZW50ID0gbm9uRW1wdHlMaW5lcy5sZW5ndGggPiAwID8gbm9uRW1wdHlMaW5lcy5yZWR1Y2UoKG1pbkxlbmd0aCwgbGluZSkgPT4gTWF0aC5taW4obWluTGVuZ3RoLCBsaW5lLmxlbmd0aCAtIGxpbmUudHJpbVN0YXJ0KCkubGVuZ3RoKSwgTnVtYmVyLk1BWF9WQUxVRSkgOiAwO1xuICAgIHJldHVybiBsaW5lc1xuICAgICAgICAubWFwKGxpbmUgPT4gbGluZS5zbGljZShpbmRlbnQpLnRyaW1SaWdodCgpKVxuICAgICAgICAuam9pbihgXFxuYCk7XG59XG4vKipcbiAqIEZvcm1hdHMgbWFya2Rvd24gdGV4dCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIGNvbnNvbGUuIE5vdCBhbGwgbWFya2Rvd24gZmVhdHVyZXMgYXJlIHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0gdGV4dCBUaGUgbWFya2Rvd24gdGV4dCB0byBmb3JtYXQuXG4gKiBAcGFyYW0gb3B0cy5mb3JtYXQgVGhlIGZvcm1hdCB0byB1c2UuXG4gKiBAcGFyYW0gb3B0cy5wYXJhZ3JhcGhzIFdoZXRoZXIgdG8gY3V0IHRoZSB0ZXh0IGludG8gcGFyYWdyYXBocyBvZiA4MCBjaGFyYWN0ZXJzIGF0IG1vc3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdE1hcmtkb3duaXNoKHRleHQsIHsgZm9ybWF0LCBwYXJhZ3JhcGhzIH0pIHtcbiAgICAvLyBFbmZvcmNlIFxcbiBhcyBuZXdsaW5lIGNoYXJhY3RlclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcclxcbj8vZywgYFxcbmApO1xuICAgIC8vIFJlbW92ZSB0aGUgaW5kZW50YXRpb24sIHNpbmNlIGl0IGdvdCBtZXNzZWQgdXAgd2l0aCB0aGUgSlMgaW5kZW50YXRpb25cbiAgICB0ZXh0ID0gZGVkZW50KHRleHQpO1xuICAgIC8vIFJlbW92ZSBzdXJyb3VuZGluZyBuZXdsaW5lcywgc2luY2UgdGhleSBnb3QgYWRkZWQgZm9yIEpTIGZvcm1hdHRpbmdcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxuK3xcXG4rJC9nLCBgYCk7XG4gICAgLy8gTGlzdCBpdGVtcyBhbHdheXMgZW5kIHdpdGggYXQgbGVhc3QgdHdvIG5ld2xpbmVzIChpbiBvcmRlciB0byBub3QgYmUgY29sbGFwc2VkKVxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL14oXFxzKiktKFteXFxuXSo/KVxcbisvZ20sIGAkMS0kMlxcblxcbmApO1xuICAgIC8vIFNpbmdsZSBuZXdsaW5lcyBhcmUgcmVtb3ZlZDsgbGFyZ2VyIHRoYW4gdGhhdCBhcmUgY29sbGFwc2VkIGludG8gb25lXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuKFxcbik/XFxuKi9nLCAoJDAsICQxKSA9PiAkMSA/ICQxIDogYCBgKTtcbiAgICBpZiAocGFyYWdyYXBocykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zcGxpdCgvXFxuLykubWFwKHBhcmFncmFwaCA9PiB7XG4gICAgICAgICAgICAvLyBEb2VzIHRoZSBwYXJhZ3JhcGggc3RhcnRzIHdpdGggYSBsaXN0P1xuICAgICAgICAgICAgY29uc3QgYnVsbGV0TWF0Y2ggPSBwYXJhZ3JhcGgubWF0Y2goL15cXHMqWyotXVtcXHQgXSsoLiopLyk7XG4gICAgICAgICAgICBpZiAoIWJ1bGxldE1hdGNoKVxuICAgICAgICAgICAgICAgIC8vIE5vLCBjdXQgdGhlIHBhcmFncmFwaHMgaW50byBzZWdtZW50cyBvZiA4MCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFncmFwaC5tYXRjaCgvKC57MSw4MH0pKD86IHwkKS9nKS5qb2luKGBcXG5gKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGVudCA9IHBhcmFncmFwaC5sZW5ndGggLSBwYXJhZ3JhcGgudHJpbVN0YXJ0KCkubGVuZ3RoO1xuICAgICAgICAgICAgLy8gWWVzLCBjdXQgdGhlIHBhcmFncmFwaHMgaW50byBzZWdtZW50cyBvZiAoNzggLSBpbmRlbnQpIGNoYXJhY3RlcnMgKHRvIGFjY291bnQgZm9yIHRoZSBwcmVmaXgpXG4gICAgICAgICAgICByZXR1cm4gYnVsbGV0TWF0Y2hbMV0ubWF0Y2gobmV3IFJlZ0V4cChgKC57MSwkezc4IC0gaW5kZW50fX0pKD86IHwkKWAsIGBnYCkpLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCBgLnJlcGVhdChpbmRlbnQpICsgKGluZGV4ID09PSAwID8gYC0gYCA6IGAgIGApICsgbGluZTtcbiAgICAgICAgICAgIH0pLmpvaW4oYFxcbmApO1xuICAgICAgICB9KS5qb2luKGBcXG5cXG5gKTtcbiAgICB9XG4gICAgLy8gSGlnaGxpZ2h0IHRoZSBjb2RlIHNlZ21lbnRzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKGArKSgoPzoufFtcXG5dKSo/KVxcMS9nLCAoJDAsICQxLCAkMikgPT4ge1xuICAgICAgICByZXR1cm4gZm9ybWF0LmNvZGUoJDEgKyAkMiArICQxKTtcbiAgICB9KTtcbiAgICAvLyBIaWdobGlnaHQgdGhlIGJvbGQgc2VnbWVudHNcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFwqXFwqKSgoPzoufFtcXG5dKSo/KVxcMS9nLCAoJDAsICQxLCAkMikgPT4ge1xuICAgICAgICByZXR1cm4gZm9ybWF0LmJvbGQoJDEgKyAkMiArICQxKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGV4dCA/IGAke3RleHR9XFxuYCA6IGBgO1xufVxuXG5leHBvcnRzLmZvcm1hdE1hcmtkb3duaXNoID0gZm9ybWF0TWFya2Rvd25pc2g7XG5leHBvcnRzLnJpY2hGb3JtYXQgPSByaWNoRm9ybWF0O1xuZXhwb3J0cy50ZXh0Rm9ybWF0ID0gdGV4dEZvcm1hdDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuLi8uLi9lcnJvcnMuanMnKTtcblxuY29uc3QgaXNPcHRpb25TeW1ib2wgPSBTeW1ib2woYGNsaXBhbmlvbi9pc09wdGlvbmApO1xuZnVuY3Rpb24gbWFrZUNvbW1hbmRPcHRpb24oc3BlYykge1xuICAgIC8vIFdlIGxpZSEgQnV0IGl0J3MgZm9yIHRoZSBnb29kIGNhdXNlOiB0aGUgY2xpIGVuZ2luZSB3aWxsIHR1cm4gdGhlIHNwZWNzIGludG8gcHJvcGVyIHZhbHVlcyBhZnRlciBpbnN0YW50aWF0aW9uLlxuICAgIHJldHVybiB7IC4uLnNwZWMsIFtpc09wdGlvblN5bWJvbF06IHRydWUgfTtcbn1cbmZ1bmN0aW9uIHJlcm91dGVBcmd1bWVudHMoYSwgYikge1xuICAgIGlmICh0eXBlb2YgYSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgIHJldHVybiBbYSwgYl07XG4gICAgaWYgKHR5cGVvZiBhID09PSBgb2JqZWN0YCAmJiBhICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCBhXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBbYSwgYl07XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYW5WYWxpZGF0aW9uRXJyb3IobWVzc2FnZSwgeyBtZXJnZU5hbWUgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBjb25zdCBtYXRjaCA9IG1lc3NhZ2UubWF0Y2goL14oW146XSspOiAoLiopJC9tKTtcbiAgICBpZiAoIW1hdGNoKVxuICAgICAgICByZXR1cm4gYHZhbGlkYXRpb24gZmFpbGVkYDtcbiAgICBsZXQgWywgcGF0aCwgbGluZV0gPSBtYXRjaDtcbiAgICBpZiAobWVyZ2VOYW1lKVxuICAgICAgICBsaW5lID0gbGluZVswXS50b0xvd2VyQ2FzZSgpICsgbGluZS5zbGljZSgxKTtcbiAgICBsaW5lID0gcGF0aCAhPT0gYC5gIHx8ICFtZXJnZU5hbWVcbiAgICAgICAgPyBgJHtwYXRoLnJlcGxhY2UoL15cXC4oXFxbfCQpLywgYCQxYCl9OiAke2xpbmV9YFxuICAgICAgICA6IGA6ICR7bGluZX1gO1xuICAgIHJldHVybiBsaW5lO1xufVxuZnVuY3Rpb24gZm9ybWF0RXJyb3IobWVzc2FnZSwgZXJyb3JzJDEpIHtcbiAgICBpZiAoZXJyb3JzJDEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgZXJyb3JzLlVzYWdlRXJyb3IoYCR7bWVzc2FnZX0ke2NsZWFuVmFsaWRhdGlvbkVycm9yKGVycm9ycyQxWzBdLCB7IG1lcmdlTmFtZTogdHJ1ZSB9KX1gKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgZXJyb3JzLlVzYWdlRXJyb3IoYCR7bWVzc2FnZX06XFxuJHtlcnJvcnMkMS5tYXAoZXJyb3IgPT4gYFxcbi0gJHtjbGVhblZhbGlkYXRpb25FcnJvcihlcnJvcil9YCkuam9pbihgYCl9YCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwbHlWYWxpZGF0b3IobmFtZSwgdmFsdWUsIHZhbGlkYXRvcikge1xuICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgIGNvbnN0IGNvZXJjaW9ucyA9IFtdO1xuICAgIGNvbnN0IGNvZXJjaW9uID0gKHYpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZyA9IHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICAgIHJldHVybiBjb2VyY2lvbi5iaW5kKG51bGwsIG9yaWcpO1xuICAgIH07XG4gICAgY29uc3QgY2hlY2sgPSB2YWxpZGF0b3IodmFsdWUsIHsgZXJyb3JzLCBjb2VyY2lvbnMsIGNvZXJjaW9uIH0pO1xuICAgIGlmICghY2hlY2spXG4gICAgICAgIHRocm93IGZvcm1hdEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciAke25hbWV9YCwgZXJyb3JzKTtcbiAgICBmb3IgKGNvbnN0IFssIG9wXSBvZiBjb2VyY2lvbnMpXG4gICAgICAgIG9wKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnRzLmFwcGx5VmFsaWRhdG9yID0gYXBwbHlWYWxpZGF0b3I7XG5leHBvcnRzLmNsZWFuVmFsaWRhdGlvbkVycm9yID0gY2xlYW5WYWxpZGF0aW9uRXJyb3I7XG5leHBvcnRzLmZvcm1hdEVycm9yID0gZm9ybWF0RXJyb3I7XG5leHBvcnRzLmlzT3B0aW9uU3ltYm9sID0gaXNPcHRpb25TeW1ib2w7XG5leHBvcnRzLm1ha2VDb21tYW5kT3B0aW9uID0gbWFrZUNvbW1hbmRPcHRpb247XG5leHBvcnRzLnJlcm91dGVBcmd1bWVudHMgPSByZXJvdXRlQXJndW1lbnRzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuY29uc3Qgc2ltcGxlS2V5UmVnRXhwID0gL15bYS16QS1aX11bYS16QS1aMC05X10qJC87XG5mdW5jdGlvbiBnZXRQcmludGFibGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBgbnVsbGA7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYDtcbiAgICBpZiAodmFsdWUgPT09IGBgKVxuICAgICAgICByZXR1cm4gYGFuIGVtcHR5IHN0cmluZ2A7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCcpXG4gICAgICAgIHJldHVybiBgPCR7dmFsdWUudG9TdHJpbmcoKX0+YDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHJldHVybiBgYW4gYXJyYXlgO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRQcmludGFibGVBcnJheSh2YWx1ZSwgY29uanVuY3Rpb24pIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gYG5vdGhpbmdgO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBnZXRQcmludGFibGUodmFsdWVbMF0pO1xuICAgIGNvbnN0IHJlc3QgPSB2YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgY29uc3QgdHJhaWxpbmcgPSB2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSB2YWx1ZS5sZW5ndGggPiAyXG4gICAgICAgID8gYCwgJHtjb25qdW5jdGlvbn0gYFxuICAgICAgICA6IGAgJHtjb25qdW5jdGlvbn0gYDtcbiAgICByZXR1cm4gYCR7cmVzdC5tYXAodmFsdWUgPT4gZ2V0UHJpbnRhYmxlKHZhbHVlKSkuam9pbihgLCBgKX0ke3NlcGFyYXRvcn0ke2dldFByaW50YWJsZSh0cmFpbGluZyl9YDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVLZXkoc3RhdGUsIGtleSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSBgbnVtYmVyYCkge1xuICAgICAgICByZXR1cm4gYCR7KF9hID0gc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYH1bJHtrZXl9XWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNpbXBsZUtleVJlZ0V4cC50ZXN0KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGAkeyhfYiA9IHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBgYH0uJHtrZXl9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHsoX2MgPSBzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUucCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogYC5gfVske0pTT04uc3RyaW5naWZ5KGtleSl9XWA7XG4gICAgfVxufVxuZnVuY3Rpb24gcGx1cmFsKG4sIHNpbmd1bGFyLCBwbHVyYWwpIHtcbiAgICByZXR1cm4gbiA9PT0gMSA/IHNpbmd1bGFyIDogcGx1cmFsO1xufVxuXG5jb25zdCBjb2xvclN0cmluZ1JlZ0V4cCA9IC9eI1swLTlhLWZdezZ9JC9pO1xuY29uc3QgY29sb3JTdHJpbmdBbHBoYVJlZ0V4cCA9IC9eI1swLTlhLWZdezZ9KFswLTlhLWZdezJ9KT8kL2k7XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc1MjE3Lzg4MDcwM1xuY29uc3QgYmFzZTY0UmVnRXhwID0gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvO1xuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE0MTY2MTk0Lzg4MDcwM1xuY29uc3QgdXVpZDRSZWdFeHAgPSAvXlthLWYwLTldezh9LVthLWYwLTldezR9LTRbYS1mMC05XXszfS1bODlhQWJCXVthLWYwLTldezN9LVthLWYwLTldezEyfSQvaTtcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODAyMjkwMS84ODA3MDMgKyBodHRwczovL3d3dy5kZWJ1Z2dleC5jb20vci9ibDhKMzV3TUtrNDhhN3VfXG5jb25zdCBpc284NjAxUmVnRXhwID0gL14oPzpbMS05XVxcZHszfSgtPykoPzooPzowWzEtOV18MVswLTJdKVxcMSg/OjBbMS05XXwxXFxkfDJbMC04XSl8KD86MFsxMy05XXwxWzAtMl0pXFwxKD86Mjl8MzApfCg/OjBbMTM1NzhdfDFbMDJdKSg/OlxcMSkzMXwwMFsxLTldfDBbMS05XVxcZHxbMTJdXFxkezJ9fDMoPzpbMC01XVxcZHw2WzAtNV0pKXwoPzpbMS05XVxcZCg/OjBbNDhdfFsyNDY4XVswNDhdfFsxMzU3OV1bMjZdKXwoPzpbMjQ2OF1bMDQ4XXxbMTM1NzldWzI2XSkwMCkoPzooLT8pMDIoPzpcXDIpMjl8LT8zNjYpKVQoPzpbMDFdXFxkfDJbMC0zXSkoOj8pWzAtNV1cXGQoPzpcXDNbMC01XVxcZCk/KD86WnxbKy1dWzAxXVxcZCg/OlxcM1swLTVdXFxkKT8pJC87XG5cbmZ1bmN0aW9uIHB1c2hFcnJvcih7IGVycm9ycywgcCB9ID0ge30sIG1lc3NhZ2UpIHtcbiAgICBlcnJvcnMgPT09IG51bGwgfHwgZXJyb3JzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvcnMucHVzaChgJHtwICE9PSBudWxsICYmIHAgIT09IHZvaWQgMCA/IHAgOiBgLmB9OiAke21lc3NhZ2V9YCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gbWFrZVNldHRlcih0YXJnZXQsIGtleSkge1xuICAgIHJldHVybiAodikgPT4ge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHY7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VDb2VyY2lvbkZuKHRhcmdldCwga2V5KSB7XG4gICAgcmV0dXJuICh2KSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGFyZ2V0W2tleV07XG4gICAgICAgIHRhcmdldFtrZXldID0gdjtcbiAgICAgICAgcmV0dXJuIG1ha2VDb2VyY2lvbkZuKHRhcmdldCwga2V5KS5iaW5kKG51bGwsIHByZXZpb3VzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbWFrZUxhenlDb2VyY2lvbkZuKGZuLCBvcmlnLCBnZW5lcmF0b3IpIHtcbiAgICBjb25zdCBjb21taXQgPSAoKSA9PiB7XG4gICAgICAgIGZuKGdlbmVyYXRvcigpKTtcbiAgICAgICAgcmV0dXJuIHJldmVydDtcbiAgICB9O1xuICAgIGNvbnN0IHJldmVydCA9ICgpID0+IHtcbiAgICAgICAgZm4ob3JpZyk7XG4gICAgICAgIHJldHVybiBjb21taXQ7XG4gICAgfTtcbiAgICByZXR1cm4gY29tbWl0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGFsd2F5cyByZXR1cm5zIHRydWUgYW5kIG5ldmVyIHJlZmluZXMgdGhlIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGlzVW5rbm93bigpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNMaXRlcmFsKGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCAke2dldFByaW50YWJsZShleHBlY3RlZCl9IChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB0ZXN0ZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBSZWZpbmVzIHRoZSB0eXBlIHRvIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiBpc1N0cmluZygpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IGBzdHJpbmdgKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhIHN0cmluZyAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGlzRW51bShlbnVtU3BlYykge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkuaXNBcnJheShlbnVtU3BlYykgPyBlbnVtU3BlYyA6IE9iamVjdC52YWx1ZXMoZW51bVNwZWMpO1xuICAgIGNvbnN0IGlzQWxwaGFOdW0gPSB2YWx1ZXNBcnJheS5ldmVyeShpdGVtID0+IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicpO1xuICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBTZXQodmFsdWVzQXJyYXkpO1xuICAgIGlmICh2YWx1ZXMuc2l6ZSA9PT0gMSlcbiAgICAgICAgcmV0dXJuIGlzTGl0ZXJhbChbLi4udmFsdWVzXVswXSk7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQWxwaGFOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIG9uZSBvZiAke2dldFByaW50YWJsZUFycmF5KHZhbHVlc0FycmF5LCBgb3JgKX0gKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgdmFsaWQgZW51bWVyYXRpb24gdmFsdWUgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuY29uc3QgQk9PTEVBTl9DT0VSQ0lPTlMgPSBuZXcgTWFwKFtcbiAgICBbYHRydWVgLCB0cnVlXSxcbiAgICBbYFRydWVgLCB0cnVlXSxcbiAgICBbYDFgLCB0cnVlXSxcbiAgICBbMSwgdHJ1ZV0sXG4gICAgW2BmYWxzZWAsIGZhbHNlXSxcbiAgICBbYEZhbHNlYCwgZmFsc2VdLFxuICAgIFtgMGAsIGZhbHNlXSxcbiAgICBbMCwgZmFsc2VdLFxuXSk7XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhXG4gKiBib29sZWFuLiBSZWZpbmVzIHRoZSB0eXBlIHRvIGBib29sZWFuYC5cbiAqXG4gKiBTdXBwb3J0cyBjb2VyY2lvbjpcbiAqIC0gJ3RydWUnIC8gJ1RydWUnIC8gJzEnIC8gMSB3aWxsIHR1cm4gdG8gYHRydWVgXG4gKiAtICdmYWxzZScgLyAnRmFsc2UnIC8gJzAnIC8gMCB3aWxsIHR1cm4gdG8gYGZhbHNlYFxuICovXG5mdW5jdGlvbiBpc0Jvb2xlYW4oKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBgYm9vbGVhbmApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29lcmNpb24gPSBCT09MRUFOX0NPRVJDSU9OUy5nZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvZXJjaW9uICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYSA9IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYCwgc3RhdGUuY29lcmNpb24uYmluZChudWxsLCBjb2VyY2lvbildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhIGJvb2xlYW4gKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhXG4gKiBudW1iZXIgKGluY2x1ZGluZyBmbG9hdGluZyBudW1iZXJzOyB1c2UgYGNhc2NhZGVgIGFuZCBgaXNJbnRlZ2VyYCB0b1xuICogcmVzdHJpY3QgdGhlIHJhbmdlIGZ1cnRoZXIpLiBSZWZpbmVzIHRoZSB0eXBlIHRvIGBudW1iZXJgLlxuICpcbiAqIFN1cHBvcnRzIGNvZXJjaW9uLlxuICovXG5mdW5jdGlvbiBpc051bWJlcigpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IGBudW1iZXJgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2VyY2lvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYHN0cmluZ2ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF9iKSB7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNoZWNrIGFnYWluc3QgSlNPTi5zdHJpbmdpZnkgdGhhdCB0aGUgb3V0cHV0IGlzIHRoZSBzYW1lIHRvIGVuc3VyZSB0aGF0IHRoZSBudW1iZXIgY2FuIGJlIHNhZmVseSByZXByZXNlbnRlZCBpbiBKU1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09IGBudW1iZXJgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZXJjaW9uID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFJlY2VpdmVkIGEgbnVtYmVyIHRoYXQgY2FuJ3QgYmUgc2FmZWx5IHJlcHJlc2VudGVkIGJ5IHRoZSBydW50aW1lICgke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2VyY2lvbiAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNvZXJjaW9ucy5wdXNoKFsoX2EgPSBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgLmAsIHN0YXRlLmNvZXJjaW9uLmJpbmQobnVsbCwgY29lcmNpb24pXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYSBudW1iZXIgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhXG4gKiB2YWxpZCBkYXRlLiBSZWZpbmVzIHRoZSB0eXBlIHRvIGBEYXRlYC5cbiAqXG4gKiBTdXBwb3J0cyBjb2VyY2lvbiB2aWEgb25lIG9mIHRoZSBmb2xsb3dpbmcgZm9ybWF0czpcbiAqIC0gSVNPODYwMDEgc3RyaW5nc1xuICogLSBVbml4IHRpbWVzdGFtcHNcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKCkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb24pID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBVbmJvdW5kIGNvZXJjaW9uIHJlc3VsdGApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29lcmNpb247XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGBzdHJpbmdgICYmIGlzbzg2MDFSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZXJjaW9uID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF9iKSB7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gYG51bWJlcmApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYG51bWJlcmApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXAgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZXN0YW1wICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNTYWZlSW50ZWdlcih0aW1lc3RhbXApIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcih0aW1lc3RhbXAgKiAxMDAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2VyY2lvbiA9IG5ldyBEYXRlKHRpbWVzdGFtcCAqIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFJlY2VpdmVkIGEgdGltZXN0YW1wIHRoYXQgY2FuJ3QgYmUgc2FmZWx5IHJlcHJlc2VudGVkIGJ5IHRoZSBydW50aW1lICgke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2VyY2lvbiAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmNvZXJjaW9ucy5wdXNoKFsoX2EgPSBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgLmAsIHN0YXRlLmNvZXJjaW9uLmJpbmQobnVsbCwgY29lcmNpb24pXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYSBkYXRlIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB0ZXN0ZWQgdmFsdWUgaXMgYW5cbiAqIGFycmF5IHdob3NlIGFsbCB2YWx1ZXMgbWF0Y2ggdGhlIHByb3ZpZGVkIHN1YnNwZWMuIFJlZmluZXMgdGhlIHR5cGUgdG9cbiAqIGBBcnJheTxUPmAsIHdpdGggYFRgIGJlaW5nIHRoZSBzdWJzcGVjIGluZmVycmVkIHR5cGUuXG4gKlxuICogU3VwcG9ydHMgY29lcmNpb24gaWYgdGhlIGBkZWxpbWl0ZXJgIG9wdGlvbiBpcyBzZXQsIGluIHdoaWNoIGNhc2Ugc3RyaW5nc1xuICogd2lsbCBiZSBzcGxpdCBhY2NvcmRpbmdseS5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheShzcGVjLCB7IGRlbGltaXRlciB9ID0ge30pIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGBzdHJpbmdgICYmIHR5cGVvZiBkZWxpbWl0ZXIgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhbiBhcnJheSAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSB2YWx1ZS5sZW5ndGg7IHQgPCBUOyArK3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZCA9IHNwZWModmFsdWVbdF0sIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IHA6IGNvbXB1dGVLZXkoc3RhdGUsIHQpLCBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4odmFsdWUsIHQpIH0pKSAmJiB2YWxpZDtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkICYmIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gb3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIHZhbHVlKV0pO1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB0ZXN0ZWQgdmFsdWUgaXMgYW5cbiAqIHNldCB3aG9zZSBhbGwgdmFsdWVzIG1hdGNoIHRoZSBwcm92aWRlZCBzdWJzcGVjLiBSZWZpbmVzIHRoZSB0eXBlIHRvXG4gKiBgU2V0PFQ+YCwgd2l0aCBgVGAgYmVpbmcgdGhlIHN1YnNwZWMgaW5mZXJyZWQgdHlwZS5cbiAqXG4gKiBTdXBwb3J0cyBjb2VyY2lvbiBmcm9tIGFycmF5cyAob3IgYW55dGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCBpbnRvIGFuXG4gKiBhcnJheSkuXG4gKi9cbmZ1bmN0aW9uIGlzU2V0KHNwZWMsIHsgZGVsaW1pdGVyIH0gPSB7fSkge1xuICAgIGNvbnN0IGlzQXJyYXlWYWxpZGF0b3IgPSBpc0FycmF5KHNwZWMsIHsgZGVsaW1pdGVyIH0pO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpLnRvU3RyaW5nKCkgPT09IGBbb2JqZWN0IFNldF1gKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVmFsdWVzID0gWy4uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29lcmNlZFZhbHVlcyA9IFsuLi52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBcnJheVZhbGlkYXRvcihjb2VyY2VkVmFsdWVzLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogdW5kZWZpbmVkIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlVmFsdWUgPSAoKSA9PiBjb2VyY2VkVmFsdWVzLnNvbWUoKHZhbCwgdCkgPT4gdmFsICE9PSBvcmlnaW5hbFZhbHVlc1t0XSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IFNldChjb2VyY2VkVmFsdWVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYSA9IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYCwgbWFrZUxhenlDb2VyY2lvbkZuKHN0YXRlLmNvZXJjaW9uLCB2YWx1ZSwgdXBkYXRlVmFsdWUpXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJWYWx1ZSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBzcGVjKHN1YlZhbHVlLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSkpICYmIHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCAmJiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb24pID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB7IHZhbHVlIH07XG4gICAgICAgICAgICAgICAgaWYgKCFpc0FycmF5VmFsaWRhdG9yKHZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4oc3RvcmUsIGB2YWx1ZWApIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlLmNvZXJjaW9ucy5wdXNoKFsoX2IgPSBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBgLmAsIG1ha2VMYXp5Q29lcmNpb25GbihzdGF0ZS5jb2VyY2lvbiwgdmFsdWUsICgpID0+IG5ldyBTZXQoc3RvcmUudmFsdWUpKV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgc2V0IChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB0ZXN0ZWQgdmFsdWUgaXMgYW5cbiAqIG1hcCB3aG9zZSBhbGwgdmFsdWVzIG1hdGNoIHRoZSBwcm92aWRlZCBzdWJzcGVjcy4gUmVmaW5lcyB0aGUgdHlwZSB0b1xuICogYE1hcDxVLCBWPmAsIHdpdGggYFVgIGJlaW5nIHRoZSBrZXkgc3Vic3BlYyBpbmZlcnJlZCB0eXBlIGFuZCBgVmAgYmVpbmdcbiAqIHRoZSB2YWx1ZSBzdWJzcGVjIGluZmVycmVkIHR5cGUuXG4gKlxuICogU3VwcG9ydHMgY29lcmNpb24gZnJvbSBhcnJheSBvZiB0dXBsZXMgKG9yIGFueXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgaW50b1xuICogYW4gYXJyYXkgb2YgdHVwbGVzKS5cbiAqL1xuZnVuY3Rpb24gaXNNYXAoa2V5U3BlYywgdmFsdWVTcGVjKSB7XG4gICAgY29uc3QgaXNBcnJheVZhbGlkYXRvciA9IGlzQXJyYXkoaXNUdXBsZShba2V5U3BlYywgdmFsdWVTcGVjXSkpO1xuICAgIGNvbnN0IGlzUmVjb3JkVmFsaWRhdG9yID0gaXNSZWNvcmQodmFsdWVTcGVjLCB7IGtleXM6IGtleVNwZWMgfSk7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpLnRvU3RyaW5nKCkgPT09IGBbb2JqZWN0IE1hcF1gKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVmFsdWVzID0gWy4uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29lcmNlZFZhbHVlcyA9IFsuLi52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBcnJheVZhbGlkYXRvcihjb2VyY2VkVmFsdWVzLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogdW5kZWZpbmVkIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlVmFsdWUgPSAoKSA9PiBjb2VyY2VkVmFsdWVzLnNvbWUoKHZhbCwgdCkgPT4gdmFsWzBdICE9PSBvcmlnaW5hbFZhbHVlc1t0XVswXSB8fCB2YWxbMV0gIT09IG9yaWdpbmFsVmFsdWVzW3RdWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgTWFwKGNvZXJjZWRWYWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBtYWtlTGF6eUNvZXJjaW9uRm4oc3RhdGUuY29lcmNpb24sIHZhbHVlLCB1cGRhdGVWYWx1ZSldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHN1YlZhbHVlXSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBrZXlTcGVjKGtleSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpKSAmJiB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQgJiYgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gdmFsdWVTcGVjKHN1YlZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpIH0pKSAmJiB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQgJiYgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBVbmJvdW5kIGNvZXJjaW9uIHJlc3VsdGApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0geyB2YWx1ZSB9O1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXlWYWxpZGF0b3IodmFsdWUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IGNvZXJjaW9uOiB1bmRlZmluZWQgfSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9iID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogYC5gLCBtYWtlTGF6eUNvZXJjaW9uRm4oc3RhdGUuY29lcmNpb24sIHZhbHVlLCAoKSA9PiBuZXcgTWFwKHN0b3JlLnZhbHVlKSldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUmVjb3JkVmFsaWRhdG9yKHZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4oc3RvcmUsIGB2YWx1ZWApIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYyA9IHN0YXRlLnApICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGAuYCwgbWFrZUxhenlDb2VyY2lvbkZuKHN0YXRlLmNvZXJjaW9uLCB2YWx1ZSwgKCkgPT4gbmV3IE1hcChPYmplY3QuZW50cmllcyhzdG9yZS52YWx1ZSkpKV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYSBtYXAgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhXG4gKiB0dXBsZSB3aG9zZSBlYWNoIHZhbHVlIG1hdGNoZXMgdGhlIGNvcnJlc3BvbmRpbmcgc3Vic3BlYy4gUmVmaW5lcyB0aGUgdHlwZVxuICogaW50byBhIHR1cGxlIHdob3NlIGVhY2ggaXRlbSBoYXMgdGhlIHR5cGUgaW5mZXJyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmdcbiAqIHR1cGxlLlxuICpcbiAqIFN1cHBvcnRzIGNvZXJjaW9uIGlmIHRoZSBgZGVsaW1pdGVyYCBvcHRpb24gaXMgc2V0LCBpbiB3aGljaCBjYXNlIHN0cmluZ3NcbiAqIHdpbGwgYmUgc3BsaXQgYWNjb3JkaW5nbHkuXG4gKi9cbmZ1bmN0aW9uIGlzVHVwbGUoc3BlYywgeyBkZWxpbWl0ZXIgfSA9IHt9KSB7XG4gICAgY29uc3QgbGVuZ3RoVmFsaWRhdG9yID0gaGFzRXhhY3RMZW5ndGgoc3BlYy5sZW5ndGgpO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYHN0cmluZ2AgJiYgdHlwZW9mIGRlbGltaXRlciAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChkZWxpbWl0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIHZhbHVlKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgdHVwbGUgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgbGV0IHZhbGlkID0gbGVuZ3RoVmFsaWRhdG9yKHZhbHVlLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSB2YWx1ZS5sZW5ndGg7IHQgPCBUICYmIHQgPCBzcGVjLmxlbmd0aDsgKyt0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBzcGVjW3RdKHZhbHVlW3RdLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCB0KSwgY29lcmNpb246IG1ha2VDb2VyY2lvbkZuKHZhbHVlLCB0KSB9KSkgJiYgdmFsaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCAmJiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhblxuICogb2JqZWN0IHdpdGggYW55IGFtb3VudCBvZiBwcm9wZXJ0aWVzIHRoYXQgbXVzdCBhbGwgbWF0Y2ggdGhlIHByb3ZpZGVkXG4gKiBzdWJzcGVjLiBSZWZpbmVzIHRoZSB0eXBlIHRvIGBSZWNvcmQ8c3RyaW5nLCBUPmAsIHdpdGggYFRgIGJlaW5nIHRoZVxuICogc3Vic3BlYyBpbmZlcnJlZCB0eXBlLlxuICpcbiAqIEtleXMgY2FuIGJlIG9wdGlvbmFsbHkgdmFsaWRhdGVkIGFzIHdlbGwgYnkgdXNpbmcgdGhlIGBrZXlzYCBvcHRpb25hbFxuICogc3Vic3BlYyBwYXJhbWV0ZXIuXG4gKi9cbmZ1bmN0aW9uIGlzUmVjb3JkKHNwZWMsIHsga2V5czoga2V5U3BlYyA9IG51bGwsIH0gPSB7fSkge1xuICAgIGNvbnN0IGlzQXJyYXlWYWxpZGF0b3IgPSBpc0FycmF5KGlzVHVwbGUoW2tleVNwZWMgIT09IG51bGwgJiYga2V5U3BlYyAhPT0gdm9pZCAwID8ga2V5U3BlYyA6IGlzU3RyaW5nKCksIHNwZWNdKSk7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0FycmF5VmFsaWRhdG9yKHZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogdW5kZWZpbmVkIH0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBPYmplY3QuZnJvbUVudHJpZXModmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIHZhbHVlKV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBgb2JqZWN0YCB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYW4gb2JqZWN0IChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSBrZXlzLmxlbmd0aDsgdCA8IFQgJiYgKHZhbGlkIHx8IChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSAhPSBudWxsKTsgKyt0KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1t0XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGBfX3Byb3RvX19gIHx8IGtleSA9PT0gYGNvbnN0cnVjdG9yYCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHB1c2hFcnJvcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpIH0pLCBgVW5zYWZlIHByb3BlcnR5IG5hbWVgKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrZXlTcGVjICE9PSBudWxsICYmICFrZXlTcGVjKGtleSwgc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNwZWMoc3ViLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpLCBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4odmFsdWUsIGtleSkgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogQGRlcHJlY2F0ZWQgUmVwbGFjZSBgaXNEaWN0YCBieSBgaXNSZWNvcmRgXG4gKi9cbmZ1bmN0aW9uIGlzRGljdChzcGVjLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gaXNSZWNvcmQoc3BlYywgb3B0cyk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhblxuICogb2JqZWN0IHdob3NlIGFsbCBwcm9wZXJ0aWVzIG1hdGNoIHRoZWlyIGNvcnJlc3BvbmRpbmcgc3Vic3BlYy4gUmVmaW5lc1xuICogdGhlIHR5cGUgaW50byBhbiBvYmplY3Qgd2hvc2UgZWFjaCBwcm9wZXJ0eSBoYXMgdGhlIHR5cGUgaW5mZXJyZWQgYnkgdGhlXG4gKiBjb3JyZXNwb25kaW5nIHN1YnNwZWMuXG4gKlxuICogVW5saWtlIGB0LmlzUGFydGlhbGAsIGB0LmlzT2JqZWN0YCBkb2Vzbid0IGFsbG93IGV4dHJhbmVvdXMgcHJvcGVydGllcyBieVxuICogZGVmYXVsdC4gVGhpcyBiZWhhdmlvdXIgY2FuIGJlIGFsdGVyZWQgYnkgdXNpbmcgdGhlIGBleHRyYWAgb3B0aW9uYWxcbiAqIHN1YnNwZWMgcGFyYW1ldGVyLCB3aGljaCB3aWxsIGJlIGNhbGxlZCB0byB2YWxpZGF0ZSBhbiBvYmplY3Qgb25seVxuICogY29udGFpbmluZyB0aGUgZXh0cmFuZW91cyBwcm9wZXJ0aWVzLlxuICpcbiAqIENhbGxpbmcgYHQuaXNPYmplY3QoLi4uLCB7ZXh0cmE6IHQuaXNSZWNvcmQodC5pc1Vua25vd24oKSl9KWAgaXNcbiAqIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIGNhbGxpbmcgYHQuaXNQYXJ0aWFsKC4uLilgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdChwcm9wcywgeyBleHRyYTogZXh0cmFTcGVjID0gbnVsbCwgfSA9IHt9KSB7XG4gICAgY29uc3Qgc3BlY0tleXMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IGBvYmplY3RgIHx8IHZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhbiBvYmplY3QgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoWy4uLnNwZWNLZXlzLCAuLi5PYmplY3Qua2V5cyh2YWx1ZSldKTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhID0ge307XG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGBjb25zdHJ1Y3RvcmAgfHwga2V5ID09PSBgX19wcm90b19fYCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHB1c2hFcnJvcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpIH0pLCBgVW5zYWZlIHByb3BlcnR5IG5hbWVgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwZWMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvcHMsIGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcHJvcHNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzcGVjICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBzcGVjKHN1YiwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgcDogY29tcHV0ZUtleShzdGF0ZSwga2V5KSwgY29lcmNpb246IG1ha2VDb2VyY2lvbkZuKHZhbHVlLCBrZXkpIH0pKSAmJiB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChleHRyYVNwZWMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gcHVzaEVycm9yKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IHA6IGNvbXB1dGVLZXkoc3RhdGUsIGtleSkgfSksIGBFeHRyYW5lb3VzIHByb3BlcnR5IChnb3QgJHtnZXRQcmludGFibGUoc3ViKX0pYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXh0cmEsIGtleSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBzdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHZhbHVlLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkICYmIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChleHRyYVNwZWMgIT09IG51bGwgJiYgKHZhbGlkIHx8IChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSAhPSBudWxsKSlcbiAgICAgICAgICAgICAgICB2YWxpZCA9IGV4dHJhU3BlYyhleHRyYSwgc3RhdGUpICYmIHZhbGlkO1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHZhbGlkYXRvciwge1xuICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wcyxcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgb25seSByZXR1cm5zIHRydWUgd2hlbiB0aGUgdGVzdGVkIHZhbHVlIGlzIGFuXG4gKiBvYmplY3Qgd2hvc2UgYWxsIHByb3BlcnRpZXMgbWF0Y2ggdGhlaXIgY29ycmVzcG9uZGluZyBzdWJzcGVjLiBSZWZpbmVzXG4gKiB0aGUgdHlwZSBpbnRvIGFuIG9iamVjdCB3aG9zZSBlYWNoIHByb3BlcnR5IGhhcyB0aGUgdHlwZSBpbmZlcnJlZCBieSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgc3Vic3BlYy5cbiAqXG4gKiBVbmxpa2UgYHQuaXNPYmplY3RgLCBgdC5pc1BhcnRpYWxgIGFsbG93cyBleHRyYW5lb3VzIHByb3BlcnRpZXMuIFRoZVxuICogcmVzdWx0aW5nIHR5cGUgd2lsbCByZWZsZWN0IHRoaXMgYmVoYXZpb3VyIGJ5IGluY2x1ZGluZyBhbiBpbmRleFxuICogc2lnbmF0dXJlIChlYWNoIGV4dHJhbmVvdXMgcHJvcGVydHkgYmVpbmcgdHlwZWQgYHVua25vd25gKS5cbiAqXG4gKiBDYWxsaW5nIGB0LmlzUGFydGlhbCguLi4pYCBpcyBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyBjYWxsaW5nXG4gKiBgdC5pc09iamVjdCguLi4sIHtleHRyYTogdC5pc1JlY29yZCh0LmlzVW5rbm93bigpKX0pYC5cbiAqL1xuZnVuY3Rpb24gaXNQYXJ0aWFsKHByb3BzKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHByb3BzLCB7IGV4dHJhOiBpc1JlY29yZChpc1Vua25vd24oKSkgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IG9ubHkgcmV0dXJucyB0cnVlIHdoZW4gdGhlIHRlc3RlZCB2YWx1ZSBpcyBhblxuICogb2JqZWN0IHdob3NlIHByb3RvdHlwZSBpcyBkZXJpdmVkIGZyb20gdGhlIGdpdmVuIGNsYXNzLiBSZWZpbmVzIHRoZSB0eXBlXG4gKiBpbnRvIGEgY2xhc3MgaW5zdGFuY2UuXG4gKi9cbmNvbnN0IGlzSW5zdGFuY2VPZiA9IChjb25zdHJ1Y3RvcikgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhbiBpbnN0YW5jZSBvZiAke2NvbnN0cnVjdG9yLm5hbWV9IChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIHRoZSB0ZXN0ZWQgdmFsdWUgaXMgYW5cbiAqIG9iamVjdCBtYXRjaGluZyBhbnkgb2YgdGhlIHByb3ZpZGVkIHN1YnNwZWNzLiBJZiB0aGUgb3B0aW9uYWwgYGV4Y2x1c2l2ZWBcbiAqIHBhcmFtZXRlciBpcyBzZXQgdG8gYHRydWVgLCB0aGUgYmVoYXZpb3VyIGNoYW5nZXMgc28gdGhhdCB0aGUgdmFsaWRhdG9yXG4gKiBvbmx5IHJldHVybnMgdHJ1ZSB3aGVuIGV4YWN0bHkgb25lIHN1YnNwZWMgbWF0Y2hlcy5cbiAqL1xuY29uc3QgaXNPbmVPZiA9IChzcGVjcywgeyBleGNsdXNpdmUgPSBmYWxzZSwgfSA9IHt9KSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gW107XG4gICAgICAgIGNvbnN0IGVycm9yQnVmZmVyID0gdHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSAhPT0gYHVuZGVmaW5lZGBcbiAgICAgICAgICAgID8gW10gOiB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAobGV0IHQgPSAwLCBUID0gc3BlY3MubGVuZ3RoOyB0IDwgVDsgKyt0KSB7XG4gICAgICAgICAgICBjb25zdCBzdWJFcnJvcnMgPSB0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgID8gW10gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBzdWJDb2VyY2lvbnMgPSB0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgID8gW10gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoc3BlY3NbdF0odmFsdWUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IGVycm9yczogc3ViRXJyb3JzLCBjb2VyY2lvbnM6IHN1YkNvZXJjaW9ucywgcDogYCR7KF9hID0gc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYH0jJHt0ICsgMX1gIH0pKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChbYCMke3QgKyAxfWAsIHN1YkNvZXJjaW9uc10pO1xuICAgICAgICAgICAgICAgIGlmICghZXhjbHVzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yQnVmZmVyID09PSBudWxsIHx8IGVycm9yQnVmZmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvckJ1ZmZlci5wdXNoKHN1YkVycm9yc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBbLCBzdWJDb2VyY2lvbnNdID0gbWF0Y2hlc1swXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViQ29lcmNpb25zICE9PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgICAgICAoX2IgPSBzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaCguLi5zdWJDb2VyY2lvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIG1hdGNoIGV4YWN0bHkgYSBzaW5nbGUgcHJlZGljYXRlIChtYXRjaGVkICR7bWF0Y2hlcy5qb2luKGAsIGApfSlgKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgKF9jID0gc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goLi4uZXJyb3JCdWZmZXIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbn0pO1xuXG5mdW5jdGlvbiBtYWtlVHJhaXQodmFsdWUpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VWYWxpZGF0b3IoeyB0ZXN0IH0pIHtcbiAgICByZXR1cm4gbWFrZVRyYWl0KHRlc3QpKCk7XG59XG5jbGFzcyBUeXBlQXNzZXJ0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoeyBlcnJvcnMgfSA9IHt9KSB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgVHlwZSBtaXNtYXRjaGA7XG4gICAgICAgIGlmIChlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgXFxuYDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBcXG4tICR7ZXJyb3J9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbn1cbi8qKlxuICogQ2hlY2sgdGhhdCB0aGUgc3BlY2lmaWVkIHZhbHVlIG1hdGNoZXMgdGhlIGdpdmVuIHZhbGlkYXRvciwgYW5kIHRocm93cyBhblxuICogZXhjZXB0aW9uIGlmIGl0IGRvZXNuJ3QuIFJlZmluZSB0aGUgdHlwZSBpZiBpdCBwYXNzZXMuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydCh2YWwsIHZhbGlkYXRvcikge1xuICAgIGlmICghdmFsaWRhdG9yKHZhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVBc3NlcnRpb25FcnJvcigpO1xuICAgIH1cbn1cbi8qKlxuICogQ2hlY2sgdGhhdCB0aGUgc3BlY2lmaWVkIHZhbHVlIG1hdGNoZXMgdGhlIGdpdmVuIHZhbGlkYXRvciwgYW5kIHRocm93cyBhblxuICogZXhjZXB0aW9uIGlmIGl0IGRvZXNuJ3QuIFJlZmluZSB0aGUgdHlwZSBpZiBpdCBwYXNzZXMuXG4gKlxuICogVGhyb3duIGV4Y2VwdGlvbnMgaW5jbHVkZSBkZXRhaWxzIGFib3V0IHdoYXQgZXhhY3RseSBsb29rcyBpbnZhbGlkIGluIHRoZVxuICogdGVzdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhc3NlcnRXaXRoRXJyb3JzKHZhbCwgdmFsaWRhdG9yKSB7XG4gICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgaWYgKCF2YWxpZGF0b3IodmFsLCB7IGVycm9ycyB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUFzc2VydGlvbkVycm9yKHsgZXJyb3JzIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQ29tcGlsZS10aW1lIG9ubHkuIFJlZmluZSB0aGUgdHlwZSBhcyBpZiB0aGUgdmFsaWRhdG9yIHdhcyBtYXRjaGluZyB0aGVcbiAqIHRlc3RlZCB2YWx1ZSwgYnV0IGRvZXNuJ3QgYWN0dWFsbHkgcnVuIGl0LiBTaW1pbGFyIHRvIHRoZSBjbGFzc2ljIGBhc2BcbiAqIG9wZXJhdG9yIGluIFR5cGVTY3JpcHQuXG4gKi9cbmZ1bmN0aW9uIHNvZnRBc3NlcnQodmFsLCB2YWxpZGF0b3IpIHtcbiAgICAvLyBJdCdzIGEgc29mdCBhc3NlcnQ7IHdlIHRlbGwgVHlwZVNjcmlwdCBhYm91dCB0aGUgdHlwZSwgYnV0IHdlIGRvbid0IG5lZWQgdG8gY2hlY2sgaXRcbn1cbmZ1bmN0aW9uIGFzKHZhbHVlLCB2YWxpZGF0b3IsIHsgY29lcmNlID0gZmFsc2UsIGVycm9yczogc3RvcmVFcnJvcnMsIHRocm93OiB0aHJvd3MgfSA9IHt9KSB7XG4gICAgY29uc3QgZXJyb3JzID0gc3RvcmVFcnJvcnMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoIWNvZXJjZSkge1xuICAgICAgICBpZiAodmFsaWRhdG9yKHZhbHVlLCB7IGVycm9ycyB9KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93cyA/IHZhbHVlIDogeyB2YWx1ZSwgZXJyb3JzOiB1bmRlZmluZWQgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhyb3dzKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBlcnJvcnM6IGVycm9ycyAhPT0gbnVsbCAmJiBlcnJvcnMgIT09IHZvaWQgMCA/IGVycm9ycyA6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlQXNzZXJ0aW9uRXJyb3IoeyBlcnJvcnMgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGUgPSB7IHZhbHVlIH07XG4gICAgY29uc3QgY29lcmNpb24gPSBtYWtlQ29lcmNpb25GbihzdGF0ZSwgYHZhbHVlYCk7XG4gICAgY29uc3QgY29lcmNpb25zID0gW107XG4gICAgaWYgKCF2YWxpZGF0b3IodmFsdWUsIHsgZXJyb3JzLCBjb2VyY2lvbiwgY29lcmNpb25zIH0pKSB7XG4gICAgICAgIGlmICghdGhyb3dzKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBlcnJvcnM6IGVycm9ycyAhPT0gbnVsbCAmJiBlcnJvcnMgIT09IHZvaWQgMCA/IGVycm9ycyA6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlQXNzZXJ0aW9uRXJyb3IoeyBlcnJvcnMgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBbLCBhcHBseV0gb2YgY29lcmNpb25zKVxuICAgICAgICBhcHBseSgpO1xuICAgIGlmICh0aHJvd3MpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHN0YXRlLnZhbHVlLCBlcnJvcnM6IHVuZGVmaW5lZCB9O1xuICAgIH1cbn1cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgZnVuY3Rpb24gdGhhdCBhcHBseSB0aGUgZ2l2ZW4gdmFsaWRhdG9ycyB0byBlYWNoXG4gKiBjb3JyZXNwb25kaW5nIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24gYW5kIHRocm93cyBhbiBleGNlcHRpb24gaW5cbiAqIGNhc2Ugb2YgYSBtaXNtYXRjaC5cbiAqL1xuZnVuY3Rpb24gZm4odmFsaWRhdG9ycywgZm4pIHtcbiAgICBjb25zdCBpc1ZhbGlkQXJnTGlzdCA9IGlzVHVwbGUodmFsaWRhdG9ycyk7XG4gICAgcmV0dXJuICgoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBjaGVjayA9IGlzVmFsaWRBcmdMaXN0KGFyZ3MpO1xuICAgICAgICBpZiAoIWNoZWNrKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVBc3NlcnRpb25FcnJvcigpO1xuICAgICAgICByZXR1cm4gZm4oLi4uYXJncyk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHRlc3RlZCBhcnJheSBvciBzdHJpbmcgaGFzIGF0IGxlYXN0XG4gKiB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gaGFzTWluTGVuZ3RoKGxlbmd0aCkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCEodmFsdWUubGVuZ3RoID49IGxlbmd0aCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGhhdmUgYSBsZW5ndGggb2YgYXQgbGVhc3QgJHtsZW5ndGh9IGVsZW1lbnRzIChnb3QgJHt2YWx1ZS5sZW5ndGh9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgYXJyYXkgb3Igc3RyaW5nIGhhcyBhdCBtb3N0XG4gKiB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gaGFzTWF4TGVuZ3RoKGxlbmd0aCkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGxlbmd0aCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGhhdmUgYSBsZW5ndGggb2YgYXQgbW9zdCAke2xlbmd0aH0gZWxlbWVudHMgKGdvdCAke3ZhbHVlLmxlbmd0aH0pYCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHRlc3RlZCBhcnJheSBvciBzdHJpbmcgaGFzIGV4YWN0bHlcbiAqIHRoZSBzcGVjaWZpZWQgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiBoYXNFeGFjdExlbmd0aChsZW5ndGgpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghKHZhbHVlLmxlbmd0aCA9PT0gbGVuZ3RoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gaGF2ZSBhIGxlbmd0aCBvZiBleGFjdGx5ICR7bGVuZ3RofSBlbGVtZW50cyAoZ290ICR7dmFsdWUubGVuZ3RofSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIGFycmF5IG9ubHkgY29udGFpbnMgdW5pcXVlXG4gKiBlbGVtZW50cy4gVGhlIG9wdGlvbmFsIGBtYXBgIHBhcmFtZXRlciBsZXRzIHlvdSBkZWZpbmUgYSB0cmFuc2Zvcm0gdG9cbiAqIGFwcGx5IGJlZm9yZSBtYWtpbmcgdGhlIGNoZWNrICh0aGUgcmVzdWx0IG9mIHRoaXMgdHJhbnNmb3JtIHdpbGwgYmVcbiAqIGRpc2NhcmRlZCBhZnRlcndhcmRzKS5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pcXVlSXRlbXMoeyBtYXAsIH0gPSB7fSkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgY29uc3QgZHVwID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSB2YWx1ZS5sZW5ndGg7IHQgPCBUOyArK3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSB2YWx1ZVt0XTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgbWFwICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgICAgICA/IG1hcChzdWIpXG4gICAgICAgICAgICAgICAgICAgIDogc3ViO1xuICAgICAgICAgICAgICAgIGlmIChzZXQuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR1cC5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBjb250YWluIHVuaXF1ZSBlbGVtZW50czsgZ290IGEgZHVwbGljYXRlIHdpdGggJHtnZXRQcmludGFibGUodmFsdWUpfWApO1xuICAgICAgICAgICAgICAgICAgICBkdXAuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGR1cC5zaXplID09PSAwO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIG51bWJlciBpcyBzdHJpY3RseSBsZXNzIHRoYW4gMC5cbiAqL1xuZnVuY3Rpb24gaXNOZWdhdGl2ZSgpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghKHZhbHVlIDw9IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBuZWdhdGl2ZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgbnVtYmVyIGlzIGVxdWFsIG9yIGdyZWF0ZXJcbiAqIHRoYW4gMC5cbiAqL1xuZnVuY3Rpb24gaXNQb3NpdGl2ZSgpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghKHZhbHVlID49IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBwb3NpdGl2ZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgbnVtYmVyIGlzIGVxdWFsIG9yIGdyZWF0ZXJcbiAqIHRoYW4gdGhlIHNwZWNpZmllZCByZWZlcmVuY2UuXG4gKi9cbmZ1bmN0aW9uIGlzQXRMZWFzdChuKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoISh2YWx1ZSA+PSBuKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgYXQgbGVhc3QgJHtufSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgbnVtYmVyIGlzIGVxdWFsIG9yIHNtYWxsZXJcbiAqIHRoYW4gdGhlIHNwZWNpZmllZCByZWZlcmVuY2UuXG4gKi9cbmZ1bmN0aW9uIGlzQXRNb3N0KG4pIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghKHZhbHVlIDw9IG4pKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhdCBtb3N0ICR7bn0gKGdvdCAke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIG51bWJlciBpcyBiZXR3ZWVuIHRoZVxuICogc3BlY2lmaWVkIHJlZmVyZW5jZXMgKGluY2x1ZGluZyB0aGUgdXBwZXIgYm91bmRhcnkpLlxuICovXG5mdW5jdGlvbiBpc0luSW5jbHVzaXZlUmFuZ2UoYSwgYikge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCEodmFsdWUgPj0gYSAmJiB2YWx1ZSA8PSBiKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgaW4gdGhlIFske2F9OyAke2J9XSByYW5nZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgbnVtYmVyIGlzIGJldHdlZW4gdGhlXG4gKiBzcGVjaWZpZWQgcmVmZXJlbmNlcyAoZXhjbHVkaW5nIHRoZSB1cHBlciBib3VuZGFyeSkuXG4gKi9cbmZ1bmN0aW9uIGlzSW5FeGNsdXNpdmVSYW5nZShhLCBiKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoISh2YWx1ZSA+PSBhICYmIHZhbHVlIDwgYikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGluIHRoZSBbJHthfTsgJHtifVsgcmFuZ2UgKGdvdCAke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIG51bWJlciBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqIEJ5IGRlZmF1bHQgVHlwYW5pb24gd2lsbCBhbHNvIGNoZWNrIHRoYXQgaXQncyBhICpzYWZlKiBpbnRlZ2VyLiBGb3IgZXhhbXBsZSxcbiAqIDJeNTMgd291bGRuJ3QgYmUgYSBzYWZlIGludGVnZXIgYmVjYXVzZSAyXjUzKzEgd291bGQgYmUgcm91bmRlZCB0byAyXjUzLFxuICogd2hpY2ggY291bGQgcHV0IHlvdXIgYXBwbGljYXRpb25zIGF0IHJpc2sgd2hlbiB1c2VkIGluIGxvb3BzLlxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIoeyB1bnNhZmUgPSBmYWxzZSwgfSA9IHt9KSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IE1hdGgucm91bmQodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhbiBpbnRlZ2VyIChnb3QgJHt2YWx1ZX0pYCk7XG4gICAgICAgICAgICBpZiAoIXVuc2FmZSAmJiAhTnVtYmVyLmlzU2FmZUludGVnZXIodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHNhZmUgaW50ZWdlciAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgc3RyaW5nIG1hdGNoZXMgdGhlIGdpdmVuXG4gKiByZWd1bGFyIGV4cHJlc3Npb24uXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNSZWdFeHAocmVnRXhwKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlZ0V4cC50ZXN0KHZhbHVlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gbWF0Y2ggdGhlIHBhdHRlcm4gJHtyZWdFeHAudG9TdHJpbmcoKX0gKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgc3RyaW5nIG9ubHkgY29udGFpbiBsb3dlcmNhc2VcbiAqIGNoYXJhY3RlcnMuXG4gKi9cbmZ1bmN0aW9uIGlzTG93ZXJDYXNlKCkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhbGwtbG93ZXJjYXNlIChnb3QgJHt2YWx1ZX0pYCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHRlc3RlZCBzdHJpbmcgb25seSBjb250YWluIHVwcGVyY2FzZVxuICogY2hhcmFjdGVycy5cbiAqL1xuZnVuY3Rpb24gaXNVcHBlckNhc2UoKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHZhbHVlLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGFsbC11cHBlcmNhc2UgKGdvdCAke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIHN0cmluZyBpcyBhIHZhbGlkIFVVSUQgdjQuXG4gKi9cbmZ1bmN0aW9uIGlzVVVJRDQoKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXV1aWQ0UmVnRXhwLnRlc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIFVVSUQgdjQgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPODYwMVxuICogZGF0ZS5cbiAqL1xuZnVuY3Rpb24gaXNJU084NjAxKCkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFpc284NjAxUmVnRXhwLnRlc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIElTTyA4NjAxIGRhdGUgc3RyaW5nIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIHN0cmluZyBpcyBhIHZhbGlkIGhleGFkZWNpbWFsXG4gKiBjb2xvci4gU2V0dGluZyB0aGUgb3B0aW9uYWwgYGFscGhhYCBwYXJhbWV0ZXIgdG8gYHRydWVgIGFsbG93cyBhbiBhZGRpdGlvbmFsXG4gKiB0cmFuc3BhcmVuY3kgY2hhbm5lbCB0byBiZSBpbmNsdWRlZC5cbiAqL1xuZnVuY3Rpb24gaXNIZXhDb2xvcih7IGFscGhhID0gZmFsc2UsIH0pIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGFscGhhXG4gICAgICAgICAgICAgICAgPyBjb2xvclN0cmluZ1JlZ0V4cC50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgIDogY29sb3JTdHJpbmdBbHBoYVJlZ0V4cC50ZXN0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghcmVzKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIGhleGFkZWNpbWFsIGNvbG9yIHN0cmluZyAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHRlc3RlZCBzdHJpbmcgaXMgdmFsaWQgYmFzZTY0LlxuICovXG5mdW5jdGlvbiBpc0Jhc2U2NCgpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghYmFzZTY0UmVnRXhwLnRlc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIGJhc2UgNjQgc3RyaW5nIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgdGVzdGVkIHN0cmluZyBpcyB2YWxpZCBKU09OLiBBXG4gKiBvcHRpb25hbCBzcGVjIGNhbiBiZSBwYXNzZWQgYXMgcGFyYW1ldGVyLCBpbiB3aGljaCBjYXNlIHRoZSBkYXRhIHdpbGwgYmVcbiAqIGRlc2VyaWFsaXplZCBhbmQgdmFsaWRhdGVkIGFnYWluc3QgdGhlIHNwZWMgKGNvZXJjaW9uIHdpbGwgYmUgZGlzYWJsZWRcbiAqIGZvciB0aGlzIGNoZWNrLCBhbmQgZXZlbiBpZiBzdWNjZXNzZnVsIHRoZSByZXR1cm5lZCB2YWx1ZSB3aWxsIHN0aWxsIGJlXG4gKiB0aGUgb3JpZ2luYWwgc3RyaW5nKS5cbiAqL1xuZnVuY3Rpb24gaXNKU09OKHNwZWMgPSBpc1Vua25vd24oKSkge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIEpTT04gc3RyaW5nIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzcGVjKGRhdGEsIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2FzY2FkZShzcGVjLCAuLi5mb2xsb3d1cHMpIHtcbiAgICBjb25zdCByZXNvbHZlZEZvbGxvd3VwcyA9IEFycmF5LmlzQXJyYXkoZm9sbG93dXBzWzBdKVxuICAgICAgICA/IGZvbGxvd3Vwc1swXVxuICAgICAgICA6IGZvbGxvd3VwcztcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0geyB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIGNvbnN0IHN1YkNvZXJjaW9uID0gdHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGBcbiAgICAgICAgICAgICAgICA/IG1ha2VDb2VyY2lvbkZuKGNvbnRleHQsIGB2YWx1ZWApIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3Qgc3ViQ29lcmNpb25zID0gdHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGBcbiAgICAgICAgICAgICAgICA/IFtdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCFzcGVjKHZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogc3ViQ29lcmNpb24sIGNvZXJjaW9uczogc3ViQ29lcmNpb25zIH0pKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCByZXZlcnRzID0gW107XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1YkNvZXJjaW9ucyAhPT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbLCBjb2VyY2lvbl0gb2Ygc3ViQ29lcmNpb25zKVxuICAgICAgICAgICAgICAgICAgICByZXZlcnRzLnB1c2goY29lcmNpb24oKSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBVbmJvdW5kIGNvZXJjaW9uIHJlc3VsdGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYSA9IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYCwgc3RhdGUuY29lcmNpb24uYmluZChudWxsLCBjb250ZXh0LnZhbHVlKV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKC4uLnN1YkNvZXJjaW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlZEZvbGxvd3Vwcy5ldmVyeShzcGVjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMoY29udGV4dC52YWx1ZSwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXZlcnQgb2YgcmV2ZXJ0cykge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5mdW5jdGlvbiBhcHBseUNhc2NhZGUoc3BlYywgLi4uZm9sbG93dXBzKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRGb2xsb3d1cHMgPSBBcnJheS5pc0FycmF5KGZvbGxvd3Vwc1swXSlcbiAgICAgICAgPyBmb2xsb3d1cHNbMF1cbiAgICAgICAgOiBmb2xsb3d1cHM7XG4gICAgcmV0dXJuIGNhc2NhZGUoc3BlYywgcmVzb2x2ZWRGb2xsb3d1cHMpO1xufVxuLyoqXG4gKiBXcmFwcyB0aGUgZ2l2ZW4gc3BlYyB0byBhbHNvIGFsbG93IGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBpc09wdGlvbmFsKHNwZWMpIHtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWModmFsdWUsIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogV3JhcHMgdGhlIGdpdmVuIHNwZWMgdG8gYWxzbyBhbGxvdyBgbnVsbGAuXG4gKi9cbmZ1bmN0aW9uIGlzTnVsbGFibGUoc3BlYykge1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWModmFsdWUsIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHRlc3RlZCBvYmplY3QgY29udGFpbnMgdGhlIHNwZWNpZmllZFxuICoga2V5cy5cbiAqL1xuZnVuY3Rpb24gaGFzUmVxdWlyZWRLZXlzKHJlcXVpcmVkS2V5cykge1xuICAgIGNvbnN0IHJlcXVpcmVkU2V0ID0gbmV3IFNldChyZXF1aXJlZEtleXMpO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXModmFsdWUpKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiByZXF1aXJlZFNldClcbiAgICAgICAgICAgICAgICBpZiAoIWtleXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGlmIChwcm9ibGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBNaXNzaW5nIHJlcXVpcmVkICR7cGx1cmFsKHByb2JsZW1zLmxlbmd0aCwgYHByb3BlcnR5YCwgYHByb3BlcnRpZXNgKX0gJHtnZXRQcmludGFibGVBcnJheShwcm9ibGVtcywgYGFuZGApfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgb2JqZWN0IGNvbnRhaW5zIG5vbmUgb2YgdGhlXG4gKiBzcGVjaWZpZWQga2V5cy5cbiAqL1xuZnVuY3Rpb24gaGFzRm9yYmlkZGVuS2V5cyhmb3JiaWRkZW5LZXlzKSB7XG4gICAgY29uc3QgZm9yYmlkZGVuU2V0ID0gbmV3IFNldChmb3JiaWRkZW5LZXlzKTtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KE9iamVjdC5rZXlzKHZhbHVlKSk7XG4gICAgICAgICAgICBjb25zdCBwcm9ibGVtcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZm9yYmlkZGVuU2V0KVxuICAgICAgICAgICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICBwcm9ibGVtcy5wdXNoKGtleSk7XG4gICAgICAgICAgICBpZiAocHJvYmxlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRm9yYmlkZGVuICR7cGx1cmFsKHByb2JsZW1zLmxlbmd0aCwgYHByb3BlcnR5YCwgYHByb3BlcnRpZXNgKX0gJHtnZXRQcmludGFibGVBcnJheShwcm9ibGVtcywgYGFuZGApfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHZhbGlkYXRvciB0aGF0IGNoZWNrcyB0aGF0IHRoZSB0ZXN0ZWQgb2JqZWN0IGNvbnRhaW5zIGF0IG1vc3Qgb25lXG4gKiBvZiB0aGUgc3BlY2lmaWVkIGtleXMuXG4gKi9cbmZ1bmN0aW9uIGhhc011dHVhbGx5RXhjbHVzaXZlS2V5cyhleGNsdXNpdmVLZXlzKSB7XG4gICAgY29uc3QgZXhjbHVzaXZlU2V0ID0gbmV3IFNldChleGNsdXNpdmVLZXlzKTtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KE9iamVjdC5rZXlzKHZhbHVlKSk7XG4gICAgICAgICAgICBjb25zdCB1c2VkID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBleGNsdXNpdmVTZXQpXG4gICAgICAgICAgICAgICAgaWYgKGtleXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKHVzZWQubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgTXV0dWFsbHkgZXhjbHVzaXZlIHByb3BlcnRpZXMgJHtnZXRQcmludGFibGVBcnJheSh1c2VkLCBgYW5kYCl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbihmdW5jdGlvbiAoS2V5UmVsYXRpb25zaGlwKSB7XG4gICAgS2V5UmVsYXRpb25zaGlwW1wiRm9yYmlkc1wiXSA9IFwiRm9yYmlkc1wiO1xuICAgIEtleVJlbGF0aW9uc2hpcFtcIlJlcXVpcmVzXCJdID0gXCJSZXF1aXJlc1wiO1xufSkoZXhwb3J0cy5LZXlSZWxhdGlvbnNoaXAgfHwgKGV4cG9ydHMuS2V5UmVsYXRpb25zaGlwID0ge30pKTtcbmNvbnN0IGtleVJlbGF0aW9uc2hpcHMgPSB7XG4gICAgW2V4cG9ydHMuS2V5UmVsYXRpb25zaGlwLkZvcmJpZHNdOiB7XG4gICAgICAgIGV4cGVjdDogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IGBmb3JiaWRzIHVzaW5nYCxcbiAgICB9LFxuICAgIFtleHBvcnRzLktleVJlbGF0aW9uc2hpcC5SZXF1aXJlc106IHtcbiAgICAgICAgZXhwZWN0OiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBgcmVxdWlyZXMgdXNpbmdgLFxuICAgIH0sXG59O1xuLyoqXG4gKiBDcmVhdGUgYSB2YWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCwgd2hlbiB0aGUgc3BlY2lmaWVkIHN1YmplY3QgcHJvcGVydHkgaXNcbiAqIHNldCwgdGhlIHJlbGF0aW9uc2hpcCBpcyBzYXRpc2ZpZWQuXG4gKi9cbmZ1bmN0aW9uIGhhc0tleVJlbGF0aW9uc2hpcChzdWJqZWN0LCByZWxhdGlvbnNoaXAsIG90aGVycywgeyBpZ25vcmUgPSBbXSwgfSA9IHt9KSB7XG4gICAgY29uc3Qgc2tpcHBlZCA9IG5ldyBTZXQoaWdub3JlKTtcbiAgICBjb25zdCBvdGhlclNldCA9IG5ldyBTZXQob3RoZXJzKTtcbiAgICBjb25zdCBzcGVjID0ga2V5UmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBdO1xuICAgIGNvbnN0IGNvbmp1bmN0aW9uID0gcmVsYXRpb25zaGlwID09PSBleHBvcnRzLktleVJlbGF0aW9uc2hpcC5Gb3JiaWRzXG4gICAgICAgID8gYG9yYFxuICAgICAgICA6IGBhbmRgO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXModmFsdWUpKTtcbiAgICAgICAgICAgIGlmICgha2V5cy5oYXMoc3ViamVjdCkgfHwgc2tpcHBlZC5oYXModmFsdWVbc3ViamVjdF0pKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG90aGVyU2V0KVxuICAgICAgICAgICAgICAgIGlmICgoa2V5cy5oYXMoa2V5KSAmJiAhc2tpcHBlZC5oYXModmFsdWVba2V5XSkpICE9PSBzcGVjLmV4cGVjdClcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbXMucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKHByb2JsZW1zLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBQcm9wZXJ0eSBcIiR7c3ViamVjdH1cIiAke3NwZWMubWVzc2FnZX0gJHtwbHVyYWwocHJvYmxlbXMubGVuZ3RoLCBgcHJvcGVydHlgLCBgcHJvcGVydGllc2ApfSAke2dldFByaW50YWJsZUFycmF5KHByb2JsZW1zLCBjb25qdW5jdGlvbil9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuZXhwb3J0cy5UeXBlQXNzZXJ0aW9uRXJyb3IgPSBUeXBlQXNzZXJ0aW9uRXJyb3I7XG5leHBvcnRzLmFwcGx5Q2FzY2FkZSA9IGFwcGx5Q2FzY2FkZTtcbmV4cG9ydHMuYXMgPSBhcztcbmV4cG9ydHMuYXNzZXJ0ID0gYXNzZXJ0O1xuZXhwb3J0cy5hc3NlcnRXaXRoRXJyb3JzID0gYXNzZXJ0V2l0aEVycm9ycztcbmV4cG9ydHMuY2FzY2FkZSA9IGNhc2NhZGU7XG5leHBvcnRzLmZuID0gZm47XG5leHBvcnRzLmhhc0V4YWN0TGVuZ3RoID0gaGFzRXhhY3RMZW5ndGg7XG5leHBvcnRzLmhhc0ZvcmJpZGRlbktleXMgPSBoYXNGb3JiaWRkZW5LZXlzO1xuZXhwb3J0cy5oYXNLZXlSZWxhdGlvbnNoaXAgPSBoYXNLZXlSZWxhdGlvbnNoaXA7XG5leHBvcnRzLmhhc01heExlbmd0aCA9IGhhc01heExlbmd0aDtcbmV4cG9ydHMuaGFzTWluTGVuZ3RoID0gaGFzTWluTGVuZ3RoO1xuZXhwb3J0cy5oYXNNdXR1YWxseUV4Y2x1c2l2ZUtleXMgPSBoYXNNdXR1YWxseUV4Y2x1c2l2ZUtleXM7XG5leHBvcnRzLmhhc1JlcXVpcmVkS2V5cyA9IGhhc1JlcXVpcmVkS2V5cztcbmV4cG9ydHMuaGFzVW5pcXVlSXRlbXMgPSBoYXNVbmlxdWVJdGVtcztcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5leHBvcnRzLmlzQXRMZWFzdCA9IGlzQXRMZWFzdDtcbmV4cG9ydHMuaXNBdE1vc3QgPSBpc0F0TW9zdDtcbmV4cG9ydHMuaXNCYXNlNjQgPSBpc0Jhc2U2NDtcbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5leHBvcnRzLmlzRGljdCA9IGlzRGljdDtcbmV4cG9ydHMuaXNFbnVtID0gaXNFbnVtO1xuZXhwb3J0cy5pc0hleENvbG9yID0gaXNIZXhDb2xvcjtcbmV4cG9ydHMuaXNJU084NjAxID0gaXNJU084NjAxO1xuZXhwb3J0cy5pc0luRXhjbHVzaXZlUmFuZ2UgPSBpc0luRXhjbHVzaXZlUmFuZ2U7XG5leHBvcnRzLmlzSW5JbmNsdXNpdmVSYW5nZSA9IGlzSW5JbmNsdXNpdmVSYW5nZTtcbmV4cG9ydHMuaXNJbnN0YW5jZU9mID0gaXNJbnN0YW5jZU9mO1xuZXhwb3J0cy5pc0ludGVnZXIgPSBpc0ludGVnZXI7XG5leHBvcnRzLmlzSlNPTiA9IGlzSlNPTjtcbmV4cG9ydHMuaXNMaXRlcmFsID0gaXNMaXRlcmFsO1xuZXhwb3J0cy5pc0xvd2VyQ2FzZSA9IGlzTG93ZXJDYXNlO1xuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuZXhwb3J0cy5pc05lZ2F0aXZlID0gaXNOZWdhdGl2ZTtcbmV4cG9ydHMuaXNOdWxsYWJsZSA9IGlzTnVsbGFibGU7XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5leHBvcnRzLmlzT25lT2YgPSBpc09uZU9mO1xuZXhwb3J0cy5pc09wdGlvbmFsID0gaXNPcHRpb25hbDtcbmV4cG9ydHMuaXNQYXJ0aWFsID0gaXNQYXJ0aWFsO1xuZXhwb3J0cy5pc1Bvc2l0aXZlID0gaXNQb3NpdGl2ZTtcbmV4cG9ydHMuaXNSZWNvcmQgPSBpc1JlY29yZDtcbmV4cG9ydHMuaXNTZXQgPSBpc1NldDtcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbmV4cG9ydHMuaXNUdXBsZSA9IGlzVHVwbGU7XG5leHBvcnRzLmlzVVVJRDQgPSBpc1VVSUQ0O1xuZXhwb3J0cy5pc1Vua25vd24gPSBpc1Vua25vd247XG5leHBvcnRzLmlzVXBwZXJDYXNlID0gaXNVcHBlckNhc2U7XG5leHBvcnRzLm1ha2VUcmFpdCA9IG1ha2VUcmFpdDtcbmV4cG9ydHMubWFrZVZhbGlkYXRvciA9IG1ha2VWYWxpZGF0b3I7XG5leHBvcnRzLm1hdGNoZXNSZWdFeHAgPSBtYXRjaGVzUmVnRXhwO1xuZXhwb3J0cy5zb2Z0QXNzZXJ0ID0gc29mdEFzc2VydDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBhZHZhbmNlZF9vcHRpb25zX3V0aWxzID0gcmVxdWlyZSgnLi9vcHRpb25zL3V0aWxzLmpzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wTmFtZXNwYWNlKGUpIHtcbiAgICBpZiAoZSAmJiBlLl9fZXNNb2R1bGUpIHJldHVybiBlO1xuICAgIHZhciBuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBpZiAoZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIGspO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLCBrLCBkLmdldCA/IGQgOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVba107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5bJ2RlZmF1bHQnXSA9IGU7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUobik7XG59XG5cbi8qKlxuICogQmFzZSBhYnN0cmFjdCBjbGFzcyBmb3IgQ0xJIGNvbW1hbmRzLiBUaGUgbWFpbiB0aGluZyB0byByZW1lbWJlciBpcyB0b1xuICogZGVjbGFyZSBhbiBhc3luYyBgZXhlY3V0ZWAgbWVtYmVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGVcbiAqIGNvbW1hbmQgaXMgaW52b2tlZCBmcm9tIHRoZSBDTEksIGFuZCBvcHRpb25hbGx5IGEgYHBhdGhzYCBwcm9wZXJ0eSB0b1xuICogZGVjbGFyZSB0aGUgc2V0IG9mIHBhdGhzIHVuZGVyIHdoaWNoIHRoZSBjb21tYW5kIHNob3VsZCBiZSBleHBvc2VkLlxuICovXG5jbGFzcyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZWRlZmluZWQgdGhhdCB3aWxsIGJlIHNldCB0byB0cnVlIGlmIGAtaCwtLWhlbHBgIGhhcyBiZWVuIHVzZWQsIGluXG4gICAgICAgICAqIHdoaWNoIGNhc2UgYENvbW1hbmQjZXhlY3V0ZWAgd29uJ3QgYmUgY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWxwID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHVzYWdlIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gY29tbWFuZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgVXNhZ2UodXNhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHVzYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFuZGFyZCBlcnJvciBoYW5kbGVyIHdoaWNoIHdpbGwgc2ltcGx5IHJldGhyb3cgdGhlIGVycm9yLiBDYW4gYmUgdXNlZFxuICAgICAqIHRvIGFkZCBjdXN0b20gbG9naWMgdG8gaGFuZGxlIGVycm9ycyBmcm9tIHRoZSBjb21tYW5kIG9yIHNpbXBseSByZXR1cm5cbiAgICAgKiB0aGUgcGFyZW50IGNsYXNzIGVycm9yIGhhbmRsaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGNhdGNoKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBhc3luYyB2YWxpZGF0ZUFuZEV4ZWN1dGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRDbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIGNvbnN0IGNhc2NhZGUgPSBjb21tYW5kQ2xhc3Muc2NoZW1hO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYXNjYWRlKSkge1xuICAgICAgICAgICAgY29uc3QgeyBpc0RpY3QsIGlzVW5rbm93biwgYXBwbHlDYXNjYWRlIH0gPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIC8qI19fUFVSRV9fKi9faW50ZXJvcE5hbWVzcGFjZShyZXF1aXJlKCd0eXBhbmlvbicpKTsgfSk7XG4gICAgICAgICAgICBjb25zdCBzY2hlbWEgPSBhcHBseUNhc2NhZGUoaXNEaWN0KGlzVW5rbm93bigpKSwgY2FzY2FkZSk7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGNvZXJjaW9ucyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBzY2hlbWEodGhpcywgeyBlcnJvcnMsIGNvZXJjaW9ucyB9KTtcbiAgICAgICAgICAgIGlmICghY2hlY2spXG4gICAgICAgICAgICAgICAgdGhyb3cgYWR2YW5jZWRfb3B0aW9uc191dGlscy5mb3JtYXRFcnJvcihgSW52YWxpZCBvcHRpb24gc2NoZW1hYCwgZXJyb3JzKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgWywgb3BdIG9mIGNvZXJjaW9ucykge1xuICAgICAgICAgICAgICAgIG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2FzY2FkZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29tbWFuZCBzY2hlbWFgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleGl0Q29kZSA9IGF3YWl0IHRoaXMuZXhlY3V0ZSgpO1xuICAgICAgICBpZiAodHlwZW9mIGV4aXRDb2RlICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXRDb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFVzZWQgdG8gZGV0ZWN0IG9wdGlvbiBkZWZpbml0aW9ucy5cbiAqL1xuQ29tbWFuZC5pc09wdGlvbiA9IGFkdmFuY2VkX29wdGlvbnNfdXRpbHMuaXNPcHRpb25TeW1ib2w7XG4vKipcbiAqIEp1c3QgYW4gaGVscGVyIHRvIHVzZSBhbG9uZyB3aXRoIHRoZSBgcGF0aHNgIGZpZWxkcywgdG8gbWFrZSBpdFxuICogY2xlYXJlciB0aGF0IGEgY29tbWFuZCBpcyB0aGUgZGVmYXVsdCBvbmUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNsYXNzIE15Q29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICogICBzdGF0aWMgcGF0aHMgPSBbQ29tbWFuZC5EZWZhdWx0XTtcbiAqIH1cbiAqL1xuQ29tbWFuZC5EZWZhdWx0ID0gW107XG5cbmV4cG9ydHMuQ29tbWFuZCA9IENvbW1hbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIGRlYnVnKHN0cikge1xuICAgIGlmIChjb25zdGFudHMuREVCVUcpIHtcbiAgICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG59XG5jb25zdCBiYXNpY0hlbHBTdGF0ZSA9IHtcbiAgICBjYW5kaWRhdGVVc2FnZTogbnVsbCxcbiAgICByZXF1aXJlZE9wdGlvbnM6IFtdLFxuICAgIGVycm9yTWVzc2FnZTogbnVsbCxcbiAgICBpZ25vcmVPcHRpb25zOiBmYWxzZSxcbiAgICBwYXRoOiBbXSxcbiAgICBwb3NpdGlvbmFsczogW10sXG4gICAgb3B0aW9uczogW10sXG4gICAgcmVtYWluZGVyOiBudWxsLFxuICAgIHNlbGVjdGVkSW5kZXg6IGNvbnN0YW50cy5IRUxQX0NPTU1BTkRfSU5ERVgsXG59O1xuZnVuY3Rpb24gbWFrZVN0YXRlTWFjaGluZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBub2RlczogW21ha2VOb2RlKCksIG1ha2VOb2RlKCksIG1ha2VOb2RlKCldLFxuICAgIH07XG59XG5mdW5jdGlvbiBtYWtlQW55T2ZNYWNoaW5lKGlucHV0cykge1xuICAgIGNvbnN0IG91dHB1dCA9IG1ha2VTdGF0ZU1hY2hpbmUoKTtcbiAgICBjb25zdCBoZWFkcyA9IFtdO1xuICAgIGxldCBvZmZzZXQgPSBvdXRwdXQubm9kZXMubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgaW5wdXQgb2YgaW5wdXRzKSB7XG4gICAgICAgIGhlYWRzLnB1c2gob2Zmc2V0KTtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBpbnB1dC5ub2Rlcy5sZW5ndGg7ICsrdClcbiAgICAgICAgICAgIGlmICghaXNUZXJtaW5hbE5vZGUodCkpXG4gICAgICAgICAgICAgICAgb3V0cHV0Lm5vZGVzLnB1c2goY2xvbmVOb2RlKGlucHV0Lm5vZGVzW3RdLCBvZmZzZXQpKTtcbiAgICAgICAgb2Zmc2V0ICs9IGlucHV0Lm5vZGVzLmxlbmd0aCAtIDI7XG4gICAgfVxuICAgIGZvciAoY29uc3QgaGVhZCBvZiBoZWFkcylcbiAgICAgICAgcmVnaXN0ZXJTaG9ydGN1dChvdXRwdXQsIGNvbnN0YW50cy5OT0RFX0lOSVRJQUwsIGhlYWQpO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5mdW5jdGlvbiBpbmplY3ROb2RlKG1hY2hpbmUsIG5vZGUpIHtcbiAgICBtYWNoaW5lLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgcmV0dXJuIG1hY2hpbmUubm9kZXMubGVuZ3RoIC0gMTtcbn1cbmZ1bmN0aW9uIHNpbXBsaWZ5TWFjaGluZShpbnB1dCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgcHJvY2VzcyA9IChub2RlKSA9PiB7XG4gICAgICAgIGlmICh2aXNpdGVkLmhhcyhub2RlKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmlzaXRlZC5hZGQobm9kZSk7XG4gICAgICAgIGNvbnN0IG5vZGVEZWYgPSBpbnB1dC5ub2Rlc1tub2RlXTtcbiAgICAgICAgZm9yIChjb25zdCB0cmFuc2l0aW9ucyBvZiBPYmplY3QudmFsdWVzKG5vZGVEZWYuc3RhdGljcykpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgdG8gfSBvZiB0cmFuc2l0aW9ucylcbiAgICAgICAgICAgICAgICBwcm9jZXNzKHRvKTtcbiAgICAgICAgZm9yIChjb25zdCBbLCB7IHRvIH1dIG9mIG5vZGVEZWYuZHluYW1pY3MpXG4gICAgICAgICAgICBwcm9jZXNzKHRvKTtcbiAgICAgICAgZm9yIChjb25zdCB7IHRvIH0gb2Ygbm9kZURlZi5zaG9ydGN1dHMpXG4gICAgICAgICAgICBwcm9jZXNzKHRvKTtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXRzID0gbmV3IFNldChub2RlRGVmLnNob3J0Y3V0cy5tYXAoKHsgdG8gfSkgPT4gdG8pKTtcbiAgICAgICAgd2hpbGUgKG5vZGVEZWYuc2hvcnRjdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdG8gfSA9IG5vZGVEZWYuc2hvcnRjdXRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBjb25zdCB0b0RlZiA9IGlucHV0Lm5vZGVzW3RvXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW3NlZ21lbnQsIHRyYW5zaXRpb25zXSBvZiBPYmplY3QuZW50cmllcyh0b0RlZi5zdGF0aWNzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlRGVmLnN0YXRpY3MsIHNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICAgID8gbm9kZURlZi5zdGF0aWNzW3NlZ21lbnRdID0gW11cbiAgICAgICAgICAgICAgICAgICAgOiBub2RlRGVmLnN0YXRpY3Nbc2VnbWVudF07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0cmFuc2l0aW9uIG9mIHRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RvcmUuc29tZSgoeyB0byB9KSA9PiB0cmFuc2l0aW9uLnRvID09PSB0bykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLnB1c2godHJhbnNpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFt0ZXN0LCB0cmFuc2l0aW9uXSBvZiB0b0RlZi5keW5hbWljcylcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGVEZWYuZHluYW1pY3Muc29tZSgoW290aGVyVGVzdCwgeyB0byB9XSkgPT4gdGVzdCA9PT0gb3RoZXJUZXN0ICYmIHRyYW5zaXRpb24udG8gPT09IHRvKSlcbiAgICAgICAgICAgICAgICAgICAgbm9kZURlZi5keW5hbWljcy5wdXNoKFt0ZXN0LCB0cmFuc2l0aW9uXSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyYW5zaXRpb24gb2YgdG9EZWYuc2hvcnRjdXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzaG9ydGN1dHMuaGFzKHRyYW5zaXRpb24udG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVEZWYuc2hvcnRjdXRzLnB1c2godHJhbnNpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0cy5hZGQodHJhbnNpdGlvbi50byk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBwcm9jZXNzKGNvbnN0YW50cy5OT0RFX0lOSVRJQUwpO1xufVxuZnVuY3Rpb24gZGVidWdNYWNoaW5lKG1hY2hpbmUsIHsgcHJlZml4ID0gYGAgfSA9IHt9KSB7XG4gICAgLy8gRG9uJ3QgaXRlcmF0ZSB1bmxlc3MgaXQncyBuZWVkZWRcbiAgICBpZiAoY29uc3RhbnRzLkRFQlVHKSB7XG4gICAgICAgIGRlYnVnKGAke3ByZWZpeH1Ob2RlcyBhcmU6YCk7XG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgbWFjaGluZS5ub2Rlcy5sZW5ndGg7ICsrdCkge1xuICAgICAgICAgICAgZGVidWcoYCR7cHJlZml4fSAgJHt0fTogJHtKU09OLnN0cmluZ2lmeShtYWNoaW5lLm5vZGVzW3RdKX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHJ1bk1hY2hpbmVJbnRlcm5hbChtYWNoaW5lLCBpbnB1dCwgcGFydGlhbCA9IGZhbHNlKSB7XG4gICAgZGVidWcoYFJ1bm5pbmcgYSB2bSBvbiAke0pTT04uc3RyaW5naWZ5KGlucHV0KX1gKTtcbiAgICBsZXQgYnJhbmNoZXMgPSBbeyBub2RlOiBjb25zdGFudHMuTk9ERV9JTklUSUFMLCBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZVVzYWdlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkT3B0aW9uczogW10sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBudWxsLFxuICAgICAgICAgICAgICAgIGlnbm9yZU9wdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICAgICAgICAgIHBhdGg6IFtdLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uYWxzOiBbXSxcbiAgICAgICAgICAgICAgICByZW1haW5kZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogbnVsbCxcbiAgICAgICAgICAgIH0gfV07XG4gICAgZGVidWdNYWNoaW5lKG1hY2hpbmUsIHsgcHJlZml4OiBgICBgIH0pO1xuICAgIGNvbnN0IHRva2VucyA9IFtjb25zdGFudHMuU1RBUlRfT0ZfSU5QVVQsIC4uLmlucHV0XTtcbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRva2Vucy5sZW5ndGg7ICsrdCkge1xuICAgICAgICBjb25zdCBzZWdtZW50ID0gdG9rZW5zW3RdO1xuICAgICAgICBkZWJ1ZyhgICBQcm9jZXNzaW5nICR7SlNPTi5zdHJpbmdpZnkoc2VnbWVudCl9YCk7XG4gICAgICAgIGNvbnN0IG5leHRCcmFuY2hlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHsgbm9kZSwgc3RhdGUgfSBvZiBicmFuY2hlcykge1xuICAgICAgICAgICAgZGVidWcoYCAgICBDdXJyZW50IG5vZGUgaXMgJHtub2RlfWApO1xuICAgICAgICAgICAgY29uc3Qgbm9kZURlZiA9IG1hY2hpbmUubm9kZXNbbm9kZV07XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gY29uc3RhbnRzLk5PREVfRVJST1JFRCkge1xuICAgICAgICAgICAgICAgIG5leHRCcmFuY2hlcy5wdXNoKHsgbm9kZSwgc3RhdGUgfSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChub2RlRGVmLnNob3J0Y3V0cy5sZW5ndGggPT09IDAsIGBTaG9ydGN1dHMgc2hvdWxkIGhhdmUgYmVlbiBlbGltaW5hdGVkIGJ5IG5vd2ApO1xuICAgICAgICAgICAgY29uc3QgaGFzRXhhY3RNYXRjaCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlRGVmLnN0YXRpY3MsIHNlZ21lbnQpO1xuICAgICAgICAgICAgaWYgKCFwYXJ0aWFsIHx8IHQgPCB0b2tlbnMubGVuZ3RoIC0gMSB8fCBoYXNFeGFjdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0V4YWN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNpdGlvbnMgPSBub2RlRGVmLnN0YXRpY3Nbc2VnbWVudF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyB0bywgcmVkdWNlciB9IG9mIHRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QnJhbmNoZXMucHVzaCh7IG5vZGU6IHRvLCBzdGF0ZTogdHlwZW9mIHJlZHVjZXIgIT09IGB1bmRlZmluZWRgID8gZXhlY3V0ZShyZWR1Y2VycywgcmVkdWNlciwgc3RhdGUsIHNlZ21lbnQpIDogc3RhdGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhgICAgICAgU3RhdGljIHRyYW5zaXRpb24gdG8gJHt0b30gZm91bmRgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoYCAgICAgIE5vIHN0YXRpYyB0cmFuc2l0aW9uIGZvdW5kYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGhhc01hdGNoZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBPYmplY3Qua2V5cyhub2RlRGVmLnN0YXRpY3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuZGlkYXRlLnN0YXJ0c1dpdGgoc2VnbWVudCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09IGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IHRvLCByZWR1Y2VyIH0gb2Ygbm9kZURlZi5zdGF0aWNzW2NhbmRpZGF0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0QnJhbmNoZXMucHVzaCh7IG5vZGU6IHRvLCBzdGF0ZTogdHlwZW9mIHJlZHVjZXIgIT09IGB1bmRlZmluZWRgID8gZXhlY3V0ZShyZWR1Y2VycywgcmVkdWNlciwgc3RhdGUsIHNlZ21lbnQpIDogc3RhdGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoYCAgICAgIFN0YXRpYyB0cmFuc2l0aW9uIHRvICR7dG99IGZvdW5kYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgdG8gfSBvZiBub2RlRGVmLnN0YXRpY3NbY2FuZGlkYXRlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRCcmFuY2hlcy5wdXNoKHsgbm9kZTogdG8sIHN0YXRlOiB7IC4uLnN0YXRlLCByZW1haW5kZXI6IGNhbmRpZGF0ZS5zbGljZShzZWdtZW50Lmxlbmd0aCkgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhgICAgICAgU3RhdGljIHRyYW5zaXRpb24gdG8gJHt0b30gZm91bmQgKHBhcnRpYWwgbWF0Y2gpYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaGFzTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhgICAgICAgTm8gcGFydGlhbCBzdGF0aWMgdHJhbnNpdGlvbiBmb3VuZGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWdtZW50ICE9PSBjb25zdGFudHMuRU5EX09GX0lOUFVUKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbdGVzdCwgeyB0bywgcmVkdWNlciB9XSBvZiBub2RlRGVmLmR5bmFtaWNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGVjdXRlKHRlc3RzLCB0ZXN0LCBzdGF0ZSwgc2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRCcmFuY2hlcy5wdXNoKHsgbm9kZTogdG8sIHN0YXRlOiB0eXBlb2YgcmVkdWNlciAhPT0gYHVuZGVmaW5lZGAgPyBleGVjdXRlKHJlZHVjZXJzLCByZWR1Y2VyLCBzdGF0ZSwgc2VnbWVudCkgOiBzdGF0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKGAgICAgICBEeW5hbWljIHRyYW5zaXRpb24gdG8gJHt0b30gZm91bmQgKHZpYSAke3Rlc3R9KWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0QnJhbmNoZXMubGVuZ3RoID09PSAwICYmIHNlZ21lbnQgPT09IGNvbnN0YW50cy5FTkRfT0ZfSU5QVVQgJiYgaW5wdXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogY29uc3RhbnRzLk5PREVfSU5JVElBTCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IGJhc2ljSGVscFN0YXRlLFxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0QnJhbmNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25TeW50YXhFcnJvcihpbnB1dCwgYnJhbmNoZXMuZmlsdGVyKCh7IG5vZGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlICE9PSBjb25zdGFudHMuTk9ERV9FUlJPUkVEO1xuICAgICAgICAgICAgfSkubWFwKCh7IHN0YXRlIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB1c2FnZTogc3RhdGUuY2FuZGlkYXRlVXNhZ2UsIHJlYXNvbjogbnVsbCB9O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0QnJhbmNoZXMuZXZlcnkoKHsgbm9kZSB9KSA9PiBub2RlID09PSBjb25zdGFudHMuTk9ERV9FUlJPUkVEKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duU3ludGF4RXJyb3IoaW5wdXQsIG5leHRCcmFuY2hlcy5tYXAoKHsgc3RhdGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHVzYWdlOiBzdGF0ZS5jYW5kaWRhdGVVc2FnZSwgcmVhc29uOiBzdGF0ZS5lcnJvck1lc3NhZ2UgfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBicmFuY2hlcyA9IHRyaW1TbWFsbGVyQnJhbmNoZXMobmV4dEJyYW5jaGVzKTtcbiAgICB9XG4gICAgaWYgKGJyYW5jaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGVidWcoYCAgUmVzdWx0czpgKTtcbiAgICAgICAgZm9yIChjb25zdCBicmFuY2ggb2YgYnJhbmNoZXMpIHtcbiAgICAgICAgICAgIGRlYnVnKGAgICAgLSAke2JyYW5jaC5ub2RlfSAtPiAke0pTT04uc3RyaW5naWZ5KGJyYW5jaC5zdGF0ZSl9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlYnVnKGAgIE5vIHJlc3VsdHNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGJyYW5jaGVzO1xufVxuZnVuY3Rpb24gY2hlY2tJZk5vZGVJc0ZpbmlzaGVkKG5vZGUsIHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnNlbGVjdGVkSW5kZXggIT09IG51bGwpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobm9kZS5zdGF0aWNzLCBjb25zdGFudHMuRU5EX09GX0lOUFVUKSlcbiAgICAgICAgZm9yIChjb25zdCB7IHRvIH0gb2Ygbm9kZS5zdGF0aWNzW2NvbnN0YW50cy5FTkRfT0ZfSU5QVVRdKVxuICAgICAgICAgICAgaWYgKHRvID09PSBjb25zdGFudHMuTk9ERV9TVUNDRVNTKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHN1Z2dlc3RNYWNoaW5lKG1hY2hpbmUsIGlucHV0LCBwYXJ0aWFsKSB7XG4gICAgLy8gSWYgd2UncmUgYWNjZXB0aW5nIHBhcnRpYWwgbWF0Y2hlcywgdGhlbiBleGFjdCBtYXRjaGVzIG5lZWQgdG8gYmVcbiAgICAvLyBwcmVmaXhlZCB3aXRoIGFuIGV4dHJhIHNwYWNlLlxuICAgIGNvbnN0IHByZWZpeCA9IHBhcnRpYWwgJiYgaW5wdXQubGVuZ3RoID4gMCA/IFtgYF0gOiBbXTtcbiAgICBjb25zdCBicmFuY2hlcyA9IHJ1bk1hY2hpbmVJbnRlcm5hbChtYWNoaW5lLCBpbnB1dCwgcGFydGlhbCk7XG4gICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICBjb25zdCBzdWdnZXN0aW9uc0pzb24gPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgdHJhdmVyc2VTdWdnZXN0aW9uID0gKHN1Z2dlc3Rpb24sIG5vZGUsIHNraXBGaXJzdCA9IHRydWUpID0+IHtcbiAgICAgICAgbGV0IG5leHROb2RlcyA9IFtub2RlXTtcbiAgICAgICAgd2hpbGUgKG5leHROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Tm9kZXMgPSBuZXh0Tm9kZXM7XG4gICAgICAgICAgICBuZXh0Tm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBjdXJyZW50Tm9kZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlRGVmID0gbWFjaGluZS5ub2Rlc1tub2RlXTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobm9kZURlZi5zdGF0aWNzKTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmFjdCB0aGF0IGBrZXlgIGlzIHVudXNlZCBpcyBsaWtlbHkgYSBidWcsIGJ1dCBubyBvbmUgaGFzIGludmVzdGlnYXRlZCBpdCB5ZXQuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogSW52ZXN0aWdhdGUgaXQuXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG5vZGVEZWYuc3RhdGljcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyB0bywgcmVkdWNlciB9IG9mIG5vZGVEZWYuc3RhdGljc1tzZWdtZW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZHVjZXIgIT09IGBwdXNoUGF0aGApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNraXBGaXJzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZXMucHVzaCh0byk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBza2lwRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoc3VnZ2VzdGlvbik7XG4gICAgICAgIGlmIChzdWdnZXN0aW9uc0pzb24uaGFzKGpzb24pKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHN1Z2dlc3Rpb24pO1xuICAgICAgICBzdWdnZXN0aW9uc0pzb24uYWRkKGpzb24pO1xuICAgIH07XG4gICAgZm9yIChjb25zdCB7IG5vZGUsIHN0YXRlIH0gb2YgYnJhbmNoZXMpIHtcbiAgICAgICAgaWYgKHN0YXRlLnJlbWFpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdHJhdmVyc2VTdWdnZXN0aW9uKFtzdGF0ZS5yZW1haW5kZXJdLCBub2RlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGVEZWYgPSBtYWNoaW5lLm5vZGVzW25vZGVdO1xuICAgICAgICBjb25zdCBpc0ZpbmlzaGVkID0gY2hlY2tJZk5vZGVJc0ZpbmlzaGVkKG5vZGVEZWYsIHN0YXRlKTtcbiAgICAgICAgZm9yIChjb25zdCBbY2FuZGlkYXRlLCB0cmFuc2l0aW9uc10gb2YgT2JqZWN0LmVudHJpZXMobm9kZURlZi5zdGF0aWNzKSlcbiAgICAgICAgICAgIGlmICgoaXNGaW5pc2hlZCAmJiBjYW5kaWRhdGUgIT09IGNvbnN0YW50cy5FTkRfT0ZfSU5QVVQpIHx8ICghY2FuZGlkYXRlLnN0YXJ0c1dpdGgoYC1gKSAmJiB0cmFuc2l0aW9ucy5zb21lKCh7IHJlZHVjZXIgfSkgPT4gcmVkdWNlciA9PT0gYHB1c2hQYXRoYCkpKVxuICAgICAgICAgICAgICAgIHRyYXZlcnNlU3VnZ2VzdGlvbihbLi4ucHJlZml4LCBjYW5kaWRhdGVdLCBub2RlKTtcbiAgICAgICAgaWYgKCFpc0ZpbmlzaGVkKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGZvciAoY29uc3QgW3Rlc3QsIHsgdG8gfV0gb2Ygbm9kZURlZi5keW5hbWljcykge1xuICAgICAgICAgICAgaWYgKHRvID09PSBjb25zdGFudHMuTk9ERV9FUlJPUkVEKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgdG9rZW5zID0gc3VnZ2VzdCh0ZXN0LCBzdGF0ZSk7XG4gICAgICAgICAgICBpZiAodG9rZW5zID09PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICB0cmF2ZXJzZVN1Z2dlc3Rpb24oWy4uLnByZWZpeCwgdG9rZW5dLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWy4uLnN1Z2dlc3Rpb25zXS5zb3J0KCk7XG59XG5mdW5jdGlvbiBydW5NYWNoaW5lKG1hY2hpbmUsIGlucHV0KSB7XG4gICAgY29uc3QgYnJhbmNoZXMgPSBydW5NYWNoaW5lSW50ZXJuYWwobWFjaGluZSwgWy4uLmlucHV0LCBjb25zdGFudHMuRU5EX09GX0lOUFVUXSk7XG4gICAgcmV0dXJuIHNlbGVjdEJlc3RTdGF0ZShpbnB1dCwgYnJhbmNoZXMubWFwKCh7IHN0YXRlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIHRyaW1TbWFsbGVyQnJhbmNoZXMoYnJhbmNoZXMpIHtcbiAgICBsZXQgbWF4UGF0aFNpemUgPSAwO1xuICAgIGZvciAoY29uc3QgeyBzdGF0ZSB9IG9mIGJyYW5jaGVzKVxuICAgICAgICBpZiAoc3RhdGUucGF0aC5sZW5ndGggPiBtYXhQYXRoU2l6ZSlcbiAgICAgICAgICAgIG1heFBhdGhTaXplID0gc3RhdGUucGF0aC5sZW5ndGg7XG4gICAgcmV0dXJuIGJyYW5jaGVzLmZpbHRlcigoeyBzdGF0ZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5wYXRoLmxlbmd0aCA9PT0gbWF4UGF0aFNpemU7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZWxlY3RCZXN0U3RhdGUoaW5wdXQsIHN0YXRlcykge1xuICAgIGNvbnN0IHRlcm1pbmFsU3RhdGVzID0gc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5zZWxlY3RlZEluZGV4ICE9PSBudWxsO1xuICAgIH0pO1xuICAgIGlmICh0ZXJtaW5hbFN0YXRlcy5sZW5ndGggPT09IDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGNvbnN0IHJlcXVpcmVkT3B0aW9uc1NldFN0YXRlcyA9IHRlcm1pbmFsU3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5yZXF1aXJlZE9wdGlvbnMuZXZlcnkobmFtZXMgPT4gbmFtZXMuc29tZShuYW1lID0+IHN0YXRlLm9wdGlvbnMuZmluZChvcHQgPT4gb3B0Lm5hbWUgPT09IG5hbWUpKSkpO1xuICAgIGlmIChyZXF1aXJlZE9wdGlvbnNTZXRTdGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93blN5bnRheEVycm9yKGlucHV0LCB0ZXJtaW5hbFN0YXRlcy5tYXAoc3RhdGUgPT4gKHtcbiAgICAgICAgICAgIHVzYWdlOiBzdGF0ZS5jYW5kaWRhdGVVc2FnZSxcbiAgICAgICAgICAgIHJlYXNvbjogbnVsbCxcbiAgICAgICAgfSkpKTtcbiAgICB9XG4gICAgbGV0IG1heFBhdGhTaXplID0gMDtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIHJlcXVpcmVkT3B0aW9uc1NldFN0YXRlcylcbiAgICAgICAgaWYgKHN0YXRlLnBhdGgubGVuZ3RoID4gbWF4UGF0aFNpemUpXG4gICAgICAgICAgICBtYXhQYXRoU2l6ZSA9IHN0YXRlLnBhdGgubGVuZ3RoO1xuICAgIGNvbnN0IGJlc3RQYXRoQnJhbmNoZXMgPSByZXF1aXJlZE9wdGlvbnNTZXRTdGF0ZXMuZmlsdGVyKHN0YXRlID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnBhdGgubGVuZ3RoID09PSBtYXhQYXRoU2l6ZTtcbiAgICB9KTtcbiAgICBjb25zdCBnZXRQb3NpdGlvbmFsQ291bnQgPSAoc3RhdGUpID0+IHN0YXRlLnBvc2l0aW9uYWxzLmZpbHRlcigoeyBleHRyYSB9KSA9PiB7XG4gICAgICAgIHJldHVybiAhZXh0cmE7XG4gICAgfSkubGVuZ3RoICsgc3RhdGUub3B0aW9ucy5sZW5ndGg7XG4gICAgY29uc3Qgc3RhdGVzV2l0aFBvc2l0aW9uYWxDb3VudCA9IGJlc3RQYXRoQnJhbmNoZXMubWFwKHN0YXRlID0+IHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdGUsIHBvc2l0aW9uYWxDb3VudDogZ2V0UG9zaXRpb25hbENvdW50KHN0YXRlKSB9O1xuICAgIH0pO1xuICAgIGxldCBtYXhQb3NpdGlvbmFsQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgeyBwb3NpdGlvbmFsQ291bnQgfSBvZiBzdGF0ZXNXaXRoUG9zaXRpb25hbENvdW50KVxuICAgICAgICBpZiAocG9zaXRpb25hbENvdW50ID4gbWF4UG9zaXRpb25hbENvdW50KVxuICAgICAgICAgICAgbWF4UG9zaXRpb25hbENvdW50ID0gcG9zaXRpb25hbENvdW50O1xuICAgIGNvbnN0IGJlc3RQb3NpdGlvbmFsU3RhdGVzID0gc3RhdGVzV2l0aFBvc2l0aW9uYWxDb3VudC5maWx0ZXIoKHsgcG9zaXRpb25hbENvdW50IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uYWxDb3VudCA9PT0gbWF4UG9zaXRpb25hbENvdW50O1xuICAgIH0pLm1hcCgoeyBzdGF0ZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcbiAgICBjb25zdCBmaXhlZFN0YXRlcyA9IGFnZ3JlZ2F0ZUhlbHBTdGF0ZXMoYmVzdFBvc2l0aW9uYWxTdGF0ZXMpO1xuICAgIGlmIChmaXhlZFN0YXRlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLkFtYmlndW91c1N5bnRheEVycm9yKGlucHV0LCBmaXhlZFN0YXRlcy5tYXAoc3RhdGUgPT4gc3RhdGUuY2FuZGlkYXRlVXNhZ2UpKTtcbiAgICByZXR1cm4gZml4ZWRTdGF0ZXNbMF07XG59XG5mdW5jdGlvbiBhZ2dyZWdhdGVIZWxwU3RhdGVzKHN0YXRlcykge1xuICAgIGNvbnN0IG5vdEhlbHBzID0gW107XG4gICAgY29uc3QgaGVscHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIHN0YXRlcykge1xuICAgICAgICBpZiAoc3RhdGUuc2VsZWN0ZWRJbmRleCA9PT0gY29uc3RhbnRzLkhFTFBfQ09NTUFORF9JTkRFWCkge1xuICAgICAgICAgICAgaGVscHMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub3RIZWxwcy5wdXNoKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGVscHMubGVuZ3RoID4gMCkge1xuICAgICAgICBub3RIZWxwcy5wdXNoKHtcbiAgICAgICAgICAgIC4uLmJhc2ljSGVscFN0YXRlLFxuICAgICAgICAgICAgcGF0aDogZmluZENvbW1vblByZWZpeCguLi5oZWxwcy5tYXAoc3RhdGUgPT4gc3RhdGUucGF0aCkpLFxuICAgICAgICAgICAgb3B0aW9uczogaGVscHMucmVkdWNlKChvcHRpb25zLCBzdGF0ZSkgPT4gb3B0aW9ucy5jb25jYXQoc3RhdGUub3B0aW9ucyksIFtdKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBub3RIZWxwcztcbn1cbmZ1bmN0aW9uIGZpbmRDb21tb25QcmVmaXgoZmlyc3RQYXRoLCBzZWNvbmRQYXRoLCAuLi5yZXN0KSB7XG4gICAgaWYgKHNlY29uZFBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZmlyc3RQYXRoKTtcbiAgICByZXR1cm4gZmluZENvbW1vblByZWZpeChmaXJzdFBhdGguZmlsdGVyKChzZWdtZW50LCBpKSA9PiBzZWdtZW50ID09PSBzZWNvbmRQYXRoW2ldKSwgLi4ucmVzdCk7XG59XG5mdW5jdGlvbiBtYWtlTm9kZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkeW5hbWljczogW10sXG4gICAgICAgIHNob3J0Y3V0czogW10sXG4gICAgICAgIHN0YXRpY3M6IHt9LFxuICAgIH07XG59XG5mdW5jdGlvbiBpc1Rlcm1pbmFsTm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IGNvbnN0YW50cy5OT0RFX1NVQ0NFU1MgfHwgbm9kZSA9PT0gY29uc3RhbnRzLk5PREVfRVJST1JFRDtcbn1cbmZ1bmN0aW9uIGNsb25lVHJhbnNpdGlvbihpbnB1dCwgb2Zmc2V0ID0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvOiAhaXNUZXJtaW5hbE5vZGUoaW5wdXQudG8pID8gaW5wdXQudG8gPiAyID8gaW5wdXQudG8gKyBvZmZzZXQgLSAyIDogaW5wdXQudG8gKyBvZmZzZXQgOiBpbnB1dC50byxcbiAgICAgICAgcmVkdWNlcjogaW5wdXQucmVkdWNlcixcbiAgICB9O1xufVxuZnVuY3Rpb24gY2xvbmVOb2RlKGlucHV0LCBvZmZzZXQgPSAwKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gbWFrZU5vZGUoKTtcbiAgICBmb3IgKGNvbnN0IFt0ZXN0LCB0cmFuc2l0aW9uXSBvZiBpbnB1dC5keW5hbWljcylcbiAgICAgICAgb3V0cHV0LmR5bmFtaWNzLnB1c2goW3Rlc3QsIGNsb25lVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBvZmZzZXQpXSk7XG4gICAgZm9yIChjb25zdCB0cmFuc2l0aW9uIG9mIGlucHV0LnNob3J0Y3V0cylcbiAgICAgICAgb3V0cHV0LnNob3J0Y3V0cy5wdXNoKGNsb25lVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBvZmZzZXQpKTtcbiAgICBmb3IgKGNvbnN0IFtzZWdtZW50LCB0cmFuc2l0aW9uc10gb2YgT2JqZWN0LmVudHJpZXMoaW5wdXQuc3RhdGljcykpXG4gICAgICAgIG91dHB1dC5zdGF0aWNzW3NlZ21lbnRdID0gdHJhbnNpdGlvbnMubWFwKHRyYW5zaXRpb24gPT4gY2xvbmVUcmFuc2l0aW9uKHRyYW5zaXRpb24sIG9mZnNldCkpO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5mdW5jdGlvbiByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgZnJvbSwgdGVzdCwgdG8sIHJlZHVjZXIpIHtcbiAgICBtYWNoaW5lLm5vZGVzW2Zyb21dLmR5bmFtaWNzLnB1c2goW1xuICAgICAgICB0ZXN0LFxuICAgICAgICB7IHRvLCByZWR1Y2VyOiByZWR1Y2VyIH0sXG4gICAgXSk7XG59XG5mdW5jdGlvbiByZWdpc3RlclNob3J0Y3V0KG1hY2hpbmUsIGZyb20sIHRvLCByZWR1Y2VyKSB7XG4gICAgbWFjaGluZS5ub2Rlc1tmcm9tXS5zaG9ydGN1dHMucHVzaCh7IHRvLCByZWR1Y2VyOiByZWR1Y2VyIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJTdGF0aWMobWFjaGluZSwgZnJvbSwgdGVzdCwgdG8sIHJlZHVjZXIpIHtcbiAgICBjb25zdCBzdG9yZSA9ICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWFjaGluZS5ub2Rlc1tmcm9tXS5zdGF0aWNzLCB0ZXN0KVxuICAgICAgICA/IG1hY2hpbmUubm9kZXNbZnJvbV0uc3RhdGljc1t0ZXN0XSA9IFtdXG4gICAgICAgIDogbWFjaGluZS5ub2Rlc1tmcm9tXS5zdGF0aWNzW3Rlc3RdO1xuICAgIHN0b3JlLnB1c2goeyB0bywgcmVkdWNlcjogcmVkdWNlciB9KTtcbn1cbmZ1bmN0aW9uIGV4ZWN1dGUoc3RvcmUsIGNhbGxiYWNrLCBzdGF0ZSwgc2VnbWVudCkge1xuICAgIC8vIFR5cGVTY3JpcHQncyBjb250cm9sIGZsb3cgY2FuJ3QgcHJvcGVybHkgbmFycm93XG4gICAgLy8gZ2VuZXJpYyBjb25kaXRpb25hbHMgZm9yIHNvbWUgbXlzdGVyaW91cyByZWFzb25cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjYWxsYmFjaykpIHtcbiAgICAgICAgY29uc3QgW25hbWUsIC4uLmFyZ3NdID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiBzdG9yZVtuYW1lXShzdGF0ZSwgc2VnbWVudCwgLi4uYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RvcmVbY2FsbGJhY2tdKHN0YXRlLCBzZWdtZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWdnZXN0KGNhbGxiYWNrLCBzdGF0ZSkge1xuICAgIGNvbnN0IGZuID0gQXJyYXkuaXNBcnJheShjYWxsYmFjaylcbiAgICAgICAgPyB0ZXN0c1tjYWxsYmFja1swXV1cbiAgICAgICAgOiB0ZXN0c1tjYWxsYmFja107XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0eXBlb2YgZm4uc3VnZ2VzdCA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5pc0FycmF5KGNhbGxiYWNrKVxuICAgICAgICA/IGNhbGxiYWNrLnNsaWNlKDEpXG4gICAgICAgIDogW107XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBmbi5zdWdnZXN0KHN0YXRlLCAuLi5hcmdzKTtcbn1cbmNvbnN0IHRlc3RzID0ge1xuICAgIGFsd2F5czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGlzT3B0aW9uTGlrZTogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAhc3RhdGUuaWdub3JlT3B0aW9ucyAmJiAoc2VnbWVudCAhPT0gYC1gICYmIHNlZ21lbnQuc3RhcnRzV2l0aChgLWApKTtcbiAgICB9LFxuICAgIGlzTm90T3B0aW9uTGlrZTogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5pZ25vcmVPcHRpb25zIHx8IHNlZ21lbnQgPT09IGAtYCB8fCAhc2VnbWVudC5zdGFydHNXaXRoKGAtYCk7XG4gICAgfSxcbiAgICBpc09wdGlvbjogKHN0YXRlLCBzZWdtZW50LCBuYW1lLCBoaWRkZW4pID0+IHtcbiAgICAgICAgcmV0dXJuICFzdGF0ZS5pZ25vcmVPcHRpb25zICYmIHNlZ21lbnQgPT09IG5hbWU7XG4gICAgfSxcbiAgICBpc0JhdGNoT3B0aW9uOiAoc3RhdGUsIHNlZ21lbnQsIG5hbWVzKSA9PiB7XG4gICAgICAgIHJldHVybiAhc3RhdGUuaWdub3JlT3B0aW9ucyAmJiBjb25zdGFudHMuQkFUQ0hfUkVHRVgudGVzdChzZWdtZW50KSAmJiBbLi4uc2VnbWVudC5zbGljZSgxKV0uZXZlcnkobmFtZSA9PiBuYW1lcy5pbmNsdWRlcyhgLSR7bmFtZX1gKSk7XG4gICAgfSxcbiAgICBpc0JvdW5kT3B0aW9uOiAoc3RhdGUsIHNlZ21lbnQsIG5hbWVzLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvblBhcnNpbmcgPSBzZWdtZW50Lm1hdGNoKGNvbnN0YW50cy5CSU5ESU5HX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuICFzdGF0ZS5pZ25vcmVPcHRpb25zICYmICEhb3B0aW9uUGFyc2luZyAmJiBjb25zdGFudHMuT1BUSU9OX1JFR0VYLnRlc3Qob3B0aW9uUGFyc2luZ1sxXSkgJiYgbmFtZXMuaW5jbHVkZXMob3B0aW9uUGFyc2luZ1sxXSlcbiAgICAgICAgICAgIC8vIERpc2FsbG93IGJvdW5kIG9wdGlvbnMgd2l0aCBubyBhcmd1bWVudHMgKGkuZS4gYm9vbGVhbnMpXG4gICAgICAgICAgICAmJiBvcHRpb25zLmZpbHRlcihvcHQgPT4gb3B0Lm5hbWVzLmluY2x1ZGVzKG9wdGlvblBhcnNpbmdbMV0pKS5ldmVyeShvcHQgPT4gb3B0LmFsbG93QmluZGluZyk7XG4gICAgfSxcbiAgICBpc05lZ2F0ZWRPcHRpb246IChzdGF0ZSwgc2VnbWVudCwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gIXN0YXRlLmlnbm9yZU9wdGlvbnMgJiYgc2VnbWVudCA9PT0gYC0tbm8tJHtuYW1lLnNsaWNlKDIpfWA7XG4gICAgfSxcbiAgICBpc0hlbHA6IChzdGF0ZSwgc2VnbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gIXN0YXRlLmlnbm9yZU9wdGlvbnMgJiYgY29uc3RhbnRzLkhFTFBfUkVHRVgudGVzdChzZWdtZW50KTtcbiAgICB9LFxuICAgIGlzVW5zdXBwb3J0ZWRPcHRpb246IChzdGF0ZSwgc2VnbWVudCwgbmFtZXMpID0+IHtcbiAgICAgICAgcmV0dXJuICFzdGF0ZS5pZ25vcmVPcHRpb25zICYmIHNlZ21lbnQuc3RhcnRzV2l0aChgLWApICYmIGNvbnN0YW50cy5PUFRJT05fUkVHRVgudGVzdChzZWdtZW50KSAmJiAhbmFtZXMuaW5jbHVkZXMoc2VnbWVudCk7XG4gICAgfSxcbiAgICBpc0ludmFsaWRPcHRpb246IChzdGF0ZSwgc2VnbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gIXN0YXRlLmlnbm9yZU9wdGlvbnMgJiYgc2VnbWVudC5zdGFydHNXaXRoKGAtYCkgJiYgIWNvbnN0YW50cy5PUFRJT05fUkVHRVgudGVzdChzZWdtZW50KTtcbiAgICB9LFxufTtcbi8vIEB0cy1pZ25vcmVcbnRlc3RzLmlzT3B0aW9uLnN1Z2dlc3QgPSAoc3RhdGUsIG5hbWUsIGhpZGRlbiA9IHRydWUpID0+IHtcbiAgICByZXR1cm4gIWhpZGRlbiA/IFtuYW1lXSA6IG51bGw7XG59O1xuY29uc3QgcmVkdWNlcnMgPSB7XG4gICAgc2V0Q2FuZGlkYXRlU3RhdGU6IChzdGF0ZSwgc2VnbWVudCwgY2FuZGlkYXRlU3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmNhbmRpZGF0ZVN0YXRlIH07XG4gICAgfSxcbiAgICBzZXRTZWxlY3RlZEluZGV4OiAoc3RhdGUsIHNlZ21lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBzZWxlY3RlZEluZGV4OiBpbmRleCB9O1xuICAgIH0sXG4gICAgcHVzaEJhdGNoOiAoc3RhdGUsIHNlZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIG9wdGlvbnM6IHN0YXRlLm9wdGlvbnMuY29uY2F0KFsuLi5zZWdtZW50LnNsaWNlKDEpXS5tYXAobmFtZSA9PiAoeyBuYW1lOiBgLSR7bmFtZX1gLCB2YWx1ZTogdHJ1ZSB9KSkpIH07XG4gICAgfSxcbiAgICBwdXNoQm91bmQ6IChzdGF0ZSwgc2VnbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBbLCBuYW1lLCB2YWx1ZV0gPSBzZWdtZW50Lm1hdGNoKGNvbnN0YW50cy5CSU5ESU5HX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIG9wdGlvbnM6IHN0YXRlLm9wdGlvbnMuY29uY2F0KHsgbmFtZSwgdmFsdWUgfSkgfTtcbiAgICB9LFxuICAgIHB1c2hQYXRoOiAoc3RhdGUsIHNlZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHBhdGg6IHN0YXRlLnBhdGguY29uY2F0KHNlZ21lbnQpIH07XG4gICAgfSxcbiAgICBwdXNoUG9zaXRpb25hbDogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBwb3NpdGlvbmFsczogc3RhdGUucG9zaXRpb25hbHMuY29uY2F0KHsgdmFsdWU6IHNlZ21lbnQsIGV4dHJhOiBmYWxzZSB9KSB9O1xuICAgIH0sXG4gICAgcHVzaEV4dHJhOiAoc3RhdGUsIHNlZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHBvc2l0aW9uYWxzOiBzdGF0ZS5wb3NpdGlvbmFscy5jb25jYXQoeyB2YWx1ZTogc2VnbWVudCwgZXh0cmE6IHRydWUgfSkgfTtcbiAgICB9LFxuICAgIHB1c2hFeHRyYU5vTGltaXRzOiAoc3RhdGUsIHNlZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHBvc2l0aW9uYWxzOiBzdGF0ZS5wb3NpdGlvbmFscy5jb25jYXQoeyB2YWx1ZTogc2VnbWVudCwgZXh0cmE6IE5vTGltaXRzIH0pIH07XG4gICAgfSxcbiAgICBwdXNoVHJ1ZTogKHN0YXRlLCBzZWdtZW50LCBuYW1lID0gc2VnbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgb3B0aW9uczogc3RhdGUub3B0aW9ucy5jb25jYXQoeyBuYW1lOiBzZWdtZW50LCB2YWx1ZTogdHJ1ZSB9KSB9O1xuICAgIH0sXG4gICAgcHVzaEZhbHNlOiAoc3RhdGUsIHNlZ21lbnQsIG5hbWUgPSBzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBvcHRpb25zOiBzdGF0ZS5vcHRpb25zLmNvbmNhdCh7IG5hbWUsIHZhbHVlOiBmYWxzZSB9KSB9O1xuICAgIH0sXG4gICAgcHVzaFVuZGVmaW5lZDogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBvcHRpb25zOiBzdGF0ZS5vcHRpb25zLmNvbmNhdCh7IG5hbWU6IHNlZ21lbnQsIHZhbHVlOiB1bmRlZmluZWQgfSkgfTtcbiAgICB9LFxuICAgIHB1c2hTdHJpbmdWYWx1ZTogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY29weSA9IHsgLi4uc3RhdGUsIG9wdGlvbnM6IFsuLi5zdGF0ZS5vcHRpb25zXSB9O1xuICAgICAgICBjb25zdCBsYXN0T3B0aW9uID0gc3RhdGUub3B0aW9uc1tzdGF0ZS5vcHRpb25zLmxlbmd0aCAtIDFdO1xuICAgICAgICBsYXN0T3B0aW9uLnZhbHVlID0gKChfYSA9IGxhc3RPcHRpb24udmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKS5jb25jYXQoW3NlZ21lbnRdKTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfSxcbiAgICBzZXRTdHJpbmdWYWx1ZTogKHN0YXRlLCBzZWdtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB7IC4uLnN0YXRlLCBvcHRpb25zOiBbLi4uc3RhdGUub3B0aW9uc10gfTtcbiAgICAgICAgY29uc3QgbGFzdE9wdGlvbiA9IHN0YXRlLm9wdGlvbnNbc3RhdGUub3B0aW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgbGFzdE9wdGlvbi52YWx1ZSA9IHNlZ21lbnQ7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH0sXG4gICAgaW5oaWJhdGVPcHRpb25zOiAoc3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGlnbm9yZU9wdGlvbnM6IHRydWUgfTtcbiAgICB9LFxuICAgIHVzZUhlbHA6IChzdGF0ZSwgc2VnbWVudCwgY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBbLCAvKiBuYW1lICovICwgaW5kZXhdID0gc2VnbWVudC5tYXRjaChjb25zdGFudHMuSEVMUF9SRUdFWCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgb3B0aW9uczogW3sgbmFtZTogYC1jYCwgdmFsdWU6IFN0cmluZyhjb21tYW5kKSB9LCB7IG5hbWU6IGAtaWAsIHZhbHVlOiBpbmRleCB9XSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIG9wdGlvbnM6IFt7IG5hbWU6IGAtY2AsIHZhbHVlOiBTdHJpbmcoY29tbWFuZCkgfV0gfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0RXJyb3I6IChzdGF0ZSwgc2VnbWVudCwgZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChzZWdtZW50ID09PSBjb25zdGFudHMuRU5EX09GX0lOUFVUKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZXJyb3JNZXNzYWdlOiBgJHtlcnJvck1lc3NhZ2V9LmAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBlcnJvck1lc3NhZ2U6IGAke2Vycm9yTWVzc2FnZX0gKFwiJHtzZWdtZW50fVwiKS5gIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldE9wdGlvbkFyaXR5RXJyb3I6IChzdGF0ZSwgc2VnbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBsYXN0T3B0aW9uID0gc3RhdGUub3B0aW9uc1tzdGF0ZS5vcHRpb25zLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZXJyb3JNZXNzYWdlOiBgTm90IGVub3VnaCBhcmd1bWVudHMgdG8gb3B0aW9uICR7bGFzdE9wdGlvbi5uYW1lfS5gIH07XG4gICAgfSxcbn07XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNvbnN0IE5vTGltaXRzID0gU3ltYm9sKCk7XG5jbGFzcyBDb21tYW5kQnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoY2xpSW5kZXgsIGNsaU9wdHMpIHtcbiAgICAgICAgdGhpcy5hbGxPcHRpb25OYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLmFyaXR5ID0geyBsZWFkaW5nOiBbXSwgdHJhaWxpbmc6IFtdLCBleHRyYTogW10sIHByb3h5OiBmYWxzZSB9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgICB0aGlzLmNsaUluZGV4ID0gY2xpSW5kZXg7XG4gICAgICAgIHRoaXMuY2xpT3B0cyA9IGNsaU9wdHM7XG4gICAgfVxuICAgIGFkZFBhdGgocGF0aCkge1xuICAgICAgICB0aGlzLnBhdGhzLnB1c2gocGF0aCk7XG4gICAgfVxuICAgIHNldEFyaXR5KHsgbGVhZGluZyA9IHRoaXMuYXJpdHkubGVhZGluZywgdHJhaWxpbmcgPSB0aGlzLmFyaXR5LnRyYWlsaW5nLCBleHRyYSA9IHRoaXMuYXJpdHkuZXh0cmEsIHByb3h5ID0gdGhpcy5hcml0eS5wcm94eSB9KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5hcml0eSwgeyBsZWFkaW5nLCB0cmFpbGluZywgZXh0cmEsIHByb3h5IH0pO1xuICAgIH1cbiAgICBhZGRQb3NpdGlvbmFsKHsgbmFtZSA9IGBhcmdgLCByZXF1aXJlZCA9IHRydWUgfSA9IHt9KSB7XG4gICAgICAgIGlmICghcmVxdWlyZWQgJiYgdGhpcy5hcml0eS5leHRyYSA9PT0gTm9MaW1pdHMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9wdGlvbmFsIHBhcmFtZXRlcnMgY2Fubm90IGJlIGRlY2xhcmVkIHdoZW4gdXNpbmcgLnJlc3QoKSBvciAucHJveHkoKWApO1xuICAgICAgICBpZiAoIXJlcXVpcmVkICYmIHRoaXMuYXJpdHkudHJhaWxpbmcubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT3B0aW9uYWwgcGFyYW1ldGVycyBjYW5ub3QgYmUgZGVjbGFyZWQgYWZ0ZXIgdGhlIHJlcXVpcmVkIHRyYWlsaW5nIHBvc2l0aW9uYWwgYXJndW1lbnRzYCk7XG4gICAgICAgIGlmICghcmVxdWlyZWQgJiYgdGhpcy5hcml0eS5leHRyYSAhPT0gTm9MaW1pdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYXJpdHkuZXh0cmEucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFyaXR5LmV4dHJhICE9PSBOb0xpbWl0cyAmJiB0aGlzLmFyaXR5LmV4dHJhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hcml0eS5sZWFkaW5nLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFyaXR5LnRyYWlsaW5nLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkUmVzdCh7IG5hbWUgPSBgYXJnYCwgcmVxdWlyZWQgPSAwIH0gPSB7fSkge1xuICAgICAgICBpZiAodGhpcy5hcml0eS5leHRyYSA9PT0gTm9MaW1pdHMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluZmluaXRlIGxpc3RzIGNhbm5vdCBiZSBkZWNsYXJlZCBtdWx0aXBsZSB0aW1lcyBpbiB0aGUgc2FtZSBjb21tYW5kYCk7XG4gICAgICAgIGlmICh0aGlzLmFyaXR5LnRyYWlsaW5nLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluZmluaXRlIGxpc3RzIGNhbm5vdCBiZSBkZWNsYXJlZCBhZnRlciB0aGUgcmVxdWlyZWQgdHJhaWxpbmcgcG9zaXRpb25hbCBhcmd1bWVudHNgKTtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCByZXF1aXJlZDsgKyt0KVxuICAgICAgICAgICAgdGhpcy5hZGRQb3NpdGlvbmFsKHsgbmFtZSB9KTtcbiAgICAgICAgdGhpcy5hcml0eS5leHRyYSA9IE5vTGltaXRzO1xuICAgIH1cbiAgICBhZGRQcm94eSh7IHJlcXVpcmVkID0gMCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5hZGRSZXN0KHsgcmVxdWlyZWQgfSk7XG4gICAgICAgIHRoaXMuYXJpdHkucHJveHkgPSB0cnVlO1xuICAgIH1cbiAgICBhZGRPcHRpb24oeyBuYW1lcywgZGVzY3JpcHRpb24sIGFyaXR5ID0gMCwgaGlkZGVuID0gZmFsc2UsIHJlcXVpcmVkID0gZmFsc2UsIGFsbG93QmluZGluZyA9IHRydWUgfSkge1xuICAgICAgICBpZiAoIWFsbG93QmluZGluZyAmJiBhcml0eSA+IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcml0eSBjYW5ub3QgYmUgaGlnaGVyIHRoYW4gMSB3aGVuIHRoZSBvcHRpb24gb25seSBzdXBwb3J0cyB0aGUgLS1hcmc9dmFsdWUgc3ludGF4YCk7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihhcml0eSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcml0eSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdCAke2FyaXR5fWApO1xuICAgICAgICBpZiAoYXJpdHkgPCAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJpdHkgbXVzdCBiZSBwb3NpdGl2ZSwgZ290ICR7YXJpdHl9YCk7XG4gICAgICAgIHRoaXMuYWxsT3B0aW9uTmFtZXMucHVzaCguLi5uYW1lcyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHsgbmFtZXMsIGRlc2NyaXB0aW9uLCBhcml0eSwgaGlkZGVuLCByZXF1aXJlZCwgYWxsb3dCaW5kaW5nIH0pO1xuICAgIH1cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgdXNhZ2UoeyBkZXRhaWxlZCA9IHRydWUsIGlubGluZU9wdGlvbnMgPSB0cnVlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IFt0aGlzLmNsaU9wdHMuYmluYXJ5TmFtZV07XG4gICAgICAgIGNvbnN0IGRldGFpbGVkT3B0aW9uTGlzdCA9IFtdO1xuICAgICAgICBpZiAodGhpcy5wYXRocy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgc2VnbWVudHMucHVzaCguLi50aGlzLnBhdGhzWzBdKTtcbiAgICAgICAgaWYgKGRldGFpbGVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZXMsIGFyaXR5LCBoaWRkZW4sIGRlc2NyaXB0aW9uLCByZXF1aXJlZCB9IG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChoaWRkZW4pXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IGFyaXR5OyArK3QpXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChgICMke3R9YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IGAke25hbWVzLmpvaW4oYCxgKX0ke2FyZ3Muam9pbihgYCl9YDtcbiAgICAgICAgICAgICAgICBpZiAoIWlubGluZU9wdGlvbnMgJiYgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsZWRPcHRpb25MaXN0LnB1c2goeyBkZWZpbml0aW9uLCBkZXNjcmlwdGlvbiwgcmVxdWlyZWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHJlcXVpcmVkID8gYDwke2RlZmluaXRpb259PmAgOiBgWyR7ZGVmaW5pdGlvbn1dYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VnbWVudHMucHVzaCguLi50aGlzLmFyaXR5LmxlYWRpbmcubWFwKG5hbWUgPT4gYDwke25hbWV9PmApKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFyaXR5LmV4dHJhID09PSBOb0xpbWl0cylcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKGAuLi5gKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKC4uLnRoaXMuYXJpdHkuZXh0cmEubWFwKG5hbWUgPT4gYFske25hbWV9XWApKTtcbiAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goLi4udGhpcy5hcml0eS50cmFpbGluZy5tYXAobmFtZSA9PiBgPCR7bmFtZX0+YCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzYWdlID0gc2VnbWVudHMuam9pbihgIGApO1xuICAgICAgICByZXR1cm4geyB1c2FnZSwgb3B0aW9uczogZGV0YWlsZWRPcHRpb25MaXN0IH07XG4gICAgfVxuICAgIGNvbXBpbGUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZXh0ID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQXNzZXJ0aW9uIGZhaWxlZDogTm8gY29udGV4dCBhdHRhY2hlZGApO1xuICAgICAgICBjb25zdCBtYWNoaW5lID0gbWFrZVN0YXRlTWFjaGluZSgpO1xuICAgICAgICBsZXQgZmlyc3ROb2RlID0gY29uc3RhbnRzLk5PREVfSU5JVElBTDtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlVXNhZ2UgPSB0aGlzLnVzYWdlKCkudXNhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgLmZpbHRlcihvcHQgPT4gb3B0LnJlcXVpcmVkKVxuICAgICAgICAgICAgLm1hcChvcHQgPT4gb3B0Lm5hbWVzKTtcbiAgICAgICAgZmlyc3ROb2RlID0gaW5qZWN0Tm9kZShtYWNoaW5lLCBtYWtlTm9kZSgpKTtcbiAgICAgICAgcmVnaXN0ZXJTdGF0aWMobWFjaGluZSwgY29uc3RhbnRzLk5PREVfSU5JVElBTCwgY29uc3RhbnRzLlNUQVJUX09GX0lOUFVULCBmaXJzdE5vZGUsIFtgc2V0Q2FuZGlkYXRlU3RhdGVgLCB7IGNhbmRpZGF0ZVVzYWdlLCByZXF1aXJlZE9wdGlvbnMgfV0pO1xuICAgICAgICBjb25zdCBwb3NpdGlvbmFsQXJndW1lbnQgPSB0aGlzLmFyaXR5LnByb3h5XG4gICAgICAgICAgICA/IGBhbHdheXNgXG4gICAgICAgICAgICA6IGBpc05vdE9wdGlvbkxpa2VgO1xuICAgICAgICBjb25zdCBwYXRocyA9IHRoaXMucGF0aHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0aGlzLnBhdGhzXG4gICAgICAgICAgICA6IFtbXV07XG4gICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuICAgICAgICAgICAgbGV0IGxhc3RQYXRoTm9kZSA9IGZpcnN0Tm9kZTtcbiAgICAgICAgICAgIC8vIFdlIGFsbG93IG9wdGlvbnMgdG8gYmUgc3BlY2lmaWVkIGJlZm9yZSB0aGUgcGF0aC4gTm90ZSB0aGF0IHdlXG4gICAgICAgICAgICAvLyBvbmx5IGRvIHRoaXMgd2hlbiB0aGVyZSBpcyBhIHBhdGgsIG90aGVyd2lzZSB0aGVyZSB3b3VsZCBiZVxuICAgICAgICAgICAgLy8gc29tZSByZWR1bmRhbmN5IHdpdGggdGhlIG9wdGlvbnMgYXR0YWNoZWQgbGF0ZXIuXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uUGF0aE5vZGUgPSBpbmplY3ROb2RlKG1hY2hpbmUsIG1ha2VOb2RlKCkpO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyU2hvcnRjdXQobWFjaGluZSwgbGFzdFBhdGhOb2RlLCBvcHRpb25QYXRoTm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9wdGlvbnMobWFjaGluZSwgb3B0aW9uUGF0aE5vZGUpO1xuICAgICAgICAgICAgICAgIGxhc3RQYXRoTm9kZSA9IG9wdGlvblBhdGhOb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBwYXRoLmxlbmd0aDsgKyt0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFBhdGhOb2RlID0gaW5qZWN0Tm9kZShtYWNoaW5lLCBtYWtlTm9kZSgpKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclN0YXRpYyhtYWNoaW5lLCBsYXN0UGF0aE5vZGUsIHBhdGhbdF0sIG5leHRQYXRoTm9kZSwgYHB1c2hQYXRoYCk7XG4gICAgICAgICAgICAgICAgbGFzdFBhdGhOb2RlID0gbmV4dFBhdGhOb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXJpdHkubGVhZGluZy5sZW5ndGggPiAwIHx8ICF0aGlzLmFyaXR5LnByb3h5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVscE5vZGUgPSBpbmplY3ROb2RlKG1hY2hpbmUsIG1ha2VOb2RlKCkpO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRHluYW1pYyhtYWNoaW5lLCBsYXN0UGF0aE5vZGUsIGBpc0hlbHBgLCBoZWxwTm9kZSwgW2B1c2VIZWxwYCwgdGhpcy5jbGlJbmRleF0pO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyU3RhdGljKG1hY2hpbmUsIGhlbHBOb2RlLCBjb25zdGFudHMuRU5EX09GX0lOUFVULCBjb25zdGFudHMuTk9ERV9TVUNDRVNTLCBbYHNldFNlbGVjdGVkSW5kZXhgLCBjb25zdGFudHMuSEVMUF9DT01NQU5EX0lOREVYXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9wdGlvbnMobWFjaGluZSwgbGFzdFBhdGhOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFyaXR5LmxlYWRpbmcubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICByZWdpc3RlclN0YXRpYyhtYWNoaW5lLCBsYXN0UGF0aE5vZGUsIGNvbnN0YW50cy5FTkRfT0ZfSU5QVVQsIGNvbnN0YW50cy5OT0RFX0VSUk9SRUQsIFtgc2V0RXJyb3JgLCBgTm90IGVub3VnaCBwb3NpdGlvbmFsIGFyZ3VtZW50c2BdKTtcbiAgICAgICAgICAgIGxldCBsYXN0TGVhZGluZ05vZGUgPSBsYXN0UGF0aE5vZGU7XG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuYXJpdHkubGVhZGluZy5sZW5ndGg7ICsrdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMZWFkaW5nTm9kZSA9IGluamVjdE5vZGUobWFjaGluZSwgbWFrZU5vZGUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFyaXR5LnByb3h5IHx8IHQgKyAxICE9PSB0aGlzLmFyaXR5LmxlYWRpbmcubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyT3B0aW9ucyhtYWNoaW5lLCBuZXh0TGVhZGluZ05vZGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFyaXR5LnRyYWlsaW5nLmxlbmd0aCA+IDAgfHwgdCArIDEgIT09IHRoaXMuYXJpdHkubGVhZGluZy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyU3RhdGljKG1hY2hpbmUsIG5leHRMZWFkaW5nTm9kZSwgY29uc3RhbnRzLkVORF9PRl9JTlBVVCwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgW2BzZXRFcnJvcmAsIGBOb3QgZW5vdWdoIHBvc2l0aW9uYWwgYXJndW1lbnRzYF0pO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRHluYW1pYyhtYWNoaW5lLCBsYXN0TGVhZGluZ05vZGUsIGBpc05vdE9wdGlvbkxpa2VgLCBuZXh0TGVhZGluZ05vZGUsIGBwdXNoUG9zaXRpb25hbGApO1xuICAgICAgICAgICAgICAgIGxhc3RMZWFkaW5nTm9kZSA9IG5leHRMZWFkaW5nTm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsYXN0RXh0cmFOb2RlID0gbGFzdExlYWRpbmdOb2RlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXJpdHkuZXh0cmEgPT09IE5vTGltaXRzIHx8IHRoaXMuYXJpdHkuZXh0cmEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJhU2hvcnRjdXROb2RlID0gaW5qZWN0Tm9kZShtYWNoaW5lLCBtYWtlTm9kZSgpKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlclNob3J0Y3V0KG1hY2hpbmUsIGxhc3RMZWFkaW5nTm9kZSwgZXh0cmFTaG9ydGN1dE5vZGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFyaXR5LmV4dHJhID09PSBOb0xpbWl0cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRyYU5vZGUgPSBpbmplY3ROb2RlKG1hY2hpbmUsIG1ha2VOb2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXJpdHkucHJveHkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyT3B0aW9ucyhtYWNoaW5lLCBleHRyYU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbGFzdExlYWRpbmdOb2RlLCBwb3NpdGlvbmFsQXJndW1lbnQsIGV4dHJhTm9kZSwgYHB1c2hFeHRyYU5vTGltaXRzYCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRHluYW1pYyhtYWNoaW5lLCBleHRyYU5vZGUsIHBvc2l0aW9uYWxBcmd1bWVudCwgZXh0cmFOb2RlLCBgcHVzaEV4dHJhTm9MaW1pdHNgKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJTaG9ydGN1dChtYWNoaW5lLCBleHRyYU5vZGUsIGV4dHJhU2hvcnRjdXROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5hcml0eS5leHRyYS5sZW5ndGg7ICsrdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEV4dHJhTm9kZSA9IGluamVjdE5vZGUobWFjaGluZSwgbWFrZU5vZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXJpdHkucHJveHkgfHwgdCA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9wdGlvbnMobWFjaGluZSwgbmV4dEV4dHJhTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbGFzdEV4dHJhTm9kZSwgcG9zaXRpb25hbEFyZ3VtZW50LCBuZXh0RXh0cmFOb2RlLCBgcHVzaEV4dHJhYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlclNob3J0Y3V0KG1hY2hpbmUsIG5leHRFeHRyYU5vZGUsIGV4dHJhU2hvcnRjdXROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RFeHRyYU5vZGUgPSBuZXh0RXh0cmFOb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RFeHRyYU5vZGUgPSBleHRyYVNob3J0Y3V0Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFyaXR5LnRyYWlsaW5nLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJTdGF0aWMobWFjaGluZSwgbGFzdEV4dHJhTm9kZSwgY29uc3RhbnRzLkVORF9PRl9JTlBVVCwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgW2BzZXRFcnJvcmAsIGBOb3QgZW5vdWdoIHBvc2l0aW9uYWwgYXJndW1lbnRzYF0pO1xuICAgICAgICAgICAgbGV0IGxhc3RUcmFpbGluZ05vZGUgPSBsYXN0RXh0cmFOb2RlO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmFyaXR5LnRyYWlsaW5nLmxlbmd0aDsgKyt0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFRyYWlsaW5nTm9kZSA9IGluamVjdE5vZGUobWFjaGluZSwgbWFrZU5vZGUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFyaXR5LnByb3h5KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyT3B0aW9ucyhtYWNoaW5lLCBuZXh0VHJhaWxpbmdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAodCArIDEgPCB0aGlzLmFyaXR5LnRyYWlsaW5nLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJTdGF0aWMobWFjaGluZSwgbmV4dFRyYWlsaW5nTm9kZSwgY29uc3RhbnRzLkVORF9PRl9JTlBVVCwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgW2BzZXRFcnJvcmAsIGBOb3QgZW5vdWdoIHBvc2l0aW9uYWwgYXJndW1lbnRzYF0pO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRHluYW1pYyhtYWNoaW5lLCBsYXN0VHJhaWxpbmdOb2RlLCBgaXNOb3RPcHRpb25MaWtlYCwgbmV4dFRyYWlsaW5nTm9kZSwgYHB1c2hQb3NpdGlvbmFsYCk7XG4gICAgICAgICAgICAgICAgbGFzdFRyYWlsaW5nTm9kZSA9IG5leHRUcmFpbGluZ05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbGFzdFRyYWlsaW5nTm9kZSwgcG9zaXRpb25hbEFyZ3VtZW50LCBjb25zdGFudHMuTk9ERV9FUlJPUkVELCBbYHNldEVycm9yYCwgYEV4dHJhbmVvdXMgcG9zaXRpb25hbCBhcmd1bWVudGBdKTtcbiAgICAgICAgICAgIHJlZ2lzdGVyU3RhdGljKG1hY2hpbmUsIGxhc3RUcmFpbGluZ05vZGUsIGNvbnN0YW50cy5FTkRfT0ZfSU5QVVQsIGNvbnN0YW50cy5OT0RFX1NVQ0NFU1MsIFtgc2V0U2VsZWN0ZWRJbmRleGAsIHRoaXMuY2xpSW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFjaGluZSxcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVnaXN0ZXJPcHRpb25zKG1hY2hpbmUsIG5vZGUpIHtcbiAgICAgICAgcmVnaXN0ZXJEeW5hbWljKG1hY2hpbmUsIG5vZGUsIFtgaXNPcHRpb25gLCBgLS1gXSwgbm9kZSwgYGluaGliYXRlT3B0aW9uc2ApO1xuICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbm9kZSwgW2Bpc0JhdGNoT3B0aW9uYCwgdGhpcy5hbGxPcHRpb25OYW1lc10sIG5vZGUsIGBwdXNoQmF0Y2hgKTtcbiAgICAgICAgcmVnaXN0ZXJEeW5hbWljKG1hY2hpbmUsIG5vZGUsIFtgaXNCb3VuZE9wdGlvbmAsIHRoaXMuYWxsT3B0aW9uTmFtZXMsIHRoaXMub3B0aW9uc10sIG5vZGUsIGBwdXNoQm91bmRgKTtcbiAgICAgICAgcmVnaXN0ZXJEeW5hbWljKG1hY2hpbmUsIG5vZGUsIFtgaXNVbnN1cHBvcnRlZE9wdGlvbmAsIHRoaXMuYWxsT3B0aW9uTmFtZXNdLCBjb25zdGFudHMuTk9ERV9FUlJPUkVELCBbYHNldEVycm9yYCwgYFVuc3VwcG9ydGVkIG9wdGlvbiBuYW1lYF0pO1xuICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbm9kZSwgW2Bpc0ludmFsaWRPcHRpb25gXSwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgW2BzZXRFcnJvcmAsIGBJbnZhbGlkIG9wdGlvbiBuYW1lYF0pO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvbmdlc3ROYW1lID0gb3B0aW9uLm5hbWVzLnJlZHVjZSgobG9uZ2VzdE5hbWUsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZS5sZW5ndGggPiBsb25nZXN0TmFtZS5sZW5ndGggPyBuYW1lIDogbG9uZ2VzdE5hbWU7XG4gICAgICAgICAgICB9LCBgYCk7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmFyaXR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG9wdGlvbi5uYW1lcykge1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbm9kZSwgW2Bpc09wdGlvbmAsIG5hbWUsIG9wdGlvbi5oaWRkZW4gfHwgbmFtZSAhPT0gbG9uZ2VzdE5hbWVdLCBub2RlLCBgcHVzaFRydWVgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChgLS1gKSAmJiAhbmFtZS5zdGFydHNXaXRoKGAtLW5vLWApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbm9kZSwgW2Bpc05lZ2F0ZWRPcHRpb25gLCBuYW1lXSwgbm9kZSwgW2BwdXNoRmFsc2VgLCBuYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBpbmplY3QgYSBuZXcgbm9kZSBhdCB0aGUgZW5kIG9mIHRoZSBzdGF0ZSBtYWNoaW5lXG4gICAgICAgICAgICAgICAgbGV0IGxhc3ROb2RlID0gaW5qZWN0Tm9kZShtYWNoaW5lLCBtYWtlTm9kZSgpKTtcbiAgICAgICAgICAgICAgICAvLyBXZSByZWdpc3RlciB0cmFuc2l0aW9ucyBmcm9tIHRoZSBzdGFydGluZyBub2RlIHRvIHRoaXMgbmV3IG5vZGVcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygb3B0aW9uLm5hbWVzKVxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckR5bmFtaWMobWFjaGluZSwgbm9kZSwgW2Bpc09wdGlvbmAsIG5hbWUsIG9wdGlvbi5oaWRkZW4gfHwgbmFtZSAhPT0gbG9uZ2VzdE5hbWVdLCBsYXN0Tm9kZSwgYHB1c2hVbmRlZmluZWRgKTtcbiAgICAgICAgICAgICAgICAvLyBGb3IgZWFjaCBhcmd1bWVudCwgd2UgaW5qZWN0IGEgbmV3IG5vZGUgYXQgdGhlIGVuZCBhbmQgd2VcbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlciBhIHRyYW5zaXRpb24gZnJvbSB0aGUgY3VycmVudCBub2RlIHRvIHRoaXMgbmV3IG5vZGVcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IG9wdGlvbi5hcml0eTsgKyt0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHROb2RlID0gaW5qZWN0Tm9kZShtYWNoaW5lLCBtYWtlTm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuIHByb3ZpZGUgYmV0dGVyIGVycm9ycyB3aGVuIGFub3RoZXIgb3B0aW9uIG9yIEVORF9PRl9JTlBVVCBpcyBlbmNvdW50ZXJlZFxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclN0YXRpYyhtYWNoaW5lLCBsYXN0Tm9kZSwgY29uc3RhbnRzLkVORF9PRl9JTlBVVCwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgYHNldE9wdGlvbkFyaXR5RXJyb3JgKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJEeW5hbWljKG1hY2hpbmUsIGxhc3ROb2RlLCBgaXNPcHRpb25MaWtlYCwgY29uc3RhbnRzLk5PREVfRVJST1JFRCwgYHNldE9wdGlvbkFyaXR5RXJyb3JgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIG9wdGlvbiBoYXMgYSBzaW5nbGUgYXJndW1lbnQsIG5vIG5lZWQgdG8gc3RvcmUgaXQgaW4gYW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gb3B0aW9uLmFyaXR5ID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGBzZXRTdHJpbmdWYWx1ZWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYHB1c2hTdHJpbmdWYWx1ZWA7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRHluYW1pYyhtYWNoaW5lLCBsYXN0Tm9kZSwgYGlzTm90T3B0aW9uTGlrZWAsIG5leHROb2RlLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBsYXN0Tm9kZSA9IG5leHROb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJbiB0aGUgZW5kLCB3ZSByZWdpc3RlciBhIHNob3J0Y3V0IGZyb21cbiAgICAgICAgICAgICAgICAvLyB0aGUgbGFzdCBub2RlIGJhY2sgdG8gdGhlIHN0YXJ0aW5nIG5vZGVcbiAgICAgICAgICAgICAgICByZWdpc3RlclNob3J0Y3V0KG1hY2hpbmUsIGxhc3ROb2RlLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIENsaUJ1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKHsgYmluYXJ5TmFtZSA9IGAuLi5gIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmJ1aWxkZXJzID0gW107XG4gICAgICAgIHRoaXMub3B0cyA9IHsgYmluYXJ5TmFtZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgYnVpbGQoY2JzLCBvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGlCdWlsZGVyKG9wdHMpLmNvbW1hbmRzKGNicykuY29tcGlsZSgpO1xuICAgIH1cbiAgICBnZXRCdWlsZGVyQnlJbmRleChuKSB7XG4gICAgICAgIGlmICghKG4gPj0gMCAmJiBuIDwgdGhpcy5idWlsZGVycy5sZW5ndGgpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBc3NlcnRpb24gZmFpbGVkOiBPdXQtb2YtYm91bmQgY29tbWFuZCBpbmRleCAoJHtufSlgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRlcnNbbl07XG4gICAgfVxuICAgIGNvbW1hbmRzKGNicykge1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIGNicylcbiAgICAgICAgICAgIGNiKHRoaXMuY29tbWFuZCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNvbW1hbmQoKSB7XG4gICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgQ29tbWFuZEJ1aWxkZXIodGhpcy5idWlsZGVycy5sZW5ndGgsIHRoaXMub3B0cyk7XG4gICAgICAgIHRoaXMuYnVpbGRlcnMucHVzaChidWlsZGVyKTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkZXI7XG4gICAgfVxuICAgIGNvbXBpbGUoKSB7XG4gICAgICAgIGNvbnN0IG1hY2hpbmVzID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRleHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYnVpbGRlciBvZiB0aGlzLmJ1aWxkZXJzKSB7XG4gICAgICAgICAgICBjb25zdCB7IG1hY2hpbmUsIGNvbnRleHQgfSA9IGJ1aWxkZXIuY29tcGlsZSgpO1xuICAgICAgICAgICAgbWFjaGluZXMucHVzaChtYWNoaW5lKTtcbiAgICAgICAgICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFjaGluZSA9IG1ha2VBbnlPZk1hY2hpbmUobWFjaGluZXMpO1xuICAgICAgICBzaW1wbGlmeU1hY2hpbmUobWFjaGluZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWNoaW5lLFxuICAgICAgICAgICAgY29udGV4dHMsXG4gICAgICAgICAgICBwcm9jZXNzOiAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVuTWFjaGluZShtYWNoaW5lLCBpbnB1dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VnZ2VzdDogKGlucHV0LCBwYXJ0aWFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Z2dlc3RNYWNoaW5lKG1hY2hpbmUsIGlucHV0LCBwYXJ0aWFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnRzLkNsaUJ1aWxkZXIgPSBDbGlCdWlsZGVyO1xuZXhwb3J0cy5Db21tYW5kQnVpbGRlciA9IENvbW1hbmRCdWlsZGVyO1xuZXhwb3J0cy5Ob0xpbWl0cyA9IE5vTGltaXRzO1xuZXhwb3J0cy5hZ2dyZWdhdGVIZWxwU3RhdGVzID0gYWdncmVnYXRlSGVscFN0YXRlcztcbmV4cG9ydHMuY2xvbmVOb2RlID0gY2xvbmVOb2RlO1xuZXhwb3J0cy5jbG9uZVRyYW5zaXRpb24gPSBjbG9uZVRyYW5zaXRpb247XG5leHBvcnRzLmRlYnVnID0gZGVidWc7XG5leHBvcnRzLmRlYnVnTWFjaGluZSA9IGRlYnVnTWFjaGluZTtcbmV4cG9ydHMuZXhlY3V0ZSA9IGV4ZWN1dGU7XG5leHBvcnRzLmluamVjdE5vZGUgPSBpbmplY3ROb2RlO1xuZXhwb3J0cy5pc1Rlcm1pbmFsTm9kZSA9IGlzVGVybWluYWxOb2RlO1xuZXhwb3J0cy5tYWtlQW55T2ZNYWNoaW5lID0gbWFrZUFueU9mTWFjaGluZTtcbmV4cG9ydHMubWFrZU5vZGUgPSBtYWtlTm9kZTtcbmV4cG9ydHMubWFrZVN0YXRlTWFjaGluZSA9IG1ha2VTdGF0ZU1hY2hpbmU7XG5leHBvcnRzLnJlZHVjZXJzID0gcmVkdWNlcnM7XG5leHBvcnRzLnJlZ2lzdGVyRHluYW1pYyA9IHJlZ2lzdGVyRHluYW1pYztcbmV4cG9ydHMucmVnaXN0ZXJTaG9ydGN1dCA9IHJlZ2lzdGVyU2hvcnRjdXQ7XG5leHBvcnRzLnJlZ2lzdGVyU3RhdGljID0gcmVnaXN0ZXJTdGF0aWM7XG5leHBvcnRzLnJ1bk1hY2hpbmVJbnRlcm5hbCA9IHJ1bk1hY2hpbmVJbnRlcm5hbDtcbmV4cG9ydHMuc2VsZWN0QmVzdFN0YXRlID0gc2VsZWN0QmVzdFN0YXRlO1xuZXhwb3J0cy5zaW1wbGlmeU1hY2hpbmUgPSBzaW1wbGlmeU1hY2hpbmU7XG5leHBvcnRzLnN1Z2dlc3QgPSBzdWdnZXN0O1xuZXhwb3J0cy50ZXN0cyA9IHRlc3RzO1xuZXhwb3J0cy50cmltU21hbGxlckJyYW5jaGVzID0gdHJpbVNtYWxsZXJCcmFuY2hlcztcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciB0dHkgPSByZXF1aXJlKCd0dHknKTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0TGVnYWN5IChlKSB7IHJldHVybiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7ICdkZWZhdWx0JzogZSB9OyB9XG5cbnZhciB0dHlfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KHR0eSk7XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRDb2xvckRlcHRoKCkge1xuICAgIGlmICh0dHlfX2RlZmF1bHRbJ2RlZmF1bHQnXSAmJiBgZ2V0Q29sb3JEZXB0aGAgaW4gdHR5X19kZWZhdWx0WydkZWZhdWx0J10uV3JpdGVTdHJlYW0ucHJvdG90eXBlKVxuICAgICAgICByZXR1cm4gdHR5X19kZWZhdWx0WydkZWZhdWx0J10uV3JpdGVTdHJlYW0ucHJvdG90eXBlLmdldENvbG9yRGVwdGgoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuRk9SQ0VfQ09MT1IgPT09IGAwYClcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgaWYgKHByb2Nlc3MuZW52LkZPUkNFX0NPTE9SID09PSBgMWApXG4gICAgICAgIHJldHVybiA4O1xuICAgIGlmICh0eXBlb2YgcHJvY2Vzcy5zdGRvdXQgIT09IGB1bmRlZmluZWRgICYmIHByb2Nlc3Muc3Rkb3V0LmlzVFRZKVxuICAgICAgICByZXR1cm4gODtcbiAgICByZXR1cm4gMTtcbn1cbmxldCBnQ29udGV4dFN0b3JhZ2U7XG5mdW5jdGlvbiBnZXRDYXB0dXJlQWN0aXZhdG9yKGNvbnRleHQpIHtcbiAgICBsZXQgY29udGV4dFN0b3JhZ2UgPSBnQ29udGV4dFN0b3JhZ2U7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0U3RvcmFnZSA9PT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgaWYgKGNvbnRleHQuc3Rkb3V0ID09PSBwcm9jZXNzLnN0ZG91dCAmJiBjb250ZXh0LnN0ZGVyciA9PT0gcHJvY2Vzcy5zdGRlcnIpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgeyBBc3luY0xvY2FsU3RvcmFnZTogTGF6eUFzeW5jTG9jYWxTdG9yYWdlIH0gPSByZXF1aXJlKGBhc3luY19ob29rc2ApO1xuICAgICAgICBjb250ZXh0U3RvcmFnZSA9IGdDb250ZXh0U3RvcmFnZSA9IG5ldyBMYXp5QXN5bmNMb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgb3JpZ1N0ZG91dFdyaXRlID0gcHJvY2Vzcy5zdGRvdXQuX3dyaXRlO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRTdG9yYWdlLmdldFN0b3JlKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnU3Rkb3V0V3JpdGUuY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnN0ZG91dC53cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb3JpZ1N0ZGVycldyaXRlID0gcHJvY2Vzcy5zdGRlcnIuX3dyaXRlO1xuICAgICAgICBwcm9jZXNzLnN0ZGVyci5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRTdG9yYWdlLmdldFN0b3JlKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnU3RkZXJyV3JpdGUuY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnN0ZGVyci53cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIChmbikgPT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dFN0b3JhZ2UucnVuKGNvbnRleHQsIGZuKTtcbiAgICB9O1xufVxuXG5leHBvcnRzLmdldENhcHR1cmVBY3RpdmF0b3IgPSBnZXRDYXB0dXJlQWN0aXZhdG9yO1xuZXhwb3J0cy5nZXREZWZhdWx0Q29sb3JEZXB0aCA9IGdldERlZmF1bHRDb2xvckRlcHRoO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX0NvbW1hbmQgPSByZXF1aXJlKCcuL0NvbW1hbmQuanMnKTtcblxuY2xhc3MgSGVscENvbW1hbmQgZXh0ZW5kcyBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29udGV4dHMgPSBjb250ZXh0cztcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbShzdGF0ZSwgY29udGV4dHMpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBIZWxwQ29tbWFuZChjb250ZXh0cyk7XG4gICAgICAgIGNvbW1hbmQucGF0aCA9IHN0YXRlLnBhdGg7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0IG9mIHN0YXRlLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3B0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGAtY2A6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuY29tbWFuZHMucHVzaChOdW1iZXIob3B0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBgLWlgOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmluZGV4ID0gTnVtYmVyKG9wdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgfVxuICAgIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIGxldCBjb21tYW5kcyA9IHRoaXMuY29tbWFuZHM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pbmRleCAhPT0gYHVuZGVmaW5lZGAgJiYgdGhpcy5pbmRleCA+PSAwICYmIHRoaXMuaW5kZXggPCBjb21tYW5kcy5sZW5ndGgpXG4gICAgICAgICAgICBjb21tYW5kcyA9IFtjb21tYW5kc1t0aGlzLmluZGV4XV07XG4gICAgICAgIGlmIChjb21tYW5kcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdGRvdXQud3JpdGUodGhpcy5jbGkudXNhZ2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29tbWFuZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKHRoaXMuY2xpLnVzYWdlKHRoaXMuY29udGV4dHNbY29tbWFuZHNbMF1dLmNvbW1hbmRDbGFzcywgeyBkZXRhaWxlZDogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29tbWFuZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShgTXVsdGlwbGUgY29tbWFuZHMgbWF0Y2ggeW91ciBzZWxlY3Rpb246XFxuYCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKGBcXG5gKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgdGhpcy5jb21tYW5kcylcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKHRoaXMuY2xpLnVzYWdlKHRoaXMuY29udGV4dHNbY29tbWFuZF0uY29tbWFuZENsYXNzLCB7IHByZWZpeDogYCR7aW5kZXgrK30uIGAucGFkU3RhcnQoNSkgfSkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShgXFxuYCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKGBSdW4gYWdhaW4gd2l0aCAtaD08aW5kZXg+IHRvIHNlZSB0aGUgbG9uZ2VyIGRldGFpbHMgb2YgYW55IG9mIHRob3NlIGNvbW1hbmRzLlxcbmApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnRzLkhlbHBDb21tYW5kID0gSGVscENvbW1hbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzLmpzJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4uL2NvcmUuanMnKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKCcuLi9mb3JtYXQuanMnKTtcbnZhciBwbGF0Zm9ybSA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtJyk7XG52YXIgYWR2YW5jZWRfQ29tbWFuZCA9IHJlcXVpcmUoJy4vQ29tbWFuZC5qcycpO1xudmFyIGFkdmFuY2VkX0hlbHBDb21tYW5kID0gcmVxdWlyZSgnLi9IZWxwQ29tbWFuZC5qcycpO1xuXG5jb25zdCBlcnJvckNvbW1hbmRTeW1ib2wgPSBTeW1ib2woYGNsaXBhbmlvbi9lcnJvckNvbW1hbmRgKTtcbmFzeW5jIGZ1bmN0aW9uIHJ1bkV4aXQoLi4uYXJncykge1xuICAgIGNvbnN0IHsgcmVzb2x2ZWRPcHRpb25zLCByZXNvbHZlZENvbW1hbmRDbGFzc2VzLCByZXNvbHZlZEFyZ3YsIHJlc29sdmVkQ29udGV4dCwgfSA9IHJlc29sdmVSdW5QYXJhbWV0ZXJzKGFyZ3MpO1xuICAgIGNvbnN0IGNsaSA9IENsaS5mcm9tKHJlc29sdmVkQ29tbWFuZENsYXNzZXMsIHJlc29sdmVkT3B0aW9ucyk7XG4gICAgcmV0dXJuIGNsaS5ydW5FeGl0KHJlc29sdmVkQXJndiwgcmVzb2x2ZWRDb250ZXh0KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJ1biguLi5hcmdzKSB7XG4gICAgY29uc3QgeyByZXNvbHZlZE9wdGlvbnMsIHJlc29sdmVkQ29tbWFuZENsYXNzZXMsIHJlc29sdmVkQXJndiwgcmVzb2x2ZWRDb250ZXh0LCB9ID0gcmVzb2x2ZVJ1blBhcmFtZXRlcnMoYXJncyk7XG4gICAgY29uc3QgY2xpID0gQ2xpLmZyb20ocmVzb2x2ZWRDb21tYW5kQ2xhc3NlcywgcmVzb2x2ZWRPcHRpb25zKTtcbiAgICByZXR1cm4gY2xpLnJ1bihyZXNvbHZlZEFyZ3YsIHJlc29sdmVkQ29udGV4dCk7XG59XG5mdW5jdGlvbiByZXNvbHZlUnVuUGFyYW1ldGVycyhhcmdzKSB7XG4gICAgbGV0IHJlc29sdmVkT3B0aW9ucztcbiAgICBsZXQgcmVzb2x2ZWRDb21tYW5kQ2xhc3NlcztcbiAgICBsZXQgcmVzb2x2ZWRBcmd2O1xuICAgIGxldCByZXNvbHZlZENvbnRleHQ7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSBgdW5kZWZpbmVkYCAmJiB0eXBlb2YgcHJvY2Vzcy5hcmd2ICE9PSBgdW5kZWZpbmVkYClcbiAgICAgICAgcmVzb2x2ZWRBcmd2ID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQ29tbWFuZENsYXNzZXMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJnc1swXSAmJiAoYXJnc1swXS5wcm90b3R5cGUgaW5zdGFuY2VvZiBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmQpIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDb21tYW5kQ2xhc3NlcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZEFyZ3YgPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDb250ZXh0ID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRPcHRpb25zID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDb21tYW5kQ2xhc3NlcyA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzJdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZE9wdGlvbnMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENvbW1hbmRDbGFzc2VzID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRBcmd2ID0gYXJnc1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnc1swXSAmJiAoYXJnc1swXS5wcm90b3R5cGUgaW5zdGFuY2VvZiBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmQpIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDb21tYW5kQ2xhc3NlcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVkQXJndiA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVkQ29udGV4dCA9IGFyZ3NbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZE9wdGlvbnMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENvbW1hbmRDbGFzc2VzID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDb250ZXh0ID0gYXJnc1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZE9wdGlvbnMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQ29tbWFuZENsYXNzZXMgPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQXJndiA9IGFyZ3NbMl07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRDb250ZXh0ID0gYXJnc1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc29sdmVkQXJndiA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGFyZ3YgcGFyYW1ldGVyIG11c3QgYmUgcHJvdmlkZWQgd2hlbiBydW5uaW5nIENsaXBhbmlvbiBvdXRzaWRlIG9mIGEgTm9kZSBjb250ZXh0YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzb2x2ZWRPcHRpb25zLFxuICAgICAgICByZXNvbHZlZENvbW1hbmRDbGFzc2VzLFxuICAgICAgICByZXNvbHZlZEFyZ3YsXG4gICAgICAgIHJlc29sdmVkQ29udGV4dCxcbiAgICB9O1xufVxuLyoqXG4gKiBAdGVtcGxhdGUgQ29udGV4dCBUaGUgY29udGV4dCBzaGFyZWQgYnkgYWxsIGNvbW1hbmRzLiBDb250ZXh0cyBhcmUgYSBzZXQgb2YgdmFsdWVzLCBkZWZpbmVkIHdoZW4gY2FsbGluZyB0aGUgYHJ1bmAvYHJ1bkV4aXRgIGZ1bmN0aW9ucyBmcm9tIHRoZSBDTEkgaW5zdGFuY2UsIHRoYXQgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgY29tbWFuZHMgdmlhIGB0aGlzLmNvbnRleHRgLlxuICovXG5jbGFzcyBDbGkge1xuICAgIGNvbnN0cnVjdG9yKHsgYmluYXJ5TGFiZWwsIGJpbmFyeU5hbWU6IGJpbmFyeU5hbWVPcHQgPSBgLi4uYCwgYmluYXJ5VmVyc2lvbiwgZW5hYmxlQ2FwdHVyZSA9IGZhbHNlLCBlbmFibGVDb2xvcnMgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gbmV3IGNvcmUuQ2xpQnVpbGRlcih7IGJpbmFyeU5hbWU6IGJpbmFyeU5hbWVPcHQgfSk7XG4gICAgICAgIHRoaXMuYmluYXJ5TGFiZWwgPSBiaW5hcnlMYWJlbDtcbiAgICAgICAgdGhpcy5iaW5hcnlOYW1lID0gYmluYXJ5TmFtZU9wdDtcbiAgICAgICAgdGhpcy5iaW5hcnlWZXJzaW9uID0gYmluYXJ5VmVyc2lvbjtcbiAgICAgICAgdGhpcy5lbmFibGVDYXB0dXJlID0gZW5hYmxlQ2FwdHVyZTtcbiAgICAgICAgdGhpcy5lbmFibGVDb2xvcnMgPSBlbmFibGVDb2xvcnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ2xpIGFuZCByZWdpc3RlcnMgYWxsIGNvbW1hbmRzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbW1hbmRDbGFzc2VzIFRoZSBDb21tYW5kcyB0byByZWdpc3RlclxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGBDbGlgIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGZyb20oY29tbWFuZENsYXNzZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBjbGkgPSBuZXcgQ2xpKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXNvbHZlZENvbW1hbmRDbGFzc2VzID0gQXJyYXkuaXNBcnJheShjb21tYW5kQ2xhc3NlcylcbiAgICAgICAgICAgID8gY29tbWFuZENsYXNzZXNcbiAgICAgICAgICAgIDogW2NvbW1hbmRDbGFzc2VzXTtcbiAgICAgICAgZm9yIChjb25zdCBjb21tYW5kQ2xhc3Mgb2YgcmVzb2x2ZWRDb21tYW5kQ2xhc3NlcylcbiAgICAgICAgICAgIGNsaS5yZWdpc3Rlcihjb21tYW5kQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY2xpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjb21tYW5kIGluc2lkZSB0aGUgQ0xJLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNvbW1hbmRDbGFzcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNwZWNzID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBjb21tYW5kID0gbmV3IGNvbW1hbmRDbGFzcygpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb21tYW5kKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbW1hbmRba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGBvYmplY3RgICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlW2FkdmFuY2VkX0NvbW1hbmQuQ29tbWFuZC5pc09wdGlvbl0pIHtcbiAgICAgICAgICAgICAgICBzcGVjcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnVpbGRlciA9IHRoaXMuYnVpbGRlci5jb21tYW5kKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYnVpbGRlci5jbGlJbmRleDtcbiAgICAgICAgY29uc3QgcGF0aHMgPSAoX2EgPSBjb21tYW5kQ2xhc3MucGF0aHMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvbW1hbmQucGF0aHM7XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aHMgIT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKVxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuYWRkUGF0aChwYXRoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25zLnNldChjb21tYW5kQ2xhc3MsIHsgc3BlY3MsIGJ1aWxkZXIsIGluZGV4IH0pO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHsgZGVmaW5pdGlvbiB9XSBvZiBzcGVjcy5lbnRyaWVzKCkpXG4gICAgICAgICAgICBkZWZpbml0aW9uKGJ1aWxkZXIsIGtleSk7XG4gICAgICAgIGJ1aWxkZXIuc2V0Q29udGV4dCh7XG4gICAgICAgICAgICBjb21tYW5kQ2xhc3MsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwcm9jZXNzKGlucHV0LCB1c2VyQ29udGV4dCkge1xuICAgICAgICBjb25zdCB7IGNvbnRleHRzLCBwcm9jZXNzIH0gPSB0aGlzLmJ1aWxkZXIuY29tcGlsZSgpO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHByb2Nlc3MoaW5wdXQpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgLi4uQ2xpLmRlZmF1bHRDb250ZXh0LFxuICAgICAgICAgICAgLi4udXNlckNvbnRleHQsXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoc3RhdGUuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuSEVMUF9DT01NQU5EX0lOREVYOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGFkdmFuY2VkX0hlbHBDb21tYW5kLkhlbHBDb21tYW5kLmZyb20oc3RhdGUsIGNvbnRleHRzKTtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZENsYXNzIH0gPSBjb250ZXh0c1tzdGF0ZS5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5yZWdpc3RyYXRpb25zLmdldChjb21tYW5kQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlY29yZCA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzc2VydGlvbiBmYWlsZWQ6IEV4cGVjdGVkIHRoZSBjb21tYW5kIGNsYXNzIHRvIGhhdmUgYmVlbiByZWdpc3RlcmVkLmApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kID0gbmV3IGNvbW1hbmRDbGFzcygpO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLnBhdGggPSBzdGF0ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCB7IHRyYW5zZm9ybWVyIH1dIG9mIHJlY29yZC5zcGVjcy5lbnRyaWVzKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZFtrZXldID0gdHJhbnNmb3JtZXIocmVjb3JkLmJ1aWxkZXIsIGtleSwgc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcltlcnJvckNvbW1hbmRTeW1ib2xdID0gY29tbWFuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHJ1bihpbnB1dCwgdXNlckNvbnRleHQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IGNvbW1hbmQ7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICAuLi5DbGkuZGVmYXVsdENvbnRleHQsXG4gICAgICAgICAgICAuLi51c2VyQ29udGV4dCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29sb3JlZCA9IChfYSA9IHRoaXMuZW5hYmxlQ29sb3JzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb250ZXh0LmNvbG9yRGVwdGggPiAxO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSB0aGlzLnByb2Nlc3MoaW5wdXQsIGNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdGRvdXQud3JpdGUodGhpcy5lcnJvcihlcnJvciwgeyBjb2xvcmVkIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5oZWxwKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0ZG91dC53cml0ZSh0aGlzLnVzYWdlKGNvbW1hbmQsIHsgY29sb3JlZCwgZGV0YWlsZWQ6IHRydWUgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29tbWFuZC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgY29tbWFuZC5jbGkgPSB7XG4gICAgICAgICAgICBiaW5hcnlMYWJlbDogdGhpcy5iaW5hcnlMYWJlbCxcbiAgICAgICAgICAgIGJpbmFyeU5hbWU6IHRoaXMuYmluYXJ5TmFtZSxcbiAgICAgICAgICAgIGJpbmFyeVZlcnNpb246IHRoaXMuYmluYXJ5VmVyc2lvbixcbiAgICAgICAgICAgIGVuYWJsZUNhcHR1cmU6IHRoaXMuZW5hYmxlQ2FwdHVyZSxcbiAgICAgICAgICAgIGVuYWJsZUNvbG9yczogdGhpcy5lbmFibGVDb2xvcnMsXG4gICAgICAgICAgICBkZWZpbml0aW9uczogKCkgPT4gdGhpcy5kZWZpbml0aW9ucygpLFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvciwgb3B0cykgPT4gdGhpcy5lcnJvcihlcnJvciwgb3B0cyksXG4gICAgICAgICAgICBmb3JtYXQ6IGNvbG9yZWQgPT4gdGhpcy5mb3JtYXQoY29sb3JlZCksXG4gICAgICAgICAgICBwcm9jZXNzOiAoaW5wdXQsIHN1YkNvbnRleHQpID0+IHRoaXMucHJvY2VzcyhpbnB1dCwgeyAuLi5jb250ZXh0LCAuLi5zdWJDb250ZXh0IH0pLFxuICAgICAgICAgICAgcnVuOiAoaW5wdXQsIHN1YkNvbnRleHQpID0+IHRoaXMucnVuKGlucHV0LCB7IC4uLmNvbnRleHQsIC4uLnN1YkNvbnRleHQgfSksXG4gICAgICAgICAgICB1c2FnZTogKGNvbW1hbmQsIG9wdHMpID0+IHRoaXMudXNhZ2UoY29tbWFuZCwgb3B0cyksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGl2YXRlID0gdGhpcy5lbmFibGVDYXB0dXJlXG4gICAgICAgICAgICA/IChfYiA9IHBsYXRmb3JtLmdldENhcHR1cmVBY3RpdmF0b3IoY29udGV4dCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG5vb3BDYXB0dXJlQWN0aXZhdG9yIDogbm9vcENhcHR1cmVBY3RpdmF0b3I7XG4gICAgICAgIGxldCBleGl0Q29kZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGV4aXRDb2RlID0gYXdhaXQgYWN0aXZhdGUoKCkgPT4gY29tbWFuZC52YWxpZGF0ZUFuZEV4ZWN1dGUoKS5jYXRjaChlcnJvciA9PiBjb21tYW5kLmNhdGNoKGVycm9yKS50aGVuKCgpID0+IDApKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0ZG91dC53cml0ZSh0aGlzLmVycm9yKGVycm9yLCB7IGNvbG9yZWQsIGNvbW1hbmQgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4aXRDb2RlO1xuICAgIH1cbiAgICBhc3luYyBydW5FeGl0KGlucHV0LCBjb250ZXh0KSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdENvZGUgPSBhd2FpdCB0aGlzLnJ1bihpbnB1dCwgY29udGV4dCk7XG4gICAgfVxuICAgIHN1Z2dlc3QoaW5wdXQsIHBhcnRpYWwpIHtcbiAgICAgICAgY29uc3QgeyBzdWdnZXN0IH0gPSB0aGlzLmJ1aWxkZXIuY29tcGlsZSgpO1xuICAgICAgICByZXR1cm4gc3VnZ2VzdChpbnB1dCwgcGFydGlhbCk7XG4gICAgfVxuICAgIGRlZmluaXRpb25zKHsgY29sb3JlZCA9IGZhbHNlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW107XG4gICAgICAgIGZvciAoY29uc3QgW2NvbW1hbmRDbGFzcywgeyBpbmRleCB9XSBvZiB0aGlzLnJlZ2lzdHJhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZENsYXNzLnVzYWdlID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNhZ2U6IHBhdGggfSA9IHRoaXMuZ2V0VXNhZ2VCeUluZGV4KGluZGV4LCB7IGRldGFpbGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNhZ2UsIG9wdGlvbnMgfSA9IHRoaXMuZ2V0VXNhZ2VCeUluZGV4KGluZGV4LCB7IGRldGFpbGVkOiB0cnVlLCBpbmxpbmVPcHRpb25zOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHlwZW9mIGNvbW1hbmRDbGFzcy51c2FnZS5jYXRlZ29yeSAhPT0gYHVuZGVmaW5lZGBcbiAgICAgICAgICAgICAgICA/IGZvcm1hdC5mb3JtYXRNYXJrZG93bmlzaChjb21tYW5kQ2xhc3MudXNhZ2UuY2F0ZWdvcnksIHsgZm9ybWF0OiB0aGlzLmZvcm1hdChjb2xvcmVkKSwgcGFyYWdyYXBoczogZmFsc2UgfSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdHlwZW9mIGNvbW1hbmRDbGFzcy51c2FnZS5kZXNjcmlwdGlvbiAhPT0gYHVuZGVmaW5lZGBcbiAgICAgICAgICAgICAgICA/IGZvcm1hdC5mb3JtYXRNYXJrZG93bmlzaChjb21tYW5kQ2xhc3MudXNhZ2UuZGVzY3JpcHRpb24sIHsgZm9ybWF0OiB0aGlzLmZvcm1hdChjb2xvcmVkKSwgcGFyYWdyYXBoczogZmFsc2UgfSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB0eXBlb2YgY29tbWFuZENsYXNzLnVzYWdlLmRldGFpbHMgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgPyBmb3JtYXQuZm9ybWF0TWFya2Rvd25pc2goY29tbWFuZENsYXNzLnVzYWdlLmRldGFpbHMsIHsgZm9ybWF0OiB0aGlzLmZvcm1hdChjb2xvcmVkKSwgcGFyYWdyYXBoczogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgZXhhbXBsZXMgPSB0eXBlb2YgY29tbWFuZENsYXNzLnVzYWdlLmV4YW1wbGVzICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgID8gY29tbWFuZENsYXNzLnVzYWdlLmV4YW1wbGVzLm1hcCgoW2xhYmVsLCBjbGldKSA9PiBbZm9ybWF0LmZvcm1hdE1hcmtkb3duaXNoKGxhYmVsLCB7IGZvcm1hdDogdGhpcy5mb3JtYXQoY29sb3JlZCksIHBhcmFncmFwaHM6IGZhbHNlIH0pLCBjbGkucmVwbGFjZSgvXFwkMC9nLCB0aGlzLmJpbmFyeU5hbWUpXSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7IHBhdGgsIHVzYWdlLCBjYXRlZ29yeSwgZGVzY3JpcHRpb24sIGRldGFpbHMsIGV4YW1wbGVzLCBvcHRpb25zIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICB1c2FnZShjb21tYW5kID0gbnVsbCwgeyBjb2xvcmVkLCBkZXRhaWxlZCA9IGZhbHNlLCBwcmVmaXggPSBgJCBgIH0gPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIEluIGNhc2UgdGhlIGRlZmF1bHQgY29tbWFuZCBpcyB0aGUgb25seSBvbmUsIHdlIGNhbiBqdXN0IHNob3cgdGhlIGNvbW1hbmQgaGVscCByYXRoZXIgdGhhbiB0aGUgZ2VuZXJhbCBvbmVcbiAgICAgICAgaWYgKGNvbW1hbmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tbWFuZENsYXNzIG9mIHRoaXMucmVnaXN0cmF0aW9ucy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRocyA9IGNvbW1hbmRDbGFzcy5wYXRocztcbiAgICAgICAgICAgICAgICBjb25zdCBpc0RvY3VtZW50ZWQgPSB0eXBlb2YgY29tbWFuZENsYXNzLnVzYWdlICE9PSBgdW5kZWZpbmVkYDtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0V4Y2x1c2l2ZWx5RGVmYXVsdCA9ICFwYXRocyB8fCBwYXRocy5sZW5ndGggPT09IDAgfHwgKHBhdGhzLmxlbmd0aCA9PT0gMSAmJiBwYXRoc1swXS5sZW5ndGggPT09IDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IGlzRXhjbHVzaXZlbHlEZWZhdWx0IHx8ICgoX2EgPSBwYXRocyA9PT0gbnVsbCB8fCBwYXRocyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF0aHMuc29tZShwYXRoID0+IHBhdGgubGVuZ3RoID09PSAwKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gY29tbWFuZENsYXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEb2N1bWVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICBkZXRhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBjb21tYW5kQ2xhc3MgPSBjb21tYW5kICE9PSBudWxsICYmIGNvbW1hbmQgaW5zdGFuY2VvZiBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmRcbiAgICAgICAgICAgID8gY29tbWFuZC5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgOiBjb21tYW5kO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYGA7XG4gICAgICAgIGlmICghY29tbWFuZENsYXNzKSB7XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kc0J5Q2F0ZWdvcmllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2NvbW1hbmRDbGFzcywgeyBpbmRleCB9XSBvZiB0aGlzLnJlZ2lzdHJhdGlvbnMuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kQ2xhc3MudXNhZ2UgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHR5cGVvZiBjb21tYW5kQ2xhc3MudXNhZ2UuY2F0ZWdvcnkgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgICAgID8gZm9ybWF0LmZvcm1hdE1hcmtkb3duaXNoKGNvbW1hbmRDbGFzcy51c2FnZS5jYXRlZ29yeSwgeyBmb3JtYXQ6IHRoaXMuZm9ybWF0KGNvbG9yZWQpLCBwYXJhZ3JhcGhzOiBmYWxzZSB9KVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5Q29tbWFuZHMgPSBjb21tYW5kc0J5Q2F0ZWdvcmllcy5nZXQoY2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2F0ZWdvcnlDb21tYW5kcyA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzQnlDYXRlZ29yaWVzLnNldChjYXRlZ29yeSwgY2F0ZWdvcnlDb21tYW5kcyA9IFtdKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHVzYWdlIH0gPSB0aGlzLmdldFVzYWdlQnlJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlDb21tYW5kcy5wdXNoKHsgY29tbWFuZENsYXNzLCB1c2FnZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZXMgPSBBcnJheS5mcm9tKGNvbW1hbmRzQnlDYXRlZ29yaWVzLmtleXMoKSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgaWYgKGIgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiArMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIsIGBlbmAsIHsgdXNhZ2U6IGBzb3J0YCwgY2FzZUZpcnN0OiBgdXBwZXJgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBoYXNMYWJlbCA9IHR5cGVvZiB0aGlzLmJpbmFyeUxhYmVsICE9PSBgdW5kZWZpbmVkYDtcbiAgICAgICAgICAgIGNvbnN0IGhhc1ZlcnNpb24gPSB0eXBlb2YgdGhpcy5iaW5hcnlWZXJzaW9uICE9PSBgdW5kZWZpbmVkYDtcbiAgICAgICAgICAgIGlmIChoYXNMYWJlbCB8fCBoYXNWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0xhYmVsICYmIGhhc1ZlcnNpb24pXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5oZWFkZXIoYCR7dGhpcy5iaW5hcnlMYWJlbH0gLSAke3RoaXMuYmluYXJ5VmVyc2lvbn1gKX1cXG5cXG5gO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0xhYmVsKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7dGhpcy5mb3JtYXQoY29sb3JlZCkuaGVhZGVyKGAke3RoaXMuYmluYXJ5TGFiZWx9YCl9XFxuYDtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5oZWFkZXIoYCR7dGhpcy5iaW5hcnlWZXJzaW9ufWApfVxcbmA7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAgICR7dGhpcy5mb3JtYXQoY29sb3JlZCkuYm9sZChwcmVmaXgpfSR7dGhpcy5iaW5hcnlOYW1lfSA8Y29tbWFuZD5cXG5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke3RoaXMuZm9ybWF0KGNvbG9yZWQpLmJvbGQocHJlZml4KX0ke3RoaXMuYmluYXJ5TmFtZX0gPGNvbW1hbmQ+XFxuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlOYW1lIG9mIGNhdGVnb3J5TmFtZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kcyA9IGNvbW1hbmRzQnlDYXRlZ29yaWVzLmdldChjYXRlZ29yeU5hbWUpLnNsaWNlKCkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS51c2FnZS5sb2NhbGVDb21wYXJlKGIudXNhZ2UsIGBlbmAsIHsgdXNhZ2U6IGBzb3J0YCwgY2FzZUZpcnN0OiBgdXBwZXJgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGNhdGVnb3J5TmFtZSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IGNhdGVnb3J5TmFtZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgOiBgR2VuZXJhbCBjb21tYW5kc2A7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5oZWFkZXIoYCR7aGVhZGVyfWApfVxcbmA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IGNvbW1hbmRDbGFzcywgdXNhZ2UgfSBvZiBjb21tYW5kcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2MgPSBjb21tYW5kQ2xhc3MudXNhZ2UuZGVzY3JpcHRpb24gfHwgYHVuZG9jdW1lbnRlZGA7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgXFxuYDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAgICR7dGhpcy5mb3JtYXQoY29sb3JlZCkuYm9sZCh1c2FnZSl9XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAgICAgJHtmb3JtYXQuZm9ybWF0TWFya2Rvd25pc2goZG9jLCB7IGZvcm1hdDogdGhpcy5mb3JtYXQoY29sb3JlZCksIHBhcmFncmFwaHM6IGZhbHNlIH0pfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgcmVzdWx0ICs9IGZvcm1hdC5mb3JtYXRNYXJrZG93bmlzaChgWW91IGNhbiBhbHNvIHByaW50IG1vcmUgZGV0YWlscyBhYm91dCBhbnkgb2YgdGhlc2UgY29tbWFuZHMgYnkgY2FsbGluZyB0aGVtIHdpdGggdGhlIFxcYC1oLC0taGVscFxcYCBmbGFnIHJpZ2h0IGFmdGVyIHRoZSBjb21tYW5kIG5hbWUuYCwgeyBmb3JtYXQ6IHRoaXMuZm9ybWF0KGNvbG9yZWQpLCBwYXJhZ3JhcGhzOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFkZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdXNhZ2UgfSA9IHRoaXMuZ2V0VXNhZ2VCeVJlZ2lzdHJhdGlvbihjb21tYW5kQ2xhc3MpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5ib2xkKHByZWZpeCl9JHt1c2FnZX1cXG5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZXNjcmlwdGlvbiA9IGBgLCBkZXRhaWxzID0gYGAsIGV4YW1wbGVzID0gW10sIH0gPSBjb21tYW5kQ2xhc3MudXNhZ2UgfHwge307XG4gICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uICE9PSBgYCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZm9ybWF0LmZvcm1hdE1hcmtkb3duaXNoKGRlc2NyaXB0aW9uLCB7IGZvcm1hdDogdGhpcy5mb3JtYXQoY29sb3JlZCksIHBhcmFncmFwaHM6IGZhbHNlIH0pLnJlcGxhY2UoL14uLywgJDAgPT4gJDAudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgXFxuYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRldGFpbHMgIT09IGBgIHx8IGV4YW1wbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke3RoaXMuZm9ybWF0KGNvbG9yZWQpLmhlYWRlcihgVXNhZ2VgKX1cXG5gO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYFxcbmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdXNhZ2UsIG9wdGlvbnMgfSA9IHRoaXMuZ2V0VXNhZ2VCeVJlZ2lzdHJhdGlvbihjb21tYW5kQ2xhc3MsIHsgaW5saW5lT3B0aW9uczogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke3RoaXMuZm9ybWF0KGNvbG9yZWQpLmJvbGQocHJlZml4KX0ke3VzYWdlfVxcbmA7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYFxcbmA7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5oZWFkZXIoYE9wdGlvbnNgKX1cXG5gO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhEZWZpbml0aW9uTGVuZ3RoID0gb3B0aW9ucy5yZWR1Y2UoKGxlbmd0aCwgb3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobGVuZ3RoLCBvcHRpb24uZGVmaW5pdGlvbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgZGVmaW5pdGlvbiwgZGVzY3JpcHRpb24gfSBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCAgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5ib2xkKGRlZmluaXRpb24ucGFkRW5kKG1heERlZmluaXRpb25MZW5ndGgpKX0gICAgJHtmb3JtYXQuZm9ybWF0TWFya2Rvd25pc2goZGVzY3JpcHRpb24sIHsgZm9ybWF0OiB0aGlzLmZvcm1hdChjb2xvcmVkKSwgcGFyYWdyYXBoczogZmFsc2UgfSl9YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGV0YWlscyAhPT0gYGApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7dGhpcy5mb3JtYXQoY29sb3JlZCkuaGVhZGVyKGBEZXRhaWxzYCl9XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gZm9ybWF0LmZvcm1hdE1hcmtkb3duaXNoKGRldGFpbHMsIHsgZm9ybWF0OiB0aGlzLmZvcm1hdChjb2xvcmVkKSwgcGFyYWdyYXBoczogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV4YW1wbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7dGhpcy5mb3JtYXQoY29sb3JlZCkuaGVhZGVyKGBFeGFtcGxlc2ApfVxcbmA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2Rlc2NyaXB0aW9uLCBleGFtcGxlXSBvZiBleGFtcGxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGBcXG5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGZvcm1hdC5mb3JtYXRNYXJrZG93bmlzaChkZXNjcmlwdGlvbiwgeyBmb3JtYXQ6IHRoaXMuZm9ybWF0KGNvbG9yZWQpLCBwYXJhZ3JhcGhzOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHtleGFtcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14vbSwgYCAgJHt0aGlzLmZvcm1hdChjb2xvcmVkKS5ib2xkKHByZWZpeCl9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwkMC9nLCB0aGlzLmJpbmFyeU5hbWUpfVxcbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZXJyb3IoZXJyb3IsIF9hKSB7XG4gICAgICAgIHZhciBfYjtcbiAgICAgICAgdmFyIHsgY29sb3JlZCwgY29tbWFuZCA9IChfYiA9IGVycm9yW2Vycm9yQ29tbWFuZFN5bWJvbF0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwgfSA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hO1xuICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSlcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBFeGVjdXRpb24gZmFpbGVkIHdpdGggYSBub24tZXJyb3IgcmVqZWN0aW9uIChyZWplY3RlZCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShlcnJvcil9KWApO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYGA7XG4gICAgICAgIGxldCBuYW1lID0gZXJyb3IubmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBgJDEgJDJgKTtcbiAgICAgICAgaWYgKG5hbWUgPT09IGBFcnJvcmApXG4gICAgICAgICAgICBuYW1lID0gYEludGVybmFsIEVycm9yYDtcbiAgICAgICAgcmVzdWx0ICs9IGAke3RoaXMuZm9ybWF0KGNvbG9yZWQpLmVycm9yKG5hbWUpfTogJHtlcnJvci5tZXNzYWdlfVxcbmA7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBlcnJvci5jbGlwYW5pb247XG4gICAgICAgIGlmICh0eXBlb2YgbWV0YSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgIGlmIChtZXRhLnR5cGUgPT09IGB1c2FnZWApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gYFxcbmA7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMudXNhZ2UoY29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7ZXJyb3Iuc3RhY2sucmVwbGFjZSgvXi4qXFxuLywgYGApfVxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZm9ybWF0KGNvbG9yZWQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IGNvbG9yZWQgIT09IG51bGwgJiYgY29sb3JlZCAhPT0gdm9pZCAwID8gY29sb3JlZCA6IHRoaXMuZW5hYmxlQ29sb3JzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDbGkuZGVmYXVsdENvbnRleHQuY29sb3JEZXB0aCA+IDEpID8gZm9ybWF0LnJpY2hGb3JtYXQgOiBmb3JtYXQudGV4dEZvcm1hdDtcbiAgICB9XG4gICAgZ2V0VXNhZ2VCeVJlZ2lzdHJhdGlvbihrbGFzcywgb3B0cykge1xuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGlzLnJlZ2lzdHJhdGlvbnMuZ2V0KGtsYXNzKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZWNvcmQgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBc3NlcnRpb24gZmFpbGVkOiBVbnJlZ2lzdGVyZWQgY29tbWFuZGApO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2FnZUJ5SW5kZXgocmVjb3JkLmluZGV4LCBvcHRzKTtcbiAgICB9XG4gICAgZ2V0VXNhZ2VCeUluZGV4KG4sIG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRlci5nZXRCdWlsZGVyQnlJbmRleChuKS51c2FnZShvcHRzKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IGNvbnRleHQgb2YgdGhlIENMSS5cbiAqXG4gKiBDb250YWlucyB0aGUgc3RkaW8gb2YgdGhlIGN1cnJlbnQgYHByb2Nlc3NgLlxuICovXG5DbGkuZGVmYXVsdENvbnRleHQgPSB7XG4gICAgZW52OiBwcm9jZXNzLmVudixcbiAgICBzdGRpbjogcHJvY2Vzcy5zdGRpbixcbiAgICBzdGRvdXQ6IHByb2Nlc3Muc3Rkb3V0LFxuICAgIHN0ZGVycjogcHJvY2Vzcy5zdGRlcnIsXG4gICAgY29sb3JEZXB0aDogcGxhdGZvcm0uZ2V0RGVmYXVsdENvbG9yRGVwdGgoKSxcbn07XG5mdW5jdGlvbiBub29wQ2FwdHVyZUFjdGl2YXRvcihmbikge1xuICAgIHJldHVybiBmbigpO1xufVxuXG5leHBvcnRzLkNsaSA9IENsaTtcbmV4cG9ydHMucnVuID0gcnVuO1xuZXhwb3J0cy5ydW5FeGl0ID0gcnVuRXhpdDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBhZHZhbmNlZF9Db21tYW5kID0gcmVxdWlyZSgnLi4vQ29tbWFuZC5qcycpO1xuXG4vKipcbiAqIEEgY29tbWFuZCB0aGF0IHByaW50cyB0aGUgY2xpcGFuaW9uIGRlZmluaXRpb25zLlxuICovXG5jbGFzcyBEZWZpbml0aW9uc0NvbW1hbmQgZXh0ZW5kcyBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmQge1xuICAgIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdGRvdXQud3JpdGUoYCR7SlNPTi5zdHJpbmdpZnkodGhpcy5jbGkuZGVmaW5pdGlvbnMoKSwgbnVsbCwgMil9XFxuYCk7XG4gICAgfVxufVxuRGVmaW5pdGlvbnNDb21tYW5kLnBhdGhzID0gW1tgLS1jbGlwYW5pb249ZGVmaW5pdGlvbnNgXV07XG5cbmV4cG9ydHMuRGVmaW5pdGlvbnNDb21tYW5kID0gRGVmaW5pdGlvbnNDb21tYW5kO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX0NvbW1hbmQgPSByZXF1aXJlKCcuLi9Db21tYW5kLmpzJyk7XG5cbi8qKlxuICogQSBjb21tYW5kIHRoYXQgcHJpbnRzIHRoZSB1c2FnZSBvZiBhbGwgY29tbWFuZHMuXG4gKlxuICogUGF0aHM6IGAtaGAsIGAtLWhlbHBgXG4gKi9cbmNsYXNzIEhlbHBDb21tYW5kIGV4dGVuZHMgYWR2YW5jZWRfQ29tbWFuZC5Db21tYW5kIHtcbiAgICBhc3luYyBleGVjdXRlKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Rkb3V0LndyaXRlKHRoaXMuY2xpLnVzYWdlKCkpO1xuICAgIH1cbn1cbkhlbHBDb21tYW5kLnBhdGhzID0gW1tgLWhgXSwgW2AtLWhlbHBgXV07XG5cbmV4cG9ydHMuSGVscENvbW1hbmQgPSBIZWxwQ29tbWFuZDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBhZHZhbmNlZF9Db21tYW5kID0gcmVxdWlyZSgnLi4vQ29tbWFuZC5qcycpO1xuXG4vKipcbiAqIEEgY29tbWFuZCB0aGF0IHByaW50cyB0aGUgdmVyc2lvbiBvZiB0aGUgYmluYXJ5IChgY2xpLmJpbmFyeVZlcnNpb25gKS5cbiAqXG4gKiBQYXRoczogYC12YCwgYC0tdmVyc2lvbmBcbiAqL1xuY2xhc3MgVmVyc2lvbkNvbW1hbmQgZXh0ZW5kcyBhZHZhbmNlZF9Db21tYW5kLkNvbW1hbmQge1xuICAgIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0ZG91dC53cml0ZShgJHsoX2EgPSB0aGlzLmNsaS5iaW5hcnlWZXJzaW9uKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgPHVua25vd24+YH1cXG5gKTtcbiAgICB9XG59XG5WZXJzaW9uQ29tbWFuZC5wYXRocyA9IFtbYC12YF0sIFtgLS12ZXJzaW9uYF1dO1xuXG5leHBvcnRzLlZlcnNpb25Db21tYW5kID0gVmVyc2lvbkNvbW1hbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgYWR2YW5jZWRfYnVpbHRpbnNfZGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL2RlZmluaXRpb25zLmpzJyk7XG52YXIgYWR2YW5jZWRfYnVpbHRpbnNfaGVscCA9IHJlcXVpcmUoJy4vaGVscC5qcycpO1xudmFyIGFkdmFuY2VkX2J1aWx0aW5zX3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24uanMnKTtcblxuXG5cbmV4cG9ydHMuRGVmaW5pdGlvbnNDb21tYW5kID0gYWR2YW5jZWRfYnVpbHRpbnNfZGVmaW5pdGlvbnMuRGVmaW5pdGlvbnNDb21tYW5kO1xuZXhwb3J0cy5IZWxwQ29tbWFuZCA9IGFkdmFuY2VkX2J1aWx0aW5zX2hlbHAuSGVscENvbW1hbmQ7XG5leHBvcnRzLlZlcnNpb25Db21tYW5kID0gYWR2YW5jZWRfYnVpbHRpbnNfdmVyc2lvbi5WZXJzaW9uQ29tbWFuZDtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBhZHZhbmNlZF9vcHRpb25zX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG5mdW5jdGlvbiBBcnJheShkZXNjcmlwdG9yLCBpbml0aWFsVmFsdWVCYXNlLCBvcHRzQmFzZSkge1xuICAgIGNvbnN0IFtpbml0aWFsVmFsdWUsIG9wdHNdID0gYWR2YW5jZWRfb3B0aW9uc191dGlscy5yZXJvdXRlQXJndW1lbnRzKGluaXRpYWxWYWx1ZUJhc2UsIG9wdHNCYXNlICE9PSBudWxsICYmIG9wdHNCYXNlICE9PSB2b2lkIDAgPyBvcHRzQmFzZSA6IHt9KTtcbiAgICBjb25zdCB7IGFyaXR5ID0gMSB9ID0gb3B0cztcbiAgICBjb25zdCBvcHROYW1lcyA9IGRlc2NyaXB0b3Iuc3BsaXQoYCxgKTtcbiAgICBjb25zdCBuYW1lU2V0ID0gbmV3IFNldChvcHROYW1lcyk7XG4gICAgcmV0dXJuIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMubWFrZUNvbW1hbmRPcHRpb24oe1xuICAgICAgICBkZWZpbml0aW9uKGJ1aWxkZXIpIHtcbiAgICAgICAgICAgIGJ1aWxkZXIuYWRkT3B0aW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lczogb3B0TmFtZXMsXG4gICAgICAgICAgICAgICAgYXJpdHksXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBvcHRzID09PSBudWxsIHx8IG9wdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdHMuaGlkZGVuLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBvcHRzID09PSBudWxsIHx8IG9wdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IG9wdHMucmVxdWlyZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNmb3JtZXIoYnVpbGRlciwga2V5LCBzdGF0ZSkge1xuICAgICAgICAgICAgbGV0IHVzZWROYW1lO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHR5cGVvZiBpbml0aWFsVmFsdWUgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgPyBbLi4uaW5pdGlhbFZhbHVlXVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IG5hbWUsIHZhbHVlIH0gb2Ygc3RhdGUub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICghbmFtZVNldC5oYXMobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHVzZWROYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgIT09IG51bGwgJiYgY3VycmVudFZhbHVlICE9PSB2b2lkIDAgPyBjdXJyZW50VmFsdWUgOiBbXTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWR2YW5jZWRfb3B0aW9uc191dGlscy5hcHBseVZhbGlkYXRvcih1c2VkTmFtZSAhPT0gbnVsbCAmJiB1c2VkTmFtZSAhPT0gdm9pZCAwID8gdXNlZE5hbWUgOiBrZXksIGN1cnJlbnRWYWx1ZSwgb3B0cy52YWxpZGF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuZXhwb3J0cy5BcnJheSA9IEFycmF5O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbmZ1bmN0aW9uIEJvb2xlYW4oZGVzY3JpcHRvciwgaW5pdGlhbFZhbHVlQmFzZSwgb3B0c0Jhc2UpIHtcbiAgICBjb25zdCBbaW5pdGlhbFZhbHVlLCBvcHRzXSA9IGFkdmFuY2VkX29wdGlvbnNfdXRpbHMucmVyb3V0ZUFyZ3VtZW50cyhpbml0aWFsVmFsdWVCYXNlLCBvcHRzQmFzZSAhPT0gbnVsbCAmJiBvcHRzQmFzZSAhPT0gdm9pZCAwID8gb3B0c0Jhc2UgOiB7fSk7XG4gICAgY29uc3Qgb3B0TmFtZXMgPSBkZXNjcmlwdG9yLnNwbGl0KGAsYCk7XG4gICAgY29uc3QgbmFtZVNldCA9IG5ldyBTZXQob3B0TmFtZXMpO1xuICAgIHJldHVybiBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLm1ha2VDb21tYW5kT3B0aW9uKHtcbiAgICAgICAgZGVmaW5pdGlvbihidWlsZGVyKSB7XG4gICAgICAgICAgICBidWlsZGVyLmFkZE9wdGlvbih7XG4gICAgICAgICAgICAgICAgbmFtZXM6IG9wdE5hbWVzLFxuICAgICAgICAgICAgICAgIGFsbG93QmluZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJpdHk6IDAsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBvcHRzLmhpZGRlbixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogb3B0cy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogb3B0cy5yZXF1aXJlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0cmFuc2Zvcm1lcihidWlsZXIsIGtleSwgc3RhdGUpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZSwgdmFsdWUgfSBvZiBzdGF0ZS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lU2V0LmhhcyhuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5leHBvcnRzLkJvb2xlYW4gPSBCb29sZWFuO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbmZ1bmN0aW9uIENvdW50ZXIoZGVzY3JpcHRvciwgaW5pdGlhbFZhbHVlQmFzZSwgb3B0c0Jhc2UpIHtcbiAgICBjb25zdCBbaW5pdGlhbFZhbHVlLCBvcHRzXSA9IGFkdmFuY2VkX29wdGlvbnNfdXRpbHMucmVyb3V0ZUFyZ3VtZW50cyhpbml0aWFsVmFsdWVCYXNlLCBvcHRzQmFzZSAhPT0gbnVsbCAmJiBvcHRzQmFzZSAhPT0gdm9pZCAwID8gb3B0c0Jhc2UgOiB7fSk7XG4gICAgY29uc3Qgb3B0TmFtZXMgPSBkZXNjcmlwdG9yLnNwbGl0KGAsYCk7XG4gICAgY29uc3QgbmFtZVNldCA9IG5ldyBTZXQob3B0TmFtZXMpO1xuICAgIHJldHVybiBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLm1ha2VDb21tYW5kT3B0aW9uKHtcbiAgICAgICAgZGVmaW5pdGlvbihidWlsZGVyKSB7XG4gICAgICAgICAgICBidWlsZGVyLmFkZE9wdGlvbih7XG4gICAgICAgICAgICAgICAgbmFtZXM6IG9wdE5hbWVzLFxuICAgICAgICAgICAgICAgIGFsbG93QmluZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJpdHk6IDAsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBvcHRzLmhpZGRlbixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogb3B0cy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogb3B0cy5yZXF1aXJlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0cmFuc2Zvcm1lcihidWlsZGVyLCBrZXksIHN0YXRlKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IG5hbWUsIHZhbHVlIH0gb2Ygc3RhdGUub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICghbmFtZVNldC5oYXMobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSAhPT0gbnVsbCAmJiBjdXJyZW50VmFsdWUgIT09IHZvaWQgMCA/IGN1cnJlbnRWYWx1ZSA6IChjdXJyZW50VmFsdWUgPSAwKTtcbiAgICAgICAgICAgICAgICAvLyBOZWdhdGVkIG9wdGlvbnMgcmVzZXQgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5leHBvcnRzLkNvdW50ZXIgPSBDb3VudGVyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbi8qKlxuICogVXNlZCB0byBhbm5vdGF0ZSB0aGF0IHRoZSBjb21tYW5kIHdhbnRzIHRvIHJldHJpZXZlIGFsbCB0cmFpbGluZ1xuICogYXJndW1lbnRzIHRoYXQgY2Fubm90IGJlIHRpZWQgdG8gYSBkZWNsYXJlZCBvcHRpb24uXG4gKlxuICogQmUgY2FyZWZ1bDogdGhpcyBmdW5jdGlvbiBpcyBvcmRlci1kZXBlbmRlbnQhIE1ha2Ugc3VyZSB0byBkZWZpbmUgaXRcbiAqIGFmdGVyIGFueSBwb3NpdGlvbmFsIGFyZ3VtZW50IHlvdSB3YW50IHRvIGRlY2xhcmUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBtdXR1YWxseSBleGNsdXNpdmUgd2l0aCBPcHRpb24uUmVzdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogeWFybiBydW4gZm9vIGhlbGxvIC0tZm9vPWJhciB3b3JsZFxuICogICAgIFx1MjVCQSBwcm94eSA9IFtcImhlbGxvXCIsIFwiLS1mb289YmFyXCIsIFwid29ybGRcIl1cbiAqL1xuZnVuY3Rpb24gUHJveHkob3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMubWFrZUNvbW1hbmRPcHRpb24oe1xuICAgICAgICBkZWZpbml0aW9uKGJ1aWxkZXIsIGtleSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgYnVpbGRlci5hZGRQcm94eSh7XG4gICAgICAgICAgICAgICAgbmFtZTogKF9hID0gb3B0cy5uYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBrZXksXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IG9wdHMucmVxdWlyZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNmb3JtZXIoYnVpbGRlciwga2V5LCBzdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnBvc2l0aW9uYWxzLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbmV4cG9ydHMuUHJveHkgPSBQcm94eTtcbiIsICIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vY29yZS5qcycpO1xudmFyIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbi8qKlxuICogVXNlZCB0byBhbm5vdGF0ZSB0aGF0IHRoZSBjb21tYW5kIHN1cHBvcnRzIGFueSBudW1iZXIgb2YgcG9zaXRpb25hbFxuICogYXJndW1lbnRzLlxuICpcbiAqIEJlIGNhcmVmdWw6IHRoaXMgZnVuY3Rpb24gaXMgb3JkZXItZGVwZW5kZW50ISBNYWtlIHN1cmUgdG8gZGVmaW5lIGl0XG4gKiBhZnRlciBhbnkgcG9zaXRpb25hbCBhcmd1bWVudCB5b3Ugd2FudCB0byBkZWNsYXJlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggT3B0aW9uLlByb3h5LlxuICpcbiAqIEBleGFtcGxlXG4gKiB5YXJuIGFkZCBoZWxsbyB3b3JsZFxuICogICAgIFx1MjVCQSByZXN0ID0gW1wiaGVsbG9cIiwgXCJ3b3JsZFwiXVxuICovXG5mdW5jdGlvbiBSZXN0KG9wdHMgPSB7fSkge1xuICAgIHJldHVybiBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLm1ha2VDb21tYW5kT3B0aW9uKHtcbiAgICAgICAgZGVmaW5pdGlvbihidWlsZGVyLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGJ1aWxkZXIuYWRkUmVzdCh7XG4gICAgICAgICAgICAgICAgbmFtZTogKF9hID0gb3B0cy5uYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBrZXksXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IG9wdHMucmVxdWlyZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNmb3JtZXIoYnVpbGRlciwga2V5LCBzdGF0ZSkge1xuICAgICAgICAgICAgLy8gVGhlIGJ1aWxkZXIncyBhcml0eS5leHRyYSB3aWxsIGFsd2F5cyBiZSBOb0xpbWl0cyxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgaXQgaXMgc2V0IHdoZW4gd2UgY2FsbCByZWdpc3RlckRlZmluaXRpb25cbiAgICAgICAgICAgIGNvbnN0IGlzUmVzdFBvc2l0aW9uYWwgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbmFsID0gc3RhdGUucG9zaXRpb25hbHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIC8vIEEgTm9MaW1pdHMgZXh0cmEgKGkuZS4gYW4gb3B0aW9uYWwgcmVzdCBhcmd1bWVudClcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25hbC5leHRyYSA9PT0gY29yZS5Ob0xpbWl0cylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgLy8gQSBsZWFkaW5nIHBvc2l0aW9uYWwgKGkuZS4gYSByZXF1aXJlZCByZXN0IGFyZ3VtZW50KVxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbmFsLmV4dHJhID09PSBmYWxzZSAmJiBpbmRleCA8IGJ1aWxkZXIuYXJpdHkubGVhZGluZy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvdW50IDwgc3RhdGUucG9zaXRpb25hbHMubGVuZ3RoICYmIGlzUmVzdFBvc2l0aW9uYWwoY291bnQpKVxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUucG9zaXRpb25hbHMuc3BsaWNlKDAsIGNvdW50KS5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5leHBvcnRzLlJlc3QgPSBSZXN0O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGNvcmUgPSByZXF1aXJlKCcuLi8uLi9jb3JlLmpzJyk7XG52YXIgYWR2YW5jZWRfb3B0aW9uc191dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxuZnVuY3Rpb24gU3RyaW5nT3B0aW9uKGRlc2NyaXB0b3IsIGluaXRpYWxWYWx1ZUJhc2UsIG9wdHNCYXNlKSB7XG4gICAgY29uc3QgW2luaXRpYWxWYWx1ZSwgb3B0c10gPSBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLnJlcm91dGVBcmd1bWVudHMoaW5pdGlhbFZhbHVlQmFzZSwgb3B0c0Jhc2UgIT09IG51bGwgJiYgb3B0c0Jhc2UgIT09IHZvaWQgMCA/IG9wdHNCYXNlIDoge30pO1xuICAgIGNvbnN0IHsgYXJpdHkgPSAxIH0gPSBvcHRzO1xuICAgIGNvbnN0IG9wdE5hbWVzID0gZGVzY3JpcHRvci5zcGxpdChgLGApO1xuICAgIGNvbnN0IG5hbWVTZXQgPSBuZXcgU2V0KG9wdE5hbWVzKTtcbiAgICByZXR1cm4gYWR2YW5jZWRfb3B0aW9uc191dGlscy5tYWtlQ29tbWFuZE9wdGlvbih7XG4gICAgICAgIGRlZmluaXRpb24oYnVpbGRlcikge1xuICAgICAgICAgICAgYnVpbGRlci5hZGRPcHRpb24oe1xuICAgICAgICAgICAgICAgIG5hbWVzOiBvcHROYW1lcyxcbiAgICAgICAgICAgICAgICBhcml0eTogb3B0cy50b2xlcmF0ZUJvb2xlYW4gPyAwIDogYXJpdHksXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBvcHRzLmhpZGRlbixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogb3B0cy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogb3B0cy5yZXF1aXJlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0cmFuc2Zvcm1lcihidWlsZGVyLCBrZXksIHN0YXRlLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBsZXQgdXNlZE5hbWU7XG4gICAgICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLmVudiAhPT0gYHVuZGVmaW5lZGAgJiYgY29udGV4dC5lbnZbb3B0cy5lbnZdKSB7XG4gICAgICAgICAgICAgICAgdXNlZE5hbWUgPSBvcHRzLmVudjtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBjb250ZXh0LmVudltvcHRzLmVudl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZSwgdmFsdWUgfSBvZiBzdGF0ZS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lU2V0LmhhcyhuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdXNlZE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMuYXBwbHlWYWxpZGF0b3IodXNlZE5hbWUgIT09IG51bGwgJiYgdXNlZE5hbWUgIT09IHZvaWQgMCA/IHVzZWROYW1lIDoga2V5LCBjdXJyZW50VmFsdWUsIG9wdHMudmFsaWRhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5mdW5jdGlvbiBTdHJpbmdQb3NpdGlvbmFsKG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IHsgcmVxdWlyZWQgPSB0cnVlIH0gPSBvcHRzO1xuICAgIHJldHVybiBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLm1ha2VDb21tYW5kT3B0aW9uKHtcbiAgICAgICAgZGVmaW5pdGlvbihidWlsZGVyLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGJ1aWxkZXIuYWRkUG9zaXRpb25hbCh7XG4gICAgICAgICAgICAgICAgbmFtZTogKF9hID0gb3B0cy5uYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBrZXksXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IG9wdHMucmVxdWlyZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNmb3JtZXIoYnVpbGRlciwga2V5LCBzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5wb3NpdGlvbmFscy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIHNraXAgTm9MaW1pdHMgZXh0cmFzLiBXZSBvbmx5IGNhcmUgYWJvdXRcbiAgICAgICAgICAgICAgICAvLyByZXF1aXJlZCBhbmQgb3B0aW9uYWwgZmluaXRlIHBvc2l0aW9uYWxzLlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5wb3NpdGlvbmFsc1tpXS5leHRyYSA9PT0gY29yZS5Ob0xpbWl0cylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc2tpcCBvcHRpb25hbCBwb3NpdGlvbmFscyB3aGVuIHdlIG9ubHlcbiAgICAgICAgICAgICAgICAvLyBjYXJlIGFib3V0IHJlcXVpcmVkIHBvc2l0aW9uYWxzLlxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCAmJiBzdGF0ZS5wb3NpdGlvbmFsc1tpXS5leHRyYSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc2tpcCByZXF1aXJlZCBwb3NpdGlvbmFscyB3aGVuIHdlIG9ubHlcbiAgICAgICAgICAgICAgICAvLyBjYXJlIGFib3V0IG9wdGlvbmFsIHBvc2l0aW9uYWxzLlxuICAgICAgICAgICAgICAgIGlmICghcmVxdWlyZWQgJiYgc3RhdGUucG9zaXRpb25hbHNbaV0uZXh0cmEgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAvLyBXZSByZW1vdmUgdGhlIHBvc2l0aW9uYWwgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGNvbnN0IFtwb3NpdGlvbmFsXSA9IHN0YXRlLnBvc2l0aW9uYWxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWR2YW5jZWRfb3B0aW9uc191dGlscy5hcHBseVZhbGlkYXRvcigoX2EgPSBvcHRzLm5hbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGtleSwgcG9zaXRpb25hbC52YWx1ZSwgb3B0cy52YWxpZGF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbi8vIFRoaXMgZnVuY3Rpb24gaXMgYmFkbHkgdHlwZWQsIGJ1dCBpdCBkb2Vzbid0IG1hdHRlciBiZWNhdXNlIHRoZSBvdmVybG9hZHMgcHJvdmlkZSB0aGUgdHJ1ZSBwdWJsaWMgdHlwaW5nc1xuZnVuY3Rpb24gU3RyaW5nKGRlc2NyaXB0b3IsIC4uLmFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmdPcHRpb24oZGVzY3JpcHRvciwgLi4uYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gU3RyaW5nUG9zaXRpb25hbChkZXNjcmlwdG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuU3RyaW5nID0gU3RyaW5nO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGFkdmFuY2VkX29wdGlvbnNfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG52YXIgYWR2YW5jZWRfb3B0aW9uc19BcnJheSA9IHJlcXVpcmUoJy4vQXJyYXkuanMnKTtcbnZhciBhZHZhbmNlZF9vcHRpb25zX0Jvb2xlYW4gPSByZXF1aXJlKCcuL0Jvb2xlYW4uanMnKTtcbnZhciBhZHZhbmNlZF9vcHRpb25zX0NvdW50ZXIgPSByZXF1aXJlKCcuL0NvdW50ZXIuanMnKTtcbnZhciBhZHZhbmNlZF9vcHRpb25zX1Byb3h5ID0gcmVxdWlyZSgnLi9Qcm94eS5qcycpO1xudmFyIGFkdmFuY2VkX29wdGlvbnNfUmVzdCA9IHJlcXVpcmUoJy4vUmVzdC5qcycpO1xudmFyIGFkdmFuY2VkX29wdGlvbnNfU3RyaW5nID0gcmVxdWlyZSgnLi9TdHJpbmcuanMnKTtcblxuXG5cbmV4cG9ydHMuYXBwbHlWYWxpZGF0b3IgPSBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLmFwcGx5VmFsaWRhdG9yO1xuZXhwb3J0cy5jbGVhblZhbGlkYXRpb25FcnJvciA9IGFkdmFuY2VkX29wdGlvbnNfdXRpbHMuY2xlYW5WYWxpZGF0aW9uRXJyb3I7XG5leHBvcnRzLmZvcm1hdEVycm9yID0gYWR2YW5jZWRfb3B0aW9uc191dGlscy5mb3JtYXRFcnJvcjtcbmV4cG9ydHMuaXNPcHRpb25TeW1ib2wgPSBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLmlzT3B0aW9uU3ltYm9sO1xuZXhwb3J0cy5tYWtlQ29tbWFuZE9wdGlvbiA9IGFkdmFuY2VkX29wdGlvbnNfdXRpbHMubWFrZUNvbW1hbmRPcHRpb247XG5leHBvcnRzLnJlcm91dGVBcmd1bWVudHMgPSBhZHZhbmNlZF9vcHRpb25zX3V0aWxzLnJlcm91dGVBcmd1bWVudHM7XG5leHBvcnRzLkFycmF5ID0gYWR2YW5jZWRfb3B0aW9uc19BcnJheS5BcnJheTtcbmV4cG9ydHMuQm9vbGVhbiA9IGFkdmFuY2VkX29wdGlvbnNfQm9vbGVhbi5Cb29sZWFuO1xuZXhwb3J0cy5Db3VudGVyID0gYWR2YW5jZWRfb3B0aW9uc19Db3VudGVyLkNvdW50ZXI7XG5leHBvcnRzLlByb3h5ID0gYWR2YW5jZWRfb3B0aW9uc19Qcm94eS5Qcm94eTtcbmV4cG9ydHMuUmVzdCA9IGFkdmFuY2VkX29wdGlvbnNfUmVzdC5SZXN0O1xuZXhwb3J0cy5TdHJpbmcgPSBhZHZhbmNlZF9vcHRpb25zX1N0cmluZy5TdHJpbmc7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi4vZXJyb3JzLmpzJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnLi4vZm9ybWF0LmpzJyk7XG52YXIgYWR2YW5jZWRfQ29tbWFuZCA9IHJlcXVpcmUoJy4vQ29tbWFuZC5qcycpO1xudmFyIGFkdmFuY2VkX0NsaSA9IHJlcXVpcmUoJy4vQ2xpLmpzJyk7XG52YXIgYWR2YW5jZWRfYnVpbHRpbnNfaW5kZXggPSByZXF1aXJlKCcuL2J1aWx0aW5zL2luZGV4LmpzJyk7XG52YXIgYWR2YW5jZWRfb3B0aW9uc19pbmRleCA9IHJlcXVpcmUoJy4vb3B0aW9ucy9pbmRleC5qcycpO1xuXG5cblxuZXhwb3J0cy5Vc2FnZUVycm9yID0gZXJyb3JzLlVzYWdlRXJyb3I7XG5leHBvcnRzLmZvcm1hdE1hcmtkb3duaXNoID0gZm9ybWF0LmZvcm1hdE1hcmtkb3duaXNoO1xuZXhwb3J0cy5Db21tYW5kID0gYWR2YW5jZWRfQ29tbWFuZC5Db21tYW5kO1xuZXhwb3J0cy5DbGkgPSBhZHZhbmNlZF9DbGkuQ2xpO1xuZXhwb3J0cy5ydW4gPSBhZHZhbmNlZF9DbGkucnVuO1xuZXhwb3J0cy5ydW5FeGl0ID0gYWR2YW5jZWRfQ2xpLnJ1bkV4aXQ7XG5leHBvcnRzLkJ1aWx0aW5zID0gYWR2YW5jZWRfYnVpbHRpbnNfaW5kZXg7XG5leHBvcnRzLk9wdGlvbiA9IGFkdmFuY2VkX29wdGlvbnNfaW5kZXg7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5mdW5jdGlvbiBjaGVja1BhdGhFeHQgKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIHBhdGhleHQgPSBvcHRpb25zLnBhdGhFeHQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy5wYXRoRXh0IDogcHJvY2Vzcy5lbnYuUEFUSEVYVFxuXG4gIGlmICghcGF0aGV4dCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBwYXRoZXh0ID0gcGF0aGV4dC5zcGxpdCgnOycpXG4gIGlmIChwYXRoZXh0LmluZGV4T2YoJycpICE9PSAtMSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHAgPSBwYXRoZXh0W2ldLnRvTG93ZXJDYXNlKClcbiAgICBpZiAocCAmJiBwYXRoLnN1YnN0cigtcC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IHApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXQgKHN0YXQsIHBhdGgsIG9wdGlvbnMpIHtcbiAgaWYgKCFzdGF0LmlzU3ltYm9saWNMaW5rKCkgJiYgIXN0YXQuaXNGaWxlKCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gY2hlY2tQYXRoRXh0KHBhdGgsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGlzZXhlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICBmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uIChlciwgc3RhdCkge1xuICAgIGNiKGVyLCBlciA/IGZhbHNlIDogY2hlY2tTdGF0KHN0YXQsIHBhdGgsIG9wdGlvbnMpKVxuICB9KVxufVxuXG5mdW5jdGlvbiBzeW5jIChwYXRoLCBvcHRpb25zKSB7XG4gIHJldHVybiBjaGVja1N0YXQoZnMuc3RhdFN5bmMocGF0aCksIHBhdGgsIG9wdGlvbnMpXG59XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXQgKHN0YXQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXQuaXNGaWxlKCkgJiYgY2hlY2tNb2RlKHN0YXQsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGNoZWNrTW9kZSAoc3RhdCwgb3B0aW9ucykge1xuICB2YXIgbW9kID0gc3RhdC5tb2RlXG4gIHZhciB1aWQgPSBzdGF0LnVpZFxuICB2YXIgZ2lkID0gc3RhdC5naWRcblxuICB2YXIgbXlVaWQgPSBvcHRpb25zLnVpZCAhPT0gdW5kZWZpbmVkID9cbiAgICBvcHRpb25zLnVpZCA6IHByb2Nlc3MuZ2V0dWlkICYmIHByb2Nlc3MuZ2V0dWlkKClcbiAgdmFyIG15R2lkID0gb3B0aW9ucy5naWQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy5naWQgOiBwcm9jZXNzLmdldGdpZCAmJiBwcm9jZXNzLmdldGdpZCgpXG5cbiAgdmFyIHUgPSBwYXJzZUludCgnMTAwJywgOClcbiAgdmFyIGcgPSBwYXJzZUludCgnMDEwJywgOClcbiAgdmFyIG8gPSBwYXJzZUludCgnMDAxJywgOClcbiAgdmFyIHVnID0gdSB8IGdcblxuICB2YXIgcmV0ID0gKG1vZCAmIG8pIHx8XG4gICAgKG1vZCAmIGcpICYmIGdpZCA9PT0gbXlHaWQgfHxcbiAgICAobW9kICYgdSkgJiYgdWlkID09PSBteVVpZCB8fFxuICAgIChtb2QgJiB1ZykgJiYgbXlVaWQgPT09IDBcblxuICByZXR1cm4gcmV0XG59XG4iLCAidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIGNvcmVcbmlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInIHx8IGdsb2JhbC5URVNUSU5HX1dJTkRPV1MpIHtcbiAgY29yZSA9IHJlcXVpcmUoJy4vd2luZG93cy5qcycpXG59IGVsc2Uge1xuICBjb3JlID0gcmVxdWlyZSgnLi9tb2RlLmpzJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxuZnVuY3Rpb24gaXNleGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgaWYgKCFjYikge1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgbm90IHByb3ZpZGVkJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaXNleGUocGF0aCwgb3B0aW9ucyB8fCB7fSwgZnVuY3Rpb24gKGVyLCBpcykge1xuICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICByZWplY3QoZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY29yZShwYXRoLCBvcHRpb25zIHx8IHt9LCBmdW5jdGlvbiAoZXIsIGlzKSB7XG4gICAgLy8gaWdub3JlIEVBQ0NFUyBiZWNhdXNlIHRoYXQganVzdCBtZWFucyB3ZSBhcmVuJ3QgYWxsb3dlZCB0byBydW4gaXRcbiAgICBpZiAoZXIpIHtcbiAgICAgIGlmIChlci5jb2RlID09PSAnRUFDQ0VTJyB8fCBvcHRpb25zICYmIG9wdGlvbnMuaWdub3JlRXJyb3JzKSB7XG4gICAgICAgIGVyID0gbnVsbFxuICAgICAgICBpcyA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGNiKGVyLCBpcylcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICAvLyBteSBraW5nZG9tIGZvciBhIGZpbHRlcmVkIGNhdGNoXG4gIHRyeSB7XG4gICAgcmV0dXJuIGNvcmUuc3luYyhwYXRoLCBvcHRpb25zIHx8IHt9KVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaWdub3JlRXJyb3JzIHx8IGVyLmNvZGUgPT09ICdFQUNDRVMnKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBpc1dpbmRvd3MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInIHx8XG4gICAgcHJvY2Vzcy5lbnYuT1NUWVBFID09PSAnY3lnd2luJyB8fFxuICAgIHByb2Nlc3MuZW52Lk9TVFlQRSA9PT0gJ21zeXMnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IENPTE9OID0gaXNXaW5kb3dzID8gJzsnIDogJzonXG5jb25zdCBpc2V4ZSA9IHJlcXVpcmUoJ2lzZXhlJylcblxuY29uc3QgZ2V0Tm90Rm91bmRFcnJvciA9IChjbWQpID0+XG4gIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKGBub3QgZm91bmQ6ICR7Y21kfWApLCB7IGNvZGU6ICdFTk9FTlQnIH0pXG5cbmNvbnN0IGdldFBhdGhJbmZvID0gKGNtZCwgb3B0KSA9PiB7XG4gIGNvbnN0IGNvbG9uID0gb3B0LmNvbG9uIHx8IENPTE9OXG5cbiAgLy8gSWYgaXQgaGFzIGEgc2xhc2gsIHRoZW4gd2UgZG9uJ3QgYm90aGVyIHNlYXJjaGluZyB0aGUgcGF0aGVudi5cbiAgLy8ganVzdCBjaGVjayB0aGUgZmlsZSBpdHNlbGYsIGFuZCB0aGF0J3MgaXQuXG4gIGNvbnN0IHBhdGhFbnYgPSBjbWQubWF0Y2goL1xcLy8pIHx8IGlzV2luZG93cyAmJiBjbWQubWF0Y2goL1xcXFwvKSA/IFsnJ11cbiAgICA6IChcbiAgICAgIFtcbiAgICAgICAgLy8gd2luZG93cyBhbHdheXMgY2hlY2tzIHRoZSBjd2QgZmlyc3RcbiAgICAgICAgLi4uKGlzV2luZG93cyA/IFtwcm9jZXNzLmN3ZCgpXSA6IFtdKSxcbiAgICAgICAgLi4uKG9wdC5wYXRoIHx8IHByb2Nlc3MuZW52LlBBVEggfHxcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogdmVyeSB1bnVzdWFsICovICcnKS5zcGxpdChjb2xvbiksXG4gICAgICBdXG4gICAgKVxuICBjb25zdCBwYXRoRXh0RXhlID0gaXNXaW5kb3dzXG4gICAgPyBvcHQucGF0aEV4dCB8fCBwcm9jZXNzLmVudi5QQVRIRVhUIHx8ICcuRVhFOy5DTUQ7LkJBVDsuQ09NJ1xuICAgIDogJydcbiAgY29uc3QgcGF0aEV4dCA9IGlzV2luZG93cyA/IHBhdGhFeHRFeGUuc3BsaXQoY29sb24pIDogWycnXVxuXG4gIGlmIChpc1dpbmRvd3MpIHtcbiAgICBpZiAoY21kLmluZGV4T2YoJy4nKSAhPT0gLTEgJiYgcGF0aEV4dFswXSAhPT0gJycpXG4gICAgICBwYXRoRXh0LnVuc2hpZnQoJycpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhdGhFbnYsXG4gICAgcGF0aEV4dCxcbiAgICBwYXRoRXh0RXhlLFxuICB9XG59XG5cbmNvbnN0IHdoaWNoID0gKGNtZCwgb3B0LCBjYikgPT4ge1xuICBpZiAodHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0XG4gICAgb3B0ID0ge31cbiAgfVxuICBpZiAoIW9wdClcbiAgICBvcHQgPSB7fVxuXG4gIGNvbnN0IHsgcGF0aEVudiwgcGF0aEV4dCwgcGF0aEV4dEV4ZSB9ID0gZ2V0UGF0aEluZm8oY21kLCBvcHQpXG4gIGNvbnN0IGZvdW5kID0gW11cblxuICBjb25zdCBzdGVwID0gaSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGkgPT09IHBhdGhFbnYubGVuZ3RoKVxuICAgICAgcmV0dXJuIG9wdC5hbGwgJiYgZm91bmQubGVuZ3RoID8gcmVzb2x2ZShmb3VuZClcbiAgICAgICAgOiByZWplY3QoZ2V0Tm90Rm91bmRFcnJvcihjbWQpKVxuXG4gICAgY29uc3QgcHBSYXcgPSBwYXRoRW52W2ldXG4gICAgY29uc3QgcGF0aFBhcnQgPSAvXlwiLipcIiQvLnRlc3QocHBSYXcpID8gcHBSYXcuc2xpY2UoMSwgLTEpIDogcHBSYXdcblxuICAgIGNvbnN0IHBDbWQgPSBwYXRoLmpvaW4ocGF0aFBhcnQsIGNtZClcbiAgICBjb25zdCBwID0gIXBhdGhQYXJ0ICYmIC9eXFwuW1xcXFxcXC9dLy50ZXN0KGNtZCkgPyBjbWQuc2xpY2UoMCwgMikgKyBwQ21kXG4gICAgICA6IHBDbWRcblxuICAgIHJlc29sdmUoc3ViU3RlcChwLCBpLCAwKSlcbiAgfSlcblxuICBjb25zdCBzdWJTdGVwID0gKHAsIGksIGlpKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGlpID09PSBwYXRoRXh0Lmxlbmd0aClcbiAgICAgIHJldHVybiByZXNvbHZlKHN0ZXAoaSArIDEpKVxuICAgIGNvbnN0IGV4dCA9IHBhdGhFeHRbaWldXG4gICAgaXNleGUocCArIGV4dCwgeyBwYXRoRXh0OiBwYXRoRXh0RXhlIH0sIChlciwgaXMpID0+IHtcbiAgICAgIGlmICghZXIgJiYgaXMpIHtcbiAgICAgICAgaWYgKG9wdC5hbGwpXG4gICAgICAgICAgZm91bmQucHVzaChwICsgZXh0KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocCArIGV4dClcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlKHN1YlN0ZXAocCwgaSwgaWkgKyAxKSlcbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiBjYiA/IHN0ZXAoMCkudGhlbihyZXMgPT4gY2IobnVsbCwgcmVzKSwgY2IpIDogc3RlcCgwKVxufVxuXG5jb25zdCB3aGljaFN5bmMgPSAoY21kLCBvcHQpID0+IHtcbiAgb3B0ID0gb3B0IHx8IHt9XG5cbiAgY29uc3QgeyBwYXRoRW52LCBwYXRoRXh0LCBwYXRoRXh0RXhlIH0gPSBnZXRQYXRoSW5mbyhjbWQsIG9wdClcbiAgY29uc3QgZm91bmQgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEVudi5sZW5ndGg7IGkgKyspIHtcbiAgICBjb25zdCBwcFJhdyA9IHBhdGhFbnZbaV1cbiAgICBjb25zdCBwYXRoUGFydCA9IC9eXCIuKlwiJC8udGVzdChwcFJhdykgPyBwcFJhdy5zbGljZSgxLCAtMSkgOiBwcFJhd1xuXG4gICAgY29uc3QgcENtZCA9IHBhdGguam9pbihwYXRoUGFydCwgY21kKVxuICAgIGNvbnN0IHAgPSAhcGF0aFBhcnQgJiYgL15cXC5bXFxcXFxcL10vLnRlc3QoY21kKSA/IGNtZC5zbGljZSgwLCAyKSArIHBDbWRcbiAgICAgIDogcENtZFxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXRoRXh0Lmxlbmd0aDsgaiArKykge1xuICAgICAgY29uc3QgY3VyID0gcCArIHBhdGhFeHRbal1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlzID0gaXNleGUuc3luYyhjdXIsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9KVxuICAgICAgICBpZiAoaXMpIHtcbiAgICAgICAgICBpZiAob3B0LmFsbClcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY3VyKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBjdXJcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXgpIHt9XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdC5hbGwgJiYgZm91bmQubGVuZ3RoKVxuICAgIHJldHVybiBmb3VuZFxuXG4gIGlmIChvcHQubm90aHJvdylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHRocm93IGdldE5vdEZvdW5kRXJyb3IoY21kKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdoaWNoXG53aGljaC5zeW5jID0gd2hpY2hTeW5jXG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoS2V5ID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBlbnZpcm9ubWVudCA9IG9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52O1xuXHRjb25zdCBwbGF0Zm9ybSA9IG9wdGlvbnMucGxhdGZvcm0gfHwgcHJvY2Vzcy5wbGF0Zm9ybTtcblxuXHRpZiAocGxhdGZvcm0gIT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gJ1BBVEgnO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdC5rZXlzKGVudmlyb25tZW50KS5yZXZlcnNlKCkuZmluZChrZXkgPT4ga2V5LnRvVXBwZXJDYXNlKCkgPT09ICdQQVRIJykgfHwgJ1BhdGgnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoS2V5O1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwYXRoS2V5O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHdoaWNoID0gcmVxdWlyZSgnd2hpY2gnKTtcbmNvbnN0IGdldFBhdGhLZXkgPSByZXF1aXJlKCdwYXRoLWtleScpO1xuXG5mdW5jdGlvbiByZXNvbHZlQ29tbWFuZEF0dGVtcHQocGFyc2VkLCB3aXRob3V0UGF0aEV4dCkge1xuICAgIGNvbnN0IGVudiA9IHBhcnNlZC5vcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudjtcbiAgICBjb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IGhhc0N1c3RvbUN3ZCA9IHBhcnNlZC5vcHRpb25zLmN3ZCAhPSBudWxsO1xuICAgIC8vIFdvcmtlciB0aHJlYWRzIGRvIG5vdCBoYXZlIHByb2Nlc3MuY2hkaXIoKVxuICAgIGNvbnN0IHNob3VsZFN3aXRjaEN3ZCA9IGhhc0N1c3RvbUN3ZCAmJiBwcm9jZXNzLmNoZGlyICE9PSB1bmRlZmluZWQgJiYgIXByb2Nlc3MuY2hkaXIuZGlzYWJsZWQ7XG5cbiAgICAvLyBJZiBhIGN1c3RvbSBgY3dkYCB3YXMgc3BlY2lmaWVkLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvY2VzcyBjd2RcbiAgICAvLyBiZWNhdXNlIGB3aGljaGAgd2lsbCBkbyBzdGF0IGNhbGxzIGJ1dCBkb2VzIG5vdCBzdXBwb3J0IGEgY3VzdG9tIGN3ZFxuICAgIGlmIChzaG91bGRTd2l0Y2hDd2QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb2Nlc3MuY2hkaXIocGFyc2VkLm9wdGlvbnMuY3dkKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvKiBFbXB0eSAqL1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZWQgPSB3aGljaC5zeW5jKHBhcnNlZC5jb21tYW5kLCB7XG4gICAgICAgICAgICBwYXRoOiBlbnZbZ2V0UGF0aEtleSh7IGVudiB9KV0sXG4gICAgICAgICAgICBwYXRoRXh0OiB3aXRob3V0UGF0aEV4dCA/IHBhdGguZGVsaW1pdGVyIDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIEVtcHR5ICovXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHNob3VsZFN3aXRjaEN3ZCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5jaGRpcihjd2QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgd2Ugc3VjY2Vzc2Z1bGx5IHJlc29sdmVkLCBlbnN1cmUgdGhhdCBhbiBhYnNvbHV0ZSBwYXRoIGlzIHJldHVybmVkXG4gICAgLy8gTm90ZSB0aGF0IHdoZW4gYSBjdXN0b20gYGN3ZGAgd2FzIHVzZWQsIHdlIG5lZWQgdG8gcmVzb2x2ZSB0byBhbiBhYnNvbHV0ZSBwYXRoIGJhc2VkIG9uIGl0XG4gICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgIHJlc29sdmVkID0gcGF0aC5yZXNvbHZlKGhhc0N1c3RvbUN3ZCA/IHBhcnNlZC5vcHRpb25zLmN3ZCA6ICcnLCByZXNvbHZlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc29sdmVkO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29tbWFuZChwYXJzZWQpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvbW1hbmRBdHRlbXB0KHBhcnNlZCkgfHwgcmVzb2x2ZUNvbW1hbmRBdHRlbXB0KHBhcnNlZCwgdHJ1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzb2x2ZUNvbW1hbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vLyBTZWUgaHR0cDovL3d3dy5yb2J2YW5kZXJ3b3VkZS5jb20vZXNjYXBlY2hhcnMucGhwXG5jb25zdCBtZXRhQ2hhcnNSZWdFeHAgPSAvKFsoKVxcXVslIV5cImA8PiZ8OywgKj9dKS9nO1xuXG5mdW5jdGlvbiBlc2NhcGVDb21tYW5kKGFyZykge1xuICAgIC8vIEVzY2FwZSBtZXRhIGNoYXJzXG4gICAgYXJnID0gYXJnLnJlcGxhY2UobWV0YUNoYXJzUmVnRXhwLCAnXiQxJyk7XG5cbiAgICByZXR1cm4gYXJnO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVBcmd1bWVudChhcmcsIGRvdWJsZUVzY2FwZU1ldGFDaGFycykge1xuICAgIC8vIENvbnZlcnQgdG8gc3RyaW5nXG4gICAgYXJnID0gYCR7YXJnfWA7XG5cbiAgICAvLyBBbGdvcml0aG0gYmVsb3cgaXMgYmFzZWQgb24gaHR0cHM6Ly9xbnRtLm9yZy9jbWRcblxuICAgIC8vIFNlcXVlbmNlIG9mIGJhY2tzbGFzaGVzIGZvbGxvd2VkIGJ5IGEgZG91YmxlIHF1b3RlOlxuICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzIGFuZCBlc2NhcGUgdGhlIGRvdWJsZSBxdW90ZVxuICAgIGFyZyA9IGFyZy5yZXBsYWNlKC8oXFxcXCopXCIvZywgJyQxJDFcXFxcXCInKTtcblxuICAgIC8vIFNlcXVlbmNlIG9mIGJhY2tzbGFzaGVzIGZvbGxvd2VkIGJ5IHRoZSBlbmQgb2YgdGhlIHN0cmluZ1xuICAgIC8vICh3aGljaCB3aWxsIGJlY29tZSBhIGRvdWJsZSBxdW90ZSBsYXRlcik6XG4gICAgLy8gZG91YmxlIHVwIGFsbCB0aGUgYmFja3NsYXNoZXNcbiAgICBhcmcgPSBhcmcucmVwbGFjZSgvKFxcXFwqKSQvLCAnJDEkMScpO1xuXG4gICAgLy8gQWxsIG90aGVyIGJhY2tzbGFzaGVzIG9jY3VyIGxpdGVyYWxseVxuXG4gICAgLy8gUXVvdGUgdGhlIHdob2xlIHRoaW5nOlxuICAgIGFyZyA9IGBcIiR7YXJnfVwiYDtcblxuICAgIC8vIEVzY2FwZSBtZXRhIGNoYXJzXG4gICAgYXJnID0gYXJnLnJlcGxhY2UobWV0YUNoYXJzUmVnRXhwLCAnXiQxJyk7XG5cbiAgICAvLyBEb3VibGUgZXNjYXBlIG1ldGEgY2hhcnMgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKGRvdWJsZUVzY2FwZU1ldGFDaGFycykge1xuICAgICAgICBhcmcgPSBhcmcucmVwbGFjZShtZXRhQ2hhcnNSZWdFeHAsICdeJDEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJnO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jb21tYW5kID0gZXNjYXBlQ29tbWFuZDtcbm1vZHVsZS5leHBvcnRzLmFyZ3VtZW50ID0gZXNjYXBlQXJndW1lbnQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAvXiMhKC4qKS87XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc2hlYmFuZ1JlZ2V4ID0gcmVxdWlyZSgnc2hlYmFuZy1yZWdleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcgPSAnJykgPT4ge1xuXHRjb25zdCBtYXRjaCA9IHN0cmluZy5tYXRjaChzaGViYW5nUmVnZXgpO1xuXG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IFtwYXRoLCBhcmd1bWVudF0gPSBtYXRjaFswXS5yZXBsYWNlKC8jISA/LywgJycpLnNwbGl0KCcgJyk7XG5cdGNvbnN0IGJpbmFyeSA9IHBhdGguc3BsaXQoJy8nKS5wb3AoKTtcblxuXHRpZiAoYmluYXJ5ID09PSAnZW52Jykge1xuXHRcdHJldHVybiBhcmd1bWVudDtcblx0fVxuXG5cdHJldHVybiBhcmd1bWVudCA/IGAke2JpbmFyeX0gJHthcmd1bWVudH1gIDogYmluYXJ5O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHNoZWJhbmdDb21tYW5kID0gcmVxdWlyZSgnc2hlYmFuZy1jb21tYW5kJyk7XG5cbmZ1bmN0aW9uIHJlYWRTaGViYW5nKGNvbW1hbmQpIHtcbiAgICAvLyBSZWFkIHRoZSBmaXJzdCAxNTAgYnl0ZXMgZnJvbSB0aGUgZmlsZVxuICAgIGNvbnN0IHNpemUgPSAxNTA7XG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKHNpemUpO1xuXG4gICAgbGV0IGZkO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZmQgPSBmcy5vcGVuU3luYyhjb21tYW5kLCAncicpO1xuICAgICAgICBmcy5yZWFkU3luYyhmZCwgYnVmZmVyLCAwLCBzaXplLCAwKTtcbiAgICAgICAgZnMuY2xvc2VTeW5jKGZkKTtcbiAgICB9IGNhdGNoIChlKSB7IC8qIEVtcHR5ICovIH1cblxuICAgIC8vIEF0dGVtcHQgdG8gZXh0cmFjdCBzaGViYW5nIChudWxsIGlzIHJldHVybmVkIGlmIG5vdCBhIHNoZWJhbmcpXG4gICAgcmV0dXJuIHNoZWJhbmdDb21tYW5kKGJ1ZmZlci50b1N0cmluZygpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFkU2hlYmFuZztcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCByZXNvbHZlQ29tbWFuZCA9IHJlcXVpcmUoJy4vdXRpbC9yZXNvbHZlQ29tbWFuZCcpO1xuY29uc3QgZXNjYXBlID0gcmVxdWlyZSgnLi91dGlsL2VzY2FwZScpO1xuY29uc3QgcmVhZFNoZWJhbmcgPSByZXF1aXJlKCcuL3V0aWwvcmVhZFNoZWJhbmcnKTtcblxuY29uc3QgaXNXaW4gPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuY29uc3QgaXNFeGVjdXRhYmxlUmVnRXhwID0gL1xcLig/OmNvbXxleGUpJC9pO1xuY29uc3QgaXNDbWRTaGltUmVnRXhwID0gL25vZGVfbW9kdWxlc1tcXFxcL10uYmluW1xcXFwvXVteXFxcXC9dK1xcLmNtZCQvaTtcblxuZnVuY3Rpb24gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpIHtcbiAgICBwYXJzZWQuZmlsZSA9IHJlc29sdmVDb21tYW5kKHBhcnNlZCk7XG5cbiAgICBjb25zdCBzaGViYW5nID0gcGFyc2VkLmZpbGUgJiYgcmVhZFNoZWJhbmcocGFyc2VkLmZpbGUpO1xuXG4gICAgaWYgKHNoZWJhbmcpIHtcbiAgICAgICAgcGFyc2VkLmFyZ3MudW5zaGlmdChwYXJzZWQuZmlsZSk7XG4gICAgICAgIHBhcnNlZC5jb21tYW5kID0gc2hlYmFuZztcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZUNvbW1hbmQocGFyc2VkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkLmZpbGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uU2hlbGwocGFyc2VkKSB7XG4gICAgaWYgKCFpc1dpbikge1xuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIC8vIERldGVjdCAmIGFkZCBzdXBwb3J0IGZvciBzaGViYW5nc1xuICAgIGNvbnN0IGNvbW1hbmRGaWxlID0gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpO1xuXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCBhIHNoZWxsIGlmIHRoZSBjb21tYW5kIGZpbGVuYW1lIGlzIGFuIGV4ZWN1dGFibGVcbiAgICBjb25zdCBuZWVkc1NoZWxsID0gIWlzRXhlY3V0YWJsZVJlZ0V4cC50ZXN0KGNvbW1hbmRGaWxlKTtcblxuICAgIC8vIElmIGEgc2hlbGwgaXMgcmVxdWlyZWQsIHVzZSBjbWQuZXhlIGFuZCB0YWtlIGNhcmUgb2YgZXNjYXBpbmcgZXZlcnl0aGluZyBjb3JyZWN0bHlcbiAgICAvLyBOb3RlIHRoYXQgYGZvcmNlU2hlbGxgIGlzIGFuIGhpZGRlbiBvcHRpb24gdXNlZCBvbmx5IGluIHRlc3RzXG4gICAgaWYgKHBhcnNlZC5vcHRpb25zLmZvcmNlU2hlbGwgfHwgbmVlZHNTaGVsbCkge1xuICAgICAgICAvLyBOZWVkIHRvIGRvdWJsZSBlc2NhcGUgbWV0YSBjaGFycyBpZiB0aGUgY29tbWFuZCBpcyBhIGNtZC1zaGltIGxvY2F0ZWQgaW4gYG5vZGVfbW9kdWxlcy8uYmluL2BcbiAgICAgICAgLy8gVGhlIGNtZC1zaGltIHNpbXBseSBjYWxscyBleGVjdXRlIHRoZSBwYWNrYWdlIGJpbiBmaWxlIHdpdGggTm9kZUpTLCBwcm94eWluZyBhbnkgYXJndW1lbnRcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgZXNjYXBlIG9mIG1ldGFjaGFycyB3aXRoIF4gZ2V0cyBpbnRlcnByZXRlZCB3aGVuIHRoZSBjbWQuZXhlIGlzIGZpcnN0IGNhbGxlZCxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBkb3VibGUgZXNjYXBlIHRoZW1cbiAgICAgICAgY29uc3QgbmVlZHNEb3VibGVFc2NhcGVNZXRhQ2hhcnMgPSBpc0NtZFNoaW1SZWdFeHAudGVzdChjb21tYW5kRmlsZSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIHBvc2l4IHBhdGhzIGludG8gT1MgY29tcGF0aWJsZSBwYXRocyAoZS5nLjogZm9vL2JhciAtPiBmb29cXGJhcilcbiAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3Nhcnkgb3RoZXJ3aXNlIGl0IHdpbGwgYWx3YXlzIGZhaWwgd2l0aCBFTk9FTlQgaW4gdGhvc2UgY2FzZXNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBwYXRoLm5vcm1hbGl6ZShwYXJzZWQuY29tbWFuZCk7XG5cbiAgICAgICAgLy8gRXNjYXBlIGNvbW1hbmQgJiBhcmd1bWVudHNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBlc2NhcGUuY29tbWFuZChwYXJzZWQuY29tbWFuZCk7XG4gICAgICAgIHBhcnNlZC5hcmdzID0gcGFyc2VkLmFyZ3MubWFwKChhcmcpID0+IGVzY2FwZS5hcmd1bWVudChhcmcsIG5lZWRzRG91YmxlRXNjYXBlTWV0YUNoYXJzKSk7XG5cbiAgICAgICAgY29uc3Qgc2hlbGxDb21tYW5kID0gW3BhcnNlZC5jb21tYW5kXS5jb25jYXQocGFyc2VkLmFyZ3MpLmpvaW4oJyAnKTtcblxuICAgICAgICBwYXJzZWQuYXJncyA9IFsnL2QnLCAnL3MnLCAnL2MnLCBgXCIke3NoZWxsQ29tbWFuZH1cImBdO1xuICAgICAgICBwYXJzZWQuY29tbWFuZCA9IHByb2Nlc3MuZW52LmNvbXNwZWMgfHwgJ2NtZC5leGUnO1xuICAgICAgICBwYXJzZWQub3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgPSB0cnVlOyAvLyBUZWxsIG5vZGUncyBzcGF3biB0aGF0IHRoZSBhcmd1bWVudHMgYXJlIGFscmVhZHkgZXNjYXBlZFxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBOb3JtYWxpemUgYXJndW1lbnRzLCBzaW1pbGFyIHRvIG5vZGVqc1xuICAgIGlmIChhcmdzICYmICFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzO1xuICAgICAgICBhcmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcmdzID0gYXJncyA/IGFyZ3Muc2xpY2UoMCkgOiBbXTsgLy8gQ2xvbmUgYXJyYXkgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpOyAvLyBDbG9uZSBvYmplY3QgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG5cbiAgICAvLyBCdWlsZCBvdXIgcGFyc2VkIG9iamVjdFxuICAgIGNvbnN0IHBhcnNlZCA9IHtcbiAgICAgICAgY29tbWFuZCxcbiAgICAgICAgYXJncyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgZmlsZTogdW5kZWZpbmVkLFxuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIERlbGVnYXRlIGZ1cnRoZXIgcGFyc2luZyB0byBzaGVsbCBvciBub24tc2hlbGxcbiAgICByZXR1cm4gb3B0aW9ucy5zaGVsbCA/IHBhcnNlZCA6IHBhcnNlTm9uU2hlbGwocGFyc2VkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGlzV2luID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcblxuZnVuY3Rpb24gbm90Rm91bmRFcnJvcihvcmlnaW5hbCwgc3lzY2FsbCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgJHtzeXNjYWxsfSAke29yaWdpbmFsLmNvbW1hbmR9IEVOT0VOVGApLCB7XG4gICAgICAgIGNvZGU6ICdFTk9FTlQnLFxuICAgICAgICBlcnJubzogJ0VOT0VOVCcsXG4gICAgICAgIHN5c2NhbGw6IGAke3N5c2NhbGx9ICR7b3JpZ2luYWwuY29tbWFuZH1gLFxuICAgICAgICBwYXRoOiBvcmlnaW5hbC5jb21tYW5kLFxuICAgICAgICBzcGF3bmFyZ3M6IG9yaWdpbmFsLmFyZ3MsXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvb2tDaGlsZFByb2Nlc3MoY3AsIHBhcnNlZCkge1xuICAgIGlmICghaXNXaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsRW1pdCA9IGNwLmVtaXQ7XG5cbiAgICBjcC5lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZzEpIHtcbiAgICAgICAgLy8gSWYgZW1pdHRpbmcgXCJleGl0XCIgZXZlbnQgYW5kIGV4aXQgY29kZSBpcyAxLCB3ZSBuZWVkIHRvIGNoZWNrIGlmXG4gICAgICAgIC8vIHRoZSBjb21tYW5kIGV4aXN0cyBhbmQgZW1pdCBhbiBcImVycm9yXCIgaW5zdGVhZFxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgICAgICBpZiAobmFtZSA9PT0gJ2V4aXQnKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB2ZXJpZnlFTk9FTlQoYXJnMSwgcGFyc2VkLCAnc3Bhd24nKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuY2FsbChjcCwgJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuYXBwbHkoY3AsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UKHN0YXR1cywgcGFyc2VkKSB7XG4gICAgaWYgKGlzV2luICYmIHN0YXR1cyA9PT0gMSAmJiAhcGFyc2VkLmZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZvdW5kRXJyb3IocGFyc2VkLm9yaWdpbmFsLCAnc3Bhd24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UU3luYyhzdGF0dXMsIHBhcnNlZCkge1xuICAgIGlmIChpc1dpbiAmJiBzdGF0dXMgPT09IDEgJiYgIXBhcnNlZC5maWxlKSB7XG4gICAgICAgIHJldHVybiBub3RGb3VuZEVycm9yKHBhcnNlZC5vcmlnaW5hbCwgJ3NwYXduU3luYycpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob29rQ2hpbGRQcm9jZXNzLFxuICAgIHZlcmlmeUVOT0VOVCxcbiAgICB2ZXJpZnlFTk9FTlRTeW5jLFxuICAgIG5vdEZvdW5kRXJyb3IsXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY3AgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5jb25zdCBlbm9lbnQgPSByZXF1aXJlKCcuL2xpYi9lbm9lbnQnKTtcblxuZnVuY3Rpb24gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIC8vIFBhcnNlIHRoZSBhcmd1bWVudHNcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIFNwYXduIHRoZSBjaGlsZCBwcm9jZXNzXG4gICAgY29uc3Qgc3Bhd25lZCA9IGNwLnNwYXduKHBhcnNlZC5jb21tYW5kLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXG4gICAgLy8gSG9vayBpbnRvIGNoaWxkIHByb2Nlc3MgXCJleGl0XCIgZXZlbnQgdG8gZW1pdCBhbiBlcnJvciBpZiB0aGUgY29tbWFuZFxuICAgIC8vIGRvZXMgbm90IGV4aXN0cywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vSW5kaWdvVW5pdGVkL25vZGUtY3Jvc3Mtc3Bhd24vaXNzdWVzLzE2XG4gICAgZW5vZW50Lmhvb2tDaGlsZFByb2Nlc3Moc3Bhd25lZCwgcGFyc2VkKTtcblxuICAgIHJldHVybiBzcGF3bmVkO1xufVxuXG5mdW5jdGlvbiBzcGF3blN5bmMoY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIC8vIFBhcnNlIHRoZSBhcmd1bWVudHNcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIFNwYXduIHRoZSBjaGlsZCBwcm9jZXNzXG4gICAgY29uc3QgcmVzdWx0ID0gY3Auc3Bhd25TeW5jKHBhcnNlZC5jb21tYW5kLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXG4gICAgLy8gQW5hbHl6ZSBpZiB0aGUgY29tbWFuZCBkb2VzIG5vdCBleGlzdCwgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vSW5kaWdvVW5pdGVkL25vZGUtY3Jvc3Mtc3Bhd24vaXNzdWVzLzE2XG4gICAgcmVzdWx0LmVycm9yID0gcmVzdWx0LmVycm9yIHx8IGVub2VudC52ZXJpZnlFTk9FTlRTeW5jKHJlc3VsdC5zdGF0dXMsIHBhcnNlZCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNwYXduO1xubW9kdWxlLmV4cG9ydHMuc3Bhd24gPSBzcGF3bjtcbm1vZHVsZS5leHBvcnRzLnN5bmMgPSBzcGF3blN5bmM7XG5cbm1vZHVsZS5leHBvcnRzLl9wYXJzZSA9IHBhcnNlO1xubW9kdWxlLmV4cG9ydHMuX2Vub2VudCA9IGVub2VudDtcbiIsICIvLyBUaGlzIGlzIG5vdCB0aGUgc2V0IG9mIGFsbCBwb3NzaWJsZSBzaWduYWxzLlxuLy9cbi8vIEl0IElTLCBob3dldmVyLCB0aGUgc2V0IG9mIGFsbCBzaWduYWxzIHRoYXQgdHJpZ2dlclxuLy8gYW4gZXhpdCBvbiBlaXRoZXIgTGludXggb3IgQlNEIHN5c3RlbXMuICBMaW51eCBpcyBhXG4vLyBzdXBlcnNldCBvZiB0aGUgc2lnbmFsIG5hbWVzIHN1cHBvcnRlZCBvbiBCU0QsIGFuZFxuLy8gdGhlIHVua25vd24gc2lnbmFscyBqdXN0IGZhaWwgdG8gcmVnaXN0ZXIsIHNvIHdlIGNhblxuLy8gY2F0Y2ggdGhhdCBlYXNpbHkgZW5vdWdoLlxuLy9cbi8vIERvbid0IGJvdGhlciB3aXRoIFNJR0tJTEwuICBJdCdzIHVuY2F0Y2hhYmxlLCB3aGljaFxuLy8gbWVhbnMgdGhhdCB3ZSBjYW4ndCBmaXJlIGFueSBjYWxsYmFja3MgYW55d2F5LlxuLy9cbi8vIElmIGEgdXNlciBkb2VzIGhhcHBlbiB0byByZWdpc3RlciBhIGhhbmRsZXIgb24gYSBub24tXG4vLyBmYXRhbCBzaWduYWwgbGlrZSBTSUdXSU5DSCBvciBzb21ldGhpbmcsIGFuZCB0aGVuXG4vLyBleGl0LCBpdCdsbCBlbmQgdXAgZmlyaW5nIGBwcm9jZXNzLmVtaXQoJ2V4aXQnKWAsIHNvXG4vLyB0aGUgaGFuZGxlciB3aWxsIGJlIGZpcmVkIGFueXdheS5cbi8vXG4vLyBTSUdCVVMsIFNJR0ZQRSwgU0lHU0VHViBhbmQgU0lHSUxMLCB3aGVuIG5vdCByYWlzZWRcbi8vIGFydGlmaWNpYWxseSwgaW5oZXJlbnRseSBsZWF2ZSB0aGUgcHJvY2VzcyBpbiBhXG4vLyBzdGF0ZSBmcm9tIHdoaWNoIGl0IGlzIG5vdCBzYWZlIHRvIHRyeSBhbmQgZW50ZXIgSlNcbi8vIGxpc3RlbmVycy5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAnU0lHQUJSVCcsXG4gICdTSUdBTFJNJyxcbiAgJ1NJR0hVUCcsXG4gICdTSUdJTlQnLFxuICAnU0lHVEVSTSdcbl1cblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcbiAgbW9kdWxlLmV4cG9ydHMucHVzaChcbiAgICAnU0lHVlRBTFJNJyxcbiAgICAnU0lHWENQVScsXG4gICAgJ1NJR1hGU1onLFxuICAgICdTSUdVU1IyJyxcbiAgICAnU0lHVFJBUCcsXG4gICAgJ1NJR1NZUycsXG4gICAgJ1NJR1FVSVQnLFxuICAgICdTSUdJT1QnXG4gICAgLy8gc2hvdWxkIGRldGVjdCBwcm9maWxlciBhbmQgZW5hYmxlL2Rpc2FibGUgYWNjb3JkaW5nbHkuXG4gICAgLy8gc2VlICMyMVxuICAgIC8vICdTSUdQUk9GJ1xuICApXG59XG5cbmlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnKSB7XG4gIG1vZHVsZS5leHBvcnRzLnB1c2goXG4gICAgJ1NJR0lPJyxcbiAgICAnU0lHUE9MTCcsXG4gICAgJ1NJR1BXUicsXG4gICAgJ1NJR1NUS0ZMVCcsXG4gICAgJ1NJR1VOVVNFRCdcbiAgKVxufVxuIiwgIi8vIE5vdGU6IHNpbmNlIG55YyB1c2VzIHRoaXMgbW9kdWxlIHRvIG91dHB1dCBjb3ZlcmFnZSwgYW55IGxpbmVzXG4vLyB0aGF0IGFyZSBpbiB0aGUgZGlyZWN0IHN5bmMgZmxvdyBvZiBueWMncyBvdXRwdXRDb3ZlcmFnZSBhcmVcbi8vIGlnbm9yZWQsIHNpbmNlIHdlIGNhbiBuZXZlciBnZXQgY292ZXJhZ2UgZm9yIHRoZW0uXG4vLyBncmFiIGEgcmVmZXJlbmNlIHRvIG5vZGUncyByZWFsIHByb2Nlc3Mgb2JqZWN0IHJpZ2h0IGF3YXlcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3NcblxuY29uc3QgcHJvY2Vzc09rID0gZnVuY3Rpb24gKHByb2Nlc3MpIHtcbiAgcmV0dXJuIHByb2Nlc3MgJiZcbiAgICB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLmVtaXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5yZWFsbHlFeGl0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3MubGlzdGVuZXJzID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3Mua2lsbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnBpZCA9PT0gJ251bWJlcicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5vbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG4vLyBzb21lIGtpbmQgb2Ygbm9uLW5vZGUgZW52aXJvbm1lbnQsIGp1c3Qgbm8tb3Bcbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKCFwcm9jZXNzT2socHJvY2VzcykpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9XG4gIH1cbn0gZWxzZSB7XG4gIHZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuICB2YXIgc2lnbmFscyA9IHJlcXVpcmUoJy4vc2lnbmFscy5qcycpXG4gIHZhciBpc1dpbiA9IC9ed2luL2kudGVzdChwcm9jZXNzLnBsYXRmb3JtKVxuXG4gIHZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIEVFICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgRUUgPSBFRS5FdmVudEVtaXR0ZXJcbiAgfVxuXG4gIHZhciBlbWl0dGVyXG4gIGlmIChwcm9jZXNzLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fKSB7XG4gICAgZW1pdHRlciA9IHByb2Nlc3MuX19zaWduYWxfZXhpdF9lbWl0dGVyX19cbiAgfSBlbHNlIHtcbiAgICBlbWl0dGVyID0gcHJvY2Vzcy5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfXyA9IG5ldyBFRSgpXG4gICAgZW1pdHRlci5jb3VudCA9IDBcbiAgICBlbWl0dGVyLmVtaXR0ZWQgPSB7fVxuICB9XG5cbiAgLy8gQmVjYXVzZSB0aGlzIGVtaXR0ZXIgaXMgYSBnbG9iYWwsIHdlIGhhdmUgdG8gY2hlY2sgdG8gc2VlIGlmIGFcbiAgLy8gcHJldmlvdXMgdmVyc2lvbiBvZiB0aGlzIGxpYnJhcnkgZmFpbGVkIHRvIGVuYWJsZSBpbmZpbml0ZSBsaXN0ZW5lcnMuXG4gIC8vIEkga25vdyB3aGF0IHlvdSdyZSBhYm91dCB0byBzYXkuICBCdXQgbGl0ZXJhbGx5IGV2ZXJ5dGhpbmcgYWJvdXRcbiAgLy8gc2lnbmFsLWV4aXQgaXMgYSBjb21wcm9taXNlIHdpdGggZXZpbC4gIEdldCB1c2VkIHRvIGl0LlxuICBpZiAoIWVtaXR0ZXIuaW5maW5pdGUpIHtcbiAgICBlbWl0dGVyLnNldE1heExpc3RlbmVycyhJbmZpbml0eSlcbiAgICBlbWl0dGVyLmluZmluaXRlID0gdHJ1ZVxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2IsIG9wdHMpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7fVxuICAgIH1cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnYSBjYWxsYmFjayBtdXN0IGJlIHByb3ZpZGVkIGZvciBleGl0IGhhbmRsZXInKVxuXG4gICAgaWYgKGxvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIGxvYWQoKVxuICAgIH1cblxuICAgIHZhciBldiA9ICdleGl0J1xuICAgIGlmIChvcHRzICYmIG9wdHMuYWx3YXlzTGFzdCkge1xuICAgICAgZXYgPSAnYWZ0ZXJleGl0J1xuICAgIH1cblxuICAgIHZhciByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGV2LCBjYilcbiAgICAgIGlmIChlbWl0dGVyLmxpc3RlbmVycygnZXhpdCcpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgIGVtaXR0ZXIubGlzdGVuZXJzKCdhZnRlcmV4aXQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdW5sb2FkKClcbiAgICAgIH1cbiAgICB9XG4gICAgZW1pdHRlci5vbihldiwgY2IpXG5cbiAgICByZXR1cm4gcmVtb3ZlXG4gIH1cblxuICB2YXIgdW5sb2FkID0gZnVuY3Rpb24gdW5sb2FkICgpIHtcbiAgICBpZiAoIWxvYWRlZCB8fCAhcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxvYWRlZCA9IGZhbHNlXG5cbiAgICBzaWduYWxzLmZvckVhY2goZnVuY3Rpb24gKHNpZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihzaWcsIHNpZ0xpc3RlbmVyc1tzaWddKVxuICAgICAgfSBjYXRjaCAoZXIpIHt9XG4gICAgfSlcbiAgICBwcm9jZXNzLmVtaXQgPSBvcmlnaW5hbFByb2Nlc3NFbWl0XG4gICAgcHJvY2Vzcy5yZWFsbHlFeGl0ID0gb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdFxuICAgIGVtaXR0ZXIuY291bnQgLT0gMVxuICB9XG4gIG1vZHVsZS5leHBvcnRzLnVubG9hZCA9IHVubG9hZFxuXG4gIHZhciBlbWl0ID0gZnVuY3Rpb24gZW1pdCAoZXZlbnQsIGNvZGUsIHNpZ25hbCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbWl0dGVyLmVtaXR0ZWRbZXZlbnRdKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZW1pdHRlci5lbWl0dGVkW2V2ZW50XSA9IHRydWVcbiAgICBlbWl0dGVyLmVtaXQoZXZlbnQsIGNvZGUsIHNpZ25hbClcbiAgfVxuXG4gIC8vIHsgPHNpZ25hbD46IDxsaXN0ZW5lciBmbj4sIC4uLiB9XG4gIHZhciBzaWdMaXN0ZW5lcnMgPSB7fVxuICBzaWduYWxzLmZvckVhY2goZnVuY3Rpb24gKHNpZykge1xuICAgIHNpZ0xpc3RlbmVyc1tzaWddID0gZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIXByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gb3RoZXIgbGlzdGVuZXJzLCBhbiBleGl0IGlzIGNvbWluZyFcbiAgICAgIC8vIFNpbXBsZXN0IHdheTogcmVtb3ZlIHVzIGFuZCB0aGVuIHJlLXNlbmQgdGhlIHNpZ25hbC5cbiAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGlzIHdpbGwga2lsbCB0aGUgcHJvY2Vzcywgc28gd2UgY2FuXG4gICAgICAvLyBzYWZlbHkgZW1pdCBub3cuXG4gICAgICB2YXIgbGlzdGVuZXJzID0gcHJvY2Vzcy5saXN0ZW5lcnMoc2lnKVxuICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IGVtaXR0ZXIuY291bnQpIHtcbiAgICAgICAgdW5sb2FkKClcbiAgICAgICAgZW1pdCgnZXhpdCcsIG51bGwsIHNpZylcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZW1pdCgnYWZ0ZXJleGl0JywgbnVsbCwgc2lnKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoaXNXaW4gJiYgc2lnID09PSAnU0lHSFVQJykge1xuICAgICAgICAgIC8vIFwiU0lHSFVQXCIgdGhyb3dzIGFuIGBFTk9TWVNgIGVycm9yIG9uIFdpbmRvd3MsXG4gICAgICAgICAgLy8gc28gdXNlIGEgc3VwcG9ydGVkIHNpZ25hbCBpbnN0ZWFkXG4gICAgICAgICAgc2lnID0gJ1NJR0lOVCdcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBwcm9jZXNzLmtpbGwocHJvY2Vzcy5waWQsIHNpZylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgbW9kdWxlLmV4cG9ydHMuc2lnbmFscyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2lnbmFsc1xuICB9XG5cbiAgdmFyIGxvYWRlZCA9IGZhbHNlXG5cbiAgdmFyIGxvYWQgPSBmdW5jdGlvbiBsb2FkICgpIHtcbiAgICBpZiAobG9hZGVkIHx8ICFwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbG9hZGVkID0gdHJ1ZVxuXG4gICAgLy8gVGhpcyBpcyB0aGUgbnVtYmVyIG9mIG9uU2lnbmFsRXhpdCdzIHRoYXQgYXJlIGluIHBsYXkuXG4gICAgLy8gSXQncyBpbXBvcnRhbnQgc28gdGhhdCB3ZSBjYW4gY291bnQgdGhlIGNvcnJlY3QgbnVtYmVyIG9mXG4gICAgLy8gbGlzdGVuZXJzIG9uIHNpZ25hbHMsIGFuZCBkb24ndCB3YWl0IGZvciB0aGUgb3RoZXIgb25lIHRvXG4gICAgLy8gaGFuZGxlIGl0IGluc3RlYWQgb2YgdXMuXG4gICAgZW1pdHRlci5jb3VudCArPSAxXG5cbiAgICBzaWduYWxzID0gc2lnbmFscy5maWx0ZXIoZnVuY3Rpb24gKHNpZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvY2Vzcy5vbihzaWcsIHNpZ0xpc3RlbmVyc1tzaWddKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHByb2Nlc3MuZW1pdCA9IHByb2Nlc3NFbWl0XG4gICAgcHJvY2Vzcy5yZWFsbHlFeGl0ID0gcHJvY2Vzc1JlYWxseUV4aXRcbiAgfVxuICBtb2R1bGUuZXhwb3J0cy5sb2FkID0gbG9hZFxuXG4gIHZhciBvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0ID0gcHJvY2Vzcy5yZWFsbHlFeGl0XG4gIHZhciBwcm9jZXNzUmVhbGx5RXhpdCA9IGZ1bmN0aW9uIHByb2Nlc3NSZWFsbHlFeGl0IChjb2RlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0Q29kZSA9IGNvZGUgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gMFxuICAgIGVtaXQoJ2V4aXQnLCBwcm9jZXNzLmV4aXRDb2RlLCBudWxsKVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZW1pdCgnYWZ0ZXJleGl0JywgcHJvY2Vzcy5leGl0Q29kZSwgbnVsbClcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIG9yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQuY2FsbChwcm9jZXNzLCBwcm9jZXNzLmV4aXRDb2RlKVxuICB9XG5cbiAgdmFyIG9yaWdpbmFsUHJvY2Vzc0VtaXQgPSBwcm9jZXNzLmVtaXRcbiAgdmFyIHByb2Nlc3NFbWl0ID0gZnVuY3Rpb24gcHJvY2Vzc0VtaXQgKGV2LCBhcmcpIHtcbiAgICBpZiAoZXYgPT09ICdleGl0JyAmJiBwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdENvZGUgPSBhcmdcbiAgICAgIH1cbiAgICAgIHZhciByZXQgPSBvcmlnaW5hbFByb2Nlc3NFbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBlbWl0KCdleGl0JywgcHJvY2Vzcy5leGl0Q29kZSwgbnVsbClcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBlbWl0KCdhZnRlcmV4aXQnLCBwcm9jZXNzLmV4aXRDb2RlLCBudWxsKVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHJldHVybiByZXRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsUHJvY2Vzc0VtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHtQYXNzVGhyb3VnaDogUGFzc1Rocm91Z2hTdHJlYW19ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gb3B0aW9ucyA9PiB7XG5cdG9wdGlvbnMgPSB7Li4ub3B0aW9uc307XG5cblx0Y29uc3Qge2FycmF5fSA9IG9wdGlvbnM7XG5cdGxldCB7ZW5jb2Rpbmd9ID0gb3B0aW9ucztcblx0Y29uc3QgaXNCdWZmZXIgPSBlbmNvZGluZyA9PT0gJ2J1ZmZlcic7XG5cdGxldCBvYmplY3RNb2RlID0gZmFsc2U7XG5cblx0aWYgKGFycmF5KSB7XG5cdFx0b2JqZWN0TW9kZSA9ICEoZW5jb2RpbmcgfHwgaXNCdWZmZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGVuY29kaW5nID0gZW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXHR9XG5cblx0aWYgKGlzQnVmZmVyKSB7XG5cdFx0ZW5jb2RpbmcgPSBudWxsO1xuXHR9XG5cblx0Y29uc3Qgc3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoU3RyZWFtKHtvYmplY3RNb2RlfSk7XG5cblx0aWYgKGVuY29kaW5nKSB7XG5cdFx0c3RyZWFtLnNldEVuY29kaW5nKGVuY29kaW5nKTtcblx0fVxuXG5cdGxldCBsZW5ndGggPSAwO1xuXHRjb25zdCBjaHVua3MgPSBbXTtcblxuXHRzdHJlYW0ub24oJ2RhdGEnLCBjaHVuayA9PiB7XG5cdFx0Y2h1bmtzLnB1c2goY2h1bmspO1xuXG5cdFx0aWYgKG9iamVjdE1vZGUpIHtcblx0XHRcdGxlbmd0aCA9IGNodW5rcy5sZW5ndGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCArPSBjaHVuay5sZW5ndGg7XG5cdFx0fVxuXHR9KTtcblxuXHRzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSA9ICgpID0+IHtcblx0XHRpZiAoYXJyYXkpIHtcblx0XHRcdHJldHVybiBjaHVua3M7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzQnVmZmVyID8gQnVmZmVyLmNvbmNhdChjaHVua3MsIGxlbmd0aCkgOiBjaHVua3Muam9pbignJyk7XG5cdH07XG5cblx0c3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuXG5cdHJldHVybiBzdHJlYW07XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHtjb25zdGFudHM6IEJ1ZmZlckNvbnN0YW50c30gPSByZXF1aXJlKCdidWZmZXInKTtcbmNvbnN0IHN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuY29uc3Qge3Byb21pc2lmeX0gPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBidWZmZXJTdHJlYW0gPSByZXF1aXJlKCcuL2J1ZmZlci1zdHJlYW0nKTtcblxuY29uc3Qgc3RyZWFtUGlwZWxpbmVQcm9taXNpZmllZCA9IHByb21pc2lmeShzdHJlYW0ucGlwZWxpbmUpO1xuXG5jbGFzcyBNYXhCdWZmZXJFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoJ21heEJ1ZmZlciBleGNlZWRlZCcpO1xuXHRcdHRoaXMubmFtZSA9ICdNYXhCdWZmZXJFcnJvcic7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RyZWFtKGlucHV0U3RyZWFtLCBvcHRpb25zKSB7XG5cdGlmICghaW5wdXRTdHJlYW0pIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyZWFtJyk7XG5cdH1cblxuXHRvcHRpb25zID0ge1xuXHRcdG1heEJ1ZmZlcjogSW5maW5pdHksXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXG5cdGNvbnN0IHttYXhCdWZmZXJ9ID0gb3B0aW9ucztcblx0Y29uc3Qgc3RyZWFtID0gYnVmZmVyU3RyZWFtKG9wdGlvbnMpO1xuXG5cdGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZWplY3RQcm9taXNlID0gZXJyb3IgPT4ge1xuXHRcdFx0Ly8gRG9uJ3QgcmV0cmlldmUgYW4gb3ZlcnNpemVkIGJ1ZmZlci5cblx0XHRcdGlmIChlcnJvciAmJiBzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGgoKSA8PSBCdWZmZXJDb25zdGFudHMuTUFYX0xFTkdUSCkge1xuXHRcdFx0XHRlcnJvci5idWZmZXJlZERhdGEgPSBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH07XG5cblx0XHQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgc3RyZWFtUGlwZWxpbmVQcm9taXNpZmllZChpbnB1dFN0cmVhbSwgc3RyZWFtKTtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0cmVqZWN0UHJvbWlzZShlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSkoKTtcblxuXHRcdHN0cmVhbS5vbignZGF0YScsICgpID0+IHtcblx0XHRcdGlmIChzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGgoKSA+IG1heEJ1ZmZlcikge1xuXHRcdFx0XHRyZWplY3RQcm9taXNlKG5ldyBNYXhCdWZmZXJFcnJvcigpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIHN0cmVhbS5nZXRCdWZmZXJlZFZhbHVlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U3RyZWFtO1xubW9kdWxlLmV4cG9ydHMuYnVmZmVyID0gKHN0cmVhbSwgb3B0aW9ucykgPT4gZ2V0U3RyZWFtKHN0cmVhbSwgey4uLm9wdGlvbnMsIGVuY29kaW5nOiAnYnVmZmVyJ30pO1xubW9kdWxlLmV4cG9ydHMuYXJyYXkgPSAoc3RyZWFtLCBvcHRpb25zKSA9PiBnZXRTdHJlYW0oc3RyZWFtLCB7Li4ub3B0aW9ucywgYXJyYXk6IHRydWV9KTtcbm1vZHVsZS5leHBvcnRzLk1heEJ1ZmZlckVycm9yID0gTWF4QnVmZmVyRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IFBhc3NUaHJvdWdoIH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypzdHJlYW1zLi4uKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXVxuICB2YXIgb3V0cHV0ICA9IG5ldyBQYXNzVGhyb3VnaCh7b2JqZWN0TW9kZTogdHJ1ZX0pXG5cbiAgb3V0cHV0LnNldE1heExpc3RlbmVycygwKVxuXG4gIG91dHB1dC5hZGQgPSBhZGRcbiAgb3V0cHV0LmlzRW1wdHkgPSBpc0VtcHR5XG5cbiAgb3V0cHV0Lm9uKCd1bnBpcGUnLCByZW1vdmUpXG5cbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5mb3JFYWNoKGFkZClcblxuICByZXR1cm4gb3V0cHV0XG5cbiAgZnVuY3Rpb24gYWRkIChzb3VyY2UpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICBzb3VyY2UuZm9yRWFjaChhZGQpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIHNvdXJjZS5vbmNlKCdlbmQnLCByZW1vdmUuYmluZChudWxsLCBzb3VyY2UpKVxuICAgIHNvdXJjZS5vbmNlKCdlcnJvcicsIG91dHB1dC5lbWl0LmJpbmQob3V0cHV0LCAnZXJyb3InKSlcbiAgICBzb3VyY2UucGlwZShvdXRwdXQsIHtlbmQ6IGZhbHNlfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoID09IDA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUgKHNvdXJjZSkge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcihmdW5jdGlvbiAoaXQpIHsgcmV0dXJuIGl0ICE9PSBzb3VyY2UgfSlcbiAgICBpZiAoIXNvdXJjZXMubGVuZ3RoICYmIG91dHB1dC5yZWFkYWJsZSkgeyBvdXRwdXQuZW5kKCkgfVxuICB9XG59XG4iLCAiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgeyBDbGksIENvbW1hbmQsIE9wdGlvbiB9IGZyb20gXCJjbGlwYW5pb25cIlxuaW1wb3J0IHsgc2V0dXBQcmV0dGllciB9IGZyb20gXCIuL3Rhc2tzL3ByZXR0aWVyLm1qc1wiXG5pbXBvcnQgeyBzZXR1cFlhcm5CZXJyeSB9IGZyb20gXCIuL3Rhc2tzL3lhcm4ubWpzXCJcbmltcG9ydCB7IHNldHVwRWRpdG9yQ29uZmlnIH0gZnJvbSBcIi4vdGFza3MvZWRpdG9yY29uZmlnLm1qc1wiXG5cbi8qKiBAdHlwZWRlZiB7eyBsYWJlbDogc3RyaW5nLCBhY3Rpb246IChzdGRvdXQ6IFdyaXRhYmxlKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCB9W119IFRhc2tRdWV1ZSAqL1xuXG5wcm9jZXNzLnNldFNvdXJjZU1hcHNFbmFibGVkPy5jYWxsKHByb2Nlc3MsIHRydWUpXG5cbmNsYXNzIE1haW5Db21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgc2tpcFlhcm4gPSBPcHRpb24uQm9vbGVhbihcIi0tc2tpcC15YXJuXCIsIGZhbHNlLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNraXAgbWlncmF0aW9uIHRvIGFuZCBjb25maWd1cmF0aW9uIG9mIFlhcm4gQmVycnkuXCIsXG4gICAgfSlcbiAgICBza2lwUHJldHRpZXIgPSBPcHRpb24uQm9vbGVhbihcIi0tc2tpcC1wcmV0dGllclwiLCBmYWxzZSwge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJTa2lwIGluc3RhbGxpbmcgYW5kIGNvbmZpZ3VyaW5nIFByZXR0aWVyLlwiLFxuICAgIH0pXG4gICAgc2tpcEVkaXRvcmNvbmZpZyA9IE9wdGlvbi5Cb29sZWFuKFwiLS1za2lwLWVkaXRvcmNvbmZpZ1wiLCBmYWxzZSwge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJTa2lwIGFkZGluZyBhIGAuZWRpdG9yY29uZmlnYCBmaWxlLlwiLFxuICAgIH0pXG5cbiAgICBzdGF0aWMgdXNhZ2UgPSBDb21tYW5kLlVzYWdlKHtcbiAgICAgICAgY2F0ZWdvcnk6IGBNYWluYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBBZGQgcmRpbCdzIHByZWZlcnJlZCBzZXR0aW5ncy90b29sY2hhaW5zIHRvIGEgSlMgcHJvamVjdC5gLFxuICAgICAgICBkZXRhaWxzOiBgXG4gICAgICAgIFRoaXMgY29tbWFuZCBzZXRzIHVwIHZhcmlvdXMgdG9vbHMgdGhhdCBJIGVuam95IHVzaW5nIGFuZCBhbSB1c2VkIHRvLlxuICAgICAgICBTZXR0aW5nIHRoZW0gdXAgd2FzIGJlY29taW5nIGEgYml0IG9mIGEgY2hvcmUsIHNvIEkgd3JvdGUgdGhpcy5cblxuICAgICAgICBUaGUgZm9sbG93aW5nIHRvb2xzL3NldHRpbmdzIGNhbiBiZSBzZXQgdXAgYnkgdGhpcyBzY3JpcHQ6XG5cbiAgICAgICAgICAtIFlhcm4gQmVycnlcbiAgICAgICAgICAtIFByZXR0aWVyXG4gICAgICAgICAgLSBcXGAuZWRpdG9yY29uZmlnXFxgXG4gICAgICAgIGAsXG4gICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICBbYFJ1biB3aXRoIGRlZmF1bHQgb3B0aW9uc2AsIGAkMGBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGBEb24ndCBydW4gUHJldHRpZXIgb3IgXFxgLmVkaXRvcmNvbmZpZ1xcYCB0YXNrc2AsXG4gICAgICAgICAgICAgICAgYCQwIC0tc2tpcC1wcmV0dGllciAtLXNraXAtZWRpdG9yY29uZmlnYCxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIF0sXG4gICAgfSlcblxuICAgIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIGNvbnN0IHN0ZG91dCA9IHRoaXMuY29udGV4dC5zdGRvdXRcblxuICAgICAgICBzdGRvdXQud3JpdGUoXCJcXG5yZGlsaWZ5aW5nLi4uXFxuXCIpXG5cbiAgICAgICAgLyoqIEB0eXBlIHtUYXNrUXVldWV9ICovXG4gICAgICAgIGNvbnN0IHRhc2tRdWV1ZSA9IFtdXG5cbiAgICAgICAgaWYgKCF0aGlzLnNraXBZYXJuKSB7XG4gICAgICAgICAgICBhd2FpdCBzZXR1cFlhcm5CZXJyeSh0YXNrUXVldWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc2tpcFByZXR0aWVyKSB7XG4gICAgICAgICAgICBhd2FpdCBzZXR1cFByZXR0aWVyKHRhc2tRdWV1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5za2lwRWRpdG9yY29uZmlnKSB7XG4gICAgICAgICAgICBhd2FpdCBzZXR1cEVkaXRvckNvbmZpZyh0YXNrUXVldWUpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgdGFza1F1ZXVlKSB7XG4gICAgICAgICAgICBzdGRvdXQud3JpdGUoXG4gICAgICAgICAgICAgICAgYFxcblske3Rhc2tRdWV1ZS5pbmRleE9mKHRhc2spICsgMX0vJHt0YXNrUXVldWUubGVuZ3RofV0gJHtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5sYWJlbFxuICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBhd2FpdCB0YXNrLmFjdGlvbihzdGRvdXQpXG4gICAgICAgIH1cblxuICAgICAgICBzdGRvdXQud3JpdGUoYFxcbkRvbmUhYClcbiAgICB9XG59XG5cbmNvbnN0IFssIGFwcCwgLi4uYXJnc10gPSBwcm9jZXNzLmFyZ3ZcblxuY29uc3QgY2xpID0gbmV3IENsaSh7XG4gICAgYmluYXJ5TGFiZWw6IGByZGlsaWZ5YCxcbiAgICBiaW5hcnlOYW1lOiBgbm9kZSAke2FwcH1gLFxuICAgIGJpbmFyeVZlcnNpb246IGAxLjAuMGAsXG59KVxuXG5jbGkucmVnaXN0ZXIoTWFpbkNvbW1hbmQpXG5jbGkucnVuRXhpdChhcmdzKVxuIiwgImltcG9ydCB7IGdldFBhY2thZ2VKc29uLCBydW5TY3JpcHQsIHdyaXRlUGFja2FnZUpzb24gfSBmcm9tIFwiLi4vdXRpbHMubWpzXCJcblxuLyoqXG4gKiBAcGFyYW0ge1Rhc2tRdWV1ZX0gdGFza1F1ZXVlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwUHJldHRpZXIodGFza1F1ZXVlKSB7XG4gICAgdGFza1F1ZXVlLnB1c2goe1xuICAgICAgICBsYWJlbDogXCJBZGRpbmcgUHJldHRpZXIgY29uZmlnXCIsXG4gICAgICAgIGFzeW5jIGFjdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gYXdhaXQgZ2V0UGFja2FnZUpzb24oKVxuICAgICAgICAgICAgY29uc3Qgc2NyaXB0cyA9IHBhY2thZ2VKc29uLnNjcmlwdHMgfHwge31cbiAgICAgICAgICAgIHBhY2thZ2VKc29uLnByZXR0aWVyID0ge1xuICAgICAgICAgICAgICAgIHNlbWk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRhYldpZHRoOiA0LFxuICAgICAgICAgICAgICAgIHRyYWlsaW5nQ29tbWE6IFwiZXM1XCIsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY3JpcHRzLnByZXR0aWVyID0gYHByZXR0aWVyIC0td3JpdGUgXFxcIioqLypcXFwiLntqcyxqc3gsdHMsdHN4LG1qcyxjanMsaHRtbCxqc29uLGNzcyxtZH1gXG4gICAgICAgICAgICBwYWNrYWdlSnNvbi5zY3JpcHRzID0gc2NyaXB0c1xuICAgICAgICAgICAgYXdhaXQgd3JpdGVQYWNrYWdlSnNvbihwYWNrYWdlSnNvbilcbiAgICAgICAgfSxcbiAgICB9KVxuXG4gICAgdGFza1F1ZXVlLnB1c2goe1xuICAgICAgICBsYWJlbDogXCJBZGRpbmcgUHJldHRpZXIgcGFja2FnZVwiLFxuICAgICAgICBhc3luYyBhY3Rpb24oc3Rkb3V0KSB7XG4gICAgICAgICAgICBhd2FpdCBydW5TY3JpcHQoXCJ5YXJuXCIsIFtcImFkZFwiLCBcInByZXR0aWVyXCJdLCBzdGRvdXQsIHRydWUpXG4gICAgICAgIH0sXG4gICAgfSlcblxuICAgIHRhc2tRdWV1ZS5wdXNoKHtcbiAgICAgICAgbGFiZWw6IFwiUnVubmluZyBQcmV0dGllclwiLFxuICAgICAgICBhc3luYyBhY3Rpb24oc3Rkb3V0KSB7XG4gICAgICAgICAgICBhd2FpdCBydW5TY3JpcHQoXCJ5YXJuXCIsIFtcInByZXR0aWVyXCJdLCBzdGRvdXQsIHRydWUpXG4gICAgICAgIH0sXG4gICAgfSlcbn1cbiIsICJpbXBvcnQgeyByZWFkRmlsZSwgd3JpdGVGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBleGVjYSB9IGZyb20gXCJleGVjYVwiXG5cbmNvbnN0IHBhY2thZ2VKc29uUGF0aCA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJwYWNrYWdlLmpzb25cIilcblxuLyoqXG4gKiBHZXQgdGhlIHBhY2thZ2UuanNvbiBmaWxlLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydChcInR5cGUtZmVzdFwiKS5QYWNrYWdlSnNvbj59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYWNrYWdlSnNvbigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSgoYXdhaXQgcmVhZEZpbGUocGFja2FnZUpzb25QYXRoKSkudG9TdHJpbmcoKSlcbn1cblxuLyoqXG4gKiBXcml0ZSB0byB0aGUgcGFja2FnZS5qc29uIGZpbGUuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoXCJ0eXBlLWZlc3RcIikuUGFja2FnZUpzb259IGNvbnRlbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVQYWNrYWdlSnNvbihjb250ZW50KSB7XG4gICAgYXdhaXQgd3JpdGVGaWxlKHBhY2thZ2VKc29uUGF0aCwgSlNPTi5zdHJpbmdpZnkoY29udGVudCwgdW5kZWZpbmVkLCA0KSlcbn1cblxuLyoqXG4gKiBSdW4gYSBjb25zb2xlIGNvbW1hbmQsIGJ1dCBwaXBlIGl0J3Mgb3V0cHV0IHRvIHRoZSBzYW1lIGFzIHRoZSBzY3JpcHQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNjcmlwdFxuICogQHBhcmFtIHtzdHJpbmdbXX0gYXJnc1xuICogQHBhcmFtIHtXcml0YWJsZX0gc3Rkb3V0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG5ld0xpbmVcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW5TY3JpcHQoc2NyaXB0LCBhcmdzLCBzdGRvdXQsIG5ld0xpbmUgPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGV4ZWMgPSBleGVjYShzY3JpcHQsIGFyZ3MpXG4gICAgICAgIGlmIChuZXdMaW5lKSB7XG4gICAgICAgICAgICBzdGRvdXQud3JpdGUoXCJcXG5cIilcbiAgICAgICAgfVxuICAgICAgICBleGVjLnN0ZG91dC5waXBlKHN0ZG91dClcbiAgICAgICAgZXhlYy50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdClcbiAgICB9KVxufVxuIiwgImltcG9ydCB7QnVmZmVyfSBmcm9tICdub2RlOmJ1ZmZlcic7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCBjcm9zc1NwYXduIGZyb20gJ2Nyb3NzLXNwYXduJztcbmltcG9ydCBzdHJpcEZpbmFsTmV3bGluZSBmcm9tICdzdHJpcC1maW5hbC1uZXdsaW5lJztcbmltcG9ydCB7bnBtUnVuUGF0aEVudn0gZnJvbSAnbnBtLXJ1bi1wYXRoJztcbmltcG9ydCBvbmV0aW1lIGZyb20gJ29uZXRpbWUnO1xuaW1wb3J0IHttYWtlRXJyb3J9IGZyb20gJy4vbGliL2Vycm9yLmpzJztcbmltcG9ydCB7bm9ybWFsaXplU3RkaW8sIG5vcm1hbGl6ZVN0ZGlvTm9kZX0gZnJvbSAnLi9saWIvc3RkaW8uanMnO1xuaW1wb3J0IHtzcGF3bmVkS2lsbCwgc3Bhd25lZENhbmNlbCwgc2V0dXBUaW1lb3V0LCB2YWxpZGF0ZVRpbWVvdXQsIHNldEV4aXRIYW5kbGVyfSBmcm9tICcuL2xpYi9raWxsLmpzJztcbmltcG9ydCB7aGFuZGxlSW5wdXQsIGdldFNwYXduZWRSZXN1bHQsIG1ha2VBbGxTdHJlYW0sIHZhbGlkYXRlSW5wdXRTeW5jfSBmcm9tICcuL2xpYi9zdHJlYW0uanMnO1xuaW1wb3J0IHttZXJnZVByb21pc2UsIGdldFNwYXduZWRQcm9taXNlfSBmcm9tICcuL2xpYi9wcm9taXNlLmpzJztcbmltcG9ydCB7am9pbkNvbW1hbmQsIHBhcnNlQ29tbWFuZCwgZ2V0RXNjYXBlZENvbW1hbmR9IGZyb20gJy4vbGliL2NvbW1hbmQuanMnO1xuXG5jb25zdCBERUZBVUxUX01BWF9CVUZGRVIgPSAxMDAwICogMTAwMCAqIDEwMDtcblxuY29uc3QgZ2V0RW52ID0gKHtlbnY6IGVudk9wdGlvbiwgZXh0ZW5kRW52LCBwcmVmZXJMb2NhbCwgbG9jYWxEaXIsIGV4ZWNQYXRofSkgPT4ge1xuXHRjb25zdCBlbnYgPSBleHRlbmRFbnYgPyB7Li4ucHJvY2Vzcy5lbnYsIC4uLmVudk9wdGlvbn0gOiBlbnZPcHRpb247XG5cblx0aWYgKHByZWZlckxvY2FsKSB7XG5cdFx0cmV0dXJuIG5wbVJ1blBhdGhFbnYoe2VudiwgY3dkOiBsb2NhbERpciwgZXhlY1BhdGh9KTtcblx0fVxuXG5cdHJldHVybiBlbnY7XG59O1xuXG5jb25zdCBoYW5kbGVBcmd1bWVudHMgPSAoZmlsZSwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGNvbnN0IHBhcnNlZCA9IGNyb3NzU3Bhd24uX3BhcnNlKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRmaWxlID0gcGFyc2VkLmNvbW1hbmQ7XG5cdGFyZ3MgPSBwYXJzZWQuYXJncztcblx0b3B0aW9ucyA9IHBhcnNlZC5vcHRpb25zO1xuXG5cdG9wdGlvbnMgPSB7XG5cdFx0bWF4QnVmZmVyOiBERUZBVUxUX01BWF9CVUZGRVIsXG5cdFx0YnVmZmVyOiB0cnVlLFxuXHRcdHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlLFxuXHRcdGV4dGVuZEVudjogdHJ1ZSxcblx0XHRwcmVmZXJMb2NhbDogZmFsc2UsXG5cdFx0bG9jYWxEaXI6IG9wdGlvbnMuY3dkIHx8IHByb2Nlc3MuY3dkKCksXG5cdFx0ZXhlY1BhdGg6IHByb2Nlc3MuZXhlY1BhdGgsXG5cdFx0ZW5jb2Rpbmc6ICd1dGY4Jyxcblx0XHRyZWplY3Q6IHRydWUsXG5cdFx0Y2xlYW51cDogdHJ1ZSxcblx0XHRhbGw6IGZhbHNlLFxuXHRcdHdpbmRvd3NIaWRlOiB0cnVlLFxuXHRcdC4uLm9wdGlvbnMsXG5cdH07XG5cblx0b3B0aW9ucy5lbnYgPSBnZXRFbnYob3B0aW9ucyk7XG5cblx0b3B0aW9ucy5zdGRpbyA9IG5vcm1hbGl6ZVN0ZGlvKG9wdGlvbnMpO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIHBhdGguYmFzZW5hbWUoZmlsZSwgJy5leGUnKSA9PT0gJ2NtZCcpIHtcblx0XHQvLyAjMTE2XG5cdFx0YXJncy51bnNoaWZ0KCcvcScpO1xuXHR9XG5cblx0cmV0dXJuIHtmaWxlLCBhcmdzLCBvcHRpb25zLCBwYXJzZWR9O1xufTtcblxuY29uc3QgaGFuZGxlT3V0cHV0ID0gKG9wdGlvbnMsIHZhbHVlLCBlcnJvcikgPT4ge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuXHRcdC8vIFdoZW4gYGV4ZWNhU3luYygpYCBlcnJvcnMsIHdlIG5vcm1hbGl6ZSBpdCB0byAnJyB0byBtaW1pYyBgZXhlY2EoKWBcblx0XHRyZXR1cm4gZXJyb3IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6ICcnO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuc3RyaXBGaW5hbE5ld2xpbmUpIHtcblx0XHRyZXR1cm4gc3RyaXBGaW5hbE5ld2xpbmUodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNhKGZpbGUsIGFyZ3MsIG9wdGlvbnMpIHtcblx0Y29uc3QgcGFyc2VkID0gaGFuZGxlQXJndW1lbnRzKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRjb25zdCBjb21tYW5kID0gam9pbkNvbW1hbmQoZmlsZSwgYXJncyk7XG5cdGNvbnN0IGVzY2FwZWRDb21tYW5kID0gZ2V0RXNjYXBlZENvbW1hbmQoZmlsZSwgYXJncyk7XG5cblx0dmFsaWRhdGVUaW1lb3V0KHBhcnNlZC5vcHRpb25zKTtcblxuXHRsZXQgc3Bhd25lZDtcblx0dHJ5IHtcblx0XHRzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKHBhcnNlZC5maWxlLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIEVuc3VyZSB0aGUgcmV0dXJuZWQgZXJyb3IgaXMgYWx3YXlzIGJvdGggYSBwcm9taXNlIGFuZCBhIGNoaWxkIHByb2Nlc3Ncblx0XHRjb25zdCBkdW1teVNwYXduZWQgPSBuZXcgY2hpbGRQcm9jZXNzLkNoaWxkUHJvY2VzcygpO1xuXHRcdGNvbnN0IGVycm9yUHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG1ha2VFcnJvcih7XG5cdFx0XHRlcnJvcixcblx0XHRcdHN0ZG91dDogJycsXG5cdFx0XHRzdGRlcnI6ICcnLFxuXHRcdFx0YWxsOiAnJyxcblx0XHRcdGNvbW1hbmQsXG5cdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdHBhcnNlZCxcblx0XHRcdHRpbWVkT3V0OiBmYWxzZSxcblx0XHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdFx0a2lsbGVkOiBmYWxzZSxcblx0XHR9KSk7XG5cdFx0cmV0dXJuIG1lcmdlUHJvbWlzZShkdW1teVNwYXduZWQsIGVycm9yUHJvbWlzZSk7XG5cdH1cblxuXHRjb25zdCBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQpO1xuXHRjb25zdCB0aW1lZFByb21pc2UgPSBzZXR1cFRpbWVvdXQoc3Bhd25lZCwgcGFyc2VkLm9wdGlvbnMsIHNwYXduZWRQcm9taXNlKTtcblx0Y29uc3QgcHJvY2Vzc0RvbmUgPSBzZXRFeGl0SGFuZGxlcihzcGF3bmVkLCBwYXJzZWQub3B0aW9ucywgdGltZWRQcm9taXNlKTtcblxuXHRjb25zdCBjb250ZXh0ID0ge2lzQ2FuY2VsZWQ6IGZhbHNlfTtcblxuXHRzcGF3bmVkLmtpbGwgPSBzcGF3bmVkS2lsbC5iaW5kKG51bGwsIHNwYXduZWQua2lsbC5iaW5kKHNwYXduZWQpKTtcblx0c3Bhd25lZC5jYW5jZWwgPSBzcGF3bmVkQ2FuY2VsLmJpbmQobnVsbCwgc3Bhd25lZCwgY29udGV4dCk7XG5cblx0Y29uc3QgaGFuZGxlUHJvbWlzZSA9IGFzeW5jICgpID0+IHtcblx0XHRjb25zdCBbe2Vycm9yLCBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0LCBhbGxSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdChzcGF3bmVkLCBwYXJzZWQub3B0aW9ucywgcHJvY2Vzc0RvbmUpO1xuXHRcdGNvbnN0IHN0ZG91dCA9IGhhbmRsZU91dHB1dChwYXJzZWQub3B0aW9ucywgc3Rkb3V0UmVzdWx0KTtcblx0XHRjb25zdCBzdGRlcnIgPSBoYW5kbGVPdXRwdXQocGFyc2VkLm9wdGlvbnMsIHN0ZGVyclJlc3VsdCk7XG5cdFx0Y29uc3QgYWxsID0gaGFuZGxlT3V0cHV0KHBhcnNlZC5vcHRpb25zLCBhbGxSZXN1bHQpO1xuXG5cdFx0aWYgKGVycm9yIHx8IGV4aXRDb2RlICE9PSAwIHx8IHNpZ25hbCAhPT0gbnVsbCkge1xuXHRcdFx0Y29uc3QgcmV0dXJuZWRFcnJvciA9IG1ha2VFcnJvcih7XG5cdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRleGl0Q29kZSxcblx0XHRcdFx0c2lnbmFsLFxuXHRcdFx0XHRzdGRvdXQsXG5cdFx0XHRcdHN0ZGVycixcblx0XHRcdFx0YWxsLFxuXHRcdFx0XHRjb21tYW5kLFxuXHRcdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdFx0cGFyc2VkLFxuXHRcdFx0XHR0aW1lZE91dCxcblx0XHRcdFx0aXNDYW5jZWxlZDogY29udGV4dC5pc0NhbmNlbGVkIHx8IChwYXJzZWQub3B0aW9ucy5zaWduYWwgPyBwYXJzZWQub3B0aW9ucy5zaWduYWwuYWJvcnRlZCA6IGZhbHNlKSxcblx0XHRcdFx0a2lsbGVkOiBzcGF3bmVkLmtpbGxlZCxcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXBhcnNlZC5vcHRpb25zLnJlamVjdCkge1xuXHRcdFx0XHRyZXR1cm4gcmV0dXJuZWRFcnJvcjtcblx0XHRcdH1cblxuXHRcdFx0dGhyb3cgcmV0dXJuZWRFcnJvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29tbWFuZCxcblx0XHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdFx0ZXhpdENvZGU6IDAsXG5cdFx0XHRzdGRvdXQsXG5cdFx0XHRzdGRlcnIsXG5cdFx0XHRhbGwsXG5cdFx0XHRmYWlsZWQ6IGZhbHNlLFxuXHRcdFx0dGltZWRPdXQ6IGZhbHNlLFxuXHRcdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0XHRraWxsZWQ6IGZhbHNlLFxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgaGFuZGxlUHJvbWlzZU9uY2UgPSBvbmV0aW1lKGhhbmRsZVByb21pc2UpO1xuXG5cdGhhbmRsZUlucHV0KHNwYXduZWQsIHBhcnNlZC5vcHRpb25zLmlucHV0KTtcblxuXHRzcGF3bmVkLmFsbCA9IG1ha2VBbGxTdHJlYW0oc3Bhd25lZCwgcGFyc2VkLm9wdGlvbnMpO1xuXG5cdHJldHVybiBtZXJnZVByb21pc2Uoc3Bhd25lZCwgaGFuZGxlUHJvbWlzZU9uY2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY2FTeW5jKGZpbGUsIGFyZ3MsIG9wdGlvbnMpIHtcblx0Y29uc3QgcGFyc2VkID0gaGFuZGxlQXJndW1lbnRzKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRjb25zdCBjb21tYW5kID0gam9pbkNvbW1hbmQoZmlsZSwgYXJncyk7XG5cdGNvbnN0IGVzY2FwZWRDb21tYW5kID0gZ2V0RXNjYXBlZENvbW1hbmQoZmlsZSwgYXJncyk7XG5cblx0dmFsaWRhdGVJbnB1dFN5bmMocGFyc2VkLm9wdGlvbnMpO1xuXG5cdGxldCByZXN1bHQ7XG5cdHRyeSB7XG5cdFx0cmVzdWx0ID0gY2hpbGRQcm9jZXNzLnNwYXduU3luYyhwYXJzZWQuZmlsZSwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHR0aHJvdyBtYWtlRXJyb3Ioe1xuXHRcdFx0ZXJyb3IsXG5cdFx0XHRzdGRvdXQ6ICcnLFxuXHRcdFx0c3RkZXJyOiAnJyxcblx0XHRcdGFsbDogJycsXG5cdFx0XHRjb21tYW5kLFxuXHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRwYXJzZWQsXG5cdFx0XHR0aW1lZE91dDogZmFsc2UsXG5cdFx0XHRpc0NhbmNlbGVkOiBmYWxzZSxcblx0XHRcdGtpbGxlZDogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblxuXHRjb25zdCBzdGRvdXQgPSBoYW5kbGVPdXRwdXQocGFyc2VkLm9wdGlvbnMsIHJlc3VsdC5zdGRvdXQsIHJlc3VsdC5lcnJvcik7XG5cdGNvbnN0IHN0ZGVyciA9IGhhbmRsZU91dHB1dChwYXJzZWQub3B0aW9ucywgcmVzdWx0LnN0ZGVyciwgcmVzdWx0LmVycm9yKTtcblxuXHRpZiAocmVzdWx0LmVycm9yIHx8IHJlc3VsdC5zdGF0dXMgIT09IDAgfHwgcmVzdWx0LnNpZ25hbCAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IGVycm9yID0gbWFrZUVycm9yKHtcblx0XHRcdHN0ZG91dCxcblx0XHRcdHN0ZGVycixcblx0XHRcdGVycm9yOiByZXN1bHQuZXJyb3IsXG5cdFx0XHRzaWduYWw6IHJlc3VsdC5zaWduYWwsXG5cdFx0XHRleGl0Q29kZTogcmVzdWx0LnN0YXR1cyxcblx0XHRcdGNvbW1hbmQsXG5cdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdHBhcnNlZCxcblx0XHRcdHRpbWVkT3V0OiByZXN1bHQuZXJyb3IgJiYgcmVzdWx0LmVycm9yLmNvZGUgPT09ICdFVElNRURPVVQnLFxuXHRcdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0XHRraWxsZWQ6IHJlc3VsdC5zaWduYWwgIT09IG51bGwsXG5cdFx0fSk7XG5cblx0XHRpZiAoIXBhcnNlZC5vcHRpb25zLnJlamVjdCkge1xuXHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdH1cblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdGV4aXRDb2RlOiAwLFxuXHRcdHN0ZG91dCxcblx0XHRzdGRlcnIsXG5cdFx0ZmFpbGVkOiBmYWxzZSxcblx0XHR0aW1lZE91dDogZmFsc2UsXG5cdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0a2lsbGVkOiBmYWxzZSxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNhQ29tbWFuZChjb21tYW5kLCBvcHRpb25zKSB7XG5cdGNvbnN0IFtmaWxlLCAuLi5hcmdzXSA9IHBhcnNlQ29tbWFuZChjb21tYW5kKTtcblx0cmV0dXJuIGV4ZWNhKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY2FDb21tYW5kU3luYyhjb21tYW5kLCBvcHRpb25zKSB7XG5cdGNvbnN0IFtmaWxlLCAuLi5hcmdzXSA9IHBhcnNlQ29tbWFuZChjb21tYW5kKTtcblx0cmV0dXJuIGV4ZWNhU3luYyhmaWxlLCBhcmdzLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNhTm9kZShzY3JpcHRQYXRoLCBhcmdzLCBvcHRpb25zID0ge30pIHtcblx0aWYgKGFyZ3MgJiYgIUFycmF5LmlzQXJyYXkoYXJncykgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3M7XG5cdFx0YXJncyA9IFtdO1xuXHR9XG5cblx0Y29uc3Qgc3RkaW8gPSBub3JtYWxpemVTdGRpb05vZGUob3B0aW9ucyk7XG5cdGNvbnN0IGRlZmF1bHRFeGVjQXJndiA9IHByb2Nlc3MuZXhlY0FyZ3YuZmlsdGVyKGFyZyA9PiAhYXJnLnN0YXJ0c1dpdGgoJy0taW5zcGVjdCcpKTtcblxuXHRjb25zdCB7XG5cdFx0bm9kZVBhdGggPSBwcm9jZXNzLmV4ZWNQYXRoLFxuXHRcdG5vZGVPcHRpb25zID0gZGVmYXVsdEV4ZWNBcmd2LFxuXHR9ID0gb3B0aW9ucztcblxuXHRyZXR1cm4gZXhlY2EoXG5cdFx0bm9kZVBhdGgsXG5cdFx0W1xuXHRcdFx0Li4ubm9kZU9wdGlvbnMsXG5cdFx0XHRzY3JpcHRQYXRoLFxuXHRcdFx0Li4uKEFycmF5LmlzQXJyYXkoYXJncykgPyBhcmdzIDogW10pLFxuXHRcdF0sXG5cdFx0e1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdHN0ZGluOiB1bmRlZmluZWQsXG5cdFx0XHRzdGRvdXQ6IHVuZGVmaW5lZCxcblx0XHRcdHN0ZGVycjogdW5kZWZpbmVkLFxuXHRcdFx0c3RkaW8sXG5cdFx0XHRzaGVsbDogZmFsc2UsXG5cdFx0fSxcblx0KTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcEZpbmFsTmV3bGluZShpbnB1dCkge1xuXHRjb25zdCBMRiA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyAnXFxuJyA6ICdcXG4nLmNoYXJDb2RlQXQoKTtcblx0Y29uc3QgQ1IgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gJ1xccicgOiAnXFxyJy5jaGFyQ29kZUF0KCk7XG5cblx0aWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBMRikge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgLTEpO1xuXHR9XG5cblx0aWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBDUikge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgLTEpO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuIiwgImltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHVybCBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgcGF0aEtleSBmcm9tICdwYXRoLWtleSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBucG1SdW5QYXRoKG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCB7XG5cdFx0Y3dkID0gcHJvY2Vzcy5jd2QoKSxcblx0XHRwYXRoOiBwYXRoXyA9IHByb2Nlc3MuZW52W3BhdGhLZXkoKV0sXG5cdFx0ZXhlY1BhdGggPSBwcm9jZXNzLmV4ZWNQYXRoLFxuXHR9ID0gb3B0aW9ucztcblxuXHRsZXQgcHJldmlvdXM7XG5cdGNvbnN0IGN3ZFN0cmluZyA9IGN3ZCBpbnN0YW5jZW9mIFVSTCA/IHVybC5maWxlVVJMVG9QYXRoKGN3ZCkgOiBjd2Q7XG5cdGxldCBjd2RQYXRoID0gcGF0aC5yZXNvbHZlKGN3ZFN0cmluZyk7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdHdoaWxlIChwcmV2aW91cyAhPT0gY3dkUGF0aCkge1xuXHRcdHJlc3VsdC5wdXNoKHBhdGguam9pbihjd2RQYXRoLCAnbm9kZV9tb2R1bGVzLy5iaW4nKSk7XG5cdFx0cHJldmlvdXMgPSBjd2RQYXRoO1xuXHRcdGN3ZFBhdGggPSBwYXRoLnJlc29sdmUoY3dkUGF0aCwgJy4uJyk7XG5cdH1cblxuXHQvLyBFbnN1cmUgdGhlIHJ1bm5pbmcgYG5vZGVgIGJpbmFyeSBpcyB1c2VkLlxuXHRyZXN1bHQucHVzaChwYXRoLnJlc29sdmUoY3dkU3RyaW5nLCBleGVjUGF0aCwgJy4uJykpO1xuXG5cdHJldHVybiBbLi4ucmVzdWx0LCBwYXRoX10uam9pbihwYXRoLmRlbGltaXRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBucG1SdW5QYXRoRW52KHtlbnYgPSBwcm9jZXNzLmVudiwgLi4ub3B0aW9uc30gPSB7fSkge1xuXHRlbnYgPSB7Li4uZW52fTtcblxuXHRjb25zdCBwYXRoID0gcGF0aEtleSh7ZW52fSk7XG5cdG9wdGlvbnMucGF0aCA9IGVudltwYXRoXTtcblx0ZW52W3BhdGhdID0gbnBtUnVuUGF0aChvcHRpb25zKTtcblxuXHRyZXR1cm4gZW52O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhdGhLZXkob3B0aW9ucyA9IHt9KSB7XG5cdGNvbnN0IHtcblx0XHRlbnYgPSBwcm9jZXNzLmVudixcblx0XHRwbGF0Zm9ybSA9IHByb2Nlc3MucGxhdGZvcm1cblx0fSA9IG9wdGlvbnM7XG5cblx0aWYgKHBsYXRmb3JtICE9PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuICdQQVRIJztcblx0fVxuXG5cdHJldHVybiBPYmplY3Qua2V5cyhlbnYpLnJldmVyc2UoKS5maW5kKGtleSA9PiBrZXkudG9VcHBlckNhc2UoKSA9PT0gJ1BBVEgnKSB8fCAnUGF0aCc7XG59XG4iLCAiaW1wb3J0IG1pbWljRnVuY3Rpb24gZnJvbSAnbWltaWMtZm4nO1xuXG5jb25zdCBjYWxsZWRGdW5jdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBvbmV0aW1lID0gKGZ1bmN0aW9uXywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmICh0eXBlb2YgZnVuY3Rpb25fICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBmdW5jdGlvbicpO1xuXHR9XG5cblx0bGV0IHJldHVyblZhbHVlO1xuXHRsZXQgY2FsbENvdW50ID0gMDtcblx0Y29uc3QgZnVuY3Rpb25OYW1lID0gZnVuY3Rpb25fLmRpc3BsYXlOYW1lIHx8IGZ1bmN0aW9uXy5uYW1lIHx8ICc8YW5vbnltb3VzPic7XG5cblx0Y29uc3Qgb25ldGltZSA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0Y2FsbGVkRnVuY3Rpb25zLnNldChvbmV0aW1lLCArK2NhbGxDb3VudCk7XG5cblx0XHRpZiAoY2FsbENvdW50ID09PSAxKSB7XG5cdFx0XHRyZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uXy5hcHBseSh0aGlzLCBhcmd1bWVudHNfKTtcblx0XHRcdGZ1bmN0aW9uXyA9IG51bGw7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLnRocm93ID09PSB0cnVlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIFxcYCR7ZnVuY3Rpb25OYW1lfVxcYCBjYW4gb25seSBiZSBjYWxsZWQgb25jZWApO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0fTtcblxuXHRtaW1pY0Z1bmN0aW9uKG9uZXRpbWUsIGZ1bmN0aW9uXyk7XG5cdGNhbGxlZEZ1bmN0aW9ucy5zZXQob25ldGltZSwgY2FsbENvdW50KTtcblxuXHRyZXR1cm4gb25ldGltZTtcbn07XG5cbm9uZXRpbWUuY2FsbENvdW50ID0gZnVuY3Rpb25fID0+IHtcblx0aWYgKCFjYWxsZWRGdW5jdGlvbnMuaGFzKGZ1bmN0aW9uXykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBnaXZlbiBmdW5jdGlvbiBcXGAke2Z1bmN0aW9uXy5uYW1lfVxcYCBpcyBub3Qgd3JhcHBlZCBieSB0aGUgXFxgb25ldGltZVxcYCBwYWNrYWdlYCk7XG5cdH1cblxuXHRyZXR1cm4gY2FsbGVkRnVuY3Rpb25zLmdldChmdW5jdGlvbl8pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgb25ldGltZTtcbiIsICJjb25zdCBjb3B5UHJvcGVydHkgPSAodG8sIGZyb20sIHByb3BlcnR5LCBpZ25vcmVOb25Db25maWd1cmFibGUpID0+IHtcblx0Ly8gYEZ1bmN0aW9uI2xlbmd0aGAgc2hvdWxkIHJlZmxlY3QgdGhlIHBhcmFtZXRlcnMgb2YgYHRvYCBub3QgYGZyb21gIHNpbmNlIHdlIGtlZXAgaXRzIGJvZHkuXG5cdC8vIGBGdW5jdGlvbiNwcm90b3R5cGVgIGlzIG5vbi13cml0YWJsZSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSBzbyBjYW4gbmV2ZXIgYmUgbW9kaWZpZWQuXG5cdGlmIChwcm9wZXJ0eSA9PT0gJ2xlbmd0aCcgfHwgcHJvcGVydHkgPT09ICdwcm90b3R5cGUnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gYEZ1bmN0aW9uI2FyZ3VtZW50c2AgYW5kIGBGdW5jdGlvbiNjYWxsZXJgIHNob3VsZCBub3QgYmUgY29waWVkLiBUaGV5IHdlcmUgcmVwb3J0ZWQgdG8gYmUgcHJlc2VudCBpbiBgUmVmbGVjdC5vd25LZXlzYCBmb3Igc29tZSBkZXZpY2VzIGluIFJlYWN0IE5hdGl2ZSAoIzQxKSwgc28gd2UgZXhwbGljaXRseSBpZ25vcmUgdGhlbSBoZXJlLlxuXHRpZiAocHJvcGVydHkgPT09ICdhcmd1bWVudHMnIHx8IHByb3BlcnR5ID09PSAnY2FsbGVyJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHRvRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG8sIHByb3BlcnR5KTtcblx0Y29uc3QgZnJvbURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZyb20sIHByb3BlcnR5KTtcblxuXHRpZiAoIWNhbkNvcHlQcm9wZXJ0eSh0b0Rlc2NyaXB0b3IsIGZyb21EZXNjcmlwdG9yKSAmJiBpZ25vcmVOb25Db25maWd1cmFibGUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHByb3BlcnR5LCBmcm9tRGVzY3JpcHRvcik7XG59O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5KClgIHRocm93cyBpZiB0aGUgcHJvcGVydHkgZXhpc3RzLCBpcyBub3QgY29uZmlndXJhYmxlIGFuZCBlaXRoZXI6XG4vLyAtIG9uZSBpdHMgZGVzY3JpcHRvcnMgaXMgY2hhbmdlZFxuLy8gLSBpdCBpcyBub24td3JpdGFibGUgYW5kIGl0cyB2YWx1ZSBpcyBjaGFuZ2VkXG5jb25zdCBjYW5Db3B5UHJvcGVydHkgPSBmdW5jdGlvbiAodG9EZXNjcmlwdG9yLCBmcm9tRGVzY3JpcHRvcikge1xuXHRyZXR1cm4gdG9EZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgdG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fCAoXG5cdFx0dG9EZXNjcmlwdG9yLndyaXRhYmxlID09PSBmcm9tRGVzY3JpcHRvci53cml0YWJsZSAmJlxuXHRcdHRvRGVzY3JpcHRvci5lbnVtZXJhYmxlID09PSBmcm9tRGVzY3JpcHRvci5lbnVtZXJhYmxlICYmXG5cdFx0dG9EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9PT0gZnJvbURlc2NyaXB0b3IuY29uZmlndXJhYmxlICYmXG5cdFx0KHRvRGVzY3JpcHRvci53cml0YWJsZSB8fCB0b0Rlc2NyaXB0b3IudmFsdWUgPT09IGZyb21EZXNjcmlwdG9yLnZhbHVlKVxuXHQpO1xufTtcblxuY29uc3QgY2hhbmdlUHJvdG90eXBlID0gKHRvLCBmcm9tKSA9PiB7XG5cdGNvbnN0IGZyb21Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnJvbSk7XG5cdGlmIChmcm9tUHJvdG90eXBlID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodG8pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKHRvLCBmcm9tUHJvdG90eXBlKTtcbn07XG5cbmNvbnN0IHdyYXBwZWRUb1N0cmluZyA9ICh3aXRoTmFtZSwgZnJvbUJvZHkpID0+IGAvKiBXcmFwcGVkICR7d2l0aE5hbWV9Ki9cXG4ke2Zyb21Cb2R5fWA7XG5cbmNvbnN0IHRvU3RyaW5nRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnKTtcbmNvbnN0IHRvU3RyaW5nTmFtZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLCAnbmFtZScpO1xuXG4vLyBXZSBjYWxsIGBmcm9tLnRvU3RyaW5nKClgIGVhcmx5IChub3QgbGF6aWx5KSB0byBlbnN1cmUgYGZyb21gIGNhbiBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbi8vIFdlIHVzZSBgYmluZCgpYCBpbnN0ZWFkIG9mIGEgY2xvc3VyZSBmb3IgdGhlIHNhbWUgcmVhc29uLlxuLy8gQ2FsbGluZyBgZnJvbS50b1N0cmluZygpYCBlYXJseSBhbHNvIGFsbG93cyBjYWNoaW5nIGl0IGluIGNhc2UgYHRvLnRvU3RyaW5nKClgIGlzIGNhbGxlZCBzZXZlcmFsIHRpbWVzLlxuY29uc3QgY2hhbmdlVG9TdHJpbmcgPSAodG8sIGZyb20sIG5hbWUpID0+IHtcblx0Y29uc3Qgd2l0aE5hbWUgPSBuYW1lID09PSAnJyA/ICcnIDogYHdpdGggJHtuYW1lLnRyaW0oKX0oKSBgO1xuXHRjb25zdCBuZXdUb1N0cmluZyA9IHdyYXBwZWRUb1N0cmluZy5iaW5kKG51bGwsIHdpdGhOYW1lLCBmcm9tLnRvU3RyaW5nKCkpO1xuXHQvLyBFbnN1cmUgYHRvLnRvU3RyaW5nLnRvU3RyaW5nYCBpcyBub24tZW51bWVyYWJsZSBhbmQgaGFzIHRoZSBzYW1lIGBzYW1lYFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3VG9TdHJpbmcsICduYW1lJywgdG9TdHJpbmdOYW1lKTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCAndG9TdHJpbmcnLCB7Li4udG9TdHJpbmdEZXNjcmlwdG9yLCB2YWx1ZTogbmV3VG9TdHJpbmd9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1pbWljRnVuY3Rpb24odG8sIGZyb20sIHtpZ25vcmVOb25Db25maWd1cmFibGUgPSBmYWxzZX0gPSB7fSkge1xuXHRjb25zdCB7bmFtZX0gPSB0bztcblxuXHRmb3IgKGNvbnN0IHByb3BlcnR5IG9mIFJlZmxlY3Qub3duS2V5cyhmcm9tKSkge1xuXHRcdGNvcHlQcm9wZXJ0eSh0bywgZnJvbSwgcHJvcGVydHksIGlnbm9yZU5vbkNvbmZpZ3VyYWJsZSk7XG5cdH1cblxuXHRjaGFuZ2VQcm90b3R5cGUodG8sIGZyb20pO1xuXHRjaGFuZ2VUb1N0cmluZyh0bywgZnJvbSwgbmFtZSk7XG5cblx0cmV0dXJuIHRvO1xufVxuIiwgImltcG9ydCB7c2lnbmFsc0J5TmFtZX0gZnJvbSAnaHVtYW4tc2lnbmFscyc7XG5cbmNvbnN0IGdldEVycm9yUHJlZml4ID0gKHt0aW1lZE91dCwgdGltZW91dCwgZXJyb3JDb2RlLCBzaWduYWwsIHNpZ25hbERlc2NyaXB0aW9uLCBleGl0Q29kZSwgaXNDYW5jZWxlZH0pID0+IHtcblx0aWYgKHRpbWVkT3V0KSB7XG5cdFx0cmV0dXJuIGB0aW1lZCBvdXQgYWZ0ZXIgJHt0aW1lb3V0fSBtaWxsaXNlY29uZHNgO1xuXHR9XG5cblx0aWYgKGlzQ2FuY2VsZWQpIHtcblx0XHRyZXR1cm4gJ3dhcyBjYW5jZWxlZCc7XG5cdH1cblxuXHRpZiAoZXJyb3JDb2RlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYGZhaWxlZCB3aXRoICR7ZXJyb3JDb2RlfWA7XG5cdH1cblxuXHRpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYHdhcyBraWxsZWQgd2l0aCAke3NpZ25hbH0gKCR7c2lnbmFsRGVzY3JpcHRpb259KWA7XG5cdH1cblxuXHRpZiAoZXhpdENvZGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBgZmFpbGVkIHdpdGggZXhpdCBjb2RlICR7ZXhpdENvZGV9YDtcblx0fVxuXG5cdHJldHVybiAnZmFpbGVkJztcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlRXJyb3IgPSAoe1xuXHRzdGRvdXQsXG5cdHN0ZGVycixcblx0YWxsLFxuXHRlcnJvcixcblx0c2lnbmFsLFxuXHRleGl0Q29kZSxcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdHRpbWVkT3V0LFxuXHRpc0NhbmNlbGVkLFxuXHRraWxsZWQsXG5cdHBhcnNlZDoge29wdGlvbnM6IHt0aW1lb3V0fX0sXG59KSA9PiB7XG5cdC8vIGBzaWduYWxgIGFuZCBgZXhpdENvZGVgIGVtaXR0ZWQgb24gYHNwYXduZWQub24oJ2V4aXQnKWAgZXZlbnQgY2FuIGJlIGBudWxsYC5cblx0Ly8gV2Ugbm9ybWFsaXplIHRoZW0gdG8gYHVuZGVmaW5lZGBcblx0ZXhpdENvZGUgPSBleGl0Q29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGV4aXRDb2RlO1xuXHRzaWduYWwgPSBzaWduYWwgPT09IG51bGwgPyB1bmRlZmluZWQgOiBzaWduYWw7XG5cdGNvbnN0IHNpZ25hbERlc2NyaXB0aW9uID0gc2lnbmFsID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzaWduYWxzQnlOYW1lW3NpZ25hbF0uZGVzY3JpcHRpb247XG5cblx0Y29uc3QgZXJyb3JDb2RlID0gZXJyb3IgJiYgZXJyb3IuY29kZTtcblxuXHRjb25zdCBwcmVmaXggPSBnZXRFcnJvclByZWZpeCh7dGltZWRPdXQsIHRpbWVvdXQsIGVycm9yQ29kZSwgc2lnbmFsLCBzaWduYWxEZXNjcmlwdGlvbiwgZXhpdENvZGUsIGlzQ2FuY2VsZWR9KTtcblx0Y29uc3QgZXhlY2FNZXNzYWdlID0gYENvbW1hbmQgJHtwcmVmaXh9OiAke2NvbW1hbmR9YDtcblx0Y29uc3QgaXNFcnJvciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlcnJvcikgPT09ICdbb2JqZWN0IEVycm9yXSc7XG5cdGNvbnN0IHNob3J0TWVzc2FnZSA9IGlzRXJyb3IgPyBgJHtleGVjYU1lc3NhZ2V9XFxuJHtlcnJvci5tZXNzYWdlfWAgOiBleGVjYU1lc3NhZ2U7XG5cdGNvbnN0IG1lc3NhZ2UgPSBbc2hvcnRNZXNzYWdlLCBzdGRlcnIsIHN0ZG91dF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXG5cdGlmIChpc0Vycm9yKSB7XG5cdFx0ZXJyb3Iub3JpZ2luYWxNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblx0XHRlcnJvci5tZXNzYWdlID0gbWVzc2FnZTtcblx0fSBlbHNlIHtcblx0XHRlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcblx0fVxuXG5cdGVycm9yLnNob3J0TWVzc2FnZSA9IHNob3J0TWVzc2FnZTtcblx0ZXJyb3IuY29tbWFuZCA9IGNvbW1hbmQ7XG5cdGVycm9yLmVzY2FwZWRDb21tYW5kID0gZXNjYXBlZENvbW1hbmQ7XG5cdGVycm9yLmV4aXRDb2RlID0gZXhpdENvZGU7XG5cdGVycm9yLnNpZ25hbCA9IHNpZ25hbDtcblx0ZXJyb3Iuc2lnbmFsRGVzY3JpcHRpb24gPSBzaWduYWxEZXNjcmlwdGlvbjtcblx0ZXJyb3Iuc3Rkb3V0ID0gc3Rkb3V0O1xuXHRlcnJvci5zdGRlcnIgPSBzdGRlcnI7XG5cblx0aWYgKGFsbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0ZXJyb3IuYWxsID0gYWxsO1xuXHR9XG5cblx0aWYgKCdidWZmZXJlZERhdGEnIGluIGVycm9yKSB7XG5cdFx0ZGVsZXRlIGVycm9yLmJ1ZmZlcmVkRGF0YTtcblx0fVxuXG5cdGVycm9yLmZhaWxlZCA9IHRydWU7XG5cdGVycm9yLnRpbWVkT3V0ID0gQm9vbGVhbih0aW1lZE91dCk7XG5cdGVycm9yLmlzQ2FuY2VsZWQgPSBpc0NhbmNlbGVkO1xuXHRlcnJvci5raWxsZWQgPSBraWxsZWQgJiYgIXRpbWVkT3V0O1xuXG5cdHJldHVybiBlcnJvcjtcbn07XG4iLCAiaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnb3MnXG5cbmltcG9ydCB7IFNJR1JUTUFYIH0gZnJvbSAnLi9yZWFsdGltZS5qcydcbmltcG9ydCB7IGdldFNpZ25hbHMgfSBmcm9tICcuL3NpZ25hbHMuanMnXG5cbi8vIFJldHJpZXZlIGBzaWduYWxzQnlOYW1lYCwgYW4gb2JqZWN0IG1hcHBpbmcgc2lnbmFsIG5hbWUgdG8gc2lnbmFsIHByb3BlcnRpZXMuXG4vLyBXZSBtYWtlIHN1cmUgdGhlIG9iamVjdCBpcyBzb3J0ZWQgYnkgYG51bWJlcmAuXG5jb25zdCBnZXRTaWduYWxzQnlOYW1lID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzaWduYWxzID0gZ2V0U2lnbmFscygpXG4gIHJldHVybiBzaWduYWxzLnJlZHVjZShnZXRTaWduYWxCeU5hbWUsIHt9KVxufVxuXG5jb25zdCBnZXRTaWduYWxCeU5hbWUgPSBmdW5jdGlvbiAoXG4gIHNpZ25hbEJ5TmFtZU1lbW8sXG4gIHsgbmFtZSwgbnVtYmVyLCBkZXNjcmlwdGlvbiwgc3VwcG9ydGVkLCBhY3Rpb24sIGZvcmNlZCwgc3RhbmRhcmQgfSxcbikge1xuICByZXR1cm4ge1xuICAgIC4uLnNpZ25hbEJ5TmFtZU1lbW8sXG4gICAgW25hbWVdOiB7IG5hbWUsIG51bWJlciwgZGVzY3JpcHRpb24sIHN1cHBvcnRlZCwgYWN0aW9uLCBmb3JjZWQsIHN0YW5kYXJkIH0sXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25hbHNCeU5hbWUgPSBnZXRTaWduYWxzQnlOYW1lKClcblxuLy8gUmV0cmlldmUgYHNpZ25hbHNCeU51bWJlcmAsIGFuIG9iamVjdCBtYXBwaW5nIHNpZ25hbCBudW1iZXIgdG8gc2lnbmFsXG4vLyBwcm9wZXJ0aWVzLlxuLy8gV2UgbWFrZSBzdXJlIHRoZSBvYmplY3QgaXMgc29ydGVkIGJ5IGBudW1iZXJgLlxuY29uc3QgZ2V0U2lnbmFsc0J5TnVtYmVyID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzaWduYWxzID0gZ2V0U2lnbmFscygpXG4gIGNvbnN0IGxlbmd0aCA9IFNJR1JUTUFYICsgMVxuICBjb25zdCBzaWduYWxzQSA9IEFycmF5LmZyb20oeyBsZW5ndGggfSwgKHZhbHVlLCBudW1iZXIpID0+XG4gICAgZ2V0U2lnbmFsQnlOdW1iZXIobnVtYmVyLCBzaWduYWxzKSxcbiAgKVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4uc2lnbmFsc0EpXG59XG5cbmNvbnN0IGdldFNpZ25hbEJ5TnVtYmVyID0gZnVuY3Rpb24gKG51bWJlciwgc2lnbmFscykge1xuICBjb25zdCBzaWduYWwgPSBmaW5kU2lnbmFsQnlOdW1iZXIobnVtYmVyLCBzaWduYWxzKVxuXG4gIGlmIChzaWduYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB7fVxuICB9XG5cbiAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgc3VwcG9ydGVkLCBhY3Rpb24sIGZvcmNlZCwgc3RhbmRhcmQgfSA9IHNpZ25hbFxuICByZXR1cm4ge1xuICAgIFtudW1iZXJdOiB7XG4gICAgICBuYW1lLFxuICAgICAgbnVtYmVyLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzdXBwb3J0ZWQsXG4gICAgICBhY3Rpb24sXG4gICAgICBmb3JjZWQsXG4gICAgICBzdGFuZGFyZCxcbiAgICB9LFxuICB9XG59XG5cbi8vIFNldmVyYWwgc2lnbmFscyBtaWdodCBlbmQgdXAgc2hhcmluZyB0aGUgc2FtZSBudW1iZXIgYmVjYXVzZSBvZiBPUy1zcGVjaWZpY1xuLy8gbnVtYmVycywgaW4gd2hpY2ggY2FzZSB0aG9zZSBwcmV2YWlsLlxuY29uc3QgZmluZFNpZ25hbEJ5TnVtYmVyID0gZnVuY3Rpb24gKG51bWJlciwgc2lnbmFscykge1xuICBjb25zdCBzaWduYWwgPSBzaWduYWxzLmZpbmQoKHsgbmFtZSB9KSA9PiBjb25zdGFudHMuc2lnbmFsc1tuYW1lXSA9PT0gbnVtYmVyKVxuXG4gIGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzaWduYWxcbiAgfVxuXG4gIHJldHVybiBzaWduYWxzLmZpbmQoKHNpZ25hbEEpID0+IHNpZ25hbEEubnVtYmVyID09PSBudW1iZXIpXG59XG5cbmV4cG9ydCBjb25zdCBzaWduYWxzQnlOdW1iZXIgPSBnZXRTaWduYWxzQnlOdW1iZXIoKVxuIiwgIi8vIExpc3Qgb2YgcmVhbHRpbWUgc2lnbmFscyB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZW1cbmV4cG9ydCBjb25zdCBnZXRSZWFsdGltZVNpZ25hbHMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IFNJR1JUTUFYIC0gU0lHUlRNSU4gKyAxXG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoIH0sIGdldFJlYWx0aW1lU2lnbmFsKVxufVxuXG5jb25zdCBnZXRSZWFsdGltZVNpZ25hbCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBgU0lHUlQke2luZGV4ICsgMX1gLFxuICAgIG51bWJlcjogU0lHUlRNSU4gKyBpbmRleCxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQXBwbGljYXRpb24tc3BlY2lmaWMgc2lnbmFsIChyZWFsdGltZSknLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9XG59XG5cbmNvbnN0IFNJR1JUTUlOID0gMzRcbmV4cG9ydCBjb25zdCBTSUdSVE1BWCA9IDY0XG4iLCAiaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnb3MnXG5cbmltcG9ydCB7IFNJR05BTFMgfSBmcm9tICcuL2NvcmUuanMnXG5pbXBvcnQgeyBnZXRSZWFsdGltZVNpZ25hbHMgfSBmcm9tICcuL3JlYWx0aW1lLmpzJ1xuXG4vLyBSZXRyaWV2ZSBsaXN0IG9mIGtub3cgc2lnbmFscyAoaW5jbHVkaW5nIHJlYWx0aW1lKSB3aXRoIGluZm9ybWF0aW9uIGFib3V0XG4vLyB0aGVtXG5leHBvcnQgY29uc3QgZ2V0U2lnbmFscyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcmVhbHRpbWVTaWduYWxzID0gZ2V0UmVhbHRpbWVTaWduYWxzKClcbiAgY29uc3Qgc2lnbmFscyA9IFsuLi5TSUdOQUxTLCAuLi5yZWFsdGltZVNpZ25hbHNdLm1hcChub3JtYWxpemVTaWduYWwpXG4gIHJldHVybiBzaWduYWxzXG59XG5cbi8vIE5vcm1hbGl6ZSBzaWduYWw6XG4vLyAgLSBgbnVtYmVyYDogc2lnbmFsIG51bWJlcnMgYXJlIE9TLXNwZWNpZmljLiBUaGlzIGlzIHRha2VuIGludG8gYWNjb3VudCBieVxuLy8gICAgYG9zLmNvbnN0YW50cy5zaWduYWxzYC4gSG93ZXZlciB3ZSBwcm92aWRlIGEgZGVmYXVsdCBgbnVtYmVyYCBzaW5jZSBzb21lXG4vLyAgICAgc2lnbmFscyBhcmUgbm90IGRlZmluZWQgZm9yIHNvbWUgT1MuXG4vLyAgLSBgZm9yY2VkYDogc2V0IGRlZmF1bHQgdG8gYGZhbHNlYFxuLy8gIC0gYHN1cHBvcnRlZGA6IHNldCB2YWx1ZVxuY29uc3Qgbm9ybWFsaXplU2lnbmFsID0gZnVuY3Rpb24gKHtcbiAgbmFtZSxcbiAgbnVtYmVyOiBkZWZhdWx0TnVtYmVyLFxuICBkZXNjcmlwdGlvbixcbiAgYWN0aW9uLFxuICBmb3JjZWQgPSBmYWxzZSxcbiAgc3RhbmRhcmQsXG59KSB7XG4gIGNvbnN0IHtcbiAgICBzaWduYWxzOiB7IFtuYW1lXTogY29uc3RhbnRTaWduYWwgfSxcbiAgfSA9IGNvbnN0YW50c1xuICBjb25zdCBzdXBwb3J0ZWQgPSBjb25zdGFudFNpZ25hbCAhPT0gdW5kZWZpbmVkXG4gIGNvbnN0IG51bWJlciA9IHN1cHBvcnRlZCA/IGNvbnN0YW50U2lnbmFsIDogZGVmYXVsdE51bWJlclxuICByZXR1cm4geyBuYW1lLCBudW1iZXIsIGRlc2NyaXB0aW9uLCBzdXBwb3J0ZWQsIGFjdGlvbiwgZm9yY2VkLCBzdGFuZGFyZCB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgbWF4LWxpbmVzICovXG4vLyBMaXN0IG9mIGtub3duIHByb2Nlc3Mgc2lnbmFscyB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZW1cbmV4cG9ydCBjb25zdCBTSUdOQUxTID0gW1xuICB7XG4gICAgbmFtZTogJ1NJR0hVUCcsXG4gICAgbnVtYmVyOiAxLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdUZXJtaW5hbCBjbG9zZWQnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0lOVCcsXG4gICAgbnVtYmVyOiAyLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdVc2VyIGludGVycnVwdGlvbiB3aXRoIENUUkwtQycsXG4gICAgc3RhbmRhcmQ6ICdhbnNpJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdRVUlUJyxcbiAgICBudW1iZXI6IDMsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdVc2VyIGludGVycnVwdGlvbiB3aXRoIENUUkwtXFxcXCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHSUxMJyxcbiAgICBudW1iZXI6IDQsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdJbnZhbGlkIG1hY2hpbmUgaW5zdHJ1Y3Rpb24nLFxuICAgIHN0YW5kYXJkOiAnYW5zaScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVFJBUCcsXG4gICAgbnVtYmVyOiA1LFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVidWdnZXIgYnJlYWtwb2ludCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQUJSVCcsXG4gICAgbnVtYmVyOiA2LFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQWJvcnRlZCcsXG4gICAgc3RhbmRhcmQ6ICdhbnNpJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdJT1QnLFxuICAgIG51bWJlcjogNixcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Fib3J0ZWQnLFxuICAgIHN0YW5kYXJkOiAnYnNkJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdCVVMnLFxuICAgIG51bWJlcjogNyxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdCdXMgZXJyb3IgZHVlIHRvIG1pc2FsaWduZWQsIG5vbi1leGlzdGluZyBhZGRyZXNzIG9yIHBhZ2luZyBlcnJvcicsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0VNVCcsXG4gICAgbnVtYmVyOiA3LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdDb21tYW5kIHNob3VsZCBiZSBlbXVsYXRlZCBidXQgaXMgbm90IGltcGxlbWVudGVkJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdGUEUnLFxuICAgIG51bWJlcjogOCxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Zsb2F0aW5nIHBvaW50IGFyaXRobWV0aWMgZXJyb3InLFxuICAgIHN0YW5kYXJkOiAnYW5zaScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHS0lMTCcsXG4gICAgbnVtYmVyOiA5LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdGb3JjZWQgdGVybWluYXRpb24nLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICAgIGZvcmNlZDogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdVU1IxJyxcbiAgICBudW1iZXI6IDEwLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdBcHBsaWNhdGlvbi1zcGVjaWZpYyBzaWduYWwnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1NFR1YnLFxuICAgIG51bWJlcjogMTEsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdTZWdtZW50YXRpb24gZmF1bHQnLFxuICAgIHN0YW5kYXJkOiAnYW5zaScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVVNSMicsXG4gICAgbnVtYmVyOiAxMixcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQXBwbGljYXRpb24tc3BlY2lmaWMgc2lnbmFsJyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdQSVBFJyxcbiAgICBudW1iZXI6IDEzLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdCcm9rZW4gcGlwZSBvciBzb2NrZXQnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0FMUk0nLFxuICAgIG51bWJlcjogMTQsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RpbWVvdXQgb3IgdGltZXInLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1RFUk0nLFxuICAgIG51bWJlcjogMTUsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1Rlcm1pbmF0aW9uJyxcbiAgICBzdGFuZGFyZDogJ2Fuc2knLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1NUS0ZMVCcsXG4gICAgbnVtYmVyOiAxNixcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnU3RhY2sgaXMgZW1wdHkgb3Igb3ZlcmZsb3dlZCcsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQ0hMRCcsXG4gICAgbnVtYmVyOiAxNyxcbiAgICBhY3Rpb246ICdpZ25vcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2hpbGQgcHJvY2VzcyB0ZXJtaW5hdGVkLCBwYXVzZWQgb3IgdW5wYXVzZWQnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0NMRCcsXG4gICAgbnVtYmVyOiAxNyxcbiAgICBhY3Rpb246ICdpZ25vcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2hpbGQgcHJvY2VzcyB0ZXJtaW5hdGVkLCBwYXVzZWQgb3IgdW5wYXVzZWQnLFxuICAgIHN0YW5kYXJkOiAnb3RoZXInLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0NPTlQnLFxuICAgIG51bWJlcjogMTgsXG4gICAgYWN0aW9uOiAndW5wYXVzZScsXG4gICAgZGVzY3JpcHRpb246ICdVbnBhdXNlZCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gICAgZm9yY2VkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1NUT1AnLFxuICAgIG51bWJlcjogMTksXG4gICAgYWN0aW9uOiAncGF1c2UnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF1c2VkJyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgICBmb3JjZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVFNUUCcsXG4gICAgbnVtYmVyOiAyMCxcbiAgICBhY3Rpb246ICdwYXVzZScsXG4gICAgZGVzY3JpcHRpb246ICdQYXVzZWQgdXNpbmcgQ1RSTC1aIG9yIFwic3VzcGVuZFwiJyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdUVElOJyxcbiAgICBudW1iZXI6IDIxLFxuICAgIGFjdGlvbjogJ3BhdXNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0JhY2tncm91bmQgcHJvY2VzcyBjYW5ub3QgcmVhZCB0ZXJtaW5hbCBpbnB1dCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQlJFQUsnLFxuICAgIG51bWJlcjogMjEsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1VzZXIgaW50ZXJydXB0aW9uIHdpdGggQ1RSTC1CUkVBSycsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVFRPVScsXG4gICAgbnVtYmVyOiAyMixcbiAgICBhY3Rpb246ICdwYXVzZScsXG4gICAgZGVzY3JpcHRpb246ICdCYWNrZ3JvdW5kIHByb2Nlc3MgY2Fubm90IHdyaXRlIHRvIHRlcm1pbmFsIG91dHB1dCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVVJHJyxcbiAgICBudW1iZXI6IDIzLFxuICAgIGFjdGlvbjogJ2lnbm9yZScsXG4gICAgZGVzY3JpcHRpb246ICdTb2NrZXQgcmVjZWl2ZWQgb3V0LW9mLWJhbmQgZGF0YScsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1hDUFUnLFxuICAgIG51bWJlcjogMjQsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdQcm9jZXNzIHRpbWVkIG91dCcsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1hGU1onLFxuICAgIG51bWJlcjogMjUsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdGaWxlIHRvbyBiaWcnLFxuICAgIHN0YW5kYXJkOiAnYnNkJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdWVEFMUk0nLFxuICAgIG51bWJlcjogMjYsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RpbWVvdXQgb3IgdGltZXInLFxuICAgIHN0YW5kYXJkOiAnYnNkJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdQUk9GJyxcbiAgICBudW1iZXI6IDI3LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdUaW1lb3V0IG9yIHRpbWVyJyxcbiAgICBzdGFuZGFyZDogJ2JzZCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHV0lOQ0gnLFxuICAgIG51bWJlcjogMjgsXG4gICAgYWN0aW9uOiAnaWdub3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1Rlcm1pbmFsIHdpbmRvdyBzaXplIGNoYW5nZWQnLFxuICAgIHN0YW5kYXJkOiAnYnNkJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdJTycsXG4gICAgbnVtYmVyOiAyOSxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnSS9PIGlzIGF2YWlsYWJsZScsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHUE9MTCcsXG4gICAgbnVtYmVyOiAyOSxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnV2F0Y2hlZCBldmVudCcsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHSU5GTycsXG4gICAgbnVtYmVyOiAyOSxcbiAgICBhY3Rpb246ICdpZ25vcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnUmVxdWVzdCBmb3IgcHJvY2VzcyBpbmZvcm1hdGlvbicsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHUFdSJyxcbiAgICBudW1iZXI6IDMwLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdEZXZpY2UgcnVubmluZyBvdXQgb2YgcG93ZXInLFxuICAgIHN0YW5kYXJkOiAnc3lzdGVtdicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHU1lTJyxcbiAgICBudW1iZXI6IDMxLFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnSW52YWxpZCBzeXN0ZW0gY2FsbCcsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVU5VU0VEJyxcbiAgICBudW1iZXI6IDMxLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdJbnZhbGlkIHN5c3RlbSBjYWxsJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbl1cbi8qIGVzbGludC1lbmFibGUgbWF4LWxpbmVzICovXG4iLCAiY29uc3QgYWxpYXNlcyA9IFsnc3RkaW4nLCAnc3Rkb3V0JywgJ3N0ZGVyciddO1xuXG5jb25zdCBoYXNBbGlhcyA9IG9wdGlvbnMgPT4gYWxpYXNlcy5zb21lKGFsaWFzID0+IG9wdGlvbnNbYWxpYXNdICE9PSB1bmRlZmluZWQpO1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3RkaW8gPSBvcHRpb25zID0+IHtcblx0aWYgKCFvcHRpb25zKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3Qge3N0ZGlvfSA9IG9wdGlvbnM7XG5cblx0aWYgKHN0ZGlvID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYWxpYXNlcy5tYXAoYWxpYXMgPT4gb3B0aW9uc1thbGlhc10pO1xuXHR9XG5cblx0aWYgKGhhc0FsaWFzKG9wdGlvbnMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBJdCdzIG5vdCBwb3NzaWJsZSB0byBwcm92aWRlIFxcYHN0ZGlvXFxgIGluIGNvbWJpbmF0aW9uIHdpdGggb25lIG9mICR7YWxpYXNlcy5tYXAoYWxpYXMgPT4gYFxcYCR7YWxpYXN9XFxgYCkuam9pbignLCAnKX1gKTtcblx0fVxuXG5cdGlmICh0eXBlb2Ygc3RkaW8gPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHN0ZGlvO1xuXHR9XG5cblx0aWYgKCFBcnJheS5pc0FycmF5KHN0ZGlvKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYHN0ZGlvXFxgIHRvIGJlIG9mIHR5cGUgXFxgc3RyaW5nXFxgIG9yIFxcYEFycmF5XFxgLCBnb3QgXFxgJHt0eXBlb2Ygc3RkaW99XFxgYCk7XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSBNYXRoLm1heChzdGRpby5sZW5ndGgsIGFsaWFzZXMubGVuZ3RoKTtcblx0cmV0dXJuIEFycmF5LmZyb20oe2xlbmd0aH0sICh2YWx1ZSwgaW5kZXgpID0+IHN0ZGlvW2luZGV4XSk7XG59O1xuXG4vLyBgaXBjYCBpcyBwdXNoZWQgdW5sZXNzIGl0IGlzIGFscmVhZHkgcHJlc2VudFxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVN0ZGlvTm9kZSA9IG9wdGlvbnMgPT4ge1xuXHRjb25zdCBzdGRpbyA9IG5vcm1hbGl6ZVN0ZGlvKG9wdGlvbnMpO1xuXG5cdGlmIChzdGRpbyA9PT0gJ2lwYycpIHtcblx0XHRyZXR1cm4gJ2lwYyc7XG5cdH1cblxuXHRpZiAoc3RkaW8gPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3RkaW8gPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIFtzdGRpbywgc3RkaW8sIHN0ZGlvLCAnaXBjJ107XG5cdH1cblxuXHRpZiAoc3RkaW8uaW5jbHVkZXMoJ2lwYycpKSB7XG5cdFx0cmV0dXJuIHN0ZGlvO1xuXHR9XG5cblx0cmV0dXJuIFsuLi5zdGRpbywgJ2lwYyddO1xufTtcbiIsICJpbXBvcnQgb3MgZnJvbSAnbm9kZTpvcyc7XG5pbXBvcnQgb25FeGl0IGZyb20gJ3NpZ25hbC1leGl0JztcblxuY29uc3QgREVGQVVMVF9GT1JDRV9LSUxMX1RJTUVPVVQgPSAxMDAwICogNTtcblxuLy8gTW9ua2V5LXBhdGNoZXMgYGNoaWxkUHJvY2Vzcy5raWxsKClgIHRvIGFkZCBgZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0YCBiZWhhdmlvclxuZXhwb3J0IGNvbnN0IHNwYXduZWRLaWxsID0gKGtpbGwsIHNpZ25hbCA9ICdTSUdURVJNJywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGNvbnN0IGtpbGxSZXN1bHQgPSBraWxsKHNpZ25hbCk7XG5cdHNldEtpbGxUaW1lb3V0KGtpbGwsIHNpZ25hbCwgb3B0aW9ucywga2lsbFJlc3VsdCk7XG5cdHJldHVybiBraWxsUmVzdWx0O1xufTtcblxuY29uc3Qgc2V0S2lsbFRpbWVvdXQgPSAoa2lsbCwgc2lnbmFsLCBvcHRpb25zLCBraWxsUmVzdWx0KSA9PiB7XG5cdGlmICghc2hvdWxkRm9yY2VLaWxsKHNpZ25hbCwgb3B0aW9ucywga2lsbFJlc3VsdCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCB0aW1lb3V0ID0gZ2V0Rm9yY2VLaWxsQWZ0ZXJUaW1lb3V0KG9wdGlvbnMpO1xuXHRjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0a2lsbCgnU0lHS0lMTCcpO1xuXHR9LCB0aW1lb3V0KTtcblxuXHQvLyBHdWFyZGVkIGJlY2F1c2UgdGhlcmUncyBubyBgLnVucmVmKClgIHdoZW4gYGV4ZWNhYCBpcyB1c2VkIGluIHRoZSByZW5kZXJlclxuXHQvLyBwcm9jZXNzIGluIEVsZWN0cm9uLiBUaGlzIGNhbm5vdCBiZSB0ZXN0ZWQgc2luY2Ugd2UgZG9uJ3QgcnVuIHRlc3RzIGluXG5cdC8vIEVsZWN0cm9uLlxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZVxuXHRpZiAodC51bnJlZikge1xuXHRcdHQudW5yZWYoKTtcblx0fVxufTtcblxuY29uc3Qgc2hvdWxkRm9yY2VLaWxsID0gKHNpZ25hbCwge2ZvcmNlS2lsbEFmdGVyVGltZW91dH0sIGtpbGxSZXN1bHQpID0+IGlzU2lndGVybShzaWduYWwpICYmIGZvcmNlS2lsbEFmdGVyVGltZW91dCAhPT0gZmFsc2UgJiYga2lsbFJlc3VsdDtcblxuY29uc3QgaXNTaWd0ZXJtID0gc2lnbmFsID0+IHNpZ25hbCA9PT0gb3MuY29uc3RhbnRzLnNpZ25hbHMuU0lHVEVSTVxuXHRcdHx8ICh0eXBlb2Ygc2lnbmFsID09PSAnc3RyaW5nJyAmJiBzaWduYWwudG9VcHBlckNhc2UoKSA9PT0gJ1NJR1RFUk0nKTtcblxuY29uc3QgZ2V0Rm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID0gKHtmb3JjZUtpbGxBZnRlclRpbWVvdXQgPSB0cnVlfSkgPT4ge1xuXHRpZiAoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID09PSB0cnVlKSB7XG5cdFx0cmV0dXJuIERFRkFVTFRfRk9SQ0VfS0lMTF9USU1FT1VUO1xuXHR9XG5cblx0aWYgKCFOdW1iZXIuaXNGaW5pdGUoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0KSB8fCBmb3JjZUtpbGxBZnRlclRpbWVvdXQgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgdGhlIFxcYGZvcmNlS2lsbEFmdGVyVGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7Zm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fVxcYCAoJHt0eXBlb2YgZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fSlgKTtcblx0fVxuXG5cdHJldHVybiBmb3JjZUtpbGxBZnRlclRpbWVvdXQ7XG59O1xuXG4vLyBgY2hpbGRQcm9jZXNzLmNhbmNlbCgpYFxuZXhwb3J0IGNvbnN0IHNwYXduZWRDYW5jZWwgPSAoc3Bhd25lZCwgY29udGV4dCkgPT4ge1xuXHRjb25zdCBraWxsUmVzdWx0ID0gc3Bhd25lZC5raWxsKCk7XG5cblx0aWYgKGtpbGxSZXN1bHQpIHtcblx0XHRjb250ZXh0LmlzQ2FuY2VsZWQgPSB0cnVlO1xuXHR9XG59O1xuXG5jb25zdCB0aW1lb3V0S2lsbCA9IChzcGF3bmVkLCBzaWduYWwsIHJlamVjdCkgPT4ge1xuXHRzcGF3bmVkLmtpbGwoc2lnbmFsKTtcblx0cmVqZWN0KE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdUaW1lZCBvdXQnKSwge3RpbWVkT3V0OiB0cnVlLCBzaWduYWx9KSk7XG59O1xuXG4vLyBgdGltZW91dGAgb3B0aW9uIGhhbmRsaW5nXG5leHBvcnQgY29uc3Qgc2V0dXBUaW1lb3V0ID0gKHNwYXduZWQsIHt0aW1lb3V0LCBraWxsU2lnbmFsID0gJ1NJR1RFUk0nfSwgc3Bhd25lZFByb21pc2UpID0+IHtcblx0aWYgKHRpbWVvdXQgPT09IDAgfHwgdGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHNwYXduZWRQcm9taXNlO1xuXHR9XG5cblx0bGV0IHRpbWVvdXRJZDtcblx0Y29uc3QgdGltZW91dFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aW1lb3V0S2lsbChzcGF3bmVkLCBraWxsU2lnbmFsLCByZWplY3QpO1xuXHRcdH0sIHRpbWVvdXQpO1xuXHR9KTtcblxuXHRjb25zdCBzYWZlU3Bhd25lZFByb21pc2UgPSBzcGF3bmVkUHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dElkKTtcblx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UucmFjZShbdGltZW91dFByb21pc2UsIHNhZmVTcGF3bmVkUHJvbWlzZV0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVGltZW91dCA9ICh7dGltZW91dH0pID0+IHtcblx0aWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCAmJiAoIU51bWJlci5pc0Zpbml0ZSh0aW1lb3V0KSB8fCB0aW1lb3V0IDwgMCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXFxgdGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7dGltZW91dH1cXGAgKCR7dHlwZW9mIHRpbWVvdXR9KWApO1xuXHR9XG59O1xuXG4vLyBgY2xlYW51cGAgb3B0aW9uIGhhbmRsaW5nXG5leHBvcnQgY29uc3Qgc2V0RXhpdEhhbmRsZXIgPSBhc3luYyAoc3Bhd25lZCwge2NsZWFudXAsIGRldGFjaGVkfSwgdGltZWRQcm9taXNlKSA9PiB7XG5cdGlmICghY2xlYW51cCB8fCBkZXRhY2hlZCkge1xuXHRcdHJldHVybiB0aW1lZFByb21pc2U7XG5cdH1cblxuXHRjb25zdCByZW1vdmVFeGl0SGFuZGxlciA9IG9uRXhpdCgoKSA9PiB7XG5cdFx0c3Bhd25lZC5raWxsKCk7XG5cdH0pO1xuXG5cdHJldHVybiB0aW1lZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0cmVtb3ZlRXhpdEhhbmRsZXIoKTtcblx0fSk7XG59O1xuIiwgImltcG9ydCB7aXNTdHJlYW19IGZyb20gJ2lzLXN0cmVhbSc7XG5pbXBvcnQgZ2V0U3RyZWFtIGZyb20gJ2dldC1zdHJlYW0nO1xuaW1wb3J0IG1lcmdlU3RyZWFtIGZyb20gJ21lcmdlLXN0cmVhbSc7XG5cbi8vIGBpbnB1dGAgb3B0aW9uXG5leHBvcnQgY29uc3QgaGFuZGxlSW5wdXQgPSAoc3Bhd25lZCwgaW5wdXQpID0+IHtcblx0Ly8gQ2hlY2tpbmcgZm9yIHN0ZGluIGlzIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvMjY4NTJcblx0Ly8gQHRvZG8gcmVtb3ZlIGB8fCBzcGF3bmVkLnN0ZGluID09PSB1bmRlZmluZWRgIG9uY2Ugd2UgZHJvcCBzdXBwb3J0IGZvciBOb2RlLmpzIDw9MTIuMi4wXG5cdGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkIHx8IHNwYXduZWQuc3RkaW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChpc1N0cmVhbShpbnB1dCkpIHtcblx0XHRpbnB1dC5waXBlKHNwYXduZWQuc3RkaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHNwYXduZWQuc3RkaW4uZW5kKGlucHV0KTtcblx0fVxufTtcblxuLy8gYGFsbGAgaW50ZXJsZWF2ZXMgYHN0ZG91dGAgYW5kIGBzdGRlcnJgXG5leHBvcnQgY29uc3QgbWFrZUFsbFN0cmVhbSA9IChzcGF3bmVkLCB7YWxsfSkgPT4ge1xuXHRpZiAoIWFsbCB8fCAoIXNwYXduZWQuc3Rkb3V0ICYmICFzcGF3bmVkLnN0ZGVycikpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBtaXhlZCA9IG1lcmdlU3RyZWFtKCk7XG5cblx0aWYgKHNwYXduZWQuc3Rkb3V0KSB7XG5cdFx0bWl4ZWQuYWRkKHNwYXduZWQuc3Rkb3V0KTtcblx0fVxuXG5cdGlmIChzcGF3bmVkLnN0ZGVycikge1xuXHRcdG1peGVkLmFkZChzcGF3bmVkLnN0ZGVycik7XG5cdH1cblxuXHRyZXR1cm4gbWl4ZWQ7XG59O1xuXG4vLyBPbiBmYWlsdXJlLCBgcmVzdWx0LnN0ZG91dHxzdGRlcnJ8YWxsYCBzaG91bGQgY29udGFpbiB0aGUgY3VycmVudGx5IGJ1ZmZlcmVkIHN0cmVhbVxuY29uc3QgZ2V0QnVmZmVyZWREYXRhID0gYXN5bmMgKHN0cmVhbSwgc3RyZWFtUHJvbWlzZSkgPT4ge1xuXHRpZiAoIXN0cmVhbSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHN0cmVhbS5kZXN0cm95KCk7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gYXdhaXQgc3RyZWFtUHJvbWlzZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyb3IuYnVmZmVyZWREYXRhO1xuXHR9XG59O1xuXG5jb25zdCBnZXRTdHJlYW1Qcm9taXNlID0gKHN0cmVhbSwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcn0pID0+IHtcblx0aWYgKCFzdHJlYW0gfHwgIWJ1ZmZlcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChlbmNvZGluZykge1xuXHRcdHJldHVybiBnZXRTdHJlYW0oc3RyZWFtLCB7ZW5jb2RpbmcsIG1heEJ1ZmZlcn0pO1xuXHR9XG5cblx0cmV0dXJuIGdldFN0cmVhbS5idWZmZXIoc3RyZWFtLCB7bWF4QnVmZmVyfSk7XG59O1xuXG4vLyBSZXRyaWV2ZSByZXN1bHQgb2YgY2hpbGQgcHJvY2VzczogZXhpdCBjb2RlLCBzaWduYWwsIGVycm9yLCBzdHJlYW1zIChzdGRvdXQvc3RkZXJyL2FsbClcbmV4cG9ydCBjb25zdCBnZXRTcGF3bmVkUmVzdWx0ID0gYXN5bmMgKHtzdGRvdXQsIHN0ZGVyciwgYWxsfSwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcn0sIHByb2Nlc3NEb25lKSA9PiB7XG5cdGNvbnN0IHN0ZG91dFByb21pc2UgPSBnZXRTdHJlYW1Qcm9taXNlKHN0ZG91dCwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcn0pO1xuXHRjb25zdCBzdGRlcnJQcm9taXNlID0gZ2V0U3RyZWFtUHJvbWlzZShzdGRlcnIsIHtlbmNvZGluZywgYnVmZmVyLCBtYXhCdWZmZXJ9KTtcblx0Y29uc3QgYWxsUHJvbWlzZSA9IGdldFN0cmVhbVByb21pc2UoYWxsLCB7ZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyOiBtYXhCdWZmZXIgKiAyfSk7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2Nlc3NEb25lLCBzdGRvdXRQcm9taXNlLCBzdGRlcnJQcm9taXNlLCBhbGxQcm9taXNlXSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRcdHtlcnJvciwgc2lnbmFsOiBlcnJvci5zaWduYWwsIHRpbWVkT3V0OiBlcnJvci50aW1lZE91dH0sXG5cdFx0XHRnZXRCdWZmZXJlZERhdGEoc3Rkb3V0LCBzdGRvdXRQcm9taXNlKSxcblx0XHRcdGdldEJ1ZmZlcmVkRGF0YShzdGRlcnIsIHN0ZGVyclByb21pc2UpLFxuXHRcdFx0Z2V0QnVmZmVyZWREYXRhKGFsbCwgYWxsUHJvbWlzZSksXG5cdFx0XSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlucHV0U3luYyA9ICh7aW5wdXR9KSA9PiB7XG5cdGlmIChpc1N0cmVhbShpbnB1dCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYGlucHV0YCBvcHRpb24gY2Fubm90IGJlIGEgc3RyZWFtIGluIHN5bmMgbW9kZScpO1xuXHR9XG59O1xuIiwgImV4cG9ydCBmdW5jdGlvbiBpc1N0cmVhbShzdHJlYW0pIHtcblx0cmV0dXJuIHN0cmVhbSAhPT0gbnVsbFxuXHRcdCYmIHR5cGVvZiBzdHJlYW0gPT09ICdvYmplY3QnXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5waXBlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXcml0YWJsZVN0cmVhbShzdHJlYW0pIHtcblx0cmV0dXJuIGlzU3RyZWFtKHN0cmVhbSlcblx0XHQmJiBzdHJlYW0ud3JpdGFibGUgIT09IGZhbHNlXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5fd3JpdGUgPT09ICdmdW5jdGlvbidcblx0XHQmJiB0eXBlb2Ygc3RyZWFtLl93cml0YWJsZVN0YXRlID09PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW0oc3RyZWFtKSB7XG5cdHJldHVybiBpc1N0cmVhbShzdHJlYW0pXG5cdFx0JiYgc3RyZWFtLnJlYWRhYmxlICE9PSBmYWxzZVxuXHRcdCYmIHR5cGVvZiBzdHJlYW0uX3JlYWQgPT09ICdmdW5jdGlvbidcblx0XHQmJiB0eXBlb2Ygc3RyZWFtLl9yZWFkYWJsZVN0YXRlID09PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRHVwbGV4U3RyZWFtKHN0cmVhbSkge1xuXHRyZXR1cm4gaXNXcml0YWJsZVN0cmVhbShzdHJlYW0pXG5cdFx0JiYgaXNSZWFkYWJsZVN0cmVhbShzdHJlYW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUcmFuc2Zvcm1TdHJlYW0oc3RyZWFtKSB7XG5cdHJldHVybiBpc0R1cGxleFN0cmVhbShzdHJlYW0pXG5cdFx0JiYgdHlwZW9mIHN0cmVhbS5fdHJhbnNmb3JtID09PSAnZnVuY3Rpb24nO1xufVxuIiwgImNvbnN0IG5hdGl2ZVByb21pc2VQcm90b3R5cGUgPSAoYXN5bmMgKCkgPT4ge30pKCkuY29uc3RydWN0b3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSBbJ3RoZW4nLCAnY2F0Y2gnLCAnZmluYWxseSddLm1hcChwcm9wZXJ0eSA9PiBbXG5cdHByb3BlcnR5LFxuXHRSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuYXRpdmVQcm9taXNlUHJvdG90eXBlLCBwcm9wZXJ0eSksXG5dKTtcblxuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBhIG1peGluIG9mIGBjaGlsZFByb2Nlc3NgIGFuZCBgUHJvbWlzZWBcbmV4cG9ydCBjb25zdCBtZXJnZVByb21pc2UgPSAoc3Bhd25lZCwgcHJvbWlzZSkgPT4ge1xuXHRmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgZGVzY3JpcHRvcl0gb2YgZGVzY3JpcHRvcnMpIHtcblx0XHQvLyBTdGFydGluZyB0aGUgbWFpbiBgcHJvbWlzZWAgaXMgZGVmZXJyZWQgdG8gYXZvaWQgY29uc3VtaW5nIHN0cmVhbXNcblx0XHRjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcm9taXNlID09PSAnZnVuY3Rpb24nXG5cdFx0XHQ/ICguLi5hcmdzKSA9PiBSZWZsZWN0LmFwcGx5KGRlc2NyaXB0b3IudmFsdWUsIHByb21pc2UoKSwgYXJncylcblx0XHRcdDogZGVzY3JpcHRvci52YWx1ZS5iaW5kKHByb21pc2UpO1xuXG5cdFx0UmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShzcGF3bmVkLCBwcm9wZXJ0eSwgey4uLmRlc2NyaXB0b3IsIHZhbHVlfSk7XG5cdH1cblxuXHRyZXR1cm4gc3Bhd25lZDtcbn07XG5cbi8vIFVzZSBwcm9taXNlcyBpbnN0ZWFkIG9mIGBjaGlsZF9wcm9jZXNzYCBldmVudHNcbmV4cG9ydCBjb25zdCBnZXRTcGF3bmVkUHJvbWlzZSA9IHNwYXduZWQgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRzcGF3bmVkLm9uKCdleGl0JywgKGV4aXRDb2RlLCBzaWduYWwpID0+IHtcblx0XHRyZXNvbHZlKHtleGl0Q29kZSwgc2lnbmFsfSk7XG5cdH0pO1xuXG5cdHNwYXduZWQub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuXHRcdHJlamVjdChlcnJvcik7XG5cdH0pO1xuXG5cdGlmIChzcGF3bmVkLnN0ZGluKSB7XG5cdFx0c3Bhd25lZC5zdGRpbi5vbignZXJyb3InLCBlcnJvciA9PiB7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59KTtcbiIsICJjb25zdCBub3JtYWxpemVBcmdzID0gKGZpbGUsIGFyZ3MgPSBbXSkgPT4ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXJncykpIHtcblx0XHRyZXR1cm4gW2ZpbGVdO1xuXHR9XG5cblx0cmV0dXJuIFtmaWxlLCAuLi5hcmdzXTtcbn07XG5cbmNvbnN0IE5PX0VTQ0FQRV9SRUdFWFAgPSAvXltcXHcuLV0rJC87XG5jb25zdCBET1VCTEVfUVVPVEVTX1JFR0VYUCA9IC9cIi9nO1xuXG5jb25zdCBlc2NhcGVBcmcgPSBhcmcgPT4ge1xuXHRpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycgfHwgTk9fRVNDQVBFX1JFR0VYUC50ZXN0KGFyZykpIHtcblx0XHRyZXR1cm4gYXJnO1xuXHR9XG5cblx0cmV0dXJuIGBcIiR7YXJnLnJlcGxhY2UoRE9VQkxFX1FVT1RFU19SRUdFWFAsICdcXFxcXCInKX1cImA7XG59O1xuXG5leHBvcnQgY29uc3Qgam9pbkNvbW1hbmQgPSAoZmlsZSwgYXJncykgPT4gbm9ybWFsaXplQXJncyhmaWxlLCBhcmdzKS5qb2luKCcgJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRFc2NhcGVkQ29tbWFuZCA9IChmaWxlLCBhcmdzKSA9PiBub3JtYWxpemVBcmdzKGZpbGUsIGFyZ3MpLm1hcChhcmcgPT4gZXNjYXBlQXJnKGFyZykpLmpvaW4oJyAnKTtcblxuY29uc3QgU1BBQ0VTX1JFR0VYUCA9IC8gKy9nO1xuXG4vLyBIYW5kbGUgYGV4ZWNhQ29tbWFuZCgpYFxuZXhwb3J0IGNvbnN0IHBhcnNlQ29tbWFuZCA9IGNvbW1hbmQgPT4ge1xuXHRjb25zdCB0b2tlbnMgPSBbXTtcblx0Zm9yIChjb25zdCB0b2tlbiBvZiBjb21tYW5kLnRyaW0oKS5zcGxpdChTUEFDRVNfUkVHRVhQKSkge1xuXHRcdC8vIEFsbG93IHNwYWNlcyB0byBiZSBlc2NhcGVkIGJ5IGEgYmFja3NsYXNoIGlmIG5vdCBtZWFudCBhcyBhIGRlbGltaXRlclxuXHRcdGNvbnN0IHByZXZpb3VzVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXHRcdGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4uZW5kc1dpdGgoJ1xcXFwnKSkge1xuXHRcdFx0Ly8gTWVyZ2UgcHJldmlvdXMgdG9rZW4gd2l0aCBjdXJyZW50IG9uZVxuXHRcdFx0dG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSA9IGAke3ByZXZpb3VzVG9rZW4uc2xpY2UoMCwgLTEpfSAke3Rva2VufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRva2Vucy5wdXNoKHRva2VuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG9rZW5zO1xufTtcbiIsICJpbXBvcnQgeyBydW5TY3JpcHQgfSBmcm9tIFwiLi4vdXRpbHMubWpzXCJcblxuLyoqXG4gKiBAcGFyYW0ge1Rhc2tRdWV1ZX0gdGFza1F1ZXVlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwWWFybkJlcnJ5KHRhc2tRdWV1ZSkge1xuICAgIHRhc2tRdWV1ZS5wdXNoKHtcbiAgICAgICAgbGFiZWw6IFwiRG93bmxvYWQgWWFyblwiLFxuICAgICAgICBhc3luYyBhY3Rpb24oc3Rkb3V0KSB7XG4gICAgICAgICAgICBhd2FpdCBydW5TY3JpcHQoXCJ5YXJuXCIsIFtcInNldFwiLCBcInZlcnNpb25cIiwgXCJiZXJyeVwiXSwgc3Rkb3V0LCB0cnVlKVxuICAgICAgICB9LFxuICAgIH0pXG5cbiAgICB0YXNrUXVldWUucHVzaCh7XG4gICAgICAgIGxhYmVsOiBcIkNvbmZpZ3VyZSBZYXJuXCIsXG4gICAgICAgIGFzeW5jIGFjdGlvbihzdGRvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNldE9wdGlvbiA9IGFzeW5jIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJ1blNjcmlwdChcInlhcm5cIiwgW1wiY29uZmlnXCIsIFwic2V0XCIsIG5hbWUsIHZhbHVlXSwgc3Rkb3V0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCBzZXRPcHRpb24oXCJub2RlTGlua2VyXCIsIFwibm9kZS1tb2R1bGVzXCIpXG4gICAgICAgICAgICBhd2FpdCBzZXRPcHRpb24oXCJpbml0U2NvcGVcIiwgXCJAcmRpbFwiKVxuICAgICAgICAgICAgYXdhaXQgc2V0T3B0aW9uKFwiZW5hYmxlSW5saW5lSHVua3NcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBhd2FpdCBzZXRPcHRpb24oXCJlbmFibGVHbG9iYWxDYWNoZVwiLCBcImZhbHNlXCIpXG4gICAgICAgIH0sXG4gICAgfSlcblxuICAgIHRhc2tRdWV1ZS5wdXNoKHtcbiAgICAgICAgbGFiZWw6IFwiSW5zdGFsbCBwYWNrYWdlcyB3aXRoIFlhcm5cIixcbiAgICAgICAgYXN5bmMgYWN0aW9uKHN0ZG91dCkge1xuICAgICAgICAgICAgYXdhaXQgcnVuU2NyaXB0KFwieWFyblwiLCBbXSwgc3Rkb3V0LCB0cnVlKVxuICAgICAgICB9LFxuICAgIH0pXG59XG4iLCAiaW1wb3J0IGVkaXRvcmNvbmZpZyBmcm9tIFwiLi4vLi4vLmVkaXRvcmNvbmZpZ1wiXG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIlxuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCJcblxuLyoqXG4gKiBAcGFyYW0ge1Rhc2tRdWV1ZX0gdGFza1F1ZXVlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwRWRpdG9yQ29uZmlnKHRhc2tRdWV1ZSkge1xuICAgIHRhc2tRdWV1ZS5wdXNoKHtcbiAgICAgICAgbGFiZWw6IFwiV3JpdGUgLmVkaXRvcmNvbmZpZyBmaWxlXCIsXG4gICAgICAgIGFzeW5jIGFjdGlvbigpIHtcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRmlsZShqb2luKHByb2Nlc3MuY3dkKCksIFwiLmVkaXRvcmNvbmZpZ1wiKSwgZWRpdG9yY29uZmlnKVxuICAgICAgICB9LFxuICAgIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBS0EsYUFBVyxVQUFVLFdBQVcsV0FBVyxHQUFjLFlBQVksR0FBRztBQUFBOzs7QUNMeEU7QUFBQTtBQUFBO0FBRUEsU0FBTyxlQUFlLEdBQVMsY0FBYyxFQUFFLE9BQU8sR0FBSyxDQUFDO0FBRTVELE1BQU0sS0FBZSxHQUNmLEtBQWUsR0FDZixLQUFlLEdBQ2YsS0FBaUIsS0FDakIsS0FBZSxNQUNmLEtBQXFCLElBQ3JCLEtBQWEsK0JBQ2IsS0FBZSx1Q0FDZixLQUFjLG1CQUNkLEtBQWdCLHVCQUNoQixLQUFRLFFBQVEsSUFBSSxjQUFjO0FBRXhDLElBQVEsY0FBYztBQUN0QixJQUFRLGdCQUFnQjtBQUN4QixJQUFRLFFBQVE7QUFDaEIsSUFBUSxlQUFlO0FBQ3ZCLElBQVEscUJBQXFCO0FBQzdCLElBQVEsYUFBYTtBQUNyQixJQUFRLGVBQWU7QUFDdkIsSUFBUSxlQUFlO0FBQ3ZCLElBQVEsZUFBZTtBQUN2QixJQUFRLGVBQWU7QUFDdkIsSUFBUSxpQkFBaUI7QUFBQTs7O0FDMUJ6QjtBQUFBO0FBQUE7QUFFQSxTQUFPLGVBQWUsSUFBUyxjQUFjLEVBQUUsT0FBTyxHQUFLLENBQUM7QUFFNUQsTUFBSSxLQUFZLE1BT1YsS0FBTixjQUF5QixNQUFNO0FBQUEsSUFDM0IsWUFBWSxHQUFTO0FBQ2pCLFlBQU0sQ0FBTyxHQUNiLEtBQUssWUFBWSxFQUFFLE1BQU0sUUFBUSxHQUNqQyxLQUFLLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0osR0FDTSxLQUFOLGNBQWlDLE1BQU07QUFBQSxJQUNuQyxZQUFZLEdBQU8sR0FBWTtBQU0zQixVQUxBLE1BQU0sR0FDTixLQUFLLFFBQVEsR0FDYixLQUFLLGFBQWEsR0FDbEIsS0FBSyxZ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SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQ0U7SUFDRixVQUFVO0VBTlo7RUFRQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0lBQ1YsUUFBUTtFQU5WO0VBUUE7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtFQUxaO0VBT0E7SUFDRSxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixhQUFhO0lBQ2IsVUFBVTtJQUNWLFFBQVE7RUFOVjtFQVFBO0lBQ0UsTUFBTTtJQUNOLFFBQVE7SUFDUixRQUFRO0lBQ1IsYUFBYTtJQUNiLFVBQVU7SUFDVixRQUFRO0VBTlY7RUFRQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7RUFPQTtJQUNFLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLGFBQWE7SUFDYixVQUFVO0VBTFo7QUF4UXFCOzs7QURLaEIsSUFBTSxLQUFhLFdBQVk7QUFDcEMsTUFBTSxJQUFrQixHQUFrQjtBQUUxQyxTQURnQixDQUFDLEdBQUcsSUFBUyxHQUFHLENBQWhCLEVBQWlDLElBQUksRUFBckM7QUFFakIsR0FRSyxLQUFrQixTQUFVO0VBQ2hDO0VBQ0EsUUFBUTtFQUNSO0VBQ0E7RUFDQSxZQUFTO0VBQ1Q7R0FDQztBQUNELE1BQU07SUFDSixTQUFTLEdBQUcsSUFBTztNQUNqQixJQUNFLElBQVksTUFBbUI7QUFFckMsU0FBTyxFQUFFLFNBQU0sUUFEQSxJQUFZLElBQWlCLEdBQ3JCLGdCQUFhLGNBQVcsV0FBUSxXQUFRLFlBQXhEO0FBQ1I7OztBRjFCRCxJQUFNLEtBQW1CLFdBQVk7QUFFbkMsU0FBTyxBQURTLEdBQVUsRUFDWCxPQUFPLElBQWlCLENBQUEsQ0FBaEM7QUFDUixHQUVLLEtBQWtCLFNBQ3RCLEdBQ0EsRUFBRSxTQUFNLFdBQVEsZ0JBQWEsY0FBVyxXQUFRLFdBQVEsZUFDeEQ7QUFDQSxTQUFPLFFBQ0YsSUFERTtJQUVMLENBQUMsSUFBTyxFQUFFLFNBQU0sV0FBUSxnQkFBYSxjQUFXLFdBQVEsV0FBUSxZQUF4RDtFQUZIO0FBSVIsR0FFWSxLQUFnQixHQUFnQixHQUt2QyxLQUFxQixXQUFZO0FBQ3JDLE1BQU0sSUFBVSxHQUFVLEdBQ3BCLElBQVMsS0FBVyxHQUNwQixJQUFXLE1BQU0sS0FBSyxFQUFFLFVBQUYsR0FBWSxDQUFDLEdBQU8sTUFDOUMsR0FBa0IsR0FBUSxDQUFULENBREY7QUFHakIsU0FBTyxPQUFPLE9BQU8sQ0FBQSxHQUFJLEdBQUcsQ0FBckI7QUFDUixHQUVLLEtBQW9CLFNBQVUsR0FBUSxHQUFTO0FBQ25ELE1BQU0sSUFBUyxHQUFtQixHQUFRLENBQVQ7QUFFakMsTUFBSSxNQUFXO0FBQ2IsV0FBTyxDQUFBO0FBR1QsTUFBTSxFQUFFLFNBQU0sZ0JBQWEsY0FBVyxXQUFRLFdBQVEsZ0JBQWE7QUFDbkUsU0FBTztJQUNMLENBQUMsSUFBUztNQUNSO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBUFE7RUFETDtBQVdSLEdBSUssS0FBcUIsU0FBVSxHQUFRLEdBQVM7QUFDcEQsTUFBTSxJQUFTLEVBQVEsS0FBSyxDQUFDLEVBQUUsY0FBVyxHQUFVLFFBQVEsT0FBVSxDQUF2RDtBQUVmLFNBQUksTUFBVyxTQUNOLElBR0YsRUFBUSxLQUFLLENBQUMsTUFBWSxFQUFRLFdBQVcsQ0FBN0M7QUFDUixHQUVZLEtBQWtCLEdBQWtCOzs7QURuRWpELElBQU0sS0FBaUIsQ0FBQyxFQUFDLGFBQVUsWUFBUyxjQUFXLFdBQVEsc0JBQW1CLGFBQVUsb0JBQ3ZGLElBQ0ksbUJBQW1CLG1CQUd2QixJQUNJLGlCQUdKLE1BQWMsU0FDVixlQUFlLE1BR25CLE1BQVcsU0FDUCxtQkFBbUIsTUFBVyxPQUdsQyxNQUFhLFNBQ1QseUJBQXlCLE1BRzFCLFVBR0ssS0FBWSxDQUFDO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxRQUFRLEVBQUMsU0FBUyxFQUFDO0FBQUEsTUFDZDtBQUdMLE1BQVcsTUFBYSxPQUFPLFNBQVksR0FDM0MsSUFBUyxNQUFXLE9BQU8sU0FBWTtBQUN2QyxNQUFNLElBQW9CLE1BQVcsU0FBWSxTQUFZLEdBQWMsR0FBUSxhQUU3RSxJQUFZLEtBQVMsRUFBTSxNQUczQixJQUFlLFdBRE4sR0FBZSxFQUFDLGFBQVUsWUFBUyxjQUFXLFdBQVEsc0JBQW1CLGFBQVUsY0FBVSxDQUFDLE1BQ2xFLEtBQ3JDLElBQVUsT0FBTyxVQUFVLFNBQVMsS0FBSyxDQUFLLE1BQU0sa0JBQ3BELElBQWUsSUFBVSxHQUFHO0FBQUEsRUFBaUIsRUFBTSxZQUFZLEdBQy9ELElBQVUsQ0FBQyxHQUFjLEdBQVEsQ0FBTSxFQUFFLE9BQU8sT0FBTyxFQUFFLEtBQUs7QUFBQSxDQUFJO0FBRXhFLFNBQUksSUFDSCxHQUFNLGtCQUFrQixFQUFNLFNBQzlCLEVBQU0sVUFBVSxLQUVoQixJQUFRLElBQUksTUFBTSxDQUFPLEdBRzFCLEVBQU0sZUFBZSxHQUNyQixFQUFNLFVBQVUsR0FDaEIsRUFBTSxpQkFBaUIsR0FDdkIsRUFBTSxXQUFXLEdBQ2pCLEVBQU0sU0FBUyxHQUNmLEVBQU0sb0JBQW9CLEdBQzFCLEVBQU0sU0FBUyxHQUNmLEVBQU0sU0FBUyxHQUVYLE1BQVEsVUFDWCxHQUFNLE1BQU0sSUFHVCxrQkFBa0IsS0FDckIsT0FBTyxFQUFNLGNBR2QsRUFBTSxTQUFTLElBQ2YsRUFBTSxXQUFXLFFBQVEsQ0FBUSxHQUNqQyxFQUFNLGFBQWEsR0FDbkIsRUFBTSxTQUFTLEtBQVUsQ0FBQyxHQUVuQjtBQUNSOzs7QUtwRkE7QUFBQSxJQUFNLEtBQVUsQ0FBQyxTQUFTLFVBQVUsUUFBUSxHQUV0QyxLQUFXLE9BQVcsR0FBUSxLQUFLLE9BQVMsRUFBUSxPQUFXLE1BQVMsR0FFakUsS0FBaUIsT0FBVztBQUN4QyxNQUFJLENBQUM7QUFDSjtBQUdELE1BQU0sRUFBQyxhQUFTO0FBRWhCLE1BQUksTUFBVTtBQUNiLFdBQU8sR0FBUSxJQUFJLE9BQVMsRUFBUSxFQUFNO0FBRzNDLE1BQUksR0FBUyxDQUFPO0FBQ25CLFVBQU0sSUFBSSxNQUFNLHFFQUFxRSxHQUFRLElBQUksT0FBUyxLQUFLLEtBQVMsRUFBRSxLQUFLLElBQUksR0FBRztBQUd2SSxNQUFJLE9BQU8sS0FBVTtBQUNwQixXQUFPO0FBR1IsTUFBSSxDQUFDLE1BQU0sUUFBUSxDQUFLO0FBQ3ZCLFVBQU0sSUFBSSxVQUFVLG1FQUFtRSxPQUFPLEtBQVM7QUFHeEcsTUFBTSxJQUFTLEtBQUssSUFBSSxFQUFNLFFBQVEsR0FBUSxNQUFNO0FBQ3BELFNBQU8sTUFBTSxLQUFLLEVBQUMsVUFBTSxHQUFHLENBQUMsR0FBTyxNQUFVLEVBQU0sRUFBTTtBQUMzRDs7O0FDN0JBO0FBQ0EsU0FBbUI7QUFEbkI7QUFHQSxJQUFNLEtBQTZCLE1BQU8sR0FHN0IsS0FBYyxDQUFDLEdBQU0sSUFBUyxXQUFXLElBQVUsQ0FBQyxNQUFNO0FBQ3RFLE1BQU0sSUFBYSxFQUFLLENBQU07QUFDOUIsWUFBZSxHQUFNLEdBQVEsR0FBUyxDQUFVLEdBQ3pDO0FBQ1IsR0FFTSxLQUFpQixDQUFDLEdBQU0sR0FBUSxHQUFTLE1BQWU7QUFDN0QsTUFBSSxDQUFDLEdBQWdCLEdBQVEsR0FBUyxDQUFVO0FBQy9DO0FBR0QsTUFBTSxJQUFVLEdBQXlCLENBQU8sR0FDMUMsSUFBSSxXQUFXLE1BQU07QUFDMUIsTUFBSyxTQUFTO0FBQUEsRUFDZixHQUFHLENBQU87QUFNVixFQUFJLEVBQUUsU0FDTCxFQUFFLE1BQU07QUFFVixHQUVNLEtBQWtCLENBQUMsR0FBUSxFQUFDLDRCQUF3QixNQUFlLEdBQVUsQ0FBTSxLQUFLLE1BQTBCLE1BQVMsR0FFM0gsS0FBWSxPQUFVLE1BQVcsR0FBRyxVQUFVLFFBQVEsV0FDdEQsT0FBTyxLQUFXLFlBQVksRUFBTyxZQUFZLE1BQU0sV0FFdkQsS0FBMkIsQ0FBQyxFQUFDLDJCQUF3QixTQUFVO0FBQ3BFLE1BQUksTUFBMEI7QUFDN0IsV0FBTztBQUdSLE1BQUksQ0FBQyxPQUFPLFNBQVMsQ0FBcUIsS0FBSyxJQUF3QjtBQUN0RSxVQUFNLElBQUksVUFBVSxxRkFBcUYsUUFBNEIsT0FBTyxJQUF3QjtBQUdySyxTQUFPO0FBQ1IsR0FHYSxLQUFnQixDQUFDLEdBQVMsTUFBWTtBQUdsRCxFQUFJLEFBRmUsRUFBUSxLQUFLLEtBRy9CLEdBQVEsYUFBYTtBQUV2QixHQUVNLEtBQWMsQ0FBQyxHQUFTLEdBQVEsTUFBVztBQUNoRCxJQUFRLEtBQUssQ0FBTSxHQUNuQixFQUFPLE9BQU8sT0FBTyxJQUFJLE1BQU0sV0FBVyxHQUFHLEVBQUMsVUFBVSxJQUFNLFVBQU0sQ0FBQyxDQUFDO0FBQ3ZFLEdBR2EsS0FBZSxDQUFDLEdBQVMsRUFBQyxZQUFTLGdCQUFhLGFBQVksTUFBbUI7QUFDM0YsTUFBSSxNQUFZLEtBQUssTUFBWTtBQUNoQyxXQUFPO0FBR1IsTUFBSSxHQUNFLElBQWlCLElBQUksUUFBUSxDQUFDLEdBQVMsTUFBVztBQUN2RCxRQUFZLFdBQVcsTUFBTTtBQUM1QixTQUFZLEdBQVMsR0FBWSxDQUFNO0FBQUEsSUFDeEMsR0FBRyxDQUFPO0FBQUEsRUFDWCxDQUFDLEdBRUssSUFBcUIsRUFBZSxRQUFRLE1BQU07QUFDdkQsaUJBQWEsQ0FBUztBQUFBLEVBQ3ZCLENBQUM7QUFFRCxTQUFPLFFBQVEsS0FBSyxDQUFDLEdBQWdCLENBQWtCLENBQUM7QUFDekQsR0FFYSxLQUFrQixDQUFDLEVBQUMsaUJBQWE7QUFDN0MsTUFBSSxNQUFZLFVBQWMsRUFBQyxPQUFPLFNBQVMsQ0FBTyxLQUFLLElBQVU7QUFDcEUsVUFBTSxJQUFJLFVBQVUsdUVBQXVFLFFBQWMsT0FBTyxJQUFVO0FBRTVILEdBR2EsS0FBaUIsT0FBTyxHQUFTLEVBQUMsWUFBUyxlQUFXLE1BQWlCO0FBQ25GLE1BQUksQ0FBQyxLQUFXO0FBQ2YsV0FBTztBQUdSLE1BQU0sSUFBb0IsZ0JBQU8sTUFBTTtBQUN0QyxNQUFRLEtBQUs7QUFBQSxFQUNkLENBQUM7QUFFRCxTQUFPLEVBQWEsUUFBUSxNQUFNO0FBQ2pDLE1BQWtCO0FBQUEsRUFDbkIsQ0FBQztBQUNGOzs7QUNyR0E7OztBQ0FBO0FBQU8sWUFBa0IsR0FBUTtBQUNoQyxTQUFPLE1BQVcsUUFDZCxPQUFPLEtBQVcsWUFDbEIsT0FBTyxFQUFPLFFBQVM7QUFDNUI7OztBREhBLFNBQXNCLGFBQ3RCLEtBQXdCLGFBR1gsS0FBYyxDQUFDLEdBQVMsTUFBVTtBQUc5QyxFQUFJLE1BQVUsVUFBYSxFQUFRLFVBQVUsVUFJN0MsQ0FBSSxHQUFTLENBQUssSUFDakIsRUFBTSxLQUFLLEVBQVEsS0FBSyxJQUV4QixFQUFRLE1BQU0sSUFBSSxDQUFLO0FBRXpCLEdBR2EsS0FBZ0IsQ0FBQyxHQUFTLEVBQUMsYUFBUztBQUNoRCxNQUFJLENBQUMsS0FBUSxDQUFDLEVBQVEsVUFBVSxDQUFDLEVBQVE7QUFDeEM7QUFHRCxNQUFNLElBQVEsZ0JBQVk7QUFFMUIsU0FBSSxFQUFRLFVBQ1gsRUFBTSxJQUFJLEVBQVEsTUFBTSxHQUdyQixFQUFRLFVBQ1gsRUFBTSxJQUFJLEVBQVEsTUFBTSxHQUdsQjtBQUNSLEdBR00sS0FBa0IsT0FBTyxHQUFRLE1BQWtCO0FBQ3hELE1BQUksRUFBQyxHQUlMO0FBQUEsTUFBTyxRQUFRO0FBRWYsUUFBSTtBQUNILGFBQU8sTUFBTTtBQUFBLElBQ2QsU0FBUyxHQUFQO0FBQ0QsYUFBTyxFQUFNO0FBQUEsSUFDZDtBQUFBO0FBQ0QsR0FFTSxLQUFtQixDQUFDLEdBQVEsRUFBQyxhQUFVLFdBQVEsbUJBQWU7QUFDbkUsTUFBSSxHQUFDLEtBQVUsQ0FBQztBQUloQixXQUFJLElBQ0ksZ0JBQVUsR0FBUSxFQUFDLGFBQVUsYUFBUyxDQUFDLElBR3hDLFdBQVUsT0FBTyxHQUFRLEVBQUMsYUFBUyxDQUFDO0FBQzVDLEdBR2EsS0FBbUIsT0FBTyxFQUFDLFdBQVEsV0FBUSxVQUFNLEVBQUMsYUFBVSxXQUFRLGdCQUFZLE1BQWdCO0FBQzVHLE1BQU0sSUFBZ0IsR0FBaUIsR0FBUSxFQUFDLGFBQVUsV0FBUSxhQUFTLENBQUMsR0FDdEUsSUFBZ0IsR0FBaUIsR0FBUSxFQUFDLGFBQVUsV0FBUSxhQUFTLENBQUMsR0FDdEUsSUFBYSxHQUFpQixHQUFLLEVBQUMsYUFBVSxXQUFRLFdBQVcsSUFBWSxFQUFDLENBQUM7QUFFckYsTUFBSTtBQUNILFdBQU8sTUFBTSxRQUFRLElBQUksQ0FBQyxHQUFhLEdBQWUsR0FBZSxDQUFVLENBQUM7QUFBQSxFQUNqRixTQUFTLEdBQVA7QUFDRCxXQUFPLFFBQVEsSUFBSTtBQUFBLE1BQ2xCLEVBQUMsVUFBTyxRQUFRLEVBQU0sUUFBUSxVQUFVLEVBQU0sU0FBUTtBQUFBLE1BQ3RELEdBQWdCLEdBQVEsQ0FBYTtBQUFBLE1BQ3JDLEdBQWdCLEdBQVEsQ0FBYTtBQUFBLE1BQ3JDLEdBQWdCLEdBQUssQ0FBVTtBQUFBLElBQ2hDLENBQUM7QUFBQSxFQUNGO0FBQ0Q7OztBRWpGQTtBQUFBLElBQU0sS0FBMEIsYUFBWTtBQUFDLEdBQUcsRUFBRSxZQUFZLFdBQ3hELEtBQWMsQ0FBQyxRQUFRLFNBQVMsU0FBUyxFQUFFLElBQUksT0FBWTtBQUFBLEVBQ2hFO0FBQUEsRUFDQSxRQUFRLHlCQUF5QixJQUF3QixDQUFRO0FBQ2xFLENBQUMsR0FHWSxLQUFlLENBQUMsR0FBUyxNQUFZO0FBQ2pELFdBQVcsQ0FBQyxHQUFVLE1BQWUsSUFBYTtBQUVqRCxRQUFNLElBQVEsT0FBTyxLQUFZLGFBQzlCLElBQUksTUFBUyxRQUFRLE1BQU0sRUFBVyxPQUFPLEVBQVEsR0FBRyxDQUFJLElBQzVELEVBQVcsTUFBTSxLQUFLLENBQU87QUFFaEMsWUFBUSxlQUFlLEdBQVMsR0FBVSxRQUFJLElBQUosRUFBZ0IsU0FBSyxFQUFDO0FBQUEsRUFDakU7QUFFQSxTQUFPO0FBQ1IsR0FHYSxLQUFvQixPQUFXLElBQUksUUFBUSxDQUFDLEdBQVMsTUFBVztBQUM1RSxJQUFRLEdBQUcsUUFBUSxDQUFDLEdBQVUsTUFBVztBQUN4QyxNQUFRLEVBQUMsYUFBVSxVQUFNLENBQUM7QUFBQSxFQUMzQixDQUFDLEdBRUQsRUFBUSxHQUFHLFNBQVMsT0FBUztBQUM1QixNQUFPLENBQUs7QUFBQSxFQUNiLENBQUMsR0FFRyxFQUFRLFNBQ1gsRUFBUSxNQUFNLEdBQUcsU0FBUyxPQUFTO0FBQ2xDLE1BQU8sQ0FBSztBQUFBLEVBQ2IsQ0FBQztBQUVILENBQUM7OztBQ25DRDtBQUFBLElBQU0sS0FBZ0IsQ0FBQyxHQUFNLElBQU8sQ0FBQyxNQUMvQixNQUFNLFFBQVEsQ0FBSSxJQUloQixDQUFDLEdBQU0sR0FBRyxDQUFJLElBSGIsQ0FBQyxDQUFJLEdBTVIsS0FBbUIsYUFDbkIsS0FBdUIsTUFFdkIsS0FBWSxPQUNiLE9BQU8sS0FBUSxZQUFZLEdBQWlCLEtBQUssQ0FBRyxJQUNoRCxJQUdELElBQUksRUFBSSxRQUFRLElBQXNCLEtBQUssTUFHdEMsS0FBYyxDQUFDLEdBQU0sTUFBUyxHQUFjLEdBQU0sQ0FBSSxFQUFFLEtBQUssR0FBRyxHQUVoRSxLQUFvQixDQUFDLEdBQU0sTUFBUyxHQUFjLEdBQU0sQ0FBSSxFQUFFLElBQUksT0FBTyxHQUFVLENBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRzs7O0FoQk45RyxJQUFNLEtBQXFCLE1BQU8sTUFBTyxLQUVuQyxLQUFTLENBQUMsRUFBQyxLQUFLLEdBQVcsY0FBVyxnQkFBYSxhQUFVLGtCQUFjO0FBQ2hGLE1BQU0sSUFBTSxJQUFZLFFBQUksR0FBUSxNQUFRLEtBQWE7QUFFekQsU0FBSSxJQUNJLEdBQWMsRUFBQyxRQUFLLEtBQUssR0FBVSxZQUFRLENBQUMsSUFHN0M7QUFDUixHQUVNLEtBQWtCLENBQUMsR0FBTSxHQUFNLElBQVUsQ0FBQyxNQUFNO0FBQ3JELE1BQU0sSUFBUyxXQUFXLE9BQU8sR0FBTSxHQUFNLENBQU87QUFDcEQsYUFBTyxFQUFPLFNBQ2QsSUFBTyxFQUFPLE1BQ2QsSUFBVSxFQUFPLFNBRWpCLElBQVU7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLElBQ25CLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLFVBQVUsRUFBUSxPQUFPLEdBQVEsSUFBSTtBQUFBLElBQ3JDLFVBQVUsR0FBUTtBQUFBLElBQ2xCLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLGFBQWE7QUFBQSxLQUNWLElBR0osRUFBUSxNQUFNLEdBQU8sQ0FBTyxHQUU1QixFQUFRLFFBQVEsR0FBZSxDQUFPLEdBRWxDLEdBQVEsYUFBYSxXQUFXLEdBQUssU0FBUyxHQUFNLE1BQU0sTUFBTSxTQUVuRSxFQUFLLFFBQVEsSUFBSSxHQUdYLEVBQUMsU0FBTSxTQUFNLFlBQVMsVUFBTTtBQUNwQyxHQUVNLEtBQWUsQ0FBQyxHQUFTLEdBQU8sTUFDakMsT0FBTyxLQUFVLFlBQVksQ0FBQyxHQUFPLFNBQVMsQ0FBSyxJQUUvQyxNQUFVLFNBQVksU0FBWSxLQUd0QyxFQUFRLG9CQUNKLEdBQWtCLENBQUssSUFHeEI7QUFHRCxZQUFlLEdBQU0sR0FBTSxHQUFTO0FBQzFDLE1BQU0sSUFBUyxHQUFnQixHQUFNLEdBQU0sQ0FBTyxHQUM1QyxJQUFVLEdBQVksR0FBTSxDQUFJLEdBQ2hDLElBQWlCLEdBQWtCLEdBQU0sQ0FBSTtBQUVuRCxLQUFnQixFQUFPLE9BQU87QUFFOUIsTUFBSTtBQUNKLE1BQUk7QUFDSCxRQUFVLEdBQWEsTUFBTSxFQUFPLE1BQU0sRUFBTyxNQUFNLEVBQU8sT0FBTztBQUFBLEVBQ3RFLFNBQVMsR0FBUDtBQUVELFFBQU0sSUFBZSxJQUFJLEdBQWEsYUFBYSxHQUM3QyxJQUFlLFFBQVEsT0FBTyxHQUFVO0FBQUEsTUFDN0M7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLEtBQUs7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxJQUNULENBQUMsQ0FBQztBQUNGLFdBQU8sR0FBYSxHQUFjLENBQVk7QUFBQSxFQUMvQztBQUVBLE1BQU0sSUFBaUIsR0FBa0IsQ0FBTyxHQUMxQyxJQUFlLEdBQWEsR0FBUyxFQUFPLFNBQVMsQ0FBYyxHQUNuRSxJQUFjLEdBQWUsR0FBUyxFQUFPLFNBQVMsQ0FBWSxHQUVsRSxJQUFVLEVBQUMsWUFBWSxHQUFLO0FBRWxDLElBQVEsT0FBTyxHQUFZLEtBQUssTUFBTSxFQUFRLEtBQUssS0FBSyxDQUFPLENBQUMsR0FDaEUsRUFBUSxTQUFTLEdBQWMsS0FBSyxNQUFNLEdBQVMsQ0FBTztBQTZDMUQsTUFBTSxJQUFvQixHQTNDSixZQUFZO0FBQ2pDLFFBQU0sQ0FBQyxFQUFDLFVBQU8sYUFBVSxXQUFRLGVBQVcsR0FBYyxHQUFjLE1BQWEsTUFBTSxHQUFpQixHQUFTLEVBQU8sU0FBUyxDQUFXLEdBQzFJLEtBQVMsR0FBYSxFQUFPLFNBQVMsQ0FBWSxHQUNsRCxLQUFTLEdBQWEsRUFBTyxTQUFTLENBQVksR0FDbEQsS0FBTSxHQUFhLEVBQU8sU0FBUyxFQUFTO0FBRWxELFFBQUksS0FBUyxNQUFhLEtBQUssTUFBVyxNQUFNO0FBQy9DLFVBQU0sS0FBZ0IsR0FBVTtBQUFBLFFBQy9CO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZLEVBQVEsY0FBZSxHQUFPLFFBQVEsU0FBUyxFQUFPLFFBQVEsT0FBTyxVQUFVO0FBQUEsUUFDM0YsUUFBUSxFQUFRO0FBQUEsTUFDakIsQ0FBQztBQUVELFVBQUksQ0FBQyxFQUFPLFFBQVE7QUFDbkIsZUFBTztBQUdSLFlBQU07QUFBQSxJQUNQO0FBRUEsV0FBTztBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFVO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsSUFDVDtBQUFBLEVBQ0QsQ0FFK0M7QUFFL0MsWUFBWSxHQUFTLEVBQU8sUUFBUSxLQUFLLEdBRXpDLEVBQVEsTUFBTSxHQUFjLEdBQVMsRUFBTyxPQUFPLEdBRTVDLEdBQWEsR0FBUyxDQUFpQjtBQUMvQzs7O0FEN0pBLElBQU0sS0FBa0IsR0FBSyxRQUFRLElBQUksR0FBRyxjQUFjO0FBTzFELG9CQUF1QztBQUNuQyxTQUFPLEtBQUssTUFBTyxPQUFNLEdBQVMsRUFBZSxHQUFHLFNBQVMsQ0FBQztBQUNsRTtBQVFBLGtCQUF1QyxHQUFTO0FBQzVDLFFBQU0sR0FBVSxJQUFpQixLQUFLLFVBQVUsR0FBUyxRQUFXLENBQUMsQ0FBQztBQUMxRTtBQVdPLFdBQW1CLEdBQVEsR0FBTSxHQUFRLElBQVUsSUFBTztBQUM3RCxTQUFPLElBQUksUUFBUSxDQUFDLEdBQVMsTUFBVztBQUNwQyxRQUFNLElBQU8sR0FBTSxHQUFRLENBQUk7QUFDL0IsSUFBSSxLQUNBLEVBQU8sTUFBTTtBQUFBLENBQUksR0FFckIsRUFBSyxPQUFPLEtBQUssQ0FBTSxHQUN2QixFQUFLLEtBQUssQ0FBTyxFQUFFLE1BQU0sQ0FBTTtBQUFBLEVBQ25DLENBQUM7QUFDTDs7O0FEckNBLGtCQUFvQyxHQUFXO0FBQzNDLElBQVUsS0FBSztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsTUFBTSxTQUFTO0FBQ1gsVUFBTSxJQUFjLE1BQU0sR0FBZSxHQUNuQyxJQUFVLEVBQVksV0FBVyxDQUFDO0FBQ3hDLFFBQVksV0FBVztBQUFBLFFBQ25CLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLGVBQWU7QUFBQSxNQUNuQixHQUNBLEVBQVEsV0FBVyxvRUFDbkIsRUFBWSxVQUFVLEdBQ3RCLE1BQU0sR0FBaUIsQ0FBVztBQUFBLElBQ3RDO0FBQUEsRUFDSixDQUFDLEdBRUQsRUFBVSxLQUFLO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxNQUFNLE9BQU8sR0FBUTtBQUNqQixZQUFNLEVBQVUsUUFBUSxDQUFDLE9BQU8sVUFBVSxHQUFHLEdBQVEsRUFBSTtBQUFBLElBQzdEO0FBQUEsRUFDSixDQUFDLEdBRUQsRUFBVSxLQUFLO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxNQUFNLE9BQU8sR0FBUTtBQUNqQixZQUFNLEVBQVUsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFRLEVBQUk7QUFBQSxJQUN0RDtBQUFBLEVBQ0osQ0FBQztBQUNMOzs7QW1CcENBO0FBTUEsa0JBQXFDLEdBQVc7QUFDNUMsSUFBVSxLQUFLO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxNQUFNLE9BQU8sR0FBUTtBQUNqQixZQUFNLEVBQVUsUUFBUSxDQUFDLE9BQU8sV0FBVyxPQUFPLEdBQUcsR0FBUSxFQUFJO0FBQUEsSUFDckU7QUFBQSxFQUNKLENBQUMsR0FFRCxFQUFVLEtBQUs7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLE1BQU0sT0FBTyxHQUFRO0FBQ2pCLFVBQU0sSUFBWSxPQUFPLEdBQU0sTUFBVTtBQUNyQyxjQUFNLEVBQVUsUUFBUSxDQUFDLFVBQVUsT0FBTyxHQUFNLENBQUssR0FBRyxDQUFNO0FBQUEsTUFDbEU7QUFFQSxZQUFNLEVBQVUsY0FBYyxjQUFjLEdBQzVDLE1BQU0sRUFBVSxhQUFhLE9BQU8sR0FDcEMsTUFBTSxFQUFVLHFCQUFxQixNQUFNLEdBQzNDLE1BQU0sRUFBVSxxQkFBcUIsT0FBTztBQUFBLElBQ2hEO0FBQUEsRUFDSixDQUFDLEdBRUQsRUFBVSxLQUFLO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxNQUFNLE9BQU8sR0FBUTtBQUNqQixZQUFNLEVBQVUsUUFBUSxDQUFDLEdBQUcsR0FBUSxFQUFJO0FBQUEsSUFDNUM7QUFBQSxFQUNKLENBQUM7QUFDTDs7O0FDbENBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQU1BLGtCQUF3QyxHQUFXO0FBQy9DLElBQVUsS0FBSztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsTUFBTSxTQUFTO0FBQ1gsWUFBTSxHQUFVLEdBQUssUUFBUSxJQUFJLEdBQUcsZUFBZSxHQUFHLEVBQVk7QUFBQSxJQUN0RTtBQUFBLEVBQ0osQ0FBQztBQUNMOzs7QXJCZkE7QUFTQSxjQUFRLHlCQUFSLFdBQThCLEtBQUssU0FBUztBQUU1QyxJQUFNLEtBQU4sY0FBMEIsVUFBUTtBQUFBLEVBQzlCLFdBQVcsU0FBTyxRQUFRLGVBQWUsSUFBTztBQUFBLElBQzVDLGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQUEsRUFDRCxlQUFlLFNBQU8sUUFBUSxtQkFBbUIsSUFBTztBQUFBLElBQ3BELGFBQWE7QUFBQSxFQUNqQixDQUFDO0FBQUEsRUFDRCxtQkFBbUIsU0FBTyxRQUFRLHVCQUF1QixJQUFPO0FBQUEsSUFDNUQsYUFBYTtBQUFBLEVBQ2pCLENBQUM7QUFBQSxFQXdCRCxNQUFNLFVBQVU7QUFDWixRQUFNLElBQVMsS0FBSyxRQUFRO0FBRTVCLE1BQU8sTUFBTTtBQUFBO0FBQUEsQ0FBbUI7QUFHaEMsUUFBTSxJQUFZLENBQUM7QUFFbkIsSUFBSyxLQUFLLFlBQ04sTUFBTSxHQUFlLENBQVMsR0FHN0IsS0FBSyxnQkFDTixNQUFNLEdBQWMsQ0FBUyxHQUc1QixLQUFLLG9CQUNOLE1BQU0sR0FBa0IsQ0FBUztBQUdyQyxhQUFXLEtBQVE7QUFDZixRQUFPLE1BQ0g7QUFBQSxHQUFNLEVBQVUsUUFBUSxDQUFJLElBQUksS0FBSyxFQUFVLFdBQzNDLEVBQUssT0FFYixHQUNBLE1BQU0sRUFBSyxPQUFPLENBQU07QUFHNUIsTUFBTyxNQUFNO0FBQUEsTUFBUztBQUFBLEVBQzFCO0FBQ0o7QUFyREksR0FYRSxJQVdLLFNBQVEsVUFBUSxNQUFNO0FBQUEsRUFDekIsVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVVQsVUFBVTtBQUFBLElBQ04sQ0FBQyw0QkFBNEIsSUFBSTtBQUFBLElBQ2pDO0FBQUEsTUFDSTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7QUFtQ0wsSUFBTSxDQUFDLEVBQUUsT0FBUSxNQUFRLFFBQVEsTUFFM0IsS0FBTSxJQUFJLE1BQUk7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixZQUFZLFFBQVE7QUFBQSxFQUNwQixlQUFlO0FBQ25CLENBQUM7QUFFRCxHQUFJLFNBQVMsRUFBVztBQUN4QixHQUFJLFFBQVEsRUFBSTsiLAogICJuYW1lcyI6IFtdCn0K
