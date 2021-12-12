import * as React from 'react';
import { Card, Typography,Box, Fab } from '@mui/material';
import { OccupationCircle } from '../../components/OccupationComponents/OccupationCircle';
import { OccupationProportion } from '../../components/OccupationComponents/OccupatonProportion';
import OccupationService from '../../services/OccupationService';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


class AdminCardOccupation extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            person: 0,
            maxPerson: 100,
            maskForgotten: 3,
            occupationService: null,
            isModificationOpen: false
        }
        
    }

    componentDidMount(){
        this.occupationService = new OccupationService(()=>{
            this.setState({
                person: this.occupationService.occupation,
                maxPerson: this.occupationService.maxOccupation
            });
        });
    }

    componentWillUnmount(){
        this.occupationService.destroy();
    }

    render(){

        return (
            <Card sx={{p: 3, m:1}}>
                <Typography variant="h5">
                    Occupation
                </Typography>
                <Box sx={{display: "flex", p: 2, justifyContent: "space-around", alignItems: "center"}}>
                    <OccupationCircle person={this.state.person} maxPerson={this.state.maxPerson} width={180}/>
                    <OccupationProportion person={this.state.person} maxPerson={this.state.maxPerson}/>
                </Box>
                <Box sx={{display: "flex", gap:2, justifyContent:"end"}}>
                    <Box sx={{display: "flex", gap:2}}>
                        <Fab color="primary" aria-label="plus" onClick={()=>{this.occupationService.addPerson()}}>
                            <AddIcon />
                        </Fab>
                        <Fab color="secondary" aria-label="less" onClick={()=>{this.occupationService.removePerson()}}>
                            <RemoveIcon />
                        </Fab>
                    </Box>
                    
                </Box>
            </Card>
        )
    }
}

export default AdminCardOccupation;