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
				var type = null;
				if(Type){
					var typeData = new RepositoryData(data[name], self );
					type = new Type(typeData);
				} else {
					type = data[name];
				}
				console.log(name, type);
				var typeObs = ko.observable(type);
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
				for(var i=0; i < array.length; i++){
					var typeData = new RepositoryData(array[i], self );
					var type = new Type(typeData);
					arrayWithTypes.push(type);
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