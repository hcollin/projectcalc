import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import React, { createContext } from "react";
// import { ColorModeContext } from ".";
import App from "./App";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// declare module "@mui/material/styles" {
// 	interface TypographyVariants {
// 		mini: React.CSSProperties;
// 	}
// 	// allow configuration using `createTheme`
// 	interface TypographyVariantsOptions {
// 		mini?: React.CSSProperties;
// 	}
// }

// declare module "@mui/material/styles" {
// 	interface Palette {
// 		custom: Palette["primary"];
// 	}

// 	interface PaletteOptions {
// 		custom?: PaletteOptions["primary"];
// 	}
// }

// // Update the Typography's variant prop options
// declare module "@mui/material/Typography" {
// 	interface TypographyPropsVariantOverrides {
// 		mini: true;
// 	}
// }


export default function ToggleColorMode() {
	const [mode, setMode] = React.useState<"light" | "dark">("dark");
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[],
	);

	const theme = React.useMemo(() => {
		console.log("recalc theme:", mode);
		const t = createTheme({
			palette: {
				mode: mode,
			},
			typography: {
				fontSize: 16,
				mini: {
					fontSize: "0.7rem",
					fontWeight: "bold",
				},
			},
		});

		return createTheme(t, {
			palette: {
                accent: t.palette.augmentColor({
                    color: {
                        main: "#f4364c",
                    },
                    name: "accent",
                }),
				phaseConsulting: t.palette.augmentColor({
					color: {
						main: "#965794",
					},
					name: "phaseConsulting",
				}),
				phaseRampUp: t.palette.augmentColor({
					color: {
						main: "#7E75B8",
					},
					name: "phaseRampUp",
				}),
				phaseDevelopment: t.palette.augmentColor({
					color: {
						main: "#5D90CC",
					},
					name: "phaseDevelopment",
				}),
				phaseRampDown: t.palette.augmentColor({
					color: {
						main: "#46A8D1",
					},
					name: "phaseRampDown",
				}),
				phaseMaintenance: t.palette.augmentColor({
					color: {
						main: "#55BCCB",
					},
					name: "phaseMaintenance",
				}),
			},
		});
	}, [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
