import Timer from "./Timer.js"

export default class Counter {
   // Format number
   static format = (number) => Math.floor(number)
   // Time function
   static timeFunc = (time, end, duration, start) => time / duration * (end - start) + start

   constructor(element, format, timeFunc) {
      if (!element) return
      // Output element
      this.element = element
      // Formatting
      this.format = format || Counter.format
      // Time function
      this.timeFunc = timeFunc || Counter.timeFunc
      // Initial value. Default 0
      this.startValue = +this.element.dataset.start || 0
      // End reference point
      this.endValue = +this.element.dataset.end || +this.element.textContent.replace(/ /g, '')
      // Counting duration
      this.duration = +this.element.dataset.duration || 1500
      // Setting the initial value
      this.element.textContent = this.format(this.startValue)
   }
   // Changing values
   async count(duration = this.duration, endValue = this.endValue) {
      await Timer.start(time => {
         // Step counting with adjustable time function
         const step = this.timeFunc(time, endValue, duration, this.startValue)
         // Recording an updated number
         this.element.textContent = this.format(step)
      }, duration)

      return this.element
   }
}