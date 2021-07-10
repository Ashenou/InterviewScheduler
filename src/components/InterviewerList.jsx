import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem.jsx';

const InterviewerList = (props) => {

    // interviewers:array - an array of objects containing the information of each interviewer
    // value:number - the id of an interviewer
    // setInterviewer:function - a function that accepts an interviewer id


    return (<section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
            {props.interviewers.map((interviewer) => {
                return <InterviewerListItem key={interviewer.id}
                    name={interviewer.name}
                    avatar={interviewer.avatar}
                    selected={interviewer.id === props.value}
                    setInterviewer={() => (props.onChange(interviewer.id))} />
            })}
        </ul>
    </section>)
}

export default InterviewerList;