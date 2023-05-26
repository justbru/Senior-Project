import { Card, CardContent, Grid, CircularProgress, Typography } from "@mui/material"

export default function SummaryPage(props) {
    return (
        <Grid item xs={12}>
            <Grid container rowSpacing={5} xs={12} display="flex" justifyContent="center" alignItems="center">
                {props.isLoading ? (
                    <Grid item>
                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                            <Typography color='white' variant='body1'>
                                Summarizing your meeting...
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs={12}></Grid>
                )}
                {!props.isLoading && props.transcript && (
                    <Grid item xs={12}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography align='center' variant='body1'>
                                    {props.transcript}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}