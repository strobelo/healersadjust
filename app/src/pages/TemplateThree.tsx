import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
// import * as Responsive from "@visx/responsive"; for flexible components
import "./style.css";

const fullPage = "calc(100vh)"; // Jank code for full page (fix later)

export default function TemplateThree() {
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
      <div>
        <Grid
          className="template-three-grid"
          h={fullPage}
          templateRows="repeat(12, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={55}
          overflow="hidden"
        >
          <GridItem rowSpan={8} colSpan={4} bg="#013a63" w="100%" />
          <GridItem rowSpan={4} colSpan={4} bg="#468faf" w="100%" />
        </Grid>
      </div>
      keep going
      <Grid
        h={fullPage}
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={55}
        overflow="hidden"
      ></Grid>
    </div>
  );
}
