import FolderClose from "../assets/folder-close.svg";
import FolderOpen from "../assets/folder-open.svg";
import { useState } from "react";
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
      <div className="h-full w-full">
        <div className="w-full ">
          <button
            onClick={handleClick}
            className="w-full hover:bg-white/10 flex"
          >
            <div className="w-full hover:bg-white/10 text-[14px] flex ">
              <img className="w-5 h-5" src={isOpen ? FolderOpen : FolderClose} alt="" />
              {explorerData.name}
            </div>
          </button>
        <div style={{display: isOpen?"block":"none"}} className="flex flex-col pl-5">
          {explorerData.children?.map((exp) => {
              return <Folder explorerData={exp}/>
            })}
        </div>
      </div>
    </div>
    );
  else {
    return <div>📄{explorerData.name}</div>;
  }
}

export default Folder;
