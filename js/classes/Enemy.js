class Enemy extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: 500,
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
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 33,
                y: this.position.y + 34
            },
            width: 54,
            height: 53
        }

        // c.fillStyle = "#e74c3c70";
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
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