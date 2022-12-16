Ok you have a string and you wish to extract the url from such string. Here are the two ways you cant get this done.
To get a single link in text or String one can simple pass the string to below method using Regex patern to determine the url.

```
public string GetLink(string message)
{
    string link = "";
    Regex urlRx = new Regex(@"((https?|ftp|file)\://|www.)[A-Za-z0-9\.\-]+(/[A-Za-z0-9\?\&\=;\+!'\(\)\*\-\._~%]*)*", RegexOptions.IgnoreCase);
    MatchCollection matches = urlRx.Matches(message);
    link = matches[0].Value;
    return link;
}
```
        
However if there exist multiple urls in a string then we can extract the links and return a list of url.
        
```
public List<string> GetLinks(string message)
{
    List<string> list = new List<string>();
    Regex urlRx = new Regex(@"((https?|ftp|file)\://|www.)[A-Za-z0-9\.\-]+(/[A-Za-z0-9\?\&\=;\+!'\(\)\*\-\._~%]*)*", RegexOptions.IgnoreCase);

    MatchCollection matches = urlRx.Matches(message);
    foreach (Match match in matches)
    {
        list.Add(match.Value);
    }
    return list;
}
```

Now lets say we pass a string with multiple url as below

```
    List<string> list = GetLinks("Some text http://www.google.com and thats not all. Here http://www.phonearena.com is another text");
    for (int i = 0; i < list.Count; i++)
    {
        Console.WriteLine("Url Found: " + list[i].ToString());
    }
```

**Output:**
Url Found: http://www.google.com

Url Found: http://www.phonearena.com

Now lets say we pass a string with a single url as below

```
var urlString = GetLink("I know what you did last summer as shown here: http://www.google.com and thats not all");
Console.WriteLine(urlString);
```

The above will write http://www.google.com as output. Simple as that!

After extracting the url or urls we can further ensure its a valid url before opening it in the web application. This methid will return true if the url is a valid link else false.

```
private bool IsValidUrl(string url) {
return (Uri.IsWellFormedUriString(url, UriKind.Absolute));
}
```

Now use the below method to open the url on the device using Device.OpenUrl().

```
private void OpenUrl(string url)
{
    if (IsValidUrl(url))
        Device.OpenUri(new System.Uri(url));
}
```

![](https://images.viblo.asia/b5e1d9be-5f9f-49f3-bcf4-bd716fe390be.jpg)