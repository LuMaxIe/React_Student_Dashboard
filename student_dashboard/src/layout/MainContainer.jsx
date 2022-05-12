import React from 'react'
import { ChartOptions } from '../components/ChartOptions'
import { MainChart } from '../components/MainChart'

export const MainContainer = () => {
  return (
    <div className='main-container'>
      <MainChart />
      <ChartOptions />
    </div>
  )
}
