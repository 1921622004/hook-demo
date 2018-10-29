import React,{ useState } from "react";

function useIsEditing(initValue,num) {
    const [isEditing,setIsEditing] = useState(initValue);
    if(isEditing){
        console.log(`正在编辑第${num}条todo`)
    }
    return {
        isEditing,
        setIsEditing
    }
}

export {useIsEditing}

