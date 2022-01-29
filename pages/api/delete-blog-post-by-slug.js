import { connectToDatabase } from '../../services/mongodb'
import { verifyJwt } from '../../services/auth'

export async function deleteBlogPostBySlug(slug) {
    let mongocli = await connectToDatabase();
    let db = mongocli.db;
    let result = await db
        .collection('blog-posts')
        .deleteOne({ slug: slug });
    if (!result.deletedCount) {
        return {
            success: false,
            message: 'Unable to delete document.'
        }
    } else {
        return {
            success: true,
            message: 'Deleted successfully.'
        }
    };
}

export default async function handler(req, res) {
    // Restricts endpoint to only POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Only POST requests are allowed');
    }

    // Checks if Jwt in cookies is valid
    const decodedResult = verifyJwt({req});
    if (!decodedResult) {
        res.status(403).json({ success: false, message: 'This route is protected to admin.' });
        return;
    }

    // Gets parameters from request body
    const { slug } = req.body;

    const deletionResult = await deleteBlogPostBySlug(slug);

    if (deletionResult.success) {
        res.status(200).json(deletionResult);
        return;
    } else {
        res.status(400).json(deletionResult);
        return;
    }
}