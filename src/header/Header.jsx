import cn from 'classnames';

export const Header = ({ mode, setMode }) => {
  const setModeGroup = () => {
    setMode('Group');
  };

  const setModeTeacher = () => {
    setMode('Teacher');
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">МИЭТ Расписание</div>
        <button
          className={cn('header__button', { header__button_selected: mode === 'Group' })}
          onClick={setModeGroup}>
          Расписание группы
        </button>
        <button
          className={cn('header__button', { header__button_selected: mode === 'Teacher' })}
          onClick={setModeTeacher}>
          Расписание преподавателя
        </button>
      </header>
    </>
  );
};
