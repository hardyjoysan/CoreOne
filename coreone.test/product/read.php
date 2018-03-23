<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$stmt = $product->read();
$num = $stmt->rowCount();

if($num>0){

	$products_arr = array();
	$products_arr["records"] = array();

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
	echo json_encode($products_arr, JSON_PRETTY_PRINT);
}

else{
	echo json_encode(
		array("message" => "No products found.")
	);
}

?>