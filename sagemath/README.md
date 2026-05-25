# SageMath Homepage Atlas

This directory owns the generated mathematical illustration data used by the
homepage section after the research statement.

Run:

```sh
./sagemath/build_math_atlas.sh
```

The build script runs `sage -python sagemath/generate_math_atlas.py` with
`HOME` and `DOT_SAGE` redirected to `/tmp/sage-home`, because Sage writes
temporary interface state during startup.

Generated outputs:

- `_includes/math_atlas_generated.html`
- `assets/generated/math-atlas/math-atlas.json`
- `assets/generated/math-atlas/math-atlas-data.js`
- `assets/generated/math-atlas/{torus,cp1,riemann_roch,goppa,ldpc}.svg`

The browser renderer is `assets/js/math-atlas.js`. It uses the generated data
for coordinates, matrices, finite-field residues, and cohomology checks, then
applies only scaling, projection, animation, and interaction in JavaScript.

## Mathematical Data

- Complex torus: `Lambda=<1,tau>` with `tau=19/50 + 59/50 i`, its fundamental
  parallelogram, a 3 by 3 lattice window, quotient edge pairs, `a` and `b`
  cycles, a sampled projected torus mesh, quotient-relation samples that move
  matched flat-domain points with their images on the torus, and the centers of
  a 3 by 3 translated-parallelogram window collapsing to the same quotient
  point on the torus.
- Riemann sphere: unit-sphere latitude and longitude samples, north-pole
  stereographic inverse coordinates, and marked points in `C union infinity`.
- Riemann-Roch: two Sage-generated cases for
  `l(D)-l(K-D)=deg(D)+1-g`. The genus-zero `CP^1` case uses the Riemann
  sphere with `D=A+B` at `0` and `1`, `deg(K)=-2`, identity
  `3 - 0 = 2 + 1 - 0`, and sampled rational functions
  `f_t(z)=1+a_t/z+b_t/(z-1)` whose zeros move while the poles remain fixed.
  The genus-one case uses the elliptic curve `y^2=x^3-x+1`, period basis,
  divisor `D=P+Q+R` with `P=(0,1)`, `Q=(1,1)`, `R=(3,5)`, identity
  `3 - 0 = 3 + 1 - 1`, and sampled theta/sigma quotient divisor data with
  `sum Z_i(t)=P+Q+R mod Lambda` for every animation phase.
- Goppa code: `GF(2^4)` with modulus `t^4+t+1`, a degree-three Goppa
  polynomial, finite-field support, residues `1/g(L_i)`, a field-valued
  parity-check matrix, binary expansion, and row/column weights.
- LDPC cohomology: a `3x3` periodic square-torus chain complex over `GF(2)`,
  boundary maps `d1`, `d2`, CSS checks `H_X=d1`, `H_Z=d2^T`, verified
  `H_X H_Z^T=0`, ranks, and cohomology dimensions.
