module.exports = {
    async getAllImages(db){
        return new Promise((resolve, reject) => {
          query = "SELECT * FROM images"
          db.all(query, [], (error, result) => {
            if (error) reject("Issues with retrieving all images: " + error);
            resolve(result);
          });
        })
      },
}