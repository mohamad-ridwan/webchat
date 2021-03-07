import React, { createContext, useState } from 'react'

export const StatusContext = createContext()

const StatusProvider = ({ children }) => {

    const [dataStatus, setDataStatus] = useState([])
    const [dataRoom, setDataRoom] = useState([])

    return (
        <StatusContext.Provider value={[dataStatus, setDataStatus, dataRoom, setDataRoom]}>
            {children}
        </StatusContext.Provider>
    )
}

export default StatusProvider