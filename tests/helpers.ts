import sequelize from "../src/models";

export const clearDatabase = async () => {
  Promise.all(
    Object.keys(sequelize.models).map(key => {
      sequelize.models[key].destroy({ truncate: true, force: true });
    }),
  );
};
