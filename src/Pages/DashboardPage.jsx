import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { useDate } from '../hooks/useDate';
import httpClient from "../httpClient";

export const DashboardPage = () => {
  const [nav, setNav] = useState(0);
  const [availableDates, setAvailableDates] = useState([])

  const { days, dateDisplay } = useDate(nav);

  const getDates = () => {
    const availableDates = []
    for (let i = 0; i < days.length; i++) {
      if (days[i].value !== 'padding' && days[i].available) {
        availableDates.push(days[i].value)
      }
    }

    return availableDates
  }

  const submitHandler = async () => {
    setAvailableDates(getDates)
    try {
      await httpClient.post("//localhost:5000/dashboard", {"availableDates": availableDates});
    } catch (error) {
      alert("Error: Submit Failed")
    }
  };




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
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>



    </>
  );
};

export default DashboardPage.jsx;