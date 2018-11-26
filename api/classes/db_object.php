<?
require_once("database.php");
class DbObject extends Database
{
    public $table;
    public $props;

    public function __construct() {
        parent::__construct();
    }
  
    public function all(){
        $dbobjects = $this->select('*',  null);
        return $dbobjects;
    }
    
    public function allToJSON(){
        return json_encode($this->all());
    }
    
    public function byId($id){
        $dbobjects = $this->select('*', "id = ".$id);
        if($dbobjects !== ""){
            $dbobject = $dbobjects[0];
            $this->map($dbobject);
        } else {
            clearDbObject();
        }
    }
    public function clearDbObject(){
        foreach($this->props as $prop){
            $this->{$prop} = null;
        }
    }

    public function toJson(){
        foreach($this->props as $prop){
            $dbobject[$prop] = $this->{$prop};
        }
        return json_encode($dbobject);
    }
    
    public function map($dbobject){
        foreach($this->props as $prop){
            $this->{$prop} = $dbobject[$prop];
        }
    }

    public function delete() {
        if($this->id == null){
            return false;
        }
    
        return parent::delete($this->table, "id = $this->id");
    }
    
    public function select($columns = '*', $where = null, $orderby = null, $limit = null){
        return parent::select($this->table, $columns, $where, $orderby, $limit);
    }
}
?>