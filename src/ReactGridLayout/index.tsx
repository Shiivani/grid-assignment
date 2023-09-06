import {numberToEnglish} from "Utils";
import useDynamicRefs from "CustomHooks/useDynamicRefs";
import "./styles.scss";
import {Ref, RefObject, useEffect} from "react";
interface Props {
  columns: number;
  boxes: number;
}

const ReactGridLayout = ({columns, boxes}: Props) => {
  const [getRef, setRef] = useDynamicRefs();

  useEffect(() => {
    const targetColumns = Array.from({length: boxes}, (_, i) =>
      getRef(`box-${i}`),
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`${entry.target.innerHTML.toUpperCase()} WAS CALLED`);
        }
      });
    });
    targetColumns.forEach((target) =>
      observer.observe(target?.current as Element),
    );
  }, []);

  return (
    <div className="grid">
      {Array.from({length: boxes}, (_, i) => (
        <div
          ref={setRef(`box-${i}`) as RefObject<HTMLDivElement>}
          className={`box col-${columns}`}
          key={i}
        >
          {numberToEnglish(i + 1)}
        </div>
      ))}
    </div>
  );
};

export default ReactGridLayout;
