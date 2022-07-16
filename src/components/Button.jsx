import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

function Button(props) {
  return (
    <ChakraButton
      {...props}
      background='primary'
      color='white'
      variant='solid'
      size='md'
    >
      {props.children}
    </ChakraButton>
  );
}

export default Button;
