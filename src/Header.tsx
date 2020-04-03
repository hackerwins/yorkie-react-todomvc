import React, { Component } from 'react';
import TodoTextInput from './TodoTextInput';

interface HeaderProps {
  addTodo: Function
}

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
    this.handleSave = this.handleSave.bind(this);

  }

  public handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  public render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

export default Header;
