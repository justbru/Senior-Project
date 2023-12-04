import { useState } from 'react';
import AudioInput from './AudioInput';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Spacer } from '@nextui-org/react';
import { staggerContainer } from '../../../motion';


export default function Audio(props) {
    const [audioFile, setAudioFile] = useState(null)
    const [isOnRecording, setIsOnRecording] = useState(false)

    const isClicked = () => {
        setIsOnRecording(true);
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {
                        !isOnRecording && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="intro"
                            >
                                <div className="block text-left text-6xl tracking-wide">
                                    Try out DocAI
                                </div>
                                <Spacer y={4} />
                                <div className="block text-left text-xl">Start by uploading an audio file of a consultation, or record one live.</div>
                                <Spacer y={4} />
                                <Button onClick={isClicked} className="place-self-end bg-brown-100 tracking-wide" variant='light' radius="full">
                                    Begin →
                                </Button>
                            </motion.div>
                        )
                    }
                    {
                        isOnRecording && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                exit={{ opacity: 0 }}
                                key="audioinputs"
                            >
                                <AudioInput {...props} audioFile={audioFile} setAudioFile={setAudioFile} />
                            </motion.div>
                        )
                    }
                </AnimatePresence >
            </motion.div>
        </div>
    );
}