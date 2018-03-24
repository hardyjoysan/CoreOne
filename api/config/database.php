<?php

class Database
{
    private $host = "localhost";
    private $dbname = "coreone";
    private $username = "root";
    private $password = "123456";

    public function getConnection()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=".$this->host."; dbname=".$this->dbname, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection Error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}

?>