import SQ from "sequelize";
import { sequelize } from "../db/database";
const DataTypes = SQ.DataTypes;

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export async function getAll() {
  return Post.findAll({ order: [["createdAt", "DESC"]] });
}

export async function getById(id: number) {
  return Post.findOne({
    where: { id },
  });
}

export async function create(title: string, text: string) {
  return Post.create({ title, text }) //
    .then((data) => getById(data.dataValues.id));
}

export async function update(id: number, title: string, text: string) {
  return Post.findByPk(id) //
    .then((post: any) => {
      if (!post) throw new Error(`can't find post number ${id}`);
      post.title = title;
      post.text = text;
      return post.save();
    });
}

export async function remove(id: number) {
  return Post.findByPk(id) //
    .then((post) => {
      if (!post) throw new Error(`can't find post number ${id}`);
      post.destroy();
    });
}
