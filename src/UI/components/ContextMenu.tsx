import type { ContextMenuPropsType } from "./folder"
import { forwardRef } from "react";
import "./CSS/contextMenu.css"
import { useEffect, useState } from "react";

const ContextMenu = forwardRef<HTMLDivElement, { Props: ContextMenuPropsType }>(({ Props }, ref) => {
    
    const handleDelete = () => {
        if(Props.item){
            
        }
    };

    const handleRename = () => {
        if(Props.item){
            Props.onRename?.();  
            Props.onClose?.();   
        }
    }
    
    const NewFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        Props.onNewFile?.(e as any);
        Props.onClose?.();
    }
    
    const NewFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        Props.onNewFolder?.(e as any);
        Props.onClose?.();
    }

    const [adjustedPosition, setAdjustedPosition] = useState({ x: Props.position.x, y: Props.position.y });
    
    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current) {
            const menuRect = ref.current.getBoundingClientRect();
            let x = Props.position.x;
            let y = Props.position.y;
            
            if (x + menuRect.width > window.innerWidth) {
                x = window.innerWidth - menuRect.width - 10;
            }
            if (y + menuRect.height > window.innerHeight) {
                y = window.innerHeight - menuRect.height - 10;
            }
            
            setAdjustedPosition({ x, y });
        }
    }, [Props.isToggled, Props.position, ref]);

    if(!Props.isToggled) {
        return null;
    }
    else if(Props.item === null) {
        return null;
    }
    else {
        return (   
            <div 
                ref={ref} 
                style={{
                    display: Props.isToggled ? 'flex' : 'none',
                    position:"fixed",
                    top: `${adjustedPosition.y}px`,
                    left: `${adjustedPosition.x}px`,
                }}
                className="contextMenubuttons bg-[#222222]  border border-white/20 min-w-80 gap-1.5 flex-col context-menu z-1000"
            > 
                <button onClick={NewFile} 
                className="first hover:bg-white/70">New File</button>
                <button onClick={NewFolder}
                className=" hover:bg-white/70">New Folder</button>
                <button className=" hover:bg-white/70">Reveal in File Explorer</button>
                <button className=" hover:bg-white/70">Open in integrated terminal</button>
                <div className="horizontal h-px w-full mt-0.75 bg-white/50"></div>
                <button className=" hover:bg-white/70">Cut</button>
                <button className=" hover:bg-white/70">Copy</button>
                <button className=" hover:bg-white/70">Paste</button>
                <div className="horizontal h-px w-full bg-white/50"></div>
                <button className="hover:bg-white/70">Copy Path</button> 
                <button className="hover:bg-white/70">Copy Relative Path</button>
                <div className="horizontal h-px w-full bg-white/50"></div>
                <button 
                    className="w-full pl-4 flex pt-0.5 hover:bg-white/70"
                    onClick={handleRename}
                >
                    Rename
                </button>
                <button 
                    className="w-full pl-4 pb-2 flex hover:bg-white/70"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        )
    }
});

export default ContextMenu;