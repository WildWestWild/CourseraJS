/**
 * Условия
Гарантируется, что в функцию передаются два целых числа.
Часы мы считаем правильными, если они находятся в диапазоне [0, 23].
Минуты мы считаем правильными, если они находятся в диапазоне [0, 59]. Если часы и минуты правильные, то возвращаем 'true', иначе — 'false'.
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    if (Number.isInteger(hours) && Number.isInteger(minutes) && (hours >= 0 && hours <= 23) && ( minutes >= 0 && minutes <= 59 )) 
    {
        return true;
    }
    else 
    {
        return false;
    }
};
