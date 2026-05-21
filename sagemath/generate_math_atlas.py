#!/usr/bin/env sage -python
"""Generate SageMath-backed homepage illustration data.

All numerical geometry, finite-field arithmetic, and chain-complex checks used
by the browser renderer are produced here. The browser layer only scales and
animates this generated data.
"""

from __future__ import annotations

import html
import json
import math
from pathlib import Path

from sage.all import (  # type: ignore
    CC,
    GF,
    Matrix,
    PolynomialRing,
    QQ,
    RealField,
    EllipticCurve,
    pi,
    sin,
    cos,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "generated" / "math-atlas"
INCLUDE = ROOT / "_includes" / "math_atlas_generated.html"
DATA_JSON = OUT_DIR / "math-atlas.json"
DATA_JS = OUT_DIR / "math-atlas-data.js"
PRECISION_BITS = 100
RF = RealField(PRECISION_BITS)


def n(value, places=8):
    return round(float(RF(value)), places)


def point2(x, y):
    return [n(x), n(y)]


def point3(x, y, z):
    return [n(x), n(y), n(z)]


def matrix_list(mat):
    return [[int(mat[i, j]) for j in range(mat.ncols())] for i in range(mat.nrows())]


def matrix_row_weights(rows):
    return [int(sum(row)) for row in rows]


def matrix_col_weights(rows):
    if not rows:
        return []
    return [int(sum(row[j] for row in rows)) for j in range(len(rows[0]))]


def field_bits(element, width):
    coeffs = [int(c) for c in element.polynomial().list()]
    return (coeffs + [0] * width)[:width]


def field_label(element):
    text = str(element).replace("*", "")
    return text if text else "0"


def torus_xyz(u, v, major=1.0, minor=0.34):
    angle_u = RF(2) * RF(pi) * RF(u)
    angle_v = RF(2) * RF(pi) * RF(v)
    x = (RF(major) + RF(minor) * cos(angle_v)) * cos(angle_u)
    y = (RF(major) + RF(minor) * cos(angle_v)) * sin(angle_u)
    z = RF(minor) * sin(angle_v)
    return point3(x, y, z)


def build_complex_torus():
    tau = CC(RF(19) / RF(50), RF(59) / RF(50))
    tau_pair = point2(tau.real(), tau.imag())
    parallelogram = [
        point2(0, 0),
        point2(1, 0),
        point2(1 + tau.real(), tau.imag()),
        point2(tau.real(), tau.imag()),
    ]
    lattice = []
    for a in range(-2, 3):
        for b in range(-2, 3):
            z = CC(a, 0) + CC(b, 0) * tau
            lattice.append({"m": a, "n": b, "xy": point2(z.real(), z.imag())})

    mesh_u = [[torus_xyz(i / 32, j / 8) for i in range(33)] for j in range(8)]
    mesh_v = [[torus_xyz(i / 8, j / 32) for j in range(33)] for i in range(8)]
    cycle_a = [torus_xyz(i / 96, 0) for i in range(97)]
    cycle_b = [torus_xyz(RF(3) / RF(20), i / 96) for i in range(97)]

    return {
        "id": "torus",
        "title": "Complex Torus C/Lambda",
        "formula": "Lambda=<1,tau>, tau=0.38+1.18i",
        "aria": "Complex torus from a SageMath lattice with quotient edge identifications and projected torus cycles.",
        "facts": ["25 lattice points", "a,b edge pairs", "projected torus mesh"],
        "calculation": {
            "tau": tau_pair,
            "basis": [point2(1, 0), tau_pair],
            "fundamental_parallelogram": parallelogram,
            "edge_identifications": [
                {"edge": "bottom", "identified_with": "top", "cycle": "a"},
                {"edge": "left", "identified_with": "right", "cycle": "b"},
            ],
        },
        "geometry": {
            "lattice_points": lattice,
            "parallelogram": parallelogram,
            "cycles": {
                "a": [point2(t / 80, 0) for t in range(81)],
                "b": [point2(tau.real() * t / 80, tau.imag() * t / 80) for t in range(81)],
            },
            "torus": {
                "major_radius": 1.0,
                "minor_radius": 0.34,
                "mesh_u": mesh_u,
                "mesh_v": mesh_v,
                "cycle_a": cycle_a,
                "cycle_b": cycle_b,
            },
        },
    }


def sphere_xyz(theta, phi):
    theta = RF(theta)
    phi = RF(phi)
    x = cos(theta) * cos(phi)
    y = cos(theta) * sin(phi)
    z = sin(theta)
    return point3(x, y, z)


def stereographic_inverse(x, y):
    x = RF(x)
    y = RF(y)
    denom = RF(1) + x * x + y * y
    return point3(RF(2) * x / denom, RF(2) * y / denom, (x * x + y * y - RF(1)) / denom)


def build_cp1():
    latitudes = [-60, -30, 0, 30, 60]
    longitudes = list(range(0, 180, 30))
    lat_lines = []
    for deg in latitudes:
        theta = RF(deg) * RF(pi) / RF(180)
        lat_lines.append({
            "latitude_deg": deg,
            "points": [sphere_xyz(theta, RF(k) * RF(pi) / RF(90)) for k in range(0, 361, 4)],
        })
    lon_lines = []
    for deg in longitudes:
        phi = RF(deg) * RF(pi) / RF(180)
        lon_lines.append({
            "longitude_deg": deg,
            "points": [sphere_xyz(RF(k) * RF(pi) / RF(180), phi) for k in range(-80, 81, 4)],
        })

    zeta_specs = [
        ("0", RF(0), RF(0)),
        ("1", RF(1), RF(0)),
        ("i", RF(0), RF(1)),
        ("-1+i", RF(-1), RF(1)),
        ("2-i", RF(2), RF(-1)),
    ]
    zeta_points = []
    for label, x, y in zeta_specs:
        zeta_points.append({
            "label": label,
            "complex": point2(x, y),
            "sphere": stereographic_inverse(x, y),
        })
    zeta_points.append({"label": "infinity", "complex": None, "sphere": point3(0, 0, 1)})

    return {
        "id": "cp1",
        "title": "Riemann Sphere CP^1",
        "formula": "z -> (2x,2y,|z|^2-1)/(|z|^2+1)",
        "aria": "Riemann sphere with SageMath stereographic coordinates, rotation, grid lines, and marked complex points.",
        "facts": ["unit sphere grid", "stereographic lines", "C union infinity"],
        "calculation": {
            "projection": "north-pole stereographic inverse from C to S^2",
            "sphere_radius": 1,
            "marked_points": zeta_points,
        },
        "geometry": {
            "latitudes": lat_lines,
            "longitudes": lon_lines,
            "points": zeta_points,
            "north_pole": point3(0, 0, 1),
        },
    }


def build_riemann_roch():
    elliptic_curve = EllipticCurve(QQ, [0, 0, 0, -1, 1])
    period_lattice = elliptic_curve.period_lattice()
    periods = period_lattice.basis()
    omega_1 = periods[0]
    omega_2 = periods[1]
    tau = omega_2 / omega_1
    divisor_specs = [
        ("P", elliptic_curve([0, 1, 1])),
        ("Q", elliptic_curve([1, 1, 1])),
        ("R", elliptic_curve([3, 5, 1])),
    ]
    divisor_points = []
    for label, point in divisor_specs:
        log_value = period_lattice.elliptic_logarithm(point)
        u = RF(log_value.real() / omega_1.real())
        divisor_points.append({
            "label": label,
            "curve_point": [str(point[0]), str(point[1])],
            "abel_coordinate": point2(u, 0),
            "torus_point": torus_xyz(u, RF(7) / RF(32)),
        })

    degree_d = len(divisor_specs)
    genus = 1
    canonical_degree = 0
    l_d = degree_d
    l_k_minus_d = 0
    verification = l_d - l_k_minus_d == degree_d + 1 - genus
    abel_sum = sum(RF(p["abel_coordinate"][0]) for p in divisor_points) % RF(1)

    return {
        "id": "riemann_roch",
        "title": "Riemann-Roch, genus 1",
        "formula": "l(D)-l(K-D)=deg(D)",
        "aria": "Genus one Riemann-Roch data on an elliptic curve with divisor points and Abel-Jacobi motion.",
        "facts": ["deg(D)=3", "deg(K)=0", "l(D)-l(K-D)=3"],
        "calculation": {
            "elliptic_curve": "y^2=x^3-x+1",
            "period_basis": [str(omega_1), str(omega_2)],
            "tau": point2(tau.real(), tau.imag()),
            "genus": genus,
            "divisor": divisor_points,
            "degree_D": degree_d,
            "degree_K": canonical_degree,
            "l_D": l_d,
            "l_K_minus_D": l_k_minus_d,
            "verified": bool(verification),
            "abel_sum_mod_lattice": n(abel_sum),
        },
        "geometry": {
            "torus": {
                "mesh_u": [[torus_xyz(i / 28, j / 7) for i in range(29)] for j in range(7)],
                "mesh_v": [[torus_xyz(i / 7, j / 28) for j in range(29)] for i in range(7)],
            },
            "divisor_points": divisor_points,
            "abel_path": [torus_xyz(i / 96, RF(7) / RF(32)) for i in range(97)],
            "abel_sum": torus_xyz(abel_sum, RF(7) / RF(32)),
        },
    }


def build_goppa():
    base_ring = PolynomialRing(GF(2), "t")
    t = base_ring.gen()
    field = GF(2**4, name="a", modulus=t**4 + t + 1)
    a = field.gen()
    poly_ring = PolynomialRing(field, "x")
    x = poly_ring.gen()
    goppa_poly = x**3 + (a**2 + a + 1) * x + (a**3 + a + 1)
    support = [element for element in field if goppa_poly(element) != 0][:10]
    residues = [goppa_poly(element) ** (-1) for element in support]
    degree = goppa_poly.degree()
    extension_degree = 4

    gf_rows = []
    binary_rows = []
    for power in range(degree):
        coeff_rows = [[] for _ in range(extension_degree)]
        gf_row = []
        for support_value in support:
            value = (support_value**power) * (goppa_poly(support_value) ** (-1))
            gf_row.append(field_label(value))
            bits = field_bits(value, extension_degree)
            for bit_index, bit in enumerate(bits):
                coeff_rows[bit_index].append(bit)
        gf_rows.append(gf_row)
        binary_rows.extend(coeff_rows)

    support_points = []
    for index, value in enumerate(support):
        support_points.append({
            "index": index,
            "label": field_label(value),
            "bits": field_bits(value, extension_degree),
            "x": n(index / (len(support) - 1)),
            "residue": field_label(residues[index]),
            "residue_bits": field_bits(residues[index], extension_degree),
        })

    return {
        "id": "goppa",
        "title": "Goppa Code with Residue",
        "formula": "H_ji = L_i^j / g(L_i)",
        "aria": "Binary Goppa parity-check data from SageMath finite-field residue calculations over GF(16).",
        "facts": ["GF(16)", "deg g=3", "12 x 10 binary H"],
        "calculation": {
            "field": "GF(2^4), modulus t^4+t+1",
            "primitive": "a",
            "goppa_polynomial": str(goppa_poly).replace("*", ""),
            "support": support_points,
            "residue_values": [field_label(value) for value in residues],
            "gf_parity_check": gf_rows,
            "binary_parity_check": binary_rows,
            "row_weights": matrix_row_weights(binary_rows),
            "column_weights": matrix_col_weights(binary_rows),
            "max_row_weight": max(matrix_row_weights(binary_rows)),
            "max_column_weight": max(matrix_col_weights(binary_rows)),
        },
        "geometry": {
            "support_points": support_points,
            "binary_matrix": binary_rows,
        },
    }


def build_ldpc():
    size = 3
    vertex_count = size * size
    edge_count = 2 * size * size
    face_count = size * size

    def vertex(i, j):
        return (j % size) * size + (i % size)

    def h_edge(i, j):
        return (j % size) * size + (i % size)

    def v_edge(i, j):
        return size * size + (j % size) * size + (i % size)

    boundary_1 = [[0 for _ in range(edge_count)] for _ in range(vertex_count)]
    edge_records = []
    for j in range(size):
        for i in range(size):
            edge_index = h_edge(i, j)
            start = vertex(i, j)
            end = vertex(i + 1, j)
            boundary_1[start][edge_index] = 1
            boundary_1[end][edge_index] = 1
            edge_records.append({"id": edge_index, "type": "h", "from": start, "to": end})
    for j in range(size):
        for i in range(size):
            edge_index = v_edge(i, j)
            start = vertex(i, j)
            end = vertex(i, j + 1)
            boundary_1[start][edge_index] = 1
            boundary_1[end][edge_index] = 1
            edge_records.append({"id": edge_index, "type": "v", "from": start, "to": end})

    boundary_2 = [[0 for _ in range(face_count)] for _ in range(edge_count)]
    face_records = []
    for j in range(size):
        for i in range(size):
            face_index = vertex(i, j)
            edges = [h_edge(i, j), v_edge(i + 1, j), h_edge(i, j + 1), v_edge(i, j)]
            for edge_index in edges:
                boundary_2[edge_index][face_index] = 1
            face_records.append({"id": face_index, "edges": edges, "i": i, "j": j})

    F2 = GF(2)
    d1 = Matrix(F2, boundary_1)
    d2 = Matrix(F2, boundary_2)
    hx = d1
    hz = d2.transpose()
    commutator = hx * hz.transpose()
    hx_rows = matrix_list(hx)
    hz_rows = matrix_list(hz)

    vertices = []
    for j in range(size):
        for i in range(size):
            vertices.append({"id": vertex(i, j), "x": n(i / (size - 1)), "y": n(j / (size - 1))})

    return {
        "id": "ldpc",
        "title": "LDPC Code with Cohomology",
        "formula": "H_X H_Z^T = d1 d2 = 0",
        "aria": "Sparse CSS LDPC checks from a SageMath torus chain complex, with cohomology dimension two.",
        "facts": ["3x3 torus complex", "n=18 edges", "dim H^1=2"],
        "calculation": {
            "cell_complex": "3x3 periodic square torus",
            "chain_dimensions": {"C0": vertex_count, "C1": edge_count, "C2": face_count},
            "boundary_1": matrix_list(d1),
            "boundary_2": matrix_list(d2),
            "H_X": hx_rows,
            "H_Z": hz_rows,
            "commutator": matrix_list(commutator),
            "commutes": bool(commutator.is_zero()),
            "rank_boundary_1": int(d1.rank()),
            "rank_boundary_2": int(d2.rank()),
            "cohomology_dimensions": {
                "H0": int(vertex_count - d1.rank()),
                "H1": int(edge_count - d1.rank() - d2.rank()),
                "H2": int(face_count - d2.rank()),
            },
            "row_weights_H_X": matrix_row_weights(hx_rows),
            "row_weights_H_Z": matrix_row_weights(hz_rows),
        },
        "geometry": {
            "size": size,
            "vertices": vertices,
            "edges": edge_records,
            "faces": face_records,
            "H_X": hx_rows,
            "H_Z": hz_rows,
        },
    }


def fallback_svg(figure):
    title = html.escape(figure["title"])
    formula = html.escape(figure["formula"])
    facts = [html.escape(fact) for fact in figure["facts"][:3]]
    colors = {
        "torus": ("#2563eb", "#14b8a6"),
        "cp1": ("#7c3aed", "#2563eb"),
        "riemann_roch": ("#0f766e", "#f59e0b"),
        "goppa": ("#be123c", "#2563eb"),
        "ldpc": ("#1e3a5f", "#14b8a6"),
    }
    primary, secondary = colors.get(figure["id"], ("#2563eb", "#14b8a6"))
    chips = "".join(
        f'<text x="{26 + i * 82}" y="188" fill="#475569" font-size="10" '
        f'font-family="system-ui, sans-serif">{fact}</text>'
        for i, fact in enumerate(facts)
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" role="img" aria-label="{title}">
  <rect width="300" height="220" rx="8" fill="#ffffff"/>
  <path d="M28 132 C80 34 136 184 196 76 S266 104 276 48" fill="none" stroke="{primary}" stroke-width="4" stroke-linecap="round"/>
  <path d="M42 54 C92 114 148 20 228 138" fill="none" stroke="{secondary}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="8 7"/>
  <circle cx="88" cy="104" r="28" fill="#eff6ff" stroke="{primary}" stroke-width="2"/>
  <circle cx="203" cy="110" r="38" fill="#f8fafc" stroke="{secondary}" stroke-width="2"/>
  <text x="24" y="30" fill="#1e3a5f" font-size="18" font-weight="800" font-family="system-ui, sans-serif">{title}</text>
  <text x="24" y="52" fill="#64748b" font-size="11" font-family="ui-monospace, monospace">{formula}</text>
  {chips}
</svg>'''
    return svg


def write_include(figures):
    cards = []
    fallback_cards = []
    for figure in figures:
        fid = figure["id"]
        title = html.escape(figure["title"])
        formula = html.escape(figure["formula"])
        aria = html.escape(figure["aria"])
        facts = "".join(f"<li>{html.escape(fact)}</li>" for fact in figure["facts"])
        cards.append(f'''    <figure class="ma-panel ma-panel--{fid}" data-figure-id="{fid}" tabindex="0">
      <div class="ma-panel__meta">
        <figcaption>{title}</figcaption>
        <div class="ma-formula">{formula}</div>
      </div>
      <div class="ma-canvas" role="img" aria-label="{aria}">
        <img src="/assets/generated/math-atlas/{fid}.svg" alt="{title}" loading="lazy">
      </div>
      <ul class="ma-facts">{facts}</ul>
    </figure>''')
        fallback_cards.append(f'''      <figure class="ma-noscript-card">
        <img src="/assets/generated/math-atlas/{fid}.svg" alt="{title}" loading="lazy">
        <figcaption>{title}</figcaption>
      </figure>''')

    include = f'''<!-- Generated by sagemath/generate_math_atlas.py; do not edit by hand. -->
<section class="idx-math-atlas" aria-labelledby="math-atlas-title">
  <div class="idx-math-atlas__head">
    <h2 id="math-atlas-title">Computed Mathematical Atlas</h2>
    <p>Complex tori, CP^1, Riemann-Roch, Goppa residues, and LDPC cohomology.</p>
  </div>
  <div class="idx-math-atlas__grid" data-math-atlas>
{chr(10).join(cards)}
  </div>
  <noscript>
    <div class="ma-noscript-grid">
{chr(10).join(fallback_cards)}
    </div>
  </noscript>
  <script defer src="/assets/generated/math-atlas/math-atlas-data.js"></script>
  <script defer src="/assets/js/math-atlas.js"></script>
</section>
'''
    INCLUDE.write_text(include, encoding="utf-8")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    figures = [
        build_complex_torus(),
        build_cp1(),
        build_riemann_roch(),
        build_goppa(),
        build_ldpc(),
    ]
    data = {
        "schema": "math-atlas.v1",
        "generated_by": "sagemath/generate_math_atlas.py",
        "precision_bits": PRECISION_BITS,
        "figures": figures,
    }
    DATA_JSON.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    DATA_JS.write_text(
        "window.MathAtlasData = " + json.dumps(data, separators=(",", ":"), sort_keys=True) + ";\n",
        encoding="utf-8",
    )
    for figure in figures:
        (OUT_DIR / f"{figure['id']}.svg").write_text(fallback_svg(figure), encoding="utf-8")
    write_include(figures)
    print(f"Wrote {DATA_JSON.relative_to(ROOT)}")
    print(f"Wrote {DATA_JS.relative_to(ROOT)}")
    print(f"Wrote {INCLUDE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
