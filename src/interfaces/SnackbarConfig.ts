export interface SnackbarConfig {
    snackbar?: {
        open?: boolean,
        autoHideDuration?: number,
        onClose?: () => void
    }
    alert?: {
        severity?: "error" | "warning" | "info" | "success",
        variant?: "filled" | "outlined" | "standard",
    },
    content?: string | JSX.Element,
}

