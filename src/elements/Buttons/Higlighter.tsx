import { FC } from "react";

interface HiglighterProps {
  type: string;
  state: boolean | string;
}

const Higlighter: FC<HiglighterProps> = ({type, state }) => {
  return (
    <div className={`btn-highlighter ${type} ${state}`}>
    </div>
  );
};

export default Higlighter;
