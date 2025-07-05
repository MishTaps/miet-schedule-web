import React from 'react';

export const IsShortTeacherName = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isShort: {
        ...prevSettings.isShort,
        teacherName: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isShort.teacherName} onChange={onChange} />
        <label>Сократить ФИО преподавателя</label>
      </div>
    </>
  );
};
