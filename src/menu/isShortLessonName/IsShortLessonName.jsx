import React from 'react';

export const IsShortLessonName = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isShort: {
        ...prevSettings.isShort,
        lessonName: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isShort.lessonName} onChange={onChange} />
        <label>Сократить название занятия</label>
      </div>
    </>
  );
};
