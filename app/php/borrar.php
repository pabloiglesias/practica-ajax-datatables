<?php
//header('Acces-Control-Allow-Origin:*');
header('content-type: application/json; charset=utf-8');
$doc = $_REQUEST['doctor'];
try {
	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	//$dsn = "mysql:host=localhost,dbname=pabloiglesias_ajax";
	//$usu = "pabloiglesias_dc";
	//$pass = "pabloiglesias";
	$dsn = "mysql:host=localhost;dbname=Clinicas";
	$usu = "root";
	$pass = "root";
	$sql = "DELETE FROM clinica_doctor WHERE id_doctor=?;";
	$dews = new PDO($dsn, $usu, $pass);
	$resul = $dews->prepare($sql);
	$resul->execute(array($_REQUEST['doctor']));
	$sql = "DELETE FROM doctores where id_doctor=?;";
	$result = $dews->prepare($sql);
	$result->execute(array($_REQUEST['doctor']));
} catch (PDOException $e) {
	die("Error: " . $e->getMessage());
}

if ($resul->rowCount() === 0 || $result->rowCount() === 0) {
	$mensaje = "Doctor No Borrado";
	$estado = 0;
} else {
	$mensaje = "Doctor Borrado";
	$estado = 1;
}

$resultado[] = array('mensaje' => $mensaje, 'estado' => $estado);
echo json_encode($resultado);
?>