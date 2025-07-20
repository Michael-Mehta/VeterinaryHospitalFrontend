export const getOwners = async () => {
    try {
        const response = await fetch("http://localhost:8000/clinic/owners/")
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const createOwners = async (ownerData) => {
    try {
        const response = await fetch("http://localhost:8000/clinic/owners/create/", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ownerData)
        })
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const updateOwners = async (ownerId, ownerData) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/owners/update/${ownerId}/`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ownerData)
        })
        const parsedResponse = await response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
        return null
    }

}

export const deleteOwners = async (ownerId) => {
    try {
        const response = await fetch(`http://localhost:8000/clinic/owners/delete/${ownerId}/`, {
            method:'DELETE'
          
        })
      
        return response.ok
    } catch (error) {
        console.log(error)
        return null
    }

}