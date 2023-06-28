'use strict';

const pageBody = document.querySelector('body');

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector,
        this.height = height,
        this.width = width,
        this.bg = bg,
        this.fontSize = fontSize,
        this.create = function () {
            let elem;
            let text;

            if (this.selector.startsWith('.')) {
                elem = document.createElement('div');
                elem.classList.add(this.selector.slice(1));
                text = 'div';
            }
            if (this.selector.startsWith('#')) {
                elem = document.createElement('p');
                elem.id = this.selector.slice(1);
                text = 'параграф';
            }

            elem.style.cssText = `height:${this.height}px; 
                                  width:${this.width}px; 
                                  background-color:${this.bg}; 
                                  font-size:${this.fontSize}px;
                                  `;
            elem.textContent = `Я ${text} из функции-конструктора`;

            pageBody.append(elem);
        }
};

const Square = function (selector, height, width, bg, fontSize, position) {
    DomElement.call(this, selector, height, width, bg, fontSize);

    this.position = position,
        this.addPosition = function () {
            const square = pageBody.querySelector(selector);
            square.style.position = this.position;
        }
};

Square.prototype = Object.create(DomElement.prototype);
Square.prototype.constructor = Square;

const newSquare = new Square('.square', '100', '100', 'red', '16', 'absolute');

const moveSquare = (evt) => {
    const square = pageBody.querySelector('.square');

    if (evt.key === 'ArrowUp') {
        const squareTop = parseInt(square.style.top) || 0;
        square.style.top = `${squareTop - 10}px`;
    }
    if (evt.key === 'ArrowDown') {
        const squareBottom = parseInt(square.style.top) || 0;
        square.style.top = `${squareBottom + 10}px`;
    }
    if (evt.key === 'ArrowLeft') {
        const squareLeft = parseInt(square.style.left) || 0;
        square.style.left = `${squareLeft - 10}px`;
    }
    if (evt.key === 'ArrowRight') {
        const squareRight = parseInt(square.style.left) || 0;
        square.style.left = `${squareRight + 10}px`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    pageBody.style.margin = 0;
    
    newSquare.create();
    newSquare.addPosition();
});

document.addEventListener('keydown', moveSquare);

// const newBlock = new DomElement('.block', '100', '100', '#00FFFF', '16');
// const newParagraph = new DomElement('#paragraph', '200', '200', 'BlueViolet', '32');
// newBlock.create();
// newParagraph.create();
