import React, { createContext, useEffect, useState } from 'react'
import API from '../..'

export const ResultSearchUserContext = createContext()

const ResultSearchUserProvider = ({ children }) => {

    const [valueSearchHome, setValueSearchHome] = useState('')
    const [roomChatUser, setRoomChatUser] = useState([])
    const [userLogin, setUserLogin] = useState({})
    const [filterChatUser, setFilterChatUser] = useState([])

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    const semuaAPI = () => {
        let dataChat = new Array()
        API.APIGetChattingUser()
            .then(res => {
                const respons = res.data
                if (respons) {
                    dataChat.push(respons)
                    setRoomChatUser(respons)
                }

                // setRoomChatUser(room => [...room], roomChatUser)
            })
        // API.APIGetSigninById(id)
        //     .then(res => {
        //         setUserLogin(res.data)
        //     })
        API.APIGetEndtoend()
            .then(res => {
                const respons = res.data
                setTimeout(() => {
                    const userId = JSON.parse(localStorage.getItem('userId'))
                    const id = userId && userId._id
                    const filterRoomChat = dataChat.length > 0 && dataChat[0].filter((e) => e.idUser1 === id || e.idUser2 === id)
                    for (let i = 0; i < filterRoomChat.length; i++) {
                        const check = filterRoomChat[i].idRoom
                        const filterIdRoom = respons.filter((e) => e.idRoom === check)
                        // console.log(filterIdRoom)
                        let newData = []
                        // let tes = new Array(...filterIdRoom)
                        // tes.splice(0, 0, filterIdRoom)
                        newData.push(filterIdRoom)
                        setFilterChatUser(newData[0])
                        setFilterChatUser(data => [...data], filterChatUser)
                        // console.log(tes)
                    }
                }, 100)
            })
    }

    // console.log(filterChatUser)

    const filterRoomChat = roomChatUser.filter((e) => e.idUser1 === id || e.idUser2 === id)
    const filterSearch = filterRoomChat.filter((e) => e.nameUser1.toLowerCase().includes(valueSearchHome.toLowerCase()) || e.nameUser2.toLowerCase().includes(valueSearchHome.toLowerCase()))
    const filterMessage = filterChatUser.filter((e) => e.pesan.toLowerCase().includes(valueSearchHome.toLowerCase()))

    useEffect(() => {
        semuaAPI();
    }, [])

    return (
        <ResultSearchUserContext.Provider value={[valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI]}>
            {children}
        </ResultSearchUserContext.Provider>
    )
}

export default ResultSearchUserProvider