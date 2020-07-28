export function isEmpty(str) {
    if (str === null) return true;
    if (typeof str === 'undefined') return true;
    if (typeof str === 'string' && str.trim() === '') return true;
    return false;
}

export function naturalJoin(arr) {
    if (arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + " and " + arr[1];
    if (arr.length === 3) return arr[0] + ", " + arr[1] + " and " + arr[2];
    if (arr.length > 3) return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
}