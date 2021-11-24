import thunk from "redux-thunk";

import {configureStore} from "@reduxjs/toolkit";
import commonReducer from "./common_reducer";
import eBeatReducer from "./eBeat_reducer";
import reachmeReducer from "./reachme_reducer";
import feedbackReducer from "./feedback_reducer";
import requestReducer from "./request_reducer";
import welfareReducer from "./welfare_reducer";
import officerReducer from "./officer_reducer";

export default configureStore({
    reducer: {
        common: commonReducer,
        ebeat: eBeatReducer,
        reachme: reachmeReducer,
        feedback: feedbackReducer,
        request: requestReducer,
        welfare: welfareReducer,
        officer: officerReducer,
    },
    middleware: [thunk],
});
