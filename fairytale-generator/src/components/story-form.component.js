import React, { useState } from 'react';

const StoryForm = (props) => {
  // State variables for each input
  const [protagonistName, setProtagonistName] = useState('');
  const [protagonistDescription, setProtagonistDescription] = useState('');
  const [setting, setSetting] = useState('');
  const [sideCharacters, setSideCharacters] = useState('');
  const [plotPoints, setPlotPoints] = useState('');

  // Event handlers to update state
  const handleProtagonistNameChange = (event) => setProtagonistName(event.target.value);
  const handleProtagonistDescriptionChange = (event) => setProtagonistDescription(event.target.value);
  const handleSettingChange = (event) => setSetting(event.target.value);
  const handleSideCharactersChange = (event) => setSideCharacters(event.target.value);
  const handlePlotPointsChange = (event) => setPlotPoints(event.target.value);

  // Submit handler
  const handleSubmit = () => {
    const formData = {
      protagonistName,
      protagonistDescription,
      setting,
      sideCharacters,
      plotPoints,
    };
    // Pass formData back to parent component
    props.onSubmit(formData);
  };

  return (
    <div>
      <p className="fairytale-form-note">
        📜 Every field is optional in your fairytale
      </p>

      <label>
        Protagonist Name:
        <input type="text" name="protagonistName" value={protagonistName} onChange={handleProtagonistNameChange} />
      </label>
      <br />

      <label>
        Protagonist Description:
        <input type="text" name="protagonistDescription" value={protagonistDescription} onChange={handleProtagonistDescriptionChange} />
      </label>
      <br />

      <label>
        Setting:
        <input type="text" name="setting" value={setting} onChange={handleSettingChange} />
      </label>
      <br />

      <label>
        Side Characters and Descriptions:
        <br />
        <textarea name="sideCharacters" value={sideCharacters} onChange={handleSideCharactersChange} />
      </label>
      <br />

      <label>
        General Plot Points:
        <br />
        <textarea name="plotPoints" value={plotPoints} onChange={handlePlotPointsChange} />
      </label>
      <br />

      <button   className="button-fairytale" onClick={handleSubmit}>Generate Fairy Tale</button>
    </div>
  );
};

export default StoryForm;
