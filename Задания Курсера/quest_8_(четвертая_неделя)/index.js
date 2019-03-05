/**
 * 
 * Условия
После выполнения функции 'query' не должна измениться исходная коллекция.
Если в функцию 'query' передать только коллекцию, то вернётся её копия.
Операция 'select' должна игнорировать несуществующие в объекте поля.
Несколько операций 'select' должны отработать как одна с пересечёнными аргументами. Например, если мы выбираем поля a и b, а затем b и c, то в результате должно выбраться только поле b.
Несколько операций 'filterIn' должны отработать как одна с пересечёнными аргументами. Например, если фильтруем поле по значениям a и b, а затем по b и c, то в результате отфильтроваться должно только по значени b.
Операции должны выполняться в определённом порядке. В первую очередь происходит фильтрация, а затем выборка полей. Таким образом, можно фильтровать коллекцию даже по тем полям, которые не указаны в функции select.
Порядок элементов после выполнения операций должен сохраниться.
Гарантируется, что функция 'query' будет вызываться корректно. Дополнительную проверку аргументов делать не нужно.
Предполагается, что поля объектов имеют значения типа String или Number.

 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
/*
Функция 'query'
Выполняет запрос к коллекции. Принимает коллекцию и операции. 
Возвращает коллекцию после применения всех операций. 
В качестве операций может быть использован 'filterIn', 'select'. 
*/
var newCollection = [];
    var objectOfNewCollection;
    for (let i = 0, len = collection.length; i < len; i++) {
        objectOfNewCollection = Object.assign({}, collection[i]);
        newCollection.push(objectOfNewCollection);
    }
    if (arguments.length > 1) {

        var args = [].slice.call(arguments);

        var resultCollection = changeCollection(newCollection, args);
        /*console.info("Старая коллекция");
        for (let i = 0, len = collection.length; i < len; i++) {
            console.info(collection[i]);
        }*/
        return resultCollection;
    } else {
        return newCollection;
    }
}

function changeCollection(fields, args){
    
    var resultFields = [];

        args.sort();
       for (let i = 0, len = fields.length; i < len; i++) {

            for (let j = 1, len = args.length; j < len; j++) {
               fields[i] = args[j](fields[i]);
               if(fields[i] == false ) 
               {
                   break;
               }
            }
            if (fields[i] != false) {
                resultFields.push(fields[i]);
            }
        }
        return resultFields;
}
/**
 * @params {String[]}
 */
function select() {
    
   /* Операция 'select'
    Позволяет выбрать определённые поля объектов коллекции. Принимает список полей.
    */
   var args = [].slice.call(arguments); // Args - массив состоящий из аргументов select 
  
    return function(newCollection){//Данная функция должна возвращать объект с теми полями, которые заданы в аргументах
        fieldsNew = {};//Объявляем новый объект
        for (let key in newCollection) { // Идём по свойствам старой коллекции
            if (newCollection.hasOwnProperty(key)) {
                for (let i = 0, len = args.length; i < len; i++) { // Идём по массиву аргументов select 
                   if (key == args[i]) { // Если свойство коллекции равно аргументу select
                       fieldsNew[key] = newCollection[key]; // Создадим свойство в объекте с содержимом из коллекции
                   } 
                }
            }
        }
        //console.info("Select");
        return fieldsNew; // Возвращаем новоиспеченный объект
    }
}


/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    
    /*
    Операция 'filterIn'
    Позволяет отфильтровать коллекцию. 
    Принимает название поля и допустимые значения. 
    После выполнения фильтрации должны остаться объекты, у которых поле имеет одно из допустимых значений.
    */
    return function(newCollection)
    {
        //console.info("FilterIn");
        var flag = false;
        //favoriteFruit(property): 'Картофель'(values)
        for (let key in newCollection) {
            if (key == property) {
                for (let i = 0, len = values.length; i < len; i++) {
                    if (newCollection[key] == values[i]) {
                        flag = true;
                    }
                }
            }
        }
        if (flag == true) {
            return newCollection;
        } else {
            return false;
        }
        
    }
}
module.exports = {
    query: query,
    select: select,
    filterIn: filterIn,
    changeCollection: changeCollection
};
