import React from 'react';

export const IsLessonHiddenMilitaryDepartment = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isLessonHidden: {
        ...prevSettings.isLessonHidden,
        militaryDepartment: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={settings.isLessonHidden.militaryDepartment}
          onChange={onChange}
        />
        <label>Скрыть военную кафедру</label>
      </div>
    </>
  );
};
