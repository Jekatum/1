<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

define('TELEGRAM_TOKEN', '5776149909:AAFvGeNbg0lavMPTOHA5gaZDxgyjpONgDsY');
define('TELEGRAM_CHATID', '-1001955630604');

function sendTelegramMessage($message) {
    $client = new Client(['base_uri' => 'https://api.telegram.org/bot'.TELEGRAM_TOKEN.'/']);
    try {
        $response = $client->request('GET', 'sendMessage', [
            'query' => [
                'chat_id' => TELEGRAM_CHATID,
                'text' => $message,
                'parse_mode' => 'html'
            ]
        ]);
        return $response->getStatusCode() == 200;
    } catch (RequestException $e) {
        // Обработка ошибок при отправке сообщения
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $urlSite = preg_replace('/\?.*/', '', $_SERVER['HTTP_REFERER']);

    $arr = array(
        'Новая заявка с сайта:' => '<a href="'.$urlSite.'">'.$urlSite.'</a>',
        'Имя:' => $_POST['name'],
        'Телефон:' => $_POST['phone'],
        'utm_source' => $_POST['utm_source'],
        'utm_medium' => $_POST['utm_medium'],
        'utm_campaign' => $_POST['utm_campaign'],
        'utm_term' => $_POST['utm_term'],
        'utm_content' => $_POST['utm_content'],
    );

    $message = '';
    foreach ($arr as $key => $value) {
        $message .= "<b>".$key."</b> ".$value."\n";
    }

    if (sendTelegramMessage($message)) {
        header("Location: success.php");
        exit;
    } else {
        echo "Ошибка отправки формы.";
    }
}
?>
