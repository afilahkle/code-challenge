import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SumToNPage from './pages/SumToNPage';
import CurrencySwapPage from './pages/CurrencySwapPage';
import MessyReactPage from './pages/MessyReactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-background text-foreground">
        <nav className="bg-secondary p-4 shadow-md">
          <div className="container mx-auto">
            <ul className="flex justify-center space-x-6">
              <li>
                <Link to="/sum-to-n" className="text-primary hover:text-primary-foreground transition-colors">
                  Sum to N
                </Link>
              </li>
              <li>
                <Link to="/currency-swap" className="text-primary hover:text-primary-foreground transition-colors">
                  Currency Swap
                </Link>
              </li>
              <li>
                <Link to="/messy-react" className="text-primary hover:text-primary-foreground transition-colors">
                  Messy React
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/sum-to-n" element={<SumToNPage />} />
            <Route path="/currency-swap" element={<CurrencySwapPage />} />
            <Route path="/messy-react" element={<MessyReactPage />} />
            <Route path="/" element={<div className="text-center">Welcome</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

