import React from 'react';

export const IsHiddenType = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isHidden: {
        ...prevSettings.isHidden,
        type: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isHidden.type} onChange={onChange} />
        <label>Скрыть тип занятия</label>
      </div>
    </>
  );
};
