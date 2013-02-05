function Repository(data){

	function RepositoryData(data, parent){
		var cache = {}; // todo: discuss to rename in children.
		var self = this;
		//self.parent = parent;
		//self.children = cache;

		self.get = function(name, Type){
			if(cache[name]) {
				return cache[name];
			} else {
				var typeData = new RepositoryData(data[name], self );
				var typeObs = ko.observable(new Type(typeData));
				cache[name] = typeObs;
				return typeObs;					
			}
		};
		self.getList = function(name, Type){
			if(cache[name]) {
				return cache[name];
			} else {
				var array = data[name];
				var arrayWithTypes = [];
				for(var i; i < array.length; i++){
					var typeData = new RepositoryData( array[i], self );
					var type = new Type(typeData);
					arrayWithTypes.add(type);
				}
				var arrayObs = ko.observableArray(arrayWithTypes);
				cache[name] = arrayObs;
				return arrayObs;
			}
		};
	}

	var self = this;

	var repositoryData = new RepositoryData(data);
	self.get = repositoryData.get;
}