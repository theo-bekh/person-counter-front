import { Box, Button } from '@mui/material';
import * as React from 'react';

class CameraConfiguration extends React.Component{

    constructor(props) {
        super(props);
        this.state = { x1: 100, y1: 200, x2: 130, y2: 700,
        isEdition: false,
        isFirstPoint: true,
        isRightDirection: true};
        this.canvas =  React.createRef();
      }

    componentDidMount() {

        // TODO call the api for the barrier points + Left/Right

        // Draw on the canvas
        this.ctx = this.canvas.current.getContext("2d");
        this.drawFrontier()
    }

    render(){
        this.drawFrontier()
        return (
            <Box>
                <Box sx={{display: "flex", justifyContent: "center", m:2}}>
                    <canvas ref={this.canvas} width="1000" height="500" style={{border:"1px solid #000000"}}
                    onClick={this.onMouseClick.bind(this)}></canvas>
                </Box>
                
                <Box sx={{display: "flex", gap:5, justifyContent: "space-between", alignItems: "center"}}>

                    <Box sx={{display: this.state.isEdition ? 'block': 'none'}}>
                        <Button variant="outlined"  onClick={()=> this.onClickCancel()}>{'Cancel'}</Button>
                    </Box>

                    <Box>
                        <Button variant="outlined" sx={{display: this.state.isEdition ? 'block': 'none'}} onClick={()=> this.onClickValidate()}>{'Validate'}</Button>
                        <Button variant="outlined" sx={{display: this.state.isEdition ? 'none': 'block'}} onClick={()=> this.onClickEdition()}>{'Edit'}</Button>
                    </Box>

                    <Box>
                        <Button sx={{display: this.state.isEdition ? "block":"none"}} variant="outlined" onClick={()=> this.onClickSwitchArea()}>Switch area</Button>
                    </Box>
                    
                    <Box>
                        <Box sx={{backgroundColor: 'rgb(14, 0, 255,0.3)', border: "1px solid black",
                                display: "flex", justifyContent: "center", alignItems: "center", p: "5px"}}>
                            Inside
                        </Box>
                        <Box sx={{border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", p: "5px"}}>
                            Outside
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    /**
     * Active the edition of the frontier
     */
    onClickEdition(){
        this.setState({isEdition: true, isFirstPoint: true});
    }

    /**
     * 
     * Validate the edition and send to the backend
     */
    onClickValidate(){
        this.setState({isEdition: false});
        // Send the value to babck end with API
        //TODO
    }

    /**
     * 
     * Cancel the edition and reload initals value
     */
     onClickCancel(){
        this.setState({isEdition: false});
        // Call the api to have back the barrier
        //TODO
        
    }
    
    /**
     * Switch the two different area
     */
     onClickSwitchArea(){
        this.setState({isRightDirection: !this.state.isRightDirection})
    }

    /**
     * Click on the canvas to change the frontier if the edition is activated
     * @param {*} event 
     * @returns 
     */
    onMouseClick(event){
        if (!this.state.isEdition) return;
        let x = "x1";
        let y = "y1";
        if (!this.state.isFirstPoint){
            x = "x2";
            y="y2";
        }
        this.setState({[x]: event.nativeEvent.offsetX, [y]: event.nativeEvent.offsetY, isFirstPoint: !this.state.isFirstPoint})
    }

    /**
     * Draw the frontier inside the canvas
     * @returns 
     */
    drawFrontier(){
        if (!this.ctx) return;


        let x1 = this.state.x1;
        let y1 = this.state.y1;
        let x2 = (this.state.x2 === this.state.x1)&&(this.state.y2 === this.state.y1)?0: this.state.x2;
        let y2 = this.state.y2;
        
        let sides = [
            {x1:0,y1:0, x2: this.canvas.current.width, y2: 0},
            {x1:this.canvas.current.width,y1:0, x2: this.canvas.current.width, y2: this.canvas.current.height},
            {x1:this.canvas.current.width,y1:this.canvas.current.height, x2: 0, y2: this.canvas.current.height},
            {x1:0,y1:this.canvas.current.height, x2: 0, y2: 0}];
        
        let intersections = []

        for (const side of sides){
            const intersection = this.intersection(x1,y1, x2, y2, side.x1, side.y1, side.x2, side.y2);
            if (intersection !== null) intersections.push(intersection);
        }
        this.ctx.clearRect(0,0,this.canvas.current.width,this.canvas.current.height);
        this.ctx.beginPath()
        this.ctx.moveTo(intersections[0].x, intersections[0].y);
        this.ctx.lineTo(intersections[1].x, intersections[1].y);
        this.ctx.stroke();

        const isInsideSide = (point,side) => {
            return ((Math.abs(side.x1 - point.x)<0.001 && Math.abs(side.x1 - side.x2)<0.001)||(Math.abs(side.y1 - point.y)<0.001 && Math.abs(side.y1 - side.y2)<0.001))
        };
        let indexFirstSide = 0;
        let indexLastSide = 0;
        let firstIntersection = intersections[this.state.isRightDirection?0:1];
        let lastIntersection = intersections[this.state.isRightDirection?1:0];

        
        for (let [index, side] of sides.entries()){
            if (isInsideSide(firstIntersection, side)) indexFirstSide = index;
            if (isInsideSide(lastIntersection, side)) indexLastSide = index;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(firstIntersection.x, firstIntersection.y);
        for (let i = indexFirstSide; i%4 !== indexLastSide; i++){
            this.ctx.lineTo(sides[i%4].x2, sides[i%4].y2);
        }
        this.ctx.lineTo(lastIntersection.x, lastIntersection.y);
        this.ctx.fillStyle = 'rgb(14, 0, 255,0.3)';
        this.ctx.fill();
    }

    /**
     * Calculate the coordinates of the intersection between the line AB and the segment CD
     * @returns coordinates of the intersection
     */
    intersection(xa, ya, xb, yb, xc, yc, xd, yd){
        let det = (xb - xa)*(yc - yd) - (xc - xd)*(yb - ya)
        if (det === 0) return null;

        let t1 = ((xc - xa)*(yc - yd) - (xc - xd)*(yc - ya))/det;
        let t2 = ((xb - xa)*(yc - ya) - (xc - xa)*(yb - ya))/det;

        if (t2<=0 || t2>1) return null;
        
        return ({x: xa+t1*(xb-xa), y: ya+t1*(yb-ya)});
    }
}

export default CameraConfiguration;