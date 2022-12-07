<?php 
require_once('./phpmailer/PHPMailerAutoload.php'); //папка phpmailer должна лежать в одной директории с этим файлом (ссылка на скачивание выше)
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name']; //добавляем все нужные переменные
$phone = $_POST['phone']; //добавляем все нужные переменные

$mail->isSMTP();                                      
$mail->Host = 'mail.hosting.reg.ru'; //проще всего делать через gmail. В "Управление аккаунтом Google" выбираем "Безопасность". Почти в самом низу будет "Ненадежные приложения, у которых и т.д." - это мы должны включить!

$mail->SMTPAuth = true;
$mail->Username = ''; //реальная gmail почта
$mail->Password = 'c4ixS9dBexWxPGq'; //реальный пароль от этой почты
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom(''); //повторяем ту же gmail почту 
$mail->addAddress('jon199995@gmail.com'); //куда хотим получать письма (уже не обязательно от гугла)

$mail->isHTML(true); //включаем html разметку в письме  

//это оптионально (необязательно)
$title = "<h1>Новая заявка</h1>"; //заголовок
$date = date("d.m.y H:i"); //дата

//это обязательно
$mail->Subject = 'Заявка от ' .$date; //заголовок письма
$mail->Body = $title. '<p><strong>Имя:</strong> ' .$name. '</p><p><strong>Телефон:</strong> ' .$phone; //"тело" письма, т.к. мы включили html, может теперь красиво оформить его

//проверка на отправку. Можно сделать вывод текста, можно отправить юзера на какую-то страницу
if(!$mail->send()) {
    echo 'Ошибка';
} else {
    header('Location: thx.html');
}
?>
