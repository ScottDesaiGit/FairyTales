import React from 'react';

const StoryForm = () => {
  return (
    <div>
      <label>
        Protagonist Name:
        <input type="text" name="protagonistName" />
      </label>
      <br />

      <label>
        Protagonist Description:
        <input type="text" name="protagonistDescription" />
      </label>
      <br />

      <label>
        Setting:
        <input type="text" name="setting" />
      </label>
      <br />

      <label>
        Side Characters and Descriptions:
		<br />
        <textarea name="sideCharacters" />
      </label>
      <br />

      <label>
        General Plot Points:
		<br />
        <textarea name="plotPoints" />
      </label>
    </div>
  );
};

export default StoryForm;
