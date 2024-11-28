DELETE FROM ticket;
DELETE FROM users;
DELETE FROM activity;

-- Ticket 資料
INSERT INTO ticket (seat, user_id) VALUES ('A-4-7', 9);
INSERT INTO ticket (seat, user_id) VALUES ('C-2-5', 3);
INSERT INTO ticket (seat, user_id) VALUES ('E-10-3', 11);
INSERT INTO ticket (seat, user_id) VALUES ('B-7-8', 14);
INSERT INTO ticket (seat, user_id) VALUES ('G-3-9', 7);
INSERT INTO ticket (seat, user_id) VALUES ('F-6-2', 20);
INSERT INTO ticket (seat, user_id) VALUES ('D-8-10', 10);
INSERT INTO ticket (seat, user_id) VALUES ('A-1-4', 5);
INSERT INTO ticket (seat, user_id) VALUES ('C-5-7', 18);
INSERT INTO ticket (seat, user_id) VALUES ('E-2-10', 2);
INSERT INTO ticket (seat, user_id) VALUES ('F-9-6', 16);
INSERT INTO ticket (seat, user_id) VALUES ('B-4-3', 12);
INSERT INTO ticket (seat, user_id) VALUES ('G-7-1', 1);
INSERT INTO ticket (seat, user_id) VALUES ('D-10-8', 4);
INSERT INTO ticket (seat, user_id) VALUES ('A-6-5', 6);
INSERT INTO ticket (seat, user_id) VALUES ('C-3-2', 8);
INSERT INTO ticket (seat, user_id) VALUES ('E-9-4', 13);
INSERT INTO ticket (seat, user_id) VALUES ('F-1-7', 15);
INSERT INTO ticket (seat, user_id) VALUES ('B-5-10', 19);
INSERT INTO ticket (seat, user_id) VALUES ('G-2-9', 17);

-- Users 資料
INSERT INTO users (username, password, phone) VALUES ('Alice', 'pV5s8vE9', '0923456781');
INSERT INTO users (username, password, phone) VALUES ('Bob', 'wX9d4tL7', '0987231567');
INSERT INTO users (username, password, phone) VALUES ('Charlie', 'kB8h2mR6', '0911345689');
INSERT INTO users (username, password, phone) VALUES ('David', 'aF7j9vW3', '0965457683');
INSERT INTO users (username, password, phone) VALUES ('Eve', 'mN6s4xP8', '0978345690');
INSERT INTO users (username, password, phone) VALUES ('Frank', 'zQ3r8uV5', '0938456712');
INSERT INTO users (username, password, phone) VALUES ('Grace', 'yH9b3kD1', '0957458963');
INSERT INTO users (username, password, phone) VALUES ('Hank', 'tL5f7vP2', '0918923457');
INSERT INTO users (username, password, phone) VALUES ('Ivy', 'nR8j2wX4', '0937123459');
INSERT INTO users (username, password, phone) VALUES ('Jack', 'qB6d9vE7', '0979456711');
INSERT INTO users (username, password, phone) VALUES ('Karen', 'rT4h8yW3', '0956348910');
INSERT INTO users (username, password, phone) VALUES ('Leo', 'vM9s3kF6', '0915678234');
INSERT INTO users (username, password, phone) VALUES ('Mona', 'pL7f2xQ8', '0921892345');
INSERT INTO users (username, password, phone) VALUES ('Nate', 'kW5d9vH3', '0982345671');
INSERT INTO users (username, password, phone) VALUES ('Olivia', 'yR8j3nV4', '0936475812');
INSERT INTO users (username, password, phone) VALUES ('Paul', 'mF6s9tX7', '0967341589');
INSERT INTO users (username, password, phone) VALUES ('Quincy', 'aB3r8wP5', '0925567890');
INSERT INTO users (username, password, phone) VALUES ('Rachel', 'zT7f4kD2', '0978123456');
INSERT INTO users (username, password, phone) VALUES ('Tina', 'nW5d7yR3', '0938123498');
INSERT INTO users (username, password, phone) VALUES ('Steve', 'qL9h2vM8', '0910345621');

-- Activity 資料
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-07');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('嘉年華世界巡迴演唱會', '臺北大巨蛋', '周杰倫', '2024-12-08');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('B組預賽 韓國vs中華', '臺北大巨蛋', '世界12強棒球賽', '2024-11-13');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('B組預賽 中華vs多明尼加', '臺北大巨蛋', '世界12強棒球賽', '2024-11-14');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('B組預賽 日本vs中華', '臺北大巨蛋', '世界12強棒球賽', '2024-11-16');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('B組預賽 中華vs澳洲', '臺北大巨蛋', '世界12強棒球賽', '2024-11-17');
INSERT INTO activity (activity_name, place, artist, activity_date) 
VALUES ('B組預賽 古巴vs中華', '臺北大巨蛋', '世界12強棒球賽', '2024-11-18');
