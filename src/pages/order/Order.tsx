import React, { useState, useEffect } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

// 定義資料類型
interface OrderList {
  ticket_id: number;
  activity: string;
  activity_date: string;
  place: string;
  seat: string;
}

function Order() {
  const [orderList, setOrderList] = useState<OrderList[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem('authToken');
        const response = await fetch(`${apiUrl}/tickets/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderList(data);
      } catch (error) {
        console.error('無法取得票券資料:', error);
      }
    };

    fetchTickets();
  }, []);

  const formatSeat = (seat: string) => {
    const parts = seat.split('-');
    if (parts.length === 3) {
      return `${parts[0]} 區-${parts[1]} 排-${parts[2]} 號`;
    }
    return seat; // 若格式不符合預期，則直接返回原始值
  };

  return (
    <div style={{ height: '100%', width: '100%', margin: '0 auto', padding: '0' }}>
      <div style={{ width: '49%', margin: '20px auto', padding: '10px', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'left' }}>訂單查詢</h2>
        <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
        {orderList.length > 0 ? (
          orderList.map((event) => (
            <div
              key={event.ticket_id}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <img
                src={'ticket.png'}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
              />
              <div style={{ width: '1px', backgroundColor: '#ccc', height: '100px', marginRight: '10px' }}></div>
              <div style={{ flexGrow: 1, marginRight: '10px' }}>
                <p>
                  <strong>{event.activity}</strong>
                </p>
                <p>訂單編號: {event.ticket_id.toString().padStart(4, '0')}</p>
                <p>時間: {event.activity_date}</p>
                <p>地點: {event.place}</p>
                <p>座位: {formatSeat(event.seat)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>目前沒有訂單資料。</p>
        )}
      </div>
    </div>
  );
}

export default Order;
