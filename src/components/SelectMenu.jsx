import React, { Component } from 'react'

export default class SelectMenu extends Component {

  render() {
    const {lista} = this.props;
    
    const options = lista.map((option, index) => {
        
        return(
        <option key={index} value = {option.value}>{option.label}</option>
        ) 
    })

    return (
      <select {...this.props} >
        {options}
      </select>
    )
  }
}
