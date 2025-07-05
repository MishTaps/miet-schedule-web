import React from 'react';
import { Group } from './Group';

export const ChooseGroup = ({ setData }) => {
  const selectGroup = (event) => {
    fetch(`http://localhost:5000/proxy/data?group=${event.target.value}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Расписание:', data);
        setData(data);
      })
      .catch((error) => console.error('Ошибка:', error));
  };

  return (
    <>
      <form className="menu__select">
        <label htmlFor="groups">Выберите группу:</label>
        <select id="groups" name="groups" onChange={selectGroup}>
          <option selected disabled></option>
          <Group />
          <Group />
          <Group />
        </select>
      </form>
    </>
  );
};
