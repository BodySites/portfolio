const buttonUp = document.querySelector('.up')
const foto = document.querySelector('.main-info>img')
const icons = document.querySelectorAll('.ico-title')

foto.addEventListener('click', () => {
   foto.classList.toggle('foto-open')
})

buttonUp.addEventListener('click', () => {
   up()
})

var t

function up() {
   var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
   if (top > 0) {
      window.scrollBy(0, -10);
      t = setTimeout('up()', 10);
   } else clearTimeout(t);
}

class Accordion {
   constructor(el) {
      this.el = el;
      this.summary = el.querySelector('summary');
      this.content = el.querySelector('.information');
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener('click', (e) => this.onClick(e));
   }

   onClick(e) {
      e.preventDefault();

      this.el.style.overflow = 'hidden';

      if (this.isClosing || !this.el.open) {
         this.open();
      } else if (this.isExpanding || this.el.open) {
         this.shrink();
      }
   }

   shrink() {
      this.isClosing = true;
      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${this.summary.offsetHeight + 10}px`;

      if (this.animation) {
         this.animation.cancel();
      }

      this.animation = this.el.animate({
         height: [startHeight, endHeight]
      }, {
         duration: 300,
         easing: 'ease-out'
      });

      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => this.isClosing = false;
   }

   open() {
      this.el.style.height = `${this.el.offsetHeight + 10}px`;
      this.el.open = true;
      window.requestAnimationFrame(() => this.expand());
   }

   expand() {
      this.isExpanding = true;
      const startHeight = `${this.el.offsetHeight + 10}px`;
      const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight + 20}px`;

      if (this.animation) {
         this.animation.cancel();
      }

      this.animation = this.el.animate({
         height: [startHeight, endHeight]
      }, {
         duration: 300,
         easing: 'ease-out'
      });
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => this.isExpanding = false;
   }

   onAnimationFinish(open) {
      this.el.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.el.style.height = this.el.style.overflow = '';
   }
}

document.querySelectorAll('details').forEach((el) => {
   new Accordion(el);
});