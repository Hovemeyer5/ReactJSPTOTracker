<?
require_once("db_object.php");
class Registrant extends DBObject
{
  
    public $table = "users";
    public $props = array('id', 'first_name', 'last_name', 'email', 'password', 'is_admin', 'selector', 'validator');

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $is_admin;
    public $selector;
    public $validator;

    public $userInstance;

    public function __construct($registerData, $userInstance) {
        parent::__construct();
        $this->mapRegisterData($registerData);
        $this->userInstance = $userInstance;
    }
    private function mapRegisterData($registerData){
        $this->first_name = $registerData['first_name'];
        $this->last_name = $registerData['last_name'];
        $this->email = $registerData['email'];
        $this->password = $registerData['password'];
        $this->is_admin = $registerData['is_admin'];
    }
}
?>