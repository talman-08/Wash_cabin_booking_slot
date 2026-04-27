# Wash Cabin Booking App

## GitHub Repository
https://github.com/talman-08/Wash_cabin_booking_slot

## Problem
This app allows residents to book shared wash cabins by selecting date and time slots, avoiding scheduling conflicts.

## Tech Stack
- React (Vite)
- Express.js
- MongoDB Atlas

## Setup

### 1. Clone
git clone <your-repo>

### 2. Backend
cd server
npm install
npm run dev

### 3. Frontend
cd client
npm install
npm run dev

### 4. Environment Variables
Create .env in server:
MONGO_URI=your_mongo_connection_string

## Features
- Create booking
- View bookings
- Delete booking
- Update booking
- Prevent double booking
- Filter bookings by date

## API Example

POST /api/bookings

{
  "userId": "...",
  "cabinId": "...",
  "date": "2026-05-01",
  "startTime": "08:00",
  "endTime": "09:00"
}