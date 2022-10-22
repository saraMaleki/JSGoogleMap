import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedInputElement = document.getElementById("share-link");

    if (!navigator.clipboard) {
      sharedInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(sharedInputElement.value)
      .then(() => {
        alert("Copied into clipboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render();
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const sharedInputElement = document.getElementById("share-link");
    sharedInputElement.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Sorry navigator feature is not available");
      return;
    } else {
      const modal = new Modal(
        "loading-modal-content",
        "Loading Location, please wait."
      );
      modal.show();

      navigator.geolocation.getCurrentPosition(
        async (successResult) => {
          modal.hide();
          const coordinates = {
            lat: successResult.coords.latitude,
            lng: successResult.coords.longitude,
          };
          console.log(coordinates);
          const address = await getAddressFromCoords(coordinates);
          modal.hide();

          this.selectPlace(coordinates, address);
        },
        (error) => {
          modal.hide();
          alert("could not locate you, please enter address");
        }
      );
    }
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input");
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - please try again");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading Location, please wait."
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

new PlaceFinder();
