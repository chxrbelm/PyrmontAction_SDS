const images = require('./galleryModel')
module.exports = {
    async getAllGalleryImage(req, res, db){
        try{
            const allImageData = await images.getAllImages(db);

                //  db.exec(
                // ` INSERT INTO images(image_id, image_file_name, caption, alt)
                //     VALUES
                //     (1, 'image_1.png', 'Caption for Image 1', 'Description for gallery image 1'),
                //     (2, 'image_2.png', 'Caption for Image 2', 'Description for gallery image 2'),
                //     (3, 'image_3.png', 'Caption for Image 3', 'Description for gallery image 3'),
                //     (4, 'image_4.png', 'Caption for Image 4', 'Description for gallery image 4'),
                //     (5, 'image_5.png', 'Caption for Image 5', 'Description for gallery image 5'),
                //     (6, 'image_6.png', 'Caption for Image 6', 'Description for gallery image 6'),
                //     (7, 'image_7.png', 'Caption for Image 7', 'Description for gallery image 7'),
                // (8, 'header_image.png', 'Caption for Image 8', 'Description for gallery image 8')
                //  `)
            res.status(200).json({message: 'Successful images', images: allImageData})
        }
        catch(error){
            return res.status(400).json({error: 'Error with the Image page'});
        }

    }


        
}