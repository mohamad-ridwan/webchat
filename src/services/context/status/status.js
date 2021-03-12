import React, { createContext, useState } from 'react'
import API from '../..'

export const StatusContext = createContext()

const StatusProvider = ({ children }) => {

    const [dataStatus, setDataStatus] = useState([])
    const [dataRoom, setDataRoom] = useState([])
    const [statusUserSignin, setStatusUserSignin] = useState([])
    const [allDataStatus, setAllDataStatus] = useState([])

    let promise = Promise.resolve()

    function updatingStatus(id) {
        API.APIGetStatus()
            .then(res => {
                const result = res.data
                if (result) {
                    // For status user signin
                    const filter = result.filter((e) => e.idUser === id)
                    setStatusUserSignin(filter)
                    const filterNonUserSignin = result.filter((e) => e.idUser !== id)

                    // Remove Unique Id
                    const uniqueId = filterNonUserSignin.filter((data, index) => {
                        const idUser = JSON.stringify(data.idUser);
                        return index === filterNonUserSignin.findIndex(obj => {
                            return JSON.stringify(obj.idUser) === idUser;
                        })
                    })

                    let newData = []
                    API.APIGetChattingUser()
                        .then(res => {
                            const respons = res.data
                            const filterToDataStatus = respons.filter(e => e.idUser1 === id || e.idUser2 === id)

                            if (filterToDataStatus.length > 0) {
                                for (let p = 0; p < filterToDataStatus.length; p++) {
                                    promise = promise.then(() => {
                                        return new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const index = filterToDataStatus[p].idUser1 === id ? filterToDataStatus[p].idUser2 : filterToDataStatus[p].idUser1

                                                const filterUniqueId = uniqueId.filter((e) => e.idUser === index)
                                                setTimeout(() => {
                                                    if (filterUniqueId.length === 1) {
                                                        newData.unshift(filterUniqueId[0])
                                                        setAllDataStatus(newData)
                                                    }
                                                }, 20);
                                                setTimeout(() => {
                                                    resolve();
                                                }, 100);
                                            }, 0);
                                        })
                                    })
                                }
                            }
                        })
                }
            })
    }

    return (
        <StatusContext.Provider value={[dataStatus, setDataStatus, dataRoom, setDataRoom, statusUserSignin, setStatusUserSignin, allDataStatus, setAllDataStatus, updatingStatus]}>
            {children}
        </StatusContext.Provider>
    )
}

export default StatusProvider