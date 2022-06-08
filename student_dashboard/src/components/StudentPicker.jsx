import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { adjustGraphDisplay } from '../redux/actions';

export const StudentPicker = () => {

  const dispatch = useDispatch();
  const graphSettings = useSelector(state => state.rootReducer.graphDisplayState);
  const assignmentScores = useSelector(state => state.rootReducer.assignmentScores);

  const studentNames = [...new Set(assignmentScores.map((x) => x.name))].map((y) => {
    return {label: y, value: y}
  });

  return (
    <Select
      className='basic-single-student'
      classNamePrefix='select'
      options={studentNames}
      onChange={(e) => {
        const newSettings = JSON.parse(JSON.stringify(graphSettings));
        newSettings['Avg difficulty'] = true;
        newSettings['Avg fun'] = true;
        newSettings['Difficulty bars'] = true;
        newSettings['Fun bars'] = true;
        newSettings['Display Count'] = studentNames.findIndex(object => object.value === e.value) + 1;
        newSettings['Display count start'] = studentNames.findIndex(object => object.value === e.value) + 1;
        newSettings['Data Type'] = 'name';
        newSettings['Search key words'] = [];
        dispatch(adjustGraphDisplay(newSettings));
      }}
    />
  )
}
