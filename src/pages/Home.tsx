import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 定義型別
interface Singer {
  name: string;
  image: string;
}

interface EventSchedule {
  name: string;
  image: string;
  time: string;
  location: string;
  seats: string;
}

// example data
const CAROUSEL_IMAGES = [
  'Maroon5.jpg',
  'YOASOBI.jpg',
  'MAYDAY 五月天.jpg',
  '世界12強棒球賽.jpg'
];

const EXAMPLE_SINGERS: Singer[] = [
  { name: 'IVE', image: 'IVE.jpg' },
  { name: 'NewJeans', image: 'NewJeans.jpg' },
  { name: 'TRUSTY', image: 'TRUSTY.jpg' }
];

const EXAMPLE_SCHEDULE: EventSchedule[] = [
  { name: 'IVE', image: 'IVE.jpg', time: '11/24 Pm08:00', location: '台北小巨蛋', seats: '017' },
  { name: 'NewJeans', image: 'NewJeans.jpg', time: '12/10 Pm07:00', location: '高雄巨蛋', seats: '020' },
  { name: 'TRUSTY', image: 'TRUSTY.jpg', time: '01/15 Pm08:30', location: '台中體育館', seats: '050' }
];

// 圖片輪播模組
const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <div className="image-carousel" style={{ 
      position: 'relative', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      overflow: 'hidden', 
      width: '100%', 
      height: '60vh' 
    }}>
      {/* 左側、中央、右側圖片渲染 */}
      <div style={{ flex: '0 0 23%', height: '100%', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={CAROUSEL_IMAGES[(currentImageIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length]}
          alt="前一張圖片"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.5' }}
        />
      </div>

      <div style={{ flex: '0 0 54%', height: '100%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <img 
          src={CAROUSEL_IMAGES[currentImageIndex]} 
          alt="目前顯示圖片" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div style={{ flex: '0 0 23%', height: '100%', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={CAROUSEL_IMAGES[(currentImageIndex + 1) % CAROUSEL_IMAGES.length]}
          alt="後一張圖片"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.5' }}
        />
      </div>

      {/* 導航按鈕 */}
      <button onClick={prevImage} className="carousel-button left-button">
        ←
      </button>
      <button onClick={nextImage} className="carousel-button right-button">
        →
      </button>
    </div>
  );
};

// 活動展示模組
const ActivitySection: React.FC<{ singers: Singer[] }> = ({ singers }) => (
  <div style={{ backgroundColor: '#E6E6FA', width: '70%', margin: '0 auto' }}>
    <h2 style={{ textAlign: 'center' }}>Activity</h2>
    <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      {singers.map((singer) => (
        <div 
          key={singer.name} 
          style={{ 
            textAlign: 'center', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '10px' 
          }}
        >
          <img 
            src={singer.image} 
            alt={singer.name} 
            style={{ width: '300px', height: '400px', objectFit: 'cover' }}
          />
          <h3>{singer.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

// 日程表模組
const ScheduleSection: React.FC<{ schedule: EventSchedule[] }> = ({ schedule }) => (
  <div 
    style={{ 
      backgroundColor: '#E6E6FA', 
      width: '70%', 
      margin: '20px auto', 
      padding: '10px', 
      borderRadius: '8px' 
    }}
  >
    <h2 style={{ textAlign: 'center' }}>Schedule</h2>
    <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
    {schedule.map((event) => (
      <div 
        key={event.name} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          padding: '10px', 
          margin: '10px 0' 
        }}
      >
        <img 
          src={event.image} 
          alt={event.name} 
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
        />
        <div style={{ width: '1px', backgroundColor: '#ccc', height: '100px', marginRight: '10px' }}></div>
        <div style={{ flexGrow: 1, marginRight: '10px' }}>
          <p><strong>{event.name}</strong></p>
          <p>時間: {event.time}</p>
          <p>地點: {event.location}</p>
          <p>尚有座位: {event.seats}</p>
        </div>
        <Link to="/SeatSelection" className="schedule-button">
          Get
        </Link>
      </div>
    ))}
  </div>
);

// 主頁面模組
const MainPage: React.FC = () => {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [schedule, setSchedule] = useState<EventSchedule[]>([]);

  useEffect(() => {
    // 模擬數據載入
    setSingers(EXAMPLE_SINGERS);
    setSchedule(EXAMPLE_SCHEDULE);
  }, []);

  return (
    <div style={{ backgroundColor: '#E6E6FA' }}>
      <ImageCarousel />
      <ActivitySection singers={singers} />
      <ScheduleSection schedule={schedule} />
    </div>
  );
};

export default MainPage;