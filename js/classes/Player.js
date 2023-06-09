class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: 200,
            y: 200
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 0.2;
        this.collisionBlocks = collisionBlocks;
    }

    update() {
        this.position.x += this.velocity.x;

        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();

        // if (this.sides.bottom + this.velocity.y < canvas.height) {
        //     this.velocity.y += this.gravity;
        // } else {
        //     this.velocity.y = 0;
        // }
    }

    handleInput(keys) {
        if (this.preventInput) return;
        this.velocity.x = 0;
        if (keys.a.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -2;
            this.lastDirection = 'left';
        }
        else if (keys.d.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = 2;
            this.lastDirection = 'right';
        }
        else if (keys.j.pressed) {
            if (this.lastDirection === 'left') {
                this.switchSprite('attackLeft');
            }
            else this.switchSprite('attackRight');
        }
        else {
            if (this.lastDirection === 'left') {
                this.switchSprite('idleLeft');
            }
            else this.switchSprite('idleRight');
        }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }
}
