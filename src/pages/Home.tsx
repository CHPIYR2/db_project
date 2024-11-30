import React, { useState, useEffect, useRef } from 'react';
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
}

// example data
const CAROUSEL_IMAGES = [
  'YOASOBI.jpg',
  'MAYDAY 五月天.jpg',
  '世界12強棒球賽.jpg',
  '周杰倫.jpg',
  '怕胖團.jpg',
  '蘇打綠.jpg',
];

const EXAMPLE_SINGERS: Singer[] = [
  { name: '怕胖團', image: '怕胖團-直.jpg' },
  { name: '世界12強棒球賽', image: '世界12強棒球賽-直.jpg' },
  { name: '周杰倫', image: '周杰倫-直.jpg' },
  { name: 'MAYDAY 五月天', image: 'MAYDAY 五月天-直.jpg' },
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
const ActivitySection: React.FC<{ singers: Singer[] }> = ({ singers }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 當組件載入時，滾動到中間
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, [singers]);

  return (
    <div 
      style={{ 
        backgroundColor: '#FFFFFF', 
        width: '58%', 
        margin: '20px auto', 
        padding: '10px', 
        borderRadius: '8px' 
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Activity</h2>
      <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
      
      {/* 新增可滾動容器 */}
      <div 
        ref={scrollContainerRef} // 綁定 ref
        style={{ 
          display: 'flex', 
          overflowX: 'auto', // 橫向滾動
          padding: '10px',
          gap: '20px', // 保持卡片間距
        }}
        className="scroll-container" // 新增類別名稱，方便應用滾動條樣式
      >
        {singers.map((singer) => (
          <div 
            key={singer.name} 
            style={{ 
              textAlign: 'center', 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '10px',
              minWidth: '300px', // 設置最小寬度，確保每張卡片的寬度一致
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

      {/* 滾動條樣式 */}
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            height: 8px; /* 滾動條的高度 */
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2); /* 滾動條顏色 (黑色的20%透明度) */
            border-radius: 10px; /* 圓角，使滾動條更柔和 */
          }
          .scroll-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05); /* 滾動條軌道顏色 (黑色的5%透明度) */
          }
        `}
      </style>
    </div>
  );
}

// 日程表模組
const ScheduleSection: React.FC<{ schedule: EventSchedule[] }> = ({ schedule }) => (
  <div 
    style={{ 
      backgroundColor: '#f0f0f060', 
      width: '58%', 
      margin: '20px auto', 
      padding: '10px', 
      borderRadius: '8px', 
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
          margin: '10px 0px',
          width: '98%',
        }}
      >
        <img 
          src={event.image} 
          alt={event.name} 
          style={{ width: '300px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
        />
        <div style={{ width: '1px', backgroundColor: '#ccc', height: '100px', marginRight: '10px' }}></div>
        <div style={{ flexGrow: 1, marginRight: '10px' }}>
          <p><strong>{event.name}</strong></p>
          <p>時間: {event.time}</p>
          <p>地點: {event.location}</p>
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
    
    // 取得活動資料替代 EXAMPLE_SCHEDULE
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/activities');
        if (response.ok) {
          const data = await response.json();
          const formattedSchedule = data.map((activity: any) => ({
            name: `${activity.artist} - ${activity.activity_name}`,
            image: `${activity.artist}.jpg`,
            time: activity.activity_date,
            location: activity.place,
          }));
          setSchedule(formattedSchedule);
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="page-backgroundColor">
      <ImageCarousel />
      <ActivitySection singers={singers} />
      <ScheduleSection schedule={schedule} />
    </div>
  );
};

export default MainPage;
