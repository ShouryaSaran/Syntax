import { useState } from "react";
import explorerData from "./data/explorerData";
import Folder from "./folder";
import type { FileNode } from "./data/explorerData";
import useTraverseTree from "../hooks/traverse-tree";



export default function FileTree() {

    
  const [explorer, setExplorer] = useState<FileNode>(explorerData);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    name: string,
    isFolder: boolean,
  ) => {
    setExplorer((prev) =>
      insertNode(prev, folderId, name, isFolder ? "folder" : "file"),
    );
  };

  return (
    <div 
    className="">
      <Folder 
      explorerData={explorer} 
      handleInsertNode={handleInsertNode}/>
    </div>
  );
}
