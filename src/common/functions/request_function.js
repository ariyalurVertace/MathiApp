import {copyArray} from "./utils";

export function formatAreas(area) {
    return area?.Name || "";
}

export function filterInvalidReq(reqs) {
    if (!reqs?.length) return [];

    const filtered = reqs.filter(r => r?.Region?._id);
    return filtered;
}

export function filterCompletedReq(reqs) {
    if (!reqs?.length) return [];
    const filtered = reqs.map(r => {
        if (!r?.People?._id) r.People = null;
        return r;
    });
    return filtered;
}

export async function addSelfStatus(reqs) {
    let returnArray = true;
    if (!Array.isArray(reqs)) {
        returnArray = false;
        reqs = [reqs];
    }
    let input = copyArray(reqs);
    const userId = "5eddf27141b92d25c0f360db";
    if (!userId) return input;

    const output = input.map(item => {
        const volunteers = item.Volunteers;
        if (volunteers?.length === 0) return item;

        volunteers.forEach(volunteer => {
            //also  handle old type of data
            const isFound = volunteer?.Volunteer?._id === userId || volunteer === userId;
            if (isFound) {
                if (!item.CompletedDate) {
                    item.Status = "Accepted";
                }
                item.AcceptedDate = volunteer?.AcceptedDate || item?.AcceptedDate;
            }
        });
        return item;
    });

    if (returnArray) return output;
    return output[0];
}
