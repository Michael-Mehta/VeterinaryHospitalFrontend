import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { createPets, updatePets } from '../services/petService'
import { useState, useEffect } from 'react'

const PetModal = ({ modalOpen, setModalOpen, selectedPet }) => {

    const isCreate = selectedPet.id === undefined
    const [formdata, setFormData] = useState({ name: "", phone: "" })


    useEffect(() => {

        setFormData({ name: selectedPet.name || "", age: selectedPet.age || "", species: selectedPet.species || "" , image: selectedPet.image || ""})

    }, [selectedPet, setModalOpen])

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
            if (isCreate) {
                await createPets(formdata)

            } else {
                await updatePets(selectedPet.id, formdata)

            }
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography>{isCreate ? "Creating Pet" : "Updating Pet"}</Typography>
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
                        label="Age"
                        value={formdata.age}
                        onChange={(e) =>
                            setFormData({ ...formdata, age: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Species"
                        value={formdata.species}
                        onChange={(e) =>
                            setFormData({ ...formdata, species: e.target.value })
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

export default PetModal