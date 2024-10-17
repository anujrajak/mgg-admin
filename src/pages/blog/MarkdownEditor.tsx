import { VStack } from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ body, setBody }) => {
  return (
    <VStack spacing={4} align="stretch">
      <MDEditor
        value={body}
        onChange={setBody}
        height={400}
        preview="edit" // Set preview mode to 'edit' or 'preview'
      />

      {/* <MDEditor.Markdown source={value} /> */}
    </VStack>
  );
};

export default MarkdownEditor;
