<?php
//password is not my password!

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

ob_start();
include('config.php');
require_once('classes/user.php');
ob_end_clean();

$request_body = file_get_contents('php://input');
$data = json_decode(json_encode(json_decode($request_body)), true);

if ( !empty($data)) {
    if ( isset( $data['username'] ) && isset( $data['password'] ) ) {

        $user = new User();
        $user->byUsername($data['username']);
        
        $sentpasswordhash  = hash("sha256", $data['password'].DB_SALT);
    	if ($sentpasswordhash == $user->password) {
            $_SESSION['user_id'] = $user->id;
            echo $user->toJson();
            exit;
    	}
    } 
} 

header('X-PHP-Response-Code: 401', true, 401);

?>