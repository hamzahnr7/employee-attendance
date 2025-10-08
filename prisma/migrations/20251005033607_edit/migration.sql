/*
  Warnings:

  - Added the required column `color` to the `Statuses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Statuses" ("desc", "id", "name", "type") SELECT "desc", "id", "name", "type" FROM "Statuses";
DROP TABLE "Statuses";
ALTER TABLE "new_Statuses" RENAME TO "Statuses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
