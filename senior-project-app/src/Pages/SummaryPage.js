import { Card, CardContent, Grid, CircularProgress, Typography } from "@mui/material"
import { useState, useEffect } from 'react';
import Classifier from 'ml-classify-text'
const classifier = new Classifier()

const subjective = [
    'The patient explained to me that he has been feeling much better since his last office visit',
    'Speaker A complains of knee pain',
    'Speaker A explains they are exeriencing stomach pain and nausea',
    'When Speaker B asked the patient to rate his intensity on a scale of 0 to 10 with 0 being nothing and 10 being his most intense pain, Speaker A gave his Right Sacroiliac Region a 4 since his last office visit',
    'The activities that aggravate the patient\'s condition have not changed and include when he bends, sits, stands up, works out and runs',
    'The patient also said his symptoms are improved when he gets adjusted and receives the combination of therapies at the office',
    'The patient also informed me that he has been doing all of the exercises he is supposed to do on a regular basis',
    'Speaker A reports that he is feeling tired and that he can\'t seem to get out of bed in the morning',
    'Speaker A is struggling to get to work and says that he constantly finds his mind wandering to negative thoughts',
    'He reports that he does not feel as though the medication is making any difference and thinks he is getting worse.'
]

const objective = [
    'Speaker B observed patient\'s active range of motion to reveal decreased lumbar right rotation with pain and right lateral flexion with pain',
    'Speaker B observed spasms in Speaker A\'s right lower lumbar',
    'Speaker B made note that the patient had moderate trigger points on his origin of the right piriformis',
    'Orthopedic testing revealed Nachlas was positive, Yeoman\'s Test was positive, Laguerre\'s Test was positive and Hibb\'s Test was positive.'
]

const assessment = [
    'The prognosis for the patient at this time is good because the patient is responding well',
    'Spealer B decides the issue is a small bowel obstruction with resection and lysis of adhesions'
]

const plan = [
    'Speaker B advised Speaker A to return for his next recommended treatment in two days.',
    'Speaker B prescribes 10mg of ibuprofen, twice a day for the next two weeks',
    'Will continue to monitor patient',
    'Will begin to advance diet to clear liquids when patient experiences flatus',
    'Continue maintenance fluids at a rate of 125ml/hour NS.',
    'Continue to monitor CBC, electrolytes, BUN, and creatinine daily',
    'Encourage ambulation and use of the incentive spirometer',
    'Encourage ambulation and use of the incentive spirometer'
]

classifier.train(subjective, 'subjective')
classifier.train(objective, 'objective')
classifier.train(assessment, 'assessment')
classifier.train(plan, 'plan')

// This is how we run the network to get a prediction

export default function SummaryPage(props) {
    useEffect(() => {
        const predictions = classifier.predict('Speaker A complains of headaches and pain around the eye')

        if (predictions.length) {
            predictions.forEach((prediction) => {
                console.log(`${prediction.label} (${prediction.confidence})`)
            })
        } else {
            console.log('No predictions returned')
        }

        const predictions2 = classifier.predict('Speaker B notices swelling on the lower back region.')

        if (predictions2.length) {
            predictions2.forEach((prediction) => {
                console.log(`${prediction.label} (${prediction.confidence})`)
            })
        } else {
            console.log('No predictions returned')
        }
    }, [])

    const output = { s: "", o: "", a: "", p: "" }
    //const output = net.run({ text: props.transcript }); // { white: 0.81, black: 0.18 }
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
                        <Card sx={{ minWidth: 450, marginTop: -20, marginBottom: 12 }}>
                            <CardContent >
                                <Typography margin-bottom="1vh" align='center' variant='body1'>
                                    {props.transcript}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    S:{output.s}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    O: {output.o}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    A: {output.a}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    P: {output.p}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {!props.transcript && !props.isLoading && (
                    <Card sx={{ minWidth: 275, marginTop: 1 }}>
                        <CardContent>
                            <Typography align='center' variant='body1'>
                                No speech detected. Try again
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    );
}