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
        $this->user_id = $userId;
        $this->credit = $accrualRate;
        $this->debit = 0;

        for($i = 1; $i <=12; $i++){
            $month = $i < 10 ? "0" . $i : $i;
            $this->start_date = date("Y-m-t", strtotime($year. "-" . $month . "-01"));
            $this->end_date = $this->start_date;
            $this->description =  date("F", strtotime($year. "-" . $month . "-01")) . " Monthly Accrual";
            $this->add();
        }
    }
    public function add(){
        return parent::insert($this->table,
            'NULL, ' 
            . '"' . $this->start_date . '", '
            . '"' . $this->end_date . '", '
            . '"' . $this->description . '", '
            . $this->credit . ', '
            . $this->debit . ', '
            . $this->user_id
        );
    }
}
?>