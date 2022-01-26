import './App.css';
import { StateProvider } from './contexts/state';
import { Home } from './pages/Home';

function App() {
  return (
    <StateProvider>
      <div className="App">
        <Home></Home>
      </div>
    </StateProvider>
  );
}

export default App;
