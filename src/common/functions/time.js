import moment from "moment";

export function formatMomentTime(val) {
    return moment.unix(val).format("LLL");
}

export function formatDateTime(val) {
    return moment(val).format("LLL");
}

export function getUTCTime() {
    return moment.utc().unix();
}

export function getUTCTimeLocal() {
    return moment().unix();
}

export function getCurrentTime() {
    let currentTime = moment().unix();

    let dateString = moment.unix(currentTime);
    return dateString;
}

export function getISODate(date = new Date()) {
    let time = moment(date).startOf("day");
    return time;
}

export function gettime(date) {
    let time = moment(date);

    return time;
}

export function timeToUnix(date) {
    return moment(date).unix();
}

export function getMidnightDate(date = new Date()) {
    date.setHours(0, 0, 0, 0);

    return date;
}

export function dateToUnix(date = new Date()) {
    return date.getTime() / 1000;
}

export function getUnixStartOfDay(date = new Date(), ms = false) {
    let time = moment(date)
        .startOf("day")
        .unix();
    if (ms) time *= 1000;

    return time;
}
