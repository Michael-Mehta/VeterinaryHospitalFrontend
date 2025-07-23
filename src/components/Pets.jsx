import { getPets } from '../services/petService'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import PetModal from './PetModal'
import { Button } from '@mui/material'
import { deletePets } from '../services/petService'

const Pets = () => {

    const [pets, setPets] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState({})

    const handleDelete = async (petId) => {

        try {
            const success = await deletePets(petId)

            if (success) {
                setPets(pets.filter(pet => pet.id !== petId))
                console.log("Pet deleted successfully")

            } else {
                console.error("Failed to delete pet")
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getPets()
                setPets(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()


    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 150 },
        { field: 'species', headerName: 'Species', width: 150 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => {
                const imageUrl = params.value?.startsWith('http')
                    ? params.value
                    : `http://localhost:8000${params.value}`;

                return (
                    <img
                        src={imageUrl}
                        alt="Pet"
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                    />
                );
            }
        },
        {
            field: 'actions', headerName: 'Actions', width: 250, renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedPet(params.row)
                            setModalOpen(true)
                        }}
                    >Edit</Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            handleDelete(params.row.id)
                        }}
                    >Delete</Button>
                </>
            )
        }
    ]



    const createPet = () => {
        setSelectedPet({})
        setModalOpen(true)
    }

    return (
        <>
            <h1>Pets</h1>
            <Button onClick={createPet}>Add Pet</Button>
            <DataGrid rows={pets} columns={columns}></DataGrid>
            <PetModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedPet={selectedPet}
            />
        </>


    )
}

export default Pets