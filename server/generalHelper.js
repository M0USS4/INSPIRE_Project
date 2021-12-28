exports.fixStringDateFromSQL = (date) => {
    try{
    let dateToFix = new Date(date);
    let fixedDate = new Date(dateToFix.getTime()+2*60*60*1000)
    return(fixedDate.toISOString().slice(0,10))}
    catch(err){
        return date
    }
}

exports.fixStringDateTimeFromSQL = (date) => {
    try{
    let dateToFix = new Date(date);
    let fixedDate = new Date(dateToFix.getTime()+60*60*1000)
    return(fixedDate)}
    catch(err){
        return date
    }
}