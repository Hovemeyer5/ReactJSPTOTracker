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
$initial = array(
    new ptoEntry(1, "01/01/19", "01/01/19", "Initial Balance", "0.00", "100"),
    new ptoEntry(2, "02/01/19", "02/01/19", "Credit for February", "0.00", "15"),
);

echo json_encode($initial);
?>