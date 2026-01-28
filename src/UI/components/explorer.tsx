import { useRef, useState } from "react";
import FileTree from "./FileTree";
import "../index.css"

function Explorer() {
  const DEFAULT_WIDTH = 240;
  const MIN_WIDTH = 180;
  const MAX_WIDTH = window.innerWidth * 0.4;

  const WIDTH_KEY = "explore-width";
  const COLLAPSE_KEY = "explorer-collapsed";

  const collapsedFromStorage = localStorage.getItem(COLLAPSE_KEY) === "true";

  const [width, setWidth] = useState<number>(() => {
    if (collapsedFromStorage) return 0;

    const saved = Number(localStorage.getItem(WIDTH_KEY));
    return saved > 0 ? saved : DEFAULT_WIDTH;
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsedFromStorage);

  const collapsedRef = useRef<boolean>(collapsedFromStorage);

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; 
    e.preventDefault();   
    e.stopPropagation();
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX;

      if (newWidth < MIN_WIDTH) {
        collapsedRef.current = true;
        setIsCollapsed(true);
        setWidth(0);
        return;
      }

      collapsedRef.current = false;
      setIsCollapsed(false);
      setWidth(Math.min(MAX_WIDTH, newWidth));
    };

    const onMouseUp = () => {
      const collapsed = collapsedRef.current;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";

      if (!collapsed && width > 0) {
        localStorage.setItem(WIDTH_KEY, String(width));
      }

      localStorage.setItem(COLLAPSE_KEY, String(collapsed));
      setIsCollapsed(collapsed);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

return (
  <div className="relative h-full flex">
    <div
      className="overflow-hidden background-transparent relative h-full bg-[#222222] flex flex-col"
      style={{
        width: isCollapsed ? 0 : width,
        overflow: "hidden",
        transition: "width 120ms ease",
      }}
    >
      {!isCollapsed && (
        <>
          <div className="pl-7 pb-2 pt-3 text-white/70 text-sm shrink-0">
            Explorer
          </div>

          <div className="explorer flex-1 h-full text-white font-thin text-sm">
            <FileTree />
          </div>
        </>
      )}
    </div>

    <div
      onMouseDown={startResize}
      className="
        absolute top-0 right-0
        bg-transparent
        h-full w-1.5
        cursor-col-resize
        hover:bg-[#007acc]
        z-50
      "
    />
  </div>
);

}

export default Explorer;
