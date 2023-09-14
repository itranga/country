import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { Tool } from '@prisma/client';
import gql from 'graphql-tag';
import { QUERY_TOOLS } from 'src/pages/index';
import React, { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateToolMutation } from 'src/server/graphql/gen/graphql-types';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const MUTATION_CREATE_TOOL = gql`
    mutation CreateTool($name: String!, $description: String!, $link: String!, $image: String) {
        createOneTool(data: { name: $name, description: $description, link: $link, image: $image }) {
            id
        }
    }
`;

export type ToolForm = Omit<Tool, 'id'>;

export default function ToolDialog({ open, onClose }: Props): ReactElement {
    const { handleSubmit, reset, control } = useForm<ToolForm>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            link: '',
        },
    });
    const [createTool] = useCreateToolMutation();

    const onSubmit = async (values: ToolForm) => {
        const { name, description, image, link } = values;
        await createTool({ variables: { name, description, link, image }, refetchQueries: [{ query: QUERY_TOOLS }] });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{`Create Country`}</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container alignItems="center" justifyContent="center" direction="column">
                        <Grid item xs={12} style={{ margin: '0 0 1em 0' }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        variant="outlined"
                                        required
                                        margin="dense"
                                        autoFocus={true}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        rows={4}
                                        required
                                        multiline
                                        variant="outlined"
                                        label="Description"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        variant="outlined"
                                        label="Image link"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="link"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        required
                                        variant="outlined"
                                        label="youtube"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={() => reset()} type="reset" color="secondary" variant="contained">
                        RESET
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        SUBMIT
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
