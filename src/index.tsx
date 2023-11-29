import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

import "./index.css";
import App from "./App";
import ToggleColorMode from "./ToggleColorMode";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

declare module "@mui/material/styles" {
	interface TypographyVariants {
		mini: React.CSSProperties;
	}
	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		mini?: React.CSSProperties;
	}
}

declare module "@mui/material/styles" {
	interface Palette {
		custom: Palette["primary"];
	}

	interface PaletteOptions {
		custom?: PaletteOptions["primary"];
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		mini: true;
	}
}

root.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
			<ToggleColorMode />
			{/* <ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider> */}
		</LocalizationProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
