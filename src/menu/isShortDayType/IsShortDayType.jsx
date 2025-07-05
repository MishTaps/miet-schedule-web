import React from 'react';

export const IsShortDayType = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isShort: {
        ...prevSettings.isShort,
        dayType: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isShort.dayType} onChange={onChange} />
        <label>Сократить название типа недели</label>
      </div>
    </>
  );
};
