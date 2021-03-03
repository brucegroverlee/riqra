import { UsersModel } from '../models/users';
import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {

  UsersModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'id'));
  UsersModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'id'));
  UsersModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'id'));
  UsersModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'id'));
  // UsersModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'id'));
})();