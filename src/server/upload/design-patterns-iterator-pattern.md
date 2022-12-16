Trong bài viết này, mình sẽ giới thiệu một loại design pattern trong nhóm Behavioral Design Pattern -> liên quan đến hành vi của các object.
Iterator pattern là mẫu thiết  kế rât thường được sử dụng trong môi trường lập trình Java và .NET.  Mẫu này được sử dụng để truy cập vào các phần tử của collection object một cách tuần tự mà không cần phải hiểu biết về nó.
# Thực hiện:
Chúng ta sẽ tạo ra một giao diện Iterator để thuật lại phương thức điều hướng và một giao diện Container để lấy lại trình lặp. Các lớp Concrete  thực hiện giao diện Container sẽ chịu trách nhiệm triển khai giao diện Iterator và sử dụng nó.
IteratorPatternDemo, lớp demo của chúng tôi sẽ sử dụng NamesRepository, một lớp concrete thực hiện để in một Name được lưu trữ như một collection trong NamesRepository.
![](https://images.viblo.asia/a192eb48-899d-4be9-b323-d2d14d743e3b.jpg)

## Step 1:
Tạo interfaces.
### Iterator.java
```
public interface Iterator {
   public boolean hasNext();
   public Object next();
}
```
## Container.java
```
public interface Container {
   public Iterator getIterator();
}
```
## Step 2:
Tạo lớp concrete triển khai giao diện Container. Lớp này có lớp NameIterator bên trong thực hiện giao diện Iterator.
### NameRepository.java
```
public class NameRepository implements Container {
   public String names[] = {"Robert" , "John" ,"Julie" , "Lora"};

   @Override
   public Iterator getIterator() {
      return new NameIterator();
   }

   private class NameIterator implements Iterator {

      int index;

      @Override
      public boolean hasNext() {
      
         if(index < names.length){
            return true;
         }
         return false;
      }

      @Override
      public Object next() {
      
         if(this.hasNext()){
            return names[index++];
         }
         return null;
      }		
   }
}
```
## Step 3:
Sử dụng NameRepository để nhận các Name  lặp và in.
```
public class IteratorPatternDemo {
	
   public static void main(String[] args) {
      NameRepository namesRepository = new NameRepository();

      for(Iterator iter = namesRepository.getIterator(); iter.hasNext();){
         String name = (String)iter.next();
         System.out.println("Name : " + name);
      } 	
   }
}
```
## Step 4:
### Kết quả:
```
Name : Robert
Name : John
Name : Julie
Name : Lora
```
Với Iterator pattern, ta có thể duyệt một tập hợp theo những cách thức và tiêu chí khác nhau mà không cần mở rộng tập hợp đó.
Iterator pattern cũng cung cấp giao diện chung cho việc duyệt các cấu trúc tập hợp.