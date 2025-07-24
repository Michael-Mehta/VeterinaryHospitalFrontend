export const getVets = async () => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/vets/all/`)
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const createVets = async (vetData) => {
    try {
        const formData = new FormData()
        formData.append('name', vetData.name)
        formData.append('specialization', vetData.specialization)
        if (vetData.image) {
            formData.append('image', vetData.image)
        }

        const response = await fetch("http://localhost:8000/clinic/vets/create/", {
            method: 'POST',
            body: formData,
        })

        const parsedResponse = await response.json()
        return parsedResponse;
    } catch (error) {
        console.error("Error creating vet:", error)
        return null;
    }
}


export const updateVets = async (vetId, vetData) => {
    try {
        const formData = new FormData()
        if (vetData.name) formData.append('name', vetData.name)
       
        if (vetData.species) formData.append('specialization', vetData.specialization)
       
        if (vetData.image) formData.append('image', vetData.image)
        console.log(vetData.image)

        const response = await fetch(`http://localhost:8000/clinic/vet/update/${vetId}/`, {
            method: 'PUT',
            body: formData,
        });

        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.error("Error updating vet:", error)
        return null
    }
}


export const deleteVet = async (vetId) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/vets/delete/${vetId}/`, {
            method:'DELETE'
          
        })
      
        return response.ok
    } catch (error) {
        console.log(error)
        return null
    }

}