import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { MovieModel } from "./Movie";
import { UserModel } from "./User";

export type Review = {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
};

@Table({ modelName: "Reviews" })
export class ReviewModel extends Model<ReviewModel> {
  @PrimaryKey
  @Column({ allowNull: false, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => MovieModel)
  movieId: number;

  @BelongsTo(() => MovieModel, {})
  movie: MovieModel;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({ allowNull: false, type: DataType.INTEGER })
  rating: number;

  @Column({ allowNull: false, type: DataType.STRING })
  comment: string;
}
