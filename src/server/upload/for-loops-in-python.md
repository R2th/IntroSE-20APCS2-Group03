> Chúng mình cùng nhau đi qua một số ví dụ về vòng lặp for trong python để cùng hiểu hơn về nó nhé:
> <br>Note: Các ví dụ là các phần mình tìm, đọc, hiểu và tổng hợp lại nhé!

* Ví dụ 1: 
```
a = ["banana" , "apple" , "cherry"]
for i in a: 
    print(i)
```
output: 
```
banana
apple
cherry
```
hoặc có thể sử dụng với len() như sau đều cho output giống nhau:
```
a = ["banana" , "apple" , "cherry"]
for i in range(len(a)): 
    print(a[i])
```
* Ví dụ 2: Với String
```
mystring = "Hello World"
for letter in mystring:
    print(letter)
```
output: 
```
H
e
l
l
o
 
W
o
r
l
d
```
hoặc có thể ko cần dùng biến, dùng trực tiếp như sau: 
```
for abcxyz in "Hello World":
    print("Aug")
```
output:
```
Aug
Aug
Aug
Aug
Aug
Aug
Aug
Aug
Aug
Aug
Aug
```
* Ví dụ 3: 
```
b = [30, 20, 10]
total = 0 
for i in b:
    total += i # total += i tương đương với total = total + i
print (total)
```
print ở đây chỉ in ra giá trị total cuối cùng. Bạn có thể cho print vào trong vòng for để xem lần lượt từng giá trị. 
* Ví dụ 4: Dùng với range
```
total = 0
for i in range(1, 5):
    total += i
print(total)
```
output:
```
10
```
Tương tự, có thể để print ở trong vòng for để xem output chạy ra
```
total = 0
for i in range(1, 5): # range (1, 5) # 1, 2, 3, 4
    total += i
	print(total)
```
output: 
```
1
3
6
10
```
* Ví dụ 5: Có sử dụng if bên trong for
```
total = 0
for i in range(1, 10): 
    if i % 3 == 0:     # a % b có nghĩa là a chia b lấy số dư
        total += i     #tương đương với total = total + i
        print(i)
        print(total)
```
output: 
```
3
3
6
9
9
18
```
* Ví dụ 6: Có sử dụng if elif bên trong for
```
total = 0
for i in range (1,20):
    if i % 3 == 0:
        total += i
    elif i % 5 == 0:
        total += i
print (total)
```
sẽ cho kết quả bằng với: 
```
total = 0
for i in range (1,20):
    if i % 3 == 0 or i % 5 == 0:
        total += i
print (total)
```
* Ví dụ 7: Sử dụng vòng lặp for lồng nhau
```
a = ["banana" , "apple" , "cherry"]
for i in range(len(a)): # len(a) = 3 -> range(len(a)) = range(0, 3) # 0, 1, 2
    for j in range(i+1):
        # i = 0 -> j = 0
        # i = 1 -> j = 0, 1
        # i = 2 -> j = 0, 1, 2
        print(a[i])
```
output: 
```
banana
apple
apple
cherry
cherry
cherry
```
Ngoài ra mình tìm hiểu thì thấy for dùng được tương tự cho tup và dic. Tuy nhiên hai phần này mình cần tìm hiểu thêm. Mình sẽ update sau khi đã clear nhé!