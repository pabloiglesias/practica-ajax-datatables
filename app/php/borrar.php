<?php 
header('Acces-Control-Allow-Origin:*');
/*sql_details = array(
	'user' => 'root',
	'pass' => 'root',
	'db' => 'Clinicas',
	'host' => 'localhost',
*/	$doc=$_REQUEST['doctor'];
	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES UTF-8");
	$dsn="mysql:host=localhost,dbname=Clinicas";
	$usu= "root";
	$pass="root";
	$sql='DELETE FROM vdoctoresclinicas WHERE nombre='.$doc;'DELETE FROM doctores where nombre='$doc;
	$dews=new PDO($dsn,$usu,$pass,$opc);
	if ($dws){
		$resul=$dews->prepare($sql);
		$result-execute();
		if ($result->rowCount()===0 )
		{
			$mensaje="Doctor No Borrado";	
			$estado=0;
		}
		else{
			$mensaje="Doctor Borrado"
		}
	$resultado[]=array('mensaje'=>$mensaje,'estado'=>$estado);
	echo json_encode($resultado);

?>