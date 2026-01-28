import { useState } from "react";
import explorerData from "./data/explorerData";
import Folder from "./folder";


export default function FileTree() {
    
    const [explorer,setExplorer] = useState(explorerData);
    return(
        <div className="">
            <Folder explorerData={explorer}/>
        </div>
    );
}