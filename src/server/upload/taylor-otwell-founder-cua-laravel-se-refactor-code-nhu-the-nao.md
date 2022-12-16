## Giới thiệu
Code sao cho đẹp, sao cho tối ưu là một vấn đề không phải dễ! Bạn nghĩ mình đã code đẹp chưa, đã bao giờ xem lại code của mình và cảm thấy xấu hổ? :cold_sweat:
Vậy hãy cùng xem founder của Laravel - Taylor Otwell sẽ refactor code của mình như thế nào nhé, dưới đây là một đoạn tweet của Taylor được mình cop nhặt về.

## Nội dung

> One thing I like to do to keep controller's lean and clean... off-load grunt validation / helper work into a form request. For example... I was spiking on a controller that looked like this...
> 

Taylor có một controller `RestoreDatabaseController` và method `store`, trong method này anh ta thực hiện:
- kiểm tra quyền của user với action này
- kiểm tra một loạt rules validation khác nhau
- cuối cùng là thực hiện chọc ngoáy vào database nếu pass các bài kiểm tra trên

Và nó thực hiện nhiệm vụ của mình một cách hoàn hảo, nhưng có gì đó không ổn...

Sau một loạt bước nhồi nhét method `store` của controller có vẻ khá béo rồi, và Taylor quyết định sẽ giảm béo cho nó :laughing:

![](https://images.viblo.asia/b6d2875a-7f1c-4b87-85d3-39e70bc4a1d9.jpg)

> I extracted the validation and other grunt work into a RestoreDatabaseRequest class... use my old trusty "once" helper (now spatie/once) to Memoize a couple things as well...
> 

Anh ta thực hiện ném các bước validation và một vài công việc khác vào class `RestoreDatabaseRequest`, thực hiện tách các tách các action khác nhau thành các method khác nhau, Taylor cũng dùng function `once` - A magic memoization function (một function giúp ghi nhớ một cách "ma thuật")
https://github.com/spatie/once

![](https://images.viblo.asia/4550fe6d-4368-4bd4-9641-369dfb69afa8.jpg)

> Finally, refactor controller to a one-liner... 🔥 ... I know it's basically the same amount of total code but I just like to extract the "noise" out into the form request layer... 🛀
> 

Cuối cùng anh ta chỉ việc inject `RestoreDatabaseRequest` vào method `store` và tiến hành xóa xóa xóa đến khi nó gầy, và trông thật ngầu,  It's awesome :stuck_out_tongue_winking_eye:

![](https://images.viblo.asia/193a5f0f-82ec-46b1-96e0-6e6bc3f5ee08.jpg)

Trên đây chỉ là một ví dụ nhỏ về code refactor, bạn có học hỏi được gì từ bài viết này không, comment cho mình biết với nhé. Hẹn gặp lại!