// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arrays) => {
    return arrays.map(array => createEmployeeRecord(array))
}

const createTimeInEvent = (record, dateStamp) => {
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1])
    record.timeInEvents.push({
        type: "TimeIn",
        hour,
        date
    })
    return record
}

const createTimeOutEvent = (record, dateStamp) => {
    let date = dateStamp.split(' ')[0]
    let hour = parseInt(dateStamp.split(' ')[1])
    record.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date
    })
    return record
}

const hoursWorkedOnDate = (record, date) => {
    const timeInHour = record.timeInEvents.find(obj => obj.date === date).hour
    const timeOutHour = record.timeOutEvents.find(obj => obj.date === date).hour
    return (timeOutHour - timeInHour)/100
}

const wagesEarnedOnDate = (record, date) => {
    const hours = hoursWorkedOnDate(record, date)
    return record.payPerHour * hours
}

const allWagesFor = (record) => {
    const daysWorked = record.timeInEvents
    return daysWorked.reduce((previousDay, currentDay) => previousDay + wagesEarnedOnDate(record, currentDay.date), 0)
}

const calculatePayroll = (recordsArray) => {
    return recordsArray.reduce((previousRecord, currentRecord) => previousRecord + allWagesFor(currentRecord), 0)
}
