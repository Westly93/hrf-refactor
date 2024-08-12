import React from "react";

const PageTitle = (props) => {
  return (
    <h3 className="fw-bold my-3">
      <i className={props.icon}></i> {props.title}
    </h3>
  );
};

export default PageTitle;
