const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/idle.png'
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/idleLeft.png'
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/runRight.png'
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/runLeft.png'
        },
        attackRight: {
            frameRate: 3,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/Attack.png'
        },
        attackLeft: {
            frameRate: 3,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/attackLeft.png'
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 5,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;
                        if (level === 4) level = 1;
                        levels[level].init();
                        player.switchSprite('idleRight');
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
});

const enemies = [
    new Enemy({
        imageSrc: './img/pig/Idle.png',
        frameRate: 11,
        animations: {
            idleLeft: {
                frameRate: 11,
                frameBuffer: 5,
                loop: true,
                imageSrc: './img/pig/Idle.png'
            },
            idleRight: {
                frameRate: 11,
                frameBuffer: 5,
                loop: true,
                imageSrc: './img/pig/idleRight.png'
            },
            runRight: {
                frameRate: 6,
                frameBuffer: 5,
                loop: true,
                imageSrc: './img/pig/runRight.png'
            },
            runLeft: {
                frameRate: 6,
                frameBuffer: 5,
                loop: true,
                imageSrc: './img/pig/Run.png'
            },
        }
    })
]

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;
            enemies.forEach(enemy => {
                enemy.collisionBlocks = collisionBlocks;
                enemy.switchSprite("idleLeft");
            });

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 80;
            player.position.y = 50;

            enemies.forEach(enemy => {
                enemy.collisionBlocks = collisionBlocks;
            });

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 700;
            player.position.y = 100;

            enemies.forEach(enemy => {
                enemy.collisionBlocks = collisionBlocks;
            });

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            });

            doors = [
                new Sprite({
                    position: {
                        x: 175,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}

//make player move
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    j: {
        pressed: false
    },
}

const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate);

    background.draw();
    // collisionBlocks.forEach(block => {
    //     block.draw();
    // })

    doors.forEach(door => {
        door.draw();
    })

    player.handleInput(keys);

    player.draw();
    player.update();

    enemies.forEach(enemy => {
        enemy.draw();
        enemy.update();
    })

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

levels[level].init();
animate();