import { v4 as uuidv4 } from 'uuid';

export const wsClientId = uuidv4();

const configureWsClient = (onMessage: (data: string) => void) => {
    const connectionUrl = `${process.env.REACT_APP_WS_API_URL}?${wsClientId}`;
    const socket = new WebSocket(connectionUrl);

    socket.onopen = function() {
        socket.send(`Client ${wsClientId} connected to the server`);
    };

    socket.onmessage = function(event) {
        onMessage(event.data);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`Connection for client ${wsClientId} closed properly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log(`Connection for client ${wsClientId} died`);
        }
    };

    socket.onerror = function(error) {
        console.log(`Error ${error} happened for client ${wsClientId}`);
    };
};

export default configureWsClient;