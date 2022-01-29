import {LOGIN} from './types';
export const login  =(
    email
) =>{
    return {
        type:LOGIN,
        payload:{
            email
        }
    }
}