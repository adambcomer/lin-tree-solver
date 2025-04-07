import fs from 'node:fs'
import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database('database.sqlite')

export const initDB = () => {
  return new Promise<void>((resolve, reject) => {
    const initDBData = fs.readFileSync('./repo/db.sql', 'utf8')

    db.exec(initDBData, function (this, err) {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}
