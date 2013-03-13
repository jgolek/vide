/**
 * Table 
 *
 * @param {[Object]} model.items
 */
function Table(model){
	this.items = model.items
	console.log("ITEMS", this.items());
	//this.header = model.header

	this.buildLink = function(data){
		return "/questionary1_static?userId="+data.userId()+"&teenId="+data.teenId()+"&resultId="+data.id
	}

	this.hasUserResult = function(data){
		return data.user() != null;
		//return "/questionary_static?userId=1&teenId=1&resultId=1"
	}
};