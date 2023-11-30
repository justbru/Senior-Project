import { Card, CardContent, Grid, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import Classifier from 'ml-classify-text'
const classifier = new Classifier()

// current GAS0002

const subjective = [
    'has been having headaches for about four months',
    'The patient explained to me that he has been feeling much better since his last office visit',
    'complains of knee pain',
    'explains they are exeriencing stomach pain and nausea',
    'When asked the patient to rate his intensity on a scale of 0 to 10 with 0 being nothing and 10 being his most intense pain, Speaker A gave his Right Sacroiliac Region a 4 since his last office visit',
    'The activities that aggravate the patient\'s condition have not changed and include when he bends, sits, stands up, works out and runs',
    'The patient also said his symptoms are improved when he gets adjusted and receives the combination of therapies at the office',
    'The patient also informed me that he has been doing all of the exercises he is supposed to do on a regular basis',
    'Speaker A reports that he is feeling tired and that he can\'t seem to get out of bed in the morning',
    'Speaker A is struggling to get to work and says that he constantly finds his mind wandering to negative thoughts',
    'He reports that he does not feel as though the medication is making any difference and thinks he is getting worse.',
    'rolled his ankle yesterday',
    'The doctor asks about the symptoms, the location of the pain, and the duration',
    'The pain is pretty sharp and it\'s pretty bad',
    'tells the doctor about the symptoms of having trouble breathing.',
    'Speaker B has been having really bad migraines for a long time',
    'You\'ve never had anything like that before, and it sounds like experiencing some stress in your life',
    'It comes and goes for about 20 to 30 minutes and it\'s happened about two or three times',
    'The doctor also asks about some other questions about the overall health of the patient.',
    'Speaker E the leg feels fine',
    'The doctor asks about the symptoms of the leg, the medications that the doctor prescribes, and the family history of diabetes',
    'The doctor also asks about some other questions about the overall health of the patient.',
    'Speaker B comes to the hospital with her son who has had vomiting and diarrhea for the last two days',
    'Speaker B tells the doctor that his stomach has been hurting more for the last three days',
    'Speaker A comes to see a urologist because he thinks he might have a bladder infection.',
    'The doctor asks for any other symptoms besides the pain and the pain worsens significantly when moving or bending the back.',
    ' Speaker A tells Speaker B that Speaker B doesn\'t smoke and drinks alcohol',
    'Speaker B asks Speaker B about Speaker B\'s smoking and drinking habits',
    '- The pain in the back has been going on for a few months',
    'The pain is on the outside of the right elbow. There is pain at the lateral aspect. Otherwise, there are no other symptoms other than elbow pain',
    'The doctor then asks the patient to do some movements with him.',
    'Speaker B says it\'s persistent and gets worse depending on what Speaker B is doing.',
    'got kicked in the knee two days ago. Chris describes the pain to the doctor and says it\'s sharp, achy, and red.',
    ' It\'s now radiating down to his right leg and it feels like a burning sensation',
    'comes to the doctor to check his daughter\'s condition',
    'The runny nose and cough have gone away',
    'The pain is painful and it wakes him up two or three times at night',
    'Speaker A asks Speaker A to do some tests.',
    'The pain is achy, throbbing, dull, sharp burning, and it has gotten worse over the past four weeks',
    'She doesn\'t smoke and lives with her husband and her daughter',
    'The doctor asks about the details of the symptoms, including the car accident, the treatment of the backache, the physical condition of the legs, and the recent changes in the weight',
    'Speaker B comes to see a doctor because her three-year-old daughter has been holding her elbow awkwardly.',
    'He doesn\'t smoke cigarettes and tries to stay away from any drugs.',
    'The car was at the back and there were some scratches on the bumper',
    'It\'s probably a six or a seven.',
    'Speaker A interviews Speaker A about Speaker A\'s medical history',
    'Speaker A is doing the physical exam of Speaker A',
    'Speaker B has been experiencing some pain and numbness and tingling in his wrist area and thumb, middle finger, and index finger',
    'Speaker B tells the interviewer she is an accountant and lives with her husband and two kids in a small townhouse.',
    'Speaker C interviews Speaker A and asks Speaker A about Speaker A\'s medical history, living situation, whereabouts, recent surgeries, and the status of sexual activity',
    'Speaker B comes to the clinic to check out a lump and mass below the right knee',
    'Speaker A interviews Speaker A. Speaker A asks about Speaker A\'s energy, physical condition, immunizations, medications, and the living situation of Speaker A and Speaker B',
    'Speaker A has diabetes, high blood pressure, and has had hepatitis in the past',
    'tells the doctor that she has had pain in her chest for a week and has trouble breathing',
    'The rash started first and the sore throat came a little bit later.',
    'He doesn\'t use any inhalers for COPD and doesn\'t smoke cigarettes. He has no recent hospitalizations and no surgeries',
    'The cough is more often and brings up more mucus',
    'She has no allergies',
    'She doesn\'t have any joint pains or leg pains or muscle pains',
    'Speaker B tells the doctor that he has a sore throat with difficulty swallowing and hoarse voice since yesterday evening',
    'comes to the doctor because he\'s been so weak and so tired',
    'asks about whether she has been in contact with anyone who may have been sick',
    'She hasn\'t been anywhere recently',
    'The doctor asks about the symptoms and the duration of the symptoms',
    'The doctor asks about the symptoms of the patient, including symptoms of shortness of breath, nausea, vomiting, dizziness, and fainting spells',
    'Speaker B moved to Canada from India a year back',
    'No one has had a fever or a runny nose or sore throat',
    'Speaker B tells the doctor that she has rheumatoid arthritis and takes iron and vitamin D',
    'Speaker B tells the doctor that he smokes cigarettes occasionally and uses an inhaler for COPD',
    'Speaker C has high blood pressure and type two diabetes, and takes ramapril and metformin',
    'She\'s worried that she has COVID',
    'The symptoms have gotten worse over time and there is a yellowish substance in the vomit',
    'Speaker A answers all the questions.',
    ' tells Speaker A about Speaker B\'s daily routine, Speaker C\'s diet, and Speaker D\'s regular look',
    'He doesn\'t smoke marijuana',
    'comes to see a doctor about a cough',
    'The doctor asks about the symptoms of the cough, such as the color of the gunk, the frequency of coughing, and the duration of cough.',
    'Speaker B interviews Speaker A',
    'comes to see the doctor because her nutritionist referred her',
    'A psychiatrist comes to see Speaker A because Speaker A was brought to the hospital last night after cutting her arms and overdosing on Tylenol',
    'June comes to see Dr. Jones because her heart starts to race and she gets chest pains',
    'She thinks she might have a heart attack and she tries to avoid situations where she might get like that',
    'It is hard to recall what he was feeling at any particular time, and it usually starts mid to late day.',
    'Her life went downhill because her mom married an alcoholic that beat her and her stepdad',
    'It can be difficult to diagnose Add and people can often over diagnose it. ',
    'They talk about the different types of specialized doctors and the types of symptoms that can result in the same symptoms',
    'They talk about their morning puking routine.',
    'The will to get the property is in storage and the title was due yesterday',
    'has been having headaches for about four months',


]

const objective = [
    'Speaker B observed patient\'s active range of motion to reveal decreased lumbar right rotation with pain and right lateral flexion with pain',
    'Speaker B observed spasms in Speaker A\'s right lower lumbar',
    'Speaker B made note that the patient had moderate trigger points on his origin of the right piriformis',
    'Orthopedic testing revealed Nachlas was positive, Yeoman\'s Test was positive, Laguerre\'s Test was positive and Hibb\'s Test was positive.',
    'Looks like you\'re 185 pounds, six foot three inches',
    '19 years old',
    'Blood pressure 180 over 40',
    'blood pressure',
    'Okay, it looks like your sugar content is good too',
    'patient is 180 pounds s six foot two inches',
    'Blood pressure came in at 120 over 80',
    'herpes and chlamydia tests from last visit both came in as false',
    'looks like you are 145 pounds, five foot eight',
    'The doctor checks the physical exam of the knee and finds it swollen, painful, and red.',
    'The fever is gone but she still feels a bit warm.',
    ' - During the physical exam, the doctor examines the hands, arms, and wrists',
    'Speaker A asks Speaker A to do some tests',
    'Speaker A does both knees and knees backwards, and Speaker A points the toes to the ceiling',
    'The right arm has some redness and reduced supination.',
    'The range of motion is limited and the shoulder hurts a lot',
    'There is a bruise on the right ankle and there is pain on the lateral malleolis',
    'The patient has some joint swelling in the left knee and has diabetes, high blood pressure, high cholesterol, and is overweight',
    'Speaker B comes to see a doctor because of a terrible headache',
    'The doctor also checks the lipid panel and reminds the patient to check a lipid panel again.',
    'All the tests were normal'

]

const assessment = [
    'The prognosis for the patient at this time is good because the patient is responding well',
    'Spealer B decides the issue is a small bowel obstruction with resection and lysis of adhesions',
    'The doctor examines him and thinks he has a fracture',
    'The doctor asks about the symptoms, and the doctor finds the rash is on his right leg and he has got diabetes',
    'Speaker B has been having diarrhea for the past three to four days',
    'The doctor thinks the child is a very healthy child, meeting all developmental milestones, and has no concerns for safety in the home.',
    'Speaker B tells Speaker A that Speaker A may have a case of lateral epicondylitis and recommends some activity modification to manage the pain and physical therapy to increase mobility and strength in the arm',
    'peaker A diagnoses the symptoms of sciatica to be some sort of sacral nerve radiculopathy and recommends some conservative approaches to manage the pain',
    'The doctor thinks the pain may be caused by a medial epicondylitis or attendinopathy and will treat it with activity modification.',
    ' Speaker B thinks the most likely thing is a deep vein thrombosis and will order some diagnostic studies and get an ultrasound of the right calf and the right knee.',
    'The doctor thinks it\'s either rotator cuff tear or subachromial impingement syndrome and will want to get an ultrasound of the left shoulder to evaluate the structures.',
    'The doctor thinks it could be related to diabetes and explains how to get some sensation back',
    'Speaker A tells Speaker B that he has carpal tunnel syndrome and it\'s caused by repetitive movements at work',
    'It seems that based on the description of how the injury happened and the mechanism and what the patient feels right now, it\'s possible that the patient has knee ligament injury',
    'Speaker A tells the other that Speaker A may have Kara, aquina syndrome.',
    'Speaker C tells Speaker A that Speaker A\'s symptoms sound like carpal tunnel syndrome and recommends Speaker A to use wrist splints and activity modification to help with the symptoms.',
    'Speaker E tells Speaker B that Speaker B has something called ileotibial band syndrome',
    'Speaker A tells the other that Speaker A\'s symptoms are indicative of a gout flare',
    ' A does a physical exam of the hand and wrist and finds that the muscle bulk is reduced',
    'The doctor says everything was normal and the baby is a healthy baby.',
    'The doctor asks about the symptoms, and the doctor finds that the symptoms are caused by pleuridic chest pain and high blood pressure',
    'Speaker D is concerned that Speaker A might have COVID19 or coronavirus',
    'The doctor asks about other symptoms and doesn\'t find anything unusual',
    'They think it may have to do with the dehydration'
]

const plan = [
    'Speaker B advised Speaker A to return for his next recommended treatment in two days.',
    'Speaker B prescribes 10mg of ibuprofen, twice a day for the next two weeks',
    'Will continue to monitor patient',
    'Will begin to advance diet to clear liquids when patient experiences flatus',
    'Continue maintenance fluids at a rate of 125ml/hour NS.',
    'Continue to monitor CBC, electrolytes, BUN, and creatinine daily',
    'Encourage ambulation and use of the incentive spirometer',
    'Encourage ambulation and use of the incentive spirometer',
    'He recommends an MRI and will get him set up with that today',
    'The doctor asks about systems, and tries to rule out something that would be scary like that',
    'B wants to get a closer look at the leg before moving forward with the physical exam.',
    'After that, he will talk to the doctor',
    ' The doctor will talk to her attending and then share the plan with her',
    'Speaker A will do a COVID test and check electrolytes',
    'Speaker B will increase hydration',
    'The doctor will have the patient come in in person and see if there\'s need for an X ray',
    'The doctor tells the patient the treatment to start with will be the same, and maybe get a knee X ray if things aren\'t improving',
    'The doctor will do an X-ray and see if there\'s a fracture or not',
    ' The doctor will do an X ray and an MRI and will give some information about some anti inflammatory medications and some physiotherapy to help relieve some of the pain.',
    'It\'s basically work modification and he can do things at home to relieve the pain',
    'Speaker B thinks it\'s a good plan',
    'Speaker B thinks it\'s a good plan',
    'The doctor advises the patient to stay active and use Tylenol to treat the pain',
    'Speaker A asks about the symptoms of the patient and will try to cover the basis and get the patient tested for mono',
    'Speaker B tells the doctor that he has asthma and the doctor told him to come back today',
    'They\'ll do some blood work, do some imaging, and then a pulmonary function test',
    'Speaker A diagnoses Speaker A to have asthma and will work Speaker A up with pulmonary function test and bronchodilators',
    'The doctor wants to rule out TV because it is highly infectious.',
    'Speaker A will give Speaker B a COVID swab and Speaker C asks Speaker B to keep Speaker B isolated',
    'Speaker D will get some gatorade for Speaker B',
    'The doctor checks her vitals, asks about her exercise routine, and asks her to bring her mom in and have a discussion about the next steps to help her get well',
    'The doctor will help to get therapy and medication, and then they will work on getting in touch with the family',
    'She wants to try medication, cognitive behavioral therapy, and exposure and responsive prevention therapy to begin changing these behaviors.',
    'A talks about the symptoms of anxiety and suggests treating it as if it were an anxiety problem',
    'Micah gave him a prescription for Adderall, but the pharmacy was out of it, so he has to order it from the pharmacy himself',
    'The doctor will give him the prescription tomorrow.',
    'They will talk more on Friday.'
]


classifier.train(subjective, 'subjective')
classifier.train(objective, 'objective')
classifier.train(assessment, 'assessment')
classifier.train(plan, 'plan')
//classifier.train(nothing, 'nothing')

let categorizedText = 0
let categorizedText_original = 0


// This is how we run the network to get a prediction

export default function SummaryPage(props) {
    const [output_s, setOutput_s] = useState("")
    const [output_o, setOutput_o] = useState("")
    const [output_a, setOutput_a] = useState("")
    const [output_p, setOutput_p] = useState("")
    const [unclassified, setUnclassified] = useState("")



    //const output = { s: "", o: "", a: "", p: "" }

    useEffect(() => {

        let tempOutputS = ""
        let tempOutputO = ""
        let tempOutputA = ""
        let tempOutputP = ""
        let tempUnclassified = ""

        if (props.transcript && categorizedText === 0) {
            categorizedText = 1
            const removedDashes = props.transcript.replaceAll('-', '');
            const regex = /(?<!\bDr)\./;
            const splitTranscript = removedDashes.split(regex);
            if (splitTranscript.length) {
                splitTranscript.forEach((sentence) => {
                    // sentence = sentence.replaceAll('-', '');                        
                    let predictions = classifier.predict(sentence)
                    console.log(sentence);
                    if (predictions.length) {
                        console.log(predictions[0]);

                        if (predictions[0].label === "subjective")
                            tempOutputS += sentence + ". "
                        if (predictions[0].label === "objective")
                            tempOutputO += sentence + ". "
                        if (predictions[0].label === "assessment")
                            tempOutputA += sentence + ". "
                        if (predictions[0].label === "plan")
                            tempOutputP += sentence + ". "


                        // if (predictions[0].label === "objective")
                        //     output.o += sentence
                        // if (predictions[0].label === "assessment")
                        //     output.a += sentence
                        // if (predictions[0].label === "plan")
                        //     output.p += sentence
                    }
                    else
                        tempUnclassified += sentence + ". "

                })
            } else {
                console.log('No Speech detected for neural network (categorization)')
            }


        }
        else
            console.log("waiting for props to load")

        if (props.transcript_original && categorizedText_original === 0) {
            console.log("In here")
            categorizedText_original = 1
            const regex = /\.(?!\s*Dr\.)/;
            const splitTranscript = props.transcript_original.split(regex);
            if (splitTranscript.length) {
                splitTranscript.forEach((sentence) => {
                    let predictions = classifier.predict(sentence)
                    if (predictions.length) {
                        if (predictions[0].label === "objective")
                            tempOutputO += sentence + ". "
                        // if (predictions[0].label === "objective")
                        //     output.o += sentence
                        // if (predictions[0].label === "assessment")
                        //     output.a += sentence
                        // if (predictions[0].label === "plan")
                        //     output.p += sentence
                    }

                })
            } else {
                console.log('No Speech detected for neural network (categorization)')
            }

            setOutput_s(tempOutputS)
            setOutput_o(tempOutputO)
            setOutput_a(tempOutputA)
            setOutput_p(tempOutputP)
            setUnclassified(tempUnclassified)
        }
        else
            console.log("waiting for props to load")




    }, [props, output_s]);

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
                                    {props.transcript.replaceAll('-', '')}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    S:{output_s}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    O: {output_o}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    A: {output_a}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    P: {output_p}
                                </Typography>
                            </CardContent>
                        </Card>


                        <Card sx={{ minWidth: 275, marginTop: 1 }}>
                            <CardContent>
                                <Typography align='left' variant='body1'>
                                    Unclassified: {unclassified}
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