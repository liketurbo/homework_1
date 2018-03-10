/**
 * @class App
 * @param {Element} el
 */
function App(el) {
    var appEl = el,
        doors = [
            new Door0(0, onUnlock),
            new Door1(1, onUnlock),
            new Door2(2, onUnlock),
            new Box(3, onUnlock)
        ];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    };
}

function simulateTouch(element, eventType) {
    var touchObj = new Touch({
        identifier: Date.now(),
        target: element,
        clientX: 0,
        clientY: 0,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5,
    });

    var touchEvent = new TouchEvent(eventType, {
        cancelable: true,
        bubbles: true,
        touches: [touchObj],
        targetTouches: [],
        changedTouches: [touchObj],
        shiftKey: true,
    });

    element.dispatchEvent(touchEvent);
}

// Start the app
var app = new App(document.querySelector('.app'));

// Door0
simulateTouch(document.querySelector('.door-riddle__button_0'), 'pointerdown');
simulateTouch(document.querySelector('.door-riddle__button_1'), 'pointerdown');
