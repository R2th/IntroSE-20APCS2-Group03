# Giới thiệu

`Rake task` là một cách tuyệt vời để nâng cao (hoặc thậm chí tự động hóa) công việc của bạn trong một dự án ruby.  Bởi vì chúng ta thường xuyên maintainance hoặc chạy các job về data migration với một số lượng data rất lớn. Những lúc như vậy `Rake task`  là sự lựa chọn tối ưu cho bạn. 

Nhưng khi làm việc với `rake task` bạn sẽ gặp một điều tưởng chừng như đơn giản nhưng lại không đơn giải chút nào. Đó chính là việc truyền các đối số `argument` vào trong rake task.

Chúng ta hãy thực hiện một nhiệm vụ thực sự đơn giản:

```
    task :add do
      puts 1 + 2
    end
    
    Kết quả khi chạy được:
    $ rake add
  # => 3
```
Chắc chắn rằng bạn sẽ  không bao giờ sử dụng một tác vụ như thế này trong thực tế. Tuy nhiên, chúng ta hãy dùng nó như là một phương tiện để chứng minh làm thế nào chúng ta có thể làm cho nó awesome hơn.

Trong ví dụ này,  phép cộng mà luôn mặc định chỉ là 1 + 2 thì nó fail quá. vậy nên giờ mình tiến hành cải biến nó. vậy làm thế nào chúng ta có thể truyền đối số vào để nó đúng nghĩ là một phép cộng 2 số? 

# Cách 1: Phương thức thông thường rake hổ trợ
Rake hỗ trợ truyền các đối số vào task. Ở đây, task sẽ trông như thế này:

```
    task :add, [:num_1, :num_2] do |task, args|
      puts args[:num_1].to_i + args[:num_2].to_i
    end
    
    Cách sử dụng bạn chạy rake sau:
    $ rake add[1,2]
    # => 3
```
Cách này được dùng khá nhiều. tuy nhiên `bạn nên cẩn thận khi dùng nó với zsh` vì bạn sẽ gặp phải lỗi như sau:

`zsh: no matches found ...`

Bởi vì nó không hiểu đấu "[ ]" của bạn. Vì vậy, bạn phải chạy nhiệm vụ như thế này:
```
 $ rake add\[1,2\]
    # => 3
```
hoặc:
```
 $ rake 'add[1,2]'
    # => 3
```
Ngoài ra, Rake cũng cung cấp một phương thức khá là tiện dụng để `thiết lập các giá trị mặc định` cho các đối số của tasks, bằng cách sử dụng #with_defaults trên đối tượng args:
```
    task :add, [:num_1, :num_2] do |task, args|
      args.with_defaults(num_2: 3)
      puts args[:num_1].to_i + args[:num_2].to_i
    end
    
    Cách sử dụng bạn chạy rake sau:
    $ rake add[1]
    # => 4
```


Đây là cách đầu tiên để bạn truyền biến vào trong rake task, Tuy nhiên có một số `nhược điểm ` như:
* Bạn cần dấu ngoặc đơn trên dòng lệnh và khi cái zsh thì bạn phải tốn thêm công đánh dấu \ để zsh có thể hiểu được. 
* Bạn cần biết thứ tự các các đối số truyền vào.
* Và bạn không thể để dâu cách (space) vào giữa các dấu phẩy ví dụ: `add[1,  2]`. điều này khiến bạn gặp một lỗi khác.

Tuy nó giải quyết được nhu cầu của bạn. nhưng nhìn chung thì nó không tốt cho lắm. 
Tiếp đến ta đi đến với cách thứ 2.

# Cách 2: Sử dụng Environment Variables
Nếu bạn đang làm việc với rake, bạn có thể biết (hoặc đã sử dụng) `biến môi trường` (enviroment variable). Nếu bạn đã deploy một project thì bạn chắc chắn sẽ chạy một cái gì đó giống như thế này:

```
$ RAILS_ENV=production bundle exec rake ...
Trong trường hợp này, bạn đang thiết lập một biến môi trường trong RAILS_ENV.
```
Chúng ta có thể sử dụng cùng phương pháp đó với rake. Task sẽ được định nghĩa như sau:
```
    task :add do
      puts ENV['NUM1'].to_i + ENV['NUM2'].to_i
    end
    
    Chạy rake task:
    $ rake add NUM1=1 NUM2=2
    # => 3
```
Cách này hoạt động tốt, không gặp phải những vấn đề như cách 1, nhưng nó đặt biến môi trường và các biến môi trường này thường không cần thiết. Nên bạn có thể xem cách nào phù hợp với bạn để có thể sử dụng.
# Arguments và điều kiện tiên quyết của Arguments
Có những khi bạn gặp phải trường hợp: phải làm thế nào để bạn khai báo một task có các đối số và điều kiện tiên quyết? 

Vâng, bạn vượt qua một Hash là tham số thứ hai cho phương thức task. `key` của Hash chứa các đối số của nhiệm vụ của bạn và `value` chứa các điều kiện tiên quyết.

```
   task :show, [:num_1, :num_2] do |task, args|
      puts "Num_1 = #{args[:num_1]}"
      puts "Num_2 = #{args[:num_2]}"
   end

   task :add, [:num_1, :num_2] => [:show] do |task, args|
     puts "num_1 + num_2 = #{args[:num_1].to_i + args[:num_2].to_i}"
   end
    
    chạy rake sau:
    $ rake add[1,2]
    # Num_1 = 1
    # Num_2 = 2
    # num_1 + num_2 = 3
```
Ở ví dụ trên ta thấy việc khi chạy task. ta đã gọi thực hiện `show` trước khi thực hiện `add`
# Kết luận
Trên đây là một số nội dung về truyền argument vào trong rake task. hi vọng nó giúp ích được cho các bạn
Tài liệu tham khảo: https://jacobswanner.com/development/2017/rake-task-arguments/