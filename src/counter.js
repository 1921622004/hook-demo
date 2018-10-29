import React, { useState, useEffect } from "react";

export default function Cunter() {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('hello-react');
    const h1 = useRef(null);
    useEffect(() => {
        console.log('effect')
        return () => {
            console.log('unmount')
        }
    }, [title])
    console.log('render ===============');
    return (
        <div className="count-box">
            <h1 className="title" >点了{count}次</h1>
            <button onClick={() => {
                setCount(count + 1);
                setTitle('hello-hooks');
            }}>
                Click Me!
      </button>
            <p>{title}</p>
        </div>
    )
}