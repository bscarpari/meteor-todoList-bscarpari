import React from "react";
import { TaskHeader } from "../styles/main";

export default (props) => (
  <TaskHeader>
    <div className="bg-body p-5">
      <h1>Lista de tarefas</h1>
      <a className="btn btn-lg btn-primary" href="#" onClick={props.create}>
        <i class="bi bi-plus-circle"></i>&nbsp;Criar tarefa
      </a>
    </div>
  </TaskHeader>
);