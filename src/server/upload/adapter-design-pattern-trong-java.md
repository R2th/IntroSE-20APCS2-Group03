### Giới thiệu
Trong bài viết này, mình sẽ giới thiệu về mẫu thiết kế adapter design pattern trong Java. Đây là một loại mẫu thiết kế cấu trúc (structural design patterns), cho phép 2 interfaces không liên quan, k có điểm chung làm việc cùng với nhau.<br>
Mô hình này rất dễ hiểu vì thế giới thực có đầy đủ các adapter cho ta dễ hình dung.  Ví dụ, hãy xem xét một bộ chuyển đổi USB sang Ethernet.  Chúng ta cần điều này khi chúng ta có interface Ethernet ở một đầu và đầu kia là USB.  Vì chúng không tương thích với nhau.  chúng ta sử dụng một bộ chuyển đổi để chuyển đổi cái này sang cái khác.  Ví dụ này khá giống với adapter hướng đối tượng.  Trong thiết kế, các bộ điều hợp được sử dụng khi chúng ta có một lớp (Client) mong đợi một số loại đối tượng và chúng ta có một đối tượng (Adaptee) cung cấp các tính năng tương tự nhưng để lộ một giao diện khác.<br>
### Sử dụng adapter:
* Client đưa ra yêu cầu cho adapter bằng cách gọi một phương thức trên nó bằng giao diện đích.
* Adapter dịch yêu cầu đó trên adaptee bằng giao diện của adaptee.
* Client nhận được kết quả của cuộc gọi và không biết về sự hiện diện của adapter.<br>
The adapter pattern chuyển đổi giao diện của một lớp thành một giao diện khác mà client mong đợi, nó cho phép các lớp làm việc cùng nhau mà các giao diện đó không tương thích với nhau.<br>
Cùng xem qua diagram để có 1 cái nhìn tổng quan về cấu trúc của mẫu thiết kế này:
![](https://images.viblo.asia/fc3219e0-615e-4f7a-9657-390bc1d7438f.jpg)
Client chỉ nhìn thấy giao diện đích chứ không phải adapter. The adapter thực hiện giao diện đích.  Adapter ủy thác tất cả các yêu cầu cho Adaptee.<br>
### Ví dụ 1:
Giả sử bạn có một lớp `Bird` với các phương thức `fly()` và `makeSound()`.  Và cũng là một lớp `ToyDuck` với phương thức `squeak()`.  Hãy giả sử rằng bạn thiếu các đối tượng `ToyDuck` và bạn muốn sử dụng các đối tượng `Bird` ở vị trí của chúng.  `Bird` có một số chức năng tương tự nhưng thực hiện một giao diện khác, vì vậy chúng ta có thể sử dụng chúng trực tiếp.  Vì vậy, chúng ta sẽ sử dụng mô hình adapter.  Ở đây, client sẽ là `ToyDuck` và adaptee  sẽ là `Bird`.<br>
Dưới đây là source code của ví dụ:<br>
```
interface Bird 
{ 
    // birds implement Bird interface that allows 
    // them to fly and make sounds adaptee interface 
    public void fly(); 
    public void makeSound(); 
} 
```
```
class Sparrow implements Bird 
{ 
    // a concrete implementation of bird 
    public void fly() 
    { 
        System.out.println("Flying"); 
    } 
    public void makeSound() 
    { 
        System.out.println("Chirp Chirp"); 
    } 
} 
```
  
```
interface ToyDuck 
{ 
    // target interface 
    // toyducks dont fly they just make 
    // squeaking sound 
    public void squeak(); 
} 
```
  
```
class PlasticToyDuck implements ToyDuck 
{ 
    public void squeak() 
    { 
        System.out.println("Squeak"); 
    } 
} 
```
  
```
class BirdAdapter implements ToyDuck 
{ 
    // You need to implement the interface your 
    // client expects to use. 
    Bird bird; 
    public BirdAdapter(Bird bird) 
    { 
        // we need reference to the object we 
        // are adapting 
        this.bird = bird; 
    } 
  
    public void squeak() 
    { 
        // translate the methods appropriately 
        bird.makeSound(); 
    } 
} 
```
  
```
class Main { 
    public static void main(String args[]) 
    { 
        Sparrow sparrow = new Sparrow(); 
        ToyDuck toyDuck = new PlasticToyDuck(); 
  
        // Wrap a bird in a birdAdapter so that it  
        // behaves like toy duck 
        ToyDuck birdAdapter = new BirdAdapter(sparrow); 
  
        System.out.println("Sparrow..."); 
        sparrow.fly(); 
        sparrow.makeSound(); 
  
        System.out.println("ToyDuck..."); 
        toyDuck.squeak(); 
  
        // toy duck behaving like a bird  
        System.out.println("BirdAdapter..."); 
        birdAdapter.squeak(); 
    } 
} 
```
Và đây là output của ví dụ:
```
Sparrow...
Flying
Chirp Chirp
ToyDuck...
Squeak
BirdAdapter...
Chirp Chirp
```
Giải thích: Ở đây chúng ta đã tạo ra một lớp `BirdAdapter` implement inteface `ToyDuck`  để chuyển đổi phương thức `makeSound()` của `Bird` thành phương thức `squeak()` của `ToyDuck`. Bằng cách này, ta vẫn có thể gọi được phương thức `squeak()` của các đối tượng `Bird` thông qua `BirdAdapter`<br>
**Before**: `ToyDuck toyDuck = new PlasticToyDuck();`<br>
**After**: `ToyDuck toyDuck = new BirdAdapter(sparrow);`<br>
Bạn có thể thấy rằng bằng cách thay đổi chỉ một dòng, toyDuck giờ có thể thực hiện Chirp Chirp !!<br>
### Ví dụ 2
Ví dụ 1 bên trên là một ví dụ đơn giản để chúng ta có thể dễ hình dung về cách adapter nắm giữ một adaptee để thực hiện chuyển đổi và giao tiếp. Bây giờ cùng đến với ví dụ phức tạp hơn một chút:<br>
Chúng ta có interface `MediaPlayer` và lớp `AudioPlayer` cụ thể implement `MediaPlayer`.  `AudioPlayer` có thể phát các tệp âm thanh định dạng mp3 theo mặc định.<br>
Chúng ta đang có một interface khác `AdvancedMediaPlayer` và các classes cụ thể implement interface `AdvancedMediaPlayer`. Các class này có thể phát các tệp định dạng vlc và mp4.<br>
Chúng ta muốn tạo `AudioPlayer` để chơi các định dạng khác. Để đạt được điều này, chúng tôi đã tạo một class `MediaAdapter`, nó implements the MediaPlayer interface và sử dụng các đối tượng `AdvancedMediaPlayer` để chơi định dạng bắt buộc.<br>
`AudioPlayer` sử dụng adapter của class `MediaAdapter` chuyển qua loại âm thanh mong muốn mà không cần biết class thực tế có thể phát định dạng mong muốn. `AdapterPotypeDemo`, class demo của chúng ta sẽ sử dụng class `AudioPlayer` để chơi các định dạng khác nhau.<br>
Dưới đây là class diagram của ví dụ:
![](https://images.viblo.asia/cb22b721-39ef-4de7-9854-0122dbde2025.jpg)<br>
Sau đây là source code cho ví dụ này:<br>
```
public interface MediaPlayer {
   public void play(String audioType, String fileName);
}
```
```
public interface AdvancedMediaPlayer {	
   public void playVlc(String fileName);
   public void playMp4(String fileName);
}
```
```
public class VlcPlayer implements AdvancedMediaPlayer {
   @Override
   public void playVlc(String fileName) {
      System.out.println("Playing vlc file. Name: "+ fileName);		
   }

   @Override
   public void playMp4(String fileName) {
      //do nothing
   }
}
```
```
public class Mp4Player implements AdvancedMediaPlayer{

   @Override
   public void playVlc(String fileName) {
      //do nothing
   }

   @Override
   public void playMp4(String fileName) {
      System.out.println("Playing mp4 file. Name: "+ fileName);		
   }
}
```
```
public class MediaAdapter implements MediaPlayer {

   AdvancedMediaPlayer advancedMusicPlayer;

   public MediaAdapter(String audioType){
   
      if(audioType.equalsIgnoreCase("vlc") ){
         advancedMusicPlayer = new VlcPlayer();			
         
      }else if (audioType.equalsIgnoreCase("mp4")){
         advancedMusicPlayer = new Mp4Player();
      }	
   }

   @Override
   public void play(String audioType, String fileName) {
   
      if(audioType.equalsIgnoreCase("vlc")){
         advancedMusicPlayer.playVlc(fileName);
      }
      else if(audioType.equalsIgnoreCase("mp4")){
         advancedMusicPlayer.playMp4(fileName);
      }
   }
}
```
```
public class AudioPlayer implements MediaPlayer {
   MediaAdapter mediaAdapter; 

   @Override
   public void play(String audioType, String fileName) {		

      //inbuilt support to play mp3 music files
      if(audioType.equalsIgnoreCase("mp3")){
         System.out.println("Playing mp3 file. Name: " + fileName);			
      } 
      
      //mediaAdapter is providing support to play other file formats
      else if(audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")){
         mediaAdapter = new MediaAdapter(audioType);
         mediaAdapter.play(audioType, fileName);
      }
      
      else{
         System.out.println("Invalid media. " + audioType + " format not supported");
      }
   }   
}
```
```
public class AdapterPatternDemo {
   public static void main(String[] args) {
      AudioPlayer audioPlayer = new AudioPlayer();

      audioPlayer.play("mp3", "beyond the horizon.mp3");
      audioPlayer.play("mp4", "alone.mp4");
      audioPlayer.play("vlc", "far far away.vlc");
      audioPlayer.play("avi", "mind me.avi");
   }
}
```
Output của ví dụ:
```
Playing mp3 file. Name: beyond the horizon.mp3
Playing mp4 file. Name: alone.mp4
Playing vlc file. Name: far far away.vlc
Invalid media. avi format not supported
```
### References:
* Head First Design Patterns ( Book )
* [Adapter Pattern - GeeksforGeeks](https://www.geeksforgeeks.org/adapter-pattern/)
* [Design Patterns - Adapter Pattern - tutorialspoint.com](https://www.tutorialspoint.com/design_pattern/adapter_pattern.htm)