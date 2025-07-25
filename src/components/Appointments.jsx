import {getAppointments} from '../services/appointmentService'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import AppointmentModal from './AppointmentModal'
import { Button } from '@mui/material'
import { deleteAppointments } from '../services/appointmentService'

const Appointments = () => {

    const [appointments, setAppointments] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState({})

    const handleDelete = async (appointmentId) => {

        try{
            const success = await deleteAppointments(appointmentId)

            if(success)
            {
                setAppointments(appointments.filter(appointment => appointment.id !== appointmentId))
                console.log("Appointment deleted successfully")

            }else
            {
                console.error("Failed to delete appointment")
            }

        }catch(error)
        {
            console.log(error)
        }

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getAppointments()
                setAppointments(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()


    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'pet', headerName: 'Pet Id', width: 150 },
        { field: 'vet', headerName: 'Vet Id', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 250, renderCell: (params) => (
            <>
            <Button
             variant="outlined"
             onClick = {() => {
                setSelectedAppointment(params.row)
                setModalOpen(true)
             }}
             >Edit</Button>
             <Button
             variant="outlined"
             color="error"
             onClick = {() => {
                handleDelete(params.row.id)
             }}
             >Delete</Button>
            </>
        ) }
    ]



    const createAppointment = () => {
        setSelectedAppointment({})
        setModalOpen(true)
    }

    return (
        <>
            <h1>Appointments</h1>
            <Button onClick={createAppointment}>Add Appointment</Button>
            <DataGrid rows={appointments} columns={columns}></DataGrid>
            <AppointmentModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedAppointment={selectedAppointment}
            />
        </>


    )
}

export default Appointments