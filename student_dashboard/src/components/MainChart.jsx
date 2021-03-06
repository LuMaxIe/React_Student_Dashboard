import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import newChartDataCreator from '../helpers/chartCreator'
import { useSelector } from 'react-redux';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip
);

export const MainChart = () => {

  const rawData = useSelector(state => state.rootReducer.assignmentScores);
  const baseDisplay = useSelector(state => state.rootReducer.graphDisplayState);

  return (
    <div className='chart-container'>
      <Chart className='main-chart' type='bar' data={newChartDataCreator(rawData, baseDisplay)}/>
    </div>
  )
}
