import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "./User";

export type Movie = {
  id: number;
  movieName: string;
  description: string;
  directorName: string;
  releaseDate: Date;
  createdBy: number;
};

@Table({ modelName: "Movies" })
export class MovieModel extends Model<MovieModel> {
  @PrimaryKey
  @Column({ allowNull: false, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  movieName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  description: string;

  @Column({ allowNull: false, type: DataType.STRING })
  directorName: string;

  @Column({ allowNull: false, type: DataType.DATE })
  releaseDate: Date;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.INTEGER })
  createdBy: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
