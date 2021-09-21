import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Form } from "./styles/main";

import Navbar from "./components/Navbar";
import { bertAlert } from "../ui/components/bertAlert";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handlerSubmitSignUp = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    const new_user = {
      email: email.value,
      password: password.value,
    };

    if (email.value === "") {
      bertAlert({
        message: "O e-mail não deve estar vazio.",
        state: "danger",
        icon: "fas fa-times",
      });
      return false;
    }

    if (password.value === "") {
      bertAlert({
        message: "A senha não deve estar vazia.",
        type: "danger",
        icon: "fas fa-times",
      });
      return false;
    }

    Meteor.call("create.user", new_user, (error) => {
      if (!error) {
        bertAlert({
          message: `A conta foi criada corretamente.`,
          type: "success",
          icon: "fas fa-check",
        });
        form.reset();
        FlowRouter.go("App.login");
      } else {
        bertAlert({
          message: "Erro, tente novamente! " + error.error,
          type: "danger",
          icon: "fas fa-times",
        });
      }
    });
  };

  render() {
    return (
      <div className="text-center">
        <Navbar />

        <br></br>

        <Form>
          <form onSubmit={this.handlerSubmitSignUp}>
            <h1 className="h3 mb-3 fw-normal">Registrar-se</h1>
            <div className="form-floating">
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">E-mail</label>
            </div>
            <div className="form-floating">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Senha</label>
            </div>

            <br></br>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </Form>
      </div>
    );
  }
}
