# Mở đầu
Hi hi, xin chào mọi người, lại là mình đâyyy. Chắc hẳn là mọi người đều cuống cuồng lên mỗi khi thứ 6 đến vì việc `trade points` phải không? =)) mình thì không trade, chỉ đem points đi share cho mọi người vui thôi, nhưng mà lại mắc tính lười và hay quên, đã mấy tuần rồi mình quên gửi points :v

Thế là mình làm cái tool này, trước nó là cái tool gửi hàng loạt của mình, giờ mình nâng cấp lên thành tự động luôn, =)) đỡ quên.

### Note
Mình định làm thành app desktop nhưng mà lại lười quá =)) viết tạm bằng Laravel rồi chạy trên máy tính nhé các bạn :D

# Chuẩn bị
## API
Hãy vào Unipos và soi Network nào!

Dành cho những ai chưa soi, thì mình soi được 3 cái api cần dùng cho mục đích của chúng ta:

### Login

Endpoint:
```
https://unipos.me/a/jsonrpc
```

Method: POST

Input:

```php
[
    'jsonrpc' => '2.0',
    'method' => 'Unipos.Login',
    'params' => [
        'email_address' => 'xxx',
        'password' => 'xxx',
    ],
    'id' => 'Unipos.Login'
]
```

Và đây là kết quả:

![](https://images.viblo.asia/15fa123d-91a1-4824-b743-24422dd8082d.png)

### Search person

Endpoint:
```
https://unipos.me/q/jsonrpc
```

Method: POST

Input:
```php
[
    "jsonrpc" => "2.0",
    "method" => "Unipos.FindSuggestMembers",
    "params" => [
        "term" => $keyword,
        "limit" => 20
    ],
    "id" => "Unipos.FindSuggestMembers"
],
'headers' => [
    'x-unipos-token' => 'xxxxxxxxxxxxxxxxx',
]
```

Lưu ý là cái endpoint này cần token header từ phần login ở phía trên nhé:

![](https://images.viblo.asia/25750046-a51a-4cb1-b7c2-7a775ea807b9.png)

### Send points

Endpoint:
```
https://unipos.me/c/jsonrpc
```

Method: POST

Input:
```php
[
    "jsonrpc" => "2.0",
    "method" => "Unipos.SendCard",
    "params" => [
        "from_member_id" => '',
        "to_member_id" => 1234,
        "point" => 40,
        "message" => 'abc xyz'
    ],
    "id" => "Unipos.SendCard"
],
'headers' => [
    'x-unipos-token' => 'xxxxxxxxxxxxxxxx',
]
```

Cái này cũng cần header token, và đây là sau khi send points:
![](https://images.viblo.asia/576e36e1-4c4e-42b3-a2e4-cb95f1979f87.png)

**Note:** sau khi test cái api này thì các bạn nhớ nhanh tay lên unipos xóa bài nhé, không là vỡ alo đó nhé =))

### Setup

- Setup Laravel.
- Cài thêm package [GuzzleHttp](https://github.com/guzzle/guzzle)

Thế là đã đụ nguyên liệu để làm rồi, bắt tay thôi.

# Bắt tay làm
### Lấy token

Đầu tiên là chúng ta cần lấy token, dùng api login ở trên kia:
```php
public static function getToken()
{
    if ($token = Cache::get('token')) {
        return $token;
    }

    $minutes = 30;

    $client = new Client();

    $response = $client->post('https://unipos.me/a/jsonrpc', [
        \GuzzleHttp\RequestOptions::JSON => [
            'jsonrpc' => '2.0',
            'method' => 'Unipos.Login',
            'params' => [
                'email_address' => 'xxx',
                'password' => 'xxx',
            ],
            'id' => 'Unipos.Login'
        ]
    ]);

    $response = json_decode($response->getBody(), true);

    if ($response['result']) {
        Cache::put('token', $response['result']['authn_token'], $minutes);

        return $response['result']['authn_token'];
    }

    return false;
}
```

Đoạn trên mình có thêm phần cache để lưu lại token, để gửi cho những người sau thì không cần phải request login lại lần nữa, ok?

### Tìm người muốn gửi

```php
public static function searchPerson($keyword)
{
    $client = new Client();

    $response = $client->post('https://unipos.me/q/jsonrpc', [
        \GuzzleHttp\RequestOptions::JSON => [
            "jsonrpc" => "2.0",
            "method" => "Unipos.FindSuggestMembers",
            "params" => [
                "term" => $keyword,
                "limit" => 20
            ],
            "id" => "Unipos.FindSuggestMembers"
        ],
        'headers' => [
            'x-unipos-token' => self::getToken(),
        ]
    ]);

    $response = json_decode($response->getBody(), true);

    return $response['result'] ?? [];
}
```

### Gửi điểm tới người đó :3 

```php
public static function sendPoint($input = [])
{
    $client = new Client();

    $response = $client->post('https://unipos.me/c/jsonrpc', [
        \GuzzleHttp\RequestOptions::JSON => [
            "jsonrpc" => "2.0",
            "method" => "Unipos.SendCard",
            "params" => [
                "from_member_id" => '',
                "to_member_id" => $input['toMember'] ?? '',
                "point" => (int)$input['point'] ?? 0,
                "message" => $input['message']
            ],
            "id" => "Unipos.SendCard"
        ],
        'headers' => [
            'x-unipos-token' => self::getToken(),
        ]
    ]);

    $response = json_decode($response->getBody(), true);

    return $response['result'] ?? false;
}
```

### Chuẩn bị database

Ta tạo 1 model User và migrate:
```php
protected $fillable = [
    'name',
    'email',
    'username',
    'status',
];
```

Ý tưởng ở đây là lấy số points total mỗi tuần (400) chia cho số points muốn gửi tới từng người (40 chẳng hạn) để có thể lấy ra được số người cần gửi.

Số người này đc lấy trong số users có status = 0 (chưa đc gửi points ở tuần hiện tại), nếu số người này ít hơn số người có thể gửi, thì lấy tiếp trong số người có status = 1 (đã được gửi ở tuần trước), rồi update những người còn lại = 0, và những người đã gửi trong batch vừa rồi thành 1.

Ví dụ như thế này:

![](https://images.viblo.asia/0c309637-18fc-456c-8f8d-4fd0acd3cc62.png)

Mọi người làm seed thì nhớ check kỹ ko viết nhầm thì buồn nhé =))

**Note:** Ai chưa có tên thì nhớ liên hệ mình nhé =)))

### Chạy thôi

- Tạo một command dựa trên những gì mình vừa trình bày ở trên rồi chạy:
![](https://images.viblo.asia/fe147019-1e32-4534-b796-f1a9e8447ebe.png)

### Thêm thắt
- Để tự động có comment và hashtag, chúng ta có thể định nghĩa sẵn và chọn random:
```php
public static function getMessage()
{
    $template = [
        'A hihihi.',
        'B hihihi.',
        'C hihi?',
        'D haha?',
        'E hehe.',
        'F hoho.',
        'G hahaha.',
        'I JQKA.',
    ];

    $hashtag = [
        '1.AppreciateTeamwork',
        '2.ThinkOutsideTheBox',
        '3.HaveTheGutsToChallenge',
        '4.ThinkPositive',
        '5.SpeedUp',
        '6.BeProfessional',
        '7.FocusOnThePoint',
    ];

    $randMsg = array_rand($template);
    $randHt = array_rand($hashtag);

    return '#' . $hashtag[$randHt] . ' ' . $template[$randMsg];
}
```

Hoặc dùng [cái này](https://www.google.com/search?ei=ASOnW7inBoyFvQSy2LyQAQ&q=api+random+quotes&oq=api+random&gs_l=psy-ab.3.0.35i39k1j0j0i203k1l6j0i22i30k1l2.1386460.1388867.0.1389698.10.10.0.0.0.0.112.1043.3j7.10.0....0...1c.1.64.psy-ab..0.10.1041...0i131k1j0i67k1.0.m8rwxfSamwk)
- Tiếp nữa là chúng ta cần đặt cronjob để chạy command hoặc nếu trên máy windows, chúng ta dùng `Task Scheduler` để hẹn giờ gửi points hàng tuần.

# Kết luận
- Rất là thú vị, mình thấy có thanh niên còn lên danh sách tính toán điểm points của từng người.
- Cái trên kia thì cần thêm vài cơ chế bắt lỗi, chạy lại, thông báo lỗi nữa thì đẹp.
- Nếu rảnh thì mình sẽ chuyển thành app desktop với vài click để chạy chứ ko cần code ntn =))