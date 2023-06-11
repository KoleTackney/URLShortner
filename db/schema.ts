import { InferModel } from 'drizzle-orm';
import { int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const URLTable = mysqlTable('url', {
    id: serial('id').primaryKey(),
    url: varchar('url', { length: 256 }),
})

type URLTable = InferModel<typeof URLTable, "select">;
type newURL = InferModel<typeof URLTable, "insert">;