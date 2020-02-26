'use babel';

import * as React from 'react';
import PropTypes from 'prop-types';
import { generateBase64Url } from './runner';

export function createComponent(program) {
  class Diagram extends React.Component {
    constructor(props) {
      super(props);

      this.currentPromise = null;

      this.state = {
        image: '',
        error: null,
      };

      this.containerRef = React.createRef();
    }

    componentWillUnmount() {
      if (this.currentPromise !== null) {
        this.currentPromise.cancel();
      }
    }

    componentDidMount() {
      this.renderDiagram();

      const { classList } = this.containerRef.current.parentElement;
      classList.add('graphviz-container');
    }

    componentDidUpdate(previousProps) {
      if (this.hasCodeChanged(previousProps)) {
        this.renderDiagram();
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        this.hasCodeChanged(nextProps) ||
        nextState.image !== this.state.image ||
        nextState.error !== this.state.error
      );
    }

    render() {
      const { image, error } = this.state;
      const code = this.getCode();

      if (code.trim().length === 0) {
        return this.renderError('No code given.');
      }

      if (error !== null) {
        return this.renderError(error.message);
      }

      return <img src={image} ref={this.containerRef} />;
    }

    renderError(message) {
      return (
        <div
          className="ui error message graphviz-error"
          ref={this.containerRef}
        >
          <div className="header">Failed to render {program}</div>
          <div>{message}</div>
        </div>
      );
    }

    renderDiagram() {
      if (this.currentPromise !== null) {
        this.currentPromise.cancel();
      }

      this.currentPromise = generateBase64Url(program, this.getCode());
      this.currentPromise
        .then(url => {
          this.setState({
            image: url,
            error: null,
          });
        })
        .catch(err => {
          this.setState({
            image: '',
            error: err,
          });
        });
    }

    getCode(props = this.props) {
      return props.children[0];
    }

    hasCodeChanged(otherProps) {
      return this.getCode() !== this.getCode(otherProps);
    }
  }

  Diagram.propTypes = {
    children: PropTypes.node,
  };

  return Diagram;
}
