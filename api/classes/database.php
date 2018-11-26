<?php
require_once(dirname(__FILE__)."/../config.php");
class Database
{
		protected $conn;
		protected $queryResult;

		public function __construct()
		{
			$this->conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DB);

			if (!$this->conn)
				die("Sorry. Unable to connect.");
		}

		public function __destruct()
		{
			$this->closeConnection();
		}	

		public function closeConnection()
		{
			if($this->conn)
				mysqli_close($this->conn);
		}

		public function select($table, $columns = '*', $where = null, $orderby = null, $limit = null)
		{
            $results = "";
			$q = "SELECT $columns FROM $table";
			if($where != null)
				$q .= " WHERE $where";

			if ($orderby != null)
				$q .= " ORDER BY $orderby";

			if ($limit != null)
				$q .= " LIMIT $limit";

			$this->queryResult = mysqli_query($this->conn, $q);

			if (!$this->queryResult)
				return false;

			while($row = mysqli_fetch_array($this->queryResult))
			{
				$results[] = $row;
			}

			return $results;
		}

		public function insert($table, $values, $columns=null)
		{
			$q = "INSERT INTO " . $table;

			if ($columns != null)
				$q .= " ($columns)";

			$q .= " VALUES ($values)";

			mysqli_query($this->conn, $q);

			if (mysqli_error($this->conn) || mysqli_affected_rows($this->conn) == 0)
			{
				return false;
			}

			return true;
		}

		public function update($table, $column, $where=null)
		{
			$q = "UPDATE $table SET $column";

			if ($where != null)
				$q .= " WHERE $where";

			mysqli_query($this->conn, $q);

			if (mysqli_error($this->conn) || mysqli_affected_rows($this->conn) == 0)
				return false;
	
			return true;
		}

		public function delete($table, $where=null)
		{
			$q = "DELETE FROM $table";

			if($where != null)
				$q .= " WHERE $where";

			mysqli_query($this->conn, $q);

			if (mysqli_error($this->conn) || mysqli_affected_rows($this->conn) == 0){
				return false;
			}
				

			return true;
		}
	}



?>