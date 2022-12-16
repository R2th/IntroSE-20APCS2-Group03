> “WebRTC won’t replace the existing legacy VoIP infrastructure but the application will provide real-time peer-to-peer video and voice communication where the standard carrier network isn’t capable”.

To make you understand how WebRTC and SIP together are used pretty great here’s some application that enhances the WebRTC and SIP technology to deliver some great applications used by millions.

## The Power of WebRTC and SIP Technologies
**Google  Hangouts**
It offers SMS, video conferencing, phone calls and messaging capability within all the browsers and application platforms.

**Discord**
It’s a group voice call and uses WebRTC to support in-app messaging and unlimited calls. To your knowledge, discord serves 14,000,000 callers per day.

**Facebook Messenger**
The messenger app is integrated with WebRTC to offer calling functionality better than the normal VoIP services. Facebook has upgraded the WebRTC technology to offer more than just calls to offer video calls as an act of multimedia interactivity.

### Understanding SIP and WebRTC Technologies
WebRTC signaling provides an easy browser to browser communication platform without using any separate plugin that provides excellent voice and video communications in a seamless way. Also, WebRTC signaling is an open-source platform that provides the media communication to work within the website pages. In 2016 it was estimated that the number of web applications that embedded WebRTC into their browsers is around 2 billion which is a significant number. Though WebRTC integrates SIP protocol for audio/video communications it can be used to do much more functionality.
![](https://images.viblo.asia/79830372-828d-4f1a-a7be-a24d60bd0d47.png)


A SIP user typically accesses these SIP services usually through a VoIP which is accessed either through a mobile application or a PC. In WebRTC, the users access the WebRTC services like the WebRTC text chat for android or any other services in a traditional browser.
![](https://images.viblo.asia/f19f77c9-b046-4b51-9739-2997936be73f.png)


Whereas SIP is a signaling protocol which is mainly used for voice and video calling, WebRTC provides a more versatile option to the end-user which offers SDKs to build powerful mobile applications as well as web applications so the users can literally implement it anywhere. Apart from WebRTC video call in android phone or WebRTC voice chats in an iOS phone is made possible by the portable source code of WebRTC and it also provides webinars no matter where the client and the user are geographically put up!

### Why SIP Needed?
Though there are several signaling methods, SIP has several benefits over their counterparts. Let us briefly look into some of the advantages of SIP protocol.

**Compatibility**
 As SIP is an open standard it is compatible with most of the devices including but not limited to desk phones, tablets, laptops, and much more devices

**Augmented Efficiency**
 SIP facilitates the augmented reality, which is gaining popularity in recent times. Augmented reality successfully implements the virtual image over the real world object that receives the input either through smart glasses or camera.

**Scalability**
 According to the “Journal of Computer and System Services” from Elsevier, SIP protocol is accepted as one of the promising signaling protocols which offer great flexibility, scalability which has built-in security features that increases the overall performance of the real-time communication irrespective of the n number of users.

**Provides Easy Readability**
 SIP packets are easily readable and it is simple to debug as well which efficiently controls the new services in a better way.

**Cost-Effective solution**
- The SIP setup fees with new phone lines and porting fees is comparatively low when compared to other signaling protocols. This makes the SIP protocol a more affordable solution. Also with cloud SIP trunking, there is no upfront investment is necessary where it does not require any legacy telephone lines in order to connect any public or private network.

### How SIP Protocol Works?
Basically, SIP is the backbone of any VoIP technology which became the recent household name for all kinds of telephony devices right from desktop phones, softphones to smartphones as well. SIP was not only used for audio/video calls but also designed to streamline any other kind of communications like configuring a gaming session or operating a coffee vending machine and so on. SIP basically contains three types of components for any call flow.

**User Agents**
When a user calls through any VoIP applications either through a software application or VoIP phone, the users communicate with the help of VoIP getaways through an application server or through any public switched network(PSTN)

**Proxies**
Next, the role of a proxy is to perform a certain logic where these proxies may either forward or reject a request according to the user’s profile.

**Registrar Servers**
The sole purpose of the registrar server is to combine the current IP address to that of the user’s VoIP address and also helps to maintain the location database.
Also, apart from these components, the three most common type of SIP requests are,

* REGISTER
* INVITE
* BYE
As the name indicates the functionality of these requests are pretty straightforward where the REGISTER requests indicates the SIP server, the SIP’s phone location address so that it can easily forward the request to the appropriate location. The INVITE request indicates the dialogue initiation between two users and finally, BYE request is the termination of this dialogue.
![](https://images.viblo.asia/1e6914d8-ba9f-4e9c-b2e9-7d47d697fda9.png)

### So What does SIP Actually Have to do with WebRTC?
WebRTC is related to all the scenarios happening in SIP. Just like SIP, it creates the media session between two IP connected endpoints and uses RTP (Real-time Transport Protocol) for connection in the media plane once the signaling is done. It uses SDP (Session Description Protocol) for describing the streaming media communication parameters.

**The WebRTC differs in Two Key areas:**
WebRTC doesn’t mandate the usage of SIP messages in the signaling plane, instead of the actual signaling i.e., sending and receiving of SDP messages is dependent on the application.

**It also uses some optional SIP features in the media plane:**
* The use of specific codes namely G.711 for audio and H.264 are required for video.
* Use of SRTP (Secure Real-time Transport Protocol) to provide maximum encryption & message authentication for media packets.
* It uses the Session Traversal Utilities for NAT and (STUN, TURN & ICE) for network traversal.
Before putting the points on whether the differences exist or applicable, let us take a look at the different ways to achieve it.

**The Signalling Plane**
Working on the assumption that your existing SIP infrastructure isn’t going to switch to a different signaling protocol, then the WebRTC has to make progress.

Here are the two ways to achieve this:

* Ensure to use SIP as your signaling stack for the WebRTC enabled applications.
* You can also use another signaling solution for your WebRTC enabled application. Make sure to add a signaling gateway to translate between the SIP and the current signaling.
![](https://images.viblo.asia/8f473cbb-bf1e-426d-8e5c-1e3ebe76002c.png)
**The Media Plane**
In order to integrate the SIP protocol into the WebRTC applications , if there is an already existing SIP infrastructure then we must add an additional media gateway known as Session Border Controller that enacts as a gateway between WebRTC and VoIP endpoints or if there is no SIP infrastructure then choosing a WebRTC compatible SIP technology which has many SIP gateways and SIP trunking services is an optimal solution.

The option you may choose completely depends on your existing infrastructure and your business idea in expanding it.

So do you have any existing SIP infrastructure?
* To scale your WebRTC connection, do you have an SFU (Selective Forwarding Unit) or MCU (Multipoint Control Unit)?
* On which platform does your application that you want to integrate runs?
* Do you have any SIP signaling stack that runs on your preferred platform?
* So choosing the right path to the solution is heavily dependent on the answer to these questions.

Orginally Published at  [Mirrorfly Blog ](https://blog.mirrorfly.com/sip-protocol-with-webrtc-application/)