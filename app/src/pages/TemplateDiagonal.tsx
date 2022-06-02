import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
// import * as Responsive from "@visx/responsive"; for flexible components
import { Image } from "@chakra-ui/react";
import "./diagstyle.css";

export default function TemplateDiagonal() {
  return (
    <div>
      <div className="diagonal-box">
        <Grid
          className="template-one-grid"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={10}
        >
          <GridItem rowSpan={1} colSpan={1} w="100%">
            THIS IS SOME FUTRISTIC SHIT
          </GridItem>
        </Grid>
        <div className="content">
          <Grid
            className="template-one-grid"
            templateRows="repeat(6, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={15}
          >
            <GridItem rowSpan={4} colSpan={4} w="100%" h="100%">
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
              <p>INSERT SOME SHIT/COMPONENT HERE</p>
            </GridItem>
          </Grid>
        </div>
      </div>
      <div className='image-container'>
      <Image id='image-lol'
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrl4S9AArAmqJisnP8yYUPWeLQZrc7ePQ-g&usqp=CAU"
      />
      </div>
      {/* <div className="second-box-lol">
        <Grid
          className="template-one-grid"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={0}
        >
          <GridItem rowSpan={1} colSpan={1} w="100%" h="100%">
            HMMMMMMMMM
          </GridItem>
        </Grid>
      </div> */}
    </div>
  );
}
