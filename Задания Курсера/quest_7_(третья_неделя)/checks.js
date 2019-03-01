// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var date = require('./index.js');


var time = date('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
    console.info(time.value);
assert.deepEqual(
    time.value,
    '2017-04-20 14:00',

    'Если к дате "2017-05-16 13:45" ' +
    'прибавить 24 часа, 3 дня и 15 минут, вычесть 1 месяц, ' +
    'то получится "2017-04-20 14:00"'
);
time = date('2016-04-26 15:00')
    .add(5, 'days')
    .add(0, 'days');
    console.info(time.value);
time = date('2016-05-01 15:00')
    .subtract(5, 'days');
    console.info(time.value);
/*

Failed tests:
№1 Дата "2016-04-26 15:00" после операций "[["add",5,"days"]]" должна стать "2016-05-01 15:00",
№2 Дата "2016-05-01 15:00" после операций "[["subtract",5,"days"]]" должна стать "2016-04-26 15:00"

*/
// assert.throws принимает функцию и
// проверяет, что она выбрасывает исключение определенного типа
assert.throws(
    function () {
        date('2017-05-16 13:45').add(2, 'hui');
    },
    TypeError,

    'Если попытаться прибавить к дате световой год, ' +
    'то выбросится исключение TypeError'
);

assert.throws(
    function () {
        date('2017-05-16 13:45').add(-2, 'years');
    },
    TypeError,
    'Если попытаться передать в функцию add отрицательное число – выбросится исключение TypeError'
);

console.info('OK!');
