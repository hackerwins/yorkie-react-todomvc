import React, { Component } from 'react';
import classnames from 'classnames';

const FILTER_TITLES: { [name: string]: string } = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
};

interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onShow: Function;
}

export default class Footer extends Component<FooterProps> {
  public renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong>
        &nbsp;{itemWord} left
      </span>
    );
  }

  public renderFilterLink(filter: string) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a
        href="/#"
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  public renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount === 0) {
      return null;
    }

    return (
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }

  public renderFilterList() {
    return ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map((filter) => (
      <li key={filter}>{this.renderFilterLink(filter)}</li>
    ));
  }

  public render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}

        <ul className="filters">{this.renderFilterList()}</ul>

        {this.renderClearButton()}
      </footer>
    );
  }
}
