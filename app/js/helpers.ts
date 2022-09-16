export default {};

export function sum(a: number, b: number): number {
    return a + b;
}

export const draw = (
    m: CanvasRenderingContext2D,
    x: number,
    y: number,
    c: string,
    w: number,
    h: number
) => {
    m.fillStyle = c;
    m.fillRect(x, y, w, h);
};

export const particle = (x: number, y: number, c: string) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};

export const createParticlesGroup = (
    amount: number,
    color: string,
    particles: any[],
    width: number,
    height: number
): any[] => {
    const group = [];
    for (let i = 0; i < amount; i++) {
        group.push(particle(Math.random() * width, Math.random() * height, color));
        particles.push(group[i]);
    }
    return group;
};

const preventLeavingScreen = (particle: any, width: number, height: number) => {
    if (particle.x < 0) {
        particle.x = 0; // Drop position
        particle.vx *= -1; // Invert speed direction
    }
    if (particle.x > width) {
        particle.x = width;
        particle.vx *= -1;
    }
    if (particle.y < 0) {
        particle.y = 0;
        particle.vy *= -1;
    }
    if (particle.y >= height) {
        particle.y = height;
        particle.vy *= -1;
    }
};

export const rule = (
    particlesGroup1: any[],
    particlesGroup2: any[],
    g: number,
    width: number,
    height: number
) => {
    // assume mass of particle equal to 1

    // reduction coefs
    const forceReduction = 80;
    const velocityReduction = 0.5;

    for (let i = 0; i < particlesGroup1.length; i++) {
        let fx = 0;
        let fy = 0;
        let a: any;
        let b: any;
        for (let j = 0; j < particlesGroup1.length; j++) {
            a = particlesGroup1[i];
            b = particlesGroup2[j];

            // distance
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            let d = Math.sqrt(dx * dx + dy * dy);

            // Force
            // ---
            // Gravity force = G * (m1*m2 / distance**2)
            // m1, m2 == 1, so:
            // F = G*(1/distance)
            if (d > 0 && d < forceReduction) {
                // assume mass equal to 1
                let F = g * (1 / d);
                fx += F * dx;
                fy += F * dy;
            }
        }

        // Update velocity by force
        // ---
        // F = ma
        // a = F/m
        // a = F/1
        // a = F
        a.vx = (a.vx + fx) * velocityReduction;
        a.vy = (a.vy + fy) * velocityReduction;

        // Update aplied force
        a.x += a.vx;
        a.y += a.vy;

        preventLeavingScreen(a, width, height);
    }
};
