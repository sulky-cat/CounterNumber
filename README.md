# Counter number

[Демо страница](https://sulky-cat.github.io/CounterNumber/demo/)

## Содержание
- [Описание](#описание)
- [Подключение](#подключение)
- [html](#html)
- [js](#js)
- [Параметры](#параметры)
- [Методы и параметры класса CounterNumber](#Методы-и-параметры-класса-CounterNumber-общие)
- [Методы и параметры класса Counter](#Методы-и-параметры-класса-Counter-отдельного-счетчика)
- [Примеры](#примеры)

## Описание
Укажите начальное значение в дата-атрибуте `data-start`, если оно отлично от нуля, а конечное значение внутри элемента. Слежка за элементами реализован через Intersection Observer API.

Данный скрипт использует два класса: `Counter` и `CounterNumber`. Первый рассматривает каждый счетчик по отдельности, принимает параметры, касающиеся каждого счетчика, а аткже имеет метод начала подсчета. Можно использовать отдельно от класса `CounterNumber` ([см. пример 8](https://sulky-cat.github.io/CounterNumber/demo/#ex_8)).

Для работы класса необходимо дополниельно подключить класс `Timer`. Он находится [тут](https://github.com/sulky-cat/Helpers).

## Подключение
Класс `CounterNumber` и `Counter` находится в папке `/src`. Вспомогательный класс `Timer`тоже находятся в папке `/src`, а также [тут](https://github.com/sulky-cat/Helpers).

Подключение без модульности:
```html
<script src="Timer.js"></script>
<script src="Counter.js"></script>
<script src="CounterNumber.js"></script>
```
Подключение с модулями (уже написано в файлах):

*HTML*
```html
<script type="module" src="script.js">
   import Tab from "CounterNumber.js"
</script>
```
*JS (CounterNumber.js)*
```js
import Counter from "./Counter.js"
```
*JS (Counter.js)*
```js
import Timer from "./Timer.js"
```

## HTML
```html
<!-- Инициализация по классу -->
<span class="counter">100</span>
<span data-start="50" class="counter">100</span>
<span data-end="2000" data-duration="500" data-once class="counter"></span>
<span data-other-trigger class="counter">100</span>
<!-- Инициализация по атрибуту -->
<span data-counter>100</span>
``` 
Атрибуты: 
* `data-start` - начальное значение. По умолчанию `0`;
* `data-end` - конечное значение. Берется из содержимого элемента или из этого атрибута;
* `data-duration` - время выполнения анимации. По умолчанию `1500`;
* `data-other-trigger` - отключает скролл у таких элементов. Также можно инициализировать счетчики классом `Counter` ([см. пример 8](https://sulky-cat.github.io/CounterNumber/demo/#ex_8));
* `data-once` - Проигрывать анимацию по скроллу один раз. По умолчанию `false`.

Указание настроек через атрибуты имеет высший приоритет по сравнению с такими же настройками через js.

## JS
Инициализация:
```js
// Инициализация по классу без опций.
new CounterNumber(document.querySelectorAll('.counter'))
// Инициализация по атрибуту с опциями.
new CounterNumber(document.querySelectorAll('[data-counter]'), {
   once: true,
   rootmargin: '50px',
})
``` 

### Настройки
* `rootmargin` - указание rootmargin для опций Intersection Observer. По умолчанию `0`;
* `threshold` - указание threshold для опций Intersection Observer. По умолчанию `0.5`;
* `once` - проигрывание анимацию один раз. По умолчанию `false`;
* `className` - класс, который добавляется элементу, когда его увидел Intersection Observer. Значение по умолчанию `'_visible_'`;
* `format` - форматирование выводимых чисел. Значение по умолчанию: 
```js
(number) => Math.floor(number)
```
* `timeFunc` - временная функция срабатывания анимации. В качестве аргументов принимает время с начала выполнения анимации, конечное значение счетчика, время выполнения анимации и начальное значение счетчика. Формулы для временных функций: [gizma.com](https://gizma.com).  Значение по умолчанию: 
```js
(time, end, duration, start) => time / duration * (end - start) + start
```

### Методы и параметры класса CounterNumber (общие)

#### Методы
* `countersNumber.getCounter(element)` - возвращает экземпляр класса `Counter` для указанного элемента.
#### Параметры
* `countersNumber.elements` - массив экземпляров класса `Counter`.

### Методы и параметры класса Counter (отдельного счетчика)

#### Методы
* `counter.count(duration, endValue)` - начало анимации счетчика. Передаваемые параметры необязательны. Возваращает Promise.
```js
// Может дождаться выполнения
counter.count()
.then(element => {
   console.log(`Подсчет элемента ${element} закончен.`)
})
// Или используя async/await
async function anyFunction() {
   const element = await counter.count()
   console.log(`Подсчет элемента ${element} закончен.`)
}
```
#### Параметры
* `counter.element` - елемент, в который будет выводиться счетчик;
* `counter.duration` - время анимации;
* `counter.endValue` - конечное значение;
* `counter.startValue` - начальное значение;
* `counter.format` - функция форматирования выводимых чисел;
* `counter.timeFunc` - временная функция.

## Примеры
#### 1) Срабатывание счетчика по другому триггеру (CounterNumber) [пример](https://sulky-cat.github.io/CounterNumber/demo/#ex_7) 
```html
<button type="button">Нажми на меня</button>
<p data-counter data-other-trigger>1000</p>
```
```js
const counters = document.querySelectorAll('[data-counter]')
const countersNumber = new CounterNumber(counters)

const btn = document.querySelector('button')
btn.onclick = () => {
   const counter = countersNumber.getCounter(btn.nextElementSibling)
   counter.count()
}
```

#### 2) Срабатывание счетчика по другому триггеру (Counter) [пример](https://sulky-cat.github.io/CounterNumber/demo/#ex_8) 
```html
<button type="button">Нажми на меня</button>
<p class="counter">1000</p>
```
```js
const counter = new Counter(document.querySelector('.counter'))

const btn = document.querySelector('button')
btn.onclick = () => counter.count()
```

#### 3) Иное форматирование [пример](https://sulky-cat.github.io/CounterNumber/demo/#ex_4)
```html
<p class="counter">1000</p>
```
```js
const counters = document.querySelectorAll('.counter')
const countersNumber = new CounterNumber(counters, {
   format: (number) => Math.floor(number).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
})
```

#### 4) Указаное другой временной функции [пример](https://sulky-cat.github.io/CounterNumber/demo/#ex_6)
```html
<p class="counter">1000</p>
```
```js
const counters = document.querySelectorAll('.counter')
const countersNumber = new CounterNumber(counters, {
   timeFunc: (time, end, duration, start) => {
      end -= start
      time /= duration
      return end * time * time + start
   }
})
```