## Điều hướng cơ bản (Lên xuống trái phải)

Trong Vim, sử dụng 4 phím tắt sau để điều hướng

> **h** di chuyển qua trái ⇦
> 
> **l** di chuyển qua phải ⇨ (L đấy :D)
> 
> **j** di chuyển lên trên ⇧ 
> 
> **k** di chuyển xuống dưới ⇩

<br>

**1. Lý do tại sao Vim sử dụng 4 phím tắt này bởi vì:**

Nó giúp bạn tiết kiệm thời gian di chuyển tay của mình để làm việc hiệu quả và đánh máy nhanh hơn.

**2. Luyện tập thật nhiều để nó trở thành thói quen khi gõ phím nhé:**

Có một số cách mà chúng ta có thể luyện tập mà không hề căng thẳng nha!

a. Chơi game ở đây nè: https://vim-adventures.com/

b. Download extension cho browser: [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb) vì hầu hết thời gian bạn dùng web mà ^^

c. Dùng terminal, gõ **vi** hoặc **vim** và code dự án của bạn ^^

## Điều hướng dựa vào đối tượng text
**1. Di chuyển chỉ cách một từ**

Chữ thường:

> **w** di chuyển về phía trước và con trỏ sẽ đứng tại **nơi bắt đầu của từ hiện tại**
>
> **e** di chuyển về phía trước và con trỏ sẽ đứng tại **nơi kết thúc của từ hiện tại**
> 
> **b** di chuyển về phía sau và con trỏ sẽ đứng tại **nơi bắt đầu của từ hiện tại**
>
> **ge** di chuyển về phía sau và con trỏ sẽ đứng tại **nơi kết thúc của từ hiện tại**

Chữ hoa:

> **W** di chuyển về phía trước và con trỏ sẽ đứng tại **nơi bắt đầu của TỪ hiện tại**
>
> **E** di chuyển về phía trước và con trỏ sẽ đứng tại **nơi kết thúc của TỪ hiện tại**
> 
> **B** di chuyển về phía sau và con trỏ sẽ đứng tại **nơi bắt đầu của TỪ hiện tại**
>
> **gE** di chuyển về phía sau và con trỏ sẽ đứng tại **nơi kết thúc của TỪ hiện tại**

Sự khác biệt lớn nhất ở đây là: **từ** thì bao gồm kí tự như **<, >, “, ‘, …** trong khi **TỪ** thì không.

**2. Di chuyển cách nhiều từ**

Ta chỉ cần add number trước method ở trên. 

> **2w**, **5e**, **5b**, **10ge**, ...
> 
> **2w** di chuyển về phía trước 2 từ 
> 
> **5b** di chuyển về phía sau 5 từ

## Điều hướng dựa vào nội dung
Khi bạn mở file và đọc nó. Đôi khi, bạn không cần toàn bộ file mà chỉ cần một phần của file này.

Có thể là phần đầu của tệp hoặc phần cuối, v.v.…

Với vim, bạn có thể dễ dàng di chuyển đến bất kỳ đâu trong tệp.

* **Di chuyển đến phần đầu hoặc phần cuối của tệp**
> **gg** di chuyển đến đầu file
> 
> **G** di chuyển đến cuối file

* **Moving in the watching view**
> L di chuyển tới cuối cùng của view hiện tại
H di chuyển tới đầu view hiện tại 
M di chuyển tới giữa view hiện tại

## Điều hướng dựa vào nội dung

Bạn có thể di chuyển đến một số vị trí đặc biệt từ vị trí hiện tại của con trỏ như cuối / đầu dòng, v.v.

* **Di chuyển dòng tiếp sau**
> **$** Di chuyển đến ký tự cuối của dòng 
> ** ^** Di chuyển đến ký tự bắt đầu (không bao gồm ký tự không trống) của dòng 
> **0** Di chuyển đến ký tự đầu tiên (bao gồm cả ký tự không trống) của dòng

**Cơ bản**

* **Di chuyển đoạn tiếp sau**
> **(** Di Chuyển sang câu trước 
> **)** Di Chuyển sang câu sau
> **{** Di chuyển sang đoạn trước
> **}** Di Chuyển sang đoạn sau

**Nâng cao**
> **n + (** Di chuyển sang n câu trước 
> **n + )** Di chuyển sang n câu sau  
>  **n + {** Di chuyển sang n đoạn trước 
> **n + }** Di chuyển sang n đoạn sau 

## Scrolling
Bạn có thể dùng chuột để scroll, nhưng nếu bạn xác định dùng Vim để code nhanh hơn, thì nên nắm lọt lòng các phím sau đây:

* Cuộn mà không di chuyển con trỏ 

**CTRL-Y** Cuộn lên

**CTRL-E** Cuộn xuống

* Di chuyển con trỏ di chuyển

**CTRL-Y** Cuộn lên

**CTRL-E** Cuộn xuống

Cảm ơn các bạn đã đọc. Hẹn gặp lại ở các bài viết sau.