import React, { Component } from "react";

export default class NavbarItem extends Component {
    
  render() {
    const {href, label, onClick, render} = this.props

    if(render){
      return (
        <li className="nav-item">
          <a onClick={onClick} className="nav-link" href={href}>{label}</a>
        </li>
      );
    }else{
      return false
    }
  }
}
