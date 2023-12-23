import './App.css';
import LeftNav from './components/LeftNav';
import Dashboard from './components/Dashboard';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Import app.css
import './App.css';
import Navbar from './components/Navbar';

const darkTheme = createTheme({
  palette: {
    mode: 'light', // Switches to dark mode
    background: {
      default: '#121212' // Custom darker background color
    }
  }
});

function App() {

  const repoOwnerName = "m-fazeel";

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}

      <Navbar />
      <div className="flex">

        <main className="flex-grow p-8">
          <Dashboard
            repoOwnerName={repoOwnerName}
          />
        </main>

      </div>
    </ThemeProvider>

  );
}

export default App;
