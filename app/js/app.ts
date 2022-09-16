import { draw, createParticlesGroup, rule } from './helpers';

const a = <HTMLCanvasElement>document.getElementById('life');
const c = <CanvasRenderingContext2D>a.getContext('2d');

const width = a.offsetWidth;
const height = a.offsetHeight;

const particles: any[] = [];
const yellow = createParticlesGroup(7, 'yellow', particles, width, height);
const blue = createParticlesGroup(7, 'blue', particles, width, height);
const red = createParticlesGroup(7, 'red', particles, width, height);

const update = () => {
    rule(yellow, yellow, -0.5);
    rule(blue, blue, -0.1);

    // Bounding
    rule(blue, red, -1);
    rule(yellow, red, -1);

    c.clearRect(0, 0, width, height);
    draw(c, 0, 0, 'black', width, height);
    for (const particle of particles) {
        draw(c, particle.x, particle.y, particle.color, 5, 5);
    }
    requestAnimationFrame(update);
};

update();
