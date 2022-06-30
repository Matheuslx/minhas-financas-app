import React, { Component } from "react";
import './formGroup.css'
export default class FormGroup extends Component {
  render() {
    const {label, children, htmlFor} = this.props

    return (
      <div className="form-group">
        <label htmlFor={htmlFor}>{label}</label>
        {children}
      </div>
    );
  }
}
