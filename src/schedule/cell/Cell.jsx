import React from 'react';

export const Cell = ({ day, dayNumber, timeFrom, type, data, settings }) => {
  let cellsData = null;

  data.Data.forEach((lessonData) => {
    if (
      lessonData.Day === day &&
      lessonData.DayNumber === dayNumber &&
      lessonData.Time.TimeFrom === timeFrom
    ) {
      cellsData = lessonData;
    }
  });

  if (!cellsData) {
    return;
  }

  let lesson = null;
  let name = null;
  let room = null;
  let teacher = null;

  // * (1) Обработка названия занятия
  // Вычленить только названия (без тегов) из названия занятия
  const extractSubjectInfo = (subject) => {
    const name = subject.replace(/\s*\[.*?\]/g, '').trim(); // Убираем скобки и очищаем пробелы
    const match = subject.match(/\[(.*?)\]/g); // Ищем все вхождения в квадратных скобках
    const tags = match ? match.map((tag) => tag.replace(/[\[\]]/g, '')) : []; // Убираем скобки

    return { name, tags };
  };
  const rawNameString = extractSubjectInfo(cellsData.Class.Name).name;

  // Функция создания аббревиатуры
  function getAbbreviation(str) {
    const ignoredWords = ['и', 'в', 'о', 'на', 'с', 'по', 'за', 'от', 'до', 'для'];

    return str
      .split(/([/().\s])/) // Разбиваем строку, сохраняя разделители
      .map((word) => {
        if (ignoredWords.includes(word.toLowerCase())) {
          return word.toLowerCase(); // Союзы остаются с маленькой буквы
        } else if (word.match(/[а-яА-ЯёЁa-zA-Z]/)) {
          return word[0].toUpperCase(); // Первые буквы остальных слов делаем заглавными
        }
        return word.trim(); // Убираем лишние пробелы
      })
      .join(''); // Объединяем обратно в строку без пробелов
  }
  // Сократить название до аббревиатуры
  if (settings.isShort.lessonName) {
    name = getAbbreviation(rawNameString);
  } else {
    name = rawNameString;
  }
  // * Конец (1)

  // * (3) Обработка аудитории
  // Удаление "м" из аудитории
  const rawRoomString = cellsData.Room.Name;
  if (settings.isLetterMHidden && rawRoomString.slice(-1) === 'м') {
    room = rawRoomString.slice(0, -1);
  } else {
    room = rawRoomString;
  }
  // * Конец (3)

  // * (4) Обработка преподавателя
  // Сокращение ФИО преподавателя
  if (settings.isShort.teacherName) {
    teacher = cellsData.Class.Teacher;
  } else {
    teacher = cellsData.Class.TeacherFull;
  }
  // * Конец (4)

  // * (2) Обработка типа занятия
  // Вычленить теги из названия занятия
  const tags = extractSubjectInfo(cellsData.Class.Name).tags;
  if (room === 'УВЦ 1') {
    tags.push('УВЦ');
  }
  if (room.slice(0, 33) === 'Аудитория практической подготовки') {
    tags.push('Практика');
  }
  // Общий пул тегов
  const tagMappings = {
    ФТД: 'Факультатив',
    Лек: 'Лекция',
    Пр: 'Семинар',
    Лаб: 'Лабораторная',
    УВЦ: 'Военная кафедра',
    Практика: 'Практика'
  };
  // Сохранить тип занятия
  lesson = tags.map((tag) => tagMappings[tag] || tag).join('\n');
  // * Конец (2)

  // Скрытие, если это Факультатив/Военная кафедра/Практика
  if (settings.isLessonHidden.facultative && lesson.includes('Факультатив')) {
    return;
  } else if (settings.isLessonHidden.militaryDepartment && lesson === 'Военная кафедра') {
    return;
  } else if (settings.isLessonHidden.practice && lesson === 'Практика') {
    return;
  }

  switch (type) {
    case 'lessonType':
      return <div hidden={settings.isHidden.type}>{lesson}</div>;

    case 'name':
      return <div hidden={settings.isHidden.name}>{name}</div>;

    case 'room':
      return <div hidden={settings.isHidden.room}>{room}</div>;

    case 'teacher':
      return <div hidden={settings.isHidden.teacher}>{teacher}</div>;
    default:
      break;
  }
};
