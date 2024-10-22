DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
\c user_db;
-- Users table
-- This table is used to store the user information
-- The password_hash column stores the hashed password of the user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Events table
-- This table is used to store the events created by the user
-- linked to the users table, so each event belongs to a specific user.
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Categories table
-- This table is used to store the categories that the user can assign to their events
-- linked to the users table, so each category belongs to a specific user.
-- The color column stores the color code of the category for visual representation.
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name, user_id)
);
-- Event-Category relationship table
-- This table is used to store the many-to-many relationship between events and categories
CREATE TABLE event_categories (
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);
-- Reminders table
-- This table is used to store the reminders set by the user for their events
-- linked to the events table, so each reminder belongs to a specific event.
CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    remind_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create indexes for faster querying
-- Index used to speed up the querying process by creating a sorted list of the values in a specific column
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_reminders_event_id ON reminders(event_id);
CREATE INDEX idx_reminders_remind_at ON reminders(remind_at);




