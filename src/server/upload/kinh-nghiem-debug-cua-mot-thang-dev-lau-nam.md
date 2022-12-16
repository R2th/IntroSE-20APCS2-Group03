Debug là một hoạt động được các lập trình viên thực hiện khá "thường xuyên" trong khi lập trình. Nhưng không phải ai cũng biết các debug sao cho hiệu quả và "fix bug" ngay sau khi thực hiện. Cho nên mình viết một bài nói về kinh nghiệm cá nhân của mình sau nhiều năm code và "fix bug" dai dẳng. Đây là cũng bài viết đầu tiên của mình, mong mọi người chém em nhẹ tay :V

## Mục đích của Debug của mình
Tất nhiên khi đọc được tiêu đề, mọi người cho rằng chắc chắn mục đích của debug là để fix con "bug" này chứ là gì nữa =]]]. Nhưng đối với mình thì công việc debug nó có nhiều mục đích hơn so với việc chỉ là fix bug. Ngoài mục đính chính đó ra thì mình học được nhiều kinh nghiệm và cách hoạt động của mấy cái dòng code này hơn là chỉ để nó chạy được cho xong. Và từ đó mình sẽ nhớ và tránh gặp con bug này nhiều lần sau, giúp tiết kiệm các khối thời gian đấy. Ngoài ra, từ việc tìm kiếm lỗi, phân tích lỗi và sửa được lỗi đó cũng là một quá trình dài, giúp mình có tính kiên nhẫn hơn hẳn. Và sau đây là một vài kinh nghiệm của mình của mình về việc debug.

## Sử dụng kĩ năng tìm kiếm
Hầu như các bạn mới học lập trình hay đã là một lập trình viên lâu năm thì việc gặp "bug" xảy ra khá thường xuyên. Trong trường hợp đó, mọi người đều phải sử dụng google để tìm kiếm lỗi. Nhưng đôi khi các bạn không biết viết như thế nào để ra đúng câu trả lời mà mọi người cần. Sau đây mình sẽ hướng dẫn một mẹo để giúp các bạn tìm kiếm câu trả lời dễ dàng hơn.
> **Error** + **<tên lỗi>** + **<ngôn ngữ lập trình>**

Ví dụ với lỗi ở dưới này, thì các bạn ghi như sau
![](https://images.viblo.asia/36220d1b-de70-4b21-af59-56a5666932c5.jpg)

> error syntax unexpected php

Và đây là kết quả:
![](https://images.viblo.asia/1f12da0f-e7b3-4965-ab69-396059abcfe0.png)

Một số trường hợp khác, nếu các bạn không tìm ra được câu trả lời thì các bạn nên vận dụng trình độ tiếng anh "thượng thừa" của mình hoặc của Google Dịch để tìm kiếm theo đúng ngữ cảnh bug của bạn hơn, vì đa số các câu trả lời bằng tiếng anh nên bạn nào tiếng anh chưa tốt thì phải học thêm nha.

Ví dụ: Mình bị lỗi ở một hàm mã hóa mật khẩu và mình muốn tìm một cách mã hóa tối ưu và an toàn hơn. Mình sẽ tìm kiếm như thế này.

> Encrypt passwords in PHP

## Biết nơi bị lỗi
Một số bạn khi mới bắt đầu học lập trình, khi thấy lỗi sẽ rất hoảng loạn và nhờ đến các cộng đồng lập trình và đa số là sẽ bị người khác chửi vì lỗi quá dễ mà cũng hỏi :V. Các bạn có thể thử cách này để tự fix bug mà không cần hỏi người khác.

Ví dụ mình có một lỗi trong ReactJS, ngay sau khi bàn giao bug thì mình xem xét nơi mình bị lỗi là dòng nào trong file nào. Tiếp theo đó là nó bị lỗi gì.

![](https://images.viblo.asia/d384ede1-88b9-4ff9-a4db-2ffbde2ab522.png)

Phân tích:
- Thông báo lỗi ở dòng 148 và ở file bundle.js
- Bị lỗi **... is not a function** - thông báo rằng nó không phải là một hàm, đừng có gọi nó nữa.
- Lỗi này sinh ra khi một biến chưa được khai báo hoặc nhận giá trị bị lỗi về và được sử dụng. Khiến code bị lỗi. 

Sau khi nhận biết lỗi xong, bạn có thể tìm kiếm lỗi này ở trên Google hoặc nhờ sẽ tốt hơn là bạn hoảng loạn đấy


## Ít sử dụng các Debugger
Đối với mình mà nói, không biết vì mình biết đến lập trình web đầu tiên và code bằng Notepad++ cho nên các chương trình debug khá lạ lẫm đối với mình. Ví dụ xdebug của php hay debugger Nodejs. Khi gặp một lỗi, mình hay in tất cả dữ liệu trước bị lỗi thay vì breakpoint và chạy chờ xem nó lỗi chỗ nào. Và không chỉ một chỗ mình in ra rất nhiều nơi trong dòng code. Điều này giúp mình thấy được lỗi đó sinh ra ở đâu. Và nắm bắt các code chạy như thế nào

Ví dụ:
```
<?php
$arr = [];

$arr[] = "a";
$arr[] = 2;
$arr[] = 5;

echo $arr[0] * $arr[1];

?>
```

Kết quả sẽ báo lỗi như sau:
![](https://images.viblo.asia/ffebbffe-16f4-4751-992e-4395a2dabd49.png)

Như bạn thấy, lỗi được báo ở dòng 8. Và mình nghi ngờ nó lỗi từ thằng **$array** (ai cũng biết điều đó :V ). Mình sẽ in nó ra để xem trước khi lỗi nó sẽ như thế nào. Đối với php là var_dump, ngoài ra bạn đối với các ngôn ngữ khác sẽ có cách in ra khác nhau như:
- var_dump của PHP
- console.log của JS
- print của Python
- ....

```
<?php
$arr = [];

$arr[] = "a";
$arr[] = 2;
$arr[] = 5;
var_dump($arr);
echo $arr[0] * $arr[1];

?>
```

![](https://images.viblo.asia/a4ad6085-9eab-47fc-ba5c-87ee8cfa4908.png)

Khi mình in ra thì mình mới thấy lỗi :v. Đó là $arr[0] là một string (chuỗi) còn $arr[1] là một int (số). Vì thế mình có 2 trường hợp:
- Chuyển $arr[0] thành một số
- Chuyển phép tính thành
```
echo $arr[1] * $arr[2];
```

Qua bài viết này, mong các bạn newbie hay lão làng cũng đều góp ý và ủng hộ coi như là động lực cho em ra thêm bài viết mới. Cảm ơn mọi người rất nhiều.