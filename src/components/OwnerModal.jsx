import {Modal} from '@mui/material'

const OwnerModal = ({modalOpen, setModalOpen, selectedOwner}) => {
    return(
        <Modal open = {modalOpen} onClose = {() => setModalOpen(false)}>
            <p>Test Modal</p>
        </Modal>
    )
}

export default OwnerModal