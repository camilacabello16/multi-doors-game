const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectFrom2D();

const bgLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
});

const player = new Player({
    collisionBlocks
});

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
}
function animate() {
    window.requestAnimationFrame(animate);

    bgLevel1.draw();
    collisionBlocks.forEach(block => {
        block.draw();
    })

    player.velocity.x = 0;
    if (keys.a.pressed) {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed) {
        player.velocity.x = 5;
    }

    player.draw();
    player.update();
}

animate();