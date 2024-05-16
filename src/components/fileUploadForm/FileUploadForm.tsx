import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {uploadFile} from "../../api";
import getBase64 from "../../utils/getBase64";
import {FileUploadFormData} from "../../interfaces/FileUploadFormData";

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

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileUploadForm({ setSnackbarOption }: Props) {
    const [form, setForm] = React.useState<FileUploadFormData>({compressRatio: 0, file: undefined});

    const onFormChange = (e: SelectChangeEvent) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, file: e.target.files ? e.target.files[0] : undefined});
    };

    const availableCompressionRatios = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (form?.file) {
            getBase64(form.file).then((fileInBase64) => {
                uploadFile({
                    compressRatio: form.compressRatio,
                    fileData: fileInBase64,
                    fileName: form!.file!.name,
                    fileType: form!.file!.type,
                    fileSize: form!.file!.size,
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    setSnackbarOption({snackbar: { open: true },  alert: { severity: 'error' }, content: error.message});
                });
            });
        }
    };

    return (
        <Container>
        <Box className="fileUploadForm" sx={{display: 'flex', flexFlow: 'column', maxWidth: '300px', gap: '16px'}}>
            <form onSubmit={onSubmit}>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="compressionRatioSelectLabel">Compress ratio</InputLabel>
                    <Select
                        labelId="compressionRatioSelectLabel"
                        id="compressionRatioSelect"
                        type={"number"}
                        name={"compressRatio"}
                        onChange={onFormChange}
                        value={form?.compressRatio.toString()}
                    >
                        {availableCompressionRatios.map((ratio) => (
                            <MenuItem key={ratio} value={ratio}>{ratio}</MenuItem>)
                        )}
                    </Select>
                </FormControl>

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

export default FileUploadForm;
