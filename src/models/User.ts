import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

@Table({ modelName: "Users" })
export class UserModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  username: string;

  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;
}
