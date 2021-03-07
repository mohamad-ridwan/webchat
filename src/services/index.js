import GetChatting from "./chatting/get"
import getChattingById from "./chatting/getId"
import PostChatting from "./chatting/post"
import GetChattingUser from "./chattinguser/get"
import PostChattingUser from "./chattinguser/post"
import PutChattingUser from "./chattinguser/put"
import GetEndtoend from "./endtoend/get"
import PostEndtoend from "./endtoend/post"
import getJoinGroup from "./joingroup/get"
import GetByIdJoinGroup from "./joingroup/getId"
import PostJoinGroup from "./joingroup/post"
import PutJoinGroup from "./joingroup/put"
import DeleteNotifikasi from "./notifikasi/delete"
import GetNotifikasi from "./notifikasi/get"
import PostNotifikasi from "./notifikasi/post"
import GetSignin from "./signin/get"
import GetSigninById from "./signin/getById"
import PostSignin from "./signin/post"
import PutSignin from "./signin/put"
import PutBio from "./signin/putBio"
import PutName from "./signin/putName"
import SigninGoogle from "./signin/signin"
import DeleteStatus from "./status/delete"
import GetStatus from "./status/get"
import PostStatus from "./status/post"
import PutStatus from "./status/put"

const APIPostSignin = (data) => PostSignin(`v14/webchat/postchat`, data)
const APIGetSignin = () => GetSignin(`v14/webchat/getchat`)
const APIGetSigninById = (idUser) => GetSigninById(`v14/webchat/getchat/${idUser}`)
const APISigninGoogle = (data) => SigninGoogle(`v14/webchat/getchat/signin`, data)
const APIPostJoinGroup = (data) => PostJoinGroup(`v15/joingroup/post`, data)
const APIGetJoinGroup = () => getJoinGroup(`v15/joingroup/get`)
const APIGetChatting = () => GetChatting(`v16/chatting/get`)
const APIPostChatting = (data) => PostChatting(`v16/chatting/post`, data)
const APIGetChattingById = (id) => getChattingById(`v16/chatting/get/${id}`)
const APIPutJoinGroup = (id, data) => PutJoinGroup(`v15/joingroup/put/${id}`, data)
const APIPutSignin = (id, data) => PutSignin(`v14/webchat/putchat/${id}`, data)
const APIGetChattingUser = () => GetChattingUser(`v17/chattinguser/get`)
const APIPostChattingUser = (data) => PostChattingUser(`v17/chattinguser/post`, data)
const APIGetByIdJoinGroup = (id) => GetByIdJoinGroup(`v15/joingroup/get/${id}`)
const APIPostEndtoend = (data) => PostEndtoend(`v18/endtoend/post`, data)
const APIGetEndtoend = () => GetEndtoend(`v18/endtoend/get`)
const APIPutBio = (id, data) => PutBio(`v14/webchat/putchat/putbio/${id}`, data)
const APIPutName = (id, data) => PutName(`v14/webchat/putchat/putname/${id}`, data)
const APIPostStatus = (data) => PostStatus(`v19/status/poststatus`, data)
const APIGetStatus = () => GetStatus(`v19/status/getstatus`)
const APIDeleteStatus = (id) => DeleteStatus(`v19/status/deletestatus/${id}`)
const APIPutStatus = (id, data) => PutStatus(`v19/status/putstatus/${id}`, data)
const APIPostNotifikasi = (data) => PostNotifikasi(`v17/chattinguser/post/notifchat`, data)
const APIGetNotifikasi = () => GetNotifikasi(`v17/chattinguser/get/notifchat`)
const APIDeleteNotifikasi = (data) => DeleteNotifikasi(`v17/chattinguser/delete/notifchat`, data)
const APIPutChattingUser = (id, data) => PutChattingUser(`v17/chattinguser/put/${id}`, data)

const API = {
    APIPostSignin,
    APIGetSignin,
    APIGetSigninById,
    APISigninGoogle,
    APIPostJoinGroup,
    APIGetJoinGroup,
    APIGetChatting,
    APIPostChatting,
    APIGetChattingById,
    APIPutJoinGroup,
    APIPutSignin,
    APIPostChattingUser,
    APIGetChattingUser,
    APIGetByIdJoinGroup,
    APIPostEndtoend,
    APIGetEndtoend,
    APIPutBio,
    APIPutName,
    APIPostStatus,
    APIGetStatus,
    APIDeleteStatus,
    APIPutStatus,
    APIPostNotifikasi,
    APIGetNotifikasi,
    APIDeleteNotifikasi,
    APIPutChattingUser
}

export default API