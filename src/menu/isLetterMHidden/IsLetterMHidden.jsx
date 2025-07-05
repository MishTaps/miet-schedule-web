import React from 'react';

export const IsLetterMHidden = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isLetterMHidden: event.target.checked
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.isLetterMHidden} onChange={onChange} />
        <label>Скрыть букву &quot;м&quot; у аудитории</label>
      </div>
    </>
  );
};
