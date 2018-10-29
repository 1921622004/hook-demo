import React, { useState, useEffect, useRef } from "react";

export default function Width() {
    const [width,setWidth] = useState(window.innerWidth);
    const h1 = useRef(null);
    console.log(h1);
    
    const setWidthFn = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize',setWidthFn);
        return () => {
            window.removeEventListener('resize',setWidthFn)
        }
    });
    return(
        <div>
            <h1 ref={h1}>当前窗口宽度{width}px</h1>
        </div>
    )
}