## FUNCTION

```
var example = function() {
  // code to execute
}

var example = () => {
  // code to execute
}

var example = parameter1 => {
  // code to execute
}

example();


```

## ARRAY DAN OBJECT

Perbedaan Arrays dan Objects

arrays menggunakan numbered indexes.  
objects menggunakan named indexes.

## ARRAY

- Buat Array

```
  const points = new Array(40, 100, 1, 5, 25, 10);
  const points = [40, 100, 1, 5, 25, 10];
```

- Cek Tipe

```
  let type = typeof points;
```

- Lihat Isi

```
  let points = points[0];
```

- Lihat panjang

```
  let size = points.length;
```

- Join, toString, pop, concat, slice

```
const fruits = ["Banana", "Orange", "Apple", "Mango"];

//toString() >> gabungkan jadi string
let result = fruits.toString(); //Banana,Orange,Apple,Mango

//join >> join gabungkan
let result = fruits.join(" _ "); //Banana _ Orange _ Apple _ Mango

//pop >> hilangkan elemen terakhir
fruits.pop(); //The pop() method removes the last element from an array:

//lenght >> hitung panjang
let length = fruits.push("Kiwi"); //The push() method adds a new element to an array (at the end):

//concat >> menggabungkan
const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];
const myChildren = myGirls.concat(myBoys); //Cecilie,Lone,Emil,Tobias,Linus

//slice >> memotong
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus1 = fruits.slice(1); //Orange,Lemon,Apple,Mango
const citrus2 = fruits.slice(1,3); //Orange,Lemon

```

- Find, Include,indexOf

```
//mencari posisi indexOf >> trua false
const fruits = ["Apple", "Orange", "Apple", "Mango"];
let position = fruits.indexOf("Apple") + 1; //Apple is found in position 1

//mencari apakah ada >> true false
let mangoInclude = fruits.includes("Mango"); // is true

//mencari dan mengembalikan variable
const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);
function myFunction(value, index, array) {
return value > 18;
}
//25
```

FIND

Note that the function takes 3 arguments:
The item value,
The item index,
The array itself

- JavaScript Sorting Arrays

```
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
fruits.reverse();

//toSorted();
const months = ["Jan", "Feb", "Mar", "Apr"];
const sorted = months.toSorted();

//toReversed();
const months = ["Jan", "Feb", "Mar", "Apr"];
const reversed = months.toReversed();

//Numeric Sort
const points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});
```

- JavaScript Array Iteration

```
//Loop Contoh 1
// for >> Loop through the length of the array
let fish = [ "piranha", "barracuda", "cod", "eel" ];
for (let i = 0; i < fish.length; i++) {
	console.log(fish[i]);
}

//for of
let fruits = ["Apple", "Orange", "Plum"];
// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}

//for in
let arr = ["Apple", "Orange", "Pear"];
for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}

// forEach >> Print out each item in the array
fish.forEach(individualFish => {
	console.log(individualFish);
})

// map >> Print out each item in the array
let printFish = fish.map(individualFish => {
	console.log(individualFish);
});
```

```
//Loop Contoh 2
//forEach
const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach(myFunction);
function myFunction(value, index, array) {
  txt += value + "<br>";
}

//map
const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map(myFunction);
function myFunction(value, index, array) {
  return value * 2;
}

//filter
const numbers = [45, 4, 9, 16, 25];
const over18 = numbers.filter(myFunction);
function myFunction(value, index, array) {
  return value > 18;
}
```

```
//Loop Contoh 3
let seaCreatures = [ "shark", "whale", "squid", "starfish", "narwhal" ];

//FILTER
// Filter all creatures that start with "s" into a new list
let filteredList = seaCreatures.filter(creature => {
  return creature[0] === "s";
});

filteredList;
Output
[ 'shark', 'squid', 'starfish' ]

```

```
//FIND >> include
// Check if a given value is a cephalopod
const isCephalopod = cephalopod => {
	return [ "cuttlefish", "octopus" ].includes(cephalopod);
}

seaCreatures.find(isCephalopod);
Output
octopus
```

```
//reduce
const numbers = [45, 4, 9, 16, 25];
let sum = numbers.reduce(myFunction);

function myFunction(total, value, index, array) {
  return total + value;
}


//spread
const q1 = ["Jan", "Feb", "Mar"];
const q2 = ["Apr", "May", "Jun"];
const q3 = ["Jul", "Aug", "Sep"];
const q4 = ["Oct", "Nov", "May"];

const year = [...q1, ...q2, ...q3, ...q4];

```

```
//Contoh lagi
const array = [1, 2, 3, 4, 5];

const newArray = array.map((item, index, arr) => {
  console.log(`Value: ${item}, Index: ${index}, Array: ${arr}`);
  return item * 2;
});

console.log(newArray);

//OUTPUT
Value: 1, Index: 0, Array: 1,2,3,4,5
Value: 2, Index: 1, Array: 1,2,3,4,5
Value: 3, Index: 2, Array: 1,2,3,4,5
Value: 4, Index: 3, Array: 1,2,3,4,5
Value: 5, Index: 4, Array: 1,2,3,4,5
[2, 4, 6, 8, 10]
```

## OBJECT

- Creating

```
// Basic object syntax
var object = {
  key: 'value'
};

let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax

const car = {type:"Fiat", model:"500", color:"white"};
person.lastName;
person["lastName"];
```

- Method

Methods are stored in properties as function definitions.

```
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

- The "for..in" loop

```
for (key in object) {
  // executes the body for each key among object properties
}

let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}

```

## ARRAY OBJECT ======================

```
//CREATE
var myArray = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Peter"},
    {"id": 3, "name": "Harry"}
];
```

1.  FIND

```
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
```

The function is called for elements of the array, one after another:

item is the element.
index is its index.
array is the array itself.

```
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```

```
//FIND
// Get the Array item which matchs the id "2"
var result = myArray.find(item => item.id === 2);
console.log(result.name);  // Prints: Peter

//ADD >> PUSH
// Menambahkan objek ke dalam array:
const array = []; // Membuat array kosong
const objek = { nama: "John", umur: 30 };
array.push(objek); // Menambahkan objek ke dalam array

//GET
// Mengakses properti objek dalam array:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
console.log(array[0].nama); // Output: John
console.log(array[1].umur); // Output: 25

//UPDATE
//Mengubah properti objek dalam array:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
array[0].umur = 35;
console.log(array[0].umur); // Output: 35

//DELETE
//Menghapus objek dari array berdasarkan indeks:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
array.splice(0, 1); // Menghapus objek pertama dari array
console.log(array); // Output: [{ nama: "Jane", umur: 25 }]

//Menghapus objek dari array berdasarkan properti tertentu:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
const indeks = array.findIndex(objek => objek.nama === "John");
array.splice(indeks, 1); // Menghapus objek dengan nama "John"
console.log(array); // Output: [{ nama: "Jane", umur: 25 }]

```

2. MAP

```
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

```

//GET >> MAP
//Menggunakan metode map() untuk memanipulasi array objek:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
const newArray = array.map(objek => ({ ...objek, umur: objek.umur + 5 }));
console.log(newArray); // Output: [{ nama: "John", umur: 35 }, { nama: "Jane", umur: 30 }]

```

3. FILTER

```
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
```

```
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

```
//GET >> FILTER
//Menggunakan metode filter() untuk memfilter array objek berdasarkan kriteria tertentu:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
const newArray = array.filter(objek => objek.umur > 28);
console.log(newArray); // Output: [{ nama: "John", umur: 30 }]

//GET >> FIND
//metode find() untuk mencari objek dalam array berdasarkan kriteria tertentu:
const array = [
  { id: 1, nama: "John", umur: 30 },
  { id: 2, nama: "Jane", umur: 25 },
  { id: 3, nama: "Doe", umur: 35 }
];

// Mencari objek dengan nama "Jane"
const objekJane = array.find(objek => objek.nama === "Jane");
console.log(objekJane); // Output: { id: 2, nama: "Jane", umur: 25 }

// Mencari objek dengan umur di atas 30
const objekDiatas30 = array.find(objek => objek.umur > 30);
console.log(objekDiatas30); // Output: { id: 3, nama: "Doe", umur: 35 }

// Mencari objek dengan ID 1
const objekID1 = array.find(objek => objek.id === 1);
console.log(objekID1); // Output: { id: 1, nama: "John", umur: 30 }
```

4. LOOPING

```
const array = [
  { id: 1, nama: "John", umur: 30 },
  { id: 2, nama: "Jane", umur: 25 },
  { id: 3, nama: "Doe", umur: 35 }
];
```

```
//Menggunakan loop for:
// Mencari objek dengan nama "Jane" menggunakan loop for
let objekJane;
for (let i = 0; i < array.length; i++) {
  if (array[i].nama === "Jane") {
    objekJane = array[i];
    break; // Keluar dari loop jika objek ditemukan
  }
}
console.log(objekJane); // Output: { id: 2, nama: "Jane", umur: 25 }

```

```
//Menggunakan loop forEach:
// Mencari objek dengan umur di atas 30 menggunakan forEach
let objekDiatas30;
array.forEach(objek => {
if (objek.umur > 30) {
objekDiatas30 = objek;
return; // Keluar dari forEach jika objek ditemukan
}
});
console.log(objekDiatas30); // Output: { id: 3, nama: "Doe", umur: 35 }

```

```
//Menggunakan loop while:
// Mencari objek dengan ID 1 menggunakan loop while
let i = 0;
let objekID1;
while (i < array.length) {
  if (array[i].id === 1) {
    objekID1 = array[i];
    break; // Keluar dari loop jika objek ditemukan
  }
  i++;
}
console.log(objekID1); // Output: { id: 1, nama: "John", umur: 30 }

```

```
//menggunakan map
// Menambahkan 5 tahun pada umur setiap objek dalam array
const newArray = array.map(objek => {
return {
id: objek.id,
nama: objek.nama,
umur: objek.umur + 5
};
});

console.log(newArray);

//OUTPUT
[
{ id: 1, nama: 'John', umur: 35 },
{ id: 2, nama: 'Jane', umur: 30 },
{ id: 3, nama: 'Doe', umur: 40 }
]

//penggunaan ketiga parameter pada array objek
const newArray = array.map((item, index, arr) => {
  console.log(`Item: ${JSON.stringify(item)}, Index: ${index}, Array: ${JSON.stringify(arr)}`);
  return { ...item, umur: item.umur + 5 };
});

//OUTPUT
console.log(newArray);
Item: {"id":1,"nama":"John","umur":30}, Index: 0, Array: [{"id":1,"nama":"John","umur":30},{"id":2,"nama":"Jane","umur":25},{"id":3,"nama":"Doe","umur":35}]
Item: {"id":2,"nama":"Jane","umur":25}, Index: 1, Array: [{"id":1,"nama":"John","umur":30},{"id":2,"nama":"Jane","umur":25},{"id":3,"nama":"Doe","umur":35}]
Item: {"id":3,"nama":"Doe","umur":35}, Index: 2, Array: [{"id":1,"nama":"John","umur":30},{"id":2,"nama":"Jane","umur":25},{"id":3,"nama":"Doe","umur":35}]
[  { id: 1, nama: 'John', umur: 35 },  { id: 2, nama: 'Jane', umur: 30 },  { id: 3, nama: 'Doe', umur: 40 }]

```

Kesimpulan :

A cheat sheet of array methods:

To add/remove elements:

- push(...items) – adds items to the end,
- pop() – extracts an item from the end,
- shift() – extracts an item from the beginning,
- unshift(...items) – adds items to the beginning.
- splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items.
- slice(start, end) – creates a new array, copies elements from index start till end (not inclusive) into it.
- concat(...items) – returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.

To search among elements:

- indexOf/lastIndexOf(item, pos) – look for item starting from position pos, return the index or -1 if not found.
- includes(value) – returns true if the array has value, otherwise false.
- find/filter(func) – filter elements through the function, return first/all values that make it return true.
- findIndex is like find, but returns the index instead of a value.

To iterate over elements:

- forEach(func) – calls func for every element, does not return anything.

To transform the array:

- map(func) – creates a new array from results of calling func for every element.
- sort(func) – sorts the array in-place, then returns it.
- reverse() – reverses the array in-place, then returns it.
- split/join – convert a string to array and back.
- reduce/reduceRight(func, initial) – calculate a single value over the array by calling func for - each element and passing an intermediate result between the calls.

Additionally:

Array.isArray(value) checks value for being an array, if so returns true, otherwise false.
Note that the function takes 3 arguments:
The item value,
The item index,
The array itself

```
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15

arr.sort( (a, b) => a - b );

```

Berikut adalah contoh dalam JavaScript untuk membuat sebuah array yang berisi 100 objek:

```
// Membuat fungsi konstruktor untuk objek
function ObjectExample(property1, property2) {
  this.property1 = property1;
  this.property2 = property2;
}

// Membuat array untuk menyimpan objek
var arrayOfObjects = [];

// Mengisi array dengan objek-objek baru
for (var i = 0; i < 100; i++) {
  var newObj = new ObjectExample("Nilai1_" + i, "Nilai2_" + i);
  arrayOfObjects.push(newObj);
}

// Contoh penggunaan objek dalam array
console.log(arrayOfObjects[0].property1); // Output: Nilai1_0
console.log(arrayOfObjects[0].property2); // Output: Nilai2_0

```
