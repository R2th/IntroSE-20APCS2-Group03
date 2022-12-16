In my previous articles, we talk about how to detect features of human faces such as eyes, nose, and mouth, and other post about image watermarking where we put one image on top of other image as sign of ownership. Today, we are going to combine these two articles to develop a very fun application call "Face Mask".

### Plan of attack
Face Mask is an application that detect faces from  webcam then we add glasses and mustache to faces. There are three steps for implementing this application:


**1. Find Face and its features** to be able to add glasses and mustache on faces,  we need to locate face in the given image/video first. Luckily, in my article [OpenCV: It's about face](https://viblo.asia/p/opencv-its-about-face-07LKXBVElV4) we can easily get faces from image or video stream and detect its features as well.

**2. Get eyes, mouth area** once we found faces and its features, we can get the location of eyes area and mouth area where we will apply images glasses and mustache on that area.


**3. Add glass and mustache** this step, we are going to add  image of mustache and glasses to the face. For adding image on one another, we can use watermarking technique where I wrote my previous article "[OpenCV: Watermarking image](https://viblo.asia/p/opencv-watermarking-image-1VgZv4or5Aw)".

Let's rock it.

### Implementation

First, let's implement code for detect faces where we are using OpenCV and dlib to find faces and its feature in the given images/videos.
```python
#face_mask.py
from imutils.video import VideoStream
from imutils import face_utils
import imutils
import time
import cv2
import dlib

print("[INFO] loading facial landmark predictor...")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

print("[INFO] camera sensor warming up...")
vs = VideoStream(0, framerate = 30).start()
time.sleep(2.0)

# loop over the frames from the video stream
while True:
    # grayscale
    frame = vs.read()
    frame = imutils.resize(frame, height=550)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
     # detect faces in the grayayscale frame
    rects = detector(gray, 0)

    # loopop over found faces
    for rect in rects:
        shape = predictor(frame, rect)
        shape = face_utils.shape_to_np(shape)

        for (i, (x, y)) in enumerate(shape):
            # face features number
            print(i)
            print(x)
            print(y)
     
    key = cv2.waitKey(1) & 0xFF
     # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

    # show the frame
    cv2.imshow("Face Mask", frame)

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
```

Next, let's grab eyes and mouth's area by features numbers. As our printed above we found that:
- Left eye is at feature number 37.
- Right eye is at feature number 46.
- Top eye is at feature number 38.
- Bottom eye is at feature number 48.

And:
- Left mouth is at feature number 2.
- Right mouth is at feature number 16.
- Top mouth is at feature number 2.
- Bottom mouth is at feature number 9.

And then we can calculate its position in image.
```python
#face_mask.py
...
...
# loop over the frames from the video stream
while True:
        for (i, (x, y)) in enumerate(shape):
            if (i + 1) == 37:
                eyeLeftSide = x - 40
            if (i + 1) == 38:
                eyeTopSide = y - 30
            if (i + 1) == 46:
                eyeRightSide = x + 40
            if (i + 1) == 48:
                eyeBottomSide = y + 30

            if (i + 1) == 2:
                moustacheLeftSide = x
                moustacheTopSide = y - 10
            if (i + 1) == 16:
                moustacheRightSide = x
            if (i + 1) == 9:
                moustacheBottomSide = y

        eyesWidth= eyeRightSide - eyeLeftSide
        if eyesWidth < 0:
            eyesWidth = eyesWidth * -1
        # add glasses
        fitedGlass = imutils.resize(glass, width=eyesWidth)

        moustacheWidth= moustacheRightSide - moustacheLeftSide
        if moustacheWidth < 0:
            moustacheWidth = moustacheWidth * -1
        # add moustache
        fitedMoustache = imutils.resize(moustache, width=moustacheWidth)
...
...
```

Then we are going to implement watermark function, so that we can merge those image together.
```python
#watermarking.py
import cv2
import numpy as np

def transparentOverlay(src, overlay, x, y, scale=1):
    src = src.copy()
    overlay = cv2.resize(overlay, (0, 0), fx=scale, fy=scale)
    h, w, _ = overlay.shape  # Size of foreground
    rows, cols, _ = src.shape  # Size of background Image

    # loop over all pixels and apply the blending equation
    for i in range(h):
        for j in range(w):
            if y + i >= rows or x + j >= cols:
                continue
            alpha = float(overlay[i][j][3] / 255.0)  # read the alpha channel
            src[y + i][x + j] = alpha * overlay[i][j][:3] + (1 - alpha) * src[y + i][x + j]
    return src

def watermarking(original, watermarked, alpha = 1, x=0, y=0):
  overlay = transparentOverlay(original, watermarked, x, y)
  output = original.copy()
  cv2.addWeighted(overlay, 1, output, 1 - 1, 0, output)
  return output
```

Finally, we use the watermark method to add glasses and mustache into our video frame.

```python
#face_mask.py
...
import dlib
from watermarking import watermarking
...
...
# load glasses and mustache
glasses = cv2.imread("data/glass5.png", cv2.IMREAD_UNCHANGED)
moustache = cv2.imread("data/moustache.png", cv2.IMREAD_UNCHANGED)

# loop over the frames from the video stream
while True:
    ...
    ...
    for rect in rects:
       fitedGlass = imutils.resize(glass, width=eyesWidth)
       fitedMoustache = imutils.resize(moustache, width=moustacheWidth)
       frame = watermarking(frame, fitedGlass, x= eyeLeftSide, y= eyeTopSide)
       frame = watermarking(frame, fitedMoustache, x= moustacheLeftSide, y= moustacheTopSide)
    
   ...
   cv2.imshow("Face Mask", frame)
   ...
```

Our code now complete, now let's see it in action.
```
python face_mask.py
```
{@embed: https://www.youtube.com/watch?v=wPU3VnhMIsI&feature=youtu.be}

Awesome.
### Resources
- [Source code](https://github.com/RathanakSreang/opencv-face/blob/master/face_mask.py)
- https://viblo.asia/p/opencv-watermarking-image-1VgZv4or5Aw
- https://viblo.asia/p/opencv-its-about-face-07LKXBVElV4
- https://www.pyimagesearch.com/2016/04/25/watermarking-images-with-opencv-and-python/
- https://www.life2coding.com/how-to-add-logo-or-image-watermark-on-images-with-opencv-python/

### What's next
By just combining two techniques(face detection and image watermarking), we just implemented a fun application called "Face Mask". It's your turn to customize this application or use it as example for developing your next awesome computer vision applications.  Let's rock it.