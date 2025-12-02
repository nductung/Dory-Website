import { useEffect, useRef } from "react";
import Matter from "matter-js";

const FallingImages = () => {
  const sceneRef = useRef(null);
  // Keep engine in ref so it persists across renders
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const beforeUpdateHandlerRef = useRef(null);

  const images = [
    "/images/home/dd1 1.svg",
    "/images/home/dd2 1.svg",
    "/images/home/dd3 1.svg",
    "/images/home/dd4 1.svg",
    "/images/home/Layer_1 (1).svg",
    "/images/home/Layer_1 (2).svg",
    "/images/home/Layer_1 (3).svg",
    "/images/home/Layer_1.svg",
  ];

  useEffect(() => {
    if (!sceneRef.current) return;

    // create engine only once
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const {
      World,
      Bodies,
      Mouse,
      MouseConstraint,
      Render,
      Runner,
      Events,
      Body,
      Composite,
      Query,
    } = Matter;

    let width = sceneRef.current.clientWidth;
    let height = sceneRef.current.clientHeight;

    const pixelRatio = window.devicePixelRatio || 1;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio,
      },
    });
    renderRef.current = render;

    // Walls params
    const wallThick = 1000;
    const offset = wallThick / 2;
    const wallOptions = {
      isStatic: true,
      render: { visible: false, opacity: 0 },
      friction: 0.5,
    };

    // Create walls (ensure their inside edges coincide with viewport edges)
    const ground = Bodies.rectangle(
      width / 2,
      height + offset,
      width + wallThick * 2,
      wallThick,
      wallOptions
    );
    const leftWall = Bodies.rectangle(
      -offset,
      height / 2,
      wallThick,
      height * 4,
      wallOptions
    );
    const rightWall = Bodies.rectangle(
      width + offset,
      height / 2,
      wallThick,
      height * 4,
      wallOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -offset,
      width + wallThick * 2,
      wallThick,
      wallOptions
    );

    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Create falling bodies
    const ballBodies = images.map((rawSrc) => {
      // encode path in case contains spaces
      const texture = encodeURI(rawSrc);

      const size = 210
    //   console.log(size)
      const x = Math.random() * Math.max(1, (width - 200)) + 100;
      const y = Math.random() * (height * 0.5) + 50;
      const scaleFactor = size / 200;

      return Bodies.circle(x, y, size / 2, {
        restitution: 0.6,
        friction: 0.1,
        density: 0.05,
        render: {
          sprite: {
            texture,
            xScale: scaleFactor,
            yScale: scaleFactor,
          },
        },
      });
    });

    World.add(engine.world, ballBodies);

    // Mouse
    const mouse = Mouse.create(render.canvas);
    // Safety: remove wheel listeners only if present
    try {
      if (mouse.element && mouse.mousewheel) {
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
      }
    } catch (e) {
      // ignore if not supported
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Before update handler (saved so we can off it later)
    const beforeUpdateHandler = () => {
      const currentW = render.canvas.width / (render.options.pixelRatio || 1);
      const currentH = render.canvas.height / (render.options.pixelRatio || 1);
      // use ballBodies reference
      ballBodies.forEach((body) => {
        if (!body || !body.position) return;
        if (body.position.x < -100 || body.position.x > currentW + 100) {
          Body.setPosition(body, { x: currentW / 2, y: 100 });
          Body.setVelocity(body, { x: 0, y: 0 });
        }
        if (body.position.y > currentH + 100) {
          Body.setPosition(body, { x: Math.random() * currentW, y: 100 });
          Body.setVelocity(body, { x: 0, y: 0 });
        }
        if (body.position.y < 0) {
          Body.setPosition(body, {
            x: body.position.x,
            y: body.circleRadius + 10,
          });
          Body.setVelocity(body, { x: body.velocity.x, y: 5 });
        }
      });
    };
    beforeUpdateHandlerRef.current = beforeUpdateHandler;
    Events.on(engine, "beforeUpdate", beforeUpdateHandler);

    // Mouse hover logic: enable canvas pointer events only when hovering a body
    const handleMouseMove = (e) => {
      const rect = render.canvas.getBoundingClientRect();
      const mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      const balls = Composite.allBodies(engine.world).filter(
        (b) => !b.isStatic
      );
      const found = Query.point(balls, mousePosition);
      if (found.length > 0) {
        render.canvas.style.pointerEvents = "auto";
        // optionally change cursor
        render.canvas.style.cursor = "grab";
      } else {
        render.canvas.style.pointerEvents = "none";
        render.canvas.style.cursor = "default";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Responsive resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newW = sceneRef.current.clientWidth;
      const newH = sceneRef.current.clientHeight;
      const newPixelRatio = window.devicePixelRatio || 1;

      // update render options and canvas size properly
      // multiply by pixelRatio for actual canvas resolution
      render.options.width = newW;
      render.options.height = newH;
      render.options.pixelRatio = newPixelRatio;

      render.canvas.width = Math.round(newW * newPixelRatio);
      render.canvas.height = Math.round(newH * newPixelRatio);
      render.canvas.style.width = `${newW}px`;
      render.canvas.style.height = `${newH}px`;

      // update walls' positions
      Body.setPosition(ground, { x: newW / 2, y: newH + offset });
      Body.setPosition(rightWall, { x: newW + offset, y: newH / 2 });
      Body.setPosition(leftWall, { x: -offset, y: newH / 2 });
      Body.setPosition(ceiling, { x: newW / 2, y: -offset });

      // NOTE: to be extra safe, re-run Render to pick up new sizes (minimal disruption)
      try {
        Render.stop(render);
        Render.run(render);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener("resize", handleResize);

    // Runner + Render run
    const runner = Runner.create();
    runnerRef.current = runner;
    Render.run(render);
    Runner.run(runner, engine);

    // Ensure canvas starts with pointer-events none
    if (render.canvas) {
      render.canvas.style.pointerEvents = "none";
      render.canvas.style.touchAction = "pan-y";
    }

    // CLEANUP
    return () => {
      // Remove DOM events
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      // Remove Matter event
      if (beforeUpdateHandlerRef.current) {
        Events.off(engine, "beforeUpdate", beforeUpdateHandlerRef.current);
      }

      try {
        Render.stop(render);
      } catch (e) {}

      try {
        Runner.stop(runner);
      } catch (e) {}

      // Remove mouse wheel listeners safely if exist
      try {
        if (mouse && mouse.element && mouse.mousewheel) {
          mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
          mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        }
      } catch (e) {}

      // remove canvas
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.remove();
      }

      // clear world & engine
      World.clear(engine.world, false); // false: don't remove gravity etc from engine
      Matter.Engine.clear(engine);

      // null refs
      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
      beforeUpdateHandlerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Parent must allow pointer events so canvas itself can toggle pointer-events
    <div
      ref={sceneRef}
      className="absolute inset-0 w-full h-full z-20"
      // wrapper stays interactive; canvas starts non-interactive via inline style in effect
    >
      <style jsx>{`
        /* canvas default non-interactive; toggle with JS when hovering a body */
        div :global(canvas) {
          pointer-events: none;
          touch-action: pan-y;
          transition: cursor 0.1s;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default FallingImages;
