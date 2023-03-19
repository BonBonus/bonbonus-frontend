import React, { useState, useEffect, FC } from 'react';
import { Chart } from 'primereact/chart';
import classNames from 'classnames'

interface IRatingsInDynamicChart {
  localRatingData: any[],
  className?: string
}
export const LineDemo: FC<IRatingsInDynamicChart> = ({ localRatingData, className }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const ratings = localRatingData?.map((bigNumber) => bigNumber.toNumber());

    const data = {
      labels: ['Visit 1', 'Visit2', 'Visit3', 'Visit4', 'Visit5', 'Visit6', 'Visit7'],
      datasets: [
        {
          label: 'Local Rating Dynamic',
          data: ratings,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, [localRatingData]);

  return (
    <div className={classNames("card", className)}>
    <Chart type="line" data={chartData} options={chartOptions} />
  </div>
)
}
