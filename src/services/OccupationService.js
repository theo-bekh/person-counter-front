class OccupationService{

    constructor(callback){
        this.callback = callback;
        this.initializeWebSocket();
    }

    initializeWebSocket(){
        setTimeout(()=>{
            this.updateValue(25,50)

            // Simulate modification from websocket
            this.interval = setInterval(()=>{
                let rd = Math.random()>0.5 ? 1: -1; 
                this.updateValue(this.occupation+rd, this.maxOccupation);
            }, 1000)
        },100);
        
    }

    destroy(){
        clearInterval(this.interval)   
    }

    updateValue(occupation, maxOccupation){
        this.occupation = occupation;
        this.maxOccupation = maxOccupation;
        this.callback();
    }

    addPerson(){
        //send to the WebSocket

        //Update Value
        this.updateValue(this.occupation+1, this.maxOccupation);
    }

    removePerson(){
        //send to the WebSocket

        //Update Value
        this.updateValue(this.occupation-1, this.maxOccupation);
    }

}

export default OccupationService;