DELETE FROM ticket;
DELETE FROM users;
DELETE FROM activity;
DELETE FROM area;

-- Ticket 資料
INSERT INTO ticket VALUES (0, 'A-0-0', 1);

-- Users 資料
INSERT INTO users VALUES ('admin', '1qaz@WSX', '0987654321');

-- Activity 資料
INSERT INTO activity VALUES ('西班牙vs中華台北', '臺北大巨蛋', '2026 WBC 世界棒球經典賽資格賽', '2025-02-21 19:00');
INSERT INTO activity VALUES ('中華台北vs南非', '臺北大巨蛋', '2026 WBC 世界棒球經典賽資格賽', '2025-02-22 19:00');
INSERT INTO activity VALUES ('尼加拉瓜vs中華台北', '臺北大巨蛋', '2026 WBC 世界棒球經典賽資格賽', '2025-02-23 19:00');

INSERT INTO activity VALUES ('ASMR Maxxx 世界巡迴演唱會', '臺北大巨蛋', '張惠妹', '2024-12-21 19:30');
INSERT INTO activity VALUES ('ASMR Maxxx 世界巡迴演唱會', '臺北大巨蛋', '張惠妹', '2024-12-22 18:00');
INSERT INTO activity VALUES ('ASMR Maxxx 世界巡迴演唱會', '臺北大巨蛋', '張惠妹', '2024-12-28 19:30');
INSERT INTO activity VALUES ('ASMR Maxxx 世界巡迴演唱會', '臺北大巨蛋', '張惠妹', '2024-12-29 18:00');
INSERT INTO activity VALUES ('ASMR Maxxx 世界巡迴演唱會', '臺北大巨蛋', '張惠妹', '2024-12-31 21:30');

INSERT INTO activity VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-05 19:30');
INSERT INTO activity VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-06 19:30');
INSERT INTO activity VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-07 18:00');
INSERT INTO activity VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-08 18:00');

INSERT INTO activity VALUES ('SYNK : PARALLEL LINE in TAIPEI', '林口體育館', '2024 aespa LIVE TOUR', '2024-08-09 19:30');
INSERT INTO activity VALUES ('SYNK : PARALLEL LINE in TAIPEI', '林口體育館', '2024 aespa LIVE TOUR', '2024-08-10 19:00');
INSERT INTO activity VALUES ('SYNK : PARALLEL LINE in TAIPEI', '林口體育館', '2024 aespa LIVE TOUR', '2024-08-11 18:00');

INSERT INTO activity VALUES ('搞砸北流', '臺北流行音樂中心', '怕胖團', '2024-02-03 19:30');

-- Area 資料
-- 大巨蛋
INSERT INTO area VALUES ('臺北大巨蛋', '103', '27', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '104', '11', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '105', '12', '93');
INSERT INTO area VALUES ('臺北大巨蛋', '106', '39', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '107', '27', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '108', '11', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '109', '12', '93');
INSERT INTO area VALUES ('臺北大巨蛋', '110', '39', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '111', '27', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '112', '11', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '113', '12', '93');
INSERT INTO area VALUES ('臺北大巨蛋', '114', '39', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '115', '27', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '116', '11', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '117', '12', '93');
INSERT INTO area VALUES ('臺北大巨蛋', '118', '39', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '119', '27', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '120', '11', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '121', '12', '93');
INSERT INTO area VALUES ('臺北大巨蛋', '122', '39', '54');
INSERT INTO area VALUES ('臺北大巨蛋', '123', '27', '54');
-- 北流
INSERT INTO area VALUES ('臺北流行音樂中心', '1A', '17', '16');
INSERT INTO area VALUES ('臺北流行音樂中心', '1B', '17', '18');
INSERT INTO area VALUES ('臺北流行音樂中心', '1C', '17', '18');
INSERT INTO area VALUES ('臺北流行音樂中心', '1D', '17', '18');
INSERT INTO area VALUES ('臺北流行音樂中心', '1E', '17', '16');
INSERT INTO area VALUES ('臺北流行音樂中心', '2A', '10', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '2B', '15', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '2C', '15', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '2D', '15', '22');
INSERT INTO area VALUES ('臺北流行音樂中心', '2E', '15', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '2F', '15', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '2G', '10', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '3A', '12', '19');
INSERT INTO area VALUES ('臺北流行音樂中心', '3B', '16', '18');
INSERT INTO area VALUES ('臺北流行音樂中心', '3C', '18', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '3D', '18', '22');
INSERT INTO area VALUES ('臺北流行音樂中心', '3E', '18', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '3F', '16', '17');
INSERT INTO area VALUES ('臺北流行音樂中心', '3G', '12', '19');
-- 林口體育館
INSERT INTO area VALUES ('林口體育館', '橙1B雙', '17', '16');
INSERT INTO area VALUES ('林口體育館', '橙2B單', '17', '18');
INSERT INTO area VALUES ('林口體育館', '橙2B雙', '17', '18');
INSERT INTO area VALUES ('林口體育館', '橙4B單', '17', '18');
INSERT INTO area VALUES ('林口體育館', '橙4B雙', '17', '16');
INSERT INTO area VALUES ('林口體育館', '藍1B單', '10', '17');
INSERT INTO area VALUES ('林口體育館', '藍1B雙', '15', '17');
INSERT INTO area VALUES ('林口體育館', '藍2B單', '15', '17');
INSERT INTO area VALUES ('林口體育館', '藍2B雙', '15', '22');
INSERT INTO area VALUES ('林口體育館', '藍3B單', '15', '17');
INSERT INTO area VALUES ('林口體育館', '藍3B雙', '16', '18');
INSERT INTO area VALUES ('林口體育館', '藍4B單', '18', '17');
INSERT INTO area VALUES ('林口體育館', '藍4B雙', '18', '22');
INSERT INTO area VALUES ('林口體育館', '藍5B單', '18', '22');
INSERT INTO area VALUES ('林口體育館', '藍5B雙', '18', '22');
INSERT INTO area VALUES ('林口體育館', '黃4B單', '18', '22');
INSERT INTO area VALUES ('林口體育館', '黃4B雙', '18', '22');
INSERT INTO area VALUES ('林口體育館', '黃2B單', '18', '22');
INSERT INTO area VALUES ('林口體育館', '黃2B雙', '18', '22');
INSERT INTO area VALUES ('林口體育館', '黃1B單', '18', '22');