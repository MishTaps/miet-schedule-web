import React from 'react';

export const AreAdditionalTimeColumnsHidden = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      areAdditionalTimeColumnsHidden: event.target.checked
    }));
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={settings.areAdditionalTimeColumnsHidden}
          onChange={onChange}
        />
        <label>Дополнительные столбцы с временем пар</label>
      </div>
    </>
  );
};
