import { TDatabaseConfig } from "config";
import { Database } from "sqlite3";

export type TDBConnection = Database;

export const openDBConnection = (config: TDatabaseConfig): Promise<TDBConnection> => {
    return new Promise((resolve, reject) => {
        const db = new Database(config.sqlitePath, config.sqliteMode, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

export const closeDBConnection = (db: TDBConnection): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export const applyDBSchema = (db: TDBConnection): Promise<void> => {
    return new Promise((resolve, reject) => {
        const sql = `
CREATE TABLE IF NOT EXISTS autors (
    code CHAR(64) PRIMARY KEY NOT NULL UNIQUE,
    name CHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS origamies (
    code CHAR(64) PRIMARY KEY NOT NULL UNIQUE,
    name CHAR(128) NOT NULL,
    complexity INTEGER NOT NULL,
    duration INTEGER NOT NULL
);

CREATE VIRTUAL TABLE  IF NOT EXISTS origamies_index USING fts5(name);

CREATE TRIGGER IF NOT EXISTS after_origamies_insert AFTER INSERT ON origamies BEGIN
  INSERT INTO origamies_index (
    rowid,
    name
  )
  VALUES (
    new.rowid,
    new.name
  );
END;

CREATE TRIGGER IF NOT EXISTS after_origamies_update UPDATE OF name ON origamies BEGIN
  UPDATE origamies_index SET name = new.name WHERE rowid = old.rowid;
END;

CREATE TRIGGER IF NOT EXISTS after_origamies_delete AFTER DELETE ON origamies BEGIN
    DELETE FROM origamies_index WHERE rowid = old.rowid;
END;

`;

        db.exec(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}
