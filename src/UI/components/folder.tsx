import FolderClose from "../assets/folder-close.svg";
import FolderOpen from "../assets/folder-open.svg";
import { useState } from "react";
import { getFileIcon } from "../Utils/getFileIcon";
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

function Folder({ explorerData }: folderProps) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const handleClick = () => {
    setisOpen((prev) => !prev);
  };
  if (explorerData.type === "folder")
    return (
      <div className="overflow-x-hidden h-full w-full pt-0.5">
        <div className="w-full">
          <button
            onClick={handleClick}
            className="w-full hover:bg-white/10 flex"
          >
            <div className="items-center w-full hover:bg-white/10 text-[13px] flex ">
              <img className="pl-0.5 w-5 h-5" src={isOpen ? FolderOpen : FolderClose} alt="" />
              {explorerData.name}
            </div>
          </button>
        <div style={{display: isOpen?"block":"none"}} className="flex flex-col">
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
