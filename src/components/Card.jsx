import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    const {title, children} = this.props 


    return (
      <div className="card md-3">
        <h3 className="card-header">{title}</h3>
        <div className="card-body">
            {children}
        </div>
      </div>
    )
  }
}
