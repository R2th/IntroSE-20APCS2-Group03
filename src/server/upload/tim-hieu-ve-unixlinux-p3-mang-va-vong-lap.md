Hôm nay chúng ta sẽ cùng  tim hiểu về array và vòng lặp trong shell script nhé. Khái niệm về array chắc cũng không xa lạ với anh em coder nữa nên chúng ta sẽ bỏ qua nha.


# Định nghĩa các giá trị trong array
## 1. Định nghĩa gián tiếp
 Định nghĩa gián tiếp là việc bạn sẽ gán từng giá trị tới từng index của mảng, ví dụ:
 
 ```
 ARRAYNAME[INDEX]=value
 ```
 
 ```
 FRUIT[0]='APPLE'
 FRUIT[1]='ORANGE'
 FRUIT[2]='BANANA'
 ```
 
 ## 2. Định nghĩa hỗn hợp
 Với kiểu này thì chúng ta có thể khai báo array với hàng loạt các giá trị, chúng ta cũng có thể thêm giá trị vào sau nếu muốn
 
 ```
 ARRAYNAME=(VALUE1 VALUE2 VALUE3)
 ```
 ```
 CAR=(TOYOTA VOLVO VINFAST)
 ```
 
 hoặc
 
 ```
 CAR=([0]=TOYOTA [1]=VOLVO [2]=VINFAST)
 ```
 
 # Truy cập các giá trị
 ## 1. Lấy tất cả các giá trị
Để in ra tất cả các giá trị trong array, chúng ta sử dụng:
 ```
echo ${ARRAYNAME[@]}        
echo ${ARRAYNAME[*]}
 ```
 
 
 ```
CAR=([0]=TOYOTA [1]=VOLVO [2]=VINFAST)
echo ${CAR[@]}        
echo ${CAR[*]}    
 ```
 
 Kết quả:
 ```
 TOYOTA VOLVO VINFAST
TOYOTA VOLVO VINFAST
```

## 2. Lấy giá trị đầu tiên
  ```
echo ${ARRAYNAME}        
 ```
 
  ```
CAR=([0]=TOYOTA [1]=VOLVO [2]=VINFAST)
echo ${CAR}
echo ${CAR[0]}
 ```
 
 Kết quả:
 ```
 TOYOTA
TOYOTA
```

## 3. Lấy giá trị cụ thể
```
echo ${ARRAYNAME[INDEX]}
```

```
echo ${CAR[2]}
```

Kết quả:
```
VINFAST
```


## 4. Lấy giá trị theo index của string

```
echo ${ARRAYNAME[WHICH_ELEMENT]:STARTING_INDEX:COUNT_ELEMENT}
```
 
 
 ```
 STRING=('THIS IS A LONG STRING')
echo ${STRING[0]:8:13}
```

Kết quả:
```
A LONG STRING
```

## 5. Độ dài giá trị cụ thể
```
echo ${#ARRAYNAME[INDEX]}
```

```
CAR=(TOYOTA VOLVO VINFAST)
echo ${#CAR} // tương đương ${#CAR[0]}
echo ${#CAR[1]}
```

Kết quả:
```
6
5
```

## 6. Độ dài mảng
```
CAR=(TOYOTA VOLVO VINFAST)
echo ${#CAR[@]}
echo ${#CAR[*]}
```

Kết quả:
```
3
3
```

# Vòng lặp
Có array thì đương nhiên sẽ có vòng lặp phải không nào :D. À còn một điều nữa về những toán tử trong shell, mình quên mất chưa viết bài này nên các bạn có thể tham khảo tạm một bài khác nhé ([link](https://www.tutorialspoint.com/unix/unix-basic-operators.htm))

Trong shell thì có 4 loại vòng lặp: while, for, until, select. Cụ thể như sau 

## While

Cú pháp cũng của vòng lặp while cũng không khác gì trong những ngôn ngữ mà chúng ta hay sử dụng, khi nào mà điều kiện ở `while` còn thỏa mãn thì vòng lặp sẽ tiếp tục chạy

```
while command
do
 //something
done
```

Giờ chúng ta sẽ tạo 1 vòng lặp in ra các phần tử trong 1 mảng nhé

```
#!/bin/sh

arr=(3 6 8 9 20 22 30 49 50 9) 
i=0 

while [ $i -lt ${#arr[@]} ] 
do
    echo ${arr[$i]} 
    i=`expr $i + 1` 
done
```

Kết quả:
```
3
6
8
9
20
22
30
49
50
9
```

Ngoài ra bạn cũng có thể nhiều vòng lặp lồng nhau

```
#!/bin/sh

a=0
while [ $a -lt 10 ]    # this is loop1
do
   b=$a
   while [ $b -ge 0 ]  # this is loop2
   do
      echo -n "$b "
      b=`expr $b - 1`
   done
   echo
   a=`expr $a + 1`
done
```

Kết quả:
```
0 
1 0 
2 1 0 
3 2 1 0 
4 3 2 1 0 
5 4 3 2 1 0 
6 5 4 3 2 1 0 
7 6 5 4 3 2 1 0 
8 7 6 5 4 3 2 1 0 
9 8 7 6 5 4 3 2 1 0
```

## For
Đây là vòng lặp sẽ duyệt từng phần tử trong mảng

```
#!/bin/sh

arr=(3 6 8 9 20 22 30 49 50 9) 
for i in "${arr[@]}"
do
    echo $i 
done
```

Kết quả:
```
arr=(1 2 3 4 5) 
  
# loops iterate through a  
# set of values until the 
# list (arr) is exhausted 
for i in "${arr[@]}"
do
    # access each element  
    # as $i 
    echo $i 
done
```

## Until
Vòng lặp này thì sẽ thực hiện cho tới khi gặp 1 điều kiện. Ví dụ giờ mình muốn lấy những phần tử trong mảng có index < 5 thì sẽ để điều kiện là until index > 5

```
#!/bin/sh

arr=(3 6 8 10 20 22 30 49 50 9)
i=0

until [ $i -gt 5 ]
do
   echo ${arr[$i]}
   i=`expr $i + 1`
done
```

Kết quả:
```
#!/bin/sh

arr=(3 6 8 10 20 22 30 49 50 9)
i=0

until [ $i -gt 5 ]
do
   echo ${arr[$i]}
   i=`expr $i + 1`
done
```

## Select
Nôm na là bạn sẽ đưa cho người dụng chọn 1 option và bạn sẽ in ra kết quả của option đó. Hãy thử ví dụ dưới đây nhé
```
#!/bin/bash
PS3="Select number of the gift you want ==> "
echo "Select what you want for Christmas eve"

select answer in "A cat" "A car" "A new Macbook M1" "A Girl Friend"
do
        case $answer in
                "A cat")
                        echo "Good choice. Get ready for your meow meow"
                        ;;
                "A car")
                        echo "Oke, i will buy you a toy"
                        ;;
                "A new Macbook M1")
                        echo "I'm not Bill Gate"
                        ;;
                "A Girl Friend")
                        echo "I'm not Cupid"
                        ;;
                *)
                        echo "Well, you need to enter something from the list!"
                        ;;
        esac
done
```

Kết quả:
```
Select what you want for Christmas eve
1) A cat	     3) A new Macbook M1
2) A car	     4) A Girl Friend
Select number of the gift you want ==> 4
I'm not Cupid
```

Bài tham khảo: 
* https://www.tecmint.com/working-with-arrays-in-linux-shell-scripting/
* https://vietjack.com/unix/vong_lap_trong_unix_linux.jsp