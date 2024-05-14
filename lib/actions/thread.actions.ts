"use server"

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/usre.model"
import { connectToDatabase } from "../mongoose"
import { threadId } from "worker_threads"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    const skipAmount = (pageNumber - 1) * pageSize;
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
            path: "author",
            model: User,
        })
        .populate({
            path: "children", // Populate the children field
            populate: {
                path: "author", // Populate the author field within children
                model: User,
                select: "_id name parentId image", // Select only _id and username fields of the author
            },
        });
    const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}
export async function createThread({
    text, author, communityId, path
}: Params) {
    try {
        connectToDatabase()
        const createdThread = await Thread.create({
            text, author, communityId: null
        })
        await User.findByIdAndUpdate(author, {
            $push: {
                threads: createdThread._id
            }
        })
        revalidatePath(path)
    } catch (error) {
        console.log(error)

    }
}

export async function fetchPostById(id: string) {
    try {
        connectToDatabase()
        const post = await Thread.findById(id).populate({
            path: "author",
            model: User,
            select: "_id id name image",

        })
            .populate({
                path: "children", // Populate the children field
                populate: [
                    {
                        path: "author", // Populate the author field within children
                        model: User,
                        select: "_id id name parentId image", // Select only _id and username fields of the author
                    },
                    {
                        path: "children", // Populate the children field within children
                        model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
                        populate: {
                            path: "author", // Populate the author field within nested children
                            model: User,
                            select: "_id id name parentId image", // Select only _id and username fields of the author
                        },
                    },
                ],
            })
            .exec();
        return post
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToDatabase();

    try {
        // Find the original thread by its ID
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not found");
        }

        // Create the new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId, // Set the parentId to the original thread's ID
        });

        // Save the comment thread to the database
        const savedCommentThread = await commentThread.save();

        // Add the comment thread's ID to the original thread's children array
        originalThread.children.push(savedCommentThread._id);

        // Save the updated original thread to the database
        await originalThread.save();

        revalidatePath(path);
    } catch (err) {
        console.error("Error while adding comment:", err);
        throw new Error("Unable to add comment");
    }
}