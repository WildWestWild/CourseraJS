/**
 * Условия
На вход функция принимает 3 параметра: часы, минуты, интервал в минутах, на который нужно изменить время.
Гарантируется, что любой из 3 параметров целое положительное число.
Параметр часы принимает значение в диапазоне [0, 23].
Параметр минуты принимает значение в диапазоне [0, 59].
Прибавляемый интервал может быть больше 60 минут.
Переход в следующие сутки должен корректно обрабатываться.
Функция должна возвращать корректно отформатированное время: 1:2 –> 01:02
Failed tests: При добавлении 2880 мин. к 15:00 получится 15:00,
При добавлении 01 мин. к 23:58 получится 23:59
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */

module.exports = function (hours, minutes, interval) {
    // Выясним - сколько часов в интервале
    hours += interval/60;
    // Выясним - сколько минут в оставшемся интервале
    var minInterval = interval%60;
    if ((minutes + minInterval) > 59 ) 
    {
        hours++; // Минут оказалось более 59, значит добавим один час, и возьмём остаток от минут
        minutes = (minutes + minInterval)%60 ;  
    }
    else
    {
        minutes = (minutes + minInterval)%60;
    }
    
    // Если в интервале оказалось больше часов, то возьмем остаток от 23 для определения времени текущего дня
    if (hours > 23)
    {
        hours = hours%24;
    }
    //Убедимся, что hours - целое число
    hours = Math.floor(hours);
    // Функция перевода времени в верный формат
    return TimeRightFormar(hours.toString(), minutes.toString());
};

function TimeRightFormar(hours, minutes) // Фукнция перевода времени в формат xx : yy
{
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
    return result_string;
}