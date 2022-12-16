Until now, cryptography is always a hard topic which can blow your mind. It have to use tons of math skills to change a string ( including information ) into unthinkable character. But HTTPS is pretty easier. Let's find out how it's work by this below example. 

![](https://images.viblo.asia/e6dadfd0-d477-49e0-b350-49e84f293e31.jpg)

*a carrier pigeons*
## **Lan, Diep and pigeons**

Every activity on Internet, like read this article, upload an avatar on Facebook or buy a stuff on Lazada, basically, sending and receiving messages between computers. Imagine that messages are delivered by pigeon and HTTP is exactly what pigeon do.
So, instead of talking about HTTPS, let's talk about Lan & Diep's love story and their pigeon. 

## In the beginning
Lan loves Diep, so do he. They're far from each other, they want to show their love by sending messages. Lan write, attach letter on the pigeon and it will fly it to Diep. There is nothing happen if Điệp receives that message, read it, successfully. 

But life as we know it, not easy, there is one man named Bình, and he loves Lan too, he wants to catch their pigeon, fake her message and send it to Điệp. He can't know it was fake. This is what HTTP do, scary right ? 

## A very first convention

They're smarter. They will write message using their secret code. They will plus the current position of letter with 3, for example: A ( 1 )  + 3 -> D ( 4 ), and their current message is " LOVEUDARLING " becomes: " ORYXGDUOMQK ". 

Neat !

This is called [Symmetric-key algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm), conclusion that if you know how to encrypt the message, you also know how to decrypt it. 

## How do we decide the key ? 

The key is defined how many units we " jump " from the source letter ( offset ). We definetely can " jump " to 6 or 9 instead of 3. 

Problem is that Lan and Diep hasn't met before, to give the secret key to each other and send messages by pigeons throught that secret key. If they send it with the message, Binh can read it and crack it easily in the next sending. It means Binh can change Lan or Diep's message before it can be delivered to each other. 

![](https://images.viblo.asia/5af1de3d-2017-42b7-beee-598bb0108392.jpg)

*Bad Binh ...*
 ## A 2.0 convention

So Lan and Diep has upgraded their system. When Lan wants to send Diep a message, she has to follow some below rules: 

*  Lan sends a pigeons to Diep without any message 
*  Diep sends back to Lan a open box, he will keep a key for himself
*  When Lan receives that box, she will put her message to and closes it
*  Diep receive the box, open it by his own key and read her message.

This way Binh can't read or change the message because he cannot open the key. The same process is followed when Diep wants to send Lan a message. 

Lan and Diep was used [Asymmetric key algorithm](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/). It means, even you are person who encrypt message, but you cannot decrypt it. As this algorithm mentions, the box is known as the **public key**, and the key to open it is known as the **private key**.

## How do we trust the box ? 

Currently, it's not really safe. Do Lan knows that box is came from Diep, but not Binh, with his own box ( and key ) ? Diep will decide to sign the box, it means when Lan receives the box, she will check the signature and knows that it come from Diep, not Binh. 

But, how could Lan find out Diep's signature in the first ? So they choose a middleman - Nguyen Van A will sign the box. 

Who is A ? A is a very famous, prestige and trustworthy man. A will give his signature to them and it means they must be legitimate people, too. 

A is only sign if he knows that is Diep's asking and his box. So Binh cannot get Diep's box signed by A on behalf of him, he will immediately knows that the box is fake because A is only signs box for indentified people. 

A is technically called [Certification Authority](https://en.wikipedia.org/wiki/Certificate_authority). So when you connect to a website, from the first time, you trust its box because you trust A and A tells you this box is legit. 

## Wait, is it bulky ? 

Until now,  Lan and Diep has strong, reliable system to send their love, but they realize that pigeons carrying the box are much more slower than the one which only carrying the message. So they decide that they will use the box method (asymmetric cryptography) only to choose a key to encrypt the message using symmetric cryptography with.

This way will use both the reliability of asymmetric algorithm and the efficiency of symmetric algorithm. 

In technical, nonetheless, encrypting messages using asymmetric cryptography is slower than using symmetric cryptography, so we only use it to exchange the encryption keys.

That's how HTTPS works. Have fun : ).