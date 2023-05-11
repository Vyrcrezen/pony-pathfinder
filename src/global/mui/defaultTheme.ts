import { createTheme } from "@mui/material/styles";

const getCssVar = (name: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: `${getCssVar("--vy-sys-color-primary")}`,
        },
        text: {
            primary: `${getCssVar("--vy-sys-color-on-primary")}`,
        },
    },
});

export default defaultTheme;
