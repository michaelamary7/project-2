INSERT INTO categories (categorie_name)
VALUES ('Work'),
         ('Personal'),
         ('Family'),
         ('Friends'),
         ('School'),
         ('Fitness'),
         ('Health'),
         ('Finance'),
         ('Hobbies'),
         ('Other');

INSERT INTO events (event_name, event_description, event_location, event_date, event_time, category_id)
VALUES ('Meeting with client', 'Discuss project requirements and timeline', '123 Main St, New York, NY', '2022-12-01', '10:00:00', 1),
         ('Dentist appointment', 'Get a checkup and cleaning', '456 Elm St, New York, NY', '2022-12-15', '14:00:00', 7),
         ('Lunch with friends', 'Catch up with old friends', '789 Oak St, New York, NY', '2022-12-20', '12:00:00', 4),
         ('Gym workout', 'Cardio and weight training', '101 Pine St, New York, NY', '2022-12-25', '08:00:00', 6),
            ('Study group', 'Prepare for upcoming exam', '2022-12-30', '18:00:00', 5),
            ('Yoga class', 'Relax and unwind', '2022-12-31', '09:00:00', 6),
            ('Doctor appointment', 'Annual checkup', '2022-12-31', '15:00:00', 7),
            ('Budget planning', 'Review expenses and savings', '2022-12-31', '10:00:00', 8),
            ('Painting class', 'Learn new painting techniques', '2022-12-31', '13:00:00', 9),
            ('Volunteer at local shelter', 'Help out with feeding and care', '2022-12-31', '16:00:00', 10);

INSERT INTO reminders (event_id, remind_at)
VALUES (1, '2022-12-01 09:00:00'),
         (2, '2022-12-15 10:00:00'),
         (3, '2022-12-20 11:00:00'),
         (4, '2022-12-25 07:00:00'),
            (5, '2022-12-30 17:00:00'),
            (6, '2022-12-31 08:00:00'),
            (7, '2022-12-31 14:00:00'),
            (8, '2022-12-31 09:00:00'),
            (9, '2022-12-31 12:00:00'),
            (10, '2022-12-31 15:00:00');

INSERT INTO event_categories (event_id, category_id)
VALUES (1, 1),
         (2, 7),
         (3, 4),
         (4, 6),
            (5, 5),
            (6, 6),
            (7, 7),
            (8, 8),
            (9, 9),
            (10, 10);

INSERT INTO users (username, email, password)
VALUES ('testuser', ' [email protected]', 'password'),
       ('testuser2', ' [email protected]', 'password'),
       ('testuser3', ' [email protected]', 'password');