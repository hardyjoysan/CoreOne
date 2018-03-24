$(document).ready(function(){
	$(document).on('click', '.update-product-button', function(){
		var id = $(this).attr('data-id');
		$.getJSON("http://coreone.test/api/product/read_one.php?id=" + id, function(data){
			var name = data.name;
			var price = data.price;
			var description = data.description;
			var category_id = data.category_id;
			var category_name = data.category_name;

			// load list of categories
			$.getJSON("http://coreone.test/api/category/read.php", function(data){
				var categories_options_html = "";
				categories_options_html += "<select name='category_id' class='form-control'>";

				$.each(data.records, function(key, val){
					if(val.id==category_id){
						categories_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
					}else{
						categories_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
					}
				});
				categories_options_html+="</select>";

				var update_product_html="";
				update_product_html+="<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>";
					update_product_html+="<span class='glyphicon glyphicon-list'></span> Read Products";
				update_product_html+="</div>";

				update_product_html+="<form id='update-product-form' action='#' method='post' border='0'>";
				update_product_html+="<table class='table table-hover table-responsive table-bordered'>";

					// name field
					update_product_html+="<tr>";
						update_product_html+="<td>Name</td>";
						update_product_html+="<td><input value=\"" + name + "\" type='text' name='name' class='form-control' required /></td>";
					update_product_html+="</tr>";

					// price field
					update_product_html+="<tr>";
						update_product_html+="<td>Price</td>";
						update_product_html+="<td><input value=\"" + price + "\" type='number' min='1' name='price' class='form-control' required /></td>";
					update_product_html+="</tr>";

					// description field
					update_product_html+="<tr>";
						update_product_html+="<td>Description</td>";
						update_product_html+="<td><textarea name='description' class='form-control' required>" + description + "</textarea></td>";
					update_product_html+="</tr>";

					// categories 'select' field
					update_product_html+="<tr>";
						update_product_html+="<td>Category</td>";
						update_product_html+="<td>" + categories_options_html + "</td>";
					update_product_html+="</tr>";

					update_product_html+="<tr>";

					// hidden 'product id' to identify which record to delete
					update_product_html+="<td><input value=\"" + id + "\" name='id' type='hidden' /></td>";

					// button to submit form
					update_product_html+="<td>";
						update_product_html+="<button type='submit' class='btn btn-info'>";
							update_product_html+="<span class='glyphicon glyphicon-edit'></span> Update Product";
						update_product_html+="</button>";
					update_product_html+="</td>";

					update_product_html+="</tr>";

				update_product_html+="</table>";
				update_product_html+="</form>";

				// inject to 'page-content'
				$("#page-content").html(update_product_html);
				// chage page title
				changePageTitle("Update Product");
			});
		});
	});

	$(document).on('submit', '#update-product-form', function(){
		var form_data = JSON.stringify($(this).serializeObject());
		$.ajax({
			url: "http://coreone.test/api/product/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				showProducts();
			},
			error: function(xhr, resp, text) {
				console.log(xhr, resp, text);
			}
		});
		return false;
	});
});