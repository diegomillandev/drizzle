import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "./constants/env";
import { UserInsert, usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";

const db = drizzle(DATABASE_URL, {
  schema,
});

async function main() {
  await db.delete(usersTable);

  const newUsers: UserInsert[] = [
    {
      name: "Alice",
      age: 30,
      email: "alice@correo.com",
    },
    {
      name: "Bob",
      age: 25,
      email: "bod@correo.com",
    },
    {
      name: "Charlie",
      age: 35,
      email: "charlie@correo.com",
    },
  ];

  await db.insert(usersTable).values(newUsers);

  const usersAfterCreate = await db.select().from(usersTable);

  console.log("Users after creation:");
  console.table(usersAfterCreate);

  await db
    .update(usersTable)
    .set({ age: 34 })
    .where(eq(usersTable.email, "alice@correo.com"));

  const usersAfterUpdate = await db.query.usersTable.findMany();

  console.log("Users after update:");
  console.table(usersAfterUpdate);

  const findedUser = await db.query.usersTable.findFirst({
    where: (u, { eq }) => eq(u.email, "charlie@correo.com"),
  });

  console.log("Finded user:");
  console.table(findedUser);

  await db.delete(usersTable).where(eq(usersTable.email, "bod@correo.com"));

  const usersAfterDelete = await db.query.usersTable.findMany();

  console.log("Users after deletion:");
  console.table(usersAfterDelete);
}

main().catch(console.error);
