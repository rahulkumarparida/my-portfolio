import { useEffect, useRef, useState  } from "react";


export default function CustomCursor() {
   const wrapperRef = useRef(null);
  const defaultRef = useRef(null);
  const negativeRef = useRef(null);
  const textRef = useRef(null);

  const [text, setText] = useState("");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const def = defaultRef.current;
    const neg = negativeRef.current;
    const txt = textRef.current;

    const moveCursor = (e) => {
      wrapper.style.top = `${e.clientY}px`;
      wrapper.style.left = `${e.clientX}px`;
    };

    document.addEventListener("mousemove", moveCursor);

    const hoverTargets = document.querySelectorAll("[data-cursor]");
    const textTargets = document.querySelectorAll("[text-cursor]");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        def.style.opacity = 0;
        txt.style.opacity = 0;
        negativeRef.current.style.opacity = 1;
      });
      el.addEventListener("mouseleave", () => {
        def.style.opacity = 1;
        negativeRef.current.style.opacity = 0;
      });
    });

    textTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const t = el.getAttribute("text-cursor");
        setText(t);

        def.style.opacity = 0;
        negativeRef.current.style.opacity = 0;

        txt.style.opacity = 1;
        txt.style.transform = "scale(1)";
      });

      el.addEventListener("mouseleave", () => {
        def.style.opacity = 1;
        txt.style.opacity = 0;
        txt.style.transform = "scale(0.8)";
      });
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="cursor" ref={wrapperRef}>
      <div className="cursor-default" ref={defaultRef}></div>
      <div className="cursor-negative" ref={negativeRef}></div>
      <div className="cursor-text" ref={textRef}>
        {text}
      </div>
    </div>
  );
}

