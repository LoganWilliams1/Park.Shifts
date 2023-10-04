import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { useDate } from '../hooks/useDate';

export const Dashboard = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();

  const { days, dateDisplay } = useDate(nav);

  const { availableDays, setAvailableDays } = useState([])

  return(
    <>
      <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
            />
          ))}
        </div>
        <div>
          <button onClick={}>Submit</button>
        </div>
      </div>



    </>
  );
};

export default Dashboard.jsx;