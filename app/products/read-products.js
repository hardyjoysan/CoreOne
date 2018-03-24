$(document).ready(function(){
	showProducts();
});

$(document).on('click', '.read-products-button', function(){
	showProducts();
});

function showProducts(){
	$.getJSON("http://coreone.test/api/product/read.php", function(data){
 		var read_products_html = "";
		read_products_html += "<div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>";
		read_products_html += "<span class='glyphicon glyphicon-plus'></span> Create Product";
		read_products_html += "</div>";

		// start table
		read_products_html += "<table class='table table-bordered table-hover'>";
		read_products_html += "<tr>";
		read_products_html += "<th class='w-25-pct'>Name</th>";
		read_products_html += "<th class='w-10-pct'>Price</th>";
		read_products_html += "<th class='w-15-pct'>Category</th>";
		read_products_html += "<th class='w-20-pct text-center'>Action</th>";
		read_products_html += "</tr>";

		// loop through returned list of data
		$.each(data.records, function(key, val) {

			read_products_html+="<tr>";

			read_products_html+="<td>" + val.name + "</td>";
			read_products_html+="<td>$" + val.price + "</td>";
			read_products_html+="<td>" + val.category_name + "</td>";

			read_products_html+="<td class='text-center'>";
				// read one product button
				read_products_html+="<button class='btn btn-primary m-r-10px read-one-product-button' data-id='" + val.id + "'>";
				read_products_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
				read_products_html+="</button>";

				// edit button
				read_products_html+="<button class='btn btn-info m-r-10px update-product-button' data-id='" + val.id + "'>";
				read_products_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
				read_products_html+="</button>";

				// delete button
				read_products_html+="<button class='btn btn-danger delete-product-button' data-id='" + val.id + "'>";
				read_products_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
				read_products_html+="</button>";

			read_products_html+="</td>";

			read_products_html+="</tr>";
		});

		read_products_html += "</table>";

		// inject to 'page-content'
		$("#page-content").html(read_products_html);

		// chage page title
		changePageTitle("Read Products");
	});
}