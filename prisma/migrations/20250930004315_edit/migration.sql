/*
  Warnings:

  - Added the required column `status` to the `Attendaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendaces" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" INTEGER NOT NULL,
    "desc" TEXT,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "Attendaces_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendaces" ("date", "id", "lat", "lng", "time", "usersId") SELECT "date", "id", "lat", "lng", "time", "usersId" FROM "Attendaces";
DROP TABLE "Attendaces";
ALTER TABLE "new_Attendaces" RENAME TO "Attendaces";
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);
INSERT INTO "new_Status" ("desc", "id", "name") SELECT "desc", "id", "name" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
