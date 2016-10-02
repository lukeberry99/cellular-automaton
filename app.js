for ( let i = 0; i < 101; i++) {
  let div = document.createElement('div')
  document.querySelector('.row').appendChild(div)
}
randomizeRow(document.querySelector('.row'))

setInterval(duplicateRow, 100)

function randomState() {
  return Math.floor(
    Math.random() * (1 - 0 + 1)
  )
}

function randomizeRow(rowDiv) {
  for (let i = 0; i < rowDiv.childNodes.length; i++) {
    let div = rowDiv.childNodes[i]
    div.classList
      .add(randomState() ? 'active' : 'inactive')
  }
}

function duplicateRow() {
  let allRows = document.querySelectorAll('.row')
  let lastRow = allRows[allRows.length - 1]
  let clone = lastRow.cloneNode(true)

  document
    .querySelector('.root')
    .appendChild(clone)

  processRow(clone, lastRow)
}

function processRow(rowDiv, parentRowDiv) {
  for (let i = 0; i < rowDiv.childNodes.length; i++) {
    let target = rowDiv.childNodes[i]
    let prevSelf = parentRowDiv.childNodes[i]

    let leftSibling = 
      prevSelf.previousElementSibling ||
      parentRowDiv.childNodes[parentRowDiv.childNodes.length - 1]

    let rightSibling = 
      prevSelf.nextElementSibling ||
      parentRowDiv.childNodes[0]

    let ruleMatch = setActiveOnRuleMatch
      .bind(
        null,
        target,
        leftSibling,
        prevSelf,
        rightSibling
      )

    ruleMatch([1,1,1], false)
    ruleMatch([1,1,0], true)
    ruleMatch([1,0,1], false)
    ruleMatch([1,0,0], false)
    ruleMatch([0,1,1], true)
    ruleMatch([0,1,0], false)
    ruleMatch([0,0,1], false)
    ruleMatch([0,0,0], true)
  }
}

function setActiveOnRuleMatch(
  target,
  leftSibling,
  prevSelf,
  rightSibling,
  rule,
  outcome
) {
  let matchesRule = 
    state(leftSibling) === rule[0] &&
    state(prevSelf) === rule[1] &&
    state(rightSibling) === rule[2]

  if (matchesRule)
    changeState(target, outcome)
}

function state(cellDiv) {
  return cellDiv.classList.contains('active') ? 1 : 0
}

function isActive(cellDiv) {
  return cellDiv.classList.contains('active')
}

function changeState(cellDiv, isActive) {
  if (isActive) {
    cellDiv.classList.remove('inactive')
    cellDiv.classList.add('active')
  } else {
    cellDiv.classList.remove('active')
    cellDiv.classList.add('inactive')
  }
}
