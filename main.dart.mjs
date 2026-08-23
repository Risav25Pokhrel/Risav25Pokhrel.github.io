// Compiles a dart2wasm-generated main module from `source` which can then
// be instantiated via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm module from `bytes` which is then
// instantiable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arguments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `use-load-ids` option is passed. Each load ID maps to
  //   one or more wasm files as specified in the emitted JSON file. It also
  //   takes a callback that should be invoked for each loaded module with 2
  //   arguments: (1) the module name, (2) the loaded module in a format
  //   supported by `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  //   The callback returns a Promise that resolves when the module is
  //   instantiated.
  //   loadDeferredId should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports, {loadDeferredModules, loadDeferredId} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            AB: x0 => new Int16Array(x0),
      AC: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      AD: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      AE: (x0,x1) => x0.getPropertyValue(x1),
      AF: x0 => x0.identifier,
      AG: x0 => x0.parentElement,
      AH: x0 => x0.readText(),
      AI: x0 => x0.deref(),
      AJ: x0 => x0.close(),
      AK: (x0,x1) => { x0.spellcheck = x1 },
      AL: x0 => x0.length,
      B: s => printToConsole(s),
      BB: x0 => new Uint16Array(x0),
      BC: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      BD: x0 => x0.tabIndex,
      BE: x0 => globalThis.parseFloat(x0),
      BF: x0 => x0.touches,
      BG: (x0,x1) => x0.querySelectorAll(x1),
      BH: x0 => x0.clipboard,
      BI: () => globalThis.WeakRef,
      BJ: (x0,x1) => ({frameIndex: x0,completeFramesOnly: x1}),
      BK: (x0,x1) => { x0.disabled = x1 },
      BL: x0 => x0.getReader(),
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      CC: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      CD: (x0,x1) => x0.contains(x1),
      CE: (x0,x1) => x0.getComputedStyle(x1),
      CF: x0 => x0.pressure,
      CG: (x0,x1) => x0.requestAnimationFrame(x1),
      CH: (x0,x1) => x0.writeText(x1),
      CI: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      CJ: (x0,x1) => x0.decode(x1),
      CK: x0 => x0.baseURI,
      CL: x0 => x0.value,
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: x0 => new Int32Array(x0),
      DC: (x0,x1) => x0.querySelector(x1),
      DD: x0 => x0.activeElement,
      DE: x0 => x0.documentElement,
      DF: x0 => x0.tiltY,
      DG: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      DH: x0 => x0.unlock(),
      DI: (a, s, e) => a.slice(s, e),
      DJ: x0 => x0.displayHeight,
      DK: (x0,x1) => x0.transferFromImageBitmap(x1),
      DL: x0 => x0.done,
      E: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      EB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      EC: (x0,x1) => x0.item(x1),
      ED: x0 => x0.parentNode,
      EE: x0 => x0.computedStyleMap(),
      EF: x0 => x0.tiltX,
      EG: x0 => x0.now(),
      EH: (x0,x1) => x0.lock(x1),
      EI: (o, p) => p in o,
      EJ: x0 => x0.displayWidth,
      EK: (x0,x1) => x0.getContext(x1),
      EL: x0 => x0.read(),
      F: () => new Error().stack,
      FB: x0 => new Uint32Array(x0),
      FC: x0 => x0.length,
      FD: x0 => x0.tagName,
      FE: (x0,x1) => x0.get(x1),
      FF: x0 => x0.pointerType,
      FG: x0 => x0.performance,
      FH: x0 => x0.orientation,
      FI: x0 => x0.groups,
      FJ: x0 => x0.duration,
      FK: (x0,x1) => { x0.height = x1 },
      FL: x0 => x0.body,
      G: s => JSON.stringify(s),
      GB: x0 => new Float32Array(x0),
      GC: (x0,x1) => x0.querySelectorAll(x1),
      GD: x0 => x0.target,
      GE: (o, p) => p in o,
      GF: x0 => x0.pointerId,
      GG: (d, digits) => d.toFixed(digits),
      GH: (x0,x1) => x0.querySelector(x1),
      GI: (a, i) => a.splice(i, 1),
      GJ: x0 => x0.image,
      GK: (x0,x1) => { x0.width = x1 },
      GL: (x0,x1) => new OffscreenCanvas(x0,x1),
      H: Function.prototype.call.bind(Number.prototype.toString),
      HB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      HC: (x0,x1) => x0.getAttribute(x1),
      HD: x0 => x0.clientY,
      HE: (x0,x1) => { x0.textContent = x1 },
      HF: x0 => x0.getCoalescedEvents(),
      HG: x0 => x0.maxHeight,
      HH: (x0,x1) => { x0.title = x1 },
      HI: a => a.pop(),
      HJ: () => globalThis.window.ImageDecoder,
      HK: x0 => x0.height,
      HL: x0 => x0.assetBase,
      I: Function.prototype.call.bind(String.prototype.indexOf),
      IB: x0 => new Float64Array(x0),
      IC: x0 => x0.remove(),
      ID: x0 => x0.clientX,
      IE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      IF: (x0,x1) => x0.getModifierState(x1),
      IG: x0 => x0.maxWidth,
      IH: (x0,x1) => x0.vibrate(x1),
      II: (x0,x1) => x0.createElement(x1),
      IJ: x0 => x0.decode(),
      IK: x0 => x0.width,
      IL: x0 => x0.loader,
      J: (s, p, i) => s.lastIndexOf(p, i),
      JB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      JC: (x0,x1) => x0.appendChild(x1),
      JD: (x0,x1,x2) => x0.setAttribute(x1,x2),
      JE: x0 => x0.matches,
      JF: s => s.trimLeft(),
      JG: x0 => x0.minHeight,
      JH: x0 => x0.arrayBuffer(),
      JI: (x0,x1) => x0.append(x1),
      JJ: x0 => x0.naturalHeight,
      JK: x0 => x0.rasterEndMilliseconds,
      JL: () => globalThis._flutter,
      K: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      KB: x0 => new ArrayBuffer(x0),
      KC: (x0,x1) => x0.append(x1),
      KD: x0 => x0.getBoundingClientRect(),
      KE: (x0,x1) => x0.matchMedia(x1),
      KF: s => s.toUpperCase(),
      KG: x0 => x0.minWidth,
      KH: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof ArrayBuffer) return 1;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 2;
        }
        return 3;
      },
      KI: (x0,x1,x2) => x0.insertRule(x1,x2),
      KJ: x0 => x0.naturalWidth,
      KK: x0 => x0.rasterStartMilliseconds,
      L: o => o === undefined,
      LB: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      LC: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      LD: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      LE: x0 => x0.matches,
      LF: (x0,x1) => x0.test(x1),
      LG: (x0,x1) => x0.removeProperty(x1),
      LH: x0 => x0.status,
      LI: (x0,x1) => x0.add(x1),
      LJ: (x0,x1) => { x0.src = x1 },
      LK: x0 => x0.imageBitmaps,
      M: o => String(o),
      MB: (x0,x1,x2) => new DataView(x0,x1,x2),
      MC: x0 => x0.style,
      MD: s => new Date(s * 1000).getTimezoneOffset() * 60,
      ME: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      MF: (x0,x1) => x0[x1],
      MG: (x0,x1) => x0.add(x1),
      MH: (x0,x1) => x0.fetch(x1),
      MI: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      MJ: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      MK: x0 => x0.canvasKitMaximumSurfaces,
      N: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      NB: (o, p) => o[p],
      NC: x0 => x0.debugShowSemanticsNodes,
      ND: Date.now,
      NE: f => f.dartFunction,
      NF: x0 => x0.index,
      NG: x0 => x0.data,
      NH: x0 => x0.content,
      NI: (x0,x1,x2) => x0.addEventListener(x1,x2),
      NJ: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      NK: x0 => x0.nextSibling,
      O: (x0,x1) => x0.didCreateEngineInitializer(x1),
      OB: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      OC: o => o,
      OD: (handle) => clearTimeout(handle),
      OE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      OF: x0 => x0.pop(),
      OG: (x0,x1) => { x0.scrollTop = x1 },
      OH: x0 => x0.document,
      OI: x0 => x0.preventDefault(),
      OJ: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      OK: (x0,x1) => x0.debug(x1),
      P: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      PB: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      PC: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      PD: (x0,x1) => x0.closest(x1),
      PE: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      PF: x0 => x0.flags,
      PG: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      PH: () => typeof dartUseDateNowForTicks !== "undefined",
      PI: x0 => x0.createRange(),
      PJ: x0 => x0.send(),
      PK: x0 => x0.hostElement,
      Q: (wasmFunction,f) => finalizeWrapper(f, function() { return wasmFunction(f,arguments.length) }),
      QB: o => o.byteOffset,
      QC: (x0,x1) => x0.warn(x1),
      QD: x0 => x0.bottom,
      QE: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      QF: (a, s) => a.join(s),
      QG: (x0,x1) => { x0.value = x1 },
      QH: () => Date.now(),
      QI: (x0,x1) => x0.selectNode(x1),
      QJ: x0 => x0.status,
      QK: x0 => x0.location,
      R: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      RB: o => o.buffer,
      RC: x0 => x0.console,
      RD: x0 => x0.top,
      RE: (o, i) => o[i],
      RF: (x0,x1) => x0.error(x1),
      RG: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      RH: () => 1000 * performance.now(),
      RI: x0 => x0.getSelection(),
      RJ: x0 => x0.response,
      RK: (x0,x1) => x0.getModifierState(x1),
      S: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      SB: Function.prototype.call.bind(DataView.prototype.getUint8),
      SC: () => globalThis.window,
      SD: x0 => x0.right,
      SE: o => o.length,
      SF: () => globalThis.console,
      SG: (x0,x1) => { x0.value = x1 },
      SH: x0 => new Uint8Array(x0),
      SI: x0 => x0.removeAllRanges(),
      SJ: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      SK: x0 => x0.metaKey,
      T: x0 => new Promise(x0),
      TB: (b, o) => new DataView(b, o),
      TC: (o, c) => o instanceof c,
      TD: x0 => x0.left,
      TE: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        if (o instanceof Promise) return 18;
        return 19;
      },
      TF: s => s.trimRight(),
      TG: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      TH: (x0,x1,x2) => x0.slice(x1,x2),
      TI: (x0,x1) => x0.addRange(x1),
      TJ: (x0,x1) => { x0.responseType = x1 },
      TK: x0 => x0.altKey,
      U: (x0,x1,x2) => x0.call(x1,x2),
      UB: (b, o, l) => new DataView(b, o, l),
      UC: (x0,x1) => x0.exec(x1),
      UD: x0 => x0.clientY,
      UE: x0 => x0.language,
      UF: x0 => x0.blur(),
      UG: x0 => x0.value,
      UH: (x0,x1) => x0.decode(x1),
      UI: () => globalThis.window,
      UJ: () => new XMLHttpRequest(),
      UK: x0 => x0.ctrlKey,
      V: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      VB: Function.prototype.call.bind(DataView.prototype.getFloat64),
      VC: x0 => x0.length,
      VD: x0 => x0.clientX,
      VE: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      VF: x0 => x0.button,
      VG: x0 => x0.selectionDirection,
      VH: (x0,x1) => x0.adoptText(x1),
      VI: (x0,x1) => { x0.innerText = x1 },
      VJ: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      VK: x0 => x0.isComposing,
      W: x0 => new Array(x0),
      WB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      WC: (x0,x1) => { x0.lastIndex = x1 },
      WD: x0 => x0.changedTouches,
      WE: () => globalThis.window.FinalizationRegistry,
      WF: x0 => x0.innerHeight,
      WG: x0 => x0.selectionStart,
      WH: x0 => x0.first(),
      WI: x0 => x0.offsetY,
      WJ: (x0,x1) => { x0.pointerEvents = x1 },
      WK: x0 => x0.code,
      X: o => [o],
      XB: Function.prototype.call.bind(DataView.prototype.setFloat64),
      XC: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      XD: x0 => x0.offsetY,
      XE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      XF: x0 => x0.innerWidth,
      XG: x0 => x0.selectionEnd,
      XH: x0 => x0.next(),
      XI: x0 => x0.offsetX,
      XJ: x0 => x0.src,
      XK: x0 => x0.repeat,
      Y: (o0, o1) => [o0, o1],
      YB: (t, s) => t.set(s),
      YC: o => o instanceof RegExp,
      YD: x0 => x0.offsetX,
      YE: x0 => new window.FinalizationRegistry(x0),
      YF: x0 => x0.height,
      YG: x0 => x0.value,
      YH: x0 => x0.current(),
      YI: x0 => x0.button,
      YJ: () => new AbortController(),
      YK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      Z: (o0, o1, o2) => [o0, o1, o2],
      ZB: Function.prototype.call.bind(DataView.prototype.setFloat32),
      ZC: (string, times) => string.repeat(times),
      ZD: x0 => x0.type,
      ZE: (x0,x1) => x0.unregister(x1),
      ZF: x0 => x0.width,
      ZG: x0 => x0.selectionDirection,
      ZH: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      ZI: x0 => x0.classList,
      ZJ: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      ZK: x0 => x0.userAgent,
      a: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      aB: Function.prototype.call.bind(DataView.prototype.getFloat32),
      aC: x0 => x0.dotAll,
      aD: x0 => x0.maxTouchPoints,
      aE: (x0,x1) => x0.contains(x1),
      aF: x0 => x0.clientHeight,
      aG: x0 => x0.selectionStart,
      aH: x0 => x0.v8BreakIterator,
      aI: (x0,x1) => { x0.height = x1 },
      aJ: (x0,x1) => globalThis.fetch(x0,x1),
      aK: x0 => x0.navigator,
      b: (x0,x1,x2) => { x0[x1] = x2 },
      bB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      bC: x0 => x0.unicode,
      bD: x0 => x0.platform,
      bE: (s) => +s,
      bF: x0 => x0.clientWidth,
      bG: x0 => x0.selectionEnd,
      bH: () => globalThis.Intl,
      bI: (x0,x1) => { x0.width = x1 },
      bJ: (x0,x1) => x0.get(x1),
      bK: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      c: o => o,
      cB: Function.prototype.call.bind(DataView.prototype.getUint32),
      cC: x0 => x0.ignoreCase,
      cD: x0 => x0.body,
      cE: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      cF: (x0,x1) => { x0.content = x1 },
      cG: x0 => x0.keyCode,
      cH: (x0,x1) => x0.segment(x1),
      cI: x0 => x0.style,
      cJ: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1,x2) { return wasmFunction(f,arguments.length,x0,x1,x2) }),
      cK: (x0,x1,x2) => x0.setAttribute(x1,x2),
      d: (o, p) => o[p],
      dB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      dC: x0 => x0.multiline,
      dD: () => globalThis.document,
      dE: s => s.trim(),
      dF: (x0,x1) => { x0.name = x1 },
      dG: (x0,x1) => x0.scrollIntoView(x1),
      dH: x0 => x0.index,
      dI: x0 => x0.sheet,
      dJ: (x0,x1) => x0.forEach(x1),
      dK: (x0,x1) => x0.createElement(x1),
      e: () => globalThis,
      eB: Function.prototype.call.bind(DataView.prototype.getInt32),
      eC: (string, token) => string.split(token),
      eD: (x0,x1,x2) => x0.addEventListener(x1,x2),
      eE: x0 => x0.classList,
      eF: x0 => x0.head,
      eG: x0 => x0.multiViewEnabled,
      eH: x0 => x0.next(),
      eI: x0 => x0.head,
      eJ: x0 => x0.name,
      eK: (x0,x1) => { x0.cursor = x1 },
      f: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      fB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      fC: o => o instanceof Array,
      fD: x0 => x0.hasFocus(),
      fE: x0 => x0.preventDefault(),
      fF: (x0,x1) => x0.removeChild(x1),
      fG: (x0,x1) => x0.replaceWith(x1),
      fH: x0 => x0.value,
      fI: () => globalThis.document,
      fJ: x0 => x0.statusText,
      fK: (x0,x1) => { x0.height = x1 },
      g: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      gB: o => o instanceof Uint16Array,
      gC: (a, i) => a[i],
      gD: x0 => x0.relatedTarget,
      gE: x0 => x0.parent,
      gF: x0 => x0.firstChild,
      gG: (x0,x1) => { x0.type = x1 },
      gH: x0 => x0.done,
      gI: (x0,x1) => x0.revokeObjectURL(x1),
      gJ: x0 => x0.url,
      gK: (x0,x1) => { x0.width = x1 },
      h: (x0,x1) => ({addView: x0,removeView: x1}),
      hB: Function.prototype.call.bind(DataView.prototype.getUint16),
      hC: a => a.length,
      hD: x0 => x0.shiftKey,
      hE: x0 => x0.timeStamp,
      hF: x0 => x0.viewConstraints,
      hG: (x0,x1) => { x0.className = x1 },
      hH: (o, m, a) => o[m].apply(o, a),
      hI: (x0,x1) => { x0.src = x1 },
      hJ: x0 => x0.status,
      hK: (x0,x1) => { x0.display = x1 },
      i: (l, r) => l === r,
      iB: o => o instanceof Int16Array,
      iC: x0 => x0.userAgent,
      iD: (decoder, codeUnits) => decoder.decode(codeUnits),
      iE: (x0,x1) => x0.hasAttribute(x1),
      iF: x0 => x0.hostElement,
      iG: (x0,x1) => { x0.tabIndex = x1 },
      iH: x0 => x0.iterator,
      iI: (x0,x1,x2,x3,x4) => globalThis.createImageBitmap(x0,x1,x2,x3,x4),
      iJ: x0 => x0.cancel(),
      iK: (x0,x1) => { x0.opacity = x1 },
      j: x0 => x0.random(),
      jB: Function.prototype.call.bind(DataView.prototype.getInt16),
      jC: x0 => x0.navigator,
      jD: () => new TextDecoder("utf-8", {fatal: true}),
      jE: x0 => x0.buttons,
      jF: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      jG: (x0,x1) => { x0.name = x1 },
      jH: () => globalThis.Symbol,
      jI: x0 => x0.naturalHeight,
      jJ: x0 => x0.getReader(),
      jK: x0 => x0.style,
      k: o => o,
      kB: o => o instanceof Uint8ClampedArray,
      kC: Function.prototype.call.bind(String.prototype.toLowerCase),
      kD: () => new TextDecoder("utf-8", {fatal: false}),
      kE: x0 => x0.ctrlKey,
      kF: x0 => ({runApp: x0}),
      kG: (x0,x1) => { x0.placeholder = x1 },
      kH: (x0,x1) => new Intl.Segmenter(x0,x1),
      kI: x0 => x0.naturalWidth,
      kJ: x0 => x0.read(),
      kK: (o, p, v) => o[p] = v,
      l: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      lB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      lC: Object.is,
      lD: (a, i, v) => a[i] = v,
      lE: x0 => x0.y,
      lF: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      lG: (x0,x1) => { x0.autocomplete = x1 },
      lH: x0 => x0.Segmenter,
      lI: x0 => x0.decode(),
      lJ: x0 => x0.value,
      lK: () => globalThis.document,
      m: () => globalThis.Math,
      mB: Function.prototype.call.bind(DataView.prototype.setInt32),
      mC: x0 => x0.vendor,
      mD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      mE: x0 => x0.x,
      mF: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      mG: (x0,x1) => { x0.name = x1 },
      mH: x0 => x0.buffer,
      mI: (x0,x1) => { x0.decoding = x1 },
      mJ: x0 => x0.done,
      mK: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      n: (x0,x1) => x0.prepend(x1),
      nB: Function.prototype.call.bind(DataView.prototype.setUint32),
      nC: (x0,x1) => x0.createTextNode(x1),
      nD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI16ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      nE: x0 => x0.scrollTop,
      nF: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      nG: (x0,x1) => { x0.placeholder = x1 },
      nH: x0 => x0.wasmMemory,
      nI: (x0,x1) => { x0.crossOrigin = x1 },
      nJ: x0 => x0.body,
      nK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      o: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      oB: Function.prototype.call.bind(DataView.prototype.setInt16),
      oC: (x0,x1) => { x0.id = x1 },
      oD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      oE: x0 => x0.offsetTop,
      oF: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      oG: (x0,x1) => { x0.action = x1 },
      oH: () => globalThis.window._flutter_skwasmInstance,
      oI: (x0,x1) => x0.createObjectURL(x1),
      oJ: x0 => x0.headers,
      oK: x0 => x0.preventDefault(),
      p: b => !!b,
      pB: Function.prototype.call.bind(DataView.prototype.setUint16),
      pC: (x0,x1) => { x0.nonce = x1 },
      pD: x0 => x0.visibilityState,
      pE: x0 => x0.scrollLeft,
      pF: x0 => x0.history,
      pG: (x0,x1) => { x0.method = x1 },
      pH: () => new TextDecoder(),
      pI: x0 => x0.URL,
      pJ: x0 => x0.signal,
      pK: x0 => x0.shiftKey,
      q: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      qB: Function.prototype.call.bind(DataView.prototype.setUint8),
      qC: x0 => x0.nonce,
      qD: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      qE: x0 => x0.offsetLeft,
      qF: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      qG: (x0,x1) => { x0.noValidate = x1 },
      qH: (map, o, v) => map.set(o, v),
      qI: x0 => new Blob(x0),
      qJ: (x0,x1,x2) => x0.insertBefore(x1,x2),
      qK: x0 => x0.metaKey,
      r: (x0,x1) => x0.focus(x1),
      rB: Function.prototype.call.bind(DataView.prototype.setInt8),
      rC: () => globalThis.window.flutterConfiguration,
      rD: x0 => x0.disconnect(),
      rE: x0 => x0.offsetParent,
      rF: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      rG: (x0,x1) => x0.removeAttribute(x1),
      rH: (map, o) => map.get(o),
      rI: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      rJ: x0 => x0.id,
      rK: x0 => x0.altKey,
      s: () => ({}),
      sB: Function.prototype.call.bind(DataView.prototype.getInt8),
      sC: (x0,x1) => x0.attachShadow(x1),
      sD: x0 => new Intl.Locale(x0),
      sE: (o, p, r) => o.replace(p, () => r),
      sF: o => Object.keys(o),
      sG: x0 => x0.isConnected,
      sH: () => new WeakMap(),
      sI: x0 => new window.ImageDecoder(x0),
      sJ: x0 => x0.offsetHeight,
      sK: x0 => x0.ctrlKey,
      t: (o, p, v) => o[p] = v,
      tB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      tC: (x0,x1) => x0.createElement(x1),
      tD: x0 => x0.region,
      tE: (o, p, r) => o.replaceAll(p, () => r),
      tF: x0 => x0.state,
      tG: x0 => x0.click(),
      tH: (handle) => clearInterval(handle),
      tI: x0 => x0.name,
      tJ: x0 => x0.offsetWidth,
      tK: (x0,x1) => x0.getAttribute(x1),
      u: () => [],
      uB: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      uC: x0 => x0.scale,
      uD: x0 => x0.script,
      uE: x0 => x0.deltaMode,
      uF: x0 => x0.state,
      uG: (x0,x1) => x0.getElementsByClassName(x1),
      uH: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      uI: x0 => x0.repetitionCount,
      uJ: x0 => x0.stopPropagation(),
      uK: (x0,x1) => x0.closest(x1),
      v: (a, i) => a.push(i),
      vB: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      vC: x0 => x0.visualViewport,
      vD: x0 => x0.language,
      vE: x0 => x0.deltaY,
      vF: (x0,x1) => x0.go(x1),
      vG: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      vH: () => Date.now(),
      vI: x0 => x0.frameCount,
      vJ: x0 => x0.disabled,
      vK: x0 => x0.tagName,
      w: x0 => new Int8Array(x0),
      wB: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      wC: x0 => x0.devicePixelRatio,
      wD: x0 => x0.languages,
      wE: x0 => x0.deltaX,
      wF: x0 => x0.hash,
      wG: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      wH: x0 => x0.debugSkipFontRetryDelay,
      wI: x0 => x0.selectedTrack,
      wJ: (x0,x1) => { x0.min = x1 },
      wK: x0 => x0.target,
      x: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      xB: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      xC: x0 => x0.height,
      xD: (x0,x1) => x0.observe(x1),
      xE: x0 => x0.wheelDeltaY,
      xF: x0 => x0.location,
      xG: (x0,x1) => x0.dispatchEvent(x1),
      xH: (x0,x1,x2) => x0.set(x1,x2),
      xI: x0 => x0.completed,
      xJ: (x0,x1) => { x0.max = x1 },
      xK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      y: x0 => new Uint8Array(x0),
      yB: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      yC: x0 => x0.width,
      yD: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      yE: x0 => x0.wheelDeltaX,
      yF: x0 => x0.search,
      yG: (x0,x1) => x0.createEvent(x1),
      yH: x0 => x0.fontFallbackBaseUrl,
      yI: x0 => x0.ready,
      yJ: (x0,x1) => { x0.disabled = x1 },
      yK: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      z: x0 => new Uint8ClampedArray(x0),
      zB: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      zC: x0 => x0.screen,
      zD: x0 => new ResizeObserver(x0),
      zE: x0 => x0.key,
      zF: x0 => x0.pathname,
      zG: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      zH: x0 => new WeakRef(x0),
      zI: x0 => x0.tracks,
      zJ: (x0,x1) => { x0.scrollLeft = x1 },
      zK: () => globalThis.window,

    };

    const baseImports = {
      _: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      WebAssembly: {
        JSTag: WebAssembly.JSTag,
      },
      s: [
        "([ \r\n\t]+)|([!-\\[\\]-‧‪-퟿豈-￿][̀-ͯ]*|[\ud800-\udbff][\udc00-\udfff][̀-ͯ]*|\\\\verb\\*([^]).*?\\3|\\\\verb([^*a-zA-Z]).*?\\4|\\\\operatorname\\*|\\\\[a-zA-Z@]+[ \r\n\t]*|\\\\[^\ud800-\udfff])",
      ],
      "": new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
