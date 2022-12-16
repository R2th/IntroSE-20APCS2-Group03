# Bài toán
Vào một ngày đẹp trời, đang ngồi đọc báo lá cải bạn gặp phải vấn đề là phải update thông tin cho một mảng các object truyền lên. Giả sử chúng ta có mảng tasks như thế này (đã convert sang array): 
```
[ 
    [ 'id' => 1, 'name' => 'XXX' ],
    [ 'id' => 2, 'name' => 'YYY' ],
    [ 'id' => 3, 'name' => 'ZZZ' ],
]
```
Cách giải quyết đơn giản nhất và kém hiệu quả nhất là foreach và update từng cái một như thế này (yaoming)
```
foreach ($tasks as $task) {
    \App\Models\Task::update($task['id'], $task['name']);
}
```
hoặc
```
DB::table('tasks')
    ->where('id', $tasks['id'])
    ->update(['name' => $tasks['name'])
```

Nhìn thấy rõ là giả sử có 1000 thằng users thì xài tận 1000 câu query, cách này có vẻ không ổn cho lắm. Chợt nhớ ra là laravel có thằng createMany thử serach xem có thằng updateMany không?
Vào thử https://laravel.com/api/5.5/ tìm updateMany thì không có, vậy thì phải tự viết hoặc là xài package bên ngoài.

## Trường hợp 1: Tự viết
Với kinh nghiệm 4 năm mài đũng quần trên trường đại học, chúng ta sẽ biết là SQL có cái case when.
Dạng tổng quát nó sẽ là như này:
```
CASE input_expression
   WHEN when_expression THEN result_expression
      [ ... ]
   [
      ELSE else_result_expression
   ]
END
```
đơn giản là chúng ta chỉ cần mapping when_expression là id và result_expression là cái name thì vấn đề đã ez được giải quyết.
Tường minh cụ thể nó sẽ là như này:
```
UPDATE `tasks` SET `name` = CASE `id` WHEN 1 then `XXX` WHEN 2 then `YYY` WHEN 3 then `ZZZ` END\n
                  WHERE `id` in (1,2,3)
```
=> Vấn đề về số lượng query đã được giải quyết (yaoming) một cách đầy bất ngờ... và từ ý tưởng trên chúng ta sẽ có code examples như sau:
```
    public function sortTasks($tasks, $columns = ['*'])
    {
        $cases = [];
        $ids = [];
        $params = [];

        foreach ($tasks['data'] as  $task) {
            $id = (int) $task['id'];
            $cases[] = "WHEN {$id} then ?";
            $params[] = $task['name'];
            $ids[] = $id;
        }
        $ids = implode(',', $ids);
        $cases = implode(' ', $cases);

        return \DB::update("UPDATE `tasks` SET `name` = CASE `id` {$cases} END
            WHERE `id` in ({$ids})", $params);
    }
```

## Trường hợp 2 : Sử dụng package ngoài 
Chúng ta có thể sử dụng:
https://packagist.org/packages/mavinoo/laravel-batch
Import và sử dụng, tiện lợi mặc dù thư viện hơi ít star trên github.

Chưa biết tới bao giờ laravel mới cung cấp một cái query Builder đễ hỗ trợ việc trên, trong lúc chờ đợi chúng ta có thể áp dụng 2 cách trên để UpdateBatch bản ghi trong laravel.
Hi vọng mọi người ai gặp vấn đề trên sẽ nhanh chóng giải quyết được vấn đề (bow)!