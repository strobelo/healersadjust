import React, { useCallback, useState } from "react";
import MapMenu, { mapAddress } from "./MapMenu.tsx";
import { LinePath, Line } from "@visx/shape";
import { useDrag } from "@visx/drag";
import { curveBasis } from "@visx/curve";
// import { LinearGradient } from "@visx/gradient"; //Unlock if we want gradient
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import ColorPicker, { penColor } from "./ColorPicker.tsx";


/**
 * 
 * This is from visx but when I was playing around with it
 * I ended up getting rid of all the pretty stuff....
 * 
 * 
 * Selecting new map doesn't re-render the component so the background image
 * doesn't update instantly? Fix that later cus too lazy.
 * 
 * 
 * 
 */





// Jank?
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Line = { x: number; y: number; color: string }[];
export type Lines = Line[];

export type DragIIProps = {
  width: number;
  height: number;
  data?: Lines;
};

export default function DragII({ data = [], width, height }: DragIIProps) {
  // (ME) Hook State / use setLines to update []
  const [lines, setLines] = useState<Lines>(data);
  /**
   * If we need to use states for colours, probs not?
   */
  // const [color, setColor] = useState<string>(penColor);
  
  const onDragStart = useCallback(
    (currDrag) => {
      // add the new line with the starting point
      // setColor(penColor);
      setLines((currLines) => [
        ...currLines,
        [{ x: currDrag.x, y: currDrag.y, color: penColor }],
      ]);
    },
    [setLines]
  );

  const onDragMove = useCallback(
    (currDrag) => {
      // add the new point to the current line
      // setColor(penColor);
      setLines((currLines) => {
        const nextLines = [...currLines];
        const newPoint = {
          x: currDrag.x + currDrag.dx,
          y: currDrag.y + currDrag.dy,
          color: penColor,
        };
        const lastIndex = nextLines.length - 1;
        nextLines[lastIndex] = [...(nextLines[lastIndex] || []), newPoint];

        return nextLines;
      });
    },
    [setLines]
  );

  const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart,
    dragEnd,
    dragMove,
  } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true,
  });



  /**
   * @ J Resets all states (lines) back to x,y=0
   */
  const resetCanvas = () => {
    // console.log("canvas reset");
    // setLines(() => [[]]);
    setLines(() =>[])
  };

  /**
   * @ J Goes back one step (deletes obj @ last index)
   */
  const undoAction = () => {
    // console.log("undo action clicked");
    if (lines.length !== 0) {
      setLines(() =>
        lines.filter((element, index) => index < lines.length - 1)
      );
      // console.log("not empty");
    } else {
      // console.log("fkin empty bruh");
      return;
    }
  };

  
  /**
   * For testing purposes only. Prints Lines or line[] @ array index. JANK.
   * Uncomment CheckArray BUTTON to use, but it's useless. Why didn't I delete it? IDK.
   */
  // const checkArray = () => {
  //   console.log(lines);
  //   if (lines[4] !== null) {
  //     console.log("ARRAY INDEX 5 COLOR->>");
  //     console.log(lines.map((line, i) => line[i].color));
  //   }
  // };

  /**
   * Some jank shit method that returns the colours. Maybe there's a cleaner way? TODO.
   */
  const getStrokeColor = (line) => {
    var color = line[0].color;
    return color
  }


  return width < 10 ? null : (
    <div className="DragII" style={{ touchAction: "none" }}>
      <div>
        <MapMenu />
      </div>
      &nbsp;
      {/* 
        Set Canvas sized to fixed or some shit. TODO again?
      */}
      <svg width={width} height={height}>
        {/* Props to='' and from='' adds gradient to the strokes/lines */}
        {/* <LinearGradient id="stroke" /> */}
        <rect fill="#111111" width={width} height={height} rx={0} />
        <image
          href={mapAddress}
          preserveAspectRatio="none"
          width={width}
          height={height}
        />
        {/* 
          Maps the lines onto canvas here
        */}
        {lines.map((line, i) => (
          <LinePath
            key={i}
            fill="transparent"
            // prop=stroke is the only way to change the colour on <LinePath> which visx uses a lot
            stroke={getStrokeColor(line)}
            strokeWidth={5}
            data={line}
            curve={curveBasis}
            x={(o) => o.x}
            y={(o) => o.y}
          />
        ))}

        <g>
          {isDragging && (
            /* capture mouse events (note: <Drag /> does this for you) */
            <rect
              width={width}
              height={height}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              fill="transparent"
            />
          )}
          {/* decorate the currently drawing line 
          * Changing 'stroke' on this tag changes the cursor (square and circle) colors
          */}
          {isDragging && (
            <g stroke={JSON.stringify((o) => o.color)}>
              <rect
                width={8}
                height={8}
                x={x + dx - 4}
                y={y + dy - 4}
                pointerEvents="none"
              />
              <circle
                cx={x}
                cy={y}
                r={4}
                fill="transparent"
                pointerEvents="none"
              />
            </g>
          )}
          {/* create the drawing area
          * Stroke prop on this adds a border? or something. Decoration purposes.
          */}
          <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={isDragging ? dragEnd : undefined}
            onMouseMove={isDragging ? dragMove : undefined}
            onTouchStart={dragStart}
            onTouchEnd={isDragging ? dragEnd : undefined}
            onTouchMove={isDragging ? dragMove : undefined}
          />
        </g>
      </svg>
      <div className="deets">
        {/* 
        * Custom Buttons. TODO; add CSS. Probably will add a simpler color picker, maybe even tools?
        */}
        <DeleteIcon
          w={8}
          h={8}
          name="RESET"
          className="reset-button"
          onClick={resetCanvas}
        >
          RESET
        </DeleteIcon>
        &nbsp; &nbsp;
        <RepeatIcon
          w={8}
          h={8}
          name="UNDO"
          className="reset-button"
          onClick={undoAction}
        >
          UNDO
        </RepeatIcon>
        &nbsp; &nbsp;
        {/* <button name="CHECK" className="reset-button" onClick={checkArray}>
          CHECK ARRAY
        </button> */}
        <ColorPicker />
      </div>
      
      {/* 
      * Move this into style.css
      */}
      <style jsx="true">{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
          height: 100%;
        }
        svg {
          margin: 0;
          cursor: crosshair;
        }
      `}</style>
    </div>
  );
}
