Converting your Object to json is very easy by using JSONObject or other json libraries. Here is an example of using the JSONObject to convert a model class (Student) into json below

**Student.java**

```
package com.example.objecttojsondemo;

import org.json.JSONException;
import org.json.JSONObject;

public class Student {
    private int id;
    private String gender;
    private int age;
    private String firstName;
    private String lastName;
    private String address;

    public Student(int id, String gender, int age, String firstName, String lastName, String address) {
        this.id = id;
        this.gender = gender;
        this.age = age;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    }
```

Here we have a basic model with properties such as id, name and so on. If we were to convert this to json we can create a method toJSON to convert this Object.

```
public String toJSON(){

    JSONObject jsonObject= new JSONObject();
    try {
        jsonObject.put("id", getId());
        jsonObject.put("gender", getGender());
        jsonObject.put("age", getAge());
        jsonObject.put("first_name", getFirstName());
        jsonObject.put("last_name", getLastName());
        jsonObject.put("address", getAddress());

        return jsonObject.toString();
    } catch (JSONException
            e) {
        e.printStackTrace();
        return "";
    }
}
```

Now to test we can simply create a student model and log or toast the converted json on the device. 

```
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Creates a Student
        Student firstStudent = new Student(1, "Male", 22, "Pane", "Detroit", "No 2 sw lane detroit");
        String convertedJson = firstStudent.toJSON();
        Log.d("Converted Json >>> ", convertedJson);
        Toast.makeText(this, convertedJson, Toast.LENGTH_SHORT).show();
    }
}
```

**Output**

`Converted Json >>>: {"id":1,"gender":"Male","age":22,"first_name":"Pane","last_name":"Detroit","address":"No 2 sw lane detroit"}`

That's it! Happy Coding.