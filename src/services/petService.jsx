export const getPets = async (ownerId) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/pets/all/`)
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const createPets = async (petData) => {
    try {
        const formData = new FormData()
        formData.append('name', petData.name)
        formData.append('age', petData.age)
        formData.append('species', petData.species)
        formData.append('owner_id', petData.owner_id)
        if (petData.image) {
            formData.append('image', petData.image)
        }

        const response = await fetch("http://localhost:8000/clinic/pets/create/", {
            method: 'POST',
            body: formData,
        })

        const parsedResponse = await response.json()
        return parsedResponse;
    } catch (error) {
        console.error("Error creating pet:", error)
        return null;
    }
}


export const updatePets = async (petId, petData) => {
    try {
        const formData = new FormData()
        if (petData.name) formData.append('name', petData.name)
        if (petData.age) formData.append('age', petData.age)
        if (petData.species) formData.append('species', petData.species)
        if (petData.owner_id) formData.append('owner_id', petData.owner_id)
        if (petData.image) formData.append('image', petData.image)
        console.log(petData.image)

        const response = await fetch(`http://localhost:8000/clinic/pet/update/${petId}/`, {
            method: 'PUT',
            body: formData,
        });

        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.error("Error updating pet:", error)
        return null
    }
}


export const deletePets = async (petId) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/pets/delete/${petId}/`, {
            method:'DELETE'
          
        })
      
        return response.ok
    } catch (error) {
        console.log(error)
        return null
    }

}