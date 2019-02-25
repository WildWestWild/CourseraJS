/**Строка содержит только буквы русского и латинского алфавита, знак решетки и пробелы.
Гарантируется, что в функцию передается непустая строка.
Слова в строке разделены одним пробелом.
Хештег начинается со знака решетки (#) и состоит из одного слова.
В результирующем массиве хештеги должны быть без решетки.
Если в слове хештегов нет, то возвращается пустой массив.
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    //Найдём символ хэштега в строке
    var arrayOfHashTag = [];
    if  (tweet.indexOf("#")== -1)
    {
        return [];
    }
    else
    {
        while(tweet.indexOf("#")!= -1)
        {
            var positionHashTag = tweet.indexOf("#");// Сохраним позицию тэга в переменной
            if (tweet.indexOf(" ",positionHashTag) != -1 ) // Если хэштэг заканчивается пробелом,возьмём слово до пробела, иначе до конца строки
            {
                var resultArrString = tweet.substring(positionHashTag+1, tweet.indexOf(" ",positionHashTag)); 
            }
            else
            {
                var resultArrString = tweet.substring(positionHashTag+1, tweet.length);
            }
            tweet = tweet.slice(positionHashTag+1);
            arrayOfHashTag.push(resultArrString);
            
        }
        return arrayOfHashTag;
    } 
};
