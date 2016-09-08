export default {
  isEmail(value) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  },
  isNotEmpty(value) {
    const errorMessage = 'It should be a string';
    if (typeof value === 'undefined') {
      throw new TypeError(`Value is undefined. ${errorMessage}`)
    } else if (typeof value === 'object') {
      throw new TypeError(`Value is object. ${errorMessage}`)
    }
    const newValue = value.toString().trim();
    return !!newValue.length;
  },
  isImage(file) {
    const imageMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/svg+xml'
    ];
    const imageFileExtentions = [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'svg'
    ];
    return this.testFile(file, imageMimeTypes, imageFileExtentions);
  },
  isVideo(file) {
    const videoMimeTypes = [
      'video/webm',
      'video/mp4',
      'video/ogg'
    ];
    const videoFileExtentions = [
      'mp4',
      'webm',
      'ogg'
    ];
    return this.testFile(file, videoMimeTypes, videoFileExtentions);
  },
  testFile(file, arrayOfMimes, arrayOfExtentions) {
    const errorMessage = 'It should be an instance of File';
    if (!(file instanceof File)) {
      throw new TypeError(`${errorMessage}`);
    }
    let isValid = false;
    if (!!file.type) {
      for (let i = 0; i < arrayOfMimes.length; i++) {
        if (file.type === arrayOfMimes[i]) {
          isValid = true;
          break;
        }
      }
    } else {
      const fileReg = new RegExp(`\.(${arrayOfExtentions.join('|')})$`, 'i');
      isValid = fileReg.test(file.name);
    }
    return isValid;
  }
}
