import { scaleBand, scaleLinear } from "d3";
import * as d3 from "d3";

export default function App() {
  const data = [
    { count: 6, name: "Hantavirus" },
    { count: 7, name: "Tularemia" },
    { count: 7, name: "Dengue" },
    { count: 9, name: "Ebola" },
    { count: 11, name: "E. coli" },
    { count: 15, name: "Tuberculosis" },
    { count: 17, name: "Salmonella" },
    { count: 18, name: "Vaccinia" },
    { count: 54, name: "Brucella" },
  ];

  const width = 650;
  const height = 360;

  const xScale = scaleLinear().range([0, width]).domain([0, 55]);
  const yScale = scaleBand()
    .range([height, 0])
    .domain([
      "Hantavirus",
      "Tularemia",
      "Dengue",
      "Ebola",
      "E. coli",
      "Tuberculosis",
      "Salmonella",
      "Vaccinia",
      "Brucella",
    ])
    .padding(0.5);

  const gridValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const lineGenerator = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  return (
    <>
      <div style={{ width: width, padding: "0px 20px" }}>
        <div style={{ height: "100px", width: width }}>
          <div
            style={{
              marginTop: "14px",
              width: "100%",
              height: "1px",
              backgroundColor: "#e5011c",
            }}
          ></div>
          <div
            style={{ width: "36px", height: "9px", backgroundColor: "#e5011c" }}
          ></div>
          <span
            style={{ display: "block", fontSize: "20px", textAlign: "left" }}
          >
            <b>Escape Artists</b>
          </span>
          <br></br>
          <span
            style={{ display: "block", fontSize: "16px", textAlign: "left" }}
          >
            Number of laboratory-acquired infections, 1970-2021
          </span>
        </div>
        <div>
          <svg width={width} height={height} style={{ overflow: "visible" }}>
            {gridValues.map((val) => {
              const pathData = lineGenerator([
                { x: xScale(val), y: 0 },
                { x: xScale(val), y: height },
              ]);
              return (
                <g key={val}>
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#808080"
                    opacity={0.2}
                    strokeWidth={1}
                  />
                  <text
                    x={xScale(val)}
                    y={-10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={12}
                    fill="##808080"
                    opacity={1}
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {data.map((d, i) => (
              <g>
                <rect
                  key={i}
                  x={0}
                  y={yScale(d.name)}
                  height={yScale.bandwidth()}
                  width={xScale(d.count)}
                  fill={"#076fa2"}
                  stroke="#076fa2"
                />
                <text
                  fill={d.count > 7 ? "white" : "#076fa2"}
                  fill-opacity={0.9}
                  y={yScale(d.name)}
                  x={d.count > 7 ? xScale(7) : xScale(d.count + 4)}
                  textAnchor="start"
                  alignmentBaseline="central"
                  fontSize={14}
                >
                  {d.name}
                </text>
              </g>
            ))}
            <rect></rect>
          </svg>
        </div>
      </div>
    </>
  );
}
