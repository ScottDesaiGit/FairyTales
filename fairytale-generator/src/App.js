import './App.css';
import './Animation.css';
import React, { useEffect, useState} from 'react'
import DomainOfDreamsIcon from './images/DomainOfDreamsIcon.png'
import FairyTale from "./components/fairy-tale.component";
import StoryForm from "./components/story-form.component";
import socket from "./services/socket.service"
import { BrowserRouter, Link } from 'react-router-dom';

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
    <BrowserRouter>
      <div className="App">
        <div className="header-content"> {/* Container for alignment */}
          <a href="/" className={"logo"}>Domain of Dreams</a>
          {/* <Link to="/"> */}
          <a href="/">
            <img className="App-icon" src={DomainOfDreamsIcon} alt="icon" />
          </a>
          {/* </Link> */}
        </div>
            {/* {showStory ? (
              <>
                <StoryForm />
                </>
            ) : (
              <>
              
              </>
            )} */}
            <FairyTale/>

            
      </div>
    </BrowserRouter>
  );
}

export default App;
