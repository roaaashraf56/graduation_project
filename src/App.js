// App.js
import "./App.css";   // ← مهم جدًا علشان الألوان تشتغل

import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Charts from './components/Charts';
import SelectActionCard from './components/PieCharts';
import RevenueTable from './components/RevenueTable'

import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          
          {/* Top Search */}
          <SearchBar />

          {/* Charts Section */}
          <Box sx={{ mb: 4 }}>
            <Charts />
          </Box>

          {/* Cards + PieCharts */}
          <Box sx={{ mt: 4 }}>
            <SelectActionCard />
          </Box>

          {/*Revenue Table Section*/ }
          <Box sx={{mt:4}}>
            <RevenueTable />
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
{/*hena hania*/ }
export default App;
