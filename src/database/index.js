import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBReplicationCouchDBPlugin } from 'rxdb/plugins/replication-couchdb';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { rxdbValidatePlugin } from 'rxdb/plugins/validate';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import 'react-native-get-random-values'; // required for uuid()
import { v4 as uuid } from 'uuid';

addRxPlugin(RxDBReplicationCouchDBPlugin);
addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(rxdbValidatePlugin);
addRxPlugin(SQLiteAdapterFactory);
addRxPlugin(RxDBDevModePlugin);

// Business Schema
const businessSchema = {
  title: 'business schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
  },
  required: ['id', 'name'],
};

// Article Schema
const articleSchema = {
  title: 'article schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
    qty: { type: 'number' },
    selling_price: { type: 'number' },
    business_id: { type: 'string' },
  },
  required: ['id', 'name', 'qty', 'selling_price', 'business_id'],
};

let dbInstance = null;

export const initDB = async () => {
  if (dbInstance) return dbInstance;

  const db = await createRxDatabase({
    name: 'offline_store',
    adapter: SQLiteAdapterFactory,
    multiInstance: false,
  });

  await db.addCollections({
    business: { schema: businessSchema },
    article: { schema: articleSchema },
  });

  // Sync with Render CouchDB
  db.business.syncCouchDB({
    remote: 'https://admin:admin@couchdb-render-i864.onrender.com/business',
    options: { live: true, retry: true },
  });

  db.article.syncCouchDB({
    remote: 'https://admin:admin@couchdb-render-i864.onrender.com/article',
    options: { live: true, retry: true },
  });

  dbInstance = db;
  return db;
};

// Helper for insert
export const createBusiness = async name => {
  const db = await initDB();
  return db.business.insert({ id: uuid(), name });
};

export const createArticle = async (name, qty, price, business_id) => {
  const db = await initDB();
  return db.article.insert({
    id: uuid(),
    name,
    qty,
    selling_price: price,
    business_id,
  });
};
