import { Publisher,  OrderCancelledEvent, Subjects } from "@metickethub/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}