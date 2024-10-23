DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;

\c calendar;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_description TEXT,
    event_location VARCHAR(100),
    event_start TIMESTAMP WITH TIME ZONE NOT NULL,
    event_end TIMESTAMP WITH TIME ZONE NOT NULL,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_categories (
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);

CREATE TABLE reminders (
    reminder_id SERIAL PRIMARY KEY,
    reminder_name VARCHAR(50) NOT NULL,
    reminder_description TEXT,
    reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_reminders (
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    reminder_id INT REFERENCES reminders(reminder_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, reminder_id)
);