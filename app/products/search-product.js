$(document).ready(function(){
    $(document).on('submit', '#search-product-form', function(){

            var keywords = $(this).find(":input[name='keywords']").val();
            $.getJSON("http://coreone.test/api/product/search.php?s=" + keywords, function(data){

                    readProductsTemplate(data, keywords);
                    changePageTitle("Search products: " + keywords);

            });
            return false;
    });
    
});