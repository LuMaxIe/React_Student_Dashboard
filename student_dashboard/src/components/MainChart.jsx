import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import chartDataCreator from '../helpers/chartCreator';
import { useSelector } from 'react-redux';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const MainChart = () => {

  const baseData = useSelector(state => state.rootReducer.graphDataState);
  const baseDisplay = useSelector(state => state.rootReducer.graphDisplayState)

  return (
    <div className='chart-container'>
      <Chart className='main-chart' type='bar' data={chartDataCreator(baseData, baseDisplay)} />
    </div>
  )
}