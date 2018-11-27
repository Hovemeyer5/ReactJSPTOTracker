<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

ob_start();
include('config.php');
require_once('classes/registrant.php');
require_once('classes/user.php');
ob_end_clean();

$request_body = file_get_contents('php://input');
$registerData = json_decode(json_encode(json_decode($request_body)), true);
$registered = false;
if ( !empty($registerData)) {
    $registrant = new Registrant($registerData, new User());
    $deleteExistingRegistrant = new Registrant($registerData, new User());

    $deleteExistingRegistrant->byEmail();

    if(count($deleteExistingRegistrant->errors) > 0 ){
        foreach($deleteExistingRegistrant->errors as $error){
             array_push($registrant->errors, $error);
        }
    } else {
        $deleteExistingRegistrant->delete();
        $registered = $registrant->register();
    }
} 
if(!$registered){
    header('X-PHP-Response-Code: 418', true, 418);
    echo json_encode($registrant->errors);
}
?>