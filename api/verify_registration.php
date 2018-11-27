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
$verificationData = json_decode(json_encode(json_decode($request_body)), true);
$registered = false;
if ( !empty($verificationData)) {
    $verifiedRegistrant = new Registrant($verificationData, new User());
    $verifiedRegistrant->bySelector($verificationData['selector']);

    $registered = $verifiedRegistrant->createUser($verificationData['validator']);
} 
if(!$registered){
    header('X-PHP-Response-Code: 418', true, 418);
    echo json_encode($verifiedRegistrant->errors);
}
?>