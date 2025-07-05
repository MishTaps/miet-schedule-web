import React from 'react';

export const AreCellsMerged = ({ settings, setSettings }) => {
  const onChange = (event) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      areCellsMerged: event.target.checked
    }));
  };

  return (
    <>
      <div>
        <input type="checkbox" checked={settings.areCellsMerged} onChange={onChange} />
        <label>Объединить ячейки с одинаковыми парами</label>
      </div>
    </>
  );
};
