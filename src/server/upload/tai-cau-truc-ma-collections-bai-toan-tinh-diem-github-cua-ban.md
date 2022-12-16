Đây là 1 trong những câu hỏi trong cuộc phỏng vấn vào Reddit.

GitHub cung cấp 1 [public API trả về hoạt động public của người dùng gần đây](https://api.github.com/users/minhnv2306/events). JSON respone này cho bạn 1 mảng các objects có dạng sau:
```JSON
[
    {
        "id": "3898913063",
        "type": "PushEvent",
        "public": true,
        "actor": "adamwathan",
        "repo": "tightenco/jigsaw",
        "payload": { /* ... */ }
    },
    // ...
]
```
Nhiệm vụ của bạn là tính điểm GitHub của 1 user dựa vào điều kiện sau
```
    1. Mỗi sự kiên PushEvent có gía trị 5 điểm.
    2. Mỗi sự kiện CreateEvent có giá trị 4 điểm.
    3. Mỗi sự kiện IssuesEvent có giá trị 3 điểm.
    4. Mỗi sự kiện CommitCommentEvent có giá trị 2 điểm.
    5. Các sự kiện còn lại có giá trị 1 điểm.
```
Bạn có thể xem thêm phần lý thuyết về tái cấu trúc mã collections tại [đây](https://minhnv2306.github.io/categories/Clean-our-code/Refactoring-to-Collections/)
# Loops and Conditionals

```php
function githubScore($username)
{
    // Grab the events from the API, in the real world you'd probably use
    // Guzzle or similar here, but keeping it simple for the sake of brevity.
    $url = "https://api.github.com/users/{$username}/events";
    $events = json_decode(file_get_contents($url), true);

    // Get all of the event types
    $eventTypes = [];

    foreach ($events as $event) {
        $eventTypes[] = $event['type'];
    }

    // Loop over the event types and add up the corresponding scores
    $score = 0;

    foreach ($eventTypes as $eventType) {
        switch ($eventType) {
            case 'PushEvent':
                $score += 5;
                break;
            case 'CreateEvent':
                $score += 4;
                break;
            case 'IssuesEvent':
                $score += 3;
                break;
            case 'CommitCommentEvent':
                $score += 2;
                break;
            default:
                $score += 1;
                break;
        }
    }

    return $score;
}
```
Nhìn hơi tù nhỉ, refactor nào :D

# Replace Collecting Loop with Pluck

Chắc hẳn chúng ta đã nhìn ra ngay đoạn lấy trường type hoàn toàn có thể thay thế bằng `pluck` rồi nhỉ
```php
/**
// Get all of the event types
$eventTypes = [];

foreach ($events as $event) {
    $eventTypes[] = $event['type'];
}
**/
$eventTypes = $events->pluck('type');
```

Bây giờ cần xử lý đoạn này:

```php
$eventTypes = $events->pluck('type');

$score = 0;

foreach ($eventTypes as $eventType) {
    switch ($eventType) {
        case 'PushEvent':
            $score += 5;
            break;
        case 'CreateEvent':
            $score += 4;
            break;
        case 'IssuesEvent':
            $score += 3;
            break;
        case 'CommitCommentEvent':
            $score += 2;
            break;
        default:
            $score += 1;
            break;
        }
    }
return $score;
```

# Extract Score Conversion with Map

Đây rõ ràng là ánh xạ điểm số cho mỗi event rồi, dùng `map` là phù hợp
```php
$scores = $eventTypes->map(function ($eventType) {
    switch ($eventType) {
        case 'PushEvent':
            return 5;
        case 'CreateEvent':
            return 4;
        case 'IssuesEvent':
            return 3;
        case 'CommitCommentEvent':
            return 2;
        default:
            return 1;
        }
    });
return $scores->sum();
```
Vẫn còn 1 vấn đề bẩn là switch thực sự cần được rút ngắn lại. Nào giải quyết nó thôi

# Replace Switch with Lookup Table

Mỗi khi bạn có 1 switch như vậy, bạn có thể thay thế nó với 1 mảng và `case` sẽ trở thành `key`
```php
function githubScore($username)
{
    /**
    $url = "https://api.github.com/users/{$username}/events";
    $events = collect(json_decode(file_get_contents($url), true));

    $eventTypes = $events->pluck('type');
    **/
    $scores = $eventTypes->map(function ($eventType) {
        $eventScores = [
            'PushEvent' => 5,
            'CreateEvent' => 4,
            'IssuesEvent' => 3,
            'CommitCommentEvent' => 2,
        ];

        return $eventScores[$eventType];
    });

    return $scores->sum();
}
```
Cảm giác code đã được dọn dẹp bởi vì nhìn vào điểm cho mỗi sự kiện trở nên rất tự nhiên về những gì chúng ta đang cố gắng làm với 1 biểu thức điều kiện như switch.

Hình như vấn đề chúng ta quên mất default case, tất cả các trường hợp không phải sự kiện trên sẽ trả về 1. Cái này thì có thể bổ sung như sau:

```php
function githubScore($username)
{
    /***
    $url = "https://api.github.com/users/{$username}/events";
    $events = collect(json_decode(file_get_contents($url), true));

    $eventTypes = $events->pluck('type');

    $scores = $eventTypes->map(function ($eventType) {
        $eventScores = [
            'PushEvent' => 5,
            'CreateEvent' => 4,
            'IssuesEvent' => 3,
            'CommitCommentEvent' => 2,
        ];
        **/
        if (! isset($eventScores[$eventType])) {
            return 1;
        }
        /**
        return $eventScores[$eventType];
    });

    return $scores->sum();
    **/
}
```
Đột nhiên, điều này không thực sự có vẻ tốt hơn nhiều so với khối `switch`, nhưng đừng sợ hãi, chúng ta vẫn còn hi vọng :D

# Associative Collections: Liên kết collections

```
Everything is better as a collection, remember?
```
 
Cho đến giờ thì chúng ta chỉ sử dụng collection cho các mảng số truyền thống nhưng collection cho chúng ta nhiều sức mạnh hơn khi làm việc với tập hợp mảng

## "Tell, Don't Ask" Principle!!!

> Bạn đã bao giờ nghe về nguyên lý "Nói, đừng có hỏi". Ý tưởng chung là bạn nên tránh việc hỏi 1 object 1 câu hỏi về chính nó để quyết định khác về điều gì đó bạn đang định làm với object này. Thay vào đó, bạn nên đẩy trách nhiệm vào object này, vì vậy bạn có thể nói với nó cái bạn cần thay vì hỏi nó đầu tiên

Nó thì liên quan gì đến ví dụ này. Hãy nhìn lại nhé
```php
$eventScores = [
    'PushEvent' => 5,
    'CreateEvent' => 4,
    'IssuesEvent' => 3,
    'CommitCommentEvent' => 2,
];

if (! isset($eventScores[$eventType])) {
    return 1;
}

return $eventScores[$eventType];
```
Bạn đang sử dụng một bảng để tra cứ nếu nó có 1 giá trị chắc chắn và nếu nó không có giá trị chắc chắn thì nó sẽ trả về giá trị mặc định

Collection giúp chúng ta áp dụng nguyên tắc "Tell, Don't Ask" để giải quyết vấn đề với `get()` method, cái mà sẽ nhận vào key và tra cứu và 1 giá trị mặc định sẽ được trả về nếu nó không tồn tại.
```php
$eventScores = collect([
    'PushEvent' => 5,
    'CreateEvent' => 4,
    'IssuesEvent' => 3,
    'CommitCommentEvent' => 2,
]);

return $eventScores->get($eventType, 1);
```

Tập hợp lại nào:
```php
function githubScore($username)
{
    $url = "https://api.github.com/users/{$username}/events";

    $events = collect(json_decode(file_get_contents($url), true));

    return $events->pluck('type')->map(function ($eventType) {
        return collect([
            'PushEvent' => 5,
            'CreateEvent' => 4,
            'IssuesEvent' => 3,
            'CommitCommentEvent' => 2,
        ])->get($eventType, 1);
    })->sum();
}
```

# Extracting Helper Functions

Dường như body của toán tử map vẫn còn nhiều dòng cho việc tra cứu điểm cho sự kiện ở đây.

Chúng tôi chưa nói nhiều từ trước, nhưng vì chúng ta đang làm việc với collection pipelines không có nghĩa là chúng ta nên ném những good practice khác ra ngoài như việc để logic ra các hàm nhỏ.

Trong trường hợp của chúng ta là hàm call API và hàm kiểm tra điểm có thể tách ra:
```php
function githubScore($username)
{
    return fetchEvents($username)->pluck('type')->map(function ($eventType) {
        return lookupEventScore($eventType);
    })->sum();
}

function fetchEvents($username)
{
    $url = "https://api.github.com/users/{$username}/events";
    return collect(json_decode(file_get_contents($url), true));
}

function lookupEventScore($eventType)
{
    return collect([
        'PushEvent' => 5,
        'CreateEvent' => 4,
        'IssuesEvent' => 3,
        'CommitCommentEvent' => 2,
    ])->get($eventType, 1);
}
```

# Encapsulating in a Class

Tạo 1 class nếu cần thiết, phần này bạn có thể tự làm, tôi xin phép để mở nhé ....

# Tổng kết

- Xử lý switch case với collection. Thông qua lookup Table
- Nguyên tắc **"Tell, Don't Ask"** để làm việc giá trị mặc định.

# Tài liệu tham khảo

* The book: [Refactoring to collections](https://adamwathan.me/refactoring-to-collections/)
* [My demo project](https://github.com/minhnv2306/refactoring-to-collections)