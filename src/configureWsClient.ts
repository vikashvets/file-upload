const configureWsClient = (onMessage: (data: any) => void) => {
    const socket = new WebSocket(process.env.REACT_APP_WS_API_URL || '');

    socket.onopen = function(e) {
        socket.send("Client connected to the server");
    };

    socket.onmessage = function(event) {
        onMessage(event.data);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed properly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        console.log(`[error]`);
    };
};

export default configureWsClient;