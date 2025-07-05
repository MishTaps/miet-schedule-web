import React from 'react';

export const IsHiddenTeacher = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isHidden: {
        ...prevSettings.isHidden,
        teacher: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isHidden.teacher} onChange={onChange} />
        <label>Скрыть преподавателя</label>
      </div>
    </>
  );
};
