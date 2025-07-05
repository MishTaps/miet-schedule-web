import React from 'react';

export const IsEmptyHiddenDay = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isEmptyHidden: {
        ...prevSettings.isEmptyHidden,
        day: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isEmptyHidden.day} onChange={onChange} />
        <label>Скрыть дни без занятий</label>
      </div>
    </>
  );
};
