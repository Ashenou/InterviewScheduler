import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
    // The Form component should track the following state:

    // name:String
    // interviewer:Number
    // The Form component should have the following actions:

    // setName:Function
    // setInterviewer:Function


    // As part of our Edit story, the Form component should take the following props:
    // value:String //name
    // interviewers:Array
    // interviewer:Number
    // onSave:Function
    // onCancel:Function

    // As part of our Create story, the Form component should take the following props:
    // interviewers:Array
    // onSave:Function
    // onCancel:Function


    // or sets it as -1 if nothing is passed in
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    // This is one of the benefits of using the controlled components pattern. We are not only able to change the state when the input field changes. With this pattern, we can also have the input field update based on a change of state.

    const Reset = () => {
        setName("");
        setInterviewer(null);
        props.onCancel();
    }
    return (<main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                <input
                    className="appointment__create-input text--semi-bold"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Enter Student Name"
                />
            </form>
            <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
                <Button danger onClick={() => Reset()} >Cancel</Button>
                <Button confirm onClick={()=> props.onSave(name,interviewer)}>Save</Button>
            </section>
        </section>
    </main>)
}

export default Form;