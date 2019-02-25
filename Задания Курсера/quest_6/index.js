// Телефонная книга
/*

* Условия
* Гарантируется, что функция будет вызываться корректно, только со списком перечисленных команд. Корректность входных данных проверять не нужно.
* Имя команды пишется большими буквами, параметры разделяются одним пробелом.
* Гарантируется уникальность добавляемых телефонов.

*/
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function(command) {
  //Выделение комманды из строки command
  var object = {
    mainString: command
  };

  var regExp = /\s/;
  var subStringCommandOnly = GetSubString(object, regExp);

  switch (subStringCommandOnly) {
    case "ADD":
      AddOrDeleteElemPhoneBook(phoneBook, object, true);
      return phoneBook;
    case "REMOVE_PHONE":
      return AddOrDeleteElemPhoneBook(phoneBook, object, false);;
    case "SHOW":
      return ShowAllNames(phoneBook);
    default:
      return;
  }
};
function GetSubString(object, regExp) {
  //Функция выделения подстроки из строки
  var getIndex = object.mainString.search(regExp);
  var subString = "";
  if (getIndex != -1) {
    subString = object.mainString.substring(0, getIndex);
    object.mainString = object.mainString.substring(
      getIndex,
      object.mainString.length
    );
    if (object.mainString != "") {
      // Если не пустая строка
      if (object.mainString[0] == " " || object.mainString[0] == ",") {
        // Если пробел или запятая, удалим их
        object.mainString = object.mainString.substring(
          1,
          object.mainString.length
        );
      }
    }
  } else {
    subString = object.mainString;
  }
  return subString;
}

function AddOrDeleteElemPhoneBook(phoneBook, object, flag) {
  //flag - если true, добавь элемент, если false - удали
  {
    var subStringNumber = "";
    var regExp = /\s/;
    if (flag == true) {
      // Добавляем элемент: Находим имя, если имя уже свойство объекта, записываем номер, если нет, то добавляем свойство
      var subStringName = GetSubString(object, regExp);
      if (!phoneBook.hasOwnProperty(subStringName)) {
        // Добавим свойство
        phoneBook[subStringName] = [];
      }
      regExp = /\b,\b/; //проверим, есть ли запятая
      while (object.mainString != "") {
        if (regExp.test(object.mainString)) {
          subStringNumber = GetSubString(object, regExp); // получим номер до запятой
          AddToProperty(phoneBook, subStringName, subStringNumber); // Добавим к свойству объекта номер
        } else {
          subStringNumber = object.mainString;
          object.mainString = "";
          AddToProperty(phoneBook, subStringName, subStringNumber);
        }
      }
      return true;
    } else {
      var untilLength =0;
      var afterLength =0;
      //Удалим элемент
      for (let key in phoneBook) {
        untilLength += phoneBook[key].length;
        phoneBook[key] = phoneBook[key].filter(function(item) {
          return item != object.mainString;
        });
        afterLength += phoneBook[key].length;

      }
      if (untilLength != afterLength) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function AddToProperty(phoneBook, subStringName, subStringNumber) {
  return phoneBook[subStringName].push(subStringNumber);
}

function ShowAllNames(phoneBook) {
  var arrayOfRecords = [];

  for (let key in phoneBook) {
    if (phoneBook[key].length != 0) {
      arrayOfRecords.unshift(key + ": " + phoneBook[key].join(", "));
    } else {
      delete phoneBook[key];
    }
  }
  return arrayOfRecords;
}
