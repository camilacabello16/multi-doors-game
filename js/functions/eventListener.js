window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            if (player.velocity.y === 0)
                player.velocity.y += -20;

            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});