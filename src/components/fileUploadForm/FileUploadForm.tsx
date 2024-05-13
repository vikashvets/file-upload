import React, {ChangeEvent, FormEvent} from "react";
import {Box, Button, Container, TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {uploadFile} from "../../api";
import getBase64 from "../../utils/getBase64";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function FileUploadHome() {
    const [form, setForm] = React.useState<FileUploadFormData>();

    const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setForm({...form, file: e.target.files[0]});
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (form) {
            getBase64(form.file).then((fileInBase64) => {
                uploadFile({...form, file: fileInBase64}).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    };

    return (
        <Container>
        <Box className="fileUploadForm" sx={{display: 'flex', flexFlow: 'column', maxWidth: '300px', gap: '16px'}}>
            <form onSubmit={onSubmit}>
            <TextField
                label="Compress ratio"
                variant="outlined"
                type={"number"}
                name={"compressRatio"}
                onChange={onFormChange}
            />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" name={'file'} onChange={onFileChange}/>
            </Button>

            <Button
                type={"submit"}
            >
                Save
            </Button>
            </form>
        </Box>
        </Container>
    );
}

export default FileUploadHome;
