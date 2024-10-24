import React from 'react'
import { useState } from 'react'
 Grace's-Branch
import './assets/react.svg'
import '../public/vite.svg'
import './App.css'
import EventCalendar from './components/eventcalendar.jsx'
import './index.css'
import './main.jsx'
import './components/eventcalendar.jsx'
import './components/eventlist.jsx'
import './components/calendar.jsx'
import './components/loginform.jsx'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventCalendar from './components/eventcalendar.jsx'
import './index.css'
import Calendar from './components/calendar.jsx'

 Christian

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>My Calendar App</h1>
      </header>
      
      <main>
        <EventCalendar /> {/* Calendar component */}
      </main>
      
      <footer>
        <p>© 2024 Calendar App</p>
      </footer>
    </div>
  );
}


export default App;