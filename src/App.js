import ErrorBoundary from './components/errorBoundary';
import Header from './components/header';
import HomePage from './components/homepage';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header/>
      <ErrorBoundary>
        <HomePage/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
