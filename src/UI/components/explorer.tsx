import { useState } from "react";
import FileTree from "./FileTree";

function Explorer() {
  const defaultWidth = 240;
  const Min_Width = 180;
  const STORAGE_KEY = "explore-width";
  const Max_Width = window.innerWidth * 0.4;
  const [width, setWidth] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : defaultWidth;
  });

    const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startWidth = width;


    const onMouseMove = (e: MouseEvent) => {
      setWidth(Math.min(Max_Width,Math.max(Min_Width, startWidth + e.clientX - startX)));
    };

    const onMouseUp = () => {
      localStorage.setItem(STORAGE_KEY, String(width));
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
    return(
    <>
        <div className="flex flex-col">
            <div 
            style={{ width }}
            className="explorer relative bg-[#222222] h-full select-none text-white font-thin text-sm">
            <div className="pl-7 pb-2 pt-3 text-white/70">Explorer</div>
            <div className="FileTree h-full">
              <FileTree/>
            </div>
        <div onMouseDown={startResize}
        className="
        absolute top-0 right-0 h-full
        w-0.75
        cursor-col-resize
        bg:transparent
        hover:bg-[#007acc]
        "/>
        </div>
      </div>
    </>
  )
}

export default Explorer;