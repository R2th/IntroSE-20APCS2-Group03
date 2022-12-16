FileInputStream là một class rất hữu ích để đọc dữ liệu từ một tệp dưới dạng chuỗi byte. FileInputStream được tạo ra nhằm mục đích cho phép người dùng đọc các byte stream thô (vd: dữ liệu hình ảnh). Nếu bạn chỉ cần đọc string thì nên sử dụng FileReader.

**Các constructors:**
* FileInputStream (File file): Tạo một input stream để đọc từ object File đã chỉ định.
* FileInputStream (FileDescriptor fd): Tạo một input stream để đọc từ object FileDescriptor đã chỉ định.
* FileInputStream (String name): Tạo một input stream để đọc từ một file có tên được chỉ định.

**Các phương thức thường dùng:**


* int read (): Đọc một byte dữ liệu từ input stream này.
    Cú pháp: public int read ()
         throws IOException
         
    Trả về: byte dữ liệu tiếp theo hoặc -1 nếu iterator đã chạy đến cuối tệp.

    Throws:
    IOException


* int read (byte[] b): Đọc tối đa b.length byte dữ liệu từ input stream này thành một mảng byte.

    Cú pháp: public int read (byte [] b)
         throws IOException
         
    Tham số:

    b - bộ đệm mà dữ liệu sẽ được đẩy vào.

    Trả về: tổng số byte được đọc vào bộ đệm hoặc -1.

    Throws:
    IOException


* int read (byte [] b, int off, int len): Đọc tối đa len byte dữ liệu từ input stream này thành một mảng byte.
    Cú pháp: public int read(byte[] b, int off, int len)
         throws IOException

    Tham số:

    b - bộ đệm mà dữ liệu được đọc.

    off - phần bù bắt đầu trong mảng đích b

    len - số byte tối đa sẽ được đọc.

    Trả về: tổng số byte được đọc vào bộ đệm hoặc -1


    Throws: 

    NullPointerException

    IndexOutOfBoundsException



* long Skip (long n): Bỏ qua và loại bỏ n byte dữ liệu khỏi input stream.

    Cú pháp: public long skip(long n)
          throws IOException
          

    Tham số:

    n - số lượng byte được bỏ qua.

    Trả về: số byte thực tế bị bỏ qua.

    Throws:

    IOException



* int Available (): Trả về ước tính số lượng byte còn lại có thể đọc (hoặc bỏ qua) từ input stream này.

    Cú pháp: public int available()
              throws IOException

    Trả về: ước tính số lượng byte còn lại có thể đọc được

    Throws:

    IOException


* void close (): Đóng input stream tệp này và giải phóng mọi tài nguyên hệ thống được liên kết với input stream.

    Cú pháp: public void close ()
           throws IOException

    Được định nghĩa trong giao diện AutoClosizable

    Ghi đè phương thức close() trong class InputStream

    Throws:

    IOException



* FileDescriptor getFD (): Trả về đối tượng FileDescriptor đại diện cho kết nối đến tệp thực tế trong hệ thống tệp đang được FileInputStream này sử dụng.
    Cú pháp: public final FileDescriptor getFD()
                           throws IOException

    Trả về: đối tượng FileDescriptor được liên kết với input stream này.

    Throws: IOException



* FileChannel getChannel (): Trả về đối tượng FileChannel đặc hữu được liên kết với input stream của tệp này.

    Cú pháp: public FileChannel getChannel()

    Trả về: file channel được liên kết với input stream của tệp này



* void finalize() : Đảm bảo rằng phương thức close() của input stream của tệp này được gọi khi không có thêm tham chiếu nào đến nó.

    Cú pháp: protected void finalize()
                 throws IOException

    Override phương thức finalize() trong lớp Object

    Throws: IOException



**Các bước để đọc dữ liệu từ một tệp bằng FileInputStream**

Đầu tiên, đưa tệp vào FileInputStream như dưới đây:

FileInputStream fileInputStream = new FileInputStream (File file)

Bằng cách này chúng ta sẽ đọc dữ liệu từ tập tin. Sau đó, để đọc dữ liệu từ tệp, chúng ta nên đọc dữ liệu từ FileInputStream dưới dạng;

ch = fileInputStream.read ();

Khi không còn dữ liệu để đọc thêm, phương thức read () trả về -1;

Để hiển thị dữ liệu, chúng ta có thể sử dụng System.out.print.

System.out.print (ch);

**Code mẫu:**
```
import java.io.*; 
//Java program demonstrating FileInputStream 
class ReadFile 
{ 
	public static void main(String args[]) throws IOException 
	{ 

		//attach the file to FileInputStream 
		FileInputStream fin= new FileInputStream("file1.txt"); 

		//illustrating getChannel() method 
		System.out.println(fin.getChannel()); 

		//illustrating getFD() method 
		System.out.println(fin.getFD()); 

		//illustrating available method 
		System.out.println("Number of remaining bytes:"+fin.available()); 

		//illustrating skip method 
		/*Original File content: 
		* This is my first line 
		* This is my second line*/
		fin.skip(4); 
		System.out.println("FileContents :"); 
		//read characters from FileInputStream and write them 
		int ch; 
		while((ch=fin.read())!=-1) 
			System.out.print((char)ch); 
		
		//close the file 
		fin.close(); 
	} 
} 

```

Nguồn: [geeksforgeeks](https://www.geeksforgeeks.org/java-io-fileinputstream-class-java/)