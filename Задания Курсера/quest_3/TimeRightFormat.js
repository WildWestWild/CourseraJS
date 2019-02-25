/** 
*@param {string} hours
*@param {string} minutes
*/ 
module.exports = function (hours, minutes)
{
    hours.toString();
    minutes.toString();
    var result_string;
    if(hours.length == '1')
    {
        hours = "0" + hours;
    }
    if(minutes.length == '1')
    {
        minutes = "0" + minutes;
    }
    result_string = hours + ":" + minutes;
    console.log(result_string);
    return result_string;
}