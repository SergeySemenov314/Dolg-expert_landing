<?php

ini_set('display_errors','On');
error_reporting('E_ALL');



if ( !empty($_POST) && count($_POST) > 0) {

  // Файлы phpmailer

  require 'phpmailer/PHPMailer.php';

  require 'phpmailer/SMTP.php';

  require 'phpmailer/Exception.php';




  function clean($value = "") {

     $value = trim($value);

     $value = stripslashes($value);

     $value = strip_tags($value);

     $value = htmlspecialchars($value);

     

     return $value;

  }

  $file_name = 'orderNum.txt';

  $number = file_get_contents($file_name);

  $number++;

  file_put_contents($file_name, $number);


  
  $email_message = '';

  if (!empty($_POST['name']) && trim($_POST['name']) != '') {$email_message .= '<b>Имя:</b> ' . clean($_POST["name"]) . '<br>' . "\n";}

  if (!empty($_POST['phone']) && trim($_POST['phone']) != '') {$email_message .= '<b>Телефон:</b> ' . clean($_POST["phone"]) . '<br>' . "\n";}

  if (!empty($_POST['consent']) && trim($_POST['consent']) != '') {$email_message .= '<b>Согласие с условиями обработки персональных данных:</b> ' . clean($_POST["consent"]) . '<br>' . "\n";}



  $mail = new PHPMailer\PHPMailer\PHPMailer();

  try {

      $msg = "ok";

      $mail->isSMTP();   

      $mail->CharSet = "UTF-8";                                          

      $mail->SMTPAuth   = true;

      // Настройки почты, с которой будут отправляться письма

      $mail->Host       = 'ssl://smtp.yandex.ru'; // SMTP сервера 

      $mail->Username   = 'example@yandex.ru'; // Логин на почте
      $mail->Password   = 'example'; // Пароль на почте
      $mail->SMTPSecure = 'ssl';
      $mail->Port       = 465;
      $mail->setFrom('example@yandex.ru', 'Название сайта'); // Адрес самой почты и имя отправителя
      // Получатель письма
      $mail->addAddress('example@yandex.ru');  

          // Само письмо

          // -----------------------

          $mail->isHTML(true);

      

          $mail->Subject = 'Заявка №' . $number .' с сайта ' . $_SERVER['HTTP_HOST']; ;

          $mail->Body    = $email_message;



    // Проверяем отравленность сообщения

    if ($mail->send()) {

      echo "";

    } else {

      echo "Форма не отправлена. Ошибка в настройках почты сайта";

      

    }

  } catch (Exception $e) {

     echo "Форма не отправлена. Причина ошибки: {$mail->ErrorInfo}";

  }



}



 ?>
<!DOCTYPE html>
<html>

<head>
	
  <meta charset='UTF-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>
  <title>Ваша заявка принята</title>
  <style>
    body {
      margin: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      line-height: 1.5;
      background-color: rgb(238, 241, 243);
    }

    .thankyou {
      overflow: hidden;
      box-sizing: border-box;
      min-height: 100vh;
      background: url(../images/thanks-page/thankyou-bg.jpg) center bottom no-repeat #fdfdff;
      text-align: center;
      position: relative;
      padding: 10px;
      font-size: 16px;
    }

    .thankyou__title {
      color: rgb(10, 161, 80);
      font-size: 36px;
    }

    .thankyou__title--error {
      color: #da0000;
    }

    .thankyou__divider {
      max-width: 100%;
    }

    .thankyou__image {
      position: absolute;
      bottom: 0;
      left: 5%;
    }

    .thankyou__notice {
      font-size: 13px;
    }

    .button {
      background: transparent linear-gradient(to bottom, rgb(13, 181, 57) 0%, rgb(0, 144, 67) 100%) repeat scroll 0 0;
      border: none;
      border-bottom: 2px solid rgb(21, 90, 53);
      outline: 0 none;
      padding: 15px 25px;
      text-transform: uppercase;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
    }

    .button:hover {
      -webkit-transform: translateY(-1px);
      -moz-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
      -o-transform: translateY(-1px);
      transform: translateY(-1px);
    }


    
    @media(max-width: 767px) {
      .button {
        font-size: 11px;
      }

      .thankyou__notice {
        margin-bottom: 20px;
      }
    }


    @media all and (max-width: 600px) {
      .thankyou__title {
        font-size: 30px;
      }
    }

    @media all and (max-height: 500px) {
      .thankyou__image {
        width: 130px;
        height: auto;
      }
    }
  </style>
</head>

<body>
  <div class='thankyou'>

    <h1 class="thankyou__title">Спасибо, заявка принята!</h1>
    <p>
      Менеджер свяжется с Вами в течение 15 минут </p>
    <img class="thankyou__divider" src="../images/thanks-page/thankyou-divider.png">
    <p class="thankyou__notice">Если Вы допустили ошибку, вернитесь на страницу заказа и отправьте форму еще раз</p>

    <a href="/" class="button" style="text-decoration:none;">Вернуться на главную страницу</a>
    <img class="thankyou__image" src="../images/thanks-page/thankyou-girl.png">
  </div>
  
</body>

</html>
