import { random } from 'utils';

export class Particle {

  // constants

  // Base particle friction.
  // Slows the speed of particles over time.
  PARTICLE_FRICTION = 0.95;
  // Base particle gravity.
  // How quickly particles move toward a downward trajectory.
  PARTICLE_GRAVITY = 0.7;
  // Variance in particle coloration.
  PARTICLE_HUE_VARIANCE = 20;
  // Base particle transparency.
  PARTICLE_TRANSPARENCY = 1;
  // Minimum particle speed.
  PARTICLE_SPEED_MIN = 1;
  // Maximum particle speed.
  PARTICLE_SPEED_MAX = 10;
  // Base length of explosion particle trails.
  PARTICLE_TRAIL_LENGTH = 5;
  // Minimum particle brightness.
  PARTICLE_BRIGHTNESS_MIN = 50;
  // Maximum particle brightness.
  PARTICLE_BRIGHTNESS_MAX = 80;
  // Minimum particle decay rate.
  PARTICLE_DECAY_MIN = 0.015;
  // Maximum particle decay rate.
  PARTICLE_DECAY_MAX = 0.03;

  // Creates a new particle at provided 'x' and 'y' coordinates.
  constructor(x, y, hue, context) {
    // Set current position.
    this.x = x;
    this.y = y;
    // Set the context.
    this.context = context;
    // To better simulate a firework, set the angle of travel to random value in any direction.
    this.angle = random(0, Math.PI * 2);
    // Set friction.
    this.friction = this.PARTICLE_FRICTION;
    // Set gravity.
    this.gravity = this.PARTICLE_GRAVITY;
    // Set the hue to somewhat randomized number.
    // This gives the particles within a firework explosion an appealing variance.
    this.hue = random(hue - this.PARTICLE_HUE_VARIANCE, hue + this.PARTICLE_HUE_VARIANCE);
    // Set brightness.
    this.brightness = random(this.PARTICLE_BRIGHTNESS_MIN, this.PARTICLE_BRIGHTNESS_MAX);
    // this.brightness = 100;
    // Set decay.
    this.decay = random(this.PARTICLE_DECAY_MIN, this.PARTICLE_DECAY_MAX);
    // Set speed.
    this.speed = random(this.PARTICLE_SPEED_MIN, this.PARTICLE_SPEED_MAX);
    // Create an array to track current trail particles.
    this.trail = [];
    // Trail length determines how many trailing particles are active at once.
    this.trailLength = this.PARTICLE_TRAIL_LENGTH;
    // While the trail length remains, add current point to trail list.
    while (this.trailLength--) {
      this.trail.push([this.x, this.y]);
    }
    // Set transparency.
    this.transparency = this.PARTICLE_TRANSPARENCY;
  }

  // Update a particle prototype.
  // 'index' parameter is index in 'particles' array to remove, if journey is complete.
  update(index, particles) {
    // Remove the oldest trail particle.
    this.trail.pop();
    // Add the current position to the start of trail.
    this.trail.unshift([this.x, this.y]);

    // Decrease speed based on friction rate.
    this.speed *= this.friction;
    // Calculate current position based on angle, speed, and gravity (for y-axis only).
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    // Apply transparency based on decay.
    this.transparency -= this.decay;
    // Use decay rate to determine if particle should be destroyed.
    if (this.transparency <= this.decay) {
      // Destroy particle once transparency level is below decay.
      particles.splice(index, 1);
    }
  }

  // Draw a particle.
  // Use CanvasRenderingContext2D methods to create strokes as particle paths.
  draw() {
    // Begin a new path for particle trail.
    this.context.beginPath();
    // Get the coordinates for the oldest trail position.
    let trailEndX = this.trail[this.trail.length - 1][0];
    let trailEndY = this.trail[this.trail.length - 1][1];
    // Create a trail stroke from trail end position to current particle position.
    this.context.moveTo(trailEndX, trailEndY);
    this.context.lineTo(this.x, this.y);
    // Set stroke coloration and style.
    // Use hue, brightness, and transparency instead of RGBA.
    this.context.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.transparency})`;
    this.context.stroke();
  }
}
