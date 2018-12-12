<?
require_once(dirname(__FILE__)."/../config.php");
require_once("db_object.php");
class Accrual extends DBObject
{
  
    public $table = "accrual";
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
    public function getCurrentAccrual($userId, $year){
        $effectiveDateLimiter = $year.'-12-31';
        if($year === date('Y')){
            $currentDate = date("Y-m-d");
        }
        $accrualResult = parent::select('*', 'user_id = '.$userId. ' AND effective_date <= "'.$currentDate.'"', null, 1);
        if($accrualResult !== ""){
            $accrual = $accrualResult[0];
            parent::map($accrual);
        } else {
            parent::clearDbObject();
        }
    }
    public function createYearInitialAccrual($userId, $year){
        $this->effective_date = $year.'-01-01';
        if($year === date('Y')){
            $this->effective_date = date("Y-m-d");
        }
        $this->user_id = $userId;
        $this->accrual = DEFAULT_ACCRUAL;
        $previousYearMostRecentAccrualResult = parent::select('*', 'user_id = '.$userId. ' AND effective_date < "'.$year.'-01-01"', null, 1);
        if($previousYearMostRecentAccrualResult !== ""){
            $this->$accrual = $previousYearMostRecentAccrualResult[0]['accrual'];
        }
        $add = $this->add();
        $this->getCurrentAccrual($userId, $year);
    }
    public function add(){
        return parent::insert($this->table,
            ' NULL , '
            . '"' . $this->accrual . '", '
            . '"' . $this->effective_date . '", '
            . $this->user_id
        );
    }
}
?>