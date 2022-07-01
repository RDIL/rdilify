#!/usr/bin/env node
import { createRequire } from "module"
const require = createRequire(import.meta.url)
var $o = Object.create;
var Ze = Object.defineProperty, Co = Object.defineProperties, Io = Object.getOwnPropertyDescriptor, Po = Object.getOwnPropertyDescriptors, Ao = Object.getOwnPropertyNames, ve = Object.getOwnPropertySymbols, Ro = Object.getPrototypeOf, Qe = Object.prototype.hasOwnProperty, Yt = Object.prototype.propertyIsEnumerable;
var Ye = (e, t, n) => t in e ? Ze(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, b = (e, t) => {
  for (var n in t || (t = {}))
    Qe.call(t, n) && Ye(e, n, t[n]);
  if (ve)
    for (var n of ve(t))
      Yt.call(t, n) && Ye(e, n, t[n]);
  return e;
}, v = (e, t) => Co(e, Po(t));
var C = /* @__PURE__ */ ((e) => typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
  get: (t, n) => (typeof require != "undefined" ? require : t)[n]
}) : e)(function(e) {
  if (typeof require != "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + e + '" is not supported');
});
var Zt = (e, t) => {
  var n = {};
  for (var r in e)
    Qe.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && ve)
    for (var r of ve(e))
      t.indexOf(r) < 0 && Yt.call(e, r) && (n[r] = e[r]);
  return n;
};
var E = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var jo = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of Ao(t))
      !Qe.call(e, o) && o !== n && Ze(e, o, { get: () => t[o], enumerable: !(r = Io(t, o)) || r.enumerable });
  return e;
};
var ie = (e, t, n) => (n = e != null ? $o(Ro(e)) : {}, jo(t || !e || !e.__esModule ? Ze(n, "default", { value: e, enumerable: !0 }) : n, e));
var Qt = (e, t, n) => (Ye(e, typeof t != "symbol" ? t + "" : t, n), n);

// node_modules/clipanion/lib/constants.js
var Se = E((j) => {
  "use strict";
  Object.defineProperty(j, "__esModule", { value: !0 });
  var To = 0, ko = 1, Do = 2, Mo = "", Uo = "\0", Lo = -1, qo = /^(-h|--help)(?:=([0-9]+))?$/, Go = /^(--[a-z]+(?:-[a-z]+)*|-[a-zA-Z]+)$/, Bo = /^-[a-zA-Z]{2,}$/, Fo = /^([^=]+)=([\s\S]*)$/, Vo = process.env.DEBUG_CLI === "1";
  j.BATCH_REGEX = Bo;
  j.BINDING_REGEX = Fo;
  j.DEBUG = Vo;
  j.END_OF_INPUT = Uo;
  j.HELP_COMMAND_INDEX = Lo;
  j.HELP_REGEX = qo;
  j.NODE_ERRORED = Do;
  j.NODE_INITIAL = To;
  j.NODE_SUCCESS = ko;
  j.OPTION_REGEX = Go;
  j.START_OF_INPUT = Mo;
});

// node_modules/clipanion/lib/errors.js
var we = E((se) => {
  "use strict";
  Object.defineProperty(se, "__esModule", { value: !0 });
  var Ho = Se(), et = class extends Error {
    constructor(t) {
      super(t), this.clipanion = { type: "usage" }, this.name = "UsageError";
    }
  }, tt = class extends Error {
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
${rt(t)}`;
      } else
        this.message = `Command not found; did you mean one of:

${this.candidates.map(({ usage: r }, o) => `${`${o}.`.padStart(4)} ${r}`).join(`
`)}

${rt(t)}`;
    }
  }, nt = class extends Error {
    constructor(t, n) {
      super(), this.input = t, this.usages = n, this.clipanion = { type: "none" }, this.name = "AmbiguousSyntaxError", this.message = `Cannot find which to pick amongst the following alternatives:

${this.usages.map((r, o) => `${`${o}.`.padStart(4)} ${r}`).join(`
`)}

${rt(t)}`;
    }
  }, rt = (e) => `While running ${e.filter((t) => t !== Ho.END_OF_INPUT).map((t) => {
    let n = JSON.stringify(t);
    return t.match(/\s/) || t.length === 0 || n !== `"${t}"` ? n : t;
  }).join(" ")}`;
  se.AmbiguousSyntaxError = nt;
  se.UnknownSyntaxError = tt;
  se.UsageError = et;
});

// node_modules/clipanion/lib/format.js
var it = E((ae) => {
  "use strict";
  Object.defineProperty(ae, "__esModule", { value: !0 });
  var en = 80, ot = Array(en).fill("\u2501");
  for (let e = 0; e <= 24; ++e)
    ot[ot.length - e] = `\x1B[38;5;${232 + e}m\u2501`;
  var Xo = {
    header: (e) => `\x1B[1m\u2501\u2501\u2501 ${e}${e.length < en - 5 ? ` ${ot.slice(e.length + 5).join("")}` : ":"}\x1B[0m`,
    bold: (e) => `\x1B[1m${e}\x1B[22m`,
    error: (e) => `\x1B[31m\x1B[1m${e}\x1B[22m\x1B[39m`,
    code: (e) => `\x1B[36m${e}\x1B[39m`
  }, Wo = {
    header: (e) => e,
    bold: (e) => e,
    error: (e) => e,
    code: (e) => e
  };
  function zo(e) {
    let t = e.split(`
`), n = t.filter((o) => o.match(/\S/)), r = n.length > 0 ? n.reduce((o, i) => Math.min(o, i.length - i.trimStart().length), Number.MAX_VALUE) : 0;
    return t.map((o) => o.slice(r).trimRight()).join(`
`);
  }
  function Ko(e, { format: t, paragraphs: n }) {
    return e = e.replace(/\r\n?/g, `
`), e = zo(e), e = e.replace(/^\n+|\n+$/g, ""), e = e.replace(/^(\s*)-([^\n]*?)\n+/gm, `$1-$2

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
  ae.formatMarkdownish = Ko;
  ae.richFormat = Xo;
  ae.textFormat = Wo;
});

// node_modules/clipanion/lib/advanced/options/utils.js
var q = E((F) => {
  "use strict";
  Object.defineProperty(F, "__esModule", { value: !0 });
  var tn = we(), nn = Symbol("clipanion/isOption");
  function Jo(e) {
    return v(b({}, e), { [nn]: !0 });
  }
  function Yo(e, t) {
    return typeof e > "u" ? [e, t] : typeof e == "object" && e !== null && !Array.isArray(e) ? [void 0, e] : [e, t];
  }
  function st(e, { mergeName: t = !1 } = {}) {
    let n = e.match(/^([^:]+): (.*)$/m);
    if (!n)
      return "validation failed";
    let [, r, o] = n;
    return t && (o = o[0].toLowerCase() + o.slice(1)), o = r !== "." || !t ? `${r.replace(/^\.(\[|$)/, "$1")}: ${o}` : `: ${o}`, o;
  }
  function rn(e, t) {
    return t.length === 1 ? new tn.UsageError(`${e}${st(t[0], { mergeName: !0 })}`) : new tn.UsageError(`${e}:
${t.map((n) => `
- ${st(n)}`).join("")}`);
  }
  function Zo(e, t, n) {
    if (typeof n > "u")
      return t;
    let r = [], o = [], i = (a) => {
      let c = t;
      return t = a, i.bind(null, c);
    };
    if (!n(t, { errors: r, coercions: o, coercion: i }))
      throw rn(`Invalid value for ${e}`, r);
    for (let [, a] of o)
      a();
    return t;
  }
  F.applyValidator = Zo;
  F.cleanValidationError = st;
  F.formatError = rn;
  F.isOptionSymbol = nn;
  F.makeCommandOption = Jo;
  F.rerouteArguments = Yo;
});

// node_modules/typanion/lib/index.js
var fn = E((h) => {
  "use strict";
  Object.defineProperty(h, "__esModule", { value: !0 });
  var Qo = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  function S(e) {
    return e === null ? "null" : e === void 0 ? "undefined" : e === "" ? "an empty string" : typeof e == "symbol" ? `<${e.toString()}>` : Array.isArray(e) ? "an array" : JSON.stringify(e);
  }
  function ue(e, t) {
    if (e.length === 0)
      return "nothing";
    if (e.length === 1)
      return S(e[0]);
    let n = e.slice(0, -1), r = e[e.length - 1], o = e.length > 2 ? `, ${t} ` : ` ${t} `;
    return `${n.map((i) => S(i)).join(", ")}${o}${S(r)}`;
  }
  function V(e, t) {
    var n, r, o;
    return typeof t == "number" ? `${(n = e == null ? void 0 : e.p) !== null && n !== void 0 ? n : "."}[${t}]` : Qo.test(t) ? `${(r = e == null ? void 0 : e.p) !== null && r !== void 0 ? r : ""}.${t}` : `${(o = e == null ? void 0 : e.p) !== null && o !== void 0 ? o : "."}[${JSON.stringify(t)}]`;
  }
  function at(e, t, n) {
    return e === 1 ? t : n;
  }
  var ei = /^#[0-9a-f]{6}$/i, ti = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i, ni = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, ri = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/i, on = /^(?:[1-9]\d{3}(-?)(?:(?:0[1-9]|1[0-2])\1(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\1(?:29|30)|(?:0[13578]|1[02])(?:\1)31|00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[0-5]))|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)(?:(-?)02(?:\2)29|-?366))T(?:[01]\d|2[0-3])(:?)[0-5]\d(?:\3[0-5]\d)?(?:Z|[+-][01]\d(?:\3[0-5]\d)?)$/;
  function m({ errors: e, p: t } = {}, n) {
    return e == null || e.push(`${t ?? "."}: ${n}`), !1;
  }
  function oi(e, t) {
    return (n) => {
      e[t] = n;
    };
  }
  function G(e, t) {
    return (n) => {
      let r = e[t];
      return e[t] = n, G(e, t).bind(null, r);
    };
  }
  function ce(e, t, n) {
    let r = () => (e(n()), o), o = () => (e(t), r);
    return r;
  }
  function ct() {
    return x({
      test: (e, t) => !0
    });
  }
  function sn(e) {
    return x({
      test: (t, n) => t !== e ? m(n, `Expected ${S(e)} (got ${S(t)})`) : !0
    });
  }
  function an() {
    return x({
      test: (e, t) => typeof e != "string" ? m(t, `Expected a string (got ${S(e)})`) : !0
    });
  }
  function ii(e) {
    let t = Array.isArray(e) ? e : Object.values(e), n = t.every((o) => typeof o == "string" || typeof o == "number"), r = new Set(t);
    return r.size === 1 ? sn([...r][0]) : x({
      test: (o, i) => r.has(o) ? !0 : n ? m(i, `Expected one of ${ue(t, "or")} (got ${S(o)})`) : m(i, `Expected a valid enumeration value (got ${S(o)})`)
    });
  }
  var si = /* @__PURE__ */ new Map([
    ["true", !0],
    ["True", !0],
    ["1", !0],
    [1, !0],
    ["false", !1],
    ["False", !1],
    ["0", !1],
    [0, !1]
  ]);
  function ai() {
    return x({
      test: (e, t) => {
        var n;
        if (typeof e != "boolean") {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return m(t, "Unbound coercion result");
            let r = si.get(e);
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return m(t, `Expected a boolean (got ${S(e)})`);
        }
        return !0;
      }
    });
  }
  function ci() {
    return x({
      test: (e, t) => {
        var n;
        if (typeof e != "number") {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return m(t, "Unbound coercion result");
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
                  return m(t, `Received a number that can't be safely represented by the runtime (${e})`);
            }
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return m(t, `Expected a number (got ${S(e)})`);
        }
        return !0;
      }
    });
  }
  function ui() {
    return x({
      test: (e, t) => {
        var n;
        if (!(e instanceof Date)) {
          if (typeof (t == null ? void 0 : t.coercions) < "u") {
            if (typeof (t == null ? void 0 : t.coercion) > "u")
              return m(t, "Unbound coercion result");
            let r;
            if (typeof e == "string" && on.test(e))
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
                  return m(t, `Received a timestamp that can't be safely represented by the runtime (${e})`);
            }
            if (typeof r < "u")
              return t.coercions.push([(n = t.p) !== null && n !== void 0 ? n : ".", t.coercion.bind(null, r)]), !0;
          }
          return m(t, `Expected a date (got ${S(e)})`);
        }
        return !0;
      }
    });
  }
  function _e(e, { delimiter: t } = {}) {
    return x({
      test: (n, r) => {
        var o;
        let i = n;
        if (typeof n == "string" && typeof t < "u" && typeof (r == null ? void 0 : r.coercions) < "u") {
          if (typeof (r == null ? void 0 : r.coercion) > "u")
            return m(r, "Unbound coercion result");
          n = n.split(t);
        }
        if (!Array.isArray(n))
          return m(r, `Expected an array (got ${S(n)})`);
        let s = !0;
        for (let a = 0, c = n.length; a < c && (s = e(n[a], Object.assign(Object.assign({}, r), { p: V(r, a), coercion: G(n, a) })) && s, !(!s && (r == null ? void 0 : r.errors) == null)); ++a)
          ;
        return n !== i && r.coercions.push([(o = r.p) !== null && o !== void 0 ? o : ".", r.coercion.bind(null, n)]), s;
      }
    });
  }
  function li(e, { delimiter: t } = {}) {
    let n = _e(e, { delimiter: t });
    return x({
      test: (r, o) => {
        var i, s;
        if (Object.getPrototypeOf(r).toString() === "[object Set]")
          if (typeof (o == null ? void 0 : o.coercions) < "u") {
            if (typeof (o == null ? void 0 : o.coercion) > "u")
              return m(o, "Unbound coercion result");
            let a = [...r], c = [...r];
            if (!n(c, Object.assign(Object.assign({}, o), { coercion: void 0 })))
              return !1;
            let u = () => c.some((l, d) => l !== a[d]) ? new Set(c) : r;
            return o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", ce(o.coercion, r, u)]), !0;
          } else {
            let a = !0;
            for (let c of r)
              if (a = e(c, Object.assign({}, o)) && a, !a && (o == null ? void 0 : o.errors) == null)
                break;
            return a;
          }
        if (typeof (o == null ? void 0 : o.coercions) < "u") {
          if (typeof (o == null ? void 0 : o.coercion) > "u")
            return m(o, "Unbound coercion result");
          let a = { value: r };
          return n(r, Object.assign(Object.assign({}, o), { coercion: G(a, "value") })) ? (o.coercions.push([(s = o.p) !== null && s !== void 0 ? s : ".", ce(o.coercion, r, () => new Set(a.value))]), !0) : !1;
        }
        return m(o, `Expected a set (got ${S(r)})`);
      }
    });
  }
  function di(e, t) {
    let n = _e(Ne([e, t])), r = $e(t, { keys: e });
    return x({
      test: (o, i) => {
        var s, a, c;
        if (Object.getPrototypeOf(o).toString() === "[object Map]")
          if (typeof (i == null ? void 0 : i.coercions) < "u") {
            if (typeof (i == null ? void 0 : i.coercion) > "u")
              return m(i, "Unbound coercion result");
            let u = [...o], l = [...o];
            if (!n(l, Object.assign(Object.assign({}, i), { coercion: void 0 })))
              return !1;
            let d = () => l.some((f, p) => f[0] !== u[p][0] || f[1] !== u[p][1]) ? new Map(l) : o;
            return i.coercions.push([(s = i.p) !== null && s !== void 0 ? s : ".", ce(i.coercion, o, d)]), !0;
          } else {
            let u = !0;
            for (let [l, d] of o)
              if (u = e(l, Object.assign({}, i)) && u, !u && (i == null ? void 0 : i.errors) == null || (u = t(d, Object.assign(Object.assign({}, i), { p: V(i, l) })) && u, !u && (i == null ? void 0 : i.errors) == null))
                break;
            return u;
          }
        if (typeof (i == null ? void 0 : i.coercions) < "u") {
          if (typeof (i == null ? void 0 : i.coercion) > "u")
            return m(i, "Unbound coercion result");
          let u = { value: o };
          return Array.isArray(o) ? n(o, Object.assign(Object.assign({}, i), { coercion: void 0 })) ? (i.coercions.push([(a = i.p) !== null && a !== void 0 ? a : ".", ce(i.coercion, o, () => new Map(u.value))]), !0) : !1 : r(o, Object.assign(Object.assign({}, i), { coercion: G(u, "value") })) ? (i.coercions.push([(c = i.p) !== null && c !== void 0 ? c : ".", ce(i.coercion, o, () => new Map(Object.entries(u.value)))]), !0) : !1;
        }
        return m(i, `Expected a map (got ${S(o)})`);
      }
    });
  }
  function Ne(e, { delimiter: t } = {}) {
    let n = ln(e.length);
    return x({
      test: (r, o) => {
        var i;
        if (typeof r == "string" && typeof t < "u" && typeof (o == null ? void 0 : o.coercions) < "u") {
          if (typeof (o == null ? void 0 : o.coercion) > "u")
            return m(o, "Unbound coercion result");
          r = r.split(t), o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, r)]);
        }
        if (!Array.isArray(r))
          return m(o, `Expected a tuple (got ${S(r)})`);
        let s = n(r, Object.assign({}, o));
        for (let a = 0, c = r.length; a < c && a < e.length && (s = e[a](r[a], Object.assign(Object.assign({}, o), { p: V(o, a), coercion: G(r, a) })) && s, !(!s && (o == null ? void 0 : o.errors) == null)); ++a)
          ;
        return s;
      }
    });
  }
  function $e(e, { keys: t = null } = {}) {
    let n = _e(Ne([t ?? an(), e]));
    return x({
      test: (r, o) => {
        var i;
        if (Array.isArray(r) && typeof (o == null ? void 0 : o.coercions) < "u")
          return typeof (o == null ? void 0 : o.coercion) > "u" ? m(o, "Unbound coercion result") : n(r, Object.assign(Object.assign({}, o), { coercion: void 0 })) ? (r = Object.fromEntries(r), o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, r)]), !0) : !1;
        if (typeof r != "object" || r === null)
          return m(o, `Expected an object (got ${S(r)})`);
        let s = Object.keys(r), a = !0;
        for (let c = 0, u = s.length; c < u && (a || (o == null ? void 0 : o.errors) != null); ++c) {
          let l = s[c], d = r[l];
          if (l === "__proto__" || l === "constructor") {
            a = m(Object.assign(Object.assign({}, o), { p: V(o, l) }), "Unsafe property name");
            continue;
          }
          if (t !== null && !t(l, o)) {
            a = !1;
            continue;
          }
          if (!e(d, Object.assign(Object.assign({}, o), { p: V(o, l), coercion: G(r, l) }))) {
            a = !1;
            continue;
          }
        }
        return a;
      }
    });
  }
  function fi(e, t = {}) {
    return $e(e, t);
  }
  function cn(e, { extra: t = null } = {}) {
    let n = Object.keys(e), r = x({
      test: (o, i) => {
        if (typeof o != "object" || o === null)
          return m(i, `Expected an object (got ${S(o)})`);
        let s = /* @__PURE__ */ new Set([...n, ...Object.keys(o)]), a = {}, c = !0;
        for (let u of s) {
          if (u === "constructor" || u === "__proto__")
            c = m(Object.assign(Object.assign({}, i), { p: V(i, u) }), "Unsafe property name");
          else {
            let l = Object.prototype.hasOwnProperty.call(e, u) ? e[u] : void 0, d = Object.prototype.hasOwnProperty.call(o, u) ? o[u] : void 0;
            typeof l < "u" ? c = l(d, Object.assign(Object.assign({}, i), { p: V(i, u), coercion: G(o, u) })) && c : t === null ? c = m(Object.assign(Object.assign({}, i), { p: V(i, u) }), `Extraneous property (got ${S(d)})`) : Object.defineProperty(a, u, {
              enumerable: !0,
              get: () => d,
              set: oi(o, u)
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
  function pi(e) {
    return cn(e, { extra: $e(ct()) });
  }
  var hi = (e) => x({
    test: (t, n) => t instanceof e ? !0 : m(n, `Expected an instance of ${e.name} (got ${S(t)})`)
  }), mi = (e, { exclusive: t = !1 } = {}) => x({
    test: (n, r) => {
      var o, i, s;
      let a = [], c = typeof (r == null ? void 0 : r.errors) < "u" ? [] : void 0;
      for (let u = 0, l = e.length; u < l; ++u) {
        let d = typeof (r == null ? void 0 : r.errors) < "u" ? [] : void 0, f = typeof (r == null ? void 0 : r.coercions) < "u" ? [] : void 0;
        if (e[u](n, Object.assign(Object.assign({}, r), { errors: d, coercions: f, p: `${(o = r == null ? void 0 : r.p) !== null && o !== void 0 ? o : "."}#${u + 1}` }))) {
          if (a.push([`#${u + 1}`, f]), !t)
            break;
        } else
          c == null || c.push(d[0]);
      }
      if (a.length === 1) {
        let [, u] = a[0];
        return typeof u < "u" && ((i = r == null ? void 0 : r.coercions) === null || i === void 0 || i.push(...u)), !0;
      }
      return a.length > 1 ? m(r, `Expected to match exactly a single predicate (matched ${a.join(", ")})`) : (s = r == null ? void 0 : r.errors) === null || s === void 0 || s.push(...c), !1;
    }
  });
  function un(e) {
    return () => e;
  }
  function x({ test: e }) {
    return un(e)();
  }
  var H = class extends Error {
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
  function gi(e, t) {
    if (!t(e))
      throw new H();
  }
  function yi(e, t) {
    let n = [];
    if (!t(e, { errors: n }))
      throw new H({ errors: n });
  }
  function bi(e, t) {
  }
  function xi(e, t, { coerce: n = !1, errors: r, throw: o } = {}) {
    let i = r ? [] : void 0;
    if (!n) {
      if (t(e, { errors: i }))
        return o ? e : { value: e, errors: void 0 };
      if (o)
        throw new H({ errors: i });
      return { value: void 0, errors: i ?? !0 };
    }
    let s = { value: e }, a = G(s, "value"), c = [];
    if (!t(e, { errors: i, coercion: a, coercions: c })) {
      if (o)
        throw new H({ errors: i });
      return { value: void 0, errors: i ?? !0 };
    }
    for (let [, u] of c)
      u();
    return o ? s.value : { value: s.value, errors: void 0 };
  }
  function Ei(e, t) {
    let n = Ne(e);
    return (...r) => {
      if (!n(r))
        throw new H();
      return t(...r);
    };
  }
  function Oi(e) {
    return x({
      test: (t, n) => t.length >= e ? !0 : m(n, `Expected to have a length of at least ${e} elements (got ${t.length})`)
    });
  }
  function vi(e) {
    return x({
      test: (t, n) => t.length <= e ? !0 : m(n, `Expected to have a length of at most ${e} elements (got ${t.length})`)
    });
  }
  function ln(e) {
    return x({
      test: (t, n) => t.length !== e ? m(n, `Expected to have a length of exactly ${e} elements (got ${t.length})`) : !0
    });
  }
  function Si({ map: e } = {}) {
    return x({
      test: (t, n) => {
        let r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
        for (let i = 0, s = t.length; i < s; ++i) {
          let a = t[i], c = typeof e < "u" ? e(a) : a;
          if (r.has(c)) {
            if (o.has(c))
              continue;
            m(n, `Expected to contain unique elements; got a duplicate with ${S(t)}`), o.add(c);
          } else
            r.add(c);
        }
        return o.size === 0;
      }
    });
  }
  function wi() {
    return x({
      test: (e, t) => e <= 0 ? !0 : m(t, `Expected to be negative (got ${e})`)
    });
  }
  function _i() {
    return x({
      test: (e, t) => e >= 0 ? !0 : m(t, `Expected to be positive (got ${e})`)
    });
  }
  function Ni(e) {
    return x({
      test: (t, n) => t >= e ? !0 : m(n, `Expected to be at least ${e} (got ${t})`)
    });
  }
  function $i(e) {
    return x({
      test: (t, n) => t <= e ? !0 : m(n, `Expected to be at most ${e} (got ${t})`)
    });
  }
  function Ci(e, t) {
    return x({
      test: (n, r) => n >= e && n <= t ? !0 : m(r, `Expected to be in the [${e}; ${t}] range (got ${n})`)
    });
  }
  function Ii(e, t) {
    return x({
      test: (n, r) => n >= e && n < t ? !0 : m(r, `Expected to be in the [${e}; ${t}[ range (got ${n})`)
    });
  }
  function Pi({ unsafe: e = !1 } = {}) {
    return x({
      test: (t, n) => t !== Math.round(t) ? m(n, `Expected to be an integer (got ${t})`) : !e && !Number.isSafeInteger(t) ? m(n, `Expected to be a safe integer (got ${t})`) : !0
    });
  }
  function Ai(e) {
    return x({
      test: (t, n) => e.test(t) ? !0 : m(n, `Expected to match the pattern ${e.toString()} (got ${S(t)})`)
    });
  }
  function Ri() {
    return x({
      test: (e, t) => e !== e.toLowerCase() ? m(t, `Expected to be all-lowercase (got ${e})`) : !0
    });
  }
  function ji() {
    return x({
      test: (e, t) => e !== e.toUpperCase() ? m(t, `Expected to be all-uppercase (got ${e})`) : !0
    });
  }
  function Ti() {
    return x({
      test: (e, t) => ri.test(e) ? !0 : m(t, `Expected to be a valid UUID v4 (got ${S(e)})`)
    });
  }
  function ki() {
    return x({
      test: (e, t) => on.test(e) ? !0 : m(t, `Expected to be a valid ISO 8601 date string (got ${S(e)})`)
    });
  }
  function Di({ alpha: e = !1 }) {
    return x({
      test: (t, n) => (e ? ei.test(t) : ti.test(t)) ? !0 : m(n, `Expected to be a valid hexadecimal color string (got ${S(t)})`)
    });
  }
  function Mi() {
    return x({
      test: (e, t) => ni.test(e) ? !0 : m(t, `Expected to be a valid base 64 string (got ${S(e)})`)
    });
  }
  function Ui(e = ct()) {
    return x({
      test: (t, n) => {
        let r;
        try {
          r = JSON.parse(t);
        } catch {
          return m(n, `Expected to be a valid JSON string (got ${S(t)})`);
        }
        return e(r, n);
      }
    });
  }
  function dn(e, ...t) {
    let n = Array.isArray(t[0]) ? t[0] : t;
    return x({
      test: (r, o) => {
        var i, s;
        let a = { value: r }, c = typeof (o == null ? void 0 : o.coercions) < "u" ? G(a, "value") : void 0, u = typeof (o == null ? void 0 : o.coercions) < "u" ? [] : void 0;
        if (!e(r, Object.assign(Object.assign({}, o), { coercion: c, coercions: u })))
          return !1;
        let l = [];
        if (typeof u < "u")
          for (let [, d] of u)
            l.push(d());
        try {
          if (typeof (o == null ? void 0 : o.coercions) < "u") {
            if (a.value !== r) {
              if (typeof (o == null ? void 0 : o.coercion) > "u")
                return m(o, "Unbound coercion result");
              o.coercions.push([(i = o.p) !== null && i !== void 0 ? i : ".", o.coercion.bind(null, a.value)]);
            }
            (s = o == null ? void 0 : o.coercions) === null || s === void 0 || s.push(...u);
          }
          return n.every((d) => d(a.value, o));
        } finally {
          for (let d of l)
            d();
        }
      }
    });
  }
  function Li(e, ...t) {
    let n = Array.isArray(t[0]) ? t[0] : t;
    return dn(e, n);
  }
  function qi(e) {
    return x({
      test: (t, n) => typeof t > "u" ? !0 : e(t, n)
    });
  }
  function Gi(e) {
    return x({
      test: (t, n) => t === null ? !0 : e(t, n)
    });
  }
  function Bi(e) {
    let t = new Set(e);
    return x({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) || i.push(s);
        return i.length > 0 ? m(r, `Missing required ${at(i.length, "property", "properties")} ${ue(i, "and")}`) : !0;
      }
    });
  }
  function Fi(e) {
    let t = new Set(e);
    return x({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) && i.push(s);
        return i.length > 0 ? m(r, `Forbidden ${at(i.length, "property", "properties")} ${ue(i, "and")}`) : !0;
      }
    });
  }
  function Vi(e) {
    let t = new Set(e);
    return x({
      test: (n, r) => {
        let o = new Set(Object.keys(n)), i = [];
        for (let s of t)
          o.has(s) && i.push(s);
        return i.length > 1 ? m(r, `Mutually exclusive properties ${ue(i, "and")}`) : !0;
      }
    });
  }
  (function(e) {
    e.Forbids = "Forbids", e.Requires = "Requires";
  })(h.KeyRelationship || (h.KeyRelationship = {}));
  var Hi = {
    [h.KeyRelationship.Forbids]: {
      expect: !1,
      message: "forbids using"
    },
    [h.KeyRelationship.Requires]: {
      expect: !0,
      message: "requires using"
    }
  };
  function Xi(e, t, n, { ignore: r = [] } = {}) {
    let o = new Set(r), i = new Set(n), s = Hi[t], a = t === h.KeyRelationship.Forbids ? "or" : "and";
    return x({
      test: (c, u) => {
        let l = new Set(Object.keys(c));
        if (!l.has(e) || o.has(c[e]))
          return !0;
        let d = [];
        for (let f of i)
          (l.has(f) && !o.has(c[f])) !== s.expect && d.push(f);
        return d.length >= 1 ? m(u, `Property "${e}" ${s.message} ${at(d.length, "property", "properties")} ${ue(d, a)}`) : !0;
      }
    });
  }
  h.TypeAssertionError = H;
  h.applyCascade = Li;
  h.as = xi;
  h.assert = gi;
  h.assertWithErrors = yi;
  h.cascade = dn;
  h.fn = Ei;
  h.hasExactLength = ln;
  h.hasForbiddenKeys = Fi;
  h.hasKeyRelationship = Xi;
  h.hasMaxLength = vi;
  h.hasMinLength = Oi;
  h.hasMutuallyExclusiveKeys = Vi;
  h.hasRequiredKeys = Bi;
  h.hasUniqueItems = Si;
  h.isArray = _e;
  h.isAtLeast = Ni;
  h.isAtMost = $i;
  h.isBase64 = Mi;
  h.isBoolean = ai;
  h.isDate = ui;
  h.isDict = fi;
  h.isEnum = ii;
  h.isHexColor = Di;
  h.isISO8601 = ki;
  h.isInExclusiveRange = Ii;
  h.isInInclusiveRange = Ci;
  h.isInstanceOf = hi;
  h.isInteger = Pi;
  h.isJSON = Ui;
  h.isLiteral = sn;
  h.isLowerCase = Ri;
  h.isMap = di;
  h.isNegative = wi;
  h.isNullable = Gi;
  h.isNumber = ci;
  h.isObject = cn;
  h.isOneOf = mi;
  h.isOptional = qi;
  h.isPartial = pi;
  h.isPositive = _i;
  h.isRecord = $e;
  h.isSet = li;
  h.isString = an;
  h.isTuple = Ne;
  h.isUUID4 = Ti;
  h.isUnknown = ct;
  h.isUpperCase = ji;
  h.makeTrait = un;
  h.makeValidator = x;
  h.matchesRegExp = Ai;
  h.softAssert = bi;
});

// node_modules/clipanion/lib/advanced/Command.js
var z = E((ut) => {
  "use strict";
  Object.defineProperty(ut, "__esModule", { value: !0 });
  var pn = q();
  function Wi(e) {
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
  var le = class {
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
          return /* @__PURE__ */ Wi(fn());
        }), a = s(o(i()), n), c = [], u = [];
        if (!a(this, { errors: c, coercions: u }))
          throw pn.formatError("Invalid option schema", c);
        for (let [, d] of u)
          d();
      } else if (n != null)
        throw new Error("Invalid command schema");
      let r = await this.execute();
      return typeof r < "u" ? r : 0;
    }
  };
  le.isOption = pn.isOptionSymbol;
  le.Default = [];
  ut.Command = le;
});

// node_modules/clipanion/lib/core.js
var Re = E((w) => {
  "use strict";
  Object.defineProperty(w, "__esModule", { value: !0 });
  var y = Se(), Pe = we();
  function P(e) {
    y.DEBUG && console.log(e);
  }
  var hn = {
    candidateUsage: null,
    requiredOptions: [],
    errorMessage: null,
    ignoreOptions: !1,
    path: [],
    positionals: [],
    options: [],
    remainder: null,
    selectedIndex: y.HELP_COMMAND_INDEX
  };
  function lt() {
    return {
      nodes: [I(), I(), I()]
    };
  }
  function mn(e) {
    let t = lt(), n = [], r = t.nodes.length;
    for (let o of e) {
      n.push(r);
      for (let i = 0; i < o.nodes.length; ++i)
        ft(i) || t.nodes.push(vn(o.nodes[i], r));
      r += o.nodes.length - 2;
    }
    for (let o of n)
      K(t, y.NODE_INITIAL, o);
    return t;
  }
  function k(e, t) {
    return e.nodes.push(t), e.nodes.length - 1;
  }
  function gn(e) {
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
          for (let d of u)
            l.some(({ to: f }) => d.to === f) || l.push(d);
        }
        for (let [c, u] of a.dynamics)
          o.dynamics.some(([l, { to: d }]) => c === l && u.to === d) || o.dynamics.push([c, u]);
        for (let c of a.shortcuts)
          i.has(c.to) || (o.shortcuts.push(c), i.add(c.to));
      }
    };
    n(y.NODE_INITIAL);
  }
  function yn(e, { prefix: t = "" } = {}) {
    if (y.DEBUG) {
      P(`${t}Nodes are:`);
      for (let n = 0; n < e.nodes.length; ++n)
        P(`${t}  ${n}: ${JSON.stringify(e.nodes[n])}`);
    }
  }
  function dt(e, t, n = !1) {
    P(`Running a vm on ${JSON.stringify(t)}`);
    let r = [{ node: y.NODE_INITIAL, state: {
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
    yn(e, { prefix: "  " });
    let o = [y.START_OF_INPUT, ...t];
    for (let i = 0; i < o.length; ++i) {
      let s = o[i];
      P(`  Processing ${JSON.stringify(s)}`);
      let a = [];
      for (let { node: c, state: u } of r) {
        P(`    Current node is ${c}`);
        let l = e.nodes[c];
        if (c === y.NODE_ERRORED) {
          a.push({ node: c, state: u });
          continue;
        }
        console.assert(l.shortcuts.length === 0, "Shortcuts should have been eliminated by now");
        let d = Object.prototype.hasOwnProperty.call(l.statics, s);
        if (!n || i < o.length - 1 || d)
          if (d) {
            let f = l.statics[s];
            for (let { to: p, reducer: g } of f)
              a.push({ node: p, state: typeof g < "u" ? de(Ie, g, u, s) : u }), P(`      Static transition to ${p} found`);
          } else
            P("      No static transition found");
        else {
          let f = !1;
          for (let p of Object.keys(l.statics))
            if (!!p.startsWith(s)) {
              if (s === p)
                for (let { to: g, reducer: O } of l.statics[p])
                  a.push({ node: g, state: typeof O < "u" ? de(Ie, O, u, s) : u }), P(`      Static transition to ${g} found`);
              else
                for (let { to: g } of l.statics[p])
                  a.push({ node: g, state: v(b({}, u), { remainder: p.slice(s.length) }) }), P(`      Static transition to ${g} found (partial match)`);
              f = !0;
            }
          f || P("      No partial static transition found");
        }
        if (s !== y.END_OF_INPUT)
          for (let [f, { to: p, reducer: g }] of l.dynamics)
            de(fe, f, u, s) && (a.push({ node: p, state: typeof g < "u" ? de(Ie, g, u, s) : u }), P(`      Dynamic transition to ${p} found (via ${f})`));
      }
      if (a.length === 0 && s === y.END_OF_INPUT && t.length === 1)
        return [{
          node: y.NODE_INITIAL,
          state: hn
        }];
      if (a.length === 0)
        throw new Pe.UnknownSyntaxError(t, r.filter(({ node: c }) => c !== y.NODE_ERRORED).map(({ state: c }) => ({ usage: c.candidateUsage, reason: null })));
      if (a.every(({ node: c }) => c === y.NODE_ERRORED))
        throw new Pe.UnknownSyntaxError(t, a.map(({ state: c }) => ({ usage: c.candidateUsage, reason: c.errorMessage })));
      r = bn(a);
    }
    if (r.length > 0) {
      P("  Results:");
      for (let i of r)
        P(`    - ${i.node} -> ${JSON.stringify(i.state)}`);
    } else
      P("  No results");
    return r;
  }
  function zi(e, t) {
    if (t.selectedIndex !== null)
      return !0;
    if (Object.prototype.hasOwnProperty.call(e.statics, y.END_OF_INPUT)) {
      for (let { to: n } of e.statics[y.END_OF_INPUT])
        if (n === y.NODE_SUCCESS)
          return !0;
    }
    return !1;
  }
  function Ki(e, t, n) {
    let r = n && t.length > 0 ? [""] : [], o = dt(e, t, n), i = [], s = /* @__PURE__ */ new Set(), a = (c, u, l = !0) => {
      let d = [u];
      for (; d.length > 0; ) {
        let p = d;
        d = [];
        for (let g of p) {
          let O = e.nodes[g], A = Object.keys(O.statics);
          for (let X of Object.keys(O.statics)) {
            let W = A[0];
            for (let { to: Je, reducer: Oe } of O.statics[W])
              Oe === "pushPath" && (l || c.push(W), d.push(Je));
          }
        }
        l = !1;
      }
      let f = JSON.stringify(c);
      s.has(f) || (i.push(c), s.add(f));
    };
    for (let { node: c, state: u } of o) {
      if (u.remainder !== null) {
        a([u.remainder], c);
        continue;
      }
      let l = e.nodes[c], d = zi(l, u);
      for (let [f, p] of Object.entries(l.statics))
        (d && f !== y.END_OF_INPUT || !f.startsWith("-") && p.some(({ reducer: g }) => g === "pushPath")) && a([...r, f], c);
      if (!!d)
        for (let [f, { to: p }] of l.dynamics) {
          if (p === y.NODE_ERRORED)
            continue;
          let g = Sn(f, u);
          if (g !== null)
            for (let O of g)
              a([...r, O], c);
        }
    }
    return [...i].sort();
  }
  function Ji(e, t) {
    let n = dt(e, [...t, y.END_OF_INPUT]);
    return xn(t, n.map(({ state: r }) => r));
  }
  function bn(e) {
    let t = 0;
    for (let { state: n } of e)
      n.path.length > t && (t = n.path.length);
    return e.filter(({ state: n }) => n.path.length === t);
  }
  function xn(e, t) {
    let n = t.filter((d) => d.selectedIndex !== null);
    if (n.length === 0)
      throw new Error();
    let r = n.filter((d) => d.requiredOptions.every((f) => f.some((p) => d.options.find((g) => g.name === p))));
    if (r.length === 0)
      throw new Pe.UnknownSyntaxError(e, n.map((d) => ({
        usage: d.candidateUsage,
        reason: null
      })));
    let o = 0;
    for (let d of r)
      d.path.length > o && (o = d.path.length);
    let i = r.filter((d) => d.path.length === o), s = (d) => d.positionals.filter(({ extra: f }) => !f).length + d.options.length, a = i.map((d) => ({ state: d, positionalCount: s(d) })), c = 0;
    for (let { positionalCount: d } of a)
      d > c && (c = d);
    let u = a.filter(({ positionalCount: d }) => d === c).map(({ state: d }) => d), l = En(u);
    if (l.length > 1)
      throw new Pe.AmbiguousSyntaxError(e, l.map((d) => d.candidateUsage));
    return l[0];
  }
  function En(e) {
    let t = [], n = [];
    for (let r of e)
      r.selectedIndex === y.HELP_COMMAND_INDEX ? n.push(r) : t.push(r);
    return n.length > 0 && t.push(v(b({}, hn), {
      path: On(...n.map((r) => r.path)),
      options: n.reduce((r, o) => r.concat(o.options), [])
    })), t;
  }
  function On(e, t, ...n) {
    return t === void 0 ? Array.from(e) : On(e.filter((r, o) => r === t[o]), ...n);
  }
  function I() {
    return {
      dynamics: [],
      shortcuts: [],
      statics: {}
    };
  }
  function ft(e) {
    return e === y.NODE_SUCCESS || e === y.NODE_ERRORED;
  }
  function Ce(e, t = 0) {
    return {
      to: ft(e.to) ? e.to : e.to > 2 ? e.to + t - 2 : e.to + t,
      reducer: e.reducer
    };
  }
  function vn(e, t = 0) {
    let n = I();
    for (let [r, o] of e.dynamics)
      n.dynamics.push([r, Ce(o, t)]);
    for (let r of e.shortcuts)
      n.shortcuts.push(Ce(r, t));
    for (let [r, o] of Object.entries(e.statics))
      n.statics[r] = o.map((i) => Ce(i, t));
    return n;
  }
  function N(e, t, n, r, o) {
    e.nodes[t].dynamics.push([
      n,
      { to: r, reducer: o }
    ]);
  }
  function K(e, t, n, r) {
    e.nodes[t].shortcuts.push({ to: n, reducer: r });
  }
  function M(e, t, n, r, o) {
    (Object.prototype.hasOwnProperty.call(e.nodes[t].statics, n) ? e.nodes[t].statics[n] : e.nodes[t].statics[n] = []).push({ to: r, reducer: o });
  }
  function de(e, t, n, r) {
    if (Array.isArray(t)) {
      let [o, ...i] = t;
      return e[o](n, r, ...i);
    } else
      return e[t](n, r);
  }
  function Sn(e, t) {
    let n = Array.isArray(e) ? fe[e[0]] : fe[e];
    if (typeof n.suggest > "u")
      return null;
    let r = Array.isArray(e) ? e.slice(1) : [];
    return n.suggest(t, ...r);
  }
  var fe = {
    always: () => !0,
    isOptionLike: (e, t) => !e.ignoreOptions && t !== "-" && t.startsWith("-"),
    isNotOptionLike: (e, t) => e.ignoreOptions || t === "-" || !t.startsWith("-"),
    isOption: (e, t, n, r) => !e.ignoreOptions && t === n,
    isBatchOption: (e, t, n) => !e.ignoreOptions && y.BATCH_REGEX.test(t) && [...t.slice(1)].every((r) => n.includes(`-${r}`)),
    isBoundOption: (e, t, n, r) => {
      let o = t.match(y.BINDING_REGEX);
      return !e.ignoreOptions && !!o && y.OPTION_REGEX.test(o[1]) && n.includes(o[1]) && r.filter((i) => i.names.includes(o[1])).every((i) => i.allowBinding);
    },
    isNegatedOption: (e, t, n) => !e.ignoreOptions && t === `--no-${n.slice(2)}`,
    isHelp: (e, t) => !e.ignoreOptions && y.HELP_REGEX.test(t),
    isUnsupportedOption: (e, t, n) => !e.ignoreOptions && t.startsWith("-") && y.OPTION_REGEX.test(t) && !n.includes(t),
    isInvalidOption: (e, t) => !e.ignoreOptions && t.startsWith("-") && !y.OPTION_REGEX.test(t)
  };
  fe.isOption.suggest = (e, t, n = !0) => n ? null : [t];
  var Ie = {
    setCandidateState: (e, t, n) => b(b({}, e), n),
    setSelectedIndex: (e, t, n) => v(b({}, e), { selectedIndex: n }),
    pushBatch: (e, t) => v(b({}, e), { options: e.options.concat([...t.slice(1)].map((n) => ({ name: `-${n}`, value: !0 }))) }),
    pushBound: (e, t) => {
      let [, n, r] = t.match(y.BINDING_REGEX);
      return v(b({}, e), { options: e.options.concat({ name: n, value: r }) });
    },
    pushPath: (e, t) => v(b({}, e), { path: e.path.concat(t) }),
    pushPositional: (e, t) => v(b({}, e), { positionals: e.positionals.concat({ value: t, extra: !1 }) }),
    pushExtra: (e, t) => v(b({}, e), { positionals: e.positionals.concat({ value: t, extra: !0 }) }),
    pushExtraNoLimits: (e, t) => v(b({}, e), { positionals: e.positionals.concat({ value: t, extra: U }) }),
    pushTrue: (e, t, n = t) => v(b({}, e), { options: e.options.concat({ name: t, value: !0 }) }),
    pushFalse: (e, t, n = t) => v(b({}, e), { options: e.options.concat({ name: n, value: !1 }) }),
    pushUndefined: (e, t) => v(b({}, e), { options: e.options.concat({ name: t, value: void 0 }) }),
    pushStringValue: (e, t) => {
      var n;
      let r = v(b({}, e), { options: [...e.options] }), o = e.options[e.options.length - 1];
      return o.value = ((n = o.value) !== null && n !== void 0 ? n : []).concat([t]), r;
    },
    setStringValue: (e, t) => {
      let n = v(b({}, e), { options: [...e.options] }), r = e.options[e.options.length - 1];
      return r.value = t, n;
    },
    inhibateOptions: (e) => v(b({}, e), { ignoreOptions: !0 }),
    useHelp: (e, t, n) => {
      let [, , r] = t.match(y.HELP_REGEX);
      return typeof r < "u" ? v(b({}, e), { options: [{ name: "-c", value: String(n) }, { name: "-i", value: r }] }) : v(b({}, e), { options: [{ name: "-c", value: String(n) }] });
    },
    setError: (e, t, n) => t === y.END_OF_INPUT ? v(b({}, e), { errorMessage: `${n}.` }) : v(b({}, e), { errorMessage: `${n} ("${t}").` }),
    setOptionArityError: (e, t) => {
      let n = e.options[e.options.length - 1];
      return v(b({}, e), { errorMessage: `Not enough arguments to option ${n.name}.` });
    }
  }, U = Symbol(), Ae = class {
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
      if (!n && this.arity.extra === U)
        throw new Error("Optional parameters cannot be declared when using .rest() or .proxy()");
      if (!n && this.arity.trailing.length > 0)
        throw new Error("Optional parameters cannot be declared after the required trailing positional arguments");
      !n && this.arity.extra !== U ? this.arity.extra.push(t) : this.arity.extra !== U && this.arity.extra.length === 0 ? this.arity.leading.push(t) : this.arity.trailing.push(t);
    }
    addRest({ name: t = "arg", required: n = 0 } = {}) {
      if (this.arity.extra === U)
        throw new Error("Infinite lists cannot be declared multiple times in the same command");
      if (this.arity.trailing.length > 0)
        throw new Error("Infinite lists cannot be declared after the required trailing positional arguments");
      for (let r = 0; r < n; ++r)
        this.addPositional({ name: t });
      this.arity.extra = U;
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
          let d = [];
          for (let p = 0; p < a; ++p)
            d.push(` #${p}`);
          let f = `${s.join(",")}${d.join("")}`;
          !n && u ? o.push({ definition: f, description: u, required: l }) : r.push(l ? `<${f}>` : `[${f}]`);
        }
        r.push(...this.arity.leading.map((s) => `<${s}>`)), this.arity.extra === U ? r.push("...") : r.push(...this.arity.extra.map((s) => `[${s}]`)), r.push(...this.arity.trailing.map((s) => `<${s}>`));
      }
      return { usage: r.join(" "), options: o };
    }
    compile() {
      if (typeof this.context > "u")
        throw new Error("Assertion failed: No context attached");
      let t = lt(), n = y.NODE_INITIAL, r = this.usage().usage, o = this.options.filter((a) => a.required).map((a) => a.names);
      n = k(t, I()), M(t, y.NODE_INITIAL, y.START_OF_INPUT, n, ["setCandidateState", { candidateUsage: r, requiredOptions: o }]);
      let i = this.arity.proxy ? "always" : "isNotOptionLike", s = this.paths.length > 0 ? this.paths : [[]];
      for (let a of s) {
        let c = n;
        if (a.length > 0) {
          let f = k(t, I());
          K(t, c, f), this.registerOptions(t, f), c = f;
        }
        for (let f = 0; f < a.length; ++f) {
          let p = k(t, I());
          M(t, c, a[f], p, "pushPath"), c = p;
        }
        if (this.arity.leading.length > 0 || !this.arity.proxy) {
          let f = k(t, I());
          N(t, c, "isHelp", f, ["useHelp", this.cliIndex]), M(t, f, y.END_OF_INPUT, y.NODE_SUCCESS, ["setSelectedIndex", y.HELP_COMMAND_INDEX]), this.registerOptions(t, c);
        }
        this.arity.leading.length > 0 && M(t, c, y.END_OF_INPUT, y.NODE_ERRORED, ["setError", "Not enough positional arguments"]);
        let u = c;
        for (let f = 0; f < this.arity.leading.length; ++f) {
          let p = k(t, I());
          (!this.arity.proxy || f + 1 !== this.arity.leading.length) && this.registerOptions(t, p), (this.arity.trailing.length > 0 || f + 1 !== this.arity.leading.length) && M(t, p, y.END_OF_INPUT, y.NODE_ERRORED, ["setError", "Not enough positional arguments"]), N(t, u, "isNotOptionLike", p, "pushPositional"), u = p;
        }
        let l = u;
        if (this.arity.extra === U || this.arity.extra.length > 0) {
          let f = k(t, I());
          if (K(t, u, f), this.arity.extra === U) {
            let p = k(t, I());
            this.arity.proxy || this.registerOptions(t, p), N(t, u, i, p, "pushExtraNoLimits"), N(t, p, i, p, "pushExtraNoLimits"), K(t, p, f);
          } else
            for (let p = 0; p < this.arity.extra.length; ++p) {
              let g = k(t, I());
              (!this.arity.proxy || p > 0) && this.registerOptions(t, g), N(t, l, i, g, "pushExtra"), K(t, g, f), l = g;
            }
          l = f;
        }
        this.arity.trailing.length > 0 && M(t, l, y.END_OF_INPUT, y.NODE_ERRORED, ["setError", "Not enough positional arguments"]);
        let d = l;
        for (let f = 0; f < this.arity.trailing.length; ++f) {
          let p = k(t, I());
          this.arity.proxy || this.registerOptions(t, p), f + 1 < this.arity.trailing.length && M(t, p, y.END_OF_INPUT, y.NODE_ERRORED, ["setError", "Not enough positional arguments"]), N(t, d, "isNotOptionLike", p, "pushPositional"), d = p;
        }
        N(t, d, i, y.NODE_ERRORED, ["setError", "Extraneous positional argument"]), M(t, d, y.END_OF_INPUT, y.NODE_SUCCESS, ["setSelectedIndex", this.cliIndex]);
      }
      return {
        machine: t,
        context: this.context
      };
    }
    registerOptions(t, n) {
      N(t, n, ["isOption", "--"], n, "inhibateOptions"), N(t, n, ["isBatchOption", this.allOptionNames], n, "pushBatch"), N(t, n, ["isBoundOption", this.allOptionNames, this.options], n, "pushBound"), N(t, n, ["isUnsupportedOption", this.allOptionNames], y.NODE_ERRORED, ["setError", "Unsupported option name"]), N(t, n, ["isInvalidOption"], y.NODE_ERRORED, ["setError", "Invalid option name"]);
      for (let r of this.options) {
        let o = r.names.reduce((i, s) => s.length > i.length ? s : i, "");
        if (r.arity === 0)
          for (let i of r.names)
            N(t, n, ["isOption", i, r.hidden || i !== o], n, "pushTrue"), i.startsWith("--") && !i.startsWith("--no-") && N(t, n, ["isNegatedOption", i], n, ["pushFalse", i]);
        else {
          let i = k(t, I());
          for (let s of r.names)
            N(t, n, ["isOption", s, r.hidden || s !== o], i, "pushUndefined");
          for (let s = 0; s < r.arity; ++s) {
            let a = k(t, I());
            M(t, i, y.END_OF_INPUT, y.NODE_ERRORED, "setOptionArityError"), N(t, i, "isOptionLike", y.NODE_ERRORED, "setOptionArityError");
            let c = r.arity === 1 ? "setStringValue" : "pushStringValue";
            N(t, i, "isNotOptionLike", a, c), i = a;
          }
          K(t, i, n);
        }
      }
    }
  }, pe = class {
    constructor({ binaryName: t = "..." } = {}) {
      this.builders = [], this.opts = { binaryName: t };
    }
    static build(t, n = {}) {
      return new pe(n).commands(t).compile();
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
      let t = new Ae(this.builders.length, this.opts);
      return this.builders.push(t), t;
    }
    compile() {
      let t = [], n = [];
      for (let o of this.builders) {
        let { machine: i, context: s } = o.compile();
        t.push(i), n.push(s);
      }
      let r = mn(t);
      return gn(r), {
        machine: r,
        contexts: n,
        process: (o) => Ji(r, o),
        suggest: (o, i) => Ki(r, o, i)
      };
    }
  };
  w.CliBuilder = pe;
  w.CommandBuilder = Ae;
  w.NoLimits = U;
  w.aggregateHelpStates = En;
  w.cloneNode = vn;
  w.cloneTransition = Ce;
  w.debug = P;
  w.debugMachine = yn;
  w.execute = de;
  w.injectNode = k;
  w.isTerminalNode = ft;
  w.makeAnyOfMachine = mn;
  w.makeNode = I;
  w.makeStateMachine = lt;
  w.reducers = Ie;
  w.registerDynamic = N;
  w.registerShortcut = K;
  w.registerStatic = M;
  w.runMachineInternal = dt;
  w.selectBestState = xn;
  w.simplifyMachine = gn;
  w.suggest = Sn;
  w.tests = fe;
  w.trimSmallerBranches = bn;
});

// node_modules/clipanion/lib/platform/node.js
var _n = E((je) => {
  "use strict";
  Object.defineProperty(je, "__esModule", { value: !0 });
  var Yi = C("tty");
  function Zi(e) {
    return e && typeof e == "object" && "default" in e ? e : { default: e };
  }
  var pt = /* @__PURE__ */ Zi(Yi);
  function Qi() {
    return pt.default && "getColorDepth" in pt.default.WriteStream.prototype ? pt.default.WriteStream.prototype.getColorDepth() : process.env.FORCE_COLOR === "0" ? 1 : process.env.FORCE_COLOR === "1" || typeof process.stdout < "u" && process.stdout.isTTY ? 8 : 1;
  }
  var wn;
  function es(e) {
    let t = wn;
    if (typeof t > "u") {
      if (e.stdout === process.stdout && e.stderr === process.stderr)
        return null;
      let { AsyncLocalStorage: n } = C("async_hooks");
      t = wn = new n();
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
  je.getCaptureActivator = es;
  je.getDefaultColorDepth = Qi;
});

// node_modules/clipanion/lib/advanced/HelpCommand.js
var Nn = E((ht) => {
  "use strict";
  Object.defineProperty(ht, "__esModule", { value: !0 });
  var ts = z(), he = class extends ts.Command {
    constructor(t) {
      super(), this.contexts = t, this.commands = [];
    }
    static from(t, n) {
      let r = new he(n);
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
  ht.HelpCommand = he;
});

// node_modules/clipanion/lib/advanced/Cli.js
var An = E((me) => {
  "use strict";
  Object.defineProperty(me, "__esModule", { value: !0 });
  var ns = Se(), rs = Re(), T = it(), In = _n(), Te = z(), os = Nn(), $n = Symbol("clipanion/errorCommand");
  async function is(...e) {
    let { resolvedOptions: t, resolvedCommandClasses: n, resolvedArgv: r, resolvedContext: o } = Pn(e);
    return D.from(n, t).runExit(r, o);
  }
  async function ss(...e) {
    let { resolvedOptions: t, resolvedCommandClasses: n, resolvedArgv: r, resolvedContext: o } = Pn(e);
    return D.from(n, t).run(r, o);
  }
  function Pn(e) {
    let t, n, r, o;
    switch (typeof process < "u" && typeof process.argv < "u" && (r = process.argv.slice(2)), e.length) {
      case 1:
        n = e[0];
        break;
      case 2:
        e[0] && e[0].prototype instanceof Te.Command || Array.isArray(e[0]) ? (n = e[0], Array.isArray(e[1]) ? r = e[1] : o = e[1]) : (t = e[0], n = e[1]);
        break;
      case 3:
        Array.isArray(e[2]) ? (t = e[0], n = e[1], r = e[2]) : e[0] && e[0].prototype instanceof Te.Command || Array.isArray(e[0]) ? (n = e[0], r = e[1], o = e[2]) : (t = e[0], n = e[1], o = e[2]);
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
  var D = class {
    constructor({ binaryLabel: t, binaryName: n = "...", binaryVersion: r, enableCapture: o = !1, enableColors: i } = {}) {
      this.registrations = /* @__PURE__ */ new Map(), this.builder = new rs.CliBuilder({ binaryName: n }), this.binaryLabel = t, this.binaryName = n, this.binaryVersion = r, this.enableCapture = o, this.enableColors = i;
    }
    static from(t, n = {}) {
      let r = new D(n), o = Array.isArray(t) ? t : [t];
      for (let i of o)
        r.register(i);
      return r;
    }
    register(t) {
      var n;
      let r = /* @__PURE__ */ new Map(), o = new t();
      for (let c in o) {
        let u = o[c];
        typeof u == "object" && u !== null && u[Te.Command.isOption] && r.set(c, u);
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
      let { contexts: r, process: o } = this.builder.compile(), i = o(t), s = b(b({}, D.defaultContext), n);
      switch (i.selectedIndex) {
        case ns.HELP_COMMAND_INDEX: {
          let a = os.HelpCommand.from(i, r);
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
              for (let [l, { transformer: d }] of c.specs.entries())
                u[l] = d(c.builder, l, i, s);
              return u;
            } catch (l) {
              throw l[$n] = u, l;
            }
          }
          break;
      }
    }
    async run(t, n) {
      var r, o;
      let i, s = b(b({}, D.defaultContext), n), a = (r = this.enableColors) !== null && r !== void 0 ? r : s.colorDepth > 1;
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
        error: (l, d) => this.error(l, d),
        format: (l) => this.format(l),
        process: (l, d) => this.process(l, b(b({}, s), d)),
        run: (l, d) => this.run(l, b(b({}, s), d)),
        usage: (l, d) => this.usage(l, d)
      };
      let c = this.enableCapture && (o = In.getCaptureActivator(s)) !== null && o !== void 0 ? o : Cn, u;
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
        let { usage: i } = this.getUsageByIndex(o, { detailed: !1 }), { usage: s, options: a } = this.getUsageByIndex(o, { detailed: !0, inlineOptions: !1 }), c = typeof r.usage.category < "u" ? T.formatMarkdownish(r.usage.category, { format: this.format(t), paragraphs: !1 }) : void 0, u = typeof r.usage.description < "u" ? T.formatMarkdownish(r.usage.description, { format: this.format(t), paragraphs: !1 }) : void 0, l = typeof r.usage.details < "u" ? T.formatMarkdownish(r.usage.details, { format: this.format(t), paragraphs: !0 }) : void 0, d = typeof r.usage.examples < "u" ? r.usage.examples.map(([f, p]) => [T.formatMarkdownish(f, { format: this.format(t), paragraphs: !1 }), p.replace(/\$0/g, this.binaryName)]) : void 0;
        n.push({ path: i, usage: s, category: c, description: u, details: l, examples: d, options: a });
      }
      return n;
    }
    usage(t = null, { colored: n, detailed: r = !1, prefix: o = "$ " } = {}) {
      var i;
      if (t === null) {
        for (let c of this.registrations.keys()) {
          let u = c.paths, l = typeof c.usage < "u";
          if (!u || u.length === 0 || u.length === 1 && u[0].length === 0 || ((i = u == null ? void 0 : u.some((p) => p.length === 0)) !== null && i !== void 0 ? i : !1))
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
      let s = t !== null && t instanceof Te.Command ? t.constructor : t, a = "";
      if (s)
        if (r) {
          let { description: c = "", details: u = "", examples: l = [] } = s.usage || {};
          c !== "" && (a += T.formatMarkdownish(c, { format: this.format(n), paragraphs: !1 }).replace(/^./, (p) => p.toUpperCase()), a += `
`), (u !== "" || l.length > 0) && (a += `${this.format(n).header("Usage")}
`, a += `
`);
          let { usage: d, options: f } = this.getUsageByRegistration(s, { inlineOptions: !1 });
          if (a += `${this.format(n).bold(o)}${d}
`, f.length > 0) {
            a += `
`, a += `${this.format(n).header("Options")}
`;
            let p = f.reduce((g, O) => Math.max(g, O.definition.length), 0);
            a += `
`;
            for (let { definition: g, description: O } of f)
              a += `  ${this.format(n).bold(g.padEnd(p))}    ${T.formatMarkdownish(O, { format: this.format(n), paragraphs: !1 })}`;
          }
          if (u !== "" && (a += `
`, a += `${this.format(n).header("Details")}
`, a += `
`, a += T.formatMarkdownish(u, { format: this.format(n), paragraphs: !0 })), l.length > 0) {
            a += `
`, a += `${this.format(n).header("Examples")}
`;
            for (let [p, g] of l)
              a += `
`, a += T.formatMarkdownish(p, { format: this.format(n), paragraphs: !1 }), a += `${g.replace(/^/m, `  ${this.format(n).bold(o)}`).replace(/\$0/g, this.binaryName)}
`;
          }
        } else {
          let { usage: c } = this.getUsageByRegistration(s);
          a += `${this.format(n).bold(o)}${c}
`;
        }
      else {
        let c = /* @__PURE__ */ new Map();
        for (let [f, { index: p }] of this.registrations.entries()) {
          if (typeof f.usage > "u")
            continue;
          let g = typeof f.usage.category < "u" ? T.formatMarkdownish(f.usage.category, { format: this.format(n), paragraphs: !1 }) : null, O = c.get(g);
          typeof O > "u" && c.set(g, O = []);
          let { usage: A } = this.getUsageByIndex(p);
          O.push({ commandClass: f, usage: A });
        }
        let u = Array.from(c.keys()).sort((f, p) => f === null ? -1 : p === null ? 1 : f.localeCompare(p, "en", { usage: "sort", caseFirst: "upper" })), l = typeof this.binaryLabel < "u", d = typeof this.binaryVersion < "u";
        l || d ? (l && d ? a += `${this.format(n).header(`${this.binaryLabel} - ${this.binaryVersion}`)}

` : l ? a += `${this.format(n).header(`${this.binaryLabel}`)}
` : a += `${this.format(n).header(`${this.binaryVersion}`)}
`, a += `  ${this.format(n).bold(o)}${this.binaryName} <command>
`) : a += `${this.format(n).bold(o)}${this.binaryName} <command>
`;
        for (let f of u) {
          let p = c.get(f).slice().sort((O, A) => O.usage.localeCompare(A.usage, "en", { usage: "sort", caseFirst: "upper" })), g = f !== null ? f.trim() : "General commands";
          a += `
`, a += `${this.format(n).header(`${g}`)}
`;
          for (let { commandClass: O, usage: A } of p) {
            let X = O.usage.description || "undocumented";
            a += `
`, a += `  ${this.format(n).bold(A)}
`, a += `    ${T.formatMarkdownish(X, { format: this.format(n), paragraphs: !1 })}`;
          }
        }
        a += `
`, a += T.formatMarkdownish("You can also print more details about any of these commands by calling them with the `-h,--help` flag right after the command name.", { format: this.format(n), paragraphs: !0 });
      }
      return a;
    }
    error(t, n) {
      var r, { colored: o, command: i = (r = t[$n]) !== null && r !== void 0 ? r : null } = n === void 0 ? {} : n;
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
      return ((n = t ?? this.enableColors) !== null && n !== void 0 ? n : D.defaultContext.colorDepth > 1) ? T.richFormat : T.textFormat;
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
  D.defaultContext = {
    env: process.env,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    colorDepth: In.getDefaultColorDepth()
  };
  function Cn(e) {
    return e();
  }
  me.Cli = D;
  me.run = ss;
  me.runExit = is;
});

// node_modules/clipanion/lib/advanced/builtins/definitions.js
var Rn = E((mt) => {
  "use strict";
  Object.defineProperty(mt, "__esModule", { value: !0 });
  var as = z(), ke = class extends as.Command {
    async execute() {
      this.context.stdout.write(`${JSON.stringify(this.cli.definitions(), null, 2)}
`);
    }
  };
  ke.paths = [["--clipanion=definitions"]];
  mt.DefinitionsCommand = ke;
});

// node_modules/clipanion/lib/advanced/builtins/help.js
var jn = E((gt) => {
  "use strict";
  Object.defineProperty(gt, "__esModule", { value: !0 });
  var cs = z(), De = class extends cs.Command {
    async execute() {
      this.context.stdout.write(this.cli.usage());
    }
  };
  De.paths = [["-h"], ["--help"]];
  gt.HelpCommand = De;
});

// node_modules/clipanion/lib/advanced/builtins/version.js
var Tn = E((yt) => {
  "use strict";
  Object.defineProperty(yt, "__esModule", { value: !0 });
  var us = z(), Me = class extends us.Command {
    async execute() {
      var t;
      this.context.stdout.write(`${(t = this.cli.binaryVersion) !== null && t !== void 0 ? t : "<unknown>"}
`);
    }
  };
  Me.paths = [["-v"], ["--version"]];
  yt.VersionCommand = Me;
});

// node_modules/clipanion/lib/advanced/builtins/index.js
var kn = E((ge) => {
  "use strict";
  Object.defineProperty(ge, "__esModule", { value: !0 });
  var ls = Rn(), ds = jn(), fs = Tn();
  ge.DefinitionsCommand = ls.DefinitionsCommand;
  ge.HelpCommand = ds.HelpCommand;
  ge.VersionCommand = fs.VersionCommand;
});

// node_modules/clipanion/lib/advanced/options/Array.js
var Dn = E((xt) => {
  "use strict";
  Object.defineProperty(xt, "__esModule", { value: !0 });
  var bt = q();
  function ps(e, t, n) {
    let [r, o] = bt.rerouteArguments(t, n ?? {}), { arity: i = 1 } = o, s = e.split(","), a = new Set(s);
    return bt.makeCommandOption({
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
        let d, f = typeof r < "u" ? [...r] : void 0;
        for (let { name: p, value: g } of l.options)
          !a.has(p) || (d = p, f = f ?? [], f.push(g));
        return typeof f < "u" ? bt.applyValidator(d ?? u, f, o.validator) : f;
      }
    });
  }
  xt.Array = ps;
});

// node_modules/clipanion/lib/advanced/options/Boolean.js
var Un = E((Et) => {
  "use strict";
  Object.defineProperty(Et, "__esModule", { value: !0 });
  var Mn = q();
  function hs(e, t, n) {
    let [r, o] = Mn.rerouteArguments(t, n ?? {}), i = e.split(","), s = new Set(i);
    return Mn.makeCommandOption({
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
        for (let { name: d, value: f } of u.options)
          !s.has(d) || (l = f);
        return l;
      }
    });
  }
  Et.Boolean = hs;
});

// node_modules/clipanion/lib/advanced/options/Counter.js
var qn = E((Ot) => {
  "use strict";
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  var Ln = q();
  function ms(e, t, n) {
    let [r, o] = Ln.rerouteArguments(t, n ?? {}), i = e.split(","), s = new Set(i);
    return Ln.makeCommandOption({
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
        for (let { name: d, value: f } of u.options)
          !s.has(d) || (l ?? (l = 0), f ? l += 1 : l = 0);
        return l;
      }
    });
  }
  Ot.Counter = ms;
});

// node_modules/clipanion/lib/advanced/options/Proxy.js
var Gn = E((vt) => {
  "use strict";
  Object.defineProperty(vt, "__esModule", { value: !0 });
  var gs = q();
  function ys(e = {}) {
    return gs.makeCommandOption({
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
  vt.Proxy = ys;
});

// node_modules/clipanion/lib/advanced/options/Rest.js
var Bn = E((St) => {
  "use strict";
  Object.defineProperty(St, "__esModule", { value: !0 });
  var bs = Re(), xs = q();
  function Es(e = {}) {
    return xs.makeCommandOption({
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
          return a.extra === bs.NoLimits || a.extra === !1 && s < t.arity.leading.length;
        }, i = 0;
        for (; i < r.positionals.length && o(i); )
          i += 1;
        return r.positionals.splice(0, i).map(({ value: s }) => s);
      }
    });
  }
  St.Rest = Es;
});

// node_modules/clipanion/lib/advanced/options/String.js
var Fn = E((wt) => {
  "use strict";
  Object.defineProperty(wt, "__esModule", { value: !0 });
  var Os = Re(), ye = q();
  function vs(e, t, n) {
    let [r, o] = ye.rerouteArguments(t, n ?? {}), { arity: i = 1 } = o, s = e.split(","), a = new Set(s);
    return ye.makeCommandOption({
      definition(c) {
        c.addOption({
          names: s,
          arity: o.tolerateBoolean ? 0 : i,
          hidden: o.hidden,
          description: o.description,
          required: o.required
        });
      },
      transformer(c, u, l, d) {
        let f, p = r;
        typeof o.env < "u" && d.env[o.env] && (f = o.env, p = d.env[o.env]);
        for (let { name: g, value: O } of l.options)
          !a.has(g) || (f = g, p = O);
        return typeof p == "string" ? ye.applyValidator(f ?? u, p, o.validator) : p;
      }
    });
  }
  function Ss(e = {}) {
    let { required: t = !0 } = e;
    return ye.makeCommandOption({
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
          if (o.positionals[s].extra === Os.NoLimits || t && o.positionals[s].extra === !0 || !t && o.positionals[s].extra === !1)
            continue;
          let [a] = o.positionals.splice(s, 1);
          return ye.applyValidator((i = e.name) !== null && i !== void 0 ? i : r, a.value, e.validator);
        }
      }
    });
  }
  function ws(e, ...t) {
    return typeof e == "string" ? vs(e, ...t) : Ss(e);
  }
  wt.String = ws;
});

// node_modules/clipanion/lib/advanced/options/index.js
var Vn = E((R) => {
  "use strict";
  Object.defineProperty(R, "__esModule", { value: !0 });
  var Q = q(), _s = Dn(), Ns = Un(), $s = qn(), Cs = Gn(), Is = Bn(), Ps = Fn();
  R.applyValidator = Q.applyValidator;
  R.cleanValidationError = Q.cleanValidationError;
  R.formatError = Q.formatError;
  R.isOptionSymbol = Q.isOptionSymbol;
  R.makeCommandOption = Q.makeCommandOption;
  R.rerouteArguments = Q.rerouteArguments;
  R.Array = _s.Array;
  R.Boolean = Ns.Boolean;
  R.Counter = $s.Counter;
  R.Proxy = Cs.Proxy;
  R.Rest = Is.Rest;
  R.String = Ps.String;
});

// node_modules/clipanion/lib/advanced/index.js
var Hn = E((L) => {
  "use strict";
  Object.defineProperty(L, "__esModule", { value: !0 });
  var As = we(), Rs = it(), js = z(), _t = An(), Ts = kn(), ks = Vn();
  L.UsageError = As.UsageError;
  L.formatMarkdownish = Rs.formatMarkdownish;
  L.Command = js.Command;
  L.Cli = _t.Cli;
  L.run = _t.run;
  L.runExit = _t.runExit;
  L.Builtins = Ts;
  L.Option = ks;
});

// node_modules/isexe/windows.js
var Jn = E((Ic, Kn) => {
  Kn.exports = zn;
  zn.sync = Ms;
  var Xn = C("fs");
  function Ds(e, t) {
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
  function Wn(e, t, n) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : Ds(t, n);
  }
  function zn(e, t, n) {
    Xn.stat(e, function(r, o) {
      n(r, r ? !1 : Wn(o, e, t));
    });
  }
  function Ms(e, t) {
    return Wn(Xn.statSync(e), e, t);
  }
});

// node_modules/isexe/mode.js
var tr = E((Pc, er) => {
  er.exports = Zn;
  Zn.sync = Us;
  var Yn = C("fs");
  function Zn(e, t, n) {
    Yn.stat(e, function(r, o) {
      n(r, r ? !1 : Qn(o, t));
    });
  }
  function Us(e, t) {
    return Qn(Yn.statSync(e), t);
  }
  function Qn(e, t) {
    return e.isFile() && Ls(e, t);
  }
  function Ls(e, t) {
    var n = e.mode, r = e.uid, o = e.gid, i = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(), s = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), l = a | c, d = n & u || n & c && o === s || n & a && r === i || n & l && i === 0;
    return d;
  }
});

// node_modules/isexe/index.js
var rr = E((Rc, nr) => {
  var Ac = C("fs"), Ue;
  process.platform === "win32" || global.TESTING_WINDOWS ? Ue = Jn() : Ue = tr();
  nr.exports = Nt;
  Nt.sync = qs;
  function Nt(e, t, n) {
    if (typeof t == "function" && (n = t, t = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, o) {
        Nt(e, t || {}, function(i, s) {
          i ? o(i) : r(s);
        });
      });
    }
    Ue(e, t || {}, function(r, o) {
      r && (r.code === "EACCES" || t && t.ignoreErrors) && (r = null, o = !1), n(r, o);
    });
  }
  function qs(e, t) {
    try {
      return Ue.sync(e, t || {});
    } catch (n) {
      if (t && t.ignoreErrors || n.code === "EACCES")
        return !1;
      throw n;
    }
  }
});

// node_modules/which/which.js
var lr = E((jc, ur) => {
  var ee = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", or = C("path"), Gs = ee ? ";" : ":", ir = rr(), sr = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), ar = (e, t) => {
    let n = t.colon || Gs, r = e.match(/\//) || ee && e.match(/\\/) ? [""] : [
      ...ee ? [process.cwd()] : [],
      ...(t.path || process.env.PATH || "").split(n)
    ], o = ee ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", i = ee ? o.split(n) : [""];
    return ee && e.indexOf(".") !== -1 && i[0] !== "" && i.unshift(""), {
      pathEnv: r,
      pathExt: i,
      pathExtExe: o
    };
  }, cr = (e, t, n) => {
    typeof t == "function" && (n = t, t = {}), t || (t = {});
    let { pathEnv: r, pathExt: o, pathExtExe: i } = ar(e, t), s = [], a = (u) => new Promise((l, d) => {
      if (u === r.length)
        return t.all && s.length ? l(s) : d(sr(e));
      let f = r[u], p = /^".*"$/.test(f) ? f.slice(1, -1) : f, g = or.join(p, e), O = !p && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + g : g;
      l(c(O, u, 0));
    }), c = (u, l, d) => new Promise((f, p) => {
      if (d === o.length)
        return f(a(l + 1));
      let g = o[d];
      ir(u + g, { pathExt: i }, (O, A) => {
        if (!O && A)
          if (t.all)
            s.push(u + g);
          else
            return f(u + g);
        return f(c(u, l, d + 1));
      });
    });
    return n ? a(0).then((u) => n(null, u), n) : a(0);
  }, Bs = (e, t) => {
    t = t || {};
    let { pathEnv: n, pathExt: r, pathExtExe: o } = ar(e, t), i = [];
    for (let s = 0; s < n.length; s++) {
      let a = n[s], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = or.join(c, e), l = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + u : u;
      for (let d = 0; d < r.length; d++) {
        let f = l + r[d];
        try {
          if (ir.sync(f, { pathExt: o }))
            if (t.all)
              i.push(f);
            else
              return f;
        } catch {
        }
      }
    }
    if (t.all && i.length)
      return i;
    if (t.nothrow)
      return null;
    throw sr(e);
  };
  ur.exports = cr;
  cr.sync = Bs;
});

// node_modules/path-key/index.js
var fr = E((Tc, $t) => {
  "use strict";
  var dr = (e = {}) => {
    let t = e.env || process.env;
    return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  };
  $t.exports = dr;
  $t.exports.default = dr;
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var gr = E((kc, mr) => {
  "use strict";
  var pr = C("path"), Fs = lr(), Vs = fr();
  function hr(e, t) {
    let n = e.options.env || process.env, r = process.cwd(), o = e.options.cwd != null, i = o && process.chdir !== void 0 && !process.chdir.disabled;
    if (i)
      try {
        process.chdir(e.options.cwd);
      } catch {
      }
    let s;
    try {
      s = Fs.sync(e.command, {
        path: n[Vs({ env: n })],
        pathExt: t ? pr.delimiter : void 0
      });
    } catch {
    } finally {
      i && process.chdir(r);
    }
    return s && (s = pr.resolve(o ? e.options.cwd : "", s)), s;
  }
  function Hs(e) {
    return hr(e) || hr(e, !0);
  }
  mr.exports = Hs;
});

// node_modules/cross-spawn/lib/util/escape.js
var yr = E((Dc, It) => {
  "use strict";
  var Ct = /([()\][%!^"`<>&|;, *?])/g;
  function Xs(e) {
    return e = e.replace(Ct, "^$1"), e;
  }
  function Ws(e, t) {
    return e = `${e}`, e = e.replace(/(\\*)"/g, '$1$1\\"'), e = e.replace(/(\\*)$/, "$1$1"), e = `"${e}"`, e = e.replace(Ct, "^$1"), t && (e = e.replace(Ct, "^$1")), e;
  }
  It.exports.command = Xs;
  It.exports.argument = Ws;
});

// node_modules/shebang-regex/index.js
var xr = E((Mc, br) => {
  "use strict";
  br.exports = /^#!(.*)/;
});

// node_modules/shebang-command/index.js
var Or = E((Uc, Er) => {
  "use strict";
  var zs = xr();
  Er.exports = (e = "") => {
    let t = e.match(zs);
    if (!t)
      return null;
    let [n, r] = t[0].replace(/#! ?/, "").split(" "), o = n.split("/").pop();
    return o === "env" ? r : r ? `${o} ${r}` : o;
  };
});

// node_modules/cross-spawn/lib/util/readShebang.js
var Sr = E((Lc, vr) => {
  "use strict";
  var Pt = C("fs"), Ks = Or();
  function Js(e) {
    let n = Buffer.alloc(150), r;
    try {
      r = Pt.openSync(e, "r"), Pt.readSync(r, n, 0, 150, 0), Pt.closeSync(r);
    } catch {
    }
    return Ks(n.toString());
  }
  vr.exports = Js;
});

// node_modules/cross-spawn/lib/parse.js
var $r = E((qc, Nr) => {
  "use strict";
  var Ys = C("path"), wr = gr(), _r = yr(), Zs = Sr(), Qs = process.platform === "win32", ea = /\.(?:com|exe)$/i, ta = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function na(e) {
    e.file = wr(e);
    let t = e.file && Zs(e.file);
    return t ? (e.args.unshift(e.file), e.command = t, wr(e)) : e.file;
  }
  function ra(e) {
    if (!Qs)
      return e;
    let t = na(e), n = !ea.test(t);
    if (e.options.forceShell || n) {
      let r = ta.test(t);
      e.command = Ys.normalize(e.command), e.command = _r.command(e.command), e.args = e.args.map((i) => _r.argument(i, r));
      let o = [e.command].concat(e.args).join(" ");
      e.args = ["/d", "/s", "/c", `"${o}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
    }
    return e;
  }
  function oa(e, t, n) {
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
    return n.shell ? r : ra(r);
  }
  Nr.exports = oa;
});

// node_modules/cross-spawn/lib/enoent.js
var Pr = E((Gc, Ir) => {
  "use strict";
  var At = process.platform === "win32";
  function Rt(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args
    });
  }
  function ia(e, t) {
    if (!At)
      return;
    let n = e.emit;
    e.emit = function(r, o) {
      if (r === "exit") {
        let i = Cr(o, t, "spawn");
        if (i)
          return n.call(e, "error", i);
      }
      return n.apply(e, arguments);
    };
  }
  function Cr(e, t) {
    return At && e === 1 && !t.file ? Rt(t.original, "spawn") : null;
  }
  function sa(e, t) {
    return At && e === 1 && !t.file ? Rt(t.original, "spawnSync") : null;
  }
  Ir.exports = {
    hookChildProcess: ia,
    verifyENOENT: Cr,
    verifyENOENTSync: sa,
    notFoundError: Rt
  };
});

// node_modules/cross-spawn/index.js
var jr = E((Bc, te) => {
  "use strict";
  var Ar = C("child_process"), jt = $r(), Tt = Pr();
  function Rr(e, t, n) {
    let r = jt(e, t, n), o = Ar.spawn(r.command, r.args, r.options);
    return Tt.hookChildProcess(o, r), o;
  }
  function aa(e, t, n) {
    let r = jt(e, t, n), o = Ar.spawnSync(r.command, r.args, r.options);
    return o.error = o.error || Tt.verifyENOENTSync(o.status, r), o;
  }
  te.exports = Rr;
  te.exports.spawn = Rr;
  te.exports.sync = aa;
  te.exports._parse = jt;
  te.exports._enoent = Tt;
});

// node_modules/signal-exit/signals.js
var Br = E((pu, Fe) => {
  Fe.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
  ];
  process.platform !== "win32" && Fe.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  process.platform === "linux" && Fe.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
});

// node_modules/signal-exit/index.js
var Wr = E((hu, oe) => {
  var _ = global.process, J = function(e) {
    return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
  };
  J(_) ? (Fr = C("assert"), ne = Br(), Vr = /^win/i.test(_.platform), xe = C("events"), typeof xe != "function" && (xe = xe.EventEmitter), _.__signal_exit_emitter__ ? $ = _.__signal_exit_emitter__ : ($ = _.__signal_exit_emitter__ = new xe(), $.count = 0, $.emitted = {}), $.infinite || ($.setMaxListeners(1 / 0), $.infinite = !0), oe.exports = function(e, t) {
    if (!J(global.process))
      return function() {
      };
    Fr.equal(typeof e, "function", "a callback must be provided for exit handler"), re === !1 && qt();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    var r = function() {
      $.removeListener(n, e), $.listeners("exit").length === 0 && $.listeners("afterexit").length === 0 && Ve();
    };
    return $.on(n, e), r;
  }, Ve = function() {
    !re || !J(global.process) || (re = !1, ne.forEach(function(t) {
      try {
        _.removeListener(t, He[t]);
      } catch {
      }
    }), _.emit = Xe, _.reallyExit = Gt, $.count -= 1);
  }, oe.exports.unload = Ve, Y = function(t, n, r) {
    $.emitted[t] || ($.emitted[t] = !0, $.emit(t, n, r));
  }, He = {}, ne.forEach(function(e) {
    He[e] = function() {
      if (!!J(global.process)) {
        var n = _.listeners(e);
        n.length === $.count && (Ve(), Y("exit", null, e), Y("afterexit", null, e), Vr && e === "SIGHUP" && (e = "SIGINT"), _.kill(_.pid, e));
      }
    };
  }), oe.exports.signals = function() {
    return ne;
  }, re = !1, qt = function() {
    re || !J(global.process) || (re = !0, $.count += 1, ne = ne.filter(function(t) {
      try {
        return _.on(t, He[t]), !0;
      } catch {
        return !1;
      }
    }), _.emit = Xr, _.reallyExit = Hr);
  }, oe.exports.load = qt, Gt = _.reallyExit, Hr = function(t) {
    !J(global.process) || (_.exitCode = t || 0, Y("exit", _.exitCode, null), Y("afterexit", _.exitCode, null), Gt.call(_, _.exitCode));
  }, Xe = _.emit, Xr = function(t, n) {
    if (t === "exit" && J(global.process)) {
      n !== void 0 && (_.exitCode = n);
      var r = Xe.apply(this, arguments);
      return Y("exit", _.exitCode, null), Y("afterexit", _.exitCode, null), r;
    } else
      return Xe.apply(this, arguments);
  }) : oe.exports = function() {
    return function() {
    };
  };
  var Fr, ne, Vr, xe, $, Ve, Y, He, re, qt, Gt, Hr, Xe, Xr;
});

// node_modules/get-stream/buffer-stream.js
var no = E((bu, to) => {
  "use strict";
  var { PassThrough: ka } = C("stream");
  to.exports = (e) => {
    e = b({}, e);
    let { array: t } = e, { encoding: n } = e, r = n === "buffer", o = !1;
    t ? o = !(n || r) : n = n || "utf8", r && (n = null);
    let i = new ka({ objectMode: o });
    n && i.setEncoding(n);
    let s = 0, a = [];
    return i.on("data", (c) => {
      a.push(c), o ? s = a.length : s += c.length;
    }), i.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), i.getBufferedLength = () => s, i;
  };
});

// node_modules/get-stream/index.js
var ro = E((xu, Ee) => {
  "use strict";
  var { constants: Da } = C("buffer"), Ma = C("stream"), { promisify: Ua } = C("util"), La = no(), qa = Ua(Ma.pipeline), We = class extends Error {
    constructor() {
      super("maxBuffer exceeded"), this.name = "MaxBufferError";
    }
  };
  async function Bt(e, t) {
    if (!e)
      throw new Error("Expected a stream");
    t = b({
      maxBuffer: 1 / 0
    }, t);
    let { maxBuffer: n } = t, r = La(t);
    return await new Promise((o, i) => {
      let s = (a) => {
        a && r.getBufferedLength() <= Da.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), i(a);
      };
      (async () => {
        try {
          await qa(e, r), o();
        } catch (a) {
          s(a);
        }
      })(), r.on("data", () => {
        r.getBufferedLength() > n && s(new We());
      });
    }), r.getBufferedValue();
  }
  Ee.exports = Bt;
  Ee.exports.buffer = (e, t) => Bt(e, v(b({}, t), { encoding: "buffer" }));
  Ee.exports.array = (e, t) => Bt(e, v(b({}, t), { array: !0 }));
  Ee.exports.MaxBufferError = We;
});

// node_modules/merge-stream/index.js
var io = E((Eu, oo) => {
  "use strict";
  var { PassThrough: Ga } = C("stream");
  oo.exports = function() {
    var e = [], t = new Ga({ objectMode: !0 });
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
var B = ie(Hn(), 1);

// lib/utils.mjs
import { readFile as Za, writeFile as Qa } from "fs/promises";
import { join as ec } from "path";

// node_modules/execa/index.js
var go = ie(jr(), 1);
import { Buffer as Wa } from "node:buffer";
import za from "node:path";
import mo from "node:child_process";
import ze from "node:process";

// node_modules/strip-final-newline/index.js
function kt(e) {
  let t = typeof e == "string" ? `
` : `
`.charCodeAt(), n = typeof e == "string" ? "\r" : "\r".charCodeAt();
  return e[e.length - 1] === t && (e = e.slice(0, -1)), e[e.length - 1] === n && (e = e.slice(0, -1)), e;
}

// node_modules/npm-run-path/index.js
import qe from "node:process";
import be from "node:path";
import ca from "node:url";

// node_modules/npm-run-path/node_modules/path-key/index.js
function Le(e = {}) {
  let {
    env: t = process.env,
    platform: n = process.platform
  } = e;
  return n !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
}

// node_modules/npm-run-path/index.js
function ua(e = {}) {
  let {
    cwd: t = qe.cwd(),
    path: n = qe.env[Le()],
    execPath: r = qe.execPath
  } = e, o, i = t instanceof URL ? ca.fileURLToPath(t) : t, s = be.resolve(i), a = [];
  for (; o !== s; )
    a.push(be.join(s, "node_modules/.bin")), o = s, s = be.resolve(s, "..");
  return a.push(be.resolve(i, r, "..")), [...a, n].join(be.delimiter);
}
function Tr(n = {}) {
  var r = n, { env: e = qe.env } = r, t = Zt(r, ["env"]);
  e = b({}, e);
  let o = Le({ env: e });
  return t.path = e[o], e[o] = ua(t), e;
}

// node_modules/mimic-fn/index.js
var la = (e, t, n, r) => {
  if (n === "length" || n === "prototype" || n === "arguments" || n === "caller")
    return;
  let o = Object.getOwnPropertyDescriptor(e, n), i = Object.getOwnPropertyDescriptor(t, n);
  !da(o, i) && r || Object.defineProperty(e, n, i);
}, da = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, fa = (e, t) => {
  let n = Object.getPrototypeOf(t);
  n !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, n);
}, pa = (e, t) => `/* Wrapped ${e}*/
${t}`, ha = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), ma = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), ga = (e, t, n) => {
  let r = n === "" ? "" : `with ${n.trim()}() `, o = pa.bind(null, r, t.toString());
  Object.defineProperty(o, "name", ma), Object.defineProperty(e, "toString", v(b({}, ha), { value: o }));
};
function Dt(e, t, { ignoreNonConfigurable: n = !1 } = {}) {
  let { name: r } = e;
  for (let o of Reflect.ownKeys(t))
    la(e, t, o, n);
  return fa(e, t), ga(e, t, r), e;
}

// node_modules/onetime/index.js
var Ge = /* @__PURE__ */ new WeakMap(), kr = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, r = 0, o = e.displayName || e.name || "<anonymous>", i = function(...s) {
    if (Ge.set(i, ++r), r === 1)
      n = e.apply(this, s), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${o}\` can only be called once`);
    return n;
  };
  return Dt(i, e), Ge.set(i, r), i;
};
kr.callCount = (e) => {
  if (!Ge.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Ge.get(e);
};
var Dr = kr;

// node_modules/human-signals/build/src/main.js
import { constants as Ea } from "os";

// node_modules/human-signals/build/src/realtime.js
var Mr = function() {
  let e = Mt - Ur + 1;
  return Array.from({ length: e }, ya);
}, ya = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: Ur + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, Ur = 34, Mt = 64;

// node_modules/human-signals/build/src/signals.js
import { constants as ba } from "os";

// node_modules/human-signals/build/src/core.js
var Lr = [
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
var Ut = function() {
  let e = Mr();
  return [...Lr, ...e].map(xa);
}, xa = function({
  name: e,
  number: t,
  description: n,
  action: r,
  forced: o = !1,
  standard: i
}) {
  let {
    signals: { [e]: s }
  } = ba, a = s !== void 0;
  return { name: e, number: a ? s : t, description: n, supported: a, action: r, forced: o, standard: i };
};

// node_modules/human-signals/build/src/main.js
var Oa = function() {
  return Ut().reduce(va, {});
}, va = function(e, { name: t, number: n, description: r, supported: o, action: i, forced: s, standard: a }) {
  return v(b({}, e), {
    [t]: { name: t, number: n, description: r, supported: o, action: i, forced: s, standard: a }
  });
}, qr = Oa(), Sa = function() {
  let e = Ut(), t = 64 + 1, n = Array.from({ length: t }, (r, o) => wa(o, e));
  return Object.assign({}, ...n);
}, wa = function(e, t) {
  let n = _a(e, t);
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
}, _a = function(e, t) {
  let n = t.find(({ name: r }) => Ea.signals[r] === e);
  return n !== void 0 ? n : t.find((r) => r.number === e);
}, cu = Sa();

// node_modules/execa/lib/error.js
var Na = ({ timedOut: e, timeout: t, errorCode: n, signal: r, signalDescription: o, exitCode: i, isCanceled: s }) => e ? `timed out after ${t} milliseconds` : s ? "was canceled" : n !== void 0 ? `failed with ${n}` : r !== void 0 ? `was killed with ${r} (${o})` : i !== void 0 ? `failed with exit code ${i}` : "failed", Lt = ({
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
  parsed: { options: { timeout: d } }
}) => {
  i = i === null ? void 0 : i, o = o === null ? void 0 : o;
  let f = o === void 0 ? void 0 : qr[o].description, p = r && r.code, O = `Command ${Na({ timedOut: c, timeout: d, errorCode: p, signal: o, signalDescription: f, exitCode: i, isCanceled: u })}: ${s}`, A = Object.prototype.toString.call(r) === "[object Error]", X = A ? `${O}
${r.message}` : O, W = [X, t, e].filter(Boolean).join(`
`);
  return A ? (r.originalMessage = r.message, r.message = W) : r = new Error(W), r.shortMessage = X, r.command = s, r.escapedCommand = a, r.exitCode = i, r.signal = o, r.signalDescription = f, r.stdout = e, r.stderr = t, n !== void 0 && (r.all = n), "bufferedData" in r && delete r.bufferedData, r.failed = !0, r.timedOut = Boolean(c), r.isCanceled = u, r.killed = l && !c, r;
};

// node_modules/execa/lib/stdio.js
var Be = ["stdin", "stdout", "stderr"], $a = (e) => Be.some((t) => e[t] !== void 0), Gr = (e) => {
  if (!e)
    return;
  let { stdio: t } = e;
  if (t === void 0)
    return Be.map((r) => e[r]);
  if ($a(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Be.map((r) => `\`${r}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  let n = Math.max(t.length, Be.length);
  return Array.from({ length: n }, (r, o) => t[o]);
};

// node_modules/execa/lib/kill.js
var zr = ie(Wr(), 1);
import Ca from "node:os";
var Ia = 1e3 * 5, Kr = (e, t = "SIGTERM", n = {}) => {
  let r = e(t);
  return Pa(e, t, n, r), r;
}, Pa = (e, t, n, r) => {
  if (!Aa(t, n, r))
    return;
  let o = ja(n), i = setTimeout(() => {
    e("SIGKILL");
  }, o);
  i.unref && i.unref();
}, Aa = (e, { forceKillAfterTimeout: t }, n) => Ra(e) && t !== !1 && n, Ra = (e) => e === Ca.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", ja = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return Ia;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, Jr = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, Ta = (e, t, n) => {
  e.kill(t), n(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, Yr = (e, { timeout: t, killSignal: n = "SIGTERM" }, r) => {
  if (t === 0 || t === void 0)
    return r;
  let o, i = new Promise((a, c) => {
    o = setTimeout(() => {
      Ta(e, n, c);
    }, t);
  }), s = r.finally(() => {
    clearTimeout(o);
  });
  return Promise.race([i, s]);
}, Zr = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, Qr = async (e, { cleanup: t, detached: n }, r) => {
  if (!t || n)
    return r;
  let o = (0, zr.default)(() => {
    e.kill();
  });
  return r.finally(() => {
    o();
  });
};

// node_modules/is-stream/index.js
function eo(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}

// node_modules/execa/lib/stream.js
var Ht = ie(ro(), 1), so = ie(io(), 1), ao = (e, t) => {
  t === void 0 || e.stdin === void 0 || (eo(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, co = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  let n = (0, so.default)();
  return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
}, Ft = async (e, t) => {
  if (!!e) {
    e.destroy();
    try {
      return await t;
    } catch (n) {
      return n.bufferedData;
    }
  }
}, Vt = (e, { encoding: t, buffer: n, maxBuffer: r }) => {
  if (!(!e || !n))
    return t ? (0, Ht.default)(e, { encoding: t, maxBuffer: r }) : Ht.default.buffer(e, { maxBuffer: r });
}, uo = async ({ stdout: e, stderr: t, all: n }, { encoding: r, buffer: o, maxBuffer: i }, s) => {
  let a = Vt(e, { encoding: r, buffer: o, maxBuffer: i }), c = Vt(t, { encoding: r, buffer: o, maxBuffer: i }), u = Vt(n, { encoding: r, buffer: o, maxBuffer: i * 2 });
  try {
    return await Promise.all([s, a, c, u]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      Ft(e, a),
      Ft(t, c),
      Ft(n, u)
    ]);
  }
};

// node_modules/execa/lib/promise.js
var Ba = (async () => {
})().constructor.prototype, Fa = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(Ba, e)
]), Xt = (e, t) => {
  for (let [n, r] of Fa) {
    let o = typeof t == "function" ? (...i) => Reflect.apply(r.value, t(), i) : r.value.bind(t);
    Reflect.defineProperty(e, n, v(b({}, r), { value: o }));
  }
  return e;
}, lo = (e) => new Promise((t, n) => {
  e.on("exit", (r, o) => {
    t({ exitCode: r, signal: o });
  }), e.on("error", (r) => {
    n(r);
  }), e.stdin && e.stdin.on("error", (r) => {
    n(r);
  });
});

// node_modules/execa/lib/command.js
var fo = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], Va = /^[\w.-]+$/, Ha = /"/g, Xa = (e) => typeof e != "string" || Va.test(e) ? e : `"${e.replace(Ha, '\\"')}"`, po = (e, t) => fo(e, t).join(" "), ho = (e, t) => fo(e, t).map((n) => Xa(n)).join(" ");

// node_modules/execa/index.js
var Ka = 1e3 * 1e3 * 100, Ja = ({ env: e, extendEnv: t, preferLocal: n, localDir: r, execPath: o }) => {
  let i = t ? b(b({}, ze.env), e) : e;
  return n ? Tr({ env: i, cwd: r, execPath: o }) : i;
}, Ya = (e, t, n = {}) => {
  let r = go.default._parse(e, t, n);
  return e = r.command, t = r.args, n = r.options, n = b({
    maxBuffer: Ka,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: n.cwd || ze.cwd(),
    execPath: ze.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0
  }, n), n.env = Ja(n), n.stdio = Gr(n), ze.platform === "win32" && za.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: n, parsed: r };
}, Wt = (e, t, n) => typeof t != "string" && !Wa.isBuffer(t) ? n === void 0 ? void 0 : "" : e.stripFinalNewline ? kt(t) : t;
function yo(e, t, n) {
  let r = Ya(e, t, n), o = po(e, t), i = ho(e, t);
  Zr(r.options);
  let s;
  try {
    s = mo.spawn(r.file, r.args, r.options);
  } catch (p) {
    let g = new mo.ChildProcess(), O = Promise.reject(Lt({
      error: p,
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
    return Xt(g, O);
  }
  let a = lo(s), c = Yr(s, r.options, a), u = Qr(s, r.options, c), l = { isCanceled: !1 };
  s.kill = Kr.bind(null, s.kill.bind(s)), s.cancel = Jr.bind(null, s, l);
  let f = Dr(async () => {
    let [{ error: p, exitCode: g, signal: O, timedOut: A }, X, W, Je] = await uo(s, r.options, u), Oe = Wt(r.options, X), zt = Wt(r.options, W), Kt = Wt(r.options, Je);
    if (p || g !== 0 || O !== null) {
      let Jt = Lt({
        error: p,
        exitCode: g,
        signal: O,
        stdout: Oe,
        stderr: zt,
        all: Kt,
        command: o,
        escapedCommand: i,
        parsed: r,
        timedOut: A,
        isCanceled: l.isCanceled || (r.options.signal ? r.options.signal.aborted : !1),
        killed: s.killed
      });
      if (!r.options.reject)
        return Jt;
      throw Jt;
    }
    return {
      command: o,
      escapedCommand: i,
      exitCode: 0,
      stdout: Oe,
      stderr: zt,
      all: Kt,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return ao(s, r.options.input), s.all = co(s, r.options), Xt(s, f);
}

// lib/utils.mjs
var bo = ec(process.cwd(), "package.json");
async function xo() {
  return JSON.parse((await Za(bo)).toString());
}
async function Eo(e) {
  await Qa(bo, JSON.stringify(e, void 0, 4));
}
function Z(e, t, n, r = !1) {
  return new Promise((o, i) => {
    let s = yo(e, t);
    r && n.write(`
`), s.stdout.pipe(n), s.then(o).catch(i);
  });
}

// lib/tasks/prettier.mjs
async function Oo(e) {
  e.push({
    label: "Adding Prettier config",
    async action() {
      let t = await xo(), n = t.scripts || {};
      t.prettier = {
        semi: !1,
        tabWidth: 4,
        trailingComma: "es5"
      }, n.prettier = 'prettier --write "**/*".{js,jsx,ts,tsx,mjs,cjs,html,json,css,md}', t.scripts = n, await Eo(t);
    }
  }), e.push({
    label: "Adding Prettier package",
    async action(t) {
      await Z("yarn", ["add", "prettier"], t, !0);
    }
  }), e.push({
    label: "Running Prettier",
    async action(t) {
      await Z("yarn", ["prettier"], t, !0);
    }
  });
}

// lib/tasks/yarn.mjs
async function vo(e) {
  e.push({
    label: "Download Yarn",
    async action(t) {
      await Z("yarn", ["set", "version", "berry"], t, !0);
    }
  }), e.push({
    label: "Configure Yarn",
    async action(t) {
      let n = async (r, o) => {
        await Z("yarn", ["config", "set", r, o], t);
      };
      await n("nodeLinker", "node-modules"), await n("initScope", "@rdil"), await n("enableInlineHunks", "true"), await n("enableGlobalCache", "false");
    }
  }), e.push({
    label: "Install packages with Yarn",
    async action(t) {
      await Z("yarn", [], t, !0);
    }
  });
}

// .editorconfig
var So = `root = true

[*]
end_of_line = lf
insert_final_newline = true

[*.{js,ts,json,yml}]
charset = utf-8
indent_style = space
indent_size = 4
`;

// lib/tasks/editorconfig.mjs
import { writeFile as nc } from "fs/promises";
import { join as rc } from "path";
async function wo(e) {
  e.push({
    label: "Write .editorconfig file",
    async action() {
      await nc(rc(process.cwd(), ".editorconfig"), So);
    }
  });
}

// lib/index.mjs
var _o;
(_o = process.setSourceMapsEnabled) == null || _o.call(process, !0);
var Ke = class extends B.Command {
  skipYarn = B.Option.Boolean("--skip-yarn", !1, {
    description: "Skip migration to and configuration of Yarn Berry."
  });
  skipPrettier = B.Option.Boolean("--skip-prettier", !1, {
    description: "Skip installing and configuring Prettier."
  });
  skipEditorconfig = B.Option.Boolean("--skip-editorconfig", !1, {
    description: "Skip adding a `.editorconfig` file."
  });
  async execute() {
    let t = this.context.stdout;
    t.write(`
rdilifying...
`);
    let n = [];
    this.skipYarn || await vo(n), this.skipPrettier || await Oo(n), this.skipEditorconfig || await wo(n);
    for (let r of n)
      t.write(`
[${n.indexOf(r) + 1}/${n.length}] ${r.label}`), await r.action(t);
    t.write(`
Done!`);
  }
};
Qt(Ke, "usage", B.Command.Usage({
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
var [, oc, ...ic] = process.argv, No = new B.Cli({
  binaryLabel: "rdilify",
  binaryName: `node ${oc}`,
  binaryVersion: "1.0.0"
});
No.register(Ke);
No.runExit(ic);
