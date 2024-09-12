import { connectToDatabase } from '../../services/mongodb'
import { verifyJwt } from '../../services/auth'


export async function getLastBlogPosts({limit = 1000, onlyPublished = true}) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let filters = onlyPublished ? {isPublished: true} : {};
    let posts = await db
        .collection('blog-posts')
        .find(filters, { projection: {
            _id: true,
            slug: true,
            author: true,
            title: true,
            coverImgurl: true,
            description: true,
            datePublished: true,
            isPublished: true
          }})
        .sort({ datePublished: -1 })
        .limit(limit)
        .toArray();
    return posts?.length > 0 ? JSON.parse(JSON.stringify(posts)) : []
}

export async function createBlogPost(post) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let result = await db
        .collection('blog-posts')
        .insertOne(post);
    post._id = result.insertedId.toString();
    return post;
}

export default async function handler(req, res) {
    // Restricts endpoint to only POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Only POST requests are allowed');
        return;
    }

    // Checks if Jwt in cookies is valid
    const decodedResult = verifyJwt({ req });
    if (!decodedResult) {
        res.status(403).json({ success: false, message: 'This route is protected to admin.' });
        return;
    }

    // Gets parameters from request body
    const post = req.body;

    try {
        const insertedPost = await createBlogPost(post);
        res.status(200).json({ success: true, data: insertedPost });
        return;
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to save post: ' + error.message });
        return;
    }

}