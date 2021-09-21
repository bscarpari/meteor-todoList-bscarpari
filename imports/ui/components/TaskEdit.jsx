import React from "react";

import { Form } from "../styles/main";

export default (props) => (
  <Form>
    <form onSubmit={props.edit}>
      <h1 className="h3 mb-3 fw-normal">Editar tarefa</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="title-task-edit"
          defaultValue={props.title}
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Título</label>
      </div>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="description-task-edit"
          defaultValue={props.description}
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Descrição</label>
      </div>

      <br></br>

      <div className="row">
        <div className="col">
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Alterar
          </button>
        </div>
        <div className="col">
          <button
            onClick={props.cancel}
            className="w-100 btn btn-lg btn-danger"
            type="submit"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </Form>
);
