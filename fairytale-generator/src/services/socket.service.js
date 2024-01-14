import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:5000"; // Your server URL
const socket = io(SOCKET_URL);
export const getSocketId = () => {
    return socket.id;
};


export default socket;