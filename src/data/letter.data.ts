import db from '../models'

export const getAll = async (userId: number, spomenikId: number): Promise<any> => {
  const entities = await db.Letter.findAll({
    raw : true,
    where: [
      {userId: userId},
      {spomenikId: spomenikId}
    ],
    order: [
      ['id', 'DESC']
    ],
  });
  return entities
}

export const create = async (payload: any): Promise<any> => {
  const entity = await db.Letter.create(payload)
  return entity
}

export const getById = async (id: number): Promise<any> => {
  const entity = await db.Letter.findByPk(id);
  return entity
}

export const update = async (etity: any, payload: any): Promise<void> => {
  await etity.set(payload);
  await etity.save();
}

export const destroy = async (etity: any): Promise<void> => {
  await etity.destroy();
}
