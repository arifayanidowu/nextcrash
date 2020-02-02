import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    country: "AD",
    "hot dog": 117,
    "hot dogColor": "hsl(51, 70%, 50%)",
    burger: 78,
    burgerColor: "hsl(103, 70%, 50%)",
    sandwich: 187,
    sandwichColor: "hsl(4, 70%, 50%)",
    kebab: 176,
    kebabColor: "hsl(281, 70%, 50%)",
    fries: 143,
    friesColor: "hsl(277, 70%, 50%)",
    donut: 148,
    donutColor: "hsl(196, 70%, 50%)"
  },
  {
    country: "AE",
    "hot dog": 154,
    "hot dogColor": "hsl(296, 70%, 50%)",
    burger: 19,
    burgerColor: "hsl(311, 70%, 50%)",
    sandwich: 150,
    sandwichColor: "hsl(87, 70%, 50%)",
    kebab: 122,
    kebabColor: "hsl(177, 70%, 50%)",
    fries: 174,
    friesColor: "hsl(253, 70%, 50%)",
    donut: 124,
    donutColor: "hsl(68, 70%, 50%)"
  },
  {
    country: "AF",
    "hot dog": 149,
    "hot dogColor": "hsl(78, 70%, 50%)",
    burger: 186,
    burgerColor: "hsl(121, 70%, 50%)",
    sandwich: 191,
    sandwichColor: "hsl(7, 70%, 50%)",
    kebab: 61,
    kebabColor: "hsl(151, 70%, 50%)",
    fries: 166,
    friesColor: "hsl(297, 70%, 50%)",
    donut: 26,
    donutColor: "hsl(198, 70%, 50%)"
  },
  {
    country: "AG",
    "hot dog": 39,
    "hot dogColor": "hsl(165, 70%, 50%)",
    burger: 29,
    burgerColor: "hsl(24, 70%, 50%)",
    sandwich: 200,
    sandwichColor: "hsl(279, 70%, 50%)",
    kebab: 128,
    kebabColor: "hsl(39, 70%, 50%)",
    fries: 167,
    friesColor: "hsl(245, 70%, 50%)",
    donut: 130,
    donutColor: "hsl(110, 70%, 50%)"
  },
  {
    country: "AI",
    "hot dog": 28,
    "hot dogColor": "hsl(330, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(288, 70%, 50%)",
    sandwich: 54,
    sandwichColor: "hsl(106, 70%, 50%)",
    kebab: 97,
    kebabColor: "hsl(318, 70%, 50%)",
    fries: 99,
    friesColor: "hsl(299, 70%, 50%)",
    donut: 38,
    donutColor: "hsl(132, 70%, 50%)"
  },
  {
    country: "AL",
    "hot dog": 178,
    "hot dogColor": "hsl(291, 70%, 50%)",
    burger: 46,
    burgerColor: "hsl(307, 70%, 50%)",
    sandwich: 194,
    sandwichColor: "hsl(47, 70%, 50%)",
    kebab: 19,
    kebabColor: "hsl(123, 70%, 50%)",
    fries: 50,
    friesColor: "hsl(47, 70%, 50%)",
    donut: 154,
    donutColor: "hsl(215, 70%, 50%)"
  },
  {
    country: "AM",
    "hot dog": 86,
    "hot dogColor": "hsl(100, 70%, 50%)",
    burger: 8,
    burgerColor: "hsl(250, 70%, 50%)",
    sandwich: 6,
    sandwichColor: "hsl(325, 70%, 50%)",
    kebab: 132,
    kebabColor: "hsl(69, 70%, 50%)",
    fries: 122,
    friesColor: "hsl(316, 70%, 50%)",
    donut: 138,
    donutColor: "hsl(235, 70%, 50%)"
  }
];

export default function Charts() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "fries"
            },
            id: "dots"
          },
          {
            match: {
              id: "sandwich"
            },
            id: "lines"
          }
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

const data2 = [
  {
    id: "hack",
    label: "hack",
    value: 266,
    color: "hsl(97, 70%, 50%)"
  },
  {
    id: "haskell",
    label: "haskell",
    value: 468,
    color: "hsl(238, 70%, 50%)"
  },
  {
    id: "python",
    label: "python",
    value: 511,
    color: "hsl(279, 70%, 50%)"
  },
  {
    id: "erlang",
    label: "erlang",
    value: 276,
    color: "hsl(166, 70%, 50%)"
  },
  {
    id: "rust",
    label: "rust",
    value: 399,
    color: "hsl(212, 70%, 50%)"
  }
];

export function PieComponent() {
  const [state, setState] = useState({
    activeIndex: 0
  });

  return (
    <div
      style={{
        width: "100%",
        height: 300
      }}
    >
      <ResponsivePie
        data={data2}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "ruby"
            },
            id: "dots"
          },
          {
            match: {
              id: "c"
            },
            id: "dots"
          },
          {
            match: {
              id: "go"
            },
            id: "dots"
          },
          {
            match: {
              id: "python"
            },
            id: "dots"
          },
          {
            match: {
              id: "scala"
            },
            id: "lines"
          },
          {
            match: {
              id: "lisp"
            },
            id: "lines"
          },
          {
            match: {
              id: "elixir"
            },
            id: "lines"
          },
          {
            match: {
              id: "javascript"
            },
            id: "lines"
          }
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 80,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000"
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}
