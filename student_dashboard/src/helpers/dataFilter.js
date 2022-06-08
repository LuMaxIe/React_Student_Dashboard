/* eslint-disable no-eval */
/* eslint-disable array-callback-return */

const assignmentsFilter = (searchTerms, scoreObject, operatorType, namingType) => {
  const operatorTerms = [];
  const namingTerms = [];
  let resultOperator = false;
  let resultNaming = false;

  searchTerms.forEach((term) => {
    if(term.match(/((==)|(>=)|(<=)|<|>)\d/gm)) {
      operatorTerms.push(term)
    } else {
      namingTerms.push(term)
    }
  });

  operatorTerms.forEach((term) => {
    if(resultOperator) { return }
    if(eval(`${Number(scoreObject[operatorType])}${term}`)) {
      resultOperator = true
    }
  })

  namingTerms.forEach((term) => {
    if(resultNaming) { return }
    if(scoreObject[namingType].includes(term)) {
      resultNaming = true
    }
  })

  if(namingTerms.length === 0) { resultNaming = true }
  if(operatorTerms.length === 0) { resultOperator = true }

  const evaluation = resultNaming === true && resultOperator === true ? true : false;
  return evaluation
}

export default assignmentsFilter

