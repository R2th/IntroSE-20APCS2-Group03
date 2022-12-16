# Hôm nay rảnh rỗi.
Một hôm rảnh rỗi mình dạo các web chơi vô tình thấy một bài viết về thử thách xuất 1000k chuỗi "I love programming" khá thú vị nên mình viết lên đây chia sẽ.
# Ngôn ngữ thực hiện 
Mình nghĩ ngôn ngữ nào cũng được miễn có hàm hiển thị ra console --> haha

Lưu ý: Tùy ngôn ngữ thực hiện thì sẽ có nhiều cách rất hay và cực đơn giản.
***Ở đây mình chọn java để thể hiện code ha***
## Cách thứ nhất
```
public class Names {
 
    public void p1000() { p300(); p300(); p300(); p100(); }
    public void p300()  { p100(); p100(); p100();         }
    public void p100()  { p30();  p30();  p30();  p10();  }
    public void p30()   { p10();  p10();  p10();          }
    public void p10()   { p3();   p3();   p3();   p1();   }
    public void p3()    { p1();   p1();   p1();           }
    public void p1()    { System.out.println("I love programming"); }
    
    public static void main(String [] args) {
		new Names().p1000();
    }
    
}
```

## Cách thứ 2
```
public class Names {
    public static void main(String [] args) {
		String s1    = "I love programming\n";
		String s3    = s1   +   s1 +   s1;
		String s10   = s3   +   s3 +   s3  + s1;
		String s30   = s10  +  s10 +  s10;
		String s100  = s30  +  s30 +  s30  + s10;
		String s300  = s100 + s100 + s100;
		String s1000 = s300 + s300 + s300  + s100;
		System.out.print(s1000);
    }   
}
```
## Cách 3 Khá ngắn gọn
```
public static void main(String[] args) {
	System.out.print(String.format("%01000d",0).replace("0","I love programming\n"));
}
```

## Cách 4
Cách này dùng đệ quy --> các bạn chắc sẽ viết được đúng không?

## cách 5 dùng Timer và TimerTask trong Java
# Mình nghĩ còn nhiều các nữa các bạn góp vui