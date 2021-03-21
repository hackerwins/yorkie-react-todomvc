import React, { useState, useEffect } from 'react';
import yorkie from 'yorkie-js-sdk';
import Header from './Header';
import MainSection from './MainSection';
import 'todomvc-app-css/index.css';

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
  return`${now.getUTCFullYear()}${(`0${now.getUTCMonth() + 1}`).slice(-2)}${(`0${now.getUTCDate()}`).slice(-2)}`;
}

export default function App() {
  const [doc, ] = useState(() => yorkie.createDocument('examples', `todo-mvc-${getYYYYMMDD()}`));
  const [todos, setTodos] = useState([]);

  const actions = {
    addTodo: (text: string) => {
      doc.update((root) => {
        root.todos.push({
          id:
          root.todos.reduce((maxId, todo) => 
            Math.max(todo.id, maxId), -1
          ) + 1,
          completed: false,
          text,
        });
      });
    },
    deleteTodo: (id: number) => {
      doc.update((root) => {
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
    },
    editTodo: (id: number, text: string) => {
      doc.update((root) => {
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
    },
    completeTodo: (id: number) => {
      doc.update((root) => {
        let target;
        for (const todo of root.todos) {
          if (todo.id === id) {
            target = todo;
            break;
          }
        }
        if (target) {
          target.completed = !target.completed;
        }
      });
    },
    clearCompleted: () => {
      doc.update((root) => {
        for (const todo of root.todos) {
          if (todo.completed) {
            root.todos.deleteByID(todo.getID());
          }
        }
      });
    }
  };

  useEffect(() => {
    async function attachDoc() {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = yorkie.createClient('https://yorkie.dev/api');
      await client.activate();

      // 02. attach the document into the client.
      await client.attach(doc);

      // 03. create default todos if not exists.
      doc.update((root) => {
        if (!root['todos']) {
          // eslint-disable-next-line
          root['todos'] = initialState;
        }
      }, 'create default todos if not exists');

      // 04. subscribe change event from local and remote.
      doc.subscribe((event) => {
        setTodos(doc.getRoot().todos);
      });

      // 05. set todos  the attached document.
      setTodos(doc.getRoot().todos);
    }
    attachDoc();
  }, [doc]);

  return (
    <div className="App">
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  );
}
