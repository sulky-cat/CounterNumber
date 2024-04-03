import CounterNumber from "../src/CounterNumber.js";
import Counter from "../src/Counter.js";

// ===
const counters = document.querySelectorAll('[data-counter]')
const countersNumber = new CounterNumber(counters)
// Клик (7 пример)
const section = document.querySelector('#ex_7')
section.addEventListener('click', (e) => {
   const btn = e.target.closest('button')
   if (!btn) return
   const output = btn.nextElementSibling
   const counter = countersNumber.elements.find(({ element }) => element === output)
   counter.count()
})
// ===
const counters_2 = document.querySelectorAll('.format')
new CounterNumber(counters_2, {
   format: (number) => Math.floor(number).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
})
// ===
const counters_3 = document.querySelectorAll('.time-func')
new CounterNumber(counters_3, {
   timeFunc: (time, end, duration, start) => {
      end -= start
      time /= duration
      return end * time * time + start
   }
})
// ===
const counters_ex8 = document.querySelectorAll('.counter')
counters_ex8.forEach(counter => {
   const btn = counter.previousElementSibling
   const cnt = new Counter(counter)
   btn.onclick = () => cnt.count()
});