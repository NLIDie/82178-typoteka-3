export interface IEntityService<Entity> {
  create(entity: Entity): Entity;

  drop(cb: (entity: Entity) => boolean): Entity | null;

  findAll(): Entity[];

  findOne(cb: (entity: Entity) => boolean): Entity | null;

  update(cb: (entity: Entity) => (
    Entity extends Record<string, unknown>
      ? Partial<Omit<Entity, 'id'>>
      : Entity
  )): Entity[];
}
