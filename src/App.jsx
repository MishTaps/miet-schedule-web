import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './header';
import { Loading } from './loading';
import { Menu } from './menu/Menu';
import { Schedule } from './schedule';
import { Statistics } from './statistics';
import './style/App.scss';
import './style/normalize.css';

export const App = () => {
  const defaultSettings = {
    isShort: {
      dayType: false,
      teacherName: false,
      lessonName: false
    },
    isEmptyHidden: {
      day: true,
      classNumber: false
    },
    isLessonHidden: {
      facultative: true,
      militaryDepartment: true,
      practice: true
    },
    isHidden: {
      type: false,
      name: false,
      room: false,
      teacher: false
    },
    areAdditionalTimeColumnsHidden: false,
    areCellsMerged: true,
    isLetterMHidden: true
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [mode, setMode] = useState('Group');
  const [loadingStatusGroups, setLoadingStatusGroups] = useState('Loading');
  const [isColoredBlocks, setIsColoredBlocks] = useState(false);
  const [data, setData] = useState(null);

  const listOfGroups = () => {
    fetch('http://localhost:5000/proxy/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Ошибка:', error));
  };

  // Вычленить только названия (без тегов) из названия занятия
  const extractSubjectInfo = (subject) => {
    const name = subject.replace(/\s*\[.*?\]/g, '').trim(); // Убираем скобки и очищаем пробелы
    const match = subject.match(/\[(.*?)\]/g); // Ищем все вхождения в квадратных скобках
    const tags = match ? match.map((tag) => tag.replace(/[\[\]]/g, '')) : []; // Убираем скобки

    return { name, tags };
  };

  // Список пар и их время
  const findTimeList = (data) => {
    if (!data) {
      return;
    }

    let times = [];
    data.Times.forEach((time) => {
      times.push({
        id: time.Code,
        name: time.Time,
        from: time.TimeFrom,
        to: time.TimeTo
      });
    });
    return times;
  };

  // Список дней недели
  const findDayList = (data) => {
    if (!data) {
      return;
    }

    let days = [];
    const daysName = {
      1: 'Понедельник',
      2: 'Вторник',
      3: 'Среда',
      4: 'Четверг',
      5: 'Пятница',
      6: 'Суббота',
      7: 'Воскресенье'
    };

    data.Data.forEach((day) => {
      if (!days.some((d) => d.id === day.Day)) {
        days.push({
          id: day.Day,
          name: daysName[day.Day]
        });
      }
    });
    return days;
  };

  // Список типов недели
  const findWeekTypeList = (data) => {
    if (!data) {
      return;
    }

    let weekTypes = [];
    const weekTypeName = {
      0: 'Числитель-I',
      1: 'Знаменатель-I',
      2: 'Числитель-II',
      3: 'Знаменатель-II'
    };

    data.Data.forEach((week) => {
      if (!weekTypes.some((w) => w.id === week.DayNumber)) {
        weekTypes.push({
          id: week.DayNumber,
          name: weekTypeName[week.DayNumber]
        });
      }
    });
    return weekTypes;
  };

  // Список дисциплин
  const findLessonList = (data) => {
    if (!data) {
      return;
    }

    let lessons = [];

    data.Data.forEach((lesson) => {
      const rawNameString = extractSubjectInfo(lesson.Class.Name).name;

      if (!lessons.some((l) => l.name === rawNameString)) {
        lessons.push({
          id: uuidv4(),
          name: rawNameString
        });
      }
    });
    return lessons;
  };

  // Список типов занятий
  const findLessonTypeList = (data) => {
    if (!data) {
      return;
    }

    let tags = [];

    data.Data.forEach((lesson) => {
      // Общий пул тегов
      const tagMappings = {
        ФТД: 'Факультатив',
        Лек: 'Лекция',
        Пр: 'Семинар',
        Лаб: 'Лабораторная',
        УВЦ: 'Военная кафедра',
        Практика: 'Практика'
      };

      const rawTagsString = extractSubjectInfo(lesson.Class.Name).name;

      // if (room === 'УВЦ 1') {
      //   tags.push('УВЦ');
      // }
      // if (room.slice(0, 33) === 'Аудитория практической подготовки') {
      //   tags.push('Практика');
      // }

      // Сохранить тип занятия
      lesson = tags.map((tag) => tagMappings[tag] || tag).join('\n');

      if (!tags.some((l) => l.name === rawTagsString)) {
        tags.push({
          id: uuidv4(),
          name: rawTagsString
        });
      }
    });
    return tags;
  };

  const tableData = {
    // Список пар (их расписание)
    timeList: findTimeList(data),
    // dayList: findDayList(data),
    // weekTypeList: findWeekTypeList(data)
    // Список дней недели
    dayList: [
      {
        id: 1,
        name: 'Понедельник'
      },
      {
        id: 2,
        name: 'Вторник'
      },
      {
        id: 3,
        name: 'Среда'
      },
      {
        id: 4,
        name: 'Четверг'
      },
      {
        id: 5,
        name: 'Пятница'
      },
      {
        id: 6,
        name: 'Суббота'
      }
    ],
    // Список типы недели
    weekTypeList: [
      {
        id: 0,
        name: 'Числитель-I'
      },
      {
        id: 1,
        name: 'Знаменатель-I'
      },
      {
        id: 2,
        name: 'Числитель-II'
      },
      {
        id: 3,
        name: 'Знаменатель-II'
      }
    ],
    // Список дисциплин
    lessonList: findLessonList(data)
    // Список типов дисциплин

    // Список преподавателей

    // Список аудиторий

    // Итоговый список занятий
  };

  console.log(tableData);

  return (
    <div className="App">
      <Header mode={mode} setMode={setMode} />
      <Loading
        loadingStatusGroups={loadingStatusGroups}
        setLoadingStatusGroups={setLoadingStatusGroups}
      />
      <Menu
        setData={setData}
        setIsColoredBlocks={setIsColoredBlocks}
        settings={settings}
        setSettings={setSettings}
      />
      <Schedule data={data} settings={settings} />
      <Statistics data={data} />
    </div>
  );
};

export default App;
