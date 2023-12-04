import { useState } from 'react';
import { Grid } from "@mui/material";
import Recording from '../Components/Recording'
import AssemblyAI from '../Components/AssemblyAI';

export default function TrialPage(props) {
    const [audioFile, setAudioFile] = useState(null)

    return (
        <Grid container rowSpacing={5} xs={12} display="flex" justifyContent="center" alignItems="center">
            <Recording setAudioFile={setAudioFile} />
            <AssemblyAI {...props} audioFile={audioFile} />
        </Grid>
    );
}