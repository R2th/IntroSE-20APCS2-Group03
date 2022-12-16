State design pattern  là một trong những mẫu thiết kế hành vi. State design pattern  được sử dụng khi một Object thay đổi hành vi của nó dựa trên trạng thái bên trong của nó. Nếu chúng ta phải thay đổi hành vi của đối tượng dựa trên trạng thái của nó.
Trong State pattern , chúng ta tạo các đối tượng đại diện cho các trạng thái khác nhau và một đối tượng bối cảnh mà hành vi của chúng thay đổi khi các thay đổi đối tượng trạng thái của nó.
# Thực hiện:
Chúng ta sẽ tạo một giao diện trạng thái xác định một hành động và các lớp state cụ thể thực hiện giao diện trạng thái. Context là một lớp State.
StatePatternDemo, lớp demo của chúng ta, sẽ sử dụng các đối tượng Context và state để thể hiện sự thay đổi trong hành vi Context dựa trên kiểu trạng thái của nó.
![](https://images.viblo.asia/9543fcd3-964e-4c39-9b14-0324cde95fd7.jpg)
## Bước 1:
Tạo 1 interface.
### State.java
```
public interface State {
   public void doAction(Context context);
}
```
## Bước 2:
Tạo concrete classes 
### StartState.java
```
public class StartState implements State {

   public void doAction(Context context) {
      System.out.println("Player is in start state");
      context.setState(this);	
   }

   public String toString(){
      return "Start State";
   }
}
```
### StopState.java
```
public class StopState implements State {

   public void doAction(Context context) {
      System.out.println("Player is in stop state");
      context.setState(this);	
   }

   public String toString(){
      return "Stop State";
   }
}
```
## Bước 3:
Tạo Contenxt Class.
### Context.java
```
public class Context {
   private State state;

   public Context(){
      state = null;
   }

   public void setState(State state){
      this.state = state;		
   }

   public State getState(){
      return state;
   }
}
```
## Bước 4:
Sử dụng Context để theo dõi các hành vi khi State thay đổi.
### StatePatternDemo.java
```
public class StatePatternDemo {
   public static void main(String[] args) {
      Context context = new Context();

      StartState startState = new StartState();
      startState.doAction(context);

      System.out.println(context.getState().toString());

      StopState stopState = new StopState();
      stopState.doAction(context);

      System.out.println(context.getState().toString());
   }
}
```
## Bước 5:
### Kết quả:
```
Player is in start state
Start State
Player is in stop state
Stop State
```