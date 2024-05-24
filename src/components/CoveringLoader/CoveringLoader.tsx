import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

const CoveringContainer = styled('div')(() => ({
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.36)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    animationDelay: '1s',
}));

function CoveringLoader() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 300);
    }, []);

    return isVisible ? (
        <CoveringContainer>
            <CircularProgress size={64} />
        </CoveringContainer>
    ) : null;
}

export default CoveringLoader;