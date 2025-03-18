import { Button, TextField } from "@radix-ui/themes";
import SimpleMarkDown from "./markdown";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMarkDown placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
