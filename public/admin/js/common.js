const handlePreviewImage = () => {
  const imageUpload = document.querySelector("[upload-image]");
  if (imageUpload) {
    const uploadImagePreview = imageUpload.querySelector(
      "[upload-image-preview]"
    );
    const imageUploadInput = imageUpload.querySelector("[upload-image-input]");
    if (imageUploadInput) {
      imageUploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        uploadImagePreview.src = imgUrl;
        uploadImagePreview.width = 200;
        uploadImagePreview.height = 200;
        uploadImagePreview.classList.add("img-thumbnail");
      });
    }
  }
};

const handlePreviewAudio = () => {
  const audioUpload = document.querySelector("[upload-audio]");
  if (audioUpload) {
    const uploadAudioPlay = audioUpload.querySelector("[upload-audio-play]");
    const audioUploadInput = audioUpload.querySelector("[upload-audio-input]");
    const source = audioUpload.querySelector("source");

    audioUploadInput.addEventListener("change", (e) => {
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load();
    });
  }
};

handlePreviewImage();
handlePreviewAudio();
