import React, { createContext, useState } from 'react'

export const DataRoomChatContext = createContext()

const DataRoomChatProvider = ({ children }) => {

    const [dataRoomChat, setDataRoomChat] = useState({})
    const [dataProfileUserChat, setDataProfileUserChat] = useState({})

    return (
        <DataRoomChatContext.Provider value={[dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat]}>
            {children}
        </DataRoomChatContext.Provider>
    )
}

export default DataRoomChatProvider