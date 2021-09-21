import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUserLogged: "",
    };
  }

  componentDidMount() {
    this.setUserLogged();
  }

  setUserLogged() {
    setTimeout(() => {
      if (Meteor.user()) {
        this.setState({ emailUserLogged: Meteor.user().emails[0].address });
      }
    }, 500);
  }

  //Handlers
  handlerClickBtnLogin = (event) => {
    event.preventDefault();
    FlowRouter.go("App.login");
  };

  handlerClickBtnSignUp = (event) => {
    event.preventDefault();
    FlowRouter.go("App.signup");
  };

  handlerClickSessionOut = (event) => {
    event.preventDefault();
    Meteor.logout((error) => {
      if (!error) {
        FlowRouter.go("App.login");
      }
    });
  };

  render() {
    return (
      <div>
        <header className="p-3 bg-dark text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              >
                <b>Todo App</b>
              </a>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 text-secondary">
                    {this.state.emailUserLogged}
                  </a>
                </li>
              </ul>

              {this.state.emailUserLogged != "" ? (
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={this.handlerClickSessionOut}
                  >
                    Deslogar
                  </button>
                </div>
              ) : (
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={this.handlerClickBtnLogin}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.handlerClickBtnSignUp}
                  >
                    Registrar-se
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}
