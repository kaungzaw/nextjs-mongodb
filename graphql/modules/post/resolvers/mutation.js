import { ObjectId } from "mongodb";
import { GraphQLYogaError } from "@graphql-yoga/node";
import {
  insertOne,
  findOneAndUpdate,
  findOneAndDelete,
  findOne,
} from "utils/crud";

const collectionName = "posts";

const mutation = {
  createPost: async (_root, args, context) => {
    const { data } = args;
    const {
      user: { email },
    } = context.session;
    const post = await insertOne(collectionName, {
      ...data,
      like: 0,
      dislike: 0,
      createdAt: new Date().toISOString(),
      createdBy: email,
    });
    return post;
  },
  updatePost: async (_root, args) => {
    const { _id, update } = args;
    const post = await findOneAndUpdate(
      collectionName,
      { _id: ObjectId(_id) },
      { $set: update }
    );
    return post;
  },
  deletePost: async (_root, args, context) => {
    const { _id } = args;
    const {
      user: { email },
    } = context.session;
    const post = await findOne(collectionName, { _id: ObjectId(_id) });
    if (!post) {
      throw new GraphQLYogaError("Not found");
    }
    if (post.createdBy !== email) {
      throw new GraphQLYogaError("Unauthorized");
    }
    await findOneAndDelete(collectionName, { _id: ObjectId(_id) });
    return post;
  },
  likePost: async (_root, args) => {
    const { _id } = args;
    const post = await findOneAndUpdate(
      collectionName,
      { _id: ObjectId(_id) },
      { $inc: { like: 1 } }
    );
    return post;
  },
  dislikePost: async (_root, args) => {
    const { _id } = args;
    const post = await findOneAndUpdate(
      collectionName,
      { _id: ObjectId(_id) },
      { $inc: { dislike: 1 } }
    );
    return post;
  },
};

export default mutation;
