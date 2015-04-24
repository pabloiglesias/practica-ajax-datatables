 <?php $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$
$table = 'vdoctoresclinicas';

// Table's primary key
$primaryKey = 'id_clinica';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
	array(
		'db' => 'id_doctor',
		'dt' => 'idDoctor',
	),
	array(
		'db' => 'nombre_doctor',
		'dt' => 'nombreDoctor',
	),
	array(
		'db' => 'numcolegiado',
		'dt' => 'numeroColegiado',
	),
	array(
		'db' => 'nombre_clinica',
		'dt' => 'nombreClinica',
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