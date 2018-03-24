$(document).ready(function(){
	showProducts();
});

$(document).on('click', '.read-products-button', function(){
	showProducts();
});

function showProducts(){

	$.getJSON("http://coreone.test/api/product/read.php", function(data){
		readProductsTemplate(data, "");
		// chage page title
		changePageTitle("Read Products");
	});
}