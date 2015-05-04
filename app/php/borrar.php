<?php 
/*sql_details = array(
	'user' => 'root',
	'pass' => 'root',
	'db' => 'Clinicas',
	'host' => 'localhost',
*/
	$table = 'vdoctoresclinicas';

	$op = array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES UTF-8");
	$dsn="mysql:host=localhost,dbname=Clinicas";
	$usu= "root";
	$pass="root";
	$sql='DELETE FROM '.$table .'WHERE id_doctor=(SELECT id_doctor FROM Doctores Where nombre=:doctor )';'DELETE FROM doctores wher nombre=:doctor':
	$dews=new PDO($dsn,$usu,$pass,$opc);
	if ($dws){
		$resul=$dews->prepare($sql);

	}
?>