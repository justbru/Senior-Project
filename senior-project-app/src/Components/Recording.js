import { useEffect, useState, useRef } from "react"
import MicRecorder from "mic-recorder-to-mp3"
import { Grid, Button } from "@mui/material"


export default function Recording(props) {
    const recorder = useRef(null) //Recorder
    const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
    const [blobURL, setBlobUrl] = useState(null)
    const [isRecording, setIsRecording] = useState(null)
    const [file, setFile] = useState()

    function fileUpload(event) {
        setFile(event.target.files[0])
    }

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
                props.setAudioFile(file)
            })
            .catch((e) => console.log(e))
    }


    function fileSubmit(event) {
        event.preventDefault()
        const newBlobUrl = URL.createObjectURL(file)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        props.setAudioFile(file)
        
        // axios.post(url, formData, config).then((response) => {
        //     console.log(response.data);
        // });

    }

    return (
        <Grid item xs={12}>
            <Grid container rowSpacing={5} xs={12} display="flex" justifyContent="center" alignItems="center">
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" spacing={10}>
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
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <audio ref={audioPlayer} src={blobURL} controls='controls' />
                </Grid>

                <Grid item display="flex" justifyContent="center" alignItems="center">

                    <form onSubmit={fileSubmit}>
                        <input type="file" onChange={fileUpload} />
                        <button type="submit">Upload</button>
                    </form>
                </Grid>

            </Grid>
        </Grid>
    );
}