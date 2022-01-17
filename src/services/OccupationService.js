class OccupationService{

    constructor(callback){
        this.callback = callback;
        this.initializeWebSocket();
    }

    initializeWebSocket(){
        // Simulate the load of websocket
        setTimeout(()=>{
            this.updateValue(25,50)
            // Fake websocket sending data each second
            this.interval = setInterval(()=>{
                // New data from the websocket
                let rd = Math.random()>0.5 ? 1: -1;
                // Update the different value 
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
        //send to the WebSocket the modification

        //Update Value TO REMOVE
        this.updateValue(this.occupation+1, this.maxOccupation);
    }

    removePerson(){
        //send to the WebSocket the modification

        //Update Value TO REMOVE
        this.updateValue(this.occupation-1, this.maxOccupation);
    }

    

}

export default OccupationService;