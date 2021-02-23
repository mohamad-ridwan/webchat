import React, { createContext, useEffect, useState } from 'react'
import API from '../..'

export const ResultSearchUserContext = createContext()

const ResultSearchUserProvider = ({ children }) => {

    const [valueSearchHome, setValueSearchHome] = useState('')
    const [roomChatUser, setRoomChatUser] = useState([])
    const [userLogin, setUserLogin] = useState({})
    const [allChatUser, setAllChatUser] = useState([])

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    const semuaAPI = () => {
        API.APIGetChattingUser()
            .then(res => {
                const respons = res.data
                setRoomChatUser(respons)
            })
        API.APIGetSigninById(id)
            .then(res => {
                setUserLogin(res.data)
            })
        API.APIGetEndtoend()
            .then(res => {
                const respons = res.data
                setAllChatUser(respons)
            })
    }

    const filterRoomChat = roomChatUser.filter((e) => e.idUser1 === id || e.idUser2 === id)
    const filterSearch = filterRoomChat.filter((e) => e.nameUser1.toLowerCase().includes(valueSearchHome.toLowerCase()) || e.nameUser2.toLowerCase().includes(valueSearchHome.toLowerCase()))
    const filterMessage = allChatUser.filter((e) => e.pesan.toLowerCase().includes(valueSearchHome.toLowerCase()))

    useEffect(() => {
        semuaAPI();
    }, [])

    return (
        <ResultSearchUserContext.Provider value={[valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage]}>
            {children}
        </ResultSearchUserContext.Provider>
    )
}

export default ResultSearchUserProvider