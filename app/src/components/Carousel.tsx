import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
// import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  // @J Server loaded Images -> XIVAPI
  const cards = [
    {
      title: "RIP Emet",
      text: "Emet would rather die than be revived by Hydaelyn!",
      image: "https://i.kym-cdn.com/photos/images/facebook/001/777/773/f40.jpg",
    },
    {
      title: "Zenos is alive",
      text: "He is sending postcards from Ultima Thule",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1XoCxf8kEPwGPRTOweYsHR39W-6h6g5Xmg&usqp=CAU",
    },
    {
      title: "I can take care of myself, you know!",
      text: "Even while fighting a literal god, Alisae refuses help from her comrades",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTccs9degq2beigtbpj-Aeda9vTV1xIGM1Mw&usqp=CAU",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"100%"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        {/* 
          @J Custom Arrow Icons HERE 
          */}

        <ArrowLeftIcon />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        {/* 
          @J Custom Arrow Icons HERE 
          */}

        <ArrowRightIcon />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"1xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="fixed"
                top="30%"
                transform="translate(0, -50%)"
              >
                {/* 
                
                @J Carousel card title/text colour @color
                
                */}
                <Heading
                  font-weight="bold"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl"}}
                  color="black"
                >
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="black">
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
