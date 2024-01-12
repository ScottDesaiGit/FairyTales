import React, { useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import './Animation.css';
import DomainOfDreamsIcon from './images/DomainOfDreamsIcon.png'
import FairyTale from "./components/fairy-tale.component";
import StoryForm from "./components/story-form.component";
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
      <div className="header-content"> {/* Container for alignment */}
        <h3 className={"logo"}>Domain of Dreams</h3>
        <img className="App-icon" src={DomainOfDreamsIcon} alt="icon" />
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
  );
}

export default App;
