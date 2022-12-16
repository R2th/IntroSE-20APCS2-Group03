# Giới thiệu
Trong hệ cơ sở dữ liệu, chúng ta có thể sử dụng nhiều câu lệnh điều kiện cũng như vòng lặp. Trong bài viết này chúng ta sẽ tìm hiểu về cách sử dụng vòng lặp cũng như các loại vòng lặp có trong postgres 

# Loop là gì

Trong một số trường hợp, chúng ta thường phải đối mặt với tình huống phải thực hiện một hoạt động cụ thể nhiều lần theo kiểu lặp đi lặp lại. Loop là hành động  chúng ta muốn thực hiện lặp đi lặp lại các tác vụ nào đó với một số lần cụ thể hoặc cho đến khi yêu cầu của chúng ta được đáp ứng

# Các loại vòng lặp trong PostgresSql

Chúng ta có thể sử dụng vòng lặp đơn giản với câu lệnh EXIT WHEN để dừng vòng lặp. Một kiểu lặp khác là loop và while.
## Ví dụ với vòng lặp FOR LOOP
### Cú pháp
```
FOR [counting variable name] IN [REVERSE] [START VALUE] .. [END VALUE] [BY step value] LOOP
[code/statements to repeat];
END LOOP;
```

### Giải thích

Vòng lặp FOR trong Postgres bắt đầu bằng từ khoá FOR , counting variable name dùng để chỉ định biến đếm trong vòng lăp. Biến đếm này phụ thuộc vào START VALUE và END VALUE mà nó sẽ lặp. Từ khoá LOOP để xác định phần chức các code, biểu thức mong muốn lặp lại
Phần BY step value xác định số value sẽ bị bỏ qua trong quá trình loop từ giá trị bắt đầu đến giá trị kết thúc

# Ví dụ
## Ví dụ 1
Dưới dây là ví dụ đơn giản để in ra 1 bảng chứa giá trị tương đương với trị số lần lặp
```
CREATE OR REPLACE FUNCTION displayTable(int) RETURNS void AS $$
DECLARE
tableOf int:=$1;
BEGIN
FOR counter IN 1..10
LOOP
RAISE NOTICE '%', tableOf*counter;
END LOOP;
END;
$$ LANGUAGE plpgsql;
```

Đoạn code trên sẽ tạo ra 1 function, trong function đó sẽ thực hiện lặp từ 1 đến 10 . Giá trị int sẽ được nhập vào khi được gọi function.
Sau khi chạy đoạn code trên sẽ như sau
![ảnh.png](https://images.viblo.asia/1ef406de-42ef-4131-b3e6-c01807a3b0b9.png)

Function có tên displayTable được tạo. Sau khi tạo nếu muốn gọi lại function này và truyền giá trị 5 vào sẽ thực hiện như sau. Kết quả
![ảnh.png](https://images.viblo.asia/7cc01d1f-bce8-4fb9-a622-fa2588cc2384.png)

Hàm này thực hiện khá đơn giản. Mỗi lần loop sẽ lấy giá trị truyền vào x với giá trị đang chạy. Ví dụ 5x1, 5x2 ....

## Ví dụ 2
Một ví dụ khác dùng loop trong postgres và in theo chiều đảo ngược tuỳ theo số lần muốn lặp

```
CREATE OR REPLACE FUNCTION reverseExample(int) RETURNS void AS $$
DECLARE
passedValue int:=$1;
BEGIN
FOR sampleCounter IN REVERSE passedValue..1
LOOP
RAISE NOTICE 'My Current Value is = %', sampleCounter;
END LOOP;
END;
$$ LANGUAGE plpgsql;
```

Khi chạy xong đoạn code trên sẽ tạo 1 function tên là reverseExample.
![ảnh.png](https://images.viblo.asia/9ded09e8-214a-4248-962a-a3d6a08745e9.png)

Nếu muốn thực hiện đoạn code trên và in đảo ngược chỉ cần thực hiện
```
select reverseExample(12);
```

**Output**:

![ảnh.png](https://images.viblo.asia/37e8c5dd-7db6-4e02-b372-0270fdacd64a.png)

## Ví dụ 3

Có thể sử dụng vòng lặp trong postgres lặp với điều kiện cho trước. Ví dụ dưới thực hiện loop trong một giới hạn start và end và lấy ra các số chẵn

```
CREATE OR REPLACE FUNCTION displayEvenNumbers(int,int) RETURNS void AS $$
DECLARE
first int;
last int:=$2;
BEGIN
IF $1%2=0
THEN first=$1;
ELSE first=$1+1;
END IF;
FOR sampleCounter IN first..last BY 2
LOOP
RAISE NOTICE 'Even numbers : %', sampleCounter;
END LOOP;
END;
$$ LANGUAGE plpgsql;
```

**Output**

![ảnh.png](https://images.viblo.asia/6e72c83c-7825-42cb-b2dc-295c8b5bb65d.png)

Sau khi thực hiện tạo xong, nếu muốn lặp trong một khoảng và lấy ra các số chẵn in ra màn hình. Chỉ cần truyền 2 số start và end.

`select displayevennumbers(11,30);`

Khi thực hiện xong vòng lặp sẽ in ra các số chẵn trong khoảng 11 đến 30

**Ouput**

![ảnh.png](https://images.viblo.asia/13ab6ec7-35a1-46ef-a793-84c4b4581151.png)

Hy vọng qua bài viết trên sẽ giúp các bạn biết hơn về loop trong postgres. Hẹn gặp lại các bạn trong các bài viết kế tiếp