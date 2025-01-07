import Page500 from '@components/modules/Page500';
import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: '',
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString(), errorInfo: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      errorMessage: error.toString(),
      errorInfo: info,
    });
  }

  // A fake logging service.
  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return <Page500 errorMessage={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
