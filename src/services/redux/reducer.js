import ActionType from "./ActionType";
import StateGlobalReducer from "./StateGlobalRedux";

const counterReducer = (state = StateGlobalReducer, action) => {
    switch (action.type) {
        case ActionType.DATA_ROOM_USER_CHAT:
            return {
                ...state,
                dataRoomUserChat: state.dataRoomUserChat = 'data room'
            }
        case ActionType.DATA_USER_CHAT:
            return {
                ...state,
                dataUserChat: state.dataUserChat = 'wow'
            }
        default:
            return state;
    }
}

export default counterReducer