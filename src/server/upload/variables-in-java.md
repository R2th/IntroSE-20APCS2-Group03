> This posts is introduce Types of variables in Java. 
> Have 03 types of variables: 
> * Local Variables
> * Instance Variables
> * Static Variables

## 1. Instance Variables
Define: Declared Inside class but not inside method
* Examples: 
```
class Test {
   int data = 15; // Instance variable
   float pi = 3.14f; // Instance variable
}
```
Properties of Instance Variable:
* Instance variable always get a default value: Ex: int data
* Cannot be reinitialized directly within class
Examples: 
```
class Test {
   int data = 15; 
   data = 20; // Error
}
```
But is that TRUE if reinit in method
```
class Test {
   int data = 15;
   void someMethod(){
      data = 20; //allowed
   }
}
```
## 2. Static Variables: 
detail...to be updated
## 3. Local Variables
Define: Declared Inside method or method parameters
* Examples: 
```
int areaCircle(int radius) {
   int total = radius * radius;
   return total;
}
```
Properties of Local Variable:
* Not accessible outside method
* Do not get default value
## 4. Summary 
* Examples:
```
public class Practice {
    static int staticVariables = 20;
    int instanceVariables = 30;
    void someMethod(){
        int localVariables = 10;
    }

    public static void main(String[] args) {
        Practice obj1 = new Practice();
        System.out.println(obj1.instanceVariables);
        System.out.println(Practice.staticVariables);
    }
}

```