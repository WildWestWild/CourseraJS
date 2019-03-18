module.exports = {
    /*
    on — подписка на событие;
    off — отписка от события;
    emit — оповещение всех подписчиков. 
    */
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        /* Подписывает на событие. На любое событие подписчик может подписаться неограниченное количество раз.
        
            event — название события, на которое подписываемся.
            subscriber — объект-подписчик.
            handler — функция-обработчик.        
        */
        var index_Arr_Subscriber = findIndexInArray(subscriber, this.storageAllSub);
        if (index_Arr_Subscriber != null) { // Если в массиве storageAllSub есть  подписчик с данным именем
               // Добавь в массив подписок функцию-обработчик (handler)
               this.storageAllSub[index_Arr_Subscriber].arrayOfEvents.push(addHandlerEvent(event, handler));
        } else { // Иначе  
            // 1. Добавь подписчика в массив storageAllSub. 
            // 2. Добавь в массив подписчика arrayOfEvents handlerEvent
            addNewSubscriber(subscriber, addHandlerEvent(event, handler), this.storageAllSub); 
            
        }
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
    /*
    Отписывает от события подписчика. После отписки, при возникновении данного события, никаких обработчиков, 
    связанных с этим подписчиком, не должно быть вызвано. Есть возможность повторно подписаться и снова получать события.
     */
    if (checkThatEventIsExist(event, this.storageAllSub)) {
        let j = 0; //index
            for (let i = 0, len = this.storageAllSub.length; i < len; i++) {
            if(this.storageAllSub[i].name == subscriber ) {
                    var indexArrOfEvent = this.storageAllSub[i].arrayOfEvents;
                        while (j < indexArrOfEvent.length) {
                            if (indexArrOfEvent[j].name == event) {
                                indexArrOfEvent.splice(j,1);
                                j--;
                            }  
                            j++;
                        }
                }
            }
        }
        return this; 
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        /* Оповещение всех подписчиков (не отписавшихся). Вызывает все функции-обработчики в порядке подписки. */
        if (checkThatEventIsExist(event, this.storageAllSub)) {
            for (let i = 0, len = this.storageAllSub.length; i < len; i++) {
                for (let j = 0, len = this.storageAllSub[i].arrayOfEvents.length; j < len; j++) {
                  this.storageAllSub[i].arrayOfEvents[j].handlerFuntion.call(this.storageAllSub[i].name);
                } 
              }  
            }
        return this;
    },
    storageAllSub: []
};
function addHandlerEvent(event, handler){
    var handlerEvent = {
            name: event,
            handlerFuntion: handler
        }
    return handlerEvent;

}
function addNewSubscriber(subscriber, handlerEvent, storageAllSub)
{
    var subscriberStore = {
        name: subscriber,
        arrayOfEvents: [],  // тут будут объекты handlerEvent 
    }
    subscriberStore.arrayOfEvents.push(handlerEvent); // Добавим handlerEvent в массив подписчика
    storageAllSub.push(subscriberStore); // добавим подписчика в общий массив для всех подписчиков
}
function findIndexInArray(value, array){ // Проверка, есть ли в массиве данный саб
   for (let i = 0, len = array.length; i < len; i++) {
       if (array[i].name == value) {
           return i;
       }
   }
   return null;
}
function checkThatEventIsExist(event, array)
{
    for (let i = 0, len = array.length; i < len; i++) {
        if(findIndexInArray(event, array[i].arrayOfEvents) != null){
            return true;
        }
    }
    return false;
}