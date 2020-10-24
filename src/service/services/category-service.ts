import {IEntityService} from './services.types';

type TCategory = string;

export class CategoryService implements IEntityService<TCategory> {
  private _categories: TCategory[];

  constructor(categories: TCategory[] = []) {
    this._categories = categories;
  }

  findAll(): TCategory[] {
    return this._categories;
  }

  create(): TCategory {
    throw new Error(`Нельзя создать новую категорию.`);
  }

  drop(): TCategory | null {
    throw new Error(`Нельзя удалить категорию.`);
  }

  findOne(): TCategory | null {
    throw new Error(`Нельзя найти определенную категорию.`);
  }

  update(): TCategory[] {
    throw new Error(`Нельзя обновить определенную категорию.`);
  }
}
