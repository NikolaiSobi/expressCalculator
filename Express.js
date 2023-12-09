const express = require('express')
const app = express()

app.use(express.json())


app.get('/mean', (req, res) => {
    if(Object.keys(req.query).length === 0){
        return res.status(400).send("numbers are required")
    }

    let numString = req.query.nums
    let numArr = numString.split(",")
    let intArr = []
    for(let num of numArr){
        let value = parseInt(num)
        if(!value){
            return res.status(400).send(`${num} is not a number`)
        }
        intArr.push(value)
    }

    let sum = 0
    for(let i = 0; i < intArr.length; i++){
        sum += intArr[i]
    }
    let mean = sum / intArr.length

    let answer = {
        operation: 'mean',
        value: `${mean}`
    }
    return res.json(answer);
})

app.get('/median', (req, res) => {
    if(Object.keys(req.query).length === 0){
        return res.status(400).send("numbers are required")
    }

    let numString = req.query.nums
    let numArr = numString.split(",")
    let intArr = []
    for(let num of numArr){
        let value = parseInt(num)
        if(!value){
            return res.status(400).send(`${num} is not a number`)
        }
        intArr.push(value)
    }

    let numIdx = Math.floor(intArr.length / 2)

    if(intArr.length % 2 === 0){
        let median = (intArr[numIdx] + intArr[numIdx - 1]) / 2
        return res.send(`Median = ${median}`)
    }

    let answer = {
        operation: 'median',
        value: `${intArr[numIdx]}`
    }

    return res.json(answer);
})

app.get('/mode', (req, res) => {
    if(Object.keys(req.query).length === 0){
        return res.status(400).send("numbers are required")
    }

    let numString = req.query.nums
    let numArr = numString.split(",")
    let intArr = []
    for(let num of numArr){
        let value = parseInt(num)
        if(!value){
            return res.status(400).send(`${num} is not a number`)
        }
        intArr.push(value)
    }

    let numsObj = {}
    for(let i = 0; i < intArr.length; i++){
        if(intArr[i] in numsObj){
            numsObj[intArr[i]] += 1
        } else {
            numsObj[intArr[i]] = 1
        }
    }

    let currentKey
    let maxKey = 0
    let currentValue
    let maxValue = 0
    for(key in numsObj){
        let value = numsObj[key]
        currentKey = key
        currentValue = value
        if(currentValue > maxValue){
            maxValue = currentValue
            maxKey = currentKey
        }
    }
    let answer = {
        operation: 'mode',
        value: `${maxKey}`
    }
    return res.json(answer)
})

app.listen(3000, function(){
    console.log('App on port 3000')
})
