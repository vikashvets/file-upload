import {File} from "../../interfaces/File";
import {Box, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import ExpandComponent from "../../expandComponent/ExpandComponent";
import {FileProperty} from "../../types/FileProperty";
import DownloadLink from "../../downloadLink/DownloadLink";
import React from "react";

interface Props  {
    file: File
}

function FileList({ file }: Props) {
    const propsToDisplay: FileProperty[] = ['fileType', 'fileSize', 'compressRatio'];

    return (
        <Card
            key={file.id}
            sx={{borderRadius: '4px', border: '1px solid', borderColor: 'border.main' }}
        >
            <Typography fontWeight={'600'} textTransform={'capitalize'} pt='2' fontSize='xs' padding={2}>
                {file.fileName}
            </Typography>
            <CardContent>
                <Grid
                    gridTemplateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
                    gap={2}
                >
                    <Box padding={'0px 8px 24px 8px'}>
                    {propsToDisplay.map((item: FileProperty) => (
                        <Box key={item} alignItems={'center'} display={'flex'}>
                            <Typography fontWeight={'600'} textTransform={'capitalize'} key={item} pt='2' fontSize='xs'>
                                {`${item}:`}
                            </Typography>
                            <Typography paddingLeft={1} pt='2' fontSize='xs' fontWeight={'200'}>
                                { file[item]}
                            </Typography>
                        </Box>
                    ))}
                    </Box>
                    <Divider/>
                    <ExpandComponent>
                        <Box display={'flex'} alignItems={'center'} gap={1}>
                        <Typography variant="body2">
                            {file.compressedFileData ?
                                `Compressed file is ready for download, compressed file size - ${file.compressedFileSize}` :
                                'Processing in progress: compressed file will be available for download soon.'}
                        </Typography>
                        {file.compressedFileData &&
                            <DownloadLink href={file.compressedFileData} name={`Compressed-${file.fileName}`}/>
                        }
                        </Box>
                    </ExpandComponent>
                </Grid>
            </CardContent>
        </Card>)
}

export default FileList;
