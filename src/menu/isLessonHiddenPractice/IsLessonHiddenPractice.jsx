import React from 'react';

export const IsLessonHiddenPractice = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isLessonHidden: {
        ...prevSettings.isLessonHidden,
        practice: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isLessonHidden.practice} onChange={onChange} />
        <label>Скрыть практику</label>
      </div>
    </>
  );
};
