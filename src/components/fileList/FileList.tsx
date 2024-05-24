import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
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
import {PaginationData} from "../../interfaces/PaginationData";
import Pagination from "../pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import {PaginatedListResponse} from "../../interfaces/PaginatedListResponse";
import {SnackbarConfig} from "../../interfaces/SnackbarConfig";
import CoveringLoader from "../CoveringLoader/CoveringLoader";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<SnackbarConfig>>
}

function FileList({ setSnackbarOption }: Props) {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        perPage: 10
    });

    const { data, error, loading} = useFetch<PaginatedListResponse<File>, PaginationData>(
        getFileList,
        pagination,
        [pagination]
    );

    const mobileView = useMediaQuery('(max-width: 1100px)');

    const onPaginationClick = useCallback((page: number) => {
        setPagination({...pagination, page});
    }, [pagination]);

    if (error) { setSnackbarOption({ snackbar: { open: true },  alert: { severity: 'error' }, content: error.message}) }

    const propsToDisplay: FileProperty[] = ['fileName', 'fileType', 'fileSize', 'compressRatio', 'compressedFileSize', 'compressedFileData'];

    const fileTile = <Box width={'100%'}>
        <Grid
            gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
            display={'grid'}
            gap={3}
            padding={3}
        >
            {data?.list.map((file: File) => (
                <FileCard file={file} key={file.id}/>
            ))}
        </Grid>
    </Box>

    const filesTable =
        <Box maxWidth={'1000px'} width={'100%'} minHeight={'670px'}>
        <Table>
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
                {data?.list.map((file: File) => (
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
        </Table>
        </Box>

    return (
        <>
            <Typography variant="h4" component="h1" align="center" margin={'32px 16px'} fontFamily={'"Raleway", cursive'} >
               Already uploaded files
            </Typography>
            {loading && <CoveringLoader/>}
            {mobileView ? fileTile : filesTable}
            <Pagination pagination={data?.pagination} onPaginationClick={onPaginationClick}/>
        </>
    );
}

export default FileList;
