// The Form component should track the following state:

// name:String
// interviewer:Number
// The Form component should have the following actions:

// setName:Function
// setInterviewer:Function


// As part of our Edit story, the Form component should take the following props:
// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

// As part of our Create story, the Form component should take the following props:
// interviewers:Array
// onSave:Function
// onCancel:Function


import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {

    // or sets it as -1 if nothing is passed in
    const [interviewer, setInterviewer] = useState(props.interviewer || -1);
    const [name, setName] = useState(props.name || "");

    console.log(props.interviewer);
    return (<main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off">
                <input
                    className="appointment__create-input text--semi-bold"
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    type="text"
                    placeholder="Enter Student Name"
                /*
                  This must be a controlled component
                */
                />
            </form>
            <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
                <Button danger>Cancel</Button>
                <Button confirm>Save</Button>
            </section>
        </section>
    </main>)
}

export default Form;