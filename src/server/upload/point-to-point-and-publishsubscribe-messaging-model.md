**Origin source: https://www.programmingsharing.com/point-to-point-and-publish-subscribe-messaging-model/**

**Follow us on twitter: http://twitter.com/progsharing**

**Follow us on facebook: https://www.facebook.com/programmingsharing**

In modern software architecture, the application needs to be decoupled, high scalability, serving high performance. Messaging service come in allows us to build that kind of application. Therefore with a solid understanding of messaging models is the key to build an effective system. There are two commonly messaging models, the point-to-point and the publish/subscribe model. Both of these messaging models are based on the message queue know as a central place to send messages to or place to get the message from. The sent messages are ordered in the message queue except it has higher priority. In basically, the message will be processed following the first-in-fist-out.


![](https://images.viblo.asia/e1e26f91-7361-4cd0-a6a0-84449578104e.png)

## Point-to-Point Messaging Model
In the point-to-point model, the message sent from the message sender to only one receiver even if many message receivers are listening in the same message queue. In the point-to-point model, the terms message sender and message receiver are usually applied rather than message publisher and message consumer. To illustrate, I have created a simple figure below.

![](https://images.viblo.asia/7621ed0f-a1fc-48ba-bd70-6a709b364d38.png)

There are two types of point-to-point messaging, fire-and-forget(one-way) messaging and request/reply(request-response) messaging. The difference between fire-and-forget and request/reply is how the message sender cares about the status of the sending message.

### Fire-and-forget
In fire-and-forget, the message sender does not wait for any response from the message queue. It doesn’t care did the message queue receive the message or not. In this model, the Originator and the Recipient would have no interaction at all.

### The request/reply messaging model.
Different from the fire-and-forget mode, in the request/reply messaging model, the message sender sends a message on one queue, and then it waits for the response from the receiver. with this model, the send cares about the message status that’s it received or not yet.

![](https://images.viblo.asia/27dcf27f-f717-40cf-ba0c-1133d86aa305.png)

## Publish/Subscribe Messaging model
The Publish/Subscribe Messaging or normally called pub/sub messaging is a form of asynchronous. In this domain, the message producers are called publishers and the message consumers are called subscribers. The publisher produces messages to a topic then all subscribers which subscribed to that topic will receive the sending messages and consume them. The difference between the point-to-point and publish/subscribe messaging model is how many receivers for a message. Another difference is in the point-to-point model, the message sender must know the receiver but in the publish/subscribe the message publishers do not need to know where the message will be consumed. This characteristic provides a high decoupling for the application when applying the publish/subscribe message model.

![](https://images.viblo.asia/d05461f0-ea55-4275-9b6f-9223ccdc81d8.png)

## Conclusion
Through this article, I have introduced you to common messaging models and I hope that will help you have a solid understanding of messaging services that have a good choice when trying to applying it to your application.