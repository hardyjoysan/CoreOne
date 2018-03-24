$(document).ready(function(){
	$(document).on('click', '.delete-product-button', function(){
		var product_id = $(this).attr('data-id');
		bootbox.confirm({
			message: "<h4>Do you want to remove the record? Please Confirm!</h4>",
			buttons: {
				confirm: {
					label: '<span class="glyphicon glyphicon-ok"></span> Yes',
					className: 'btn-danger'
				},
				cancel: {
					label: '<span class="glyphicon glyphicon-remove"></span> No',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if(result == true){
					$.ajax({
						url: "http://coreone.test/api/product/delete.php",
						type : "POST",
						dataType : 'json',
						data : JSON.stringify({ id: product_id }),
						success : function(result) {
							showProducts();
						},
						error: function(xhr, resp, text) {
							console.log(xhr, resp, text);
						}
					});
				}
			}
		});
	});
});