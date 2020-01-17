module.exports = function parseStringAsArray(arrayAsString){
    if (!arrayAsString.includes(','))
        return [arrayAsString]

    return arrayAsString.split(',').map(a => a.trim());
}