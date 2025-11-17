import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { Element } from "react-scroll";

const techStack = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flask", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
];

export default function TechStackOrbit() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    // 1️⃣ PRELOAD ALL ICON IMAGES FIRST
    const preloadImages = () => {
      return Promise.all(
        techStack.map(
          tech =>
            new Promise(resolve => {
              const img = new Image();
              img.src = tech.src;
              img.onload = () => resolve({ ...tech, img });
              img.onerror = () => resolve({ ...tech, img: null });
            })
        )
      );
    };

    preloadImages().then(loadedIcons => {
      const engine = Matter.Engine.create();
      const world = engine.world;
      world.gravity.y = 1;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const render = Matter.Render.create({
        element: container,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
        },
      });

      // Walls
      const walls = [
        Matter.Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
        Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true }),
        Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true }),
      ];
      Matter.World.add(world, walls);

      // ICON BODIES
      const bodies = loadedIcons.map(({ img }) =>
        Matter.Bodies.circle(
          Math.random() * (width - 100) + 50,
          Math.random() * (height - 100) + 50,
          35,
          {
            restitution: 0.9,
            friction: 0.05,
            frictionAir: 0.01,
            render: {
              sprite: img
                ? {
                    texture: img.src,
                    xScale: 0.5,
                    yScale: 0.5,
                  }
                : {}, // fallback for failed loads
            },
          }
        )
      );

      Matter.World.add(world, bodies);

      // Mouse drag
      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Matter.World.add(world, mouseConstraint);

      Matter.Render.run(render);

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // Cleanup
      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.World.clear(world);
        Matter.Engine.clear(engine);

        if (render.canvas) {
          render.canvas.remove();
        }
      };
    });

  }, []);

  return (
    <Element  name="Tech Stack" className="pt-20"  >
      <div className="flex flex-col items-center w-screen min-h-[500px] md:h-[650px] px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-white" data-aos="fade-down" data-aos-duration="500">
          My Tech Stack
        </h2>

        <p className="text-gray-400 mb-6 text-center text-sm sm:text-base" data-aos="fade-down" data-aos-duration="700">
          Drag, toss, and watch real-life physics!
        </p>

        <div
          ref={sceneRef}
          className="w-full max-w-[900px] h-[500px] sm:h-[350px] md:h-[500px] shadow-inner rounded-lg overflow-hidden border border-gray-700 bg-zinc-500"
          data-aos="flip-up" data-aos-duration="1000"
        />
      </div>
    </Element>
  );
}
