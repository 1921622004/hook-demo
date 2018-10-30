import React from "react";
import { useInputValue } from "./customHooks";

function AddTodo ({title}) {
    const {
        inputValue,
        changeHandler,
        confirmHandler
    } = useInputValue(title);
    return (
        <div>
            
        </div>
    )
}