class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');

        this.born = 0;
    }

    fire (x, y, direction)
    {
        this.body.reset(x+35, y);

        this.setActive(true);
        this.setVisible(true);

        if (direction == 'izq')
            this.setVelocityX(-800);
        if (direction == 'der') {
            this.setVelocityX(800);
            this.setVelocityY(-80);
        }

        this.born = 0;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.born += delta;

        if (this.born > 1000)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Bullet;