import { random } from 'utils';
import { Particle } from './particle';

export class Firework {

  // constants

  // Base length of firework trails.
  FIREWORK_TRAIL_LENGTH = 3;
  // Base speed of fireworks.
  FIREWORK_SPEED = 5;
  // Base firework acceleration.
  // 1.0 causes fireworks to travel at a constant speed.
  // Higher number increases rate firework accelerates over time.
  FIREWORK_ACCELERATION = 1.05;
  // Minimum firework brightness.
  FIREWORK_BRIGHTNESS_MIN = 50;
  // Maximum firework brightness.
  FIREWORK_BRIGHTNESS_MAX = 70;
  // Determine if target position indicator is enabled.
  FIREWORK_TARGET_INDICATOR_ENABLED = false;
  // Base particle count per firework.
  PARTICLE_COUNT = 100;

  // Path begins at 'start' point and ends and 'end' point.
  constructor(startX, startY, endX, endY, context) {
    // Set current coordinates.
    this.x = startX;
    this.y = startY;
    // Set starting coordinates.
    this.startX = startX;
    this.startY = startY;
    // Set end coordinates.
    this.endX = endX;
    this.endY = endY;
    // Set the context.
    this.context = context;
    // Get the distance to the end point.
    this.distanceToEnd = this.calculateDistance(startX, startY, endX, endY);
    this.distanceTraveled = 0;
    // Create an array to track current trail particles.
    this.trail = [];
    // Trail length determines how many trailing particles are active at once.
    this.trailLength = this.FIREWORK_TRAIL_LENGTH;
    // While the trail length remains, add current point to trail list.
    while (this.trailLength--) {
      this.trail.push([this.x, this.y]);
    }
    // Calculate the angle to travel from start to end point.
    this.angle = Math.atan2(endY - startY, endX - startX);
    // Set the speed.
    this.speed = this.FIREWORK_SPEED;
    // Set the acceleration.
    this.acceleration = this.FIREWORK_ACCELERATION;
    // Set the brightness.
    this.brightness = random(this.FIREWORK_BRIGHTNESS_MIN, this.FIREWORK_BRIGHTNESS_MAX);
    // this.brightness = 100;
    // Set the radius of click-target location.
    this.targetRadius = 2.5;
  }

  // Update a firework.
  // 'index' parameter is index in 'fireworks' array to remove, if journey is complete.
  update(index, hue, fireworks, particles) {
    // Remove the oldest trail particle.
    this.trail.pop();
    // Add the current position to the start of trail.
    this.trail.unshift([this.x, this.y]);

    // Animate the target radius indicator.
    if (this.FIREWORK_TARGET_INDICATOR_ENABLED) {
      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }
    }

    // Increase speed based on acceleration rate.
    this.speed *= this.acceleration;

    // Calculate current velocity for both x and y axes.
    let xVelocity = Math.cos(this.angle) * this.speed;
    let yVelocity = Math.sin(this.angle) * this.speed;
    // Calculate the current distance travelled based on starting position, current position, and velocity.
    // This can be used to determine if firework has reached final position.
    this.distanceTraveled = this.calculateDistance(this.startX, this.startY, this.x + xVelocity, this.y + yVelocity);

    // Check if final position has been reached (or exceeded).
    if (this.distanceTraveled >= this.distanceToEnd) {
      // Destroy firework by removing it from collection.
      fireworks.splice(index, 1);
      // Create particle explosion at end point.  Important not to use this.x and this.y,
      // since that position is always one animation loop behind.
      this.createParticles(this.endX, this.endY, hue, particles);
    } else {
      // End position hasn't been reached, so continue along current trajectory by updating current coordinates.
      this.x += xVelocity;
      this.y += yVelocity;
    }
  }

  // Draw a firework.
  // Use CanvasRenderingContext2D methods to create strokes as firework paths.
  draw(hue) {
    // Begin a new path for firework trail.
    this.context.beginPath();
    // Get the coordinates for the oldest trail position.
    let trailEndX = this.trail[this.trail.length - 1][0];
    let trailEndY = this.trail[this.trail.length - 1][1];
    // Create a trail stroke from trail end position to current firework position.
    this.context.moveTo(trailEndX, trailEndY);
    this.context.lineTo(this.x, this.y);
    // Set stroke coloration and style.
    // Use hue, saturation, and light values instead of RGB.
    this.context.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
    // Draw stroke.
    this.context.stroke();

    if (this.FIREWORK_TARGET_INDICATOR_ENABLED) {
      // Begin a new path for end position animation.
      this.context.beginPath();
      // Create an pulsing circle at the end point with targetRadius.
      this.context.arc(this.endX, this.endY, this.targetRadius, 0, Math.PI * 2);
      // Draw stroke.
      this.context.stroke();
    }
  }

  // Create particle explosion at 'x' and 'y' coordinates.
  createParticles(x, y, hue, particles) {
    // Set particle count.
    // Higher numbers may reduce performance.
    let particleCount = this.PARTICLE_COUNT;
    while (particleCount--) {
      // Create a new particle and add it to particles collection.
      particles.push(new Particle(x, y, hue, this.context));
    }
  }

  // Calculate the distance between two points.
  calculateDistance(aX, aY, bX, bY) {
    let xDistance = aX - bX;
    let yDistance = aY - bY;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

}
