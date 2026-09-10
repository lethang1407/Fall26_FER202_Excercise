import React, { useEffect } from 'react';

// ==========================================
// 1. ES6 LOGIC & CLASSES (Đưa ra ngoài Component)
// ==========================================

// Mảng dữ liệu
const people = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 },
  { name: 'John', age: 40 },
  { name: 'Ann', age: 19 },
  { name: 'Elisabeth', age: 16 }
];

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const person = {
  name: "Costas",
  address: { street: "Lalaland 12" }
};

// Classes OOP
class Shape {
  constructor(color = "red") {
    this.color = color;
  }
  getArea() { return 0; }
  toString() { return `Shape[color=${this.color}]`; }
}

class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }
  getArea() { return this.length * this.width; }
  toString() { return `Rectangle[${super.toString()}, length=${this.length}, width=${this.width}]`; }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }
  getArea() { return 0.5 * this.base * this.height; }
  toString() { return `Triangle[${super.toString()}, base=${this.base}, height=${this.height}]`; }
}

// Function chạy các bài tập Console log
const runES6Exercises = () => {
  console.log("--- PEOPLE EXERCISES ---");
  console.log('First teenager:', people.find(p => p.age >= 10 && p.age <= 20));
  console.log('All teenagers:', people.filter(p => p.age >= 10 && p.age <= 20));
  console.log('Is every teenager:', people.every(p => p.age >= 10 && p.age <= 20));
  console.log('Is any teenager:', people.some(p => p.age >= 10 && p.age <= 20));

  console.log("--- REDUCE ARRAY ---");
  const array = [1, 2, 3, 4];
  console.log('Reduce Product:', array.reduce((acc, curr) => acc * curr, 1));

  console.log("--- COMPANIES & AGES ---");
  companies.forEach(c => console.log(c.name));
  companies.filter(c => c.start > 1987).forEach(c => console.log(c.name));
  console.log('Sorted Companies:', [...companies].sort((a, b) => a.end - b.end));
  console.log('Sorted Ages Desc:', [...ages].sort((a, b) => b - a));
  console.log('Sum Ages:', ages.reduce((sum, age) => sum + age, 0));

  console.log("--- OBJECT & REST/SPREAD ---");
  const { name, category } = companies[0];
  const companyObj = { name, category, print() { console.log(`Name: ${this.name}, Category: ${this.category}`); } };
  companyObj.print();

  const sumAllNumbers = (...args) => args.reduce((sum, val) => typeof val === 'number' ? sum + val : sum, 0);
  console.log('Sum numbers:', sumAllNumbers(1, 2, 3, 4, 5));

  const collectToArray = (...args) => args.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? curr : [curr]), []);
  console.log('Collect array:', collectToArray(1, [2, 3], 'hello', [4, 5]));

  const { address: { street } } = person;
  console.log('Street:', street);

  const createCounter = () => { let count = 0; return () => count++; };
  const increment = createCounter();
  console.log('Counter:', increment(), increment(), increment());

  const parseQueryParams = (url) => {
    const queryString = url.split('?')[1];
    if (!queryString) return {};
    return queryString.split('&').reduce((acc, pair) => {
      const [k, v] = pair.split('=');
      acc[decodeURIComponent(k)] = decodeURIComponent(v || '');
      return acc;
    }, {});
  };
  console.log('Query Params:', parseQueryParams('https://example.com?page=1&search=react&sort=asc'));

  console.log("--- OOP CLASSES ---");
  const rect = new Rectangle("blue", 4, 5);
  console.log(rect.toString(), 'Area:', rect.getArea());
  const tri = new Triangle("green", 3, 6);
  console.log(tri.toString(), 'Area:', tri.getArea());

  console.log("--- PROMISE ---");
  new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    randomNum > 5 ? resolve(`Success! Number is ${randomNum}`) : reject("Error");
  })
  .then(res => console.log('Promise Resolved:', res))
  .catch(err => console.error('Promise Rejected:', err));
};

// Sub-component cho Retail Companies
function RetailCompaniesUI() {
  const retailCompanies = companies
    .filter(c => c.category === "Retail")
    .map(c => ({ ...c, start: c.start + 1 }));

  return (
    <div>
      <h3>Retail Companies (Start + 1)</h3>
      {retailCompanies.map((c, idx) => (
        <div key={idx} style={{ display: 'flex', border: '1px solid #ddd', margin: '5px 0', padding: '10px' }}>
          <p style={{ flex: 1, fontWeight: 'bold', margin: 0 }}>{c.name}</p>
          <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', margin: 0 }}>{c.start}</p>
          <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', margin: 0 }}>{c.end}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 2. MAIN COMPONENT EXPORT
// ==========================================
export function Ex4() {
  const courses = ['React', 'ReactNative', 'NodeJs'];

  // Chạy các lệnh console 1 lần khi component được mount
  useEffect(() => {
    runES6Exercises();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* 1. Hello React */}
      <h2>
        Hello <span style={{ color: 'blue', fontWeight: 'bold' }}>React</span>
      </h2>

      {/* 2. React Logo Card */}
      <div style={{ width: '300px', textAlign: 'center', margin: '20px 0' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          style={{ width: '200px' }}
        />
        <p style={{ fontStyle: 'italic', color: '#005689', margin: '5px 0 0' }}>This is the React logo!</p>
        <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#888', margin: '0 0 15px' }}>(I don't know why it is here either)</p>
        <p style={{ fontWeight: '500' }}>The library for web and native user interfaces</p>
      </div>

      {/* 3. Navbar */}
      <nav style={{ backgroundColor: '#555', display: 'flex', alignItems: 'center', color: '#fff', marginBottom: '20px' }}>
        <div style={{ backgroundColor: '#2ecc71', padding: '15px 25px', cursor: 'pointer' }}>Home</div>
        <div style={{ padding: '15px 20px', cursor: 'pointer' }}>Search</div>
        <div style={{ padding: '15px 20px', cursor: 'pointer' }}>Contact</div>
        <div style={{ backgroundColor: '#000', padding: '15px 25px', cursor: 'pointer' }}>Login</div>
      </nav>

      {/* 4. JSX Text */}
      <h1 style={{ color: 'blue', fontWeight: 'bold' }}>This is JSX</h1>

      {/* 5. Course List */}
      <div>
        <h2>Course names</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index} style={{ fontSize: '18px', marginBottom: '5px' }}>
              {course}
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Render Retail Companies Component */}
      <RetailCompaniesUI />
    </div>
  );
}

export default Ex4;