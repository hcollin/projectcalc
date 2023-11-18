import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const ErrorNotification = ({ message, onClose }: { message: string | null; onClose: () => void }) => {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (message !== null && message.length > 0) setOpen(true);
		else setOpen(false);
	}, [message]);

	function handleClose() {
		onClose();
		setOpen(false);
	}

	return <Snackbar open={true} autoHideDuration={5000} onClose={handleClose} message={message} />;
};

export default ErrorNotification;
