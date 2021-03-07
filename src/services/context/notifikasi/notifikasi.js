import React, { createContext, useEffect, useState } from 'react'
import API from '../..'

export const NotifikasiContext = createContext()

const NotifikasiProvider = ({ children }) => {

    const [amountNotif, setAmountNotif] = useState([])
    const [dataUserForNotif, setDataUserForNotif] = useState({})

    function getDataNotif(data, id) {
        const { idUser1, idUser2, idRoom } = data && { ...data }
        API.APIGetNotifikasi()
            .then(res => {
                const result = res.data

                if (data && Object.keys(data).length > 0) {
                    const check = idUser1 === id ? idUser1 : idUser2
                    const filter = result.filter((e) => e.idUser === check && e.idRoom === idRoom)
                    setAmountNotif(filter)

                    if (filter.length > 0) {
                        const dataDelete = {
                            idUser: filter[0].idUser,
                            idRoom: filter[0].idRoom,
                            name: filter[0].name,
                            email: filter[0].email
                        }

                        setTimeout(() => {
                            API.APIDeleteNotifikasi(dataDelete)
                                .then(res => {
                                    return res;
                                })
                        }, 100);
                    }
                }
            })
    }

    function getDataUserForNotif(id) {
        API.APIGetSigninById(id)
            .then(res => {
                const respons = res.data
                setDataUserForNotif(respons)
            })
    }

    return (
        <NotifikasiContext.Provider value={[amountNotif, setAmountNotif, getDataNotif, dataUserForNotif, setDataUserForNotif, getDataUserForNotif]}>
            {children}
        </NotifikasiContext.Provider>

    )
}

export default NotifikasiProvider