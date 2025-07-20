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