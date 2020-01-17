<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://dev-ajht6p99.auth0.com/oauth/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"client_id\":\"UfVxmSh0z5jBcI6FKhAsfRxNO4o7DRHa\",\"client_secret\":\"TbWHj68v4LA4u4Ve4gDYheeTb3-CLRgVaxSGIyscWWRfXuObUCCTtubKcrcRZ0qj\",\"audience\":\"https://chamadotiapi.com \",\"grant_type\":\"client_credentials\"}",
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo json_encode($response);
}