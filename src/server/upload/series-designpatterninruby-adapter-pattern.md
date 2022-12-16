Nói về Adapter trong thực tế thì chúng ta có cả hàng đống ví dụ mà chúng ta gặp trong cuộc sống hằng ngày,  chúng ta sử dụng hằng ngày nó nhưng không hề để ý.
![](https://images.viblo.asia/12e3e8fb-2290-4072-a657-8a2c955f0f5c.jpg)
Trong trường hợp mà chúng ta muốn cắm một cái sạc pin 3 chân vào 1 cái ổ cắm 2 chân, khi mà thiết kế của 2 thành phần không giống nhau nhưng bạn vẫn muốn kết hợp nó lại thì chúng ta sẽ sử dụng những Adapter để chúng có thể kết hợp lại được với nhau. 
Về `hardware` thì là như vậy, còn `software` thì sao? Thực ra, Adapter được sử dụng trong `software` còn nhiều hơn cả `hardware`, vì một nỗi,  mỗi người, mỗi công ty, mỗi dự án lại có thiết kế interface khác nhau, chả ai giống ai, chả interface nào giống interface nào. Vì vậy, để có thể kết nối được những interface này lại được với nhau thì chúng ta phải sử dụng các `Adater` để chúng có thể làm việc được với nhau. 
### Software Adapter
Thử tượng tượng, trong dự án của bạn, hồi trước có một class `Encrypter` đã tồn tại trước đó "hàng ngàn thế kỉ" trước như thế này:
{@gist: https://gist.github.com/namtx/f8571faab0e75cb6de70d6ecf8451817}
method `encrypt` của class `Encrypter` nhận vào 2 params: `reader`, `writer`, hàm này sẽ đọc từng byte trong  file `reader`, encrypt nó và sau đó ghi vào file `writer`
Việc encrypt file bằng class `Encrypter` sẽ là như thế này:
```ruby
reader = File.open('message.txt')
writer = File.open('message.encrypted','w')
encrypter = Encrypter.new('my secret key')
encrypter.encrypt(reader, writer)
```
Mọi thứ diễn ra rất tốt đẹp, cho đến một ngày, KH của của bạn có yêu cầu mới: Thay vì dụng một file đầu vào `reader` thay vào đó có thể sử dụng đầu vào là một `String `
Khi nhận được yêu cầu này, lúc đầu hơi khó chịu, nhưng cuối cùng với kinh nghiệm của mình, bạn cũng nhận ra cách để viết một class thích hợp, để không phải thay đổi code quá nhiều:
```ruby
class StringIOAdapter
    def initialize(string)
        @string = string
        @position = 0
    end
    
    def getc
        if @position >= @string.length
            raise EOFError
        end
        ch = @string[@position]
        @position += 1
        return ch
    end
end 
```
Giờ đây, class `StringIOAdapter` đã hoàn toàn giống với những gì mà class `IO` của Ruby. nó nhận vào 1 string và có method `getc` để sử dụng trong class `Encrypter` để có thể lấy từng kí tự ra để encrypt
```ruby
encrypter = Encrypter.new('XYZZY')
reader= StringIOAdapter.new('We attack at dawn')
writer=File.open('out.txt', 'w')
encrypter.encrypt(reader, writer)
```
Việc sử dụng `Encrypter` là hoàn toàn không bị ảnh hưởng.
class `StringIOAdapter` là một thể hiện chính xác cho `Adapter Pattern`, vì interface `String` và `IO` không giống nhau, cho nên chúng ta cần một Adapter nằm giữa chúng để có thể chuyển đổi được dễ dàng. 

![](https://images.viblo.asia/a03a07ef-460f-46b3-b6e1-7b98f1fb6775.png)

Diagram trên là quá kinh điển cho `Adapter Pattern` rồi, nhưng diagram là một chuyện, còn việc hiểu nó hay không là một chuyện hoàn toàn khác. 
Ở đây, với tư cách là `Client`, nó có một tham chiếu đến một `target object`, nó ngầm định rằng, `target object` này sẽ có `interface` mà nó mong muốn (trong trường hợp này thì là: có method `getc`), và nhiệm vụ của `target object` là implement method này. Client chỉ cần biết có thể, không cần quan tâm, `target object` này thuộc class gì. Và thực chất, trong `Apdater Pattern` thì `target object` là một `Adapter`.
Quay lại với ví dụ trên: 
![](https://images.viblo.asia/976047a4-d0b3-4a9c-a91a-9a97da1549eb.png)

Đứng trên hệ quy chiếu của `Encrypter` thì `StringIOAdapter` không khác gì là một `IO` hết.

#### To be continued...
Đây là một implementation đơn giản cho `Adapter Patter`, trong phần tiếp theo mình sẽ trình bày những khía cạnh khác của `Adapter Pattern`, mong các bạn ủng hộ.