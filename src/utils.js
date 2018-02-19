// Get a random number within the specified range.
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function addBackgrounds() {
  $(document).ready(function() {
    let imgPath = 'url("resources/images/decoration/logo-circle-transparent.png")';
    let imageWidth = 356;
    let imageHeight = 399;
    let minWidth = Math.round(0.1 * imageWidth);
    let widthDiff = imageWidth - minWidth;
    let circleNumber = 3;

    $('.page-content > .content-container').each(function(i) {
      let w = $(this).innerWidth();
      let h = $(this).innerHeight();

      let positions = createPositions(circleNumber, imageWidth, imageHeight, w, h);
      let backgroundImage = positions.map(pos =>
        imgPath + ' ' + pos.x + 'px ' + pos.y + 'px / '
          + Math.round(minWidth + Math.random() * widthDiff) + 'px no-repeat'
      ).join(', ') + ', white';

      $(this).css('background', backgroundImage);
    });
  });
}

function createPositions(i, imgW, imgH, areaW, areaH) {
  let positions = [];
  let x = 0;

  for (let c = 0; c < i; c++) {
    let pos;

    do {
      pos = { x: randCoord(areaW, imgW), y: randCoord(areaH, imgH) };
      ++x;
    }
    while (c > 0 && x < 10 && !isDistancePreserved(pos, positions, Math.max(imgW, imgH)));
    positions.push(pos);
  }

  return positions;
}

function randCoord(areaSize, imgSize) {
  return Math.round(Math.random() * areaSize - imgSize / 2);
}

function isDistancePreserved(pos, positions, minDistance) {
  return positions.every(function(p) { return distance(p, pos) > minDistance; });
}

function distance(posA, posB) {
  return Math.sqrt(Math.pow(posA.x - posB.x, 2), Math.pow(posA.y - posB.y, 2));
}
