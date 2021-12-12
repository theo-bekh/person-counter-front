import * as React from 'react';
import { Skeleton } from '@mui/material';

class CameraStream extends React.Component {

    render(){
        return <Skeleton variant="rectangular" width={960} height={540} />
    }
}

export default CameraStream;