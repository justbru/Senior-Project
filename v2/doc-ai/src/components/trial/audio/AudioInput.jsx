import { useEffect, useState, useRef } from "react"
import MicRecorder from "mic-recorder-to-mp3"
import { Button, Spacer, Image, CardFooter, Progress, Card, CardHeader, CardBody } from "@nextui-org/react"
import Mic from './Mic.png'
import Upload from './Upload.png'
import ProcessAudio from './ProcessAudio';
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { staggerContainer } from "../../../motion"

export default function AudioInput(props) {
    const recorder = useRef(null)
    const audioPlayer = useRef(null)
    const [blobURL, setBlobUrl] = useState(null)
    const [isRecording, setIsRecording] = useState(null)
    const [hasRecorded, setHasRecorded] = useState(false)
    const [file, setFile] = useState()
    const [typeChosen, setTypeChosen] = useState(false)
    const [isUpload, setIsUpload] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const hiddenFileInput = useRef(null);

    function fileUpload(event) {
        setFile(event.target.files[0])
    }

    useEffect(() => {
        recorder.current = new MicRecorder({ bitRate: 128 })
    }, [])

    const startRecording = () => {
        recorder.current.start().then(() => {
            setIsRecording(true)
        })
    }

    const stopRecording = () => {
        setHasRecorded(true)
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

    const reRecord = () => {
        setHasRecorded(false)
    }

    const reUpload = () => {
        setIsSubmitted(false)
        setFile()
    }

    const chooseLive = () => {
        setTypeChosen(true)
        setIsUpload(false)
    }

    const chooseUpload = () => {
        setTypeChosen(true)
        setIsUpload(true)
    }

    const handleUpload = event => {
        hiddenFileInput.current.click();
    };


    function fileSubmit(event) {
        setIsSubmitted(true);
        event.preventDefault()
        const newBlobUrl = URL.createObjectURL(file)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        props.setAudioFile(file)
    }


    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
        >
            <div className="grid gap-8 place-content-center">
                <AnimatePresence mode="wait" initial={false}>
                    {
                        !typeChosen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="choosetype"
                                className="grid grid-cols-2 gap-24 place-content-center"
                            >
                                <Card className="w-[500px] h-[350px] flex flex-col items-center">
                                    <CardHeader className="text-4xl tracking-wide bg-brown-100 p-5">
                                        Record live
                                    </CardHeader>
                                    <CardBody className="flex flex-col items-center overflow-visible py-4">
                                        <p className="text-center pt-4">Meeting with a patient? Record your consultation live.</p>
                                        <Image
                                            alt="Card background"
                                            className="object-cover pt-4 rounded-xl"
                                            src={Mic}
                                            width={96}
                                        />
                                    </CardBody>
                                    <CardFooter className="flex flex-col items-center overflow-visible py-4">
                                        <Button className="w-11/12 text-lg bg-brown-100" onClick={chooseLive} radius="full" >
                                            Choose
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card isDisabled className="w-[500px] h-[350px] flex flex-col items-center">
                                    <CardHeader className="text-4xl tracking-wide bg-brown-100 p-5">
                                        Upload
                                    </CardHeader>
                                    <CardBody className="flex flex-col items-center overflow-visible py-4">
                                        <p className="text-center pt-4">Already met with your patient? Upload your consultation.</p>
                                        <Image
                                            alt="Card background"
                                            className="object-cover pt-4 rounded-xl"
                                            src={Upload}
                                            width={96}
                                        />
                                    </CardBody>
                                    <CardFooter className="flex flex-col items-center overflow-visible py-4">
                                        <Button isDisabled className="w-11/12 text-lg bg-brown-100" onClick={chooseUpload} radius="full" >
                                            Choose
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    }

                    {
                        !hasRecorded && typeChosen && !isUpload && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="liverecord"
                                className="grid gap-8 place-content-center"
                            >
                                <div className="grid grid-cols-1 gap-4 place-content-center">
                                    <div className="block text-left text-6xl tracking-wide">
                                        Record Live
                                    </div>
                                    <div className="block text-left text-xl">Record your doctor-patient consultation live.</div>
                                    <AnimatePresence mode="wait" initial={false}>
                                        {
                                            !isRecording && !hasRecorded && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2, delay: 0.2 }}
                                                    exit={{ opacity: 0 }}
                                                    key="startrecord"
                                                    className="grid grid-cols-1 gap-8 place-content-center"
                                                >
                                                    <Button className="bg-gradient-to-tr from-brown-200 to-brown-400 text-white shadow-lg" radius="full" onClick={startRecording} isDisabled={isRecording}>
                                                        Start recording
                                                    </Button>
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <AnimatePresence mode="wait" initial={false}>
                                        {isRecording && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.75 }}
                                                exit={{ opacity: 0 }}
                                                key="endrecord"
                                                className="grid grid-cols-1 gap-4 place-content-center"
                                            >
                                                <div className="text-lg">
                                                    Recording...
                                                </div>
                                                <Progress
                                                    size="md"
                                                    radius="sm"
                                                    isIndeterminate
                                                    classNames={{
                                                        indicator: "bg-gradient-to-r from-brown-100 to-brown-400",
                                                    }}
                                                />
                                                <Button className="bg-gradient-to-tr from-brown-200 to-brown-400 text-white shadow-lg" radius="full" onClick={stopRecording} isDisabled={!isRecording}>
                                                    Stop
                                                </Button>
                                            </motion.div>
                                        )
                                        }
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        !hasRecorded && typeChosen && isUpload && !isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="upload"
                                className="grid gap-8 place-content-center"
                            >
                                <form onSubmit={fileSubmit}>
                                    <div className="grid gap-4 place-content-center">
                                        <div className="block text-left text-6xl tracking-wide">
                                            Upload a recording
                                        </div>
                                    </div>
                                    <Spacer y={8} />
                                    <div className="grid grid-cols-2 gap-20">
                                        <div className="grid grid-cols-1">
                                            <div className="text-xl text-center">First, upload an audio file.</div>
                                            <Spacer y={4} />
                                            <Button className="bg-brown-100" radius="full" onClick={handleUpload}>Pick a file to upload</Button>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <div className="text-xl text-center">Then, confirm your file upload</div>
                                            <Spacer y={4} />
                                            <Button className="bg-brown-100" radius="full" type="submit" isDisabled={!file}>Confirm upload</Button>
                                        </div>
                                    </div>
                                    <input type="file" ref={hiddenFileInput} style={{ display: 'none' }} onChange={fileUpload} />
                                </form>
                            </motion.div>
                        )
                    }

                    {
                        !hasRecorded && typeChosen && isUpload && isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="reviewupload"
                                className="grid gap-8 place-content-center"
                            >
                                <div className="grid gap-4 place-content-center">
                                    <div className="block text-center text-6xl tracking-wide">
                                        Review your upload
                                    </div>
                                    <div className="block text-center text-xl">Listen to your upload, and choose a new file if needed before AI analysis.</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 place-content-center">
                                    <audio className="place-self-center" ref={audioPlayer} src={blobURL} controls='controls' />
                                    <Button className="w-full h-full place-self-center bg-whitesmoke" radius="full" onClick={reUpload}>
                                        Choose another file
                                    </Button>
                                </div>
                                <ProcessAudio {...props} />
                            </motion.div>
                        )
                    }

                    {
                        !isRecording && hasRecorded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="reviewrec"
                                className="grid gap-8 place-content-center"
                            >
                                <div className="grid gap-4 place-content-center">
                                    <div className="block text-center text-6xl tracking-wide">
                                        Review your recording
                                    </div>
                                    <div className="block text-center text-xl">Listen to your recording, and re-record if needed before AI analysis.</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 place-content-center">
                                    <audio className="place-self-center" ref={audioPlayer} src={blobURL} controls='controls' />
                                    <Button className="w-full h-full place-self-center bg-whitesmoke" radius="full" onClick={reRecord} isDisabled={isRecording}>
                                        Record again
                                    </Button>
                                </div>
                                <ProcessAudio {...props} />
                            </motion.div>
                        )
                    }
                </AnimatePresence >
            </div >
        </motion.div>
    );
}