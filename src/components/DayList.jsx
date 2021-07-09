import React from "react";
import DayListItem from "./DayListItem";
//import {days} from "../../stories/index";

export default function DayList(props) {
    const {days} = props;

    return (
        <ul>
            {days.map(day => {
                return(<DayListItem
                    name={day.name}
                    spots={day.spots}
                    selected={day.name === props.day}
                    setDay={event=>{props.setDay(day.name)}} />)
            }
            )}
        </ul>
    )
}