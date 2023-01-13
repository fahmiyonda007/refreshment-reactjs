import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

const ModalComponent = (props) => {
  const { visible, onClose, onClick } = props
  return (
    <>
      <CModal visible={visible} onClose={onClose}>
        <CModalHeader onClose={onClose}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>Are yo sure to delete?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
          <CButton color="danger" onClick={onClick}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ModalComponent.propTypes = {
  visible: PropTypes.string,
  onClose: PropTypes.string,
  onClick: PropTypes.string,
}

export default ModalComponent
