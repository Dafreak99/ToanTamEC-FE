import { Flex } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Flex justifyContent="center" alignItems="center" py={6}>
      <div className="semipolar-spinner">
        <div className="rong"></div>
        <div className="rong"></div>
        <div className="rong"></div>
        <div className="rong"></div>
        <div className="rong"></div>
      </div>
    </Flex>
  );
};

export default Spinner;
