<?php

class Product
{
	private $conn;
	private $table = "products";

	public $id;
	public $name;
	public $description;
	public $price;
	public $category_id;
	public $category_name;
	public $created;

	public function __construct($db)
	{
		$this->conn = $db;
	}

	public function read()
	{
		$query = "SELECT  c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created FROM " . $this->table. " p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created DESC";
		$stmt = $this->conn->prepare($query);
		$stmt->execute();
		return $stmt;
	}
}

?>