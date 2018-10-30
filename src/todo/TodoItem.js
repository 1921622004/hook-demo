import React, { useState, useEffect } from "react";
import request from "./request";
import { Card, Select, Input } from "antd";

export default function TodoItem({ id }) {
    const [isChecked, setChecked] = useState(false);
    const [content, setContent] = useState(null);
    useEffect(async () => {
        const res = await request(`localhost:4040/api/find?id=${id}`);
        setChecked(res.isChecked);
        setContent(res.content)
    }, [isChecked, content])
    return (
        <li>

        </li>
    )
}