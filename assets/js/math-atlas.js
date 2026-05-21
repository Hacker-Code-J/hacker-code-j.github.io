(function () {
  "use strict";

  var data = window.MathAtlasData;
  if (!data || !Array.isArray(data.figures)) return;

  var NS = "http://www.w3.org/2000/svg";
  var TAU = Math.PI * 2;
  var controllers = [];
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function byId(id) {
    return data.figures.find(function (figure) { return figure.id === id; });
  }

  function el(name, attrs) {
    var node = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function append(parent, children) {
    children.forEach(function (child) {
      if (child) parent.appendChild(child);
    });
    return parent;
  }

  function svgRoot(label) {
    return el("svg", {
      class: "ma-svg",
      viewBox: "0 0 320 230",
      role: "img",
      "aria-label": label,
      focusable: "false"
    });
  }

  function text(x, y, value, className) {
    return el("text", { x: x, y: y, class: className || "ma-label", text: value });
  }

  function pathD(points) {
    return points.map(function (point, index) {
      return (index ? "L" : "M") + point[0].toFixed(2) + " " + point[1].toFixed(2);
    }).join(" ");
  }

  function bounds(points) {
    var xs = points.map(function (point) { return point[0]; });
    var ys = points.map(function (point) { return point[1]; });
    return {
      minX: Math.min.apply(Math, xs),
      maxX: Math.max.apply(Math, xs),
      minY: Math.min.apply(Math, ys),
      maxY: Math.max.apply(Math, ys)
    };
  }

  function mapper2(points, x, y, width, height, pad) {
    var box = bounds(points);
    var dx = box.maxX - box.minX || 1;
    var dy = box.maxY - box.minY || 1;
    pad = pad || 0;
    return function (point) {
      return [
        x + pad + ((point[0] - box.minX) / dx) * (width - pad * 2),
        y + height - pad - ((point[1] - box.minY) / dy) * (height - pad * 2)
      ];
    };
  }

  function project3(point, cx, cy, scale, rotY, rotX) {
    var x = point[0];
    var y = point[1];
    var z = point[2];
    var cyaw = Math.cos(rotY);
    var syaw = Math.sin(rotY);
    var cpitch = Math.cos(rotX);
    var spitch = Math.sin(rotX);
    var x1 = x * cyaw + z * syaw;
    var z1 = -x * syaw + z * cyaw;
    var y1 = y * cpitch - z1 * spitch;
    var z2 = y * spitch + z1 * cpitch;
    return { x: cx + x1 * scale, y: cy - y1 * scale, z: z2 };
  }

  function path3(points, cx, cy, scale, rotY, rotX) {
    return pathD(points.map(function (point) {
      var p = project3(point, cx, cy, scale, rotY, rotX);
      return [p.x, p.y];
    }));
  }

  function cycle(time, seconds, offset) {
    var raw = (time / 1000 + (offset || 0)) / seconds;
    return raw - Math.floor(raw);
  }

  function sine(time, seconds, offset) {
    return (Math.sin(TAU * cycle(time, seconds, offset)) + 1) / 2;
  }

  function pulse(time, seconds, offset, width) {
    var p = cycle(time, seconds, offset);
    var d = Math.min(Math.abs(p), Math.abs(1 - p));
    return Math.max(0, 1 - d / (width || 0.18));
  }

  function setNumber(node, attr, value) {
    node.setAttribute(attr, value.toFixed(2));
  }

  function moveAlongPath(marker, path, phase) {
    if (!path || !marker || !path.getTotalLength) return;
    var length = path.getTotalLength();
    if (!length) return;
    var point = path.getPointAtLength(length * phase);
    setNumber(marker, "cx", point.x);
    setNumber(marker, "cy", point.y);
  }

  function addGrid(svg) {
    var group = el("g", { class: "ma-bg-grid", "aria-hidden": "true" });
    for (var x = 20; x <= 300; x += 20) {
      group.appendChild(el("path", { d: "M" + x + " 18V212" }));
    }
    for (var y = 20; y <= 220; y += 20) {
      group.appendChild(el("path", { d: "M14 " + y + "H306" }));
    }
    svg.appendChild(group);
  }

  function createTracer(svg, className, radius) {
    var tracer = el("circle", { r: radius || "3.2", class: className || "ma-tracer" });
    svg.appendChild(tracer);
    return tracer;
  }

  function panelState(panel, index) {
    var state = { active: false, focus: false, hover: false, inView: true, index: index };
    panel.addEventListener("pointerenter", function () {
      state.hover = true;
      panel.classList.add("is-active");
    });
    panel.addEventListener("pointerleave", function () {
      state.hover = false;
      if (!state.focus) panel.classList.remove("is-active");
      panel.style.setProperty("--ma-tilt-x", "0deg");
      panel.style.setProperty("--ma-tilt-y", "0deg");
      panel.style.setProperty("--ma-hot-x", "50%");
      panel.style.setProperty("--ma-hot-y", "50%");
    });
    panel.addEventListener("focusin", function () {
      state.focus = true;
      panel.classList.add("is-active");
    });
    panel.addEventListener("focusout", function () {
      state.focus = false;
      if (!state.hover) panel.classList.remove("is-active");
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        state.inView = entries.some(function (entry) { return entry.isIntersecting; });
        panel.classList.toggle("is-in-view", state.inView);
      }, { threshold: 0.08 }).observe(panel);
    }
    return state;
  }

  function panelTilt(panel) {
    panel.addEventListener("pointermove", function (event) {
      var rect = panel.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width - 0.5;
      var py = (event.clientY - rect.top) / rect.height - 0.5;
      panel.style.setProperty("--ma-tilt-x", (-py * 5).toFixed(2) + "deg");
      panel.style.setProperty("--ma-tilt-y", (px * 6).toFixed(2) + "deg");
      panel.style.setProperty("--ma-hot-x", ((px + 0.5) * 100).toFixed(1) + "%");
      panel.style.setProperty("--ma-hot-y", ((py + 0.5) * 100).toFixed(1) + "%");
    });
  }

  function register(panel, state, update) {
    controllers.push({ panel: panel, state: state, update: update });
  }

  function renderTorus(canvas, figure, panel, state) {
    var svg = svgRoot(figure.aria);
    addGrid(svg);

    var latticePoints = figure.geometry.lattice_points.map(function (p) { return p.xy; });
    var map = mapper2(latticePoints, 18, 42, 128, 136, 12);
    var para = figure.geometry.parallelogram.map(map);
    var cycleA = figure.geometry.cycles.a.map(map);
    var cycleB = figure.geometry.cycles.b.map(map);
    var latticeDots = [];
    var edgeA = [];
    var edgeB = [];

    svg.appendChild(el("path", { d: pathD(para) + "Z", class: "ma-surface ma-surface--blue" }));
    latticePoints.forEach(function (point, index) {
      var p = map(point);
      var dot = el("circle", {
        cx: p[0],
        cy: p[1],
        r: "2.1",
        class: "ma-dot ma-dot--soft",
        style: "transition-delay:" + (index * 18) + "ms"
      });
      latticeDots.push(dot);
      svg.appendChild(dot);
    });

    var aPath = el("path", { id: "ma-torus-a", d: pathD(cycleA), class: "ma-line ma-line--accent" });
    var bPath = el("path", { id: "ma-torus-b", d: pathD(cycleB), class: "ma-line ma-line--teal" });
    append(svg, [aPath, bPath]);
    edgeA.push(el("path", { d: "M" + para[0][0] + " " + para[0][1] + "L" + para[1][0] + " " + para[1][1], class: "ma-edge ma-edge--a" }));
    edgeA.push(el("path", { d: "M" + para[3][0] + " " + para[3][1] + "L" + para[2][0] + " " + para[2][1], class: "ma-edge ma-edge--a" }));
    edgeB.push(el("path", { d: "M" + para[0][0] + " " + para[0][1] + "L" + para[3][0] + " " + para[3][1], class: "ma-edge ma-edge--b" }));
    edgeB.push(el("path", { d: "M" + para[1][0] + " " + para[1][1] + "L" + para[2][0] + " " + para[2][1], class: "ma-edge ma-edge--b" }));
    append(svg, edgeA.concat(edgeB));

    var torus = figure.geometry.torus;
    var meshPaths = torus.mesh_u.concat(torus.mesh_v).map(function (line, index) {
      var path = el("path", {
        class: index % 4 === 0 ? "ma-line ma-line--soft" : "ma-line ma-line--ghost"
      });
      svg.appendChild(path);
      return { path: path, line: line };
    });
    var torusA = el("path", { id: "ma-torus-cycle-a", class: "ma-line ma-line--accent ma-line--heavy" });
    var torusB = el("path", { id: "ma-torus-cycle-b", class: "ma-line ma-line--teal ma-line--heavy" });
    append(svg, [torusA, torusB]);
    append(svg, [
      // text(24, 30, "C lattice", "ma-label ma-label--small"),
      // text(203, 30, "C/Lambda", "ma-label ma-label--small")
    ]);
    var tracerA = createTracer(svg, "ma-tracer ma-tracer--amber");
    var tracerB = createTracer(svg, "ma-tracer");
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.55 : 1;
      var rotY = -0.72 + time * 0.00016 * activeBoost + state.index * 0.12;
      var rotX = 0.73 + Math.sin(time * 0.00045 + state.index) * 0.08;
      meshPaths.forEach(function (item) {
        item.path.setAttribute("d", path3(item.line, 238, 116, 44, rotY, rotX));
      });
      torusA.setAttribute("d", path3(torus.cycle_a, 238, 116, 44, rotY, rotX));
      torusB.setAttribute("d", path3(torus.cycle_b, 238, 116, 44, rotY, rotX));
      moveAlongPath(tracerA, aPath, cycle(time, 5.4 / activeBoost, 0.05));
      moveAlongPath(tracerB, torusB, cycle(time, 6.8 / activeBoost, 0.44));

      var aBeat = pulse(time, 4.8, 0, 0.16);
      var bBeat = pulse(time, 4.8, 2.4, 0.16);
      edgeA.forEach(function (edge) {
        edge.style.opacity = (0.45 + aBeat * 0.5).toFixed(2);
        edge.style.strokeWidth = (2.2 + aBeat * 1.4).toFixed(2);
      });
      edgeB.forEach(function (edge) {
        edge.style.opacity = (0.45 + bBeat * 0.5).toFixed(2);
        edge.style.strokeWidth = (2.1 + bBeat * 1.3).toFixed(2);
      });
      latticeDots.forEach(function (dot, index) {
        var r = 1.7 + sine(time, 6, index * 0.11) * 0.8;
        dot.setAttribute("r", r.toFixed(2));
      });
    });
  }

  function renderCp1(canvas, figure, panel, state) {
    var svg = svgRoot(figure.aria);
    addGrid(svg);
    var sphere = el("g", { class: "ma-sphere" });
    var plane = el("g", { class: "ma-plane" });
    var dynamicLines = [];
    var dynamicPoints = [];
    var planeDots = [];
    var cx = 145;
    var cy = 103;
    var scale = 56;

    append(plane, [
      el("path", { d: "M206 154L292 172L248 205L162 184Z", class: "ma-plane-shape" }),
      // text(244, 194, "C", "ma-label ma-label--small")
      text(244, 194, "", "ma-label ma-label--small")
    ]);

    figure.geometry.latitudes.forEach(function (line) {
      var path = el("path", { class: "ma-line ma-line--soft" });
      dynamicLines.push({ element: path, points: line.points });
      sphere.appendChild(path);
    });
    figure.geometry.longitudes.forEach(function (line) {
      var path = el("path", { class: "ma-line ma-line--ghost" });
      dynamicLines.push({ element: path, points: line.points });
      sphere.appendChild(path);
    });
    sphere.appendChild(el("circle", { cx: cx, cy: cy, r: scale, class: "ma-sphere-rim" }));

    figure.geometry.points.forEach(function (point, index) {
      var marker = el("circle", { r: index === 5 ? "3.3" : "2.8", class: "ma-dot" });
      var label = text(0, 0, point.label, "ma-label ma-label--tiny");
      var link = el("path", { class: "ma-link-line" });
      dynamicPoints.push({ marker: marker, label: label, link: link, point: point, index: index });
      sphere.appendChild(link);
      sphere.appendChild(marker);
      sphere.appendChild(label);
      if (point.complex) {
        var px = 227 + point.complex[0] * 13;
        var py = 178 - point.complex[1] * 13;
        var dot = el("circle", { cx: px, cy: py, r: "2.3", class: "ma-dot ma-dot--plane" });
        planeDots[index] = dot;
        plane.appendChild(dot);
      }
    });

    // append(svg, [plane, sphere, text(34, 34, "CP^1", "ma-label ma-label--title")]);
    append(svg, [plane, sphere, text(34, 34, "", "ma-label ma-label--title")]);
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.8 : 1;
      var angle = 0.55 + time * 0.0002 * activeBoost;
      var rotX = 0.46 + Math.sin(time * 0.00032 + state.index) * 0.09;
      var selected = Math.floor(cycle(time, 8.4 / activeBoost, 0) * dynamicPoints.length);
      dynamicLines.forEach(function (line) {
        line.element.setAttribute("d", path3(line.points, cx, cy, scale, angle, rotX));
      });
      dynamicPoints.forEach(function (item) {
        var projected = project3(item.point.sphere, cx, cy, scale, angle, rotX);
        var isSelected = item.index === selected;
        item.marker.setAttribute("cx", projected.x.toFixed(2));
        item.marker.setAttribute("cy", projected.y.toFixed(2));
        item.marker.setAttribute("r", (isSelected ? 4.3 : 2.7).toFixed(2));
        item.marker.style.opacity = isSelected ? "1" : "0.78";
        item.label.setAttribute("x", (projected.x + 5).toFixed(2));
        item.label.setAttribute("y", (projected.y - 5).toFixed(2));
        item.label.style.opacity = isSelected ? "1" : "0.62";
        if (item.point.complex) {
          var px = 227 + item.point.complex[0] * 13;
          var py = 178 - item.point.complex[1] * 13;
          item.link.setAttribute("d", "M" + px + " " + py + "L" + projected.x.toFixed(2) + " " + projected.y.toFixed(2));
        } else {
          item.link.setAttribute("d", "M244 166L" + projected.x.toFixed(2) + " " + projected.y.toFixed(2));
        }
        item.link.style.opacity = isSelected ? "0.88" : "0.22";
        if (planeDots[item.index]) {
          planeDots[item.index].setAttribute("r", isSelected ? "3.6" : "2.2");
          planeDots[item.index].style.opacity = isSelected ? "1" : "0.62";
        }
      });
    });
  }

  function renderRiemannRoch(canvas, figure, panel, state) {
    var svg = svgRoot(figure.aria);
    addGrid(svg);
    var torus = figure.geometry.torus;
    var torusPaths = torus.mesh_u.concat(torus.mesh_v).map(function (line, index) {
      var path = el("path", {
        class: index % 4 === 0 ? "ma-line ma-line--soft" : "ma-line ma-line--ghost"
      });
      svg.appendChild(path);
      return { path: path, line: line };
    });
    var abel = el("path", { id: "ma-rr-abel", class: "ma-line ma-line--teal ma-line--heavy" });
    svg.appendChild(abel);
    var movingDivisors = figure.geometry.divisor_points.map(function (point) {
      var dot = el("circle", { r: "4", class: "ma-dot ma-dot--amber" });
      var label = text(0, 0, point.label, "ma-label ma-label--tiny");
      svg.appendChild(dot);
      svg.appendChild(label);
      return { dot: dot, label: label, source: point };
    });
    var sum = el("circle", { r: "4.8", class: "ma-dot ma-dot--sum" });
    svg.appendChild(sum);
    var equation = el("rect", { x: "178", y: "62", width: "116", height: "92", rx: "8", class: "ma-equation" });
    append(svg, [
      equation,
      text(191, 88, "g = 1", "ma-label ma-label--small"),
      text(191, 111, "deg D = 3", "ma-label ma-label--small"),
      text(191, 134, "l(D)-l(K-D)=3", "ma-label ma-label--small"),
      // text(30, 34, "D=P+Q+R", "ma-label ma-label--title")
    ]);
    var tracer = createTracer(svg, "ma-tracer ma-tracer--amber");
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.55 : 1;
      var rotY = -0.62 + time * 0.00011 * activeBoost;
      var rotX = 0.68 + Math.sin(time * 0.00038) * 0.06;
      torusPaths.forEach(function (item) {
        item.path.setAttribute("d", path3(item.line, 103, 111, 52, rotY, rotX));
      });
      abel.setAttribute("d", path3(figure.geometry.abel_path, 103, 111, 52, rotY, rotX));
      movingDivisors.forEach(function (item, index) {
        var phase = cycle(time, 7.2 / activeBoost, index * 1.15);
        var sourceIndex = Math.floor(phase * (figure.geometry.abel_path.length - 1));
        var point = project3(figure.geometry.abel_path[sourceIndex], 103, 111, 52, rotY, rotX);
        item.dot.setAttribute("cx", point.x.toFixed(2));
        item.dot.setAttribute("cy", point.y.toFixed(2));
        item.dot.setAttribute("r", (3.5 + pulse(time, 7.2, index * 1.15, 0.12) * 1.8).toFixed(2));
        item.label.setAttribute("x", (point.x + 6).toFixed(2));
        item.label.setAttribute("y", (point.y - 6).toFixed(2));
      });
      var sumPoint = project3(figure.geometry.abel_sum, 103, 111, 52, rotY, rotX);
      sum.setAttribute("cx", sumPoint.x.toFixed(2));
      sum.setAttribute("cy", sumPoint.y.toFixed(2));
      moveAlongPath(tracer, abel, cycle(time, 7.2 / activeBoost, 0.52));
      var beat = pulse(time, 7.2, 0.84, 0.12);
      equation.style.strokeWidth = (1 + beat * 1.6).toFixed(2);
      equation.style.opacity = (0.78 + beat * 0.22).toFixed(2);
    });
  }

  function renderMatrix(svg, rows, x, y, cell, className, maxRows) {
    var visibleRows = rows.slice(0, maxRows || rows.length);
    var group = el("g", { class: className || "ma-matrix" });
    var cells = [];
    visibleRows.forEach(function (row, i) {
      row.forEach(function (value, j) {
        var rect = el("rect", {
          x: (x + j * cell).toFixed(2),
          y: (y + i * cell).toFixed(2),
          width: (cell - 0.9).toFixed(2),
          height: (cell - 0.9).toFixed(2),
          class: value ? "ma-cell ma-cell--on" : "ma-cell",
          style: "animation-delay:" + ((i + j) * 36) + "ms"
        });
        cells.push({ element: rect, value: value, row: i, col: j });
        group.appendChild(rect);
      });
    });
    svg.appendChild(group);
    return cells;
  }

  function animateMatrixCells(cells, time, seconds, offset, rows, cols, mode) {
    var phase = cycle(time, seconds, offset);
    var activeColumn = Math.floor(phase * cols);
    var activeRow = Math.floor(phase * rows);
    cells.forEach(function (cell) {
      if (!cell.value) {
        cell.element.style.opacity = "0.24";
        return;
      }
      var distance = mode === "row"
        ? Math.abs(cell.row - activeRow)
        : Math.abs(cell.col - activeColumn);
      var glow = Math.max(0, 1 - distance / 2.5);
      cell.element.style.opacity = (0.34 + glow * 0.66).toFixed(2);
    });
  }

  function renderGoppa(canvas, figure, panel, state) {
    var svg = svgRoot(figure.aria);
    addGrid(svg);
    var support = figure.geometry.support_points;
    var baseY = 94;
    var supportDots = [];
    var arrows = [];
    var curve = el("path", {
      id: "ma-goppa-curve",
      d: "M28 " + baseY + "C78 46 124 136 174 84",
      class: "ma-line ma-line--teal"
    });
    svg.appendChild(curve);
    support.forEach(function (point, index) {
      var x = 30 + point.x * 144;
      var y = baseY + Math.sin(index * 0.9) * 16;
      var arrow = el("path", { d: "M" + x + " " + y + "L" + (204 + index * 8.5) + " " + (53 + (index % 4) * 12), class: "ma-link-line" });
      var dot = el("circle", { cx: x, cy: y, r: "3.2", class: "ma-dot ma-dot--rose" });
      arrows.push(arrow);
      supportDots.push(dot);
      svg.appendChild(arrow);
      svg.appendChild(dot);
      svg.appendChild(text(x - 6, y + 15, point.label, "ma-label ma-label--tiny"));
    });
    var matrixCells = renderMatrix(svg, figure.geometry.binary_matrix, 202, 48, 8.2, "ma-matrix ma-matrix--goppa");
    // append(svg, [
    //   text(30, 34, "residue map", "ma-label ma-label--title"),
    //   text(202, 38, "binary H", "ma-label ma-label--small"),
    //   text(30, 168, "g(x)=" + figure.calculation.goppa_polynomial, "ma-label ma-label--mono")
    // ]);
    var tracer = createTracer(svg, "ma-tracer ma-tracer--rose", "2.9");
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.7 : 1;
      var phase = cycle(time, 6.5 / activeBoost, 0.1);
      var activeColumn = Math.floor(phase * support.length);
      moveAlongPath(tracer, curve, phase);
      supportDots.forEach(function (dot, index) {
        var isActive = index === activeColumn;
        dot.setAttribute("r", isActive ? "4.5" : "3.0");
        dot.style.opacity = isActive ? "1" : "0.58";
        arrows[index].style.opacity = isActive ? "0.92" : "0.18";
        arrows[index].style.strokeWidth = isActive ? "1.3" : "0.7";
      });
      animateMatrixCells(matrixCells, time, 6.5 / activeBoost, 0.1, 12, 10, "column");
    });
  }

  function renderLdpc(canvas, figure, panel, state) {
    var svg = svgRoot(figure.aria);
    addGrid(svg);
    var geom = figure.geometry;
    var size = geom.size;
    var vertexMap = {};
    var edgePaths = [];
    var vertexDots = [];
    var faces = [];
    geom.vertices.forEach(function (vertex) {
      vertexMap[vertex.id] = {
        x: 34 + vertex.x * 94,
        y: 58 + vertex.y * 94
      };
    });

    for (var j = 0; j < size - 1; j += 1) {
      for (var i = 0; i < size - 1; i += 1) {
        var face = el("rect", {
          x: 34 + i * 47,
          y: 58 + j * 47,
          width: "47",
          height: "47",
          class: "ma-cell-face"
        });
        faces.push(face);
        svg.appendChild(face);
      }
    }

    geom.edges.forEach(function (edge) {
      var a = vertexMap[edge.from];
      var b = vertexMap[edge.to];
      var dx = Math.abs(a.x - b.x);
      var dy = Math.abs(a.y - b.y);
      var d;
      if (dx > 60 || dy > 60) {
        var mx = (a.x + b.x) / 2;
        var my = (a.y + b.y) / 2;
        d = "M" + a.x + " " + a.y + "Q" + (mx - 18) + " " + (my - 28) + " " + b.x + " " + b.y;
      } else {
        d = "M" + a.x + " " + a.y + "L" + b.x + " " + b.y;
      }
      var path = el("path", {
        d: d,
        class: edge.type === "h" ? "ma-line ma-line--soft" : "ma-line ma-line--ghost"
      });
      edgePaths.push({ element: path, edge: edge });
      svg.appendChild(path);
    });
    geom.vertices.forEach(function (vertex) {
      var p = vertexMap[vertex.id];
      var dot = el("circle", { cx: p.x, cy: p.y, r: "3.5", class: "ma-dot ma-dot--navy" });
      vertexDots.push(dot);
      svg.appendChild(dot);
    });

    var hxCells = renderMatrix(svg, geom.H_X, 174, 52, 5.8, "ma-matrix ma-matrix--ldpc-x");
    var hzCells = renderMatrix(svg, geom.H_Z, 174, 126, 5.8, "ma-matrix ma-matrix--ldpc-z");
    var cohomologyBox = el("rect", { x: "33", y: "172", width: "111", height: "24", rx: "8", class: "ma-equation ma-equation--thin" });
    // append(svg, [
    //   text(34, 34, "chain complex", "ma-label ma-label--title"),
    //   text(174, 42, "H_X", "ma-label ma-label--small"),
    //   text(174, 116, "H_Z", "ma-label ma-label--small"),
    //   cohomologyBox,
    //   text(43, 188, "dim H^1 = " + figure.calculation.cohomology_dimensions.H1, "ma-label ma-label--small")
    // ]);
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.65 : 1;
      var phase = cycle(time, 7 / activeBoost, 0.18);
      var edgeIndex = Math.floor(phase * edgePaths.length);
      var vertexIndex = Math.floor(cycle(time, 7 / activeBoost, 0.48) * vertexDots.length);
      faces.forEach(function (face, index) {
        face.style.opacity = (0.26 + sine(time, 8, index * 0.2) * 0.24).toFixed(2);
      });
      edgePaths.forEach(function (item, index) {
        var distance = Math.min(Math.abs(index - edgeIndex), edgePaths.length - Math.abs(index - edgeIndex));
        var glow = Math.max(0, 1 - distance / 3);
        item.element.style.opacity = (0.24 + glow * 0.76).toFixed(2);
        item.element.style.strokeWidth = (0.9 + glow * 1.4).toFixed(2);
      });
      vertexDots.forEach(function (dot, index) {
        var isActive = index === vertexIndex;
        dot.setAttribute("r", isActive ? "4.8" : "3.3");
        dot.style.opacity = isActive ? "1" : "0.72";
      });
      animateMatrixCells(hxCells, time, 5.6 / activeBoost, 0, 9, 18, "row");
      animateMatrixCells(hzCells, time, 5.6 / activeBoost, 2.8, 9, 18, "row");
      var beat = pulse(time, 7 / activeBoost, 0.86, 0.13);
      cohomologyBox.style.strokeWidth = (1 + beat * 1.4).toFixed(2);
      cohomologyBox.style.opacity = (0.74 + beat * 0.26).toFixed(2);
    });
  }

  var renderers = {
    torus: renderTorus,
    cp1: renderCp1,
    riemann_roch: renderRiemannRoch,
    goppa: renderGoppa,
    ldpc: renderLdpc
  };

  function startClock() {
    function tick(time) {
      controllers.forEach(function (controller) {
        if (controller.state.inView || controller.state.hover || controller.state.focus) {
          controller.update(time);
        }
      });
      window.requestAnimationFrame(tick);
    }
    if (reduceMotion) {
      controllers.forEach(function (controller) { controller.update(0); });
      return;
    }
    window.requestAnimationFrame(tick);
  }

  function init() {
    document.querySelectorAll("[data-math-atlas] .ma-panel").forEach(function (panel, index) {
      var figure = byId(panel.getAttribute("data-figure-id"));
      var canvas = panel.querySelector(".ma-canvas");
      if (!figure || !canvas || !renderers[figure.id]) return;
      var state = panelState(panel, index);
      panelTilt(panel);
      renderers[figure.id](canvas, figure, panel, state);
    });
    startClock();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
