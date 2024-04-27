import { v2 as cloudinary } from 'cloudinary';

// Return "https" URLs by setting secure: true
cloudinary.config({
  // secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

export async function GET() {
  try {
    /////////////////////////
    // Uploads an image file
    /////////////////////////
    // const uploadImage = async (imagePath: string) => {
    //   // Use the uploaded file's name as the asset's public ID and
    //   // allow overwriting the asset with new versions
    //   const options = {
    //     use_filename: true,
    //     unique_filename: false,
    //     overwrite: true,
    //   };

    //   try {
    //     // Upload the image
    //     const result = await cloudinary.uploader.upload(imagePath, options);
    //     console.log(result);
    //     return result.public_id;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // await uploadImage(
    //   'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg',
    // );

    const folders = await cloudinary.api.root_folders();
    const assetsByTag = await cloudinary.api.resources_by_tag(
      'a3d08987-2bad-4f0a-b34c-b605842b2845',
      {
        max_results: 30,
      },
    );

    // console.log(assetsInFolder);

    return Response.json({
      success: true,
      folders,
      assetsByTag,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error,
    });
  }
}

// export async function POST(request: Request) {
//   try {
//     const {
//       name,
//       email,
//       image_url,
//     }: { name: string; email: string; image_url: string } =
//       await request.json();

//     if (!name) {
//       return new Response(`Webhook error: name property is missing.`, {
//         status: 400,
//       });
//     }
//     if (!email) {
//       return new Response(`Webhook error: email property is missing.`, {
//         status: 400,
//       });
//     }
//     if (!image_url) {
//       return new Response(`Webhook error: image_url property is missing.`, {
//         status: 400,
//       });
//     }

//     const createdCustomer = await prisma.customers.create({
//       data: {
//         name,
//         email,
//         image_url,
//       },
//     });

//     return Response.json({
//       success: true,
//       data: createdCustomer,
//     });
//   } catch (error) {
//     console.log(error);
//     return new Response(`Error: ${error}`, {
//       status: 400,
//     });
//   }
// }
