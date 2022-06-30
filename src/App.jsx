import { Component } from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from "./views/Login";
import './custom.css'

export default class App extends Component{

    render(){
        return(
            <div>
                <Login/>
            </div>
        )
    }
  
};
