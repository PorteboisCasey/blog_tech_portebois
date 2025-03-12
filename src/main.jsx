import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Debug flags - enable for development, disable for production
const DEBUG = true;
const logInfo = (...args) => DEBUG && console.log(...args);
const logWarning = (...args) => console.warn(...args);
const logError = (...args) => console.error(...args);

// Application initialization timestamp for performance tracking
const APP_INIT_TIME = performance.now();
logInfo(`[App] Initialization started at ${new Date().toISOString()}`);

// Error boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console with enhanced details
    logError('=== ERROR BOUNDARY CAUGHT AN ERROR ===');
    logError(`Error: ${error.message}`);
    logError('Stack:', error.stack);
    logError('Component Stack:', errorInfo.componentStack);
    
    // Log browser and environment information for debugging
    logError('Browser:', navigator.userAgent);
    logError('Location:', window.location.href);
    
    // You could also log the error to an error reporting service
    // logErrorToService(error, errorInfo);
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-fallback" style={{ 
          padding: '20px', 
          margin: '20px', 
          backgroundColor: '#ffeded', 
          border: '1px solid #f5c2c2',
          borderRadius: '5px',
          color: '#333'
        }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Show error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack Error Details:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              backgroundColor: '#4b5563', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

// Add a global error handler for unhandled errors
window.addEventListener('error', (event) => {
  logError('=== GLOBAL ERROR CAUGHT ===');
  logError('Message:', event.error?.message || event.message);
  logError('Source:', event.filename);
  logError('Line:', event.lineno, 'Column:', event.colno);
  logError('Stack:', event.error?.stack);
  
  // You could also log to an external service here
  // sendErrorToMonitoringService({ type: 'error', data: event });
  
  // Update DOM to show error state if root element exists
  const rootElement = document.getElementById('root');
  if (rootElement && !rootElement.innerHTML.includes('error-occurred')) {
    // Optionally add a visual indicator that an error occurred
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-occurred';
    errorDiv.style.position = 'fixed';
    errorDiv.style.bottom = '10px';
    errorDiv.style.right = '10px';
    errorDiv.style.background = 'rgba(255, 0, 0, 0.8)';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.zIndex = '9999';
    errorDiv.innerHTML = 'An error occurred. Check console for details.';
    document.body.appendChild(errorDiv);
  }
});

// Add a promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  logError('=== UNHANDLED PROMISE REJECTION ===');
  logError('Reason:', event.reason);
  if (event.reason instanceof Error) {
    logError('Stack:', event.reason.stack);
  }
  
  // You could also log to an external service here
  // sendErrorToMonitoringService({ type: 'promiseRejection', data: event.reason });
});

// Loading Component
const LoadingIndicator = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ marginTop: '10px' }}>Loading application...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Root Application Component with loading state
const RootApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate checking for initial application state
  useEffect(() => {
    logInfo('[App] Application mounting started');
    
    // Perform any initial loading tasks here (auth checks, data preloading, etc.)
    const initializeApp = async () => {
      try {
        // Simulate loading essential resources
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Calculate and log initialization performance
        const loadTime = performance.now() - APP_INIT_TIME;
        logInfo(`[App] Application ready in ${loadTime.toFixed(2)}ms`);
        
        setIsLoading(false);
      } catch (error) {
        logError('[App] Failed to initialize:', error);
        // Still set loading to false so the error boundary can catch the error
        setIsLoading(false);
        throw error; // Let error boundary handle it
      }
    };
    
    initializeApp();
    
    // Monitor performance
    if (DEBUG && window.performance && window.performance.memory) {
      const memoryInterval = setInterval(() => {
        logInfo('[Memory]', window.performance.memory);
      }, 10000);
      
      return () => clearInterval(memoryInterval);
    }
  }, []);
  
  return (
    <React.StrictMode>
      <ErrorBoundary>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <BrowserRouter>
            <Suspense fallback={<LoadingIndicator />}>
              <App />
            </Suspense>
          </BrowserRouter>
        )}
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Get the DOM root and render the application
logInfo('[App] Starting application rendering');
const rootElement = document.getElementById('root');

if (!rootElement) {
  logError('[App] Root element #root not found in DOM');
  // Create a root element if missing
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  logWarning('[App] Created missing #root element');
  
  ReactDOM.createRoot(newRoot).render(<RootApp />);
} else {
  ReactDOM.createRoot(rootElement).render(<RootApp />);
}

// Log once the application is hydrated
window.addEventListener('load', () => {
  const totalLoadTime = performance.now() - APP_INIT_TIME;
  logInfo(`[App] Total page load completed in ${totalLoadTime.toFixed(2)}ms`);
  
  // Report performance metrics
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Get First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      logInfo(`[Performance] First Contentful Paint: ${fcp.startTime.toFixed(2)}ms`);
    }
  }
});
