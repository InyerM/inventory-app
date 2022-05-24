import React, { forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton
} from '@chakra-ui/react'

const Modal = forwardRef(({title, children, route, action, cancelOption, id}, ref) => {

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    route ? 
    navigate(route) : action
    ? action(id) : null
  }

  useImperativeHandle(ref, () => {
    return onOpen;
  });

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {children}
          </AlertDialogBody>
          <AlertDialogFooter>
            {
              cancelOption ? 
              <Button colorScheme='gray' ml={3} onClick={onClose}>
                Cancel
              </Button> 
              : null
            }
            <Button colorScheme='red' ml={3} onClick={handleClose}>
              Accept
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})

export default Modal