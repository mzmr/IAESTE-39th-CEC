import { random } from 'utils';
import {Firework} from './fireworks/firework';
import {bindable} from 'aurelia-framework';

export class Fireworks {
  @bindable viewheight;
  @bindable topmargin;

  // constants

  // Alpha level that canvas cleanup iteration removes existing trails.
  // Lower value increases trail duration.
  CANVAS_CLEANUP_ALPHA = 0.15;
  // Hue change per loop, used to rotate through different firework colors.
  HUE_STEP_INCREASE = 0.5;//

  // Minimum number of ticks between each automatic firework launch.
  TICKS_PER_FIREWORK_AUTOMATED_MIN = 20;
  // Maximum number of ticks between each automatic firework launch.
  TICKS_PER_FIREWORK_AUTOMATED_MAX = 80;


  attached() {
    this.canvas = document.getElementById('firework-canvas');
    // Set canvas dimensions.
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.viewheight;

    // Set the context, 2d in this case.
    this.context = this.canvas.getContext('2d');
    // Firework collection.
    this.fireworks = [];
    // Particles collection.
    this.particles = [];
    // Initial hue.
    this.hue = 120;
    // Track number of ticks since automated firework.
    this.ticksSinceFireworkAutomated = 0;

    // Use requestAnimationFrame to maintain smooth animation loops.
    // Fall back on setTimeout() if browser support isn't available.
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    // Initiate loop after window loads.
    this.loop();
  }

  // Primary loop.
  loop() {
    // Smoothly request animation frame for each loop iteration.
    window.requestAnimFrame(() => this.loop());

    // Adjusts coloration of fireworks over time.
    this.hue += this.HUE_STEP_INCREASE;

    // Clean the canvas.
    this.cleanCanvas();

    // Update fireworks.
    this.updateFireworks();

    // Update particles.
    this.updateParticles();

    // Launch automated fireworks.
    this.launchAutomatedFirework();
  }

  // Cleans up the canvas by removing older trails.
  //
  // In order to smoothly transition trails off the canvas, and to make them
  // appear more realistic, we're using a composite fill.
  // Set the initial composite mode to 'destination-out' to keep content that
  // overlap with the fill we're adding.
  cleanCanvas() {
    // Set 'destination-out' composite mode, so additional fill doesn't remove non-overlapping content.
    this.context.globalCompositeOperation = 'destination-out';
    // Set alpha level of content to remove.
    // Lower value means trails remain on screen longer.
    // this.context.fillStyle = `rgba(45, 14, 43, ${this.CANVAS_CLEANUP_ALPHA})`;
    this.context.fillStyle = `rgba(0, 0, 0, ${this.CANVAS_CLEANUP_ALPHA})`;
    // Fill entire canvas.
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Reset composite mode to 'lighter', so overlapping particles brighten each other.
    this.context.globalCompositeOperation = 'lighter';
  }

  // Update all active fireworks.
  updateFireworks() {
    // Loop backwards through all fireworks, drawing and updating each.
    for (let i = this.fireworks.length - 1; i >= 0; --i) {
      this.fireworks[i].draw(this.hue);
      this.fireworks[i].update(i, this.hue, this.fireworks, this.particles);
    }
  }

   // Update all active particles.
  updateParticles() {
    // Loop backwards through all particles, drawing and updating each.
    for (let i = this.particles.length - 1; i >= 0; --i) {
      this.particles[i].draw();
      this.particles[i].update(i, this.particles);
    }
  }

  // Launch fireworks automatically.
  launchAutomatedFirework() {
    // Determine if ticks since last automated launch is greater than random min/max values.
    if (this.ticksSinceFireworkAutomated >= random(this.TICKS_PER_FIREWORK_AUTOMATED_MIN, this.TICKS_PER_FIREWORK_AUTOMATED_MAX)) {
      // Check if mouse is not currently clicked.
      if (!this.isMouseDown) {
        // Set start position to bottom center.
        let startX = random(0, this.canvas.width);
        let startY = this.canvas.height;
        // Set end position to random position not far from the start.
        let endX = startX + random(-150, 150);
        endX = endX < 0 ? 0 : endX;
        endX = endX > this.canvas.width ? this.canvas.width : endX;
        let endY = random(this.topmargin, this.canvas.height * 2 / 3);
        // Create new firework and add to collection.
        this.fireworks.push(new Firework(startX, startY, endX, endY, this.context));
        // Reset tick counter.
        this.ticksSinceFireworkAutomated = 0;
      }
    } else {
      // Increment counter.
      this.ticksSinceFireworkAutomated++;
    }
  }
}
