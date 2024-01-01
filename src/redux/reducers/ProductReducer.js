import { ActionTypes } from "../constants/ActionTypes";


const initialState = {
    textFont:"'Roboto', sans-serif",

}

export const productReducer = (state = initialState, { type, payload }) => {
    console.log(payload)
    switch (type) {
        case (ActionTypes.SET_TEXT_FONT):
            return {
                ...state,
                textFont: payload
            };
        
        default:
            return state;
    }
}