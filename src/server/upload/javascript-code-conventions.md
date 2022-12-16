Dường như các new dev thường đọc các bài viết về những vấn đề nâng cao trong lập trình nhưng ít khi lại để ý đến những thứ basic nhất như convention. Bài viết dưới đây mình sẽ chia sẻ một số conventions cần lưu ý khi viết javascription code. Mình cũng là một new dev nên chúng ta sẽ cùng tìm hiểu về các quy ước chung và một số example demo về Js convention nhé. 
# I. Code Conventions?
Trước tiên cùng tìm hiểu code convention là gì nhé. Code convention là những hướng dẫn, quy tắc chung về cách viết mã, cấu trúc file, thư mục trong project hay đơn giản nhất chỉ là cách đặt tên file, tên biến, comment trong các ngôn ngữ. 

Convention đóng vai trò rất quan trọng khi bạn làm việc trong công ty, làm việc cùng với team. Có thể tưởng tượng rắng nếu như những dòng code mà bạn viết ra không tuân theo một quy tắc hay sự nhất quán nào sẽ khiến cho đồng đội rất khó đọc, khó hiểu và nếu như mỗi người viết một cách khác nhau thì project sẽ dần trở thành một mớ hỗn độn, rất khó bảo trì và phát triển. 

Hầu hết các công ty phát triển phần mêm đều sẽ đưa ra một bộ quy tắc chung để các nhân viên hướng tới và tuân theo đó. Tuy nhiên những conventions này đều phải dựa trên quy tắc chung của ngôn ngữ mà họ đang phát triển. 
# II. Style Guidelines
## 1. Indentation
Để code được dễ đọc đầu tiên chúng ta chú ý đến đó là quy tắc indent. 
```
if(num===1){
  for(i=0;i<array.length;i++){
    if(array[i]!==0){
      //some code
    }
    else if(array[i]===array.length){
      // code
    }
  }
}
```
Đoạn mã trên mình đã mô tả khá rõ ràng về indentation.  Khối lệnh `if else` nằm trong vòng lặp `for` được lùi vào 2 spaces và tất cả chúng nằm trong khối lệnh `if` nên sẽ phải lùi vào 2 space so với câu lệnh `if`.

Để thực hiện indent ta có thể sử dụng `tabs` hay `spaces`. Khoảng cách của indent có thể được quy định bởi các công ty. Ví dụ như ở công ty mình 1 indent là 2 spaces đối với ngôn ngữ javasrcipt
## 2. Tabs indentation
Với indentation level sử dụng 1 tab. Hiểu một cách đơn giản là mỗi cấp indentation sẽ cách nhau 1 tab
## 3. Space indentation
Mỗi indentation level sẽ cách nhau một một nhóm các spaces. Tương tự tab indentation, các indetation level thường cách nhau bởi 2 spaces, ví dụ 2 spaces với first indentation, 4 spaces với second indentation, ...

Chúng ta có thể setting khi sử dụng các editor để tùy ý một tab tương ứng với bao nhiêu spaces. Ví dụ setting sublime text của mình, tab_size tương ứng với 2 characters.

```
{
	"color_scheme": "Packages/Color Scheme - Default/Monokai.tmTheme",
	"ensure_newline_at_eof_on_save": true,
	"font_size": 14,
	"highlight_line": true,
	"ignored_packages":
	[
		"Vintage"
	],
	"rulers":
	[
		80
	],
	"save_on_focus_lost": true,
	"show_encoding": true,
	"show_line_endings": true,
	"tab_size": 2,
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"word_wrap": true
}
```
# III. Avoid Horizontal Scrolling
Một dòng code thường được giới hạn bởi 80 kí tự vì thế chúng ta cũng nên cố gắng không phá vỡ nguyên tắc này. Việc viết code không quá 80 kí tự không giúp dễ hiểu mà còn rất tiện cho việc review đối với các dự án sử dụng github.
# IV. Blank Lines are not harmful
Sử dụng blank line để phân cách các khôi lệnh hay logic không liên quan. Dưới đây là ví dụ về việc sử dụng và không sử dụng blank line 

```
if(num===1){
  for(i=0;i<array.length;i++){
    if(array[i]!==0){
      //some code
    }
    else if(array[i]===array.length){
      // code
    }
  }
}
```

```
if(num===1){

  for(i=0;i<array.length;i++){
  
    if(array[i]!==0){
      //some code
    }
    else if(array[i]===array.length){
      // code
    }
  }
}
```
# V. Naming Convention
ECMAScript sử dụng quy tắc camelCase (quy tắc lạc đà) để đặt tên. Khi đặt tên chúng ta cần đặt tên một cách ngắn gọn, dễ hiểu, dễ nhớ.
## 1. Function Naming
Dưới đây là một số function naming conventions phổ biến. 
* can Function that returns a boolean
* has Function that returns a boolean
* is Function that returns a boolean
* get Function that returns a nonboolean
* set Function that is used to save a value

## 2. Constructors
Constructors là các hàm dùng để khởi tạo object thông qua new nhưng tránh sử dụng quy tắc camelCase, chúng ta sẽ sử dụng quy tắc PascalCase.

# VI. Sumup
Mới đầu có thể chưa quen nhưng chúng ta nên practice thường xuyên và tuân thủ đầy đủ các convention như vậy kĩ năng viết code của chúng ta ngày càng được cải thiện. Các đoạn mã sẽ dễ dàng để maintain và phát triển về sau.

Tham khảo: https://medium.com/@amanhimself/javascript-conventions-74d6ff728082