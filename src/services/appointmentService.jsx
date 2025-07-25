export const getAppointments = async () => {
    try {
        const response = await fetch("http://localhost:8000/clinic/appointments/all/")
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const createAppointments = async (appointmentData) => {
    try {
        const response = await fetch("http://localhost:8000/clinic/appointments/create/", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const updateAppointments = async (appointmentId, appointmentData) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/appointments/update/${appointmentId}/`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const deleteAppointments = async (appointmentId) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/appointments/delete/${appointmentId}/`, {
            method:'DELETE'
          
        })
      
        return response.ok
    } catch (error) {
        console.log(error)
        return null
    }

}