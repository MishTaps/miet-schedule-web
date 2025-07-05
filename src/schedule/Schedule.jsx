import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import * as XLSX from 'xlsx';
import { Cell } from './cell';

export const Schedule = ({ data, settings }) => {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const columnsPerDay = 4;
  const types = ['lessonType', 'name', 'room', 'teacher'];

  let dayTypes = null;
  if (settings.isShort.dayType) {
    dayTypes = ['Ч-I', 'Ч-II', 'З-I', 'З-II'];
  } else {
    dayTypes = ['Числитель-I', 'Числитель-II', 'Знаменатель-I', 'Знаменатель-II'];
  }

  if (!data) {
    return <p>Данные загружаются...</p>;
  }

  const exportToExcel = () => {
    const table = document.getElementById('schedule').cloneNode(true); // Клонируем таблицу

    // Удаляем скрытые строки, столбцы и ячейки
    table.querySelectorAll('[hidden]').forEach((el) => el.remove());

    // Преобразуем таблицу в книгу Excel
    const workbook = XLSX.utils.table_to_book(table);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Скачиваем файл
    saveAs(blob, 'schedule.xlsx');
  };
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait', // Можно "portrait" для вертикального формата
      unit: 'mm',
      format: 'a4'
    });

    // Указываем шрифт "helvetica" (он поддерживает кириллицу)
    doc.setFont('helvetica', 'normal');

    const table = document.getElementById('schedule').cloneNode(true);
    table.querySelectorAll("[hidden], [style*='display: none']").forEach((el) => el.remove());

    const rows = [];
    const headers = [];

    // Извлекаем заголовки
    table.querySelectorAll('thead tr').forEach((tr) => {
      let rowData = [];
      tr.querySelectorAll('th').forEach((th) => rowData.push(th.innerText.trim()));
      headers.push(rowData);
    });

    // Извлекаем строки данных
    table.querySelectorAll('tbody tr').forEach((tr) => {
      let rowData = [];
      tr.querySelectorAll('td').forEach((td) => rowData.push(td.innerText.trim()));
      rows.push(rowData);
    });

    // Генерация таблицы в PDF
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 20,
      theme: 'striped',
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 2 }
    });

    doc.save('schedule.pdf');
  };

  return (
    <>
      <table border="1" className="scheduleTable" id="schedule">
        <thead>
          <tr>
            <th rowSpan="2">Время</th>
            {days.map((day, index) => (
              <th key={index} colSpan={columnsPerDay}>
                {day}
              </th>
            ))}
          </tr>
          <tr>
            {days.flatMap((_, index) => [
              <th key={`${index}-0`}>{dayTypes[0]}</th>,
              <th key={`${index}-1`}>{dayTypes[1]}</th>,
              <th key={`${index}-2`}>{dayTypes[2]}</th>,
              <th key={`${index}-3`}>{dayTypes[3]}</th>
            ])}
          </tr>
        </thead>
        <tbody>
          {data.Times.map(({ Code, TimeFrom, TimeTo }) => (
            <React.Fragment key={Code}>
              {types.map((type, rowIndex) => (
                <tr key={`${Code}-${type}`}>
                  {rowIndex === 0 && (
                    <td rowSpan="4">
                      {Code} пара {TimeFrom.slice(11, 16)}-{TimeTo.slice(11, 16)}
                    </td>
                  )}
                  {[...Array(days.length * columnsPerDay)].map((_, cellIndex) => {
                    const dayIndex = Math.floor(cellIndex / columnsPerDay);
                    const columnIndex = cellIndex % columnsPerDay;
                    const newColumnIndex =
                      columnIndex === 0 ? 0 : columnIndex === 1 ? 2 : columnIndex === 2 ? 1 : 3;
                    const adjustedCellIndex = dayIndex * columnsPerDay + newColumnIndex;
                    return (
                      <td
                        className="scheduleTable__cell"
                        key={`${Code}-${type}-${adjustedCellIndex}`}>
                        <Cell
                          day={dayIndex + 1}
                          dayNumber={newColumnIndex}
                          timeFrom={TimeFrom}
                          type={type}
                          data={data}
                          settings={settings}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>Скачать Excel</button>
      <button onClick={exportToPDF}>Скачать PDF</button>
    </>
  );
};
