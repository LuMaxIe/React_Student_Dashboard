import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { useSelector, useDispatch } from 'react-redux';
import { adjustGraphDisplay } from '../redux/actions';

const animatedComponents = makeAnimated();

export const ChartOptions = () => {

  const dispatch = useDispatch();
  const graphSettings = useSelector(state => state.rootReducer.graphDisplayState);
  const assignmentScores = useSelector(state => state.rootReducer.assignmentScores)

  const options = [
    { value: 'assignments', label: 'Assignments'},
    { value: 'students', label: 'Students'},
  ]
  const displayOptions = [
    { value: 'Avg difficulty', label: 'Avg difficulty'},
    { value: 'Avg fun', label: 'Avg fun'},
    { value: 'None', label: 'None'}
  ]

  const [graphDisplaySettings, setGraphDisplaySettings] = useState(graphSettings);
  const [selectedDisplayOptions, setSelectedDisplayOptions] = useState(null)
  const [sliceOptions, setSliceOptions] = useState([...new Set(assignmentScores.map(
    x => x[graphSettings['Data Type']]
  ))].map((x, i) => {
    return ({label: i+1, value: i+1})
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
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
          placeholder={graphDisplaySettings['Data Type'] === 'assignment' ? 'Assignments' : 'Students'}
          name='Data focus'
          onChange={(e) => {
            const newSettings = JSON.parse(JSON.stringify(graphDisplaySettings));
            newSettings['Data Type'] = e.value === 'students' ? 'name' : 'assignment';
            setGraphDisplaySettings(newSettings);
            setSliceOptions([...new Set(assignmentScores.map(
              x => x[newSettings['Data Type']]
            ))].map((x, i) => {
              return ({label: i+1, value: i+1})
            }))
          }}
        />
        <label>Data slice start</label>
        <Select 
          className='basic-single-number-end'
          classNamePrefix='select'
          options={sliceOptions}
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
          options={sliceOptions}
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
          value={selectedDisplayOptions}
          onChange={(e) => {
            const newSettings = JSON.parse(JSON.stringify(graphDisplaySettings));
            const settingKeys = Object.keys(newSettings);
            const isNone = e.find(o => o.value === 'None') === undefined;
            console.log(isNone);
            if (!isNone) {
              newSettings['Avg fun'] = false
              newSettings['Avg difficulty'] = false
              setSelectedDisplayOptions(null)
            }
            if (isNone) {
              const adjustedSettings = e.map((s) => s.value);
              const excludedUpdateSettings = ['Display Count', 'Display count start', 'Data Type']
              settingKeys.forEach((setting) => {
                if(!adjustedSettings.includes(setting) && !excludedUpdateSettings.includes(setting)) {
                  newSettings[setting] = false;
                }
                if(adjustedSettings.includes(setting) && !excludedUpdateSettings.includes(setting)){
                  newSettings[setting] = true;
                }
              });
              setSelectedDisplayOptions(e);
            }
            setGraphDisplaySettings(newSettings);
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
