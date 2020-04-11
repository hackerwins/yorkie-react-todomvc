import React, { Component } from 'react';
import yorkie from 'yorkie-js-sdk';
import { Todo } from './model';
import Header from './Header';
import MainSection from './MainSection';
import 'todomvc-app-css/index.css';

interface AppState {
  doc: any;
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

function getYYYYMMDD(): string {
  const now = new Date();
  return`${now.getUTCFullYear()}${('0' + (now.getUTCMonth() + 1)).slice(-2)}${('0' + now.getUTCDate()).slice(-2)}`;
}


type AppProps = string;

class App extends Component<{}, AppState> {
  private actions: { [name: string]: Function };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      doc: null,
      todos: [],
    };

    this.actions = {
      addTodo: this.addTodo.bind(this),
      deleteTodo: this.deleteTodo.bind(this),
      editTodo: this.editTodo.bind(this),
      completeTodo: this.completeTodo.bind(this),
      clearCompleted: this.clearCompleted.bind(this),
    };
  }

  public async componentDidMount() {
    const client = yorkie.createClient('https://yorkie.dev/api');
    await client.activate();

    const doc = yorkie.createDocument('examples', `todo-mvc-${getYYYYMMDD()}`);
    await client.attach(doc);

    doc.update((root) => {
      if (!root['todos']) {
        root['todos'] = initialState;
      }
    }, 'create default todos if not exists');

    doc.subscribe((event) => {
      this.setState(prevState => {
        return { doc: prevState.doc, todos: prevState.todos };
      });
    });

    this.setState(prevState => {
      return {
        doc,
        todos: doc.getRootObject()['todos']
      };
    });
  }

  public addTodo(text: string) {
    this.state.doc.update((root) => {
      root.todos.push({
        id:
        root.todos.reduce((maxId, todo) => 
          Math.max(todo.id, maxId), -1
        ) + 1,
        completed: false,
        text,
      });
    });
  }

  public deleteTodo(id: number) {
    this.state.doc.update((root) => {
      let target;
      for (const todo of root.todos) {
        if (todo.id === id) {
          target = todo;
          break;
        }
      }
      if (target) {
        root.todos.deleteByID(target.getID());
      }
    });
  }

  public editTodo(id: number, text: string) {
    this.state.doc.update((root) => {
      let target;
      for (const todo of root.todos) {
        if (todo.id === id) {
          target = todo;
          break;
        }
      }
      if (target) {
        target.text = text;
      }
    });
  }

  public completeTodo(id: number) {
    this.state.doc.update((root) => {
      let target;
      for (const todo of root.todos) {
        if (todo.id === id) {
          target = todo
          break;
        }
      }
      if (target) {
        target.completed = !target.completed;
      }
    });
  }

  public clearCompleted() {
    this.state.doc.update((root) => {
      for (const todo of root.todos) {
        if (todo.completed) {
          root.todos.deleteByID(todo.getID());
        }
      }
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
