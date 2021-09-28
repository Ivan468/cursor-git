<?php
if (array_key_exists('messageFF', $_POST)) {
  mail ("pig1995z@gmail.com",
        "заполнена контактная форма с ".$_SERVER['HTTP_REFERER'],
        "Имя: ".$_POST['nameFF']."  Email: ".$_POST['contactFF']." Сообщение: ".$_POST['messageFF']);
  echo $_POST['nameFF'];
}
?>