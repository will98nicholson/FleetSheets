import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    FilledInput,
    Input,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Typography,
    TextField,
    Button,
    InputAdornment
} from '@material-ui/core';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import InvoiceModal from '../components/InvoiceModal';
import ServiceTable from '../components/ServiceTable';

const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing( 2 ),
        },
    },
    input: {
        width: '70vw',
        margin: theme.spacing( 1, 2, 1, 0 ),
        [ theme.breakpoints.up( 'md' ) ]: {
            width: '40vw'
        },
        [ theme.breakpoints.up( 'lg' ) ]: {
            width: '20vw'
        }
    },
    TextField: {
        width: '70vw',
        margin: theme.spacing( 1, 2, 1, 0 )
    },
    button: {
        margin: theme.spacing( 2 ),
        width: '7rem'
    },
    container: {
        margin: theme.spacing( 2 )
    },
    break: {
        flexBasis: '100%',
        height: 0
    }
} ) );

export default function JobsForm ( props ) {

    const classes = useStyles();
    const [ formObject, setFormObject ] = useState( {} );
    const location = useLocation();
    const handleInputChange = ( event ) => {
        const { name, value } = event.target;
        setFormObject( { ...formObject, [ name ]: value } );
    };
    useEffect( () => { if(props.id) getJob(); }, [] ); //only run useEffect if coming from jobdetail page

    //set state for invoice modal //handleOpen + handleClose functions
    const [ open, setOpen ] = React.useState( false );
    const handleOpen = () => {
        setOpen( true );
    };
    const handleClose = () => {
        setOpen( false );
    };
    //async api call - get job by id
    const getJob = async () => {
        await axios( {
            method: "GET",
            url: `/api/jobs/${ props.id }`
        } ).then( res => {
            console.log( res.data );
            setFormObject( {
                data: res.data[0]
            } );
            console.log( formObject );
        } ).then( (data) => ( console.log(data)))
            .catch( err => console.log( err ) );
    };
    function handleSubmit ( event ) {
        event.preventDefault();
        props.APIFunction( {
            client: {
                type: formObject.type,
                name: formObject.name,
                location: formObject.location,
                contact: formObject.contact,
                phone: formObject.phone,
                email: formObject.email,
            },

            quote_date: formObject.quote,
            quote_price: formObject.price,
            start_date: formObject.start,
            end_date: formObject.end,

            description: formObject.description,
            notes: formObject.notes
        } )
            .then( ( res ) => console.log( res ) )
            // .then(<Redirect to="/admin"></Redirect>)
            .catch( ( err ) => console.log( err ) );
    };

    return (

        <div className={classes.root} id='jobsform'>
            <form className='form-flex' name="job-details">
                <FormControl className={classes.formControl}>
                    <InputLabel shrink className={classes.formControl} htmlFor="clientName"> Client Name</InputLabel>
                    <FilledInput

                        id="clientName"
                        label='Client Name'
                        name="name"
                        variant="standard"
                        // placeholder="Client Name"
                        // className='form-input-positioning'
                        className={classes.input}
                        value={''}
                        onChange={handleInputChange}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                {/* CLIENT TYPE */}
                <FormControl  className={classes.formControl}>
                    <InputLabel shrink className={classes.formControl} id="clientType">Client Type</InputLabel>
                    <Select
                        id="clientType"
                        label="Client Type"
                        labelId="clientType"
                        name="type"
                        variant="filled"
                        className={classes.input}
                        value={formObject.type}
                        onChange={handleInputChange}
                        disabled={props.inputDisabled}
                        label="Client Type"
                    >
                        <MenuItem value={formObject.type}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Residential"}>Residential</MenuItem>
                        <MenuItem value={"Commercial"}>Commercial</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.break} />

                {/* QUOTE DATE */}
                <FormControl>
                    <InputLabel shrink className={classes.formControl} id="clientType">Quote Date</InputLabel>
                    <TextField variant="filled"
                        id="quoteDate"
                        name="quote"
                        onChange={handleInputChange}
                        type="date"
                        defaultValue={new Date()}
                        className={classes.textField}
                        className={classes.input}
                        value={formObject.quote_date}
                        disabled={props.inputDisabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                {/* QUOTE PRICE */}
                <FormControl>
                    <InputLabel shrink htmlFor="quotePrice">Quote Price</InputLabel>
                    <FilledInput
                        id="quotePrice"
                        name="price"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="standard"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        value={formObject.quote_price}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                <div className={classes.break} />

                {/* JOB START */}
                <FormControl>
                    <InputLabel shrink>Job Start</InputLabel>
                    <TextField variant="filled"
                        id="startDate"
                        name="start"
                        onChange={handleInputChange}
                        type="datetime-local"
                        defaultValue={new Date()}
                        className={classes.textField}
                        className={classes.input}
                        value={formObject.start_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                {/* JOB END */}
                <FormControl>
                    <InputLabel shrink>Job End</InputLabel>
                    <TextField variant="filled"
                        id="endDate"
                        name="end"
                        onChange={handleInputChange}
                        type="datetime-local"
                        defaultValue={new Date()}
                        className={classes.textField}
                        className={classes.input}
                        value={formObject.end_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <div className={classes.break} />
                <hr className='jobform-divider'></hr>
                <div className={classes.break} />

                {/* CONTACT NAME*/}
                <FormControl>
                    <InputLabel shrink htmlFor="contactName">Point of Contact</InputLabel>
                    <FilledInput
                        id="contactName"
                        name="contact"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="standard"
                        // label="Point of Contact"
                        value={formObject.contact}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                {/* CONTACT PHONE */}
                <FormControl>
                    <InputLabel shrink htmlFor="contactPhone">Contact Phone</InputLabel>
                    <FilledInput
                        id="contactPhone"
                        name="phone"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="standard"
                        // label="Contact Phone"
                        value={formObject.phone}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                {/* CONTACT EMAIL */}
                <FormControl>
                    <InputLabel shrink htmlFor="contactEmail">Contact Email</InputLabel>
                    <FilledInput
                        id="contactEmail"
                        name="email"
                        onChange={handleInputChange}
                        className={classes.input}
                        variant="standard"
                        label="Contact Email"
                        value={formObject.email}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                <div className={classes.break} />
                <hr className='jobform-divider'></hr>
                <div className={classes.break} />

                {/* JOB LOCATION / ADDRESS */}
                <FormControl>
                    <InputLabel shrink htmlFor="jobLocation">Site Location</InputLabel>
                    <TextField
                        variant='filled'
                        id="jobLocation"
                        name="location"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        placeholder="123 Lawncare Lane, Greenville, OH 45331"
                        variant="filled"
                        value={formObject.location}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                <div className={classes.break} />

                {/* JOB DESCRIPTION */}
                <FormControl>
                    <InputLabel shrink htmlFor="Description">Job Description</InputLabel>
                    <TextField
                        variant='filled'
                        id="Description"
                        name="description"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        multiline
                        rows={4}
                        placeholder="Describe Approved Work"
                        variant="filled"
                        value={formObject.description}
                        disabled={props.inputDisabled}
                    />
                </FormControl>

                <div className={classes.break} />

                <Typography variant="body1">Notes:</Typography>
                {/* JOB NOTES */}
                <FormControl>
                    <TextField
                        id="notes"
                        name="notes"
                        onChange={handleInputChange}
                        className={classes.TextField}
                        multiline
                        rows={4}
                        placeholder="Directions, special considerations, etc."
                        variant="filled"
                        value={formObject.notes}
                    />
                </FormControl>
                <ServiceTable jobData={formObject.data} />
                <div className={classes.break} />

                {/* SAVE / SUBMIT BUTTON */} {/* for create job */}
                {/* passing user status to add job button - '&&' is a way to short circut and escape the turnary operator as we don't want to render anything in it's place */}
                {props.user?.type === 'Administrator' && <Button id='add-job-btn' className={classes.button} variant="contained" onClick={handleSubmit}>
                    Add Job
                </Button>}
                {/* if create job submit to database - if job detail create invoice */}
                <Button id='invoice-btn' className={classes.button} variant="contained" onClick={ handleOpen }>
                    Create Invoice
                </Button>
                <InvoiceModal open={open} handleClose={handleClose} formObject={formObject}/>
            </form>
        </div>
    );
};
