<?php
$to = "pig1995z@gmail.com";//Почтовый ящик на который будет отправленно сообщение
  $subject = "Відповідь на вашу заявку";//Тема сообщения
  
  $message = "Повідомлення ";//Сообщение, письмо
  $headers = "Content-type:  text/html; charset=utf-8 \r\n ";//Шапка сообщения, содержит определение типа письма, от кого, и кому отправить ответ на письмо
   
 
// Проверяем или метод запроса POST
if($_SERVER["REQUEST_METHOD"] == "POST"){
		// Поочередно проверяем или были переданные параметры формы, или они не пустые
		if(isset($_POST["username"]))
		 {
			//Если параметр есть, присваеваем ему переданое значение
			$name 		=trim(strip_tags($_POST["username"]));
		}
		if(isset($_POST["usernumber"]))
		{
			$number 	= trim(strip_tags($_POST["usernumber"]));
		}
		if (isset( $_POST["question"])) {
			$question 	= trim(strip_tags($_POST["question"] ));
		}
			// Формируем письмо
			$message  = "<html> <body> Телефон: ".$number;
				$message  .= "<br/>";
				$message  .= "<h1>Имя:".$name;
				$message  .= "<br/></h1>";
				$message  .= " <b> Вопрос: </b> ".$question;
				$message  .= "</body>";
			$message  .= "</html>";
			// Окончание формирования тела письма
			// Посылаем письмо
			mail ($to, $subject, $message, $headers);
}
else
{
	exit;
} 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<h1>Дякуємо за заявку</h1>
</body>
</html>