import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Form } from "./styles/main";

import Navbar from "../ui/components/Navbar";
import { bertAlert } from "../ui/components/bertAlert";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handlerSubmitLogin = (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    if (email.value == "") {
      bertAlert({ message: "E-mail vazio", state: "danger" });
      return false;
    }

    if (password.value == "") {
      bertAlert({
        message: "Senha vazia.",
        state: "danger",
        icon: "fas fa-times",
      });
      return false;
    }

    Meteor.loginWithPassword(
      email.value,
      password.value,
      function (error) {
        if (error) {
          if (error.message === "User not found [403]") {
            bertAlert({
              message: "Usuário não encontrado",
              state: "danger",
              icon: "fas fa-times",
            });
          } else {
            bertAlert({
              message: "Nome de usuário ou senha errada",
              state: "danger",
              icon: "fas fa-times",
            });
          }
        } else {
          FlowRouter.go("App.home");
        }
      }
    );
  };

  render() {
    return (
      <div className="text-center">
        <Navbar />

        <br></br>

        <Form>
          <form onSubmit={this.handlerSubmitLogin}>
            <h1 className="h3 mb-3 fw-normal">Login</h1>

            <div className="form-floating">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">E-mail</label>
            </div>

            <div className="form-floating">
              <input
                name="password"
                className="form-control"
                type="password"
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
