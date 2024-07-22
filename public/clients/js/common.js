// aplayer
const aplayer = document.querySelector("#aplayer");
const avatar = document.querySelector(".inner-avatar > img");
if (aplayer) {
  let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
    volumn: 1,
  });
  ap.on("play", () => {
    avatar.style.animationPlayState = "running";
  });
  ap.on("pause", () => {
    avatar.style.animationPlayState = "paused";
  });
}
// end player

// handle like
let buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");
    let typeLike = "yes";
    if (buttonLike.classList.contains("active")) {
      typeLike = "no";
    }
    const api = `/songs/like/${typeLike}/${id}`;
    fetch(api, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const span = buttonLike.querySelector("span");
          span.innerText = data.data;
          buttonLike.classList.toggle("active");
        }
      });
  });
}

// end like

// handle favourite songs

let listButtonFavourite = document.querySelectorAll("[button-favourite]");
if (listButtonFavourite.length > 0) {
  listButtonFavourite.forEach((buttonFavourite) => {
    buttonFavourite.addEventListener("click", () => {
      const id = buttonFavourite.getAttribute("button-favourite");
      let typeFavourite = "yes";
      if (buttonFavourite.classList.contains("active")) {
        typeFavourite = "no";
      }
      const api = `/songs/favourite/${typeFavourite}/${id}`;
      fetch(api, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            buttonFavourite.classList.toggle("active");
          }
        });
    });
  });
}
