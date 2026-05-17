/**
 * DOMMatrix & DOMMatrixReadOnly Polyfill for Node.js / Vercel Serverless
 * Prevents "ReferenceError: DOMMatrix is not defined" in modern pdfjs-dist / pdf-parse
 */
class DOMMatrixShim {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  
  // Standard 3D transformation properties
  m11: number; m12: number; m13 = 0; m14 = 0;
  m21: number; m22: number; m23 = 0; m24 = 0;
  m31 = 0; m32 = 0; m33 = 1; m34 = 0;
  m41: number; m42: number; m43 = 0; m44 = 1;
  is2D = true;
  isIdentity = true;

  constructor(init?: any) {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;

    if (init) {
      if (Array.isArray(init)) {
        this.a = init[0] ?? 1;
        this.b = init[1] ?? 0;
        this.c = init[2] ?? 0;
        this.d = init[3] ?? 1;
        this.e = init[4] ?? 0;
        this.f = init[5] ?? 0;
      } else if (typeof init === "object") {
        this.a = init.a ?? 1;
        this.b = init.b ?? 0;
        this.c = init.c ?? 0;
        this.d = init.d ?? 1;
        this.e = init.e ?? 0;
        this.f = init.f ?? 0;
      } else if (typeof init === "string") {
        // Simple matrix string parser: "matrix(a, b, c, d, e, f)"
        const match = init.match(/matrix\(([^)]+)\)/);
        if (match) {
          const parts = match[1].split(",").map(Number);
          this.a = parts[0] ?? 1;
          this.b = parts[1] ?? 0;
          this.c = parts[2] ?? 0;
          this.d = parts[3] ?? 1;
          this.e = parts[4] ?? 0;
          this.f = parts[5] ?? 0;
        }
      }
    }

    // Set matrix indices mapping
    this.m11 = this.a;
    this.m12 = this.b;
    this.m21 = this.c;
    this.m22 = this.d;
    this.m41 = this.e;
    this.m42 = this.f;

    this.isIdentity = this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.e === 0 && this.f === 0;
  }

  toString() {
    return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
  }
}

// Attach polyfill globally if running in server environments
if (typeof globalThis.DOMMatrix === "undefined") {
  (globalThis as any).DOMMatrix = DOMMatrixShim;
}
if (typeof globalThis.DOMMatrixReadOnly === "undefined") {
  (globalThis as any).DOMMatrixReadOnly = DOMMatrixShim;
}
