/**
 * Условия
Гарантируется, что массив содержит только хештеги.
Массив может быть пустым. В этом случае должна вернуться пустая строка.
Хештег — непустая строка, состоящая из одного слова.
Повторяющиеся хештеги нужно игнорировать.
При сравнении хештегов следует игнорировать регистр букв.
Порядок хештегов из исходного массива должен сохраниться.

forEach(function(elem,index,arrayResult)
    {
        if(elem == nativeElem)
        {
            delete arrayResult[index];
        }
    });
 * @param {String[]} hashtags
 * @returns {String}
 */

 // toLowerCase
module.exports = function (hashtags) {
    var stringResult = "";
    var object = {};
    for(var i = 0; i < hashtags.length; i++)
    {
        hashtags[i] = hashtags[i].toLowerCase();
    }
    stringResult = unique(hashtags).join(", ");

    return stringResult;
};


function unique(arr) {
    var obj = {};
  
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(obj); // или собрать ключи перебором для IE8-
}