import React, { createContext, useEffect, useState } from 'react'
import API from '../..'

export const ResultSearchUserContext = createContext()

const ResultSearchUserProvider = ({ children }) => {

    const [valueSearchHome, setValueSearchHome] = useState('')
    const [roomChatUser, setRoomChatUser] = useState([])
    const [userLogin, setUserLogin] = useState({})
    const [filterChatUser, setFilterChatUser] = useState([])
    const [conditionShowMessage, setConditionShowMessage] = useState(false)

    const userId = JSON.parse(localStorage.getItem('userId'))
    const id = userId && userId._id

    let promise = Promise.resolve();

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
        let newData = []
        API.APIGetEndtoend()
            .then(res => {
                const respons = res.data
                setTimeout(() => {
                    const userId = JSON.parse(localStorage.getItem('userId'))
                    const id = userId && userId._id
                    const filterRoomChat = dataChat.length > 0 && dataChat[0].filter((e) => e.idUser1 === id || e.idUser2 === id)
                    for (let i = 0; i < filterRoomChat.length; i++) {
                        promise = promise.then(() => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const check = filterRoomChat[i].idRoom
                                    const filterIdRoom = respons.filter((e) => e.idRoom === check)
                                    const changeToObj = filterIdRoom.reduce((result, item) => {
                                        newData.push(item)
                                    }, {})
                                    setFilterChatUser(newData)

                                    setTimeout(() => {
                                        resolve()
                                    }, 20);

                                    return changeToObj;
                                }, 10);
                            })
                        })
                    }
                }, 100)
            })
    }

    // console.log(filterChatUser)

    function toShowMessageReply(_id) {
        const columnIsiChat = document.getElementById(_id)

        if (columnIsiChat) {
            columnIsiChat.style.backgroundColor = '#37afe283'

            setTimeout(() => {
                columnIsiChat.style.backgroundColor = 'transparent'
            }, 500);
        }
    }

    function changeBgResultSearch(index, totalLength) {
        for (let i = 0; i < totalLength; i++) {
            document.getElementsByClassName('box-card-result-message')[0].children.item(i).classList.add('group-chat')
            document.getElementsByClassName('box-card-result-message')[0].children.item(i).classList.remove('activeBG')
        }
        if (index !== null) {
            document.getElementsByClassName('box-card-result-message')[0].children.item(index).classList.remove('group-chat')
            document.getElementsByClassName('box-card-result-message')[0].children.item(index).classList.add('activeBG')
        }
    }

    const filterRoomChat = roomChatUser.filter((e) => e.idUser1 === id || e.idUser2 === id)
    const filterSearch = filterRoomChat.filter((e) => e.nameUser1.toLowerCase().includes(valueSearchHome.toLowerCase()) || e.nameUser2.toLowerCase().includes(valueSearchHome.toLowerCase()))
    const filterMessage = filterChatUser.filter((e) => e.pesan.toLowerCase().includes(valueSearchHome.toLowerCase()))

    useEffect(() => {
        semuaAPI();
    }, [])

    return (
        <ResultSearchUserContext.Provider value={[valueSearchHome, setValueSearchHome, roomChatUser, setRoomChatUser, userLogin, setUserLogin, filterSearch, filterMessage, semuaAPI, toShowMessageReply, conditionShowMessage, setConditionShowMessage, changeBgResultSearch]}>
            {children}
        </ResultSearchUserContext.Provider>
    )
}

export default ResultSearchUserProvider