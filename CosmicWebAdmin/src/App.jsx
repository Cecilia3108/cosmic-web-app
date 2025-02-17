import './App.css'
// import Dashboard from './Components/Dashboard'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import TopBar from './scenes/global/Topbar';

function App() {

  const [theme, colorMode] = useMode();
  return (
    <>
      {/* <Dashboard /> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            <main content='content'>
            <TopBar />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
