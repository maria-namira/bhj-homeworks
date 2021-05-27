class Slider {
    constructor(slider) {
        this.slides = Array.from(slider.getElementsByClassName('slider__item'));
        this.dots = Array.from(slider.getElementsByClassName('slider__dot'));

        this.activeSlide = this.slides
            .findIndex((slide) => slide.classList.contains('slider__item_active'));

        this.leftArrow = slider.getElementsByClassName('slider__arrow_prev')[0];
        this.rightArrow = slider.getElementsByClassName('slider__arrow_next')[0];

        this.leftArrow.onclick = () => this.changePrev();
        this.rightArrow.onclick = () => this.changeNext();

        this.dots.forEach((dot,index) => {
            dot.onclick = () => this.changeSlide(index)
        });
        this.dots[this.activeSlide].classList.add('slider__dot_active');
    }
    changeSlide(newId) {
        if (newId !== this.activeSlide) {
            this.slides[newId].classList.add('slider__item_active');
            this.slides[this.activeSlide].classList.remove('slider__item_active');
            this.dots[newId].classList.add('slider__dot_active');
            this.dots[this.activeSlide].classList.remove('slider__dot_active');
            this.activeSlide = newId;
        }
        return false;
    }
    changePrev() {
        let newId = this.activeSlide - 1;
        if (newId < 0) {
            newId = this.slides.length - 1;
        }
        this.changeSlide(newId);
        return false;
    }

    changeNext() {
        let newId = this.activeSlide + 1;
        if (newId >= this.slides.length) {
            newId = 0;
        }
        this.changeSlide(newId);
        return false;
    }
}

Array.from(document.getElementsByClassName('slider')).forEach((slider) => new Slider(slider));