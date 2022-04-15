<?php
if(isset($_SERVER['HTTP_ORIGIN'])){
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Header: Origin, X-requested-With, Content-Type, Accept');
}

$response = array();

if (isset($_POST['nim']) && isset($_POST['nama']) && isset($_POST['prodi']) && isset($_FILES['foto']) ) {
	$nim = $_POST['nim'];
	$nama = $_POST['nama'];
	$prodi = $_POST['prodi'];
	$foto = $_FILES['foto'];
	
	require_once __DIR__ . '/dbconfig.php';

	$db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

	$source = $foto['tmp_name'];
	$destination = 'uploads/' . $foto['name'];
	move_uploaded_file($source, $destination);

	$result = mysqli_query($db, "INSERT INTO students(nim, nama, prodi, foto) VALUES('$nim', '$nama', '$prodi', '$destination')");
	
	if($result) {
		$response["success"] = 1;
		$response["message"] = "Data Mahasiswa berhasil dimasukkan";
	} else {
		$response["success"] = 0;
		$response["message"] = "Ada kesalahan";
	}
	echo json_encode($response);
} else {
	$response["success"] = 0;
	$response["message"] = "data tidak lengkap";	
	echo json_encode($response);
}
?>