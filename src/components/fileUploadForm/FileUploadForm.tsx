import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, Typography,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {uploadFile} from "../../api";
import getBase64 from "../../utils/getBase64";
import {FileUploadFormData} from "../../interfaces/FileUploadFormData";
import FileUpload from "../fileUpload/FileUpload";
import InputSubtitle from "../inputSubtitle/InputSubtitle";

const styles = {
    card: {
        minWidth: '300px',
        maxWidth: '420px',
        margin: '32px',
        height: '100%',
        padding: '32px 0',
    },
    form: {
        paddingTop: '48px',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        alignItems: 'center'
    },
    textFieldWrapper: {
        display: 'flex',
        flexFlow: 'column',
        rowGap: '40px',
        maxWidth: '255px',
        minHeight: '230px',
    },
};

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
            <Card sx={styles.card}>
                <CardContent sx={{padding: 0}}>
                    <Typography variant="h4" component="h1" align="center" padding={'0px 16px'} fontFamily={'"Raleway", cursive'} >
                        Compress your heavy files with us!
                    </Typography>
                    <form style={styles.form} onSubmit={onSubmit}>
                        <Box sx={styles.textFieldWrapper}>
                            <FormControl>
                                <InputLabel id="compressionRatioSelectLabel">Compress ratio</InputLabel>
                                <Select
                                    labelId="compressionRatioSelectLabel"
                                    id="compressionRatioSelect"
                                    type={"number"}
                                    label={"Compress ratio"}
                                    name={"compressRatio"}
                                    onChange={onFormChange}
                                    value={form?.compressRatio.toString()}
                                    sx={{width: '100%', marginBottom: '8px'}}
                                >
                                    {availableCompressionRatios.map((ratio) => (
                                        <MenuItem key={ratio} value={ratio}>{ratio}</MenuItem>)
                                    )}
                                </Select>
                                <InputSubtitle>
                                    Select compression level from 0 (fastest, largest) to 9 (slowest, smallest)
                                </InputSubtitle>
                            </FormControl>
                            <Box>
                                <FileUpload file={form.file} onFileChange={onFileChange}/>
                                <Button
                                    type={'submit'}
                                    sx={{
                                        width: '100%',
                                        padding: '12px',
                                        marginTop: '40px',
                                        backgroundColor: 'secondary.main',
                                        color: 'transparentBlack.dark',
                                        ":hover": {
                                            backgroundColor: 'secondary.dark'
                                        }}
                                    }
                                    variant="contained"
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload file
                                </Button>
                            </Box>
                    </Box>
                    </form>
                </CardContent>
            </Card>
        );
}

export default FileUploadForm;
