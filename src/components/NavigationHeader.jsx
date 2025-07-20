import {AppBar, Button, Toolbar} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NavigationHeader = () => {

    const navigate = useNavigate()

    return (
        <AppBar position='static'>
            <Toolbar>
                <Button onClick={() => {navigate("/pets")}} color='white'>Pets</Button>
                <Button onClick={() => {navigate("/vets")}} color='white'>Vets</Button>
                <Button onClick={() => {navigate("/owners")}} color='white'>Owners</Button>
                <Button onClick={() => {navigate("/appointments")}} color='white'>Appointments</Button>
            </Toolbar>

        </AppBar>
        
    )
}

export default NavigationHeader