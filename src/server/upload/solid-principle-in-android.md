Tất cả chúng ta đều đã nghe về nguyên tắc **S.O.L.I.D** khi phát triển các công cụ phần mềm. Tôi muốn nêu bật những điều cơ bản của nguyên tắc và cung cấp một số ví dụ về cách điều này sẽ được áp dụng cho phát triển Android.
Vì vậy, hãy bắt đầu bằng cách nêu 5 nguyên tắc của **S.O.L.I.D.**

### The Single Responsibility Principle (SRP): 

* Nguyên tắc này nói rằng "Một lớp chỉ nên có một lý do để thay đổi"

* Điều này có nghĩa là một lớp chỉ nên có một trách nhiệm.

* Ví dụ: chúng ta hãy sử dụng phương thức OnBindViewHolder trong lớp `RecyclerView.Adapter` class. Vai trò của OnBindViewHolder là ánh xạ một list item vào một view. Không nên có logic trong phương pháp này.

Ví dụ minh họa cách nguyên tắc này bị vi phạm:

```Java
 @Override 
  public void onBindViewHolder(ViewHolder holder, int position) {
      Movie movie = movies.get(position);

      holder.title.setText(movie.getTitle());  
      holder.rating.setText(movie.getRating());

      //SRP violation, onBindViewHolder has only the responsibility to display data
      // no make operations like concatenations!

      String[] genres = song.getGenres();
      StringBuilder builder = new StringBuilder();
      foreach (String genre : genres){
        builder.append(genre).append(",");
      }

      holder.genres.setText(builder.toString());
  }
```

Ví dụ minh họa cách sử dụng nguyên tắc này:

```Java
@Override 
public void onBindViewHolder(ViewHolder holder, int position) {
    Movie movie = movies.get(position);

    holder.title.setText(movie.getTitle());  
    holder.rating.setText(movie.getRating())

    //all the logic is moved into util class...now is clean!
    holder.authors.setText(AppUtils.getGenres(movie))
}
```

### The Open-Closed Principle (OCP):

* Nguyên tắc này nói rằng "Các entities phần mềm như các classes, functions, modules nên được open cho extension nhưng close cho modification."

* Điều này có nghĩa là nếu chúng ta được yêu cầu thêm một tính năng mới cho dự án, thì không nên sửa đổi code hiện tại mà nên viết code mới extent từ code hiện có.

* Chẳng hạn, giả sử chúng ta có một lớp gọi là `TimeOfDayGreet` với một phương thức duy nhất `getGreetFromTimeOfDay`. Chúng ta muốn hiển thị một message chào mừng khi người dùng mở ứng dụng. Thông báo này phải được dựa trên thời gian trong ngày.

Ví dụ minh họa cách nguyên tắc này bị vi phạm:

```Java
public class TimeOfDayGreeting {
    private String timeOfDay;

     public String getGreetingFromTimeOfDay() {
        if (this.timeOfDay == "Morning") {
            return "Good Morning, sir.";
        }
        else if (this.formality == "Afternoon") {
            return "Good Afternoon, sir.";
        }
        else if (this.formality == "Evening") {
            return "Good Evening, sir.";
        }
        else {
            return "Good Night, sir.";
        }
     }

     public void setTimeOfDay(String timeOfDay) {
        this.timeOfDay = timeOfDay;
     }
  }
```

Ví dụ minh họa cách sử dụng nguyên tắc này:

```Java
/* Create an interface called TimeOfDay and let the Morning, Afternoon, Evening classes implement this interface. 
   * This interface can then be called inside the timeOfDayGreeting class  
   */
  public class TimeOfDayGreeting {
      private TimeOfDay timeOfDay;

      public TimeOfDayGreeting(TimeOfDay timeOfDay) {
          this.timeOfDay = timeOfDay;
      }

      public String getGreetingFromTimeOfDay() {
          return this.timeOfDay.greet();
      }
  }

  public interface TimeOfDay {
      public String greet();
  }

  /*  Morning class  */
  public class Morning implements TimeOfDay {
      public String greet() {
          return "Good morning, sir.";
      }
  }

  /*  Afternoon class  */
  public class Afternoon implements TimeOfDay {
      public String greet() {
          return "Good afternoon, sir.";
      }
  }

  /*  Evening class  */
  public class Evening implements TimeOfDay {
      public String greet() {
          return "Good evening, sir.";
      }
  }

  /*  Night class  */
  public class Night implements TimeOfDay {
      public String greet() {
          return "Good night, sir.";
      }
  }
```

### The Liskov Substitution Principle (LSP):

* Nguyên tắc này nói rằng "Các lớp con không bao giờ nên phá vỡ các định nghĩa kiểu lớp cha mẹ".

* Điều này có nghĩa là một lớp con nên ghi đè các phương thức từ lớp cha mà không phá vỡ chức năng của lớp cha.

* Ví dụ: giả sử chúng ta có interface ClickListener. interface này được implemented bởi fragments 1 & 2.

Ví dụ minh họa cách nguyên tắc này bị vi phạm:

```Java
public interface ClickListener {
    public void onClick();
  }
  
  public class Fragment1 implements ClickListener {
    @Override
    public void onClick() {
        //handle logic            
    }
  }
  
  public class Fragment2 implements ClickListener {
    @Override
    public void onClick() {
        //handle logic            
    }
    
    public void updateClickCount() {
        
    }
  } 

  public void onButtonClick(ClickListener clickListener) {
     //IF we have a requirement where we need to increment the click count in framgent2 but not in fragment1, 
     // we would have to follow something like this, which is bad practice.
     if(clickListener instanceOf Fragment2) {
        clickListener.updateClickCount();  
     }
     clickListener.onClick();
  }        
```

Ví dụ minh họa cách sử dụng nguyên tắc này:
```Java
 public interface ClickListener {
    public void onClick();
  }
  
  public class Fragment1 implements ClickListener {
    @Override
    public void onClick() {
        //handle logic            
    }
  }
  
  public class Fragment2 implements ClickListener {
    @Override
    public void onClick() {
        updateClickCount();
        //handle logic
    }
    
    public void updateClickCount() {
        
    }
  }
  

  public void onButtonClick(ClickListener clickListener) {
     clickListener.onClick();
  }        
```

### The Interface Segregation Principle (ISP):

* Nguyên tắc này nói rằng "Không client nào bị buộc phải phụ thuộc vào các phương thức mà nó không sử dụng."

* Điều này có nghĩa là nếu một interface trở nên quá lớn, thì nó nên được chia thành các interface nhỏ hơn để các client implementing interface không phải implement các methods mà nó không sử dụng.

* Ví dụ: hãy sử dụng giao diện `TextWatcher` trong Android. Chúng ta biết rằng interface TextWatcher có 3 methods:

Ví dụ minh họa cách nguyên tắc này bị vi phạm:

 ```Java
editText.addTextChangedListener(new TextWatcher() {
      @Override
      public void beforeTextChanged(CharSequence s, int start, int count, int after) {
          
      }

      @Override
      public void onTextChanged(CharSequence s, int start, int before, int count) {
          /* In most of the scenarios this is the only method we use. The other methods are pointless in these cases. */
      }

      @Override
      public void afterTextChanged(Editable editable) {
          
      }
  });
```

Ví dụ minh họa cách sử dụng nguyên tắc này:

 ```Java
/* We create an interface with one method  */
  public interface TextWatcherWithInstance {
      void onTextChanged(EditText editText, CharSequence s, int start, int before, int count);
  }
  
 /* We create a custom class called MultiTextWatcher. 
   * And pass the interface here  
   */            
  public class MultiTextWatcher {
      private TextWatcherWithInstance callback;

      public MultiTextWatcher setCallback(TextWatcherWithInstance callback) {
          this.callback = callback;
          return this;
      }

      public MultiTextWatcher registerEditText(final EditText editText) {
          editText.addTextChangedListener(new TextWatcher() {
              @Override
              public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

              @Override
              public void onTextChanged(CharSequence s, int start, int before, int count) {
                  callback.onTextChanged(editText, s, start, before, count);
              }

              @Override
              public void afterTextChanged(Editable editable) {}
          });

          return this;
   }
   
   /*  
    * We can call this class from our Activity/Fragment like this:
    * This only has one method, which we are using in the app
    */
    new MultiTextWatcher()
    .registerEditText(editText)
    .setCallback(new MultiTextWatcher.TextWatcherWithInstance() {
          @Override
          public void onTextChanged(EditText editText, CharSequence s, int start, int before, int count) {

          }
      });         
```

### The Dependency Inversion Principle (DIP):

* Nguyên tắc này có 2 yêu cầu:

    1. "Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp. Cả hai nên phụ thuộc vào abstractions"
    2. "Abstractions không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào abstractions"

* Điều này có nghĩa là nếu bạn sử dụng một lớp trong một lớp khác, lớp này sẽ phụ thuộc vào lớp được chèn. Đây là những gì được gọi là cứng nhắc.

* Ví dụ: giả sử chúng ta có một lớp được gọi là `JobTracker`. Yêu cầu là cập nhật người dùng qua email hoặc cuộc gọi dựa trên mức độ khẩn cấp của công việc.

Ví dụ minh họa cách nguyên tắc này bị vi phạm:

 ``` Java
 public class Emailer {
      public String generateJobAlert(String job) {
          String alert = "You are alerted for " + job;
          return alert;
      }
  }
  
  public class Phone {
      public String generateJobAlert(String job) {
          String alert = "You are alerted for " + job;
          return alert;
      }
  } 
  
  public class JobTracker {
      private Phone phone;
      private Emailer emailer;

      public JobTracker() {
          phone = new Phone();
          emailer = new Emailer();
      }

      public void setCurrentConditions(String jobDescription) {
          if (jobDescription == "urgent") {
              String alert = phone.generateJobAlert(jobDescription);
              System.out.print(alert);
          }
          if (jobDescription == "brief") {
              String alert = emailer.generateJobAlert(jobDescription);
              System.out.print(alert);
          }
      }
  }        
```

Ví dụ minh họa cách sử dụng nguyên tắc này:



``` Java
 interface Notifier {
    public void jobAlert(String jobDescription);
  }
  
  public class EmailClient implements Notifier {
      public void jobAlert(String jobDescription) {
          if (jobDescription == "brief");
              System.out.print("Job description is brief");
      }
  }
  
  public class PhoneClient implements Notifier {
      public void jobAlert(String jobDescription) {
          if (jobDescription == "urgent");
              System.out.print("Job description is urgent");
      }
  }
  
  public class JobTracker {
      private String currentAlert;

      public void setCurrentConditions(String jobDescription) {
          this.currentAlert = jobDescription;
      }

      public void notify(Notifier notifier) {
          notifier.jobAlert(currentAlert);
      }
  }        
```

Nguồn: [Github](https://github.com/anitaa1990/Today-I-Learned/blob/master/android/solid_principle.md)