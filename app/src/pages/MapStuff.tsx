import React from "react";
import WorldMap from "../components/WorldMap.tsx";
import { Grid, GridItem } from "@chakra-ui/react";
import * as Responsive from "@visx/responsive";

import "./style.css";

//jank
const fullPage = "calc(100vh)";

export default function MapStuff() {
  return (
    <Grid
      className="map-header"
      h={fullPage}
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={15}
    >
      <GridItem
        id="top-grid"
        rowSpan={4}
        colSpan={4}
        bg="tomato"
        w="100%"
        h="100%"
      >
        <Responsive.ParentSize>
          {({ width, height, events }) => <WorldMap width={width} height={height} events={true} />}
        </Responsive.ParentSize>
      </GridItem>
      <GridItem id="bottom-grid" rowSpan={4} colSpan={2} bg="#2c7da0" w="100%">
        {" "}
        GRID ITEM 1
      </GridItem>
      <GridItem id="bottom-grid" rowSpan={4} colSpan={2} bg="#89c2d9" w="100%">
        GRID ITEM 2
      </GridItem>
    </Grid>
  );
}
