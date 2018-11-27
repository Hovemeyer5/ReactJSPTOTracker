<?
require_once("db_object.php");
class User extends DBObject
{
  
    public $table = "users";
    public $props = array('id', 'first_name', 'last_name', 'email', 'password', 'is_admin');

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $is_admin;

    public function __construct() {
        parent::__construct();
    }
  
    public function byEmail($email){
        $users = parent::select('*', 'email = "'.$email.'"');
        if($users !== ""){
            $user = $users[0];
            parent::map($user);
        } else {
            parent::clearDbObject();
        }
    }
    public function fromRegistrant($registrant){
        foreach($this->props as $prop){
            $this->{$prop} = $registrant->{$prop};
        }
        $this->id = null;
    }
    public function createUser(){
        $addToDB = parent::insert($this->table,
            'null, '
            . '"' . $this->first_name . '", '
            . '"' . $this->last_name . '", '
            . '"' . $this->email . '" ,'
            . '"' . $this->password . '" ,'
            .  $this->is_admin 
        );
        if(!$addToDB){
            array_push($this->errors, new Error("Error: Could not save user to database."));
        }
        return $addToDB;
    }
   
}
?>