

type Folder = {
    id: string;
    name: string;
    type: "folder" | "file";
    extension?: string;
    isOpen?: boolean;
    children?: Folder[];
}
type folderProps = {
    explorer : Folder
}

function Folder({ explorer } : folderProps) {
    console.log(explorer);
    return(
        <div>Hello</div>
    )
}


export default Folder;