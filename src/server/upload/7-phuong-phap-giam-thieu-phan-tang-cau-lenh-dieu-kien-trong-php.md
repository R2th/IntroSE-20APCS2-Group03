Đây là bài viết của một bác kỹ sưngười nhật chuyên về React Native và PHP (tức là vừa code được cả BE và FE, thật ngưỡng mộ!!)
Mình thấy hay nên dịch lại nhé

Là một kỹ sư, khi tạo ra một sản phẩm bạn phải quan tâm đến cả chất lượng bên trong và chất lượng bên ngoài của sản phẩm đó.

Chất lượng bên trong (Internal Quaiity)  và chất lượng bên ngoài (External Quality) là gì?

Tham khảo [ở đây](https://speakerdeck.com/twada/quality-and-speed?slide=20) để biết thêm định nghĩa về Internal Quality và External Quality nhé.

Và một trong những cách (có thể nói là hiệu quả nhất) để cải thiện External Quality chính là nâng cao Internal Quality.
Vì sao mình lại chọn chủ đề này? Khoảng 2~3 năm trước, mình nhớ có 1 bạn kỹ sư người Việt khi gửi source code cho phía Nhật review thì bị claim là "Mày viết câu điều kiện phân tầng nhiều quá. Đọc rối hết cả đầu".
Và bác ấy ra hẳn 1 cái rule " 1 cái xử lý if else của chúng mày tối đa chỉ được 4 tầng thôi. Trên 4 tầng thì ta reject hết".

Lúc ấy chưa biết gì về code nên có lỡ nói xấu sau lưng bác người Nhật người gì mà khó tính.
Giờ thì hiểu chuyện rồi mọi người ạ.

Vào vấn đề chính thôi. Có 2 tiêu chuẩn mà bác người Nhật dựa vào để đưa ra 7 phương pháp.
1. Giảm độ phức tạp của method
2. Giảm được tầng nào hay tầng ấy

## 1. Guard clause
Sử dụng return/continue ngay đầu function để giới hạn điều kiện xử lý

**Bad Example:**
```
public function hoge($a, $b) {
    $result = 0;
    if (isset($a)) {
        $result = 1;
    } else {
        if (isset($b)) {
            $result = 2;
        }
    }
    return $result;
}
```

**Good Example:**
```
public function hoge($a, $b) {
    if (isset($a)) return 1;
    if (isset($b)) return 2;

    return 0;
}
```

## 2. Boolean
Nhiều bạn thường hay phân nhánh điều kiện thừa khi nhận định true/false.

**Bad Example:**
```
public function hoge($a) {
    if ($a === '') {
        return true;
    }
    return false;
}
```

Cơ bản khi muốn lấy true/false thì chỉ cần trả về biến số với giá trị là điều kiện của true là được rồi.
```
public function hoge($a) {
    return $a === '';
}
```

## 3. Sử dụng array
Tiếp theo là cách sử dụng mảng để giảm phân nhánh câu điều kiện.

Cách này thường tiện lợi khi bạn muốn get data từ DB để hiển thị text lên màn hình.

Ví dụ:
```
public function hoge($x) {
    $a = 0;
    switch ($x) {
        case 0:
            $a = '駅名1';
            break;
        case 1:
            $a = '駅名2';
            break;
        case 2:
            $a = '駅名3';
            break;
    }
    return $a;
}
```

Ví dụ ở trên cũng không hẳn là bad example, nhưng bạn có thể viết gọn nó lại thành như thế này:
```
public function hoge($x) {
    $array = [
        0 => '駅名1',
        1 => '駅名2',
        2 => '駅名3',
    ];
    return $array[$x];
}
```

Hoặc nếu bạn muốn define thêm giá trị default thay vì để null thì có thể dùng thêm toán tử liên kết.
```
public function hoge($x) {
    $array = [
        0 => '駅名1',
        1 => '駅名2',
        2 => '駅名3',
    ];
    return $array[$x] ?? '駅名0'; // Nếu $x ko phải là '駅名1', '駅名2', '駅名3' thì trả về '駅名0'
}
```

## 4. Phân chia method
Để giảm mức độ phức tạp của 1 method, bạn có thể chia nó thành nhiều method nhỏ hơn cho đỡ rối mắt.

Ví dụ bạn có 1 method thế này,
```
public function hoge($array) {
    $result = [];
    foreach ($array as $item) {
        if ($item) {
            array_push($item);
        }
    }
    return $result;
}
```

Thay vì gộp chung vào 1 method như vậy, bạn có thể chia câu lệnh If thành một method riêng cho dễ đọc.
```
public function hoge($array) {
    $result = [];
    foreach ($array as $item) {
        $this->fuga($result, $item);
    }
    return $result;
}

private function fuga(&$result, $item) {
    if ($item) {
        array_push($item);
    }
}
```

Thật ra ví dụ ở trên cũng khá khó hiểu. Nhưng nếu bạn áp dụng phương pháp này trong trường hợp "phân chia xử lý dựa vào kết quả điều kiện là true/false" thì sẽ hiệu quả hơn.

```
// Before
$result = '';
if ($condition) {
    if (...) {
        foreach (...) { // TODO }
    } 
} else {
    foreach ($array as $item) {
        // TODO
    }
}

// After
$result = $condition ? $this->hoge() : $this->fuga();

```

Đây không hẳn là là một phương pháp để giảm thiểu phân nhánh điều kiện, mà là cách để module hóa xử lý. Nhưng thấy hay nên đưa vào luôn.

## 5. Sử dụng toán tử ternary
Sử dụng toán tử cũng là 1 cách hay để giảm phân tầng trong câu điều kiện.

Hãy cùng xem đoạn code ví dụ dưới đây:
```
$result = 0;
if ($condition) {
    $result = 1;
} else {
    $result = 2;
}
```

Nếu sử dụng toán tử ternary bạn chỉ cần viết đơn giản thế này thôi.
```
$result = $condition ? 1 : 2;
```

Tuy nhiên, đối với nhiều người thì toán tử ternary khá khó đọc, vì thế bạn không nên sử dụng phương pháp này để viết những xử lý phức tạp.

## 6. Khai báo type khi implement
Thay vì khai báo 1 biến rồi dùng câu điều kiện để check type của nó thì bạn có thể khai báo type cho biến đó ngay từ đầu.

Ví dụ với xử lý dưới đây:
```
public function hoge($id) {
    if (!is_int($id)) {
        throw new \Exception('id must be type int');
    }

    $sql = "SELECT * FROM user WHERE user_id = {$id}";
    ...
}
```

Nếu khai báo type ngay từ đầu thì chỉ cần ngắn gọn như sau:
```
public function hoge(int $id) {
    $sql = "SELECT * FROM user WHERE user_id = {$id}";
    ...
}
```

## 7. Sử dụng toán tử đặc trưng của ngôn ngữ
Ví dụn trong PHP7 thì có thể sử dụng toán tử liên kết như sau:

```
// Before
public function hoge($a) {
    $result = 0;
    if (!is_null($a)) {
        $result = $a;
    }
    return $result;
}

// After
public function hoge($a) {
    return $a ?? 0;
}
```

## Lời kết
Tới đây là hết rồi nhé. Hy vọng bài viết có ích cho mọi người.