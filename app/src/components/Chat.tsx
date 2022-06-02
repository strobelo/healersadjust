import React, { useState } from "react";
import { Input, Button, Flex, Box } from "@chakra-ui/react";
// import Messages from "./Messages.tsx";


/**
 * 
 * Need to tweak our WS / SendMessage code and paste them here.
 * In the meantime, this just pops <p>s into <div>s
 * 
 */


export default function Chat() {
  const wrapperStyles = {
    w: "100%",
    h: "100%",
    justify: "center",
    align: "center",
  };

  const boxStyles = {
    padding: 2,
    bg: "#E9E9E9",
    w: "30vw",
    h: "85vh",
    align: "center",
    color: "black",
    flexDir: "column",
    display: 'inline'
  };

  const inputStyles = {
    margin: 4,
    padding: 2,
    id: "chat-input",
    focusBorderColor: "lime",
    placeholder: "Type Something...",
    _placeholder: { opacity: 0.5, color: "gray.900" },
    color: "black",
    bg:'white',
    width: '28vw',
  };

  const buttonStyles = {
    colorScheme: "teal",
    variant: "solid",
    bottom: "5px",
  };

  const handleOnClick = (e) => {
    var chatBox = document.getElementById("chat-box")
    var text = document.getElementById('message_input').value
    var tag = document.createElement("p");
    tag.innerText = text
    chatBox.appendChild(tag)
    document.getElementById('message_input').value = '' //reset
  }



  return (
    <div className="chat-box-div">
      <Flex {...wrapperStyles}>
        <Flex {...boxStyles} id='chat-box'>
          test test test
        </Flex>
      </Flex>
      <Input {...inputStyles} id='message_input' />
      <Button {...buttonStyles} onClick={handleOnClick}>Button</Button>
    </div>
  );
}
