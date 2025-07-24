import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { createVets, updateVets } from '../services/vetService'
import { useState, useEffect } from 'react'

const VetModal = ({ modalOpen, setModalOpen, selectedVet }) => {

    const isCreate = selectedVet.id === undefined
    const [formdata, setFormData] = useState({ name: "", phone: "" })


    useEffect(() => {

        setFormData({ name: selectedVet.name || "",specialization: selectedVet.specialization || "" , image: selectedVet.image || ""})

    }, [selectedVet, setModalOpen])

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 250,
        height: 250,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 1,
        boxShadow: 24

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isCreate) {
                await createVets(formdata)

            } else {
                await updateVets(selectedVet.id, formdata)

            }
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography>{isCreate ? "Creating Vet" : "Updating Vet"}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={formdata.name}
                        onChange={(e) =>
                            setFormData({ ...formdata, name: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    
                    <TextField
                        label="Specialization"
                        value={formdata.species}
                        onChange={(e) =>
                            setFormData({ ...formdata, specialization: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                     
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formdata, image: e.target.files[0] })}
                        style={{ marginBottom: '16px' }}
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

export default VetModal