import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

const NewDrawer = forwardRef(({title, submit, data, id, children}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const close = () => {
    onClose()
    submit(data, id)
  }

  useImperativeHandle(ref, () => {
    return onOpen;
  });


  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {title}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            {children}
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={close}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
})

export default NewDrawer;
