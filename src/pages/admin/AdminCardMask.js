import * as React from 'react';
import { Card, Typography,Box, Button } from '@mui/material';
import SignMask from "../../assets/sign_mask.png"


class AdminCardMask extends React.Component{

    constructor(props){
        super(props);
        this.state = {personWithoutMask: 20};
    }

    render(){

        return (
            <Card sx={{p: 3, m:1}}>
                <Typography variant="h5">
                    Mask
                </Typography>
                <Box sx={{display: "flex", p: 2, justifyContent: "space-around", alignItems: "center", flexWrap:"wrap", alignContent:"center", gap:1}}>
                    <img src={SignMask} width="80" alt="mask"/>
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <Typography variant="h2"> {this.state.personWithoutMask} </Typography>
                        <Typography>current person(s) without mask</Typography> 
                    </Box>
                    
                    <Button onClick={()=>{
                        this.setState({personWithoutMask:0})
                    }}>Reset</Button>
                </Box>
            </Card>
        )
    }
}

export default AdminCardMask;