import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { createOwners, updateOwners } from '../services/ownerService'
import { useState, useEffect } from 'react'

const OwnerModal = ({ modalOpen, setModalOpen, selectedOwner }) => {

    const isCreate = selectedOwner.id === undefined
    const [formdata, setFormData] = useState({ name: "", phone: "" })


    useEffect(() => {

        setFormData({ name: selectedOwner.name || "", phone: selectedOwner.phone || "" })

    }, [selectedOwner, setModalOpen])

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
                await createOwners(formdata)

            }else
            {
                await updateOwners(selectedOwner.id, formdata)

            }
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography>{isCreate ? "Creating Owner" : "Updating Owner"}</Typography>
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
                        label="Phone"
                        value={formdata.phone}
                        onChange={(e) =>
                            setFormData({ ...formdata, phone: e.target.value })
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

export default OwnerModal