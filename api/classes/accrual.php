<?
require_once("db_object.php");
class Accrual extends DBObject
{
  
    public $table = "users";
    public $props = array('id', 'accrual', 'effective_date', 'user_id');

    public $id;
    public $accrual;
    public $effective_date;
    public $user_id;

    public function __construct() {
        parent::__construct();
    }
  
    public function allByUserId($userId, $year){
        $accruals = parent::select('*', 'user_id = '.$userId. ' AND effective_date BETWEEN "'.$year.'-01-01" AND "'.$year.'-12-31"');
        if($accruals !== ""){
            return $accruals[0];
        } 
        return array();
    }
}
?>