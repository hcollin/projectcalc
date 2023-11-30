import { Box, Button, Card, CardActionArea, CardContent, IconButton, Modal, Stack, Typography } from "@mui/material";

import { useState } from "react";

import CancelButton from "./CancelButton";

import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "auto",
	bgcolor: "background.paper",
	// border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	padding: "1rem",
};

const RemoveButton = ({ onClick, noText, disabled }: { onClick: () => void, noText?: boolean, disabled?: boolean }) => {
	const [modelState, setModelState] = useState<boolean>(false);

	const doNotShowText = noText || false;
	const isDisabled = disabled || false;

	function clickRemove() {
		setModelState(true);
	}

	function confirmRemove() {
		onClick();
		setModelState(false);
	}

	function cancelRemove() {
		setModelState(false);
	}

	return (
		<>
			{!doNotShowText && <Button variant="outlined" size="small" color="error" onClick={clickRemove} startIcon={<DeleteIcon />} disabled={isDisabled}>
				Remove
			</Button>}
			{doNotShowText && <IconButton onClick={clickRemove} size="small" color="error" disabled={isDisabled}>
				<DeleteIcon />
			</IconButton>}
			<Modal open={modelState}>
				<Card elevation={5} sx={style}>
					<CardContent>
						<Stack direction="row" spacing={2} justifyContent="flex-start">
							<WarningIcon fontSize="large" color="warning" />
							<Typography variant="h5" component="div" color="default">
								Are you sure?
							</Typography>
						</Stack>
					</CardContent>
					<CardActionArea>
						<CardContent>
							<Stack direction="row" spacing={2} justifyContent="flex-end">
								<CancelButton onClick={cancelRemove} />
								<Button variant="contained" size="small" color="error" onClick={confirmRemove} startIcon={<DeleteIcon />}>
									Confirm
								</Button>
							</Stack>
						</CardContent>
					</CardActionArea>
				</Card>
			</Modal>
		</>
	);
};

export default RemoveButton;
