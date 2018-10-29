import React from "react";
import { useIsEditing } from "./customHooks";

export default function TodoItem(props) {
    const { isEditing, setIsEditing } = useIsEditing(false);
    const { content } = props;
    return (
        <li>
            {
                isEditing ?
                    content :
                    <input type="text" value={content} />
            }
        </li>
    )
}