### 1 Giới thiệu.
Khi mình tìm hiểu python ta đã thấy một điều quái lạ là vì sao python không định nghĩa các function switch case cho dev? Mình đã băn khoăn điều đó và tìm hiểu vì sao và làm sao để sử dung switch case như các ngôn ngữ khác c++, ruby, ++.
### 2. Python Switch Case Statemen
Python không có cấu trúc switch case  đơn giản. Nếu bạn đến từ nền tảng của c++, java, ruby,.. thì bạn sẽ thấy điều này có vẻ hơi kỳ quặc. 

Nếu như ở trong c++ hoặc java sẽ có cấu trúc kiểu kiểu dạng này :
```ruby
string week(int i){
       switch(i){
               case 0:
                       return “Sunday”
                       break;
               case 1:
                       return “Monday”
                       break;
               case 2:
                       return “Tuesday”
                       break;
               case 3:
                       return “Wednesday”
                       break;
               case 4:
                       return “Thursday”
                       break;
               case 5:
                       return “Friday”
                       break;
               case 6:
                       return “Saturday”
                       break;
               default:
                       return “Invalid day of week”
```
Nhưng python không như trên. Vậy để có thể được như trên Python cần sử dụng cấu trúc dict để thực hiện khi gặp trường hợp cần thiết.
### 3. Phương pháp tạo Switch Case Statement trong Python
Ngoài việc dùng các cấu trúc sẵn có if-else-other. Thay vào đó chúng ta sử dụng một dict để ánh xạ đến các case, các chức năng. Ở đây mình tạo một function là week để gọi tới các ngày trong tuần đó. Và nó sẽ được thực hiện như sau:
```ruby
def week(i):
        switcher={
                0:'Sunday',
                1:'Monday',
                2:'Tuesday',
                3:'Wednesday',
                4:'Thursday',
                5:'Friday',
                6:'Saturday'
             }
         return switcher.get(i,"Invalid day of week")
```
Và bây giờ chúng ta có thể hiểu function week như một switch case trong Python. Và nó được gọi như sau để thực hiện.
```ruby
>>> week(2)
'Tuesday'
>>> week(0)
'Sunday'
>>> week(7)
'Invalid day of week'
>>> week(4.5)
'Invalid day of week'
```
#### a. Sử dụng Python Functions & Lambdas
Chúng ta cũng có thể sử dụng function và lambdas trong dict.
```ruby
>>> def zero():
        return 'zero'
>>> def one():
        return 'one'
>>> def indirect(i):
        switcher={
                0:zero,
                1:one,
                2:lambda:'two'
                }
           func=switcher.get(i,lambda :’Invalid’)
           return func()
>>> indirect(4)
‘Invalid’
>>> indirect(2)
'two'
>>> indirect(1)
'one'
>>> indirect(0.5)
'Invalid'
```
#### b. Thông qua Classes
Sử dụng class chó phép chúng ta chọn method ở thời điểm runtime.
```ruby
>>> class Switcher(object):
          def indirect(self,i):
                   method_name='number_'+str(i)
                   method=getattr(self,method_name,lambda :'Invalid')
                   return method()
def number_0(self):
          return 'zero'
def number_1(self):
          return 'one'
def number_2(self):
          return 'two'
>>> s=Switcher()
>>> s.indirect(2)
'two'
>>> s.indirect(4)
'Invalid'
>>> s.number_1()
'one'
```
###  Tham khảo. 
https://data-flair.training/blogs/python-switch-case/