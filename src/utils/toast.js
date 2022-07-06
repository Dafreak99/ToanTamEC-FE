import { createStandaloneToast } from "@chakra-ui/toast";

const toast = createStandaloneToast();

export const showToast = (
  status,
  title,
  description,
  position = "top-right",
  duration = 1500
) => {
  toast({
    status,
    title,
    description,
    position,
    duration,
    isClosable: true,
  });
};
