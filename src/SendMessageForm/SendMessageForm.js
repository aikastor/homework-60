import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const SendMessageForm = (props) => {
    return (
            <form onSubmit={props.onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField required
                                   placeholder="Enter your message"
                                   label="Message text"
                                   multiline
                                   variant='outlined'
                                   rows='4'
                                   autoFocus={true}
                                   onChange={props.onChange}
                                   value={props.value}
                                    fullWidth/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button type='submit'
                                color="primary"
                                variant='contained'>
                            Add</Button>
                        </Grid>
                </Grid>

            </form>
    );
};

export default SendMessageForm;