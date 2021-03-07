import React, { createContext, useState } from 'react'

export const DataRoomChatContext = createContext()

const DataRoomChatProvider = ({ children }) => {

    const [dataRoomChat, setDataRoomChat] = useState({})
    const [dataProfileUserChat, setDataProfileUserChat] = useState({})

    function clickCardUser(index, totalLength) {
        for (let x = 0; x < totalLength; x++) {
            document.getElementById(x).className = 'group-chat'
            document.getElementById(x).style.color = '#000'
            document.getElementById(`${x}namePesanMasuk`).style.color = '#0088cc'
            document.getElementById(`${x}pesanMasuk`).style.color = '#999'
            document.getElementById(`${x}datePesan`).style.color = '#aaa'
        }

        document.getElementById(index).classList.add('activeBG')
        document.getElementById(index).style.color = '#fff'
        document.getElementById(`${index}namePesanMasuk`).style.color = '#fff'
        document.getElementById(`${index}pesanMasuk`).style.color = '#fff'
        document.getElementById(`${index}datePesan`).style.color = '#fff'
    }

    return (
        <DataRoomChatContext.Provider value={[dataRoomChat, setDataRoomChat, dataProfileUserChat, setDataProfileUserChat, clickCardUser]}>
            {children}
        </DataRoomChatContext.Provider>
    )
}

export default DataRoomChatProvider