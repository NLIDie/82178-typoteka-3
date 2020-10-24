import {
  Router as createRouter,
  IRouter
} from 'express';

interface IStorage<Entity = unknown> {
  add: (entity) => Promise<Entity[]>;
  get: () => Promise<Entity[]>;
  update: (callback: (entity: Entity) => Entity) => Promise<Entity[]>;
  delete: (callback: (entity: Entity) => boolean) => Promise<Entity[]>;
  search: (callback: (entity: Entity) => boolean) => Promise<Entity[]>;
}

type TCategory = string;

export const createCategoriesRouters = (categoriesStorage: IStorage<TCategory>): IRouter => {
  const router = createRouter();

  // GET /api/categories — возвращает список категорий;
  router.get(`/`, (_, res) => {
    const categories = categoriesStorage.get();
    res.json(categories);
  });


  return router;
};
