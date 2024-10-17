import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCreateCategory } from "../../utils/apiUtils";

export function CreateCategory() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [name, setName] = useState("");
  const [sequence, setSequence] = useState("");
  const [cType, setCType] = useState("");
  const [parent, setParent] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync, isLoading: saveInProgress } = useCreateCategory();

  const saveCategory = async () => {
    try {
      await mutateAsync({
        name,
        parentCategory: parent,
        sequence,
        categoryType: cType,
        description,
      });

      setName("");
      setSequence("");
      setCType("");
      setParent("");
      setDescription("");
      toast({ title: "Category added successfully.", status: "success" });
    } catch (error) {
      toast({ title: error, status: "error" });
    }
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        variant="ghost"
        aria-label="See menu"
        icon={<BsThreeDotsVertical />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new category</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <FormLabel>Name*</FormLabel>
              <Input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Sequence*</FormLabel>
              <Input
                type="number"
                value={sequence}
                placeholder="Sequence"
                onChange={(e) => setSequence(e.target.value)}
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description*</FormLabel>
              <Input
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category Type*</FormLabel>
              <Select
                placeholder="Select category type"
                value={cType}
                onChange={(e) => setCType(e.target.value)}
              >
                <option>blog</option>
                <option>deal</option>
                <option>product</option>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Parent Name</FormLabel>
              <Select
                placeholder="Select parent name"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              >
                <option>Electronic</option>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            {saveInProgress ? (
              <Center>
                <Spinner size="md" />
              </Center>
            ) : (
              <>
                <Button
                  colorScheme="blue"
                  mr={3}
                  disabled={!name || !sequence || !cType}
                  onClick={saveCategory}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
