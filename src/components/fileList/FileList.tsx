import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getFileList} from "../../api";
import {File} from "../../interfaces/File";
import FileCard from "../fileCard/FileCard";
import {
    Grid,
    Table,
    Typography,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    useMediaQuery,
    Box
} from "@mui/material";
import {FileProperty} from "../../types/FileProperty";
import DownloadLink from "../../downloadLink/DownloadLink";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileList({ setSnackbarOption }: Props) {
    const [files, setFiles] = useState<File[] | null>(null);
    const mobileView = useMediaQuery('(max-width: 1100px)');

    useEffect(() => {
        getFileList().then((response) => {
            setFiles(response.data);
        }).catch((error) => {
            setSnackbarOption({ snackbar: { open: true },  alert: { severity: 'error' }, content: error.message});
        });
    }, [setSnackbarOption]);

    const propsToDisplay: FileProperty[] = ['fileName', 'fileType', 'fileSize', 'compressRatio', 'compressedFileSize', 'compressedFileData'];

    const fileTile = <Box width={'100%'}>
        <Grid
            gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
            display={'grid'}
            gap={3}
            padding={3}
        >
            {files?.map((file: File) => (
                <FileCard file={file} key={file.id}/>
            ))}
        </Grid>
    </Box>

    const filesTable =
        <Table sx={{maxWidth: '1000px'}}>
            <TableHead>
                <TableRow>
                    {propsToDisplay.map((item: string) => (
                        item === 'compressedFileData' ?
                            <TableCell key={item} padding={'checkbox'} align={'center'}/> :
                            <TableCell key={item} align={'center'} sx={{textTransform: "capitalize"}}>
                                <Typography variant="body2" fontFamily={'"Raleway", cursive'} fontWeight={600} fontSize={'1rem'}>
                                    {item.replace(/([A-Z])/g, " $1")}
                                </Typography>
                            </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {files?.map((file: File) => (
                    <TableRow key={file.id}>
                        {propsToDisplay.map((item: FileProperty) => (
                            item === 'compressedFileData' ?
                                <TableCell key={item} align={'center'}>
                                    <DownloadLink href={file.compressedFileData} name={`Compressed-${file.fileName}`}/>
                                </TableCell> :
                                <TableCell key={item} align={'center'}>
                                    {file[item]}
                                </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>;

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
