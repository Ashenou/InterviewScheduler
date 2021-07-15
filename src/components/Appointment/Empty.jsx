import React from "react";


const Empty = (props) => {

  let mainClassName = "appointment__add";
  let imgClassName = "appointment__add-button"

  // if (props.id === '5') {
  //   mainClassName += ":last-of-type";
  //   imgClassName += ":last-of-type";
  // }

  return (
    <main className={mainClassName}>
      <img
        className={imgClassName}
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;
