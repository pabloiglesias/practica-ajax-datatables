 <?php
$table = 'vdoctoresclinicas';

// Table's primary key
$primaryKey = 'nombre_doctor';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array(
		'db' => 'nombre_doctor',
		'dt' => 'nombre_doctor',
	),
	array(
		'db' => 'numcolegiado',
		'dt' => 'numcolegiado',
	),
	array(
		'db' => 'nombre_clinica',
		'dt' => 'nombre_clinica',
	),
);

// SQL server connection information
$sql_details = array(
	'user' => 'root',
	'pass' => 'root',
	'db' => 'Clinicas',
	'host' => 'localhost',
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require 'ssp.class.php';

echo json_encode(
	SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns)
);
?>