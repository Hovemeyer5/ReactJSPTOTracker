<?
require_once("db_object.php");
require_once("error.php");
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
    public $errors = array();

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

    private function isValidEmail(){
        $isValid = true;
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            array_push($this->errors, new Error("Invalid Email: Must be of the format 'example@example.com'."));
            $isValid = false;
        }
        return $isValid;
    }

    private function isValidPassword(){
        $isValid = true;
        //has a number
        if(!preg_match('/[0-9]/', $this->password)){
            array_push($this->errors, new Error("Invalid Password: Must have a number."));
            $isValid = false;
        }
        //has an upper case
        if(!preg_match('/[A-Z]/', $this->password)){
            array_push($this->errors, new Error("Invalid Password: Must have an upper case letter."));
            $isValid = false;
        }
        //has a lower case
        if(!preg_match('/[a-z]/', $this->password)){
            array_push($this->errors, new Error("Invalid Password: Must have a lower case letter."));
            $isValid = false;
        }
        //length >= 8
        if(strlen($this->password) < 8){
            array_push($this->errors, new Error("Invalid Password: Must be eight characters or longer."));
            $isValid = false;
        }
        return $isValid;
    }

    private function isRegistrantAlreadyAUser(){
        $isValid = false;

        $this->userInstance->byUsername($this->email);
        if(strlen($this->userInstance->first_name) > 0) {
            array_push($this->errors, new Error("Invalid Email: There already exists a user with that password."));
            $isValid = true;
        }
        return $isValid;
    }
    private function isRequired($prop, $propDisplay){
        $isValid = true;
        if(!isset($this->{$prop})){
            array_push($this->errors, new Error("Required Field: " . $propDisplay . " must have a value."));
            $isValid = false;
        }
        return $isValid;
    }
        
    private function validateRegistrant(){
        $isValid = true;
        if(!$this->isValidEmail()){
            $isValid = false;
        }
        if(!$this->isValidPassword()){
            $isValid = false;
        }
        if($this->isRegistrantAlreadyAUser()){
            $isValid = false;
        }
        if($this->isRequired("password", "'Password'")){
            $isValid = false;
        }
        if($this->isRequired("email", "'Email'")){
            $isValid = false;
        }
        if($this->isRequired("first_name", "'First Name'")){
            $isValid = false;
        }
        if($this->isRequired("first_name", "'Last Name'")){
            $isValid = false;
        }
        return $isValid;
    }
    
    public function register(){
        if(!$this->validateRegistrant()){
            return false;
        }
        return true;
    }

}
?>