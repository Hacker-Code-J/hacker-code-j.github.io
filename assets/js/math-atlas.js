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

  function lerpNumber(a, b, mix) {
    return a + (b - a) * mix;
  }

  function lerpPoint(a, b, mix) {
    if (!a || !b) return a || b || [0, 0, 0];
    return a.map(function (value, index) {
      return lerpNumber(value, b[index], mix);
    });
  }

  function sampledFrame(frames, phase) {
    if (!frames || !frames.length) return null;
    var scaled = phase * frames.length;
    var index = Math.floor(scaled) % frames.length;
    return {
      current: frames[index],
      next: frames[(index + 1) % frames.length],
      mix: scaled - Math.floor(scaled),
      index: index
    };
  }

  function frameOrbits(frames, pointKey) {
    if (!frames || !frames.length || !frames[0].zeros) return [];
    return frames[0].zeros.map(function (_, index) {
      return frames.map(function (frame) {
        return frame.zeros[index] && frame.zeros[index][pointKey];
      }).filter(Boolean);
    });
  }

  function curvePath(from, to, bend) {
    var mx = (from.x + to.x) / 2;
    var my = (from.y + to.y) / 2 + bend;
    return "M" + from.x.toFixed(2) + " " + from.y.toFixed(2) +
      "Q" + mx.toFixed(2) + " " + my.toFixed(2) + " " +
      to.x.toFixed(2) + " " + to.y.toFixed(2);
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
    var relation = figure.geometry.quotient_relation || {};
    var centerData = relation.parallelogram_centers || {};
    var mapPoints = latticePoints.slice();
    (centerData.cells || []).forEach(function (cell) {
      (cell.polygon || []).forEach(function (point) { mapPoints.push(point); });
    });
    var map = mapper2(mapPoints, 18, 42, 128, 136, 12);
    var para = figure.geometry.parallelogram.map(map);
    var cycleA = figure.geometry.cycles.a.map(map);
    var cycleB = figure.geometry.cycles.b.map(map);
    var latticeDots = [];
    var edgeA = [];
    var edgeB = [];
    var centerCells = (centerData.cells || []).map(function (cell, index) {
      var polygon = (cell.polygon || []).map(map);
      var center = map(cell.center || [0, 0]);
      var cellPath = el("path", {
        d: pathD(polygon) + "Z",
        class: "ma-quotient-cell"
      });
      var dot = el("circle", {
        cx: center[0].toFixed(2),
        cy: center[1].toFixed(2),
        r: "2.4",
        class: "ma-dot ma-dot--quotient-center"
      });
      var link = el("path", { class: "ma-link-line ma-center-collapse-link" });
      return {
        cell: cell,
        center: center,
        cellPath: cellPath,
        dot: dot,
        link: link,
        phaseOffset: cell.phase_offset || index / 9,
        bend: (index % 3 - 1) * 11 - (Math.floor(index / 3) - 1) * 6
      };
    });

    centerCells.forEach(function (item) { svg.appendChild(item.cellPath); });
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
    centerCells.forEach(function (item) { svg.appendChild(item.dot); });

    var aPath = el("path", { id: "ma-torus-a", d: pathD(cycleA), class: "ma-line ma-line--accent" });
    var bPath = el("path", { id: "ma-torus-b", d: pathD(cycleB), class: "ma-line ma-line--teal" });
    append(svg, [aPath, bPath]);
    edgeA.push(el("path", { d: "M" + para[0][0] + " " + para[0][1] + "L" + para[1][0] + " " + para[1][1], class: "ma-edge ma-edge--a" }));
    edgeA.push(el("path", { d: "M" + para[3][0] + " " + para[3][1] + "L" + para[2][0] + " " + para[2][1], class: "ma-edge ma-edge--a" }));
    edgeB.push(el("path", { d: "M" + para[0][0] + " " + para[0][1] + "L" + para[3][0] + " " + para[3][1], class: "ma-edge ma-edge--b" }));
    edgeB.push(el("path", { d: "M" + para[1][0] + " " + para[1][1] + "L" + para[2][0] + " " + para[2][1], class: "ma-edge ma-edge--b" }));
    append(svg, edgeA.concat(edgeB));

    var quotientTracks = (relation.tracks || []).map(function (track, index) {
      var link = el("path", { class: "ma-link-line ma-quotient-map" });
      var flatDot = el("circle", { r: "3.2", class: "ma-dot ma-dot--quotient-flat" });
      var torusDot = el("circle", { r: "3.4", class: "ma-dot ma-dot--quotient-image" });
      svg.appendChild(link);
      svg.appendChild(flatDot);
      return { track: track, link: link, flatDot: flatDot, torusDot: torusDot, index: index };
    });
    var edgePairs = (relation.edge_samples || []).map(function (sample) {
      var flatA = map(sample.flat_a);
      var flatB = map(sample.flat_b);
      var connector = el("path", {
        d: "M" + flatA[0].toFixed(2) + " " + flatA[1].toFixed(2) +
          "L" + flatB[0].toFixed(2) + " " + flatB[1].toFixed(2),
        class: "ma-link-line ma-edge-quotient"
      });
      var dotA = el("circle", { cx: flatA[0], cy: flatA[1], r: "2.2", class: "ma-dot ma-dot--quotient-edge" });
      var dotB = el("circle", { cx: flatB[0], cy: flatB[1], r: "2.2", class: "ma-dot ma-dot--quotient-edge" });
      var image = el("circle", { r: "3.1", class: "ma-dot ma-dot--quotient-image" });
      append(svg, [connector, dotA, dotB]);
      return { sample: sample, connector: connector, dotA: dotA, dotB: dotB, image: image };
    });

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
    var centerHalo = centerData.torus_point ? el("circle", {
      r: "8",
      class: "ma-center-collapse-halo"
    }) : null;
    var centerImage = centerData.torus_point ? el("circle", {
      r: "3.8",
      class: "ma-dot ma-dot--quotient-center-image"
    }) : null;
    append(svg, [torusA, torusB]);
    centerCells.forEach(function (item) { svg.appendChild(item.link); });
    append(svg, [centerHalo, centerImage]);
    quotientTracks.forEach(function (item) { svg.appendChild(item.torusDot); });
    edgePairs.forEach(function (item) { svg.appendChild(item.image); });
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
      var quotientPhase = reduceMotion ? 0.18 : cycle(time, 7.8 / activeBoost, 0.08);
      quotientTracks.forEach(function (item) {
        var frame = sampledFrame(item.track.frames, quotientPhase + item.index * 0.11);
        if (!frame) return;
        var flat = map(lerpPoint(frame.current.flat, frame.next.flat, frame.mix));
        var torusPoint = project3(lerpPoint(frame.current.torus, frame.next.torus, frame.mix), 238, 116, 44, rotY, rotX);
        item.flatDot.setAttribute("cx", flat[0].toFixed(2));
        item.flatDot.setAttribute("cy", flat[1].toFixed(2));
        item.torusDot.setAttribute("cx", torusPoint.x.toFixed(2));
        item.torusDot.setAttribute("cy", torusPoint.y.toFixed(2));
        var beat = pulse(time, 7.8 / activeBoost, item.index * 0.19, 0.16);
        item.flatDot.setAttribute("r", (2.7 + beat * 1.2).toFixed(2));
        item.torusDot.setAttribute("r", (3.0 + beat * 1.5).toFixed(2));
        item.link.setAttribute("d", curvePath({ x: flat[0], y: flat[1] }, torusPoint, item.index === 1 ? -18 : 18));
        item.link.style.opacity = (0.22 + beat * 0.58).toFixed(2);
      });
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
      edgePairs.forEach(function (item, index) {
        var torusPoint = project3(item.sample.torus, 238, 116, 44, rotY, rotX);
        var beat = pulse(time, 4.8 / activeBoost, item.sample.phase_offset || index * 0.14, 0.15);
        item.connector.style.opacity = (0.16 + beat * 0.46).toFixed(2);
        item.connector.style.strokeWidth = (0.8 + beat * 1.1).toFixed(2);
        item.dotA.setAttribute("r", (1.9 + beat * 1.0).toFixed(2));
        item.dotB.setAttribute("r", (1.9 + beat * 1.0).toFixed(2));
        item.image.setAttribute("cx", torusPoint.x.toFixed(2));
        item.image.setAttribute("cy", torusPoint.y.toFixed(2));
        item.image.setAttribute("r", (2.5 + beat * 1.3).toFixed(2));
        item.image.style.opacity = (0.3 + beat * 0.58).toFixed(2);
      });
      if (centerData.torus_point && centerImage) {
        var centerTorus = project3(centerData.torus_point, 238, 116, 44, rotY, rotX);
        var centerBeat = pulse(time, 6.2 / activeBoost, 0.24, 0.17);
        if (centerHalo) {
          centerHalo.setAttribute("cx", centerTorus.x.toFixed(2));
          centerHalo.setAttribute("cy", centerTorus.y.toFixed(2));
          centerHalo.setAttribute("r", (6.4 + centerBeat * 7.2).toFixed(2));
          centerHalo.style.opacity = (0.18 + centerBeat * 0.28).toFixed(2);
        }
        centerImage.setAttribute("cx", centerTorus.x.toFixed(2));
        centerImage.setAttribute("cy", centerTorus.y.toFixed(2));
        centerImage.setAttribute("r", (3.2 + centerBeat * 1.7).toFixed(2));
        centerImage.style.opacity = (0.72 + centerBeat * 0.28).toFixed(2);
        centerCells.forEach(function (item, index) {
          var beat = pulse(time, 6.2 / activeBoost, item.phaseOffset, 0.12);
          item.cellPath.style.opacity = (0.2 + beat * 0.26).toFixed(2);
          item.dot.setAttribute("r", (2.1 + beat * 1.4).toFixed(2));
          item.dot.style.opacity = (0.45 + beat * 0.48).toFixed(2);
          item.link.setAttribute("d", curvePath(
            { x: item.center[0], y: item.center[1] },
            centerTorus,
            item.bend
          ));
          item.link.style.opacity = (0.12 + beat * 0.38).toFixed(2);
          item.link.style.strokeWidth = (0.55 + beat * 0.85).toFixed(2);
          item.link.style.strokeDashoffset = reduceMotion ? "0" : (-time * 0.018 - index * 2).toFixed(2);
        });
      }
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

    var motion = figure.geometry.meromorphic || {};
    var cp1Motion = motion.cp1 || {};
    var torusMotion = motion.torus || {};
    var cp1Frames = cp1Motion.frames || [];
    var torusFrames = torusMotion.frames || [];

    var sphereGeom = figure.geometry.sphere || {};
    var sphereCx = 75;
    var sphereCy = 84;
    var sphereScale = 39;
    var sphereGroup = el("g", { class: "ma-rr-sphere" });
    var sphereLines = [];
    var spherePoints = [];
    var cp1ZeroMarkers = [];
    var cp1FlowPaths = [];
    var cp1OrbitPaths = [];

    (sphereGeom.latitudes || []).forEach(function (line) {
      var path = el("path", { class: "ma-line ma-line--soft" });
      sphereLines.push({ element: path, points: line.points });
      sphereGroup.appendChild(path);
    });
    (sphereGeom.longitudes || []).forEach(function (line) {
      var path = el("path", { class: "ma-line ma-line--ghost" });
      sphereLines.push({ element: path, points: line.points });
      sphereGroup.appendChild(path);
    });
    (cp1Motion.zero_orbits || frameOrbits(cp1Frames, "sphere")).forEach(function (orbit) {
      var orbitPath = el("path", { class: "ma-line ma-rr-zero-orbit" });
      cp1OrbitPaths.push({ element: orbitPath, points: orbit });
      sphereGroup.appendChild(orbitPath);
    });
    ((cp1Frames[0] && cp1Frames[0].zeros) || []).forEach(function () {
      var path = el("path", { class: "ma-line ma-line--meromorphic" });
      cp1FlowPaths.push(path);
      sphereGroup.appendChild(path);
    });
    sphereGroup.appendChild(el("circle", {
      cx: sphereCx,
      cy: sphereCy,
      r: sphereScale,
      class: "ma-sphere-rim"
    }));

    (sphereGeom.divisor_points || []).forEach(function (point, index) {
      var dot = el("circle", { r: "3.5", class: "ma-dot ma-dot--pole" });
      var label = text(0, 0, point.label, "ma-label ma-label--tiny");
      spherePoints.push({ dot: dot, label: label, point: point, index: index });
      sphereGroup.appendChild(dot);
      sphereGroup.appendChild(label);
    });
    ((cp1Frames[0] && cp1Frames[0].zeros) || []).forEach(function (zero) {
      var dot = el("circle", { r: "3.5", class: "ma-dot ma-dot--zero" });
      var label = text(0, 0, zero.label, "ma-label ma-label--tiny");
      cp1ZeroMarkers.push({ dot: dot, label: label });
      sphereGroup.appendChild(dot);
      sphereGroup.appendChild(label);
    });

    var torus = figure.geometry.torus;
    var torusGroup = el("g", { class: "ma-rr-torus" });
    var torusPaths = torus.mesh_u.concat(torus.mesh_v).map(function (line, index) {
      var path = el("path", {
        class: index % 4 === 0 ? "ma-line ma-line--soft" : "ma-line ma-line--ghost"
      });
      torusGroup.appendChild(path);
      return { path: path, line: line };
    });
    var torusOrbitPaths = (torusMotion.zero_orbits || frameOrbits(torusFrames, "torus_point")).map(function (orbit) {
      var path = el("path", { class: "ma-line ma-rr-zero-orbit" });
      torusGroup.appendChild(path);
      return { path: path, line: orbit };
    });
    var abel = el("path", { id: "ma-rr-abel", class: "ma-line ma-line--teal ma-line--heavy" });
    torusGroup.appendChild(abel);
    var torusFlowPaths = ((torusFrames[0] && torusFrames[0].zeros) || []).map(function () {
      var path = el("path", { class: "ma-line ma-line--meromorphic" });
      torusGroup.appendChild(path);
      return path;
    });

    var divisorMarkers = figure.geometry.divisor_points.map(function (point) {
      var dot = el("circle", { r: "3.7", class: "ma-dot ma-dot--amber" });
      var label = text(0, 0, point.label, "ma-label ma-label--tiny");
      torusGroup.appendChild(dot);
      torusGroup.appendChild(label);
      return { dot: dot, label: label, source: point };
    });
    var torusZeroMarkers = ((torusFrames[0] && torusFrames[0].zeros) || []).map(function (zero) {
      var dot = el("circle", { r: "3.4", class: "ma-dot ma-dot--zero" });
      var label = text(0, 0, zero.label, "ma-label ma-label--tiny");
      torusGroup.appendChild(dot);
      torusGroup.appendChild(label);
      return { dot: dot, label: label };
    });
    var sumHalo = el("circle", { r: "7.2", class: "ma-rr-sum-halo" });
    var sum = el("circle", { r: "4.3", class: "ma-dot ma-dot--sum" });
    torusGroup.appendChild(sumHalo);
    torusGroup.appendChild(sum);

    append(svg, [
      sphereGroup,
      torusGroup
    ]);
    var tracer = createTracer(svg, "ma-tracer ma-tracer--amber", "2.8");
    canvas.replaceChildren(svg);

    register(panel, state, function (time) {
      var activeBoost = state.hover || state.focus ? 1.55 : 1;
      var phase = reduceMotion ? 0.16 : cycle(time, 8.4 / activeBoost, 0.04);
      var cpFrame = sampledFrame(cp1Frames, phase);
      var torusFrame = sampledFrame(torusFrames, phase);
      var sphereRotY = 0.45 + (reduceMotion ? 0 : time * 0.00018 * activeBoost);
      var sphereRotX = 0.38 + (reduceMotion ? 0 : Math.sin(time * 0.00034 + state.index) * 0.08);
      var torusRotY = -0.68 + (reduceMotion ? 0 : time * 0.00012 * activeBoost);
      var torusRotX = 0.67 + (reduceMotion ? 0 : Math.sin(time * 0.00038) * 0.06);

      sphereLines.forEach(function (line) {
        line.element.setAttribute("d", path3(line.points, sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX));
      });
      cp1OrbitPaths.forEach(function (orbit) {
        orbit.element.setAttribute("d", path3(orbit.points, sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX));
      });
      if (cpFrame) {
        cp1FlowPaths.forEach(function (path, index) {
          var pole = sphereGeom.divisor_points && sphereGeom.divisor_points[index];
          var current = cpFrame.current.zeros[index];
          var next = cpFrame.next.zeros[index];
          if (pole && current && next) {
            var from = project3(pole.sphere, sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX);
            var to = project3(lerpPoint(current.sphere, next.sphere, cpFrame.mix), sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX);
            path.setAttribute("d", curvePath(from, to, index ? -8 : 8));
          }
          path.style.opacity = (0.48 + pulse(time, 8.4 / activeBoost, index * 0.18, 0.2) * 0.34).toFixed(2);
        });
      }
      spherePoints.forEach(function (item) {
        var projected = project3(item.point.sphere, sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX);
        var beat = pulse(time, 6.4 / activeBoost, item.index * 0.9, 0.14);
        item.dot.setAttribute("cx", projected.x.toFixed(2));
        item.dot.setAttribute("cy", projected.y.toFixed(2));
        item.dot.setAttribute("r", (3.1 + beat * 1.1).toFixed(2));
        item.label.setAttribute("x", (projected.x + 5).toFixed(2));
        item.label.setAttribute("y", (projected.y - 5).toFixed(2));
      });
      if (cpFrame) {
        cp1ZeroMarkers.forEach(function (item, index) {
          var current = cpFrame.current.zeros[index];
          var next = cpFrame.next.zeros[index];
          if (!current || !next) return;
          var projected = project3(lerpPoint(current.sphere, next.sphere, cpFrame.mix), sphereCx, sphereCy, sphereScale, sphereRotY, sphereRotX);
          var beat = pulse(time, 8.4 / activeBoost, index * 0.23, 0.16);
          item.dot.setAttribute("cx", projected.x.toFixed(2));
          item.dot.setAttribute("cy", projected.y.toFixed(2));
          item.dot.setAttribute("r", (3.3 + beat * 1.5).toFixed(2));
          item.label.setAttribute("x", (projected.x + 5).toFixed(2));
          item.label.setAttribute("y", (projected.y - 5).toFixed(2));
        });
      }

      torusPaths.forEach(function (item) {
        item.path.setAttribute("d", path3(item.line, 224, 92, 34, torusRotY, torusRotX));
      });
      torusOrbitPaths.forEach(function (item) {
        item.path.setAttribute("d", path3(item.line, 224, 92, 34, torusRotY, torusRotX));
      });
      abel.setAttribute("d", path3(figure.geometry.abel_path, 224, 92, 34, torusRotY, torusRotX));
      if (torusFrame) {
        torusFlowPaths.forEach(function (path, index) {
          var pole = figure.geometry.divisor_points[index];
          var current = torusFrame.current.zeros[index];
          var next = torusFrame.next.zeros[index];
          if (pole && current && next) {
            var from = project3(pole.torus_point, 224, 92, 34, torusRotY, torusRotX);
            var to = project3(lerpPoint(current.torus_point, next.torus_point, torusFrame.mix), 224, 92, 34, torusRotY, torusRotX);
            path.setAttribute("d", curvePath(from, to, index === 1 ? -10 : 10));
          }
          path.style.opacity = (0.42 + pulse(time, 8.4 / activeBoost, index * 0.15, 0.2) * 0.4).toFixed(2);
        });
      }
      divisorMarkers.forEach(function (item, index) {
        var point = project3(item.source.torus_point, 224, 92, 34, torusRotY, torusRotX);
        item.dot.setAttribute("cx", point.x.toFixed(2));
        item.dot.setAttribute("cy", point.y.toFixed(2));
        item.dot.setAttribute("r", (3.2 + sine(time, 6.8 / activeBoost, index * 0.17) * 0.75).toFixed(2));
        item.label.setAttribute("x", (point.x + 5).toFixed(2));
        item.label.setAttribute("y", (point.y - 5).toFixed(2));
      });
      if (torusFrame) {
        torusZeroMarkers.forEach(function (item, index) {
          var current = torusFrame.current.zeros[index];
          var next = torusFrame.next.zeros[index];
          if (!current || !next) return;
          var point = project3(lerpPoint(current.torus_point, next.torus_point, torusFrame.mix), 224, 92, 34, torusRotY, torusRotX);
          var beat = pulse(time, 8.4 / activeBoost, index * 0.19, 0.15);
          item.dot.setAttribute("cx", point.x.toFixed(2));
          item.dot.setAttribute("cy", point.y.toFixed(2));
          item.dot.setAttribute("r", (3.25 + beat * 1.35).toFixed(2));
          item.label.setAttribute("x", (point.x + 5).toFixed(2));
          item.label.setAttribute("y", (point.y - 5).toFixed(2));
        });
      }
      var sumSource = torusFrame && torusFrame.current.zero_sum_point ? torusFrame.current.zero_sum_point : figure.geometry.abel_sum;
      var sumPoint = project3(sumSource, 224, 92, 34, torusRotY, torusRotX);
      var haloBeat = pulse(time, 7.2, 0.84, 0.12);
      sumHalo.setAttribute("cx", sumPoint.x.toFixed(2));
      sumHalo.setAttribute("cy", sumPoint.y.toFixed(2));
      sumHalo.setAttribute("r", (6.8 + haloBeat * 3.6).toFixed(2));
      sumHalo.style.opacity = (0.14 + haloBeat * 0.44).toFixed(2);
      sum.setAttribute("cx", sumPoint.x.toFixed(2));
      sum.setAttribute("cy", sumPoint.y.toFixed(2));
      moveAlongPath(tracer, abel, phase);
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
