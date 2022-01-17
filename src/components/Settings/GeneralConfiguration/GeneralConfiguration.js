import { Box, Button } from '@mui/material';
import * as React from 'react';
import { FormControl, FormGroup, TextField, Typography } from '@mui/material';

class GeneralConfiguration extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            areaName: "",
            maximumPersons: 0,
            editionAreaName: "",
            editionMaximumPersons: 0,
            isEdit: false
        }

    }

    componentDidMount() {
        // TODO : Call the API to have the name, the maximum number of persons
        setTimeout(() => {
            this.setState({
                areaName: "Museu Nacional d'Art de Catalunya",
                maximumPersons: 60
            })
        }, 100)
    }

    render() {

        return (
            <div>
                <FormControl fullWidth={true}>
                    <FormGroup sx={{ display: "flex", gap: 3, m: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>
                                Place name :
                            </Typography>
                            <Typography sx={{ display: this.state.isEdit ? "none" : "block" }}>
                                {this.state.areaName}
                            </Typography>
                            <Box sx={{ display: this.state.isEdit ? "block" : "none" }}>
                                <TextField label="Place name" variant="outlined" sx={{ m: 1, width: 500 }}
                                    value={this.state.editionAreaName}
                                    onChange={this.handleChange.bind(this)}
                                    name="nameArea"></TextField>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>
                                Maximum occupation :
                            </Typography>
                            <Typography sx={{ display: this.state.isEdit ? "none" : "block" }}>
                                {this.state.maximumPersons}
                            </Typography>
                            <Box sx={{ display: this.state.isEdit ? "block" : "none" }}>
                                <TextField label="Capacity" variant="outlined" sx={{ m: 1, width: 500 }}
                                    value={this.state.editionMaximumPersons}
                                    onChange={this.handleChange.bind(this)}
                                    type="number"
                                    name="maxOccupation" ></TextField>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button onClick={() => this.edit()} sx={{ display: this.state.isEdit ? "none" : "block" }} variant="outlined">Edit</Button>
                            <Button onClick={() => this.cancel()} sx={{ display: this.state.isEdit ? "block" : "none" }} variant="outlined">Cancel</Button>
                            <Button onClick={() => this.validate()} sx={{ display: this.state.isEdit ? "block" : "none" }} variant="outlined">Validate edition</Button>
                        </Box>

                    </FormGroup>
                </FormControl>
            </div>
        )
    }

    handleChange(event){
        switch (event.target.name){
            case "maxOccupation":
                this.setState({editionMaximumPersons: event.target.value});
                break;
            case 'nameArea':
                this.setState({editionAreaName: event.target.value});
                break;
            default:
                break;
        }
        
    };

    edit() {
        this.setState({
            isEdit: true,
            editionAreaName: this.state.areaName,
            editionMaximumPersons: this.state.maximumPersons
        });
        //TODO
    }

    cancel() {
        this.setState({ isEdit: false });
    }

    validate() {
        this.setState({
            isEdit: false,
            areaName: this.state.editionAreaName,
            maximumPersons: this.state.editionMaximumPersons
         });
        //TODO send to the backend

        // Call the api to get again
    }
}


export default GeneralConfiguration;