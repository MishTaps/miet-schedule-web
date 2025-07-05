import React from 'react';
import { AreAdditionalTimeColumnsHidden } from './areAdditionalTimeColumnsHidden/AreAdditionalTimeColumnsHidden';
import { AreCellsMerged } from './areCellsMerged';
import { ChooseColor } from './chooseColor';
import { ChooseDateOfScheduleToday } from './chooseDateOfSchedule/chooseDateOfScheduleToday';
import { ChooseDateOfScheduleWeek } from './chooseDateOfSchedule/chooseTypeOfScheduleWeek';
import { ChooseGroup } from './chooseGroup';
import { IsEmptyHiddenClassNumber } from './isEmptyHiddenClassNumber/isEmptyHiddenClassNumber';
import { IsEmptyHiddenDay } from './isEmptyHiddenDay/IsEmptyHiddenDay';
import { IsHiddenName } from './isHiddenName';
import { IsHiddenRoom } from './isHiddenRoom';
import { IsHiddenTeacher } from './isHiddenTeacher';
import { IsHiddenType } from './isHiddenType';
import { IsLessonHiddenFacultative } from './isLessonHiddenFacultative/IsLessonHiddenFacultative';
import { IsLessonHiddenMilitaryDepartment } from './isLessonHiddenMilitaryDepartment';
import { IsLessonHiddenPractice } from './isLessonHiddenPractice';
import { IsLetterMHidden } from './isLetterMHidden';
import { IsShortDayType } from './isShortDayType/IsShortDayType';
import { IsShortLessonName } from './isShortLessonName/IsShortLessonName';
import { IsShortTeacherName } from './isShortTeacherName/IsShortTeacherName';

export const Menu = ({ setData, setIsColoredBlocks, settings, setSettings }) => {
  return (
    <>
      <fieldset className="menu">
        <legend>Настройка расписания:</legend>
        <ChooseGroup setData={setData} />
        <ChooseDateOfScheduleToday />
        <ChooseDateOfScheduleWeek />
        <fieldset>
          <legend>Настройка компактности:</legend>
          <div>
            <IsShortDayType settings={settings} setSettings={setSettings} />
            <IsShortLessonName settings={settings} setSettings={setSettings} />
            <IsShortTeacherName settings={settings} setSettings={setSettings} />
          </div>
          ---
          <div>
            <IsEmptyHiddenDay settings={settings} setSettings={setSettings} />
            <IsEmptyHiddenClassNumber settings={settings} setSettings={setSettings} />
          </div>
          ---
          <div>
            <IsLessonHiddenFacultative settings={settings} setSettings={setSettings} />
            <IsLessonHiddenMilitaryDepartment settings={settings} setSettings={setSettings} />
            <IsLessonHiddenPractice settings={settings} setSettings={setSettings} />
          </div>
          ---
          <div>
            <IsHiddenType settings={settings} setSettings={setSettings} />
            <IsHiddenName settings={settings} setSettings={setSettings} />
            <IsHiddenRoom settings={settings} setSettings={setSettings} />
            <IsHiddenTeacher settings={settings} setSettings={setSettings} />
          </div>
          ---
          <div>
            <AreAdditionalTimeColumnsHidden settings={settings} setSettings={setSettings} />
            <AreCellsMerged settings={settings} setSettings={setSettings} />
            <IsLetterMHidden settings={settings} setSettings={setSettings} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Настройка цвета:</legend>
          <ChooseColor setIsColoredBlocks={setIsColoredBlocks} />
        </fieldset>
      </fieldset>
    </>
  );
};
