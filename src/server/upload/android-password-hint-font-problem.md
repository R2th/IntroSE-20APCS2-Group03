If you working with password `EditText` and you enable input password by 

    edtPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);

you will **face** font problem in some device (list at the end of my answer) 

For example,
![](https://images.viblo.asia/22756bc6-a179-47df-9828-caa640d87dd5.png)

If I use `android:inputType="textPassword"`, this problem **don't happened**

### To fix this problem, there are some ways
1) Use `setTransformationMethod` instead `inputType`
```java
    edtPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
```
=> Font will **working well** however the keyboard display **not very well** (it only display text, don't display number on top of text)

2) Use `Typeface.DEFAULT`
```java
    setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
    setTypeface(Typeface.DEFAULT);
```
=> Keyboard **display well**, font **may working not well**. Example `sans-serif-light` is a default font for all `View` in my application => after `setTypeface(Typeface.DEFAULT)`, the `EditText` font still look **different** 

3) Use `android:fontFamily="sans-serif"`  
For some device, it will **CRASH**, check my answer here https://stackoverflow.com/a/52421199/5381331. And also font still look **different**  

### MY SOLUTION
> cache the typeface before `setInputType` then reuse it 
```java
Typeface cache = edtPassword.getTypeface();
edtPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
edtPassword.setTypeface(cache);
```

### Device testing
Some device face font problem  

 - Xiaomi A2 (8.0.1)
 - Pixel XL (8.1.0)
 - Sony Xperia Z5 Au (SOV32) (6.0)
 - Arrow NX (F-04G) (6.0.1)
 - Kyocera (S2) (7.0)

Some device not face font problem

 - Samsung S4 (SC-04E) (5.0.1)
 - Samsung Galaxy Node 5 (5.1.1)
 - Samsung S7 Edge (SM-G935F) (7.0)