import React from 'react';

export const Statistics = ({ data }) => {
  let statisticsData = Array.from({ length: 7 }, () => Array(4).fill(0));
  let statisticsCount = Array(4).fill(0);

  if (!data) {
    return;
  }

  data.Data.forEach((lessonData) => {
    for (let day = 1; day < 7; day++) {
      if (lessonData.Day === day) {
        for (let dayNumber = 0; dayNumber < 4; dayNumber++) {
          if (lessonData.DayNumber === dayNumber) {
            statisticsData[day][dayNumber] += 1.5;
            statisticsCount[dayNumber] += 1.5;
            break;
          }
        }
        break;
      }
    }
  });

  return (
    <>
      <div>Количество часов:</div>
      <table className="statisticsTable">
        <tr>
          <td></td>
          <td>Понедельник</td>
          <td>Вторник</td>
          <td>Среда</td>
          <td>Четверг</td>
          <td>Пятница</td>
          <td>Суббота</td>
          <td>Всего</td>
        </tr>
        <tr>
          <td>Числитель-I</td>
          <td>{statisticsData[1][0]} ч.</td>
          <td>{statisticsData[2][0]} ч.</td>
          <td>{statisticsData[3][0]} ч.</td>
          <td>{statisticsData[4][0]} ч.</td>
          <td>{statisticsData[5][0]} ч.</td>
          <td>{statisticsData[6][0]} ч.</td>
          <td>{statisticsCount[0]} ч.</td>
        </tr>
        <tr>
          <td>Числитель-II</td>
          <td>{statisticsData[1][2]} ч.</td>
          <td>{statisticsData[2][2]} ч.</td>
          <td>{statisticsData[3][2]} ч.</td>
          <td>{statisticsData[4][2]} ч.</td>
          <td>{statisticsData[5][2]} ч.</td>
          <td>{statisticsData[6][2]} ч.</td>
          <td>{statisticsCount[2]} ч.</td>
        </tr>
        <tr>
          <td>Знаменатель-I</td>
          <td>{statisticsData[1][1]} ч.</td>
          <td>{statisticsData[2][1]} ч.</td>
          <td>{statisticsData[3][1]} ч.</td>
          <td>{statisticsData[4][1]} ч.</td>
          <td>{statisticsData[5][1]} ч.</td>
          <td>{statisticsData[6][1]} ч.</td>
          <td>{statisticsCount[1]} ч.</td>
        </tr>
        <tr>
          <td>Знаменатель-II</td>
          <td>{statisticsData[1][3]} ч.</td>
          <td>{statisticsData[2][3]} ч.</td>
          <td>{statisticsData[3][3]} ч.</td>
          <td>{statisticsData[4][3]} ч.</td>
          <td>{statisticsData[5][3]} ч.</td>
          <td>{statisticsData[6][3]} ч.</td>
          <td>{statisticsCount[3]} ч.</td>
        </tr>
      </table>
    </>
  );
};
