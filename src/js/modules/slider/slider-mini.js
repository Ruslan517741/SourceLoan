import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay, addInterval) {
        super(container, next, prev, activeClass, animate, autoplay, addInterval);
        
    }

    interval(){
        this.timerId = setInterval(() => this.nextSlide(), 5000);
    }
    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
            if (slide.closest('button')) {
                /* this.container.appendChild(slide); */
                this.container.insertBefore(slide, this.slides[this.slides.length - 3]);
            }
        });
        
        /* if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        } */
        this.slides[0].classList.add(this.activeClass);
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
    }
    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

    /* bindTriggers() {
        this.next.addEventListener('click', () => {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
            if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
                this.container.appendChild(this.slides[0]);
                this.container.appendChild(this.slides[1]);
                this.container.appendChild(this.slides[2]);
                this.decorizeSlides();
                console.log(1);
            } else if (this.slides[1].tagName == 'BUTTON') {
                this.container.appendChild(this.slides[0]);
                this.container.appendChild(this.slides[1]);
                this.decorizeSlides();
                console.log(2);
            } else {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                console.log(3);
            }
            
        }); */

        this.prev.addEventListener('click', () => {

            /* for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            } */

            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        });
    }

    startInterval(elem) {
        elem.addEventListener('mouseout', () => {
            this.interval();
        });
    }

    stopInterval(elem) {
        elem.addEventListener('mouseover', () => {
            clearInterval(this.timerId);
        });
    }

    
    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            
            this.bindTriggers();
            this.decorizeSlides();
            if(this.autoplay) {
                this.interval();
                this.slides.forEach(slide => {
                    this.startInterval(slide);
                    this.stopInterval(slide); 
                });
                this.startInterval(this.next);
                this.stopInterval(this.next); 
                this.startInterval(this.prev);
                this.stopInterval(this.prev); 


                /* this.slides.forEach(slide => {
                    slide.addEventListener('mouseover', () => {
                        clearInterval(timerId);
                    });
                    slide.addEventListener('mouseout', () => {
                        timerId = setInterval(() => this.nextSlide(), 5000);
                    });
                });
                this.next.addEventListener('mouseover', () => {
                    clearInterval(timerId);
                });
                this.next.addEventListener('mouseout', () => {
                    timerId = setInterval(() => this.nextSlide(), 5000);
                });
                this.prev.addEventListener('mouseover', () => {
                    clearInterval(timerId);
                });
                this.prev.addEventListener('mouseout', () => {
                    timerId = setInterval(() => this.nextSlide(), 5000);
                }); */
            }
        } catch(e) {}

        
    }
}

