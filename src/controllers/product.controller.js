import {Product} from "../models/product.model.js"
import { v2 as cloudinary } from "cloudinary";

const createProduct = async(req ,res)=>{

    try {
        // get data
       const{name, description, price, stock, category}= req.body

        //    file upload
        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];

        const images = [image1, image2, image3].filter(
            (file) => file !== undefined
        );

        console.log("images", images)
        const imgeUrl = await Promise.all(
            images.map(async (file)=>{
                const result = await cloudinary.uploader.upload(file.path);
                return result.secure_url;
            })
        )
        console.log("url", imgeUrl)
        console.log("FILES:", req.files);

        const newProduct = {
            name,
            description,
            price:Number(price),
            stock,
            category,
            image:imgeUrl 
        }
       
        const product = new Product(newProduct)
        await product.save();

        // return res

        return res.status(400)
        .json({
            success:true,
            message:"Product Created"
        })
    } catch (error) {
      console.log("Proudct creation error", error);
      return res.status(500)
      .json({
        success:false,
        message:error.message
      })
    }
}

export {createProduct}