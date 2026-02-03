import {v4 as uuidv4} from "uuid";
import type { FileNode } from "../components/data/explorerData";

const useTraverseTree = () => {
    function insertNode(
        tree : FileNode,
        folderId : string,
        item :string,
        type: "file"|"folder") : FileNode {
        if(tree.id === folderId && tree.type === "folder"){
            return{
                ...tree,
                children:[
                    {id:uuidv4(),
                        name:item,
                        type,
                        children: type === "folder"?[] : undefined
                    },
                    ...(tree.children??[]),
                ]
            }
        
        }
        if(!tree.children) return tree;

        return{
            ...tree,
            children : tree.children.map((child) =>
                insertNode(child , folderId , item , type)
            )
        }
    }
    return{ insertNode }
}

export default useTraverseTree;