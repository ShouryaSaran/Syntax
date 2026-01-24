import  FolderClose  from '../assets/folder-close.svg';
import  FolderOpen  from '../assets/folder-open.svg';
import { useState } from 'react';



export default function FileTree() {
    
    const [isOpen , setIsOpen] =useState(true); 
    const handleClick = () => {
        setIsOpen(prev => !prev);
    };
    return(
        <>
            <div className="mt-4 max-w-sm ">
                <ul>
                    <li className="hover:bg-white/10 flex my-1.5 hover:cursor-pointer ">
                        <button 
                        onClick={handleClick}
                        className="flex gap-0.5 w-full">
                            <img src={isOpen ? FolderOpen : FolderClose} alt="folder" className='hover:cursor-pointer ' />Syntax
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}