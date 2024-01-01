import {ActionTypes} from '../constants/ActionTypes.js'


export const setTextFont=(products)=>{
    return{
        type:ActionTypes.SET_TEXT_FONT,
        payload:products,
    }
}
