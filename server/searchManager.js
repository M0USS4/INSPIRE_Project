exports.wordAccuracy = (search, topic) => {
    console.log("Starting comparison between "+search+" and "+topic)
    let l = search.length;
    let accValues = [];
    let previousAcc = 0;
    let actualAcc = 0;
    for(let tryy=0;tryy<l;tryy++){
        actualAcc = this.letterToLetterComparison(search, topic, tryy);
        if(actualAcc>previousAcc){
            previousAcc = actualAcc;
        }
    }
    accValues.push(actualAcc)
    console.log("acc for L2L: "+accValues)
    let acc2 = this.fromFirstLetterComparison(search, topic)
    console.log("acc for FL2L: "+acc2)
    accValues.push(acc2);
    let max_value = accValues[0]
    for(let p = 1;p<accValues.length;p++){
        if(max_value<accValues[p]){
            max_value=accValues[p]
        }
    }
    return max_value;
    console.log("max values TOTAL is: "+max_value)
}

exports.letterToLetterComparison = (search, topic, startValue) => {
    console.log("Comparing (L2L) "+search+" with topic "+topic+" starting at "+startValue)
    let commonLetterInSameOrder = 0;
    let cptT = 0;
    for(let pS=startValue;pS<search.length;pS++){
        if(search.charAt(pS)==topic.charAt(cptT)){
            commonLetterInSameOrder++;
        }
        cptT++;
    }
    console.log("Found "+commonLetterInSameOrder+" letters in common")
    let accuracy = (commonLetterInSameOrder/search.length)*100
    console.log("Accuracy regarding the search is "+accuracy)
    return accuracy;
}

exports.fromFirstLetterComparison = (search, topic) =>{
    //console.log("Comparing (FL2L) "+search+" with topic "+topic)
    let values = [];
    for(let pS=0;pS<search.length;pS++){
        let found = false;
        let placementOfFound = 0;
        for(let pT=0;pT<topic.length;pT++){
            if(topic.charAt(pT)==search.charAt(pS)){
                found = true;
                placementOfFound = pT;
            }
        }
        if(found){
            let res = this.letterToLetterComparison(search, topic, placementOfFound)
            //console.log("on push: "+res)
            values.push(res)
        }
    }
    //console.log("found: "+values)
    let max_value = values[0]
    for(let p = 1;p<values.length;p++){
        if(max_value<values[p]){
            max_value=values[p]
        }
    }
    //console.log("max values is: "+max_value)
    return max_value;
}
exports.getAccPageProToSearch = (searchs, topics) =>{
    let values = []
    for (let search of searchs){
        let accValues = []
        for (let topic of topics){
            let acc = this.wordAccuracy(search, topic)
            //console.log("acc = "+acc)
            accValues.push(acc)
        }
        //console.log("accValues: "+accValues)
        let max_value = accValues[0]
        for(let p = 1;p<accValues.length;p++){
            if(max_value<accValues[p]){
                max_value=accValues[p]
            }
        }
        values.push(max_value)
        //console.log("total acc for search: "+max_value)
        console.log("for search "+search+" acc is: "+max_value)
    }
    let res = 0;
    let cpt = 0;
    let cptHundred = 0
    console.log(values)
    for (let value of values){
        //console.log(value)
        if(value>50){
            //console.log("> 50")
            res= res + value;
            cpt++;
            if(value==100){
                cptHundred++;
            }
        }
    }
    //console.log(res+" et "+cpt)
    let totalAcc = res/cpt;
    if(totalAcc==100){
        totalAcc+=(cptHundred-1)
    }
    console.log("Accuracy of pro page, regarding search: "+totalAcc)
}
