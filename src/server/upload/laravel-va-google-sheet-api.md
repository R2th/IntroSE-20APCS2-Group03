Bài này mình xin giới thiệu với các bạn làm sao để làm việc laravel với google sheet api, thực hiện các thao tác như đọc hay chỉnh sửa 1 file google sheet online.

## Cài đặt

Đầu tiên bạn vào trang này https://developers.google.com/sheets/api/quickstart/php, xong ấn vào `Enable the Google Sheets API`

![](https://images.viblo.asia/9d09dd35-a603-4a95-9ba7-feeadd715d65.png)


sau đó google sẽ tự động tạo 1 file json là `credentials.json`, bạn down file này về để vào trong thư mục config của laravel. 
> Chú ý file này nên giữ cẩn thận, vì nó sẽ được cấp quyền truy cập vào google driver của bạn\

> Nút enable này sẽ tự động làm mọi thao tác cho bạn như enable `google sheet api` và tạo key, không cần vào `console` của google làm gì thêm cả

Tiếp theo cài đặt thư viện api của google về:

```
composer require google/apiclient:^2.0
```

## Code thôi

Đầu tiên chúng ta cần tạo 1 command để thực hiện đọc cũng như update google sheet

```
php artisan make:command GoogleSheetApiCommand
```

lệnh này sẽ tạo 1 file `GoogleSheetApiCommand.php` trong thư mục `app/Console/Commands` của bạn,


Tiến hành đổi tên `$signature=google:sheet_api` tên bạn muốn đổi sao thì đổi, cái này không quan trọng
 
 Thêm 1 hàm `getGoogleClient` có nội dung như sau:
 
 ```php
 public function getGooogleClient()
	{
		$client = new Google_Client();
		$client->setApplicationName('Google Sheets API PHP Quickstart');
		$client->setScopes(Google_Service_Sheets::SPREADSHEETS);
		$client->setAuthConfig(config_path('credentials.json'));
		$client->setAccessType('offline');

		$tokenPath = storage_path('app/token.json');
		if (file_exists($tokenPath)) {
			$accessToken = json_decode(file_get_contents($tokenPath), true);
			$client->setAccessToken($accessToken);
		}

		if ($client->isAccessTokenExpired()) {
			if ($client->getRefreshToken()) {
				$client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
			} else {
				$authUrl = $client->createAuthUrl();
				printf("Open the following link in your browser:\n%s\n", $authUrl);
				print 'Enter verification code: ';
				$authCode = trim(fgets(STDIN));

				// Exchange authorization code for an access token.
				$accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
				$client->setAccessToken($accessToken);

				// Check to see if there was an error.
				if (array_key_exists('error', $accessToken)) {
					throw new Exception(join(', ', $accessToken));
				}
			}

			if (!file_exists(dirname($tokenPath))) {
				mkdir(dirname($tokenPath), 0700, true);
			}
			file_put_contents($tokenPath, json_encode($client->getAccessToken()));
		}

		return $client;
	}
 ```
 
Hàm này có chức năng lấy access token để dùng sau này, bạn cần chú ý một số chỗ sau đây:

> $client->setScopes(Google_Service_Sheets::SPREADSHEETS); chỗ này yêu cầu quyền truy cập, phần này có nghĩa là có quyền `see, edit, create, and delete your spreadsheets in Google Drive.`, nếu chỉ cho đọc, ko được sửa, xóa thì bạn chỉ cần dùng scopes này là đủ `SPREADSHEETS_READONLY`

>$tokenPath = storage_path('app/token.json'); là phần sẽ cache lại `access token` để dùng cho các lần sau nữa.


Tiếp theo trong hàm `handle` bạn update lại như sau:

```php
public function handle()
	{
		Log::debug('start update sheet 1 data');
		$client = $this->getGoogleClient();
		$service = new Google_Service_Sheets($client);
		$spreadsheetId = env('GOOGLE_SHEET_ID');
		$range = 'Sheet1!A2:D';

		// get values
		$response = $service->spreadsheets_values->get($spreadsheetId, $range);
		$values = $response->getValues();

		print_r($values);

		// add/edit values
		$data = [
			[
				'column A2',
				'column B2',
				'column C2',
				'column D2',
			],
			[
				'column A3',
				'column B3',
				'column C3',
				'column D3',
			],
		];
		$requestBody = new \Google_Service_Sheets_ValueRange([
			'values' => $data
		]);

		$params = [
			'valueInputOption' => 'RAW'
		];

		$service->spreadsheets_values->update($spreadsheetId, $range, $requestBody, $params);
		echo "SUCCESS \n";
		Log::debug('update sheet 1 data success');
	}
```

Hàm này mình tích hợp luôn phần get và edit của file google sheet, bạn cần chú ý một số chỗ sau đây:

> `$spreadsheetId = env('GOOGLE_SHEET_ID');` bạn cần để `ID` của file google sheet vào đây, có thể để trong env hoặc fix cứng chỗ này: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit nếu là link thế này thì `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` chính là `ID` của file này.

>  `$range = 'Sheet1!A2:D';` `Sheet1` là tên của sheet của bạn muốn đọc hay sửa, A2:D là thay đổi từ cột A2 đến D2,  A3 ->  D3 ..., không thay đổi A1 -> D1.

Như vậy là code xong rồi, còn 1 bước nữa là xong thôi
Bạn chạy lệnh sau
```
php artisan google:sheet_api
```

sau khi chạy lệnh này sẽ có 1 thông báo thế này: 
```
Open the following link in your browser:
https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&client_id=906893478304-XXXXXXXXXXXXXX
Enter verification code: 
```

bạn copy link kia vào và đưa vào vào trình duyệt, login email của bạn vào rồi cấp quyền accesss cho nó. cái này chỉ cần thực hiện lần đâu thôi, những lần sau không cần nữa.

Nếu sau khi login nó có hiện `This app isn't verified` thì click vào `Advanced` -> `Go to Quickstart (unsafe)` là được

![](https://images.viblo.asia/672645cd-4d98-4eeb-96b2-21219a505b00.png)

Khi `allow` thành công, bạn copy đoạn code nó hiển thị ra và page vào terminal là thành công
sau khi chạy xong chúng ta sẽ có đoạn excel như sau:

![](https://images.viblo.asia/c439f336-2eef-4d74-9a34-b4a8a8d844b0.png)

Full code của file như sau:

```php
<?php

namespace App\Console\Commands;

use App\Helpers\GoogleSheet;
use Illuminate\Console\Command;
use Google_Client;
use Google_Service_Sheets;
use Exception;
use Log;

class GoogleSheetApiCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'google:sheet_api';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	public function getGoogleClient()
	{
		$client = new Google_Client();
		$client->setApplicationName('Google Sheets API PHP Quickstart');
		$client->setScopes(Google_Service_Sheets::SPREADSHEETS);
		$client->setAuthConfig(config_path('credentials_mina.json'));
		$client->setAccessType('offline');

		$tokenPath = storage_path('app/token.json');
		if (file_exists($tokenPath)) {
			$accessToken = json_decode(file_get_contents($tokenPath), true);
			$client->setAccessToken($accessToken);
		}

		if ($client->isAccessTokenExpired()) {
			if ($client->getRefreshToken()) {
				$client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
			} else {
				$authUrl = $client->createAuthUrl();
				printf("Open the following link in your browser:\n%s\n", $authUrl);
				print 'Enter verification code: ';
				$authCode = trim(fgets(STDIN));

				// Exchange authorization code for an access token.
				$accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
				$client->setAccessToken($accessToken);

				// Check to see if there was an error.
				if (array_key_exists('error', $accessToken)) {
					throw new Exception(join(', ', $accessToken));
				}
			}

			if (!file_exists(dirname($tokenPath))) {
				mkdir(dirname($tokenPath), 0700, true);
			}
			file_put_contents($tokenPath, json_encode($client->getAccessToken()));
		}

		return $client;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
		Log::debug('start update sheet 1 data');
		$client = $this->getGoogleClient();
		$service = new Google_Service_Sheets($client);
		$spreadsheetId = env('GOOGLE_SHEET_ID');
		$range = 'Sheet4!A2:D';

		// get values
		$response = $service->spreadsheets_values->get($spreadsheetId, $range);
		$values = $response->getValues();

		// update/add values
		$data = [
			[
				'column A2',
				'column B2',
				'column C2',
				'column D2',
			],
			[
				'column A3',
				'column B3',
				'column C3',
				'column D3',
			],
		];
		$requestBody = new \Google_Service_Sheets_ValueRange([
			'values' => $data
		]);

		$params = [
			'valueInputOption' => 'RAW'
		];

		$service->spreadsheets_values->update($spreadsheetId, $range, $requestBody, $params);
		echo "SUCCESS \n";
		Log::debug('update sheet 1 data success');
	}
}
```


## Tham khảo

- https://developers.google.com/sheets/api/quickstart/php