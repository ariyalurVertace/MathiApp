import {getNewObject, areObjectsEqual} from "../functions/utils";

export default function checkIsFiltered(state) {
    const {feedback} = state;

    const filterLessState = getNewObject(feedback.filterLessState);
    let currentFilter = getNewObject(feedback);

    const {amountMinMax, amount} = currentFilter;

    delete currentFilter.filterLessState;
    delete currentFilter.feedbackList;
    delete currentFilter.isLoadDate;

    const isFiltered = !areObjectsEqual(filterLessState, currentFilter);
    return isFiltered;
}
