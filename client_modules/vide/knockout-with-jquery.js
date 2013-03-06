ko.bindingHandlers.call = {
    init : function(element, valueAccessor, allBindingsAccessor, value) {
        var fn = valueAccessor()['init'];
        var data = valueAccessor()['data'];
        fn($(element)[0], data, $(element));
    },
    update : function(element, valueAccessor, allBindingsAccessor, value) {
        var fn = valueAccessor()['update'];
        if(fn){
            var data = valueAccessor()['data'];
            fn($(element)[0], data);  
        }
    }
};
