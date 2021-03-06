// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var targetBlocks = [
        this.popup.querySelector('.door-riddle-blocks__block_0-0'),
        this.popup.querySelector('.door-riddle-blocks__block_0-1'),
        this.popup.querySelector('.door-riddle-blocks__block_0-2'),
        this.popup.querySelector('.door-riddle-blocks__block_0-3')
    ];

    var dragBlocks = [
        this.popup.querySelector('.door-riddle-blocks__block_1-0'),
        this.popup.querySelector('.door-riddle-blocks__block_1-1'),
        this.popup.querySelector('.door-riddle-blocks__block_1-2'),
        this.popup.querySelector('.door-riddle-blocks__block_1-3')
    ];

    dragBlocks.forEach(function(b) {
        b.addEventListener('pointerdown', _onDragBlocksPointerDown.bind(this));
        b.addEventListener('pointerup', _onDragBlocksPointerUp.bind(this));
        b.addEventListener('pointermove', _onDragBlocksPointerMove.bind(this));
        b.addEventListener('pointercancel', _onDragBlocksPointerUp.bind(this));
    }.bind(this));

    function _onDragBlocksPointerMove(e) {
        if (tappedButtons === 0) return false;
        moveDragBlock(e, _getId(e));
    }

    var tappedButtons = 0;
    var prevOffset = [
        [0, 0],
        [64, 0],
        [0, 64],
        [64, 64]
    ];
    function moveDragBlock(e, id) {
        prevOffset[id][0] += e.offsetX - e.target.getBoundingClientRect().width / 2;
        prevOffset[id][1] += e.offsetY - e.target.getBoundingClientRect().height / 2;

        e.target.style.left = prevOffset[id][0] + 'px';
        e.target.style.top = prevOffset[id][1] + 'px';
    }

    function checkCondition(e, that) {
        if (tappedButtons <= 1) return false;
        switch (_getId(e)) {
            case '0': case '1':
            if (_inArea(0) && _inArea(1)) {
                _removeElem(0);
                _removeElem(1);
            }
            case '2': case '3':
            if (_inArea(2) && _inArea(3)) {
                _removeElem(2);
                _removeElem(3);
            }
            case '0': case '2':
            if (_inArea(0) && _inArea(2)) {
                _removeElem(0);
                _removeElem(2);
            }
            case '1': case '3':
            if (_inArea(0) && _inArea(2)) {
                _removeElem(0);
                _removeElem(2);
            }
            case '0': case '3':
            if (_inArea(0) && _inArea(3)) {
                _removeElem(0);
                _removeElem(3);
            }
            case '1': case '2':
            if (_inArea(1) && _inArea(2)) {
                _removeElem(1);
                _removeElem(2);
            }
        }

        var count = document.querySelector('.door-riddle-blocks__drag-blocks').children.length;
        if (count === 0) that.unlock();
    }

    function _onDragBlocksPointerDown(e) {
        e.target.classList.add('door-riddle-blocks__block_pressed');
        tappedButtons++;
    }

    function _onDragBlocksPointerUp(e) {
        e.target.classList.remove('door-riddle-blocks__block_pressed');
        checkCondition(e, this);
        tappedButtons--;
    }

    function _getId(e) {
        return e.target.classList[2].slice(-1);
    }

    function _removeElem(id) {
        switch (id) {
            case 0:
            dragBlocks[0].parentNode.removeChild(dragBlocks[0]);
            break;
            case 1:
            dragBlocks[1].parentNode.removeChild(dragBlocks[1]);
            break;
            case 2:
            dragBlocks[2].parentNode.removeChild(dragBlocks[2]);
            break;
            case 3:
            dragBlocks[3].parentNode.removeChild(dragBlocks[3]);
            break;
        }
    }

    function _inArea(id) {
        var targetPosX = targetBlocks[id].getBoundingClientRect().x;
        var dragPosX = dragBlocks[id].getBoundingClientRect().x;
        var targetPosY = targetBlocks[id].getBoundingClientRect().y;
        var dragPosY = dragBlocks[id].getBoundingClientRect().y;
        var width = dragBlocks[id].getBoundingClientRect().width;
        var height = dragBlocks[id].getBoundingClientRect().height;
        var diffX = Math.abs(targetPosX - dragPosX);
        var diffY = Math.abs(targetPosY - dragPosY);

        return (diffX <= (width / 2) && diffY <= (height / 2));
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё

    var animals = [
        this.popup.querySelector('.door-riddle-anim__block_0'),
        this.popup.querySelector('.door-riddle-anim__block_1'),
        this.popup.querySelector('.door-riddle-anim__block_2'),
        this.popup.querySelector('.door-riddle-anim__block_3'),
        this.popup.querySelector('.door-riddle-anim__block_4'),
        this.popup.querySelector('.door-riddle-anim__block_5'),
        this.popup.querySelector('.door-riddle-anim__block_6'),
        this.popup.querySelector('.door-riddle-anim__block_7'),
        this.popup.querySelector('.door-riddle-anim__block_8')
    ];

    animals.forEach(function(el) {
        el.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle-anim__block_pressed');
        currentSequence.push(_getId(e));
        checkCondition(this);
    }

    var rightSequence = ['2', '1', '0', '3'];
    var currentSequence = [];
    function checkCondition(that) {
        if (currentSequence.length === 4) {
            if (_compareArrays(rightSequence, currentSequence)) {
                that.unlock()
            } else {
                resetLevel();
            }
        }
    }

    function resetLevel() {
        currentSequence = [];
        animals.forEach(function(el) {
            el.classList.remove('door-riddle-anim__block_pressed');
        });
    }

    function _getId(e) {
        return e.target.classList[1].slice(-1);
    }

    function _compareArrays(firstArr, secondArr) {
        return firstArr.length == secondArr.length &&
        firstArr.every(function(el, ind) { return el === secondArr[ind]});
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    function createNumbers(viewport) {
        for (var i = 0; i <= 9; i++) {
            var parent = document.querySelector(".viewport__numbers_" + viewport);
            var div = document.createElement('div');
            div.classList.add('viewport__slide-block');
            div.classList.add('viewport__slide-block_' + i);
            div.style.top = (50 * i) + 'px';
            parent.append(div);
        }
    }

    createNumbers(0);
    createNumbers(1);
    createNumbers(2);

    var viewports = [
        document.querySelector('.viewport__numbers_0'),
        document.querySelector('.viewport__numbers_1'),
        document.querySelector('.viewport__numbers_2')
    ];

    viewports.forEach(function(el) {
        el.addEventListener('pointerdown', _onDragBlocksPointerDown.bind(this));
        el.addEventListener('pointerup', _onDragBlocksPointerUp.bind(this));
        el.addEventListener('pointermove', _onDragBlocksPointerMove.bind(this));
        el.addEventListener('pointercancel', _onDragBlocksPointerUp.bind(this));
    }.bind(this));

    var initialOffset = [0, 0, 0];
    var prevOffset = [0, 0, 0];
    var isTapped = false;
    var rightAnswer = [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ];
    var current = [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ];

    generateTask();
    renderTask();

    function _getId(e) {
        return e.target.classList[1].slice(-1);
    }

    function _onDragBlocksPointerDown(e) {
        isTapped = true;
        initialOffset[_getId(e)] = e.offsetY;
    }

    function _onDragBlocksPointerMove(e) {
        if (isTapped) {
            prevOffset[_getId(e)] += e.offsetY - initialOffset[_getId(e)];

            if (prevOffset[_getId(e)] > 0) prevOffset[_getId(e)] = 0;
            if (prevOffset[_getId(e)] < -450) prevOffset[_getId(e)] = -450;

            if (isTapped) e.target.style.top = 50 + prevOffset[_getId(e)] + 'px';
        }
    }

    function _onDragBlocksPointerUp(e) {
        isTapped = false;
        var comp = prevOffset[_getId(e)] % 50;

        if (comp !== 0) {
            if (comp >= -25) {
                prevOffset[_getId(e)] += -(comp);
                e.target.style.top = 50 + prevOffset[_getId(e)] + 'px';
            } else {
                var newComp = 50 + comp;
                prevOffset[_getId(e)] += -(newComp);
                e.target.style.top = 50 + prevOffset[_getId(e)] + 'px';
            }
        }

        current[_getId(e)] = refreshValues(_getId(e));
        checkCondition(this);
    }

    function refreshValues(id) {
        var input = parseInt(viewports[id].style.top);
        if (input === 50) {
            return [0, 0, 1];
        } else if (input === 0) {
            return [0, 1, 2];
        } else if (input === -400) {
            return [8, 9, 0];
        } else {
            var comp = input / -50;
            return [0 + comp, 1 + comp, 2 + comp];
        }
    }

    function checkCondition(that) {
        var isCorrectAnswer = true;

        for (var i = 0; i < 3; i++) {
          var currentValueRow = 0;
          var rightAnswerRow = 0;

          for (var j = 0; j < 3; j++) {
            currentValueRow += current[j][i];
            rightAnswerRow += rightAnswer[j][i];
          }

          if (currentValueRow !== rightAnswerRow) {
            isCorrectAnswer = false;
            break;
          }
        }

        if (isCorrectAnswer) that.unlock();
    }

    function generateTask() {
        var pattern = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        for (var i = 0; i < viewports.length; i++) {
            var randomNum = _getRandomInt(0, 9);
            rightAnswer[i][0] = pattern[randomNum]
            rightAnswer[i][1] = pattern[randomNum + 1];
            rightAnswer[i][2] = pattern[randomNum + 2];
        }
    }

    function renderTask() {
        var spans = [
            document.querySelector('.door-riddle-final__task > span:nth-child(1)'),
            document.querySelector('.door-riddle-final__task > span:nth-child(2)'),
            document.querySelector('.door-riddle-final__task > span:nth-child(3)')
        ];

        spans[0].innerHTML = rightAnswer[0][0] + rightAnswer[1][0] + rightAnswer[2][0];
        spans[1].innerHTML = rightAnswer[0][1] + rightAnswer[1][1] + rightAnswer[2][1];
        spans[2].innerHTML = rightAnswer[0][2] + rightAnswer[1][2] + rightAnswer[2][2];
    }

    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
