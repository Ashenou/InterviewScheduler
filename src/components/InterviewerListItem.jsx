import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {

    const { id, name, avatar, selected, setInterviewer } = props;


    //const onClickHandle()
    const classNameItem = classNames("interviewers__item", {
        "interviewers__item--selected": selected

    })
    const classNameImage = classNames("interviewers__item-image", {
        "interviewers__item-image--selected": selected
    })
    // id:number - the id of the interviewer
    // name:string - the name of the interviewer
    // avatar:url - a url to an image of the interviewer
    // selected:boolean - to determine if an interview is selected or not
    // setInterviewer:function - sets the interviewer upon selection

    // const handleSetInterViewer = () => {
    //     setInterviewer(id);
    // }

    return (<li className={classNameItem} onClick={setInterviewer} >
        <img
            className={classNameImage}
            src={avatar}
            alt={name}
        />
        {selected && name}
    </li>)
}

export default InterviewerListItem;