import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // onAdd:Function to be called when the user clicks the Add button
  //const timeSlot = props.interview.map()
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


// Saves the interview information
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // changes mode to SAVING and renders the corresponding componennt(<Status />)
    transition(SAVING);
    // Waits until data is back from the request in application then changes the mode of the render
    props.bookInterview(props.id,interview).then(()=>transition(SHOW));
  }


  return (
    <article className="appointment" /*onAdd={(event) => props.onAdd()}*/>
      <Header time={props.time} />
      {/* {props.interview ? <Show id={props.id} time={props.time} interview={props.interview} /> : <Empty id={props.id} />} */}
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} id={props.id} />}
      {mode === SHOW && (
        <Show
          id={props.id} time={props.time} interview={props.interview}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status />}
    </article>
  );
};

export default Appointment;
