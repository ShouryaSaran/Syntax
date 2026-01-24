import FileView from "./fileView";


function editor() {
    return(
        <>
        <div className="bg-[#242323] h-full w-full">
            <div className="h-10 w-full bg-[#2e2d2d]">
                <FileView/>
            </div>
        </div>
        </>
    )
}

export default editor;