export class Map {
  constructor(coords) {
   // this.coordinates = coords;
    this.render();
  }

  render(coordinates) {
    if (!google) {
      alert("Sorry Google Map is not available");
      return;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom:16
    });

    new google.maps.Marker({
        position: coordinates,
        map: map
    });
  }
}
