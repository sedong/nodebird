const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, //등록, 삭제 날짜 자동 등록 createAt,updateAt
            underscored: false, //밑줄
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false, //삭제일 자동 등록 false: deletedAt 하지않음
            charset: 'utf8mb4', //mb4 유니코드 허용
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
    }
};