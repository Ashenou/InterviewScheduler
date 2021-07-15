export const getInterview = (state, interview) => {

    // Object returned:{  
    //     "student": "Lydia Miller-Jones",
    //     "interviewer": {  
    //       "id": 1,
    //       "name": "Sylvia Palmer",
    //       "avatar": "https://i.imgur.com/LpaY82x.png"
    //     }
    //   }
    // console.log("state.interviewers",state.interviewers)
    if (!interview) return null;


  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
};
