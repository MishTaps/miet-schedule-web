export const ChooseColor = ({ setIsColoredBlocks }) => {
  const changeColored = (event) => {
    setIsColoredBlocks(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <>
      <div>
        <input type="checkbox" id="color" name="color" onChange={changeColored} />
        <label htmlFor="color">Разделение на цвета</label>
      </div>
    </>
  );
};
