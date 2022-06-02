import React from "react";
import { Grid, Square, GridItem, Flex } from "@chakra-ui/react";
// import * as Responsive from "@visx/responsive"; // for flexible components
import Draw from "../components/Draw.tsx";
import Chat from "../components/Chat.tsx";

import "./style.css";

const fullPage = "calc(100vh)";

export default function DrawTemplate() {
  return (
    // Change GRID to FLEX TODO
    <Flex
      className="map-header"
      h={fullPage}
      // templateRows="repeat(10, 1fr)"
      // templateColumns="repeat(4, 1fr)"
      gap={15}
    >
      {/* 
      Change w to 100% if GRID
       */}
      <GridItem
        className="top-grid"
        rowSpan={6}
        colSpan={4}
        bg="#013a63"
        w="180%"
        h="100%"
      >
        <Draw width={"100%"} height={"100%"} />
      </GridItem>
      {/* <GridItem id="bottom-grid" rowSpan={4} colSpan={2} bg="#2c7da0" w="100%">
        {" "}
        Some tools or icons or whatever we want to add?
      </GridItem>
       */}
      <GridItem id="bottom-grid" rowSpan={4} colSpan={2} bg="#012a4a" w="100%">
        CHAT BOX GOES HERE PROBABLY
        <Chat />
      </GridItem>
    </Flex>
  );
}
