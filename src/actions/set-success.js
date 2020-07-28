export default function (message) {
    return {
        type: 'SET_MESSAGE',
        data: {
            text: message,
            type: 'success',
        }
    };
}
