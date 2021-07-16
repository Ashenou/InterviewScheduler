import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETEING = "DELETEING";
  const CONFIRM = "CONFIRM";
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
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  // Show the conifrmation message to delete
  function cancel() {

    transition(CONFIRM);
    //props.cancelInterview(interviewid,interview).then(() => transition(DELETEING));
  };

  // Delete the selected interview
  function Delete() {

    transition(DELETEING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} id={props.id} />}
      {mode === SHOW && (
        <Show
          id={props.id} time={props.time} interview={props.interview}
          onDelete={cancel}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message={'Saving...'}/>}

      {mode === DELETEING && <Status message={'Deleteing...'}/>}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this?" onConfirm={Delete} onCancel={back} />}

    </article>
  );
};

export default Appointment;
