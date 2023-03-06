import db from '../models'

export const getAll = async (): Promise<any> => {
  const entities = await db.Spomenik.findAll({
    raw : true,
    order: [
      ['id', 'DESC']
    ],
  });
  return entities
}

export const getByIds = async (ids: Array<number>): Promise<any> => {
  const entities = await db.Spomenik.findAll({
    raw : true,
    where: [
      { id: ids },
    ],
    order: [
      ['id', 'DESC']
    ],
  });
  return entities
}

export const getById = async (id: number): Promise<any> => {
  const entity = await db.Spomenik.findByPk(id);
  return entity
}

export const create = async (payload: any): Promise<any> => {
  const entity = await db.Spomenik.create(payload)
  return entity
}

export const update = async (etity: any, payload: any): Promise<void> => {
  await etity.set(payload);
  await etity.save();
}

export const destroy = async (etity: any): Promise<void> => {
  await etity.destroy();
}