import {numberToEnglish} from "Utils";
import "./styles.scss";
interface Props {
  columns: number;
  boxes: number;
}

const ReactGridLayout = ({columns, boxes}: Props) => {
  return (
    <div className="grid">
      {Array.from({length: boxes}, (_, i) => (
        <div className={`box col-${columns}`} key={i}>
          {numberToEnglish(i + 1)}
        </div>
      ))}
    </div>
  );
};

export default ReactGridLayout;
