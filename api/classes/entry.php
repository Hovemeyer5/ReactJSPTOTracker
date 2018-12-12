<?
require_once("db_object.php");
class Entry extends DBObject
{
  
    public $table = "entry";
    public $props = array(
        'id', 
        'start_date', 
        'end_date', 
        'user_id',
        'credit',
        'debit',
        'description'
    );

    public $id;
    public $start_date;
    public $end_date;
    public $credit;
    public $debit;
    public $description;
    public $user_id;

    public function __construct() {
        parent::__construct();
    }
  
    public function createYearInitialPTOAccrual($userId, $year, $accrualRate){
        echo "<br>UserId: ". $userId;
        echo "<br>Year: ". $year;
        echo "<br>Rate: ". $accrualRate;
        /*
        $accruals = parent::select('*', 'user_id = '.$userId. ' AND effective_date BETWEEN "'.$year.'-01-01" AND "'.$year.'-12-31"');
        if($accruals !== ""){
            return $accruals[0];
        } 
        return array();
        */
    }
    public function add(){

    }
}
?>