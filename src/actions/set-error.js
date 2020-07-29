export default function setError (error) {
    console.log("starting setError wtih", error);
    return {
        type: 'SET_MESSAGE',
        data: {
            text: error,
            type: 'error'
        }
    };
}
