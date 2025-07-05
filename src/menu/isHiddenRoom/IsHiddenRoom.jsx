import React from 'react';

export const IsHiddenRoom = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isHidden: {
        ...prevSettings.isHidden,
        room: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isHidden.room} onChange={onChange} />
        <label>Скрыть аудиторию</label>
      </div>
    </>
  );
};
