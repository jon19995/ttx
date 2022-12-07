<?php 

$name = $_POST['FIO'];
$number = $_POST['number'];
$email = $_POST['email'];
$city = $_POST['city'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.hosting.reg.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';             // Наш логин
$mail->Password = 'c4ixS9dBexWxPGq';                     	// Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('test.ru', 'Work');   // От кого письмо 
$mail->addAddress('jon-95@list.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	ФИО: ' . $name . ' <br>
	Текст: ' . $number . '<br>
	E-mail: ' . $email . '<br>
	Город: ' . $city . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>