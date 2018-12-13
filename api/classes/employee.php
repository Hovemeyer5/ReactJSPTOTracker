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
        $this->Accrual = $accrualInstance;
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
        $year = $year ? $year : date("Y");
        $this->Accrual->getCurrentAccrual($this->id, $year);
        
        if($this->Accrual->id === NULL){
            $this->Accrual->createYearInitialAccrual($this->id, $year);
            $this->Entry->createYearInitialPTOAccrual($this->id, $year, $this->Accrual->accrual);
        }
        
        $this->accrualRate = $this->Accrual->accrual;

        //$this->entries = $this->Entry->getEntriesForYear($this->id, $year);

        //$this->rollover = $this->Entry->getRolloverForYear($this->id, $year);

        //$this->rquests = $this->Request->getRequestsForYear($this->id, $year);
    }
   
}
?>
