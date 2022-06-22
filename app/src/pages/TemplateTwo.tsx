import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Carousel from "../components/Carousel.tsx";
import * as Responsive from "@visx/responsive"; // for flexible components

import './style.css'

const fullPage = "calc(100vh)"; // Jank code for full page (fix later)
const ComponentToRender = Responsive.withParentSize(Carousel);


export default function TemplateTwo() {
  return (
    /**
     *      C O L
     * ROW
     * ROW
     * ROW
     *
     *
     */

    <div>
      <Grid
        className='template-two-grid'
        h={fullPage}
        templateRows="repeat(7, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={25}
      >
        <GridItem rowSpan={7} colSpan={1} bg="#c52233" w="100%" />
        <GridItem rowSpan={4} colSpan={4} bg="#a7333f" w="100%" />
        <GridItem rowSpan={3} colSpan={4} bg="#580c1f" w="100%">
        <ComponentToRender/>
        </GridItem>
      </Grid>
    </div>
  );
}
