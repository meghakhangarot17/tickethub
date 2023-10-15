import { Subjects, PaymentCreatedEvent, Publisher } from "@metickethub/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}