$(document).ready(function(){
	showProductsFirstPage();
	$(document).on('click', '.read-products-button', function(){
		showProductsFirstPage();
	});

	$(document).on('click', '.pagination li', function(){
		var json_url = $(this).find('a').attr('data-page');
		showProducts(json_url);
	});
});

function showProductsFirstPage(){
	var json_url = "http://coreone.test/api/product/read_paging.php";
	showProducts(json_url);
}

function showProducts(json_url){
	$.getJSON(json_url, function(data){
		// html for listing products
		readProductsTemplate(data, "");
		// chage page title
		changePageTitle("Read Products");
	});
}