function getValue(){ 
	getCategories(0, 5, ["id", true], [["name", "ITEM 1"]])
	.then((data) => {console.log(data)})
	.catch(console.log("error ebaniy"));
}