import  File  from "../assets/files.svg";
import Search from "../assets/search.svg";
import git from "../assets/git.svg";
import debug from "../assets/debug.svg";
import extensions from "../assets/extensions.svg"


function sidebar() {
    return (
        <div className="sidebar bg-[#2b2b2b] flex flex-col items-center gap-3 w-13 h-full min-w-13">
            <img src= {File} alt="" className="w-7 mt-3"/>
            <img src= {Search} alt="" className="w-7 mt-3"/>
            <img src={git} alt="" className="w-7 mt-3"/>
            <img src={debug} alt="" className="w-7 mt-3"/>
            <img src={extensions} alt="" className="w-7 mt-3"/>
        </div>
    )
}

export default sidebar