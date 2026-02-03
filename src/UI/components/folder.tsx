import React, { useState, useEffect, useRef } from "react";
import {
  FolderClose,
  FolderOpen,
  getFileIcon,
  NewFile,
  NewFolder,
  file,
} from "../Utils/imports";
import ContextMenu from "./ContextMenu";

export type Folder = {
  id: string;
  name: string;
  type: "folder" | "file";
  extension?: string;
  isOpen?: boolean;
  children?: Folder[];
};

type folderProps = {
  explorerData: Folder;
  handleInsertNode: (folderId: string, name: string, isFolder: boolean) => void;
};

type Input = {
  visible: boolean;
  isFolder: boolean;
};

export type ContextMenuPropsType = {
  position: {
    x: number;
    y: number;
  };
  isToggled: boolean;
  item: Folder | Folder[] | null;
};

function Folder({ explorerData, handleInsertNode }: folderProps) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const ContextMenuRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState<Input>({
    visible: false,
    isFolder: false,
  });
  const [showButtons, setShowButtons] = useState<boolean>(false);
    const [ContextMenuState, setContextMenuState] =
    useState<ContextMenuPropsType>({
      position: { x: 0, y: 0 },
      isToggled: false,
      item: null,
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ContextMenuRef.current &&
        !ContextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenuState({
          position: { x: 0, y: 0 },
          isToggled: false,
          item: null,
        });
      }
    }

    if (ContextMenuState.isToggled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContextMenuState.isToggled]);



  const handleClick = () => {
    setisOpen((prev) => !prev);
  };

  const newFolder = (
    e: React.MouseEvent<HTMLDivElement>,
    isFolder: boolean,
  ) => {
    e.stopPropagation();
    setisOpen(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const newFile = (e: React.MouseEvent<HTMLDivElement>, isFolder: boolean) => {
    e.stopPropagation();
    setisOpen(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowInput({ ...showInput, visible: false });
      return;
    }
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      handleInsertNode(
        explorerData.id,
        e.currentTarget.value,
        showInput.isFolder,
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  function handleOnContextMenu(
    e: React.MouseEvent<HTMLDivElement>,
    item: Folder | Folder[],
  ) {
    e.preventDefault();
    e.stopPropagation();

    setContextMenuState({
      position: {
        x: e.clientX,
        y: e.clientY,
      },
      isToggled: true,
      item: item,
    });
  }

  if (explorerData.type === "folder")
    return (
      <>
        <div className="overflow-x-hidden h-full w-full pt-0.5 cursor-pointer">
          <div className="w-full">
            <div
              onClick={handleClick}
              className="w-full hover:bg-white/10 flex"
            >
              <div
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
                className="items-center w-full hover:bg-white/10 text-[13px] flex cursor-pointer justify-between"
              >
                <div
                  onContextMenu={(e) => handleOnContextMenu(e, explorerData)}
                  className="flex"
                >
                  <img
                    className="pl-0.5 w-5 h-5"
                    src={isOpen ? FolderOpen : FolderClose}
                    alt=""
                  />
                  {explorerData.name}
                </div>
                {showButtons && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="buttons mr-3 flex gap-3"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={(e) => newFile(e, false)}
                    >
                      <img src={NewFile} alt="newFile" />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => newFolder(e, true)}
                    >
                      <img src={NewFolder} alt="newFolder" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="flex flex-col"
            >
              {showInput.visible && (
                <div className="items-center flex">
                  <span>
                    <img
                      src={showInput.isFolder ? FolderClose : file}
                      className="h-5 pl-2"
                      alt=""
                    />
                  </span>
                  <input
                    onKeyDown={onAddFolder}
                    autoFocus
                    onBlur={() =>
                      setShowInput({ ...showInput, visible: false })
                    }
                    type="text"
                    className="h-5 pl-2 border-2 border-blue-500 inputContainer w-full"
                  />
                </div>
              )}
              {explorerData.children?.map((exp) => {
                return (
                  <div
                    onContextMenu={(e) => {
                      handleOnContextMenu(e, exp);
                    }}
                    className="pl-2"
                    key={exp.id}
                  >
                    <Folder
                      explorerData={exp}
                      handleInsertNode={handleInsertNode}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {ContextMenuState.isToggled && (
          <ContextMenu Props={ContextMenuState} ref={ContextMenuRef} />
        )}
      </>
    );
  else {
    return (
      <>
        <div
          onContextMenu={(e) => {
            handleOnContextMenu(e, explorerData);
          }}
          className="pl-2 pt-0.5 w-full hover:bg-white/10 flex items-center text-[13px]"
        >
          <img
            src={getFileIcon(explorerData.extension)}
            className="w-4 h-4"
            onError={(e) => {
              e.currentTarget.src = "/file-icons/default_file.svg";
            }}
          />
          {explorerData.name}
        </div>
        {ContextMenuState.isToggled && (
          <ContextMenu Props={ContextMenuState} ref={ContextMenuRef} />
        )}
      </>
    );
  }
}

export default Folder;
