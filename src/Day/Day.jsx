import React, {useState} from 'react';

export const Day = ({ day, onClick }) => {
  const date = `day ${day.value === 'padding' ? 'padding' : ''} `;
  const [dayVals, setDayVals] = useState({
    dayColor: 'white',
    dayText: ''
  })

  const clickHandler = () => {
    if (dayVals.dayColor === 'white') {
      setDayVals({...dayVals, dayColor: '#d36c6c', dayText: 'UNAVAILABLE'});
      day.available = false;
    }
    else {
      setDayVals({...dayVals, dayColor: 'white', dayText: ''});
      day.available = true;
    }
  }

  return (
    <div onClick={clickHandler} className={date} style={{backgroundColor: dayVals.dayColor}}>

      {day.value === 'padding' ? '' : day.value}
      {day.value === 'padding' ? '' : <label className="unavailableLabel" >{dayVals.dayText}</label>}


    </div>
  );
};


