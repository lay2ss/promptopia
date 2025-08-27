import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user"; 

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();

    if(!q){
        return new Response(JSON.stringify({ error: "Search term is required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    try { 
        await connectToDB();
        const users = await User.find({ username: { $regex: q, $options: "i" } });
        const userIds = users.map(user => user._id);

        const results = await Prompt.find({
            $or: [
                { prompt: { $regex: q, $options: "i" } },
                { tag: { $regex: q, $options: "i" } },
                { creator: { $in: userIds } }
            ]
        }).populate("creator");

        return new Response(JSON.stringify(results), { status: 200 });

    } catch (error) {
        console.error("Search API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to search." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}