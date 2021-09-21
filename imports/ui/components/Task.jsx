import React from "react";
import { Icons } from "../styles/main";

export default (props) => (
  <div className="bd-example">
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
                  <Icons>
                    <i class="bi bi-pencil-fill"></i>
                  </Icons>
                </button>
              </div>
              <div className="col">
                <button
                  id={task._id}
                  className="btn btn-danger"
                  onClick={props.delete}
                >
                  <Icons>
                    <i class="bi bi-trash2-fill"></i>
                  </Icons>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
