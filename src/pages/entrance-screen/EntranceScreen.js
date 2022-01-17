import * as React from 'react';
import { Container, Box, Typography, Button, Card } from '@mui/material';
import Clock from '../../components/Clock/Clock';
import { OccupationCircle } from '../../components/OccupationComponents/OccupationCircle';
import { OccupationProportion } from '../../components/OccupationComponents/OccupatonProportion';
import SignStop from '../../assets/sign_stop.png';
import SignOk from '../../assets/sign_ok.png';
import SignMask from '../../assets/sign_mask.png';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import './EntraceScreen.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import OccupationService from '../../services/OccupationService';



export class EntranceScreen extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            person: 0,
            maxPerson: 100,
            welcomeMessage: "Welcome",// to the Museu Nacional d'Art de Catalunya",
            maskForgotten: false
        }
    }

    componentDidMount(){
        this.occupationService = new OccupationService(()=>{
            this.setState({
                person: this.occupationService.occupation,
                maxPerson: this.occupationService.maxOccupation
            });
        });

        // TODO : Call api for the name of the area (for welcome message)

    }

    componentWillUnmount(){
        this.occupationService.destroy();
    }


    render(){
        return (
        <Container>
            <FullScreenBox>
                <Box sx={{display: "flex", justifyContent: "space-between", flexWrap:"wrap", mb:3}}>
                    <Box sx={{display: "flex"}}>
                        <Typography variant="h5" component="div">
                            {this.state.welcomeMessage}
                        </Typography>
                    </Box>
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        <Clock/>
                    </Box>
                </Box>
                <Typography variant="h6">Occupation</Typography>

                <Box sx={{display:"flex",justifyContent: "center", alignItems: "center", flexWrap:"wrap", mb:3, gap:20}}>
                    <OccupationCircle person={this.state.person} maxPerson={this.state.maxPerson} width={350}/>
                    <OccupationProportion person={this.state.person} maxPerson={this.state.maxPerson}/>
                </Box>

                <Sign canEnter={!this.isFull()}/>
                <Box sx={{display:this.isFull()?"flex": "none", justifyContent: "center", alignItems:"center", gap:2}}>
                    <QueryBuilderIcon sx={{ fontSize: 70 }}></QueryBuilderIcon>
                    <Typography variant="h5">Please wait approximately {3} minutes</Typography>
                </Box>

                <Box sx={{display:"flex", alignItems: "center", flexWrap:"wrap", justifyContent: "center", gap:2, mb:3}}>
                    <img src={SignMask} alt="sign_mask" width="90"/>
                    <Box sx={{display:this.maskForgotten()?"none":"flex"}}>
                        <Typography variant="h5"> For our safety, please wear a mask and respect social distancing.</Typography>
                    </Box>
                    <Box sx={{display:this.maskForgotten()?"flex":"none"}}>
                        <Typography variant="h3" color="error" className="blink"> Attention, you forgot to wear your mask !</Typography>
                    </Box>
                </Box>
            </FullScreenBox>
            <Typography variant="h6">Test</Typography>
            <Box sx={{display:"flex", gap:2}}>
                <Button onClick={()=>this.testAdd()} variant="contained">Plus</Button>
                <Button onClick={()=>this.testSub()} variant="contained">Sub</Button>
                <Button onClick={()=>this.testMaskForgotten()} variant="contained">Mask unwear detected</Button>
            </Box>
        </Container>
        );
    }

    isFull(){
        return this.state.person >= this.state.maxPerson;
    }

    maskForgotten(){
        return this.state.maskForgotten;
    }

    testAdd(){
        this.setState({person: this.state.person+1})
    }

    testSub(){
        this.setState({person: this.state.person-1})
    }

    testMaskForgotten(){
        this.setState({maskForgotten: true});

        setTimeout(()=>{
            this.setState({maskForgotten: false});
        }, 10000)
    }


}

function Sign(props){
    
    let sign = props.canEnter ? SignOk : SignStop;
    let message = props.canEnter ? "Please enter": "It is full, sorry...";

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems:"center", gap:2, mb:3}}>
                <img src={sign} alt="sign" width="160"/>
                <Typography variant="h2"> {message} </Typography>
        </Box>
    );
}

function FullScreenBox({ children }){
    const handleFullScreen = useFullScreenHandle();

    return (
        <div>
            <Box sx={{display: "flex", m:2, justifyContent: "right"}}>
                <Button onClick={handleFullScreen.enter}
                    variant="outlined">
                    Show in fullscreen
                </Button>
            </Box> 
            <Card sx={{p:1}}>
                <FullScreen handle={handleFullScreen}>
                    <Box>
                        { children }
                    </Box>
                </FullScreen>
            </Card>
        </div>
      );

}

export default EntranceScreen;