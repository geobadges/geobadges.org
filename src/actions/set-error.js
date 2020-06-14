export default function (error) {
    return {
        type: 'SET_ERROR',
        data: error
    };
}
