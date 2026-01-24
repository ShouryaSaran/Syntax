import { useState } from "react";


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
            className="explorer relative bg-[#2e2d2d] h-full select-none text-white font-thin text-sm">
            <div className="ml-9 pt-2 mb-2 mt-2 text-white/70">Explorer</div>
            <div className="ml-5 mb-4 font-medium text-[12px] h-2 w-full">SYNTAX</div>
            <ul className="flex flex-col gap-0.5 ">
                <li className="pl-8 hover:bg-white/5 cursor-pointer">build</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">dist</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">dist-electron</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">dist-slate</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
                <li className="pl-8 hover:bg-white/5 cursor-pointer">epic</li>
            </ul>
        <div onMouseDown={startResize}
        className="
        absolute top-0 right-0 h-full
        w-1.5
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