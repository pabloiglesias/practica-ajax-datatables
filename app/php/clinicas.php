<?php
header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
$connect = mysql_connect("localhost", "root", "root")
or die('Could not connect: ' . mysql_error());
$bool = mysql_select_db("Clinicas", $connect);
if ($bool === False) {
	print "No puedo encontrar la bbdd";
}
//inicializamos el cliente en utf-8:
mysql_query('SET names utf8');
$query = "SELECT id_clinica,nombre FROM clinicas";
$result = mysql_query($query) or die("SQL Error: " . mysql_error());
$data = array();
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$data[] = array(
		'id_clinica' => $row['id_clinica'],
		'nombre' => $row['nombre'],
	);
}
$json = json_encode($data);
echo $json;
?>