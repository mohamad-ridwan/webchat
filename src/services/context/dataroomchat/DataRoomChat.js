import React, { createContext, useState } from 'react'

export const DataRoomChatContext = createContext()

const DataRoomChatProvider = ({ children }) => {

    const [dataRoomChat, setDataRoomChat] = useState({})
    const [dataProfileUserChat, setDataProfileUserChat] = useState({})

    function clickCardUser(index, totalLength, nameCard) {
        for (let x = 0; x < totalLength; x++) {
            document.getElementById(x).classList.add('group-chat')
            document.getElementById(x).classList.remove('activeBG')
        }

        document.getElementsByClassName(`${nameCard}wrapper`)[0].classList.remove('group-chat')
        document.getElementsByClassName(`${nameCard}wrapper`)[0].classList.add('activeBG')
    }

    return (
        <DataRoomChatContext.Provider value={[dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat, clickCardUser]}>
            {children}
        </DataRoomChatContext.Provider>
    )
}

export default DataRoomChatProvider