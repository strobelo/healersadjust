import React, { useState } from "react";
import {
  ChakraProvider,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  extendTheme,
} from "@chakra-ui/react";

export var penColor = "grey";

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
  },
});

export default function ColorPicker() {
  const [color, setColor] = useState("gray");

  const colors = [
    "gray",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
  ];

  const handleClick = (e) => {
    setColor(e);
    penColor = e;
    console.log(e);
  };

  return (
    <ChakraProvider theme={theme}>
      <Center marginTop={0}>
        <Popover variant="picker">
          COLOR PICKER HERE CHANGE LATER --P &nbsp;&nbsp;&nbsp;
          <PopoverTrigger>
            <Button
              aria-label={color}
              background={color}
              height="22px"
              width="22px"
              padding={0}
              minWidth="unset"
              borderRadius={3}
            ></Button>
          </PopoverTrigger>
          <PopoverContent width="170px">
            <PopoverArrow bg={color} />
            <PopoverCloseButton color="white" />
            <PopoverHeader
              height="100px"
              backgroundColor={color}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
              color="white"
            >
              <Center height="100%">{color}</Center>
            </PopoverHeader>
            <PopoverBody height="120px">
              <SimpleGrid columns={5} spacing={2}>
                {colors.map((c) => (
                  <Button
                    key={c}
                    aria-label={c}
                    background={c}
                    height="22px"
                    width="22px"
                    padding={0}
                    minWidth="unset"
                    borderRadius={3}
                    _hover={{ background: c }}
                    onClick={() => {
                      handleClick(c);
                    }}
                  ></Button>
                ))}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
    </ChakraProvider>
  );
}
