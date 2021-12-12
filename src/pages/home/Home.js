import * as React from 'react';
import { Container, Box, Typography, Button, Skeleton } from '@mui/material';
import Clock from '../../components/Clock/Clock';
import { OccupationCircle } from '../../components/OccupationComponents/OccupationCircle';
import { OccupationProportion } from '../../components/OccupationComponents/OccupatonProportion';

export class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            person: 30,
            maxPerson: 50,
            welcomeMessage: "Welcome to the Museu Nacional d'Art de Catalunya"
        }
    }

    testAdd(){
        this.setState({person: this.state.person+1})
    }

    testSub(){
        this.setState({person: this.state.person-1})
    }

    render(){
        return (
        <Container>
            <Box sx={{display: "flex", justifyContent: "space-between", flexWrap:"wrap", mb:3, mt:3}}>
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
            <Box>
                <Box sx={{display:"flex",flexDirection: "column"}}>
                    <Box sx={{display:"flex",justifyContent: "space-around", alignItems: "center", flexWrap:"wrap"}}>
                        <OccupationCircle person={this.state.person} maxPerson={this.state.maxPerson} width={300}/>
                        <OccupationProportion person={this.state.person} maxPerson={this.state.maxPerson}/>
                    </Box>
                    
                </Box>
            </Box>
            <Typography variant="h6">Attendance</Typography>
            <Box sx={{display:"flex", justifyContent: "center"}}>
                <Skeleton variant="rectangular" width={600} height={300} />
            </Box>
            
            <Typography variant="h6">Test</Typography>
            <Button onClick={()=>this.testAdd()}>Plus</Button>
            <Button onClick={()=>this.testSub()}>Sub</Button>
        </Container>
        );
    }
}

export default Home;