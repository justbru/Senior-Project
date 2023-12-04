import { Grid, Button, Typography } from "@mui/material"

export default function TitlePage(props) {
    return (
        <Grid container rowSpacing={5} display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography align='center' variant='h1' color='white'>
                    Welcome to DocAI
                </Typography>
                <Typography align='center' variant="subtitle1" color='white'>
                    A virtual note-taking assistant for doctor-patient consultations, powered by AssemblyAI
                </Typography>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Button
                    variant="contained"
                    onClick={() => props.setOnTitle(false)}
                    text='white'
                >
                    Try it out
                </Button>
            </Grid>
        </Grid>
    );
}

