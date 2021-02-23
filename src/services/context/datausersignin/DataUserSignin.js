import React, { createContext, useEffect, useState } from 'react'
import API from '../..'

export const DataUserSiginContext = createContext()

const DataUserSigninProvider = ({ children }) => {

    const [userSigninGlobal, setUserSigninGlobal] = useState({})

    const userId = JSON.parse(localStorage.getItem('userId'))

    function setAllAPI() {
        // API.APIGetSigninById(userId && userId._id)
        //     .then((res) => {
        //         setUserSigninGlobal(res.data)
        //         // setUserSigninGlobal(data => ({ ...data }), userSigninGlobal)
        //     })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <DataUserSiginContext.Provider value={[userSigninGlobal, setUserSigninGlobal]}>
            {children}
        </DataUserSiginContext.Provider>
    )
}

export default DataUserSigninProvider