import React, { useState } from "react";

const useInputValue = initValue => {
  const [inputValue, setInputValue] = useState(initValue);
  return {
    inputValue,
    changeHandler:ev => {
      setInputValue(ev.target.value)
    },
    confirmHandler:(ev,callback) => {
      if(ev.keycode === 13 || ev.which === 13){
        const value = ev.target.value
        setInputValue(value);
        callback(value);
      }
    }
  }
}

export { useInputValue }

