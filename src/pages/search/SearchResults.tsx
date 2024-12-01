import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 引入 useParams
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

interface EventSchedule {
  id: number;
  name: string;
  image: string;
  time: string;
  location: string;
}

// 日程表模組
const ScheduleSection: React.FC<{ schedule: EventSchedule[]; result: string }> = ({ schedule, result }) => (
  <div 
    style={{ 
      backgroundColor: '#FFFFFF', 
      width: '58%', 
      height: '100%',
      margin: '0 auto',
      padding: '10px', 
      borderRadius: '8px', 
    }}
  >
    <h2 style={{ margin: '20px 12px', textAlign: 'left' }}>與 {result} 相關的活動搜尋結果：</h2>
    <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
    {schedule.length === 0 ? (
      <p style={{ margin: '20px 12px', textAlign: 'left', color: '#777' }}>找不到符合條件的活動</p>
    ) : (
      schedule.map((event) => (
        <div 
          key={event.id} 
          style={{ 
            display: 'flex', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '10px', 
            margin: '10px 27px',
            width: '93%',
          }}
        >
          {/* 左邊放圖片 */}
          <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={event.image} 
              alt={event.name} 
              style={{ width: '300px', height: '100px', objectFit: 'cover' }} 
            />
          </div>

          {/* 分隔線 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '1px', backgroundColor: '#ccc', height: '150px', marginRight: '10px' }}></div>
          </div>

          {/* 右邊內容 */}
          <div style={{ flexGrow: 1 }}>
            {/* 右邊上層 */}
            <div style={{ marginBottom: '10px' }}>
              <p><strong>{event.name}</strong></p>
            </div>
            
            {/* 右邊下層 */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* 右下層左邊 */}
              <div>
                <p>時間: {event.time}</p>
                <p>地點: {event.location}</p>
              </div>
              {/* 右下層右邊 */}
              <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', flexGrow: 1 }}>
                <Link to={`/SeatSelection/${event.id}`} className="schedule-button">
                  Get
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

// CSS for the button
const styles = `
.schedule-button {
  width: 50%;
  padding: 15px;
  margin-top: 70px;
  border: none;
  border-radius: 50px;
  background-color: #977bb3;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s; /* 增加按鈕變化的過渡效果 */
  text-decoration: none;
  text-align: center;
  display: inline-block;
}
`;

// Append styles to the head
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

// 主頁面模組
const MainPage: React.FC = () => {
  const [schedule, setSchedule] = useState<EventSchedule[]>([]);
  const { query } = useParams(); // 獲取動態路徑參數 query 
  const result = query?.slice(7) || '';

  useEffect(() => {
    // 模擬數據載入
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiUrl}/activities/search?q=${result}`);
        if (response.ok) {
          const data = await response.json();

          // 如果返回的信息是找不到活動，或者數據列表為空，則顯示找不到活動的消息
          if (data.message === "找不到符合條件的活動" || data.length === 0) {
            setSchedule([]);
          } else {
            const formattedSchedule = data.map((activity: any) => ({
              id: activity.activity_id,
              name: `${activity.artist} - ${activity.activity_name}`,
              image: `${activity.artist}.jpg`,
              time: activity.activity_date,
              location: activity.place,
            }));
            setSchedule(formattedSchedule);
          }
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, [result]);

  return (
    <div>
      <ScheduleSection schedule={schedule} result={result} />
    </div>
  );
};

export default MainPage;
