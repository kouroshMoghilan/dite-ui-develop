import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface SemiCircleChartProps {
  totalPeople: number;
  attendees: number;
}

const SemiCircleChart: React.FC<SemiCircleChartProps> = ({ totalPeople, attendees }) => {
  const percentage = Math.round((attendees / totalPeople) * 100);

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#f9e9da",
          strokeWidth: '100%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -10,
            fontSize: '22px',
            formatter: () => `${percentage}%`, // نمایش درصد در مرکز نمودار
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
        colorStops: [ 
          {
            offset: 0,
            color: "#5831e7",
            opacity: 1
          },
          // {
          //   offset: 100,
          //   color: "#ffbc47",
          //   opacity: 1
          // },
        ]
      },
    },
  };

  const series = [percentage];

  return (
    <div style={{ textAlign: 'center' }}>
      <ReactApexChart options={options} series={series} type="radialBar" />
    </div>
  );
};

export default SemiCircleChart;
