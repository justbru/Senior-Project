import { useState } from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TitlePage from "./Pages/TitlePage";
import TrialPage from "./Pages/TrialPage";
import SummaryPage from "./Pages/SummaryPage";


const App = () => {
  const [onTitle, setOnTitle] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [ranAI, setRanAI] = useState(false)
  const [transcript, setTranscript] = useState("")

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {onTitle
          ? <TitlePage onTitle={onTitle} setOnTitle={setOnTitle} />
          : (!ranAI
            ? <TrialPage setRanAI={setRanAI} setTranscript={setTranscript} isLoading={isLoading} setIsLoading={setIsLoading} />
            : <SummaryPage transcript={transcript} isLoading={isLoading} />
          )
        }
      </Box>
    </ThemeProvider>
  )
}

export default App