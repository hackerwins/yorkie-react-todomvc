import React, { Component } from 'react';
import classnames from 'classnames';

interface TodoInputProps {
  onSave: Function;
  placeholder?: string;
  editing?: boolean;
  text?: string;
  newTodo?: boolean;
}

interface TodoInputState {
  text: string;
}

class TodoTextInput extends Component<TodoInputProps, TodoInputState> {
  constructor(props: TodoInputProps) {
    super(props);

    this.state = {
      text: this.props.text || '',
    };
  }

  public handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const text = target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: e.target.value });
  }

  public handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  public render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)}
      />
    );
  }
}

export default TodoTextInput;
