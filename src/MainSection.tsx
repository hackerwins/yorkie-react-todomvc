import React, { Component } from 'react';
import { Todo } from './model';
import TodoItem from './TodoItem';
import Footer from './Footer';

const TODO_FILTERS: { [name: string]: (todo: Todo) => boolean } = {
  SHOW_ALL: (todo: Todo) => true,
  SHOW_ACTIVE: (todo: Todo) => !todo.completed,
  SHOW_COMPLETED: (todo: Todo) => todo.completed,
};

interface MainSectionProps {
  todos: Array<Todo>;
  actions: { [name: string]: Function };
}

interface MainSectionState {
  filter: string;
}

class MainSection extends Component<MainSectionProps, MainSectionState> {
  constructor(props: MainSectionProps) {
    super(props);

    this.state = {
      filter: 'SHOW_ALL',
    };

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  public handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  public handleShow(filter: string) {
    this.setState({ filter });
  }

  public renderToggleAll(completedCount: number) {
    const { todos, actions } = this.props;
    if (todos.length === 0) {
      return null;
    }

    const completeAll = actions.completeAll as (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;

    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={completeAll}
      />
    );
  }

  public renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length === 0) {
      return null;
    }

    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={this.handleClearCompleted}
        onShow={this.handleShow}
      />
    );
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={actions.editTodo}
              deleteTodo={actions.deleteTodo}
              completeTodo={actions.completeTodo}
            />
          ))}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

export default MainSection;
