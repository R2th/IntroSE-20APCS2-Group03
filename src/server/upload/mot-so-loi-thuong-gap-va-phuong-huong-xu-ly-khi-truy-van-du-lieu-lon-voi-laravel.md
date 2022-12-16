# Lời nói đầu
Việc truy vấn dữ liệu là việc hết sức quen thuộc với mỗi lập trình viên và là việc không thể thiếu trong các app ứng dụng.  Dĩ nhiên không lập trình viên nào sẽ gặp vấn đề khi truy vấn 1 lượng dữ liệu nhỏ và không quá phức tạp . Tuy nhiên khi bạn phải đối mặt với các bài toán dữ liệu lớn (Chức năng thống kê) dữ liệu bạn phải xử lý là hàng triệu dòng thì sẽ xuất hiện lỗi khá hay ho mà những dòng code để xử lý truy vấn ít không bao giờ gặp. Nào giờ cùng bắt tay vào xem xét vấn đề nhé. 

# Nội dung
Ta có các bảng dữ liệu như sau : 

| users |
| -------- | 
| id  |
| name  |
| gender  |
| age  |
| brithday  |
| ..........  |

| questions  |
| -------- | 
| id  |
| title  |
| created_at  |
| ..........  |

| answers|
| -------- | 
| id  |
| question_id  |
| content  |
| is_correct  |
| ..........  |

| user_question_logs |
| -------- | 
| id  |
| user_id  |
| question_id  |
| created_at  |
| ..........  |

Mô tả : 
*  Mỗi bảng có một vài triệu record =))
*  1 `question` có nhiều `answer` .
*  1 `user` có thể trả lời nhiều câu hỏi (trong bảng `user_question_logs`)


Bài toán 1:
*  Lấy các record của user_question_logs với điều kiên là các `users` và các `question` phải được tạo 1 năm trở lại đây


##  Những vấn đề phát sinh
### I, Timeout và memory limit
` Timeout limit` là lỗi gặp khi thời gian xử lý function thực tế cao hơn so với thời gian mà `php` cho phép . Mặc định `php` cho phép thời gian xư lý là 30s . Đây gần như là lỗi bạn sẽ gặp phải đầu tiên khi làm việc với dữ liệu lớn . Lý do của việc này là do lấy 1 lượng dữ liệu quá lớn và phải xử lý đống dữ liệu đó. 

`memory limit` là dung lượng tối đa được PHP cấp phát cho một function và hiển nhiên khi xử lý mà chúng ta sử dụng quá số đk cấp phát, việc gặp lỗi là đương nhiên. Lý do của lỗi này thì là do lấy 1 lượng dữ liệu quá lớn, cần nhiều tài nguyên hơn để xử lý . Tuy nhiên các bạn phải chú ý đến một vấn đề, dung lượng xử lý không chỉ là lượng dữ liệu querry ra mà nó bao gồm thêm tất cả các thứ đi kèm từ reuquest -> controller -> model những cái này cũng cần và chiếm tài nguyên nhé ... 

 Khi gặp lỗi này có 2 phương pháp :

* `Php` hỗ trợ cú pháp sau để tăng thời gian xử lý và dung lượng xử lý bằng cách :
```
    ini_set('max_execution_time', 300); 
    ini_set('memory_limit',  '512MB'); 
```

* Tối ưu hóa code và query (Cách này mình sẽ trinh bày bên dưới nhé)


Phương pháp đầu tiên thì tác dụng trực tiếp và thấy hiệu quả liền ... Tuy nhiên phương pháp này sẽ không triệt để và nếu cứ mắc lỗi này lại gia tăng limit thì không ổn chút nào . Tài nguyên server thì không phải là vô hạn và thời gian xử lý quá dài cũng sẽ ảnh hưởng nhiều .

Phương pháp thứ 2 thì sẽ khó khăn hơn nhiều nhưng hiệu quả nhưng việc optimize thì khá khó khăn và optimize thì cũng chỉ optimize được đến 1 mức nào đó . 

=> Chốt : Nên kết hợp cả 2 phương pháp lại tăng tài nguyên cấp phát đến một khoảng hợp lý và optimize một cách hợp lý. Thêm vào đó nên chặn validate điệu kiện lấy dữ liệu (Ví dụ trên bài toàn thì hãy validate lấy dữ liệu nhiều nhất trong 6 tháng thôi chẳng hạn)

### II, Data truy vấn quá lớn
Vấn để này chắc mình cũng chẳng cần nói lý do nữa, cái tên nói lên tất cả rồi . Ở đây mình chỉ nói 1 số phương pháp giải quyết vấn đề này nhé :

**1, Chỉ lấy những trường cần thiết và không lấy dữ liệu dư thừa**

***1.1 : Chỉ lấy những trường cần thiết***

Một điều rất hay xảy ra ở developer khi query là dùng `SELECT * FROM users` để lấy ra tất cả mọi trường trong bảng vừa đỡ phải code nhiều vừa ko bao giờ sợ thiếu dữ liệu và nghĩ rằng thừa có vài trường không vấn đề gì đâu. 

Điều này mang đến tai hại khi query với dữ liệu lớn, thử tưởng tượng xem chỉ thừa vài trường khi x 1 vài triệu lần xem, không phải là 1 con số nhỏ đâu nhé.

***1.2 : Sử dụng Eager Loading trong Eloquent***

Ngoài ra việc bạn cũng cần đặc biệt chú ý khi sử dụng [Eager Loading trong Eloquent](https://viblo.asia/p/laravel-beauty-recipes-best-practices-6BAMYk9Evnjz#van-de-n--1-va-eager-loading-7) khi làm việc với dữ liệu lớn. Đồng ý rằng nó sẽ giúp giảm thiểu số lượng query tuy nhiên nó lại gây ra vấn đề làm tăng số lượng object của data lấy ra.

Ví dụ như sau :
```
    $data = UserQuestionLogs::with('question')->all()
```

Viết như thế này hoàn toàn đúng và không có gi tuy nhiên bạn hãy để ý rằng vs mỗi object `UserQuestionLogs` sẽ tồn tại 1 object `question` và sẽ có rất nhiều các `UserQuestionLogs` khác nhau có `question` ==> Dư thừa dữ liệu việc dư thừa này là hết sức nguy hiểm trong công cuộc làm việc với Big data. 

Giải pháp của mình là mình sẽ lấy ra list các `quesiton` sẽ tồn tại  ra thành 1 mảng riêng và map vs Object `UserQuestionLogs` bằng `question_id` như vậy dữ liệu hoàn toàn sẽ không bị dư thừa.

```
Note: 
 Mình không khuyến khích dùng giải pháp của mình khi truy vấn dữ liệu với dữ liệu ít (trong trường hợp này hãy sử dụng Eager Loading trong Eloquent) vì cách làm này sẽ gây ra dư thừa query
```


***1.3 : Sử dụng Eloquent***

Hẳn ai sử dụng `laravel` đều không lại gì `Eloquent` vì sự tiện dụng và support đến tận chân của nó như : `Mutators`, `Relationships`,  ... hay các funtion chúng ta tự setup bên trong `Eloquent` . Đây là 1 ưu điểm của `Eloquent` nhưng nó cũng là điểm yếu trí mạng của nó khi làm việc với BigData. 

Khi bạn lấy nhiêu dữ liệu bằng `Eloquent` thực chất bạn đang lấy ra 1 `collection` bao gồm rất nhiều các `Eloquent` object có đầy đủ mọi thứ tiện nghi cho bạn ... Tuy nhiên chính sự tiện nghi không cần thiết này sẽ làm dữ liệu bị phình lên nên bạn cần xem xét tỉ mỉ khi dùng `Eloquent` cho BigData nhé

Với mình các bài toán dữ liệu lớn mình sẽ dùng `Database: Query Builder` mặc dù điều này sẽ khiến bạn phải xử lý nhiều hơn nhưng đổi lại sẽ là tiết kiệm dung lượng dữ liệu trả ra. Bạn nên xem xét trước khi sử dụng nhé .

### III, Query quá dài


Ví dụ trong bài toán đầu tiên, trước kia mình thường hay sử dụng 3 query . 
1. Lấy  `users` được tạo trong vòng 1 năm => trích ra `user_id`
2.  Lấy `question`được tạo trong vòng 1 năm  => trích ra `question_id`
3.  Lấy ra kết quả dựa vào `user_id` và`question_id` (Dùng WhereIn)

Cụ thể như sau :

```
    $users = User::where('created_at', 'trong thời gian 1 năm')->select('id')->toArray();
    $questions = Question::where('created_at', 'trong thời gian 1 năm')->select('id')->toArray();
    $logs = UserQuestionLogs::whereIn('user_id', $users)
            ->whereIn('question_id', $questions)
            ->get()
```

Cách trên chạy OK tuy nhiên sau 1 thời gian , đoạn code này bộc phát nhiều lỗi( do dữ liệu quá lớn) liên quan mình đã kể ở trên =)) . Vậy là mình nghĩ cách optomize nó. 

Nó có tậm 3 query chỉ để xử lý 1 vấn đề , cùng với query quá dài do list `user` và `question` quá nhiều. Và mình đã nghĩ đến 2 cách:
* Sử dụng `join` bảng  => Cách này khá ok nhưng minh không khuyến khích các bạn sử dụng cách này với dự liệu lớn vì `join` sẽ dẫn đến việc duplicate dữ liệu (gần giống như sử dụng  [Eager Loading trong Eloquent](https://viblo.asia/p/laravel-beauty-recipes-best-practices-6BAMYk9Evnjz#van-de-n--1-va-eager-loading-7))
*  Sử dụng [subQuery](https://dev.mysql.com/doc/refman/5.7/en/subqueries.html) => đây là cách mình quyết định sử dụng , mình thấy khá phù hợp , query dễ dàng.

Cụ thể như sau :
```

$logs = UserQuestionLogs::whereIn('user_id', function($subQuery) {
                        $subQuery->select('id')
                            ->from('users')
                            ->where('created_at', 'trong thời gian 1 năm')
            } )
            ->whereIn('question_id', function($subQuery2) {
                        $subQuery2>select('id')
                            ->from('questions')
                            ->where('created_at', 'trong thời gian 1 năm')
            } )
            ->get()
```

# Kết luận.

Trên đây là những cách mình nghĩ ra được để optimize và xử lý những vấn đề dữ liệu quá lớn. Bài viết còn nhiều thiếu xót mong mọi người bỏ qua cho. Nếu ai có ý tưởng và cách nào khác vui nòng comment bên dưới giúp mình nhé . Chào thân ái và quyết thắng !