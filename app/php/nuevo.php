<?php
header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
$nombredoctor = $_REQUEST['doctor'];
if (isset($_REQUEST['numcolegiado'])) {
	$numcolegiado = $_REQUEST['numcolegiado'];
} else {
	$numcolegiado = null;
}

$clinicas = $_REQUEST['clinicas'];
try {
	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	$dsn = "mysql:host=localhost;dbname=Clinicas";
	$usu = "root";
	$pass = "root";
	$consultaClinicas = "SELECT max(id_doctor) as ultimo FROM doctores;";
	$dwec = new PDO($dsn, $usu, $pass);
	if (isset($dwec)) {
		$resul = $dwec->prepare($consultaClinicas);
		$resul->execute();
		$result = $resul->fetch();
		$id_doctor = $result['ultimo'] + 1;
		$consulta = "INSERT INTO doctores (id_doctor , nombre , numcolegiado) VALUES (\" $id_doctor\" , \" $nombredoctor \" , \" $numcolegiado \");";
		foreach ($clinicas as $key => $valor) {
			$consulta .= "INSERT  INTO clinica_doctor (id_doctor,id_clinica,numdoctor)VALUES ";
			$consulta .= "(  \"$id_doctor\",\" $valor\",null);";
		}
		$resul = $dwec->prepare($consulta);
		$resul->execute();
	}
} catch (PDOException $e) {
	die("Error: " . $e->getMessage());
}
if (!$resul) {
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