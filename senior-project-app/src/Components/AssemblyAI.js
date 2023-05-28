import { useEffect, useState } from "react"
import { Grid, Button } from "@mui/material"
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const APIKey = "58b2173eeafc4b949777f54ec8ea6e76"

const assemblyAI = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    summarization: true,
    summary_model: "informative",
    summary_type: "bullets",
    headers: {
        authorization: APIKey,
        "content-type": "application/json",
    },
})

export default function AssemblyAI(props) {
    const [uploadURL, setUploadURL] = useState("")
    const [transcriptData, setTranscriptData] = useState("")

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

    // Upload the Audio File and retrieve the Upload URL
    useEffect(() => {
        if (props.audioFile) {
            assemblyAI
                .post("/upload", props.audioFile)
                .then((res) => setUploadURL(res.data.upload_url))
                .catch((err) => console.error(err))
        }
    }, [props.audioFile])

    const submitForSummary = async () => {
        const url = base_url + '/transcript'
        const response = await axios.post(url, data, { headers: headers })

        const transcriptId = response.data.id
        const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`
        console.log(response.data.id)

        props.setRanAI(true)
        props.setIsLoading(true)

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
                props.setIsLoading(false)
                props.setTranscript(summary)
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
            if (transcriptData.status !== "completed" && props.isLoading) {
                //checkStatusHandler()
            } else {
                props.setIsLoading(false)
                props.setTranscript(transcriptData.summary)
                console.log(transcriptData.summary);

                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <Grid item xs={12}>
            <Grid container rowSpacing={5} xs={12} display="flex" justifyContent="center" alignItems="center">
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Button
                        variant='contained'
                        onClick={submitForSummary}
                    >
                        Submit for Transcription
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}