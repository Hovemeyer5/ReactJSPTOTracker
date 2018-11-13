<?php
class ptoEntry {
    public $id;
    public $startDate;
    public $endDate;
    public $description;
    public $used;
    public $credit;

    public function __construct($id, $startDate, $endDate, $description, $used, $credit) {
        $this->id = $id;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->description = $description;
        $this->used = $used;
        $this->credit = $credit;
    }
}

$rollover = 40;
$accrual_rate = 13.33;

$initial = array(
    new ptoEntry(1, "01/01/19", "01/01/19", "Initial Balance", 0.00, $rollover)
);

for($i = 1; $i <= 12; $i++){
    $month = $i < 10 ? "0" . $i : $i;
    $startDate = date('m/d/Y', mktime(0, 0, 0, $month, 1, 2019));
    $endDate = $startDate;
    array_push(
        $initial,
        new ptoEntry($i + 1, $startDate, $endDate, $startDate . " Acrrual", 0.00, $accrual_rate)
    );
}

echo json_encode($initial);

?>