Most of my previous articles are about NLP where we are on the road of building a Khmer spelling checker and  I am pretty sure that you are bored with it.  Therefore, in this article, we are going to build a toy project to refresh our self. This project is about using OpenCV to solve one the popular Japanese puzzle game Sudoku called "[Sudoku](https://sudoku.com/)".  Awesome, let's get started.

#### Plan of attack
The Sudoku that we are going to solve is a 9X9  Sudoku and digital printed numbers. And there are steps where we are going to use for this project:
- Build a Sudoku solver algorithm
- Use OpenCV to read blocks of Sudoku from image
- Recognize the number in the block 
- Use the algorithm to solve the puzzle
- Fill the result on the image

#### Let's Rock it
**1. Sudoku solver algorithm**

We are going to use the algorithm written by Peter Norvig in his [article] (https://norvig.com/sudoku.html) where he wrote a very good detail about his algorithm. So we just re-implement it here.
```
#sudoku.py
import recognize

digits = '123456789'
rows = 'ABCDEFGHI'
cols = digits

def cross(A,B):
    return [a + b for a in A for b in B]

squares = cross(rows, cols)

unitlist = ([cross(rows, c) for c in cols] +
            [cross(r, cols) for r in rows] +
            [cross(rs, cs) for rs in ('ABC','DEF','GHI') for cs in ('123','456','789')])

units = dict((s, [u for u in unitlist if s in u]) for s in squares)
peers = dict((s, set(sum(units[s],[]))-set([s])) for s in squares)

class Sudoku:
  def __init__(self, blocks, image):
    self._initBlock(blocks, image)

  def _initBlock(self, blocks, image):
    index = 0
    self.blocks = {}
    recognizer = recognize.Recognize()
    for c in cols:
      for r in rows:
        self.blocks[r+c] = {}
        self.blocks[r+c]['block'] = blocks[index]
        x,y,w,h = blocks[index]
        block_num = image[y+5:y + h-5, x+5:x + w-5]
        num = recognizer.recognizing(block_num)
        self.blocks[r+c]['value'] = num
        self.blocks[r+c]['is_show'] = True
        if num != 0:
            self.blocks[r+c]['is_show'] = False
        index += 1

  def toString(self):
    test_str = ''
    for r in rows:
      for c in cols:
        num = self.blocks[r+c]['value']
        test_str += str(num)
    return test_str

  ...
  ...

  def assign(self, values, s, d):
    """Eliminate all the other values (except d) from values[s] and propagate.
      ...
     if all(self.eliminate(values, s, d2) ...
     ...
     
  def eliminate(self, values, s, d):
    """Eliminate d from values[s]; propagate when values or places <= 2.
    ...
    ...
    return values

  def search(self, values):
    "Using depth-first search and propagation, try all possible values."
    ...

  def some(self, seq):
    "Return some element of seq that is true."
    ...

  def result(self):
    # "Display these values as a 2-D grid."
    values = self.parse_grid(self.toString())
    values = self.search(values)
    if not values:
        print('Cannot solve')
        return False
    for block in values.items():
      key, value = block
      self.blocks[key]['value'] = value
      # print (self.blocks[key])
    return True

```
This python class receives the array blocks of Sudoku in the image with its value. And it will fill the block with a missing value. You can learn more about this algorithm from [here](https://norvig.com/sudoku.html).

**2. OpenCV implementation**

First, we use OpenCV to check whether Sudoku block exists in the image or not. OpenCV has method `findContours` where it allows us to find the joining all the continuous points in the image and in our case the square box in the image. Once we get the box in image, we will check if in that box contain small 81 blocks or not. If it has, it means the image contains the Sudoku board. So we can return those block for recognizing the number inside it later.
```python
import numpy as np
import cv2

def getSudoKublocks(image):
  # init the color range(between the color set to white else to black)
  # turn it base on you image condition
  colorLower = np.array([0, 0, 0], dtype="uint8")
  colorUpper = np.array([150, 150, 150], dtype="uint8")
  gray = cv2.inRange(image, colorLower, colorUpper)

  #count tour
  (_,cnts, _) = cv2.findContours(gray.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  sort_cnts = sorted(cnts, key = cv2.contourArea, reverse = True)
  sudoBlock = None

  index = 0
  blocks = []

  while True:
    blocks = []

    if index == 0:
      boxH, boxW = image.shape[:2]
    else:
      _,_,boxW, boxH = cv2.boundingRect(sort_cnts[index])

    # calculate max/min of each sudoku blocks
    maxBoxH = (boxH / 9) + (boxH / 9 * 0.2)
    minBoxH = (boxH / 9) - (boxH / 9 * 0.2)
    maxBoxW = (boxW / 9) + (boxW / 9 * 0.2)
    minBoxW = (boxW / 9) - (boxW / 9 * 0.2)

    count = 0
    # loop over our contours
    for c in cnts:
      # approximate the contour
      peri = cv2.arcLength(c, True)
      approx = cv2.approxPolyDP(c, 0.02 * peri, True)
      (x, y, w, h) = cv2.boundingRect(c)

      # if our approximated contour has four points,
      # and its width and height is in range
      # then we can assume that we have found sudoku block
      if (len(approx) == 4) and (w >= minBoxW and w <= maxBoxW) and (h >= minBoxH and h <= maxBoxH):
        blocks.append([x, y, w, h])

    index += 1

    # exit loop
    if index >= 5 or len(blocks) == 81 or len(sort_cnts) <= index:
      break

  #order the block by its position
  blocks = sorted(blocks, reverse = False)
  print(len(blocks))

  if len(blocks) != 81:
    return False
  else:
    return sorted(blocks)

```
Then we could pass the block in the algorithm where we just implemented above.
```
...
# get sudoku block
blocks = board_reader.getSudoKublocks(image)
if blocks == False:
    print('Cannot read sudoku')
    return

  sudokuer = sudoku.Sudoku(blocks, image)
...
```
In the inited class `Sudoku`, we recognize the image in the block where we will mark value = 0 if no number in the block.
Lucky in python OpenCV V3,  it comes up with build in machine learning algorithm where we can use it to build a digit number recognition model. For our case, we will use KNearest algorithm provided by OpenCV.

```python
#recognize.py
import cv2
import numpy as np

class Recognize:
  def __init__(self):
    #######   training part    ###############
    samples = np.loadtxt('generalsamples.data',np.float32)
    responses = np.loadtxt('generalresponses.data',np.float32)
    responses = responses.reshape((responses.size,1))

    self.model = cv2.ml.KNearest_create()
    self.model.train(samples, cv2.ml.ROW_SAMPLE, responses)

  ############################# testing part  #########################
  def recognizing(self, image):
    image = cv2.resize(image,(50,50))
    out = np.zeros(image.shape,np.uint8)
    gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(gray,255,1,1,11,2)

    _, contours,hierarchy = cv2.findContours(thresh,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)

    for cnt in contours:
      if cv2.contourArea(cnt)>50:
          [x,y,w,h] = cv2.boundingRect(cnt)
          if  h>28:
              roi = thresh[y:y+h,x:x+w]
              roismall = cv2.resize(roi,(10,10))
              roismall = roismall.reshape((1,100))
              roismall = np.float32(roismall)
              retval, results, neigh_resp, dists = self.model.findNearest(roismall, k = 1)
              return str(int((results[0][0])))
    return 0
```
In the `Recognize` class we train our model with an image of numbers from 0-9 by running the code in `train.py`.
In `train.py`, we train our model with exists numbers and then we save the model for later use in `Recognize`.
```python
import numpy as np
import cv2

im = cv2.imread('images/sudoku_an.png')
im = cv2.resize(im,(500,500))
im3 = im.copy()

gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray,(5,5),0)
thresh = cv2.adaptiveThreshold(blur,255,1,1,11,2)

#################      Now finding Contours         ###################

_, contours,hierarchy = cv2.findContours(thresh,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)

samples =  np.empty((0,100))
responses = []
keys = [i for i in range(48,58)]

for cnt in contours:
    if cv2.contourArea(cnt)>50:
        [x,y,w,h] = cv2.boundingRect(cnt)

        if  h>28:
            cv2.rectangle(im,(x,y),(x+w,y+h),(0,0,255),2)
            roi = thresh[y:y+h,x:x+w]
            roismall = cv2.resize(roi,(10,10))
            cv2.imshow('norm',im)
            key = cv2.waitKey(0)

            if key == 27:  # (escape to quit)
                sys.exit()
            elif key in keys:
                responses.append(int(chr(key)))
                sample = roismall.reshape((1,100))
                samples = np.append(samples,sample,0)

responses = np.array(responses,np.float32)
responses = responses.reshape((responses.size,1))
print("training complete")

np.savetxt('generalsamples.data',samples)
np.savetxt('generalresponses.data',responses)
```

All done, let run our code.
**3. Testing**

```sh
python sudoku_solver.py -i images/dataset-original.png
```
![](https://images.viblo.asia/b3b120c2-3af6-439a-8b01-3b234450d2cf.png)

And why not with my webcam.
```sh
python sudoku_solver_web.py
```
{@embed: https://www.youtube.com/watch?v=2BZu5aPW86U}
Awesome.
#### Resources
- [Source code](https://github.com/RathanakSreang/sudoku_solver)
- https://sudoku.com/
- https://norvig.com/sudoku.html
- https://opencv.org/

#### What's next?
Cool, we've done it. However, there are many places that you can improve on it such as it able to recognize the handwritten numbers and many more. Moreover, there are lots of fun thing we can play with Computer Vision and the only limitation is your imagination. :)