# 1. Đề bài
Có một người đàn ông đi du lịch . Ông ta đi được n bước , có thể ông ta đi qua những ngọn núi , đi qua những thung lũng cực sâu . Hỏi sau n bước người đàn ông đó đi qua bao nhiêu thung lũng.

Cho một chuỗi kí tự gồm có hai kí tự : 'U' (Up) và 'D' (Down).

Sample Input:
```
8
UDDDUDUU
```

Sample Output:
```
1
```

 Miêu tả đề bằng hình ảnh:
 ```
_/\      _
   \    /
    \/\/
```
Đây là quãng đường người đàn ông đi được . đâu tiên ông có một bước lên núi , tiếp đến ông đi tiếp 3 bước xuống thung lũng và rồi đi lên và xuống tiếp đến ông trở lại mặt đất . Cuối cùng ông đã đi được một thung lũng.
# 2. Hướng giải.
Ở đây minh cho khi ở mặt đất là giá trị sẽ là 0 . Nếu người đàn ông đi lên một bước mình thì cộng 1 , nếu xống một bước thì sẽ trừ 1 . Cứ như vậy sẽ chạy hết chuỗi kí tự nếu thấy giá trị âm sau đó trở lại 0 thì mình sẽ đếm đó là một thung lũng. Như vây ta có độ phức tạp thuật toán là 0(n).
# 3.Code.
```
static int countingValleys(int n,String s)
{
    int walk = 0 , count = 0;

    for (int i = 0;i < s.length();i++)
    {
        if (s.charAt(i) == 'D')
        {
            walk--;
        }else
        {
            // neu tro lai mat dat
            if (walk == -1)
                count++;
            walk++;
        }
    }
    return count;
}
```