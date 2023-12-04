import { useState } from 'react';
import Audio from './audio/Audio';
import Results from './results/Results';
import { Button, Link } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Trial(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [ranAI, setRanAI] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [transcript_original, setTranscript_original] = useState("")

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            exit={{ opacity: 0 }}
            key="overall"
            className="flex justify-center"
        >
            <Button as={Link} className="absolute top-10 left-20 bg-brown-50 tracking-wide" variant='light' href="/" radius="full">
                ←  Back to home
            </Button>
            <AnimatePresence mode="wait" initial={false}>
                {
                    !ranAI && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            exit={{ opacity: 0 }}
                            key="audio"
                        >
                            <Audio setRanAI={setRanAI} setTranscript={setTranscript} setTranscript_original={setTranscript_original} isLoading={isLoading} setIsLoading={setIsLoading} />
                        </motion.div>
                    )
                }
                {
                    ranAI && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            exit={{ opacity: 0 }}
                            key="results"
                        >
                            <Results transcript={transcript} transcript_original={transcript_original} isLoading={isLoading} />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    );
}
