# MERN Stack

**Node.js**: a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js brings JavaScript to the server.
**MongoDB**: a document-based open source database
**Express.js**: a fast, unopinionated, minimalist web framework for Node.js
**React.js**: a JavaScript front-end library for building user interfaces 

# React.js

Notes obtained form [Codecademy Learn React.js: Part I](https://www.codecademy.com/learn/react-101)

## Why React?
React.js is a JavaScript library. It was developed by engineers at Facebook.

Here are just a few of the reasons why people choose to program with React:
* React is fast. Apps made in React can handle complex updates and still feel quick and responsive.
* React is modular. Instead of writing large, dense files of code, you can write many smaller, reusable files. React’s modularity can be a beautiful solution to JavaScript’s maintainability problems.
* React is scalable. Large programs that display a lot of changing data are where React performs best.
* React is flexible. You can use React for interesting projects that have nothing to do with making a web app. People are still figuring out React’s potential. There’s room to explore.
* React is popular. While this reason has admittedly little to do with React’s quality, the truth is that understanding React will make you more employable.

## JSX
JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.

**Nested JSX**: If a JSX expression takes up more than one line, then you must wrap the multi-line JSX expression in parentheses.

**JSX Outer Elements**: a JSX expression must have exactly one outermost element. The first opening tag and the final closing tag of a JSX expression must belong to the same JSX element!

## `ReactDOM.render()`

**ReactDOM** is the name of a JavaScript library. This library contains several React-specific methods, all of which deal with the DOM in some way or another.

ReactDOM‘s methods: `ReactDOM.render()`

`ReactDOM.render()` is the most common way to render JSX. It takes a JSX expression, creates a corresponding tree of DOM nodes, and adds that tree to the DOM. That is the way to make a JSX expression appear onscreen.

## Passing a Variable to `ReactDOM.render()`

`ReactDOM.render()`‘s first argument should evaluate to a JSX expression, it doesn’t have to literally be a JSX expression. webIt could also be a variable, so long as that variable evaluates to a JSX expression.

In JSX, you can’t use the word class! You have to use **className** instead because JSX gets translated into JavaScript, and class is a reserved word in JavaScript.
`<h1 className="big">Hey</h1>`

Use **{curly brackets}** to treat like Javascript and not HTML. They are markers that signal the beginning and end of a JavaScript injection into JSX, similar to the quotation marks that signal the boundaries of a string.

React Event Listeners: https://reactjs.org/docs/events.html#supported-events
An event listener attribute’s value should be a function.

Here’s a rule that you need to know: **you cannot inject an if statement into a JSX expression**.

## JSX Conditionals: The Ternary Operator
Recall how it works: you write x ? y : z, where x, y, and z are all JavaScript expressions. When your code is executed, x is evaluated as either “truthy” or “falsy.” If x is truthy, then the entire ternary operator returns y. If x is falsy, then the entire ternary operator returns z. Here’s a nice explanation if you need a refresher.
```javascript
const headline = (
  <h1>
    { age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
  </h1>
);
```

## `.map` in JSX
The array method .map() comes up often in React. If you want to create a list of JSX elements, then .map() is often your best bet.
```javascript
const strings = ['Home', 'Shop', 'About Me'];
const listItems = strings.map(string => <li>{string}</li>);
<ul>{listItems}</ul>
```

In the above example, we start out with an array of strings. We call `.map()` on this array of strings, and the `.map()`call returns a new array of `<li>`s.
On the last line of the example, note that `{listItems}` will evaluate to an array, because it’s the returned value of `.map()!` JSX `<li>`s don’t have to be in an array like this, but they can be.

## Keys
When you make a list in JSX, sometimes your list will need to include something called `keys`, a JSX attribute. The attribute’s name is `key`. The attribute’s value should be something unique, similar to an `id` attribute.

React uses them internally to keep track of lists. If you don’t use keys when you’re supposed to, React might accidentally scramble your list-items into the wrong order.

Not all lists need to have `keys`. A list needs `keys` if either of the following are true:

1. The list-items have memory from one render to the next. For instance, when a to-do list renders, each item must “remember” whether it was checked off. 
2. A list’s order might be shuffled. For instance, a list of search results might be shuffled from one render to the next.

If neither of these conditions are true, then you don’t have to worry about `keys`. If you aren’t sure then it never hurts to use them.
```javascript
const people = ['Rowe', 'Prevost', 'Gare'];

const peopleLis = people.map((person, i) =>
  <li key={"person_" + i}>{person}</li>
);
```

## `React.createElement`

```javascript
const h1 = <h1>Hello world</h1>;
```
Same as below:

```javascript
const h1 = React.createElement(
  "h1",
  null,
  "Hello, world"
);
```

## What’s a component?

A component is a small, reusable chunk of code that is responsible for one job. That job is often to render some HTML.

## `Import React`
`import React from 'react';`
This line of code creates a new variable. That variable’s name is React, and its value is a particular, imported JavaScript object:
```javascript
// create a variable named React:
import React from 'react';
// evaluate this variable and get a particular, imported JavaScript object:
React // { imported object properties here... }
```

This imported object contains methods that you need in order to use React. The object is called the React library.
You’ve already seen one of the methods contained in the React library: `React.createElement()`. Recall that when a JSX element is **compiled**, it transforms into a `React.createElement()` call.
For this reason, you have to import the React library, and save it in a variable named React, before you can use any JSX at all. `React.createElement()` must be available in order for JSX to work.

## `Import ReactDOM`
`import ReactDOM from 'react-dom';`

The methods imported from `'react-dom'` are meant for interacting with the DOM. You are already familiar with one of them: `ReactDOM.render()`.
The methods imported from `'react'` don’t deal with the DOM at all. They don’t engage directly with anything that isn’t part of React.
**To clarify**: the DOM is used in React applications, but it isn’t part of React. After all, the DOM is also used in countless non-React applications. Methods imported from `'react'` are only for pure React purposes, such as creating components or writing JSX elements.

## Create a Component Class
React component is a small, reusable chunk of code that is responsible for one job, which often involves rendering HTML. **Every component must come from a component class.**
A component class is like a factory that creates components. If you have a component class, then you can use that class to produce as many components as you want.
To make a component class, you use a base class from the React library: `React.Component`.

`React.Component` is a JavaScript class. To create your own component class, you must subclass `React.Component`. You can do this by using the syntax class `YourComponentNameGoesHere extends React.Component {}`.
`React.Component` is a class, which you must subclass in order to create a component class of your own. You also know `that React.Component` is a property on the object which was returned by `import React from 'react'`.

## Name a Component Class
Component class variable names must begin with capital letters!

### Component Class Instructions

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
 
class MyComponentClass extends React.Component {
 render() {
   return <h1>Hello world</h1>;
 }
}
 
ReactDOM.render(
 <MyComponentClass />,
 document.getElementById('app')
);
```

* On line 1, `import React from 'react'` creates a JavaScript object. This object contains properties that are needed to make React work, such as `React.createElement()` and `React.Component`.
* On line 2, `import ReactDOM from 'react-dom'` creates another JavaScript object. This object contains methods that help React interact with the DOM, such as `ReactDOM.render()`.
* On line 4, by subclassing `React.Component`, you create a new component class. This is not a component! A component class is more like a factory that produces components. When you start making components, each one will come from a component class.
* Whenever you create a component class, you need to give that component class a name. That name should be written in `UpperCamelCase`. In this case, your chosen name is `MyComponentClass`.

## The Render Function
A render method is a property whose name is `render(){}`, and whose value is a function. The term “render method” can refer to the entire property, or to just the function part.
A render method must contain a `return` statement. Usually, this `return` statement returns a JSX expression.

## Create a Component Instance
To make a React component, you write a JSX element. Instead of naming your JSX element something like h1 or div like you’ve done before, give it the same name as a component class.
JSX elements can be either HTML-like, or component instances. JSX uses capitalization to distinguish between the two! **That is the React-specific reason why component class names must begin with capital letters**.

## Put Logic in a Render Function
```javascript
class Random extends React.Component {
  render() {
    // First, some logic that must happen
    // before rendering:
    const n = Math.floor(Math.random() * 10 + 1);
    // Next, a return statement
    // using that logic:
    return <h1>The number is {n}!</h1>;
  }
}
```

In the above example, the line with the `const n` declaration needs to be in a method like `render()`. It should not be a part of the class declaration or else it will cause a syntax error.

The less simple answer is that `this` refers to the object on which this‘s enclosing method, in this case `.render()`, is called. 

## Use an Event Listener in a Component
In React, you define event handlers as methods on a component class.

## Components Interact
A React application can contain dozens, or even hundreds, of components. Each component might be small and relatively unremarkable on its own. When combined,they can form enormous, complex ecosystems of information.
What makes React special is the ways in which components interact. This unit is an introduction to **components interacting**.

## Require A File
If you use an  `import` statement, and the string at the end begins with either a dot or a slash, then `import` will treat that string as a filepath. `import` will follow that filepath, and import the file that it finds.

## `this.props`
Information that gets passed from one component to another is known as “props.”
Every component has something called `props`. A component’s `props` is an object that holds information about that component.

## Pass `props` to a Component
You can pass information to a React component by giving the component an attribute. 
`props` is the name of the object that stores passed-in information. `this.props` refers to that storage object. At the same time, each piece of passed-in information is called a `prop`. This means that `props` could refer to two pieces of passed-in information, or it could refer to the object that stores those pieces of information.

## `this.props.children`
If a component has more than one child between its JSX tags, then `this.props.children` will return those children in an array.

## `defaultProps`
The `defaultProps` property should be equal to an object.

## `this.props` Recap
* Passing a prop by giving an attribute to a component instance
* Accessing a passed-in prop via `this.props.prop-name`
* Displaying a prop
* Using a prop to make decisions about what to display
* Defining an event handler in a component class
* Passing an event handler as a prop
* Receiving a prop event handler and attaching it to an event listener
* Naming event handlers and event handler attributes according to convention
* `this.props.children`
* `getDefaultProps`

## `state`
Unlike `props`, a component’s `state` is not passed in from the outside. A component decides its own `state` and it should be declared inside of a constructor method. 
`this.state` should be equal to an object.
It is important to note that React components always have to call `super` in their constructors to be set up properly.

## Update state with this.setState
`this.setState()` takes two arguments: an object that will update the component’s state, and a callback. You basically never need the callback.

## Call `this.setState` from Another Function
The most common way to call `this.setState()` is to call a custom function that wraps a `this.setState()` call. 
For an in-depth explanation of this kind of binding trickery, begin with the React docs. For the less curious, just know that in React, whenever you define an event handler that uses this, you need to add `this.methodName = this.methodName.bind(this)` to your constructor function.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const green = '#39D1B4';
const yellow = '#FFD712';

class Toggle extends React.Component {

  constructor(props){
    super(props);
    this.state = { color:green };
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(){
    const newColor = this.state.color == green ? yellow : green;
    this.setState({color: newColor})
  }
  
  render() {
    return (
      <div style={{background: this.state.color}}>
        <h1>
          Change my color
        </h1>
        <button onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('app')
)
```
Think of `this.setState()` as actually being two things: `this.setState()`, immediately followed by `.render()`.

That is why you can’t call `this.setState()` from inside of the `.render()` method! `this.setState()` automatically calls `.render()`. If `.render()` calls `this.setState()`, then an infinite loop is created.


# Express.js
**Source**: https://expressjs.com/

* Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.



