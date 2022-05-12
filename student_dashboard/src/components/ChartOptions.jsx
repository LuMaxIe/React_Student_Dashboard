import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { useSelector, useDispatch } from 'react-redux';
import { setGraphDataStudents, setGraphData, adjustGraphDisplay } from '../redux/actions';

const animatedComponents = makeAnimated();

export const ChartOptions = () => {

  const dispatch = useDispatch();
  const dataInput = useSelector(state => state.rootReducer.assignmentScores);
  const graphSettings = useSelector(state => state.rootReducer.graphDisplayState);
  const dataState = useSelector(state => state.rootReducer.graphDataState)

  const options = [
    { value: 'students', label: 'Students'},
    { value: 'assignments', label: 'Assignments'},
  ]
  const displayOptions = [
    { value: 'Avg difficulty', label: 'Avg difficulty'},
    { value: 'Avg fun', label: 'Avg fun'},
    { value: 'Total difficulty scores', label: 'Total difficulty scores'},
    { value: 'Total fun scores', label: 'Total fun scores'},
  ]

  const [dataFocus, setDataFocus] = useState('assignment');
  const [graphDisplaySettings, setGraphDisplaySettings] = useState(graphSettings);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(dataFocus === 'students') {
      dispatch(setGraphDataStudents(dataInput));
    }
    if(dataFocus === 'assignments') {
      dispatch(setGraphData(dataInput));
    }
    if(graphDisplaySettings !== graphSettings) {
      dispatch(adjustGraphDisplay(graphDisplaySettings));
    }
  }

  return (
    <div className='chart-options-container'>
      <form onSubmit={handleSubmit}>
        <label>Data Focus</label>
        <Select 
          className='basic-single'
          classNamePrefix='select'
          options={options}
          name='Data focus'
          onChange={(e) => setDataFocus(e.value)}
        />
        <label>Data slice start</label>
        <Select 
          className='basic-single-number-end'
          classNamePrefix='select'
          options={Object.keys(dataState).map((x, i) => {
            return { value: i+1, label:i+1}
          })}
          name='Data focus'
          onChange={(e) => {
            const newSettings = JSON.parse(JSON.stringify(graphDisplaySettings));
            newSettings['Display count start'] = e.value;
            setGraphDisplaySettings(newSettings);
          }}
        />
        <label>Data slice end</label>
        <Select 
          className='basic-single-number'
          classNamePrefix='select'
          options={Object.keys(dataState).map((x, i) => {
            return { value: i+1, label:i+1}
          })}
          name='Data focus'
          onChange={(e) => {
            const newSettings = JSON.parse(JSON.stringify(graphDisplaySettings));
            newSettings['Display Count'] = e.value;
            setGraphDisplaySettings(newSettings);
          }}
        />
        <label>Graph Display</label>
        <Select 
          className='basic-multi'
          classNamePrefix='select'
          options={displayOptions}
          name='Data focus'
          components={animatedComponents}
          onChange={(e) => {
            const newSettings = JSON.parse(JSON.stringify(graphDisplaySettings));
            const settingKeys = Object.keys(newSettings);
            const adjustedSettings = e.map((s) => s.value);

            settingKeys.forEach((setting) => {
              if(!adjustedSettings.includes(setting) && setting !== 'Display Count' && setting !== 'Display count start') {
                newSettings[setting] = false;
              }
              if(adjustedSettings.includes(setting) && setting !== 'Display Count' && setting !== 'Display count start'){
                newSettings[setting] = true;
              }
            });
            setGraphDisplaySettings(newSettings)
          }}
          isMulti={true}
        />
        <button type='submit'>
          Apply
        </button>
      </form>
    </div>
  )
}

//Assignment
//Studentname
//grade fun
//grade diff
