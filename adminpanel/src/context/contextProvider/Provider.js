import React, { useState } from 'react';
import context from '../context/context'

export default function Provider({ children }) {
    const [admin, setAdmin] = useState("");

    return (
        <context.Provider value={[admin, setAdmin]}>
            {children}
        </context.Provider>
    )
}
