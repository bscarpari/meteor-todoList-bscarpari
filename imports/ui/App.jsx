import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/Tasks/Tasks";

import Navbar from "../ui/components/Navbar";
import TaskCreate from "./components/TaskCreate";
import AddTaskBtn from "./components/AddTaskBtn";
import LoginSection from "./components/LoginSection";
import TaskEdit from "./components/TaskEdit";
import Task from "./components/Task";
import { bertAlert } from "./components/bertAlert";

class App extends React.Component {
  state = {
    tasks: [],
    showFormCreate: false,
    showFormEdit: false,
    dataEditTask: {},
    idTaskEdit: "",
    titleEditTask: "",
    descriptionEditTask: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps) {
    let tasks = nextProps.tasks;
    return {
      tasks: tasks,
    };
  }

  handlerSubmitCreateTask = (event) => {
    event.preventDefault();

    let form = event.currentTarget;
    let task = {
      user: Meteor.userId(),
      title: document.getElementById("title-task").value,
      description: document.getElementById("description-task").value,
    };

    Meteor.call("create.task", task, (error) => {
      if (!error) {
        bertAlert({
          message: "Tarefa criada com sucesso.",
          state: "success",
          icon: "fa fa-check",
        });
        form.reset();
        this.toogleForms();
      } else {
        bertAlert({
          message: "Erro, tente novamente! " + error.error,
          state: "danger",
          icon: "fa fa-times",
        });
      }
    });
  };

  handlerSubmitEditTask = (event) => {
    event.preventDefault();
    let form = event.currentTarget;
    let task = {
      _id: this.state.idTaskEdit,
      title: document.getElementById("title-task-edit").value,
      description: document.getElementById("description-task-edit").value,
    };

    Meteor.call("update.task", task, (error) => {
      if (!error) {
        bertAlert({
          message: "Tarefa editada com sucesso.",
          state: "success",
          icon: "fa fa-check",
        });
        form.reset();
        this.toogleForms();
      } else {
        bertAlert({
          message: "Erro, tente novamente! " + error.error,
          state: "danger",
          icon: "fa fa-times",
        });
      }
    });
  };

  handlerClickBtnCreateForm = (event) => {
    event.preventDefault();
    this.setState({
      showFormCreate: true,
    });
  };

  handlerClickBtnCancelForm = (event) => {
    event.preventDefault();
    this.toogleForms();
  };

  handlerClickDeleteTask = (event) => {
    event.preventDefault();
    Meteor.call("delete.task", event.currentTarget.id, (error) => {
      if (!error) {
        bertAlert({
          message: "Tarefa eliminada com sucesso.",
          state: "success",
          icon: "fa fa-check",
        });
      } else {
        bertAlert({
          message: "Erro, tente novamente! " + error.error,
          state: "danger",
          icon: "fa fa-times",
        });
      }
    });
  };

  toogleForms() {
    this.setState({
      showFormCreate: false,
      showFormEdit: false,
    });
  }

  handlerClickEditTask = (event) => {
    event.preventDefault();

    let find_data_task = Tasks.findOne({ _id: event.currentTarget.id });
    if (!find_data_task) {
      return false;
    }

    this.setState({
      showFormEdit: true,
      idTaskEdit: event.currentTarget.id,
      titleEditTask: find_data_task.title,
      descriptionEditTask: find_data_task.description,
    });
  };

  render() {
    return (
      <div className="Screen">
        <Navbar />
        {this.state.showFormCreate ? (
          <TaskCreate
            create={this.handlerSubmitCreateTask}
            cancel={this.handlerClickBtnCancelForm}
          />
        ) : (
          <div className="content">
            {Meteor.userId() ? (
              <AddTaskBtn create={this.handlerClickBtnCreateForm} />
            ) : (
              <LoginSection />
            )}

            {this.state.showFormEdit ? (
              <TaskEdit
                title={this.state.titleEditTask}
                description={this.state.descriptionEditTask}
                edit={this.handlerSubmitEditTask}
                cancel={this.handlerClickBtnCancelForm}
              />
            ) : (
              <Task
                edit={this.handlerClickEditTask}
                delete={this.handlerClickDeleteTask}
                tasks={this.state.tasks}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  const handlerSuscriptionLaundry = Meteor.subscribe(
    "all.tasks",
    Meteor.userId() ? Meteor.userId() : ""
  );
  let loading = !handlerSuscriptionLaundry.ready();
  let tasks = Tasks.find({
    user: Meteor.userId() ? Meteor.userId() : "",
  }).fetch();

  return {
    loading,
    tasks,
  };
})(App);
