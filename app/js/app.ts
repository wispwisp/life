import { draw, createParticlesGroup, rule } from './helpers';

const a = <HTMLCanvasElement>document.getElementById('life');
const c = <CanvasRenderingContext2D>a.getContext('2d');

const width = a.offsetWidth;
const height = a.offsetHeight;

const particles: any[] = [];
const yellow = createParticlesGroup(750, 'yellow', particles, width, height);
const blue = createParticlesGroup(750, 'blue', particles, width, height);
const red = createParticlesGroup(750, 'red', particles, width, height);
const green = createParticlesGroup(750, 'green', particles, width, height);

const model1 = () => {
    rule(red, red, 0.1, width, height);
    rule(yellow, red, 0.15, width, height);
    rule(blue, blue, -0.7, width, height);
    rule(blue, red, -0.2, width, height);
    rule(red, blue, -0.1, width, height);
};

const model2 = () => {
    rule(green, green, -0.32, width, height);
    rule(green, red, -0.17, width, height);
    rule(green, yellow, 0.34, width, height);
    rule(red, red, -0.1, width, height);
    rule(red, green, -0.34, width, height);
    rule(yellow, yellow, 0.15, width, height);
    rule(yellow, green, -0.2, width, height);
};

const update = () => {
    model2();
    c.clearRect(0, 0, width, height);
    draw(c, 0, 0, 'black', width, height);
    for (const particle of particles) {
        draw(c, particle.x, particle.y, particle.color, 5, 5);
    }
    requestAnimationFrame(update);
};

update();
