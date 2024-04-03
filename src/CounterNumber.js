import Counter from "./Counter.js"

export default class CounterNumber {
   // Default options
   static defaultOptions = {
      // Depth options
      rootmargin: 0,
      threshold: 0.5,
      // Play 1 time
      once: false,
      // A class that is added if the object is visible
      className: '_visible_',
   }
   constructor(elements, options) {
      this.options = { ...CounterNumber.defaultOptions, ...options }
      // Creating Class Instances for each element
      this.elements = Array.from(elements).map(element => new Counter(element, this.options.format, this.options.timeFunc))
      // Play scroll
      this.scroll()
   }
   getCounter(currentElement) {
      return this.elements.find(({ element }) => element === currentElement)
   }
   scroll() {
      // Options Intersection Observer
      const options = {
         rootMargin: `${this.options.rootmargin}px`,
         threshold: this.options.threshold,
      }
      // Function callback 
      const callback = (entries, observer) => {
         for (const entery of entries) {
            if (entery.isIntersecting) {
               const once = entery.target.hasAttribute('data-once') || this.options.once
               // If observed, add class
               entery.target.classList.add(this.options.className)
               // Start of counting
               const currentElement = this.getCounter(entery.target)
               currentElement.count()
               if (once) observer.unobserve(entery.target)
            } else {
               // If not observed
               entery.target.classList.remove(this.options.className)
            }
         }

      }
      // Launching an Observer
      const observer = new IntersectionObserver(callback, options)
      // Monitor the required elements
      for (const { element } of this.elements) {
         if (!element.hasAttribute('data-other-trigger'))
            observer.observe(element)
      }
   }
}

