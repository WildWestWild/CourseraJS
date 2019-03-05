// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

// Коллекция данных
var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];

var result = lib.query(friends);
console.info(result);

// Выполняем выборку и фильтрацию с помощью нашего конструктора
    result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);
    console.info("Новая коллекция");
for (let i = 0, len = result.length; i < len; i++) {
    console.info(result[i]); 
} 
// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [
    { name: 'Сэм', gender: 'Мужской', email: 'luisazamora@example.com' },
    { name: 'Эмили', gender: 'Женский', email: 'example@example.com' },
    { name: 'Мэт', gender: 'Мужской', email: 'danamcgee@example.com' },
    { name: 'Шерри', gender: 'Женский', email: 'danamcgee@example.com' },
    { name: 'Стелла', gender: 'Женский', email: 'waltersguzman@example.com' }
]);

console.info('OK!');
console.info(friends);
