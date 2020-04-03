import React, { Component } from 'react';
import { Todo } from './model';
import Header from './Header';
import MainSection from './MainSection';
import 'todomvc-app-css/index.css';

interface AppState {
  todos: Array<Todo>;
}

const initialState = [{
  id: 0,
  text: 'Yorkie JS SDK',
  completed: false,
}, {
  id: 1,
  text: 'Garbage collection',
  completed: false,
}, {
  id: 2,
  text: 'RichText datatype',
  completed: false,
}];

type SampleProps = string;

class App extends Component<{}, AppState> {
  private actions: { [name: string]: Function };

  constructor(props: SampleProps) {
    super(props);

    this.state = {
      todos: initialState,
    };

    this.actions = {
      addTodo: this.addTodo.bind(this),
      deleteTodo: this.deleteTodo.bind(this),
      editTodo: this.editTodo.bind(this),
      completeTodo: this.completeTodo.bind(this),
      completeAll: this.completeAll.bind(this),
      clearCompleted: this.clearCompleted.bind(this),
    };
  }

  public addTodo(text: string) {
    this.setState(prevState => {
      const todos = [
        {
          id:
          prevState.todos.reduce(
            (maxId, todo) => Math.max(todo.id, maxId),
            -1
          ) + 1,
          completed: false,
          text,
        },
        ...prevState.todos,
      ];
      return { todos };
    });
  }

  public deleteTodo(id: number) {
    this.setState(prevState => {
      const todos = prevState.todos.filter((todo) => todo.id !== id);
      return { todos };
    });
  }

  public editTodo(id: number, text: string) {
    this.setState(prevState => {
      const todos = prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      return { todos };
    });
  }

  public completeTodo(id: number) {
    this.setState(prevState => {
      const todos = prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return { todos };
    });
  }

  public completeAll() {
    this.setState(prevState => {
      const areAllMarked = prevState.todos.every((todo) => todo.completed);
      const todos = prevState.todos.map((todo) => {
        return { ...todo, completed: !areAllMarked };
      });
      return { todos };
    });
  }

  public clearCompleted() {
    this.setState(prevState => {
      const todos = prevState.todos.filter((todo) => todo.completed === false);
      return { todos };
    });
  }

  public render() {
    return (
      <div className="App">
        <Header addTodo={this.actions.addTodo} />
        <MainSection todos={this.state.todos} actions={this.actions} />
      </div>
    );
  }
}

export default App;
