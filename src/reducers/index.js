const initialState = {
    userId: 1,
    userEmail: '',
    userName: '',
    userPhone: '',
    userPassword: '',
    userFavorites: [],
    bookPlayed: false,
    live: true,
    livePaused: true,
    liveLoader: false,
    liveScreen: true,
    livePosition: 0,
    liveDuration: 0,
    token: false,
    loaded: false,
    message: false,
    messageType: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.payload,
            };
        case 'SET_EMAIL':
            return {
                ...state,
                userEmail: action.payload,
            };
        case 'SET_NAME':
            return {
                ...state,
                userName: action.payload,
            };
        case 'SET_PHONE':
            return {
                ...state,
                userPhone: action.payload,
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                userPassword: action.payload,
            };
        case 'GET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'SET_FAVORITES':
            return {
                ...state,
                userFavorites: action.payload,
            };
        case 'SET_LOADER':
            return {
                ...state,
                loaded: action.payload,
            };
        case 'SET_LIVE_SCREEN':
            return {
                ...state,
                liveScreen: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: false,
                liveLoader: null,
                userId: null,
                userEmail: '',
                userPhone: '',
                userName: '',
                userPassword: '',
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            };
        case 'SET_MESSAGE_TYPE':
            return {
                ...state,
                messageType: action.payload
            };
        case 'SET_BOOK_PLAYED':
            return {
                ...state,
                bookPlayed: action.payload
            };
        case 'SET_LIVE':
            return {
                ...state,
                live: action.payload
            };
        case 'SET_LIVE_LOADER':
            return {
                ...state,
                liveLoader: action.payload
            };
        case 'SET_LIVE_PAUSED':
            return {
                ...state,
                livePaused: action.payload
            };
        case 'SET_LIVE_DURATION':
            return {
                ...state,
                liveDuration: action.payload
            };
        case 'SET_LIVE_POSITION':
            return {
                ...state,
                livePosition: action.payload
            };
        default:
            return state;
    };
};

export default reducer;
