// aplayer
const aplayer = document.querySelector("#aplayer");
const avatar = document.querySelector(".inner-avatar > img");
if (aplayer) {
  let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
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
  ap.on("ended", () => {
    const id = dataSong._id;
    const api = `/songs/listen/${id}`;
    fetch(api, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const innerListen = document.querySelector(".inner-listen");
          const span = innerListen.querySelector("span");
          span.innerText = data.data;
        }
      });
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
// end favourite songs

// handle suggest search
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  const input = formSearch.querySelector('[name="keyword"]');
  const suggestBlock = formSearch.querySelector(".inner-suggest");
  const suggestList = suggestBlock.querySelector(".inner-list");
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const api = `/search/suggest?keyword=${keyword}`;
    fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const songs = data.songs;
          if (songs.length > 0) {
            suggestBlock.classList.add("show");
            const htmls = songs.map((song) => {
              return `
                <a href="/songs/detail/${song.slug}">
                  <div class="inner-image"> 
                    <img src="${song.avatar}" alt="${song.title}">
                  </div>
                  <div class="inner-info"> 
                    <div class="inner-title"> ${song.title} </div>
                    <div class="inner-singer"> 
                      <i class="me-3 fa-solid fa-microphone-lines"> </i>
                      <span> ${song.infoSinger.fullName} </span>
                    </div>
                  </div>
                </a>
              `;
            });
            suggestList.innerHTML = htmls;
          } else {
            suggestBlock.classList.remove("show");
          }
        }
      });
  });
}
// end suggest search
