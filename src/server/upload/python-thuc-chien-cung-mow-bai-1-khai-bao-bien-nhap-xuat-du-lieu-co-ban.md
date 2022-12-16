Bài trước Mow đã nói sương sương về [Python](https://mowblog.hashnode.dev/tong-quan-python-cho-nguoi-moi-hoc-lap-trinh) và ứng dụng của nó. Hôm nay thì các bạn cùng Mow đi vào series Python thực chiến bắt đầu là tìm hiểu về biến, cách lấy dữ liệu từ bàn phím và xuất dữ liệu ra màn hình nha.



Để bắt đầu học bài này thì trước tiên bạn phải cài môi trường để code Python cũng như các công cụ cần thiết. Bạn có thể tham khảo tại [đây](/)  nha hoặc bạn có thể sử dụng [Google Colab](https://colab.research.google.com/) để code hoặc có thể tự [Google](https://www.google.com/search?q=C%C3%A1ch+c%C3%A0i+Python+tr%C3%AAn+window&rlz=1C5CHFA_enVN953VN953&oq=C%C3%A1ch+c%C3%A0i+Python+tr%C3%AAn+window&aqs=chrome..69i57j0i22i30l2j69i60.289j0j7&sourceid=chrome&ie=UTF-8)  để cài Python nha, keyword: Cách cài Python trên Window/MacOS/Linux.

### 1. Khai báo biến

Cú pháp

```variant_name = variant_value```

Trong đó:

```variant_name``` là tên của biến bạn muốn đặt tuân theo quy tắc bên dưới

```variant_value``` là giá trị của biến đó nếu là kiểu string thì được viết trong cặp dấu nháy đơn hoặc nháy kép nhé.

Ví dụ ```name = 'Mow'``` hoặc ```name = "Mow"```

Nếu các bạn nào có từng học qua C/C++ hay C#,... thì có thắc mắc là kiểu dữ liệu của biến ```name``` là gì không? Hmmmm, trong Python các bạn không cần khai báo kiểu dữ liệu của biến nhé vì kiểu của biến sẽ được tự nhận theo giá trị mà bạn đã gán cho biến. Ví dụ ```name``` sẽ có kiểu dữ liệu là chuỗi.

- ***Các quy tắc đặt tên biến trong Python***
    
    - Các ký tự hợp lệ:

        - Chữ thường (a -> z)

        - Chữ hoa (A -> Z)

        - Chữ số (0 -> 9)

        - Dấu gạch dưới ' _ '

    - Không được bắt đầu bằng chữ số, ví dụ như ```3conbuom```

    - Không được trùng với từ khoá của Python, ví dụ như ```True``` hay ```for, ...```

    - Không được chứa các ký tự đặc biệt, ngoại trừ '_' ví dụ như ```d@ta``` hay ```giaithua!, ...```

    - Có phân biệt viết hoa & thường ví dụ ```songuyen``` khác ```soNguyen```

    - Ví dụ về các tên hợp lệ ```number1```, ```Flag```, ```pointer```, ```user_address```, ```_temp```, ...

### 2. Input & Output trong python:

Làm sao để lấy giá trị nhập vào từ bàn phím hay xuất một giá trị nào đó ra màn hình?

Chúng ta sẽ tìm hiểu về hàm ```print()``` và ```input()``` nha.

Để nhận một giá trị được nhập từ bàn phím thì trong Python các bạn sẽ dùng cú pháp sau
```
input(<Chuỗi cần hiện(không bắt buộc)>)
```
Ví dụ
```
# Mình sẽ yêu cầu nhập vào tên của bạn nhé
name = input("Enter your name here: ")
# Mình sẽ nhập là 'Mow' nha
```

Ở đoạn code trên chuỗi ```Enter your name here: ``` sẽ hiện ra và yêu cầu bạn nhập gì đó từ bàn phím và kết quả bạn nhập sẽ được lưu vào biến ```name```.

Sau khi đã nhận được giá trị nhập từ bàn phím và lưu vào biến name thì chúng ta dùng ```print()``` để xuất ra màn hình ```name``` vừa nhập nha.
```
print(name)
# Output: Mow
```
Hoặc
```
#Output: Your name is Mow

print("Your name is", name)
```
Bạn có thể dùng ```print()``` với một chuỗi trực tiếp mà không cần đến biến
```

Vậy nếu xuất một lúc nhiều biến thì sao?

Ví dụ bạn muốn xuất ra ```Mình tên là Mow, mình 13 tuổi```

Thì bạn sẽ làm như sau nhé:

Với ```name``` và ```age``` là hai biến lưu tên và tuổi.

Cách 1:

```print("Mình tên là", name, ", mình", age, " tuổi")```

Cách 2:

```print(f'Mình tên là {name}, mình {age} tuổi')```

Cách 3:

```print('Mình tên là {}, mình {} tuổi'.format(name,age))```

```print('Mình tên là {0}, mình {1} tuổi'.format(name,age))```

print("Alo alo! Mình là Mow đây. Nếu bạn học cùng với những người giỏi nhưng bạn không tiếp thu được gì, vậy sao bạn không thứ học cùng với một thằng ngu như mình thử :)")

#Output : Alo alo! Mình là Mow đây. Nếu bạn học cùng với những người giỏi nhưng bạn không tiếp thu được gì, vậy sao bạn không thứ học cùng với một thằng ngu như mình thử :)
```

Hmmm, Vậy là xong rồi đó. Tổng kết lại những gì bạn học được từ bài này heng:

1. Tạo biến, các quy tắc đặt tên biến.

2. Lấy dữ liệu được nhập từ bàn phím và lưu vào biến sau đó xuất giá trị ra màn hình bằng hàm ```print()```

Học gì mà không có bài tập:

Bài tập nho nhỏ cho các bạn thực hành hoặc code kiểm thử các kiến thức vừa học đây nha


> Nhập vào chiều dài và chiều rộng của một hình chữ nhật. Xuất ra màn hình *Hình chữ nhật bạn vừa nhập có kích thước dài x rộng là ```long``` x ```width```*. Với ```long``` và ```width``` là hai biến được nhập từ bàn phím.

Code mẫu cho các bạn tham khảo nghen. Làm xong rồi hẵng xem code của Mow nha. Xem có sửa code của Mow được xịn hơn hay không nha.

```
print("Nhập vào chiều dài hình chữ nhật:")
long = input()
print("Nhập vào chiều rộng hình chữ nhật:")
width = input()
print('Hình chữ nhật bạn vừa nhập có kích thước dài x rộng là', long, 'x',  width)
```

Rồi, hôm đầu sơ sơ vậy thôi. Mình rất mong nhận được sự góp ý của các tiền bối cũng như các thắc mắc của các hậu bối ở phía dưới phần bình luận. Mình sẽ tiếp thu cũng như giải đáp tất tần tật để chúng ta cùng tốt hơn nha. Nếu bạn thấy bài viết này hữu ích hoặc chỉ đơn giản là ủng hộ Mow tiếp tục con đường Bloggggg thì hãy chia sẻ và flow Mow nha. Cảm ơn mọi người rất nhiều.