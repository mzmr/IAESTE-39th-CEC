// Get a random number within the specified range.
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function addBackgrounds() {
  $(document).ready(function() {
    let imgPath = 'url(\'resources/images/logo-circle-transparent.png\')';
    let imageWidth = 356;
    let imageHeight = 399;
    let minWidth = Math.round(0.1 * imageWidth);
    let widthDiff = imageWidth - minWidth;

    $('.page-content > .content-container').each(function(i) {
      let w = $(this).innerWidth();
      let h = $(this).innerHeight();

      let tmpList = Array.from(Array(3).keys());
      let backgroundImages = tmpList.map(function(e) {
        let xPos = Math.round(Math.random() * (w + imageWidth / 2) - imageWidth / 2);
        let yPos = Math.round(Math.random() * (h + imageHeight / 2) - imageHeight / 2);
        return imgPath + ' ' + xPos + 'px ' + yPos + 'px no-repeat';
      }).join(', ') + ', white';

      let backgroundSizes = tmpList.map(e =>
          Math.round(minWidth + Math.random() * widthDiff) + 'px'
        ).join(', ');

      $(this).css('background', backgroundImages);
      $(this).css('background-size', backgroundSizes);
    });
  });
}
