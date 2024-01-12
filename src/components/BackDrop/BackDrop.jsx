import React from "react";

function BackDrop ({isOpen, onClick}) {
    return (
        <>
        {isOpen ? 
            <div onClick={onClick} className="cursor-pointer fixed inset-0 bg-black bg-opacity-50 z-30"></div>
        :
    null}
    </>);
}

export default BackDrop;