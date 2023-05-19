import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import { Oval } from "react-loader-spinner"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Typography } from "@mui/material"
import axios from "axios"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const APIKey = "58b2173eeafc4b949777f54ec8ea6e76"

// // Set AssemblyAI Axios Header
// const assemblyAI = axios.create({
//   baseURL: "https://api.assemblyai.com/v2",
//   headers: {
//     authorization: APIKey,
//     "content-type": "application/json",
//     "transfer-encoding": "chunked",
//   },
// })

const assemblyAI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  summarization: true,
  summary_model: "informative",
  summary_type: "bullets",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
    //"transfer-encoding": "chunked",
  },
})

const App = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }

  // AssemblyAI

  // States
  const [uploadURL, setUploadURL] = useState("")
  //const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assemblyAI
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  // const submitTranscriptionHandler = async () => {
  //   await assemblyAI
  //     .post("/transcript", {
  //       audio_url: uploadURL,
  //     })
  //     .then((res) => {
  //       setTranscriptID(res.data.id)

  //       checkStatusHandler()
  //     })
  //     .catch((err) => console.error(err))
  // }

  // // Check the status of the Transcript
  // const checkStatusHandler = async () => {
  //   setIsLoading(true)
  //   if (transcriptID.length != 0) {
  //     try {
  //       await assemblyAI.get(`/transcript/${transcriptID}`).then((res) => {
  //         setTranscriptData(res.data)
  //       })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // }

  const base_url = 'https://api.assemblyai.com/v2'

  const headers = {
    authorization: APIKey
  }

  const data = {
    audio_url: uploadURL,
    summarization: true,
    summary_model: 'conversational',
    speaker_labels: true,
    summary_type: 'bullets'
  }

  const submitForSummary = async () => {
    const url = base_url + '/transcript'
    const response = await axios.post(url, data, { headers: headers })

    const transcriptId = response.data.id
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`
    console.log(response.data.id)

    setIsLoading(true)

    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, {
        headers: headers
      })
      const transcriptionResult = pollingResponse.data

      if (transcriptionResult.status === 'completed') {
        setTranscriptData(transcriptionResult)
        const summary = transcriptionResult.summary || ''
        console.log('Transcription completed!')
        console.log(`Transcription: ${transcriptionResult.text}`)
        console.log(`Summary: ${summary}`)
        break
      } else if (transcriptionResult.status === 'error') {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }
  }



  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        //checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.summary)
        console.log(transcriptData.summary);

        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  const theme = createTheme({
    palette: {
      primary: {
        main: '#88c5cf'
      }
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div className='flex flex-col items-center justify-center mt-40 mb-20 space-y-4'>
        <Typography variant='h2'>
          Welcome to DocAI
        </Typography>
        <Typography align='center' variant="subtitle1">
          A virtual note-taking assistant for doctor-patient consultations, powered by AssemblyAI
        </Typography>
        <div>
          <Button
            color='primary'
            variant="contained"
            onClick={startRecording}
            disabled={isRecording}
          >
            Record
          </Button>
          <Button
            variant="contained"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop
          </Button>
        </div>
        <audio ref={audioPlayer} src={blobURL} controls='controls' />
        <Button
          variant='contained'
          onClick={submitForSummary}
        >
          Submit for Transcription
        </Button>

        {isLoading ? (
          <div>
            <Oval
              ariaLabel='loading-indicator'
              height={100}
              width={100}
              strokeWidth={5}
              color='blue'
              secondaryColor='white'
            />
            <p className='text-center'>Summarizing your conversation....</p>
          </div>
        ) : (
          <div></div>
        )}
        {!isLoading && transcript && (
          <div className='w-2/3 lg:w-1/3 mockup-code'>
            <p className='p-6'>{transcript}</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App