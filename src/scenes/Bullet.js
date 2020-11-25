class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');

        this.born = 0;
    }

    fire (x, y, direction)
    {
        this.body.reset(x, y+5);

        this.setActive(true);
        this.setVisible(true);

        if (direction == 'izq') {
            this.setVelocityX(-800);
            this.setVelocityY(-100);
            this.setRotation(Math.PI);
        }
        if (direction == 'der') {
            this.setVelocityX(800);
            this.setVelocityY(-100);
            this.setRotation(0);
        }

        this.born = 0;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.born += delta;

        // console.log(this.born);

        if (this.born > 800)
        {
            this.destroy();
            // this.setActive(false);
            // this.setVisible(false);
        }
    }
}

export default Bullet;