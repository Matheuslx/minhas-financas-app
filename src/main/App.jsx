import { Component } from "react";
import Rotas from "./routes";
import Navbar from "../components/Navbar";


import 'toastr/build/toastr.min.js'

import "bootswatch/dist/flatly/bootstrap.css";
import "./custom.css";
import 'toastr/build/toastr.css'
import ProvedorAutenticacao from "./ProvedorAutenticacao";


export default class App extends Component {
  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    );
  }
}
