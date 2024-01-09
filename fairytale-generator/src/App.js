import React, { useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import FairyTale from "./components/fairy-tale.component";
import StoryForm from "./components/story-form.component";
import StoryTextComponent from "./components/story-text.component"
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

  const [showStory, setShowStory] = useState(true)

  const toggleView = () => {
    setShowStory(!showStory);
  };

  return (
    <div className="App">
      <h3 className={"logo"}>Domain of Dreams</h3>
      {showStory ? (
        <>
          <StoryForm />
          <FairyTale onToggleView={toggleView} />
        </>
      ) : (
        <>
          <StoryTextComponent />
          <ImageComponent />
        </>
      )}
    </div>
  );

  // return (
  //   <div className="app">
  //     <h3 className={"logo"}>Domain of Dreams</h3>
  //     <StoryForm></StoryForm>
  //     <FairyTale></FairyTale>
  //     <SocketComponent></SocketComponent>
  //     <ImageComponent></ImageComponent>
  //   </div>
  // );
}

export default App;
