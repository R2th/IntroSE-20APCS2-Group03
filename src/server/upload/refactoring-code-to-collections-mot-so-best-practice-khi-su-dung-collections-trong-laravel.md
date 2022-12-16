### I. Mở đầu:
"Nerver Write Another Loop Again" -  Một câu tiếp thị mạnh mẽ cho cuốn sách [Refactoring to collections](https://adamwathan.me/refactoring-to-collections/#whats-inside) của  Adam Wathan. Nếu bạn là Laravel Dev chắc rằng bạn đã từng nghe đến và sử dụng Collection Pipeline trước đó rồi nhể, cũng như mọi người thì mình cũng đã từng sử dụng trong quá trình làm việc và thực sự chưa nắm hết được sức mạnh của nó cho tới khi đọc qua cuốn sách này thì mới cảm nhận được sức mạnh và khả năng của Functional Programming trong cuốn sách này. (thực sự hữu ích).

### II. Imperative Programing và Declarative Programing:
Chắc hẳn với vai trò là một Developer bạn đã nghe và rất quen thuộc với Functional Programming rồi và có một số  mô hình lập trình (Programming Paradigm) mà chắc rằng một số developer mới như mình có thể lạ lẫm hơn khi bắt gặp đó là Declarative Programming (DP) cùng với một thái cực khác gọi là Imperative Programming (IP) gắn liền với Lập Trình Hướng Đổi Tượng (OOP) mà chúng ta đang làm việc hằng ngày.

Hai mô hình trên vốn khá rộng và mơ hồ nhưng có thể gói gọn trong 1 cách định nghĩa rõ ràng như sau:
> Imperative Programming: Focus on how the computer should do the work.
- Tập trung vào việc làm thế nào máy tính có thể giải quyết được công việc hay vấn đề nào đó mà bạn cần,  ở đây chúng ta thực sự đang tập trung chi tiết vào HOW, phải làm thế này, làm thế kia, blabla... như rằng là một hình thức "CẦM TAY CHỈ VIỆC".

> Declarative Programming (DP): Focus on telling the computer what we want, not how to get
- Tập trung vào việc nói với máy tính điều mà anh em chúng ta cần và máy tính phải làm thế nào đó để đáp ứng nhu cầu của mình, ở đây chúng ta đang thực sự tập trung vào WHAT - điều mà chúng ta muốn.

Bạn có thể hình dung đối với Imperative Programming thì bạn quan tâm tới việc làm thế nào để giải quyết bài toán còn Declarative Programming quan tâm tới đầu vào và đầu ra của bài toán.

Nghe vẫn khá trừu tượng phải không nào, mình cùng vào một ví dụ cụ thể nhé nhé: Giả sử chúng ta có một tập dữ liệu users trên hệ thống và điều chúng ta mong muốn là get ra Email của các bạn nữ có độ tuổi từ 18 - 20 chẳng hạn. Dữ liệu mẫu chúng ta sẽ như này nhóe:
```
$users = [
    [
        'name' => 'Ngọc Trinh',
        'gender' => 0,
        'age' => 18,
        'email' => 'ngoctrinh@gmail.com',
    ],
    [
        'name' => 'Em Gái Ngọc Trinh',
        'gender' => 0,
        'age' => 19,
        'email' => 'emgaingoctrinh@gmail.com'
    ],
    [
        'name' => 'Cháu gái Ngọc Trinh',
        'gender' => 0,
        'age' => 17,
        'email' => 'chaugaingoctrinh@gmail.com'
    ],
    [
        'name' => 'Hàng Xóm Ngọc Trinh',
        'gender' => 0,
        'age' => 18,
        'email' => 'hangxomngoctrinh@gmail . com'
    ],
    [
        'name' => 'Em trai Ngọc Trinh',
        'gender' => 1,
        'age' => 18,
        'email' => null
    ]
];
```

* Đối với Imperative programing ( cách này mình thấy hay sử dụng nè (yaoming) )
```
function getYoungBeautifulGirlEmails($users)
{
    $emails = [];
        for ($i = 0; $i < count($users); $i++) {
            $user = $users[$i];
            if ($user['email'] != null && $user['gender'] == 0 && $user['age'] >= 18 && $user['age'] <= 20) {
                $emails[] = $user['email'];
            }
        }
        
        return $emails;
}
```

* Đối với Declarative programing ( Collection Pipeline trong Laravel ) :
```
    function getYoungBeautifulGirlEmails($users)
    {
        return collect($users)->filter(function($user) {
            return $user['email'] != null && $user['gender'] == 0 && $user['age'] >= 18 && $user['age'] <= 20;
        })->map(function($user) {
            return $user['email'];
        });
    }
```
- Refactor lại  1 tí cho gọn nhé:
```
    function getYoungBeautifulGirlEmails($users)
    {
        return collect($users)->filter(function($user) {
            return $this->isYoungGirlHasEmail($user);
        })->map(function($user) {
            return $user['email'];
        });
    }
    
    function isYoungGirlHasEmail($user) {
        return $user['email'] != null && $user['gender'] == 0 && $user['age'] >= 18 && $user['age'] <= 20;
    }
```
- Nếu bạn đã biết Arrow Function là tính năng được thêm vào phiên bản phát hành mới nhất của PHP 7, đó là PHP 7.4 thì thử implement luôn nhé:
```
    function getYoungBeautifulGirlEmails($users)
    {
        return collect($users)
            ->filter(fn($user) => $this->isYoungGirlHasEmail($user))
            ->map(fn($user) => $user['email']);
    }
    
    function isYoungGirlHasEmail($user) {
        return $user['email'] != null && $user['gender'] == 0 && $user['age'] >= 18 && $user['age'] <= 20;
    }
```

- À get từ Database ra bằng Mysql Syntax thì sao nào:
```
SELECT email from users where email is not null and gender == 0 and age >= 18 and age <= 20;
```

Như bạn có thể thấy việc viết code theo Declarative Programming có thể ngắn hơn, dễ hiểu, clean hơn và hạn chế được các biến tạm trong chương trình đúng không nào. Thay vì viết code theo cách Imperative ( sử dụng biến tạm, vòng lặp, điều kiện, tập trung chi tiết vào việc làm thế nào để giải quyết được công việc đó) thì Declarative Programming chỉ cần tập trung nói với máy tính cái mà chúng ta cần giải quyết (yaoming). Nhiều bạn sẽ tự đặt ra câu hỏi viết như trên ( Declarative programing ) có thể sẽ ảnh hưởng đến Performance nhưng mình nghĩ tùy độ lớn của dữ liệu để chúng ta có thể implement và ngày nay tốc độ tính toán của máy tính ngày càng khủng rồi nên (nobodycare). 
### III. Higher Order Functions: 
- Dịch vu vơ là "Hàm bậc cao"
> A higher order function is a function that takes another function as a parameter, returns a function, or does both.
(Một higher order function là một hàm nhận một hàm khác như 1 tham số, trả về một hàm hoặc làm cả hai)

À xem xét ví dụ sau nhó, hàm bọc code each chúng ta hay sử dụng nè:
```
function map($items, $func)
{
    $results = [];

    foreach ($items as $item) {
        $results[] = $funct($item);
    }

    return $results;
}
```

- Và đây là cách chúng ta sử dụng:

```
$oldArray = [1, 2, 3];
$newArray = map($oldArray, function($item) {
    return $item * 2;
});

// $newArray = [2, 4, 6] 
```


###  IV. Cùng nhau Practice một số ví dụ cụ thế nhó:
#### 1. Đầu tiên là một câu hỏi đến từ một member trên một forum nọ:
![](https://images.viblo.asia/9235588c-fbfc-49cb-b94e-3a374f6a8244.jpg)
- Với câu hỏi ở trên mục đích của tác giả là duyệt qua một mảng objects và convert sang một mảng khác với mỗi phần tử có $key và $value format khác. Implement bằng collection thì ez phải không nào : 
```
$output = $objects->mapWithKeys(function ($obj) {
    return [$obj->id => "{$obj->name}-{$obj->location->name}"];
});
```
#### 2. Bài toán quen thuộc convert hệ nhị phân sang hệ thập phân:
- input: 0111
- Output: 7
- Cách giải quyết: 8 = 0 * 2^3 + 1 * 2^2 + 1 * 2^1 + 1 * 2^0
- Đây là bài toán quen thuộc khi mới chập chững học lập trình phài không nào, cách giải quyết:

- Before:
```
function binaryToDecimal($binaryNum)
{
    $total = 0;
    $exponent = strlen($binaryNum) - 1;
    for ($i = 0; $i < strlen($binaryNum); $i++) {
        $decimal = $binaryNum[$i] * (2 ** $exponent);
        $total += $decimal;
        $exponent--;
    }
    
    return $total;
}
```

- After:
```
function binaryToDecimal($binaryNum)
{
     return collect(str_split($binaryNum))
        ->reverse()
        ->map(function($item, $key) {
              return $item * (2 ** $key);
         })
        ->sum();
}
```

#### 3. Bài toán generate Tag bài viết:
- Vấn đề đặt ra: tưởng tượng rằng bạn đang dev một chức năng lưu tag mới vào DB cho bài viết trên blog của mình, mặc định những tag mới gõ sẽ chưa có id và sẽ truyền name lên cho server xử lý để lưu.
- Sample Data:
```
$tags = [
17,
32,
'laravel',
11,
'caching'
]
```

- Before:
```
class PostTagsController
{
    public function update($postId)
    {
        $post = Post::find($postId);
        $tagIds = [];
        foreach (request('tags') as $nameOrId) {
            if (is_numeric($nameOrId)) {
                $tagIds[] = $nameOrId;
            } else {
                $tag = Tag::create(['name' => $nameOrId]);
                $tagIds[] = $tag->id;
            }
        }
        $post->tags()->sync($tagIds);
    
        return view('posts.index');
    }
}
```

- After:
```
class PostTagsController
{
    public function update($postId)
    {
        $post = Post::find($postId);
        $tagIds = $this->normalizeTagsToIds(request('tags'));
        $post->tags()->sync($tagIds);
        
        return view('posts.index');
    }
    
    public function normalizeTagsToIds($postId)
    {
        return collect($tags)->map(function ($nameOrId) {
            return (is_numeric($nameOrId)) ? $nameOrId : Tag::create(['name' => $nameOrId])->id;
        });
    }
}
```

#### 4. Refactor switcase, if condition:
- Vấn đề đặt ra: Tính score của github cá nhân mình nào, nói chung github có cung cấp api để mình xem Events của mình đại khái mình sẽ tính điểm như sau:
+ PushEvent :  +5 điểm
+ IssuesEvent:  + 4 điểm
+ CreateEvent:  +3 điểm
+ CommitCommentEvent: +2 điểm 
+  Còn lại: +1 điểm

- Sample Data:
```
$myGithubEvents = [
            'PushEvent',
            'IssuesEvent',
            'IssuesEvent',
            'PushEvent',
            'CreateEvent',
            'CreateEvent',
            'PushEvent',
            'CommitCommentEvent',
            'CommitCommentEvent',
            'CreateEvent',
            'IssuesEvent',
            'CommitCommentEvent',
        ];
```
- Before:
```
function calculateGithubScore($myGithubEvents)
{
    $sumScore = 0;
    foreach ($myGithubEvents as $event) {
        switch ($event) {
            case 'PushEvent':
                $sumScore += 5;
                break;
            case 'IssuesEvent':
                $sumScore += 4;
                break;
            case 'CreateEvent':
                $sumScore += 3;
                break;
            case 'CommitCommentEvent':
                $sumScore += 2;
                break;
            default:
                $sumScore += 1;
                break;
        }
    }

    return $sumScore;
}
```

- After:
```
function calculateGithubScore($myGithubEvents)
{
    return collect($myGithubEvents)->map(function ($item) {
        return collect([
            'PushEvent' => 5,
            'IssuesEvent' => 4,
            'CreateEvent' => 3,
            'CommitCommentEvent' => 2
        ])->get($item, 1);
       })->sum();
}
```
#### 5. Tính doanh thu của năm sau so với năm trước :
- Bài toán: Giả sử mình có tập dữ liệu doanh thu theo từng tháng của một công ty trong 2 năm liên tiếp như sau và yêu cầu của bài toán là doanh thu chênh lệch giữa năm sau so với năm trước theo từng tháng:
```
        $lastYear = [
            2976.50, // Jan
            2788.84, // Feb
            2353.92, // Mar
            3365.36, // Apr
            2532.99, // May
            1598.42, // Jun
            2751.82, // Jul
            2576.17, // Aug
            2324.87, // Sep
            2299.21, // Oct
            3483.10, // Nov
            2245.08, // Dec
        ];
        
        $thisYear = [
            3461.77,
            3665.17,
            3210.53,
            3529.07,
            3376.66,
            3825.49,
            2165.24,
            2261.40,
            3988.76,
            3302.42,
            3345.41,
            2904.80,
        ];
```
- Before:
```
function calculateVenue($lastYear, $thisYear)
{
    $sumArr = [];
    for ($i = 0; $i < count($lastYear); $i++)
    {
        $sumArr[] = $thisYear[$i] - $lastYear[$i];
    }

    return $sumArr;
}
```
- After:
```
function calculateVenue($lastYear, $thisYear)
{
    return collect($thisYear)->zip($lastYear)->map(function($venue) {
        return $venue[0] - $venue[1];
    });
}
```
### IV.  Kết luận:
Trên đó là một số practice với Collection Pipeline, hi vọng sẽ hữu ích cho mọi người khi gặp những trường hợp tương tự hay có thể implement một cách linh động vào project, dự án mình đang làm. Thanks for reading (yaoming) ^^