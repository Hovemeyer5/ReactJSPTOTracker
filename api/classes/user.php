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
   
}
?>