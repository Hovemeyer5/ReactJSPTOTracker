<?
require_once("db_object.php");
class User extends DBObject
{
  
    public $table = "users";
    public $props = array('id', 'first_name', 'last_name', 'username', 'password', 'is_admin');

    public $id;
    public $first_name;
    public $last_name;
    public $username;
    public $password;
    public $is_admin;

    public function __construct() {
        parent::__construct();
    }
  
    public function byUsername($username){
        $users = parent::select('*', 'username = "'.$username.'"');
        if($users !== ""){
            $user = $users[0];
            parent::map($user);
        } else {
            parent::clearDbObject();
        }
    }
   
}
?>