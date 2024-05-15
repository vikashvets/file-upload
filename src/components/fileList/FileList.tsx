import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getFileList} from "../../api";
import {File} from "../../interfaces/File";
import {Card, CardActions, CardContent, Typography} from "@mui/material";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileList({ setSnackbarOption }: Props) {
    const [files, setFiles] = useState<File[] | null>(null);

    useEffect(() => {
        getFileList().then((response) => {
            setFiles(response.data);
        }).catch((error) => {
            setSnackbarOption({ open: true, message: error.message, severity: 'error' });
        });
    }, [setSnackbarOption]);

    return (
         files && files.map((file: File) => (<Card sx={{ minWidth: 275 }} key={file.id}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {file.fileName}
                </Typography>
                <Typography variant="body2">
                    {file.fileType}
                </Typography>
                <Typography variant="body2">
                    {file.fileSize}
                </Typography>
                <CardActions></CardActions>
            </CardContent>
        </Card>))
    );
}

export default FileList;
