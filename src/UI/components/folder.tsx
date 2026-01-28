import FolderClose from "../assets/folder-close.svg";
import FolderOpen from "../assets/folder-open.svg";
import React, { useState } from "react";
import { getFileIcon } from "../Utils/getFileIcon";
import NewFile from "../assets/new-file.svg";
import NewFolder from "../assets/new-folder.svg";
import file from "../assets/file.svg";
type Folder = {
  id: string;
  name: string;
  type: "folder" | "file";
  extension?: string;
  isOpen?: boolean;
  children?: Folder[];
};
type folderProps = {
  explorerData: Folder;
};
type Input = {
  visible: boolean;
  isFolder: boolean;
}

function Folder({ explorerData }: folderProps) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const [showInput , setShowInput] = useState<Input>({
    visible: false,
    isFolder:false,
  });


  const handleClick = () => {
    setisOpen((prev) => !prev);

  };

  const newFolder = (e: React.MouseEvent<HTMLButtonElement>, isFolder : boolean) => {
    e.stopPropagation();
    setisOpen(true);
    setShowInput({
      visible:true,
      isFolder:isFolder
    })
  }
    const newFile = (e: React.MouseEvent<HTMLButtonElement>, isFolder : boolean) => {
    e.stopPropagation();
    setisOpen(true);
    setShowInput({
      visible:true,
      isFolder:isFolder
    })
  }

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Escape"){
      setShowInput({...showInput,visible:false});
    }
    if(e.key === "Enter" && e.currentTarget.value !== ""){
      setShowInput({...showInput, visible:false});
    }
  }
  if (explorerData.type === "folder")
    return (
      <div className="overflow-x-hidden h-full w-full pt-0.5 cursor-pointer">
        <div className="w-full">
          <button
            onClick={handleClick}
            className="w-full hover:bg-white/10 flex"
          >
            <div className="items-center w-full hover:bg-white/10 text-[13px] flex cursor-pointer justify-between">
            <div className="flex">
              <img className="pl-0.5 w-5 h-5  " src={isOpen ? FolderOpen : FolderClose} alt="" />
              {explorerData.name}</div>
              <div className="buttons mr-3 flex gap-3 ">
                  <button
                  className="cursor-pointer"
                    onClick={(e) => newFile(e,false)}>
                      <img src={NewFile} alt="newFile" />
                  </button >
                      
                  <button 
                  className="cursor-pointer"
                  onClick={(e) => newFolder(e,true)}>
                      <img src={NewFolder} alt="newFolder" />
                  </button>
              </div>
            </div>
          </button>
        <div style={{display: isOpen?"block":"none"}} className="flex flex-col">
         {showInput.visible && (
          <div className=" items-center flex">
            <span><img src={showInput.isFolder ? FolderClose : file} className="h-5 pl-2" alt="" /></span>
            <input 
            onKeyDown={onAddFolder}
            autoFocus
             onBlur={()=>setShowInput({...showInput,visible:false})}
             type="text"
             className="h-5 pl-2 border-2 border-blue-500 inputContainer w-full" />
          </div>
         )}
          {explorerData.children?.map((exp) => {
              return <div className="pl-2"><Folder explorerData={exp}/></div>
            })}
        </div>
      </div>
    </div>
    );
  else {
    return <div className="pl-2 pt-0.5 w-full hover:bg-white/10 flex items-center text-[13px]">
      <img src={getFileIcon(explorerData.extension)}
      className="w-4 h-4"
      onError={(e)=>{
        e.currentTarget.src = "/file-icons/default_file.svg";
      }}
      />
      {explorerData.name}
      </div>;
  }
}

export default Folder;
