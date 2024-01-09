import React, { useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import FairyTale from "./components/fairy-tale.component";
import StoryForm from "./components/story-form.component";
import SocketComponent from "./components/socket.component"
import ImageComponent from "./components/image.component"
import socket from "./services/socket.service"


function App() {
  
  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      // setMessage(data);
    });

    // Clean up the effect
    return () => socket.off('message');
  }, []);

  return (
    <div className="app">
      <h3 className={"logo"}>Domain of Dreams</h3>
      <StoryForm></StoryForm>
      <FairyTale></FairyTale>
      <SocketComponent></SocketComponent>
      <ImageComponent></ImageComponent>
    </div>
  );
}

export default App;
