# Giới thiệu
Ngày nay, trong lập trình việc thực hiện multi-language cho ứng dụng là một yêu cầu cần thiết. Trong lập trình iOs, ta thường sử dụng file string để quản lí string ứng với từng ngôn ngữ. Tuy nhiên, ứng với từng ngôn ngữ thường có cấu trúc ngữ pháp khác nhau. Chẳng hạn trong tiếng Việt không phân biệt giữa số nhiều số ít, nhưng trong tiếng Anh ta cần phân biệt. Trong bài viết này tôi sẽ hướng dẫn các bạn xử lí vấn đề này.
#  Đặt vấn đề.
Trong tiếng anh, danh từ phải phụ thuộc vào số nhiều số ít ta phải thêm "s" vào phía sau danh từ.
Ví dụ: 
I have 1 apple
I have 2 apples

Cách thông thường.
```
    String.init(format: "I have %d Apple", 1)
```
Output:
![](https://images.viblo.asia/412c4547-92aa-4bd5-a62b-d2b0fbc95b03.png)

- Giải pháp thông thường chúng ta nghĩ đến trong trường hợp này. 
```
    if count == 1 {
        string = String.init(format: "I have %d apple", count)
    } else {
        string = String.init(format: "I have %d apples", count)
    }
    
```

Output:

    count = 1 --> I have 1 apple
    count = 3 --> I have 3 apples


 - Cách tiếp cận trên nhìn chung có thể giải quyết vấn đề tuy nhiên nó lại không thể giải quyết được những bài toán lớn hơn chẳn hạn. Trong tiếng Nga. Việc xử lí số nhiều có thể phức tạp như thế này.
 ![](https://images.viblo.asia/d55569cc-5e47-45bc-a08e-2ac47a1d6d48.png)

Đối với những ngữ pháp như thế này để dùng if else thì thật là thảm hoạ cho code của bạn. chưa kể bạn còn phải xử lí cho multi-language. Theo được biết thì trên thế giới có khoảng 500 ngôn ngữ. Nếu xử lí bằng cách này thì sẽ biến code của bạn thành một đống "bullshit"

- Thật may, để giải quyết vấn đề này Apple đã giúp đỡ hữu hiệu bằng file .stringdict.

# Sử dụng stringdict để quản lí plural.
Theo định nghĩa của Apple.

A .stringsdict file is a property list used to define language plural rules.

Avoid using a .stringsdict file with a string that does not include a number, because a language might define generic singular and plural forms in ways that don’t work well with the one and other categories.

Nói nôm na file này được tạo ra nhằm hỗ trợ cho việc định ngữ các quy tắc về phia danh từ dựa vào 1 tham số truyền vào. Tránh việc sử dụng khi khi chuỗi không chứa bất kì số nào.

## Sử dụng
### Bước 1: Khởi tạo
Tạo file Localizable.stringdict như sau.

Tao new file trong Repository. Chọn file Stringdict.
![](https://images.viblo.asia/2e56f06a-0e31-4be1-8f30-97154fd312af.png)

- Thông thường đặt tên file là Localizable.
- ![](https://images.viblo.asia/97228ed3-7001-408d-bdff-a8579abcfa03.png)

File sau khi được tạo sẽ có format như sau.
 ![](https://images.viblo.asia/d3012c9d-3c75-4281-849c-936e7e3e5651.png)
 
 File được tạo ra đước định nghĩa theo dạng Dictionary gồm có key-value
Trong đó:

- Localized String Key là key tương ứng với giá trị biến được truyền vào. Đứng trước là tiền tố %#@ và hậu tố @
Theo như ví dụ, thì giá trị truyền vào sẽ là VARIABLE,  ngoài ra ta còn có thể truyền thêm nhiều biến khác nữa.

VARABLE là một mảng key-value chứa:

- NSStringFormatSpecTypeKey: key chứa giá trị language type rule. Trong trường hợp này chi cho phép có giá trị là. NSStringPluralRuleType.

- NSStringFormatValueTypeKey: key chứa format đại diện cho tham số truyền vào. ví dụ %d

- one, two, other, few... key chứa format cho các trường hợp tương ứng với giá trị của biến truyền vào.

## Bước 2: Config
Bước tiếp theo chúng ta sẽ config các trường cần thiết theo giống như hình sau 
![](https://images.viblo.asia/1dd5c97e-1354-43ce-a4c8-d5c52fcc9b4a.png)


file resouce 
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>number_of_apple</key>
	<dict>
		<key>NSStringLocalizedFormatKey</key>
		<string>%#@VARIABLE@</string>
		<key>VARIABLE</key>
		<dict>
			<key>NSStringFormatSpecTypeKey</key>
			<string>NSStringPluralRuleType</string>
			<key>NSStringFormatValueTypeKey</key>
			<string>d</string>
			<key>one</key>
			<string>I have %d apple</string>
			<key>other</key>
			<string>I have %d apples</string>
		</dict>
	</dict>
</dict>
</plist>

```

Như vậy bằng các bước đơn giản chúng ta hoàn thành và sẵn sàng để sử dụng.
###  Sử dụng.

```
let formatString : String = NSLocalizedString("number_of_apple",
                                                     comment: "")
   var resultString : String = String.localizedStringWithFormat(formatString, 1)
```

Output: 

![](https://images.viblo.asia/21a447cc-b92e-492f-b7d2-df8adae73261.png)



# Kết luận
 Như vậy là ta đã hoàn thành việc xử lí theo đúng ngứ pháp đối với tiếng Anh bằng việc sử dụng file stirngdict. Ngoài ra ta có thể truyền nhiều biến vào cùng một lúc. 
Bên cạnh đó chúng ta còn có thể xử lí multi-language tương tự như file Localizable.String 
![](https://images.viblo.asia/c8889240-c338-46c0-8e0c-c333bec379b8.png)