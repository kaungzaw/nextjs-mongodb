import { getMongoDb } from "utils/mongodb";

export async function find(collectionName, query = {}) {
  const db = await getMongoDb();
  const result = await db
    .collection(collectionName)
    .find(query)
    .sort({ _id: -1 });
  return result.toArray();
}

export async function findOne(collectionName, query = {}) {
  const db = await getMongoDb();
  const result = await db.collection(collectionName).findOne(query);
  return result;
}

export async function findOneAndUpdate(
  collectionName,
  filter = {},
  update = {}
) {
  const db = await getMongoDb();
  const result = await db
    .collection(collectionName)
    .findOneAndUpdate(filter, update, { returnDocument: "after" });
  return result.value;
}

export async function findOneAndDelete(collectionName, filter = {}) {
  const db = await getMongoDb();
  const result = await db.collection(collectionName).findOneAndDelete(filter);
  return result.value;
}

export async function insertOne(collectionName, document) {
  const db = await getMongoDb();
  const result = await db.collection(collectionName).insertOne(document);
  return { _id: result.insertedId.toString(), ...document };
}
