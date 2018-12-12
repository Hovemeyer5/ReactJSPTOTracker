<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

ob_start();
require_once('classes/employee.php');
require_once('classes/accrual.php');
require_once('classes/entry.php');
ob_end_clean();

$request_body = file_get_contents('php://input');
$userId = json_decode(json_encode(json_decode($request_body)), true);

$AccrualInstance = new Accrual();
$EntryInstance = new Entry();

$mockEmployee = new Employee($AccrualInstance, $EntryInstance);
$mockEmployee->byId($userId['id']);
$mockEmployee->getPTODetailsByYear();
$mockEmployee->rollover  = 38.82;
$mockEmployee->requests = array(
    array(  'id' => 1,
                'startDate' => date('Y-m-d'),
                'endDate' => date('Y-m-d'),
                'description' => 'Mock Entry',
                'amount' => 8,
                'user_id' => 4
            )
        );
echo $mockEmployee->toJson();
/*
if ( !empty($verificationData)) {
    $verifiedRegistrant = new Registrant($verificationData, new User());
    $verifiedRegistrant->bySelector($verificationData['selector']);

    $registered = $verifiedRegistrant->createUser($verificationData['validator']);
} 
if(!$registered){
    header('X-PHP-Response-Code: 418', true, 418);
    echo json_encode($verifiedRegistrant->errors);
}
*/
?>