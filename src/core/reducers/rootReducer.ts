import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import { appReducer, searchReducer,} from "../autocomplete";
import { formReducer,} from "../form";
import { appMicroblogReducer,usersReducer, postsReducer} from "../microblog";
import { statsReducer,startStopappReducer} from "../startstop";
import { takexapReducer} from "../takex";
import {  throttleAppReducer, throttleReducer,} from "../throttle";
import { wizardapp , message, data,} from "../wizard";

const rootReducer = combineReducers({
    app: appReducer,
    search: searchReducer,
    formReducer,
    appMicroblogReducer,
    postsReducer,
    usersReducer,
    statsReducer,
    startStopappReducer,
    takexapReducer,
    throttleAppReducer,
    throttleReducer,
    wizardapp,
    message,
    data,
    form: reduxFormReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
