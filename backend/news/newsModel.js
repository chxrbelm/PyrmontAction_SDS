module.exports = (db) => {
    db.run(`
        CREATE TABLE IF NOT EXISTS news (
            news_id INTEGER PRIMARY KEY AUTOINCREMENT,
            news_title TEXT NOT NULL,
            news_description TEXT NOT NULL,
            news_date DATE NOT NULL,
            news_image_path TEXT
        );
    `);

    // uncomment if database hasn't been populated yet
    // db.run(
    //     `INSERT INTO news (news_title, news_description, news_date, news_image_path)
    //      VALUES (?, ?, ?, ?)`,
    //     [
    //       'BREAKING NEWS 1',
    //       'description1',
    //       '2025-04-13',
    //       'cricket_image.png'
    //     ]
    //   )
    
    // db.run(
    //     `INSERT INTO news (news_title, news_description, news_date, news_image_path)
    //      VALUES (?, ?, ?, ?)`,
    //     [
    //       'BREAKING NEWS 2',
    //       'description2',
    //       '2025-04-14',
    //       'pyrmont_bay_sunset.png'
    //     ]
    //   )
      
    //   db.run(
    //     `INSERT INTO news (news_title, news_description, news_date, news_image_path)
    //      VALUES (?, ?, ?, ?)`,
    //     [
    //       'BREAKING NEWS 3',
    //       'description3',
    //       '2025-04-15',
    //       'pyrmont_skyline.png'
    //     ]
    //   )
      
    //   db.run(
    //     `INSERT INTO news (news_title, news_description, news_date, news_image_path)
    //      VALUES (?, ?, ?, ?)`,
    //     [
    //       'BREAKING NEWS 4',
    //       'description4',
    //       '2025-04-16',
    //       'pyrmont_sunset.png'
    //     ]
    //   )
  };