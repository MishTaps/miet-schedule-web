import React from 'react';

export const IsHiddenName = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isHidden: {
        ...prevSettings.isHidden,
        name: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isHidden.name} onChange={onChange} />
        <label>Скрыть название занятия</label>
      </div>
    </>
  );
};
