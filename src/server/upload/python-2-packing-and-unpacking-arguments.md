### Nỗi buồn của Lão Trư

Ngày xửa ngày xưa, đã lâu lắm rồi, từ cái hồi python ver 2, với cấu tạo cơ thể cồng kềnh, lão trư ăn uống rất vất vả:

```
    # cơ thể lão trư
    class LaoTru(object):
        def eat(self, what, e, ver):
            self.digest(what)
            self.digest(e)
            self.digest(ver)
    
    # cách lão trư ăn uống hàng ngày
    lao_tru = LaoTru()
    bunch_of_foods = [Fish(), Cat(), Dog()]
    lao_tru.eat(
        bunch_of_foods[0],
        bunch_of_foods[1],
        bunch_of_foods[2],
    )
```

Buồn của lão trư:
* _Buồn 1: mỗi bữa lão trư chỉ ăn được 3 món_
    ```
    def eat(self, what, e, ver):
        ...
  
    # hay là luyện cơ hàm để ăn được nhiều hơn?
    def eat(self, what, e, ver, ver, ver):
        ...
    # mà thôi, mệt lão trư lắm :v
    # ăn nhiều lại phải tập nhiều
    ```
* _Buồn 2: lão trư phải tiêu hóa từng món một_
    ```
    self.digest(what)
    self.digest(e)
    self.digest(ver)
    # giá mà lão trư có thể tiêu một lúc hết sạch luôn T_T
    ```
*  _Buồn 3: lão trư phải bốc bỏ mồm từng cái một_
    ```
    lao_tru.eat(
        bunch_of_foods[0],
        bunch_of_foods[1],
        bunch_of_foods[2],
    )
    # giá mà lão trư có thể nuốt chửng một phát sạch trơn T_T
    ```

### Lão trư thời đại mới

Sang thời đại python ver 3, lão trư vui sướng hơn bao giờ hết, tất cả là nhờ cái asterisk "*".
* _Xử lí buồn 1 và 2 - làm sao để ăn được nhiều hơn mà chả phải tập tành_:
    ```
    # nay đã có: asterisk! tất cả nằm gọn trong một list!
    def eat(self, *whatevers):
            self.digest(food) for food in whatevers
    ```
* _Xử lí buồn 2 - làm sao để nuốt một phát hết luôn_
    ```
    # nay đã có: asterisk! list tóe loe thành nhiều mảnh!
    eat(*bunch_of_foods)
    ```
* _Bonus vui - ăn tráng miệng?:_
    ```
    # nay đã có: asterisk! ăn không giới hạn!
    eat(*bunch_of_foods, Icecream(), Cacke())
    ```

### Kết

Python 3 mang tới vô cùng những công cụ hữu ích, dấu asterisk (*) trước kia chỉ để làm phép nhân đã trở thành một thứ không thể thiếu mỗi ngày.

```
# toàn cảnh lão trư thời hiện đại
# thon thả hơn!
# ăn uống ko giới hạn!
class LaoTru(object):
    # cái này bọn tây gọi là "packing" arugments ~ đóng gói argument vào một cái list
    def(self, *whatevers):
        self.digest(food) for food in whatevers

lao_tru = LaoTru()
bunch_of_foods = [Fish(), Cat(), Dog()]
# cái này thì tây nó gọi ngược lại là "unpacking" arguments ~ đập tóe loe cái list ra thành nhiều phần tử
lao_tru.eat(*bunch_of_foods, Cake(), Icecream())
```