export const PhotoService = {
  getData(itemImages) {
    let imagesList = []
    console.log(itemImages);
    itemImages.forEach(itemImage => {
      imagesList.push({
        itemImageSrc: `https://badil.pythonanywhere.com/images/${itemImage}`,
        thumbnailImageSrc: `https://badil.pythonanywhere.com/images/${itemImage}`,
      })
    })
    return imagesList
  },
  getImages(itemImages) {
    return Promise.resolve(this.getData(itemImages));
  }
};
