<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/category.php';

$database = new Database();
$db = $database->getConnection();

$category = new Category($db);

$stmt = $category->readAll();

if($stmt->rowCount() > 0 ){

    $categories_arr = array();
    $categories_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $category_item=array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description)
        );
        array_push($categories_arr["records"], $category_item);
    }

    echo json_encode($categories_arr, JSON_PRETTY_PRINT);
    
}else{
    echo json_encode( array("message" => "No products found.") );
}
?>