import React, { Component } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import './styles.scss';
import './example.scss';

export default class Example extends Component {
  componentDidMount() {
      this.setState({ onXReachEnd: () => console.log() });
  }

  render() {
    return (
        <div className="example">
          <ScrollBar>
            {this.props.children}
          </ScrollBar>
        </div>
    )
  }
}