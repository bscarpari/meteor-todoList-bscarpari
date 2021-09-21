import React from "react";
import { Task } from "../styles/main";

export default (props) => {

  function handleSelectTask(id) {
    const taskIndex = this.state.selectedTasks.findIndex(
      (taskId) => taskId === id
    );
    if (taskIndex !== -1) {
      this.setState((state) => state.filter((taskId) => taskId !== id));
    } else {
      this.setState((state) => [...state, id]);
    }
  }

  return (
    <div className="bd-example">
      <Task>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {props.tasks.map((task, key) => (
              <tr key={key}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className="row">
                  <div className="col">
                    <button
                      id={task._id}
                      className="btn btn-warning"
                      onClick={props.edit}
                    >
                      <i class="bi bi-pencil-fill"></i>
                    </button>
                  </div>
                  <div className="col">
                    <button
                      id={task._id}
                      className="btn btn-danger"
                      onClick={props.delete}
                    >
                      <i class="bi bi-trash2-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Task>
    </div>
  );
};
