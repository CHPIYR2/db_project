import React, { useState, useEffect } from 'react';


// 定義資料類型
interface  OrderList {
    ticket_id: number,
    activity: string;
    image: string;
    activity_date: string;
    place: string;
    seat: string;
}

function Order() {
  const [orderList, setorderList] = useState< OrderList[]>([]);

  useEffect(() => {


    const exampleorderList:  OrderList[] = [
      { ticket_id: 1, activity: '周杰倫 - 嘉年華世界巡迴演唱會', image: 'IVE.jpg', activity_date: '2024-12-07', place: '台北小巨蛋', seat: 'E-10-3' },
      { ticket_id: 2, activity: '世界12強棒球賽 - B組預賽 韓國vs中華', image: 'NewJeans.jpg', activity_date: '2024-12-07', place: '高雄巨蛋', seat: 'E-10-3' },
      { ticket_id: 3, activity: 'TRUSTY', image: 'TRUSTY.jpg', activity_date: '2024-12-07', place: '台中體育館', seat: 'E-10-3' }
    ];
    setorderList(exampleorderList);

  }, []);



  return (
    <div style={{ height: '100%', width: '100%', margin: '0 auto', padding: '0' }}>

        <div style={{ width: '49%', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'left'}}>訂單查詢</h2>
            <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
            {orderList.map((event) => (
                <div key={event.activity} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', margin: '10px 0' }}>
                <img 
                    src={'ticket.png'} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
                />
                <div style={{ width: '1px', backgroundColor: '#ccc', height: '100px', marginRight: '10px' }}></div>
                <div style={{ flexGrow: 1, marginRight: '10px' }}>
                    <p><strong>{event.activity}</strong></p>
                    <p>訂單編號: {event.ticket_id.toString().padStart(4, '0')}</p>
                    <p>時間: {event.activity_date}</p>
                    <p>地點: {event.place}</p>
                    <p>座位: {event.seat}</p>
                </div>
                </div>
            ))}
        </div>
    </div>
  );
}


export default Order;