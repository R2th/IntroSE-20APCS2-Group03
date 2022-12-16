### Phần 3: Xử lý text bằng filter trong Linux

### 1.1.  Lệnh combine file

**CAT**

Giả sử ta có 2 file text chứa nội dung và giờ ta muống gộp nội dung 2 files vào chung 1 file. Ta sẽ làm điều đó với lệnh **cat** ( concatenate)

> file1.txt
> 
> text from file1

> file2.txt 
> 
> text from file2
```
$ cat file1.txt file2.txt > file3.txt
```

> file3.txt
> 
> text from file1
> 
> text from file2
>

Ta còn có thể dùng cat như một lệnh để đọc file có nội dung vừa phải như sau:

`$ cat file3.txt`

Lệnh tac tương tự với lệnh cat nhưng hiển thị ngược lại về trình tự nội dung file. Ví dụ:

`$ cat file3.txt`

> file3.txt
> 
> text from file2
> 
> text from file1
>

Tuy nhiên với các file chứa nhiều nội dung thì ta nên dùng lệnh **more** hoặc **less** để xem. Lệnh cat có nhiều option khác nhau đễ hỗ trợ ta thay đổi đôi chút text file khi tiến hành nối file:

* Nếu ta muốn xem dòng kết thúc ở đâu ta sử dụng option **-E** (end), hệ thống sẽ thêm ký hiệu **$** vào mỗi cuối dòng.

![](https://images.viblo.asia/85617c13-1ad1-4986-80b8-6bdb211e0d7e.JPG)

* Đánh số mỗi dòng với option **-n** (number line), option **-b** (nonblank) cũng có chức năng tương tự những dòng trống sẽ không được đánh dấu.

![](https://images.viblo.asia/7046c996-5710-41b5-90ee-3f2004ec44ce.PNG)

* Gộp nhiều dòng trống lại thành 1 dòng trống duy nhất với option **-s**

![](https://images.viblo.asia/f989888e-f085-4814-beab-c584935e1bde.PNG)

>** list1.txt**
> 
> Andy     1992
> 
> Bob       1995
> 
> Jane       1998


>** list2.txt**
> 
> Andy     fireman
> 
> Bob       cop
> 
> Jane       student


**JOIN**

Lệnh **cat** giúp ta nối file theo vertival (hàng dọc), lệnh **join** thì ngược lại giúp ta nối file theo horizon (hàng ngang)

`$  join list1.txt list2.txt`

![](https://images.viblo.asia/ebb65f7c-4532-4b7b-8d6d-0a3c9f6ad396.PNG)

Mặc định **join** dùng field đầu tiên làm key để ghép 2 file lại với nhau.

**PASTE**

Lệnh **paste** dùng để nối dòng với dòng, cách nhau bởi TAB, và không gộp chung key như **join**.

`$ paste list1.txt list2.txt`

![](https://images.viblo.asia/e1a45a6e-aaf7-4c88-bbeb-adc13d2529f1.PNG)


-----


### 1.2. Lệnh transform file

Transforming file không nhắm đến thay đổi nội dung file mà thay đổi nội dung được xuất ra stdout để pipe đến 1 program khác.

**SORT**

`$ sort -k 2 list2.txt`

![](https://images.viblo.asia/daf88ceb-7ad7-4125-b435-ff95a815dd4f.PNG)

Sort hỗ trợ ta loại bỏ các text trùng lặp (duplicate) với optiopn **uniq**:

![](https://images.viblo.asia/53353a6a-131d-4d75-9630-cccd8758a619.JPG)



-----


### 1.3. Lệnh format file

Giả sử ta muống định dạng file name profie được đánh số mỗi dòng và có dấu cách ở mỗi dòng, ta làm như sau:

`$ cat -n /etc/profile | pr -d` 

![](https://images.viblo.asia/99f2684f-7fad-4889-b7e0-cf44b6bcd2f3.JPG)



-----


### 1.4. Lệnh view file

**HEAD**

Xem nhanh 5 dòng đầu tiên với lệnh **head**:

$ cat /etc/profile | head -n 5 > file1.txt

![](https://images.viblo.asia/f5e0e8d8-ba87-4774-be76-c904b926ad6c.JPG)

**TAIL**

Xem nhanh 5 dòng cuối với lệnh **tail**:

$ cat /etc/profile | tail -n 5 > file1.txt

Xem nội dung file với lệnh less, lệnh less thực chất được cải tiến từ lệnh more, các developer đùa rằng less is more.

`$ less /etc/securetty`

Các phím thao tác trong khi mở file với less:

* SPACE BAR: để qua một trang khác

* ESC + V: để lùi lại một trang

* /<keyword> : để tìm kiếm theo từ khóa (case sensitive), nhấn n để di chuyển con trỏ đến kết quả tìm kiếm tiếp theo.
     
* g<line number>: để đi đến dòng mình muốn.
     
* q: để thoát khoải chương trình



-----


### 1.5. Lệnh sumarize file

**CUT**    
    
Trích xuất đoạn text mong muống với lệnh **cut**. Ví dụ ta muốn trích xuất mac address của card mạng eth0 như trong hình sau:
    
![](https://images.viblo.asia/804c9c3a-b7b2-438a-833c-a9b05b7ef142.JPG)
    
Ta sẽ sử dụng câu lệnh sau:
    
![](https://images.viblo.asia/7fc7a703-3504-4ed8-b758-cd35ce3be3ea.JPG)

Ở đây ta giới hạn dòng mong muốn với lệnh **grep** kèm keyword, sau đó dùng lệnh **cut** với option **-d " "** để hệ thống nhận biết các từ phân cách với nhau bởi khoảng trắng và **-f** để chỉ field mà ta mong muốn cut ra từ đó (nằm ở dấu khoảng trắng thứ 11 từ trái sang phải).

**WC**   

Đếm số dòng, số từ, số byte của 1 file với lệnh **wc** (word count):
    
  ![](https://images.viblo.asia/ad162e6d-4fc9-4b6b-a301-bdf61aba50da.JPG)
    
* số dòng: 400
  
* số từ 606
    
* số byte: 4038 bytes

Vậy là chúng ta lại kết thúc một phần nữa, các bạn hãy thực hành trên terminal để hiểu và nhớ nhé. Nếu có thắc mắc gì hãy comment dưới post của mình nhé. Chúc các bạn thành công.