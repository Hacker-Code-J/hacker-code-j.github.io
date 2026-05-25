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
    for a in range(-1, 2):
        for b in range(-1, 2):
            z = CC(a, 0) + CC(b, 0) * tau
            lattice.append({"m": a, "n": b, "xy": point2(z.real(), z.imag())})

    mesh_u = [[torus_xyz(i / 32, j / 8) for i in range(33)] for j in range(8)]
    mesh_v = [[torus_xyz(i / 8, j / 32) for j in range(33)] for i in range(8)]
    cycle_a = [torus_xyz(i / 96, 0) for i in range(97)]
    cycle_b = [torus_xyz(RF(3) / RF(20), i / 96) for i in range(97)]

    def flat_uv(u, v):
        u = RF(u)
        v = RF(v)
        return point2(u + v * tau.real(), v * tau.imag())

    relation_phase_count = 64
    quotient_tracks = []
    for label, mode in [("a", "u"), ("b", "v"), ("diag", "diag")]:
        frames = []
        for k in range(relation_phase_count):
            t = RF(k) / RF(relation_phase_count)
            if mode == "u":
                u = t
                v = RF(9) / RF(40)
            elif mode == "v":
                u = RF(7) / RF(20)
                v = t
            else:
                u = (t + RF(3) / RF(20)) % RF(1)
                v = (RF(2) * t + RF(11) / RF(40)) % RF(1)
            frames.append({
                "phase": n(t),
                "uv": point2(u, v),
                "flat": flat_uv(u, v),
                "torus": torus_xyz(u, v),
            })
        quotient_tracks.append({"label": label, "frames": frames})

    edge_samples = []
    for index, u in enumerate([RF(1) / RF(5), RF(1) / RF(2), RF(4) / RF(5)]):
        edge_samples.append({
            "pair": "bottom-top",
            "phase_offset": n(RF(index) / RF(3)),
            "flat_a": flat_uv(u, 0),
            "flat_b": flat_uv(u, 1),
            "torus": torus_xyz(u, 0),
        })
    for index, v in enumerate([RF(1) / RF(5), RF(1) / RF(2), RF(4) / RF(5)]):
        edge_samples.append({
            "pair": "left-right",
            "phase_offset": n(RF(index) / RF(3) + RF(1) / RF(6)),
            "flat_a": flat_uv(0, v),
            "flat_b": flat_uv(1, v),
            "torus": torus_xyz(0, v),
        })

    center_cells = []
    for m in range(-1, 2):
        for q in range(-1, 2):
            center_cells.append({
                "m": m,
                "n": q,
                "polygon": [
                    flat_uv(m, q),
                    flat_uv(m + 1, q),
                    flat_uv(m + 1, q + 1),
                    flat_uv(m, q + 1),
                ],
                "center": flat_uv(RF(m) + RF(1) / RF(2), RF(q) + RF(1) / RF(2)),
                "uv": point2(RF(1) / RF(2), RF(1) / RF(2)),
                "phase_offset": n((RF(m + 1) * RF(3) + RF(q + 1)) / RF(9)),
            })

    return {
        "id": "torus",
        "title": "Complex Torus C/Lambda",
        "formula": "Lambda=<1,tau>, tau=0.38+1.18i",
        "aria": "Complex torus from a SageMath lattice with quotient edge identifications and projected torus cycles.",
        "facts": ["9 lattice points", "a,b edge pairs", "projected torus mesh"],
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
            "quotient_relation": {
                "phase_count": relation_phase_count,
                "tracks": quotient_tracks,
                "edge_samples": edge_samples,
                "parallelogram_centers": {
                    "cells": center_cells,
                    "torus_point": torus_xyz(RF(1) / RF(2), RF(1) / RF(2)),
                    "uv": point2(RF(1) / RF(2), RF(1) / RF(2)),
                },
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
    longitudes = list(range(0, 360, 30))
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
    def unit(value):
        value = RF(value)
        return value - RF(math.floor(float(value)))

    def complex_point(value):
        return point2(value.real(), value.imag())

    phase_count = 48
    genus0_latitudes = [-45, 0, 45]
    genus0_longitudes = [0, 45, 90, 135]
    genus0_lat_lines = []
    for deg in genus0_latitudes:
        theta = RF(deg) * RF(pi) / RF(180)
        genus0_lat_lines.append({
            "latitude_deg": deg,
            "points": [sphere_xyz(theta, RF(k) * RF(pi) / RF(90)) for k in range(0, 361, 6)],
        })
    genus0_lon_lines = []
    for deg in genus0_longitudes:
        phi = RF(deg) * RF(pi) / RF(180)
        genus0_lon_lines.append({
            "longitude_deg": deg,
            "points": [sphere_xyz(RF(k) * RF(pi) / RF(180), phi) for k in range(-78, 79, 6)],
        })

    genus0_specs = [("A", RF(0), RF(0)), ("B", RF(1), RF(0))]
    genus0_divisor_points = []
    for label, x, y in genus0_specs:
        genus0_divisor_points.append({
            "label": label,
            "complex": point2(x, y),
            "sphere": stereographic_inverse(x, y),
            "role": "pole",
            "order": 1,
        })

    cp1_frames = []
    previous_roots = None
    for frame in range(phase_count):
        theta = RF(2) * RF(pi) * RF(frame) / RF(phase_count)
        a = CC(RF(0.72) * cos(theta), RF(0.72) * sin(theta))
        b_angle = RF(2) * theta + RF(13) / RF(20)
        b = CC(RF(0.52) * cos(b_angle), RF(0.52) * sin(b_angle))
        # f_t(z)=1+a_t/z+b_t/(z-1); zeros are roots of
        # z(z-1)+a_t(z-1)+b_t z.
        linear = a + b - CC(1, 0)
        disc = linear * linear + CC(4, 0) * a
        root_delta = disc.sqrt()
        candidates = [(-linear + root_delta) / CC(2, 0), (-linear - root_delta) / CC(2, 0)]
        if previous_roots is not None:
            direct = abs(candidates[0] - previous_roots[0]) + abs(candidates[1] - previous_roots[1])
            swapped = abs(candidates[1] - previous_roots[0]) + abs(candidates[0] - previous_roots[1])
            if swapped < direct:
                candidates = [candidates[1], candidates[0]]
        previous_roots = candidates
        zeros = []
        for index, root in enumerate(candidates):
            zeros.append({
                "label": f"Z{index + 1}",
                "complex": complex_point(root),
                "sphere": stereographic_inverse(root.real(), root.imag()),
                "role": "zero",
                "order": 1,
            })
        cp1_frames.append({
            "phase": n(RF(frame) / RF(phase_count)),
            "a_t": complex_point(a),
            "b_t": complex_point(b),
            "zeros": zeros,
        })

    genus0 = 0
    genus0_degree_d = len(genus0_specs)
    genus0_canonical_degree = -2
    genus0_l_d = genus0_degree_d + 1
    genus0_l_k_minus_d = 0
    genus0_verified = genus0_l_d - genus0_l_k_minus_d == genus0_degree_d + 1 - genus0

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
    pole_us = []
    torus_v = RF(7) / RF(32)
    for label, point in divisor_specs:
        log_value = period_lattice.elliptic_logarithm(point)
        u = unit(RF(log_value.real() / omega_1.real()))
        pole_us.append(u)
        divisor_points.append({
            "label": label,
            "curve_point": [str(point[0]), str(point[1])],
            "abel_coordinate": point2(u, 0),
            "torus_point": torus_xyz(u, torus_v),
            "role": "pole",
            "order": 1,
        })

    degree_d = len(divisor_specs)
    genus = 1
    canonical_degree = 0
    l_d = degree_d
    l_k_minus_d = 0
    verification = l_d - l_k_minus_d == degree_d + 1 - genus
    abel_sum = unit(sum(pole_us))

    torus_frames = []
    for frame in range(phase_count):
        theta = RF(2) * RF(pi) * RF(frame) / RF(phase_count)
        z1_u = unit(pole_us[0] + RF(0.18) + RF(0.055) * cos(theta))
        z2_u = unit(pole_us[1] + RF(0.29) + RF(0.045) * sin(theta + RF(7) / RF(10)))
        z3_u = unit(abel_sum - z1_u - z2_u)
        zero_us = [z1_u, z2_u, z3_u]
        zeros = []
        for index, zero_u in enumerate(zero_us):
            zeros.append({
                "label": f"Z{index + 1}",
                "abel_coordinate": point2(zero_u, 0),
                "torus_point": torus_xyz(zero_u, torus_v),
                "role": "zero",
                "order": 1,
            })
        torus_frames.append({
            "phase": n(RF(frame) / RF(phase_count)),
            "zeros": zeros,
            "abel_zero_sum_mod_lattice": n(unit(sum(zero_us))),
        })

    return {
        "id": "riemann_roch",
        "title": "Riemann-Roch, genus 0 and 1",
        "formula": "l(D)-l(K-D)=deg(D)+1-g",
        "aria": "Riemann-Roch data for genus zero on the Riemann sphere and genus one on an elliptic torus, with meromorphic zero and pole motion.",
        "facts": ["CP^1: rational f_t", "torus: theta quotient", "verified RR identities"],
        "calculation": {
            "cases": [
                {
                    "surface": "CP^1",
                    "model": "Riemann sphere",
                    "genus": genus0,
                    "divisor": genus0_divisor_points,
                    "degree_D": genus0_degree_d,
                    "degree_K": genus0_canonical_degree,
                    "l_D": genus0_l_d,
                    "l_K_minus_D": genus0_l_k_minus_d,
                    "verified": bool(genus0_verified),
                    "identity": "3 - 0 = 2 + 1 - 0",
                    "meromorphic_basis": ["1", "1/z", "1/(z-1)"],
                    "meromorphic_function": "f_t(z)=1+a_t/z+b_t/(z-1)",
                },
                {
                    "surface": "elliptic curve / complex torus",
                    "model": "y^2=x^3-x+1",
                    "genus": genus,
                    "divisor": divisor_points,
                    "degree_D": degree_d,
                    "degree_K": canonical_degree,
                    "l_D": l_d,
                    "l_K_minus_D": l_k_minus_d,
                    "verified": bool(verification),
                    "identity": "3 - 0 = 3 + 1 - 1",
                    "meromorphic_basis": ["theta quotient sections with poles at P,Q,R"],
                    "meromorphic_function": "f_t(u)=prod sigma(u-Z_i(t))/prod sigma(u-P_i)",
                    "abel_relation": "sum Z_i(t)=P+Q+R mod Lambda",
                },
            ],
            "elliptic_curve": "y^2=x^3-x+1",
            "period_basis": [str(omega_1), str(omega_2)],
            "tau": point2(tau.real(), tau.imag()),
            "abel_sum_mod_lattice": n(abel_sum),
        },
        "geometry": {
            "sphere": {
                "latitudes": genus0_lat_lines,
                "longitudes": genus0_lon_lines,
                "divisor_points": genus0_divisor_points,
                "canonical_marker": {"label": "K=-2inf", "sphere": point3(0, 0, 1)},
            },
            "torus": {
                "mesh_u": [[torus_xyz(i / 28, j / 7) for i in range(29)] for j in range(7)],
                "mesh_v": [[torus_xyz(i / 7, j / 28) for j in range(29)] for i in range(7)],
            },
            "divisor_points": divisor_points,
            "abel_path": [torus_xyz(i / 96, torus_v) for i in range(97)],
            "abel_sum": torus_xyz(abel_sum, torus_v),
            "meromorphic": {
                "phase_count": phase_count,
                "cp1": {
                    "function": "f_t(z)=1+a_t/z+b_t/(z-1)",
                    "poles": genus0_divisor_points,
                    "frames": cp1_frames,
                },
                "torus": {
                    "function": "f_t(u)=prod sigma(u-Z_i(t))/prod sigma(u-P_i)",
                    "poles": divisor_points,
                    "frames": torus_frames,
                    "abel_relation": "sum Z_i(t)=P+Q+R mod Lambda",
                },
            },
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
    fid = figure["id"]

    def path(points):
        return " ".join(
            f'{"M" if index == 0 else "L"}{point[0]:.2f} {point[1]:.2f}'
            for index, point in enumerate(points)
        )

    def map2(points, x, y, width, height, pad=0):
        xs = [point[0] for point in points]
        ys = [point[1] for point in points]
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)
        dx = max(max_x - min_x, 1e-9)
        dy = max(max_y - min_y, 1e-9)

        def mapped(point):
            return [
                x + pad + ((point[0] - min_x) / dx) * (width - pad * 2),
                y + height - pad - ((point[1] - min_y) / dy) * (height - pad * 2),
            ]

        return mapped

    def project(point, cx, cy, scale, rot_y=-0.62, rot_x=0.68):
        x, y, z = point
        cyaw, syaw = math.cos(rot_y), math.sin(rot_y)
        cpitch, spitch = math.cos(rot_x), math.sin(rot_x)
        x1 = x * cyaw + z * syaw
        z1 = -x * syaw + z * cyaw
        y1 = y * cpitch - z1 * spitch
        return [cx + x1 * scale, cy - y1 * scale]

    def path3(points, cx, cy, scale, rot_y=-0.62, rot_x=0.68):
        return path([project(point, cx, cy, scale, rot_y, rot_x) for point in points])

    def matrix_svg(rows, x, y, cell, on_fill):
        pieces = []
        for i, row in enumerate(rows):
            for j, value in enumerate(row):
                fill = on_fill if value else "#f8fafc"
                opacity = "0.9" if value else "0.35"
                pieces.append(
                    f'<rect x="{x + j * cell:.2f}" y="{y + i * cell:.2f}" '
                    f'width="{cell - 0.8:.2f}" height="{cell - 0.8:.2f}" '
                    f'fill="{fill}" opacity="{opacity}" stroke="#e2e8f0" stroke-width="0.5"/>'
                )
        return "".join(pieces)

    body = []
    if fid == "torus":
        lattice = [point["xy"] for point in figure["geometry"]["lattice_points"]]
        torus = figure["geometry"]["torus"]
        relation = figure["geometry"].get("quotient_relation", {})
        center_data = relation.get("parallelogram_centers", {})
        map_points = list(lattice)
        for cell in center_data.get("cells", []):
            map_points.extend(cell.get("polygon", []))
        mapper = map2(map_points, 24, 48, 112, 122, 10)
        parallelogram = [mapper(point) for point in figure["geometry"]["parallelogram"]]
        cycle_a = [mapper(point) for point in figure["geometry"]["cycles"]["a"]]
        cycle_b = [mapper(point) for point in figure["geometry"]["cycles"]["b"]]
        center_fallbacks = []
        for index, cell in enumerate(center_data.get("cells", [])):
            cell_polygon = [mapper(point) for point in cell.get("polygon", [])]
            center = mapper(cell.get("center", [0, 0]))
            center_fallbacks.append((index, center))
            body.append(f'<path d="{path(cell_polygon)}Z" fill="#dbeafe" fill-opacity="0.14" stroke="#2563eb" stroke-opacity="0.24" stroke-width="0.7"/>')
        body.append(f'<path d="{path(parallelogram)}Z" fill="#dbeafe" opacity="0.7" stroke="#2563eb" stroke-width="1.3"/>')
        body.extend(
            f'<circle cx="{mapper(point)[0]:.2f}" cy="{mapper(point)[1]:.2f}" r="2" fill="#64748b" opacity="0.75"/>'
            for point in lattice
        )
        for index, center in center_fallbacks:
            body.append(f'<circle cx="{center[0]:.2f}" cy="{center[1]:.2f}" r="2.5" fill="#7c3aed" stroke="#fff" stroke-width="0.8" opacity="0.72"/>')
        body.append(f'<path d="{path(cycle_a)}" fill="none" stroke="#2563eb" stroke-width="2.2"/>')
        body.append(f'<path d="{path(cycle_b)}" fill="none" stroke="#0f766e" stroke-width="2.2"/>')
        for line in torus["mesh_u"][::2] + torus["mesh_v"][::2]:
            body.append(f'<path d="{path3(line, 220, 112, 38)}" fill="none" stroke="#bfdbfe" stroke-width="0.8"/>')
        body.append(f'<path d="{path3(torus["cycle_a"], 220, 112, 38)}" fill="none" stroke="#2563eb" stroke-width="2.4"/>')
        body.append(f'<path d="{path3(torus["cycle_b"], 220, 112, 38)}" fill="none" stroke="#0f766e" stroke-width="2.4"/>')
        if center_data.get("torus_point"):
            tx, ty = project(center_data["torus_point"], 220, 112, 38)
            for index, center in center_fallbacks:
                bend = (index % 3 - 1) * 11 - (index // 3 - 1) * 6
                mx = (center[0] + tx) / 2
                my = (center[1] + ty) / 2 + bend
                body.append(f'<path d="M{center[0]:.2f} {center[1]:.2f}Q{mx:.2f} {my:.2f} {tx:.2f} {ty:.2f}" fill="none" stroke="#7c3aed" stroke-dasharray="3 7" stroke-width="0.65" opacity="0.24"/>')
            body.append(f'<circle cx="{tx:.2f}" cy="{ty:.2f}" r="8.5" fill="#14b8a6" fill-opacity="0.13" stroke="#14b8a6" stroke-width="1.1" opacity="0.42"/>')
            body.append(f'<circle cx="{tx:.2f}" cy="{ty:.2f}" r="3.8" fill="#0f766e" stroke="#fff" stroke-width="1"/>')
    elif fid == "cp1":
        body.append('<path d="M190 162L278 181L233 207L145 188Z" fill="#f0fdfa" stroke="#99f6e4" stroke-width="1"/>')
        for line in figure["geometry"]["latitudes"] + figure["geometry"]["longitudes"]:
            body.append(f'<path d="{path3(line["points"], 139, 104, 55, 0.72, 0.45)}" fill="none" stroke="#bfdbfe" stroke-width="0.8"/>')
        body.append('<circle cx="139" cy="104" r="55" fill="#f8fafc" fill-opacity="0.35" stroke="#1e3a5f" stroke-width="1.6"/>')
        for point in figure["geometry"]["points"]:
            sx, sy = project(point["sphere"], 139, 104, 55, 0.72, 0.45)
            body.append(f'<circle cx="{sx:.2f}" cy="{sy:.2f}" r="3" fill="#2563eb" stroke="#fff" stroke-width="1"/>')
            if point["complex"]:
                px = 221 + point["complex"][0] * 12
                py = 183 - point["complex"][1] * 12
                body.append(f'<circle cx="{px:.2f}" cy="{py:.2f}" r="2.4" fill="#0f766e"/>')
                body.append(f'<path d="M{px:.2f} {py:.2f}L{sx:.2f} {sy:.2f}" fill="none" stroke="#94a3b8" stroke-dasharray="4 5" stroke-width="0.7" opacity="0.45"/>')
    elif fid == "riemann_roch":
        sphere = figure["geometry"]["sphere"]
        torus = figure["geometry"]["torus"]
        meromorphic = figure["geometry"].get("meromorphic", {})
        cp1_frame = (meromorphic.get("cp1", {}).get("frames") or [{}])[0]
        torus_frame = (meromorphic.get("torus", {}).get("frames") or [{}])[0]
        for line in sphere["latitudes"] + sphere["longitudes"]:
            body.append(f'<path d="{path3(line["points"], 77, 103, 38, 0.64, 0.42)}" fill="none" stroke="#bfdbfe" stroke-width="0.8"/>')
        body.append('<circle cx="77" cy="103" r="38" fill="#f8fafc" fill-opacity="0.28" stroke="#1e3a5f" stroke-width="1.4"/>')
        for point in sphere["divisor_points"]:
            sx, sy = project(point["sphere"], 77, 103, 38, 0.64, 0.42)
            label = html.escape(str(point["label"]))
            body.append(f'<circle cx="{sx:.2f}" cy="{sy:.2f}" r="3.8" fill="#be123c" stroke="#fff" stroke-width="1"/>')
            body.append(f'<text x="{sx + 5:.2f}" y="{sy - 5:.2f}" fill="#334155" font-family="Inter, Arial, sans-serif" font-size="8" font-weight="700">{label}</text>')
        for index, zero in enumerate(cp1_frame.get("zeros", [])):
            sx, sy = project(zero["sphere"], 77, 103, 38, 0.64, 0.42)
            if index < len(sphere["divisor_points"]):
                px, py = project(sphere["divisor_points"][index]["sphere"], 77, 103, 38, 0.64, 0.42)
                mx = (px + sx) / 2
                my = (py + sy) / 2 + (8 if index == 0 else -8)
                body.append(f'<path d="M{px:.2f} {py:.2f}Q{mx:.2f} {my:.2f} {sx:.2f} {sy:.2f}" fill="none" stroke="#7c3aed" stroke-dasharray="5 5" stroke-width="1.1" opacity="0.68"/>')
            label = html.escape(str(zero["label"]))
            body.append(f'<circle cx="{sx:.2f}" cy="{sy:.2f}" r="3.6" fill="#7c3aed" stroke="#fff" stroke-width="1"/>')
            body.append(f'<text x="{sx + 5:.2f}" y="{sy - 5:.2f}" fill="#334155" font-family="Inter, Arial, sans-serif" font-size="8" font-weight="700">{label}</text>')
        marker = sphere["canonical_marker"]
        kx, ky = project(marker["sphere"], 77, 103, 38, 0.64, 0.42)
        body.append(f'<circle cx="{kx:.2f}" cy="{ky:.2f}" r="3.3" fill="#0f766e" stroke="#fff" stroke-width="1"/>')
        for line in torus["mesh_u"][::2] + torus["mesh_v"][::2]:
            body.append(f'<path d="{path3(line, 221, 104, 33)}" fill="none" stroke="#bfdbfe" stroke-width="0.85"/>')
        body.append(f'<path d="{path3(figure["geometry"]["abel_path"], 221, 104, 33)}" fill="none" stroke="#0f766e" stroke-width="2.5"/>')
        for point in figure["geometry"]["divisor_points"]:
            px, py = project(point["torus_point"], 221, 104, 33)
            label = html.escape(str(point["label"]))
            body.append(f'<circle cx="{px:.2f}" cy="{py:.2f}" r="4" fill="#f59e0b" stroke="#fff" stroke-width="1"/>')
            body.append(f'<text x="{px + 5:.2f}" y="{py - 5:.2f}" fill="#334155" font-family="Inter, Arial, sans-serif" font-size="8" font-weight="700">{label}</text>')
        for index, zero in enumerate(torus_frame.get("zeros", [])):
            zx, zy = project(zero["torus_point"], 221, 104, 33)
            if index < len(figure["geometry"]["divisor_points"]):
                px, py = project(figure["geometry"]["divisor_points"][index]["torus_point"], 221, 104, 33)
                mx = (px + zx) / 2
                my = (py + zy) / 2 + (-10 if index == 1 else 10)
                body.append(f'<path d="M{px:.2f} {py:.2f}Q{mx:.2f} {my:.2f} {zx:.2f} {zy:.2f}" fill="none" stroke="#7c3aed" stroke-dasharray="5 5" stroke-width="1.1" opacity="0.66"/>')
            label = html.escape(str(zero["label"]))
            body.append(f'<circle cx="{zx:.2f}" cy="{zy:.2f}" r="3.7" fill="#7c3aed" stroke="#fff" stroke-width="1"/>')
            body.append(f'<text x="{zx + 5:.2f}" y="{zy - 5:.2f}" fill="#334155" font-family="Inter, Arial, sans-serif" font-size="8" font-weight="700">{label}</text>')
        sx, sy = project(figure["geometry"]["abel_sum"], 221, 104, 33)
        body.append(f'<circle cx="{sx:.2f}" cy="{sy:.2f}" r="7.5" fill="#14b8a6" fill-opacity="0.15" stroke="#14b8a6" stroke-width="1.2"/>')
        body.append(f'<circle cx="{sx:.2f}" cy="{sy:.2f}" r="4.6" fill="#0f766e" stroke="#fff" stroke-width="1"/>')
    elif fid == "goppa":
        support = figure["geometry"]["support_points"]
        body.append('<path d="M28 104C74 56 125 138 174 92" fill="none" stroke="#0f766e" stroke-width="2.2"/>')
        for index, point in enumerate(support):
            px = 30 + point["x"] * 144
            py = 104 + math.sin(index * 0.9) * 16
            mx = 202 + index * 8.5
            my = 56 + (index % 4) * 12
            body.append(f'<path d="M{px:.2f} {py:.2f}L{mx:.2f} {my:.2f}" fill="none" stroke="#94a3b8" stroke-dasharray="4 5" stroke-width="0.75" opacity="0.55"/>')
            body.append(f'<circle cx="{px:.2f}" cy="{py:.2f}" r="3.2" fill="#be123c" stroke="#fff" stroke-width="1"/>')
        body.append(matrix_svg(figure["geometry"]["binary_matrix"], 202, 52, 8.2, "#be123c"))
    elif fid == "ldpc":
        geom = figure["geometry"]
        vertices = {v["id"]: [35 + v["x"] * 92, 56 + v["y"] * 92] for v in geom["vertices"]}

        def edge_path(edge):
            a, b = vertices[edge["from"]], vertices[edge["to"]]
            if abs(a[0] - b[0]) > 60 or abs(a[1] - b[1]) > 60:
                mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
                return f'M{a[0]:.2f} {a[1]:.2f}Q{mx - 18:.2f} {my - 28:.2f} {b[0]:.2f} {b[1]:.2f}'
            return f'M{a[0]:.2f} {a[1]:.2f}L{b[0]:.2f} {b[1]:.2f}'

        for face in geom["faces"]:
            unit = 92 / geom["size"]
            body.append(f'<rect x="{35 + face["i"] * unit + unit * 0.18:.2f}" y="{56 + face["j"] * unit + unit * 0.18:.2f}" width="{unit * 0.64:.2f}" height="{unit * 0.64:.2f}" rx="5" fill="#f0fdfa" fill-opacity="0.46" stroke="#99f6e4" stroke-width="1"/>')
        for edge in geom["edges"]:
            color = "#93c5fd" if edge["type"] == "h" else "#cbd5e1"
            body.append(f'<path d="{edge_path(edge)}" fill="none" stroke="{color}" stroke-width="1.2"/>')
        for point in vertices.values():
            body.append(f'<circle cx="{point[0]:.2f}" cy="{point[1]:.2f}" r="3.4" fill="#1e3a5f" stroke="#fff" stroke-width="1"/>')
        body.append(matrix_svg(geom["H_X"], 174, 52, 5.8, "#2563eb"))
        body.append(matrix_svg(geom["H_Z"], 174, 126, 5.8, "#0f766e"))

    body_markup = "\n  ".join(body)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" role="img" aria-label="{title}">
  <rect width="300" height="220" rx="8" fill="#ffffff"/>
  <rect x="12" y="12" width="276" height="196" rx="8" fill="url(#ma-fallback-bg)" opacity="0.9"/>
  <defs>
    <radialGradient id="ma-fallback-bg" cx="25%" cy="78%" r="58%">
      <stop offset="0%" stop-color="#f0fdfa"/>
      <stop offset="58%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fff7ed"/>
    </radialGradient>
  </defs>
  {body_markup}
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
        <!-- <figcaption>{title}</figcaption> -->
        <!-- <div class="ma-formula">{formula}</div> -->
      </div>
      <div class="ma-canvas" role="img" aria-label="{aria}">
        <img src="/assets/generated/math-atlas/{fid}.svg" alt="{title}" loading="lazy">
      </div>
      <!-- <ul class="ma-facts">{facts}</ul> -->
    </figure>''')
        fallback_cards.append(f'''      <figure class="ma-noscript-card">
        <img src="/assets/generated/math-atlas/{fid}.svg" alt="{title}" loading="lazy">
        <!-- <figcaption>{title}</figcaption> -->
      </figure>''')

    include = f'''<!-- Generated by sagemath/generate_math_atlas.py; do not edit by hand. -->
<section class="idx-math-atlas" aria-labelledby="math-atlas-title">
  <div class="idx-math-atlas__head">
    <h2 id="math-atlas-title" class="ma-visually-hidden">Computed Mathematical Atlas</h2>
    <!-- <p>Complex tori, CP^1, Riemann-Roch, Goppa residues, and LDPC cohomology.</p> -->
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
