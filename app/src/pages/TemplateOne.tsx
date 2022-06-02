import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
// import * as Responsive from "@visx/responsive"; for flexible components
import './style.css'

const fullPage = "calc(100vh)"; // Jank code for full page (fix later)

export default function TemplateOne() {
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
        className="template-one-grid"
        h={fullPage}
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={15}
      >
        <GridItem
          rowSpan={4}
          colSpan={4}
          bg="#759EB8"
          w="100%"
          h="100%"
        ></GridItem>
        <GridItem rowSpan={4} colSpan={2}  bg="#B3C5D7" w="100%" />
        <GridItem rowSpan={4} colSpan={2}  bg="#D8E1E9" w="100%" />
      </Grid>
    </div>
  );
}
