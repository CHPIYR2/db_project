import React, { useState, useEffect } from 'react';
import '../../App.css';

interface Seat {
  row: number;
  column: number;
  selected: boolean;
  occupied: boolean;
}

const SeatSelection = () => {
  const initialRows = 5;
  const initialColumns = 50;

  const [rows, setRows] = useState<number>(initialRows);
  const [columns, setColumns] = useState<number>(initialColumns);
  const [seats, setSeats] = useState<Seat[][]>(generateInitialSeats(initialRows, initialColumns));
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');

  const events = [
    { id: 'event1', name: '音樂會' },
    { id: 'event2', name: '戲劇表演' },
    { id: 'event3', name: '喜劇秀' }
  ];

  const areas = [
    { id: 'A', name: 'A 區' },
    { id: 'B', name: 'B 區' },
    { id: 'C', name: 'C 區' },
    { id: 'D', name: 'D 區' },
    { id: 'E', name: 'E 區' },
    { id: 'F', name: 'F 區' },
    { id: 'G', name: 'G 區' },
  ];

  useEffect(() => {
    setSeats(generateInitialSeats(rows, columns));
  }, [rows, columns]);

  function generateInitialSeats(rows: number, columns: number): Seat[][] {
    const seats: Seat[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Seat[] = [];
      for (let j = 0; j < columns; j++) {
        row.push({ row: i + 1, column: j + 1, selected: false, occupied: false });
      }
      seats.push(row);
    }
    return seats;
  }

  const toggleSeatSelection = (rowIdx: number, colIdx: number) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, i) =>
        row.map((seat, j) => {
          if (i === rowIdx && j === colIdx) {
            return { ...seat, selected: !seat.selected };
          }
          return seat;
        })
      );
      return updatedSeats;
    });
  };

  return (
    <div className="container">
      <div className="event-selection-container">
        <h2 className="align-left">活動選擇</h2>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="event-select"
        >
          <option value="" disabled>請選擇活動</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>
      <div className="event-selection-container">
        <h2 className="align-left">區域選擇</h2>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="event-select"
        >
          <option value="" disabled>請選擇區域</option>
          {areas.map(areas => (
            <option key={areas.id} value={areas.id}>{areas.name}</option>
          ))}
        </select>
      </div>
      <div className="seat-selection-container">
        <h2 className="align-left">座位選擇</h2>
        <div className="btn-container align-left">
          <p>選取的座位：</p>
          <div className="selected-seats-container">
            {seats.flat().filter(seat => seat.selected).map(seat => (
              <span key={`${seat.row}-${seat.column}`} className="selected-seat">
                {`${seat.row} 排 ${seat.column} 號`}
              </span>
            ))}
          </div>
        </div>
        <div className="seat-selector-fixed-container">
          <div className="seat-selector-wrapper">
            <div className="seat-selector" style={{ minWidth: 'fit-content' }}>
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row" style={{ minWidth: 'fit-content' }}>
                  {row.map((seat, columnIndex) => (
                    <div
                      key={`${rowIndex}-${columnIndex}`}
                      className={`seat ${seat.occupied ? 'occupied' : ''} ${seat.selected ? 'selected' : 'empty'}`}
                      onClick={() => toggleSeatSelection(rowIndex, columnIndex)}
                    >
                      {seat.selected ? <i className="fas fa-check seat-icon"></i> : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="submit-order-container">
          <button className="submit-order-button">送出訂單</button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;