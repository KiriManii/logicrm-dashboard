interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
  userId?: string;
}

export class ErrorTracker {
  private static instance: ErrorTracker;
  private isEnabled: boolean = false;
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }
  
  public init(userId?: string): void {
    this.isEnabled = true;
    
    // Set up global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      this.captureError({
        message: message.toString(),
        stack: error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        userId
      });
      return false;
    };
    
    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        userId
      });
    });
  }
  
  public captureError(errorReport: ErrorReport): void {
    if (!this.isEnabled) return;
    
    // In a real implementation, this would send to an error tracking service
    console.error('Error captured:', errorReport);
    
    // Example implementation with a beacon
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/errors', JSON.stringify(errorReport));
    } else {
      fetch('/api/errors', {
        method: 'POST',
        body: JSON.stringify(errorReport),
        keepalive: true
      }).catch(err => {
        console.error('Failed to report error:', err);
      });
    }
  }
  
  public disable(): void {
    this.isEnabled = false;
    window.onerror = null;
    window.removeEventListener('unhandledrejection', () => {});
  }
}

// React error boundary component
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorTracker = ErrorTracker.getInstance();
    errorTracker.captureError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || '',
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }
  
  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
          <h2 className="text-lg font-medium mb-2">Something went wrong</h2>
          <p className="mb-4">We've been notified and will fix this issue as soon as possible.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
