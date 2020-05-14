import React, { Component } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import '../styles/main.scss'
import './ScroolbarStyle.scss';

export default class Example extends Component {
  componentDidMount() {
      this.setState({ onXReachEnd: () => console.log() });
  }

  render() {
    const {show, text} = this.props
    return (
      <ScrollBar className={(show && text) ? 'scroolBar' : 'offScroolBar scroolBar'}>
        {this.props.children}
      </ScrollBar>
    )
  }
}