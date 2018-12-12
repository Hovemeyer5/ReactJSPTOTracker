<?
require_once("user.php");
class Employee extends User
{

    public $rollover;
    public $accrualRate;
    public $entries;
    public $requests;

    private $Accrual;
    private $Entry;
    private $Request;

    public function __construct($accrualInstance = 1, $entryInstance = 2, $requestInstance = 3) {
        parent::__construct();
        $this->Accrual = $accrualRateInstance;
        $this->Entry = $entryInstance;
        $this->Request = $requestInstance;
        
    }
    public function toJson(){
        foreach($this->props as $prop){
            $dbobject[$prop] = $this->{$prop};
        }
        $dbobject['rollover'] = $this->rollover;
        $dbobject['accrualRate'] = $this->accrualRate;
        $dbobject['entries'] = $this->entries;
        $dbobject['requests'] = $this-requests;

        return json_encode($dbobject);
    }
    public function getPTODetailsByYear($year){
        $year = $year || date("Y");
        //get rollover by year

        //get current accrual rate
            //if $year = this year, get by date
            // if $year != this year, get last accrual of year.
        //if no accrual rate exists
            // create default accrual rate.
        
        //get entries

        //get requests
    }
   
}
?>
