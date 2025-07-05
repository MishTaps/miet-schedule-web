export const Loading = ({ loadingStatusGroups, setLoadingStatusGroups }) => {
  return (
    <>
      <fieldset className="menu">
        <legend>Загрузка:</legend>
        <div>
          Список групп: <span>Да</span>
        </div>
        <div>Список преподавателей:</div>
      </fieldset>
    </>
  );
};
