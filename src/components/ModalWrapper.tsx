import { Card, CardContent, Modal, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";

const modalStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "auto",
	minWidth: "50%",
	maxWidth: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2,
};


interface ModalWrapperProps {
    onClose: () => void;
}

const ModalWrapper = (props: PropsWithChildren<ModalWrapperProps>) => {
	
    const { onClose } = props;
	
	return (
		<Modal open={true} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Card sx={modalStyle} elevation={5}>
                {props.children}
			</Card>
		</Modal>
	);
};

export default ModalWrapper;
