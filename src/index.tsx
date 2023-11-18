import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';



import "./index.css";
import App from "./App";

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

let theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontSize: 16,
		mini: {
			fontSize: "0.7rem",
			fontWeight: "bold",
		},
	},
});

theme = createTheme(theme, {
	palette: {
		phaseConsulting: theme.palette.augmentColor({
			color: {
				main: "#965794",
			},
			name: "phaseConsulting",
		}),
		phaseRampUp: theme.palette.augmentColor({
			color: {
				main: "#7E75B8",
			},
			name: "phaseRampUp",
		}),
		phaseDevelopment: theme.palette.augmentColor({
			color: {
				main: "#5D90CC",
			},
			name: "phaseDevelopment",
		}),
		phaseRampDown: theme.palette.augmentColor({
			color: {
				main: "#46A8D1",
			},
			name: "phaseRampDown",
		}),
		phaseMaintenance: theme.palette.augmentColor({
			color: {
				main: "#55BCCB",
			},
			name: "phaseMaintenance",
		}),
	},
});

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
				<CssBaseline />
				<App />
			</LocalizationProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
