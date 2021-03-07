import { createContext } from "react"
import DataRoomChatProvider from "./dataroomchat/DataRoomChat"
import DataUserSigninProvider from "./datausersignin/DataUserSignin"
import NotifikasiProvider from "./notifikasi/notifikasi"
import ResultSearchUserProvider from "./resultsearchuser/ResultSearchUser"
import StatusProvider from "./status/status"

export const WrappContext = createContext()

const WrappContextProvider = ({ children }) => {
    return (
        <NotifikasiProvider>
            <StatusProvider>
                <ResultSearchUserProvider>
                    <DataUserSigninProvider>
                        <DataRoomChatProvider>
                            <WrappContext.Provider>
                                {children}
                            </WrappContext.Provider>
                        </DataRoomChatProvider>
                    </DataUserSigninProvider>
                </ResultSearchUserProvider>
            </StatusProvider>
        </NotifikasiProvider>
    )

}

export default WrappContextProvider