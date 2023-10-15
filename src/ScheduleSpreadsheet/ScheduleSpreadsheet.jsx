import React, {useEffect, useState} from 'react';
import Handsontable from 'handsontable/base';
import { HotTable } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css';
import httpClient from "../httpClient";
import { registerAllModules } from 'handsontable/registry';
import {textRenderer} from "handsontable/renderers";

const ScheduleSpreadsheet = ({availabilityTable}) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const days = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

    const[availability, setAvailability] = useState({});
    const[grid, updateGrid] = useState([[]]);

    function initializeGrid() {
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

        console.log(availability)
        const teamMembers = Object.keys(availability);

        for (let i = 0; i < teamMembers.length; i++) {
            const memberName = teamMembers[i];
            initialGrid[i + 3][0] = memberName;
            const days = availability[memberName];
            const dates = Object.keys(days);
            for (let j = 0; j < dates.length; j++) {
                const day = dates[j];
                initialGrid[i + 3][j + 1] = days[day] === true ? '\\' : 'x';
            }


        }

        return initialGrid;
    }

    function unavailableRenderer(instance, td, row, col, prop, value, cellProperties) {
        textRenderer.apply(this, arguments);
        td.style.background = '#d36c6c'
    }

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
                console.log(response.data);
                setAvailability(response.data);

            } catch (error) {
                alert("Error: Retrieval Failed")
            }

        }
        getAvailability();

    }, []);

    useEffect(() => {
        updateGrid(initializeGrid)
    }, [availability]);


    return (

        <div className="spreadSheetContainer">
                <HotTable
                    data={grid}
                    height={'100%'}
                    width={'100%'}
                    rowHeights={20}
                    colWidths={(index) => {
                        return (index === 0 ? 100 : 30);
                    }}
                    cells={function(row, col) {
                        const cellProperties = {};
                        const data = this.instance.getData();
                        if (data[row][col] === 'x') {
                            cellProperties.renderer = unavailableRenderer;
                        }
                        return cellProperties;

                    }}



                    licenseKey="non-commercial-and-evaluation"
                />
        </div>


    )
}

export default ScheduleSpreadsheet;