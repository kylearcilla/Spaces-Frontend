import { FC } from "react";
import { Range, Direction, getTrackBackground } from "react-range";

import "./SpotifyBars.css";

interface SpotifyVolumeBarProps {
  handleInputChange: (newVolume: number) => void;
  handleValueChange: (newVolume: number) => void;
  currentVol: number;
}

const SpotifyVolumeBar: FC<SpotifyVolumeBarProps> = ({
  handleInputChange,
  handleValueChange,
  currentVol,
}) => {
  const direction = Direction;
  const handleChangeInput = (values: any) => {
    if (values[0] === currentVol) return;
    handleInputChange(values[0]);
  };
  const handleChangeValue = (values: any) => {
    handleValueChange(values[0]);
  };

  return (
    <Range
      values={[currentVol]}
      min={0}
      max={100}
      direction={direction.Up}
      disabled={false}
      onChange={(values) => handleChangeInput(values)}
      onFinalChange={(values) => handleChangeValue(values)}
      renderTrack={({ props, children, disabled }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "80px",
            display: "flex",
            width: "4px",
            cursor: "default",
            position: "absolute",
            bottom: "12px",
            left: "-10px",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "80px",
              width: "4px",
              borderRadius: "4px",
              background: disabled
                ? "#131315"
                : getTrackBackground({
                    values: [currentVol],
                    colors: ["#8DB1F6", "#0C0C0D"],
                    direction: direction.Up,
                    min: 0,
                    max: 100,
                  }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "10px",
            width: "10px",
            right: "-6px",
            borderRadius: "15px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 4px #FF",
            outline: "none",
            cursor: "default",
          }}
        ></div>
      )}
    />
  );
};

export default SpotifyVolumeBar;
