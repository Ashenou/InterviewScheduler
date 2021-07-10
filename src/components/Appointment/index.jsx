import React from "react";
import "components/Appointment/styles.scss";

const Appointment = (props) => {
  // onAdd:Function to be called when the user clicks the Add button

  return (
    <article className="appointment" onAdd={(event) => props.onAdd()}></article>
  );
};

export default Appointment;
