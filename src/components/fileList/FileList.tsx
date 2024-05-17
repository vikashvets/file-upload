import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getFileList} from "../../api";
import {File} from "../../interfaces/File";
import FileCard from "../fileCard/FileCard";
import {
    Grid,
    Table,
    Typography,
    TableHead,
    TableBody, TableRow,
    TableCell,
    useMediaQuery
} from "@mui/material";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileList({ setSnackbarOption }: Props) {
    const [files, setFiles] = useState<File[] | null>(null);
    const mobileView = useMediaQuery('(max-width: 1100px)');

    const propsToDisplay = ['fileType', 'fileSize', 'compressRatio'];

    const fileTile = <Grid
        gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
    >
        {files?.map((file: File) => (
            <FileCard file={file} key={file.id}/>
        ))}
    </Grid>

    const filesTable =
        <Table sx={{maxWidth: '1000px'}}>
            <TableHead>
                <TableRow>
                    {propsToDisplay.map((item: string) => (
                        <TableCell key={item}>{item}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {files?.map((file: File) => (
                    <TableRow key={file.id}>
                        {propsToDisplay.map((item: string) => (
                            // @ts-ignore
                            <TableCell key={item}>{file[item]}</TableCell>
                        ))}

                    </TableRow>
                ))}
            </TableBody>
        </Table>;

    useEffect(() => {
        getFileList().then((response) => {
            setFiles(response.data);
        }).catch((error) => {
            setSnackbarOption({ snackbar: { open: true },  alert: { severity: 'error' }, content: error.message});
        });
    }, [setSnackbarOption]);

    return (
        <>
            <Typography variant="h4" component="h1" align="center" margin={'32px 16px'} fontFamily={'"Raleway", cursive'} >
               Already uploaded files
            </Typography>
            {mobileView ? fileTile : filesTable}
        </>
    );
}

export default FileList;
