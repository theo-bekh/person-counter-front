import * as React from 'react';
import { Grid, Box } from '@mui/material';
import AdminCardCamera from './AdminCardCamera';
import AdminCardOccupation from './AdminCardOccupation';
import AdminCardMask from './AdminCardMask';

function Admin(){
    return (
        <Box sx={{display: "flex", justifyContent: "center", mt:2}}>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <Grid item>
                    <AdminCardCamera/>
                </Grid>
                <Grid item sx={{display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                        <AdminCardOccupation/>
                        <AdminCardMask/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Admin;