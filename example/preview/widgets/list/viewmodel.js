/**
 * List
 * 
 * @param {Object} model.items
 */
function List(model){
	var self = this;

	self.items = model.items;
}

/*****************
 * Testdata 
 * ***************
 */
{
	items:  """js: 
			[
				{ name: 'test1' },
				{ id: 1, name: 'test2' },
				{ id: 2, name: 'test3' } 
			]
			"""
}

