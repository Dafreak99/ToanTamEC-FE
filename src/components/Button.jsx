import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

function Button(props) {
  return (
    <ChakraButton
      background='primary'
      color='white'
      variant='solid'
      size='md'
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
}

export default Button;
