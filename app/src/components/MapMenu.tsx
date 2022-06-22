import React, { useCallback } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// Jank
export var mapAddress = "";

export default function MapMenu() {
  // Probably won't be used ever
  //   const [menu, setMenu] = React.useState<MenuItem | null>(null);
  //   const [address, setAddress] = React.useState<MapProps | string>('');
  const [newMap, setNewMap] = React.useState<string>("default");

  // Update MapList based on # of maps we need to use
  const MapList = [
    {
      title: "Default Canvas",
      image: "default",
    },
    {
      title: "Asphodelos The First Circle",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTccs9degq2beigtbpj-Aeda9vTV1xIGM1Mw&usqp=CAU",
    },
    {
      title: "Asphodelos The Second Circle",
      image: "testlink",
    },
    {
      title: "Asphodelos The Third Circle",
      image: "another test link",
    },
    {
      title: "Asphodelos The Fourth Circle",
      image: "last test link",
    },
  ];

  // @J Return img link or src of selected menu item
  const setMapImage = (e): string => {
    // setAddress(e.currentTarget.value);
    mapAddress = e.currentTarget.value;
  };

  return (
    <Menu>
      {/* 
        Add method to dynamically change map name based on selection - later
        */}
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Maps
      </MenuButton>
      {/* <MenuList  ref={(menu) => setMenu(menu)}> */}
      <MenuList>
        {MapList.map((map, index) => (
          <MenuItem key={index} value={map.image} onClick={setMapImage}>
            <Image
              boxSize="3rem"
              borderRadius="full"
              src={map.image}
              mr="12px"
            />
            <span id="menu-title">{map.title}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
