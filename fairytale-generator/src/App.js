import React, { useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import './Animation.css';
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

  const [showStory, setShowStory] = useState(true)

  const toggleView = () => {
    setShowStory(!showStory);
  };

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
            {showStory ? (
              <>
                <StoryForm />
                </>
            ) : (
              <>
              
              </>
            )}
            <FairyTale onToggleView={toggleView}/>

            
      </div>
    </BrowserRouter>
  );
}

export default App;
