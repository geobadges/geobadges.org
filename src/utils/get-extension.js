module.exports = url => {
    if (url.endsWith(".jpg")) return ".jpg";
    else if (url.endsWith('.png')) return ".png";
};
