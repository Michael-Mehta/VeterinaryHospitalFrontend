import { getOwners } from '../services/ownerService'
import { useEffect, useState } from 'react'
import {DataGrid} from '@mui/x-data-grid'

const Owners = () => {

    const [owners, setOwners] = useState([])

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
        {field:'id', headerName:'ID', width: 50},
        {field:'name', headerName:'Name', width: 150},
        {field:'phone', headerName:'Phone', width: 150}
    ]

    console.log(owners)

    return (
        <>
        <h1>Owners</h1>
        <DataGrid rows={owners} columns={columns}></DataGrid>
        </>
        
        
    )
}

export default Owners