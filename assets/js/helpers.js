function radiusFormat(value) {
  if (value < 1) return value * 1000 + 'м';
  else return value + 'км';
}

function distanceFormat(value) {
  if (value < 1000) {
    return Math.floor(value / 100) * 100 + "м";
  } else return (value / 1000).toFixed(1) + "км";
}

export {
  radiusFormat,
  distanceFormat,
}
