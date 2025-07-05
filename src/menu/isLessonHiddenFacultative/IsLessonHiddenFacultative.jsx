import React from 'react';

export const IsLessonHiddenFacultative = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isLessonHidden: {
        ...prevSettings.isLessonHidden,
        facultative: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isLessonHidden.facultative} onChange={onChange} />
        <label>Скрыть факультативы</label>
      </div>
    </>
  );
};
