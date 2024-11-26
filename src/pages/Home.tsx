import React, { useState, useEffect } from 'react';


// 定義資料類型
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

function MainPage() {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [schedule, setSchedule] = useState<EventSchedule[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'TRUSTY.jpg', // 替換為實際圖片路徑
    'NewJeans.jpg',
    'IVE.jpg'
  ];

  useEffect(() => {
    // 以下是測試用的範例資料
    const exampleSingers: Singer[] = [
      { name: 'IVE', image: 'IVE.jpg' },
      { name: 'NewJeans', image: 'NewJeans.jpg' },
      { name: 'TRUSTY', image: 'TRUSTY.jpg' }
    ];
    setSingers(exampleSingers);

    const exampleSchedule: EventSchedule[] = [
      { name: 'IVE', image: 'IVE.jpg', time: '11/24 Pm08:00', location: '台北小巨蛋', seats: '017' },
      { name: 'NewJeans', image: 'NewJeans.jpg', time: '12/10 Pm07:00', location: '高雄巨蛋', seats: '020' },
      { name: 'TRUSTY', image: 'TRUSTY.jpg', time: '01/15 Pm08:30', location: '台中體育館', seats: '050' }
    ];
    setSchedule(exampleSchedule);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 每3秒切換一次圖片

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div style={{ backgroundColor: '#E6E6FA' }}>
      <div style={{ backgroundColor: '#E6E6FA' , width: '100%', margin: '0 auto' }}>
        
        <div className="image-carousel" style={{ position: 'relative' }}>
          <button onClick={prevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            ←
          </button>
          <img 
            src={images[currentImageIndex]} 
            alt="輪播圖片" 
            style={{ width: '100%', height: '30vh', objectFit: 'cover' }} 
          />
          <button onClick={nextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            →
          </button>
        </div>
      </div>
      <div style={{ backgroundColor: '#E6E6FA', width: '70%', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Singer</h2>
        <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          {singers.map((singer) => (
            <div key={singer.name} style={{ textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
              <img 
                src={singer.image} 
                alt={singer.name} 
                style={{ width: '300px', height: '400px', objectFit: 'cover' }}
              />
              <h3>{singer.name}</h3>
            </div>
          ))}
        </div>
        
        <div style={{ backgroundColor: '#E6E6FA', width: '100%', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center' }}>Schedule</h2>
          <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
          {schedule.map((event) => (
            <div key={event.name} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', margin: '10px 0' }}>
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
              <button className="schedule-button">
                Get
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
