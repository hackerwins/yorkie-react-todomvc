import React, { Component } from 'react';
import classnames from 'classnames';
import { Todo } from './model';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  editTodo: Function;
  deleteTodo: Function;
  completeTodo: Function;
}

interface TodoItemState {
  editing: boolean;
}

export default class TodoItem extends Component<TodoItemProps, TodoItemState> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      editing: false,
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  public handleDoubleClick() {
    this.setState({ editing: true });
  }

  public handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  public render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text: string) => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            id={`item-input-${todo.id}`}
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label htmlFor={`item-input-${todo.id}`} onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button type="button" aria-label="Delete" className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing,
        })}
      >
        {element}
      </li>
    );
  }
}
