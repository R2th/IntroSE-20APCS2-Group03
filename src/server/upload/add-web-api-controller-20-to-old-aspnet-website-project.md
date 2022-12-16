To add an Web Api 2.0 controller to your old asp.net forms website project do the following steps

First right click on yr website, and select add new item, and choose “Web Api Controller Class” and name it for example “MyApiController” and place it in the “App_Code folder”

![image.png](https://images.viblo.asia/90be0f92-a48e-4d81-9033-61ee02d6aa0d.png)

Once you have created the api controller, remove all the methods that are placed in the api controller by default and add this method for testing
```
using System;
using System.Web.Http;

public class MyApiController : ApiController
{
    [HttpGet]
    public MyApiResult GetHelloWorld()
    {

         return new MyApiResult { Data = “JohnnyBlade”, Date = DateTime.Now};
    }
}
```

Also create a new class called “MyApiResult” in the “App_code” folder and add the following properties

```
using System;
public class MyApiResult
{
    public string Data { get; set; }
    public DateTime Date { get; set; }
}
```

Then go to your “Global.asax” file and go to the method “Application_Start” and add the following code and namespaces

```
<%@ Application Language=”C#” %>
<%@ Import namespace=”System.Web.Http”  %>
<%@ Import Namespace=”System.Web.Routing” %>
<%@ Import Namespace=”System.Net.Http.Formatting” %>
<%@ Import Namespace=”Newtonsoft.Json” %>
<%@ Import Namespace=”Newtonsoft.Json.Serialization” %>

<script runat=”server”>

void Application_Start(object sender, EventArgs e)
{
    // set the route for the api
    RouteTable.Routes.MapHttpRoute(
        “DefaultApi”,
        “api/{controller}/{action}/{id}”,
        new { id = System.Web.Http.RouteParameter.Optional }
    );
    // set the configuration
    GlobalConfiguration.Configuration.Formatters.Clear();
    GlobalConfiguration.Configuration.Formatters.Add(new JsonMediaTypeFormatter
    {
        SerializerSettings = new JsonSerializerSettings
        {
            Formatting = Formatting.None,
            DateFormatHandling = DateFormatHandling.IsoDateFormat,
            NullValueHandling = NullValueHandling.Include,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        }
    });
}

</script>
```

the RouteTable makes sure that you can access/find your ApiController by a custom route prefixed with “Api”

```
RouteTable.Routes.MapHttpRoute(
    “DefaultApi”,
    “api/{controller}/{action}/{id}”,
    new { id = System.Web.Http.RouteParameter.Optional }
);
```


for example: http://localhost:12345/api/MyApi/GetHelloWorld

 

the GlobalConfiguration.Configuration.Formatters adds a new formatter for the Json result if you don’t add this, then yr result will be a Json result that is also in XML tags or only pure XML, and that’s what you don’t want, unless yr happy with that.

<MyApiResult xmlns:i=”http://www.w3.org/2001/XMLSchema-instance&#8221; xmlns=”http://schemas.datacontract.org/2004/07/”><Data>JohnnyBlade</Data><Date>2014-11-26T09:24:06.7804627+01:00</Date></MyApiResult&gt;

and if you use the formatter and SerializerSettings the result will be 🙂 and that’s what i need

{"data":"JohnnyBlade","date":"2014-11-26T09:03:45.581355+01:00"}