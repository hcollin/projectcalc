import { Button } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";

const CancelButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outlined" size="small" color="primary" onClick={onClick} startIcon={<CancelIcon />}>
			Cancel
		</Button>
	);
};

export default CancelButton;
