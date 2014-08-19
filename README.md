# Constant Equals

[Timing attacks](http://codahale.com/a-lesson-in-timing-attacks/) are a real threat. A very common pitfall is to compare strings with `===`.

## Why?
Simply because `a === b` will take more time to execute if they share a bigger prefix. So checking the user input against a target password with `===` will leak how much the attacker got the password right:

![bench](https://raw.githubusercontent.com/sitegui/constant-equals/master/bench.png)

You can run [the code](https://github.com/sitegui/constant-equals/blob/master/bench.js) yourself.

## The solution
Make a for that checks every character. Don't try to be smart here :)

## Install
`npm install constant-equals --save`

## Usage
```javascript
var a = 'a-user-input',
	g = 'target-password',
	eq = require('constant-equals')
if (eq(a, b)) {
	console.log('Welcome')
} else {
	console.log('Go away!')
}
```

`eq()` doesn't do any kind of type conversion, so `eq('12', 12) === false`.

## Arrays
`eq()` also works for a pair of arrays:
```javascript
eq(['a', 'array', 'of', 5, 'tags'], ['a', 'array', 'of', 5, 'tags']) === true
```

## NOTE
You should never, ever, store user passwords in plain text. If you think about doing so, you should problably look for modules like [bcrypt](https://www.npmjs.org/package/bcrypt)
