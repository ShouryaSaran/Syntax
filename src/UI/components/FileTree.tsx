import { useState } from "react";
import explorerData from "./data/explorerData";
import Folder from "./folder";
import type { FileNode } from "./data/explorerData";
import useTraverseTree from "../hooks/traverse-tree";
import useRename from "../hooks/useRename";

export default function FileTree() {
  const [explorer, setExplorer] = useState<FileNode>(explorerData);
  const [renamingId, setRenamingId] = useState<string | null>(null); // Add this state
  const { insertNode } = useTraverseTree();
  const { Rename } = useRename();
  
  const handleInsertNode = (
    folderId: string,
    name: string,
    isFolder: boolean,
  ) => {
    setExplorer((prev) =>
      insertNode(prev, folderId, name, isFolder ? "folder" : "file"),
    );
  };

  const handleRenameNode = (expId: string, newName: string) => {
    setExplorer((prev) => Rename(prev, expId, newName));
  };

  return (
    <div className="">
      <Folder 
        explorerData={explorer} 
        handleInsertNode={handleInsertNode}
        handleRenameNode={handleRenameNode}
        renamingId={renamingId}           // Pass as prop
        setRenamingId={setRenamingId}     // Pass setter as prop
      />
    </div>
  );
}