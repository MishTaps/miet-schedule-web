import React from 'react';

export const IsEmptyHiddenClassNumber = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isEmptyHidden: {
        ...prevSettings.isEmptyHidden,
        classNumber: event.target.checked
      }
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isEmptyHidden.classNumber} onChange={onChange} />
        <label>Скрыть пары без занятий (не затрагивает окна)</label>
      </div>
    </>
  );
};
