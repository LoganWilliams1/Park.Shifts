import React, {useEffect, useState} from 'react';
import Handsontable from 'handsontable/base';
import { HotTable } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.min.css';
import httpClient from "../httpClient";

const ScheduleSpreadsheet = ({availabilityTable}) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const days = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

    const[availability, setAvailability] = useState({});
    const[grid, updateGrid] = useState(() => {
        const initialGrid = Array.from({length: 50},
            () => Array.from({length: 40}, () => ''))

        const monthInfo = getMonthInfo();

        for (let i = 1; i < 36; i++) {
            if (i <= monthInfo.numDaysNextMonth) {
                initialGrid[0][i] = i;
            } else {
                initialGrid[0][i] = i - monthInfo.numDaysNextMonth;
            }
        }
        initialGrid[1][0] = months[monthInfo.nextMonth]
        for (let i = 1; i < 36; i++) {
            initialGrid[1][i] = days[(monthInfo.nextMonthFirstDay + (i - 1)) % 7]
        }

        const teamMembers = Object.keys(availability);
        console.log(teamMembers)
        for (let i = 0; i < teamMembers.length; i++) {
            const memberName = teamMembers[i];
            initialGrid[i + 3][0] = memberName;
        }

        return initialGrid;
    })

    function getMonthInfo() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

        const nextMonthDate = new Date(nextYear, nextMonth, 1);
        const nextMonthFirstDay = nextMonthDate.getDay();

        const secondNextYear = nextMonth === 11 ? nextYear + 1 : nextYear;
        const secondNextMonth = nextMonth === 11 ? 0 : nextMonth + 1;
        const lastDayNextMonth = new Date(secondNextYear, secondNextMonth, 0);
        const numDaysNextMonth = lastDayNextMonth.getDate();

        return {
            nextMonth,
            nextMonthFirstDay,
            numDaysNextMonth
        }
    }

    useEffect(() => {
        async function getAvailability() {
            try {
                const response = await httpClient.get("//localhost:5000/get-availability");
                setAvailability(response.data)
                updateGrid(
            } catch (error) {
                alert("Error: Retrieval Failed")
            }
        }

    }, []);


    return (

        <div>
            <div>
                <HotTable
                    data={grid}
                    height="auto"
                    width="auto"
                    licenseKey="non-commercial-and-evaluation"
                />
            </div>
            <div>
                <button>Export</button>
            </div>
        </div>


    )
}

export default ScheduleSpreadsheet;