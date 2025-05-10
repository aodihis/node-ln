exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('comment_likes', {
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        comment_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"comments"',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
    });

    // Composite primary key
    pgm.addConstraint('comment_likes', 'comment_likes_pkey', {
        primaryKey: ['user_id', 'comment_id'],
    });
};

exports.down = (pgm) => {
    pgm.dropTable('comment_likes');
};
