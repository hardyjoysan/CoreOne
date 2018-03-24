<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/product.php';

$utilities = new Utilities();

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$stmt = $product->readPaging($from_record_num, $records_per_page);

if($stmt->rowCount() > 0){

    $products_arr = array();
    $products_arr["records"] = array();
    $products_arr["paging"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $product_item = array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price,
            "category_id" => $category_id,
            "category_name" => $category_name
        );

        array_push($products_arr["records"], $product_item);
    }

    $total_rows = $product->totalCount();
    $page_url = "{$home_url}product/read_paging.php?";
    $paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $products_arr["paging"] = $paging;

    echo json_encode($products_arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

}else{
    echo json_encode( array("message" => "No products found.") );
}
?>