import { Button } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

const SaveButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="contained" size="small" color="primary" onClick={onClick} startIcon={<SaveIcon />}>
			Save
		</Button>
	);
};

export default SaveButton;
