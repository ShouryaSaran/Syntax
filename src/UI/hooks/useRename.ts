import type { Folder } from "../components/folder";
import type { FileNode } from "../components/data/explorerData";

const useRename = () => {
    const Rename = (
        tree: FileNode,
        expId: string,
        Newname: string
    ): FileNode => {
        if (tree.id === expId) {
            tree.name = Newname;
            return tree;
        }

        if (tree.children) {
            tree.children = tree.children.map(child => 
                Rename(child, expId, Newname)
            );
        }

        return tree;
    }

    return { Rename };
}

export default useRename;