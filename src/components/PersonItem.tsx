import { Box, Button, Card } from "@mui/material";
import { Person } from "../models/People";



const PersonItem = ({ person, onUpdate, onRemove }: {person: Person, onUpdate: (p: Person) => void, onRemove: (p: Person) => void}) => {


    return (
        <Box>
            {person.name || person.id} | 
            {person.roles.join(", ")} |
            <Button onClick={() => onRemove(person)}>Del</Button>
        </Box>
    )
}

export default PersonItem;

