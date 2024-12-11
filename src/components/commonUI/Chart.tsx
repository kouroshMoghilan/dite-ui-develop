import React from "react";
import { AgCharts } from "ag-charts-react";

// Define the props type for the Chart component
interface ChartProps {
  data: any[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartOptions: any = {
    data: data,
    series: [
      {
        type: "bar",
        xKey: "date",
        yKey: "count",
        stacked: true,
        cornerRadius: 6,
        rtl: true,
        position: 'top',
        fill: '#5932EA',
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          fontWeight: "bold",
          fontSize: 10,
          rotation: -45,
          fontFamily: "myFont, Arial, sans-serif",
        },
        rtl: true,
        visibleRange: data.length > 7 ? [0, 0.5] : [],
        reverse: true,
      },
      {
        type: "number",
        position: "left",
        label: {
          fontWeight: "400",
          fontSize: 10,
          fontFamily: "myFont, Arial, sans-serif",
        },
        rtl: true,

      },
    ],
    navigator: data.length > 7 ? {
      enabled: true,
      minHandleSize: 10,
      mask: {
        fill: "rgba(102, 153, 255, 0.3)",
      },
      start: 0.25,
      end: 0.75,
      rtl: true
    } : undefined,
    chartArea: data.length > 7 ? {
      width: 800,
    } : undefined,
    layout: {
      direction: 'rtl',
    },
  };



  return <div dir="ltr">
    <AgCharts options={chartOptions} />
  </div>;
};
