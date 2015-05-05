<?php
header('Access-Control-Allow-Origin: *');
$host = "localhost";
$usuario = "root";
$pass = "root";
$db = "clinicas";
$mysql = new mysqli($host, $usuario, $pass, $db);
$mysql->set_charset('utf8');
$nombredoctor = $_REQUEST['nombre'];
$numcolegiado = $_REQUEST['colegiado'];
$clinicas = $_REQUEST['clinicas'];
if ($mysql->connect_error) {
	die('Error de conexión: ' . $mysqli->connect_error);
} else {
	$consultaClinicas = 'SELECT max(id_doctor) as ultimo FROM doctores';
	$ultimo = $mysql->query($consultaClinicas);
	$row = $max->fetch_array();
	$id_doctor = $row['ultimo'] + 1;
	$consulta = 'INSERT INTO doctores (id_doctor , nombre , numcolegiado) VALUES ("' . $id_doctor . '" , "' . $nombredoctor . '" , "' . $numcolegiado . '")';
	$query_res = $mysql->query($consulta);

	for ($i = 0; $i < count($clinicas); $i++) {
		$consulta1 = 'INSERT INTO vdoctoresclinicas (id_doctor , id_clinica) VALUES (' . $id_doctor . ',' . $clinicas[$i] . ')';
		$query_res1 = $mysql->query($consulta1);
	}
}
if (!$query_res || !$query_res1) {
	$mensaje = "Error en la Consulta";
	$estado = 0;
} else {
	$mensaje = "Doctor Añadido";
	$estado = 1;
}
$resultado = array();
$resultado[] = array(
	'mensaje' => $mensaje,
	'estado' => $estado,
);
echo json_encode($resultado);
?>