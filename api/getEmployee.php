<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

ob_start();
//require_once('classes/employee.php');
ob_end_clean();

$request_body = file_get_contents('php://input');
$userId = json_decode(json_encode(json_decode($request_body)), true);

$mockEmployee;
$mockEmployee['id'] = $userId['id'];
$mockEmployee['first_name'] = "Becca";
$mockEmployee['last_name'] = "Testing";
$mockEmployee['email'] = "example@example.com";
$mockEmployee['rollover']  = 38.82;
$mockEmployee['accrualRate'] = 13.33;
$mockEmployee['entries'] = array(
    array(  'id' => 1,
                'start_date' => time(),
                'end_date' => time(),
                'description' => 'Mock Entry',
                'debit' => 3,
                'credit' => 0,
                'user_id' => 4
            )
        );
$mockEmployee['requests'] = array(
    array(  'id' => 1,
                'start_date' => time(),
                'end_date' => time(),
                'description' => 'Mock Entry',
                'amount' => 8,
                'user_id' => 4
            )
        );
echo json_encode($mockEmployee);
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