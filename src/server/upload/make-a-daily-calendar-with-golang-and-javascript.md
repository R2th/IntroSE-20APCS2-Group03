# What I want to do:
1. Display a calendar for each month
2. Can input schedule (like todo application)
3. When all tasks are complete, change the color of the square.
4. Switch between buttons to display one month before and after

I planned to finish this in 1 week

# Actually?
The current date and time are displayed, and the time is updated in real time like a digital clock.

I made it like a tear-off calendar.

# Language used 
golang,javascript,html,css

# Create folder
```
calendar
      |_resources 
      |         |_index.html
      |         |
      |         |_styles.css
      |_hello.go
```

## Where I struggled
* How to embed things defined in go (current date, etc.) in HTML

* The CSS file was not read.


These two were particularly troubled. After that, you could use other languages without sticking to `go`? I think

(Since I had to use `Go`, I couldn't figure out how hard it was)

## How
* hello.go

```
package main 


 import ( 
    "fmt" 
    "html/template" 
    "net/http" 
    "time" 
 ) 


 func main() { 
    fmt.Println("The Server runs with http://localhost:3000/") 
    http.Handle("/resources/", http.StripPrefix("/resources/", http.FileServer(http.Dir("resources/")))) 
    http.HandleFunc("/", Handler) 
    http.ListenAndServe(":3000", nil) 
 } 


 type Time struct { 
    Year    int 
    Month   string 
    Day1    int 
    Weekday string 
    Hour    int 
    Minute  int 
    Second  int 
 } 


 func Handler(w http.ResponseWriter, r *http.Request) { 


    t := Time{ 
        Year:    time.Now().Year(), 
        Month:   time.Now().Month().String(), 
        Day1:    time.Now().Day(), 
        Hour:    time.Now().Hour(), 
        Minute:  time.Now().Minute(), 
        Second:  time.Now().Second(), 
        Weekday: time.Now().Weekday().String(), 
    } 


    tmpl := template.Must(template.ParseFiles("./resources/index.html")) 
    tmpl.Execute(w, t) 


 } 

```
The process of reading html and css, which was a difficult part,

`tmpl := template.Must(template.ParseFiles("./resources/index.html"))` 

`tmpl.Execute(w, t)`

Specify the path of the file you want to load,

Executed simultaneously with the variables defined above as arguments.

This succeeds in embedding `go` on `html`.

`css` reading
`http.Handle("/resources/", http.StripPrefix("/resources/", http.FileServer(http.Dir("resources/")))) `

This one sentence searches for static files in the resources folder and can read them.

* index.html

```
<!DOCTYPE html> 
 <html lang="en"> 
 <head> 
     <meta charset="UTF-8"> 
    <title>テスト</title> 
     <link rel="stylesheet" type="text/css" href="../resources/styles.css"> 
      <script> 
         function digitalClock(){ 
             // Get the current time
             var now = new Date(); 
             // Get "hour"
             var hour = now.getHours(); 
             // Get "minute"
             var minute = now.getMinutes(); 
             // Get "Seconds"
             var second = now.getSeconds(); 

             // Example of 2 digits display with 0 padding (Example) 08:45:09 
             if(hour < 10) hour = "0" + hour; 
             if(minute < 10) minute = "0" + minute; 
             if(second < 10) second = "0" + second; 

            // Display current time
             var elem = document.getElementById("clock"); 
             elem.innerHTML = hour + ":" + minute + ":" + second; 

             // Recursive call after 500 milliseconds
             setTimeout(digitalClock, 500); 
         } 

         window.onload = function(){ 
             digitalClock(); 
         } 
     </script> 
 </head> 
 <body> 
 <div class="calenderbox"> 
    <pre><h1 class="month_now"><span>{{.Year }}</span></h1></pre> 
   <div id ="box1">  
    <div id="box2">  
         <p class="Date">{{.Month }}</p> 
      <p class="Date">{{.Day1 }}</p> 
     <p class="Date">{{.Weekday }}</p> 
    </div> 
   <div id="box3">  
        <p id="clock"></p> 
    </div> 
   </div> 
 </div> 
 </body> 
```

Since it is processed with `hello.go`, you can retrieve `go` variables with the following protocol.

`{{.Variable name }}`

In addition, it retrieves the time within it and returns the html designed for the appearance of a digital clock.

The css file has not changed in particular, so I will omit it.

# Summary
It was a miracle to have been made so far because there were only things that have never been touched.

However, since there should still be features and better descriptions that we want to add, I will continue to do this for a while.

`Go` completes the tutorial for the time being.

After that, I felt that it would be quite convenient to use javascript for the first time and master it.

I will continue to work on this as well.