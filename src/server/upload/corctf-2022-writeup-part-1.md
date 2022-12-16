corCTF 2022 is truly like a JS marathon :D by the fact there are so many interesting (and panic) web challenges writen in JS. I was not able to solve any of them during the CTF event. After 2.5 days, I finally solve the simplewaf challenge, and that is the only challenge that I can solve on my own 😂.

Anyway, I learn so much about JS from this CTF, so I would like to write this post to share my journey of going through 3 web challenges written in JS: **simplewaf**, **friends**, and **modernblog**. Based on the challenge level, I write up the frist 2 challenges first, then the last challenge will move to the next part. Without any further word, let's dive in now!

# 1. simplewaf
## a. Challenge description
![simplewaf_challenge_description.png](https://images.viblo.asia/a9ff80fe-c2cc-4757-b4d2-abdf1d9c5ca2.png)

The challenge provide us [source code](https://github.com/thangpd3160/CTF-Writeup/tree/main/corCTF/2022/simplewaf) and a `Dockerfile`. Since the Instancer only create an instance of the challenge that last for 3 minutes, which is so inconvenience, so I bulid and debug localy with the provided resource to play this challenge.

Navigate through the website at `localhost:3456`, we can see this is just a simple web show the content of specified file. 
![image.png](https://images.viblo.asia/67dc9c14-a407-4e5d-bb4f-d8d85ac616e9.png)
The target of this challenge is reading the content of `flag.txt` file... but by someway to bypass the check `includes('flag')` of waf. All of the challenge code can be seen at `main.js`.
```js
const express = require("express");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3456;

app.use((req, res, next) => {
    if([req.body, req.headers, req.query].some(
        (item) => item && JSON.stringify(item).includes("flag")
    )) {
        return res.send("bad hacker!");
    }
    next();
});

app.get("/", (req, res) => {
    try {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync(req.query.file || "index.html").toString());       
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

app.listen(PORT, () => console.log(`web/simplewaf listening on port ${PORT}`));
```
## b. Challenge analysis

After reading the source code, there are 2 question come to my mind.

1. How to bypass the `includes` condition? (absolutely... that what we are looking for), and
2. What type of argument the `readFileSync` function can take to read a file?

By going around on Google, I found a write up for [NodeJS Bypass Filter CTF](https://ahmed-belkahla.me/post/csictf2020/), which is similar to this challenge at some point:

- Both challenge doesn't validate the type of input, which means we can pass input as an array instead of a string, and
- Both challenge require to bypass the `includes` function to reach the flag!

Bravo! Think that I found the right spot, I try the payload `file[]=x&file[]=flag.txt`. Unlucky, it can't bypass waf of this challenge
![image.png](https://images.viblo.asia/9b674226-be1d-4e13-949a-eada289ae3dd.png)

Why can't it bypass the waf? Well, I figure out there is a critial different point between the challenge at this line of code

`(item) => item && JSON.stringify(item).includes("flag")`

The **simplewaf** doesn't take the raw input to perform input validation, but transform the raw input a JSON string beforehand. So, the `includes` function still can check whether the transformed string contains `flag` or not. 

At this point, I can't think of anyway to bypass the `includes` function... So, I move to the second question, and take a look at NodeJS document of that function. 
![image.png](https://images.viblo.asia/ae6c01c8-f856-43b3-b202-aab728b40240.png)

Oke, so the path parameter can be either a `<string> | <Buffer> | <URL> | <integer>`. However, the type of requests query value is always string. How could we pass in the `readFileSync` function a `URL`, or an `integer`, or anything else other than a `string`?

At the first thought, I try format the string as a `URL`: `http://localhost:3456/wow.html`. Unlucky, it doesn't works~
![image.png](https://images.viblo.asia/546496eb-11c4-4671-a529-da83861556e7.png)

Stopping fruitless effort at guessing, I decided to take a closer look of the `readFileSync` function at NodeJS source code on [github](https://github.com/nodejs/node/blob/main/lib/fs.js#L464). 
![image.png](https://images.viblo.asia/f50304b1-bba7-4979-a3a2-f4606b1ece64.png)

The code snippet from line 469 and below perform read file process, which is nothing to dive in. The main point we need to dive in is the code at line 467. Follow the code by investigating the `fs.openSync` function.
![image.png](https://images.viblo.asia/14f49a70-7ecd-482b-8092-9d2f87207214.png)

Continue following by investigating the `getValidatedPath` function.
![image.png](https://images.viblo.asia/4291e8ab-50a4-44a8-b2c5-53b6bbd4f168.png)

Hold down, some interesting things appear at here. So if the `fileURLOrPath` value is not null, and there are exists `href` and `origin` in it, it will call to `fileURLToPath`, which transform the `fileURLOrPath` value to a URL. That is the point! I can feel that I'm going on the right way!

Gaining momemtum, I continue investigating the `fileURLToPath` function.
![image.png](https://images.viblo.asia/2d3a7467-cbe2-4755-acfb-0fca7f74ac98.png)

One additional condition for the `fileURLOrPath` value is that its protocol must be `file:`. After all of the check is passed, it will call the corresponding function to get path from the URL. Since I'm debugging on Linux, so I continue investigating at the `getPathFromURLPosix` function.
![image.png](https://images.viblo.asia/afd18912-dd85-4664-9706-1dc671566d92.png)

Once again, another check occurs at this code snippet: the `hostname` must be empty. But, one remarkable things to note down here, and it will helps us bypass the `includes` check of **simplewaf** is that it will perform URL decode on the `pathname` to get the URL. This means if we pass a double URL encoded `pathname` value from the web application, it will ends up the file path being plaintext. And guess what? Since the value pass the client to the `includes` check is just URL decoded once, we can easily bypass this check also.

Okay, let's sum it up all the things we need to do to pass a valid argument `file` as a URL into the `readFileSync` function.

- `file` is not null
- `file.origin` exists
- `file.href` exists
- `file.protocol = 'file:'`
- `file.hostname = ''`

And the final requirement to bypass the waf and get the flag is:

- `file.pathname` is double URL encoded

## c. Challenge solution

From the analysis above, I construct the following payload:

`file[origin]=x&file[href]=x&file[protocol]=file:&file[hostname]=&file[pathname]=fla%2567.txt`

I just double URL encode the `g` character to bypass the waf. Using the payload, we succesfully get the tesst flag.
![image.png](https://images.viblo.asia/c0378252-49fc-48b5-ab0b-36c5a53a2d50.png)

Okay, let's get the real flag for now~

`corctf{hmm_th4t_waf_w4snt_s0_s1mple}`

# 2. friends

## a. Challenge description
![image.png](https://images.viblo.asia/23576e23-9240-4771-be1e-7ba3f7eb0e5b.png)

Another instance challenge, which again makes me so inconvenience to debug and investigate, so I create a docker images for this challenge and host it locally. I also upload the `Dockerfile` at [my github repo](https://github.com/thangpd3160/CTF-Writeup/tree/main/corCTF/2022/friends).

The code is nearly 300 lines... There is a login function, follow and unfollow function, and our target is making admin follow us.
![image.png](https://images.viblo.asia/289278fd-8c0a-4955-b2b7-7bc5ec9fd06d.png)

## b. Challenge analysis

The source code does not contains any snippet of code that stored the credentials of  `admin` user. Thought that the code could be hidden, or unprovided, I try to follow admin, but the application response "user does not exist". How strange it could be!
![image.png](https://images.viblo.asia/84a884f2-c45a-4421-b93b-fd99904aa00f.png)

So... there is no `admin` account. Then just create an `admin` account, then follow other account. However, we can create an `admin` account, as the `username` must be at least 6 characters.
![image.png](https://images.viblo.asia/feaf220a-fe9f-4e20-adea-af66110d856e.png)

At this point, I got stuck. I found no entry point in code that we can input to edit `followers` data. 

### Magic JS
Oops! This is not true. After reading the write up from the others (on discord channel), I found that I misunderstood a snippet of code... Magic
```js
  const body = req.body
  const params = ['u', 'r', 'n']
  const mine = followers.get(req.username)

  // force all params to be strings for safety
  [body.u, body.r, body.n] = params.map(
    p => (body[p] ?? '').toString()
  )
```

Put it on [prettier.io](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEACVkoGcaoLYCWUcqAvKgGYQA21EA7nAE5YB0A5nDABRNwCOrAK5ZmUAIZ44ASgA6UeegD0SyhCZgS42qgAO4ppKyoYEVACMSOJkXbGqTVFnEUuAT0WoA2uYgATN2EAGgt-QKYQ3wDWKABdMj0DI1Y8cV1uT3RdMgA+VG4oty9deIB+UtQAckrpVlMAZRgbKHZuOSh0aRAgkAhdGAJoLGRQAyYGAAUDBGGUbXpxN2Ge80MwAGsuesk4ABkiOGQKbVEVtc2Yev0wW2QmoTgeuDxLPz84P13xFqFxTgAxdSpGADFrIEDiISmbogAAWMDw1AA6rCCPAsNc4PUZmiCAA3NFucFgLDLEBEURMGATQzsVJHE6PEAAKywAA96rZqHAAIpCCDwBnUU4gfQsZjg8ziSzUGG6ZowJEEPwwWHIAAcAAYevKIKIkYZdOD5XBKXjDj1+Pz4DS+rMIVgALTED4fGF8K0EPg0v70pDHYVM0SEO5MB49LBc3nWw7+xk9GDSpUqtVIABMCcMBGotgAwhA8H6QKaAKwwkRwAAq0tmAZFeIeAEkoO9YPUwDZ+gBBFuNNzcoWiAC+Q6AA) to see how this snippet of code actually look like. And that is:
```js
  const body = req.body
  const params = ['u', 'r', 'n']
  const mine = (followers.get(req.username)[
  // force all params to be strings for safety
  (body.u, body.r, body.n)
  ] = params.map((p) => (body[p] ?? "").toString()));
```

It completely change everything. Beforehand, `body.u`, `body.r` and `body.n` seems to be the return value of `map` function, turns out to be **index** of a users' followers array. The comma is now become the [command operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator).

### Comma Operator

Let's take a small demo to understand comma operator behavior in array index. Assume that `arr = followers.get(req.username)`, the following code snippet will help us understand the behavior of comamnd operator.
![image.png](https://images.viblo.asia/178aebfd-a13f-42f7-b5d5-ea64a450d287.png)

Magic JS! There are 2 things to notice from the results we get:

- We can assign the javascript array at any index. There is no line of code assign value for `arr[0]`, but the js code still run without any error!
- In case there is comma operator in array index, only the last index get the assigned value, and other get `undefined`

At this point, you might think that: "Alright, now I can just assign admin to the first index, then I can succesfully get the flag. My payload wiill be `[body.u, body.r, body.n] = ["admin", "", 1]`. Unfortunately, this payload will not work because the inserted value is an array `["admin", "", 1]`, not a string that we want :D
![image.png](https://images.viblo.asia/6c3c604c-c54e-4888-a62e-df643d97ebc5.png)

We almost get to the flag. The remaining problem is that by somehow, there is an element in `followers` array is value type of `string`, not `array`.

### \_\__proto\_\__

This magic will completely solve the remaining problems. Talking about \_\__proto\_\__ (and prototype pollution) is long, so I will not do it at this write up. Let's examine the following snippet of code to understand the behavior of array \_\__proto\_\__
![image.png](https://images.viblo.asia/b29cb21d-fd30-4c67-8a6f-fdbc20ff1ff4.png)

There are 2 things to tonice from the results we get:

- Although there is no line of code assign value for `arr1[0]`, the output of `arr1` show that `arr1[0]="1"`. This happens similar to `arr2`.
- The filled up missing value is the same as the value we assigned to `arr1["__proto__"]` or `arr2["__proto__"]`, sequentially.

Gotcha! At this point, we can finally solve the challenge, as we finally fill up the missing value with a controlled value and type, no matter what data is inserted in later!. Let's check it out!

## c. Challenge solution

To solve this challenge, I use 4 requets. 

The first request just to login, and get the session

![image.png](https://images.viblo.asia/f4e4b498-b882-49f9-ac53-6e152447759f.png)

The second request is fill up the value of `__proto__` of the `followers` array. 

`curl http://localhost:3000/follow -v --cookie "token=5cd5304ab52fd2c8a817eab91df84908" --data "u=admin&r=&n=__proto__"`

![image.png](https://images.viblo.asia/bca4e54e-a2d6-42e2-8927-3245768aec25.png)

The third request is to fill up the `followers` array at index 1, so that the index 0 of `followers` array will be automatically filled up by the value the value of `__proto__` of that array.

`curl http://localhost:3000/follow -v --cookie "token=5cd5304ab52fd2c8a817eab91df84908" --data "u=&r=&n=1" `

![image.png](https://images.viblo.asia/5bdd139b-e8a4-41aa-9cc6-a5b346dc468a.png)

And the final request is to get the flag!

![image.png](https://images.viblo.asia/1b15fa2f-0d2f-45c4-a2c0-70c90ccd71f2.png)

The real flag: `corctf{friendship_is_magic_colon_sparkles_colon}`

That's all about the first part of this write up! Hope you enjoy and learn something from the challenge and the write up! :D