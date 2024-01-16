import io from 'socket.io-client';

const SOCKET_URL = "https://api.domain-of-dreams.com"; // Your server URL
const socket = io(SOCKET_URL);
export const getSocketId = () => {
    return socket.id;
};


export default socket;