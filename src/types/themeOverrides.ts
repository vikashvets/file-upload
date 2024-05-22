declare module '@mui/material/styles' {
    interface Palette {
        transparentBlack: Palette;
        transparentWhite: Palette;
        border : Palette;

    }

    interface PaletteOptions {
        transparentBlack?: PaletteOptions['primary'];
        transparentWhite?: PaletteOptions['primary'];
        border?: PaletteOptions['primary'];
    }
}

export {};