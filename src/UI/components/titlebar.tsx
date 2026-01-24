import Vs from "../assets/vs.svg";
import "../index.css";

function TitleBar() {
  return (
    <>
      <div className="h-8 w-full bg-[#3c3c3c] flex items-center text-sm text-gray-200 drag-region">
        <img src={Vs} className=" ml-3 w-4 h-4 mr-2" />
        <div className="flex gap-3 px-2 drag-region">
          <span className="no-drag">File</span>
          <span className="no-drag">Edit</span>
          <span className="no-drag">Selection</span>
          <span className="no-drag">View</span>
          <span className="no-drag">Go</span>
          <span className="no-drag">Run</span>
          <span className="no-drag">Terminal</span>
          <span className="no-drag">Help</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center no-drag">
          <button 
          onClick={() => {
          window.api.minimize();
          }}
          className="no-drag w-10 h-8 hover:bg-zinc-600 flex items-center justify-center">  
            —
          </button>
          <button 
          onClick={() => window.api.maximize()}
          className="no-drag w-10 h-8 hover:bg-zinc-600 flex items-center justify-center">
            ☐
          </button>

          <button 
          onClick={() => window.api.close()}
          className="no-drag w-10 h-8 hover:bg-red-600 flex items-center justify-center">
            ✕
          </button>
        </div>
      </div>
    </>
  );
}

export default TitleBar;
