import { useEffect, useState } from "react";
import { Box, Button, Card, CardActionArea, CardContent, Modal, Stack, Typography } from "@mui/material";
import CancelButton from "./buttons/CancelButton";

import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import CheckIcon from "@mui/icons-material/Check";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "auto",
	bgcolor: "background.paper",
	// border: "2px solid #000",
	boxShadow: 24,
	p: 0,
    pl: 5,
	m: 0,
};

const ConfirmModal = ({
	onConfirm,
	onCancel,
	open,
	message,
	type,
}: {
	open: boolean;
	message?: string;
	type?: "warning" | "error";
	onConfirm: () => void;
	onCancel: () => void;
}) => {
	const [modalOpen, setModalState] = useState<boolean>(false);

	useEffect(() => {
		
		setModalState(open);
	}, [open]);

	const msg = message || "Are you sure?";

	const bgcolor = type === "warning" ? "warning.dark" : type === "error" ? "error.dark" : "info.dark";

	const btnColor = type === "warning" ? "warning" : type === "error" ? "error" : "primary";

	return (
		<Modal open={modalOpen} onClose={onCancel}>
			<Card elevation={5} sx={style}>
				<Box
					sx={{
						position: "absolute",
                        left: 0,
                        top: 0,
						height: "100%",
						p: 1,
						backgroundColor: `${bgcolor}`,
						borderRight: "solid 2px #0008",
						display: "flex",
						alignItems: "center",
						zÍndex: 1000,
					}}
				>
					{type === "error" && <ErrorIcon fontSize="large" />}
					{type === "warning" && <WarningIcon fontSize="large" />}
					{type !== "error" && type !== "warning" && <HelpIcon fontSize="large" />}
				</Box>

				<CardContent sx={{ m: 2, pl: 4, pt: 4 }}>
					<Stack direction="row" spacing={2} justifyContent="flex-start">
						<Typography variant="h5" component="div" color="default">
							{msg}
						</Typography>
					</Stack>
				</CardContent>

				<CardActionArea sx={{ zIndex: -1 }}>
					<CardContent>
						<Stack direction="row" spacing={2} justifyContent="flex-end">
							<CancelButton onClick={onCancel} />
							<Button variant="contained" size="small" color={btnColor} onClick={onConfirm} startIcon={<CheckIcon />}>
								Confirm
							</Button>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>
		</Modal>
	);
};

export default ConfirmModal;
