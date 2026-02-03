import type { ContextMenuPropsType } from "./folder"
import { forwardRef } from "react";
import useDelete from "../hooks/useDelete";
import useRename from "../hooks/useRename";
import "./CSS/contextMenu.css"




const ContextMenu = forwardRef<HTMLDivElement, { Props: ContextMenuPropsType,
     onNewFileFromContextMenu? : ()=> void 
     onNewFolderFromContextMenu?: () => void }> (({ Props },ref) => {
    
        const onDelete = useDelete();
        const onRename = useRename();

        const handleDelete = ()=>{
            if(Props.item){
                onDelete(Props.item)
            }
        };

        const handleRename = () => {
            if(Props.item){
                onRename(Props.item)
            }
        }
        const NewFile = (e: React.MouseEvent<HTMLButtonElement>, isFolder:false) => {
            e.stopPropagation();
        }
        const NewFolder = (e:React.MouseEvent<HTMLButtonElement> , isFolder:true) =>{
            e.stopPropagation();
        }
        let x = Props.position.x        
        let y = Props.position.y 

        if(!Props.isToggled) {
            return null;
        }
        else if(Props.item === null) {
            return null;
        }
        else{
            return (   
                <div 
                    ref={ref} 
                    style={{
                        display: Props.isToggled ? 'flex' : 'none',
                        position:"fixed",
                        top: `${y}px`,
                        left: `${x}px`,
                    }}
                    className="contextMenubuttons bg-[#222222]  border border-white/20 min-w-80 gap-1.5 flex-col context-menu z-1000"
                > 
                    <button onClick ={(e) => NewFile(e,false)} 
                    className="first hover:bg-white/70">New File</button>
                    <button onClick = {(e) => NewFolder(e,true)}
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
    }
);

export default ContextMenu;