import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 引入 useParams
import '../../../App.css';

const apiUrl = process.env.REACT_APP_API_URL;

interface Seat {
  row: number;
  column: number;
  selected: boolean;
  occupied: boolean;
}

interface Activity {
  activity_id: number;
  activity_name: string;
  place: string;
  artist: string;
  activity_date: string;
}

const SeatSelection = () => {
  const initialRows = 0;
  const initialColumns = 0;
  const { activity_id } = useParams(); // 獲取動態路徑參數 activity_id

  const [rows, setRows] = useState<number>(initialRows);
  const [columns, setColumns] = useState<number>(initialColumns);
  const [seats, setSeats] = useState<Seat[][]>(generateInitialSeats(initialRows, initialColumns));
  const [selectedActivity, setselectedActivity] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [activities, setActivities] = useState<Activity[]>([]); //{ activity_id: 2, activity_name: 'B組預賽 韓國vs中華', place: '臺北大巨蛋', artist: '世界12強棒球賽', activity_date: '2024-11-13' }
  const [areas, setAreas] = useState([
    { area_id: 1, place: '臺北大巨蛋', area: 'A', area_row: '27', area_column: '54' }
  ]); //{ area_id: 1, place: '臺北大巨蛋', area: 'A', area_row: '27', area_column: '54' }

  useEffect(() => {
    fetchActivities();
    if (selectedActivity) {
      fetchAreas();
    }
    if (selectedArea) {
      fetchOccupiedSeats();
    }
  }, [selectedActivity, activities, selectedArea]);

  useEffect(() => {
    if (selectedArea) {
      const area = areas.find(a => a.area === selectedArea);
      if (area) {
        const updatedRows = parseInt(area.area_row);
        const updatedColumns = parseInt(area.area_column);
        setRows(updatedRows);
        setColumns(updatedColumns);
        setSeats(generateInitialSeats(updatedRows, updatedColumns));
      }
    }
  }, [selectedArea]);

  async function fetchOccupiedSeats() {
    try {
      const response = await fetch(`${apiUrl}/tickets/activity/${selectedActivity}/area/${selectedArea}`);
      if (response.ok) {
        const data = await response.json();
        setSeats((prevSeats) => {
          return prevSeats.map(row =>
            row.map(seat => {
              const seatString = `${selectedArea}-${seat.row}-${seat.column}`;
              const isOccupied = data.some(ticket => ticket.seat === seatString);
              return isOccupied ? { ...seat, occupied: true } : seat;
            })
          );
        });
      } else {
        console.error('Failed to fetch occupied seats');
      }
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
    }
  }
  

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${apiUrl}/activities`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
        // 自動選擇 activity_id 為 { activity_id } 的活動
        const activityToSelect = data.find(event => event.activity_id === parseInt(activity_id || '0'));
        if (activityToSelect) {
          setselectedActivity(activityToSelect.activity_id.toString());
        }
      } else {
        console.error('Failed to fetch activities');
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await fetch(`${apiUrl}/area`);
      if (response.ok) {
        const data = await response.json();
        // 過濾符合選擇活動的 place 的區域
        const filteredAreas = data.filter((area) => area.place === activities.find(event => event.activity_id === parseInt(selectedActivity))?.place);
        setAreas(filteredAreas); // 使用 API 資料取代範例資料
      } else {
        console.error('Failed to fetch areas');
      }
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

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
          if (i === rowIdx && j === colIdx && !seat.occupied) {
            return { ...seat, selected: !seat.selected };
          }
          return seat;
        })
      );
      return updatedSeats;
    });
  };
  

  const postTicketData = async (seatData: { activity_id: number; seat: string; user_id: string | null }) => {
    try {
      const response = await fetch(`${apiUrl}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seatData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('票券新增成功:', data);

        // 顯示提示字樣
        const successMessage = document.createElement('div');
        successMessage.innerText = '票券訂購成功';
        successMessage.style.position = 'fixed';
        successMessage.style.bottom = '20px';
        successMessage.style.right = '20px';
        successMessage.style.backgroundColor = 'green';
        successMessage.style.color = 'white';
        successMessage.style.padding = '10px';
        successMessage.style.borderRadius = '5px';
        document.body.appendChild(successMessage);

        // 跳轉至訂單頁面
        setTimeout(() => {
          window.location.href = '/order';
        }, 1000);
      } else {
        console.error('新增票券失敗');
      }
    } catch (error) {
      console.error('新增票券失敗:', error);
    }
  };

  const handleSubmitOrder = async () => {
    const userId = localStorage.getItem('authToken');
    const selectedSeats = seats.flat().filter(seat => seat.selected);
    const selectedAreaObject = areas.find(area => area.area === selectedArea);
    selectedSeats.forEach(async seat => {
      const seatData = {
        activity_id: parseInt(selectedActivity),
        seat: `${selectedAreaObject?.area}-${seat.row}-${seat.column}`,
        user_id: userId
      };
      console.log(seatData);
      await postTicketData(seatData);
    });
  };
  

  return (
    <div className="container">
      <div className="event-selection-container">
        <h2 className="align-left">活動選擇</h2>
        <select
          value={selectedActivity}
          onChange={(e) => {
            setselectedActivity(e.target.value); // 更新選擇的活動
          }}
          className="event-disabled-select"
          disabled // 禁用選擇活動
        >
          <option value="" disabled>請選擇活動</option>
          {activities.map(event => (
            <option key={event.activity_id} value={event.activity_id}>{event.artist + " - " + event.activity_name}</option>
          ))}
        </select>
      </div>
      <div className="event-selection-container">
        <h2 className="align-left">區域選擇</h2>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="event-select"
          disabled={!selectedActivity} // 當未選擇活動時禁用
        >
          <option value="" disabled>請選擇區域</option>
          {areas.map(area => (
            <option key={area.area_id} value={area.area}>
              {`${area.place} - ${area.area} 區`}
            </option>
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
          <button className="submit-order-button" onClick={handleSubmitOrder}>送出訂單</button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
