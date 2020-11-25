import Bullet from './Bullet.js';

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet,
            runChildUpdate: true
        });
    }

    fireBullet (x, y, direction)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, direction);
        }
    }
}

export default Bullets;