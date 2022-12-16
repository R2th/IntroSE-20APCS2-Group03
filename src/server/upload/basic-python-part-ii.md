In part 1, I already introduce all of you with some basic information relate to Python programing.
Now I continue to show some basic with Python: Class and Object
## Classes & Objects
**Definition:**
**Object** is a representation of real world objects such as cars, dogs or bicycles. Objects include two main characteristics: data and behavior.

They have the following data: door number, gearbox number and seat. They can also perform actions such as accelerating, stopping, displaying the remaining fuel ...

We define data as attributes and behaviors as methods in object-oriented programming:

Data → Attributes and Behaviors → Methods

A **class** is a design from which individual objects are created. In the real world, we often find many objects of the same type as cars.

All the same designs and models (and all have a motor, wheels, door, etc).

Each car is built from the same set of designs and has the same components.

## Object-oriented programming in Python
Python, as an object-oriented programming language, should have the concepts of Class and Object.

A class is a detailed design, a model for its objects.

A class defines attributes and behaviors (check theoretical section above).

Example a **Car** class has its own attributes to determine which objects are vehicles. The number of wheels, fuel tanks, capacity and maximum speed are all attributes of a vehicle.

With this in mind, consider the Python syntax for car classes:
```
class Vehicle:
    pass
```

We define a Vehicle class by the class name of the class.

Objects are instances of a class. We create an object by placing:
```
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x8fb1ae6c4567>
```
Here car is an object of the Vehicle class.

Remember that our Vehicle class has four attributes: the number of wheels, the capacity, the tank type and the maximum speed

We will set all of these attributes when creating car objects.

Here, we define the class to receive data when it initializes it:
```
class Vehicle:
    def __init__(self, wheels, tank, seats, maximum_velocity):
        self.wheels = wheels
        self.tank = tank
        self.seats = seats
        self.maximum_velocity = maximum_velocity
```
We will use the init method and call it the constructor.

So, when we create the Object Object, we can define these attributes.

Imagine that we like Toyota model, and we want to create this type of object.

It has four wheels, powered by electric power, has five seats, and a top speed of 300km/h.
```
toyota_model = Vehicle(4, 'electric', 4, 300)
```
Four wheel + consumption type is electric + four seats + maximum speed is 300km / h.

All properties are set.

But how can we access the values of these attributes?

We send a message to the subject asking about them.

We call it a method. That is the behavior of the object.
```
class Vehicle:
    def __init__(self, wheels, tank, seats, maximum_velocity):
        self.wheels = wheels
        self.tank = tank
        self.seats = seats
        self.maximum_velocity = maximum_velocity

    def number_of_wheels(self):
        return self.wheels

    def set_number_of_wheels(self, number):
        self.wheels = number
```
This is the implementation of two methods: numberofwheels and set_number_of_wheels . We will call it **getter & setter**.

Because the first value receives its attribute value and the second value is the new setting value for the attribute.

In Python, we can do that using @property to define **getters** and **setters** . Let's look at it with code:
```
class Vehicle:
    def __init__(self, wheels, tank, seats, maximum_velocity):
        self.wheels = wheels
        self.tank = tank
        self.seats = seats
        self.maximum_velocity = maximum_velocity

    @property
    def number_of_wheels(self):
        return self.wheels

    @number_of_wheels.setter
    def number_of_wheels(self, number):
        self.wheels = number
```
And we can use these methods as attributes:
```
toyota_model = Vehicle(4, 'electric', 5, 250)
print(toyota_model.wheels) # 4
toyota_model.wheels = 2 # setting number of wheels to 2
print(toyota_model.wheels) # 2
```
This is slightly different from the usual method.

These methods work as attributes.

For example, when we put new wheels, we do not apply two as parameters, but set the value 2 to numberofwheels . This is a way to write the **getter** and **setter** code .

But we can also use methods for other things, like the " makenoise " method. Let's check it:
```
class Vehicle:
    def __init__(self, wheels, tank, seats, maximum_velocity):
        self.wheels = wheels
        self.tank = tank
        self.seats = seats
        self.maximum_velocity = maximum_velocity

    def make_noise(self):
        print('VRUUUUUUUM')
```
When we call this method, it just returns a String "VRRRRUUUUM."
```
toyota_model = Vehicle(4, 'electric', 5, 250)
toyota_model.make_noise() # VRUUUUUUUM
```