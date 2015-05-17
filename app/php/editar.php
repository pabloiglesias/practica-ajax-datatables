<?php
header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
$id_doctor = $_REQUEST['doctor'];
$nombredoctor = $_REQUEST['nombre'];
$clinicas = $_REQUEST['clinicas'];
if (isset($_REQUEST['numcolegiado'])) {
	$numcolegiado = $_REQUEST['numcolegiado'];
} else {
	$numcolegiado = null;
}
try {
	//borrado
	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	$dsn = "mysql:host=localhost;dbname=Clinicas";
	$usu = "root";
	$pass = "root";
	$sql = "DELETE FROM clinica_doctor WHERE id_doctor=?;";
	$dwes = new PDO($dsn, $usu, $pass);
	$resul = $dwes->prepare($sql);
	$resul->execute(array($_REQUEST['doctor']));
	$sql1 = "DELETE FROM doctores where id_doctor=?;";
	$resul1 = $dwes->prepare($sql1);
	$resul1->execute(array($_REQUEST['doctor']));

	//creacion
	$sql2 = "SELECT max(id_doctor) as ultimo FROM doctores;";
	$resul2 = $dwec->prepare($sql2);
	$resul2->execute();
	$max = $resul2->fetch();
	$id_doctor = $max['ultimo'] + 1;
	$sql3 = "INSERT INTO doctores (id_doctor , nombre , numcolegiado) VALUES (\" $id_doctor\" , \" $nombredoctor \" , \" $numcolegiado \");";
	foreach ($clinicas as $key => $valor) {
		$sql3 .= "INSERT  INTO clinica_doctor (id_doctor,id_clinica,numdoctor)VALUES ";
		$sql3 .= "(  \"$id_doctor\",\" $valor\",null);";
	}
	$resul3 = $dwec->prepare($sql3);
	$resul3->execute();

} catch (PDOException $e) {
	die("Error: " . $e->getMessage());
}
if (!$resul || !$resul1 || !$resul2 || !$resul3) {
	$mensaje = "Error en la Consulta";
	$estado = 0;
} else {
	$mensaje = "Doctor Modificado";
	$estado = 1;
}
$resultado = array();
$resultado[] = array(
	'mensaje' => $mensaje,
	'estado' => $estado,
);
echo json_encode($resultado);
?>