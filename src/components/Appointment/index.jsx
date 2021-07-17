import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDITING = "EDITING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = " ERROR_SAVE ";

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
    transition(SAVING, true);
    // Waits until data is back from the request in application then changes the mode of the render
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  // Show the conifrmation message to delete
  function cancel() {
    transition(CONFIRM);
  };

  // Delete the selected interview
  function destroy() {

    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }

  // EDITS current interview
  function edit(name, interviewer) {
    console.log('58 :>> ', name, interviewer);

    transition(EDITING);
  }

  // When user closes confirm message after saving or editing
  function close() {
    transition(SHOW);
  }



  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* Componenet to display where an interview time slot is available */}
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} id={props.id} />}
      {/* Display Form to Add new interview */}
      {mode === SHOW && (
        <Show id={props.id} time={props.time} interview={props.interview} onDelete={cancel} onEdit={edit}
        />
      )}
      {/* book a new interview then display a saving message */}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message={'Saving...'} />}

      {/* DELETING an interview then display a confirming dialogue then a saving message*/}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this?" onConfirm={destroy} onCancel={back} />}
      {mode === DELETING && <Status message={'Deleting...'} />}

      {/* Editing an interview and display Form component to make the changes*/}
      {mode === EDITING && <Form interviewers={props.interviewers} onSave={save} onCancel={back} name={props.interview.student} interviewer={props.interview.interviewer.id} />}

      {/* Display messages when confirm */}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={close} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={close} />}
    </article>
  );
};

export default Appointment;
