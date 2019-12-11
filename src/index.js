import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="App">
      <Quiz />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
