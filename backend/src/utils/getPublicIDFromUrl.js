export const getPublicIdFromUrl = (cloudinaryUrl) => {
  try {
    const urlParts = cloudinaryUrl.split('/');

    const lastPart = urlParts[urlParts.length - 1];

    const publicId = lastPart.split('.')[0];

    const versionPart = urlParts[urlParts.length - 2];
    if (versionPart && versionPart.startsWith('v')) {
      return publicId;
    } else {
      return urlParts.slice(urlParts.indexOf('upload') + 1).join('/').split('.')[0];
    }
  } catch (error) {
    console.error('URL error:', error);
    return null;
  }
}