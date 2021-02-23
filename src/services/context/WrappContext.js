import { createContext } from "react"
import DataRoomChatProvider from "./dataroomchat/DataRoomChat"
import DataUserSigninProvider from "./datausersignin/DataUserSignin"
import ResultSearchUserProvider from "./resultsearchuser/ResultSearchUser"

export const WrappContext = createContext()

const WrappContextProvider = ({ children }) => {
    return (
        <ResultSearchUserProvider>
            <DataUserSigninProvider>
                <DataRoomChatProvider>
                    <WrappContext.Provider>
                        {children}
                    </WrappContext.Provider>
                </DataRoomChatProvider>
            </DataUserSigninProvider>
        </ResultSearchUserProvider>
    )

}

export default WrappContextProvider