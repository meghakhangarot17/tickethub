import { Publisher, OrderCreatedEvent, Subjects } from "@metickethub/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
