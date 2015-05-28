<?php
//header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
$id_doctor = $_REQUEST['doctor'];
$nombredoctor = $_REQUEST['docO'];
$clinicas = $_REQUEST['clinicas'];
if (isset($_REQUEST['numcolegiado'])) {
	$numcolegiado = $_REQUEST['numcolegiado'];
} else {
	$numcolegiado = null;
}
try {
	//borrado
	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	//$dsn = "mysql:host=localhost,dbname=pabloiglesias_ajax";
	//$usu = "pabloiglesias_dc";
	//$pass = "pabloiglesias";
	$dsn = "mysql:host=localhost;dbname=Clinicas";
	$usu = "root";
	$pass = "root";
	$sql = "DELETE FROM clinica_doctor WHERE id_doctor=?;";
	$dwes = new PDO($dsn, $usu, $pass);
	$resul = $dwes->prepare($sql);
	$resul->execute(array($id_doctor));
	$sql1 = "DELETE FROM doctores where id_doctor=?;";
	$resul1 = $dwes->prepare($sql1);
	$resul1->execute(array($id_doctor));

	//creacion
	$sql2 = "SELECT max(id_doctor) as ultimo FROM doctores;";
	$resul2 = $dwes->prepare($sql2);
	$resul2->execute();
	$max = $resul2->fetch();
	$id_doctor = $max['ultimo'] + 1;
	$sql3 = "INSERT INTO doctores (id_doctor , nombre , numcolegiado) VALUES (?,?,?);";
	$resul3 = $dwes->prepare($sql3);
	$resul3->execute(array($id_doctor, $nombredoctor, $numcolegiado));
	$sql4 = "";
	foreach ($clinicas as $key => $valor) {
		$sql4 .= "INSERT  INTO clinica_doctor (id_doctor,id_clinica,numdoctor)VALUES ";
		$sql4 .= "(  \"$id_doctor\",\" $valor\",null);";

	}
	$resul4 = $dwes->prepare($sql4);
	$resul4->execute();

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