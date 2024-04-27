import { v2 as cloudinary } from 'cloudinary';

// Return "https" URLs by setting secure: true
cloudinary.config({
  // secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const folders = await cloudinary.api.root_folders();
    const assetsByTag = await cloudinary.api.resources_by_tag(
      params.identifier,
      {
        max_results: 30,
        direction: 1,
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
