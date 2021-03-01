
import models from '../models';
import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {

  const { Users } = models;

  Users.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  Users.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  Users.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  Users.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  Users.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'base_user_id'));

})();