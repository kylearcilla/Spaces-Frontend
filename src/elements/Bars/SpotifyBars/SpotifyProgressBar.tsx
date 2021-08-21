import { FC } from "react";
import { Range, getTrackBackground } from "react-range";
import "./SpotifyBars.css";

interface SpotifyProgressBarProps {
  handleInputChange: any;
  handleValueChange: any;
  currentTime: any;
  duration: any;
}

const SpotifyProgressBar: FC<SpotifyProgressBarProps> = ({
  handleInputChange,
  handleValueChange,
  currentTime,
  duration,
}) => {
  const handleChangeA = (values: any) => {
    if (values[0] === currentTime) return;
    handleInputChange(values[0]);
  };
  const handleChangeB = (values: any) => {
    handleValueChange(values[0]);
  };

  return (
    <Range
      values={[currentTime]}
      min={0}
      max={duration}
      disabled={!(currentTime >= 0) || !duration}
      onChange={(values) => handleChangeA(values)}
      onFinalChange={(values) => handleChangeB(values)}
      renderTrack={({ props, children, disabled }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "10px",
            display: "flex",
            width: "100%",
            cursor: "default",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "4px",
              width: "100%",
              borderRadius: "4px",
              background: disabled
                ? "#131315"
                : getTrackBackground({
                    values: [currentTime],
                    colors: ["white", "#131315"],
                    min: 0,
                    max: duration,
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
            height: "9px",
            width: "9px",
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

export default SpotifyProgressBar;
