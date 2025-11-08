import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid red', margin: '20px', backgroundColor: '#fff5f5' }}>
          <h2>🚨 Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error Details</summary>
            <div style={{ marginTop: '10px' }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
            </div>
            {this.state.errorInfo && (
              <div style={{ marginTop: '10px' }}>
                <strong>Component Stack:</strong>
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}