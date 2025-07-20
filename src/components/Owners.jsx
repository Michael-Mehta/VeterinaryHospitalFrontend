import { getOwners } from '../services/ownerService'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import OwnerModal from './OwnerModal'
import { Button } from '@mui/material'

const Owners = () => {

    const [owners, setOwners] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState({ name: '', phone: '' })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getOwners()
                setOwners(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()


    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 }
    ]



    const createOwner = () => {
        setSelectedOwner({ name: '', phone: '' })
        setModalOpen(true)
    }

    return (
        <>
            <h1>Owners</h1>
            <Button onClick={createOwner}>Add Owner</Button>
            <DataGrid rows={owners} columns={columns}></DataGrid>
            <OwnerModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedOwner={selectedOwner}
            />
        </>


    )
}

export default Owners