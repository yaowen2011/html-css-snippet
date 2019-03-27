## 
- https://tutorialzine.com/2014/12/learn-regular-expressions-in-20-minutes
- matching/validating
```js
text.math(/\bh\w+/ig) // 返回匹配到的数组
/https?:\/\/[\w\/?.&-=]+/.test()
```
- search and replace
```js
var text = 'Abc ddefg, hijk lllll mnopqr ssss. Tuv wxyyy z.'
var sameLetterRegex = /\b(\w)\1*\b/g
console.log( text.match(sameLetterRegex) )

// 
var name = 'Jhon Smith'
var nameRegex = /(\w+) (\w+)/
console.log( name.replace(nameRegex, '$2, $1'))

var upcasename = name.replace(nameRegex, function(string, group1, group2){
    return group2.toUpperCase() + ', ' + group1;
});
```