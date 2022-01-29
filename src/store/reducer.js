import { LOGIN } from "./types";
const initialState ={
    loggedInUser:null
};

const rootReducer =(state,action) =>{
    switch (action.type){
        case LOGIN :
            return {...state,loggedInUser:action.payload
            }
        default :
        return initialState;
    }
}
export default rootReducer