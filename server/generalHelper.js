exports.fixStringDateFromSQL = (dateToFix) => {
    let fixedDate = new Date(dateToFix.getTime()+2*60*60*1000)
    return(dBirthM.toISOString().slice(0,10))
}