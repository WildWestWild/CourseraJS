/**
 * Условия
В функцию всегда передается строка в правильном и полном формате. Дополнительных проверок не требуется.
Формат даты — "YYYY‒MM‒DD HH:SS", где YYYY — год, MM — месяц, DD — день, HH — час, SS — минуты
В функции add/subtract всегда передается целое число
Гарантируется, что после всех манипуляций получится корректная дата, которая будет не ранее 1 января 2000 года

Функции add/subtract
Каждая функция принимает первым аргументом количество единиц, на которое нужно изменить дату, а вторым — единицу измерения.

Можно менять следующие значения: years (годы), months (месяцы), days (дни), hours (часы), minutes (минуты)

Обработка ошибок
Если первый аргумент отрицательный, либо второй содержит неизвестную единицу измерения, функции должны выбросить исключение TypeError.

function createObject() {
    return {
       first: function () {
           return this;
       },
       second: function () {
           return this;
       }
   }
}

createObject().first().second().second();


 * @param {String} date
 * @returns {Object}
 */


module.exports = function (date) {
    let regExp = /[0-9]+/g;
    arrayOfTimes = date.match(regExp).map(function(item){
        return parseInt(item, 10);
    });

    globalDate = {
        arrayOfTimes: [],
        resultString: "",
        value: "",
        add: function(time, nameOfTime){ // Добавление
            if (time < 0 ) {
                throw new TypeError("Значение time не может быть отрицательным!")
            } 
            arrayOfTimes = switchTime(time, nameOfTime, true, arrayOfTimes);
            var resultDate = new Date(arrayOfTimes[0],arrayOfTimes[1]-1,arrayOfTimes[2],arrayOfTimes[3],arrayOfTimes[4]);
            resultString = GetRightString(resultDate);
            this.value = resultString;
            return this;
        },
        subtract: function(time, nameOfTime){ //Вычитание
            if (time < 0 ) {
                throw new TypeError("Значение time не может быть отрицательным!")
            } 
            arrayOfTimes = switchTime(time, nameOfTime, false, arrayOfTimes);
            var resultDate = new Date(arrayOfTimes[0],arrayOfTimes[1]-1,arrayOfTimes[2],arrayOfTimes[3],arrayOfTimes[4]);
            resultString = GetRightString(resultDate);
            this.value = resultString;
            return this;
        }
    };
    return globalDate;

};

function switchTime(time, nameOfTime, flag , arrayOfTimes){
    switch (nameOfTime) {
        case 'years':
            return GetNewTimes(time, 0, flag , arrayOfTimes);
        case 'months': 
            return GetNewTimes(time, 1, flag , arrayOfTimes);
        case 'days':
            return GetNewTimes(time, 2, flag , arrayOfTimes);
        case 'hours': 
            return GetNewTimes(time, 3, flag , arrayOfTimes);
        case 'minutes': 
            return GetNewTimes(time, 4, flag , arrayOfTimes);    
        default:
            throw new TypeError("Введите корректное значение nameOfTime");
    }
}
function GetNewTimes(time, index, flag, arrayOfTimes)
{
    if (flag == true ) {//Добавление
        arrayOfTimes[index] += time;
        return arrayOfTimes;
    } 
    else{// вычитание 
        arrayOfTimes[index] -= time;
        return arrayOfTimes;
    }
}
function GetRightString(resultDate){
    var resultString = "";
    if (resultDate.getFullYear() < 2000) {
        throw new TypeError("Дата не раньше 1 января 2000 года");
    } else { 
        return resultString = resultDate.getFullYear().toString() + "-" + 
        pad(resultDate.getMonth()+1).toString() + "-" + 
        pad(resultDate.getDate()).toString() + " " +
        pad(resultDate.getHours()).toString() + ":" +
        pad(resultDate.getMinutes()).toString();
    }
    function pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      }  
}
