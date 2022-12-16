Đối với những chương trình đa luồng (multi-threads) thường  gặp những trường hợp khi nhiều luồng cùng muốn truy cập vào 1 dữ liệu nên có thể gây ra các lỗi hoặc các kết quả không đúng mong muốn. Java cung cấp cơ chế để đồng bộ dữ liệu giữa các luồng bằng các khối đồng bộ (synchronied block). Các synchronized block này giúp trong một thời điểm chỉ có 1 luồng thao tác với dữ liệu. Trong java thì các synchronied block này đồng bộ trên đối tượng và trên class, có nghĩa là các luồng đồng bộ tại 1 thời điểm sẽ chỉ có duy nhất 1 luồng được thao tác với đối tượng hoặc class này. Các luồng đồng bộ khác phải chờ khi luồng đang thao tác thực hiện xong.
Có 2 kiểu đồng bộ và bất đồng bộ là trên thực thể (instance) và trên lớp (class) . Hoặc chia theo cú pháp theo block và theo hàm.

# I. Synchronized trên đối tượng (Object)
### Cú pháp theo block
```
public void process(){
    synchronized (this){
        //code
    }
    
    synchronized (object_reference){
        //code
    }
}
```
 Trong dấu ngoặc khép của khối block đồng bộ có thể là this nghĩa là đồng bộ chính đối tượng của hàm đó. Hoặc là một tham chiếu đến một đối tượng nào đó nhưng tham chiếu đó phải là final để tham chiếu đó không được trỏ sang đối tượng khác gây đồng bộ trên đối tượng không mong muốn.
 
### Cú pháp theo hàm
```
public synchronized void process(){
    //code
}
```
Hàm này là hàm đồng bộ, các hàm đồng bộ khác thao tác trên đối tượng này sẽ phải chờ hàm này thực hiện xong. Ngược lại hàm này cần chờ các tiến trình đồng bộ khác trên đối tượng thực hiện xong.

# II. Synchronized trên class
### Cú pháp theo block
```
public static void process(){
    synchronized (Demo.class){
        //code
    }
```


### Cú pháp theo hàm
```
public static synchronized void process(){
    //code
}
```
Việc đồng bộ trên class có quy luật giống với trên đối tượng.

> Lưu ý: các luồng gắn động bộ sẽ block nhau lẫn nhau. Các luồng có gắn đồng bộ sẽ chơi với nhau nên khi các luồng đồng bộ đang thao tác với 1 đối tượng thì 1 luồng khác không có gắn đồng bộ vẫn có thể nhảy vào được.
>