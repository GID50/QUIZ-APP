import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Quiz() {
  const [check, setChecked] = useState(undefined);
  const result = useSelector((state) => state.result.result);
  const state = useSelector((state) => state);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  function onNext() {
    console.log("on next click");

    if (trace < queue.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());
    }

    if (result.length <= trace) {
      dispatch(PushAnswer(check));
    }
    setChecked(undefined);
  }

  function onPrev() {
    console.log("on prev click");
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <Questions onChecked={onChecked} />
      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
