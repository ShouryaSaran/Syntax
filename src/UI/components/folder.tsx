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
  console.log(explorerData);
  if (explorerData.type === "folder")
    return (
      <div className="w-full pt-5 flex">
        <div className="w-full ">
          <button
            onClick={handleClick}
            className="w-full hover:bg-white/10"
          >
            <div className="w-full flex gap-0.5 hover:bg-white/10 text-[14px]">
              <img src={isOpen ? FolderOpen : FolderClose} alt="" />
              {explorerData.name}
            </div>
          </button>
        <div className="flex flex-col gap-0.5 h-5">
          {explorerData.children?.map((exp) => {
              return <button className="flex pl-6 hover:bg-white/10">
                {exp.name}</button>;
            })}
        </div>
      </div>
    </div>
    );
  else {
    return <span>📄{explorerData.name}</span>;
  }
}

export default Folder;
