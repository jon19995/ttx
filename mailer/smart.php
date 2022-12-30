<?php 

$name = $_POST['FIO'];
$number = $_POST['number'];
$email = $_POST['email'];
$city = $_POST['city'];
$title = $_POST['title'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'maria.grigorieva.info@gmail.cofm';             // Наш логин
$mail->Password = 'sspyesynmrdedjye';                     	// Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->IsSendmail();
$mail->Port = 465; //465                                    // TCP port to connect to
 
$mail->setFrom('test.ru', 'Work');   // От кого письмо 
$mail->addAddress('info_grigorieva@mail.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Кто-то хочет записаться на ТТХ :)';
$mail->Body    = '
		Пользователь оставил данные <br>
	'. $title .' <br>
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