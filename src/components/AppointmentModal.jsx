import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { createAppointments, updateAppointments } from '../services/appointmentService'
import { useState, useEffect } from 'react'

const AppointmentModal = ({ modalOpen, setModalOpen, selectedAppointment }) => {

    const isCreate = selectedAppointment.id === undefined
    const [formdata, setFormData] = useState({ name: "", phone: "" })


    useEffect(() => {

        setFormData({ date: selectedAppointment.date || "", pet: selectedAppointment.pet || "", vet: selectedAppointment.vet || "" })

    }, [selectedAppointment, setModalOpen])

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 300,
        height: 300,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 1,
        boxShadow: 24

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if(isCreate)
            {
                await createAppointments(formdata)

            }else
            {
                await updateAppointments(selectedAppointment.id, formdata)

            }
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography>{isCreate ? "Creating Appointment" : "Updating Appointment"}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Date(YYYY-MM-DD)"
                        value={formdata.date}
                        onChange={(e) =>
                            setFormData({ ...formdata, date: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Pet Id"
                        value={formdata.pet}
                        onChange={(e) =>
                            setFormData({ ...formdata, pet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Vet Id"
                        value={formdata.vet}
                        onChange={(e) =>
                            setFormData({ ...formdata, vet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                    >Create</Button>
                </form>
            </Box>

        </Modal>
    )
}

export default AppointmentModal