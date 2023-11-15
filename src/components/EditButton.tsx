import { Button, IconButton } from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EditButton = ({ onClick, noText }: { onClick: () => void, noText?: boolean }) => {

    const doNotShowText = noText || false;

	return (
		<>
			{!doNotShowText && (
				<Button variant="contained" size="small" color="primary" onClick={onClick} startIcon={<ModeEditIcon />}>
					Edit
				</Button>
			)}
			{doNotShowText && (
				<IconButton onClick={onClick} size="small" color="primary">
					<ModeEditIcon />
				</IconButton>
			)}
		</>
	);
};

export default EditButton;
