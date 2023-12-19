/* eslint-disable react/prop-types */
import { Component } from 'react';
import ErrorPage from './ErrorPage';
export default class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(err) {
    console.log('GetDerivedStateFromError');
    console.log(err);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch');
    console.log(error);
    console.log(errorInfo);

    // TODO logging
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={{ status: 404, message: 'Not found' }} />;
    }

    return this.props.children;
  }
}
