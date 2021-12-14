exports.wordAccuracy = (search, topic) => {
    console.log("Starting comparison between "+search+" and "+topic)
    let l = search.length;
    let accValues = [];
    for(let tryy=0;tryy<l;tryy++){
        accValues.push(this.letterToLetterComparison(search, topic, tryy))
    }
    console.log("recap of all the accurcies found: "+accValues)
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
    console.log("Comparing (FL2L) "+search+" with topic "+topic)
    let commonLetterInSameOrder = 0;
    let cptT = 0;
    for(let pS=0;pS<search.length;pS++){
        for(let pT=0;pS<topic.length;pS++){
            
        }
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
