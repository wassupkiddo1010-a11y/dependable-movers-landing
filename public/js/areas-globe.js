(function () {
  "use strict";

  var MARKERS = [
    { lat: 36.17, lng: -115.14, label: "Nevada" },
    { lat: 40.71, lng: -74.01, label: "New York" },
    { lat: 34.0, lng: -81.03, label: "South Carolina" },
    { lat: 33.75, lng: -84.39, label: "Georgia" },
    { lat: 35.47, lng: -97.52, label: "Oklahoma" },
    { lat: 32.78, lng: -96.8, label: "Texas" },
    { lat: 37.54, lng: -77.44, label: "Virginia" },
    { lat: 33.45, lng: -112.07, label: "Arizona" },
    { lat: 21.31, lng: -157.86, label: "Hawaii" },
  ];

  var CONNECTIONS = [
    { from: [40.71, -74.01], to: [37.54, -77.44] },
    { from: [37.54, -77.44], to: [34.0, -81.03] },
    { from: [34.0, -81.03], to: [33.75, -84.39] },
    { from: [32.78, -96.8], to: [35.47, -97.52] },
    { from: [36.17, -115.14], to: [33.45, -112.07] },
    { from: [32.78, -96.8], to: [36.17, -115.14] },
    { from: [40.71, -74.01], to: [32.78, -96.8] },
    { from: [33.45, -112.07], to: [21.31, -157.86] },
  ];

  var dotColor = "rgba(22, 51, 91, ALPHA)";
  var arcColor = "rgba(237, 125, 34, 0.45)";
  var markerColor = "rgba(237, 125, 34, 1)";
  var autoRotateSpeed = 0.002;

  function latLngToXYZ(lat, lng, radius) {
    var phi = ((90 - lat) * Math.PI) / 180;
    var theta = ((lng + 180) * Math.PI) / 180;
    return [
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  }

  function rotateY(x, y, z, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [x * cos + z * sin, y, -x * sin + z * cos];
  }

  function rotateX(x, y, z, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [x, y * cos - z * sin, y * sin + z * cos];
  }

  function project(x, y, z, cx, cy, fov) {
    var scale = fov / (fov + z);
    return [x * scale + cx, y * scale + cy, z];
  }

  function buildDots() {
    var dots = [];
    var numDots = 1200;
    var goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (var i = 0; i < numDots; i++) {
      var theta = (2 * Math.PI * i) / goldenRatio;
      var phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
    return dots;
  }

  function initInteractiveGlobe() {
    var canvas = document.getElementById("areas-globe-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var rotY = 0.4;
    var rotX = 0.3;
    var drag = {
      active: false,
      startX: 0,
      startY: 0,
      startRotY: 0,
      startRotX: 0,
    };
    var time = 0;
    var animId = 0;
    var dots = buildDots();

    function draw() {
      var dpr = window.devicePixelRatio || 1;
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var cx = w / 2;
      var cy = h / 2;
      var radius = Math.min(w, h) * 0.38;
      var fov = 600;

      if (!drag.active) rotY += autoRotateSpeed;
      time += 0.015;

      ctx.clearRect(0, 0, w, h);

      var glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.8,
        cx,
        cy,
        radius * 1.5
      );
      glowGrad.addColorStop(0, "rgba(22, 51, 91, 0.04)");
      glowGrad.addColorStop(1, "rgba(22, 51, 91, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(22, 51, 91, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (var i = 0; i < dots.length; i++) {
        var x = dots[i][0] * radius;
        var y = dots[i][1] * radius;
        var z = dots[i][2] * radius;
        var r1 = rotateX(x, y, z, rotX);
        x = r1[0];
        y = r1[1];
        z = r1[2];
        var r2 = rotateY(x, y, z, rotY);
        x = r2[0];
        y = r2[1];
        z = r2[2];
        if (z > 0) continue;
        var p = project(x, y, z, cx, cy, fov);
        var depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1 + depthAlpha * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
        ctx.fill();
      }

      for (var c = 0; c < CONNECTIONS.length; c++) {
        var conn = CONNECTIONS[c];
        var lat1 = conn.from[0];
        var lng1 = conn.from[1];
        var lat2 = conn.to[0];
        var lng2 = conn.to[1];

        var p1 = latLngToXYZ(lat1, lng1, radius);
        var p2 = latLngToXYZ(lat2, lng2, radius);
        var x1 = p1[0];
        var y1 = p1[1];
        var z1 = p1[2];
        var x2 = p2[0];
        var y2 = p2[1];
        var z2 = p2[2];

        var rr1 = rotateX(x1, y1, z1, rotX);
        x1 = rr1[0];
        y1 = rr1[1];
        z1 = rr1[2];
        rr1 = rotateY(x1, y1, z1, rotY);
        x1 = rr1[0];
        y1 = rr1[1];
        z1 = rr1[2];

        var rr2 = rotateX(x2, y2, z2, rotX);
        x2 = rr2[0];
        y2 = rr2[1];
        z2 = rr2[2];
        rr2 = rotateY(x2, y2, z2, rotY);
        x2 = rr2[0];
        y2 = rr2[1];
        z2 = rr2[2];

        if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

        var s1 = project(x1, y1, z1, cx, cy, fov);
        var s2 = project(x2, y2, z2, cx, cy, fov);
        var midX = (x1 + x2) / 2;
        var midY = (y1 + y2) / 2;
        var midZ = (z1 + z2) / 2;
        var midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
        var arcHeight = radius * 1.25;
        var sc = project(
          (midX / midLen) * arcHeight,
          (midY / midLen) * arcHeight,
          (midZ / midLen) * arcHeight,
          cx,
          cy,
          fov
        );

        ctx.beginPath();
        ctx.moveTo(s1[0], s1[1]);
        ctx.quadraticCurveTo(sc[0], sc[1], s2[0], s2[1]);
        ctx.strokeStyle = arcColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        var t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
        var tx =
          (1 - t) * (1 - t) * s1[0] + 2 * (1 - t) * t * sc[0] + t * t * s2[0];
        var ty =
          (1 - t) * (1 - t) * s1[1] + 2 * (1 - t) * t * sc[1] + t * t * s2[1];
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = markerColor;
        ctx.fill();
      }

      for (var m = 0; m < MARKERS.length; m++) {
        var marker = MARKERS[m];
        var mp = latLngToXYZ(marker.lat, marker.lng, radius);
        var mx = mp[0];
        var my = mp[1];
        var mz = mp[2];
        var mr1 = rotateX(mx, my, mz, rotX);
        mx = mr1[0];
        my = mr1[1];
        mz = mr1[2];
        var mr2 = rotateY(mx, my, mz, rotY);
        mx = mr2[0];
        my = mr2[1];
        mz = mr2[2];
        if (mz > radius * 0.1) continue;
        var sp = project(mx, my, mz, cx, cy, fov);
        var pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sp[0], sp[1], 4 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = markerColor.replace("1)", (0.2 + pulse * 0.15) + ")");
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sp[0], sp[1], 2.5, 0, Math.PI * 2);
        ctx.fillStyle = markerColor;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    canvas.addEventListener("pointerdown", function (e) {
      drag.active = true;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.startRotY = rotY;
      drag.startRotX = rotX;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointermove", function (e) {
      if (!drag.active) return;
      var dx = e.clientX - drag.startX;
      var dy = e.clientY - drag.startY;
      rotY = drag.startRotY + dx * 0.005;
      rotX = Math.max(-1, Math.min(1, drag.startRotX + dy * 0.005));
    });

    canvas.addEventListener("pointerup", function () {
      drag.active = false;
    });

    canvas.classList.add("is-visible");
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", function () {
      /* redraw picks up new size on next frame */
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteractiveGlobe);
  } else {
    initInteractiveGlobe();
  }
})();
